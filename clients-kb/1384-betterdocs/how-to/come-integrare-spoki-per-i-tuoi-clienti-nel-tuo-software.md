---
title: Come integrare Spoki per i tuoi clienti nel tuo software
slug: come-integrare-spoki-per-i-tuoi-clienti-nel-tuo-software
author: Emanuela Locorotondo
date: 2022-11-10
modified: 2023-01-23
word_count: 410
categories: How to
url: https://support.spoki.com/docs/how-to/come-integrare-spoki-per-i-tuoi-clienti-nel-tuo-software/
---

# Come integrare Spoki per i tuoi clienti nel tuo software

**1. Crea template e automazione Principale**

- Per iniziare accedi al tuo account Principale su Spoki e crea un’automazione padre che ha come step l’invio di un template

**2. Crea automazione e template nello Spoki del cliente** (o secondario)

- Completa la procedura di attivazione piattaforma Spoki per il cliente
- Vedrai il nuovo account nella “Panoramica Cliente” del tuo Spoki
- Clona l’automazione padre nell’account
- Questa operazione manderà in automatico in approvazione a WhatsApp il template per il cliente
- Crea uno step di avvio API per l’automazione appena creata
- Per questo step di avvio sarà generata una Secret => copiala e associala all’utente sul tuo DB

**3. Implementa API sull’Account Principale per controllare se l’utente può inviare i messaggi**

- Richiedi all’assistenza Spoki ID Agenzia ed External_API Key relative al tuo account Principale:
- sull’account Principale implementa l’API Retrieve agency che ti ritornerà tutti i tuoi clients con varie informazioni tra cui estimated_available_conversations
- invidua il cliente tramite l’ID del suo account (che trovi anche nella Panoramica Clienti Spoki)
- estimated_available_conversations indica quante nuove persone puoi contattare con lo step successivo

**4. Implementa l’API di avvio automazione in Mooving**

- a questo punto sei pronto per implementare l’API che ti permette di inviare il messaggio per conto del tuo cliente in modo che invii dal suo numero e utilizzi il suo credito
- sull’account Principale implementa l’API Start Automation for many contacts: qui puoi avviare facilmente l’automazione per uno o più destinatari, di seguito un esempio template / API :

**Template**: Ciao %%FIRST_NAME%%, il tuo abbonamento scadrà il %%DATA_SCADENZA_ABBONAMENTO%%. Rinnovalo subito!

**Api**:{  “secret”: “{{secret}}”,  “contacts”: [    {      “phone”: “+393331234567”,      “first_name”: “Mario”,      “last_name”: “Rossi”,      “email”: “[mario.rossi@domain.com](mailto:mario.rossi@domain.com)“,      “custom_fields”: {        “DATA_SCADENZA_ABBONAMENTO”: “2022-11-10T18:00:00.000Z”      }    },    {      “phone”: “+39333123461234”,      “first_name”: “Giovanni”,      “last_name”: “Bianchi”,      “email”: “[giovanni.bianchi@domain.com](mailto:giovanni.bianchi@domain.com)“,      “custom_fields”: {        “DATA_SCADENZA_ABBONAMENTO”: “2022-11-10T18:00:00.000Z”      }    }  ]}

- l’invio dei messaggi è asincrono, quindi il sistema ti restituirà 200 OK se li ha presi in carico, l’invio verrà effettuato da Spoki asincronamente

## Articoli correlati

[Come avviare un’automazione con API](https://support.spoki.com/docs/integrazioni/integrare-spoki-con-qualsiasi-gestionale-attraverso-api/)

[Regole per evitare il ban da WhatsApp](https://support.spoki.com/docs/regole-whatsapp/regole-per-evitare-il-ban-da-whatsapp/)