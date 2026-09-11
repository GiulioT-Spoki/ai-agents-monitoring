---
title: Nuove funzionalità di Active Campaign
slug: nuove-funzionalita-di-active-campaign
author: Marco Manigrassi
date: 2024-04-18
modified: 2024-07-04
word_count: 702
categories: How to
url: https://support.spoki.com/docs/how-to/nuove-funzionalita-di-active-campaign/
---

# Nuove funzionalità di Active Campaign

Integrando **Spoki** con **ActiveCampaign** potrai utilizzare WhatsApp nella tua strategia di Marketing Automation, inviando notifiche programmate ai tuoi clienti.

Potrai inviare notifiche ai contatti del tuo database per:

- ricordare appuntamenti
- comunicare scadenze di pagamenti
- inviare comunicazioni
- integrare WhatsApp nel customer journey

Per sfruttare tutte le funzionalità tra Spoki e ActiveCampaign come prima cosa è necessario impostare le chiavi di collegamento tra ActiveCampaign e Spoki.

E’ necessario accedere, al proprio account di AC cliccare sulla rotella in basso a sinistra >> cliccare sula voce del menu “Sviluppatore” e copiare l’API URL e l’API Key.

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2024-04-12-alle-16.58.54-1024x389.png)
Andare poi su Spoki nella sezione Integrazioni >> ActiveCampaign cliccare sul tasto “Attiva” e popolare i campi API URL e API Key con le informazioni presenti su ActiveCampaign, cliccare su Salva.

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2024-04-17-alle-15.10.53-1.png)
Una volta effettuati i passaggi precedenti sarà possibile accedere a tutte le funzionalità dell’integrazione:

- Avvio di una automazione di Spoki tramite un triggger avviato da ActiveCampaign
- Embed chat di Spoki nel dettaglio del contatto e offerta di ActiveCampaign
- Avviare da un’automazione di Spoki un’automazione di ActiveCampaign
- Poter visualizzare tutte le azioni effettuate su Spoki nei confronti del cliente

Vediamo di seguito ciascuna delle funzionalità:

1. Avvio di una automazione di Spoki tramite un triggger avviato da ActiveCampaign

Azioni da compiere sulla dashboard di **Spoki**:Accedi a Spoki, crea il tuo messaggio “template” andando su Menu >> Messaggi Template >> Nuovo.

Crea poi la tua automazione e inserisci il messaggio template appena creato.

- Clicca su “Automazioni” nel menu
- Vai in alto a destra sul tasto “Nuova”
- Dai un nome alla tua Automazione e clicca su “Salva”

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2024-04-18-alle-15.24.25-1024x493.png)
- Premi il tasto “Aggiungi step di Avvio” e seleziona ActiveCampaign

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2024-04-18-alle-15.24.50-1024x659.png)
Una volta effettuata l’integrazione apparirà un pop-up con l’Automation ID e il Webhook URL, come quello seguente:

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2024-04-18-alle-15.25.17.png)
- Copia l’ID dell’automazione, ti servirà in seguito da inserire su AC
- Clicca in basso su “Tua azione automatica”
- In “Tipo azione” seleziona “Template”
- Seleziona il template da inviare e clicca su “Aggiungi”
- Infine premi su “Salva”

Ora passiamo su ActiveCampaign, sarà necessario creare la nuova automazione su Active Campaign cliccando su Crea Automazione

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2024-04-18-alle-15.40.32-1-1024x513.png)
Cliccare su Inizia da Zero >> Continua >> Inizia senza trigger >> cliccare sul + e selezionare CX Apps

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2024-04-18-alle-15.46.06-1024x610.png)
Selezionare la dicitura Spoki – inizia l’automazione su WhatsApp e inserire l’id automazione presente nello step di avvio di Spoki (ID copiato in precedenza).Dopo aver creato l’automazione è necessario attivare l’automazione di ActiveCampaign cliccando attiva in alto a destra.

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2024-04-18-alle-15.49.16-1024x480.png)
Il collegamento è stato completato. 

2. **Embed chat Spoki nel dettaglio del contatto:** è possibile visualizzare la chat di Spoki all’interno del contatto.

Andare nella sezione Contatti in ActiveCampaign, cliccare sul contatto con cui si vuole comunicare e scrollare in basso nella sezione** WhatsApp by Spoki.**

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2024-04-15-alle-11.47.26-1024x697.png)
**Embed chat Spoki nell’offerta di ActiveCampaign:**Cliccare su Offerta in ActiveCampaign, cliccare sul contatto con cui si vuole comunicare e scrollare in basso nella sezione** WhatsApp I Spoki.**

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2024-04-15-alle-12.32.20-1024x763.png)
3. **Avviare da un’automazione di Spoki un’automazione di ActiveCampaign**

Per avviare un’automazione di ActiveCampaign attraverso un’automazione di Spoki è necessario andare nella sezione **Automazioni di Spoki **/ Tua azione automatica / ActiveCampaign e cliccare su **SALVA (ATTENZIONE : se non si salva l’automazione non si otterrà lo step ID necessario per triggerare l’automazione di AC)**

In questo modo, tutti i contatti che raggiungeranno questo specifico step di Spoki entreranno nell’automazione di AC che andrete ad impostare nei prossimi step.

Successivamente sarà necessario creare una nuova automazione su Active Campaign e inserire come trigger dell’automazione lo step **Spoki Automation creato**. Nel seguente video tutti gli step:

In questo caso è necessario scegliere quali Spoki Automations potranno attivare questa specifica automazione di AC. Sarà possibile scegliere tra:

1. Spoki Automations segmento: Questa automazione verrà avviata solo quando un contatto raggiungerà quello specifico Step ID di Spoki

- Step ID (lo step ID da utilizzare è quello che si trova nell’automazione Spoki creata in precedenza)

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2024-04-16-alle-11.49.58.png)
2. **Tutti gli Spoki Automations**: Ogni volta che una qualsiasi automazione di Spoki chiamerà ActiveCampaign, si eseguirà l’automazione creata.

**4. Come poter visualizzare tutte le azioni che da Spoki hanno triggerato delle azioni su ActiveCampaign nei confronti di uno specifico cliente:**

E’ necessario accedere nel **dettaglio del contatto** e scorrere nella sezione **Spoki Automations** presentata nello screenshot.In questa sezione sarà possibile vedere tutte le azioni effettuate per il contatto e i dettagli delle azioni.

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2024-04-18-alle-15.51.42-1024x522.png)