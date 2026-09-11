---
title: Magnews Flow
slug: magnews-flow
author: Salvatore Corsa
date: 2024-11-26
modified: 2026-07-29
word_count: 312
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/magnews-flow/
---

# Magnews Flow

Grazie a questa integrazione sarai in grado di avviare un’automazione **Spoki** all’interno di un **Flow** di **Magnews**

### Guida all’integrazione

Se non lo hai ancora fatto, accedi alla piattaforma Spoki da questo link: [Spoki](https://spoki.app/)

### 1. Automazione Spoki

#### 1.1 Creare una nuova automazione

Di seguito vedremo come creare una nuova automazione da collegare a Magnews, se hai già creato l’automazione puoi saltare questo step.

Per prima cosa spostati nella sezione ***Automazioni*** come mostrato di seguito e clicca sul pulsante ***Nuova*** in alto a destra

![](https://support.spoki.com/wp-content/uploads/2024/11/localhost_3000_automations_3989-1024x825.png)
Ora scegli un template per la tua automazione, oppure clicca su ***Automazione vuota*** se vuoi costruire da zero la tua automazione.

Nell’esempio di seguito partiremo da un’automazione vuota.

![](https://support.spoki.com/wp-content/uploads/2024/11/localhost_3000_automations_3989-1-1024x825.png)
#### 1.2 Aggiungere il trigger d’avvio

Un volta creata la tua automazione clicca su ***Aggiungi trigger d’avvio*** e nel menu che ti compare seleziona ***Integrazioni*** dall’elenco a sinistra ed infine clicca su ***Magnews***

![](https://support.spoki.com/wp-content/uploads/2024/11/localhost_3000_automations_3989-2-copia-1024x825.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/localhost_3000_automations_3989-3-1024x825.png)
Nella finestra che si apre prendi nota dell’*** URL***, della ***Secret*** e del ***Payload della richiesta***

![](https://support.spoki.com/wp-content/uploads/2024/11/localhost_3000_automations_3989-4-1024x825.png)
Adesso sei pronto per spostarti su Magnews.

### 2. Magnews Flow

Se non lo hai ancora fatto accedi al tuo account Magnews

#### **2.1 Creazione della journey in Magnews**

Una volta effettua il login, clicca in alto su ***Journey Lab***, poi sulla ***journey di riferimento***, clicca ***Flussi automatici*** ed infine ***Nuovo flusso.***

![](https://support.spoki.com/wp-content/uploads/2024/11/be-mn1.mag-news.it_be_redazione_index.do_TrSID62n-6abs57swb8612w0rk676-1024x968.png)
Nella schermata che si apre, inserisci un nome per il nuovo flusso e clicca in alto a destra su ***Crea***.

![](https://support.spoki.com/wp-content/uploads/2024/11/be-mn1.mag-news.it_be_cms_workflow_workflow_modify.do_TrSID62n-55136a1w0iin5e6x4cnzidcampaign1-1024x968.png)
Ora clicca in alto a destra su ***Design***.

![](https://support.spoki.com/wp-content/uploads/2024/11/be-mn1.mag-news.it_be_cms_workflow_workflow_modify.do_TrSID62n-55136a1w0iin5e6x4cnzidworkflow5-1024x968.png)
Ora clicca su ***Evento API*** dal menu a sinistra e trascina l’elemento nell’area di lavoro. Spostati nella sezione ***Azioni*** e trascina l’elemento ***TKW – Chiamata REST.***

![](https://support.spoki.com/wp-content/uploads/2024/11/be-mn1.mag-news.it_be_cms_workflow_workflow_designer.do_TrSID62n-55136a1w0iin5e6x4cnzidworkflow5-1-1024x968.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/be-mn1.mag-news.it_be_cms_workflow_workflow_designer.do_TrSID62n-55136a1w0iin5e6x4cnzidworkflow5-2-1024x968.png)
Ora clicca sulla matita in alto a destra nell’elemento TKW – Chiamata REST

![](https://support.spoki.com/wp-content/uploads/2024/11/be-mn1.mag-news.it_be_cms_workflow_workflow_designer.do_TrSID62n-55136a1w0iin5e6x4cnzidworkflow5-3-1024x968.png)
Nella schermata che compare compila i campi inserendo i valori ***URL***, della ***Secret*** e del ***Payload della richiesta*** che hai ottenuto da Spoki e clicca su ***Salva***.

![](https://support.spoki.com/wp-content/uploads/2024/11/Screenshot-2024-11-25-alle-17.22.51-1024x955.png)
Ora salva il flusso e non ti resta che aggiungere tutti gli altri step desiderati.