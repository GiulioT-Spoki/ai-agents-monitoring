# Casp — Aggiornamenti Knowledge Base e system prompt

**Account Spoki:** 53298 — Centro Applicazioni per la Sanità Pubblica (Casp)  
**Agente:** [Playground: Centro Unico Prenotazioni v.5](https://app.spoki.com/ai/agent/e01eb336-60f7-434d-92dd-b54f050edfdf)  
**Data:** 8 settembre 2026

Documento di sintesi su cosa è stato rimosso dalla Knowledge Base dell'agente, come è stato riscritto il system prompt e per quale motivo. Include gli esiti dei test eseguiti in playground, i punti ancora aperti e una decisione richiesta a Casp (sezione 7).

Non include la configurazione delle automazioni Spoki né la preparazione dei calendari, che restano attività lato Casp.

---

## 1. Cosa è cambiato, in una pagina

Fino alla versione precedente l'agente decideva le date leggendo un file dinamico caricato in Knowledge Base: una riga per data, con una colonna che indicava il numero di infermieri programmati. Quel file era la fonte unica delle disponibilità e il prompt vietava esplicitamente all'agente di interrogare Google Calendar per cercare date libere.

Le indicazioni ricevute dal Casp l'8 settembre hanno rovesciato il modello. Le date devono ora arrivare esclusivamente da Google Calendar, tramite lo strumento di disponibilità collegato ai calendari dedicati "Prenotazioni Spoki - Linea N".

I due modelli non possono coesistere. Il file delle disponibilità conteneva l'istruzione di non chiamare mai lo strumento di disponibilità di Calendar, cioè esattamente l'operazione che il nuovo modello richiede a ogni prenotazione. Tenere entrambe le fonti avrebbe prodotto risposte diverse a seconda di quale regola l'agente avesse recuperato per prima.

Di conseguenza il file delle disponibilità e il foglio delle turnazioni sono stati staccati dall'agente, e tutta la logica delle date è stata riscritta dentro il system prompt.

---

## 2. Knowledge Base: cosa è stato staccato

### File rimossi dall'agente

| File | Contenuto | Motivo della rimozione |
| --- | --- | --- |
| Regole disponibilità | Giorni prenotabili, chiusura giornata, richieste per oggi e per domani, interpretazione del foglio turni | Vietava la chiamata di disponibilità su Calendar, oggi obbligatoria |
| Foglio turnazioni (CSV) | Una riga per data con il numero di infermieri programmati | Non è più la fonte delle date. Il numero veniva inoltre letto come capacità prenotabile, cosa che non era |

Il numero di infermieri indicava solo quanti operatori erano programmati quel giorno, non quanti appuntamenti fossero ancora liberi. Nel nuovo modello la capacità è un dato oggettivo e verificabile: dieci accessi al giorno per Linea, ciascuno corrispondente a un intervallo di quindici minuti sul calendario.

### Regole recuperate e spostate nel prompt

Non tutto il contenuto dei file rimossi era legato alle turnazioni. Tre regole erano valide e sono state riscritte dentro il system prompt, così da non perderle:

- comportamento nel giorno del servizio: presenza di chi consente l'accesso, reperibilità del recapito telefonico, gestione delle attese
- appuntamenti ricorrenti o periodici: sempre passaggio all'operatore Casp
- preferenza di orario espressa dall'assistito: si registra come nota operativa, non è una garanzia e non cambia la disponibilità di una data

### Knowledge Base che resta collegata

Cinque file di policy più il nomenclatore:

| File | Ambito |
| --- | --- |
| Informazioni, copertura e costi | Contatti, orari amministrativi, comuni serviti, Posizione WhatsApp, tariffe urbano ed extraurbano, ticket e solvenza, modalità di pagamento |
| Prescrizioni e validità | Tipi di ricetta, NRE, ricette manoscritte, assenza di prescrizione, validità 180 giorni SSN e 2 anni privata |
| Esami e preparazione | Esami a organizzazione speciale, esami non eseguibili a domicilio, pediatria, digiuno, campioni |
| Dati prenotazione | Checklist dei dati necessari prima di creare l'appuntamento |
| Referti, modifiche e reclami | Consegna referti, variazioni dopo la creazione, reclami e rimborsi |
| Tariffario esami (CSV) | Nomenclatore con tariffe e note, base per la stima del ticket |

Da questi file sono state ripulite le righe residue che rimandavano ancora al foglio turnazioni come fonte delle date.

---

## 3. System prompt: il nuovo comportamento sul calendario

La logica delle date vive ora in un unico posto, il system prompt. Questi sono i comportamenti introdotti.

**Fonte delle disponibilità.** Solo i calendari "Prenotazioni Spoki - Linea N". Il calendario "Conclusi Casp" non viene mai interrogato per cercare slot né usato per creare appuntamenti: resta riservato alle operazioni manuali del personale.

**Capacità.** Ogni Linea vale dieci domicili al giorno, rappresentati da dieci intervalli tecnici da quindici minuti tra le 06:00 e le 08:30. Uno slot corrisponde a un accesso al domicilio, non a un paziente: due assistiti allo stesso indirizzo occupano un solo slot e un solo evento.

**Come si aggiunge una Linea.** Una Linea corrisponde a uno strumento Calendar collegato a un calendario, su un agente. Non esiste una scelta automatica dell'agente fra Linea 1 e Linea 2 all'interno della stessa configurazione: per attivare una seconda Linea si crea un secondo strumento, collegato al calendario "Prenotazioni Spoki - Linea 2", su un secondo agente.

**Cosa viene comunicato all'assistito.** Solo la data, e solo dentro la conversazione WhatsApp: è l'unico canale con cui l'assistito riceve la conferma. Lo slot tecnico, l'orario dell'evento e il nome della Linea non compaiono mai nei messaggi. Se l'assistito chiede l'ora, la risposta è che il passaggio viene assegnato e comunicato successivamente dal personale Casp. L'assistito non ha accesso al calendario del servizio e non riceve alcun promemoria sul proprio calendario: si veda la sezione 7.

**Nessun invito.** L'evento è interno a Casp. Né il numero WhatsApp né eventuali indirizzi email vengono aggiunti come invitati. Questo corregge il comportamento della versione precedente, che inseriva l'email del contatto tra i partecipanti. La conseguenza operativa di questa scelta è descritta nella sezione 7.

**Titoli degli eventi.** Nome e cognome del primo assistito, con un "+ 1" per ogni paziente aggiuntivo allo stesso domicilio. Il suffisso "(ticket)" segnala il ticket sanitario SSN e non il costo del servizio Casp: un assistito in solvenza non genera quel suffisso.

**Giorni chiusi.** Un evento intitolato "NON DISPONIBILE" occupa la fascia e rende la data non proponibile. Può coprire l'intera mattina per chiudere la giornata, oppure solo alcuni intervalli.

**Paziente aggiunto dopo la prenotazione.** L'evento originale non viene toccato. Viene creato un evento aggiuntivo a partire dalle 08:30, fuori dai dieci slot ordinari, con il titolo preceduto da ">>>!!!" e l'elenco completo dei pazienti di quel domicilio. Così la capacità già consumata resta corretta e il personale vede subito che si tratta di un'aggiunta.

**Richieste ravvicinate.** Le richieste per oggi passano sempre all'operatore. Domani è prenotabile in autonomia solo se la richiesta arriva prima delle 09:00 del giorno precedente.

**Dopo la creazione.** Qualsiasi variazione di data, indirizzo, recapito, referto o esami viene gestita dal personale Casp. L'unica eccezione è l'aggiunta di un altro assistito allo stesso domicilio.

---

## 4. Correzioni introdotte con la versione 5

I test in playground hanno fatto emergere quattro problemi concreti, tutti corretti nel prompt.

**Nomi degli strumenti.** Il prompt citava nomi generici mentre la piattaforma espone nomi diversi per la ricerca disponibilità e la creazione evento. L'agente li individuava comunque, ma il prompt è stato allineato ai nomi reali per togliere ambiguità.

**Durata degli slot.** Lo strumento di disponibilità usa quindici minuti solo se il parametro viene passato esplicitamente, altrimenti il valore predefinito è trenta. Nella prima ricerca l'agente aveva interrogato più giornate intere senza indicare la durata, ottenendo intervalli non allineati alla capacità Casp. Il prompt ora impone la durata di quindici minuti e la finestra 06:00–08:30 su ogni chiamata, compresa la prima ricerca della data.

**Fuso orario.** In una creazione l'agente aveva scritto l'orario di inizio con il suffisso UTC. Un 06:00 espresso in UTC corrisponde alle 08:00 italiane, quindi l'appuntamento sarebbe finito a fine fascia invece che all'inizio. Il prompt ora richiede orari in ora locale Europe/Rome e vieta il suffisso UTC.

**Doppia prenotazione.** Alla ripetizione di un "ok prenota" già confermato, l'agente aveva creato un secondo evento identico. Google Calendar accetta eventi sovrapposti e restituisce comunque un esito positivo, quindi l'errore non era visibile dallo strumento: nell'agenda comparivano due appuntamenti sullo stesso quarto d'ora. La regola anti-duplicato era presente ma troppo debole. Ora una creazione riuscita chiude il flusso: le conferme ripetute sono trattate come presa d'atto e l'unica seconda creazione ammessa è l'evento aggiuntivo per un nuovo paziente.

---

## 5. Esiti dei test in playground

Tutti gli scenari sono stati eseguiti l'8 settembre 2026 sull'agente di test, con dati fittizi e una ricetta di prova. Legenda: superato, superato con riserva, non superato, non eseguito.

### Accoglienza, informazioni e passaggio all'operatore

| Scenario | Cosa verifica | Esito | Evidenza |
| --- | --- | --- | --- |
| Messaggio generico | Saluto coerente con l'ora, ringraziamento, una sola domanda, nessun riferimento a intelligenza artificiale | Superato | "Buongiorno" più ringraziamento Casp e una domanda |
| Richiesta di prelievo | Ricetta chiesta subito, dati letti dal documento, una domanda per messaggio | Superato | Codice fiscale e NRE estratti dalla ricetta senza richiederli. In versione 4 poneva due domande nello stesso messaggio |
| Orari amministrativi | Risposta dalla Knowledge Base, senza confondere gli orari di sportello con la fascia dei prelievi | Superato | Lunedì-sabato 09:00-12:00, prelievi trattati a parte |
| Richiesta di operatore | Passaggio effettivo prima di annunciarlo, poi stop | Superato | Strumento di trasferimento chiamato, poi messaggio |

### Prenotazione e calendario

| Scenario | Cosa verifica | Esito | Evidenza |
| --- | --- | --- | --- |
| Percorso completo fino alla creazione | Sequenza dei dati, costo corretto, data da calendario, una sola creazione, conferma solo dopo esito positivo | Superato con riserva | Evento 10 settembre 06:15-06:30, titolo con "(ticket)". Riserva: NRE e recapito telefonico dati per acquisiti invece che confermati |
| Slot corretto | Intervallo da quindici minuti dentro la fascia, mai un orario fisso | Superato | Primo intervallo effettivamente libero, con il precedente già occupato |
| Nessun invitato | Evento privo di partecipanti | Superato | Nessun invitato nella creazione |
| Nessun orario all'assistito | Mai slot, mai orario di calendario, mai nome della Linea | Superato con riserva | Comunicata solo la data. Riserva: l'espressione "fascia oraria mattutina" prima della conferma |
| Anti-duplicato | Una conferma ripetuta non deve creare un secondo appuntamento | Superato in versione 5 | In versione 4 secondo evento identico sullo stesso quarto d'ora. In versione 5 nessuna creazione, risposta di presa d'atto |
| Costi | Servizio Casp e ticket sanitario distinti, stima dichiarata non ufficiale | Superato | 15 euro Monopoli urbano più ticket stimato 12,05 euro, importo ufficiale rimandato a CUP e PagoPA |

### Politiche sulle date

| Scenario | Cosa verifica | Esito | Evidenza |
| --- | --- | --- | --- |
| Richiesta per oggi | Passaggio all'operatore anche in presenza di slot liberi | Superato | Trasferimento, nessuna creazione, oggi mai proposto |
| Richiesta per domani dopo le 09:00 | Passaggio all'operatore | Superato | Trasferimento, nessuna prenotazione autonoma |
| Giornata chiusa con "NON DISPONIBILE" | Data non proposta, ricerca della prima data utile | Non eseguito | Richiede un giorno preparato sul calendario Casp (vedi sezione 6) |
| Giornata piena | Data non proposta, passaggio alla successiva | Non eseguito | Richiede dieci slot occupati sulla Linea (vedi sezione 6) |

### Più assistiti allo stesso domicilio

| Scenario | Cosa verifica | Esito | Evidenza |
| --- | --- | --- | --- |
| Due assistiti, stesso indirizzo e stessa data | Un solo slot e un solo evento, dati separati, costo per ciascuno | Superato con riserva | Un evento 06:30-06:45, titolo con "+ 1 (ticket)", 15 più 15 euro. Riserva: nella descrizione i dati del primo assistito non sono stati riportati per intero |
| Terzo assistito aggiunto dopo la creazione | Evento aggiuntivo dopo le 08:30 con prefisso, evento originale invariato | Superato con riserva | Evento 08:30-08:45 con prefisso ">>>!!!" e tre assistiti, originale intatto, all'assistito comunicata solo la data. Stessa riserva sulla descrizione |

### Giorno del servizio

| Scenario | Cosa verifica | Esito | Evidenza |
| --- | --- | --- | --- |
| Attesa in mattinata | Non inventa posizione né orario del personale, passaggio all'operatore | Superato | Trasferimento e messaggio senza alcun riferimento inventato al percorso dell'infermiere |

---

## 6. Punti aperti

### Cosa serve da Casp

Le prime due voci riguardano la configurazione dell'integrazione Google e l'accesso ai calendari del servizio: non sono verificabili dall'interfaccia dell'agente e restano in carico a Casp.

**1. Calendario collegato agli strumenti.** Durante la prima ricerca sono risultati occupati due intervalli alle 09:30, fuori dalla fascia operativa del servizio. Va confermato che sia lo strumento di disponibilità sia quello di creazione puntino al calendario "Prenotazioni Spoki - Linea 1", e non a un calendario primario o personale. Se il calendario collegato contiene impegni estranei al prelievo domiciliare, la disponibilità mostrata all'assistito è falsata. Va inoltre confermato che "Conclusi Casp" non sia selezionabile su nessuno dei due strumenti.

**2. Due giornate di prova sul calendario.** Restano da verificare gli ultimi due scenari, che richiedono situazioni preparate sulla Linea 1:

- un giorno futuro con un evento intitolato "NON DISPONIBILE" che copre l'intera fascia 06:00–08:30, per confermare che quella data non venga proposta
- un altro giorno con tutti e dieci gli intervalli occupati, per confermare il passaggio automatico alla data successiva

Una volta preparate le due giornate, la verifica in playground richiede pochi minuti.

**3. Eventi di test da rimuovere.** Sul 10 settembre restano gli appuntamenti creati durante le prove, compreso l'evento aggiuntivo con prefisso. Vanno cancellati, altrimenti occupano capacità reale.

### Residui noti sul comportamento

**Descrizione evento con più assistiti.** Nelle prenotazioni multiple la scheda del primo assistito è risultata incompleta: alcuni dati già presenti in conversazione non sono stati riportati nella descrizione dell'evento. Il personale vede correttamente titolo, indirizzo, data e numero di pazienti, ma per il primo assistito può dover recuperare i dati dalla conversazione.

**Formule di cortesia.** In più risposte compare l'espressione "fascia oraria mattutina". Non espone lo slot tecnico né il nome della Linea, quindi non viola la regola sull'orario, ma è comunque più di quanto previsto, che sarebbe la sola data.

---

## 7. Promemoria sul calendario dell'assistito: decisione richiesta

Questa sezione non descrive un problema da correggere, ma la conseguenza diretta di due indicazioni ricevute, e la scelta che ne deriva.

### Come funziona oggi, su vostra richiesta

È stato chiesto di non aggiungere alcun invitato agli eventi Calendar e di non comunicare mai all'assistito l'orario tecnico dell'appuntamento. Entrambe le regole sono attive e verificate.

Di conseguenza l'assistito riceve la conferma della prenotazione **solo** come messaggio WhatsApp, con la sola data. Sul calendario personale dell'assistito non compare e non comparirà nulla.

### Perché non è aggirabile

Un invito Google Calendar viene recapitato a un indirizzo email: è l'unico identificativo che Google accetta per aggiungere una persona a un evento. Non esiste modo di scrivere sul calendario di qualcuno partendo da un numero di telefono o da una conversazione WhatsApp.

Poiché l'email non è tra i dati obbligatori della prenotazione, nella maggior parte dei casi l'assistente non la possiede. Senza email non c'è invito, e senza invito non c'è promemoria sul calendario dell'assistito.

C'è inoltre un secondo vincolo, indipendente dal primo. Un invito Calendar mostra sempre l'ora di inizio dell'evento. Invitare l'assistito sull'evento tecnico significherebbe comunicargli le 06:15, cioè esattamente l'orario che non deve conoscere, con il rischio che si aspetti il passaggio a quell'ora mentre il personale lo assegna successivamente.

### Le tre opzioni

**A. Lasciare come oggi.** Nessun invito, conferma su WhatsApp con la sola data. Nessun dato aggiuntivo da raccogliere. L'assistito non ha alcun promemoria sul proprio calendario. È la configurazione attualmente attiva.

**B. Promemoria senza orario.** L'email diventa un dato da chiedere in fase di prenotazione. Oltre all'evento tecnico interno viene creato un secondo evento **su tutta la giornata**, con invito all'assistito. L'assistito vede il promemoria del giorno del prelievo, senza alcun orario, e la regola sull'orario tecnico resta rispettata. Richiede di reintrodurre la raccolta dell'email e di modificare il flusso di prenotazione.

**C. Invito sull'evento tecnico.** L'assistito riceve l'invito all'appuntamento reale e vede l'orario esatto dello slot. Contraddice la regola sull'orario tecnico e va contro l'organizzazione attuale del servizio. Sconsigliata.

La scelta tra A e B è di Casp, perché B cambia i dati obbligatori richiesti all'assistito durante la prenotazione. Fino a diversa indicazione resta attiva l'opzione A.

---

*Documento generato per allineamento cliente e operations. Riferimento tecnico: Knowledge Base e system prompt sincronizzati sull'agente Playground: Centro Unico Prenotazioni v.5.*
