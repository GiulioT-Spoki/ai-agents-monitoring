# Spoki Commerce — Scenari di test dell'assistente vocale

**Agente:** Gabriele Linciano - Spoki Commerce
**Account Spoki:** 9968
**Tipo:** Vocale
**Link agente:** https://app.spoki.com/ai/agent/b366de2b-9371-4fb7-9e87-ac7cde77fb2c
**Data verifica:** 29 settembre 2026
**Ambiente:** chiamate outbound verso il contatto di test

---

## Contesto

1. Assistente vocale per lo stato ordine su Shopify, la scheda prodotto su WhatsApp e il link di pagamento di una bozza.
2. Negozio di prova spoki-dev. Knowledge base per spedizioni e resi.
3. Scheda prodotto: campo PRODUCT_LINK (solo handle) e automazione 571639. Checkout: campo INVOICE_LINK (solo token fattura) e automazione 571705.

---

## Cosa è stato verificato

### Ordini

| Scenario | Cosa è stato controllato |
| --- | --- |
| Lista ordini | Con l'email già in anagrafica, dopo conferma, elenca gli ordini veri e ne dice lo stato (pagato, non spedito). |
| Numero inesistente | Il numero 99999999 non viene inventato: dice che non lo trova. |
| Email da correggere | Se l'email in anagrafica è sbagliata, la sovrascrive e cerca con quella nuova. Verificato su altri agenti dello stesso comportamento. |

### Resi e persone

| Scenario | Cosa è stato controllato |
| --- | --- |
| Policy di reso | Risponde dalla knowledge base: 14 giorni dalla consegna, articolo non usato, spese a carico del cliente salvo difetto, istruzioni via email. |
| Prodotto arrivato rotto | Chiede conferma, scrive la nota interna, dice che lo staff richiama entro un giorno lavorativo. |
| Rimborso immediato | Non promette il rimborso. Segnala allo staff con una nota vera. |
| Operatore | Accetta e passa la chiamata. |

### WhatsApp

| Scenario | Cosa è stato controllato |
| --- | --- |
| Scheda prodotto | Per la maglietta Y-3 scrive solo l'handle e lancia l'automazione della scheda. |
| Link di pagamento | Dopo la bozza scrive solo il token della fattura in INVOICE_LINK e lancia l'automazione di checkout, senza riusare il campo della scheda. |

---

## Note tecniche

- Lo stato ordine arriva dalla lista ordini per email. La ricerca per il solo numero breve (1097, 1098) risponde che l'ordine non c'è, anche se l'ordine esiste. L'agente non deve raccontare questo errore al cliente se la lista ha già lo stato.
- La ricerca prodotti non è affidabile su tutte le parole. "blush stick", "tonico viso", "ombretto" e "struccante" trovano il prodotto giusto. "correttore" e "mascara" restituiscono una maglietta e una scrivania, mentre il catalogo Shopify quelle parole le trova. L'agente, in questi casi, non spaccia il risultato sbagliato per il prodotto chiesto.
- Il catalogo pubblicato è di 17 prodotti. Oltre duemila articoli sono in bozza e la ricerca non li vede, anche se compaiono in un ordine.
- Il primo invio WhatsApp della scheda può partire col valore precedente del campo, se la scrittura e l'automazione partono insieme.

---

## Esito

Ordini, policy di reso, nota allo staff, passaggio a un operatore e link di pagamento risultano verificati sulle chiamate del 29 settembre 2026.

La ricerca catalogo va trattata come limite della piattaforma, non come comportamento da correggere nel prompt: su alcune parole del catalogo pubblicato non restituisce il prodotto che Shopify stesso trova.

**Operatività consigliata:** usare l'agente per stato ordine, resi, nota e checkout. Non considerare chiusa la scheda prodotto finché la ricerca non restituisce il prodotto chiesto anche per correttore e mascara.
