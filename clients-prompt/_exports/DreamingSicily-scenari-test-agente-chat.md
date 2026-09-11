# Dreaming Sicily — Scenari di test dell’assistente WhatsApp

**Agente:** Agente Chat  
**Account Spoki:** 53917  
**Link agente:** [app.spoki.com/ai/agent/6f124d16-c884-4331-8211-175fb60ee60d](https://app.spoki.com/ai/agent/6f124d16-c884-4331-8211-175fb60ee60d)  
**Data verifica:** 18 agosto 2026  
**Ambiente:** playground di test e WhatsApp reale (numeri personali)

---

## Contesto

A seguito del feedback del cliente sui test effettuati con la versione **v3.4**, è stata elaborata la versione **v3.5** del prompt, che unisce:

1. **Struttura e tono del flusso originale** costruito e ottimizzato nel tempo (domande brevi, una alla volta, emoji, percorsi dedicati).
2. **Operatività Spoki** verificata in piattaforma (tag con ID reali, automazione di assegnazione operatore **546258**, trasferimento chat al consulente, knowledge base FAQ).
3. **Correzioni mirate** emerse dai test: anagrafica solo su campi mancanti, tag **Priorita_SOS** per pratiche e domande tecniche, distinzione crociera di linea / charter nautico.

Gli scenari sotto coprono le **criticità segnalate dal cliente** (menu settori, lunghezza messaggi, camere, chiusura flusso, tag automatici, flussi crociera ed estero) e risultano **verificati** in playground e, per i percorsi principali, anche su **WhatsApp reale**.

---

## Cosa è stato verificato

### Risposta al feedback operativo (FB — regressioni segnalate)

| Criticità segnalata | Cosa è stato controllato | Esito |
| --- | --- | --- |
| Su “ciao” non chiede il settore | Menu strutturato: Hotel Villaggi Case, Nautica, Esperienze, Altro; nessuna domanda generica su “tour o esperienza” | Verificato (live) |
| Risposte troppo lunghe e discorsive | Messaggi corti (1–2 righe), emoji + domanda breve, stile “botta e risposta” | Verificato (live) |
| Camere: dati aggregati invece che per camera | Dopo “quante camere”, raccolta **Camera 1 → Camera 2 → Camera 3** con adulti, bambini ed età per ogni camera | Verificato (live, 3 camere Cefalù) |
| Chiusura flusso dopo raccolta dati | Riepilogo strutturato, tag Contatto Qualificato, automazione operatore, trasferimento chat; messaggio di presa in carico al consulente | Verificato (live) |
| Più domande nello stesso messaggio | **Una sola domanda per turno** in tutti i percorsi testati | Verificato (live) |
| Tag non applicati automaticamente | Tag settore, profilo (Famiglia / Gruppo) e Contatto Qualificato applicati in funzione delle risposte | Verificato (live) |

### Accoglienza e qualifica hotel

| Scenario | Cosa è stato controllato |
| --- | --- |
| Saluto senza settore | Menu quattro settori; una sola domanda |
| Intent hotel già chiaro (“info hotel”) | Tag Hotel Villaggi; domanda destinazione senza ripresentare il menu |
| Percorso hotel 1 camera | Sequenza completa fino a riepilogo e handoff; tag Famiglia con bambino |
| Percorso hotel 3 camere | Loop camera per camera; riepilogo con dettaglio per ogni camera; tag Gruppo su più nuclei |
| Anagrafica | Chiede solo nome/cognome/email **se mancanti** sul contatto; salta i campi già valorizzati |

### Flussi specifici (crociere ed estero)

| Scenario | Cosa è stato controllato |
| --- | --- |
| Crociera MSC / Mediterraneo | Sequenza dedicata: porto, date, cabine, club fedeltà, tipologia cabina, extra, budget; **nessun tag Charter** (riservato al noleggio yacht) |
| Viaggio estero (Maldive) | Tag Estero; domanda **aeroporto di partenza**; riepilogo con “partenza da Milano Malpensa” |
| Escursione / minicrociera in barca | Sequenza costa → porto → gruppo/esclusivo → date → ospiti → budget → chiusura (verificata in playground) |

### Pratiche esistenti, SOS e handoff

| Scenario | Cosa è stato controllato |
| --- | --- |
| Richiesta modifica (es. aggiungere culla) | Chiede struttura, date e **cognome intestatario** della prenotazione; nessuna Action prima dei dati |
| Dati pratica completi | Tag **Priorita_SOS**, automazione operatore, trasferimento chat |
| Domanda tecnica su inclusioni struttura specifica | Template SOS + passaggio consulente, senza inventare dettagli |
| Fine qualifica | Tag Contatto Qualificato, riepilogo, automazione **546258**, trasferimento chat |

### Guardrail

| Scenario | Cosa è stato controllato |
| --- | --- |
| Ascolto attivo | Non ri-chiede destinazione o settore se già indicati |
| Nessuna conferma prenotazione o prezzi inventati | Linguaggio coerente con qualifica e passaggio al consulente |
| “2 adulti” senza dichiarare coppia | Non assegna automaticamente il tag Coppia (verificato su estero) |

---

## Interventi sul prompt legati al feedback e ai test

| Tema emerso | Intervento verificato |
| --- | --- |
| v3.4 divergeva dal flusso originale del cliente | v3.5 ripristina domande verbatim, menu settori, camere split e flussi dedicati Crociera / Estero / Minicrociera |
| Flusso crociera confuso con charter nautico | Regola: crociera MSC/Costa → solo tag Crociere; tag Charter solo per noleggio yacht/barca a vela |
| Pratiche e SOS con tag obsoleto | Uso tag **Priorita_SOS** al posto di “DA LEGGERE” |
| Anagrafica ripetuta su contatti già noti | Controllo `%%FIRST_NAME%%`, `%%LAST_NAME%%`, `%%EMAIL%%` prima di ogni domanda; salto completo se tutti presenti |
| Una domanda per turno | Regola hard in stile e flussi; eccezioni solo per menu iniziale e riepilogo finale |

---

## Note tecniche (KB / tool / piattaforma)

- Prompt attivo: **v3.5** (~15k caratteri, entro limite Spoki 16k). Export disponibile per sync: `53917-dreaming-sicily-agente-chat-system-prompt.txt`.
- Knowledge base: file testo unificato `53917-dreaming-sicily-kb.txt` su Spoki.
- Automazione **546258** (Assegnazione operatore) e tool `transfer_to_human` verificati su contatto e in chat reale.
- In **playground** l’agente resta sempre attivo dopo il transfer: il test “stop post-handoff” va valutato su WhatsApp reale, non in playground.
- Escursioni in barca: flusso minicrociera verificato; in un test il tag settore risulta **Esperienze** anziché **Nautica** pur usando le domande del percorso nautico — comportamento non bloccante, da allineare se si vuole profilazione liste rigorosa.

---

## Esito

Le **criticità segnalate** su menu settori, sintesi messaggi, gestione camere, chiusura flusso, una domanda per turno, tag automatici e flussi dedicati **crociere / estero** risultano **risolte e verificate** con prompt **v3.5** (18 agosto 2026), in playground e su WhatsApp reale per i percorsi hotel, crociera MSC e viaggio estero Maldive.
