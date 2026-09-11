# Centro Gomme del Prato — Scenari di test dell’assistente vocale

**Agente:** Voice inbound — FAQ orari/prezzi/servizi + preventivo soft  
**Account Spoki (playground di test):** 9968  
**Account Spoki (cliente, target live):** 55247  
**Tipo:** Vocale  
**Link agente (playground):** https://app.spoki.com/ai/agent/00047b34-32d6-4fb5-8615-6810543012cd  
**Data verifica:** 11 settembre 2026  
**Ambiente:** playground di test (copia personale; non ancora live sul cliente)

---

## Contesto

È stato configurato e verificato un assistente vocale inbound per Centro Gomme del Prato (Osio Sopra, Driver Center Pirelli). Il lavoro ha incluso:

1. **Prompt operativo** allineato al caso d’uso: FAQ da knowledge base (orari, servizi, listino servizi), raccolta dati preventivo come sul form del sito, nessun appuntamento in chiamata, nessun ticket/mail automatici.
2. **Knowledge base** in tre file operativi: sede/orari/form preventivo, FAQ dal sito, listino servizi/prezzi (CSV).
3. **Correzioni post-test:** orari a due fasce (niente “orario continuato”); sabato/festivi come informazione non pubblicata (senza inferire “chiusi”); indirizzo Via 1 Maggio; preventivo con tutti i campi step 1 del form (misura, stagionalità, mezzo, modello).

Gli scenari sotto sono stati eseguiti sul playground con prompt e KB aggiornati. Risultano **verificati**.

---

## Cosa è stato verificato

### Orari, sede e contatti

| Scenario | Cosa è stato controllato |
| --- | --- |
| Domanda sugli orari | Risposta Lun–Ven a due fasce (mattina e pomeriggio) da knowledge base |
| “Siete aperti adesso?” | Confronto con data/ora locale e fasce pubblicate; niente orario continuato |
| Apertura al sabato | Non inventa; spiega che risultano pubblicati solo gli orari Lun–Ven |
| Dove siete / che numero | Via 1 Maggio 11, Osio Sopra (provincia di Bergamo); numeri da knowledge base |

### Servizi e prezzi listino

| Scenario | Cosa è stato controllato |
| --- | --- |
| Prezzo cambio gomme (cerchi 17”) | Prezzo listino corretto per fascia; senza scaricare tutto il catalogo |
| Convergenza e deposito | Conferma servizi presenti in knowledge base |
| Costo reset sensori TPMS | Conferma servizio; non inventa un prezzo assente dal listino |

### Preventivo pneumatici

| Scenario | Cosa è stato controllato |
| --- | --- |
| Richiesta preventivo per gomme nuove | Raccoglie i campi del form sito (misura, stagionalità, mezzo, modello), una domanda per volta; conferma che lo staff prepara il preventivo; niente mail/ticket automatici né prezzi prodotto inventati |

### Appuntamenti e passaggio a persona

| Scenario | Cosa è stato controllato |
| --- | --- |
| Prenotazione giorno/ora | Non conferma lo slot; spiega che non fissa appuntamenti in chiamata |
| Richiesta operatore | Accetta il passaggio senza litigare e senza nomi tecnici di sistema |

### FAQ pneumatici

| Scenario | Cosa è stato controllato |
| --- | --- |
| Obbligo gomme invernali | Date da FAQ (15 novembre–15 aprile o catene) |
| Quattro stagioni e millimetri | Circolazione tutto l’anno; soglia legale 1,6 mm |

### Canale voce

| Scenario | Cosa è stato controllato |
| --- | --- |
| Risposte a voce | Frasi brevi, una domanda per turno, senza leggere URL o nomi di tool |

---

## Interventi sul prompt legati ai test / feedback

| Tema | Intervento verificato |
| --- | --- |
| Orari | Due fasce esplicite; divieto di dire “orario continuato” |
| Sabato / festivi | Trattati come non pubblicati; niente inferenza di chiusura |
| Preventivo | Form del sito come testo: chiusura solo dopo misura, stagionalità, mezzo e modello |
| Indirizzo | Via 1 Maggio (invece della grafia “I Maggio”) |

---

## Note tecniche (KB / tool / piattaforma)

- Tools attivi: ricerca knowledge base e data/ora corrente. Nessun ticket né invio mail in questa versione.
- Upload Spoki: file `.txt` e `.csv` (non `.md`).
- Copia attuale su account playground 9968; da clonare/sostituire sull’account cliente **55247** quando si va live.
- Canale voce / numero virtuale sul cliente da verificare in fase di go-live.

---

## Esito

Gli scenari elencati risultano **verificati** sul playground.

**Operatività consigliata:** mantenere prompt e KB aggiornati su Spoki; clonare l’agente sull’account 55247; verificare canale Voice (numero e inoltro); eventuale twin testuale per re-test rapidi futuri.
