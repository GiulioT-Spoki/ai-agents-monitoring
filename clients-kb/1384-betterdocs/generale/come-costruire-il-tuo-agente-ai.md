---
title: Come costruire il tuo agente AI
slug: come-costruire-il-tuo-agente-ai
author: Enrico Petrelli
date: 2025-11-03
modified: 2026-05-27
word_count: 1442
categories: 
url: https://support.spoki.com/docs/uncategorized/come-costruire-il-tuo-agente-ai/
---

# Come costruire il tuo agente AI

## **Introduzione a AI Agent Builder: Crea il tuo assistente AI personalizzato**

Trasforma le interazioni con i clienti grazie al nostro nuovo e potente **AI Agent Builder**.Sebbene gli agenti AI facciano già parte della piattaforma, ora hai il controllo completo per creare assistenti AI personalizzati in base alle esigenze specifiche del tuo business.

## **Cosa sono gli Agenti AI**

Gli **Agenti AI** sono assistenti virtuali intelligenti in grado di gestire richieste dei clienti, supportare i processi di vendita e svolgere attività automatizzate secondo le tue necessità aziendali.Con la piattaforma migliorata, puoi ora creare agenti che comprendono davvero la tua attività, personalizzandone comportamento, conoscenze e capacità operative.

## **Come iniziare con AI Agent Builder**

### **Accesso alla Dashboard AI Agent**

Nella barra laterale sinistra della dashboard Spoki, accedi alla sezione **AI**.Troverai tre schede principali:

- Agent – Gestisci e crea i tuoi agenti AI
- Knowledge Base – Archivia le informazioni a disposizione degli agenti
- Integrations and Tools – Collega servizi esterni

Nella scheda **Agent**, troverai la dashboard di gestione dove potrai:

- Visualizzare tutti gli agenti creati in un elenco organizzato
- Monitorare lo stato degli agenti (Attivo / Inattivo / Bozza)
- Tracciare data di creazione e ultima modifica
- Identificare il tipo di agente (Custom Agent, Customer Agent, Sales Agent)
- Attivare o disattivare gli agenti tramite un semplice interruttore

## **Creare il tuo primo Agente AI**

### **Step 1: Scegli il tipo di agente**

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.33.46-1024x502.png)
La piattaforma offre tre tipi di agenti per rispondere a diverse esigenze aziendali:

#### **Sales Agent**

- Ottimizza i processi di vendita grazie all’AI
- Garantisce accuratezza delle informazioni dalla knowledge base
- Richiede integrazione con Shopify o PrestaShop
- Ideale per: e-commerce che desiderano automatizzare raccomandazioni di prodotti e richieste commerciali

#### **Customer Agent**

- Migliora il supporto clienti con risposte intelligenti
- Risponde solo quando la documentazione è disponibile
- Estrae le informazioni più pertinenti dalla knowledge base
- Ideale per: team di supporto che gestiscono grandi volumi di ticket

#### **Custom Agent**

- Massima libertà di configurazione
- Controllo completo su comportamento, conoscenze e strumenti
- Ideale per: aziende con esigenze specifiche o casi d’uso avanzati

In questa guida ci concentreremo sull’opzione **Custom Agent**, che offre la massima flessibilità.

### **Step 2: Assegna un nome al tuo agente**

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.34.59.png)
Clicca sul pulsante verde **“+ New Agent”** in alto a destra.Apparirà una finestra in cui potrai inserire il nome del tuo agente.Scegli un nome descrittivo che rifletta la sua funzione, ad esempio *Assistente Supporto Prodotti* o *Agente Elaborazione Ordini*.

Clicca su **Continue** per proseguire alla selezione del tipo di agente.

### **Step 3: Configura il tuo agente personalizzato**

Dopo aver selezionato **Custom Agent**, accederai all’interfaccia di configurazione, composta da diverse sezioni chiave:

## **Configurazione del System Prompt**

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.11.35.png)
Il *System Prompt* rappresenta la base della personalità e del comportamento del tuo agente AI.In questo campo di testo puoi definire:

- Il ruolo e lo scopo dell’agente
- Lo stile e il tono di comunicazione
- Le istruzioni specifiche per la gestione delle richieste
- Le limitazioni e i confini operativi
- Le linee guida per le risposte

Puoi scrivere manualmente il prompt oppure cliccare su **“Generate with AI”** per creare un punto di partenza in base allo scopo dell’agente.

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.11.47.png)
#### **Aggiunta di variabili e strumenti**

Sotto il prompt di sistema troverai le opzioni per:

- Add Variable – Inserisci segnaposto dinamici che possono essere popolati con dati specifici dell’utente
- Add Tool – Collega funzioni esterne che l’agente può utilizzare

#### **Regolazione delle impostazioni di temperatura**

Il cursore **Temperature** controlla il livello di creatività delle risposte dell’agente:

- Temperatura bassa (Deterministica) – Risposte più mirate, coerenti e prevedibili
- Temperatura media (Creativa) – Equilibrio tra coerenza e varietà
- Temperatura alta (Molto creativa) – Risposte più varie, originali e con maggiore casualità

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.11.59.png)
**Preset rapidi disponibili:**

- Deterministic – consigliato per agenti di supporto che richiedono precisione
- Creative – impostazione bilanciata predefinita
- More Creative – per agenti che necessitano risposte più coinvolgenti

**Suggerimento:** per agenti di assistenza clienti o transazionali mantieni una temperatura bassa; per agenti creativi o marketing, aumenta il valore per ottenere risposte più espressive.

## **Costruire la Knowledge Base dell’agente**

La sezione **Agent’s Knowledge Base** consente di fornire informazioni specifiche di dominio, aiutando l’agente a rispondere con precisione.

### **Aggiungere documenti all’agente**

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.12.11.png)
Clicca su **Add Document** nella sezione della knowledge base dell’agente.Si aprirà la tua libreria di documenti, dove potrai:

- Esplorare le risorse informative già caricate
- Selezionare documenti esistenti da assegnare all’agente
- Creare e caricare nuove fonti di conoscenza

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.12.48.png)
Spunta i documenti che vuoi rendere accessibili all’agente o aggiungine di nuovi direttamente da questa interfaccia.L’agente userà queste informazioni per fornire risposte accurate e contestuali basate sui dati aziendali.

## Configurazione degli strumenti e delle integrazioni

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.13.05.png)
La sezione **Agent’s Tools** consente all’agente di eseguire azioni specifiche oltre a rispondere alle domande.Clicca su **Add Integrations & Tools** per:

- Visualizzare gli strumenti e le integrazioni disponibili
- Selezionare le capacità da assegnare all’agente
- Creare nuovi strumenti personalizzati e webhook
- Collegare piattaforme e-commerce come Shopify o PrestaShop

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.13.41.png)
In questo modo il tuo agente si trasforma da semplice chatbot a potente strumento di automazione in grado di controllare inventari, elaborare ordini, aggiornare ticket e molto altro.

## **Impostazione della Risposta Predefinita**y

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.13.55.png)
L’interruttore **Default Reply** consente di configurare un messaggio di fallback nel caso in cui l’agente non sia in grado di rispondere a una domanda.Puoi personalizzare il messaggio affinché l’utente riceva sempre una risposta professionale, anche quando l’agente raggiunge i propri limiti di conoscenza.

**Best practice:** includi nel messaggio istruzioni su come contattare un operatore umano.

## **Testare il tuo agente con il Playground**

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.19.02-1024x557.png)
Prima di mettere in produzione il tuo agente, utilizza il pulsante **Playground** (in alto a destra) per testarne il comportamento.Il Playground apre una finestra di chat dove puoi:

- Inviare messaggi di prova
- Valutare la qualità e l’accuratezza delle risposte
- Verificare il corretto funzionamento delle integrazioni
- Perfezionare il System Prompt
- Testare scenari complessi e casi limite

Questo ambiente di test ti permette di ottimizzare l’agente prima che interagisca con i clienti reali.

## **Gestione della Knowledge Base**

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.19.50-1024x557.png)
Nella scheda **Knowledge Base** puoi accedere al repository centralizzato di informazioni che alimenta tutti gli agenti AI.

### **Panoramica della Knowledge Base**

La dashboard mostra:

- Tutte le risorse di conoscenza caricate o create
- Gli agenti che utilizzano ciascun documento
- I tipi e i formati dei documenti
- Le date di creazione e modifica
- Azioni rapide per modificare o eliminare file

Questa gestione centralizzata consente di mantenere informazioni coerenti su più agenti.

### **Creazione di nuove risorse di conoscenza**

Clicca su **Add Document** per aggiungere una nuova fonte.Puoi scegliere tra tre modalità di inserimento:

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.20.14-1024x543.png)
#### **Website Scraping**

Ideale per estrarre informazioni direttamente dal tuo sito o dalla documentazione:

- Inserisci l’URL del sito da analizzare
- Il sistema elencherà le pagine disponibili
- Seleziona quelle da includere
- L’agente estrarrà e processerà i contenuti selezionati

**Casi d’uso:** documentazione prodotti, help center, blog, pagine informative

#### **Manual Input**

Inserimento diretto di testo:

- Scrivi o incolla il contenuto nella casella di testo
- Organizza le informazioni in modo chiaro
- Salva e assegna ai relativi agenti

**Casi d’uso:** FAQ, procedure interne, politiche aziendali, linee guida

#### **File Upload**

Supporta vari formati:

- PDF – manuali, guide, report
- Immagini – foto prodotti, diagrammi, infografiche (con OCR)
- CSV – cataloghi, listini prezzi, dati inventariali

Il sistema renderà i file ricercabili e accessibili agli agenti.

### **Importante: Assegnare la conoscenza agli agenti**

Nota fondamentale: le nuove risorse non vengono assegnate automaticamente.Devi collegarle manualmente a ciascun agente:

- Durante la creazione, nella sezione Agent’s Knowledge Base
- Oppure modificando un agente esistente

Questo ti garantisce controllo preciso su quali informazioni ogni agente può utilizzare, permettendo di creare agenti con competenze mirate.

## **Integrazioni e strumenti: estendere le capacità degli agenti**

Nella scheda **Integrations and Tools**, gli agenti acquisiscono la capacità di agire.Qui puoi visualizzare tutti gli strumenti disponibili, i loro tipi (Webhook, Integration, MCP) e crearne di nuovi.

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.21.20-1024x559.png)
### **Creazione di nuovi strumenti**

Clicca su **New Tool** per aggiungere nuove funzionalità agli agenti.

Potrai scegliere tra tre tipi di strumenti:

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.21.29-1024x541.png)
### **1. Integration Tools**

Connessioni predefinite a piattaforme e-commerce per:

- Verificare disponibilità e prezzi dei prodotti
- Elaborare ordini e rimborsi
- Aggiornare informazioni dei clienti
- Tracciare spedizioni e gestire inventari

**Integrazioni disponibili:**

- Shopify Integration
- PrestaShop Integration

Altre piattaforme saranno presto disponibili!

### **2. Webhook Tools**

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.23.23-781x1024.png)
![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.23.31.png)

Crea webhook personalizzati per connettere gli agenti a sistemi esterni:

- Attivare azioni nel CRM
- Inviare notifiche ai canali interni
- Aggiornare database esterni
- Collegarsi a sistemi proprietari

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.23.56.png)
I webhook offrono flessibilità illimitata per adattare gli agenti alla tua infrastruttura tecnologica.

#### **3. MCP (Model Context Protocol) Tools**

Protocollo avanzato che consente agli agenti di eseguire funzioni personalizzate e accedere a fonti dati complesse.Perfetto per integrazioni sofisticate e processi aziendali articolati.

![](https://support.spoki.com/wp-content/uploads/2024/04/Screenshot-2025-10-17-at-14.24.57-658x1024.png)

### **Note importanti**

- I messaggi automatici termineranno con la dicitura “Written by AI”
- Le chat in cui l’AI risponde rimarranno non lette per consentire la revisione
- Se un operatore interviene manualmente, l’AI non risponderà fino a quando non verrà riattivata