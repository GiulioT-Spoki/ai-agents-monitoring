# Suite — 9968 Voice Appointment Follow-up

Scores: call **51353** — reschedule + cancel **Pass**. Confirm non bloccante (tag / altri metodi Spoki).

| ID | Priority | Title | Score |
|----|----------|-------|-------|
| appt.voice.start_confirm | P0 | Conferma + get_my_appointments + tag 95900 | n/a (altri metodi OK) |
| appt.voice.reschedule | P0 | Reschedule + trigger_automation 568043 | Pass (51353) |
| appt.voice.cancel | P0 | Cancel sì/no + trigger_automation 568042 | Pass (51353; auto infra flake) |
| appt.voice.no_invent_slot | P1 | No slot inventati | pending |
| appt.voice.no_upsell | P1 | No vendita | pending |
| appt.voice.not_found_transfer | P1 | Non trovato → Workflow | pending |

## Setup before P0

1. Agente Voice + prompt/KB/`sales-rep-calendar-booking`/tag `95900`/Workflow.
2. Automazioni agent-started attive: `568043` (modificato) e `568042` (cancellato).
3. Seed appuntamento Spoki-tagged sul contatto +393349173929.
4. **No** `APPUNTAMENTO_DATAORA` nel prompt; **no** tag reschedule/cancel.
5. Call outbound → agente follow-up.

## YAML

`clients-prompt/9968-appointment-followup-voice-inbound-suite.yaml`
