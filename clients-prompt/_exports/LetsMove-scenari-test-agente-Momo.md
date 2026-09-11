# Let’s Move — Scenari di test dell’assistente WhatsApp

**Agente:** Momo (danza + pacchetti fitness)  
**Account Spoki:** Letsmoveasd  
**Data verifica:** 31 luglio 2026  
**Ambiente:** playground di test

---

## Contesto

È stato configurato e verificato il nuovo assistente conversazionale WhatsApp per Let’s Move. Il lavoro ha incluso:

1. **Prompt operativo** allineato al tono e alle regole di Let’s Move (risposte brevi, prosa WhatsApp, nessun elenco tecnico, nessun presentarsi come intelligenza artificiale).
2. **Rimaneggiamento del prompt** a partire dal feedback ricevuto: meno ticket automatici su richieste banali o informazioni assenti; trasferimento allo staff solo quando serve (operatore richiesto, rimborsi, iscrizioni/prove da attivare, reclami formali).
3. **Knowledge base unica** aggregata e ripulita (un solo file fattuale in Spoki): sedi, orari, listini fitness e danza, promozioni, Bonus FAMILY, Prova Avvio, regole App, regolamento. I frammenti precedenti sono archiviati e non caricati sull’agente.

Gli scenari sotto sono stati eseguiti sul playground con il prompt e la KB aggiornati. Tutti risultano **verificati**.

---

## Cosa è stato verificato

### Accoglienza e stile

| Scenario | Cosa è stato controllato |
| --- | --- |
| Saluto iniziale | Accoglienza cordiale con nome contatto; nessun riferimento a bot o AI |
| Messaggio in inglese | Risposta nella lingua dell’utente |
| Forma delle risposte | Prosa naturale, senza elenchi markdown o tabelle in chat |
| Lunghezza dei messaggi | Risposte sintetiche, adatte a WhatsApp |

### Pacchetti fitness e promozioni

| Scenario | Cosa è stato controllato |
| --- | --- |
| Domanda generica sul prezzo dei pacchetti | Chiede la frequenza di allenamento prima di proporre; non scarica tutto il listino |
| Allenamento una volta a settimana | Propone il pacchetto coerente (35 ingressi) |
| Somma di più promozioni | Spiega che le promozioni non sono cumulabili |
| Bonus famiglia / iscrizione in due | Spiega correttamente Bonus FAMILY e omaggi collegati |
| Prenotazione lezione in chat | Non conferma lo slot; indirizza all’App |
| Disdetta tardi e cessione ingresso | Regole 8 ore, scalatura ingresso, ingressi non cedibili |
| Sedi e Prova Avvio | Indirizzi e spiegazione della prova gratuita |
| Orari Pilates a Cassago | Solo giorni e fasce presenti in knowledge base |
| Orari Pilates a Veduggio | Solo giorni e fasce presenti in knowledge base |

### Danza

| Scenario | Cosa è stato controllato |
| --- | --- |
| Interesse danza senza età | Spiegazione breve e richiesta dell’età |
| Figlia di 6 anni — costo danza moderna | Propone Primary; prezzi standard corretti alla data del test |
| Orari danza moderna Grado 1 a Veduggio | Lunedì e giovedì 17:00–18:30 |
| Link del sito e sedi | Solo URL e sedi da knowledge base, senza inventare |

### App e prova gratuita

| Scenario | Cosa è stato controllato |
| --- | --- |
| Come scaricare e usare l’App | Codice App, prenotazione da 7 giorni prima, disdetta entro 8 ore; avviso di non attivare l’App da soli in fase di prova |
| Richiesta Prova Avvio | Spiegazione prova, raccolta dati un campo alla volta, trasferimento allo staff a fine raccolta |
| Prenotazione prova (flusso iscrizione) | Allineato al flusso Prova Avvio; nessuna prenotazione inventata in chat |

### Assistenza, reclami e rimborsi

| Scenario | Cosa è stato controllato |
| --- | --- |
| Lamentela generica sull’organizzazione | Empatia e chiarimento in chat; **nessun** ticket automatico |
| Richiesta esplicita di parlare con un operatore (dopo lamentela) | Solo allora trasferimento allo staff |
| Richiesta di parlare con la direzione | Trasferimento allo staff con conferma |
| Richiesta di rimborso | Cita regolamento (assenze senza rimborso; recesso 8 giorni / penale 10%); chiede conferma prima del passaggio allo staff |
| Dopo il passaggio allo staff, insiste per risolvere in chat / rimborso immediato | Non negozia il rimborso; conferma che gestisce la direzione |
| “Mi rimborsate subito?” (controllo successivo al fix) | Stesso comportamento: regolamento + conferma, poi trasferimento |

### Guardrail e casi limite

| Scenario | Cosa è stato controllato |
| --- | --- |
| Corso o prezzo assente dalla knowledge base | Ammette di non avere l’informazione; resta in chat; **nessun** ticket automatico |
| “Sei un’intelligenza artificiale?” | Non conferma di essere AI; resta nel ruolo di Momo / Let’s Move |
| Richiesta vaga (“info sui corsi”) | Una sola domanda di chiarimento (es. fitness vs danza) |
| “C’è yoga oggi?” | Usa data/ora corrente e orari reali; nessun orario inventato |

---

## Interventi sul prompt legati al vostro feedback

| Tema feedback | Intervento verificato |
| --- | --- |
| Troppi ticket su richieste banali o lamentele leggere | Lamentela generica gestita in chat; trasferimento solo se l’utente chiede un operatore |
| Ticket su informazioni non presenti | Domanda su corso inesistente: risposta di gap in chat, senza aprire segnalazione |
| Rimborsi e direzione | Restano in carico allo staff (con citazione del regolamento quando pertinente) |

---

## Knowledge base

- Un **unico file** fattuale caricato in Spoki (sedi Veduggio e Cassago, danza, fitness, promozioni, Prova Avvio, App, regolamento).
- Istruzioni operative rimosse dalla KB (restano nel prompt).
- Frammenti storici archiviati e **non** usati dall’agente live.

---

## Esito

Tutti gli scenari elencati risultano **verificati** sul playground di test con prompt e knowledge base aggiornati al 31 luglio 2026.

Per eventuali nuovi corsi, prezzi o promozioni non ancora in knowledge base, l’assistente ammette il gap e può passare allo staff solo su richiesta esplicita o nei casi previsti (rimborsi, iscrizioni/prove, reclami formali).
