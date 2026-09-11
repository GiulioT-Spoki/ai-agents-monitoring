# Disponibilità, giorni, orari e organizzazione degli appuntamenti

## Regola generale

Le disponibilità per i nuovi appuntamenti devono essere determinate esclusivamente utilizzando il file dinamico delle disponibilità presente nella Knowledge Base.

Il file contiene:
- la `Data`;
- il `Nr. infermieri` programmati per quella data.

Calendar CUP non deve essere utilizzato per cercare o dedurre le disponibilità. In particolare `get_available_slots` non deve mai essere chiamato.

Non devono essere inferite disponibilità da:
- giorni della settimana;
- orari amministrativi Casp;
- turnazioni precedenti;
- date già utilizzate;
- schemi ricorrenti;
- festività;
- Calendar CUP;
- altre informazioni non contenute nel file delle disponibilità.

# Interpretazione del file delle disponibilità

Ogni riga identifica una data.

La colonna `Nr. infermieri` indica esclusivamente il numero di infermieri programmati per quella data.

Una cella vuota nella colonna `Nr. infermieri` indica che in quella data non sono disponibili nuovi appuntamenti.

Un valore numerico maggiore di 0 indica che in quella data il servizio è disponibile per tutti i comuni ordinariamente coperti dal Casp.

Il valore numerico non rappresenta:
- il numero di appuntamenti ancora disponibili;
- il numero di posti residui;
- la capacità massima prenotabile;
- un dato da comunicare all’Assistito.

Per determinare la disponibilità conta esclusivamente la presenza di un valore numerico maggiore di 0 nella riga della data richiesta.

L’assistente non deve trasformare il numero degli infermieri in un numero di posti o prenotazioni.

# Capacità e chiusura della giornata

La capacità residua di una giornata non è calcolabile dall’assistente e non è deducibile da Calendar CUP.

Quando una giornata è al completo, viene annullata o non può più accogliere nuove prenotazioni, il personale Casp svuota la cella `Nr. infermieri` di quella data nel file delle disponibilità.

Da quel momento la data risulta non disponibile e l’assistente smette di proporla.

Questo è l’unico meccanismo di chiusura di una giornata: l’assistente non deve stimare autonomamente il riempimento, contare gli appuntamenti creati né chiudere una data di propria iniziativa.

# Comuni

Quando una data presenta un valore maggiore di 0, è disponibile per tutti i comuni ordinariamente coperti dal Casp secondo il file dedicato alla copertura territoriale.

La disponibilità della data non modifica la copertura territoriale.

Un indirizzo fuori dall’area ordinariamente coperta continua a richiedere la gestione prevista dal file dedicato alla copertura, anche se la data richiesta risulta disponibile.

# Aggiornamento delle disponibilità

Il file delle disponibilità è dinamico e può essere aggiornato dal personale Casp.

Prima di proporre, confermare o utilizzare una data per una nuova prenotazione, deve essere consultata la versione corrente disponibile nella Knowledge Base.

Una data precedentemente disponibile può essere rimossa o diventare non disponibile.

Una disponibilità comunicata in precedenza non deve essere considerata ancora valida senza una nuova verifica prima della creazione dell’appuntamento.

# Data richiesta dall’Assistito

Se l’Assistito richiede una data specifica, verificare quella data nel file corrente.

La data può essere proposta o confermata soltanto se:
- è futura secondo le regole previste;
- è presente nel file;
- la relativa cella `Nr. infermieri` contiene un valore maggiore di 0;
- il domicilio rientra nella copertura ordinaria oppure l’eventuale eccezione è stata gestita dal personale Casp.

Se una di queste condizioni non è soddisfatta, la data non deve essere confermata autonomamente.

# Data non disponibile

Se la data richiesta non è disponibile, proporre normalmente la prima data successiva disponibile.

Per individuare la prima data successiva:
1. partire dal giorno richiesto;
2. escludere le date non utilizzabili secondo le regole di questo file;
3. individuare la prima data successiva con `Nr. infermieri` maggiore di 0.

Proporre normalmente una sola data per messaggio, salvo che l’Assistito chieda espressamente tutte le disponibilità.

# Nessuna preferenza di data

Se l’Assistito non esprime una preferenza, proporre la prima data utile disponibile secondo il file corrente.

Non chiedere al cliente di scegliere genericamente un giorno della settimana se è già possibile proporre una data concreta.

# Richiesta di tutte le disponibilità

Se l’Assistito chiede quali date siano disponibili, possono essere comunicate le date future effettivamente disponibili nel file.

Non devono essere comunicati:
- il numero di infermieri;
- nomi degli infermieri;
- turnazioni interne;
- capacità presunte;
- posti residui presunti.

# Date relative

Per richieste come:
- oggi;
- domani;
- dopodomani;
- lunedì;
- la prossima settimana;
- tra tre giorni;

deve essere prima determinata la data esatta utilizzando la data e l’ora correnti secondo il System Prompt.

Successivamente la data esatta deve essere verificata nel file delle disponibilità.

Non deve essere considerata disponibile una data relativa soltanto perché corrisponde a un giorno normalmente utilizzato dal servizio.

# Prenotazione per il giorno stesso

Non devono essere creati autonomamente nuovi appuntamenti per il giorno stesso.

Anche se il file riporta un valore maggiore di 0 per la data odierna, tale dato non autorizza una nuova prenotazione autonoma per lo stesso giorno.

Una richiesta per il giorno stesso necessita della gestione del personale Casp.

# Prenotazione per il giorno successivo

La prenotazione per il giorno successivo può proseguire autonomamente soltanto quando:
- la data di domani presenta `Nr. infermieri` maggiore di 0;
- il domicilio è ordinariamente coperto;
- la richiesta e la relativa gestione avvengono prima delle ore 09:00 del giorno precedente;
- tutti gli altri requisiti della prenotazione risultano soddisfatti.

Dalle ore 09:00 in poi, il chatbot non deve creare autonomamente un nuovo appuntamento per il giorno successivo.

In questo caso è necessaria la gestione del personale Casp.

# Date future

Per date successive al giorno seguente, una data può essere proposta soltanto se risulta espressamente disponibile nel file corrente.

L’assenza di una data dal file, oppure una cella vuota nella colonna `Nr. infermieri`, significa che quella data non è attualmente disponibile per una nuova prenotazione.

Questo non significa che il servizio non verrà mai effettuato in quella data: significa soltanto che la disponibilità non è attualmente pubblicata.

# Domeniche e giorni festivi

Una domenica o un giorno festivo può essere considerato disponibile soltanto se compare nel file con `Nr. infermieri` maggiore di 0 e risultano rispettate tutte le altre regole.

Non deve essere escluso automaticamente un giorno festivo se il file lo indica disponibile.

Non deve essere considerato disponibile soltanto perché in passato il Casp ha operato in giorni festivi.

# Orario del servizio

I prelievi domiciliari vengono normalmente effettuati nella fascia mattutina indicativa compresa tra le 06:00 e le 08:30, salvo diverse indicazioni presenti nella Knowledge Base.

Questa fascia è indicativa e non rappresenta un appuntamento a un orario preciso.

L’assistente non deve promettere un orario esatto di arrivo dell’infermiere.

# Preferenze orarie

L’Assistito può comunicare una preferenza per un passaggio più anticipato o più tardivo.

La preferenza può essere registrata come nota operativa, ma non costituisce una garanzia.

Non deve essere modificata la disponibilità di una data sulla base della preferenza oraria.

# Orari associati a Calendar CUP

L’evento su Calendar CUP viene creato con un orario tecnico fisso (07:00–07:30 Europe/Rome) che serve unicamente alla registrazione interna.

Questo orario non deve mai essere comunicato all’Assistito né presentato come orario garantito di arrivo dell’infermiere.

Calendar CUP gestisce la creazione tecnica dell’appuntamento e non costituisce la fonte delle disponibilità né della sequenza operativa degli accessi domiciliari.

# Esami con esigenze temporali specifiche

Se un esame richiede un orario, una tempistica o un’organizzazione specifica espressamente prevista dalla Knowledge Base, devono essere seguite quelle indicazioni.

Se la Knowledge Base non contiene istruzioni sufficienti per gestire autonomamente una particolare esigenza temporale, è necessaria la valutazione del personale Casp.

# Data rimossa prima della creazione

Se una data era stata proposta ma, prima della creazione tramite Calendar CUP, non risulta più disponibile nel file corrente, l’appuntamento non deve essere creato per quella data.

Deve essere individuata e proposta una nuova data disponibile.

La disponibilità deve quindi essere verificata nuovamente prima della conferma finale e della creazione.

# Appuntamento già creato

Questo file disciplina esclusivamente la scelta della data per nuove prenotazioni.

Se l’appuntamento è già stato creato e l’Assistito desidera:
- cambiare data;
- anticipare;
- posticipare;
- cancellare;
- ottenere un nuovo appuntamento in sostituzione;

si applica il file dedicato a modifica, spostamento e cancellazione.

L’assistente non deve utilizzare il file delle disponibilità per cercare autonomamente una data sostitutiva dopo la creazione di un appuntamento.

# Disponibilità mancanti o ambigue

Se il file:
- non è disponibile;
- non è leggibile;
- presenta dati contraddittori;
- contiene valori non interpretabili;
- non permette di stabilire con certezza la disponibilità;

l’assistente non deve inventare o dedurre una data.

È necessaria la gestione del personale Casp.

# Richieste eccezionali

Richieste di appuntamenti fuori dalle disponibilità pubblicate, nello stesso giorno, oltre i limiti previsti per il giorno successivo o altre eccezioni non devono essere promesse autonomamente.

Devono essere gestite dal personale Casp.

# Appuntamenti ricorrenti

Richieste di più appuntamenti programmati, cicli ricorrenti o pianificazioni periodiche devono essere gestite dal personale Casp, salvo che una specifica procedura della Knowledge Base ne disciplini espressamente la gestione autonoma.

# Più Assistiti nello stesso domicilio

Quando più Assistiti richiedono il servizio nello stesso domicilio, ciascuno mantiene una prenotazione separata.

La stessa data può essere utilizzata per più Assistiti dello stesso domicilio quando risulta disponibile secondo questo file.

Il numero riportato nella colonna `Nr. infermieri` non deve essere utilizzato per stabilire autonomamente quanti Assistiti possano essere prenotati nello stesso domicilio o nella stessa giornata.

# Presenza dell’Assistito

Nel giorno del servizio l’Assistito, oppure chi ne consente l’accesso quando appropriato, deve essere presente presso il domicilio concordato.

Il recapito operativo deve essere raggiungibile secondo le procedure previste.

# Ritardo o mancato arrivo dell’operatore

Finché ci si trova all’interno della normale fascia operativa, l’assenza dell’infermiere a un orario specifico non deve essere interpretata automaticamente come ritardo.

Se la fascia operativa è terminata e l’operatore non è arrivato, oppure se emerge un problema concreto relativo all’accesso programmato, la richiesta deve essere gestita dal personale Casp.

L’assistente non deve inventare informazioni sulla posizione o sull’orario di arrivo dell’operatore.

# Regola finale

Per una nuova prenotazione, una data è disponibile soltanto quando la relativa riga del file corrente presenta un valore numerico maggiore di 0 nella colonna `Nr. infermieri` e risultano rispettate tutte le altre regole applicabili.

Una cella vuota significa non disponibile.

Il numero degli infermieri è un dato organizzativo interno e non rappresenta posti residui o capacità prenotabile.

Le disponibilità provengono esclusivamente dal file dinamico della Knowledge Base.

Calendar CUP non deve essere utilizzato per scoprire, dedurre o modificare le disponibilità.

Prima della creazione dell’appuntamento deve essere effettuata una verifica aggiornata della data scelta.
