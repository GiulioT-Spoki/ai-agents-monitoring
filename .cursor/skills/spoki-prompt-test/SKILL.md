---
name: spoki-prompt-test
description: >-
  Test Spoki AI agent system prompts (testuali e vocali) in playground or live:
  create prompt + test-suite with Notion identity metadata, pre-check tools/KB,
  run P0–P2 scenarios turn-by-turn, score Pass/Fail only against the actual
  prompt, fix real fails, export prompt for client sync, draft CS/AM handoff,
  generate a client-facing scenarios PDF under clients-prompt/_exports, emit a
  YAML suite matching agent-test-suite.schema.json (packs core/booking/support/voice),
  and on suite closeout upsert the Notion hub (Agenti + Documenti
  Prompt/Suite/KB/Report PDF + Changelog). Use when testing a Spoki prompt,
  playground, live agent, voice agent metadata/Notion sync, CASP/CUP booking
  agent, building a *-test-suite.md or *-suite.yaml under
  clients-prompt, or producing a client test report PDF.
---

# Spoki prompt test

## Goal

Validate a Spoki agent against **its own** system prompt. Do not invent extra
rules (e.g. ban emoji only if the prompt bans emoji).

Scenario workflow is optimized for **Testuale** (WhatsApp/playground). For
**Vocale**, collect the same identity metadata and run the same Notion closeout.
The voice playground has **no contact**, so `%%FIELDS%%` are empty there: build a
textual twin as the test bench, keep voice for a short overlay, and use a Spoki
Voice automation when the call needs real field values (see §3b).

## Repo conventions

| Artifact | Path pattern |
| --- | --- |
| Prompt (debug header + Spoki body) | `clients-prompt/{accountId}-{slug}.md` |
| Test suite (human) | `clients-prompt/{accountId}-{slug}-test-suite.md` |
| Test suite (executable) | `clients-prompt/{accountId}-{slug}-suite.yaml` |
| KB (repo, authoring) | `clients-kb/{accountId}-*.md` (+ raw csv/pdf if needed) |
| KB export for Spoki | `~/Downloads/{accountId}-{kb-slug}.txt` — **never** `.md` (Spoki rejects markdown uploads) |
| Client PDF | `clients-prompt/_exports/{Client}-scenari-test-agente-{slug}.pdf` |
| JSON Schema | [schema/agent-test-suite.schema.json](schema/agent-test-suite.schema.json) |
| Packs | [packs/core.yaml](packs/core.yaml), [packs/booking.yaml](packs/booking.yaml), [packs/support.yaml](packs/support.yaml), [packs/voice.yaml](packs/voice.yaml) |
| Spoki product spec (L1–L3) | [product/spoki-agent-test.md](product/spoki-agent-test.md) |

Slug = agent purpose in kebab-case (e.g. `centro-unico-prenotazioni`). One
account can have **multiple** agents (variants / text vs voice) → distinct slug
+ distinct suite header **Agente** / **Link Spoki**.

Debug header (never paste into Spoki): identity fields below, KB links, test
suite link, sync date. Spoki paste = section `# System prompt (Spoki)` only.

Templates: [templates.md](templates.md) (markdown + YAML). Product Test tab / sandbox / judge: [product/spoki-agent-test.md](product/spoki-agent-test.md).

## Notion hub (IDs)

Hub: [Agenti testuali e vocali clienti](https://app.notion.com/p/spokiapp/Agenti-testuali-e-vocali-clienti-3b9e5c7af25c80fd8705f8561a2eed09)

Playbook (team onboarding): [Playbook — AI prompt testing](https://app.notion.com/p/3c0e5c7af25c8146909cd57cc9e5bd8c)

Install page (paste in Cursor to write the skill locally): [Install — Spoki prompt test (Cursor)](https://app.notion.com/p/3c0e5c7af25c816bb377d37ef43c177e)

Twin install page under the Post Sales hub, same attachments: [Install — Spoki prompt test (Cursor)](https://app.notion.com/p/3cfe5c7af25c81ceacacc5a4ec9fe8c8)

After editing this skill, re-upload `SKILL.md` and `templates.md` on **both** Install pages. Also keep `schema/`, `packs/`, and `product/` in the Cursor skill folder (install pages can attach them or point to the repo copy).

| DB | data_source_id |
| --- | --- |
| Agenti | `2e193fcc-0cad-49fd-afe7-51a3bd9207b3` |
| Changelog | `f8a9c9ce-aa1a-4f54-b13d-18517d9e899d` |
| Documenti | `8746aac9-c515-4ed9-ab31-29fe23b7a478` |

## Workflow

### 1. Orient

Collect and write into suite header **and** prompt debug header (required unless
noted):

| Field | Required | Notes |
| --- | --- | --- |
| Account Spoki | yes | numeric account id |
| Cliente | yes | display name |
| Agente | yes | variant title, e.g. `Vendita — chiusura estiva` |
| Tipo | yes | `Testuale` \| `Vocale` |
| Ambiente | yes | `Playground` \| `Live` \| `Entrambi` |
| Link Spoki | strongly | `https://app.spoki.com/ai/agent/{uuid}` — preferred Notion match key |
| Path prompt / Path suite / Path KB | yes | rich text `[Prompt {short}](https://app.notion.com/p/{id})` (or KB/Listino labels) to Documenti, same pattern as Account Spoki; never URL-type, never repo paths, never `http://file.md` |

Also:

- Prefer a **test agent copy** for prompt iteration.
- Load current prompt file (or create it from Spoki paste).
- Import any KB files the user provides into `clients-kb/` as `.md` with readable
  names; note gaps (missing FAQ, wrong PDF content). Keep repo KB in markdown;
  when exporting for Spoki upload, write `.txt` copies to Downloads (see Fix
  loop / Exports). Then run **§1b KB hygiene** before pre-check / scenarios.

If Account Spoki or Agente is missing, **stop and ask** before building the
suite.

### 1b. KB hygiene (unify and clean)

Optimizing the KB is often what unblocks FAQ/P0, not a prompt tweak. Do this
**before** scoring retrieval scenarios. Do **not** auto-merge 40 PDFs without
the operator: unification is judgment (conflicts, char limit, what belongs in
the prompt).

1. Treat URL scrape and PDF dumps as **sources**, not files to attach. They
   carry nav, cookie banners, and XML/layout tags. Rewrite facts into markdown
   (prose / FAQ) or CSV (listini, turni, cataloghi).
2. **Facts only** in the KB. Tone, transfer, tool-call rules stay in the
   system prompt. Drop scrape duplicates, import timestamps, and “how to
   answer” lines.
3. **Unify** into one operational file `{accountId}-{slug}-kb.md` when it fits
   the platform char cap (~16k per markdown doc). Extra files only for CSV
   tables or a split forced by that cap — not one PDF per page. Keep a
   `{accountId}-*-kb-index.md` in repo for CS; **do not** upload the index.
4. Spoki upload: `.txt` (same bytes as the operational `.md`) + `.csv`. Never
   `.md` (rejected). Never attach the raw scrape/PDF to the live/test agent.
5. Pattern: LetsMove one facts file; Calatafimi 3 operational md + listini CSV.

If P0 FAQ fails after a clean unified KB, then score as prompt vs retrieval.
If the agent still cites menus or XML, classify **kb** / platform ingest, not
a prompt Fail.

### 2. Pre-check (suite checklist)

Before scenarios: prompt sync, KB linked, tools present
(`search_knowledge_base`, `get_current_datetime`, calendar tool if used,
`transfer_to_human`), contact phone, Langfuse open from the Agenti
**Langfuse** cell (Testuale →
[ai-production](https://langfuse.ai.spoki.com/project/cmmxdg3y70004oa073ytjt9md/traces),
Vocale →
[voice-agent](https://langfuse.ai.spoki.com/project/cmrw46ply0008o207yxewv4v1/traces);
the formula adds `searchType=id&searchType=content&search={agent id}`),
clear between scenarios when possible. A useful *single* trace URL goes in
suite Note / Changelog.

If live chat **cannot** be cleared: plan recovery messages (corrections) instead
of assuming Clear.

### 3. Build suite from the prompt

Derive scenarios from prompt sections (booking, FAQ, transfer, calendar,
clinical limits). Order:

1. **P0** — greeting / intent / core happy path / transfer / create if applicable
2. **P1** — guardrails (clinical, out-of-area, no inventing prices)
3. **P2** — edge (tu/Lei, complaints, multi-patient)

Each scenario: ID, atteso (cite prompt rule), Pass column, copy-paste user script.

Also write **`{accountId}-{slug}-suite.yaml`** in the same folder, valid against
[schema/agent-test-suite.schema.json](schema/agent-test-suite.schema.json):

1. Set `agent`, `prompt.sync_date`, and `prompt.version_id` (hash or revision of
   the `# System prompt (Spoki)` body).
2. Choose packs: **core** for every textual agent; **booking** if the prompt
   uses calendar/CUP/Tuotempo/GHL create; **support** if FAQ/ticket/manual;
   **voice** only if `agent.tipo` is `Vocale` (overlay, not a full second suite).
3. Instantiate from [packs/](packs/): copy a scenario only when
   `require_prompt_rule` matches the current prompt. If it does not match,
   **omit** the scenario (do not Fail).
4. Replace every `{{PROMPT: …}}` placeholder with a real citation in
   `expect.rule`. Replace `{{variables}}` from the suite header / client.
5. Custom P0–P2 IDs from this agent stay in YAML with ids like
   `{slug}.h1` (lowercase, dots). Keep the markdown tables in sync (same ids
   where possible: markdown `H1` ↔ yaml `casp.h1`; markdown `V-H1` ↔
   `federica.v-h1`).
6. `tools_required` / `kb_required` / `side_effects` must match what the
   prompt actually uses. `calendar_create` → `environment: playground` and
   `agent.test_copy: true`.

### 3b. Vocale — the voice playground is not the test bench

**Platform constraint, not a preference.** The voice playground (Start Call)
runs **without a contact**: every `%%FIELD%%` resolves empty. The textual
playground lets you pick a test contact with populated fields. So any scenario
that depends on contact data (X0 `%%TARGA_VEICOLO%%`, `%%RIPORTAL_JWT%%`,
`%%INCARICO_ID%%`; outbound `%%FIRST_NAME%%`) is **not runnable** in the voice
playground. On top of that, each voice run is a real-time spoken call: it does
not scale past a couple of scenarios per session.

Therefore: **build a textual twin for every voice agent.** It is a setup step,
not an opportunistic shortcut.

| Where | `environment` | What runs there |
| --- | --- | --- |
| Textual twin + test contact | `twin_text` | All logic: tool order, normalization, JSON handling, anomalous closes, guardrails, FAQ. No phone call. |
| Voice playground (Start Call) | `voice_playground` | Only what needs no contact data: spoken concision, one question, tool-name leak, JWT/JSON spoken, confirm-after-tool. |
| Spoki Voice automation → test contact | `voice_outbound` | Final smoke with **populated** fields. One or two calls, not fifteen. |

1. **Twin** — create a Testuale agent on the same account with the **same**
   `# System prompt (Spoki)` body and the same tools bound under the same names.
   Set `agent.twin_text_link` and `agent.test_contact` in the YAML. Run Core /
   Booking / Support and every custom logic ID there with `suite-run`. Federica
   is the existing example (`V-L1` / `V-CANC` Skip: “copertura via testuale”).
2. **Overlay** — instantiate [packs/voice.yaml](packs/voice.yaml) only when
   `require_prompt_rule` matches: short turns, one question, no `[call tool]` /
   tool names, no JWT/JSON/field names spoken, confirm after tool success, ASR
   normalize. These carry `environment: voice_playground` and
   `requires_contact_fields: false`. Concatenate them into **one** call.
3. **Outbound smoke** — the happy path that needs real field values (X0
   L1→D1→C1→V1) is `environment: voice_outbound`,
   `requires_contact_fields: true`. Configure a Spoki Voice automation toward
   the test contact. Do not attempt it from the voice playground: `suite-run`
   auto-Skips it with the reason.
4. **Piattaforma** — HTTP 400, malformed body, silence/noise with no prompt
   rule, playground without chat (SUNTO): Skip. Do not burn calls injecting
   fails you cannot force.

Write the prompt so it survives empty fields (treat as unknown and ask, one at a
time). That single habit is what makes `voice_playground` usable at all.

Voice scoring evidence (do not listen to every word): spoken transcript,
Langfuse **voice-agent** span (tool name, args, observation), absence of leak
(`[call tool`, JWT, JSON). Prompt patterns that cheapen tests: intent+order in
prose (never teach `[call tool …]` syntax); JSON/JWT internal-only; KB facts
`.txt` not PDF/scrape. Do not mark `live_ok` unless the scenario is a live
smoke.

### 4. Run turn-by-turn

For each turn:

1. Give the user **exactly one** message to send (or attach).
2. Wait for agent reply / tool JSON.
3. Score **Pass / Fail / Skip / Pass\*** against the prompt only.
4. Update the suite **markdown and YAML** immediately (`score`,
   `client_outcome`, notes).
5. Give the next message.

Separate **platform findings** (PDF never hits Langfuse, playground no upload)
from **prompt fails**.

When evaluating calendar tools: compare create payload and availability I/O to
what the prompt actually requires (do not apply obsolete prompt schemas).

### 5. Fix loop

On Fail:

1. Patch only the failing rules in `# System prompt (Spoki)`.
2. Bump sync note in debug header.
3. Export to Downloads:
   - `{accountId}-{slug}-system-prompt.txt` (body only, for Spoki paste)
   - any KB files the client must re-upload → `~/Downloads/{accountId}-{kb-slug}.txt`
     (copy from repo `.md`; same content, **`.txt` extension only** — Spoki does not
     accept `.md`)
4. User / client re-syncs Spoki → re-test **failed IDs only** (+ short regression).

### 6. Handoff

Short note for CS/AM: what works, real fails left, platform/KB gaps, what to tell
the client, whether they paste the prompt themselves.

### 7. Client report (PDF) — default on suite close

When the suite is concluded (P0 done or user says suite is closed), **always**
produce the client-facing report (unless user says skip PDF), then run §8.

Modeled on LetsMove (`_exports/LetsMove-scenari-test-agente-Momo.md`):

1. Write markdown under `clients-prompt/_exports/`:
   `{Client}-scenari-test-agente-{slug}.md`
2. Tone: professional Italian for the customer — describe **what was checked**,
   not internal Pass/Fail IDs (H1, C1…). Mention verified outcomes, prompt fixes
   from feedback/tests, platform/KB gaps in plain language, and operational next
   steps.
3. Include: agent name, account ID, Spoki agent URL, verification date,
   environment (playground/live), Tipo if relevant.
4. Render PDF with gstack make-pdf:
   `$HOME/.claude/skills/gstack/make-pdf/dist/pdf generate <md> <pdf>`
5. Copy PDF (+ optional md) to `~/Downloads/` for sending.
6. Template: [templates.md](templates.md) § Client report.
7. Continue to **§8 Notion closeout**.

### 8. Notion closeout — default on suite close

Run **always** after §7 (unless user says `skip Notion`). Upsert even if the
Agente row did not exist yet.

#### 8a. Upsert Agenti

1. Query Agenti (`notion-query-data-sources` on Agenti data source):
   - If **Link Spoki** is set → match on that URL.
   - Else match `Account Spoki` + `Nome` (title = suite **Agente**).
2. **Create** (`notion-create-pages`) if no row; **update**
   (`notion-update-page`) if found. Set: Nome, Cliente, Account Spoki as
   `[id](https://admin.spoki.com/wazy/account/{id}/change/)` (numeric id is the
   cell label, admin URL is the hyperlink), Tipo,
   Ambiente, Link Spoki, Stato, Priorità (from suite
   outcomes), `Ultimo test` = today. Set `Ultimo sync prompt` when a prompt
   sync happened this session. Set **Owner** per the rule below.
   Set **Path prompt** / **Path suite** / **Path KB** / **Report PDF** only
   after §8b/§8d. They are rich text markdown
   `[short title](https://app.notion.com/p/{id})` to the Documenti page (same
   cell pattern as Account Spoki). Never URL-type columns, never repo paths,
   never `http://file.md`.
3. Do **not** wipe useful existing Note; append a short session line if needed.
4. **Blocchi esterni:** leave empty unless there is a real blocker; if Stato =
   `Bloccato cliente`, set ≥1 tag (hub convention).

**Owner** (person — Notion user ID, not an email string):

1. Resolve the operator: `notion-get-users` with `user_id: "self"`. Use that
   person if `type` is `person` (email is the Notion-connected account; in
   Cursor this is usually the same as the Cursor login, e.g.
   `giulio.trinchera@spoki.com`).
2. If `self` is a bot or has no person id: `notion-get-users` `query` = operator
   email if the user stated it this session; else `notion-search`
   `query_type: "user"` with that email. Do **not** hardcode an email or user
   id in the skill.
3. Set `Owner` to a JSON array of that resolved user id, e.g. `["<notion-user-id>"]`.
4. On **create**: always set Owner. On **update**: set Owner only if empty;
   do not overwrite a different existing Owner unless the user asks.

**Stato** from suite outcomes:

| Condition | Stato |
| --- | --- |
| P0 green, no client blocker; Ambiente Playground/Entrambi | `Verificato playground` |
| Same + Ambiente Live and prompt synced live | `Live sync OK` |
| Open Fail still in fix | `Fix in corso` |
| Waiting on client/CRM/KB/auth | `Bloccato cliente` |
| Suite started only | `In test` |

#### 8b. Documenti Prompt + Suite + Report PDF

Collaborators open Notion only. **Never** write a local filesystem path into
Agenti `Path prompt`, `Path suite`, `Path KB`, or `Report PDF`. Those columns
are **rich text** (not URL type). Repo paths belong only on Documenti.**Path
repo**, as inline code (backticks). Notion auto-linkifies bare `file.md` into
`http://file.md`, which does nothing useful when clicked.

**Prompt** (Tipo=`Prompt`)

1. Find Documenti with Tipo=`Prompt` related to this Agente; else create
   (`notion-create-pages` on Documenti). Title e.g. `Prompt Spoki — {Nome}`.
2. Body = section `# System prompt (Spoki)` from the prompt file (no debug
   header). `replace_content` if the page already exists.
3. Set Path repo = `` `clients-prompt/{file}.md` `` (backticks
   required). Ultimo sync = today, Agente relation.
4. Agenti.**Path prompt** = `[Prompt {short}](https://app.notion.com/p/{id})`
   of that Documenti page.
5. Append the page on Agenti.**Documenti** if missing.

**Suite** (Tipo=`Suite`)

Same pattern. Body = the test-suite markdown (Pass/Fail tables included).
Agenti.**Path suite** = `[Suite {short}](https://app.notion.com/p/{id})`.

**Report PDF** (Tipo=`Report PDF`)

1. `notion-create-file-upload` for the PDF → multipart POST to `upload_url`.
2. Find Documenti with Tipo=`Report PDF` + same Agente; else create. Body:
   short note + `<pdf src="file-upload://…">`.
3. Agenti.**Report PDF** = `[Report PDF {short}](https://app.notion.com/p/{id})`
   (rich text, not a URL property, not a Files property).
4. Append Documenti relation on Agente if missing.

#### 8c. Changelog

1. Row Categoria=`Deliverable cliente`, Link artefatto=Documenti URL, Trigger=
   `Setup` (first time) or `Manutenzione`, Sync Spoki as appropriate, Re-test
   `N/A` or suite result.
2. Optional second row Categoria=`Suite`, Re-test=`Pass` / `Pass*` / `Pending`,
   Cosa cambiato = short suite summary.

#### 8d. Documenti KB (+ Listino)

Collaborators open Notion only. Same Path repo rule as §8b: backticks, never
bare `file.md` (Notion turns it into `http://file.md`). Human titles
(`KB 01 — …`), not the filename.

**KB** (Tipo=`KB`)

1. Find Documenti with Tipo=`KB` + same Agente + same Path repo; else create.
2. Body = the full KB markdown from `clients-kb/` (or the file Path repo
   points to). Do **not** stop after the first heading. `replace_content` if
   the page exists and the body is blank, truncated, or stale vs repo.
3. Path repo = `` `clients-kb/{file}` `` (backticks required).
   Ultimo sync = today, Agente relation to a **live** Agenti row (never a
   deleted page).
4. Append the page on Agenti.**Documenti** if missing.
5. Agenti.**Path KB** = rich text markdown links to those Documenti pages,
   e.g. `[KB 01](https://app.notion.com/p/{id}) · [KB 02](https://app.notion.com/p/{id})`.
   Include Listino pages in the same cell. Multiple KB: join with ` · `.

**Listino** (Tipo=`Listino`)

CSV pages are for collaborators, not a Spoki upload. If the CSV has more
than ~200 rows: body = note + anteprima (first ~100 rows) in a code fence;
full file stays in Path repo. Do not dump 1000+ row CSVs into Notion.

Return Notion Agente URL + Report PDF URL in the handoff note.

## Pass / Fail rules

| Label | Meaning |
| --- | --- |
| Pass | Meets cited prompt rule |
| Pass\* | Core OK; minor non-blocking note |
| Fail | Violates an explicit prompt rule |
| Skip | Blocked by platform/KB/tool limits |

Never Fail on criteria absent from the prompt under test. Never instantiate a
pack scenario whose `require_prompt_rule` is not in the prompt (omit it).

Client-facing labels (`expect.client_label`, `client_outcome`) map Pass →
`verificato`, Fail → `da_correggere`, Skip → `non_eseguibile`. Do not put
internal IDs in client copy. See [product/spoki-agent-test.md](product/spoki-agent-test.md).

## Anti-patterns

- Testing the wrong prompt file (obsolete draft vs live)
- Treating transfer as Fail when KB has no answer (often correct)
- Continuing P1 before P0 booking/create is understood
- Writing long summary docs; update the suite file instead
- Closing a suite without PDF + Notion closeout (unless user skipped)
- Matching Notion only by Account Spoki when multiple agents share the account
  (use Link Spoki or Nome variante)
- Inventing Blocchi esterni when there is no real blocker
- Exporting KB to Downloads as `.md` for Spoki upload (use `.txt`; keep `.md` only in repo)
- Writing repo paths, URL-type cells, or fake `http://file.md` links into
  Agenti Path prompt / Path suite / Path KB / Report PDF (those columns must
  be rich text `[label](Notion Documenti URL)`, like Account Spoki)
- Emitting YAML with leftover `{{PROMPT: …}}` placeholders
- Running `side_effects: calendar_create` (or tag) against a live agent
- Using a global rubric (emoji, tu/Lei) in YAML `expect` when the prompt omits it
- Linking raw scrape or PDF dumps to the agent instead of a rewritten facts file
- Leaving several overlapping narrative KB docs on the agent when one operational file would fit (hurts debug)
