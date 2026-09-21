# Spoki Demo Vendita 9968 — Test suite Voice [Template] Voice — Survey / CSAT

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)  
**Cliente:** Spoki Demo Vendita  
**Agente:** [Template] Voice — Survey / CSAT  
**Tipo:** Vocale  
**Ambiente:** `voice_outbound` (automazione Spoki Voice → contatto test)  
**Link Spoki:** https://app.spoki.com/ai/agent/1ca555cd-39ec-4842-9071-6617fa1d354a  
**Automazione call:** TODO — avvia sempre sul contatto **+393349173929**  
**Prompt:** [`9968-survey-voice-inbound.md`](9968-survey-voice-inbound.md)  
**Path suite YAML:** `clients-prompt/9968-survey-voice-inbound-suite.yaml`  
**KB:** nessuna  
**Langfuse:** [voice-agent](https://langfuse.ai.spoki.com/project/cmrw46ply0008o207yxewv4v1/traces)  
**Twin Text:** [`9968-survey-text.md`](9968-survey-text.md)  
**Model Notion:** [Voice — Survey / CSAT](https://app.notion.com/p/3e2e5c7af25c8160afa8fa95abcbf79a)

Campi `CSAT_SCORE` / `CSAT_WENT_WELL` / `CSAT_IMPROVE`. Tag callback `160399`, completed `160400`. Detractor ≤2 = Workflow / `platform_transfer` (no `transfer_to_human`). Niente ticket, niente KB.

## Setup checklist

1. Agente ACTIVE (temp Low)  
2. Actions: set_contact_field_value, add_tags_to_contact  
3. Campi CSAT_* + tag 160399 / 160400  
4. Workflow SIP/Platform Transfer support-CS + End Call  
5. Automazione avvio call → +393349173929  

## Scenari P0

| id | Titolo | Atteso | Score |
|---|---|---|---|
| survey.happy | Score 4–5 → Q2/Q3/Q4 → tag 160400 | Pass* | Pass* — call 51884: score 4 + callback 160399 + completed 160400 ok; Q3 skip ok. Pass*: scrive `CSAT_WENT_WELL` prima della risposta utente (valore inventato poi corretto) |
| survey.detractor | Score ≤2 → sola offerta persona → platform_transfer | Pass | Pass — call 51893 (~47s): dopo “uno” solo offerta collega; transfer arrivato (conferma operatore). Transcript items vuoti post-transfer (atteso) |
| survey.decline | Rifiuta sondaggio → grazie e fine, no tag forzato | Pass | Pass — call 51900 (~40s): “No grazie, non voglio fare il sondaggio” → grazie + `end_call`; nessun `set_contact_field_value` / `add_tags_to_contact` |
| survey.skip_comments | Skip Q2/Q3 ammessi; completa Q4 + 160400 | pending | pending — Call 1 ha solo Q3 skip; serve call dedicata skip Q2+Q3 |
| voice.one_question | Una domanda per turno (detractor: no Q2 nello stesso turno) | Pass | Pass — call 51893: dopo score basso solo offerta collega, no Q2 nello stesso turno (conferma operatore) |
| voice.no_tool_leak | Nessun leak tool/tag/field id | Pass | Pass — call 51900: nessun nome tool / field code / tag id parlato |

## Notes

- Twin di Text Survey / CSAT. First message già chiede lo score 1–5.
- Agent: https://app.spoki.com/ai/agent/1ca555cd-39ec-4842-9071-6617fa1d354a
- **Call 1** `51884` (2026-09-21): survey.happy Pass* — CSAT_SCORE=4; tag 160399→160400; end_call. Pass*: `CSAT_WENT_WELL` scritto in anticipo con testo inventato, poi aggiornato.
- **Call 2** `51893` (2026-09-21): survey.detractor + voice.one_question **Pass** — dopo “uno” solo offerta collega; transfer arrivato (conferma operatore). `transcription.items=[]` post-transfer (atteso).
- **Call 3** `51900` (2026-09-21): survey.decline + voice.no_tool_leak **Pass** — decline → grazie + `end_call`; zero field/tag writes; no leak. (Platform eval `REJECTED`/score 1 = auto-quality, non suite.)
