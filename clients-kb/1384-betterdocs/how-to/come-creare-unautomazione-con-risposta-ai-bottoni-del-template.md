---
title: Come creare un&#8217;automazione con risposta ai bottoni del template
slug: come-creare-unautomazione-con-risposta-ai-bottoni-del-template
author: Emanuela Locorotondo
date: 2022-12-12
modified: 2026-07-29
word_count: 304
categories: How to
url: https://support.spoki.com/docs/how-to/come-creare-unautomazione-con-risposta-ai-bottoni-del-template/
---

# Come creare un&#8217;automazione con risposta ai bottoni del template

Con Spoki è possibile inviare messaggi con bottoni di risposta di testo, che prevedano l’invio di un messaggio di risposta diverso in base al click su ciascun bottone.

Occorre richiedere un template con bottoni del tipo “Risposta di Testo”:

![](https://support.spoki.com/wp-content/uploads/2022/12/Schermata-2022-12-12-alle-12.50.35-1024x507.png)
Successivamente bisognerà creare un’automazione in cui inserire il template con i bottoni e un’altra automazione per ciascun bottone del template.

L’unica automazione da avviare sarà quella principale con i bottoni, le altre partiranno in automatico solo se il cliente cliccherà sui bottoni di risposta di testo.

Di seguito un esempio di impostazione dell’[automazione](https://support.spoki.com/docs/piattaforma/automazioni/) con il template con bottoni. Il trigger/ step di avvio può essere quello che preferite o anche l’automazione può essere avviata da una campagna.

![](https://support.spoki.com/wp-content/uploads/2022/12/Schermata-2022-12-12-alle-11.48.43-1.png)
Cliccando sulla scritta in basso a destra sotto ciascun bottone del [template](https://support.spoki.com/docs/piattaforma/messaggi-template/), sarà possibile creare l’automazione collegata a quello specifico bottone, che avrà come trigger un messaggio ricevuto da parte del cliente e che corrisponderà esattamente alla frase scritta sul bottone. 

Attenzione! Si suggerisce di non inserire nei bottoni del template delle risposte semplici (es. si, no) poichè l’automazione prevederà l’invio del messaggio che imposterete, ogni qualvolta che un qualsiasi cliente scriverà quella parola/ frase a prescindere che sia o meno collegata all’automazione originaria.

Si consiglia di utilizzare sempre i tag all’interno delle automazioni per essere in grado di tracciare facilmente i click effettuati dai clienti e poter estrarre statistiche facendo estrazioni di CSV dai contatti (vedi [Contatti](https://support.spoki.com/docs/piattaforma/contatti/#export)).

Di seguito le due automazioni collegate ai due bottoni del template:

![](https://support.spoki.com/wp-content/uploads/2022/12/Schermata-2022-12-12-alle-14.22.44.png)
![](https://support.spoki.com/wp-content/uploads/2022/12/Schermata-2022-12-12-alle-14.23.03.png)
Riepilogando quindi, ad un template con due bottoni corrisponderanno tre automazioni: una per ciascun bottone ed una (quella principale) con il template.

Al seguente link un video di esempio: [the video tutorial](https://www.youtube.com/watch?v=SIQRKNO_0q8)

## Articoli correlati

[Regole per evitare il ban da WhatsApp](https://support.spoki.com/docs/regole-whatsapp/regole-per-evitare-il-ban-da-whatsapp/)

[Come collegare un bottone di chat sul sito ad una risposta automatica](https://support.spoki.com/docs/how-to/come-collegare-un-bottone-di-chat-sul-sito-ad-una-risposta-automatica/)

[Come integrare WhatsApp con i fogli google](https://support.spoki.com/docs/integrazioni/integrare-whatsapp-con-google-fogli/)