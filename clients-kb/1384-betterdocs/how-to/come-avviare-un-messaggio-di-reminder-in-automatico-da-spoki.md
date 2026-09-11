---
title: Come avviare un messaggio di reminder in automatico tramite Spoki
slug: come-avviare-un-messaggio-di-reminder-in-automatico-da-spoki
author: Emanuela Locorotondo
date: 2022-10-31
modified: 2025-10-14
word_count: 325
categories: How to
url: https://support.spoki.com/docs/how-to/come-avviare-un-messaggio-di-reminder-in-automatico-da-spoki/
---

# Come avviare un messaggio di reminder in automatico tramite Spoki

È possibile creare un’automazione che invii in automatico un messaggio al cliente **ad una precisa data e ora a partire da un campo dinamico**, creato ad hoc nell’anagrafica del contatto.

Per tutte le attività che gestiscono appuntamenti, corsi, rate e scadenze di vario tipo, questa funzionalità permette di comunicare o **ricordare un evento qualche minuto-ora-giorno prima che questo si verifichi**.

Esempio: un cliente si è iscritto a un webinar.È possibile inviargli un reminder in modo automatico dieci minuti prima dell’inizio, per ricordargli dell’imminente inizio del webinar, fornendogli anche il link per accedervi direttamente.Ricordare dell’imminente evento aumenta il tasso di partecipazione e, conseguentemente, la conversione.

Vediamo nello specifico come creare l’automazione, utilizzando come trigger d’avvio la **Condizione su Data**.

## **Step 1**

**Creare il campo dinamico**: nella sezione **Campi dinamici** bisogna creare un nuovo campo dinamico cliccando sul pulsante in alto **Nuovo**.Bisogna poi inserire nome e tipologia del campo, selezionando nel menu a tendina l’ultima voce, cioè **Data e Ora**. Fornire infine un esempio: es. 01/01/2026, 10.00.

Selezionare **ON** per mostrare il campo nella sezione **Dettaglio contatto**.

![](https://support.spoki.com/wp-content/uploads/2022/10/Screenshot-2025-10-14-alle-12.51.03-scaled.png)
## **Step 2**

**Creare l’automazione**: nella sezione **Automazioni**, cliccare su **Nuova** in alto a destra.Selezionare da** Trigger di avvio **la modalità **Condizione su Data**.A questo punto, bisogna scegliere la condizione sul campo dinamico (*È*, *Prima di*, *Dopo di*) e il campo dinamico di riferimento.

Ad esempio, si può scegliere di impostare il campo dinamico che fa riferimento all’inizio del webinar e, successivamente, si può impostare la condizione, **cioè quanto tempo prima o dopo prevediamo di inviare il messaggio al destinatario**. In questo caso, invieremo il messaggio di reminder trenta minuti prima dell’inizio del webinar, come da immagine seguente.

![](https://support.spoki.com/wp-content/uploads/2022/10/Screenshot-2025-10-14-alle-17.45.18-1024x560.png)
Dopo aver impostato le condizioni sopra descritte, selezionare o creare un template con il messaggio prescelto.

È possibile eventualmente aggiungere nella stessa automazione un template successivo che richiede un feedback sull’evento o una recensione.

## Articoli correlati

[Integrare WhatsApp con Calendly](https://support.spoki.com/docs/integrazioni/integrare-whatsapp-con-calendly/)

[Integrare WhatsApp con Google Calendar](https://support.spoki.com/docs/integrazioni/integrare-whatsapp-con-google-calendar/)

[Integrare WhatsApp con Zapier](https://support.spoki.com/docs/integrazioni/integrare-whatsapp-con-zapier/)