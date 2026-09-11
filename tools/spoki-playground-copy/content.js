(() => {
  "use strict";

  const PATH_RE = /^\/ai\/agent\/[0-9a-f-]{8,}/i;
  const STORAGE_KEY = "spokiBubbleSelector";

  const AGENT_TOKENS = [
    "agent", "assistant", "bot", "incoming", "received", "receive",
    "left", "reply", "response", "other", "them", "inbound"
  ];
  const USER_TOKENS = [
    "user", "me", "self", "own", "mine", "human", "outgoing", "sent", "send",
    "right", "outbound"
  ];

  const SKIP_CLOSEST =
    'button, a, input, textarea, select, label, nav, header, footer, ' +
    'summary, [role="button"], [role="menuitem"], [role="tab"], [contenteditable="true"]';

  const TIME_RE = /^\d{1,2}[:.]\d{2}(\s*[ap]\.?m\.?)?$/i;

  let panel = null;
  let learned = null;
  let picking = false;
  let pickHighlight = null;

  /* ---------------------------------------------------------------- utils */

  function isVisible(el) {
    if (!el.isConnected) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 8 || r.height < 8) return false;
    const s = getComputedStyle(el);
    return s.visibility !== "hidden" && s.display !== "none" && s.opacity !== "0";
  }

  function depthOf(el) {
    let d = 0;
    for (let n = el.parentElement; n; n = n.parentElement) d++;
    return d;
  }

  function tokensOf(el) {
    const raw = [el.className, el.id, el.getAttribute("role") || ""];
    for (const key in el.dataset) raw.push(key, el.dataset[key]);
    return String(raw.join(" "))
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean);
  }

  // Walks up because the role marker often sits on a wrapper rather than on
  // the element holding the text, but never past `stopAt` (the turn): above it
  // sits the shared transcript container, whose classes describe the whole
  // chat and would tag every row, separators included.
  function roleOf(el, stopAt) {
    let node = el;
    for (let i = 0; node && i < 6; i++) {
      const t = tokensOf(node);
      const user = t.some((x) => USER_TOKENS.includes(x));
      const agent = t.some((x) => AGENT_TOKENS.includes(x));
      if (user && !agent) return "user";
      if (agent && !user) return "agent";
      if (node === stopAt) break;
      node = node.parentElement;
    }
    return null;
  }

  function extractText(el) {
    const clone = el.cloneNode(true);
    clone.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));
    clone
      .querySelectorAll("p, div, li, tr, h1, h2, h3, h4, h5, h6, blockquote, pre")
      .forEach((b) => b.append("\n"));
    return clone.textContent
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  /* --------------------------------------------------------- chat finding */

  // The playground is a modal, so when one is open the transcript is inside it
  // and everything behind the overlay is noise.
  function searchRoot() {
    const dialogs = Array.from(
      document.querySelectorAll('[role="dialog"], [aria-modal="true"], dialog[open], .modal')
    ).filter(isVisible);
    if (!dialogs.length) return document.body;
    return dialogs.reduce((a, b) => (depthOf(b) > depthOf(a) ? b : a));
  }

  function textBlocks(root) {
    const out = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    for (let el = walker.nextNode(); el; el = walker.nextNode()) {
      if (el.closest(".spk-copy-panel")) continue;
      if (el.closest(SKIP_CLOSEST)) continue;
      const own = Array.from(el.childNodes).some(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 1
      );
      if (!own) continue;
      if (!isVisible(el)) continue;
      out.push(el);
    }
    return out;
  }

  // The transcript is the element with the most children that each hold text:
  // a message list beats page chrome. Ties go to the deeper element, so the
  // list wins over the layout wrapper that merely contains it.
  function chatContainer(blocks) {
    const kids = new Map();
    for (const b of blocks) {
      let child = b;
      for (let a = b.parentElement; a; child = a, a = a.parentElement) {
        if (!kids.has(a)) kids.set(a, new Set());
        kids.get(a).add(child);
      }
    }
    let best = null;
    let bestSize = 0;
    let bestDepth = -1;
    for (const [a, set] of kids) {
      const depth = depthOf(a);
      if (set.size > bestSize || (set.size === bestSize && depth > bestDepth)) {
        best = a;
        bestSize = set.size;
        bestDepth = depth;
      }
    }
    return bestSize >= 2 ? best : null;
  }

  // Chat UIs that carry no role tokens almost always separate the two sides
  // horizontally, so the bubble's offset inside the transcript tells us who
  // is speaking. Centered rows (date separators) come back as "full".
  function sideOf(el, container) {
    const c = (container || el.parentElement).getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (c.width < 80) return "full";
    const leftGap = r.left - c.left;
    const rightGap = c.right - r.right;
    if (Math.abs(leftGap - rightGap) < c.width * 0.12) return "full";
    return leftGap < rightGap ? "left" : "right";
  }

  // The operator's pick tells us which side the agent sits on; without it the
  // agent is assumed to be on the left, as in every WhatsApp-like transcript.
  function agentSide() {
    return learned && learned.side && learned.side !== "full" ? learned.side : "left";
  }

  function analyze() {
    const root = searchRoot();
    const all = textBlocks(root);
    if (!all.length) return null;
    const container = chatContainer(all);
    if (!container) return null;

    const blocks = all.filter(
      (b) => b !== container && container.contains(b) && !TIME_RE.test(extractText(b))
    );
    if (!blocks.length) return null;

    const turns = [];
    for (const b of blocks) {
      let node = b;
      while (node.parentElement && node.parentElement !== container) node = node.parentElement;
      if (node === container) continue;
      const last = turns[turns.length - 1];
      if (last && last.root === node) last.blocks.push(b);
      else turns.push({ root: node, blocks: [b] });
    }
    if (!turns.length) return null;

    for (const t of turns) {
      t.main = t.blocks.reduce((a, b) =>
        extractText(b).length >= extractText(a).length ? b : a
      );
      t.side = sideOf(t.main, container);
      t.text = t.blocks.map(extractText).filter(Boolean).join("\n");
      t.role = roleOf(t.main, t.root);
    }

    // Only trust left/right when the transcript actually uses both sides;
    // otherwise a centered date separator would read as a message.
    const sided =
      turns.some((t) => t.side === "left") && turns.some((t) => t.side === "right");
    if (sided) {
      for (const t of turns) {
        // A centered row in a two-sided transcript is a date separator or a
        // status banner, whatever its classes claim.
        if (t.side === "full") {
          t.role = null;
          continue;
        }
        if (!t.role) t.role = t.side === agentSide() ? "agent" : "user";
      }
    }

    return { container, turns, sided };
  }

  function fromLearnedSelector() {
    if (!learned || !learned.selector) return null;
    let nodes;
    try {
      nodes = document.querySelectorAll(learned.selector);
    } catch {
      return null;
    }
    for (let i = nodes.length - 1; i >= 0; i--) {
      const el = nodes[i];
      if (!isVisible(el)) continue;
      if (learned.side && learned.side !== "full") {
        const container = el.parentElement && el.parentElement.parentElement;
        if (sideOf(el, container) !== learned.side) continue;
      }
      return el;
    }
    return null;
  }

  function lastAgentMessage() {
    const saved = fromLearnedSelector();
    if (saved) return { text: extractText(saved), how: "selettore salvato" };

    const info = analyze();
    if (!info) return null;

    for (let i = info.turns.length - 1; i >= 0; i--) {
      const t = info.turns[i];
      if (t.role === "agent" && t.text) {
        return { text: t.text, how: info.sided ? "posizione" : "classi CSS" };
      }
    }

    const last = info.turns[info.turns.length - 1];
    if (!last || last.role === "user" || !last.text) return null;
    return { text: last.text, how: "ultimo blocco (incerto)" };
  }

  function buildTranscript() {
    const info = analyze();
    if (!info) return null;
    const lines = [];
    let agentTurns = 0;
    for (const t of info.turns) {
      if (!t.text) continue;
      if (!t.role && info.sided) continue;
      if (t.role === "agent") agentTurns++;
      const label = t.role === "agent" ? "Agente" : t.role === "user" ? "Utente" : "?";
      lines.push(label + ": " + t.text);
    }
    if (!lines.length) return null;
    return { text: lines.join("\n\n"), turns: lines.length, agentTurns };
  }

  /* ----------------------------------------------------------- pick mode */

  function deriveSelector(el) {
    const clean = (node) =>
      Array.from(node.classList).filter(
        (c) =>
          /^[a-z][a-z0-9_-]*$/i.test(c) &&
          !/^ng-/.test(c) &&
          !/^spk-copy-/.test(c) &&
          !/\d{4,}/.test(c) &&
          c.length < 40
      );

    let node = el;
    let suffix = "";
    for (let depth = 0; node && depth < 4; depth++, node = node.parentElement) {
      const classes = clean(node);
      const part =
        node.tagName.toLowerCase() + (classes.length ? "." + classes.join(".") : "");
      suffix = suffix ? part + " " + suffix : part;
      if (!classes.length) continue;
      try {
        const hits = document.querySelectorAll(suffix);
        if (hits.length && Array.from(hits).includes(el)) return suffix;
      } catch {
        /* keep widening */
      }
    }
    return null;
  }

  function onPickMove(e) {
    const el = e.target;
    if (!el || el.closest(".spk-copy-panel")) return;
    if (pickHighlight && pickHighlight !== el) pickHighlight.classList.remove("spk-copy-hl");
    pickHighlight = el;
    el.classList.add("spk-copy-hl");
  }

  function onPickClick(e) {
    if (e.target.closest(".spk-copy-panel")) return;
    e.preventDefault();
    e.stopPropagation();
    const target = e.target;
    const info = analyze();
    const side = sideOf(target, info ? info.container : null);
    const selector = deriveSelector(target);
    stopPicking();
    if (!selector) {
      toast("Non riesco a ricavare un selettore da quell'elemento.", true);
      return;
    }
    learned = { selector, side };
    chrome.storage.local.set({ [STORAGE_KEY]: learned });
    refreshResetButton();
    toast("Bolla memorizzata: " + selector);
  }

  function onPickKey(e) {
    if (e.key === "Escape") stopPicking();
  }

  function startPicking() {
    picking = true;
    document.body.classList.add("spk-copy-picking");
    document.addEventListener("mousemove", onPickMove, true);
    document.addEventListener("click", onPickClick, true);
    document.addEventListener("keydown", onPickKey, true);
    toast("Clicca su una bolla dell'agente (Esc per annullare).");
  }

  function stopPicking() {
    picking = false;
    document.body.classList.remove("spk-copy-picking");
    if (pickHighlight) pickHighlight.classList.remove("spk-copy-hl");
    pickHighlight = null;
    document.removeEventListener("mousemove", onPickMove, true);
    document.removeEventListener("click", onPickClick, true);
    document.removeEventListener("keydown", onPickKey, true);
  }

  /* ---------------------------------------------------------------- copy */

  async function writeClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    }
  }

  async function copyTranscript() {
    const t = buildTranscript();
    if (!t) {
      toast("Conversazione vuota o non riconosciuta.", true);
      return;
    }
    if (!(await writeClipboard(t.text))) {
      toast("Copia non riuscita.", true);
      return;
    }
    toast("Conversazione copiata: " + t.turns + " turni, " + t.agentTurns + " dell'agente.");
  }

  async function copyLastAgentMessage() {
    const hit = lastAgentMessage();
    if (!hit || !hit.text) {
      toast("Nessun messaggio agente trovato. Usa \u00ab Scegli bolla \u00bb.", true);
      return;
    }
    if (!(await writeClipboard(hit.text))) {
      toast("Copia non riuscita.", true);
      return;
    }
    const preview = hit.text.length > 70 ? hit.text.slice(0, 70) + "\u2026" : hit.text;
    toast("Copiato (" + hit.how + "): " + preview);
  }

  /* ------------------------------------------------------------------ ui */

  function toast(msg, isError) {
    if (!panel) return;
    const el = panel.querySelector(".spk-copy-toast");
    el.textContent = msg;
    el.classList.toggle("spk-copy-toast-error", !!isError);
    el.classList.add("spk-copy-toast-on");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("spk-copy-toast-on"), 5000);
  }

  function mount() {
    if (panel) return;
    panel = document.createElement("div");
    panel.className = "spk-copy-panel";
    panel.innerHTML =
      '<div class="spk-copy-toast"></div>' +
      '<div class="spk-copy-row">' +
      '<button type="button" class="spk-copy-btn spk-copy-all">Copia conversazione</button>' +
      '<button type="button" class="spk-copy-btn spk-copy-main" title="Copia solo l\'ultima risposta dell\'agente">Solo ultima</button>' +
      '<button type="button" class="spk-copy-btn spk-copy-pick" title="Insegna all\'estensione quale elemento \u00e8 la bolla dell\'agente">Scegli bolla</button>' +
      '<button type="button" class="spk-copy-btn spk-copy-reset" title="Dimentica il selettore salvato">Reset</button>' +
      "</div>";
    panel.querySelector(".spk-copy-all").addEventListener("click", copyTranscript);
    panel.querySelector(".spk-copy-main").addEventListener("click", copyLastAgentMessage);
    panel.querySelector(".spk-copy-pick").addEventListener("click", () =>
      picking ? stopPicking() : startPicking()
    );
    panel.querySelector(".spk-copy-reset").addEventListener("click", () => {
      learned = null;
      chrome.storage.local.remove(STORAGE_KEY);
      refreshResetButton();
      toast("Selettore dimenticato, torno al rilevamento automatico.");
    });
    document.body.appendChild(panel);
    refreshResetButton();
  }

  // Inline style, not [hidden]: `all: unset` on the buttons outranks the UA
  // rule that would otherwise hide them.
  function refreshResetButton() {
    if (!panel) return;
    panel.querySelector(".spk-copy-reset").style.display = learned ? "" : "none";
  }

  function unmount() {
    if (picking) stopPicking();
    if (panel) panel.remove();
    panel = null;
  }

  function sync() {
    if (PATH_RE.test(location.pathname)) mount();
    else unmount();
  }

  chrome.storage.local.get(STORAGE_KEY, (data) => {
    learned = data[STORAGE_KEY] || null;
    refreshResetButton();
  });

  // Spoki is a SPA: route changes do not re-run the content script.
  for (const method of ["pushState", "replaceState"]) {
    const original = history[method];
    history[method] = function (...args) {
      const out = original.apply(this, args);
      setTimeout(sync, 0);
      return out;
    };
  }
  window.addEventListener("popstate", sync);
  sync();
})();
