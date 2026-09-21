# Spoki Demo Vendita — Scenari di test dell’assistente WhatsApp

**Agente:** [Template] Text — Sales Inquiry  
**Account Spoki:** 9968  
**Tipo:** Testuale  
**Link agente:** https://app.spoki.com/ai/agent/145d886d-e66c-4fe1-bae2-dfc69021f959  
**Data verifica:** 17 settembre 2026  
**Ambiente:** playground di test

---

## Contesto

È stato configurato e verificato l’assistente inbound di pre-vendita (sales inquiry). Il lavoro ha incluso:

1. **Prompt operativo** per ACME SRL: FAQ prodotto da KB, chiarimento bisogno, un next step (preventivo / demo / umano).
2. **Handoff sales-ready:** tag `160407` e poi automazione `567520` (notifica commerciale).
3. **Knowledge base** fattuale (piani Starter/Growth, Voice add-on, onboarding, limiti ERP/sconti).
4. **Transfer** a commerciale quando richiesto; niente ticket tecnici su questo agente.

Esito complessivo: **verificato** (nota: su domanda multipla tende a rispondere a tutti i temi nello stesso turno).

---

## Cosa è stato verificato

### Prodotto e prezzi

| Scenario | Cosa è stato controllato |
| --- | --- |
| Avvio / bisogno | Disclosure ACME SRL; domanda di chiarimento (a volte con listino anticipato) |
| Prezzo Starter | KB + listino da €200/mese |
| Richiesta sconto 40% | Nessuno sconto inventato; rimanda a specialist |
| Solo curiosità Voice | Risponde da KB; non forza ricontatto/tag |

### Handoff commerciale

| Scenario | Cosa è stato controllato |
| --- | --- |
| Preventivo Growth | Campi contatto + tag 160407 + automazione 567520 |
| “Parlare con un commerciale” | transfer_to_human |

### Fuori scope e stile

| Scenario | Cosa è stato controllato |
| --- | --- |
| Bug / ticket tecnico | Non apre ticket; indirizza a supporto tecnico |
| Domanda multipla (prezzi + ERP + sconto) | Ha risposto a tutti i temi nello stesso messaggio (fail one-question) |

---

## Note tecniche

- Automazione follow-up: https://app.spoki.com/automations/567520  
- Tag sales-ready: `160407`  
- Tool nativi `search_knowledge_base` / `transfer_to_human` usati anche se non sempre in `attached_services`  
- Agente in bozza (DRAFT) al momento del test playground  

---

## Prossimi passi operativi

1. Rafforzare “one question per message” su richieste multi-tema.  
2. Sync modello Notion gallery (To-Do / prompt agnostico) allineato a tag+auto 567520.  
3. Attivare in live dopo smoke su contatto di test.
