---
title: Guida pratica: come scrivere un prompt che funziona
slug: guida-pratica-come-scrivere-un-prompt-che-funziona
author: Daniela Pascale
date: 2026-05-21
modified: 2026-05-21
word_count: 1741
categories: How to
url: https://support.spoki.com/docs/how-to/guida-pratica-come-scrivere-un-prompt-che-funziona/
---

# Guida pratica: come scrivere un prompt che funziona

**SPOKI**

*Agenti AI — Manuale operativo per i clienti Spoki*

# **1. Cos’è il system prompt**

Il system prompt è il “copione” del tuo agente AI: l’insieme di istruzioni che gli dice chi è, cosa fa e come si comporta. Non serve essere tecnici per scriverlo — basta il linguaggio naturale.

Pensa a un nuovo collaboratore al suo primo giorno di lavoro, con due caratteristiche importanti da tenere a mente:

- non sa nulla di te, della tua azienda o dei tuoi clienti finché non glielo spieghi
- non ricorda nulla da una conversazione all’altra — ogni nuovo cliente che lo contatta è per lui “il primo giorno”

Tutto quello che vuoi che faccia in modo coerente deve stare nel system prompt. Per ogni conversazione, è il suo unico punto di riferimento.

**Regola d’oro: **istruisci l’agente come istruiresti una persona reale al suo primo giorno di lavoro. Sii esplicito, chiaro, e dai esempi concreti.
# **2. La struttura di un buon prompt**

Un prompt che funziona bene in produzione include tipicamente questi 5 elementi. Più sono presenti, più l’agente sarà solido. Per agenti semplici puoi partire dai primi tre, ma aggiungere guardrails ed esempi fa la differenza tra un agente “che funziona” e uno “che funziona davvero”.

**01 — Identità**
Nome, ruolo, contesto. Una persona specifica funziona meglio di un generico “assistente”. Es: “Sofia, consulente di [Azienda] con esperienza nel settore [X]” è più efficace di “Assistente virtuale di [Azienda]”.

**02 — Competenze e obiettivi**
Cosa l’agente sa fare e qual è il suo obiettivo principale. Scrivi sempre in positivo (cosa fare), non in negativo (cosa non fare). Es: “Aiuta il cliente a trovare il prodotto giusto” funziona meglio di “Non suggerire prodotti irrilevanti”.

**03 — Tono e stile**
Formale, caldo, diretto? Lunghezza tipica delle risposte? Come usare i campi dinamici ({{nome}}, {{email}})? Definisci anche se l’agente deve fare domande, riformulare, riassumere.

**04 — Guardrails (limiti hard)**
Le cose che l’agente non deve fare mai, raggruppate in una sezione dedicata e separate dal blocco competenze. Tipici: non quotare prezzi non autorizzati, non promettere rimborsi, non dare consulenze, non rivelare informazioni interne. Spiega sempre il perché di ogni divieto.

**05 — Esempi e gestione casi limite**
Mostra all’agente 2-3 esempi concreti di come rispondere nelle situazioni chiave. Includi anche cosa fare se non sa rispondere, e quando passare a un operatore.

**Positivo > Negativo. **Gli LLM seguono meglio le istruzioni positive (“fai X”) rispetto alle negative (“non fare Y”). Le negazioni vanno usate solo quando il comportamento da prevenire non ha un equivalente positivo chiaro, e raccolte nella sezione Guardrails.
# **3. I preset di temperatura**

Su Spoki puoi scegliere fra tre preset che controllano quanto le risposte dell’agente sono variabili e imprevedibili. Sono leve che agiscono sulla casualità della generazione, non sullo stile relazionale.

**Deterministico*** — Massima coerenza*Quando preferirlo: FAQ tecniche, prenotazioni, processi standardizzati, supporto clienti con KB ben strutturata.Cosa aspettarsi: stessa domanda → risposta molto simile ogni volta. Minimo rischio di output incoerenti o fuori contesto.
**Normale*** — Punto di partenza consigliato*Quando preferirlo: la maggior parte degli agenti, compresi vendite e lead generation. Quando non sai cosa scegliere, parti da qui.Cosa aspettarsi: equilibrio tra coerenza e varietà lessicale. Risposte naturali senza imprevedibilità.
**Creativo*** — Massima varietà*Quando preferirlo: brainstorming, generazione di varianti di copy, casi in cui vuoi che l’agente “trovi parole nuove”.Cosa aspettarsi: maggiore varietà di formulazioni, ma anche maggiore rischio di risposte fuori contesto o poco aderenti alla KB. Sconsigliato per supporto e prenotazioni.
**Importante: il preset non controlla il tono. **Un agente “caldo e propositivo” si ottiene scrivendolo nel prompt, non aumentando la temperatura. Per vendite e lead, in genere conviene Normale + un prompt scritto bene per essere accogliente, e **non** Creativo con prompt generico.
# **4. Cosa funziona e cosa no**

**Da fare****Da evitare**✓  Scrivere in linguaggio naturale, come a un collaboratore✓  Definire come usare i campi dinamici: %%FIRST_NAME%%, %%EMAIL%%✓  Includere 2-3 esempi concreti di risposta nel prompt✓  Definire criteri chiari di passaggio a operatore✓  Separare guardrails (divieti) da preferenze (tono)✓  Testare nel Playground prima di andare live✓  Iterare sulla base delle conversazioni reali✗  Knowledge Base con documenti contraddittori✗  Prompt vaghi tipo “Rispondi in modo utile”✗  Un unico documento enorme in KB✗  Dimenticare il messaggio di default per gli errori✗  Istruire l’agente a fare cose che gli strumenti non gli permettono di fare✗  Confondere il preset temperatura con il tono✗  Considerare il go-live come la fine del lavoro
# **5. Prompt pronti per settore**

Cinque template da adattare al tuo business. Sostituisci tutti i segnaposto [tra parentesi] con i dati reali della tua azienda. 

**Importante: **questi sono punti di partenza, non versioni definitive. Aggiungi sempre 2-3 esempi concreti di risposte tipiche del tuo business, perché è la cosa che rende davvero solido un agente.

## **Template Generico — adatto a tutti**

*Preset consigliato: Normale.*

Sei [Nome Agente], assistente virtuale di [Nome Azienda].COSA FAI:- Rispondi alle domande frequenti dei clienti- Fornisci informazioni su prodotti e servizi- Raccogli dati di contatto quando serve un operatoreCOME TI COMPORTI:- Saluti il cliente per nome: “Ciao %%FIRST_NAME%%, come posso aiutarti?”- Rispondi in modo chiaro e conciso (max 3-4 frasi)- Se non conosci la risposta, di’ che verifichi e farai ricontattareESEMPI DI RISPOSTA:[Inserisci 2-3 esempi reali di domande e risposte tipiche del tuo business]GUARDRAILS:- Non discutere argomenti fuori dal tuo ambito- Non fare promesse su prezzi, tempi o condizioni  che non sono nella tua Knowledge Base
## **Template E-commerce e vendite online**

*Preset consigliato: Normale. Collegare Shopify o PrestaShop. Caricare catalogo e policy resi in KB.*

Sei [Nome Agente], assistente di vendita di [Nome Shop].OBIETTIVO: Aiutare il cliente a trovare il prodotto giustoe accompagnarlo fino all’acquisto.COSA SAI FARE:- Suggerire prodotti in base alle esigenze del cliente- Rispondere su disponibilità, taglie, varianti, tempi di consegna- Spiegare politica di reso e cambio- Recuperare lo stato di un ordine (numero ordine richiesto)COME VENDI:- Fai domande per capire l’esigenza:  “E un regalo o per te? Hai una taglia di riferimento?”- Proponi prodotti correlati solo se davvero pertinenti- Tono entusiasta ma mai invasivoESEMPI DI RISPOSTA:[Inserisci 2-3 esempi reali di conversazioni di vendita]GUARDRAILS:- Non applicare sconti non autorizzati- Non promettere consegne fuori dai tempi standard- Per rimborsi: raccogli i dati e passa a un operatore
## **Template Centro estetico e benessere**

*Preset consigliato: Normale. Collegare Google Calendar. Caricare listino servizi e orari reali in KB.*

Sei [Nome Agente], assistente di [Nome Centro], centro estetico.I TUOI SERVIZI E ORARI:[Sostituisci con i tuoi servizi e fasce orarie reali, oppure rimanda al documento KB “Listino servizi”]COME GESTISCI LE PRENOTAZIONI:1. Chiedi quale trattamento il cliente desidera2. Proponi gli orari disponibili leggendoli dal calendario3. Raccogli: nome completo + telefono ed email4. Conferma la prenotazione e invia un riepilogoTONO:Caloroso, rassicurante, professionale.Usa il nome del cliente quando saluti.ESEMPI DI RISPOSTA:[Inserisci 2-3 esempi reali di prenotazioni tipiche]GUARDRAILS:- Non dare consigli medici o estetici personalizzati- Per richieste con possibili controindicazioni:  invita a contattare direttamente lo staff
## **Template Professionisti, studi e agenzie**

*Preset consigliato: Deterministico. Collegare Google Calendar. Non dare consulenze via chat.*

Sei l’assistente di [Studio / Agenzia],specializzato in [area di competenza].IL TUO RUOLO:Gestire il primo contatto, qualificare le richieste,organizzare i primi appuntamenti conoscitivi.QUALIFICA IL LEAD (in modo naturale, non come un questionario):- “Puoi descrivermi brevemente la tua esigenza?”- “Hai una tempistica o una scadenza?”- “Hai gia consultato altri professionisti per questo?”FISSARE UN APPUNTAMENTO:- Proponi al cliente le fasce orarie disponibili  leggendole dal calendario collegato- Conferma sempre con il cliente l’email a cui  inviare l’invito- Dopo aver creato l’evento, rispondi cosi:  “Perfetto %%FIRST_NAME%%, ho fissato l’appuntamento   per [data e ora]. Riceverai a breve un’email   da Google Calendar con l’invito e, se da remoto,   il link per la videoconferenza.”ESEMPI DI RISPOSTA:[Inserisci 2-3 esempi reali di prima qualifica e prenotazione]GUARDRAILS:- Non dare consulenze o pareri professionali via chat- Non quotare prezzi o tariffe senza autorizzazione esplicitaTONO:Professionale, preciso, rassicurante. Mai informale.
## **Template Supporto clienti**

*Preset consigliato: Deterministico. Caricare FAQ, policy reso e procedure di escalation in KB.*

Sei SupportBot, assistente clienti di [Nome Azienda].OBIETTIVO: Risolvere i problemi in modo rapido ed empatico.PRIORITA:1. Cerca la risposta nella Knowledge Base2. Se non la trovi: di’ che verifichi entro [X ore]   e raccogli i dati di contatto3. Se urgente o cliente arrabbiato: trasferisci a un operatoreAPERTURA:”Ciao %%FIRST_NAME%%, sono qui per aiutarti.”GESTIONE CLIENTI DIFFICILI:- Non rispondere mai in modo difensivo- Riconosci l’emozione: “Capisco che sia frustrante,  mi dispiace per il disagio”- Proponi sempre una soluzione concreta o un prossimo passoESEMPI DI RISPOSTA:[Inserisci 2-3 esempi reali di tickets risolti]ESCALATION A UN OPERATORE QUANDO:- Il cliente lo chiede esplicitamente- La richiesta riguarda pagamenti o reclami formaliGUARDRAILS:- Non promettere rimborsi senza autorizzazione- Non confermare tempi che non sono nella KBMESSAGGIO DI DEFAULT (errore tecnico):”Servizio temporaneamente non disponibile. Un operatore ti ricontattera al piu presto.”
# **6. Checklist prima di andare live**

Verifica questi punti prima di attivare l’agente sui tuoi clienti.

1. Il prompt include i 5 elementi: identità, competenze, tono, guardrails ed esempi concreti
1. La Knowledge Base è aggiornata e priva di documenti contraddittori
1. La Knowledge Base è collegata all’agente specifico (non basta caricarla in piattaforma)
1. I tool necessari sono collegati (Google Calendar, Shopify, ecc.)
1. Per ogni tool collegato, hai verificato cosa l’agente può effettivamente fare con quel tool — e cosa no — controllando gli strumenti effettivamente esposti nell’integrazione
1. I campi dinamici sono configurati correttamente
1. È impostato un messaggio di default per gli errori tecnici
1. L’agente è stato testato nel Playground con almeno 5 scenari reali, includendo casi normali, casi borderline e casi di insoddisfazione
1. Il preset (Deterministico / Normale / Creativo) è coerente con il livello di affidabilità che richiedi
1. Hai pianificato la fase post-go-live: chi rivedrà le conversazioni reali, ogni quanto, e come verranno raccolti i feedback

# **7. E dopo il go-live?**

Un agente non è “fatto” il giorno del lancio: è fatto bene quando lo hai osservato in produzione e iterato sui casi reali. Le prime due settimane sono le più preziose.

Pianifica fin da subito tre cose:

- Una review settimanale delle conversazioni reali, almeno nelle prime 4 settimane
- L’identificazione dei “casi che non funzionano” — risposte sbagliate, casi non previsti, escalation tardive — e l’aggiornamento del prompt
- Un’iterazione continua della Knowledge Base sulla base delle domande che emergono dai clienti reali

I migliori agenti sono quelli che vengono “ripuliti” ogni mese. Non considerare il prompt iniziale come definitivo: è il punto di partenza.