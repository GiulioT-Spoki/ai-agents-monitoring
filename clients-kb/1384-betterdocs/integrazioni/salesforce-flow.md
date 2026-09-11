---
title: Salesforce Flow
slug: salesforce-flow
author: Salvatore Corsa
date: 2024-11-14
modified: 2026-07-29
word_count: 1201
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/salesforce-flow/
---

# Salesforce Flow

Grazie a questa integrazione sarai in grado di avviare un’automazione **Spoki** all’interno di un **Flow** di **Salesforce**

### Guida all’integrazione

Se non lo hai ancora fatto, accedi alla piattaforma Spoki da questo link: [Spoki](https://spoki.app/)

### 1. Automazione Spoki

#### 1.1 Creare una nuova automazione

Di seguito vedremo come creare una nuova automazione da collegare a Salesforce Flow, se hai già creato l’automazione puoi saltare questo step.

Per prima cosa spostati nella sezione ***Automazioni*** come mostrato di seguito e clicca sul pulsante ***Nuova*** in alto a destra

![](https://support.spoki.com/wp-content/uploads/2024/11/spoki.app_automations-0-1024x749.png)
Ora scegli un template per la tua automazione, oppure clicca su ***Automazione vuota*** se vuoi costruire da zero la tua automazione.

Nell’esempio di seguito partiremo da un’automazione vuota.

![](https://support.spoki.com/wp-content/uploads/2024/11/spoki.app_automations-1-1024x749.png)
#### 1.2 Aggiungere il trigger d’avvio

Un volta creata la tua automazione clicca su ***Aggiungi trigger d’avvio*** e nel menu che ti compare seleziona ***Integrazioni*** dall’elenco a sinistra ed infine clicca su ***Salesforce***

![](https://support.spoki.com/wp-content/uploads/2024/11/spoki.app_automations-2-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/localhost_3000_automations_3993-1-1024x652.png)
Nella finestra che si apre prendi nota dell’*** URL***, della ***Path***, della ***Secret*** e del ***Payload della richiesta***

![](https://support.spoki.com/wp-content/uploads/2024/11/Frame_34062.png)
#### 1.3 Aggiungere uno step all’automazione

Ora è arrivato il momento di aggiungere uno step all’automazione. Per fare ciò clicca sul ***+*** all’interno dell’automazione

![](https://support.spoki.com/wp-content/uploads/2024/11/localhost_3000_automations_3993-3-1024x652.png)
Nella finestra che si apre clicca su ***Invia Template*** dall’elenco a sinistra, seleziona un template tra quelli disponibili e clicca su ***Aggiungi***

![](https://support.spoki.com/wp-content/uploads/2024/11/spoki.app_automations-6-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/spoki.app_automations-7-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/spoki.app_automations-8-1024x749.png)
Adesso sei pronto per spostarti su Salesforce.

### 2. Salesforce Flow

Se non lo hai ancora fatto accedi al tuo account Salesforce

#### 2.1 Configurazione del webhook in Salesforce

#### 2.1.1 Creazione delle credenziali denominate

Una volta effettuato il login in Salesforce clicca sull’icona ⚙️ in alto e successivamente su ***Imposta***. A questo punto, dall’elenco a sinistra clicca su ***Protezione*** e poi su ***Credenziali denominate***

![](https://support.spoki.com/wp-content/uploads/2024/11/0-1024x749.png)
Nella schermata che si apre clicca su ***Credenziali esterne*** e poi su ***Nuova***

Inserisci un ***etichetta*** e un ***nome*** per la nuova credenziale e come*** Protocollo di autenticazione*** inserisci ***Nessuna*** ***autenticazione*** ed infine clicca su ***Salva***

![](https://support.spoki.com/wp-content/uploads/2024/11/1-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/2-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/3-1024x749.png)
Ora dobbiamo creare una nuova entità, quindi nella schermata attuale vai nella sezione ***Entità*** e clicca su ***Nuovo***

Inserisci un ***nome parametro*** ed un ***numero sequenziale*** e clicca ***Salva***

![](https://support.spoki.com/wp-content/uploads/2024/11/4-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/5-1024x749.png)
Ora clicca su ***credenziali denominate*** in alto e successivamente su ***Nuova***

![](https://support.spoki.com/wp-content/uploads/2024/11/6-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/7-1024x749.png)
Nella schermata che si apre inserisci un valore per i campi ***nome*** ed ***etichetta***. Nel campo ***URL*** inserisci il parametro ***URL*** che ti ha fornito Spoki durante la creazione dell’automazione e nel campo ***credenziale esterna*** seleziona la credenziale esterna creata precedentemente. Assicurati inoltre di mettere la spunta su tutte e 3 le caselle presenti ed infine clicca su ***Salva***.

![](https://support.spoki.com/wp-content/uploads/2024/11/8-1024x749.png)
#### 2.1.2 Creazione dei permessi per usufruire delle credenziali denominate

Dall’elenco a sinistra clicca ora su ***Utenti*** e su ***Insiemi di autorizzazioni***. Nella schermata che si apre clicca su ***Nuovo***

![](https://support.spoki.com/wp-content/uploads/2024/11/9-1024x749.png)
Inserisci un valore nei campi ***Etichetta*** e ***Nome API*** e clicca su ***Salva***

![](https://support.spoki.com/wp-content/uploads/2024/11/10-1024x749.png)
Ora clicca su ***Gestisci assegnazioni*** e successivamente su ***Aggiungi assegnazione***

![](https://support.spoki.com/wp-content/uploads/2024/11/11-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/12-1024x749.png)
Seleziona dall’elenco gli utenti che avranno i permessi per poter utilizzare e quindi creare i Flow usufruendo delle credenziali denominate create in precedenza.

Clicca quindi su ***Avanti***, ***Assegna*** ed infine su ***Chiudi***

![](https://support.spoki.com/wp-content/uploads/2024/11/13-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/14-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/15-1024x749.png)
Clicca ora su ***Accesso entità credenziale*** esterna e successivamente su ***Modifica***

![](https://support.spoki.com/wp-content/uploads/2024/11/16-1024x527.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/17-1024x749.png)
Seleziona la credenziale esterna creata precedentemente e poi sul pulsante ***Aggiungi*** per aggiungere la credenziale alla lista di quelle abilitate. Infine clicca su ***Salva***

![](https://support.spoki.com/wp-content/uploads/2024/11/18-1024x749.png)
#### 2.2 Salesforce Flow

#### 2.2.1 Creazione del Salesforce Flow

Dall’elenco a sinistra clicca sulla sezione ***Automazione processi*** e poi su ***Flussi***. Per creare un nuovo flusso clicca su ***Nuovo flusso*** in alto a destra

![](https://support.spoki.com/wp-content/uploads/2024/11/19-1024x749.png)
Nella schermata che si apre clicca ***Inizia da zero*** e successivamente clicca su ***Flusso attivato da record ***

![](https://support.spoki.com/wp-content/uploads/2024/11/1-1-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/2-1-1024x749.png)
Seleziona il tipo di oggetto da prendere in considerazione una volta che viene creato o modificato. Nell’esempio noi prenderemo in considerazione l’oggetto ***Lead***

Seleziona l’opzione ***Un record è creato o aggiornato***

![](https://support.spoki.com/wp-content/uploads/2024/11/3-1-1024x749.png)
Clicca su ***Aggiungi percorsi pianificati***

![](https://support.spoki.com/wp-content/uploads/2024/11/4-1-1024x749.png)
Inserisci un nome per ***Etichetta percorso*** ed un nome per ***Nome API.***Inserisci ***Lead: Data creazione*** per il campo ***Origine ora.***Inserisci ***1 ***nel campo ***Numero spostamento*** e ***Minuti dopo*** nel campo ***Opzioni spostamento***.In questo modo abbiamo creato un percorso che viene avviato 1 minuto dopo che la Lead è stata creata. Creiamo un percorso anche per l’aggiornamento della Lead cliccando sul ***+*** in alto a sinistra.

![](https://support.spoki.com/wp-content/uploads/2024/11/5-1-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/6-1-1024x749.png)
A questo punto clicca sul **+** all’interno del percorso Lead creata e clicca su **Azione**. Successivamente clicca sul pulsante in basso a destra ***Crea chiamata HTTP***

![](https://support.spoki.com/wp-content/uploads/2024/11/7-1-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/8-1-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/9-1-1024x749.png)
Inserisci un ***nome*** per la chiamata HTTP e seleziona la ***credenziale denominata*** creata in precedenza. Successivamente clicca su ***Avanti***

![](https://support.spoki.com/wp-content/uploads/2024/11/10-1-1024x749.png)
Inserisci un valore nel campo ***Etichetta*** e seleziona il metodo ***POST*** dal menu a tendina accanto ***Metodo***.Nel percorso URL inserisci la il campo*** Path*** che ti ha fornito Spoki durante la creazione dell’automazione.

***N.B. Assicurati che il percorso inizi con il carattere /***

Clicca su ***Avanti***

![](https://support.spoki.com/wp-content/uploads/2024/11/11-1-1024x749.png)
Nel campo Richiesta JSON di esempio incolla il payload che ti ha fornito Spoki durante la creazione dell’automazione

**N.B.** Di seguito il payload è stato modificato rimuovendo i campi non richiesti: ***first_name, last_name e email***. Inoltre modifica i nomi dei ***custom_fields con i nomi dei campi custom che hai configurato nel template Spoki associato all’automazione***

Successivamente clicca su ***Rivedi*** e poi su ***Avanti***

![](https://support.spoki.com/wp-content/uploads/2024/11/12-1-1024x749.png)
Clicca su ***Connetti per schema* **e su ***Avanti***

![](https://support.spoki.com/wp-content/uploads/2024/11/13-1-1024x749.png)
Clicca su ***Connetti*** ed infine su ***Salva***

![](https://support.spoki.com/wp-content/uploads/2024/11/14-1-1024x749.png)
Clicca su ***Immetti valore o cerca le risorse…*** e successivamente su ***Crea risorsa***

![](https://support.spoki.com/wp-content/uploads/2024/11/15-1-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/16-1-1024x526.png)
Inserisci un valore nel campo ***Nome API***. Questo sarà il nome del variabile da passare all’interno della payload della richiesta. Clicca su ***Chiudi***.

![](https://support.spoki.com/wp-content/uploads/2024/11/17.0-1024x525.png)
Clicca sul ***+*** prima dello step Azione e seleziona l’elemento ***Assegnazione***

![](https://support.spoki.com/wp-content/uploads/2024/11/17.1-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/17.2-1024x749.png)
Inserisci un valore nel campo ***Etichetta*** ed uno nel campo ***Nome API***.Successivamente clicca su ***Cerca variabili*** e clicca sulla ***freccia accanto al nome della variabile che abbiamo creato precedentemente. ***All’interno troverai tutti i campi del payload da passare all’automazione Spoki. Clicca su ***phone***.

![](https://support.spoki.com/wp-content/uploads/2024/11/18-1-1024x528.png)
Clicca su ***Valore*** e dalla lista clicca sulla freccia accanto a ***Lead di attivazione (In questo caso la dicitura è Lead, ma cambia a seconda dell’oggetto che avvia l’automazione)***. All’interno troverai tutti i campi della lead, clicca su ***Telefono***.

![](https://support.spoki.com/wp-content/uploads/2024/11/19-1-1024x525.png)
Ripeti il processo anche per il campo ***Secret*** della payload e nel campo ***Valore inserisci la secret che ti ha fornito Spoki durante la fase di creazione dell’automazione***.

![](https://support.spoki.com/wp-content/uploads/2024/11/20-1024x527.png)
Ripeti il processo anche per i ***custom_fields*** della payload come in figura. Nel nostro caso il campo custom si chiama ***SENTENCE*** ed è stato valorizzato con il Nome della Lead.

![](https://support.spoki.com/wp-content/uploads/2024/11/21-2-1024x749.png)
Copia lo step ***Assegnazione*** di modo da inserirlo anche nel percorso Lead aggiornata. Per fare ciò clicca sullo step e poi su ***Copia elemento***.

![](https://support.spoki.com/wp-content/uploads/2024/11/21.1-1024x749.png)
Clicca sul ***+*** nel percorso Lead aggiornata e clicca su*** Incolla 1 elemento***.

![](https://support.spoki.com/wp-content/uploads/2024/11/21.2-1024x749.png)
Ripeti il processo anche per lo step ***Azione*** come indicato nelle immagini di seguito.

![](https://support.spoki.com/wp-content/uploads/2024/11/21.3-1-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/21.4-1-1024x749.png)
Alla fine dovresti ritrovarti con uno schema uguale al seguente. In entrambi i percorsi abbiamo lo step ***Assegnazione*** e lo step ***Azione***.

Clicca in alto a destra su ***Salva*** per salvare il flow ed inserisci un valore per ***Etichetta flusso*** e ***Nome API flusso***. Infine clicca nuovamente su ***Salva***.

![](https://support.spoki.com/wp-content/uploads/2024/11/21.5-1024x749.png)
![](https://support.spoki.com/wp-content/uploads/2024/11/21.6-1-1024x749.png)
#### 2.2.2 Test del Salesforce Flow

Per provare il flusso clicca in alto su ***Debug***.

![](https://support.spoki.com/wp-content/uploads/2024/11/22-1-1024x527.png)
In ***percorso per l’esecuzione debug*** seleziona uno dei due percorsi creati all’inizio.Seleziona la casella ***Creato o Aggiornato*** a seconda del percorso selezionato ed infine ***seleziona una Lead di prova dalla lista infondo.***Clicca su ***Esegui*** per avviare il debug del flow.

![](https://support.spoki.com/wp-content/uploads/2024/11/23-1024x525.png)
A destra vedi il dettaglio dell’esecuzione mentre in alto la dicitura ***Completata*** che conferma che il flow è stato eseguito senza alcun errore.Per attivare il flow clicca in alto a destra su ***Attiva***.

![](https://support.spoki.com/wp-content/uploads/2024/11/24-1-1024x527.png)