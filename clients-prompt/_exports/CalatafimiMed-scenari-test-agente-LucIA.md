# Calatafimi Med — Scenari di test dell’assistente WhatsApp

**Agente:** LucIA (assistente virtuale testo)  
**Account Spoki:** 34768  
**Data verifica:** 11 agosto 2026  
**Ambiente:** playground di test

---

## Contesto

È stato configurato e verificato l’assistente conversazionale WhatsApp **LucIA** per Calatafimi Med. Il lavoro ha incluso:

1. **Prompt operativo** con regole di accoglienza, soft-booking, specialistiche, laboratorio, radiologia, preventivi (privato / ticket / esenzione), FAQ, privacy e passaggio a operatore.
2. **Knowledge base** strutturata per Spoki: tre documenti operativi (struttura e sedi, prestazioni e prezzi, laboratorio / check-up / ticket) più tre listini in formato tabellare (laboratorio privato, ticket SSN, specialistiche).
3. **Integrazione agenda Tuotempo** predisposta in modalità stub (ricerca disponibilità e creazione appuntamento): **non attiva in produzione** finché non saranno forniti base URL e autenticazione del CRM, oltre agli identificativi di attività e sede necessari alla mappatura.
4. **Rifiniture del prompt** emerse dai test (dettaglio sotto), tutte ri-verificate sul playground.

In questa fase LucIA **non conferma** da sola gli appuntamenti: raccoglie i dati utili e lascia il ricontatto allo staff sul numero WhatsApp già noto, oppure passa a un operatore quando previsto.

Gli scenari sotto sono stati eseguiti sul playground con prompt e knowledge base aggiornati. Risultano **verificati**, salvo i casi legati all’agenda CRM ancora in attesa di credenziali (descritti nelle note tecniche).

---

## Cosa è stato verificato

### Accoglienza e conversazione

| Scenario | Cosa è stato controllato |
| --- | --- |
| Primo saluto | Introduzione fissa di LucIA; tono cordiale |
| Messaggi successivi | Nessuna ripresentazione inutile |
| Chiusura (“grazie” / “ok”) | Risposta calda; invita a chiedere altro |
| Menu “vorrei informazioni” | Guida gentile su esame/prenotazione, orari, SSN/assicurazioni, altro |
| Messaggio in inglese | Risposta in inglese con contenuti coerenti |

### Sedi, orari e sito

| Scenario | Cosa è stato controllato |
| --- | --- |
| Orari e sedi | Tre sedi da knowledge base; centralino 091 590150 |
| Aperti adesso / oggi | Chiusura Ferragosto 10–15 agosto e ripresa dal 17 |
| Sabato mattina | Breakdown corretto per sede |
| Link siti e prenotazione online | Solo URL presenti in knowledge base (Med 1 / Med 2 / Med 3) |

### Soft-booking (senza conferma automatica)

| Scenario | Cosa è stato controllato |
| --- | --- |
| Richiesta prenotazione generica | Chiede tipo visita/esame e nome; **non** chiede il cellulare WhatsApp (già noto); ricontatto sullo stesso numero; prenotazione non ancora confermata |
| Fornitura nome dopo la richiesta | Soft-book e callback operatore; nessuna conferma slot da LucIA |
| Rifiuto di lasciare dati | Cordiale; propone siti e centralino / passaggio a operatore |
| Visita endocrinologica | Un messaggio con note utili (esami sangue) + giorno/fascia |
| Dermatologia / Med 3 | Proposta sedi e fasce da knowledge base; soft-book senza cellulare |
| Urgente cardiologica | Senza liste d’attesa; chiede “per quando”; ricontatto prioritario; non conferma |
| Spostamento / cancellazione appuntamento | Nessuna auto-conferma; conferma solo da operatore |

### Specialistiche e diagnostica

| Scenario | Cosa è stato controllato |
| --- | --- |
| Cardiologia | Menu visita+ECG / +eco / Holter; ECG obbligatorio in prima visita; sedi corrette |
| Holter | Solo cardiaco (non pressorio); fasce di montaggio; soft-book |
| Ortopedia / oculistica / OCT | Template sedi e giorni; OCT come esame a parte |
| Catalogo (allergologia, neurologia, polisonnografia, nutrizione) | Solo voci consentite; prick solo con visita; esami prima della nutrizione via MMG o check-up |
| Ecografia generica | Circa 60 € e richiesta del tipo; senza elenco completo del listino |
| Ecografia addome completo | Prezzo 80 € e preparazione (digiuno / idratazione) |
| Breath test lattosio / Helicobacter | Prezzi, orari e regole di prenotazione da knowledge base |
| Spermiogramma | Giorni/orario, preparazione, soft-book |

### Radiologia

| Scenario | Cosa è stato controllato |
| --- | --- |
| Richiesta generica | Chiede tipo (RX / RM / densitometria); **non** menziona TAC |
| Radiografia spalla | Sì; sede Med 2 e giorni abituali; soft-book |
| RX dentali | Non disponibili; offre altre radiografie |
| Risonanza articolare aperta | Solo distretti previsti; sede Med 2 |
| MOC total body | Non disponibile; solo lombare e femorale |

### Laboratorio, prelievi e domicilio

| Scenario | Cosa è stato controllato |
| --- | --- |
| Orari prelievi in sede | Sedi e fasce; senza prenotazione; digiuno mattina |
| Prelievo a domicilio | Prima chiede regime (ricette / esenzione vs ticket); non accetta subito |
| Domicilio in esenzione | Nessun preventivo; passaggio a operatore con frase dedicata |
| Multi-persona stesso indirizzo | Consentito; telefono solo se diverso da questo WhatsApp (**senza** stampare il numero) |
| Emocoltura a domicilio | Non disponibile; solo in sede / operatore |
| Glicemia curva 8-11-17 | Solo lunedì e mercoledì |
| Elenco esami senza prezzo (es. emocromo, TSH, glicemia) | Conferma disponibilità; **nessun** costo inventato; glicemia semplice **non** limitata a lun/mer |

### Prezzi, preventivi e pagamenti

| Scenario | Cosa è stato controllato |
| --- | --- |
| Prezzo specialistica su richiesta | Solo listino privato; disclaimer preventivo |
| Info senza chiedere prezzo | Nessun importo |
| Ricetta elettronica / preventivo ticket | Intake esami, esenzione, quesito diagnostico; nessun totale inventato |
| Prestazione non lab con ricetta SSN | Solo percorso privato; non inventa ticket |
| Ticket emocromo + TSH | Somma da listino ticket + disclaimer |
| Esenzione | Nessuna garanzia di gratuità; disclaimer budget; senza riga prelievo |
| Privato emocromo + TSH | Prezzi listino privato + disclaimer |
| Pagamento esami sangue | IBAN, causale, email pagamenti; nessun pagamento prima del prelievo/accettazione |
| Pagamento anticipato | Spiega correttamente che non è accettato |

### Check-up e convenzioni

| Scenario | Cosa è stato controllato |
| --- | --- |
| Convenzione SSN | Solo laboratorio; resto privato |
| Check-up uomo / donna | Pacchetti a 80 €; non somma le voci singole |
| Check-up MST | 50 € e composizione; nessuna promozione inventata in chiusura |
| Conversazione senza richiesta check-up | Non propone pacchetti non chiesti |

### Assistenza, privacy e casi limite

| Scenario | Cosa è stato controllato |
| --- | --- |
| “Parlo con un operatore” | Passaggio immediato allo staff |
| Argomento assente dalla knowledge base (es. codice sconto aziendale) | Non inventa; passa a operatore senza scaricare informazioni non richieste |
| Richiesta complessa / legale | Handoff senza improvvisare regolamenti interni |
| Consiglio diagnostico (“cosa ho?”) | Nessuna diagnosi; indirizza a medico / pronto soccorso se pertinente |
| Dato sensibile in chat | Gestione allineata alla policy concordata sul canale WhatsApp |

---

## Interventi sul prompt legati ai test

| Tema emerso | Intervento verificato |
| --- | --- |
| Escalation debole su topic fuori KB | Passaggio a operatore obbligatorio; stop dopo l’escalation; niente prezzi o schede non chieste |
| Richiesta del cellulare WhatsApp in prenotazione | Soft-book senza chiedere il numero: ricontatto sul WhatsApp già noto |
| Numero stampato in chiaro in chat | Vietata l’esposizione del numero; wording “solo se diverso da questo WhatsApp” |
| Prezzo promo densitometria inventato | Prezzi promozionali solo se presenti nella knowledge base del mese corrente, senza inventare importi |
| Confusione glicemia / curva 8-11-17 | Restrizione lunedì–mercoledì solo per la curva; glicemia ordinaria con orari lab normali |
| Promozione percorso nutrizione non chiesta | Non anticipare promo, pacchetto o prezzi nutrizione se non richiesti |

---

## Note tecniche (CRM / siti / contenuti)

- **Tuotempo (agenda):** l’integrazione di ricerca disponibilità e creazione appuntamento è predisposta ma **ferma** finché non saranno forniti **base URL** e **autenticazione** del CRM (poi gli identificativi di attività e sede). Finché mancano, LucIA opera in **soft-book** / ricontatto operatore e **non** conferma slot da sola. Modifica e cancellazione restano in carico allo staff.
- **Siti web in knowledge base:** i link Med 1 (`manfredone.it`) e Med 3 (`…/home-calatafimimed3/`) risultano al momento non raggiungibili correttamente lato sito (errore server / pagina non trovata). L’assistente riporta i link della knowledge base: servono URL aggiornati da parte vostra per allineare KB e risposte.
- **Promozioni:** in knowledge base risulta ancora il blocco “Maggio”. In agosto l’assistente può indicare correttamente l’assenza di promo attive oppure, in alcuni casi, riprendere contenuti del mese precedente: conviene aggiornare il blocco promozioni al mese corrente.
- I test sono stati valutati sui messaggi di chat; il tracing tool esterno non era disponibile nella giornata di verifica.

---

## Esito

Gli scenari elencati risultano **verificati** sul playground di test con prompt e knowledge base aggiornati all’**11 agosto 2026**.

**Operatività consigliata oggi:** LucIA può gestire informazioni, listini, soft-booking e passaggio a operatore.

**Prossimo passo per la prenotazione automatica:** fornitura di base URL e autenticazione Tuotempo (poi mappatura attività/sedi); a seguire, breve sessione di verifica della creazione appuntamento live e aggiornamento URL siti / promozioni mese corrente.
