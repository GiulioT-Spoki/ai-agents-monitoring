---
title: Come attivare automazione per il messaggio di auguri compleanno
slug: come-attivare-automazione-per-il-messaggio-di-auguri-compleanno
author: Emanuela Locorotondo
date: 2023-02-01
modified: 2025-09-04
word_count: 398
categories: How to
url: https://support.spoki.com/docs/how-to/come-attivare-automazione-per-il-messaggio-di-auguri-compleanno/
---

# Come attivare automazione per il messaggio di auguri compleanno

Attraverso questa funzionalità è possibile creare un’automazione che invia in automatico un messaggio al cliente **ad una precisa data (compleanno) indicata nel campo dinamico creato ad hoc nell’anagrafica del contatto.**

Vediamo nello specifico come creare l’automazione basata su “**Condizione su Data e Ora**“.

## **Step 1**

**Creare il campo dinamico**: nella sezione “Campi dinamici” creare un nuovo campo dinamico cliccando sul pulsante in alto “**Nuovo**“; inserire il nome e tipologia del campo, selezionando nel menu a tendina l’ultima voce “**Data**“.

Selezionare “**ON**” per mostrare il campo nella sezione “Dettaglio contatto”.

![](https://support.spoki.com/wp-content/uploads/2023/02/Screenshot-2025-09-04-alle-16.44.06.png)
## **Step 2**

Creare la lista dei clienti su un file CSV a cui si vuole inviare il messaggio di Auguri.

Nel file excel: denominare la colonna in cui saranno riportate le date in cui dovrà partire il messaggio di auguri, esattamente con il nome del campo dinamico, nel nostro caso “COMPLEANNO”. 

In questa colonna bisognerà inserire le date del compleanno con l’anno in corso. Esempio: un cliente è nato il 25 maggio 1989, nella colonna compleanno inserirò 25 maggio 2023. Perché a Spoki bisogna comunicare la data in cui far partire il messaggio. Questa operazione bisognerà farla sola la prima volta, una volta che Spoki avrà preso la data del compleanno di quel contatto ripeterà l’invio ogni anno. Quindi NON sarà necessario l’anno prossimo andare a cambiare la data in 25 maggio 2024.

Nel file excel il formato corretto da inserire nella data è aaaa-mm-dd quindi nel nostro esempio 2023-05-25.

Una volta che il file è stato completato, prima del caricamento su Spoki è necessario farlo passare da [IMPORTA CSV DA LISTE](https://support.spoki.com/docs/piattaforma/gestisci-csv/). Il file scaricatoi da Liste e crea CSV potrai caricarlo nei [contatti](https://support.spoki.com/docs/piattaforma/contatti/) di Spoki.

## Step 3

**Creare l’automazione**: nella sezione “**Automazioni**“, cliccare su “**Nuova**” in alto a destra.

Selezionare da “Aggiungi step di avvio” la modalità “**Condizione su Data e ora**“.

Una volta selezionato il trigger, impostare la condizione sul campo dinamico (é, prima di.., dopo di…) e il campo dinamico di riferimento.

Nell’esempio imposteremo il campo dinamico che fa riferimento al compleanno, successivamente, imposteremo la condizione, **cioè a che ora prevediamo di inviare il messaggio al destinatario**. 

**NB**: cliccare sulla casella “Esegui ogni anno” per far in modo che anche nei prossimi anni parta il messaggio senza la necessità di dover cambiare la data.

![](https://support.spoki.com/wp-content/uploads/2023/02/Screenshot-2025-09-04-alle-16.45.06-1024x561.png)
Dopo aver impostato le condizioni sopra descritte, selezionare il template pre-approvato da WhatsApp.

## Articoli correlati

[Integrare WhatsApp con Calendly](https://support.spoki.com/docs/integrazioni/integrare-whatsapp-con-calendly/)

[Integrare WhatsApp con Google Calendar](https://support.spoki.com/docs/integrazioni/integrare-whatsapp-con-google-calendar/)

[Integrare WhatsApp con Zapier](https://support.spoki.com/docs/integrazioni/integrare-whatsapp-con-zapier/)