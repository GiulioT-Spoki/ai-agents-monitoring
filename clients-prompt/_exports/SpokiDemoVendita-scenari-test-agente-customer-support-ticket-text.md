# Spoki Demo Vendita — Scenari di test dell’assistente WhatsApp

**Agente:** [Template] Text — Customer Support ticket (after hours)  
**Account Spoki:** 9968  
**Tipo:** Testuale  
**Link agente:** https://app.spoki.com/ai/agent/51a1aef2-0f79-4d28-94f2-295315439f01  
**Data verifica:** 17 settembre 2026  
**Ambiente:** playground di test (ramo diurno)

---

## Contesto

Assistente inbound con **hours branch**: chiama `get_current_datetime` e, dentro 09:00–18:00 Europe/Rome, dichiara il team operativo e offre il passaggio a un operatore. Il path ticket fuori orario (`create_ticket` dopo conferma anagrafica) è **deferred** (da verificare dopo le 18:00). La depth diurna diagnose/ticket è già coperta dal modello Technical Support.

---

## Cosa è stato verificato

| Scenario | Esito | Cosa è stato controllato |
| --- | --- | --- |
| In-hours (tracking non aggiorna) | Pass | `get_current_datetime` Europe/Rome; team operativo; offre operatore; nessun fake offline; nessun tracking inventato |

Langfuse: `c23c494862f9a1fcf5b240d4acf5fbcd`

---

## Fuori scope in questa sessione

- Collect / confirm / `create_ticket` after-hours
- Smoke transfer sul “Sì” (chat playground chiusa)

---

## Note tecniche

- Agente DRAFT (`is_active=false`)
- Services UI: `create_ticket`, `set_contact_field_value` (natives datetime/transfer comunque usati nel ramo diurno)
- Prompt hours-branch sync 2026-09-17
