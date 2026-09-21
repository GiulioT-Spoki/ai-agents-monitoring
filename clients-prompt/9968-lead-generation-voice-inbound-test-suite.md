# Spoki Demo Vendita 9968 — Test suite Voice [Template] Voice — Lead Generation inbound

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)  
**Cliente:** Spoki Demo Vendita  
**Agente:** [Template] Voice — Lead Generation inbound  
**Tipo:** Vocale  
**Ambiente:** `voice_outbound` (automazione Spoki Voice → contatto test)  
**Link Spoki:** TODO (crea agente)  
**Automazione call:** TODO — avvia sempre sul contatto **+393349173929**  
**Prompt:** [`9968-lead-generation-voice-inbound.md`](9968-lead-generation-voice-inbound.md)  
**Path suite YAML:** `clients-prompt/9968-lead-generation-voice-inbound-suite.yaml`  
**KB:** [`9968-lead-generation-voice-inbound-kb.md`](../clients-kb/9968-lead-generation-voice-inbound-kb.md)  
**Langfuse:** [voice-agent](https://langfuse.ai.spoki.com/project/cmrw46ply0008o207yxewv4v1/traces)  
**Model Notion:** [Voice — Lead Generation inbound](https://app.notion.com/p/3dfe5c7af25c816c8f58d82e328cd320)

Niente gemello booking. Handoff **solo async** (tag `160327` + `trigger_automation`). No Calendar. No `transfer_to_human`.

## Setup checklist

1. Agente ACTIVE + KB caricata  
2. Tag 160327 / 160328  
3. Automazione callback [`567520`](https://app.spoki.com/automations/567520?step_id=1846061) attiva  
4. Automazione avvio call → +393349173929  

## Scenari P0

| id | Titolo | Atteso | Score |
|---|---|---|---|
| v.greeting | No secondo saluto; chiede nome se FIRST_NAME vuoto | Pass pending | pending |
| v.qualify_async | Fit → campi + tag 160327 + trigger_automation + conferma solo post-success | Pass pending | pending |
| v.not_fit | Not fit → spiegazione KB; tag 160328 opzionale; no callback sales hot | Pass pending | pending |
| v.no_calendar | Nessun get_available_time_slots / create_calendar_event | Pass pending | pending |
| voice.one_question | Una domanda per turno | Pass pending | pending |
| voice.no_tool_leak | Nessun leak tool/tag/automation id | Pass pending | pending |

## Notes

- Distinct from Voice Lead **qualification** (books discovery). This agent only tags + async automation.
- Wire-test blocked until Spoki agent + callback automation exist.
