---
title: Come inviare il contenuto di un messaggio ad un webhook esterno
slug: come-inviare-il-contenuto-di-un-messaggio-ad-un-webhook-esterno
author: Emanuela Locorotondo
date: 2023-12-15
modified: 2025-10-23
word_count: 144
categories: How to
url: https://support.spoki.com/docs/how-to/come-inviare-il-contenuto-di-un-messaggio-ad-un-webhook-esterno/
---

# Come inviare il contenuto di un messaggio ad un webhook esterno

Con Spoki è possibile tracciare i messaggi in risposta ad un messaggio inviato attraverso un’automazione.

Accedi alla sezione Automazioni, crea Nuova e cliccando sul + aggiungi il primo step di invio messaggio template.

Successivamente, aggiungi Risposta cliente e scegli il tempo massimo di attesa, in modo che nell’automazione venga tracciata la risposta del cliente.

Lo step successivo è quello del Popola campo Dinamico: questa funzionalità permette di salvare all’interno di un campo dinamico (creato ad hoc per salvare le risposte dei clienti – [Campo Dinamico](https://support.spoki.com/docs/piattaforma/campi-dinamici/)) la risposta dei contatti in seguito all’invio di un messaggio.

![](https://support.spoki.com/wp-content/uploads/2023/12/Screenshot-2025-10-23-alle-15.35.11-979x1024.png)
Infine, imposta lo step Invia Webhook indicando dove intendi riportare le informazioni del contatto e della risposta data, all’esterno di Spoki.

![](https://support.spoki.com/wp-content/uploads/2023/12/Screenshot-2025-10-23-alle-15.36.10-976x1024.png)
Attenzione! Spoki registrerà nel campo dinamico esclusivamente la prima risposta data dal cliente, per cui se volete tracciare eventuali messaggi multipli è necessario reiterare gli ultimi passaggi a partire da Risposta qualsiasi.