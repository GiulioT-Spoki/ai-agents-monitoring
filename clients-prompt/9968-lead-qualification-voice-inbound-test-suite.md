# Spoki Demo Vendita 9968 — Test suite Voice [Template] Voice — Lead qualification inbound

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)
**Cliente:** Spoki Demo Vendita
**Agente:** [Template] Voice — Lead qualification inbound
**Tipo:** Vocale
**Ambiente:** `voice_outbound` (automazione Spoki Voice → contatto test)
**Link Spoki:** https://app.spoki.com/ai/agent/838ae850-3531-4c66-b895-6eca1b0e8d66
**Automazione call:** [567663](https://app.spoki.com/automations/567663) — avvia sempre la chiamata sul contatto **+393349173929**
**Prompt:** [`9968-lead-qualification-voice-inbound.md`](9968-lead-qualification-voice-inbound.md)
**Path suite YAML:** `clients-prompt/9968-lead-qualification-voice-inbound-suite.yaml`
**KB:** [`9968-lead-qualification-voice-inbound-kb.md`](../clients-kb/9968-lead-qualification-voice-inbound-kb.md)
**Langfuse:** [voice-agent](https://langfuse.ai.spoki.com/project/cmrw46ply0008o207yxewv4v1/traces?searchType=id&searchType=content&search=838ae850-3531-4c66-b895-6eca1b0e8d66)

Niente gemello testuale. Ogni scenario = chiamata via automazione **567663** sul contatto **+393349173929**. Score: transcript parlato + span Langfuse `voice-agent` (tool name, args, observation) + no leak.

## Come iniziare ora

1. Sync system prompt da Downloads: `9968-lead-qualification-voice-inbound-system-prompt.txt`
2. First message = stringa nel file prompt
3. KB `.txt`: `9968-lead-qualification-voice-inbound-kb.txt`
4. Tools: `sales-rep-calendar-booking` (methods get_available_time_slots, create_calendar_event bare) + search_knowledge_base + get_current_datetime
5. Actions: `set_contact_field_value` (FIRST_NAME, LAST_NAME, EMAIL)
6. Contatto fisso: **+393349173929** (campi vuoti o noti a seconda dello scenario)
7. Lancia [automazione 567663](https://app.spoki.com/automations/567663)
8. Dopo ogni call: “controlla ultimo tracing” (o call/trace id)

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Prompt sync (body = export 2026-09-17, no Creating-the-event duplicato) | ☐ |
| 2 | KB collegata `.txt` | ☐ |
| 3 | Tool calendar bind (UI) → runtime `get_available_time_slots` + `create_calendar_event` | ☐ |
| 4 | `search_knowledge_base` + `get_current_datetime` | ☐ |
| 5 | Actions set_contact_field_value | ☐ |
| 6 | Automazione [567663](https://app.spoki.com/automations/567663) → **+393349173929** | ☑ |
| 7 | Langfuse voice-agent search agent id | ☑ URL sopra |

## Scenari P0 — voice_outbound

| ID | Scenario | Contatto | Atteso | Pass | Trace |
| --- | --- | --- | --- | --- | --- |
| v.greeting | Apertura | FIRST_NAME vuoto | Dopo First Message: no secondo saluto; chiede nome (1 domanda) | ☑ Pass | [51109](https://langfuse.ai.spoki.com/project/cmrw46ply0008o207yxewv4v1/traces?searchType=id&searchType=content&search=5fef65935ffbda5f14c984cf0090f1d5) |
| v.bant | BANT 1:1 | nome noto o raccolto | role/company → need → budget soft → timeline; una domanda a turno; KB se FAQ | ☑ path ok* | stessa call — ordine BANT ok; doppia domanda ruolo+azienda |
| v.faq | Prezzo | qualunque | `search_knowledge_base`; ~€200/mese; no invent; no leak tool | ☐ | |
| v.not_fit | Consumer | vuoto ok | dopo KB → not fit; ringrazia; chiude; no book | ☐ | |
| v.book | Happy path qualify+book | ideale: nome noto, email da raccogliere | qualify → LAST_NAME/EMAIL → slot 15-min → book solo dopo tool success; Attendees = email confermata | ☑ Pass | [51136](https://langfuse.ai.spoki.com/project/cmrw46ply0008o207yxewv4v1/traces?searchType=id&searchType=content&search=d753c7122a371bcb0cba1c3b141f5a96) — Meet lun 21/09 10:30, 1× create ok |

### Overlay (stessa call o Start Call)

| ID | Atteso | Pass | Note |
| --- | --- | --- | --- |
| voice.short_turns | max 2–3 frasi | ☑ Pass | call 51109 |
| voice.one_question | una domanda | ☒ Fail | ruolo+azienda; cognome+email |
| voice.no_tool_leak | no nomi tool/action | ☑ Pass | |

## Script operatore (quando risponde)

**v.greeting**
- Contatto senza FIRST_NAME
- Dopo il first message, di’: qualcosa tipo “Vorrei capire se Spoki fa per la mia azienda”
- Atteso: non risaluta; chiede solo il nome

**v.faq** (call dedicata o mid-flow)
- “Quanto costa il piano starter al mese?”
- Atteso: KB; range ~200 €; non inventa

**v.not_fit**
- Profilo: uso personale, chatbot gratis, niente azienda / budget zero
- Atteso: not fit; chiude; niente discovery

**v.book**
- Titolare B2B, WhatsApp inbound, budget ~300 €/mese, start entro un mese
- Poi cognome + email (spell + conferma)
- Accetta discovery + primo slot proposto
- Atteso: `get_current_datetime` → `get_available_time_slots` (weekday in `free_slots_by_day`, o 2ª query se solo weekend) → `create_calendar_event` con start/end locale Europe/Rome sullo slot accettato; conferma solo dopo success; zero slot inventati

## Fix e re-test

- **voice.one_question (prompt):** rinforzare “one question at a time” — in call 51109 ha chiesto ruolo+azienda e cognome+email nello stesso turno.
- **Calendar Voice (prompt, patched 2026-09-18):** call 51109 inventava slot → already booked ×4. **call 51136** re-test Pass: propose 10:30 da free_slots_by_day, create 1× success locale, zero invent.
- **Budget gray (€150 / €170-180):** KB soft ≥€200, hard not-fit solo &lt;€100 — ha bookato comunque. Opzionale: chiarire fascia 100–199 in KB/prompt.
- **v.faq / v.not_fit:** ancora da call dedicate.
- **call 51136 note:** first message “ACME SRL” + secondo saluto; leak TTS `<emotion …/>`.

## Esiti

| ID | Pass | Note |
| --- | --- | --- |
| v.greeting | ☑ Pass | call 51109 / trace `5fef6593…` |
| v.bant | ☑* | ordine ok; doppia domanda |
| v.faq | ☐ | non eseguito |
| v.not_fit | ☐ | non eseguito |
| v.book | ☑ Pass | call 51136 / trace `d753c712…` — create 1× ok |
| voice.short_turns | ☑ Pass | |
| voice.one_question | ☒ Fail | prompt |
| voice.no_tool_leak | ☑ Pass | |
