# Boutique Demo Spoki — Knowledge Base

## Chi siamo

Boutique Demo Spoki è un negozio di abbigliamento e accessori con sede a Milano. Vendiamo online e in negozio. Questo assistente WhatsApp aiuta i clienti con informazioni, richieste di richiamo, assistenza e iscrizione alle offerte promozionali.

Sito web: https://boutique-demo-spoki.example
Email assistenza: assistenza@boutique-demo-spoki.example
Telefono negozio: +39 02 1234 5678

---

## Orari di apertura

- Lunedì – Venerdì: 10:00 – 19:30
- Sabato: 10:00 – 20:00
- Domenica: chiuso

Fuso orario: Europe/Rome

---

## Indirizzo

Via della Demo 12, 20121 Milano (zona Brera)

Parcheggio: parcheggio pubblico in Via Solferino, 5 minuti a piedi.

---

## Servizi

- Vendita abbigliamento donna e uomo
- Accessori e borse
- Consulenza stile in negozio su appuntamento
- Spedizioni in tutta Italia
- Reso entro 14 giorni dalla consegna (prodotto integro, etichette attaccate)

---

## Prezzi indicativi

- T-shirt: da 29 €
- Camicie: da 49 €
- Pantaloni: da 69 €
- Borse: da 89 €

I prezzi possono variare in base alle promozioni in corso. Per offerte attive, iscriversi alla newsletter (Path iscrizione offerte).

---

## Spedizioni

- Spedizione standard (3-5 giorni lavorativi): 5,90 €
- Spedizione express (1-2 giorni lavorativi): 9,90 €
- Spedizione gratuita per ordini sopra 79 €

Tracking: inviato via email al momento della spedizione.

---

## Resi e cambi

- Reso entro 14 giorni dalla consegna
- Prodotto integro, con etichette e confezione originale
- Rimborso entro 7 giorni lavorativi dalla ricezione del reso presso il magazzino
- Per avviare un reso: contattare assistenza con numero ordine

---

## Assistenza clienti — SLA

- Orario team: lunedì – venerdì, 09:00 – 18:00
- Tempo di risposta richieste via ticket o WhatsApp: entro 24 ore lavorative
- Fuori orario: l'assistente può registrare la richiesta; il team risponde il giorno lavorativo successivo

---

## FAQ

**Come posso essere richiamato?**
Puoi lasciare nome e descrizione della richiesta in chat. Il team ti richiama sul numero WhatsApp da cui scrivi.

**Come mi iscrivo alle offerte?**
Scrivi che vuoi ricevere le offerte. Riceverai un messaggio di benvenuto e aggiornamenti sulle promozioni.

**Ho un problema con un ordine, cosa faccio?**
Descrivi il problema in chat. Apriremo una richiesta di assistenza e ti risponderemo entro 24 ore lavorative.

**Posso prenotare un appuntamento in negozio?**
Sì. Lascia la richiesta in chat con giorno e orario preferiti. Il team ti conferma la disponibilità.

**Accettate pagamenti rateali?**
Sì, con Klarna e Scalapay per ordini online sopra 50 €.

---

## Mapping interno Spoki (per l'agente — non comunicare al cliente)

Questa sezione serve all'agente per eseguire azioni corrette. Non citare questi dettagli nelle risposte al cliente.

### Campi dinamici contatto

| Codice campo | Uso |
| --- | --- |
| FIRST_NAME | Nome cliente |
| RICHIESTA | Descrizione richiesta o problema |
| EMAIL | Email per assistenza |

### Tag

| Tag | ID Spoki | Quando applicare | Automazione collegata |
| --- | --- | --- | --- |
| demo_richiamo_richiesto | DA_COMPILARE | Dopo conferma richiesta richiamo (Path B) | [DEMO] Conferma richiamo |
| demo_optin_offerte | DA_COMPILARE | Dopo conferma iscrizione offerte (Path D) | [DEMO] Conferma iscrizione offerte |
| demo_ticket_aperto | DA_COMPILARE | Dopo apertura ticket (Path C) | [DEMO] Ticket aperto |

### Liste

| Lista | ID Spoki | Uso |
| --- | --- | --- |
| demo_clienti_offerte | DA_COMPILARE | Iscrizione offerte / newsletter (Path D) |

### Automazioni

| Automazione | ID Spoki | Trigger | Cosa fa |
| --- | --- | --- | --- |
| [DEMO] Conferma richiamo | DA_COMPILARE | Tag demo_richiamo_richiesto | Nota interna staff + template WhatsApp conferma al cliente |
| [DEMO] Conferma iscrizione offerte | DA_COMPILARE | Tag demo_optin_offerte | Aggiunge a lista demo_clienti_offerte + template benvenuto |
| [DEMO] Ticket aperto | DA_COMPILARE | Tag demo_ticket_aperto | Nota interna + template conferma ticket al cliente |

### Testi template suggeriti (per configurazione automazioni)

**Conferma richiamo:**
"Ciao %%FIRST_NAME%%, abbiamo ricevuto la tua richiesta. Il nostro team ti richiamerà appena possibile su questo numero. Grazie per averci scritto — Boutique Demo Spoki."

**Benvenuto offerte:**
"Ciao %%FIRST_NAME%%, benvenuto tra i nostri clienti! Da oggi riceverai le nostre offerte e novità in anteprima. A presto — Boutique Demo Spoki."

**Conferma ticket:**
"Ciao %%FIRST_NAME%%, abbiamo registrato la tua richiesta di assistenza. Il team ti risponderà entro 24 ore lavorative. Grazie per la pazienza — Boutique Demo Spoki."

---

## Cosa succede dietro le quinte (valore per demo prospect)

Quando l'agente registra una richiesta, iscrive alle offerte o apre un ticket:

- I dati vengono salvati sul profilo contatto in Spoki (campi dinamici)
- Un tag innesca un'automazione che notifica il team e invia un messaggio WhatsApp al cliente
- Il team vede la richiesta in tempo reale su Spoki senza dover leggere l'intera chat

Questo dimostra integrazione CRM, automazioni e messaggistica WhatsApp in un unico flusso conversazionale.
