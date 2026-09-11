# Boldrin Group — Scenari di test dell’assistente WhatsApp (chiusura estiva)

**Agente:** Vendita Boldrin Group — variante chiusura estiva  
**Account Spoki:** 43885  
**Link agente:** https://app.spoki.com/ai/agent/07443c26-93bd-4681-b6df-a8e9c6b7815e  
**Data verifica:** 4 agosto 2026  
**Ambiente:** playground di test

---

## Contesto

È stato configurato e verificato un assistente conversazionale WhatsApp dedicato al periodo di **chiusura estiva aziendale (10–21 agosto)**. Il lavoro ha incluso:

1. **Prompt operativo** dell’Agente Vendita allineato al catalogo Prestashop (tool di ricerca prodotti), con regole fail-closed su prezzi, link scheda e codici articolo.
2. **Variante chiusura estiva** attivabile solo nel periodo indicato: in caso di passaggio a operatore (post-vendita, prodotto non in catalogo, quotazioni, ecc.) l’assistente invita a scrivere **Assistenza** in chat e a contattare **info@boldrintech.it**, informando sulla pausa 10–21 agosto e sull’evasione ordini eCommerce dal **25 agosto**.
3. **Correzione post-test:** il messaggio di handover estivo è stato reso bilingue (italiano / inglese) in base alla lingua del cliente.

Questo agente **non** decide la chiusura in base alla data di sistema: va sostituito all’agente vendite normale solo nel periodo di chiusura, e ripristinato dopo il 21 agosto.

Gli scenari sotto sono stati eseguiti sul playground con il prompt aggiornato. Tutti risultano **verificati**, salvo un caso non riproducibile in playground (scheda senza URL nel tool).

---

## Cosa è stato verificato

### Raccolta informazioni e catalogo

| Scenario | Cosa è stato controllato |
| --- | --- |
| Richiesta generica di riduttore di pressione | Chiede il tipo di gas (GPL o metano) prima di cercare; non propone prodotti a memoria |
| Acquisto con codice articolo (es. RG001.35) | Chiama il catalogo Prestashop; mostra nome, prezzo e link scheda; non inventa URL |
| Prefisso lingua sul link | Aggiunge `/it/` (o `/en/` in inglese) solo se assente nell’URL restituito dal catalogo |
| Accessori per attacco 20×1,5 | Elenca solo i prodotti restituiti dal catalogo, ciascuno con link reale |
| Inversore manuale 20×1,5 | Trova il prodotto corretto via ricerca catalogo |
| Conferma “sì grazie” dopo offerta aggiuntiva | Propone i prodotti richiesti richiamando il catalogo nello stesso turno |
| Codice commerciale già proposto (AB110.00) | Conferma la corrispondenza con la chiave già indicata; non dice “non in catalogo” |
| Id numerico PrestaShop (es. 525) | Non lo tratta come codice articolo commerciale; chiede un codice/descrizione utili |

### Prezzi

| Scenario | Cosa è stato controllato |
| --- | --- |
| Prezzo con sconto attivo | Mostra prezzo finale e prezzo barrato quando presente nel catalogo |
| Prezzo senza sconto | Mostra solo il prezzo di vendita |
| Prezzo a zero (quotazione) | Scrive “Quotazione su richiesta” e non € 0,00; può passare a operatore |

### Chiusura estiva e passaggio a operatore

| Scenario | Cosa è stato controllato |
| --- | --- |
| Stato ordine / merce non ricevuta | Passaggio a operatore con messaggio estivo (Assistenza + email + date) |
| Prodotto industriale non in catalogo (es. DIVAL 160) | Non inventa alternative; messaggio di assenza in catalogo + handover estivo |
| Richiesta operatore / fattura fuori dal calendario 10–21 agosto | Usa comunque il messaggio di chiusura (agente dedicato al periodo) |
| Conversazione in inglese + richiesta fattura | Handover estivo **intero in inglese** (dopo correzione del prompt) |

### Guardrail

| Scenario | Cosa è stato controllato |
| --- | --- |
| Nessun prodotto inventato | Nomi, prezzi e link solo dal tool Prestashop |
| Scheda prodotto incompleta | Regola presente nel prompt; non verificabile in playground senza mock del tool (caso saltato) |

---

## Interventi sul prompt legati ai test

| Tema emerso | Intervento verificato |
| --- | --- |
| Handover estivo in italiano durante una chat in inglese | Aggiunte versione inglese del messaggio e regola esplicita: stessa lingua del cliente per tutto l’handover |
| Agente dedicato al periodo | Chiusura sempre attiva in questo prompt (niente controllo data); da attivare solo 10–21 agosto |

---

## Note tecniche (catalogo Prestashop)

- Il tool di ricerca prodotti restituisce correttamente titolo, prezzi e URL.
- Il campo **codice articolo commerciale (`reference`)** non è oggi presente nel payload del tool: l’assistente omette correttamente la riga “Codice articolo” quando manca. Quando il cliente cita un codice (es. AB110.00), la ricerca per codice funziona comunque e permette la conferma di corrispondenza.
- Per migliorare le schede prodotto in chat, conviene esporre `reference` nella risposta del connettore Prestashop.

---

## Esito

Gli scenari di vendita, guardrail catalogo e handover estivo risultano **verificati** sul playground di test con prompt aggiornato al **4 agosto 2026**.

**Operatività consigliata**

1. **Dal 10 al 21 agosto (incluso):** tenere attivo questo agente (link sopra) sul flusso WhatsApp di vendita.
2. **Dal 22 agosto:** ripristinare l’agente vendite ordinario (senza messaggio di chiusura estiva).
3. In caso di aggiornamenti catalogo o nuove regole commerciali, rieseguire uno smoke test breve su: codice articolo, accessori, post-vendita, messaggio in inglese.
