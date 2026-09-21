# ACME SRL — Knowledge base (appointment follow-up demo)

Demo KB for `[Template] Text — Appointment Follow-up` (account 9968). Facts only. Live free slots and event create/cancel come from the calendar tool, not from this file.

## Company

- Legal name: ACME SRL
- What this assistant handles: confirm, reschedule, or cancel an **existing** appointment after a reminder
- What it does **not** handle: new sales discovery, first-time booking from scratch, technical support tickets, marketing opt-in/out

## Appointment context (demo)

- Typical appointments: product demo / commercial call (60 minutes)
- Timezone: Europe/Rome
- Reminder is sent by automation/template; this agent only handles the inbound reply
- If the thread or contact field already shows date/time, reuse it — do not invent a different appointment
- Only appointments **created via Spoki for this contact** are listable / movable / cancellable (contact tag on the event). Hand-created Google events or other contacts' bookings are out of scope — direct the user to human staff

## Hours

- Office hours for live staff: Monday–Friday, 09:00–18:00 (Europe/Rome)
- Outside those hours: still confirm / offer slots from the calendar tool; do not promise an immediate human callback

## Cancellation policy

- Free cancellation up to **24 hours** before the appointment start
- Inside 24 hours: the slot is released but a no-show may be noted for sales follow-up — do not invent fees or penalties beyond this
- Do not invent refunds (demos are free)

## Reschedule rules

- Propose only free slots returned by the calendar tool (max 2–3 options)
- Same duration as the original appointment unless the tool returns a different slot length (typically 60 minutes)
- Confirm the new time only after a successful calendar create/reschedule tool response

## Contact

- Website (demo): https://www.acme-demo.example
- If the appointment cannot be found or calendar tools fail repeatedly: transfer to human
