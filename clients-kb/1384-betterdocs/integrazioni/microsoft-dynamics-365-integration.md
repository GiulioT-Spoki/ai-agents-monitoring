---
title: Integrazione Microsoft Dynamics 365
slug: microsoft-dynamics-365-integration
author: Daniele Intermite
date: 2026-06-26
modified: 2026-06-26
word_count: 1964
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/microsoft-dynamics-365-integration/
---

# Integrazione Microsoft Dynamics 365

## Panoramica

L’integrazione Dynamics 365 permette al tuo team di aprire conversazioni WhatsApp direttamente da una scheda Contact di Dynamics. In breve, offre:

- Open Spoki Chat da qualsiasi Contact — un singolo pulsante sulla Contact form di Dynamics apre una conversazione WhatsApp incorporata, pre-filtrata su quel contatto.
- Esperienza di chat incorporata — leggi la cronologia e invia risposte all’interno di un iframe modale, direttamente sulla Contact form, oppure stacca la chat in una finestra dedicata.
- Matching automatico dei contatti — i contatti Dynamics vengono abbinati ai contatti Spoki tramite telefono o email, così la cronologia delle conversazioni resta legata alla persona giusta.
- Provisioning automatico degli utenti — gli utenti Dynamics vengono mappati a operatori chat Spoki al primo utilizzo; nessuna configurazione manuale degli utenti richiesta.
- Sincronizzazione contatti opzionale — collega le marketing list di Dynamics alle liste Spoki per una sincronizzazione bidirezionale continua dei contatti (vedi Contact Sync).

L’integrazione è **read-only** sul tuo ambiente Dynamics. Spoki non può mai modificare, eliminare o creare record Dynamics — legge soltanto telefono, email e nome di un contatto quando clicchi il pulsante della chat.

## Quando usarla

Usa questa integrazione quando il tuo team lavora principalmente dentro Dynamics 365 e ha bisogno di raggiungere i contatti su WhatsApp.

Caso d’usoEsempio**Sales outreach**Scrivi a un prospect su WhatsApp direttamente dalla sua scheda Contact**Customer support**Apri la cronologia delle conversazioni esistenti mentre consulti un contatto**Follow-up**Rispondi a un lead senza uscire dal Dynamics Sales Hub**Account management**Mantieni un’unica fonte di verità per i contatti tra Dynamics e Spoki**Team field/mobile**Usa la chat incorporata dall’app mobile di Dynamics
## Prerequisiti

Prima di usare l’integrazione Dynamics 365 ti servono:

1. Un account Spoki con un numero WhatsApp Business attivo.
1. Un ambiente Microsoft Dynamics 365 con l’entità Contact (Sales, Customer Service o qualsiasi model-driven app).
1. Diritti di admin in Dynamics — per installare la solution, modificare la Contact form e pubblicare le modifiche.
1. Diritti di admin in Spoki — solo il proprietario dell’account può collegare l’integrazione e recuperare la signing key.

I Contact di Spoki sono indicizzati su WhatsApp e richiedono un numero di telefono. Un contatto Dynamics deve avere un **mobile phone** o un **business phone** valorizzato per poter aprire una chat — la sola email non basta.

## Configurazione

La configurazione è un’operazione una tantum per ogni tenant Dynamics, in quattro step.

### Step 1 — Collega il tuo tenant Dynamics 365

In Spoki, vai su **Integrations → Microsoft Dynamics 365** e collega l’integrazione.

1. Verrai reindirizzato a Microsoft per autorizzare Spoki (OAuth 2.0 tramite Microsoft Entra ID).
1. Accedi con un account admin di Dynamics e approva i permessi richiesti.
1. In caso di successo, vieni riportato alla pagina dell’integrazione su Spoki e la connessione è attiva.

*“By connecting Dynamics 365, you will be able to view the Spoki chat directly in the Dynamics CRM contact form. You will be redirected to Microsoft to authorize Spoki.”*

### Step 2 — Installa la solution Spoki

Dalla pagina dell’integrazione, clicca **Install Spoki Dynamics 365** per scaricare il pacchetto della managed solution (`SpokiDynamicsApp.zip`).

- Importalo in Dynamics tramite Power Apps Maker → Solutions → Import (Soon ⇒ from Microsoft AppSource).
- La solution aggiunge il control SpokiContactCard (namespace Spoki) al tuo ambiente.

### Step 3 — Aggiungi il control alla Contact form

Nel **Power Apps form designer**, modifica la Contact main form:

- Aggiungi il componente SpokiContactCard alla form, nel punto in cui vuoi che appaia il pannello chat.
- Save e Publish della form.

### Step 4 — Installa la signing key

La signing key autentica ogni richiesta di chat inviata dal tuo tenant Dynamics a Spoki. Copiala da Spoki e incollala nel control.

Nella pagina dell’integrazione Spoki, copia la **Spoki signing key**, poi in Dynamics:

#StepCosa fare1**Apri la Contact form**Nel Power Apps form designer, modifica la Contact form dove è installato il Spoki PCF.2**Seleziona il control SpokiContactCard**Clicca sul control incorporato per aprire il suo pannello delle proprietà sulla destra.3**Incolla la key**Nel pannello a destra, incolla il valore della signing key nella proprietà `spokiSigningKey`.4**Save and publish**Pubblica le modifiche così ogni utente della tua organizzazione riceve l’aggiornamento.

La signing key è **per-tenant**. È derivata da un master secret di Spoki che non viene mai esposto — quindi anche se la key trapelasse, sarebbe interessato solo il tuo tenant. Chiunque abbia accesso come account-owner di Spoki può recuperarla di nuovo in qualsiasi momento.

## Usare la chat incorporata

Una volta completata la configurazione, apri un qualsiasi **Contact** in Dynamics 365. La Spoki card appare sulla form.

### Open Spoki Chat

Clicca **Open Spoki Chat**. Cosa succede:

- Spoki legge telefono/email e nome del contatto dal record.
- Abbina (o crea) il corrispondente contatto Spoki e carica la conversazione WhatsApp.
- La chat viene renderizzata incorporata in un iframe direttamente sulla Contact form.
- Il permesso del microfono viene richiesto in anticipo così che le chiamate vocali WhatsApp funzionino dentro la chat.

### Stacca la chat

Clicca **WhatsApp By Spoki ↗** nella toolbar della chat per aprire la stessa conversazione in una finestra del browser separata e dimensionata correttamente — comodo per fare multitasking mentre navighi tra altri record.

### Chiudi la chat

Clicca **Close** per richiudere la chat e riportare la card al suo stato iniziale.

La conversazione è **la stessa** sia che venga vista incorporata, staccata o dentro l’app principale Spoki. Tutte e tre condividono un’unica cronologia.

## Matching dei contatti e dati

### Cosa legge Spoki da Dynamics

Quando clicchi **Open Spoki Chat**, Spoki legge solo questi campi dal record Contact:

Campo DynamicsUsato perObbligatorio`mobilephone`Telefono primario per il matching WhatsAppAlmeno un telefono obbligatorio`telephone1`Business phone di fallback—`emailaddress1`Matching via email (secondario)No`firstname`Nome del contattoNo`lastname`Cognome del contattoNo
Spoki legge anche l’**email/username dell’utente Dynamics** che ha cliccato il pulsante (per access control e audit). **Nessun altro campo o entità Dynamics** (Opportunities, Cases, Accounts, ecc.) viene mai letto.

### Come funziona il matching

- Il telefono ha la priorità: viene usato prima mobilephone, poi telephone1.
- Il telefono viene normalizzato (spazi, parentesi e trattini rimossi) prima del matching con i tuoi contatti Spoki.
- Se non esiste alcun contatto Spoki, ne viene creato uno a partire dai dati Dynamics (telefono, email, nome/cognome).
- Se il contatto non ha telefono, la chat non può aprirsi — aggiungi mobilephone o telephone1 in Dynamics e riprova.

## Accesso utenti e provisioning

L’utente Dynamics che clicca il pulsante viene mappato automaticamente a un utente Spoki.

- Utenti Spoki esistenti (abbinati via email all’interno dell’account) mantengono il loro ruolo e i loro permessi esistenti.
- Nuovi utenti vengono auto-provisioned come Chat Operator — mai come admin.
- Sicurezza cross-account: un utente Spoki reale appartenente a un altro account non viene mai collegato in modo silenzioso. L’accesso cross-account resta solo su invito.
- La disattivazione viene rispettata: se un admin disattiva un utente provisioned da Dynamics, quell’utente non può riottenere l’accesso cliccando di nuovo il pulsante.

Per concedere a un utente Dynamics più dell’accesso da chat-operator, invitalo in Spoki (**Users & Roles**) usando la stessa email che utilizza in Dynamics.

## Sicurezza e privacy

- OAuth 2.0 tramite Microsoft Entra ID — Spoki non vede mai la tua password Microsoft. Access token e refresh token sono archiviati cifrati e mai esposti al browser.
- HMAC signing per-tenant — ogni richiesta di chat è firmata; il backend la verifica rispetto alla key del tuo tenant, con una breve finestra temporale per bloccare i replay attack. In alternativa, il control può autenticarsi con un Dataverse bearer token, validato lato server rispetto alla tua organizzazione.
- Read-only su Dynamics — Spoki non può modificare, eliminare o creare record Dynamics.
- EU data residency — tutto il processing di questa integrazione avviene sull’infrastruttura EU di Spoki (AWS Frankfurt, eu-central-1).
- Audit logging — ogni richiesta di apertura chat (timestamp, organizzazione, utente, telefono hashato) viene loggata per finalità di security forensics e conservata per 90 giorni.

Per i dettagli completi sul data-flow e sulla disclosure, vedi il paragrafo Privacy dell’integrazione Dynamics e `https://spoki.com/en/security`.

## Esempi

### Esempio 1 — Un sales rep raggiunge un prospect

**Scenario**: un rep apre la scheda Contact di un lead nel Dynamics Sales Hub e vuole inviare un messaggio WhatsApp.

1. Apri il Contact → la Spoki card mostra Open Spoki Chat.
1. Cliccalo → la chat incorporata si carica, filtrata sul numero di cellulare del contatto.
1. Scrivi e invia il messaggio — viene consegnato via WhatsApp Business e la conversazione viene salvata in Spoki.

### Esempio 2 — Un support agent consulta la cronologia

**Scenario**: un support agent vuole l’intera cronologia WhatsApp mentre consulta un contatto.

1. Apri il Contact → clicca Open Spoki Chat.
1. Clicca WhatsApp By Spoki ↗ per staccare la chat in una finestra dedicata.
1. Naviga tra altri record Dynamics in parallelo mantenendo aperta la conversazione.

### Esempio 3 — Nuovo contatto creato alla prima chat

**Scenario**: un contatto Dynamics esiste ma non ha ancora una controparte Spoki.

1. Clicca Open Spoki Chat sul record Contact.
1. Spoki crea un contatto corrispondente a partire da mobilephone, email e nome di Dynamics.
1. La conversazione si apre; le chat future riutilizzano lo stesso contatto Spoki.

## Best Practices

1. Valorizza un numero di telefono su ogni contatto. WhatsApp richiede un telefono. Standardizza su mobilephone (o telephone1) nelle tue regole di data hygiene di Dynamics così i rep non incappano mai nel messaggio “no phone”.
1. Usa il formato telefonico internazionale. Salva i numeri in formato internazionale completo (es. +39 333 1234567). Spoki normalizza la formattazione, ma il country code deve essere presente per abbinare il numero WhatsApp corretto.
1. Mantieni le email coerenti per la mappatura utenti. L’auto-provisioning abbina gli utenti Dynamics agli utenti Spoki via email. Usa la stessa email primaria in entrambi i sistemi così ruoli e permessi combaciano.
1. Pubblica dopo ogni modifica alla form. L’aggiunta del control o l’incollaggio della signing key hanno effetto solo dopo aver fatto Save and Publish della Contact form in Power Apps.
1. Assegna i ruoli con criterio. Gli utenti auto-provisioned ottengono solo Chat Operator. Per team lead o admin, invitali esplicitamente in Spoki Users & Roles prima che usino la chat.
1. Recupera di nuovo la key se le chat smettono di autenticarsi. Se le chat all’improvviso non si aprono con un auth error, ricopia la signing key dalla pagina dell’integrazione Spoki, reincollala nel control e pubblica.

## FAQ

**Dove appare la chat?** Incorporata direttamente sulla Contact form di Dynamics, dentro il control SpokiContactCard. Puoi anche staccarla in una finestra del browser dedicata.

**Spoki può modificare i miei dati Dynamics?** No. L’integrazione è strettamente read-only — legge telefono, email e nome quando clicchi il pulsante, e nient’altro. Non può creare, aggiornare o eliminare alcun record Dynamics.

**Cosa succede se un contatto non ha un numero di telefono?** La chat non si apre. I contatti Spoki richiedono un telefono per WhatsApp. Aggiungi `mobilephone` o `telephone1` al contatto Dynamics, poi clicca di nuovo il pulsante.

**Un contatto ha sia un mobile sia un business phone — quale viene usato?** Prima `mobilephone`, poi `telephone1` come fallback.

**Devo creare utenti Spoki per tutti quelli in Dynamics?** No. Gli utenti vengono auto-provisioned come Chat Operator al primo utilizzo. Crea/invita utenti manualmente solo quando devi concedere un ruolo superiore.

**Quali permessi richiede l’integrazione?** OAuth scopes per leggere la tua organizzazione Dynamics (Dataverse) e per identificare l’utente loggato. Nessuno write scope viene richiesto.

**Cosa succede quando mi disconnetto?** La connessione e le sue key vengono rimosse lato Spoki. Dovrai anche **rimuovere manualmente la solution installata da Dynamics**. Per ricollegarti in seguito, dovrai ripetere l’intera configurazione.

**I miei dati vengono inviati fuori dall’EU?** No. Tutto il processing dell’integrazione Dynamics avviene sull’infrastruttura EU di Spoki (AWS Frankfurt). Il trasporto dei messaggi WhatsApp è invece gestito dalla WhatsApp Business API di Meta secondo i termini di Meta.

**Perché la chat chiede l’accesso al microfono?** Così che le chiamate vocali WhatsApp funzionino dentro la chat incorporata. Il prompt sfrutta il tuo click su **Open Spoki Chat**. Negarlo non blocca la messaggistica.

**Posso anche sincronizzare i contatti tra Dynamics e Spoki?** Sì. Oltre alla chat incorporata, l’integrazione supporta il collegamento delle marketing list di Dynamics alle liste Spoki per una sincronizzazione contatti bidirezionale e schedulata, con direzione e conflict resolution configurabili. Configurala dalle sync settings dell’integrazione.

**La chat fallisce con un authentication error — cosa controllo?**

1. Che la signing key nel control corrisponda alla key attuale sulla pagina dell’integrazione Spoki (ricopiala e ripubblica in caso di dubbio).
1. Che il tenant Dynamics sia ancora connesso in Spoki (rifai l’OAuth se è stato disconnesso).
1. Che il contatto abbia un numero di telefono valido.