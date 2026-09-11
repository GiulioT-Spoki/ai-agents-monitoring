---
title: Ticket
slug: ticket
author: Emanuela Locorotondo
date: 2023-10-06
modified: 2025-08-06
word_count: 1168
categories: Piattaforma
url: https://support.spoki.com/docs/piattaforma/ticket/
---

# Ticket

4 min read

Il ticket di supporto **permette ai clienti di inviare una domanda o una richiesta ad un’organizzazione**. I ticket di supporto possono inoltre essere aperti dal customer care di un’azienda a seguito della valutazione di una richiesta di assistenza. Ogni ticket creato dispone di un ID unico. I ticket di supporto rimangono aperti finché non vengono risolti dagli addetti al servizio clienti.

In questa sezione è possibile aprire nuovi ticket o consultare i ticket già esistenti.

Elementi del Ticket

**TITOLO**: Il titolo che apparirà sul ticket.

**PRIORITÀ**: L’ordine dei ticket viene determinato dalla priorità. Di default, i ticket sono ordinati in base alla priorità nelle statistiche.

**STATO**: Sono disponibili stati predefiniti come “Aperto”, “Risolto”, ecc. È anche possibile creare stati personalizzati.

**CATEGORIA**: È possibile assegnare categorie personalizzate ai ticket, come ad esempio “Assistenza”, “Logistica”, ecc. Per creare una nuova categoria, basta digitare il nome della categoria la prima volta nella sezione dedicata.

**DESCRIZIONE**: Una breve descrizione del problema che giustifica l’apertura del ticket.

**REFERENZA**: È il codice identificativo del ticket, assegnato automaticamente dal sistema. Tuttavia, l’utente ha la possibilità di definirlo manualmente al momento dell’apertura del ticket.

**Come aprire un ticket?**

Un ticket può essere aperto in **automatico** (tramite automazione) dai clienti oppure può essere aperto **manualmente** da un operatore del customer care direttamente in chat.

**Ticket aperto in automatico**

Dalla sezione *Automazioni* è possibile creare un’automazione che apra in automatico un ticket. 

Bisogna cliccare su: Aggiungi Step >> Apertura Ticket.

![](https://support.spoki.com/wp-content/uploads/2023/10/image-1024x655.png)
I trigger d’avvio per l’apertura automatica del ticket possono essere: il gestionale esterno, un messaggio da cliente in chat, una chiamata API, un template con pulsanti di testo ecc.

Tutti questi elementi possono ricevere l’informazione di richiesta apertura ticket e trasferire le informazioni a Spoki, che apre il ticket sulla piattaforma e in seguito alla sua gestione manda aggiornamenti al cliente.

Nella sezione “Aggiungi step” è necessario poi selezionare “Apri Ticket”. Si aprirà una finestra in cui è possibile definire il contenuto del **TITOLO, CATEGORIA, DESCRIZIONE, PRIORITÀ e STATO**. 

La sezione REFERENZA si aggiornerà in automatico.

È anche possibile compilare i campi del ticket *attraverso campi dinamici *che possono essere popolati dal vostro gestionale. Per fare ciò bisogna semplicemente indicare i campi dinamici desiderati all’interno del form nell’automazione come nell’esempio seguente:

In questa sezione **NON SI DEVONO UTILIZZARE** i campi dinamici presenti di default su Spoki per i ticket, ovvero TICKET_REFERENCE; TICKET_TITLE etc.

Una volta che scatterà l’automazione per uno specifico cliente, nella chat del cliente e nella sezione Ticket, apparirà il ticket aperto.

**Ticket aperto da un operatore**

L’operatore può aprire, modificare, eliminare i ticket accedendo alla sezione del menu Ticket oppure direttamente in chat nella sezione anagrafica del cliente a cui il ticket fa riferimento.

**Creare un ticket dalla chat**

Accedi alla chat del cliente per cui si intende creare il ticket. Cliccare sulla destra il simbolo **+ Aggiungi** sotto la dicitura **Ticket**. Si aprirà la schermata di seguito, in cui si potranno inserire i dettagli del ticket.

I campi Titolo, Priorità, Stato e Categoria, Descrizione possono essere personalizzati liberamente, mentre il campo Referenza, se non verrà popolato dall’operatore, sarà popolato automaticamente da Spoki.

**Creare un ticket dalla sezione del menu Ticket**

La stessa operazione appena descritta può essere effettuata anche direttamente dal menu Ticket, cliccando in alto a destra su Nuovo.

La schermata sarà la stessa con l’unica eccezione di dover inserire in più il Contatto a cui il ticket fa riferimento.

**Come aggiornare/ consultare i ticket**

I ticket possono essere aggiornati e modificati accedendo direttamente al ticket dalla chat o da menu Ticket

In particolare dal menu Ticket è possibile consultare tutti i ticket aperti e ordinarli per Stato, Priorità, Titolo etc, cliccando sulle freccette a destra dell’etichetta.

In alto a destra invece è possibile cercare un ticket specifico, o filtrare per Stato, Priorità oppure Operatore.

**Modificare il ticket e rispondere in chat**

Per** **modificare il ticket è necessario cliccare sul ticket che si intende modificare e poi su Modifica.

Cliccando in alto su Modifica è possibile modificare tutti i dettagli presenti sulla sinistra, mentre sulla destra è possibile aggiungere delle note se vi sono aggiornamenti da tracciare.

Nella stessa schermata nella sezione Ticket è possibile anche spostarsi sulla sezione chat e continuare a scrivere al cliente mentre si gestisce la chat.

**Modificare lo stato del ticket in automatico**

È possibile **cambiare in automatico lo stato** del ticket andando nell’automazione, Aggiungi Step > Aggiorna Ticket.

Qui è possibile selezionare la referenza del ticket specifica oppure selezionare quella generica %%TICKET_REFERENCE%%.

Il sistema ti chiederà poi di impostare il nuovo stato, priorità e categoria da assegnare al ticket da aggiornare.![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfRdvII0OqzDKFbnnLO7G7FMjYLyb6OOFPwDn0lNVqQg4CEDlbuCUr6VFEzoAYd77HJif3PgPs2vc6gJykU2z0V1mRF1WF-_i0Ki6AlyJUoRaFXTK6dqV0X08HekF6KnmEHgkW6kxuNiKuSP1VewTk?key=iHggmcDv9v5DOOgQSttFXhjg)

**Come inviare notifiche al cliente sull’aggiornamento degli stati del ticket**

Dalle Automazioni è possibile impostare l’invio di un messaggio di aggiornamento al cliente per informarlo che la risoluzione del suo ticket sta procedendo.

Per creare l’automazione accedi dal menu Automazioni, clicca in alto a destra su Nuova e seleziona il trigger **Ticket**

È possibile far scattare un’automazione sia per il ticket creato che per il cambio di stato specifico.![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXd3krjC6qwucHzjgpYcmQ17FpM88RqSdUWlqr3_ivZCm8G3zgjVXxxsatVgLLIKQU-qHVFVQ-bWOtP-B29OA8uR8MOl1hts1Q6-9Ju-Uw4mdj4XNbZQNqIB30ZhYKkTtpAMn0ss1AAsK87_3652Mw?key=iHggmcDv9v5DOOgQSttFXhjg)

Indicare a quale variazione dello Stato (es. da Aperto a Risolto) far partire un messaggio whatsapp al cliente interessato.

All’interno del template che si andrà ad inviare, è possibile utilizzare i campi dinamici indicati nell’elenco fornito, per dare al cliente maggiori dettagli sul ticket gestito.

**Notifiche agli operatori che accedono a Spoki**

Ogni volta che viene aperto/modificato un ticket, tutti gli utenti che hanno accesso alla piattaforma, riceveranno una mail di notifica.

Per disabilitare le notifiche di uno specifico operatore, questo dovrà accedere con la sua utenza a Spoki e dovrà impostare su OFF le notifiche “Ricevi email ticket” nella sezione Profilo (a cui si accede cliccando in basso a sinistra). Questa modifica impatterà solo sulle notifiche della sua mail, e non su quelle degli altri utenti che accedono in piattaforma.

**Aggiungere stato personalizzato**

Per aggiungere uno stato personalizzato si può cliccare nella sezione Ticket, in alto a destra sull’ingranaggio. Da qui può essere impostato uno stato personalizzato.

È possibile assegnare uno stato personalizzato in automatico attraverso un automazione.

Basta cliccare su Aggiungi Step> Aggiorna ticket ed impostare la referenza dei ticket e lo stato in cui si vuole impostare il ticket.

IMPORTANTE: nel momento in cui si crea uno stato personalizzato del ticket bisognerà comunque selezionare il macro status che è in progress (o in corso) o chiuso (terminated)

**Ricerca Avanzata**

Nella sezione ticket, al di sopra dell’elenco dei ticket è possibile usufruire della ricerca avanzata.

È possibile usufruire della ricerca avanzata anche in chat utilizzando i filtri per stato e priorità

**Statistiche Ticket**

È possibile visualizzare i report dei ticket nella parte alta della sezione Ticket.

A questo punto sarai in grado di visualizzare le statistiche dei ticket.

Le statistiche visualizzabili al momento sono:

**Categoria**: la percentuale di ticket aperti per specifica categoria

**Stato**: Numero di ticket aperti suddivisi per stato

**Priorità**:Numero di ticket aperti suddivisi per priorità

**Tempo di chiusura medio per categoria**: media del tempo di chiusura dei ticket a seconda della categoria