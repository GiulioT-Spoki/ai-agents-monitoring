# Spoki Demo Vendita 9968 — Test suite Playground [Template] Text — Survey / CSAT

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)
**Cliente:** Spoki Demo Vendita
**Agente:** [Template] Text — Survey / CSAT
**Tipo:** Testuale
**Ambiente:** Playground
**Link Spoki:** https://app.spoki.com/ai/agent/4b2dbb48-b860-4450-8a63-04d10d417adc
**Prompt:** [`9968-survey-text.md`](9968-survey-text.md)
**Path suite:** `clients-prompt/9968-survey-text-test-suite.md`
**Path suite YAML:** `clients-prompt/9968-survey-text-suite.yaml`

## Come iniziare ora

1. Incolla body da `# System prompt (Spoki)` o `~/Downloads/9968-survey-text-system-prompt.txt` (azioni su righe separate)
2. Bind `transfer_to_human` in UI (oggi solo field + tags in `attached_services`)
3. Clear chat tra scenari; score contro prompt live

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (9968, Agente, Link) | ☑ |
| 2 | Copia template demo | ☑ |
| 3 | Prompt sync (ACME SRL + campi + tag) | ☐ live aveva `@@160399@@6.` concatenato — re-incolla export |
| 4 | Campi CSAT_SCORE / WENT_WELL / IMPROVE | ☑ nel prompt |
| 5 | Tag 160399 / 160400 | ☑ nel prompt live |
| 6 | Langfuse ai-production | ☐ |
| 7 | set_contact_field_value + add_tags | ☑ attached_services |
| 8 | transfer_to_human | ☐ non in attached_services |
| 9 | Agente attivo | ☐ `is_active=false` / DRAFT |

## Mismatch / platform findings

| Area | Prompt file | Reality | Note |
| --- | --- | --- | --- |
| Azioni | una per riga | live `tag_ids=160399@@6.` | Re-incolla |
| transfer | dichiarato | non in attached_services | Bind UI |
| Temperature | Low (modello) | 0.8 | Opzionale |

## Scenari

### P0

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| survey.start | Avvio + disclosure | Disclose ACME SRL; chiede Q1 (score 1–5); 1 domanda | Pass | Langfuse `be624cdf…` — ACME SRL + Q1 |
| survey.score_persist | Score valido | Salva CSAT_SCORE; poi Q2 | Pass | Langfuse `813d33c4…` — CSAT_SCORE=5 |
| survey.invalid_score | Score non intero | Chiede una volta 1–5 | Pass | Langfuse `2abb2725…` — chiede numero 1–5 |
| survey.happy_path | Flusso completo score alto | Q2–Q4; sì → tag 160399; fine → tag 160400; thank; stop | Pass | Langfuse `27bd547a…` — campi + entrambi i tag |
| survey.decline | Rifiuta sondaggio | Thank e close; no domande | Pass | Langfuse `f7947dda…` — thank e close |
| survey.detractor | Score ≤2 | Offer transfer_to_human; no argue / no sales | Pass* | Langfuse `72c8691c…`/`283bceaa…` — offer verbale; transfer non in attached_services |

### P1

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| survey.skip_comments | Skip Q2/Q3 | Accetta skip; prosegue | Pass | stesso run detractor `salta`/`salta` |
| core.one_question | Una domanda | Tone: one question | Fail | `72c8691c…` — dopo score 1: offer transfer + Q2 stesso messaggio |
| survey.no_restart | Dopo complete “ok grazie” | Non riavvia survey | Pass* | Langfuse `d2aa1efb…` — `ok grazie` su Q4; chiude, non riapre |

### Script per ID

**survey.start** (clear)
1. Invia: `Ok, facciamo il sondaggio`
2. Atteso: disclosure ACME SRL + una sola domanda (score 1–5)

**survey.score_persist** (continua dalla chat start, oppure clear + start + `5`)
1. Invia: `5`
2. Atteso: tool CSAT_SCORE; poi chiede cosa è andato bene

**survey.invalid_score** (clear → start →)
1. Invia: `molto soddisfatto`
2. Atteso: chiede una volta un numero 1–5

**survey.happy_path** (clear)
1. `Ok, facciamo il sondaggio`
2. `5`
3. `Team rapido e cortese`
4. `Niente di particolare`
5. `Sì`
6. Atteso: campi + tag 160399 + tag 160400; ringrazia; stop

**survey.decline** (clear)
1. Invia: `No grazie, non voglio fare il sondaggio`
2. Atteso: thank e close

**survey.detractor** (clear)
1. Start → `1` → skip/skip → `no` (o sì)
2. Atteso: offer transfer; no pitch

## Fix e re-test

—

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| survey.start | P0 | Pass | ACME SRL + Q1 score |
| survey.score_persist | P0 | Pass | CSAT_SCORE=5 |
| survey.happy_path | P0 | Pass | campi + 160399 + 160400 |
| survey.invalid_score | P0 | Pass | chiede 1–5; 2abb2725… |
| survey.decline | P0 | Pass | thank e close; f7947dda… |
| survey.detractor | P0 | Pass* | offer verbale; transfer unbound; 283bceaa… |
| survey.skip_comments | P1 | Pass | salta/salta in detractor |
| core.one_question | P1 | Fail | offer+Q2 stesso msg; 72c8691c… |
| survey.no_restart | P1 | Pass* | ok grazie su Q4; chiude; d2aa1efb… |

## Criteri pronto

- [x] P0 verdi o Skip documentati (detractor Pass* — transfer unbound)
- [ ] Prompt sync (azioni separate) + transfer bound
- [x] P1 eseguiti (one_question Fail; no_restart Pass*)
