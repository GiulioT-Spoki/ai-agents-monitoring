---
title: EmailChef
slug: emailchef
author: Alessandro Santoro
date: 2025-07-10
modified: 2025-07-16
word_count: 317
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/emailchef/
---

# EmailChef

Grazie a questa integrazione sarai in grado di avviare un’automazione **EmailChef** tramite uno step automazione in **Spoki** e potrai avviare un’automazione Spoki tramite automazione EmailChef

### 1. Guida all’integrazione – Avviare automazione EmailChef da automazione Spoki

Se non lo hai ancora fatto, accedi al tuo account EmailChef

### **1.1 Generare chiavi su EmailChef**

Vai su Impostazioni -> Chiavi API -> Genera una chiave API

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-08-alle-09.26.06-1024x314.png)
Salva i valori di **Consumer Key** e **Consumer Secret** che serviranno successivamente su Spoki

### **1.2 Attivare integrazione EmailChef su **Spoki

**1.2.1** Da Spoki vai su **Integrazioni -> EmailChef**. Attiva l’integrazione e incolla le due chiavi copiate prima da EmailChef.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-16-alle-11.25.41.png)
Infine clicca su “**Salva**“

**1.3 **Torna su EmailChef e apri/crea l’automazione che vuoi lanciare da Spoki. Clicca sul Trigger e copia l’URL 

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-07-alle-18.00.21-1-1024x621.png)
**1.4 **Torna su Spoki e apri/crea un’automazione. Aggiungi un nuovo step e seleziona **EmailChef**. Incolla l’URL copiato da EmailChef e infine clicca su **Aggiungi**

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-16-alle-11.28.04-974x1024.png)
Puoi anche decidere di aggiungere campi dinamici statici o basati su contact field attraverso il pulsante **Aggiungi Campo**. 

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-16-alle-11.29.14-976x1024.png)
Infine clicca su **Aggiungi** e salva l’automazione.

### 2. Guida all’integrazione – Avviare automazione Spoki da automazione EmailChef

Per avviare un’automazione su Spoki da EmailChef, per prima cosa dobbiamo creare un’automazione su Spoki con trigger **EmailChef**.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-16-alle-11.30.21-1024x462.png)
All’aggiunta del trigger EmailChef si genererà un **url** e una **secret** che devi copiare perché serviranno nel prossimo passaggio.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-16-alle-11.31.11.png)
Vai su EmailChef e assicurati che nella sezione **Dashboard > Liste e Segmenti > {nome_lista} > Campi personalizzati** ci sia il campo “**Phone**“, se non c’è aggiungilo.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-16-alle-09.34.26-1024x236.png)
![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-16-alle-09.35.19-1024x465.png)
Successivamente andiamo nell’automazione EmailChef in cui vogliamo avviare l’automazione Spoki ed aggiungiamo lo step **Lancia automazione Spoki**. 

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-16-alle-09.38.10.png)
In questo step dobbiamo aggiungere URL e secret che abbiamo precedentemente copiato dal trigger dell’automazione su Spoki e selezionare come **Campo Telefono** quello che abbiamo creato prima su EmailChef. 

Possiamo anche decidere di popolare campi dinamici su Spoki specificando il nome del campo su spoki e il valore da aggiungere.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-16-alle-09.41.48-1024x371.png)
Salva l’automazione EmailChef e attivala