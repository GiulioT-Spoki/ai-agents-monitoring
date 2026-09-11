---
title: Make
slug: make
author: Salvatore Corsa
date: 2024-12-24
modified: 2026-07-29
word_count: 218
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/make/
---

# Make

Grazie a questa integrazione sarai in grado di avviare un’automazione **Spoki** all’interno di **Make**

### Guida all’integrazione

Se non lo hai ancora fatto, accedi alla piattaforma Spoki da questo link: [Spoki](https://spoki.app/)

### 1. Automazione Spoki

#### 1.1 Creare una nuova automazione

Di seguito vedremo come creare una nuova automazione da collegare a Make, se hai già creato l’automazione puoi saltare questo step.

Per prima cosa spostati nella sezione **Automazioni** come mostrato di seguito e clicca sul pulsante **Nuova** in alto a destra

![](https://support.spoki.com/wp-content/uploads/2024/11/localhost_3000_automations_3989-1024x825.png)
Ora scegli un template per la tua automazione, oppure clicca su **Automazione vuota** se vuoi costruire da zero la tua automazione.

Nell’esempio di seguito partiremo da un’automazione vuota.

![](https://support.spoki.com/wp-content/uploads/2024/11/localhost_3000_automations_3989-1-1024x825.png)
#### 1.2 Aggiungere il trigger d’avvio

Un volta creata la tua automazione clicca su ***Aggiungi trigger d’avvio*** e nel menu che ti compare seleziona ***Integrazioni*** dall’elenco a sinistra ed infine clicca su **Make**

![](https://support.spoki.com/wp-content/uploads/2024/12/localhost_3000_automations_3995-1-1024x723.png)
Nella finestra che si apre prendi nota del*** Webhook Url***, della ***Secret*** e del ***Payload della richiesta***

![](https://support.spoki.com/wp-content/uploads/2024/12/localhost_3000_automations_3995-1024x723.png)
Adesso sei pronto per spostarti su Make.

### 2. Make

Se non lo hai ancora fatto accedi al tuo account Make

Durante la creazione di uno Scenario aggiungi lo step HTTP come mostrato in figura

![](https://support.spoki.com/wp-content/uploads/2024/12/eu2.make_.com_575236_scenarios_2990888_edit-1024x723.png)
![](https://support.spoki.com/wp-content/uploads/2024/12/eu2.make_.com_575236_scenarios_2990888_edit-1-1024x723.png)
Successivamente incolla il Webhook Url fornito da Spoki e il payload della richiesta come mostrato in figura.

![](https://support.spoki.com/wp-content/uploads/2024/12/eu2.make_.com_575236_scenarios_2990888_edit-2-1024x723.png)
Ora salva il flusso e non ti resta che aggiungere tutti gli altri step desiderati.