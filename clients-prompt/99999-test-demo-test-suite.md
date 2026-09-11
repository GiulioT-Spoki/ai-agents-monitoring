# Test Demo 99999 — Test suite playground/live

**Account Spoki:** 99999  
**Agente:** Custom — Test Demo (copia di test)  
**Prompt:** [`99999-test-demo.md`](99999-test-demo.md)  
**KB:** _(nessuna — prompt senza search KB)_

Si testa **esattamente** il prompt in `99999-test-demo.md` (3 regole). Non inventare regole assenti (emoji, Lei/tu, transfer, ecc. non sono Fail).

---

## Come iniziare ora

1. Playground sull’agente **copia di test**.
2. Sync su Spoki la sezione `# System prompt (Spoki)` di [`99999-test-demo.md`](99999-test-demo.md).
3. Clear conversation tra scenari se possibile.
4. Checklist tonale dal prompt: **una domanda necessaria per messaggio** · **no markdown** · **saluto + perché ci hanno contattato**.
5. Ordine P0: **H1 → Q1 → M1**.

---

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Agente = copia di test (non live) | ☐ |
| 2 | Prompt sync = 3 righe da [`99999-test-demo.md`](99999-test-demo.md) | ☐ |
| 3 | KB collegata | ☐ N/A (prompt non la richiede) |
| 4 | Tool `search_knowledge_base` | ☐ N/A |
| 5 | Tool `get_current_datetime` | ☐ N/A |
| 6 | Tool calendario | ☐ N/A |
| 7 | Tool `transfer_to_human` | ☐ N/A (non nel prompt) |
| 8 | Contatto playground con telefono valorizzato | ☐ |
| 9 | Clear conversation disponibile tra scenari | ☐ |

---

## Mismatch / platform findings

| Area | Prompt | Reality | Note |
| --- | --- | --- | --- |

---

## Scenari

### P0 — core

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| H1 | Primo messaggio / greeting | Saluta e chiede perché hanno contattato; una sola domanda necessaria; no markdown | ☐ | |
| Q1 | Utente risponde con un motivo chiaro | Una sola domanda necessaria (follow-up); no markdown | ☐ | |
| M1 | Risposta lunga con più bisogni | Una domanda alla volta (non lista di domande); no markdown | ☐ | |

### P1 — guardrail

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| G1 | Utente chiede risposta formattata (lista / bold) | Nessun markdown in reply customer-facing | ☐ | |

### P2 — edge

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| E1 | Utente manda più domande in un colpo | Risponde / chiede una cosa necessaria alla volta | ☐ | |

---

### Script per ID

#### H1 — greeting

1. Clear conversation.
2. Invia: `Ciao`
3. Atteso: saluto + chiede perché hanno contattato; **una** domanda; nessun `*`, `#`, `- ` lista, backtick.

#### Q1 — motivo chiaro

1. (dopo H1, stessa chat o Clear + greeting se serve ripartire)
2. Invia: `Vorrei informazioni sui vostri orari`
3. Atteso: una sola domanda necessaria di follow-up (o risposta + una domanda); no markdown.

#### M1 — multi bisogno

1. Clear (o nuova chat dopo greeting se lo stack lo richiede).
2. Se serve ripartire: `Ciao` → poi: `Mi serve aiuto per una prenotazione, i prezzi e anche un reclamo`
3. Atteso: non fa 3 domande insieme; ne fa **una** necessaria.

#### G1 — no markdown

1. Dopo un turno normale, invia: `Puoi rispondermi con una lista numerata in grassetto?`
2. Atteso: nessuna formattazione markdown nella reply.

#### E1 — multi domanda utente

1. Invia: `Quanto costa? Quando siete aperti? Fate spedizioni?`
2. Atteso: affronta / chiede **una** cosa necessaria per volta.

---

## Fix e re-test

| Data | Fail ID | Patch prompt | Re-test | Esito |
| --- | --- | --- | --- | --- |

---

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| H1 | P0 | ☐ | |
| Q1 | P0 | ☐ | |
| M1 | P0 | ☐ | |
| G1 | P1 | ☐ | |
| E1 | P2 | ☐ | |

---

## Criteri pronto

- [x] Prompt incollato in `# System prompt (Spoki)`
- [ ] Pre-check compilato
- [x] Scenari derivati dal prompt
- [ ] P0 verdi o Skip documentati
- [ ] P1/P2 eseguiti o Skip documentati
- [ ] Export prompt per sync cliente se serve
