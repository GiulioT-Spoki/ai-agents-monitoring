---
title: Integrazione WhatsApp e WooCommerce
slug: integrazione-whatsapp-e-woocommerce
author: Emanuela Locorotondo
date: 2022-12-20
modified: 2026-02-16
word_count: 504
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/integrazione-whatsapp-e-woocommerce/
---

# Integrazione WhatsApp e WooCommerce

Integra **Spoki** su **WooCommerce** e invia notifiche automatiche ai tuoi clienti per :

- Confermare la corretta ricezione dell’ordine
- Inviare notifiche con informazioni sulla spedizione
- Confermare l’avvenuta consegna di un ordine
- Invitare i clienti a completare gli acquisti in caso di carrelli abbandonati

Per avviare le prime automazioni segui i seguenti step.

1. Azioni da compiere sulla dashboard di Spoki
- Accedi a Spoki
- Clicca sulla voce “Integrazioni” nel menu
- Seleziona l’icona “WooCommerce”
- Premi su “Abilita”
1. Azioni da compiere sul tuo sito
- Accedi alla dashboard del tuo sito web (www.tuodominio.it/wp-admin)
- Nella barra di navigazione sinistra clicca sulla voce “Plugins”
- Clicca su “Aggiungi nuovo” in alto a sinistra
- Clicca su “Installa adesso” e poi “Attiva
- Nella barra di navigazione sinistra clicca sulla voce “Spoki”
1. Collega il tuo account Spoki PRO a Spoki Plugin
- Nella piattaforma clicca su “Menu” e poi “Anagrafica attività commerciale”
- Nel tuo sito, nella pagina “Spoki”, inserisci Numero di telefono, Nome attività e Email indicati nella tua “Anagrafica attività commerciale”
- Clicca su “Abilita Spoki Free”
- Enjoy

**Info sulle automazioni attivabili**

- Woocommerce Carrello salvato: notifica il venditore che è stato acquistato un carrello abbandonato in seguito alla notifica
- Woocommerce Notifica venditore: notifica nuova vendita effettuata al venditore
- Woocommerce Carrello abbandonato: notifica dopo 15 minuti se il carrello contiene prodotti non acquistati
- Woocommerce Ordine Creato: notifica dell’acquisto avvenuto con successo al cliente
- Woocommerce Ordine Aggiornato: notifica del cambiamento dello stato dell’ordine in corso
- Woocommerce Lascia una recensione: notifica richiesta recensione dopo che l’ordine è completato
- Woocommerce Ordine Spedito: notifica del cambiamento del tracking number dell’ordine in corso

**Per attivare una automazione è necessario attivarla SIA del Plugin SIA delle automazioni della piattaforma.**

Se desideri modificare i template puoi farlo direttamente dal menu template della piattaforma. I campi dinamici utilizzabili sono esclusivamente quelli indicati in basso.

**Variabili e campi dinamici utilizzabili per ogni automazione:**

- FLEX_CHECKOUT_LINK: link al carrello abbandonato
- FLEX_LINK: Rimanda al WhatsApp del venditore inserito nel Plugin di Woocommerce
- WOO_ORDER_ID: ID ordine
- WOO_STATUS: stato ordine indicato su Woocommerce
- FIRST_NAME: nome contatto
- FLEX_ACCOUNT_NAME: nome del e-commerce
- WOO_TRACKING_INFO: informazioni di tracciamento
- FLEX_REVIEW_LINK: Rimanda al link su cui lasciare la recensione inserito nel Plugin di Woocommerce

- Woocommerce Carrello salvato: %%WOO_ORDER_ID%%
- Woocommerce Ordine Creato: %%FIRST_NAME%%, %%WOO_ORDER_ID%%, %%FLEX_ACCOUNT_NAME%%, %%FLEX_LINK%%
- Woocommerce Carrello abbandonato: %%FIRST_NAME%%, %%FLEX_CHECKOUT_LINK%%, %%FLEX_LINK%%
- Woocommerce Notifica venditore: %%WOO_ORDER_ID%%, %%FLEX_ACCOUNT_NAME%%
- Woocommerce Ordine Aggiornato: %%FIRST_NAME%%, %%WOO_ORDER_ID%%, %%FLEX_ACCOUNT_NAME%%, %%WOO_STATUS%%, %%FLEX_LINK%%
- Woocommerce Lascia una recensione: %%FIRST_NAME%%, %%FLEX_ACCOUNT_NAME%%, %%FLEX_REVIEW_LINK%%
- Woocommerce Ordine Spedito: %%FIRST_NAME%%, %%WOO_ORDER_ID%%, %%FLEX_ACCOUNT_NAME%%, %%WOO_STATUS%%, %%FLEX_LINK%%, %%WOO_TRACKING_INFO%%

Al seguente link puoi consultare il [video di formazione Woocommerce](https://reddoak-srl.webinargeek.com/scopri-tutti-i-dettagli-dell-integrazione-woocommerce).

## Articoli correlati

[Come inviare un messaggio di reminder in automatico da Spoki](https://support.spoki.com/docs/how-to/come-avviare-un-messaggio-di-reminder-in-automatico-da-spoki/)

[Come collegare un bottone di chat sul sito ad una risposta automatica](https://support.spoki.com/docs/how-to/come-collegare-un-bottone-di-chat-sul-sito-ad-una-risposta-automatica/)

[Come attivare un messaggio automatico da far partire nei giorni festivi](https://support.spoki.com/docs/how-to/come-attivare-un-messaggio-automatico-da-far-partire-nei-giorni-festivi/)