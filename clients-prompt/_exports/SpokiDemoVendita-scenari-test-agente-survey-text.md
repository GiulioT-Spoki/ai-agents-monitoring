# Spoki Demo Vendita — Scenari di test dell’assistente WhatsApp

**Agente:** [Template] Text — Survey / CSAT  
**Account Spoki:** 9968  
**Tipo:** Testuale  
**Link agente:** https://app.spoki.com/ai/agent/4b2dbb48-b860-4450-8a63-04d10d417adc  
**Data verifica:** 17 settembre 2026  
**Ambiente:** playground di test

---

## Contesto

È stato configurato e verificato l’assistente inbound di sondaggio / CSAT. Il lavoro ha incluso:

1. **Prompt operativo** allineato al modello Notion *Text — Survey / CSAT*, con brand ACME SRL, domande in sequenza (score 1–5, cosa è andato bene, cosa migliorare, consenso ricontatto), azioni campo/tag su righe separate.
2. **Allineamento live** rispetto a un draft con azioni concatenate (`tag_ids=160399@@6.`) e brand inconsistente — prompt re-incollato corretto.
3. **Persistenza risposte** via campi `CSAT_SCORE` / `CSAT_WENT_WELL` / `CSAT_IMPROVE` e tag `FEEDBACK_CALLBACK` (160399) / `SURVEY_COMPLETED` (160400). Nessuna automazione richiesta per questo template.
4. **Detrattori (score ≤2):** offerta di passaggio a operatore umano; in playground il tool `transfer_to_human` non risultava ancora legato in UI (offerta verbale verificata).

Gli scenari sotto sono stati eseguiti sul playground. Esito complessivo: **verificato** con note minori (transfer da bindare; una domanda per messaggio da rafforzare sul path detrattore).

---

## Cosa è stato verificato

### Avvio e validazione score

| Scenario | Cosa è stato controllato |
| --- | --- |
| Avvio sondaggio | Disclosure ACME SRL; chiede subito lo score 1–5 |
| Score valido | Salva `CSAT_SCORE`; passa alla domanda successiva |
| Score non numerico (“molto soddisfatto”) | Chiede una volta un intero da 1 a 5 |

### Flusso completo e rifiuto

| Scenario | Cosa è stato controllato |
| --- | --- |
| Happy path (score alto + sì al ricontatto) | Campi + tag callback + tag survey completed; ringrazia e chiude |
| Rifiuto sondaggio | Ringrazia e chiude senza porre le domande |
| Skip commenti | Accetta “salta” su Q2/Q3 e prosegue |

### Detrattore e chiusura

| Scenario | Cosa è stato controllato |
| --- | --- |
| Score basso (1) | Propone contatto con operatore; nessun pitch commerciale |
| Dopo chiusura / “ok grazie” | Non riapre il questionario |
| Una domanda per messaggio | Fallito sul path score basso: offerta transfer + Q2 nello stesso messaggio |

---

## Interventi sul prompt legati ai test / feedback

| Tema | Intervento verificato |
| --- | --- |
| Brand | ACME SRL (non AcmeSRL / placeholder) |
| Azioni | Una `@@action` per riga; niente concatenazione tag+prosa |
| Campi / tag | Codici reali CSAT_* e ID 160399 / 160400 |
| Tools | Field value + tag; transfer dichiarato ma da bindare in UI |

---

## Note tecniche (tool / piattaforma)

- `attached_services` in playground: `set_contact_field_value`, `add_tags_to_contact`. `transfer_to_human` assente al momento del test (detractor = Pass* su offerta verbale).
- I campi dinamici già popolati non vengono azzerati dall’agente tra run: in playground conviene clear chat / nuovo contatto quando il residuo confonde.
- Temperature live osservata a 0.8 (modello suggerisce low) — opzionale.
- Agente ancora in bozza (`DRAFT` / `is_active=false`) al momento del test playground.

---

## Prossimi passi operativi

1. Bindare `transfer_to_human` in UI e re-testare solo lo scenario detrattore.
2. Rafforzare “one question per message” dopo score ≤2 (offer transfer **oppure** prossima domanda, non entrambi).
3. Attivare l’agente in live solo dopo sync definitivo e smoke su contatto di test.
