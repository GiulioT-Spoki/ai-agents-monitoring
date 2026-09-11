---
title: Come inviare messaggi multi lingua
slug: come-inviare-messaggi-multi-lingua
author: Emanuela Locorotondo
date: 2023-03-15
modified: 2023-10-20
word_count: 416
categories: How to
url: https://support.spoki.com/docs/how-to/come-inviare-messaggi-multi-lingua/
---

# Come inviare messaggi multi lingua

Tramite Spoki è possibile inviare messaggi multi lingua tramite un singolo invio.

In particolare, è necessario richiedere il template da inviare in tutte le lingue con cui si pensa di contattare i propri clienti. Una volta ottenuta l’approvazione del template, per tutte le traduzioni, sarà possibile inviare il messaggio.

In base al prefisso internazionale del contatto, Spoki invierà in automatico il messaggi nella traduzione corretta. 

In particolare, Spoki eseguirà i seguenti check per l’invio del messaggio:

- Ricerca traduzione specifica del prefisso internazionale es. prefisso +33 invierà il messaggio nella traduzione francese;
- nel caso in cui non fosse presente la traduzione specifica (francese nel nostro esempio), invierà la traduzione in lingua Inglese;
- nel caso in cui non fosse disponibile la traduzione inglese, Spoki invierà il messaggio nella lingua di default impostata sulla piattaforma (nella sezione Azienda – vedi immagine sottostante)

![](https://support.spoki.com/wp-content/uploads/2023/03/Screenshot-2023-03-15-alle-10.12.36-1024x394.png)
Una volta che avete richiesto il template potete impostare normalmente la vostra [automazione](https://support.spoki.com/docs/piattaforma/automazioni/). Basterà creare una singola automazione contenente il template multilingua e sarà l’automazione stessa ad inviare la traduzione corretta in base al prefisso internazionale del destinatario.

**Attenzione!** Nel caso in cui il messaggio template che volete inviare preveda dei **bottoni**:

1. se il messaggio di risposta al bottone è un TEMPLATE: potete richiede il messaggio template in multi lingua e inserirlo nell’automazione che avrà come trigger di avvio tutte le risposte possibili ai bottoni in tutte le traduzioni.

![](https://support.spoki.com/wp-content/uploads/2023/03/Screenshot-2023-03-15-alle-10.54.53-1024x684.png)
Per aggiungere le traduzioni dei bottoni cliccate su “aggiungi step di avvio” e seleziona la voce messaggio ricevuto dal cliente. In sostanza, mentre per l’italiano puoi cliccare nella prima automazione, sotto al bottone su Crea automazione, per i bottoni nelle altre lingue il trigger lo devi scrivere tu selezionando nell’automazione con la risposta al bottone su “Aggiungi step di avvio”, scrivendo esattamente le diciture riportate sui bottoni creati nel template.

2. Se la risposta al bottone è un messaggio LIBERO: allora occorrerà creare un’automazione di risposta per ciascun bottone per ogni traduzione. Quindi il messaggio di origine che inviate sarà solo uno (template con i bottoni), mentre il messaggio di risposta alle varie traduzioni dei bottoni deve inserito ognuno in una automazione diversa con trigger di avvio “messaggio ricevuto dal cliente”, creando quindi una automazione per ogni traduzione.

NB: per le nazioni come la Svizzera per cui allo stesso prefisso +41, possono corrispondere più lingue (es. Ticino – lingua italiana) dovrete per questi contatti specificare anche la Lingua nell’anagrafica di ogni singolo contatto. **La lingua se specificata prevale sul prefisso internazionale**.

## Articoli correlati 

[Come creare un’automazione con i bottoni di risposta?](https://support.spoki.com/docs/how-to/come-creare-unautomazione-con-risposta-ai-bottoni-del-template/)

[Scrivere un template](https://support.spoki.com/docs/piattaforma/messaggi-template/)