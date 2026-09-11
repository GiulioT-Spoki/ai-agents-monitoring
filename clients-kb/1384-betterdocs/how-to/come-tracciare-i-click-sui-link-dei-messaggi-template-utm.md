---
title: Come tracciare i click sui link dei messaggi Template: UTM
slug: come-tracciare-i-click-sui-link-dei-messaggi-template-utm
author: Antonella Mingolla
date: 2024-07-10
modified: 2026-02-17
word_count: 684
categories: How to
url: https://support.spoki.com/docs/how-to/come-tracciare-i-click-sui-link-dei-messaggi-template-utm/
---

# Come tracciare i click sui link dei messaggi Template: UTM

## Cosa sono i parametri UTM

I parametri UTM sono strumenti indispensabili per chiunque desideri misurare l’efficacia delle proprie campagne di marketing digitale. Integrandoli nei tuoi URL, puoi ottenere dati preziosi che ti permetteranno di ottimizzare le tue strategie.

I parametri UTM (Urchin Tracking Module) sono parametri aggiunti alla query string di un URL per tracciare la provenienza del traffico nelle piattaforme di analytics, come Google Analytics.

### Parametri UTM principali

**utm_source**Identifica la sorgente del traffico, cioè da dove arriva il visitatore.Esempi:

- google
- facebook
- newsletter
- instagram
- linkedin

**utm_medium**Identifica il mezzo o canale attraverso cui è arrivato il traffico, cioè come arriva il visitatore.Esempi:

- cpc (cost per click)
- email
- social
- organic
- referral
- banner

**utm_campaign**Identifica la campagna specifica che ha generato il traffico, cioè quale iniziativa ha portato il visitatore.Esempi:

- promo_estate_2026
- lancio_prodotto
- black_friday
- onboarding_flow

### Altri parametri UTM (opzionali)

**utm_term**Parola chiave utilizzata (tipico nelle campagne search/PPC).

**utm_content**Permette di differenziare varianti dello stesso annuncio (utile per A/B test).

## Esempio pratico

`https://www.esempio.com/registrati?utm_source=facebook&utm_medium=cpc&utm_campaign=promo_estate_2026
`
Questo URL indica che il visitatore è arrivato:

- da Facebook (source)
- tramite un annuncio a pagamento (CPC) (medium)
- nell’ambito della campagna promo_estate_2026 (campaign)

L’utilizzo corretto degli UTM permette di capire quali canali e campagne generano più conversioni, così da ottimizzare il budget marketing in modo strategico.

## Come creare un UTM su Spoki

Per creare un UTM su Spoki è necessario creare un Template con bottone in formato Link.

### Procedura:

1. Vai su Template
1. Clicca su Crea nuovo
1. In basso aggiungi un bottone di tipo Link

Il link può essere configurato in due modalità:

### Link statico

![](https://support.spoki.com/wp-content/uploads/2024/07/Screenshot-2025-08-25-alle-17.05.47.png)
URL che punta a una pagina web specifica e il cui contenuto non cambia in base a parametri o variabili.

### Link dinamico

![](https://support.spoki.com/wp-content/uploads/2024/07/Screenshot-2025-08-25-alle-17.06.57.png)
URL composto da un dominio fisso e un campo dinamico che sarà concatenato alla fine dell’URL.

In questo caso Spoki aggiungerà automaticamente il parametro:

`utm_source=spoki
`
al momento dell’invio.

## Passaggio di più parametri tramite campo dinamico

Quando si utilizza un link dinamico nei template WhatsApp, è possibile passare **più parametri contemporaneamente** tramite il campo dinamico.Il campo dinamico viene concatenato alla fine dell’URL e può contenere un’intera stringa di parametri, permettendo di includere variabili del contatto e più UTM all’interno dello stesso link.Questo approccio rappresenta un **workaround tecnico**: Meta non consente l’utilizzo di parametri multipli nei template WhatsApp. Utilizzando il campo dinamico di Spoki, invece, è possibile aggirare questa limitazione e mantenere un tracciamento avanzato e completo.

## Come configurare il passaggio di più parametri su Spoki

Per passare più parametri tramite campo dinamico è necessario configurare **2 step all’interno dell’automazione**.

### STEP 1 — Popola campo contatto

![](https://support.spoki.com/wp-content/uploads/2024/07/Screenshot-2026-02-17-alle-16.33.02.png)
Il primo passaggio consiste nell’utilizzare l’azione automatica:

**Popola campo contatto**

All’interno della configurazione:

- Nel campo Valore da inserire seleziona Campo dinamico
- Nel campo testo inserisci la stringa dei parametri

Esempio:

`?firstname=%%FIRST_NAME%%&lastname=%%LAST_NAME%%
`
⚠️ I campi sono personalizzabili e possono essere modificati o ampliati in base alle esigenze.È possibile aggiungere più parametri concatenandoli con il simbolo `&`.

Il **campo dinamico** che scegli di popolare sarà quello che conterrà tutti i parametri e che verrà poi richiamato nel template.

### STEP 2 — Creazione del template con pulsante Link dinamico

![](https://support.spoki.com/wp-content/uploads/2024/07/Screenshot-2026-02-17-alle-16.33.37.png)
Il secondo passaggio consiste nel creare (o modificare) un **Template con pulsante di tipo Link dinamico**.

Durante la configurazione:

1. Inserisci l’URL del tuo sito come dominio base.👉 È fondamentale inserire la barra finale “/”. Esempio: https://www.tuosito.com/
1. Seleziona come Campo dinamico lo stesso campo che hai popolato nello STEP 1.

In questo modo Spoki costruirà automaticamente il link concatenando:

`Dominio base + campo dinamico
`
Esempio risultato finale:

`https://www.tuosito.com/?firstname=Mario&lastname=Rossi&utm_source=spoki`

## Vantaggi dell’utilizzo dei parametri UTM

L’utilizzo dei parametri UTM consente di:

- Ottenere una misurazione precisa, con dati accurati su come e dove gli utenti trovano il tuo contenuto.
- Migliorare l’ottimizzazione delle campagne, identificando quelle più efficaci e concentrando le risorse sulle strategie vincenti.
- Effettuare un’analisi dettagliata del comportamento degli utenti, confrontando le performance tra diverse fonti e canali.