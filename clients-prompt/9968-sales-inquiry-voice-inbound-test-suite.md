# Spoki Demo Vendita 9968 — Test suite Voice [Template] Voice — Sales Inquiry

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)  
**Cliente:** Spoki Demo Vendita  
**Agente:** [Template] Voice — Sales Inquiry  
**Tipo:** Vocale  
**Ambiente:** `voice_outbound` (automazione Spoki Voice → contatto test)  
**Link Spoki:** https://app.spoki.com/ai/agent/5e552738-0ba6-42c6-8c0c-8b7ce7ad8a8d  
**Automazione call:** TODO — avvia sempre sul contatto **+393349173929**  
**Prompt:** [`9968-sales-inquiry-voice-inbound.md`](9968-sales-inquiry-voice-inbound.md)  
**Path suite YAML:** `clients-prompt/9968-sales-inquiry-voice-inbound-suite.yaml`  
**KB:** [`9968-sales-inquiry-voice-inbound-kb.md`](../clients-kb/9968-sales-inquiry-voice-inbound-kb.md)  
**Langfuse:** [voice-agent](https://langfuse.ai.spoki.com/project/cmrw46ply0008o207yxewv4v1/traces)  
**Twin Text:** [`9968-sales-inquiry-text.md`](9968-sales-inquiry-text.md)  
**Model Notion:** [Voice — Sales Inquiry](https://app.notion.com/p/3e2e5c7af25c81e48865c23b6df98272)

Niente Shopify. Handoff sales-ready = tag `160407` poi `trigger_automation` `567520`. Persona ora = Workflow SIP. No Calendar. No `transfer_to_human`.

## Setup checklist

1. Agente ACTIVE + KB caricata  
2. Tag `160407` + auto [`567520`](https://app.spoki.com/automations/567520) attiva  
3. Actions: set_contact_field_value, add_tags_to_contact, trigger_automation  
4. Workflow SIP sales + End Call  
5. Automazione avvio call → +393349173929  

## Scenari P0

| id | Titolo | Atteso | Score |
|---|---|---|---|
| sales.start | No secondo saluto; chiede bisogno | Pass | Pass — call 51857; First message ok, no re-greet |
| sales.kb_price | Prezzo solo da KB (es. Starter €200) | Pass | Pass — `search_knowledge_base` + “duecento euro al mese” |
| sales.no_invent_discount | Niente sconto inventato; rimanda specialist | Pass | Pass — rifiuta 40%; offre specialist |
| sales.info_only | Solo info → chiude senza tag forzato | Pass | Pass — no tag/auto; `end_call` |
| sales.ready_tag | Campi mancanti → tag 160407 + auto 567520 | Pass* | Pass* — call 51861: FIRST/LAST/EMAIL + tag `SALES_INQUIRY` 160407 + auto 567520 (`482274989`); conferma post-success. Pass*: chiede nome+cognome in un turno |
| sales.person | Chiede commerciale → Workflow (no tool transfer) | Pass | Pass — call 51870: `platform_transfer` ok (user confirm); conferma “collega”, no SIP/Workflow leak; no `transfer_to_human` |
| voice.one_question | Una domanda per turno | Pass | Pass — una domanda per turno |
| voice.no_tool_leak | Nessun leak tool/tag/automation id | Pass | Pass — nessun leak |

## Notes

- Distinct from Lead Generation / Qualification (BANT). Distinct from Upselling (Shopify).
- **Call 1** `51857` / `vonage_call_AI_9968_aa07bcd6_1789983550_d8c965f7` (2026-09-21): Pass su start/kb/discount/info_only/one_question/no_leak.
- **Call 2** `51861` / `vonage_call_AI_9968_aa07bcd6_1789983737_f5730041` (~177s): sales.ready_tag Pass* — Growth KB €450; campi Marco Rossi + marco.rossi@email.com; tag 160407 + trigger 567520 ok; conferma solo dopo. Pass*: nome+cognome insieme; chiusura un po’ lenta (“pronto?”).
- **Call 3** `51870` / `vonage_call_AI_9968_aa07bcd6_1789984012_bd87f1e0` (~37s): sales.person Pass — “parlare con un commerciale” → (chiede nome) → “ora” → `platform_transfer` success + hold; utente conferma transfer ok.
