---
title: Gorgias
slug: gorgias
author: Salvatore Corsa
date: 2025-04-10
modified: 2026-07-29
word_count: 252
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/gorgias/
---

# Gorgias

Grazie a questa integrazione sarai in grado di avviare un’automazione **Spoki** ogni volta che c’è un evento su un Ticket in Gorgias

### Guida all’integrazione

Se non lo hai ancora fatto, accedi alla piattaforma Spoki da questo link: [Spoki](https://spoki.app/)

### 1. Automazione Spoki

#### 1.1 Creare una nuova automazione

Di seguito vedremo come creare una nuova automazione da collegare a Gorgias, se hai già creato l’automazione puoi saltare questo step.

Per prima cosa spostati nella sezione **Automazioni** come mostrato di seguito e clicca sul pulsante **Nuova** in alto a destra

![](https://support.spoki.com/wp-content/uploads/2024/11/localhost_3000_automations_3989-1024x825.png)
Ora scegli un template per la tua automazione, oppure clicca su **Automazione vuota** se vuoi costruire da zero la tua automazione.

Nell’esempio di seguito partiremo da un’automazione vuota.

![](https://support.spoki.com/wp-content/uploads/2024/11/localhost_3000_automations_3989-1-1024x825.png)
#### 1.2 Aggiungere il trigger d’avvio

Un volta creata la tua automazione clicca su ***Aggiungi trigger d’avvio*** e nel menu che ti compare seleziona ***Integrazioni*** dall’elenco a sinistra ed infine clicca su **Gorgias**

![](https://support.spoki.com/wp-content/uploads/2025/04/localhost_3000_automations_6528-1024x695.png)
Nella finestra che si apre prendi nota del*** Webhook Url*** e della ***Secret***

![](https://support.spoki.com/wp-content/uploads/2025/04/localhost_3000_automations_6528-1-1024x695.png)
Adesso sei pronto per spostarti su Gorgias.

### 2. Gorgias

Se non lo hai ancora fatto accedi al tuo account Gorgias

Clicca sulla rotella in basso a sinistra, successivamente su **HTTP Integration** ed infine su **Add HTTP Integration**

![](https://support.spoki.com/wp-content/uploads/2025/04/spoki.gorgias.com_app_home-1024x749.png)
Inserisci un nome per l’integrazione e seleziona i **trigger** che ti interessano.

Nella sezione Url inserisci il ***Webhook Url*** fornito da Spoki e seleziona il metodo **POST** in HTTP Method.

Aggiungi un nuovo header **X-SPOKI-SECRET** ed inserisci la **secret** fornita da Spoki.

Infine seleziona **Send the entire ticket/message JSON** nel campo **Request Body** e clicca su **Add Integration**

![](https://support.spoki.com/wp-content/uploads/2025/04/spoki.gorgias.com_app_home-1-1024x749.png)