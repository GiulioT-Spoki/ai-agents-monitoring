# CASP — Knowledge base prelievo domiciliare

Documento di riferimento per l'assistente CASP. Aggiornare i placeholder contrassegnati [DA CONFIGURARE] quando il cliente fornisce i dati definitivi.

---

## Identità e laboratorio

- **Ente:** Centro Applicazioni per la Sanità Pubblica (CASP) — ONLUS
- **Servizio:** prelievi domiciliari per esami di laboratorio
- **Laboratorio di riferimento:** IRCCS Ospedale "Saverio de Bellis", Castellana Grotte

---

## Contatti

| Canale | Valore |
|---|---|
| Telefono | 080 4725539 |
| Email URP | urp@sanitapubblica.org |
| Sito web | www.sanitapubblica.org |
| Prenotazione | sempre tramite chat WhatsApp / social (non telefono) |

### Sede CASP (ufficio)

- **Indirizzo:** Via Vico Giambattista 11, Monopoli
- **Accesso:** non aperto al pubblico; appuntamenti su richiesta
- **Orari ufficio:** lunedì–sabato 09:00–12:00, festivi compresi
- **Nota:** l'assistente risponde sempre in chat, anche fuori orario ufficio

---

## Zone servite

Il servizio di prelievo domiciliare è attivo **solo** nei seguenti comuni e relative contrade:

1. Monopoli
2. Polignano a Mare
3. Fasano
4. Castellana Grotte
5. Conversano

Fuori da questi comuni il servizio non è disponibile.

### Aree rurali (contrada, campagna, extraurbano)

- La posizione WhatsApp (pin) è **obbligatoria** per completare la prenotazione
- I pazienti in campagna che chiedono di essere tra i primi vengono solitamente inseriti tra gli ultimi del giro

---

## Tariffario servizio infermieristico domiciliare

[DA CONFIGURARE: importo base servizio infermieristico — es. X,XX euro]

### Calcolo costo per paziente

| Situazione | Costo servizio infermieristico | Ticket analisi |
|---|---|---|
| Paziente esente | [DA CONFIGURARE] euro — nessun altro costo per l'esenzione | Non applicabile |
| Paziente con ticket | [DA CONFIGURARE] euro + Avviso PagoPA successivo | [DA CONFIGURARE: stima indicativa Y,YY euro] |

**Regole:**
- Non inventare importi: usare solo i valori di questa sezione
- Il ticket è gestito tramite Avviso PagoPA con scadenza; mora se non pagato in tempo
- L'importo del ticket può variare per sgravi, note di credito, indennità di mora, sanzioni o interessi aggiornati dal sistema regionale
- Un operatore potrebbe ricontattare il paziente esente se il sistema rileva incompatibilità o scadenza dell'esenzione

### Preventivo costo analisi di laboratorio

Non disponibile in knowledge base. **Sempre escalation a operatore umano** — IRCCS non ha ancora fornito tariffario analisi.

---

## Modalità di pagamento servizio infermieristico

- Contanti all'infermiere
- Satispay
- Bonifico anticipato almeno **3 giorni lavorativi** prima del prelievo

[DA CONFIGURARE: IBAN e causale bonifico se forniti dal cliente]

---

## Regole prenotazione e calendario

[DA CONFIGURARE: giorni disponibili per prelievo]

[DA CONFIGURARE: anticipo minimo prenotazione]

[DA CONFIGURARE: finestra massima prenotazione]

### Giro infermieristico

- **Fascia oraria giro:** 06:00–08:30 (Europe/Rome)
- **Durata slot domicilio:** 15 minuti
- **Massimo domicili per seduta:** 10 con un infermiere
- L'utente sceglie solo la **data**; l'orario indicativo viene comunicato il giorno prima via WhatsApp

### Date non ancora caricate

Se l'utente chiede una data nel mese successivo non ancora disponibile sul calendario: informare che le date non sono ancora disponibili e invitare a ricontattare a inizio mese.

---

## Ricette accettate

| Tipo | Descrizione |
|---|---|
| Dematerializzata | Ricetta elettronica |
| Rossa | Ricetta cartacea rossa (possibili esenzioni non note al paziente) |
| Solvenza (bianca) | Ricetta a pagamento |

**Formati accettati:** una foto per ricetta (immagine) oppure file PDF (anche multipagina).

**Requisiti:** ricetta completamente inquadrata, leggibile, non sfocata.

**Consegna:** le ricette cartacee devono essere consegnate all'infermiere il giorno del prelievo — pena disdetta.

---

## Disdetta

- Anticipo minimo: **48 ore lavorative** prima del prelievo
- Conservare il **numero disdetta** comunicato per almeno 6 mesi
- Riferimento normativo: DGR 2268/2010
- Sanzioni previste in caso di mancata disdetta o mancata consegna ricette

---

## Referti — FAQ

### Quando è pronto il referto?

Il referto è pronto solo quando viene inviato in chat WhatsApp nella stessa conversazione. Se non è stato inviato, non è ancora pronto.

Alcuni esami richiedono più tempo — [DA CONFIGURARE: elenco esami con tempi particolari se disponibile].

### Dove posso consultare il referto?

1. **Fascicolo Sanitario Elettronico (FSE)** — il medico di medicina generale può accedervi
2. **Sito web** www.sanitapubblica.org — area referti online
3. **WhatsApp** — inviato nella stessa chat quando disponibile

### Referto cartaceo

Non viene emesso referto cartaceo. Eccezione per pazienti anziani: escalation a operatore umano per valutazione.

### Referto su altro numero di telefono

Caso raro. Raccogliere il numero alternativo e segnalarlo nel riepilogo per l'operatore.

### Interpretazione valori referto

Non gestita dall'assistente. Escalation a operatore / medico di riferimento.

### Urgenza clinica su referto

Escalation immediata al coordinatore infermieristico.

---

## Lingue

- **Referti:** sempre in italiano
- **Operatori prelievo:** inglese gestibile
- **Altre lingue:** [DA CONFIGURARE: policy lingue aggiuntive] — in caso di dubbio, escalation

---

## Escalation — quando passare a operatore

- Emissione ricetta da parte di CASP
- Preventivo costo analisi di laboratorio
- Verifica eseguibilità esami specifici
- Urgenza clinica o interpretazione referto
- Richiesta referto cartaceo per anziano
- Blacklist (se configurata in Spoki)
- Richiesta esplicita di parlare con operatore
- Casi eccezionali valutati dal coordinatore infermieristico

---

## Recensioni e feedback

CASP apprezza feedback in qualsiasi momento della conversazione e invita gentilmente a lasciare recensioni su Google.

[DA CONFIGURARE: link pagina Google Reviews se fornito dal cliente]
