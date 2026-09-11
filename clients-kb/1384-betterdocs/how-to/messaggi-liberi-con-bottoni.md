---
title: Messaggi liberi con bottoni
slug: messaggi-liberi-con-bottoni
author: Emanuela Locorotondo
date: 2023-11-07
modified: 2025-08-29
word_count: 344
categories: How to
url: https://support.spoki.com/docs/how-to/messaggi-liberi-con-bottoni/
---

# Messaggi liberi con bottoni

Nella costruzione delle automazioni in risposta al primo template inviato, è possibile inviare messaggi liberi (ovvero messaggi non soggetti ad approvazione da parte di WhatsApp) di tre tipologie. È possibile inviare questo tipo di messaggi solo se il cliente ci ha scritto nell’arco delle ultime 24 ore.

Le tipologie di messaggi liberi sono le seguenti:

- Messaggio libero semplice
- Messaggio libero con Bottoni
- Messaggio libero Lista

Potete accedere a questi messaggi cliccando su “+” all’interno dell’automazione di risposta ad un messaggio del cliente:

![](https://support.spoki.com/wp-content/uploads/2023/11/Screenshot-2025-08-29-alle-11.56.54.png)
#### Messaggio libero semplice

Selezionando da “+” “Invia Messaggio Libero” è possibile scrivere il messaggio che si vuole mandare al cliente. Il messaggio può contenere un allegato e un testo.

È inoltre possibile definire se far partire il messaggio dopo un certo tempo da quando scatta il trigger (scelta non consigliata).

#### Messaggio libero con Bottoni

Selezionando da “Tua azione automatica” “Invia Messaggio Libero con Bottoni” è possibile scrivere il messaggio che si vuole mandare al cliente. Il messaggio può contenere un allegato e un testo.

I bottoni che sono possibili inserire in questo messaggio sono esclusivamente bottoni di tipo Testo.

NON è possibile inserire bottoni di tipo LINK o Chiamata. Se volete inserire questo tipo di bottoni, è necessario richiedere un [template](https://support.spoki.com/docs/piattaforma/messaggi-template/).

![](https://support.spoki.com/wp-content/uploads/2023/08/Screenshot-2023-08-30-alle-11.00.31.png)
### Messaggio libero Lista

Selezionando da “+” >> “Invia Messaggio Libero con Lista” è possibile scrivere il messaggio che si vuole mandare al cliente, includendo un’intestazione e più di pagina e una lista di bottoni (max 10).

Questo messaggio viene solitamente utilizzato per permettere al cliente, ad esempio, di selezionare lo store più vicino alla propria abitazione, ecc.

Cliccando si aprirà la seguente schermata:

![](https://support.spoki.com/wp-content/uploads/2023/11/Screenshot-2023-11-07-alle-10.45.05-1024x794.png)
I campi che è possibile popolare sono i seguenti:

- TESTO LISTA: questo campo contiene il titolo da dare al bottone che conterrà la lista;
- NOME CATEGORIA: campo facoltativo, se volete clusterizzare ulteriormente i bottoni che andrete ad inserire successivamente (è possibile aggiunger più categorie);
- TESTO: indicare il nome dei singoli bottoni;
- DESCRIZIONE: campo facoltativo, è possibile inserire una descrizione per ciascun bottone.

Per ogni bottone potrà essere agganciata una automazione di risposta automatica che potrebbe contenere un altro messaggio lista per permettere al cliente di continuare a scegliere. Es. Regione – Provincia – Città.