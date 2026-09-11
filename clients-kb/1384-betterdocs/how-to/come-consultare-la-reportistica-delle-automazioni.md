---
title: Come consultare la reportistica delle automazioni
slug: come-consultare-la-reportistica-delle-automazioni
author: Emanuela Locorotondo
date: 2023-03-21
modified: 2025-08-26
word_count: 328
categories: How to
url: https://support.spoki.com/docs/how-to/come-consultare-la-reportistica-delle-automazioni/
---

# Come consultare la reportistica delle automazioni

All’interno della piattaforma sono disponibili diverse tipologie di statistiche, con vari livelli di dettaglio.

Accedendo a ciascuna automazione, è possibile selezionare un **periodo di riferimento** per il quale generare la reportistica.Per farlo, entra nell’automazione e clicca sull’icona **“Report”**.

![](https://support.spoki.com/wp-content/uploads/2023/03/Screenshot-2025-08-25-alle-17.42.41.png)
Si aprirà una schermata in cui è possibile identificare il periodo per cui si vogliono estrarre le statistiche.

Se non si inserisce un periodo specifico, le statistiche saranno riferite al totale degli invii effettuati con quella automazione.

![](https://support.spoki.com/wp-content/uploads/2023/03/Screenshot-2025-08-25-alle-17.45.27-1024x753.png)

Per ogni step inserito nell’automazione (messaggi, tag, ecc.) sono disponibili le seguenti metriche:

- Eseguiti (% sul totale): numero complessivo degli invii eseguiti (esclusi gli errori).
- Letti: messaggi contrassegnati dalla doppia spunta blu, quindi sicuramente letti.
- Consegnati: messaggi con doppia spunta grigia, quindi consegnati.
- Inviati: messaggi con singola spunta, quindi inviati ma non ancora consegnati.
- In attesa: messaggi in sospeso a causa di un ritardo configurato nell’automazione.
- In corso: messaggi per cui WhatsApp deve ancora restituire il feedback di lettura.
- Errore: messaggi non inviati per numeri non validi, errori nel template o altre cause.
- Abbandoni: contatti che da questo step non hanno proseguito verso lo step successivo.

Cliccando sul numero di **Letti**, **Consegnati** o **Inviati**, è possibile visualizzare l’elenco dei contatti corrispondenti a quello status.

**Importante:** se modifichi un template, perderai le statistiche ad esso associate anche per i periodi passati in cui era stato utilizzato nell’automazione.

Per non perdere i dati:

salva degli screenshot delle statistiche che ti interessa conservare.

crea una nuova automazione mantenendo invariata quella precedente, oppure

### Traccia delle risposte

Per monitorare le risposte ricevute a seguito dell’invio di un template, utilizza lo step **“Qualsiasi risposta del cliente”** subito dopo il messaggio inviato.

In questo modo:

- i clienti rimasti nello step “Qualsiasi risposta” rappresentano coloro che non hanno risposto;
- i clienti usciti da quello step sono invece quelli che hanno risposto.

Esempio:

- 118 template inviati
- 96 clienti in attesa nello step “Qualsiasi risposta” → non hanno risposto
- 22 clienti hanno risposto → automaticamente contrassegnati con il tag “da leggere e rispondere”.