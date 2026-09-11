---
title: Gestione Contatti in Spoki
slug: gestione-import-export-contatti-spoki
author: romantic-torvalds
date: 2022-10-05
modified: 2025-08-08
word_count: 481
categories: Piattaforma
url: https://support.spoki.com/docs/piattaforma/gestione-import-export-contatti-spoki/
---

# Gestione Contatti in Spoki

![](https://i.ytimg.com/vi/uUYgvaXloOg/maxresdefault.jpg)

In questa sezione vengono archiviati tutti i numeri degli utenti con cui Spoki entra in contatto. I contatti possono essere acquisiti tramite integrazioni con strumenti esterni (come ActiveCampaign, Zapier, ecc.) oppure importati direttamente da un file CSV.

### **Importare contatti da file CSV**

Per importare correttamente i contatti da un file CSV, segui questi passaggi:

1. Preparazione dei campi dinamici
- Crea i Campi Dinamici utilizzando esattamente lo stesso nome delle colonne presenti nel file CSV.
- Questa operazione non è necessaria per i campi standard come Telefono, Nome, Cognome ed Email.
- Attiva il campo dinamico impostandolo su ON (consulta la sezione Campi Dinamici).
1. Caricamento del file CSV
- Vai in Liste > Nuova > Crea lista da CSV.
- Carica il file CSV precedentemente preparato.

Con questa procedura, oltre alle informazioni di base (Nome, Cognome, Telefono), puoi importare anche altri campi dinamici personalizzati, come *data di compleanno* o *data di prenotazione*.

### **Gestione e modifica dei contatti**

Dal menu **Contatti**, cliccando sul nome di un singolo contatto, puoi visualizzare e modificare tutte le informazioni relative. Nel pannello a destra è possibile:

- Aggiungere o rimuovere tag.
- Inserire o rimuovere il contatto da una lista.
- Modificare manualmente le informazioni associate al contatto.

Dopo ogni modifica, clicca sempre su **Salva** (in basso).

### **Bloccare un contatto**

Per bloccare un contatto:

- Clicca sul pulsante Blocca in basso nel pannello del singolo contatto.
- Tutti i contatti bloccati sono consultabili selezionando il filtro Solo contatti bloccati nel menu Contatti.

### **Accesso rapido alla chat con il contatto**

Dal pannello del contatto è possibile accedere direttamente alla conversazione con l’utente cliccando su **Vai alla chat**, visualizzando tutti i messaggi scambiati.

### **Filtri contatti**

Puoi filtrare i contatti in base a diversi criteri, come tag, liste e altre categorie. Ogni filtro mostra solo i contatti appartenenti alla categoria selezionata.

### **Import ed export contatti**

Dal menu in alto (icona con tre puntini) puoi accedere alle funzioni di **Import** ed **Export**.

#### Import contatti

- Consente di caricare un elenco di contatti con tutte le informazioni aggiuntive desiderate.
- Per informazioni personalizzate come data di compleanno:

Crea un campo dinamico dedicato (es. BIRTHDAY_DATE) e attivalo.
- Assicurati che il file CSV contenga una colonna con lo stesso nome del campo dinamico.
- Per evitare errori di formato, utilizza il tool Gestisci CSV fornito da Spoki.

**Nota**: se i contatti sono già presenti sulla piattaforma, verranno aggiornati con le nuove informazioni. Non è possibile importare direttamente i tag.

#### Export contatti

Se vengono importati contatti già presenti, i dati esistenti saranno aggiornati automaticamente e i nuovi contatti saranno aggiunti.

Consente di scaricare un file CSV con tutti i contatti di Spoki e le informazioni associate (tag, liste, campi dinamici).

## Articoli correlati

[Regole per evitare il ban da WhatsApp](https://support.spoki.com/docs/regole-whatsapp/regole-per-evitare-il-ban-da-whatsapp/)

[Qualità dei messaggi inviati](https://support.spoki.com/docs/regole-whatsapp/qualita-dei-messaggi-inviati/)

[Come eliminare i contatti in automatico](https://support.spoki.com/docs/how-to/come-eliminare-i-contatti-in-automatico/)

[Come attribuire il tag ai contatti di una lista](https://support.spoki.com/docs/how-to/come-attribuire-il-tag-ai-contatti-di-una-lista/)

[Come eliminare contatti multipli](https://support.spoki.com/docs/how-to/come-eliminare-contatti-multipli/)