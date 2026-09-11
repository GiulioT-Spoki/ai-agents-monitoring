# Dimann 47493 — Verifica Spoki (automazioni e routing)

Account: **47493**. Compilare in piattaforma Spoki durante il setup pre-test. Non copiare in prompt agente.

Prompt Trigger: [`47493 - Triage AI (Primo contatto - Trigger).md`](47493%20-%20Triage%20AI%20(Primo%20contatto%20-%20Trigger).md)  
Prompt Concierge: [`47493 - Agente Concierge (Ricontatto).md`](47493%20-%20Agente%20Concierge%20(Ricontatto).md)  
Prompt HCP: [`47493 - Agente HCP.md`](47493%20-%20Agente%20HCP.md)  
Test HCP: [`47493-dimann-hcp-test-suite.md`](47493-dimann-hcp-test-suite.md)  
KB HCP: **nessuna** (contenuti nel prompt)

---

## Sistema attuale (note cliente)

### Automazioni attive

| ID | Nome | Quando | Cosa fa | Note |
| --- | --- | --- | --- | --- |
| **544437** | PRIMO CONTATTO | Primissima volta che l’utente scrive | Tag `PRIMO_CONTATTO` + step Agente AI per intercettare HCP sfuggiti all’ingresso | Necessario per routing corretto |
| **544496** | Router (Ricontatto) | Ricontatto dopo ≥24h dall’ultimo messaggio/contatto | Rimuove `PRIMO_CONTATTO`, lista **Ricontatto**, **AI Operator ON** solo se gate ≥24h OK | **Non** riabilitare AI a metà chat umana |
| **537990** | TRIAGE AI (Riepilogo) | Triggerata da agenti **Triage** e **HCP** a fine lavoro | Riassunto interno / nota per Customer Care | **Non** usata dal Concierge. Non ancora ottimizzata |
| **544284** | Chat da leggere | Triggerata dal Concierge a fine flusso | `Set Chat as Unread` + **AI Operator OFF** | Spegnere AI in handoff verso operatrici |

### Automazioni legacy (Caso 1 strutturato)

| ID | Stato atteso sul percorso Trigger | Note |
| --- | --- | --- |
| **494878** | ☐ Disattiva / limitata | Sostituita da Triage Trigger + KB Caso 1 |
| **495231** | ☐ Disattiva / limitata | Sostituita da Triage Trigger + KB Caso 1 |

**Verifica critica:** se 494878/495231 restano attive in parallelo al Triage Trigger → doppio flusso.

---

## Automazione 537990 — dettaglio

| Campo | Valore osservato in Spoki |
| --- | --- |
| Trigger | ☐ Webhook agente ☐ Altro: |
| Passo 1 | |
| Passo 2 (nota interna) | |
| Passo 3 (da leggere?) | |
| Duplica / overlap con 544284? | ☐ Sì ☐ No |

### Trigger 537990 dal prompt agente

| Evento agente | Previsto | Verificato in test |
| --- | --- | --- |
| Triage: dopo CONFERMO + chiusura KB | Sì | H1/H2 PASS (15/07) |
| Triage: AI_RIFIUTO_UTENTE | Sì | E4 PASS (15/07) |
| Triage: STEP TEST-SÌ (post Trustpilot) | Sì — **gap G1 vs KB** | R2 PASS (15/07) — da decidere con cliente |
| **Concierge** | **No** — usa 544284 | C-H1… PASS (20/07) |
| **HCP** ramo 1 / 3 / 4 / campioncini-con-problema | Sì | H-H1/H3/H4 PASS; H-E3 da fare |
| **HCP** ramo 2 solo form OK | **No** 537990 | H-H2 PASS |

---

## Automazione 544284 — dettaglio Concierge

| Campo | Valore osservato in Spoki |
| --- | --- |
| Trigger | Action agente Concierge (fine flusso) |
| Passi richiesti | 1) `Set Chat as Unread` 2) **Add or Remove AI Operator → disable (OFF)** |
| Stato API 21/07 | Solo Unread presente — **manca AI OFF** (da fare in UI; API read-only) |
| Nota interna / recap? | No (recap clinico = 537990, non qui) |

### Trigger 544284

| Evento agente | Previsto | Verificato in test |
| --- | --- | --- |
| Concierge: dopo messaggio accoglienza / presa atto | Sì | C-H1… PASS 20/07 (Unread; AI OFF da aggiungere) |
| Triage | Solo se esplicitamente nel prompt (oggi: no, usa 537990) | |

---

## Automazione 544496 — Router (Ricontatto) — fix SOS 21/07

**Bug cliente:** dopo intervento umano, al messaggio successivo dell’utente riparte l’Operatore AI. La pausa AI su messaggio umano è **default Spoki**; il Router **riaccende** l’AI.

| Campo | Stato API 21/07 | Target |
| --- | --- | --- |
| If/Else | `created_date > current_day` (contatto non creato oggi) | ≥24h dall’**ultimo messaggio/contatto** |
| Remove Tag | `PRIMO CONTATTO` (155408) | invariato |
| Add to List | Lista **Ricontatto** (252690) | invariato |
| Delay | 10s | invariato |
| AI Operator | `enable: true` | solo sul ramo che passa il gate ≥24h |

### Checklist UI (eseguire in Spoki)

| # | Automazione | Azione | Fatto? |
| --- | --- | --- | --- |
| 1 | **544284** | Aggiungere step **AI Operator = OFF** (prima o dopo Unread) | ☐ |
| 2 | **544496** | Sostituire If/Else `created_date` con gate **≥24h ultimo messaggio** | ☐ |
| 3 | **544496** | Confermare che **AI ON** è solo sul ramo ≥24h | ☐ |

**Non toccare:** 544437, 537990. **Non creare** automazione su “messaggio umano”.

### Test post-fix

| # | Scenario | Atteso | Pass? |
| --- | --- | --- | --- |
| T1 | Ricontatto ≥24h → Concierge → 544284 | Unread + AI OFF | ☐ |
| T2 | Operatrice risponde → utente risponde **entro 24h** | **Nessuna** risposta AI | ☐ |
| T3 | Dopo ≥24h, utente riscrive | 544496 → AI ON → Concierge | ☐ |

Esempi SOS Carolina: Manuela `+393477226320`, Claudia `+393201196167` (entrambi in lista Ricontatto).

---

## Routing supervisore AI

| Agente | Condizione attivazione | Confermato |
| --- | --- | --- |
| **Triage Trigger** | Primo contatto (`PRIMO_CONTATTO`) + no HCP + tag categoria **Ingresso** | ☐ |
| **Triage Libero** | Primo contatto + no HCP + **no** tag Ingresso | ☐ |
| **Concierge (RICONTATTO)** | Contatto in lista **RICONTATTO** (post #544496) | ☐ |
| **HCP** | Tag HCP | ☐ |

### Tag / liste rilevanti account 47493

| Tag / lista / categoria | ID Spoki (se noto) | Quando |
| --- | --- | --- |
| `PRIMO_CONTATTO` | | Automazione **544437** |
| Lista **RICONTATTO** | | Automazione **544496** (≥24h) |
| Ingresso (categoria) | | Automazioni ingresso, trigger non modificato |
| HCP | | Professionista sanitario |
| Intent opzione 1 | 144750 | Step A scelta 1 (Triage) |
| Intent opzione 2 | 144752 | Step A scelta 2 |
| Intent opzione 3 | 144753 | Step A scelta 3 |
| Fase cistite in corso | 144748 | C1-SÌ |
| Fase no sintomi attivi | 144749 | C1-NO |

### Messaggio trigger standard (testo esatto)

Annotare il testo del pulsante/widget usato in campagna (deve coincidere col primo messaggio utente in scenari Trigger):

```
[incollare testo trigger]
```

---

## Gap noti

| ID | Descrizione | Esito verifica |
| --- | --- | --- |
| G1 | 537990 su TEST-SÌ vs solo a fine flusso (note cliente) | **Verificato 15/07:** 537990 parte su TEST-SÌ (prompt sì, KB no) |
| G2 | Chiusura in/fuori orario via `get_current_datetime` | |
| G3 | 494878/495231 non in parallelo all'agente | |
| G4 | Opzione 3: flusso C2 diretto, no promesse posologia | **FAIL H3** (15/07) — domanda C1 spuria + tag 144749 errato |
| G5 | CRISI EMOTIVA: action handover post-messaggio | |
| G7 | Tag fase 144748/144749 solo opzioni 1/2, mai opzione 3 | **FAIL H3** (15/07) |
| G8 | Concierge: solo 544284, mai triage / 537990 | **PASS 20/07** (C-H1…C-E7) |
| G9 | Sync prompt Concierge Spoki ↔ file repo (verbatim) | **OK 20/07** |
| G10 | Sync prompt HCP Spoki ↔ file repo | **OK 20/07** — `47493 - Agente HCP.md`; **nessuna KB** associata |
| G11 | Ricontatto: AI interrompe chat umana entro 24h | **Aperto 21/07** — fix UI: 544284 AI OFF + 544496 gate ≥24h (non `created_date`) |

Compilato da: _______________  Data: _______________
