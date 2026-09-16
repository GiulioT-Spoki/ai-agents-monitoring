# Templates — Spoki prompt test

## Prompt file skeleton

```markdown
# {accountId} — {Agent Name} (test)

> Metadati debug — non includere in Spoki

- Account Spoki: {accountId}
- Cliente: {client}
- Agente: {name} (copia di test | live)
- Tipo: Testuale | Vocale
- Ambiente: Playground | Live | Entrambi
- Link Spoki: https://app.spoki.com/ai/agent/{uuid}
- Path prompt: clients-prompt/{accountId}-{slug}.md
- Path suite: clients-prompt/{accountId}-{slug}-test-suite.md
- Path suite YAML: clients-prompt/{accountId}-{slug}-suite.yaml
- KB: [link]
- Test: [{accountId}-{slug}-test-suite.md]({accountId}-{slug}-test-suite.md)
- Sync prompt Spoki: {date}

---

# System prompt (Spoki)

{paste verbatim from Spoki / authoring}
```

### Spoki body — actions and backticks

Inside `# System prompt (Spoki)` only:

- Write actions as bare tokens, e.g.
  @@action:create_ticket?owner_id=64364@@
  (never `` `@@action:…@@` ``, never quotes around the whole action).
- Prefer plain names for CSV columns / chiavi / field codes; avoid wrapping
  every identifier in backticks (leaks into WhatsApp).
- Dynamic fields: %%FIELD_CODE%%.
- Full rules: [SKILL.md](SKILL.md) § Spoki prompt body syntax.

## Suite file skeleton

```markdown
# {client} {accountId} — Test suite {Ambiente} {Agente}

**Account Spoki:** {accountId}
**Cliente:** {client}
**Agente:** {name variante}
**Tipo:** Testuale | Vocale
**Ambiente:** Playground | Live | Entrambi
**Link Spoki:** https://app.spoki.com/ai/agent/{uuid}
**Prompt:** [`{accountId}-{slug}.md`]({accountId}-{slug}.md)
**Path suite:** `clients-prompt/{accountId}-{slug}-test-suite.md`
**Path suite YAML:** `clients-prompt/{accountId}-{slug}-suite.yaml`
**KB:** …

## Come iniziare ora
1. Agente test (o live se imposto) — conferma Link Spoki
2. Sync prompt
3. KB hygiene (§1b): fatti in md/CSV, un file operativo se entra nel tetto, no scrape/PDF crudi
4. Clear tra scenari se possibile
5. Checklist: only rules present in the prompt

## Pre-check Spoki
| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati Notion (Account, Cliente, Agente, Tipo, Ambiente, Link) | ☐ |
| 2 | Copia test vs live | ☐ |
| 3 | Prompt sync | ☐ |
| 4 | KB: fatti-only, unificata (o split solo per 16k / CSV listini); upload `.txt`+`.csv`; no scrape/PDF raw | ☐ |
| 5 | Langfuse (cella Agenti, o ai-production / voice-agent) | ☐ |
| 6–9 | Tools | ☐ |

## Mismatch / platform findings
| Area | Prompt | Reality | Note |
| --- | --- | --- | --- |

## Scenari
### P0
| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |

### Script per ID
1. Invia: `…`
2. Atteso: …

## Fix e re-test
…

## Esiti
| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |

## Criteri pronto
- [ ] P0 verdi o Skip documentati
- [ ] PDF cliente in `_exports/` (+ Downloads)
- [ ] Notion Agenti upsert (create o update)
- [ ] Documenti Prompt + Suite + KB (+ Listino se c’è CSV) + Report PDF; Agenti Path prompt / Path suite / Path KB / Report PDF = `[label](Notion Documenti URL)` (rich text, like Account Spoki)
- [ ] Changelog Deliverable cliente (+ Suite se utile)
- [ ] `{accountId}-{slug}-suite.yaml` valid vs schema (no `{{PROMPT:}}` leftovers)

## Closeout Notion (checklist agent)

1. PDF §7 generato
2. Match Agenti: Link Spoki → else Account Spoki + Nome. Write Account Spoki as `[id](https://admin.spoki.com/wazy/account/{id}/change/)`
3. Upsert campi + Stato da esiti + Owner (`notion-get-users` `self`; create sempre, update solo se vuoto)
4. Upsert Documenti Tipo=Prompt (body `# System prompt`; Path repo in backticks) → Agenti.Path prompt = `[Prompt {short}](Notion URL)`
5. Upsert Documenti Tipo=Suite (body suite markdown; Path repo in backticks) → Agenti.Path suite = `[Suite {short}](Notion URL)`
6. Upsert Documenti Tipo=KB (body KB completo; Path repo in backticks) → Agenti.Path KB = `[KB {short}](Notion URL)` (più link con ` · `; includere Listino)
7. Upload PDF → Documenti Tipo=Report PDF → Agenti.Report PDF = `[Report PDF {short}](Notion URL)`
8. Changelog Deliverable cliente
```

## Exports

```bash
# system prompt → Downloads (.txt for Spoki)
# KB → Downloads (.txt for Spoki; repo stays .md in clients-kb/)
```

Prefer writing via the agent:

- Prompt: split on `# System prompt (Spoki)\n`, write
  `~/Downloads/{accountId}-{slug}-system-prompt.txt`.
- KB: copy the **operational** `clients-kb/{accountId}-*-kb.md` (not the
  index, not scrape archives) → `~/Downloads/{accountId}-{kb-slug}.txt`
  (same bytes, **`.txt` only** — Spoki does not accept `.md`). Copy listini
  `.csv` as-is. Do not export raw PDF/scrape dumps for upload.

## Handoff blurb (IT)

```text
Ciao {nome},

abbiamo testato in {playground|live} l’agente **{nome}** (account {id}, {Testuale|Vocale}).

**Ok:** …
**Da rifinire:** … (fail reali vs prompt)
**Piattaforma/KB:** …
**Per il cliente:** aggiorna il system prompt col file allegato; re-test breve su: …
**Notion:** {url Agente} — Report PDF: {url Documenti}

{firma}
```

## Client report (IT → PDF)

Path: `clients-prompt/_exports/{Client}-scenari-test-agente-{slug}.md`  
Render: `$HOME/.claude/skills/gstack/make-pdf/dist/pdf generate <md> <pdf>` → copy to `~/Downloads/`.

Then Notion closeout (SKILL.md §8): Documenti tipo **Report PDF** (PDF in body) +
Agenti column **Report PDF** = URL di quella pagina Documenti + Changelog
*Deliverable cliente*. Default a chiusura suite (skip solo se chiesto).

Reference examples:
- `_exports/LetsMove-scenari-test-agente-Momo.md`
- `_exports/Boldrin-scenari-test-agente-vendita-chiusura-estiva.md`

```markdown
# {Client} — Scenari di test dell’assistente WhatsApp

**Agente:** …
**Account Spoki:** {accountId}
**Tipo:** Testuale | Vocale
**Link agente:** https://app.spoki.com/ai/agent/{uuid}
**Data verifica:** …
**Ambiente:** playground di test | live

---

## Contesto

1. Prompt …
2. KB / tool …
3. Eventuali fix post-test …

---

## Cosa è stato verificato

### {Area}

| Scenario | Cosa è stato controllato |
| --- | --- |
| … | … |

---

## Interventi sul prompt legati ai test / feedback

| Tema | Intervento verificato |
| --- | --- |
| … | … |

---

## Note tecniche (KB / tool / piattaforma)

- …

---

## Esito

Gli scenari elencati risultano **verificati** …  
**Operatività consigliata:** …
```

Do not paste Pass/Fail IDs or internal suite jargon into the client PDF.

## Executable suite YAML

Schema: [schema/agent-test-suite.schema.json](schema/agent-test-suite.schema.json).
Instantiate packs from [packs/](packs/) (`core` / `booking` / `support`;
`voice` only if `tipo: Vocale`). Drop scenarios whose `require_prompt_rule` is
not in the prompt. Fill `expect.rule` from the prompt body. Product Test tab /
API / judge: [product/spoki-agent-test.md](product/spoki-agent-test.md).
On Vocale, set `script[].channel: spoken` and score transcript + Langfuse
voice-agent (not a full second intent suite if a textual twin exists).

```yaml
schema_version: 1
agent:
  account_id: "{accountId}"
  cliente: "{client}"
  name: "{name variante}"
  slug: "{slug}"
  tipo: Testuale
  ambiente: Playground
  link_spoki: "https://app.spoki.com/ai/agent/{uuid}"
  test_copy: true
prompt:
  sync_date: "{date}"
  repo_path: "clients-prompt/{accountId}-{slug}.md"
  version_id: "{hash of System prompt body}"
packs:
  - core
variables:
  greeting_message: "Ciao"
  operator_message: "Posso parlare con un operatore?"
scenarios:
  - id: core.greeting
    pack: core
    priority: p0
    title: Accoglienza
    script:
      - role: user
        text: "Ciao"
    expect:
      rule: "{verbatim greeting rule from this prompt}"
      prompt_section: greeting
      client_label: "All'apertura l'assistente saluta e si comporta come previsto dal prompt."
    tools_required: []
    kb_required: false
    side_effects: none
    environment: playground
    classify_on_fail: prompt
    score: pending
    client_outcome: pending
```
