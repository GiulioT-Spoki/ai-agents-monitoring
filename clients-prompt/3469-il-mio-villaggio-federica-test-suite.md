# Il Mio Villaggio 3469 — Test suite Federica

**Account Spoki:** 3469
**Cliente:** Il Mio Villaggio
**Agente:** Federica — copia di test
**Tipo:** Testuale | Vocale
**Ambiente:** Entrambi (Playground per regole; WhatsApp/voce reale per automazione SUNTO)
**Link Spoki testuale:** https://app.spoki.com/ai/agent/0d30df8a-845b-40e3-819b-851af5cd1022
**Link Spoki vocale:** https://app.spoki.com/ai/agent/0a750bf2-eb5a-40e1-962b-40e30bf7cecf
**Prompt:** [`3469-il-mio-villaggio-federica.md`](3469-il-mio-villaggio-federica.md)
**Path suite:** `clients-prompt/3469-il-mio-villaggio-federica-test-suite.md`  
**Path suite YAML (overlay vocale):** [`3469-il-mio-villaggio-federica-suite.yaml`](3469-il-mio-villaggio-federica-suite.yaml)  
IDs YAML: `V-H1` → `federica.v-h1`, `V-L3` → `federica.v-l3`, `V-SUNTO` → `federica.v-sunto`, `V-L1` → `federica.v-l1` (Skip: copertura testuale T-L1), `V-CANC` → `federica.v-canc` (Skip: T-CANC). Overlay `voice.no_tool_leak` / `voice.confirm_after_tool` ancora pending.
**KB:** KB01–06 + `3469-il-mio-villaggio-kb-resort-schede.csv` (vedi index)
**Tool obbligatori:** search_knowledge_base, get_current_datetime, tool_api_open_ticket (UI: tool-api-open-ticket)
**Matrice:** tool 24h/72h (non la variante 48h del draft cliente)

## Come iniziare ora

1. Paste `~/Downloads/3469 Il Mio Villaggio/03-prompt/3469-il-mio-villaggio-federica-system-prompt.txt` sull’agente test
2. Conferma tool + KB linkati
3. Clear tra scenari (playground) / nuova chiamata (voce)
4. Valuta solo regole presenti nel prompt Federica
5. Automazione SUNTO: **solo** in chat/voce reale (non playground)

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (Account 3469, Federica) | ☑ |
| 2 | Prompt sync (export Federica) | ☑ |
| 3 | KB operativa + CSV resort | ☑ |
| 4 | `tool-api-open-ticket` abilitato | ☑ |
| 5 | `search_knowledge_base` + `get_current_datetime` | ☑ |
| 6 | Nessun secondo tool API sunto / Aggiungi tag sull’agente | ☑ |
| 7 | Clear / nuova sessione tra scenari | ☑ |
| 8 | Tool Trigger automation → 554446 (Federica: urgenza) dopo ticket ok | ☑ |

## Mismatch / platform findings

| Area | Prompt | Reality | Note |
| --- | --- | --- | --- |
| Matrice cliente draft vs tool | Draft cliente usava soglie 48h in alcuni L2 | Prompt Federica usa matrice tool 24/72 | Conflitti → tool |
| SUNTO via AI Agent in playground | Automazione 554446 legge chat | Playground senza chat → output degenere | Verificato; usare WhatsApp/voce reale |
| `%%TICKET_DESCRIPTION%%` nel prompt AI Agent | — | Non si risolve (testo letterale) | Non usarlo nel nodo AI |
| SUNTO in chat/voce reale | Agente avvia 554446 dopo ticket | Nota + campo popolati correttamente | Verificato 2026-08-13; **non** trigger Ticket created |
| Vocale: leak `[call tool ...]` | Side-effect silenziosi; conferma solo dopo successo | Turno senza eventi tool + testo `[call tool tool_api_open_ticket ...]` / `trigger_automation`; conferma parlata falsa; call reale solo al turno successivo | 2026-08-13 Langfuse. Runtime name `tool_api_open_ticket`. Prompt riscritto intento+ordine (no sintassi call, no second never-echo del wrapper). Ri-test V-L3 senza chiedere “hai chiamato il tool?” |
| **Playground vocale senza contatto** | Prompt e ticket usano i dati del contatto | Start Call non aggancia un contatto: i `%%CAMPI%%` restano vuoti | **Platform**. Il gemello testuale ([0d30df8a](https://app.spoki.com/ai/agent/0d30df8a-845b-40e3-819b-851af5cd1022)) è il banco di prova: V-L1 e V-CANC sono `twin_text` (chiusi come T-L1 / T-CANC). In voce restano tono/leak in `voice_playground` e lo smoke ticket in `voice_outbound` |

## Scenari

### P0 — Testuale (playground / WA)

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| H1 | Intent / tono | IT, tu, 1–3 frasi, no markdown parlato | Pass | Playground |
| T-L3 | Modifica / info non urgente oltre 72h | Ticket `[L3\|differibile]`, Medium; recap prima del tool | Pass | Playground + WA reale (SUNTO ok) |
| T-L1 | Blocco check-in entro 24h | `[L1\|urgenza-operativa]`, Highest | Pass | Playground |
| T-CANC | Cancellazione scritta già inviata | `[CANC\|booking]`, High/Highest; non conferma cancellazione completata | Pass | Playground |
| C1 | Preventivo commerciale | Raccoglie dati; ticket con LEAD_* in description; priorità da matrice | Pass | Playground |
| G1 | Non confermare pagamento/voucher | Nessuna conferma inventata; guida area riservata se appropriato | Pass | Playground |

### P1 — Testuale

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| T-L2 | Voucher mancante entro 24h senza blocco | `[L2\|urgenza-prioritaria]`, High (non L1) | Pass | Playground |
| T-L0 | Emergenza pubblica | Istruzione 112/118 subito; poi `[L0\|emergenza]` Highest |  | Solo se automazioni WA L0 gestite |
| KB1 | Domanda da KB senza follow-up operatore | Risposta KB; ticket solo se chiede presa in carico | Pass | Playground |
| A1 | Automazione SUNTO + Chat Note (554446) | Dopo ticket ok, agente avvia 554446; SUNTO strutturato + nota (non playground) | Pass | 2026-08-13 WA reale |

### P0 — Vocale

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| V-H1 | Saluto / intent | IT, tu, frasi corte, una domanda alla volta | Pass | Smoke vocale |
| V-L3 | Modifica non urgente | Recap parlato; un ticket webhook `[L3\|differibile]` Medium; conferma solo dopo tool ok; zero leak `[call tool` | Pass* | Ticket + nota SUNTO ok (2026-08-13); leak tool osservato in sessione successiva → prompt fix; ri-test pending |
| V-L1 | Blocco check-in | `[L1\|urgenza-operativa]` Highest |  | Non rieseguito in questa sessione |
| V-CANC | Cancellazione scritta | `[CANC\|booking]`; non conferma cancellazione completata |  | Non rieseguito in questa sessione |
| V-SUNTO | Post-ticket | SUNTO_CHIAMATA + nota chat popolati | Pass | Confermato con ticket vocale |

### Script per ID

#### H1 / V-H1

1. Invia / dì: Ciao, sei Federica?
2. Atteso: saluto cordiale in italiano, tu, senza elencare regole interne.

#### T-L3 / V-L3

1. Invia / dì: Vorrei informazioni su una modifica prenotazione per agosto 2027, non è urgente.
2. Se chiede dati: Pratica 88991, Mario Rossi, mario.rossi@email.it. Vorrei spostare le date di una settimana.
3. Al recap: Sì, tutto corretto.
4. Atteso: un ticket `[L3|differibile]` Medium; in chat/voce reale anche SUNTO + nota.

#### T-L1 / V-L1

1. Invia / dì: Domani faccio check-in al Serenusa ma la struttura non mi trova in anagrafica e non mi fanno entrare.
2. Se chiede dati: Pratica 55441, Giulia Bianchi, giulia.bianchi@email.it.
3. Atteso: `[L1|urgenza-operativa]` Highest; non promette tempi di risoluzione.

#### T-CANC / V-CANC

1. Invia / dì: Ho già inviato la cancellazione via email a booking@ilmiovillaggio.it ieri alle 10, pratica 12345.
2. Se chiede villaggio/date: Villaggio Serenè Resort, check-in il 20 settembre 2026.
3. Atteso: `[CANC|booking]`; nessuna conferma che la cancellazione sia già completata.

#### C1

1. Invia: Vorrei un preventivo per due adulti e un bambino di 6 anni a Sibari la prima settimana di luglio, budget intorno ai 2000 euro, potete richiamarmi?
2. Atteso: raccolta progressiva; ticket con priorità da date; description con LEAD_A o LEAD_B coerente.

#### G1

1. Invia: Ho pagato il saldo ieri, mi confermi che risulta accreditato?
2. Atteso: non conferma accredito; guida area riservata o apre ticket di assistenza se serve follow-up.

#### T-L2

1. Invia: Check-in domani al GranSerena, non ho ricevuto il voucher. La struttura però mi ha detto che la prenotazione c’è, solo manca il voucher.
2. Se chiede dati: Pratica 77665, Anna Neri, anna.neri@email.it.
3. Atteso: `[L2|urgenza-prioritaria]` High (non L1).

## Fix e re-test

- 2026-08-12/13: automazione SUNTO falliva in playground (no chat) → Pass in WhatsApp reale.
- Vocale: ticket aperto + nota SUNTO popolata correttamente (2026-08-13); suite chiusa Pass* su smoke vocale (L1/CANC vocali non rieseguiti in questa sessione).

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| H1 | P0 | Pass |  |
| T-L3 | P0 | Pass | + A1 live |
| T-L1 | P0 | Pass |  |
| T-CANC | P0 | Pass |  |
| C1 | P0 | Pass |  |
| G1 | P0 | Pass |  |
| T-L2 | P1 | Pass |  |
| KB1 | P1 | Pass |  |
| A1 | P1 | Pass | Chat reale 2026-08-13 |
| V-H1 | P0 vocale | Pass |  |
| V-L3 / V-SUNTO | P0 vocale | Pass* | Ticket + nota ok |
| V-L1 / V-CANC | P0 vocale | Skip | Non rieseguiti; copertura via testuale |

## Criteri pronto

- [x] Pre-check testuale
- [x] P0 testuale verdi
- [x] Automazione SUNTO verificata in chat reale
- [x] Smoke vocale (ticket + nota) verificato
- [x] Export `.txt` allineato al corpo prompt
- [x] PDF cliente in `_exports/` (+ Downloads)
- [x] Notion Agenti upsert
- [x] Documenti Report PDF + Changelog
