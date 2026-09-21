# Spoki Demo Vendita — Scenari di test dell’assistente WhatsApp

**Agente:** [Template] Text — Marketing reply and consent  
**Account Spoki:** 9968  
**Tipo:** Testuale  
**Link agente:** https://app.spoki.com/ai/agent/352f785c-6ab3-41f3-af8f-934d482c43fb  
**Data verifica:** 17 settembre 2026  
**Ambiente:** playground di test

---

## Contesto

È stato configurato e verificato l’assistente di marketing inbound (risposte a campagne, promozioni da knowledge base, consenso commerciale). Il lavoro ha incluso:

1. **Prompt operativo** allineato al modello Notion *Text — Marketing reply and consent*, con brand ACME SRL, azioni tag + automazione separate, e tools dichiarati.
2. **Allineamento live** rispetto a un draft iniziale incompleto (nome brand, opt-out senza azione, sezione Tools incompleta).
3. **Knowledge base fattuale** (`marketing-consent-kb`) con promozioni attive/scadute e FAQ consenso, senza inventare codici o scadenze.
4. **Consenso marketing** gestito tramite tag `MARKETING_OPT_IN` / `MARKETING_OPT_OUT` e automazione `CAMPAIGN_REPLY` (Marketing Acceptance aggiornato dall’automazione, non dall’agente).

Gli scenari sotto sono stati eseguiti sul playground. Esito complessivo: **verificato** (due note minori non bloccanti).

---

## Cosa è stato verificato

### Promozioni e knowledge base

| Scenario | Cosa è stato controllato |
| --- | --- |
| Promo / piano senza offerta attiva | Risponde dalla KB; non inventa promozioni; brand ACME SRL |
| Richiesta di codice sconto inventato | Rifiuta; non crea codici fuori KB |
| Codice promo scaduto | Indica scadenza/campagna passata; nessuna sostituzione inventata |

### Consenso e risposte campagna

| Scenario | Cosa è stato controllato |
| --- | --- |
| Iscrizione marketing | Dopo conferma: tag opt-in e avvio automazione consenso |
| Disiscrizione / stop | Tag opt-out e automazione; conferma assenza di messaggi promozionali |
| Reply “interessato” a campagna | Tag opt-in e automazione; risposta breve sulla promo attiva |

### Passaggio umano e stile

| Scenario | Cosa è stato controllato |
| --- | --- |
| Richiesta commerciale / operatore | Trasferimento a umano, conferma solo dopo esito positivo |
| Domanda multipla (promo + consenso) | Una sola domanda di follow-up; risposta un po’ più lunga del tono ideale |

---

## Interventi sul prompt legati ai test / feedback

| Tema | Intervento verificato |
| --- | --- |
| Brand | Correzione da AcmeSRL a ACME SRL nel corpo operativo |
| Opt-out | Azione tag dedicata + stessa automazione del consenso |
| Marketing Acceptance | Tag prima, poi `trigger_automation` (il campo non è impostato dall’agente) |
| Tools | Dichiarazione KB, datetime, transfer e azioni consenso |

---

## Note tecniche (KB / tool / piattaforma)

- L’associazione tools in UI può risultare vuota; in playground KB, datetime, transfer, tag e automazione risultano comunque utilizzabili.
- Opt-out: in un run ha applicato subito tag+auto senza chiedere la conferma una volta prevista dal prompt (esito comunque operativo).
- Reply campagna: tag e automazione a volte nello stesso turn in parallelo (entrambi con successo).
- Agente ancora in bozza (`is_active=false`) al momento del test playground.

---

## Prossimi passi operativi

1. Tenere allineati prompt e KB sul template / eventuali copie cliente.
2. Se si vuole conferma esplicita sull’opt-out, rafforzare la regola “confirm once” nel prompt e re-testare solo quello.
3. Attivare l’agente in live solo dopo sync definitivo e smoke su contatto di test.
