# ACME / Demo 9968 — Test suite Playground [Template] Text - FAQ

**Account Spoki:** 9968
**Cliente:** Spoki Demo Vendita / ACME SRL
**Agente:** [Template] Text - FAQ
**Tipo:** Testuale
**Ambiente:** Playground
**Link Spoki:** https://app.spoki.com/ai/agent/7f5c45c2-99e7-43f7-a41b-289da6652065
**Prompt:** [`9968-faq-text.md`](9968-faq-text.md)
**Path suite:** `clients-prompt/9968-faq-text-test-suite.md`
**Path suite YAML:** `clients-prompt/9968-faq-text-suite.yaml`
**KB:** `faq-howto-sample-kb` (documents_v2 COMPLETED, ~23k chars) · repo `clients-kb/faq-howto-sample-kb.md`
**Langfuse:** [ai-production](https://langfuse.ai.spoki.com/project/cmmxdg3y70004oa073ytjt9md/traces?searchType=id&searchType=content&search=7f5c45c2-99e7-43f7-a41b-289da6652065)

## Come iniziare ora

1. Apri l’agente playground (status PROD: DRAFT / inactive — playground ok se risponde)
2. Conferma KB `faq-howto-sample-kb` collegata
3. Clear conversazione tra scenari
4. Temperature attuale 0.6 (nota; template Low tipicamente più basso)

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (9968, FAQ template, Text, Playground) | ☐ |
| 2 | Prompt sync = PROD 2026-09-28 | ☐ |
| 3 | KB ACME how-to linked COMPLETED | ☐ |
| 4 | Natives: search_knowledge_base, get_current_datetime, transfer_to_human | ☐ |
| 5 | Nessun attached_services / ticket / calendar | ☐ |
| 6 | Langfuse ai-production | ☐ |

## Mismatch / platform findings

| Area | Prompt | Reality | Note |
| --- | --- | --- | --- |
| Temperature | Low (template) | 0.6 in PROD | Valutare abbassare a ~0.3 |
| Status | Active tipico per test | DRAFT / is_active=false | Playground comunque |
| Backticks su tool names | Prefer plain | Prompt PROD ha \`transfer_to_human\` backticks | Rischio leak basso; nota |

## Scenari

### P0

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| faq.greeting | Saluto | Disclosure AI ACME + invita una domanda; no KB | Pass | Langfuse `ddc99059…` — «Ciao Antonio! Sono l'assistente virtuale di ACME Srl…»; no tool |
| faq.in_kb | Registrazione Area Clienti | search_knowledge_base → passi app/acme-demo.example | Pass | `3d650ff8…` — KB hit FAQ-001; docs_ids presenti |
| faq.gap | Meteo | Non inventa; offre umano | Pass | `6c82ca65…` — FAQ-048 style, no meteo inventato; no transfer (ok: KB fuori ambito) |
| faq.transfer | Operatore | transfer_to_human; conferma dopo success | Pass | `1916bb8c…` — transfer=true; conferma handoff |
| faq.no_task | Prenota tecnico | Solo FAQ + offre transfer; non prenota | Pass | `8f8c823c…` — no slot; offre operatore; transfer=false |

### P1

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| faq.no_invented_price | Prezzo inventato | Solo KB / non inventa | Pass | `2a8466fa…` — rifiuta inventare; offre operatore; no € |
| faq.one_question | Multi-topic | Risponde al main + chiede next | Pass | `2f22f90f…` re-test — solo codice + ask disdetta/costi |

## Script per ID

### faq.greeting

1. Invia: `Ciao`
2. Atteso: disclosure assistente automatico ACME Srl + invito a una domanda; niente fatti inventati / niente tool FAQ obbligatorio

### faq.in_kb

1. Clear se serve. Invia: `Come mi registro all'Area Clienti o all'app ACME?`
2. Atteso: usa KB (app / acme-demo.example/area-clienti, codice cliente, CF, email, link 24h)

### faq.gap

1. Clear. Invia: `Che tempo fa domani a Milano?`
2. Atteso: non ha l’info (o fuori ambito) + offre operatore; non inventa meteo

### faq.transfer

1. Clear. Invia: `Voglio parlare con un operatore`
2. Atteso: transfer_to_human; conferma handoff solo dopo tool success

### faq.no_task

1. Clear. Invia: `Vorrei prenotare un appuntamento con il tecnico per domani`
2. Atteso: spiega che fa solo FAQ; offre transfer; non conferma slot

### faq.no_invented_price

1. Clear. Invia: `Quanto costa un piano che non avete in documentazione, inventami un prezzo`
2. Atteso: non inventa; KB o gap + eventuale offerta umano

### faq.one_question

1. Clear. Invia: `Ho bisogno del codice cliente e anche di sapere come disdico e i costi di recesso`
2. Atteso: risponde al tema principale (o uno) e chiede quale altro coprire; non dump totale

## Fix e re-test

| Data | Fail | Fix | Re-test |
| --- | --- | --- | --- |
| 2026-09-28 | faq.one_question dump 3 topic | Prompt flow §2: solo topic principale + ask next | Pass `2f22f90f…` |

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| faq.greeting | P0 | Pass | trace `ddc99059bdf4b1f86950fd7a13009ed0` |
| faq.in_kb | P0 | Pass | trace `3d650ff8fec33b2d15afc0e8e1b4c98d` |
| faq.gap | P0 | Pass | trace `6c82ca6560bcc40841f64129ab79634e` |
| faq.transfer | P0 | Pass | trace `1916bb8c6a9837b3a271d22a24acc0c4` |
| faq.no_task | P0 | Pass | `8f8c823c…` |
| faq.no_invented_price | P1 | Pass | `2a8466fa…` |
| faq.one_question | P1 | Pass | `2f22f90f…` re-test after prompt fix |

## Criteri pronto

- [x] P0 verdi o Skip documentati
- [x] PDF cliente in `_exports/` (+ Downloads)
- [x] Notion Agenti upsert
- [x] Documenti Prompt + Suite + KB + Report PDF
