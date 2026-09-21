# Spoki Demo Vendita 9968 — Test suite Voice [Template] Voice — Customer support native ticket

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)  
**Cliente:** Spoki Demo Vendita  
**Agente:** [Template] Voice — Customer support native ticket  
**Tipo:** Vocale  
**Ambiente:** `voice_outbound` (automazione Spoki Voice → contatto test)  
**Link Spoki:** https://app.spoki.com/ai/agent/69416af8-f811-4fc5-8f02-4881e5d2a059  
**Automazione call:** TODO — avvia sempre sul contatto **+393349173929**  
**Prompt:** [`9968-customer-support-voice-inbound-native-ticket.md`](9968-customer-support-voice-inbound-native-ticket.md)  
**Path suite YAML:** `clients-prompt/9968-customer-support-voice-inbound-native-ticket-suite.yaml`  
**KB:** [`9968-customer-support-voice-inbound-native-ticket-kb.md`](../clients-kb/9968-customer-support-voice-inbound-native-ticket-kb.md) · upload `~/Downloads/9968-customer-support-voice-inbound-native-ticket-kb.txt`  
**Langfuse:** [voice-agent](https://langfuse.ai.spoki.com/project/cmrw46ply0008o207yxewv4v1/traces)  
**Model Notion:** [Voice — Customer support native ticket](https://app.notion.com/p/3dce5c7af25c8141969afff0036edeb3) — Review **In progress**  
**Preset:** #1 Technical Support (Voice missing) + #9 Customer Support VOICE

Ticket nativo `create_ticket` only. No webhook. No Calendar. Persona live = Workflow Platform Transfer (no `transfer_to_human`).

## Setup checklist

1. Agente ACTIVE + prompt ACME incollato  
2. KB `.txt` caricata e bound  
3. Actions: set_contact_field_value + create_ticket  
4. Tools: search_knowledge_base + get_current_datetime  
5. Workflow: End Call + Platform Transfer  
6. Automazioni 566059 / 566063  
7. Automazione avvio call → +393349173929  

## Scenari P0

| id | Titolo | Atteso | Score |
|---|---|---|---|
| v.faq_hit | «Che orari avete?» con KB → search_knowledge_base, risponde solo dal hit, no invent | pending | pending |
| v.faq_gap | Fatto fuori KB → non inventa; offre ticket o persona | pending | pending |
| v.ticket | Problema operativo + sì → EMAIL se missing + create_ticket; conferma solo post-success | pending | pending |
| v.identity_known | Identity già nota → niente scanditura; ticket order ok | pending | pending |
| v.human | «Voglio parlare con una persona» → Platform Transfer, non ticket di default | pending | pending |
| voice.one_question | Una domanda per turno | pending | pending |
| voice.no_tool_leak | Nessun leak tool/action/workflow | pending | pending |

## Notes

- Closest Voice twin for Preset #1 Technical Support until a dedicated Technical Support Voice exists.
- First call target: **v.faq_hit** then **v.ticket**.
