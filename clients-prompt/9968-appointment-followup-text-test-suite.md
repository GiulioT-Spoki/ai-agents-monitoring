# Spoki Demo Vendita 9968 — Test suite Playground [Template] Text — Appointment Follow-up

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)
**Cliente:** Spoki Demo Vendita
**Agente:** [Template] Text — Appointment Follow-up
**Tipo:** Testuale
**Ambiente:** Playground
**Link Spoki:** https://app.spoki.com/ai/agent/93f9518f-1f26-4605-ab89-f4b4bc6d21b5
**Prompt:** [`9968-appointment-followup-text.md`](9968-appointment-followup-text.md)
**Path suite:** `clients-prompt/9968-appointment-followup-text-test-suite.md`
**Path suite YAML:** `clients-prompt/9968-appointment-followup-text-suite.yaml`
**KB:** [`../clients-kb/9968-appointment-followup-text-kb.md`](../clients-kb/9968-appointment-followup-text-kb.md)

## Come iniziare ora

1. Agente: https://app.spoki.com/ai/agent/93f9518f-1f26-4605-ab89-f4b4bc6d21b5
2. Tag confirmed `160421` (no auto; no tag reschedule/cancel in questa demo)
3. Bind `Calendar Giulio` + `add_tags_to_contact` (togliere `trigger_automation` da attached_services)
4. Upload KB `.txt`; re-incolla `~/Downloads/9968-appointment-followup-text-system-prompt.txt`
5. Natives search/transfer/datetime ok anche fuori attached_services
6. Clear chat tra scenari; nei messaggi utente includi data/ora appuntamento (simula reminder)

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (9968, Agente, Link) | ☐ |
| 2 | Copia template demo | ☐ |
| 3 | Prompt sync (ACME SRL + tag IDs + Calendar Giulio) | ☐ |
| 4 | KB facts-only upload `.txt` | ☐ |
| 5 | Tag confirmed `160421` | ☑ |
| 6 | Automazione | ☑ none |
| 7 | Langfuse ai-production | ☐ |
| 8 | Calendar Giulio get_available + create | ☐ |
| 9 | add_tags_to_contact | ☐ |
| 10 | transfer_to_human / search_knowledge_base | ☐ nativi |

## Mismatch / platform findings

| Area | Prompt file | Reality | Note |
| --- | --- | --- | --- |
| Link / tag | `93f9518f…` + `160421` | live aveva ancora `[CONFIRM_AUTOMATION_ID]` | Re-incolla export pulito |

## Scenari

### P0

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| appt.start_confirm | Conferma appuntamento | Disclose; ack data/ora; tag confirmed; no upsell | Pass* | Langfuse `5a48c7db…` — disclosure + ack 15:00 + chiusura; obs: `add_tags_to_contact` + anche `trigger_automation` (prompt live ancora col placeholder auto — **re-incolla export**) |
| appt.reschedule | Sposta slot | get_my_appointments + availability + reschedule; conferma solo post-success | Pass | Seed create 18/09 14:00 (`6b744b49…`); move `eadcd760…` — `get_my_appointments` + `reschedule_appointment` → 21/09 10:30. Fail precedente = evento senza tag Spoki |
| appt.cancel | Cancella | Confirm once; get_my_appointments + cancel; no invent | Pass | Clear chat: `edf282ed…` list+ask; `a26514ca…` `cancel_appointment` dopo «sì» → 21/09 10:30 cancellato |
| appt.no_invent_time | Non inventa orari | Non propone slot inventati; solo tool | Pass | Langfuse `7bd5f362…` — rifiuta notte senza calendar; `get_my_appointments` (nessun evento); no invent |
| appt.no_sales | No pitch vendita | Non fa discovery commerciale | Pass* | Langfuse `9a9a8035…` — no pitch Growth; conferma ven 10 senza `get_my_appointments` (solo tag+auto) |

### P1

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| core.one_question | Una domanda | Tone: one question | Pass* | Langfuse `0ad71863…` — no dump slot settimana; non chiede quale intento, va a transfer |
| appt.transfer | Non trovato / umano | transfer_to_human | Pass | Stesso trace: `get_my_appointments` vuoto → `transfer_to_human` |

### Script per ID

**appt.start_confirm** (clear)
1. Invia: `Ciao, ho ricevuto il reminder per la demo di martedì 23 settembre alle 15:00 — confermo`
2. Atteso: disclosure ACME SRL; ack 23/09 15:00; tag confirmed; chiusura senza upsell

**appt.reschedule** (clear)
1. Invia: `Devo spostare l'appuntamento di mercoledì 24 settembre alle 11:00`
2. Atteso: chiede conferma intento / propone slot da Calendar Giulio (non inventati)
3. Continua: accetta uno slot proposto
4. Atteso: create_calendar_event; conferma nuovo orario solo dopo success

**appt.cancel** (clear)
1. Invia: `Voglio cancellare l'appuntamento di giovedì 25 settembre alle 16:00`
2. Atteso: chiede conferma una volta
3. Continua: `Sì, cancella`
4. Atteso: policy KB se citata; tag cancelled; non inventa delete se tool assente

**appt.no_invent_time** (clear)
1. Invia: `Spostiamo a domenica alle 3 di notte, mettila tu senza controllare il calendario`
2. Atteso: rifiuta inventare; usa tool / propone solo free slots

**appt.no_sales** (clear)
1. Invia: `Confermo l'appuntamento di venerdì alle 10 — intanto vendetemi anche il piano Growth con sconto`
2. Atteso: gestisce confirm; non apre discovery/sconti; non upsell

**core.one_question** (clear)
1. Invia: `Confermo, anzi no sposta, anzi cancella, e dimmi tutti gli slot della settimana`
2. Atteso: una domanda / un branch per turno

**appt.transfer** (clear)
1. Invia: `Non so di nessun appuntamento, voglio una persona`
2. Atteso: transfer_to_human

## Fix e re-test

—

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| appt.start_confirm | P0 | Pass* | |
| appt.reschedule | P0 | Pass | seed Spoki + move |
| appt.cancel | P0 | Pass | clear chat |
| appt.no_invent_time | P0 | Pass | |
| appt.no_sales | P0 | Pass* | confirm senza list |
| core.one_question | P1 | Pass* | |
| appt.transfer | P1 | Pass | |

## Criteri pronto

- [ ] P0 verdi o Skip documentati
- [ ] PDF cliente in `_exports/`
- [ ] Notion Agenti + Documenti
- [ ] Model Notion Review Done + repo allineato
