---
title: Step multipli nell&#8217;automazione
slug: step-multipli-nellautomazione
author: Emanuela Locorotondo
date: 2023-11-17
modified: 2023-11-17
word_count: 320
categories: How to
url: https://support.spoki.com/docs/how-to/step-multipli-nellautomazione/
---

# Step multipli nell&#8217;automazione

In questo articolo viene specificata la **logica sottostante la creazione/ modifica/ sostituzione degli step multipli all’interno dell’automazione.**

Gli step dell’automazione, oltre a contenere il messaggio/azione da effettuare, contiene al suo interno anche lo step di attesa. 

Vediamo di seguito cosa comporta la modifica degli step delle automazioni: prendiamo come esempio una sequenza di tre messaggi con relativo step di attesa.

![](https://support.spoki.com/wp-content/uploads/2023/11/Screenshot-2023-11-17-alle-10.12.41.png)
**ELIMINAZIONE DI UNO STEP**: nel caso si decidesse di eliminare lo step, tutti i contatti in attesa dello step 2 scivoleranno nello step 3, iniziando da quel momento l’attesa di 4 giorni prevista dello step 3. I contatti in attesa degli altri step non subiranno variazioni.

Caso particolare: nel caso in cui venga eliminato uno step seguito dallo step “Qualsiasi risposta da parte del cliente”, tale step verrà ignorato e il funnel passerà allo step successivo.

**SPOSTAMENTO DI UNO STEP**: nel caso in cui si decidesse di spostare uno step, in alto o in basso rispetto ad altri step già esistenti, lo step trascinerebbe con se i contatti in attesa. Per cui se ad esempio lo step 2 venisse spostato prima dello step 1, i contatti presenti nello step 2, che avevano precedentemente ricevuto il messaggio dello step 1, lo riceveranno nuovamente.

**SOSTITUZIONE DI UNO STEP**: la sostituzione del messaggio in uno step già esistente non comporta alcuna modifica dei contatti in attesa nello stesso step.

**AGGIUNTA DI UNO STEP**: è possibile aggiungere uno step a qualsiasi altezza del funnel e i contatti in attesa dello step precedente scivoleranno nello step successivo. ATTENZIONE! Quando si aggiunge uno step finale, se i contatti inseriti in quello che era l’ultimo step precedentemente hanno già ricevuto il messaggio, tali contatti sono ormai usciti dall’intera automazione e non riceveranno più lo step finale. pertanto, per aggiungere degli step in basso nell’automazione, per fare in modo che i contatti che sono già nell’automazione ricevano i nuovi messaggi, è necessario aggiungerli all’automazione PRIMA che tali contatti raggiungano l’ultimo step esistente prima dell’aggiunta dei nuovi messaggi.