---
title: Messaggi template
slug: messaggi-template
author: romantic-torvalds
date: 2022-10-05
modified: 2025-10-23
word_count: 1270
categories: Piattaforma
url: https://support.spoki.com/docs/piattaforma/messaggi-template/
---

# Messaggi template

![](https://i.ytimg.com/vi/6-npuFMcDD4/maxresdefault.jpg)

I Template sono messaggi pre-approvati da WhatsApp, utilizzati per inviare notifiche o comunicazioni ai clienti. Nel momento in cui si avvia una conversazione, i template rappresentano l’unico tipo di messaggio che può essere inviato.

Ogni template, una volta creato, deve essere **revisionato e approvato da Meta** prima di poter essere utilizzato. La revisione si avvia tramite il pulsante **Richiedi** e viene completata in un tempo massimo di 48 ore, anche se solitamente l’approvazione avviene in meno di un’ora.

I template possono includere testo, immagini, video o documenti e possono essere arricchiti con bottoni interattivi di tre tipologie:

- Risposta rapida: per consentire al cliente di selezionare una risposta predefinita
- Link: per reindirizzare a una pagina web
- Telefono: per avviare una chiamata

## **Creazione di un nuovo Template**

Per richiedere un nuovo template, accedi alla sezione **Template** e clicca su **Nuovo**. Puoi:

- scrivere un messaggio da zero
- oppure utilizzare l’intelligenza artificiale per generarlo automaticamente

![](https://support.spoki.com/wp-content/uploads/2022/10/Template-AI-1024x840.png)
Se scegli la generazione tramite AI, dovrai indicare l’obiettivo del messaggio, fornire una breve descrizione e selezionare il tono (persuasivo, formale, amichevole, ecc.). 

![](https://support.spoki.com/wp-content/uploads/2022/10/template-ai-copia-1024x743.png)

Il sistema proporrà tre versioni tra cui scegliere.

![](https://support.spoki.com/wp-content/uploads/2022/10/templateAI-fin-1024x517.png)
Dopo aver selezionato il template che preferisci, verrai reindirizzato al **pannello di modifica**, dove potrai personalizzarne il contenuto, aggiungere pulsanti e apportare eventuali modifiche prima di procedere con la richiesta di approvazione.

Per scrivere un testo manualmente, clicca su **Vuoto**, quindi seleziona la categoria del template:

- Marketing: promozioni, offerte, messaggi di benvenuto, inviti, aggiornamenti, richieste di risposta o completamento di transazioni
- Utility: comunicazioni legate a una transazione specifica e concordata (se il contenuto combina elementi di marketing e utility, deve essere classificato come marketing)
- Autenticazione (OTP): messaggi contenenti codici di accesso monouso per verifiche o login

La categoria del template selezionata in Spoki può essere modificata da Meta in base ai propri algoritmi di classificazione automatica.I template devono sempre essere messaggi completi e significativi, poiché, in linea teorica, quel contenuto potrebbe essere inviato a centinaia di migliaia di utenti WhatsApp.

In passato, ad esempio, messaggi contenenti solo parole come “TEST” o “PROVA” non venivano approvati da Meta e possono tuttora essere considerati contenuti di spam.Per questo motivo, è consigliabile eseguire i test utilizzando un messaggio di esempio reale, cioè una bozza del testo che si intende effettivamente inviare.

Al seguente link è possibile consultare degli esempi di classificazione dei messaggi: [Linee guida per i modelli di utility, autenticazione e marketing](https://developers.facebook.com/docs/whatsapp/updates-to-pricing/new-template-guidelines/?translation).

## **Campi obbligatori nella creazione del template**

- Nome: identificativo interno, non visibile al cliente, utile per riconoscere il template
- Categoria: deve corrispondere alla tipologia del messaggio per evitare rifiuti da parte di WhatsApp
- Lingua: deve corrispondere al testo del messaggio; è possibile aggiungere traduzioni per creare template multilingua, utili per campagne internazionali

Nel campo **Lingua** dovrete scegliere la lingua in cui intendete richiedere il template (se la lingua non corrisponde al testo richiesto, whatsapp potrebbe rifiutare il template). Per aggiungere una traduzione, dovrete selezionare l’altra Lingua e scrivere il testo del messaggio nella traduzione corretta.

Aggiungendo le traduzioni, potrete richiedere simultaneamente l’approvazione per un [template multi lingua](https://support.spoki.com/docs/how-to/come-inviare-messaggi-multi-lingua/). In questo modo sarà possibile avviare un’unica automazione per liste di clienti appartenenti a più nazioni. Infatti, Spoki in base al prefisso internazionale invierà il messaggio specifico con l’esatta traduzione.

Nel box centrale è necessario inserire il messaggio così come lo si vuole inviare al cliente:

1. Intestazione (facoltativa): testo, immagine, video o PDF
1. Testo: corpo del messaggio, personalizzabile con formattazione (emoji, grassetto, corsivo, barrato) e campi dinamici (es. FIRST_NAME)
1. Piè di pagina: testo meno visibile, spesso usato per indicare un sito, indirizzo o nome del brand
1. Bottoni: call to action per interagire con il messaggio. Le tipologie sono le seguenti:
- Link: rimando ad un link che può contenere un sito internet o anche un’immagine caricata sul web. Il link inserito nel bottone può essere statico (es. www.spoki.it) oppure dinamico, in quest’ultimo caso il link conterrà alla fine del link un campo dinamico che varia per ciascun cliente.
- Numero di telefono: la CTA è “chiamami al seguente numero”.
- Risposta di testo:con questi pulsanti si suggeriscono delle possibili risposte al messaggio. Nella sostanza, il cliente, cliccando su questi pulsanti, risponderà al messaggio con quelle esatte parole, a cui sarà possibile poi agganciare un’altra automazione e quindi rispondere in automatico alla chat del cliente che interagisce. Si suggerisce di non usare risposte di testo troppo semplici (es. SI/NO) perchè impostando delle automazioni come trigger la sola risposta si o no, nel caso in cui il cliente scrivesse questa risposta fuori dal contesto automazioni, riceverebbe il messaggio collegato a quell’automazione.(Questo esempio viene riportato nella sezione Automazioni)

È possibile inserire fino a **10 bottoni di risposta di testo** e **2 call to action** (link e telefono), con messaggi differenti in base al bottone cliccato.

Sulla destra sono presenti i **Valori di esempio**: inserire a titolo esemplificativo delle ipotesi di compilazione del messaggio template così come lo riceverà il cliente.

I template devono essere tutti diversi tra loro, WhatsApp non permette di richiedere un template identico ad uno già richiesto in precedenza, a meno che quest’ultimo non venga eliminato dall’elenco dei template.

Una volta definito il testo, è possibile salvare in bozza, modificare, duplicare e richiedere l’approvazione a WhatsApp. Se il messaggio viene modificato anche di un sola virgola, il **template dovrà essere nuovamente approvato da Whatsapp**, occorre pertanto mettere in conto il tempo di approvazione.

Non verranno approvati template che sono esattamente la copia nel testo di altri già approvati (anche se i bottoni sono diversi tra loro).

La richiesta di template è illimitata. I** template verranno approvati/ rifiutati da Whatsapp entro 48h ore dalla richiesta (in media però è sufficiente 1h)**.

Una volta inoltrata la richiesta di approvazione, il template sarà inserito nello status “in coda”, successivamente passerà “in review” (nel momento in cui è in fase di analisi da parte di WA) e l’ultimo step sarà “Approvato”, e quindi potrà essere utilizzato nell’invio di messaggi e verrà visualizzato tra i messaggi che è possibile inviare nelle automazioni, oppure “Rifiutato”. In quest’ultimo caso occorrerà richiedere un nuovo Template, cercando di modificare e limare il testo in modo da farlo passare nuovamente dal controllo di WhatsApp. **[Normativa sulle vendite di WhatsApp](https://www.whatsapp.com/legal/commerce-policy/)**

**Template con immagini**: le proporzioni consigliate per una risoluzione ottimale sono 1,91 : 1. Se non utilizzi questo rapporto, l’immagine del modello di WhatsApp potrebbe mostrare strani ritagli, zoom su WhatsApp. La dimensione massima delle immagini: 16 MB.Inoltre, è possibile rendere dinamica l’immagine all’interno del template selezionando come trigger integrazioni → API e personalizzando i campi dinamici. Successivamente, è necessario aggiungere il template e impostare il media file scegliendo tra due opzioni: “popolare in base al contatto” oppure “statico”.

![](https://support.spoki.com/wp-content/uploads/2022/10/Screenshot-2025-09-17-alle-17.02.29-1024x600.png)
![](https://support.spoki.com/wp-content/uploads/2022/10/Screenshot-2025-09-17-alle-17.21.35.png)

**Template con video:** I video devono aver una dimensione massima di 16 MB.

Questi sono i tipi MIME supportati: video/mp4, video/3gpp. Ci sono requisiti aggiuntivi:

*Sono supportati solo il codec video H.264 e il codec audio AAC.*Meta supporta video con flusso audio singolo o senza flusso audio.

Inoltre per li template multilingua è possibile tradurlo in automatico cliccando su Copia e Traduci in alto a destra. 

## Template OTP

I template OTP sono dei template particolari, impostati direttamente da Whatsapp. Come tali non sono personalizzabili se non per il campo dinamico.

Per creare un template con OTP, vai nel menu Template > Nuovo

La compilazione della richiesta del template è da fare come segue:

![](https://support.spoki.com/wp-content/uploads/2022/10/OTP-TEMPLATE-1024x599.png)

## Articoli correlati

[Regole per evitare il ban da WhatsApp](https://support.spoki.com/docs/regole-whatsapp/regole-per-evitare-il-ban-da-whatsapp/)

[Qualità dei messaggi inviati](https://support.spoki.com/docs/regole-whatsapp/qualita-dei-messaggi-inviati/)

[Proporzioni consigliate per le immagini nei messaggi Whatsapp](https://support.spoki.com/docs/how-to/proporzioni-consigliate-per-le-immagini-nei-messaggi-whatsapp/)

[Come duplicare le automazioni/ template](https://support.spoki.com/docs/how-to/come-duplicare-le-automazioni-template/)

[Come creare un’automazione con risposta ai bottoni del template](https://support.spoki.com/docs/how-to/come-creare-unautomazione-con-risposta-ai-bottoni-del-template/)