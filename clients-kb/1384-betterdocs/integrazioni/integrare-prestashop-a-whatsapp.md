---
title: Integrare PrestaShop con Spoki
slug: integrare-prestashop-a-whatsapp
author: Emanuela Locorotondo
date: 2023-05-23
modified: 2026-04-30
word_count: 731
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/integrare-prestashop-a-whatsapp/
---

# Integrare PrestaShop con Spoki

L’integrazione tra PrestaShop e Spoki consente di automatizzare l’invio di messaggi WhatsApp transazionali, come conferme d’ordine, aggiornamenti di spedizione, recupero carrelli abbandonati e notifiche al venditore. Inoltre, permette di attivare funzionalità avanzate con Spoki AI Sales Agent.

- Tempo di configurazione: ~10 minuti
- Livello: nessuna competenza tecnica richiesta
- Compatibilità: PrestaShop 1.4+

## Prerequisiti

Prima di iniziare assicurati di avere:

- Account Spoki attivo con canale WhatsApp configurato
- Accesso amministratore al tuo store PrestaShop
- Ultima versione del modulo Spoki

## 1. Abilitare l’integrazione su Spoki

1. Accedi a Spoki
1. Vai su Integrazioni
1. Seleziona PrestaShop
1. Attiva l’integrazione
1. Copia i valori generati:
- Delivery URL
- Secret Token

💡 **Nota**Delivery URL e Secret Token sono visibili solo dopo aver attivato l’integrazione. Se non li vedi, verifica che il toggle sia attivo.

## 2. Installare il modulo Spoki

### Metodo consigliato: Marketplace PrestaShop

1. Accedi al pannello admin di PrestaShop
1. Vai su Moduli > Catalogo Moduli
1. Cerca Spoki
1. Clicca su Installa
1. Dopo l’installazione, clicca su Configura

### Metodo alternativo: caricamento manuale

1. Scarica l’ultima versione del modulo Spoki
1. In PrestaShop vai su Moduli > Module Manager
1. Clicca su Carica un modulo
1. Carica il file .zip
1. Apri la configurazione del modulo

💡 **Nota**Se chiudi il popup di configurazione, cerca “Spoki” nel Module Manager e clicca su **Configura**.

⚠️ **Attenzione**Usa sempre l’ultima versione del modulo: le versioni precedenti non sono supportate.

## 3. Configurare il modulo

Nella pagina di configurazione del modulo Spoki, compila i campi richiesti.

### Campi obbligatori

- Live Mode → attiva l’integrazione
- Delivery URL → incolla il Delivery URL copiato da Spoki
- Secret → incolla il Secret Token copiato da Spoki

### Campi consigliati

- Enable Recovery Endpoints → attiva il recupero carrelli
- Show WhatsApp Field → aggiunge il campo WhatsApp in registrazione
- WhatsApp Field Required → rende obbligatorio il numero WhatsApp
- Seller Phone → numero WhatsApp per ricevere notifiche di vendita
- Review Link → link alla pagina recensioni
- Cart Recovery Link TTL → durata dei link di recupero carrello

Clicca su **Salva** per completare la configurazione.

## 4. Testare la connessione

1. Effettua un ordine di prova sul tuo store
1. Vai su Spoki > Automazioni
1. Verifica che l’evento order.created sia stato ricevuto
1. Per testare il carrello abbandonato:
- aggiungi un prodotto al carrello
- attendi circa 15 minuti

Se gli eventi vengono ricevuti correttamente, l’integrazione è attiva.

## Automazioni disponibili

- Order Created → conferma ordine al cliente
- Order Updated → aggiornamento stato ordine
- Tracking Number Added → notifica spedizione
- Abandoned Cart → recupero carrello abbandonato
- Cart Resumed → cliente torna tramite link di recupero
- Customer Registered → registrazione nuovo utente
- Order Review → richiesta recensione dopo la consegna
- Order Notify → notifica nuova vendita al venditore

## Automazioni consigliate

Per iniziare, attiva queste automazioni:

1. Recupero carrello abbandonatoMessaggio con prodotti e link diretto al checkout: %%PRESTASHOP_CHECKOUT_LINK%%
1. Conferma ordineMessaggio con prodotti acquistati e totale ordine
1. Notifica spedizioneMessaggio con tracking: %%PRESTASHOP_TRACKING_NUMBER%%

## Variabili dinamiche

Puoi personalizzare i messaggi utilizzando variabili dinamiche.

Esempi:

- %%FIRST_NAME%%
- %%LAST_NAME%%
- %%PRESTASHOP_ORDER_ID%%
- %%PRESTASHOP_ORDER_AMOUNT%%
- %%PRESTASHOP_CHECKOUT_LINK%%
- %%PRESTASHOP_TRACKING_NUMBER%%

Le variabili disponibili possono variare in base all’automazione utilizzata.

## Integrazione con Spoki AI

PrestaShop mette a disposizione una Webservice API che consente ad applicazioni esterne, come strumenti AI, di collegarsi allo store, recuperare dati ed eseguire azioni specifiche.

Configurando l’integrazione con Spoki AI, l’AI Sales Agent può cercare prodotti, mostrare dettagli e supportare la creazione degli ordini.

### 1. Installare e preparare il modulo Spoki

Per utilizzare le funzionalità AI, installa e configura il modulo Spoki sul tuo store.

1. Accedi al backoffice di PrestaShop
1. Vai su Moduli
1. Apri il Marketplace / Catalogo Moduli
1. Cerca Spoki
1. Installa il modulo
1. Attiva l’integrazione Spoki
1. Copia:
- API Key
- URL del tuo store

![](https://support.spoki.com/wp-content/uploads/2025/08/Screenshot-2026-01-22-at-15.17.48.png)
### 2. Collegare PrestaShop a Spoki AI

1. Accedi alla dashboard Spoki
1. Dal menu laterale vai su AI
1. Apri la sezione Integrations and Tool

![](https://support.spoki.com/wp-content/uploads/2025/08/Screenshot-2025-10-17-at-14.49.36-1024x313.png)
1. Scorri fino a AI Integrations
1. Clicca su Add Integrations
1. Seleziona PrestaShop

![](https://support.spoki.com/wp-content/uploads/2025/08/Screenshot-2025-10-17-at-14.49.52-1024x540.png)
1. Inserisci:
- PrestaShop Access Token → API Key
- URL → indirizzo del tuo store (es. https://my-store.com)
1. Clicca su Save

### 3. Attivare le funzionalità AI

Dopo aver salvato le credenziali:

1. Attiva le funzionalità che vuoi utilizzare, ad esempio:
- Search Products
- Get Product Detail
- creazione ordini (se disponibile)
1. Clicca su Save

A questo punto l’integrazione è attiva e l’AI può utilizzare le funzionalità abilitate.

## Risoluzione problemi

- Nessun evento ricevuto → verifica che l’integrazione PrestaShop sia attiva su Spoki
- Delivery URL o Secret Token non visibili → attiva prima l’integrazione
- Modulo non installabile → scarica l’ultima versione
- Automazioni non attive → verifica che il cliente abbia un numero WhatsApp
- Carrello abbandonato non ricevuto → attendi almeno 15 minuti
- Link recupero carrello non funzionante → aumenta il valore di Cart Recovery Link TTL