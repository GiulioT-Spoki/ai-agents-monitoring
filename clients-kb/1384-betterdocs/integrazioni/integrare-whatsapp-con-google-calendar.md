---
title: Integrare Google Gmail
slug: integrare-whatsapp-con-google-calendar
author: Emanuela Locorotondo
date: 2023-01-03
modified: 2026-07-10
word_count: 996
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/integrare-whatsapp-con-google-calendar/
---

# Integrare Google Gmail

Lo step **Google Gmail** permette di inviare email e creare bozze direttamente dalle automazioni tramite Gmail.Puoi inviare messaggi personalizzati ai contatti, generare draft per revisione e gestire comunicazioni email in tempo reale.

## Overview

Lo step Google Gmail consente alle automazioni di:

- Send Email – inviare email direttamente tramite Gmail
- Create Draft – creare bozze salvate su Gmail
- Multi-Account Support – collegare e gestire più account Google
- Dynamic Data – inserire campi dinamici e dati dei contatti nelle email

## When to Use

Utilizza questo step quando hai bisogno di:

Use CaseExampleSend notificationsConferme ordine, aggiornamenti spedizione, promemoria appuntamentiFollow-up communicationsEmail automatiche dopo conversazioni WhatsAppDocument deliveryInvio di fatture, ricevute o documentiTeam notificationsNotifiche interne per lead o eventi importantiCreate email templatesCreazione bozze per revisione manualeMulti-channel messagingSupportare WhatsApp con comunicazioni email
## Prerequisites

Prima di usare lo step Google Gmail è necessario:

- Collegare un account Google autorizzando l’accesso Gmail
- Avere Gmail attivo sull’account selezionato
- Preparare contenuti email (oggetto e corpo del messaggio)

Suggerimento: testa prima con una bozza tramite *Create Draft* per verificare formattazione e contenuto.

## Configuration

### Step 1: Select Event

Scegli l’azione da eseguire quando lo step viene attivato:

EventDescriptionSend EmailInvia subito un’email ai destinatariCreate DraftCrea una bozza salvata su Gmail
### Step 2: Select Google Account

Seleziona l’account Google collegato da utilizzare:

- scegli dal menu a tendina
- oppure clicca Connect a new account per aggiungerne uno nuovo tramite OAuth

Puoi collegare più account e usarli in automazioni diverse.

### Step 3: Configure Email Fields

![](https://support.spoki.com/wp-content/uploads/2023/01/Screenshot-2026-01-26-at-10.56.46-3-754x1024.png)
Configura i campi dell’email:

- valori statici oppure campi dinamici
- campi obbligatori: Subject, Body, almeno un destinatario (To/Cc/Bcc)
- campi opzionali: From Name, Reply To, Attachments

Attachments:

- puoi allegare qualsiasi file
- puoi aggiungerne più di uno cliccando “Add”

## Available Events

### Send Email

Invia immediatamente un’email ai destinatari indicati.

Use case: notifiche, conferme, follow-up, invio documenti.

Comportamento:

- invio immediato all’esecuzione dello step
- l’email appare in “Sent” dell’account collegato
- tutti i campi vengono inviati insieme (To, Subject, Body, ecc.)

### Create Draft

Crea una bozza senza inviarla.

Use case: email importanti da revisionare prima dell’invio.

Comportamento:

- bozza salvata in Gmail nella cartella Drafts
- modificabile e inviabile manualmente
- tutti i campi vengono salvati nella bozza

## Email Field Mapping

### Dynamic Field Syntax

Puoi inserire dati del contatto usando la sintassi dinamica:

SyntaxDescription`%%FIRST_NAME%%`Nome del contatto`%%LAST_NAME%%`Cognome`%%PHONE%%`Numero di telefono`%%EMAIL%%`Email del contatto`%%CUSTOM_FIELD_NAME%%`Campo personalizzato
### Email Fields

FieldDescriptionRequiredToDestinatari principaliYes*CcCopia conoscenzaNoBccCopia nascostaNoFrom NameNome visualizzato del mittenteNoReply ToIndirizzo per risposteNoSubjectOggetto emailYesBodyCorpo messaggioYesAttachmentsFile allegatiNo
- Deve essere presente almeno uno tra To, Cc o Bcc.

### Example Email Configuration

FieldValueTo`%%EMAIL%%`Cc`team@company.com`Subject`Order Confirmation: %%ORDER_ID%%`Body`Dear %%FIRST_NAME%%,\n\nYour order has been confirmed...`From NameCustomer ServiceReply To`support@company.com`Attachments`invoice-%%ORDER_ID%%.pdf`, `%%RECEIPT_FILE%%`
## Multi-Account Support

### Connecting Accounts

Per collegare più account Google:

- apri configurazione step Gmail
- clicca Connect a new account
- completa autorizzazione OAuth
- l’account sarà disponibile nel menu

### Managing Accounts

Ogni account può essere gestito:

- cambio account dal dropdown
- disconnessione tramite icona dedicata

Nota: assicurati che l’account selezionato abbia permessi adeguati per inviare email.

## Examples

### Example 1: Order Confirmation Email

- Event: Send Email
- To: %%EMAIL%%
- Subject: Order Confirmation #%%ORDER_ID%%
- Body: messaggio personalizzato con dati ordine

### Example 2: Follow-up Email with Attachments

- invio email dopo conversazione WhatsApp con documenti allegati
- Attachments: %%DOCUMENT_PATH%%, product-catalog.pdf

### Example 3: Create Draft for Review

- Event: Create Draft
- Draft modificabile manualmente in Gmail

### Example 4: Team Notification Email

- To: team@company.com
- Subject: New Lead Alert: %%FIRST_NAME%% %%LAST_NAME%%

## Best Practices

- usa oggetti email chiari e descrittivi
- personalizza con campi dinamici
- testa prima con Create Draft
- imposta Reply-To correttamente
- usa Bcc per privacy
- struttura bene il corpo con \n
- gestisci allegati con dimensioni ragionevoli
- controlla i limiti Gmail (500/day standard, 2000/day Workspace)

## FAQ

**D: Cosa succede se l’account Google viene disconnesso?**Lo step dell’automazione fallirà finché non:

- riconnetti lo stesso account Google
- selezioni un altro account collegato

**D: Posso inviare email a più destinatari?**Sì. Puoi aggiungere più destinatari nei campi To, Cc e Bcc. Ogni campo supporta più indirizzi email.

**D: Quali permessi sono necessari a Spoki?**Spoki richiede:

- accesso per inviare email tramite Gmail
- accesso per creare bozze nel tuo account Gmail
- accesso al tuo indirizzo email per identificare l’account collegato

**D: Posso usare template email?**Sì. Puoi utilizzare la sintassi dei campi dinamici per creare template email. Puoi salvare contenuti in campi personalizzati oppure usare testo statico con placeholder dinamici.

**D: Cosa succede se l’email del destinatario non è valida?**L’invio fallirà se l’indirizzo email non è valido. Gmail restituirà un errore e lo step dell’automazione non verrà completato.

**D: Posso allegare file alle email?**Sì. Puoi allegare qualsiasi file alle email.

- aggiungi il percorso o URL di ogni allegato
- puoi includere più allegati

**D: Come posso gestire la formattazione dell’email?**Il corpo dell’email supporta testo semplice.

- usa le interruzioni di riga (\n) per andare a capo
- testa sempre la resa finale prima dell’invio

**D: Più automazioni possono inviare email dallo stesso account?**Sì. Più automazioni possono inviare email dallo stesso account Gmail. Presta attenzione ai limiti giornalieri.

**D: Qual è la differenza tra Send Email e Create Draft?**

- Send Email: invia immediatamente l’email ai destinatari
- Create Draft: crea una bozza in Gmail che puoi revisionare e inviare manualmente

**D: Posso programmare l’invio delle email?**Create Draft permette di creare bozze programmabili manualmente.Per invio automatico, usa delay nell’automazione con Send Email.

**D: C’è un ritardo nell’invio delle email?**Le email vengono generalmente inviate in pochi secondi. La latenza può variare.

**D: Posso usare indirizzi “From” personalizzati?**L’indirizzo mittente è determinato dall’account Google collegato.

- puoi personalizzare il campo From Name
- l’indirizzo email sarà sempre quello dell’account connesso

**D: Cosa succede se supero i limiti di invio di Gmail?**Se superi i limiti giornalieri, le email non verranno inviate. Dovrai:

- attendere il reset del limite
- oppure usare un altro account Gmail

## Documenti Correlati

- Transform Contact Field – Format data before using in emails
- Integrations – Managing Google Gmail integration settings