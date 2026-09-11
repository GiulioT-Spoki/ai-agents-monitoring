---
title: Step &#8220;Trasforma campo contatto&#8221;: quando e come usarlo
slug: step-trasforma-campo-contatto-quando-e-come-usarlo
author: Daniele Intermite
date: 2026-01-08
modified: 2026-01-08
word_count: 681
categories: How to
url: https://support.spoki.com/docs/how-to/step-trasforma-campo-contatto-quando-e-come-usarlo/
---

# Step &#8220;Trasforma campo contatto&#8221;: quando e come usarlo

La funzione **Trasforma campo contatto** permette di prendere un valore da un campo personalizzato e salvarlo in un altro campo, **modificandone il formato o la struttura**.

È utile quando i dati arrivano in un formato non utilizzabile direttamente (date come testo, JSON da webhook, array, ecc.) e devono essere preparati per messaggi, automazioni o template.

## Quando usare questa funzione

Usa **Trasforma campo contatto** se devi:

- Convertire una data scritta come testo in una vera data
- Formattare una data per mostrarla in un messaggio
- Unire più valori in un unico campo
- Estrarre informazioni da dati JSON ricevuti da webhook o integrazioni
- Generare testi dinamici a partire da dati strutturati

## Come configurare lo step

### 1. Seleziona il campo di origine

Scegli il **campo personalizzato** che contiene il dato da trasformare.

Nota:Sono disponibili solo i campi personalizzati. I campi standard (Nome, Email, Telefono, ecc.) non possono essere usati.

### 2. Seleziona il tipo di trasformazione

In base al tipo di campo selezionato, il sistema mostra le trasformazioni possibili.

Esempi:

- Testo → Data
- Data → Testo
- JSON → JSON
- JSON → Testo

Il sistema seleziona automaticamente l’opzione più probabile in base al nome del campo (ad esempio campi che contengono “date” o “time”).

### 3. Configura la trasformazione

In questa fase definisci:

- il formato della data
- il formato del testo in uscita
- la mappatura JSON
- il template di testo

Le opzioni cambiano in base al tipo di trasformazione scelto.

### 4. Seleziona il campo di destinazione

Scegli il campo in cui salvare il risultato della trasformazione.

Nota:Il sistema mostra solo i campi compatibili con la trasformazione scelta (ad esempio una data può essere salvata solo in un campo Data).

## Tipi di trasformazione principali

### Testo → Data

Usalo quando ricevi una data come testo (es. `2024-12-31`) e vuoi usarla come data reale.

Puoi:

- scegliere il formato corretto
- oppure usare il rilevamento automatico se il formato non è certo

Consigliato per dati provenienti da integrazioni esterne.

### Testo → Data e ora

Simile al caso precedente, ma per testi che includono anche l’orario.

Esempio:`2024-12-31 14:30`

### Data → Testo

Usalo quando vuoi mostrare una data in un messaggio o in un template.

Esempio di output:`31/12/2024`

In questo caso devi sempre scegliere il formato di uscita.

### Data e ora → Testo

Utile per visualizzare data e ora in un formato leggibile per l’utente.

### JSON → JSON

Serve per ristrutturare dati JSON complessi.

Puoi:

- estrarre solo alcune proprietà
- rinominare i campi
- semplificare oggetti o array
- combinare valori

### JSON → Testo

Usalo quando vuoi ottenere **un testo leggibile** partendo da dati JSON.

È ideale per:

- messaggi automatici
- conferme ordine
- riepiloghi per l’utente finale

## Come funziona la mappatura JSON

La mappatura utilizza riferimenti al JSON di input tramite la variabile `$input`.

### Accesso alle proprietà

Per leggere un valore:

`$input.nome_campo
`
Per accedere a proprietà annidate:

`$input.customer.personal.first_name
`

### Concatenazione di valori

Puoi unire più valori scrivendoli nella stessa stringa:

`$input.first_name $input.last_name
`

### Gestione di array

Se il JSON di input è un array, puoi usare un array con un solo elemento come template.Il sistema applicherà automaticamente la trasformazione a ogni elemento.

Questo è utile quando ricevi liste di prodotti, utenti o elementi simili.

### Proprietà con caratteri speciali

Se una proprietà contiene spazi o simboli, usa la notazione con parentesi quadre:

`$input['property-name']
$input['property with spaces']
`

### Conversione in testo con `.toString()`

Il metodo `.toString()` converte valori complessi in testo.

Comportamento:

- Array → valori separati da virgola
- Oggetti → stringa JSON
- Altri tipi → conversione standard in stringa

Esempio:

`$input.tags.toString()
`
Questo è utile quando devi salvare array o oggetti in campi di testo per usarli nei messaggi.

### Dati di esempio

Puoi inserire un JSON di esempio per:

- verificare la mappatura
- vedere l’output finale
- ricevere suggerimenti automatici durante la scrittura

È fortemente consigliato usarlo prima di attivare l’automazione.

## Buone pratiche

- Usa nomi chiari per i campi di input e output
- Testa sempre la trasformazione con dati di esempio
- Se una proprietà non esiste, il valore risultante sarà vuoto
- Per trasformazioni complesse, usa più step separati
- Documenta lo scopo dello step all’interno dell’automazione

## In sintesi

Lo step **Trasforma campo contatto** serve a rendere i dati:

- utilizzabili
- leggibili
- compatibili con messaggi e automazioni