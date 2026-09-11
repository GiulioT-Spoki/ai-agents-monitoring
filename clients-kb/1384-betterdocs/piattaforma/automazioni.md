---
title: Automazioni
slug: automazioni
author: Emanuela Locorotondo
date: 2022-12-19
modified: 2025-08-06
word_count: 563
categories: Piattaforma
url: https://support.spoki.com/docs/piattaforma/automazioni/
---

# Automazioni

### Prima di iniziare

Puoi creare tutti gli elementi necessari direttamente durante la configurazione dell’automazione, senza bisogno di prepararli in anticipo. In particolare:

- Template: all’interno dello step “Aggiungi step >> Template” è possibile selezionare “Crea nuovo template”
- Lista contatti / integrazione: si può creare direttamente durante la configurazione dello step di invio o azione collegata
- Tag: è possibile crearli direttamente dallo step corrispondente

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-08-06-alle-10.27.38.png)
Una volta pronti, è possibile impostare l’automazione.

### Creazione dell’automazione

Vai su **Automazioni > Nuova**. Si aprirà una schermata dove potrai:

- Creare un’automazione vuota
- Selezionare tra automazioni preconfigurate

Scegliendo la prima opzione creerai un’automazione da zero.

### Step di avvio (trigger)

Definisci la condizione che attiverà l’automazione tramite **“Aggiungi step di Avvio”**. I possibili trigger sono:

- Messaggio dal cliente
- Integrazione
- Commerce
- Lista
- Condizione su data
- Orari non lavorativi
- Giorni festivi
- Ticket
- Accettazione marketing
- Spoki Voice

#### Esempi di trigger

**Messaggio dal cliente**Si attiva quando il cliente scrive esattamente la frase configurata. Casi comuni:

- Utilizzo di un pulsante chat dal sito
- Click su un bottone di risposta in un template inviato

*Nota: la stessa frase può avviare una sola automazione.*

**Integrazione**Il trigger proviene da strumenti esterni.

**Condizione su Data**Può avviare ad esempio messaggi di reminder automatici.

**Giorni non lavorativi / festivi**Invia un messaggio automatico a chi scrive in orari o giorni specifici, solo se non ci sono altre automazioni di risposta attive.

**Ticket**Si attiva quando cambia lo stato dei ticket associati al contatto.

### Aggiunta delle azioni automatiche

Clicca su **“Aggiungi step”** per impostare una o più azioni:

#### Tipi di azioni disponibili

- Invia messaggioInvia un messaggio automatico al contatto.
- Spoki VoiceEffettua una chiamata vocale automatica tramite Spoki.
- Aggiungi nota alla chatInserisce una nota interna visibile solo agli operatori.
- Chat da leggereSegna la chat come non letta o da leggere per gli operatori.
- Risposta del clienteAttende una risposta da parte del cliente prima di proseguire l’automazione.
- RitardoInserisce una pausa temporale tra le azioni.
- Se / AltrimentiCrea una condizione logica per eseguire azioni diverse in base a regole specifiche.
- RamificazioneCrea più percorsi paralleli nell’automazione.
- Vai allo stepPermette di saltare direttamente a un altro step del flusso.
- Avvia automazioneAvvia un’altra automazione predefinita.
- Termina automazioniFerma una o più automazioni attive sul contatto.
- Aggiungi tagApplica un tag al contatto per classificarlo.
- Rimuovi tagRimuove un tag precedentemente assegnato al contatto.
- Aggiungi alla listaAggiunge il contatto a una lista specifica.
- Rimuovi dalla listaRimuove il contatto da una lista.
- Popola campo contattoAggiorna un campo personalizzato (es. nome, email, città) del contatto.
- Accettazione marketingRegistra l’accettazione del trattamento dati per finalità di marketing.
- Blocca contattoBlocca il contatto impedendo ulteriori comunicazioni.
- Ripristina contattoSblocca il contatto precedentemente bloccato.
- Aggiungi operatoriAssegna uno o più operatori alla conversazione o al contatto.
- Rimuovi operatoriRimuove operatori assegnati al contatto o alla chat.
- Operatore AIAssegna un operatore virtuale (basato su intelligenza artificiale) alla chat.
- Apri ticketCrea un nuovo ticket di assistenza.
- Aggiorna ticketModifica o aggiunge informazioni a un ticket esistente.
- Invia webhookInvia dati a un sistema esterno tramite webhook.
- EmailchefInvia dati a Emailchef per azioni di email marketing.
- PayPalIntegrazione con PayPal per notifiche o azioni legate ai pagamenti.
- ZapierCollega l’automazione con altre app e servizi tramite Zapier.
- ActiveCampaignInvia dati a ActiveCampaign per CRM ed email marketing.
- Invia webhook a MakeInvia un webhook alla piattaforma Make (ex Integromat) per flussi automatizzati.

## Articoli correlati

[Regole per evitare il ban da WhatsApp](https://support.spoki.com/docs/regole-whatsapp/regole-per-evitare-il-ban-da-whatsapp/)

[Qualità dei messaggi inviati](https://support.spoki.com/docs/regole-whatsapp/qualita-dei-messaggi-inviati/)

[Come creare nuovi utenti e attribuire poteri diversi](https://support.spoki.com/docs/how-to/come-aggiornare-il-profilo-whatsapp-di-spoki/)

[Come avviare le campagne](https://support.spoki.com/docs/piattaforma/campagne/)

[Come duplicare le automazioni/ template](https://support.spoki.com/docs/how-to/come-duplicare-le-automazioni-template/)