# 99999 — Onboarding — example actions — runtime flow (internal)

Solid = already in the prompt (cite the section). `da_scrivere` = advised, not written yet.

```mermaid
flowchart TD
  msg[Messaggio]
  greet[Greeting_AI_Act]
  firstName[Raccogli_FIRST_NAME]
  lastName[Raccogli_LAST_NAME]
  email[Raccogli_EMAIL]
  tagBase[add_tags_151559]
  consent{Consenso_marketing}
  tagYes[add_tags_151560]
  tagNo[add_tags_151561]
  confirmPhone[Conferma_PHONE]
  getTags[get_contact_tags]
  triggerAuto[trigger_automation_526194]
  transfer[transfer_to_human da_scrivere]

  msg --> greet --> firstName --> lastName --> email --> tagBase --> consent
  consent -->|Si| tagYes --> confirmPhone --> getTags --> triggerAuto
  consent -->|No| tagNo --> getTags
  greet -.->|Rifiuto_o_umano| transfer
```

- Solid: TRANSPARENCY, ONBOARDING FLOW, ACTIONS
- `transfer_to_human` = `da_scrivere` (rifiuto dati / richiesta umano)
- No KB, datetime, calendar
