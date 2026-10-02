# ACME / Demo 9968 — Test suite Voice [Template] Voice - FAQs

**Account Spoki:** 9968  
**Cliente:** Spoki Demo Vendita / ACME SRL  
**Agente:** [Template] Voice - FAQs  
**Tipo:** Vocale  
**Ambiente:** Playground  
**Link Spoki:** https://app.spoki.com/ai/agent/2b20d8bd-33e9-4e46-b648-55f508b778c7  
**Twin text:** https://app.spoki.com/ai/agent/7f5c45c2-99e7-43f7-a41b-289da6652065  
**KB:** `faq-howto-sample-kb`  
**Langfuse:** [voice-agent](https://langfuse.ai.spoki.com/project/cmrw46ply0008o207yxewv4v1/traces?searchType=id&searchType=content&search=2b20d8bd-33e9-4e46-b648-55f508b778c7)

## Overlay voice (2026-09-28)

| ID | Scenario | Pass | Note |
| --- | --- | --- | --- |
| faq.v.in_kb | Registrazione app | Pass | call 55461 — search_kb |
| faq.v.gap | Meteo | Pass | 55461 — non inventa |
| faq.v.no_task | Prenota tecnico | Pass | 55461 — FAQ only + offer |
| faq.v.transfer | Platform Transfer | Pass | call 55465 — tool fired |
| faq.v.one_question | Multi-topic | Pass | call 55469 — accettato (ASR/barge-in) |
| faq.v.end | Chiusura | Pass | 55469 — end_call |

## Criteri pronto

- [x] Overlay voice Pass
- [x] PDF cliente
- [x] Notion Agenti + Documenti
