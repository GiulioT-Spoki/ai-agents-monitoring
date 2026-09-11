---
title: Come impostare una CTA con campo dinamico
slug: come-impostare-una-cta-con-campo-dinamico
author: Emanuela Locorotondo
date: 2024-01-05
modified: 2026-07-10
word_count: 207
categories: How to
url: https://support.spoki.com/docs/how-to/come-impostare-una-cta-con-campo-dinamico/
---

# Come impostare una CTA con campo dinamico

Il bottone con link dinamico per Whatsapp deve necessariamente essere costruito nel seguente modo: https://www.dominio.it/ + campo dinamico

Se ad esempio si vuole inserire il link ad un carrello abbandonato direttamente nel bottone, puoi falo nel modo seguente. Prendiamo ad esempio Shopify:

- Recupera un link ad un carrello abbandonato del tuo sito;
- Inserisci la prima parte “fissa” e riportarla nella parte testo del bottone (es. www.spoki.it/)
- seleziona la parte dinamica scegliendo il campo dinamico che ti interessa (es. SHOPIFY_CHECKOUT_LINK)

![](https://support.spoki.com/wp-content/uploads/2024/01/Screenshot-2024-01-05-alle-12.10.50.png)
Nel campo dinamico Shopify manda il link per intero (compresa la parte del dominio). 

Solo ed esclusivamente all’interno dei bottoni, a prescindere da quale sia il campo dinamico inerito (non deve essere necessariamente quello di Shopify, ma vale per qualsiasi campo dinamico) **Spoki in automatico rimuove la parte iniziale duplicata.** 

In questo modo il link risulta funzionante.

Ultimo step da effettuare è popolare il campo dinamico d’esempio (sulla destra) in modo che il link sia cliccabile per l’approvazione a Whatsapp. Il link dovrà condurre ad una pagina realmente esistente.

![](https://support.spoki.com/wp-content/uploads/2024/01/Screenshot-2024-01-05-alle-12.10.58.png)
Non vi resta quindi che prendere un link di carrello abbandonato realmente esistente, copiare la parte fissa nel bottone e inserire (sulla destra) nel campo d’esempio SHOPIFY_CHECKOUT_LINK la restante parte del link.