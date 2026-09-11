# Spoki — Test agente (L1–L3)

Product spec for the **Test** surface on the agent page. Same quality contract as skill `spoki-prompt-test`: score only against the current system prompt; prompt fail ≠ KB/tool/platform skip. Internal Pass/Fail IDs stay off the client UI.

Canonical suite schema: [`../schema/agent-test-suite.schema.json`](../schema/agent-test-suite.schema.json). Packs: [`../packs/core.yaml`](../packs/core.yaml), [`../packs/booking.yaml`](../packs/booking.yaml), [`../packs/support.yaml`](../packs/support.yaml), [`../packs/voice.yaml`](../packs/voice.yaml) (Vocale overlay only).

## Client copy (all levels)

| Internal | Client |
| --- | --- |
| Pass / Pass* | Verificato |
| Fail | Da correggere |
| Skip | Non eseguibile (tool / knowledge base / piattaforma) |

Show: scenario title (`expect.client_label`), transcript, one-sentence prompt rule, next step (`aggiorna la knowledge base: testo o CSV puliti, un file di fatti` / `collega il tool X` / `il prompt contraddice il tool`). Never Langfuse, Notion paths, git, Pass*.

CS (impersonate or admin): run id, `classify_on_fail`, test-copy agent URL.

Do not auto-patch live system prompt. Suggestions only as draft.

## Knowledge base ingest (quality, not a cleaner)

FAQ P0 often fails because the **source** is dirty, not because the prompt is wrong. URL scrape and PDF upload are entry doors: they pull in nav, cookie banners, and XML/layout tags, and the agent will retrieve that noise. Reliable formats: **structured text** (author in markdown; Spoki today accepts `.txt`, not `.md`) and **CSV** for tables (prices, shifts, catalogs).

Default on the agent: **one** operational facts file (debug). Extra files only for CSV listini or a platform char cap, not one PDF per page. Do not promise an in-product XML/PDF destrezza in L1. Show a clear warning + guide to text/CSV. A later “ripulisci e unifica” flow is optional engineering, not this MVP.

Client copy (KB screen or Test next-step):

> Carica testi e tabelle puliti (file di testo o CSV). Lo scrape del sito e i PDF spesso includono menu e codice: l’assistente può citarli.

---

## L1 — Tab Test (assisted)

Place: tab or panel **Test** next to playground, not a separate Eval product.

### Setup

1. Detect use case from agent template, or let the client pick pack **Core** plus **Booking** or **Support**.
2. Show pack `variables` as labeled fields (Italian `client_label`). Required vars must be non-empty.
3. Instantiate: for each pack scenario, if `require_prompt_rule` is not in the current prompt, **omit** it (do not Fail).
4. Fill `expect.rule` from the live prompt. If the model cannot cite a real excerpt, drop the scenario.
5. Pre-check (client wording): prompt saved, knowledge base linked if `kb_required`, listed tools present, conversation can be cleared. Missing tool/KB → Non eseguibile before they paste.

### Run

Playground shows one scenario at a time (P0 before P1). Copy-paste `script[].text`. After the agent replies, client (or CS) marks Verificato / Da correggere / Non eseguibile.

Clear between scenarios when the UI allows; otherwise show a recovery line (“nuova richiesta, dimentica il contesto precedente”).

Booking pack with `side_effects: calendar_create`: L1 copy must say to use the **test copy** agent. Do not offer L1 on live for those scenarios.

### Persist

Save suite JSON matching the schema (agent + prompt.version_id + scenarios + scores). Markdown/PDF remain CS export, not the client source of truth.

Pilot: Core + Support on a Mario-like agent; Core + Booking on a CUP-like test copy (LetsMove-style FAQ without calendar is Core + Support, not Booking).

---

## L2 — Sandbox API

Do not ship Booking auto-play until calendar tools are mockable.

### Constraints

- `agent.test_copy === true` required for any scenario with `side_effects != none`.
- Isolated contact; **clear conversation** after each scenario.
- Tools with side effects: **dry-run / mock**. `calendar_create` must not write the live calendar. `transfer` / `tag` must not mutate production contacts.
- If a name in `tools_required` is missing, or `kb_required` and no KB is linked → outcome `non_eseguibile`, classification `tool` or `kb`. Do not call the model.
- Default environment `playground`. Ignore `live_ok` until an explicit live smoke exists.

### HTTP (proposal)

Base: authenticated Spoki API, agent-scoped.

`POST /ai/agents/{agent_id}/test-runs`

```json
{
  "mode": "sandbox",
  "packs": ["core"],
  "variables": { "greeting_message": "Ciao" },
  "suite": null,
  "prompt_version_id": "<opaque>"
}
```

Either `packs` (instantiate server-side) or `suite` (full document). Reject if `prompt_version_id` ≠ prompt currently saved on the agent.

Response: `{ "run_id", "status": "queued|running|completed|failed", "scenarios": ["core.greeting", ...] }`

`GET /ai/agents/{agent_id}/test-runs/{run_id}` — per scenario: transcript, tool JSON, `client_outcome`, `classify_on_fail`.

`POST /ai/agents/{agent_id}/test-runs/{run_id}/cancel`

Runner loop per scenario: create sandbox thread → send `script` turns in order → capture assistant text + tool calls → clear → next. Stop P1 if any P0 is `da_correggere` only when the client opted into “stop on first P0 fail”; default is run all P0 then P1.

### Mock registry

| `side_effects` | Mock |
| --- | --- |
| `none` | Real tools OK (KB search, datetime) |
| `transfer` | Record call, do not route to human queue |
| `tag` | Record payload, do not write CRM |
| `calendar_create` | Validate args against prompt `expect`; return fake event id |

---

## L3 — Judge, regression, CS webhook

### Judge

Input only:

- `expect.rule` + optional `prompt_section` from the **version stored on the run**
- transcript + tool trace for that scenario
- `classify_on_fail` hint

Output: `client_outcome`, optional `internal_score`, one sentence `rationale` that quotes the expect rule. **No global rubric** (emoji, tu/Lei, markdown) unless that text is in `expect.rule`.

If tools/KB were missing, skip the judge (`non_eseguibile`).

Store `prompt.version_id` (hash of `# System prompt` body) on every run. Re-judging with a newer prompt is a new run.

### Regression triggers

Re-run P0 scenarios that last scored `verificato` when:

- system prompt is saved, or
- knowledge base file set changes (upload/replace/delete)

Do not re-run `calendar_create` against live. Badge on the agent: **Ultimo test** = date of last completed run; amber if prompt/KB is newer than that run.

### CS webhook (Notion hub)

On run complete (and on L1 client submit of a full P0 set), POST to the internal hub (n8n or Notion integration):

| Hub field | Value |
| --- | --- |
| Link Spoki | agent URL |
| Ultimo test | run completed date |
| Stato | `Verificato playground` if all P0 `verificato` and no client blocker; `Fix in corso` if any `da_correggere`; `Bloccato cliente` if all blockers are `non_eseguibile` on KB/auth; `In test` if partial |
| Note | append `run_id` + counts (verificato / da_correggere / non_eseguibile) |

Do not write repo paths into Agenti Path\* columns. Path\* stay CS/skill closeout.

Payload sketch:

```json
{
  "agent_id": "<uuid>",
  "account_id": "53298",
  "link_spoki": "https://app.spoki.com/ai/agent/<uuid>",
  "run_id": "<uuid>",
  "prompt_version_id": "<hash>",
  "completed_at": "2026-09-04T12:00:00Z",
  "p0": { "verificato": 4, "da_correggere": 0, "non_eseguibile": 1 },
  "stato": "Verificato playground"
}
```

Voice: same schema; L2 runner is traces/ASR, after text sandbox is stable.

### Voice playground has no contact (blocking for voice testing)

The voice playground (Start Call) runs without a contact, so every `%%FIELD%%`
resolves empty. The textual playground lets the operator pick a contact with
populated fields. Consequence: **any voice agent driven by contact data cannot
be validated in its own playground** (X0 Credenziali 56588 is the reference case
— `%%TARGA_VEICOLO%%`, `%%RIPORTAL_JWT%%`, `%%INCARICO_ID%%`). Today the only
voice path with populated fields is a Spoki Voice automation placing a real call
to a test contact, which costs a live spoken call per run.

Current workaround in the skill (`environment` values in the suite schema):

| Where | Value | Scales? |
| --- | --- | --- |
| Textual twin + test contact | `twin_text` | Yes — no call, full logic coverage |
| Voice playground | `voice_playground` | Only scenarios needing no contact data |
| Spoki Voice automation → test contact | `voice_outbound` | One or two smoke calls |

Asks for product, in order of value: (1) let the voice playground bind a contact
like the textual one does; (2) L2 replay of `script` turns against a voice agent
with captured traces. Until (1) exists, every voice suite pays for a textual twin
agent that only exists to be testable.

Until L2 exists, CS scores a **voice overlay** (`packs/voice.yaml`) plus Langfuse
`voice-agent` spans. Intent P0 stays on the textual twin; webhook injection and
First Message UI mismatches are `non_eseguibile` / platform, not prompt fails.
