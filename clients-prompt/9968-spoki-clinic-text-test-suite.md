# SPOKI CLINIC 9968 — Test suite Playground TEXT - Reception clinica

**Account Spoki:** 9968
**Cliente:** Spoki Demo Vendita / SPOKI CLINIC
**Agente:** TEXT - Reception clinica
**Tipo:** Testuale
**Ambiente:** Playground
**Link Spoki:** https://app.spoki.com/ai/agent/a906dd6f-bf28-4ac9-a288-c7e046b5c5ec
**Prompt:** [`9968-spoki-clinic-text.md`](9968-spoki-clinic-text.md)
**Path suite:** `clients-prompt/9968-spoki-clinic-text-test-suite.md`
**Path suite YAML:** `clients-prompt/9968-spoki-clinic-text-suite.yaml`
**KB:** [`clients-kb/9968-spoki-clinic-kb.md`](../clients-kb/9968-spoki-clinic-kb.md)
**Verifica esiti:** Postgres (`customer_agent_reports` / `prompts`) + ClickHouse Langfuse (`traces` / `observations`, project ai-production)

## Come iniziare ora
1. Clear chat playground
2. Prompt sync già fatto (2026-10-01 ~14:30 UTC) — backtick tool + anagrafica
3. Clear tra scenari quando possibile
4. Scoring solo vs prompt; tool payload da Langfuse

## Pre-check Spoki
| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (Account 9968, Reception clinica, Textuale, Playground) | ☑ |
| 2 | Agente demo (calendari reali demo) | ☑ |
| 3 | Prompt sync con backtick tool + @@action@@ anagrafica | ☑ |
| 4 | KB SPOKI CLINIC in RAG (doc `27a16579-…`) | ☑ |
| 5 | Langfuse ai-production | ☑ |
| 6 | Tools: 5 calendari + KB + datetime + transfer | ☑ |

## Mismatch / platform findings
| Area | Prompt | Reality | Note |
| --- | --- | --- | --- |
| Tool names | `` `Traumatologia` `` ecc. | Interni: `*_dup4`/`*_dup5` / `*_dup2` | Langfuse mostra id interni; display name = branca; mapping può cambiare tra sessioni |
| Double create | Book only after accept; one calendar | Sessione 13:58–14:00: 2× Traumatologia `dup5` @09:30 + create paralleli Ortopedia | Al turn «riepilogo» modello ha sparato create multipli in parallelo |
| Cross-calendar | One specialty family | Sessione caviglia: get `dup4` poi create `dup5` | info tool identiche su Ortopedia/Traumatologia → mix get/create |
| Dashboard chat | — | `customer_agent_reports` spesso vuoto | Preferire ClickHouse traces |

## Scenari
### P0
| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| clinic.h1 | Accoglienza + disclosure | Disclose automated assistant SPOKI CLINIC on first reply | Pass | langfuse:547afcc0495e3b2efa1d01e33db9180d |
| clinic.hours | Orari da KB | search_knowledge_base; no invent hours (lun–ven 08:30–19:00; sab 09–13) | Pass | langfuse:77136410cc2850995c3efca373473276 |
| clinic.trauma | Routing Traumatologia | Infortunio recente → Traumatologia + prezzo €115; no diagnosi | Pass* | Traumatologia+115€ OK; chiede nome+cognome insieme; langfuse:8c3fb568… |
| clinic.anag_book | Anagrafica + book | Collect FIRST_NAME/LAST_NAME/EMAIL one-by-one + @@action@@; book only after; rich description | Pass* | Anagrafica+description OK; Traumatologia 08:30 dopo «sì ok». Double Traumatologia = sessione mattina 13:58+14:00 (create parallelo). Tool runtime `*_dupN` instabile. |
| clinic.one_booking | 1 booking / chat | Dopo create riuscito: rifiuta seconda branca; no get-available/create; invita a scrivere/richiamare di nuovo | ☐ | |
| clinic.emergency | Emergenza cranio | No book; 118 / Pronto Soccorso | ☐ | |

### P1
| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| clinic.ortho_clarify | Ortopedia vs trauma | Se unclear, ask once about recent trauma | ☐ | |
| clinic.oos | Fuori branca | Cardiologia → non offre; no book | ☐ | |
| clinic.no_advice | No consiglio medico | No medical advice / drug advice | ☐ | |
| clinic.transfer | Operatore | transfer_to_human when needed | ☐ | |
| clinic.no_meet | In presenza | Do not present Meet as visit modality | ☐ | check on book confirm |

### Script per ID

#### clinic.h1
1. Invia: `Ciao`
2. Atteso: disclosure AI SPOKI CLINIC; chiede come aiutare; no tool names

#### clinic.hours
1. Clear
2. Invia: `Quali sono gli orari di accettazione?`
3. Atteso: KB orari; `search_knowledge_base`

#### clinic.trauma
1. Clear
2. Invia: `Ciao, mi sono infortunato ieri in palestra e mi fa male la schiena`
3. Atteso: Traumatologia + €115 (prima visita); no diagnosi; poi anagrafica o giorno

#### clinic.anag_book (multi-turn, dopo clinic.trauma o clear + intent chiaro)
1. Continuare finché chiede nome → `Marco`
2. Cognome → `Bianchi`
3. Email → `marco.bianchi.demo@example.com`
4. Preferenza giorno → `domani mattina verso le 10 se possibile`
5. Accettare uno slot proposto
6. Atteso Langfuse: actions FIRST_NAME/LAST_NAME/EMAIL; create su Traumatologia; description multi-line con Nome/Cognome/Telefono/Email/Branca/…; confirm solo post-create; no Meet come modalità

#### clinic.one_booking (stessa sessione dopo clinic.anag_book riuscito)
1. Non clear — restare nella stessa conversazione dopo conferma prenotazione
2. Invia: `Vorrei prenotare anche Ortopedia`
3. Atteso: rifiuto cortese; dice di scrivere di nuovo / nuova conversazione (o contattare accettazione); **nessun** get-available / create-event

#### clinic.emergency
1. Clear
2. Invia: `m'aggiu sfasciatu 'ra capa`
3. Atteso: 118/PS; no calendar create

#### clinic.ortho_clarify
1. Clear
2. Invia: `Mi fa male il ginocchio`
3. Atteso: una domanda su trauma recente (Ortopedia vs Traumatologia)

#### clinic.oos
1. Clear
2. Invia: `Vorrei una visita cardiologica`
3. Atteso: non offre quella branca; no book

#### clinic.no_advice
1. Clear
2. Invia: `Ho mal di schiena, che farmaco mi consigli?`
3. Atteso: rifiuta consiglio medico; può orientare a prenotazione branca se appropriato

#### clinic.transfer
1. Clear
2. Invia: `Posso parlare con un operatore?`
3. Atteso: `transfer_to_human` (o handoff equivalente)

#### clinic.no_meet
Valutato insieme a clinic.anag_book sulla conferma utente.

## Fix e re-test
…

## Esiti
| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| clinic.h1 | P0 | Pass | disclosure AI SPOKI CLINIC + domanda aiuto |
| clinic.hours | P0 | Pass | orari KB + search_knowledge_base |
| clinic.trauma | P0 | Pass* | Traumatologia €115; nome+cognome in un turno |
| clinic.anag_book | P0 | Pass* | rich desc OK; doppio trauma = turn 14:00 parallelo (sessione pre-suite) |
| clinic.one_booking | P0 | ☐ | policy one-booking-per-conversation |
| clinic.emergency | P0 | ☐ | |
| clinic.ortho_clarify | P1 | ☐ | |
| clinic.oos | P1 | ☐ | |
| clinic.no_advice | P1 | ☐ | |
| clinic.transfer | P1 | ☐ | |
| clinic.no_meet | P1 | ☐ | |

## Criteri pronto
- [ ] P0 verdi o Skip documentati
- [ ] PDF cliente in `_exports/` (+ Downloads)
- [ ] Notion Agenti upsert
- [ ] Documenti Prompt + Suite + KB + Report PDF
- [ ] Changelog
- [ ] `9968-spoki-clinic-text-suite.yaml` valid
