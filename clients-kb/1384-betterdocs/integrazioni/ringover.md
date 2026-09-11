---
title: Ringover
slug: ringover
author: Salvatore Corsa
date: 2024-12-10
modified: 2026-07-29
word_count: 265
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/ringover/
---

# Ringover

Grazie a questa integrazione sarai in grado di avviare un’automazione **Spoki** all’interno di **Ringover**

### Guida all’integrazione

Se non lo hai ancora fatto, accedi alla piattaforma Spoki da questo link: [Spoki](https://spoki.app/)

### 1. Automazione Spoki

#### 1.1 Creare una nuova automazione

Di seguito vedremo come creare una nuova automazione da collegare a Ringover, se hai già creato l’automazione puoi saltare questo step.

Per prima cosa spostati nella sezione ***Automazioni*** come mostrato di seguito e clicca sul pulsante ***Nuova*** in alto a destra

![](https://support.spoki.com/wp-content/uploads/2024/11/localhost_3000_automations_3989-1024x825.png)
Ora scegli un template per la tua automazione, oppure clicca su ***Automazione vuota*** se vuoi costruire da zero la tua automazione.

Nell’esempio di seguito partiremo da un’automazione vuota.

![](https://support.spoki.com/wp-content/uploads/2024/12/localhost_3000_automations-1-1024x718.png)
#### 1.2 Aggiungere il trigger d’avvio

Un volta creata la tua automazione clicca su ***Aggiungi trigger d’avvio*** e nel menu che ti compare seleziona ***Integrazioni*** dall’elenco a sinistra ed infine clicca su ***Ringover***

![](https://support.spoki.com/wp-content/uploads/2024/11/localhost_3000_automations_3989-2-copia-1024x825.png)
![](https://support.spoki.com/wp-content/uploads/2024/12/localhost_3000_automations-3-1024x718.png)
Nella finestra che si apre prendi nota del ***Webhook URL***

![](https://support.spoki.com/wp-content/uploads/2024/12/localhost_3000_automations-5-1024x718.png)
Adesso sei pronto per spostarti su Ringover.

### 2. Ringover

Se non lo hai ancora fatto accedi al tuo account Ringover e spostati nella sezione Webhooks cliccando su questo link: [the Ringover dashboard](https://dashboard.ringover.com/webhooks)

Attiva l’evento ***Call Event*** ed incolla nelle sezioni sottostanti il Webhook Url fornito da Spoki.

![](https://support.spoki.com/wp-content/uploads/2024/12/dashboard.ringover.com_webhooks-1024x718.png)
### 2.1 Ringover IVRs

Per avviare la tua automazione Spoki all’interno del flusso IVR segui questi passaggi:

Vai nella sezione IVRs dal menu a sinistra e clicca sull’IVR in questione, nel nostro caso Test

![](https://support.spoki.com/wp-content/uploads/2024/12/dashboard.ringover.com_ivrs-2-1-1024x763.png)
Scegli quale scenario modificare.

![](https://support.spoki.com/wp-content/uploads/2024/12/dashboard.ringover.com_ivrs-3-1024x763.png)
Clicca sul + per aggiungere un nuovo step e successivamente clicca su **Ringover Users**

![](https://support.spoki.com/wp-content/uploads/2024/12/dashboard.ringover.com_ivrs-4-1024x763.png)
![](https://support.spoki.com/wp-content/uploads/2024/12/dashboard.ringover.com_ivrs-5-1024x763.png)
Clicca sul pulsante mostrato in figura. Una volta fatto, nella sezione **Call forwarding** clicca su Smart ed incolla il Webhook Url fornito da Spoki.

![](https://support.spoki.com/wp-content/uploads/2024/12/dashboard.ringover.com_ivrs-6-1024x763.png)
![](https://support.spoki.com/wp-content/uploads/2024/12/dashboard.ringover.com_ivrs-7-1024x763.png)