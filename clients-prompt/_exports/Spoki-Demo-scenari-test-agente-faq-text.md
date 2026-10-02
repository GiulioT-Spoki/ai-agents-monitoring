# Spoki Demo / ACME SRL — Scenari di test dell’assistente FAQ WhatsApp

**Agente:** [Template] Text - FAQ  
**Account Spoki:** 9968  
**Tipo:** Testuale (WhatsApp)  
**Link agente di test:** [app.spoki.com — playground](https://app.spoki.com/ai/agent/7f5c45c2-99e7-43f7-a41b-289da6652065)  
**Data verifica:** 28 settembre 2026  
**Ambiente:** playground di test

---

## Contesto

È stato verificato l’assistente FAQ inbound (tipo Custom) pensato per rispondere solo da knowledge base e passare a un operatore umano quando serve — senza prenotazioni, ticket, pagamenti o altre azioni.

Il lavoro ha coperto:

1. Prompt FAQ-only (testuale) allineato al template prodotto  
2. Knowledge base sample **ACME SRL** (how-to FAQ mockup) collegata all’agente  
3. Verifica pratica sul playground Spoki con scenari P0 e P1

---

## Cosa è stato verificato

### Accoglienza e risposte da documentazione

| Scenario | Cosa è stato controllato |
| --- | --- |
| Saluto | Si presenta come assistente automatico ACME e invita a una domanda |
| Domanda in KB | Spiega come registrarsi ad Area Clienti / app usando i passi della documentazione |
| Domanda fuori ambito | Non inventa (es. meteo) e resta sul perimetro ACME |

### Escalation e limiti d’azione

| Scenario | Cosa è stato controllato |
| --- | --- |
| Richiesta operatore | Passaggio a umano con conferma in chat |
| Richiesta di prenotazione | Non prenota; spiega che fa solo FAQ e offre un operatore |
| Prezzo inventato | Rifiuta di inventare condizioni economiche |

### Conversazione

| Scenario | Cosa è stato controllato |
| --- | --- |
| Più temi in un messaggio | Risponde al tema principale e chiede quale approfondire dopo |

---

## Interventi sul prompt legati ai test

| Tema | Intervento verificato |
| --- | --- |
| Più argomenti nello stesso messaggio | Rafforzata la regola: un solo tema per risposta, poi chiedere il successivo (re-test ok) |

---

## Note tecniche

- Agente in stato **DRAFT** / non attivo: adeguato per playground; da attivare solo dopo go-live reale  
- Temperature attuale **0.6** (il template prodotto indica Low, tipicamente ~0.3)  
- KB di demo ACME: da sostituire con la documentazione del cliente prima del go-live  
- Nessun tool di booking / ticket / CRM collegato (comportamento atteso)

---

## Prossimi passi operativi

1. Incollare/mantenere il system prompt aggiornato sull’agente Spoki  
2. Sostituire la KB sample con i documenti reali del cliente  
3. Valutare temperature ~0.3 e attivazione quando il template è pronto in produzione  
4. Per il twin vocale: stesso contenuto FAQ + **Platform Transfer** in Workflow (non `transfer_to_human`)
