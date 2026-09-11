---
title: Go High Level
slug: go-high-level-trigger
author: Daniele Intermite
date: 2026-02-25
modified: 2026-07-10
word_count: 993
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/go-high-level-trigger/
---

# Go High Level

## Descrizione

Il **Go High Level Trigger** consente di avviare automazioni Spoki quando i workflow di Go High Level (GHL) inviano dati a Spoki tramite webhook.

Utilizzalo per la direzione **GHL → Spoki**: permette di attivare automazioni WhatsApp a partire da eventi generati in GHL (ad esempio invio di moduli, cambi di fase nella pipeline, azioni di campagna), creando un’integrazione bidirezionale insieme al **Go High Level Integration Step**.

## 🎯 Panoramica

Il **Go High Level Trigger** consente di avviare automazioni Spoki quando i workflow di Go High Level (GHL) inviano richieste webhook.

Con questo trigger puoi:

- 🔔 Ricevere dati da GHL – Avviare automazioni Spoki quando un workflow GHL invia una richiesta webhook
- 📞 Identificare i contatti – Associare i dati ricevuti ai contatti Spoki (es. tramite numero di telefono)
- 🔄 Creare un’integrazione bidirezionale – Combinarlo con il Go High Level Integration Step (Spoki → GHL) per flussi a due vie
- 📊 Sincronizzare campi personalizzati – Popolare i campi contatto con dati provenienti da GHL
- ⚡ Avviare flussi in tempo reale – Attivare automazioni WhatsApp in seguito a eventi GHL (invio modulo, cambio fase trattativa, tag aggiunto, ecc.)

## 💡 Quando utilizzarlo

Utilizza questo trigger quando hai bisogno di:

Caso d’usoEsempio**Modulo GHL → WhatsApp**Avviare un’automazione Spoki quando un contatto invia un modulo in GHL**Cambio fase pipeline**Inviare un messaggio WhatsApp quando una trattativa passa a una fase specifica**Evento campagna o sequenza**Attivare Spoki quando un contatto entra/esce da una campagna GHL**Workflow basati su tag**Avviare automazioni quando un contatto riceve un tag in GHL**Calendario o prenotazione**Attivare un follow-up quando viene fissato un appuntamento in GHL**Aggiornamenti CRM**Avviare flussi Spoki quando cambiano dati di contatto o opportunità in GHL
## ✅ Prerequisiti

Prima di utilizzare il Go High Level Trigger, assicurati di:

1. Avere un account Go High Level – Con accesso a workflow/automazioni
1. Creare un’automazione Spoki – Che verrà avviata dal trigger
1. Ottenere l’URL webhook – Disponibile nella configurazione del trigger in Spoki
1. Conoscere la struttura del payload – Sapere quali dati GHL deve inviare (es. numero di telefono per identificare il contatto)

⚠️ **Nota**: La disponibilità del trigger e i dettagli dell’endpoint webhook possono dipendere dalla configurazione del tuo account Spoki. Se non visualizzi il trigger Go High Level, contatta l’amministratore Spoki.

## ⚙️ Configurazione

### Step 1: Aggiungere il Go High Level Trigger

![](https://support.spoki.com/wp-content/uploads/2026/02/Screenshot-2026-02-18-at-15.31.10-1-1024x513.png)
Nell’editor automazioni Spoki:

1. Crea una nuova automazione (oppure modifica una esistente)
1. Nella sezione Trigger, clicca su Seleziona Trigger
1. Seleziona Go High Level dall’elenco integrazioni

### Step 2: Copiare URL Webhook e Secret

![](https://support.spoki.com/wp-content/uploads/2026/02/Screenshot-2026-02-18-at-15.31.59-1.png)
La configurazione del trigger mostra:

- Webhook URL – URL univoco che GHL utilizzerà per avviare l’automazione
- Secret / Token (se previsto) – Per autenticare le richieste provenienti da GHL

Copia questi valori: ti serviranno nel workflow GHL.

### Step 3: Configurare il Workflow in GHL

![](https://support.spoki.com/wp-content/uploads/2026/02/Screenshot-2026-02-18-at-15.34.26-1-1024x713.png)
In Go High Level:

1. Crea o modifica il workflow che deve avviare l’automazione Spoki
1. Aggiungi un’azione Webhook (o richiesta HTTP) verso l’URL webhook di Spoki
1. Imposta:
- Metodo: POST
- Content-Type: application/json
1. Configura il body della richiesta con i campi richiesti (vedi sezione Payload)

### Step 4: Testare il Trigger

Prima di pubblicare:

1. Esegui il workflow GHL con dati di test
1. Verifica che l’automazione Spoki si avvii
1. Controlla che il contatto venga identificato correttamente e che i campi personalizzati siano popolati

## 🔧 Configurazione Webhook

### Flusso: GHL → Spoki

- Il workflow GHL si attiva (es. invio modulo, cambio fase, prenotazione)
- GHL invia una richiesta HTTP POST all’URL webhook di Spoki con dati contatto e campi personalizzati
- Spoki valida la richiesta e avvia l’automazione per il contatto identificato

### Requisiti

- Il workflow GHL deve inviare un JSON valido con almeno il dato necessario per identificare il contatto (es. telefono)
- L’URL webhook deve essere utilizzato esattamente come fornito (senza modifiche)
- Se previsto un secret, includerlo nella richiesta secondo quanto indicato nella configurazione del trigger

## 📦 Payload della Richiesta

Spoki si aspetta un payload JSON da GHL. Struttura tipica:

{ "phone": "+393491234567", "first_name": "Mario", "last_name": "Rossi", "email": "mario.rossi@example.com", "custom_fields": { "LEAD_SOURCE": "GHL Form", "CAMPAIGN_ID": "abc123" }}
### Campi principali

CampoTipoDescrizione`phone`stringNumero in formato E.164; utilizzato per identificare il contatto`first_name`stringNome (opzionale)`last_name`stringCognome (opzionale)`email`stringEmail (opzionale)`custom_fields`objectCoppie chiave-valore per campi personalizzati
I campi richiesti possono variare in base alla configurazione Spoki.

## 👤 Identificazione del Contatto

Il trigger utilizza i dati ricevuti per trovare o creare il contatto in Spoki:

- Telefono – Identificatore principale (formato E.164 consigliato)
- Se il contatto non esiste, Spoki può crearlo (in base alla configurazione)
- I campi personalizzati ricevuti possono essere salvati e utilizzati nell’automazione

## 📝 Esempi

### Esempio 1: Invio Modulo → Messaggio WhatsApp di Benvenuto

**Scenario**: Quando un utente invia un modulo in GHL, viene avviata un’automazione Spoki che invia un messaggio WhatsApp di benvenuto.

**Risultato**: Il contatto riceve automaticamente un messaggio WhatsApp.

### Esempio 2: Cambio Fase Trattativa → Notifica WhatsApp

**Scenario**: Quando una trattativa passa alla fase “Proposta Inviata”, viene attivata un’automazione Spoki.

**Risultato**: Il contatto riceve un messaggio WhatsApp relativo alla proposta.

### Esempio 3: Integrazione Bidirezionale

**Scenario**:

1. Spoki → GHL: Spoki invia il contatto a GHL tramite Integration Step
1. GHL → Spoki: Un evento in GHL richiama il webhook del trigger
1. Spoki avvia un nuovo flusso WhatsApp

**Risultato**: Flusso completo e sincronizzato tra WhatsApp e GHL.

## ✅ Best Practice

1. Utilizza sempre il formato E.164 per i numeri di telefono
1. Mantieni riservato l’URL webhook e l’eventuale secret
1. Testa con un singolo contatto prima di andare in produzione
1. Allinea i nomi dei campi personalizzati tra GHL e Spoki
1. Configura gestione errori o retry in GHL in caso di webhook non riuscito

## ❓ FAQ

### Qual è la differenza tra Trigger e Integration Step?

- Go High Level Trigger: GHL → Spoki (avvia automazioni Spoki)
- Go High Level Integration Step: Spoki → GHL (invia dati a GHL)

### Il Trigger funziona senza Integration Step?

Sì. Può essere utilizzato in modo indipendente.

### Cosa succede se il contatto non esiste?

Dipende dalla configurazione Spoki: può essere creato automaticamente oppure il trigger può essere rifiutato.

### Posso attivare più automazioni da un singolo workflow GHL?

Ogni automazione ha un proprio webhook. Per attivarne più di una, è necessario richiamare ciascun URL separatamente.

### Non vedo il Go High Level Trigger nel mio account

La disponibilità può dipendere dal piano o dalla configurazione. Contatta l’amministratore Spoki.