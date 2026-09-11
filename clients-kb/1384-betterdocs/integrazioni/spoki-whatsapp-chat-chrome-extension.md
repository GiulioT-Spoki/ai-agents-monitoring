---
title: Spoki WhatsApp Chat Chrome Extension
slug: spoki-whatsapp-chat-chrome-extension
author: Alessandro Santoro
date: 2024-08-19
modified: 2026-05-22
word_count: 557
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/spoki-whatsapp-chat-chrome-extension/
---

# Spoki WhatsApp Chat Chrome Extension

![](https://support.spoki.com/wp-content/uploads/2024/08/Screenshot-2024-08-20-at-17.38.26-2.png)
L’estensione Chrome **Spoki – WhatsApp, voice & more** ti permette di inviare messaggi, note vocali e altro ai tuoi contatti direttamente da qualsiasi pagina web. Rileva automaticamente numeri di telefono ed email sulle pagine che visiti e apre una chat Spoki con un solo clic: niente più copia/incolla tra schede.

Accedi una sola volta con il tuo account Spoki tramite OAuth sicuro: **nessuna API Key, nessuna Private Key, nessuna configurazione manuale**.

## Come iniziare

Per configurare l’estensione segui questi passaggi:

1. Installa l’estensione
1. Fissa l’icona alla barra degli strumenti
1. Collegati a Spoki
1. Scegli il tuo workspace
1. Visita una pagina con numeri o email
1. Abilita Spoki sul sito
1. Inizia a chattare

### 1. Installa l’estensione

- Apri la pagina Spoki – WhatsApp, voice & more sul Chrome Web Store.
- Clicca su Aggiungi a Chrome.
- Conferma cliccando su Aggiungi estensione.

### 2. Fissa l’icona alla barra degli strumenti

- Clicca sull’icona delle estensioni (puzzle) in alto a destra in Chrome.
- Trova Spoki – WhatsApp, voice & more e clicca sull’icona del pin per fissarla.
- L’icona Spoki rimarrà sempre visibile nella barra degli strumenti.

### 3. Collegati a Spoki

- Clicca sull’icona Spoki nella barra degli strumenti per aprire il popup.
- Premi Collegati con Spoki.
- Si aprirà una nuova scheda con la pagina di accesso sicuro tramite OAuth.
- Inserisci le credenziali del tuo account Spoki e autorizza l’estensione.

**Nota:** con la v2 non sono più necessarie l’API Key e la Private Key. L’autenticazione avviene interamente tramite OAuth, in modo sicuro e senza configurazioni manuali.

### 4. Scegli il tuo workspace

- Se appartieni a un solo account Spoki, l’estensione lo selezionerà automaticamente.
- Se appartieni a più account, scegli dalla lista quello che vuoi utilizzare.
- Potrai cambiare account in qualsiasi momento dal popup dell’estensione, tramite il pulsante Cambia account.

### 5. Visita una pagina con numeri o email

Apri qualsiasi pagina web (CRM, lista contatti, firma email, ecc.) che mostri numeri di telefono o indirizzi email. Spoki agisce solo sui siti che visiti: non scansiona la tua cronologia di navigazione.

### 6. Abilita Spoki sul sito

- Quando la pagina viene caricata, un piccolo toggle appare brevemente in basso a destra.
- Attivalo per abilitare Spoki su quel dominio.
- La tua scelta viene memorizzata per ogni sito: non dovrai riattivarlo ogni volta.

#### Limitare Spoki a domini specifici (opzionale)

Dalle impostazioni dell’estensione puoi limitare Spoki a specifici domini o percorsi inserendo gli URL separati da virgole. Lascia il campo vuoto per abilitare Spoki su tutti i siti (eccetto spoki.app e app.spoki.com, esclusi automaticamente).

**Regole di formattazione del pattern:**

- Inizia con http, https o *.
- Contiene il dominio con o senza maschere: example.com, *.example.com o *.
- Termina con un percorso specifico o *: /path oppure /*.
- L’host deve terminare con un delimitatore: /.

**Esempi validi:**

- https://example.com/
- https://www.example.com/
- http://example.com/
- *://example.com/
- https://*.example.com/
- https://example.com/path
- https://example.com/*
- *://example.com/*
- *://*.example.com/*
- *://*/*

**Esempi non validi:**

- http://example.com
- https://www.example.*/
- http*://example.com/
- example.com

### 7. Inizia a chattare

- Un’icona verde di WhatsApp appare accanto ad ogni numero di telefono o email rilevato sulla pagina.
- Clicca sull’icona per aprire una chat Spoki in un pannello laterale, direttamente all’interno della pagina.
- Se il contatto non esiste ancora nel tuo account Spoki, puoi crearlo al volo e iniziare la conversazione.

*Nota: la versione 1.x.x dell’estensione è stata deprecata. Se l’hai ancora installata, disinstallala e scarica la v2 dal Chrome Web Store al link indicato sopra.*