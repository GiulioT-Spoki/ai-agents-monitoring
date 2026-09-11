---
title: Integrare WhatsApp con Shopify
slug: integrare-whatsapp-con-shopify
author: Emanuela Locorotondo
date: 2022-12-20
modified: 2025-11-13
word_count: 517
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/integrare-whatsapp-con-shopify/
---

# Integrare WhatsApp con Shopify

Spoki ti permette di collegare **Shopify** in modo da contattare i tuoi clienti utilizzando il canale WhatsApp ed aggiornarli:

- sullo stato e aggiornamento degli ordini
- invio tracking number per monitorare la spedizione
- qualsiasi altra comunicazione tu voglia inviare al tuo cliente*
- molto altro ancora

Per avviare le prime automazioni segui i seguenti step.

1. Azioni da compiere sulla dashboard di Spoki
- Accedi a Spoki (è necessario avere acquistato un Piano Pro)
- Clicca sulla voce “Integrazioni” nel menu
- Seleziona l’icona “Shopify”
- Premi su “Abilita”
1. Azioni da compiere su Shopify
- Accedi alla dashboard del tuo sito web (nomesito.myshopify.com/admin)
- Dal pannello a sinistra clicca su “Impostazioni”
- Clicca su “Notifiche”
- Scrolla fino alla sezione “Webhook”
- clicca su “Crea webhook”
1. Copia le informazioni da Spoki a Shopify
- “Evento”: qui sceglierai l’evento che darà il via al tuo messaggio.Ripeti il punto 3 per ognuno di questi valori:

Creazione check-out
- Aggiornamento check-out
- Creazione ordine
- Aggiornamento ordine
- Evasione ordini
- Pagamento ordine
- Creazione evasione
- Aggiornamento evasione
1. È NECESSARIO COLLEGARE TUTTI I WEBHOOK, anche se non intendete far partire le notifiche per ogni evento. Sceglierete le automazioni da attivare in un momento successivo da Spoki.
1. “Formato”: JSON
1. “URL”: Copia il link che trovi nella voce “Delivery Url” nella sezione di Spoki dedicata a Shopify (vedi step 1)
1. “Versione API Webhook”: seleziona “2025-10”
1. Clicca su Salva
1. Da questo momento le automazioni sono tutte collegate MA disabilitate
1. Vai su Automazioni in piattaforma Spoki e abilita solo le automazioni con i messaggi che vuoi inviare ai tuoi clienti.
1. Azioni da compiere su Shopify
- Accedi alla dashboard del tuo sito web (nomesito.myshopify.com/admin)
- Dal pannello a sinistra clicca su “Impostazioni”
- Clicca su “Check-out”
- Scrolla fino alla sezione “Opzioni modulo”
- Imposta “Numero telefonico dell’indirizzo di spedizione” a “Obbligatorio” o “Facoltativo”
- Clicca su “Salva”

**Informazioni sull’automazione**

- Ordine Creato su Shopify: notifica al cliente di un acquisto avvenuto con successo
- Ordine Aggiornato su Shopify: notifica il cambio dello stato dell’ordine in corso
- Ordine Spedito su Shopify: notifica il cambio del numero di tracciamento dell’ordine in corso
- Lascia una recensione su Shopify: notifica richiesta di recensione dopo che l’ordine è completato
- Carrello abbandonato su Shopify: notifica dopo 15 minuti se il carrello contiene prodotti non acquistati

**Campi dinamici utilizzabili per ciascuna automazione**

- Ordine creato su Shopify: %%FIRST_NAME%%, %%SHOPIFY_ORDER_ID%%
- Ordine aggiornato su Shopify: %%FIRST_NAME%%, %%SHOPIFY_ORDER_ID%%, %%SHOPIFY_STATUS%%
- Ordine spedito su Shopify: %%FIRST_NAME%%, %%SHOPIFY_ORDER_ID%%, %%SHOPIFY_TRACKING_INFO%%
- Lascia una recensione su Shopify: %%FIRST_NAME%%, %%ACCOUNT_NAME%%
- Carrello abbandonato su Shopify: %%FIRST_NAME%%, %%SHOPIFY_CHECKOUT_LINK%%
- Prodotto:%%SHOPIFY_PRODUCTS%%,
- Data ordine : %%SHOPIFY_ORDER_DATE%%
- Link ordine: %%SHOPIFY_ORDER_LINK%%
- %%SHOPIFY_SHOP%%.

Un ulteriore campo dinamico utilizzabile è %%SHOPIFY_ORDER_TOTAL_PRICE%% con il quale è possibile comunicare al cliente l’importo pagato.

Al seguente link puoi consultare il [video di formazione Shopify](https://reddoak-srl.webinargeek.com/scopri-tutti-i-dettagli-dell-integrazione-shopify) .Al seguente link puoi vedere come collegare [l’agente ai di Shopify a Spoki.](https://support.spoki.com/wp-admin/post.php?post=6782&action=edit)

## Articoli correlati

[Come attivare un messaggio automatico da far partire nei giorni festivi](https://support.spoki.com/docs/how-to/come-attivare-un-messaggio-automatico-da-far-partire-nei-giorni-festivi/)

[Come collegare un bottone di chat sul sito ad una risposta automatica](https://support.spoki.com/docs/how-to/come-collegare-un-bottone-di-chat-sul-sito-ad-una-risposta-automatica/)

[Come creare un’automazione con risposta ai bottoni del template](https://support.spoki.com/docs/how-to/come-creare-unautomazione-con-risposta-ai-bottoni-del-template/)