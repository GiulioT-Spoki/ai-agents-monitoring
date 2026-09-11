---
title: Deals – User Guide
slug: deals-user-guide
author: Daniele Intermite
date: 2025-12-23
modified: 2025-12-23
word_count: 867
categories: Piattaforma
url: https://support.spoki.com/docs/piattaforma/deals-user-guide/
---

# Deals – User Guide

**Gestione delle opportunità di vendita e pipeline commerciali**

## Panoramica

La funzionalità **Deals** consente di gestire le opportunità di vendita e monitorarne l’avanzamento all’interno di **pipeline personalizzabili**.Ogni deal rappresenta una trattativa commerciale associata a uno o più contatti e consente di tracciare valore, stato e data di chiusura.

Deals fornisce una visione completa del funnel di vendita, aiutando i team a organizzare le attività commerciali e a chiudere le trattative in modo più efficiente.

## Accesso a Deals

Per accedere alla funzionalità:

1. Apri la sezione Deals dal menu principale
1. Al primo accesso, ti verrà richiesto di creare una pipeline

La creazione di almeno una pipeline è necessaria per poter iniziare a lavorare con i deal.

## Pipeline di vendita

### Cos’è una pipeline

Una **pipeline** è una rappresentazione visiva del processo di vendita.È composta da più **stages**, che indicano le diverse fasi del percorso commerciale, dal primo contatto alla chiusura del deal.

### Creare una pipeline

Per creare una pipeline:

1. Clicca su Create Pipeline
1. Inserisci un nome descrittivo (es. Sales Pipeline, Customer Onboarding)
1. Configura gli stage
1. Salva la pipeline

### Gestione delle pipeline

Le pipeline possono essere gestite dall’icona ⚙️ **Settings** nella sezione Deals.

È possibile:

- Creare nuove pipeline (massimo 10)
- Rinominare pipeline esistenti
- Cambiare l’ordine delle pipeline
- Eliminare pipeline vuote (senza deal)

## Stages della pipeline

### Struttura degli stage

Ogni pipeline contiene più **stages**, che rappresentano lo stato di avanzamento dei deal.

Alla creazione di una pipeline sono presenti:

- Uno stage iniziale configurabile
- Uno stage Won con probabilità 100%
- Uno stage Lost con probabilità 0%

Gli stage **Won** e **Lost** sono fissi e non possono essere eliminati.

### Configurazione degli stage

Per ogni stage puoi definire:

- Nome
- Probabilità di chiusura (0–100%)

Gli stage possono essere:

- Riordinati tramite drag & drop
- Eliminati solo se non contengono deal

## Deal

### Cos’è un deal

Un **deal** rappresenta un’opportunità di vendita associata a uno o più contatti.Ogni deal contiene informazioni come valore economico, owner, pipeline, stage e data di chiusura.

### Creare un deal

Per creare un nuovo deal:

1. Clicca su Create Deal
1. Compila i campi richiesti

**Campi obbligatori**

- Contatti
- Titolo
- Pipeline
- Stage
- Owner

**Campi opzionali**

- Importo
- Valuta
- Data di chiusura
- Reference

## Campi del deal

### Contatti

È possibile associare uno o più contatti a un deal.Quando selezioni un contatto, il titolo del deal viene compilato automaticamente con il nome del contatto (modificabile).

### Importo

Indica il valore atteso del deal.L’importo viene mostrato nelle viste e utilizzato per statistiche e report.

### Data di chiusura

La data di chiusura indica quando si prevede di concludere il deal.Quando un deal viene spostato in **Won** o **Lost**, la data viene impostata automaticamente se non presente.

### Reference

Campo opzionale utile per:

- Integrazioni con sistemi esterni
- Automazioni
- Identificazione rapida del deal

## Viste disponibili

### Tipologie di vista

Puoi visualizzare i deal in due modalità:

- List View
- Pipeline View

### List View

Mostra i deal in formato tabellare e consente di:

- Visualizzare tutti i campi principali
- Ordinare per nome, stage, date e importo
- Selezionare più deal per eliminazione multipla

### Pipeline View

Mostra i deal come card organizzate per stage.Ogni card include titolo, owner, importo, date e contatti associati.

I deal possono essere spostati tra gli stage tramite **drag & drop**.Le modifiche vengono salvate automaticamente.

## Filtri e ricerca

Nella parte superiore della pagina sono disponibili filtri per:

- Nome del deal
- Pipeline
- Owner
- Data di creazione
- Data di chiusura prevista

I filtri permettono di individuare rapidamente i deal rilevanti.

## Modifica dei deal

### Pagina di dettaglio

Cliccando su un deal si apre la pagina di dettaglio.

**Pannello sinistro**

- Elenco dei contatti associati
- Modulo di modifica dei campi del deal

**Pannello destro**

- Chat WhatsApp con il contatto selezionato

Tutti i campi del deal possono essere modificati direttamente da questa pagina.

### Azioni rapide

Dalla pagina di dettaglio è possibile:

- Clonare il deal
- Eliminare il deal

## Eliminazione dei deal

### Eliminazione singola

1. Apri il deal
1. Clicca sull’icona Delete
1. Conferma

### Eliminazione multipla

Disponibile solo in **List View**, tramite selezione di più deal.

⚠️ I deal eliminati non possono essere recuperati.

## Statistiche della pipeline

Nella **Pipeline View**, ogni stage mostra:

- Numero totale di deal
- Valore complessivo dei deal presenti nello stage

## Deals e contatti

Dalla pagina di dettaglio di un contatto puoi:

- Visualizzare i deal aperti e chiusi
- Creare un nuovo deal già associato al contatto

## Automazioni

### Trigger disponibili

Le automazioni possono essere attivate da:

- Creazione di un deal
- Aggiornamento di un deal
- Cambio di stage
- Aggiunta o rimozione di contatti

### Azioni disponibili

- Creazione di un deal
- Aggiornamento di un deal

### Campi dinamici

I trigger mettono a disposizione campi dinamici relativi a deal, contatti, pipeline, stage, importo e date.

## Integrazione Meta Conversion API

### Panoramica

Abilitando **Meta Conversion API**, i deal inviano automaticamente eventi al Meta Pixel collegato.Questo consente di tracciare le performance di vendita in **Meta Ads Manager**.

### Eventi supportati

- Lead – contatto associato a un deal
- ViewContent – aggiornamenti o attività sul deal
- Purchase – deal spostato in uno stage con probabilità 100% (Won)

Se un deal viene spostato in **Lost**, viene inviato un evento *ViewContent*.

## Best practice

- Usa nomi di stage chiari e coerenti
- Aggiorna regolarmente lo stato dei deal
- Compila sempre importo e contatti
- Usa correttamente Won e Lost
- Abilita Meta Conversion API per il tracciamento

## Permessi utente

L’accesso a Deals dipende dal ruolo:

- Chat Operator: nessun accesso
- Administrator: accesso completo
- Account Owner: accesso completo