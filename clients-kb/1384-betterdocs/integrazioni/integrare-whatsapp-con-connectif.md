---
title: Integrazione di Spoki con Connectif: Automazione dei messaggi WhatsApp
slug: integrare-whatsapp-con-connectif
author: Emanuela Locorotondo
date: 2022-12-20
modified: 2025-09-18
word_count: 789
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/integrare-whatsapp-con-connectif/
---

# Integrazione di Spoki con Connectif: Automazione dei messaggi WhatsApp

Sincronizza il tuo account Spoki con Connectif per automatizzare l’invio di messaggi WhatsApp personalizzati per ogni contatto, ottimizzando così le tue campagne di messaggistica diretta.

In questo articolo, imparerai come integrare il tuo account Spoki con Connectif e automatizzare l’invio di messaggi WhatsApp quando un contatto abbandona il carrello.

**Requisiti**:

Per integrare il tuo account Spoki con Connectif e automatizzare le tue campagne WhatsApp, hai bisogno di:

- Un account su Connectif.
- Un template precedentemente creato per la tua campagna su Connectif.

Ricorda che, quando crei i tuoi template su Connectif, devi specificare i campi dinamici, che Spoki utilizzerà per personalizzare i messaggi.

**Nei template di Connectif troverai due tipi di campi:**

- Campi di registro (Registry Fields): forniti da Spoki.
- Campi dinamici (Dynamic Fields): personalizzati, devono essere in maiuscolo. Esempi:

CHECKOUT URL (URL del checkout).
- TOTAL AMOUNT (Quantità totale di articoli).

Quando crei il tuo template, è fondamentale indicare quali campi dinamici avrà, che saranno quelli che Connectif passerà con le informazioni personalizzate per l’utente.

## PASSO 1. Creazione dell’automazione in Spoki

In Spoki, vai alla sezione “Automazioni”, fai clic su “Nuovo” e poi seleziona il trigger scegliendo “Integrazioni” e seleziona Connectif.

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-09-17-alle-17.30.35-1024x507.png)
Salva l’URL che verrà visualizzato; quella sarà l’URL del WebHook che utilizzerai successivamente in Connectif.

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-09-17-alle-17.34.46-1024x675.png)
## **PASSO 2. Creazione dell’integrazione in Connectif**

Accedi alla sezione Configurazione del negozio dal menu laterale sinistro. Poi, nella colonna a sinistra vai su **Integrazioni > Integrazioni personalizzate (webhook)** e fai clic su **Crea nuova integrazione**.

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-09-17-alle-17.38.42-1024x454.png)
Una volta cliccato su “Crea nuova integrazione”, imposta il campo “Nome dell’integrazione” per darle un’identificazione unica. Questo ti aiuterà a riconoscerla facilmente in seguito.

Facoltativamente, puoi personalizzare l’integrazione, scegliendo un colore che ti aiuti a distinguerla visivamente, aggiungere una descrizione per dettagliare il suo scopo o categorizzarla per una migliore organizzazione. Clicca su “Aggiorna” per salvare tutte le modifiche effettuate.

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-09-17-alle-17.40.33-1024x454.png)
## PASSO 3. Creazione dell’evento di invio

In questa sezione, configurerai i campi che verranno condivisi con WhatsApp per l’invio dei messaggi. Prima, vai alla scheda **Invia dati** e fai clic su **Crea nuovo evento di invio**.

All’interno di questa schermata, assegna un nome all’evento per poterlo identificare facilmente. Poi, nel campo **Webhook URL dove inviare il messaggio**, aggiungi l’URL dell’endpoint che hai ottenuto precedentemente in Spoki (passo 1). Questo consentirà l’invio corretto dei dati tramite l’integrazione.

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-09-17-alle-17.44.23-1024x450.png)
- Creazione della struttura del messaggio in Connectif
- In questa sezione, configurerai le proprietà del messaggio che verrà inviato, basandoti sul template di Spoki. Di seguito è riportato un esempio pratico su come creare questa struttura del messaggio.
- Per inviare le informazioni a Spoki, è necessario replicare la struttura del JSON del template. Seguendo l’esempio del template “Contact Data”, il file JSON che dovrai replicare è il seguente:

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-09-17-alle-17.47.39-1024x154.png)
Fai clic su **Aggiungi nuovo campo**.

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-09-17-alle-17.48.43-1024x453.png)
- Seleziona il tipo di campo (testo, email, ecc.).
- Aggiungi un nome e un ID.
- Spunta, nei campi necessari, la casella Attiva opzioni JSONÈ necessario attivare le opzioni JSON quando è necessario inviare valori di oggetti nidificati nel JSON, ossia quando è necessario simulare una struttura complessa con oggetti nidificati o array.
- Copia il percorso e incollalo in Connectif.
- Modifica il percorso, sostituendo il (x.) iniziale e i (.) con barre inverse.

Ad esempio, se il percorso del JSON è **x.custom_fields.TOTAL_AMOUNT**, dovrai cambiarlo in **/custom_fields./TOTAL_AMOUNT**.

- Assegna un nome e un ID al campo.

**PRO TIP:** assegna lo stesso nome al campo in Connectif che la route del JSON, così sarà più facile trovarlo.

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-09-18-alle-16.45.00-1024x450.png)
- Ripeti questo passaggio per tutte le proprietà che verranno trasmesse, finché non avrai replicato il template.
- Fai clic su Salva per registrare tutti i campi.

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-09-18-alle-16.46.36-1024x453.png)
## **PASSO 4. Creazione del workflow per automatizzare l’invio dei messaggi WhatsApp**

(In questa sezione spieghiamo come inviare i dati da Connectif tramite un workflow).

Vai su **Workflows** e fai clic su **Crea nuovo workflow**.

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-09-18-alle-16.51.01-1024x461.png)
- Seleziona un nuovo workflow vuoto.
- Nel nodo Inizio, seleziona Tutti i contatti della mia lista.
- Aggiungi il nodo trigger Al abbandonare il carrello in modo che il workflow si attivi nel momento in cui un visitatore del tuo sito aggiunga dei prodotti al carrello e non completi l’acquisto.

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-09-18-alle-16.52.32-1024x450.png)
- Modifica il nodo, per rimuovere le limitazioni, e fai clic su Aggiorna.

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-09-18-alle-16.53.40-1024x452.png)
Cerca il **nodo di tipo azione che hai creato durante l’integrazione con Spoki** (passo 3) e aggiungilo al tuo workflow.

Quando il contatto abbandona il carrello, vogliamo informare Spoki dell’evento.

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-09-18-alle-16.56.09-1024x451.png)
Configura il nodo assegnando le variabili ai rispettivi valori:

- Le variabili del contatto (nome, cognome, telefono e email) provengono dalle informazioni del contatto.
- Le informazioni sulla proprietà del carrello (TOTAL AMOUNT) vengono dal nodo Al abbandonare il carrello.
- L’URL del checkout è impostato manualmente tramite un valore di tipo Letterale.

![](https://support.spoki.com/wp-content/uploads/2022/12/Screenshot-2025-09-18-alle-16.57.26-1024x444.png)
Fai clic su **Aggiorna** per salvare la configurazione del nodo e salva il tuo workflow.Nel workflow, fai clic su **Salva** per salvare le modifiche e su **Avvia** per attivarlo.

**L’integrazione del tuo account Connectif con Spoki è pronta.**