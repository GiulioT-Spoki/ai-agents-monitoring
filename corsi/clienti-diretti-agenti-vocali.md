# Guida: agenti vocali Spoki

Guida per chi usa Spoki in prima persona. Impari a configurare un **agente AI** che parla in una chiamata: dove cliccare, cosa va in ogni sezione, come si scrive un prompt che funziona a voce.

**Spoki Voice non è l’intelligenza artificiale.** Voice è il prodotto di chiamata. L’agente AI è chi, dal tuo lato, può gestire quella chiamata.

Questa guida copre solo le chiamate **gestite da un agente AI**. Gli agenti di testo (chat WhatsApp) sono un altro prodotto: non copiare un prompt chat in un agente vocale.

Una parola sul vocabolario: qui **contatto** è la persona che chiama o che chiami — cliente, lead o prospect. È anche la sua scheda in Spoki, dove finiscono i dati raccolti in chiamata.

---

## 1. Canali e chi parla

Due canali di chiamata, indipendenti:

- **VoIP** — chiamata telefonica classica verso (o da) un numero reale.
- **WhatsApp Call** — la chiamata passa dentro l’app WhatsApp del contatto. Disponibile solo se il tuo numero WhatsApp è collegato a Spoki come canale pieno. Se invece lo usi in **coexistence**, cioè continui a gestirlo anche dall’app WhatsApp Business sul telefono, su quel numero le chiamate non sono previste: né in uscita né in entrata. È un limite di WhatsApp sulla modalità di collegamento, non una scelta di Spoki, e non si aggira dalla piattaforma. In quel caso la voce la fai sul canale VoIP con un numero dedicato.

Su ciascun canale chi parla dal **tuo** lato può essere una persona oppure un agente AI. Hai quattro combinazioni:

- WhatsApp Call + operatore umano
- WhatsApp Call + agente AI
- VoIP + operatore umano
- VoIP + agente AI

Qui lavori sulla coppia **canale + agente AI**. Una chiamata umana outbound (tu che chiami da chat, pulsante in alto a destra) è Voice, ma non è questa guida.

Casi d’uso AI tipici: accoglienza inbound, conferma appuntamento, raccolta dati, qualifica lead, richiamo dopo un “richiamatemi dopo”.

Ogni agente AI vocale è **custom**: in voce non c’è il selettore Sales / Assistenza del testo. Definisci tu obiettivo, First Message, prompt, voce e criteri di successo.

---

## 2. Dove si trova in piattaforma

### Attivare i canali

- **VoIP:** il canale lo trovi in [app.spoki.com/channels/voice](https://app.spoki.com/channels/voice). Si accende quando il **numero è attivo** sull’account: non serve nessun click di attivazione. L’attivazione del numero richiede tempo: vedi la sezione 8.
- **WhatsApp Call:** si attiva da **Your Channel**, e solo se il canale WhatsApp è già a posto. Se non lo trovi, verifica prima come è collegato il numero: sui numeri in coexistence il canale non è disponibile (sezione 1).

### Creare l’agente AI

1. Dal menu laterale apri **Intelligenza Artificiale**.
2. Vai al tab **Voice Agent** (Agenti vocali).
3. Clicca **+ New** e scegli **Custom Agent**.
4. Dai un nome interno chiaro, ad esempio `Conferma appuntamento` o `Centralino inbound`.

### Inbound e outbound

**Inbound** = ti chiamano. In **Calls**, sul numero, imposti se a rispondere è un umano o un agente AI, e quale agente. Se il handler è umano, le **routing rules** in Inbound Call Routing decidono quali operatori squillano (non tutti gli operatori connessi). Puoi anche definire cosa succede se nessuno risponde (tag, messaggio).

**Outbound AI** = Spoki chiama il contatto dallo step **Spoki Voice** in un’automazione (form, reminder, follow-up). Serve consenso valido alle chiamate automatiche: vedi la sezione legale. Il permesso WhatsApp Call (template) è un’altra cosa: vedi più sotto.

Inbound e outbound non sono “lo stesso prompt con un saluto diverso”. Cambia chi inizia, cosa sa già il contatto (`%%FIRST_NAME%%`, `%%PHONE%%`), e se l’agente deve aspettare che l’altro risponda prima di parlare.

---

## 3. I pezzi di un agente vocale

Tieni separati questi elementi. Se li mescoli, l’agente legge cataloghi, URL e nomi di tool al telefono.

| Pezzo | Dove sta | Cosa contiene |
| --- | --- | --- |
| **First Message** | Campo UI, non nel prompt | La prima frase che pronuncia. Qui va la disclosure AI, il brand per cui parla e, in outbound, perché chiama. |
| **System prompt** | Editor prompt | Come si comporta: ruolo, tono, flusso, quando usare i tool, limiti, chiusura. Non cataloghi lunghi. |
| **Knowledge base** | Documenti collegati all’agente | Fatti: orari, indirizzo, policy. Il prompt dice *come*, la KB dice *cosa sa*. |
| **Tools** | Scheda Tools | Capacità reali: cerca in KB, data/ora, calendario, webhook. |
| **Workflow** | Scheda Workflow | Transfer e fine chiamata: da Start, Intent sulla freccia, destinazione e saluto finale nel nodo. |
| **Action** | Scritte nel prompt | Le operazioni che l’agente può fare *dentro* Spoki mentre parla: campi, tag, liste, automazioni, ticket. |
| **Success Criteria** | Campo UI | Il “win” della chiamata: governa i rami dello step Voice **e** quando End Call può chiudere perché l’obiettivo è raggiunto. |

La differenza da memorizzare subito è una sola: **tutto viene letto ad alta voce**. Markdown, elenchi, URL e nomi di tool nel parlato suonano come errori. Le emoji non vengono pronunciate: lasciale fuori dal prompt. Nel prompt puoi usare titoli `#` per *istruire* il modello; l’agente non deve ripeterli al contatto.

Sulle **action** vale la pena spendere due righe: sono le operazioni che l’agente può fare **dentro Spoki** mentre è al telefono, le stesse degli agenti di testo. Le scegli dall’elenco in piattaforma e avvengono in background, senza che il contatto se ne accorga.

**Automazioni**

- Far partire un’automazione sul contatto (deve essere attiva; il contatto non deve essere bloccato).
- Attivare un’automazione in pausa.
- Disattivare un’automazione (si ferma anche chi è già dentro: non è una pausa).

**Contatti**

- Assegnare o togliere tag.
- Leggere i tag già presenti.
- Compilare un campo del contatto (nome, email, o un campo tuo).
- Leggere i valori dei campi.
- Bloccare o sbloccare il contatto.

**Campi e liste**

- Creare un nuovo campo dinamico.
- Aggiungere o togliere il contatto da una lista.

**Ticket**

- Aprire, chiudere o assegnare un ticket.

Quando l’operazione esce da Spoki — prenotare su un calendario, scrivere su un sistema esterno — non è un’action ma un **tool**.

Campi dinamici: nel First Message e nel prompt puoi usare `%%FIRST_NAME%%`, `%%PHONE%%`, `%%EMAIL%%`. La piattaforma li sostituisce **prima** che il modello legga il prompt.

L’editor del prompt arriva a circa **16.000 caratteri**. Oltre, spezzi i fatti nella KB: un prompt più lungo sparge le regole e l’agente le perde.

---

## 4. Tour delle sezioni dell’editor

### Nome

Solo interno. Scegli qualcosa che tu e il team riconoscete in lista e nelle automazioni.

### First Message

È l’apertura della chiamata. Non duplicarla nel system prompt, altrimenti saluta due volte.

Il First Message è una frase fissa: i campi dinamici vengono sostituiti, ma non puoi metterci condizioni o alternative. Se non sei sicuro che `%%FIRST_NAME%%` sia popolato su tutti i contatti che chiami, scrivi un’apertura che sta in piedi senza nome; il nome lo chiede l’agente in conversazione, se serve.

Deve far sentire tre cose, nei primi secondi: che è un **sistema di intelligenza artificiale**, **per conto di quale brand** parla, e che la chiamata è **registrata**. Una riga nei termini o la parola “assistente” non basta. Una voce che suona umana rende *più* necessario dirlo, non meno.

Esempio inbound:

> Buongiorno, sono l'assistente vocale di Rossi Consulting, un sistema di intelligenza artificiale. Questa chiamata è registrata. Come posso aiutarla?

Esempio outbound (adatta azienda e motivo). Senza nome, perché il First Message non ha un piano B:

> Buongiorno, sono l'assistente vocale di [Azienda], un sistema di intelligenza artificiale. La chiamo per confermare l'appuntamento. La chiamata è registrata. È un buon momento?

Dal 2 agosto 2026 l’AI Act UE (art. 50) richiede questa disclosure udibile. Non istruire l’agente a negare di essere un’AI o a fingersi una persona, anche se glielo chiedono. Può parlare *come* lo staff del brand, restando chiaro che è automatico. Non chiedergli di leggere emozioni dalla voce. Clonare la **tua** voce (chi configura Spoki) per doppiare l’agente è possibile: non cloni la voce dei contatti né di altre persone. Una voce clonata rende *più* necessario dire che è un’AI, non meno.

### System prompt

Istruzioni operative, non una “descrizione dell’agente”. Sezioni verticali con titoli, passi numerati, scenari chiari. Dettaglio nella sezione 5.

Puoi partire dal generatore di prompt in piattaforma, poi adattarlo al tuo caso. Un consiglio: se scrivi le istruzioni in **inglese**, di solito l’agente segue meglio il flusso. Le **risposte** restano nella lingua del contatto (in Italia, italiano, se lo specifichi). Sono due cose diverse: prompt in inglese + cliente italiano = risposte in italiano.

### Success Criteria

Servono a *definire il win*: cosa consideri una chiamata andata a buon fine. Non è solo etichetta per i report. Lo stesso obiettivo torna in due punti:

1. **Quando la chiamata si chiude.** L’Intent predefinita di End Call include *the objective of the call is achieved*: l’agente saluta quando gli sembra di aver raggiunto l’obiettivo che hai descritto.
2. **Dove va la chiamata dopo.** L’esito finisce in uno dei rami dello **step Voice**:

- **Success** — obiettivo raggiunto (es. appuntamento confermato **e** tool andato a buon fine).
- **Call me back** — ha chiesto di essere richiamato, o non era un buon momento.
- **Neutral** — la chiamata è avvenuta, ma non è un successo e non è un “richiamatemi”: nessun esito specifico. È il ramo residuo, non un quarto obiettivo da descrivere a parte.
- **No answer / rejected** — non ha risposto o ha riagganciato.

Nei Success Criteria descrivi il risultato che vuoi dalla chiamata in modo concreto e verificabile. Non “il cliente è soddisfatto”, ma “l’appuntamento è a calendario” oppure “l’email è stata ripetuta e confermata”. In pratica si scrive come un elenco di condizioni: *“La chiamata ha successo quando: …”*, una riga per condizione, tool riuscito e campi scritti compresi. Non serve descrivere gli altri rami: quel campo definisce solo il successo.

Questa precisione decide anche **quando l’agente saluta**, per la clausola *objective achieved* vista sopra.

Esempio. Se scrivi “dare le informazioni richieste”, appena ha detto gli orari l’agente considera il lavoro finito e chiude, anche se tu volevi che prima chiedesse l’email. Se scrivi “l’appuntamento è a calendario”, chiude solo dopo la conferma del calendario.

Se preferisci che la chiamata finisca solo quando lo decide il contatto, cancella dall’Intent di End Call la parte *or the objective of the call is achieved*: restano il saluto e la richiesta esplicita di chiudere.

**Il prompt non sceglie il ramo.** I rami (success / neutral / call me back / no answer) stanno nello step Voice dell’automazione: li colleghi tu lì.

### Voce, velocità, temperatura

- **Voce:** scegli un profilo allineato al brand (es. Francesca, Katie, Ronald), oppure clona la **tua** voce per doppiare l’agente. Non cloni la voce dei contatti.
- **Velocità:** resta tra **0,9x e 1,1x**. Più veloce suona meccanico, più lento appesantisce.
- **Temperatura:** tre livelli, non un numero. Parti da **Deterministic**. **Deterministic** = risposte più sempre uguali (conferme, dati, orari). **Normal** = più equilibrio, se il parlato suona troppo rigido. **Creative** = più variazione, più rischio di inventare. Il tono (caldo, breve, formale) lo scrivi nel prompt, non alzando la temperatura.

### Knowledge base

Collega i documenti all’agente: crearli non basta. Una KB per scopo, senza orari contraddittori in due file. Nella KB metti fatti, non regole di conversazione.

Nel prompt devi dirgli di chiamare `search_knowledge_base` prima di rispondere su fatti. Se ignora la KB, cerca prima duplicati e conflitti tra documenti.

### Tools

Ogni tool citato nel prompt deve esistere sull’agente, con **lo stesso nome**.

Tool di base ricorrenti:

- `search_knowledge_base` — consulta la KB.
- `get_current_datetime` — data e ora (indica il fuso, di solito `Europe/Rome`).

Poi i tool extra che attacchi tu: calendario, webhook di raccolta dati, CRM.

Nel prompt: quando chiamarli, quali campi passare, **non leggere ad alta voce** l’output tecnico, non promettere “ti mando un WhatsApp” o “ti metto un tag” se non c’è un tool o un’automazione che lo fa davvero.

Non dire al contatto che l’appuntamento è prenotato o che la richiesta è registrata **prima** che il tool risponda con successo.

### Workflow (transfer e fine chiamata)

Transfer e **End Call** si configurano nella scheda **Workflow** dell’agente, non sulla scheda della singola chiamata e non tra i tool. Per ogni azione: la trascini sul canvas, la **colleghi a Start**, clicchi la freccia e apri **Edge Condition**.

Quando crei un agente vocale **da zero**, il sistema mette già un nodo **End Call** collegato a Start, con Intent precompilata: *The user says goodbye or hangs up, the user asks to end the call, or the objective of the call is achieved.* La terza parte — *objective achieved* — è il win dei **Success Criteria**. Se lì hai scritto un obiettivo largo, questa Intent chiude la chiamata appena l’AI lo ritiene raggiunto. Allinea le due frasi, o togli quella clausola se vuoi chiudere solo su saluto / “fine chiamata”. Puoi adattare il nodo o aggiungere i transfer allo stesso modo.

- **Condition Type:** **Intent**.
- **Condition Description:** una frase su cosa deve essere vero nella chiamata. L’AI la valuta sul parlato. Best practice: scriverla in **inglese**, come il prompt (es. *the user wants to speak with a human*, *the user says goodbye*).

In genere **basta il Workflow**: non serve ripetere la stessa condizione nel prompt.

Tre transfer:

- **Agent Transfer** — passa a un altro agente AI. Nel nodo scegli da dropdown quale **agente vocale attivo** riceve la chiamata.
- **Platform Transfer** — passa a un operatore umano. Squillano gli operatori scelti in [Inbound Call Routing](https://app.spoki.com/calls?tab=inbound_routing), non tutti gli operatori connessi.
- **SIP Transfer** — passa a un numero di telefono esterno, anche non collegato a Spoki.

**End Call** chiude quando l’AI riconosce nella chiamata ciò che hai scritto nell’Intent (saluto, “voglio chiudere”, obiettivo raggiunto). Non è un riaggancio automatico della linea.

Nel nodo End Call ci sono due campi: **Label**, il nome che vedi sul canvas, e **Farewell Message**, la frase che l’agente pronuncia prima di chiudere. Il saluto finale vive qui, non nel prompt: come per il First Message, se lo scrivi anche nel prompt il contatto lo sente due volte.

Nell’Intent di End Call metti anche i casi in cui la chiamata **deve** finire, non solo quelli in cui finisce da sé. Il tipico è il rifiuto della registrazione: l’agente non può spegnerla mentre parla, quindi la risposta corretta è ringraziare e chiudere. Aggiungi la clausola all’Intent, per esempio *…or the user does not want the call to be recorded*, e tieni un Farewell Message che regge anche in quel caso (“Grazie, buona giornata.”), senza discutere e senza ripetere la disclosure.

### Playground

In alto a destra: **Playground**, scegli l’agente, **Start Call**. Parla come un cliente. Prova a interrompere, a cambiare argomento, a fare silenzio, a rifiutare, a chiedere un umano.

Itera: 10–15 tentativi “killer” sullo scopo dell’agente. Annota quando e come sbaglia. Scrivi una seconda versione che chiude quei buchi. Ripeti finché i percorsi principali tengono. Lavora su una **copia** di test e porta in live solo dopo.

Poi in **Calls**: ascolta la registrazione, leggi la trascrizione e il riassunto. Se l’agente legge URL, elenchi o nomi di tool, il prompt (o un tool mal descritto) è ancora da pulire.

Non collegare l’automazione live finché i percorsi principali non passano in Playground.

Le registrazioni e le trascrizioni sono dati personali: accedici solo se ti serve, con tempi di conservazione coerenti con la tua informativa.

---

## 5. Come si scrive un prompt vocale

Il prompt è un copione operativo. Il modello lo rilegge dall’alto verso il basso.

Le 2–3 regole che **rompono la chiamata** se falliscono stanno in **Role**, in alto: non inventare orari, non confermare un booking senza tool, dire di essere un’AI se te lo chiedono.

Il resto dei divieti sta in un blocco **Limits** intitolato, **dopo Tools e prima di Closing**. Non mescolarli nel Flow. Non serve copiare due volte lo stesso elenco: Role ha gli stop critici, Limits il resto (URL, markdown, opt-out, rifiuto registrazione).

### Sezioni consigliate (titoli in inglese nel testo che incolli)

1. **Role** — chi è, inbound o outbound, un solo obiettivo, per quale brand. Qui anche le 2–3 regole che non devono fallire (non inventare, non confermare senza tool, ammettere di essere un’AI).
2. **Language** — rispondi nella lingua del contatto, con l’italiano come default se lo imposti.
3. **Tone** — massimo 2–3 frasi a turno, una domanda, niente riempitivi, non ripetere il turno precedente.
4. **User data** — elenco `%%CAMPO%%` e regola: se c’è già, non richiederlo.
5. **Flow** — passi numerati. Prima riga: il First Message ha già salutato, **non risalutare**. In outbound: non parlare finché l’altro non risponde, se è la regola che hai scelto.
6. **Tools** — nome esatto, quando, quali campi, cosa dire dopo il successo o l’errore. Transfer e End Call: Intent sulla scheda Workflow, non in questa sezione.
7. **Limits** — dopo Tools, blocco visibile. Una riga per caso, con l’alternativa da offrire, non solo il divieto: se non sa, propone un operatore; non legge URL, markdown, codici campo, nomi di tool; non chiede dati particolari (salute, religione) e non li ripete se arrivano spontanei; se chiedono di non essere più chiamati o rifiutano la registrazione, accetta e non insiste (a chiudere ci pensa End Call). Non è un secondo Role.
8. **Closing** — come si arriva alla fine (chiedi se serve altro, gestione silenzio / audio incomprensibile). La **frase di saluto** no: sta nel Farewell Message del nodo End Call.

Preferisci istruzioni positive (“proponi solo lo slot che ti ha dato il tool”) a liste infinite di ALWAYS/NEVER. Dai un’alternativa, non solo un divieto: “se non sai rispondere, proponi il passaggio a un operatore”, non solo “non inventare”. Evita emoji nel prompt: non vengono pronunciate.

### Regole del parlato

- Una domanda per turno.
- Orari e date in forma parlata (“martedì alle quattordici e trenta”), non `14:30` o ISO.
- Email: fai **compitare**, poi conferma a voce (“mario punto rossi chiocciola …, confermi?”).
- Niente URL nel prompt e nel parlato: l’agente li legge lettera per lettera.
- Se il contatto è in silenzio o si sente solo rumore: un tentativo, poi lascia chiudere il nodo End Call.

### Errori da non fare

- Incollare un prompt chat WhatsApp.
- Mettere cataloghi e FAQ lunghe nel prompt invece che in KB.
- Duplicare nel prompt il saluto iniziale (First Message) o quello finale (Farewell Message).
- Temperatura su Creative per un agente che deve solo confermare dati o orari.
- Nascondere che è un’AI.
- Credere che il prompt scelga il ramo dell’automazione dopo la chiamata.

---

## 6. Esempio: agente inbound che prende appuntamenti

Esempio fittizio, “Rossi Consulting”. Il contatto chiede un appuntamento: l’agente raccoglie i dati che mancano, cerca uno slot libero sul calendario, crea l’evento e scrive data e ora sul contatto.

Due cose devono esistere prima: il **tool calendario** collegato nella scheda Tools e un **campo dinamico data e ora** sul contatto (qui `APPUNTAMENTO_DATAORA`).

### First Message (campo UI, parlato in italiano)

```text
Buongiorno, sono l'assistente vocale di Rossi Consulting, un sistema di intelligenza artificiale. Questa chiamata è registrata. Come posso aiutarla?
```

### System prompt (incolla nell’editor; istruzioni in inglese)

```markdown
# Role

You are the inbound voice agent of Rossi Consulting, an AI system acting for that company. Your only job is to book one appointment. You do not sell and you do not qualify the contact. Never tell the contact the appointment is booked before the calendar tool confirms it. Never invent a slot. If asked whether you are an AI, say yes.

# Language

Reply in the contact's language. Default Italian if the language is unclear.

# Tone

At most two or three spoken sentences per turn. One question only. Everything you say is read aloud: no markdown, lists, symbols, URLs or emoji. Do not mention tool names or field codes to the contact. Do not repeat the previous turn.

# User data

The platform fills these fields before the call. An empty field arrives as the word unknown, for example FIRST_NAME=unknown. Treat unknown as missing and ask for it. If a field carries a real value, use it and never ask for it again.

- first name: %%FIRST_NAME%%
- last name: %%LAST_NAME%%
- email: %%EMAIL%%
- phone: %%PHONE%%

Do not ask for the phone number unless the contact gives you a different one.

# Flow

The First Message already greeted the contact. Start from their answer. Do not greet again.

1. If the first name is unknown, ask for it, then save it with @@action:set_contact_field_value?field_code=FIRST_NAME@@
2. If the last name is unknown, ask for it, then save it with @@action:set_contact_field_value?field_code=LAST_NAME@@
3. If the email is unknown, ask the contact to spell it, repeat it back in spoken form, ask for a yes or no confirmation, then save it with @@action:set_contact_field_value?field_code=EMAIL@@
4. If the contact has not asked for an appointment yet, ask whether they want to schedule it now. If they refuse, thank them.
5. Call get_current_datetime with timezone Europe/Rome, then ask the calendar tool for free slots. Propose one slot at a time, in Italian local time, and ask the contact to confirm it.
6. If the contact refuses the slot, propose the next free slot from the same tool answer. Never invent a time. If no slot is left, offer a callback from a colleague.
7. Only when the contact accepts a slot, call the calendar tool to create the event, with the confirmed email as attendee. Say nothing about the outcome until the tool answers.
8. Only after the tool confirms the event, save the appointment with @@action:set_contact_field_value?field_code=APPUNTAMENTO_DATAORA@@ Write exactly YYYY-MM-DD HH:mm in Italian local time, for example 2026-09-01 14:15. Never day/month/year.
9. Confirm date and time to the contact in spoken form. If the tool returned a meeting link, do not read it out loud: say the invitation was sent to their email.
10. If this conversation already created the event, do not create it again. Replies like ok, grazie or perfetto are not a new request.

# Tools

- get_current_datetime: current date and time, timezone Europe/Rome.
- the calendar tool: free slots and event creation. It needs a confirmed email.

Rules:

- Weekdays only, from 09:00 to 18:00 Italian time. Use only the slots the tool reports as free.
- The calendar works in UTC. Say Italian local time to the contact and write Italian local time in the field, but create the event with the exact UTC time the tool returned.
- The appointment lasts fifteen minutes.
- If event creation fails, retry once with the same slot. If it fails again, apologize, say you could not complete the booking, and do not save the field.

# Limits

Do not read URLs, markdown or field codes aloud. Without the last name and a confirmed email you cannot book: say why, and do not call the calendar tool. If the contact does not want the call recorded or asks not to be contacted again, thank them and do not insist: do not argue and do not repeat the disclosure. The End Call node closes the call.

# Closing

After the confirmation, ask if they need anything else. Do not say goodbye yourself: the farewell is in the End Call node. If there is silence or noise only, try once, then stop talking.
```

Il saluto finale (“Buona giornata”) sta nel **Farewell Message** del nodo End Call, non qui.

### Knowledge base (documento collegato)

Il calendario dice quando; la KB risponde alle domande che arrivano intorno all’appuntamento. Tienila corta.

```markdown
# Rossi Consulting — informazioni per l'appuntamento

## L'incontro

- Dura quindici minuti, in videochiamata.
- Partecipa un consulente. L'invito arriva per email.

## Se serve spostarlo

Si sposta richiamando questo numero. Non serve disdire prima.

## Cosa non facciamo al telefono

Preventivi e prezzi non si danno in chiamata: se ne parla nell'incontro.
```

### Success Criteria (campo UI)

```text
La chiamata ha successo quando:
- Nome, cognome ed email sono popolati sul contatto (già presenti o raccolti in chiamata).
- Il tool calendario ha creato l'evento.
- APPUNTAMENTO_DATAORA è stato scritto in formato YYYY-MM-DD HH:mm, con l'ora italiana dell'appuntamento.
- Il contatto ha ricevuto conferma di data e ora.
```

Scritto così, il win include il tool riuscito e il campo scritto: l’agente non considera l’obiettivo raggiunto — e quindi il nodo End Call non chiude — quando ha soltanto proposto uno slot.

### Runtime

Temperatura Deterministic. Velocità voce 0,9x–1,1x. Tool: calendario e data/ora. Workflow: basta il nodo **End Call** precompilato, non serve transfer. KB collegata.

### Dopo la chiamata

`APPUNTAMENTO_DATAORA` è il punto di aggancio: da quel campo puoi far partire un’automazione che manda un reminder WhatsApp due giorni prima e uno due ore prima, con un bottone di conferma. Se il contatto ha già confermato, il secondo reminder non parte.

---

## 7. Dalla prova alla chiamata vera

Quando l’agente regge in Playground:

1. **Automazioni** → nuova automazione (o modifica di una esistente).
2. Aggiungi l’azione **Spoki Voice** (step Voice). Lì scegli:
   - quale **agente**
   - il **canale** (WhatsApp Call o VoIP)
   - se hai più numeri, quale usare e con quale strategia (serve anche a ridurre il rischio che le chiamate vengano segnalate come indesiderate)
   - la **fascia oraria** in cui la chiamata AI può partire
3. Configura i **rami del workflow** (success / neutral / call me back / no answer) in modo coerente con i Success Criteria. Il prompt non li seleziona. Esempio: no risposta → messaggio di follow-up; call me back → secondo agente o reminder su data.

**WhatsApp Call outbound:** prima della chiamata devi inviare il **template di permesso** (24 ore oppure permanente). Senza template la chiamata non arriva. Un contatto che **ti chiama** su WhatsApp **non** ti concede il permesso di richiamarlo tu. Lo stato del permesso lo vedi nella barra laterale del contatto.

Consenso alle chiamate automatiche (servizio / privacy) e permesso WhatsApp Call sono due cose distinte. Servono entrambi quando il canale è WhatsApp.

**Orari:** oltre al vincolo normativo, il sistema **blocca le chiamate AI in uscita di notte e nel fine settimana**. Progetta le automazioni di conseguenza: una chiamata pianificata fuori finestra non parte.

Un agente vocale **non condivide il transcript** con il successivo: tra una chiamata e l’altra restano solo i campi già salvati sul contatto (`%%...%%`). Nello step Voice scegli tu quale agente parte; non c’è l’orchestratore del testo che “pesca” l’agente dalla chat.

---

## 8. Numeri, orari e report

### Il numero va pianificato

L’attivazione di un numero VoIP non è immediata: in genere qualche giorno lavorativo, in casi eccezionali molto di più. Se hai una data di partenza (campagna, apertura, stagione), muoviti prima: il prompt lo scrivi in un pomeriggio, il numero no.

Attenzione alla reputazione del numero. Tante chiamate molto brevi, una dopo l’altra, sono il segnale tipico che porta al blocco del numero. Se vedi la durata media crollare, ferma le chiamate in uscita e sistema il flusso prima di ripartire.

### Cosa guardi nei report voce

| Metrica | Cosa misura | Perché ti serve |
| --- | --- | --- |
| **Total Voice Agents** | Quanti agenti vocali hai attivi | Fotografia di com’è strutturato il tuo layer voce |
| **Total Calls** | Chiamate gestite | Volume reale, non teorico |
| **Average Duration** | Durata media delle chiamate | Il campanello d’allarme: sotto i **10 secondi** significa che riagganciano subito |
| **Total AI Call Duration** | Durata cumulata di tutte le chiamate | Quanto stai davvero usando il sistema |

I dati sono filtrabili per periodo: 7, 30, 90 giorni o intervallo personalizzato. Per un confronto mensile usa il filtro a 30 giorni: è quello che rende i numeri leggibili nel tempo.

Una durata media bassa non si risolve nel report: si risolve nel First Message (apertura poco chiara, disclosure che spaventa), nel flusso (troppe domande), o in un win troppo largo nei Success Criteria che fa scattare End Call troppo presto.

---

## 9. Checklist prima di andare live

- [ ] Canale VoIP con numero attivo, oppure WhatsApp Call attivato da Your Channel (non disponibile sui numeri in coexistence).
- [ ] First Message: AI, brand, registrazione. Farewell Message impostato nel nodo End Call, con Intent che copre anche il rifiuto della registrazione. Nessuno dei due ripetuto nel prompt.
- [ ] Prompt in inglese, risposte nella lingua del contatto; parlato breve; niente chat WhatsApp, niente URL; action solo come effetto silenzioso, mai pronunciate; sotto i 16k caratteri.
- [ ] Ogni tool nel prompt esiste sull’agente, nome uguale. Transfer o End Call: collegati a Start nel Workflow, Intent in inglese sulla freccia.
- [ ] KB collegata, senza conflitti, senza istruzioni di comportamento.
- [ ] Success Criteria: win preciso, stessi termini dell’Intent End Call (*objective achieved*); rami dello step Voice collegati nel workflow, non nel prompt.
- [ ] Temperatura: parti da Deterministic (non un numero); alza a Normal solo se serve più naturalezza; velocità 0,9x–1,1x.
- [ ] Playground: 10–15 tentativi killer, poi iterazione. Registrazione ascoltata.
- [ ] Outbound: consenso alle chiamate automatiche; se canale WA, template di permesso; fascia oraria rispettata; CLI visibile e richiamabile; informativa su registrazione e trascrizione.
- [ ] Numero attivato con margine sulla data di partenza; automazioni fuori dalla finestra notturna e del weekend.
- [ ] Dopo i primi giorni: guarda Total Calls e Average Duration prima di alzare i volumi.

---

## 10. Cose da sapere in breve (legale)

Sei titolare del trattamento delle chiamate. Spoki opera come responsabile secondo contratto e DPA. Questa sezione è informativa, non sostituisce un parere legale.

- **Dire che è un’AI** nei primi secondi, **per conto di quale brand**, e confermarlo se chiesto. La voce naturale non sostituisce la disclosure.
- **Outbound:** consenso preventivo documentato alle chiamate automatiche; verifica anche il Registro Pubblico delle Opposizioni e le regole di settore; resta nella fascia oraria consentita.
- **WhatsApp Call:** template di permesso prima di chiamare tu; l’inbound non vale come permesso outbound.
- **Registrazione e trascrizione:** citale in apertura e nella tua informativa; conserva solo il necessario. L’agente non può disattivare la registrazione in chiamata: se il contatto la rifiuta, ringrazia e chiude (clausola nell’Intent di End Call).
- **Numero chiamante** reale e richiamabile (regole AGCOM sul CLI), sul canale VoIP.
- **Dati particolari** (salute, religione, ecc.): non chiederli; se arrivano spontanei, non ripeterli.
- Opt-out: se chiedono di non essere più chiamati, accetta e chiudi.
- Niente lettura delle emozioni dalla voce. Puoi clonare la tua voce per l’agente; non quella dei contatti né di altre persone.

Per usi su larga scala valuta una DPIA con il tuo DPO.

---

## 11. FAQ rapide

**Non trovo un pulsante per attivare il canale voce.** Sul VoIP non serve: il canale in [app.spoki.com/channels/voice](https://app.spoki.com/channels/voice) si accende quando il numero è attivo. WhatsApp Call, invece, si attiva da Your Channel.

**Non riesco ad attivare WhatsApp Call.** Guarda come è collegato il numero. Se lo usi in coexistence, insieme all’app WhatsApp Business, WhatsApp non prevede le chiamate su quel collegamento: nessuna configurazione lato Spoki lo sblocca. Per la voce usa il canale VoIP con un numero dedicato.

**Posso dirottare “questa chiamata” verso un altro numero dalla scheda chiamata?** No. Transfer e End Call stanno sulla scheda **Workflow** dell’agente: colleghi il nodo a Start e sulla freccia imposti l’Intent (in inglese). Agent Transfer, Platform Transfer o SIP Transfer.

**Devo ripetere l’Intent anche nel prompt?** No. In genere basta il Workflow.

**Chi squilla su un transfer platform?** Gli operatori scelti in Inbound Call Routing, gli stessi delle chiamate umane inbound.

**Il prompt decide se la chiamata è un successo?** No. Tu definisci il win nei Success Criteria. Quello stesso win entra nell’Intent di End Call (*objective of the call is achieved*) e, a chiamata chiusa, nei rami dello step Voice. Neutral è il residuo: chiamata avvenuta, niente win e niente “richiamatemi”.

**L’agente chiude troppo presto?** Il win è probabilmente troppo largo, e l’Intent predefinita di End Call lo tratta come obiettivo raggiunto. Stringi i Success Criteria e allinea (o togli) la clausola *objective achieved*.

**L’agente ignora la knowledge base?** Verifica che sia collegata e che il prompt chiami `search_knowledge_base` sui fatti. Poi cerca documenti duplicati o in conflitto.

**Una chiamata vocale consuma una conversazione WhatsApp?** Sì, ogni chiamata ne scala una. Se però sei già dentro una finestra di conversazione aperta nelle 24 ore precedenti, non ne viene scalata un’altra.

**Posso scaricare la registrazione e la trascrizione?** L’audio della chiamata si scarica. La trascrizione la trovi in testo e la copi dalla piattaforma.

**Come capisco perché ha risposto così?** Nel Playground la sezione **Fonte** mostra quale agente ha risposto e quali documenti della knowledge base ha usato. È il primo posto dove guardare quando una risposta ti sembra inventata.

**La durata media è bassissima, dove intervengo?** Prima sull’apertura e sulle prime due domande, non sul finale: la gente riaggancia all’inizio. Poi ferma le chiamate in uscita finché non hai sistemato, per non bruciare il numero.

---

## 12. Cosa non copre questa guida

Agenti **testuali** WhatsApp e il loro orchestratore multi-agente, MCP, integrazione API custom, progettazione avanzata di calendari e fusi, chiamate umane da chat.

Per quelle parti affiancati al referente Spoki o al corso avanzato. Se un problema di voce non si capisce in un quarto d’ora (audio, ASR, tool che non rispondono), non allungare il prompt: è un tema di configurazione o di piattaforma.
