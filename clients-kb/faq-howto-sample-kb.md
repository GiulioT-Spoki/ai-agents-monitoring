# Knowledge Base FAQ – ACME SRL (servizio fittizio)

> Dati, prezzi, recapiti e policy sono inventati a scopo di mockup.

Sample KB for the generic FAQ agents:
- Text: `text-agents-prompts/faq-text-inbound.md`
- Voice: `voice-agents-prompts/faq-voice-inbound.md`

Replace with the customer's real documentation before go-live. Facts only — no agent instructions.

---

## Account e Area Clienti

### FAQ-001 · Come mi registro all'Area Clienti o all'app ACME?

**Varianti:** Come creo un account online? | Dove scarico l'app? | Non ho ancora accesso all'area riservata

Scarica l'app ACME (iOS e Android) o vai su acme-demo.example/area-clienti e scegli 'Registrati'. Ti servono il codice cliente (lo trovi in alto a destra nella fattura o nella mail di benvenuto), il codice fiscale dell'intestatario e un indirizzo email. Riceverai un link di conferma valido 24 ore.

*Tag:* registrazione, app

### FAQ-002 · Ho dimenticato la password, come la recupero?

**Varianti:** Non riesco ad accedere | Reset password | Password sbagliata, account bloccato

Nella schermata di accesso tocca 'Password dimenticata?' e inserisci l'email di registrazione: riceverai un link valido 60 minuti. Se non arriva, controlla lo spam. Dopo 5 tentativi errati l'account si blocca per 30 minuti per sicurezza. Se non hai più accesso all'email registrata, serve un operatore per verificare la tua identità.

*Escalation:* Email di registrazione non più accessibile: richiede verifica identità.

*Tag:* password, accesso

### FAQ-003 · Dove trovo il mio codice cliente?

**Varianti:** Qual è il mio numero cliente? | Codice contratto | Mi chiedono il codice cliente

Il codice cliente (formato AC seguito da 8 cifre, es. AC12345678) si trova in alto a destra in ogni fattura, nella mail di benvenuto e nella sezione 'Profilo' dell'app.

*Tag:* codice cliente

### FAQ-004 · Come modifico email, telefono di contatto o indirizzo di fatturazione?

**Varianti:** Voglio cambiare la mail | Ho cambiato casa, aggiorno l'indirizzo delle fatture | Cambiare recapito

Da app o Area Clienti vai su Profilo > Dati di contatto. Le modifiche sono immediate. Attenzione: cambiare l'indirizzo di fatturazione non sposta la linea fissa; per quello serve un trasloco (vedi FAQ dedicata).

*Tag:* dati personali

### FAQ-005 · Come cambio l'intestatario del contratto (voltura/subentro)?

**Varianti:** Voglio intestare la linea a mio marito | Subentro | Il titolare è deceduto, cosa devo fare?

La voltura si richiede con il modulo 'Cambio intestatario' firmato da entrambe le parti, allegando i documenti d'identità e i codici fiscali. La pratica si completa in circa 10 giorni lavorativi, senza interruzioni del servizio e senza costi. In caso di decesso del titolare non serve la firma del titolare: un operatore ti indicherà i documenti necessari.

*Escalation:* Casi di decesso o contestazione: gestione con operatore.

*Tag:* voltura, intestatario

## Fatture e pagamenti

### FAQ-006 · Quando arriva la fattura e quando scade?

**Varianti:** Data di emissione della bolletta | Entro quando devo pagare? | Ogni quanto fatturate?

La fattura è mensile: viene emessa il giorno 1 di ogni mese e scade dopo 20 giorni. La ricevi via email e la trovi in app nella sezione Fatture. L'invio della fattura in formato digitale è gratuito.

*Tag:* fattura, scadenza

### FAQ-007 · Quali metodi di pagamento accettate?

**Varianti:** Posso pagare con carta? | Come attivo la domiciliazione bancaria? | Pagamento con bollettino

Puoi pagare con addebito diretto su conto corrente (SEPA), carta di credito o debito con addebito automatico, oppure pagare la singola fattura in app con carta o PayPal. Per attivare o cambiare il metodo automatico vai su Pagamenti > Metodo di pagamento: la modifica vale dalla fattura successiva.

*Tag:* pagamento, domiciliazione

### FAQ-008 · Perché questa fattura è più alta del solito?

**Varianti:** Mi avete addebitato di più | Importo strano in bolletta | Costi che non capisco

Le cause più comuni sono: la prima fattura dopo l'attivazione (include la frazione del mese precedente), il costo di attivazione a rate, traffico fuori soglia o verso numeri a pagamento, opzioni aggiuntive attivate, oppure la fine di uno sconto promozionale. In app, apri la fattura e tocca 'Dettaglio voci' per vedere ogni addebito. Se trovi una voce che non riconosci, puoi contestarla aprendo un reclamo.

*Escalation:* Voce non riconosciuta o contestazione: aprire reclamo.

*Tag:* fattura alta, addebito

### FAQ-009 · Come leggo la fattura?

**Varianti:** Cosa significano le voci della bolletta? | Spiegami la fattura | Canone e importi una tantum

La fattura ha tre sezioni: 1) Riepilogo con importo totale e scadenza; 2) Canoni, cioè i costi fissi mensili delle offerte; 3) Altri importi, come traffico extra, rate del modem o dello smartphone e costi una tantum. In fondo trovi il codice di migrazione della linea fissa e i recapiti per i reclami.

*Tag:* fattura, lettura

### FAQ-010 · Cosa succede se pago in ritardo?

**Varianti:** Ho saltato una bolletta | Mi sospendete la linea? | Fattura scaduta

Dopo la scadenza ricevi un promemoria. Se la fattura resta non pagata, trascorsi 15 giorni ti inviamo un preavviso di sospensione; la sospensione avviene solo dopo ulteriori 10 giorni e le chiamate d'emergenza restano sempre attive. Puoi saldare in qualsiasi momento dall'app: il servizio viene riattivato entro 24 ore dal pagamento. Se hai difficoltà economiche puoi chiedere una rateizzazione a un operatore.

*Escalation:* Richiesta di rateizzazione del debito.

*Tag:* ritardo, sospensione, morosità

### FAQ-011 · Ho ricevuto una fattura dopo aver disdetto o cambiato operatore, è normale?

**Varianti:** Doppia fatturazione | Mi arrivano ancora bollette dopo la disdetta | Pago due operatori

È normale ricevere un'ultima fattura di chiusura, che copre i giorni di servizio fino alla cessazione effettiva, l'eventuale costo di disattivazione e le rate residue di dispositivi. Non devono invece esserci canoni per periodi successivi alla data di cessazione. Se accade, apri un reclamo indicando la data della tua richiesta di disdetta: l'importo non dovuto verrà stornato.

*Escalation:* Canoni successivi alla cessazione: reclamo di fatturazione.

*Tag:* disdetta, doppia fatturazione

### FAQ-012 · Come ricevo un rimborso?

**Varianti:** Quando mi restituite i soldi? | Storno in fattura | Rimborso dopo reclamo accolto

I rimborsi approvati vengono accreditati nella prima fattura utile. Se il contratto è cessato, il rimborso avviene con bonifico entro 30 giorni: ti chiederemo l'IBAN intestato al titolare del contratto.

*Tag:* rimborso

## Offerte e piani

### FAQ-013 · Posso cambiare offerta?

**Varianti:** Voglio un piano più economico | Passare a una fibra più veloce | Upgrade dell'offerta mobile

Sì, da app nella sezione Offerte > Cambia offerta vedi le offerte compatibili con la tua linea. Il passaggio a un'offerta superiore è gratuito e immediato; il passaggio a un'offerta inferiore costa 5 € e decorre dal ciclo di fatturazione successivo.

*Tag:* cambio offerta

### FAQ-014 · Mi avete comunicato un aumento del prezzo: cosa posso fare?

**Varianti:** Rimodulazione tariffaria | Aumento del canone | Posso andarmene senza penali se aumentate il prezzo?

Ogni modifica delle condizioni economiche viene comunicata con almeno 30 giorni di preavviso. Entro la data di entrata in vigore puoi recedere o passare a un altro operatore senza penali né costi di disattivazione, indicando come motivo 'modifica delle condizioni contrattuali'. Le rate residue di eventuali dispositivi restano dovute.

*Tag:* rimodulazione, recesso

### FAQ-015 · Come attivo o disattivo un'opzione aggiuntiva?

**Varianti:** Voglio più giga | Aggiungere minuti internazionali | Togliere un servizio a pagamento

Da app vai su Offerte > Opzioni. Le opzioni ricaricabili (es. Giga Extra) si attivano subito e si pagano una volta; quelle con canone si rinnovano ogni mese finché non le disattivi. La disattivazione ha effetto dal rinnovo successivo.

*Tag:* opzioni

### FAQ-016 · Cosa succede se finisco i giga?

**Varianti:** Giga esauriti | Navigo lento, ho finito il traffico | Costi fuori soglia

Esauriti i giga inclusi, la navigazione si blocca senza costi aggiuntivi fino al rinnovo mensile. Ricevi un SMS all'80% e al 100% del consumo. Puoi comprare un pacchetto Giga Extra dall'app per sbloccare subito la navigazione.

*Tag:* giga, soglia

### FAQ-017 · Ho servizi a pagamento attivi che non ho mai richiesto (VAS)

**Varianti:** Abbonamenti non richiesti | Addebiti per servizi premium | Mi scalano credito per contenuti che non ho attivato

Su tutte le linee ACME il blocco dei servizi a sovrapprezzo è attivo di default. Se vedi addebiti di questo tipo, controlla in app Offerte > Servizi di terze parti e disattivali. Per chiedere il rimborso di servizi mai richiesti serve un reclamo.

*Escalation:* Richiesta di rimborso di servizi non richiesti.

*Tag:* VAS, servizi non richiesti

## Attivazione e installazione

### FAQ-018 · La fibra è disponibile al mio indirizzo?

**Varianti:** Verifica copertura | Arriva la fibra a casa mia? | FTTH o FTTC?

Inserisci il tuo indirizzo su acme-demo.example/copertura. Il risultato ti dice la tecnologia disponibile (FTTH fino a 2,5 Gbps, FTTC fino a 200 Mbps o FWA fino a 300 Mbps) e la velocità massima stimata. La velocità effettiva dipende dalla distanza dalla centrale e dalla qualità dell'impianto di casa.

*Tag:* copertura, fibra

### FAQ-019 · Quanto ci vuole per attivare la linea fissa?

**Varianti:** Tempi di attivazione fibra | Quando mi attivate internet? | Da quando ho firmato non è successo niente

I tempi medi sono 10-15 giorni lavorativi per FTTC e 15-30 giorni per FTTH, che richiede l'installazione del tecnico. Puoi seguire lo stato in app nella sezione 'La mia attivazione'. Se sono trascorsi più di 30 giorni dalla firma, contatta l'assistenza.

*Escalation:* Attivazione oltre 30 giorni: verifica pratica.

*Tag:* attivazione, tempi

### FAQ-020 · Come funziona l'appuntamento con il tecnico?

**Varianti:** Devo essere a casa? | Spostare l'appuntamento del tecnico | Cosa fa il tecnico?

Ricevi un SMS con data e fascia oraria (mattina o pomeriggio). Serve la presenza di un maggiorenne. Il tecnico porta la fibra fino alla borchia in casa, collega il modem e verifica la linea: l'intervento dura in media 2 ore. Puoi spostare l'appuntamento fino a 48 ore prima tramite il link nell'SMS.

*Tag:* tecnico, installazione

### FAQ-021 · Come richiedo il trasloco della linea?

**Varianti:** Cambio casa, porto con me la fibra | Trasferire internet al nuovo indirizzo | Trasloco linea fissa

Richiedi il trasloco da app (Linea > Trasloco) almeno 30 giorni prima della data del cambio casa. Prima verifichiamo la copertura al nuovo indirizzo. Il trasloco costa 29 € e mantieni offerta e, se nello stesso distretto telefonico, anche il numero fisso.

*Tag:* trasloco

## Internet casa e guasti

### FAQ-022 · Internet non funziona, cosa faccio?

**Varianti:** Non ho connessione | Il modem ha la luce rossa | Linea assente

Prova questi passaggi: 1) controlla in app la sezione 'Stato rete' per eventuali guasti nella tua zona; 2) verifica che il modem sia acceso e i cavi ben collegati; 3) spegni il modem, attendi 30 secondi e riaccendilo; 4) se la spia 'Internet' resta rossa o spenta dopo 5 minuti, apri una segnalazione guasto dall'app. Un guasto viene risolto di norma entro 2 giorni lavorativi.

*Escalation:* Se dopo il riavvio il problema persiste: apertura ticket guasto.

*Tag:* guasto, connessione

### FAQ-023 · Internet va lento, perché?

**Varianti:** Velocità bassa | La fibra non va veloce come promesso | Il Wi-Fi è lento

Per prima cosa fai uno speed test con un PC collegato al modem via cavo: il Wi-Fi riduce la velocità, soprattutto su distanze e muri spessi. Se via cavo la velocità è molto inferiore a quella minima garantita indicata nel contratto, apri una segnalazione. Per migliorare il Wi-Fi: posiziona il modem in un punto centrale e rialzato e usa la rete a 5 GHz quando sei vicino.

*Escalation:* Velocità via cavo sotto il minimo contrattuale.

*Tag:* lentezza, velocità, wifi

### FAQ-024 · Come cambio nome e password del Wi-Fi?

**Varianti:** Password del wifi | Dove trovo la chiave Wi-Fi? | Cambiare nome della rete

La password predefinita è sull'etichetta sotto il modem. Per cambiarla vai in app su Modem > Wi-Fi, oppure accedi al pannello del modem digitando 192.168.1.1 nel browser (credenziali sull'etichetta).

*Tag:* wifi, modem

### FAQ-025 · Posso usare un modem mio?

**Varianti:** Modem libero | Voglio usare il mio router | Credenziali VoIP per modem di terze parti

Sì, il modem è libero. Trovi i parametri di configurazione e le credenziali VoIP per la linea telefonica in app su Modem > Usa il tuo modem. L'assistenza tecnica sulla configurazione è garantita solo per il modem ACME.

*Tag:* modem libero

### FAQ-026 · Il telefono fisso non funziona ma internet sì

**Varianti:** Non sento il segnale sul fisso | Il telefono di casa è muto | Chiamate fisso non partono

Il fisso funziona tramite il modem: il telefono deve essere collegato alla porta 'Phone' o 'Tel' del modem, non alla presa a muro. Riavvia il modem e controlla il collegamento. Se il problema continua, apri una segnalazione guasto.

*Escalation:* Guasto voce persistente.

*Tag:* telefono fisso, voip

## Mobile e SIM

### FAQ-027 · Come attivo una eSIM?

**Varianti:** Passare da SIM fisica a eSIM | eSIM su iPhone | QR code eSIM

Verifica che il tuo telefono supporti la eSIM. Da app vai su SIM > Passa a eSIM: riceverai un QR code via email da inquadrare nelle impostazioni del telefono (Cellulare > Aggiungi eSIM). L'attivazione richiede circa 15 minuti; la SIM fisica si disattiva automaticamente. Il servizio è gratuito.

*Tag:* esim

### FAQ-028 · Ho perso la SIM o mi hanno rubato il telefono

**Varianti:** SIM smarrita | Furto cellulare | Bloccare la SIM

Blocca subito la SIM da app (SIM > Blocca SIM) o chiamando l'assistenza, attiva 24 ore su 24. Poi richiedi una SIM sostitutiva (10 €) o una eSIM gratuita con lo stesso numero e credito. In caso di furto, ti consigliamo di presentare denuncia alle autorità.

*Escalation:* Se l'utente non riesce ad accedere all'app: blocco tramite operatore.

*Tag:* smarrimento, furto, blocco sim

### FAQ-029 · Dove trovo il codice PUK?

**Varianti:** SIM bloccata | Ho sbagliato il PIN tre volte | Codice PUK

Il PUK è sul supporto plastico della SIM e nell'app nella sezione SIM > Codici. Attenzione: dopo 10 tentativi errati del PUK la SIM si blocca definitivamente e va sostituita.

*Tag:* puk, pin

### FAQ-030 · Come porto il mio numero in ACME da un altro operatore?

**Varianti:** Portabilità del numero | Voglio mantenere il mio numero | MNP

Quando attivi la SIM ACME scegli 'Mantieni il tuo numero' e indica il numero e il codice ICCID della SIM attuale (19 cifre, stampato sulla SIM). Devi essere l'intestatario della linea. La portabilità si completa in 1-3 giorni lavorativi; per alcune ore potresti non ricevere chiamate. Il credito residuo sul vecchio operatore può essere trasferito, se richiesto.

*Tag:* portabilità, mnp

### FAQ-031 · La portabilità non è andata a buon fine

**Varianti:** Portabilità rifiutata | Il numero non è passato | MNP in ritardo

Le cause più comuni sono ICCID errato o dati dell'intestatario non corrispondenti. Riceverai un SMS con il motivo. Puoi correggere i dati in app e ripetere la richiesta. Se il ritardo supera i 3 giorni lavorativi, un operatore verificherà la pratica.

*Escalation:* Ritardo oltre 3 giorni lavorativi.

*Tag:* portabilità, errore

## Estero e roaming

### FAQ-032 · Posso usare la mia offerta in Europa?

**Varianti:** Roaming UE | Vado in Spagna, pago di più? | Giga all'estero

Sì: nei paesi dell'Unione Europea, oltre a Norvegia, Islanda e Liechtenstein, usi minuti, SMS e giga alle stesse condizioni dell'Italia. Per i giga in roaming si applica un limite di utilizzo corretto indicato nella scheda della tua offerta. Il roaming è attivo di default.

*Tag:* roaming, ue

### FAQ-033 · Quanto costa usare il telefono fuori dall'Europa?

**Varianti:** Roaming extra UE | Viaggio negli Stati Uniti | Costi in Svizzera

Fuori dall'UE il traffico ha costi specifici per zona. Ti consigliamo di attivare prima di partire un'opzione Viaggio dall'app (Offerte > Estero). Senza opzione, il traffico dati si blocca al raggiungimento di 50 € di spesa per evitare addebiti imprevisti. Ricorda che anche la Svizzera è fuori dall'UE.

*Tag:* roaming, extra ue

## Disdetta e cambio operatore

### FAQ-034 · Come disdico il contratto?

**Varianti:** Voglio recedere | Disdetta linea fissa | Chiudere il contratto

Puoi recedere in qualsiasi momento, senza vincolo di durata: da app (Profilo > Disdici), via PEC o raccomandata allegando il modulo di recesso e il documento d'identità. La cessazione avviene entro 30 giorni dalla richiesta. Se passi a un altro operatore non serve disdire: se ne occupa il nuovo operatore.

*Tag:* disdetta, recesso

### FAQ-035 · Ci sono costi se disdico?

**Varianti:** Penale per recesso | Quanto pago per andarmene? | Costo di disattivazione

Il costo di disattivazione è di 19,90 € per la linea fissa e zero per il mobile. Restano dovute le rate residue di modem o smartphone acquistati a rate, che puoi pagare in un'unica soluzione o continuare a rate. Non ci sono penali se recedi per una modifica delle condizioni contrattuali.

*Tag:* costi recesso, penali

### FAQ-036 · Devo restituire il modem?

**Varianti:** Restituzione router | Il modem è mio? | Dove spedisco il modem?

Se il modem è in comodato d'uso va restituito entro 30 giorni dalla cessazione, gratuitamente, presso un punto di ritiro convenzionato con l'etichetta che ricevi via email. Se non viene restituito, ti addebitiamo 79 €. Se il modem è stato acquistato (anche a rate), resta tuo.

*Tag:* modem, restituzione

### FAQ-037 · Voglio passare a un altro operatore mantenendo il numero fisso

**Varianti:** Codice di migrazione | Cambio gestore internet | Migrazione linea fissa

Comunica al nuovo operatore il tuo codice di migrazione: lo trovi nella fattura e in app su Linea > Codice di migrazione. Il nuovo operatore gestisce tutto il passaggio e la chiusura con noi. Non inviare disdetta separata, per evitare di perdere il numero.

*Tag:* migrazione, cambio operatore

## Reclami e tutele

### FAQ-038 · Come faccio un reclamo?

**Varianti:** Voglio fare una segnalazione formale | Contestare un addebito | Non sono soddisfatto del servizio

Puoi aprire un reclamo da app (Assistenza > Reclami), chiamando il servizio clienti o via PEC a reclami@pec.acme-demo.example. Conserva il codice reclamo che ti viene assegnato. Descrivi il problema, le date e allega documenti utili (es. la fattura contestata).

*Escalation:* Raccolta reclamo: passaggio a operatore se l'utente lo preferisce.

*Tag:* reclamo

### FAQ-039 · Entro quanto rispondete a un reclamo?

**Varianti:** Tempi di risposta reclamo | Ho fatto un reclamo e nessuno mi risponde | Stato del reclamo

Rispondiamo per iscritto entro 30 giorni dalla ricezione. Puoi seguire lo stato in app con il tuo codice reclamo. Durante l'esame di un reclamo sulla fatturazione non sospendiamo il servizio per l'importo contestato.

*Tag:* reclamo, tempi

### FAQ-040 · Non sono soddisfatto della risposta al reclamo, cosa posso fare?

**Varianti:** Conciliazione | Rivolgermi all'autorità | Indennizzo per disservizio

Se la risposta non ti soddisfa, puoi avviare gratuitamente una procedura di conciliazione tramite la piattaforma ConciliaWeb dell'autorità di settore. Gli indennizzi per disservizi sono indicati nella nostra Carta dei Servizi. Un operatore può aiutarti a verificare se il tuo caso rientra tra quelli indennizzabili.

*Escalation:* Richiesta di indennizzo o contenzioso.

*Tag:* conciliazione, indennizzo

## Contatti e assistenza

### FAQ-041 · Come contatto il servizio clienti e quali sono gli orari?

**Varianti:** Numero assistenza | Orari del call center | Chat con operatore

Assistenza tecnica: 24 ore su 24, 7 giorni su 7. Assistenza commerciale e amministrativa: dal lunedì al sabato, dalle 8 alle 22. Canali: chat in app, numero 800 00 00 00 (gratuito da rete fissa e mobile), email supporto@acme-demo.example. Puoi anche prenotare una richiamata dall'app.

*Tag:* contatti, orari

### FAQ-042 · Voglio parlare con un operatore

**Varianti:** Passami un umano | Non voglio il bot | Operatore per favore

Certo, ti metto in contatto con un operatore. Per velocizzare, tieni a portata di mano il codice cliente e il numero della linea interessata.

*Escalation:* Richiesta esplicita di operatore umano: escalation immediata.

*Tag:* operatore, escalation

## Sicurezza e privacy

### FAQ-043 · Ho ricevuto un SMS o una chiamata sospetta a nome di ACME

**Varianti:** Phishing | Mi chiedono i dati della carta | Truffa SMS

ACME non chiede mai via SMS, email o telefono password, codici OTP o dati completi della carta. Non cliccare su link sospetti. Puoi inoltrare il messaggio a sicurezza@acme-demo.example. Se hai già inserito dati, cambia subito la password dell'Area Clienti e contatta la tua banca.

*Escalation:* Se l'utente ha fornito dati: supporto prioritario.

*Tag:* phishing, sicurezza

### FAQ-044 · Come gestite i miei dati e come smetto di ricevere offerte commerciali?

**Varianti:** Privacy | Non voglio chiamate promozionali | Consensi marketing

I tuoi dati sono trattati secondo l'informativa privacy disponibile su acme-demo.example/privacy. Puoi modificare i consensi al marketing in qualsiasi momento da app (Profilo > Privacy). La modifica è operativa entro 48 ore. Per richieste di accesso o cancellazione dei dati scrivi a privacy@acme-demo.example.

*Tag:* privacy, gdpr

## Fuori ambito (test)

### FAQ-045 · Che smartphone mi consigli di comprare?

**Varianti:** Meglio iPhone o Samsung? | Quale telefono prendo?

Non posso consigliarti un modello specifico, ma posso mostrarti gli smartphone disponibili con le offerte ACME o verificare se il tuo telefono è compatibile con la eSIM.

*Tag:* fuori ambito

### FAQ-046 · L'offerta di un altro operatore è migliore della vostra?

**Varianti:** Confronto con la concorrenza | Conviene passare a un altro gestore?

Non posso fare confronti con altri operatori, ma posso aiutarti a trovare l'offerta ACME più adatta ai tuoi consumi.

*Tag:* fuori ambito, concorrenza

### FAQ-047 · Posso fare causa ad ACME? Che diritti legali ho?

**Varianti:** Consulenza legale | Mi serve un avvocato

Non posso fornire consulenza legale. Posso aiutarti ad aprire un reclamo o spiegarti come funziona la conciliazione; per valutazioni legali ti consigliamo di rivolgerti a un'associazione dei consumatori o a un legale.

*Escalation:* Tema legale: proporre reclamo o operatore.

*Tag:* fuori ambito, legale

### FAQ-048 · Domanda non pertinente (es. meteo, ricette, notizie)

**Varianti:** Che tempo fa domani? | Raccontami una barzelletta

Posso aiutarti solo con i servizi ACME SRL: fatture, offerte, linea di casa, SIM e assistenza. Come posso aiutarti su questi temi?

*Tag:* fuori ambito
