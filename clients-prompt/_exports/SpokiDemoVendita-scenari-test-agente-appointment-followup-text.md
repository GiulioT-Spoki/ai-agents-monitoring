# Spoki Demo Vendita — Scenari di test dell’assistente WhatsApp

**Agente:** [Template] Text — Appointment Follow-up  
**Account Spoki:** 9968  
**Tipo:** Testuale  
**Link agente:** https://app.spoki.com/ai/agent/93f9518f-1f26-4605-ab89-f4b4bc6d21b5  
**Data verifica:** 17 settembre 2026  
**Ambiente:** playground di test

---

## Contesto

È stato configurato e verificato l’assistente inbound di follow-up appuntamento (confirm / reschedule / cancel) dopo un reminder. Il lavoro ha incluso:

1. **Prompt operativo** per ACME SRL e allineamento al modello gallery con i tool Google Calendar aggiornati (`get_my_appointments`, `reschedule_appointment`, `cancel_appointment`).
2. **Tag confirmed** `160421` sul percorso di conferma (automazione opzionale lasciata in live anche se non punta a un ID reale).
3. **Knowledge base** fattuale (policy cancellazione, orari, solo eventi Spoki-tagged).
4. **Calendar Giulio** per list / availability / create / move / cancel.

Esito complessivo: **verificato playground** (alcune note Pass*).

---

## Cosa è stato verificato

### Conferma

| Scenario | Cosa è stato controllato |
| --- | --- |
| Conferma da reminder | Disclosure ACME; ack data/ora; tag 160421 (+ auto opzionale) |

### Spostamento e cancellazione (eventi Spoki)

| Scenario | Cosa è stato controllato |
| --- | --- |
| Seed booking + move | create → get_my_appointments → reschedule_appointment (18/09 14:00 → 21/09 10:30) |
| Cancel dopo clear chat | get_my_appointments senza storia chat → conferma → cancel_appointment |
| Evento senza tag Spoki | “non trovo / contatta sede” (comportamento atteso) |

### Limiti e stile

| Scenario | Cosa è stato controllato |
| --- | --- |
| Slot inventato (domenica 3 di notte) | Rifiuto; nessun orario inventato |
| Pitch vendita / sconto | Nessun discovery commerciale (nota: confirm senza list in un caso) |
| Multi-intento | Un percorso; transfer se non trova appuntamento |
| Transfer | transfer_to_human quando non c’è booking Spoki |

---

## Note tecniche

- Agente: https://app.spoki.com/ai/agent/93f9518f-1f26-4605-ab89-f4b4bc6d21b5  
- Tag confirmed: `160421`  
- Solo appuntamenti creati via Spoki per il contatto sono listabili/modificabili  
- Agente in bozza (DRAFT) al momento del test playground  

---

## Prossimi passi operativi

1. Re-incollare il system prompt export aggiornato (list / move / cancel espliciti).  
2. Evitare “confermo” senza `get_my_appointments` quando l’evento non è in thread.  
3. Attivare in live dopo smoke su contatto di test.
