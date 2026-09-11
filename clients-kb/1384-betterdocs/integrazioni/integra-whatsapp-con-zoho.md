---
title: Integra WhatsApp con Zoho
slug: integra-whatsapp-con-zoho
author: Emanuela Locorotondo
date: 2022-12-20
modified: 2025-08-21
word_count: 218
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/integra-whatsapp-con-zoho/
---

# Integra WhatsApp con Zoho

Integrando **Spoki** con **Zoho Marketing Automation** potrai utilizzare WhatsApp nella tua strategia di Marketing Automation, inviando notifiche programmate ai tuoi clienti.

1. Azioni da compiere sulla dashboard di Spoki
- Clicca su “Automazioni” nel menu
- Vai in alto a destra sul tasto “Crea”
- Premi il tasto “Aggiungi step di Avvio” e seleziona “Zoho Marketing Automation”
- Copia il link che dovrai inserire su Zoho Marketing Automation
- Inserisci un template come step dell’automazione
- Premi su “Salva”

![](https://support.spoki.com/wp-content/uploads/2022/12/zoho-1024x604.png)
1. Azioni da compiere su Zoho Marketing AutomationPotrai collegare Spoki con Zoho Marketing Automation tramite Webhook.
- Vai in Impostazioni / SPAZIO SVILUPPATORI / Webhook
- Clicca su “Crea” e seleziona “Lead”
- Crea un Webhook con le seguenti informazioni:

Nome: Spoki
- URL webhook: {inserisci il webhook copiato da Spoki in precedenza}
- Chiamate all’ora: 1000
- Metodo di richiesta: Pubblica
- Parametri URL:

email | Campo campagne | CONTACT_EMAIL
- first_name | Campo campagne | FIRSTNAME
- last_name | Campo campagne | LASTNAME
- phone | Campo campagne | PHONE
- mobile | Campo campagne | MOBILE
- aggiungi eventuali campi custom con la stessa modalità
1. Salva
1. Vai in Journey
1. Crea un nuovo Journey o selezionane uno esistente
1. Aggiungi un processo “Webhook”
1. Seleziona “Webhook”
1. Clicca su “Configura”
1. Seleziona il Webhook “Spoki” creato in precedenza
1. Salva

![](https://support.spoki.com/wp-content/uploads/2022/12/image-6-1024x811.png)
![](https://support.spoki.com/wp-content/uploads/2022/12/image-7-1024x812.png)
## Articoli correlati

[Integrare Spoki con i moduli di Facebook](https://support.spoki.com/docs/integrazioni/integrare-spoki-con-i-moduli-di-facebook/)

[Come collegare Spoki alle campagne Facebook](https://support.spoki.com/docs/how-to/come-collegare-spoki-alle-campagne-facebook/)

[Come bloccare in automatico i contatti da Spoki](https://support.spoki.com/docs/how-to/come-eliminare-i-contatti-in-automatico/)