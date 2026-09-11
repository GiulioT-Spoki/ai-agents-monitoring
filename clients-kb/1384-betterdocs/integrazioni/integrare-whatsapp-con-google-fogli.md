---
title: Integrare WhatsApp con Google Fogli
slug: integrare-whatsapp-con-google-fogli
author: romantic-torvalds
date: 2022-10-17
modified: 2025-08-21
word_count: 415
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/integrare-whatsapp-con-google-fogli/
---

# Integrare WhatsApp con Google Fogli

È possibile inviare un messaggio WhatsApp in automatico quando si modifica o si compila **una cella specifica del foglio Google Sheets**. 

Ipotizziamo, ad esempio, che tu voglia **inviare la conferma di un appuntamento** appena preso. Non appena andrai a **modificare il contenuto della cella GoogleSheets**, **Spoki, tramite Zapier, registrerà quel cambiamento e invierà il messaggio al cliente** in questione senza che tu faccia nulla di più.

Vediamo ora come fare per integrare **WhatsApp con Google Sheets** tramite Spoki.

- Come prima cosa vai su Zapier
- Seleziona come Trigger Google Sheets

![](https://support.spoki.com/wp-content/uploads/2022/10/image-23.png)
- Seleziona il Trigger dell’evento, che in questo caso sarà New or Updated Spreadsheet Row (Team Drive)
- Seleziona l’account Google da utilizzare e prosegui con la selezione il foglio Google Sheets che intendi utilizzare
- Come Trigger Column puoi scegliere la colonna che ci servirà come trigger (nell’esempio qui sotto sarà Data Appuntamento)

N.B. Il nome dato alla colonna deve essere identico al campo dinamico creato nella piattaforma Spoki.

![](https://support.spoki.com/wp-content/uploads/2022/10/image-24-1024x675.png)
- Testa che tutto funzioni correttamente con il test trigger.
- Seleziona il tool che dovrà azionarsi quando il foglio Google registrerà una modifica o un nuovo valore nella cella, cioè Spoki.

![](https://support.spoki.com/wp-content/uploads/2022/10/image-25.png)
- Scegli l’azione che dovrà partire a seguito del trigger. Seleziona la voce “Start Automation” (con StartAutomation puoi far partire un messaggio che ha come obiettivo azionare una conversazione con l’utente, quindi che prevede un’automazione) e prosegui con la scelta dell’account Spoki da utilizzare.

![](https://support.spoki.com/wp-content/uploads/2022/10/image-26.png)
- Apri la piattaforma Spoki.
- Crea una nuova automazione o seleziona l’automazione che vuoi collegare a Google Sheet e seleziona come Step di Avvio: Zapier.
- In automatico il sistema genererà un codice identificativo dell’automazione chiamato ID Automazione. Copia il codice e chiudi la finestra.

![](https://support.spoki.com/wp-content/uploads/2022/10/image-27-1024x624.png)
- Seleziona il template che vuoi inviare all’utente inserendo il campo dinamico (nel nostro esempio il campo dinamico sarà Data Appuntamento)
- Torna su Zapier e incolla il codice che hai salvato all’interno della voce ID Standard  Message.

![](https://support.spoki.com/wp-content/uploads/2022/10/image-28.png)
- Fai il match fra i dati che vuoi prendere dal foglio Google e inviarli a Spoki.

![](https://support.spoki.com/wp-content/uploads/2022/10/image-29-1024x588.png)
- Controlla che tutto sia correttamente impostato e attiva lo zap.

Da questo momento in poi, **ogni volta che andrai a modificare una cella del Google Sheets nella colonna scelta l’utente oggetto della modifica riceverà in modo automatico un messaggio WhatsApp**. Nel nostro esempio riceverà un messaggio di conferma appuntamento

![](https://support.spoki.com/wp-content/uploads/2022/10/image-30-1024x278.png)
## Articoli correlati

[Come inviare un messaggio di reminder automatico](https://support.spoki.com/docs/how-to/come-avviare-un-messaggio-di-reminder-in-automatico-da-spoki/)

[Integrare WhatsApp con IFTTT](https://support.spoki.com/docs/integrazioni/integrare-whatsapp-con-ifttp/)

[Integrare WhatsApp con Zapier](https://support.spoki.com/docs/integrazioni/integrare-whatsapp-con-zapier/)