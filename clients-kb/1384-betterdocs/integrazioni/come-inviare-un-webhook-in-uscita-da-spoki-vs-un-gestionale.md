---
title: Come inviare un Webhook in uscita da Spoki vs un gestionale
slug: come-inviare-un-webhook-in-uscita-da-spoki-vs-un-gestionale
author: Emanuela Locorotondo
date: 2024-02-14
modified: 2024-02-14
word_count: 276
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/come-inviare-un-webhook-in-uscita-da-spoki-vs-un-gestionale/
---

# Come inviare un Webhook in uscita da Spoki vs un gestionale

Nella sezione Integrazioni della piattaforma è possibile attivare l’invio di Webhook verso il tuo gestionale per una serie di eventi che si verificano su Spoki.

Accedi alla piattaforma e vai su Integrazioni >> Webhook >> clicca su Aggiungi Webhook

![](https://support.spoki.com/wp-content/uploads/2024/02/agg-webhook-in-uscita-1024x462.png)

Successivamente si aprirà una scheda con l’elenco degli eventi che è possibile notificare al vostro gestionale. Puoi scegliere di attivare i Webhook per tutti gli eventi che desideri.

![](https://support.spoki.com/wp-content/uploads/2024/02/evento-1024x469.png)
- Chat messaggi non letti: questo evento viene notificato quando una chat ha dei messaggi da leggere o quando non ne ha più. È l’equivalente del badge verde mostrato in piattaforma;
- Messaggio inviato: questo evento viene notificato quando un messaggio è stato inviato e ad ogni suo aggiornamento;
- Messaggio ricevuto: questo evento viene notificato quando un messaggio è stato ricevuto e ad ogni suo aggiornamento.
- Nota aggiunta: questo evento viene notificato quando è stata aggiunta una nota alla chat;
- Contatto creato: questo evento viene notificato quando viene creato un contatto;
- Contatto aggiornato: questo evento viene notificato quando viene aggiornato un contatto;
- Contatto eliminato: questo evento viene notificato quando viene eliminato un contatto;
- Tag aggiunto al contatto: questo evento viene notificato quando viene aggiunto un tag ad un contatto;
- Tag eliminato dal contatto: questo evento viene notificato quando viene eliminato un tag dal contatto;
- Contatto aggiunto alla lista: questo evento viene notificato quando viene aggiunto un contatto alla lista;
- Contatto eliminato dalla lista: questo evento viene notificato quando viene eliminato un contatto dalla lista;
- ContactField creato o aggiornato: questo evento viene notificato quando viene creato o aggiornato un ContactField.

Nella scheda ti viene richiesto di indicare l’URL Callback del tuo gestionale, a cui verranno inviate le notifiche di quello specifico evento selezionato ogni volta che si verificherà su Spoki.