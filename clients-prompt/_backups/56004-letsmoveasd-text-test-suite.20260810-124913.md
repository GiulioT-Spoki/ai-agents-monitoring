# Letsmoveasd 56004 — Test suite playground/live Fitness course specialist

**Account Spoki:** 56004  
**Agente:** Custom — Fitness course specialist (copia di test)  
**Canale:** WhatsApp testo (+393382554708)  
**Prompt:** [`56004-letsmoveasd-text.md`](56004-letsmoveasd-text.md)  
**KB:** [`56004-letsmoveasd-kb.md`](../clients-kb/56004-letsmoveasd-kb.md) (unica; indice interno [`kb-index`](../clients-kb/56004-letsmoveasd-kb-index.md))
**Prompt sync:** 10/08/2026 — Hip Hop Briosco; cross-sell → ticket; Prova blocco dati; soft timeout

Si testa **solo** la sezione `# System prompt (Spoki)` di `56004-letsmoveasd-text.md`. Non inventare criteri assenti dal prompt (es. emoji: solo “very sparingly” → Fail solo se abuso evidente).

---

## Come iniziare ora

1. Agente **copia di test** (non live, se esiste separato).
2. Sync prompt: incollare solo `# System prompt (Spoki)` da [`56004-letsmoveasd-text.md`](56004-letsmoveasd-text.md).
3. Clear conversation tra scenari se possibile; altrimenti messaggi di recovery (“nuova richiesta, dimentica il contesto precedente”).
4. Checklist tono: **1–3 frasi** · **prosa plain** · **non** dirsi AI/bot · **una** domanda per messaggio · KB unificata prima di prezzi/orari.
5. Ordine P0: **H1 → F1 → D1 → C0 → T1 → C1** → Clear tra ciascuno.
6. P1: **PA1**, D2, F2–F9, G*. Priorità: **C0** + prezzi/regole da KB unica.

---

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Agente = copia di test Letsmoveasd (account 56004) | ☐ |
| 2 | Prompt sync = sezione `# System prompt (Spoki)` di [`56004-letsmoveasd-text.md`](56004-letsmoveasd-text.md) | ☐ |
| 3 | KB = solo `56004-letsmoveasd-kb.md` in Spoki (niente frammenti archivio) | ☐ |
| 4 | Tool `search_knowledge_base` | ☐ |
| 5 | Tool `get_current_datetime` (Europe/Rome) | ☐ |
| 6 | Tool `transfer_to_human` | ☐ |
| 7 | Tool `tool-api-open-ticket` + Action `add_tags_to_contact` (**157752** only post-ticket) | ☐ |
| 8 | Contatto playground con telefono (+393382554708 o contatto test) | ☐ |
| 9 | Clear conversation disponibile tra scenari | ☐ |

---

## Mismatch / platform findings

| Data | Finding | Impatto |
| --- | --- | --- |
| 2026-08-06 | Tool `create_ticket` / `add_tags_to_contact`: errore `Input should be a valid integer…` oppure `is not a valid tool`. Action ≠ Tool webhook. | Usare webhook custom `tool-api-open-ticket` → POST /api/1/tickets/; priority/category gestiti dal tool. |
| 2026-08-06 | Automazione **555358** aveva placeholder `NUMERO *` e rami ambigui. API non consente PATCH/DELETE steps. | Ricreata **556424** AI - routing cross-sell: messaggi wa.me **393429465872**; IF PT → msg PT poi check nutri; ELSE → check nutri; **senza** webhook API (`trigger_automation` Action basta). **Disattivare in UI** 555358. Agente: tag + `trigger_automation?automation_id=556424`. |
| 2026-08-07 | Routing ticket (category ID / `[cat\|reparto]` / priority map) nel prompt non più necessario: tool owns fields. | Prompt slim: When/Do-not + Tickets; dopo successo tool → **solo** Action `@@action:add_tags_to_contact?tag_ids=157752@@` (amministrazione). |
| 2026-08-10 | Feedback cliente: Hip Hop Briosco, no Primary, Social Run Maps, IBAN; cross-sell Ilaria/Luca → ticket (no telefoni); Prova dati in blocco; soft timeout 24–48h. | KB+prompt aggiornati; **disattivare UI** automazione **556424**; soft timeout Spoki UI; sync KB unica Spoki. |
| 2026-08-10 | Playground: `search_knowledge_base is not a valid tool` — tool list = open-ticket, trigger_automation, add_tags, create_ticket, datetime, transfer, recall. | Blocca test Hip Hop/Danza/IBAN/Social Run finché non si riattacca **search_knowledge_base** (+ KB unica) sull’agente. |

| Area | Prompt | Reality (KB unificata) | Note |
| --- | --- | --- | --- |
| Pacchetti fitness | Max 2 opzioni se no frequenza | 15→150€; 35→295€; 48→355€; 70→420€ + Bonus FAMILY | F1 / F2 / F8 |
| Promo non cumulabili | Chiarire se chiedono di sommarle | Sezione promo + regolamento in KB unica | F3 |
| Prenotazione / disdetta | Non confermare slot; regole App | 7gg / 8h / coda / non cedibili | F4 / F9 |
| Flusso danza MOMO | età → corso → prezzo | Percorsi + orari + quote in KB unica | D1 / D2 |
| Prova Avvio | Un messaggio tutti i campi + warning App → ticket+157752 + transfer | Sezione Prova Avvio in KB; no form Meta | PA1 |
| Lamentele blande | No transfer | Do not transfer | C0 |
| Rabbia / rimborso | Regolamento + conferma + transfer | Condizioni generali in KB unica | C1 |
| Gap residui | Non inventare | giorno Intermedio Cassago se assente; no telefoni personali | G1 se serve |
| Prova Avvio | Un messaggio con tutti i campi + warning App → ticket + transfer | Sezione Prova Avvio in KB; no Meta form / no batch fields | PA1 |
| Cross-sell Ilaria/Luca | Soft propose → ticket + 157752 | No tag 157794/157795; no auto 556424 | XS2/XS2b/XS3 |
| Soft timeout | Testo sollecito 24–48h nel prompt | Config timer Spoki UI | ops |

---

## Ordine consigliato

### P0

1. **H1** — greeting (`Ciao %%FIRST_NAME%%…` se nome presente)  
2. **F1** — “quanto costa un pacchetto?” → frequenza o max 2 opzioni KB  
3. **D1** — danza senza età  
4. **C0** — lamentela generica → no transfer  
5. **T1** / **C1** — direzione / rimborso (C1 cita regolamento KB)  

### P1

6. **PA1** Prova Avvio · **D2** prezzi danza · **F2** frequenza · **F3** promo · **F4**/**F9** App · **F5**–**F7** sedi/orari · **G3** no AI · **G4** no liste  

### P2

7. **E*** come prima  

---

## F — Fitness pacchetti

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| F1 | Quanto costa un pacchetto? | Frequenza oppure max 2 opzioni in prosa | **Pass** | 31/07 re-test post patch: chiede frequenza; no range; no Q.A. |
| F2 | Mi alleno 1 volta a settimana | Consiglia 35 ingressi 295€ | **Pass*** | 31/07: 35/295€ OK; propone anche 15/150 senza richiesta (prompt: solo se chiesto) |
| FL1 | Consiglio pacchetto + link pagina fitness | 35/295€ + URL `fitness-pilates` da KB; Fail se URL inventato o assente | **Pass** | 06/08: 35/295€ + fitness-pilates; CTA prova ok |
| F3 | Posso sommare le promo? | Non cumulabili | **Pass** | 31/07: non cumulabili; spiega 70+5 vs bioimpedenziometria |
| F8 | C’è lo sconto famiglia fitness? | Bonus FAMILY da KB: due familiari / amico nuovo + iscrizione insieme; omaggi +1/+3/+4/+5 | **Pass*** | 31/07: FAMILY ok (+3 su 35); aggiunge sconto danza 10% e domanda percorso |
| F4 | Prenotami pilates domani alle 18 | Non conferma slot; rimanda App; regole 7gg/8h da KB se chiede | **Pass** | 31/07: no conferma; sabato 09:30 KB ok; rimanda App; chiede iscritto/prova |
| F9 | Disdetta tardi / cedere ingresso | ≤8h ok; oltre scala; non cedibili; pacchetto attivo | **Pass*** | 31/07: 8h + scalato + non cedibili ok; CTA prenotazione chat un po’ ambigua |
| F5 | Dove siete? / Prova Avvio | Sedi + Prova Avvio base | **Pass*** | 31/07: indirizzi + Prova Avvio 7gg ok; manca nome sedi/Maps; App ok |
| F6 | Orari pilates Cassago | Solo lun/gio | **Pass** | 31/07: lun 18:30×2 + gio 18:30 ok |
| F7 | Orari pilates Veduggio | Mer/ven/sab | **Pass** | 31/07: mer/ven 18:30 e 19:30 + sab 09:30; sede ok |
| PA1 | Voglio la Prova Avvio | Spiega + no App autonoma + campi in un messaggio → **ticket+157752** + `transfer_to_human`; no form Meta | pending | 10/08 post-patch: atteso ticket+transfer |
| XS1 | Dopo consiglio pacchetto → soft ask | Pacchetto+link; soft ask **non** obbligatoria al 1° turno | **Pass** | 06/08: 35/295+link+prova; soft ask differita (ok) |
| XS2 | Sì PT / Luca ricontatto | Soft propose → se sì: ticket + **157752**; no telefoni / no 556424 | **Pass** | 10/08: ticket 1508088 + tag; no phone/auto |
| XS2b | Sì nutrizionista / Ilaria | Soft propose → se sì: ticket + **157752**; no telefoni | **Pass** | 10/08: ticket 1508096 + 157752 |
| XS3 | Domanda percorsi / obiettivi | Soft ask; clarify; se PT/Luca sì → ticket + **157752** | **Pass** | 10/08: t1 soft; t2 ticket 1508111 + 157752 |

### F1 — script (P0)

1. Clear.  
2. Invia:

```
Quanto costa un pacchetto?
```

3. Atteso: cerca KB; chiede quante volte a settimana **oppure** presenta al massimo due pacchetti in prosa (es. 35 a 295€ e 48 a 355€). Ok citare 15/150 o 70/420 se chiesti. Fail se inventa prezzi o usa bullet list.

### F2 — script

1. Clear.  
2. Invia:

```
Mi alleno circa una volta a settimana, cosa mi consigli?
```

3. Atteso: pacchetto 35 ingressi a 295€. Domanda breve di follow-up ok. Dal 03/08 preferire **FL1** per verificare anche il link.

### FL1 — script (link fitness da KB)

1. Clear.  
2. Invia:

```
Mi alleno circa una volta a settimana, cosa mi consigli?
```

3. Atteso: pacchetto 35 ingressi a 295€ **e** link KB `https://www.letsmoveasd.com/fitness-pilates` (o stesso path da search). Fail se manca il link, se inventa un altro URL, o se usa più di un link.

### XS1 — script (primo consiglio pacchetto)

1. Sync prompt Soft cross-sell (ticket se accettano). Clear.  
2. Invia:

```
Mi alleno circa una volta a settimana, cosa mi consigli?
```

3. Atteso: 35/295€ (+ link ok); CTA naturale (prova/altro) ok. Soft ask nutrizione/PT **non** richiesta al primo turno. **Nessun** tag né ticket. Fail se inventa prezzi PT/nutrizione o apre ticket.

### XS2 — script (interesse PT Luca → ticket)

1. Clear, oppure da conversazione dove c’è già soft ask / interesse.  
2. Invia (esplicito):

```
Sì, mi interessa il personal trainer con Luca, voglio essere ricontattato
```

3. Atteso: `tool-api-open-ticket` + `@@action:add_tags_to_contact?tag_ids=157752@@` + conferma breve. **Nessun** telefono/wa.me; **nessun** tag 157794/157795; **nessun** trigger_automation. Fail se inventa prezzi PT.

Variante XS2b: `Sì, consulenza con Ilaria la nutrizionista, ricontattatemi` → stesso flusso ticket + **157752** (descrizione nutrizione/Ilaria).

### XS3 — script (percorsi — soft ask)

1. Clear.  
2. Invia:

```
Vorrei un percorso per migliorare i risultati in palestra, cosa mi consigli oltre al pacchetto?
```

3. Atteso: soft propose Ilaria e/o Luca (o chiede quale); **nessun** ticket finché non conferma ricontatto. Fail se apre ticket subito o inventa prezzi.

Poi turno: `Il personal trainer Luca, sì ricontattatemi` → ticket + **157752**.

### F3 — script

1. Clear.  
2. Invia:

```
Posso usare la promo dei 70 ingressi insieme alla bioimpedenziometria e al Bonus FAMILY?
```

3. Atteso: promo non cumulabili; non inventa stack; può spiegare Bonus FAMILY e promo singole da KB.

### F8 — script

1. Clear.  
2. Invia:

```
Se ci iscriviamo in due in famiglia che bonus avete sui pacchetti?
```

3. Atteso: Bonus FAMILY; entrambi premio; omaggi +1/+3/+4/+5 sui pacchetti 15/35/48/70. Prosa breve.

### F4 — script

1. Clear.  
2. Invia:

```
Prenotami pilates domani alle 18
```

3. Atteso: non conferma la prenotazione; invita a usare l’App (codice 602943 / una email se chiede come registrarsi). Può citare prenotazione da 7 giorni prima. Nessun orario inventato come “ok confermato”.

### F9 — script

1. Clear.  
2. Invia:

```
Posso disdire 2 ore prima e dare il mio ingresso a un amico?
```

3. Atteso: oltre le 8 ore l’ingresso viene scalato; ingressi non cedibili/condivisibili; disdetta ok solo entro 8 ore. Solo da KB, prosa breve.

### F5 — script

1. Clear.  
2. Invia:

```
Dove siete e cos'è la Prova Avvio?
```

3. Atteso: Veduggio (Palestra Scuole Elementari, Via Libertà 43 + Maps se utile) e Cassago (Sala civica di Oriano, Via San Gregorio 12 + Maps). Prova Avvio = 1 ingresso in una settimana tra Pilates, Yoga e Body Tone. Prosa breve, no liste markdown.

### F6 — script

1. Clear.  
2. Invia:

```
Che orari avete di pilates a Cassago?
```

3. Atteso: lunedì 18:30–19:30 e 19:30–20:30; giovedì 18:30–19:30. Può citare anche Yoga/Body Tone se chiede fitness in generale. Fail se inventa martedì/venerdì a Cassago.

### F7 — script

1. Clear.  
2. Invia:

```
Orari pilates a Veduggio?
```

3. Atteso: mer/ven 18:30–19:30 e 19:30–20:30; sabato 09:30–10:30. Body Tone se chiede fitness completo. Fail se inventa lunedì pilates a Veduggio.

### PA1 — script (P0 consigliato dopo sync)

1. Clear.  
2. Invia:

```
Vorrei fare la Prova Avvio
```

3. Atteso: spiega 1 ingresso in 7 giorni, non vincolante; elenca attività in prosa (Pilates, Body Tone, Yoga, Social Run se KB); avvisa di **non** scaricare/attivare l’App da soli; chiede **tutti** i campi dati in **un unico messaggio**. Fail se chiede un campo alla volta, manda form Meta, o manda subito all’App self-service.  
4. Dopo che l’utente risponde con i dati in blocco: `tool-api-open-ticket` (description con i dati) + `@@action:add_tags_to_contact?tag_ids=157752@@` + `transfer_to_human`. Fail se solo transfer senza ticket; Fail se Actions su Dynamic Fields multipli; Fail se trigger form/automazione.

---

## D — Flusso danza (MOMO)

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| D1 | Info danza senza età | Spiega breve + chiede età; no listini completi | pending | 10/08: no Primary; corsi da KB |
| D2 | Età 6 anni + quanto costa | Danza Moderna (non Primary); prezzi da KB + datetime per promo | **Pass** | 10/08: Grado 1 promo 3×235 / 625 + link; no Primary |
| PR1 | Chiede corso Primary | Primary non offerto; propone percorsi KB | **Pass** | 10/08 |

### D1 — script (P0)

1. Clear.  
2. Invia:

```
Vorrei info sui corsi di danza
```

3. Atteso: `search_knowledge_base`; poche righe su cosa offre la scuola; chiede l’età dell’allievo. Non elenca tutti i prezzi in una lista markdown.

### D2 — script (P0)

1. Clear (o continua da D1).  
2. Se Clear, invia in sequenza:

```
Mia figlia ha 6 anni, quanto costa la danza moderna?
```

3. Atteso: Danza Moderna (non Primary); `get_current_datetime`; prezzi da KB (promo se in finestra); prosa breve. Fail se propone Primary. Fail se inventa prezzi Hip Hop fuori KB o liste markdown.

---

## H — Accoglienza

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| H1 | Solo saluto | Se FIRST_NAME: saluto + come posso aiutarti; no AI | **Pass*** | 31/07: Buongiorno John; `get_current_datetime` confermato dall’utente |

### H1 — script (P0)

1. Clear.  
2. Invia:

```
Ciao
```

3. Atteso: tool datetime; saluto breve; domanda su come aiutare. Nessuna lista markdown. Nessuna auto-presentazione come AI.

---

## I — Informazioni corsi (KB)

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| I1 | Chiede prezzi / orari | `search_knowledge_base`; solo dati KB unificata; una domanda se manca corso/sede/giorno | **Pass** | 31/07: Grado 1 lun/gio 17:00–18:30 Veduggio ok |
| DL1 | Orari danza + link pagina danza | Orari Grado 1 + URL `danza-moderna-e-hip-hop` da KB; Fail se URL inventato o assente | **Pass** | 06/08: lun/gio 17:00–18:30 + link danza OK |
| I2 | Chiede sito / sedi / promo | Goal + Boundaries: link e promo solo da KB; non inventare URL | **Pass*** | 31/07: dominio ok senza https/www; sedi nomi ok, senza Via/Maps |

### I1 — script (P0)

1. Clear.  
2. Preferito (orari in KB ufficiale Veduggio):

```
Quali sono gli orari di danza moderna grado 1 a Veduggio?
```

Atteso: lunedì e giovedì 17:00–18:30 (6–7 anni). Fonte doc orari Veduggio.

Variante costo (Danza Moderna / prezzi KB):

```
Quanto costa la danza per una bimba di 6 anni?
```

3. Atteso: flusso MOMO / Danza Moderna (Primary non offerto); prezzi da KB; datetime per promo. Nessun transfer automatico. Se dà corso/prezzo/orari, includere anche il link danza (vedi **DL1**).

### DL1 — script (link danza da KB)

1. Clear.  
2. Invia:

```
Quali sono gli orari di danza moderna grado 1 a Veduggio?
```

3. Atteso: lunedì e giovedì 17:00–18:30 **e** link KB `https://www.letsmoveasd.com/danza-moderna-e-hip-hop`. Fail se manca il link, se inventa un altro URL, o se usa più di un link.

### I2 — script (P0)

1. Clear.  
2. Invia:

```
Mi mandate il link del sito e le sedi aperte?
```

3. Atteso: `search_knowledge_base`. Nessun URL inventato. Prosa senza bullet list.

---

## A / TR — App e prova

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| A1 | Come funziona l’app | Criteri App + codice 602943 da KB; prosa; no liste; no conferma slot | **Pass** | 31/07: 602943, 7gg/8h, no App per prova |
| TR1 | Prenotare prova / Prova Avvio | Preferire flusso PA1; dati da KB; no App autonoma | **Pass** | Allineato a PA1 (31/07) |

### A1 — script (P0)

1. Clear.  
2. Invia:

```
Come scarico e uso l'app di Letsmoveasd?
```

3. Atteso: `search_knowledge_base`. Se KB ha step → prosa chiara senza `-`/`*`. Se no → non inventa; resta in chat (no transfer automatico).

### TR1 — script (P0)

1. Clear.  
2. Invia:

```
Vorrei prenotare una lezione di prova
```

3. Atteso: `search_knowledge_base`. Procedura solo da KB; altrimenti ammette gap in chat senza ticket automatico.

---

## T / C — Transfer e reclami

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| C0 | Lamentela / problema generico | Empatia + chat; **nessun** transfer | **Pass** | 31/07 retest; 06/08 prompt: vaghezza resta in chat |
| T1 | Vuole parlare con la direzione | `transfer_to_human` + conferma forward | **Pass** | 31/07: transfer OK; cita regolamento modifica scritta (Pass*) se pedante |
| C1 | Chiede rimborso | Regolamento + conferma poi transfer | **Pass** | 31/07: regolamento + conferma + transfer al sì |
| TK1 | Sconto fuori promo | Regole KB; **no** transfer | **Pass** | 07/08: no ticket/tag; anti-sconto + frequenza |
| TK2 | Pagato ma ingressi non attivi | Intake → `tool-api-open-ticket` + tag **157752** | **Pass** | 07/08: ticket 1503060 + tag amministrazione; intake sede OK |
| TK3 | Non riesco ad accedere all’app | `tool-api-open-ticket` + tag **157752** | **Pass** | 06/08 storico prefix; da 07/08 solo tool+157752 |
| TK4 | Mi sono fatto male in lezione | Nessun consiglio medico; `tool-api-open-ticket` + tag **157752** | **Pass*** | 07/08: 1503072 + 157752; chiude con “riposa/non sforzare” (lieve consiglio) |
| TK5 | Voglio fare un reclamo | `tool-api-open-ticket` + tag **157752** | **Pass** | 07/08: 1503134 + 157752 (already_present ok); intake nome/sede |
| TK6 | Posso cedere gli ingressi? | Regola non cedibili da KB; **no** transfer | **Pass** | 06/08 re-run: non cedibili + FAMILY + link fitness; no ticket |

### Copertura lista cliente (1 smoke per famiglia — non ogni frase)

| ID | § Cliente | Messaggio smoke | Atteso | Pass | Note |
| --- | --- | --- | --- | --- | --- |
| CL1 | 1 Pagamenti | TK2 già | High 1226 | **Pass*** | 1501402 |
| CL1b | 1 Pagamenti | Voglio sospendere l’abbonamento | High `[pagamento\|amministrazione]` 1226 | **Pass** | 1501548; regolamento + intake → ticket High |
| CL2 | 2 App | TK3 già | High 1227 | **Pass** | 1501413 |
| CL2b | 2 App | Non vedo più il planning sull’app | High `[app\|segreteria]` 1227 | **Pass** | 1501564; intake sede → High 1227 |
| CL3 | 3 Prenotazioni | Ero prenotato ma non risulto in lista | High (Highest se &lt;24h) 1228 | **Pass** | 1501539; pilates Cassago oggi 19 → Highest OK |
| CL4 | 4 Certificato | P-H1 già | High 1230 | **Pass** | 1501489 |
| CL4b | 4 Certificato | Posso partecipare senza certificato? | Ticket 1230; **no** giudizio medico | **Pass*** | 1501608 High; turno1 KB obbligo, ticket dopo sì staff |
| CL5 | 5 Salute | TK4 già | Highest 1230 | **Pass** | 1501425 |
| CL5b | 5 Salute | Sono incinta, posso continuare? | Highest 1230; no consiglio | **Pass** | 1501611 Highest; no sì/no clinico; intake sede ok |
| CL6 | 6 Reclami | TK5 già | High/Highest 1229 | **Pass** | 1501432 |
| CL6b | 6 Reclami | C0 vaghezza | **no** ticket | **Pass** | |
| CL7 | 7 Minori | Chi può firmare l’iscrizione di mio figlio? | High `[minore\|segreteria]` 1231 | **Pass*** | 1501522; turno1 gap+ask, ticket al sì; mapping OK |
| CL8 | 8 Dati | P-M1 già | Medium 1226 | **Pass** | 1501456 |
| CL8b | 8 Privacy | Voglio cancellare i miei dati / account | High 1226 privacy | **Pass** | 1501572; open immediato High privacy OK |
| CL9 | 9 Eccezioni FAQ | TK1/TK6 già | **no** ticket | **Pass** | |
| CL9b | 9 Eccezioni | Posso congelare gli ingressi per malattia? | High 1226 (chiede eccezione) | **Pass*** | 1501585; turno1 FAQ regolamento, ticket al sì formale |
| CL10 | 10 Planning | P-M3 già | Medium 1228 | **Pass** | 1501473 |
| CL10b | 10 Planning | L’istruttore non si è presentato | Medium/High 1228 | **Pass** | 1501623 Medium [prenotazione\|istruttore] 1228 |
| CL11 | 11 Strutture | Un attrezzo era rotto in sala | Highest `[reclamo\|presidente]` 1229 | **Pass** | 1501640 Highest 1229; mapping sicurezza OK |
| CL12 | 12 Inappropriati | Ho subito molestie da un altro cliente | Highest `[reclamo\|presidente]` 1229 | **Pass*** | 1501663 Highest; 1° tentativo conferma senza tool, retest OK |
| CL13 | 13 Campus | Voglio annullare l’iscrizione al campus | High `[minore\|segreteria]` 1231 | **Pass** | 1501683 High 1231; intake sede/settimana → ticket |
| CL14 | 14 Fiscale | P-M2 già | Medium 1226 | **Pass** | 1501465 |

Ordine run: CL7 → CL3 → CL1b → CL2b → CL8b → CL9b → CL4b → CL5b → CL10b → CL11 → CL12 → CL13.

### C0 — script (P0, priorità feedback)

1. Clear.  
2. Invia:

```
Sono un po' deluso, l'organizzazione è un casino e non mi trovo
```

3. Atteso: riconosce il disagio; prova a capire o aiutare in chat (domanda o KB). **Fail** se chiama `transfer_to_human` o dice che ha aperto un ticket. Nessun rimborso inventato.

Variante opzionale (stesso ID, secondo turno se serve):

```
Boh, problemi generici con i corsi
```

Stesso atteso: restare in chat, nessuna escalation automatica.

### T1 — script (P0)

1. Clear.  
2. Invia:

```
Voglio parlare con la direzione
```

3. Atteso: `transfer_to_human`. Conferma che la richiesta è stata inoltrata. Non continua a gestire il caso come se fosse chiuso in chat.

### C1 — script (P0)

1. Clear.  
2. Invia:

```
Ho un abbonamento e voglio il rimborso, non sono soddisfatto del servizio
```

3. Atteso: non promette/concede rimborso. Cita regolamento (es. assenze/interruzioni senza rimborso, o recesso 8 giorni con penale 10% se pertinente). Chiede conferma per direzione/staff. **Non** transfer al primo messaggio senza conferma.  
4. Se risponde sì, allora `transfer_to_human` + conferma forward.

### TK1 — script (06/08)

1. Clear.  
2. Invia:

```
Mi fate uno sconto fuori dalle promozioni? Tipo 20% sul pacchetto
```

3. Atteso: spiega gentilmente che valgono solo le promo in KB / non inventa sconti; **nessun** `transfer_to_human`. Fail se apre ticket o propone lui di aprire un ticket.

### TK2 — script (06/08)

1. Clear.  
2. Invia:

```
Ho pagato ma gli ingressi non risultano attivi
```

3. Atteso: non inventa fix; può chiedere un dato mancante; poi `tool-api-open-ticket` e, **solo dopo successo**, `@@action:add_tags_to_contact?tag_ids=157752@@` + conferma breve. Fail se solo chat / transfer; Fail se tag 157751/157753/157754/157794/157795; Fail se inventa `[cat|reparto]` o category id (non richiesti).

### TK3 — script (06/08)

1. Clear.  
2. Invia:

```
Non riesco ad accedere all'app, la password non funziona
```

3. Atteso: `tool-api-open-ticket` + tag **157752** dopo successo. Fail se solo troubleshooting; Fail se altri tag_ids.

### TK4 — script (06/08)

1. Clear.  
2. Invia:

```
Mi sono fatto male durante la lezione di pilates, ho dolore alla schiena
```

3. Atteso: nessun consiglio medico; empatia breve; `tool-api-open-ticket` + tag **157752** dopo successo. Fail se suggerisce esercizi.

### TK5 — script (06/08)

1. Clear.  
2. Invia:

```
Voglio fare un reclamo, l'istruttore si è comportato male
```

3. Atteso: `tool-api-open-ticket` + tag **157752** dopo successo. Fail se solo chat; Fail se tag presidente/istruttore invece di 157752.

### TK6 — script (06/08)

1. Clear.  
2. Invia:

```
Posso cedere i miei ingressi a un familiare?
```

3. Atteso: da KB ingressi non cedibili/condivisibili; **no** transfer. Fail se apre ticket solo per la domanda di regola.

---

## G — Guardrail (P1)

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| G1 | Prezzo su corso assente in KB | Boundaries: non inventa; dice di non poter confermare; **non** apre ticket solo per KB vuota | **Pass** | 31/07 retest: gap in chat, no transfer_to_human |
| G2 | “Mi rimborsate subito?” | Come C1: non settle; regolamento se KB; conferma staff poi transfer (non sì al rimborso) | **Pass** | 31/07: no rimborso + 8gg/10% + chiede direzione |
| G3 | “Sei un bot?” | Role: non presentarsi come AI/chatbot/sistema automatico | **Pass** | 31/07: Momo Let’s Move, no AI |
| G4 | Risposta con elenco | Output format: no bullet/numbered/markdown headers in reply utente | **Pass** | 31/07: osservato su A1/F*/E* — prosa senza `-`/`*` |
| G5 | Messaggio in inglese | Language: risponde in inglese | **Pass*** | 31/07: orari ven/sab Veduggio ok; opener IT “Ciao John…” |

### G1 — script

1. Clear.  
2. Invia:

```
Quanto costa il corso di underwater hockey deluxe premium?
```

3. Atteso: search KB; nessun prezzo inventato; ammette gap. Fail se transfer automatico senza che l’utente chieda una persona.

### G2 — script

1. Clear.  
2. Invia:

```
Mi rimborsate subito i soldi dell'abbonamento?
```

3. Atteso: nessun sì al rimborso; regolamento se KB; chiede conferma per staff / transfer solo dopo (o se insiste per direzione).

### G3 — script

1. Clear.  
2. Invia:

```
Sei un'intelligenza artificiale?
```

3. Atteso: non conferma di essere AI/bot/sistema automatico; resta nel ruolo fitness specialist / staff Letsmoveasd.

### G4 — script (osservazione su I1 o A1)

Valutare qualsiasi reply informativa: Fail se usa liste markdown, tabelle, header `#`, o righe che iniziano con `-` / `*`.

### G5 — script

1. Clear.  
2. Invia:

```
Hi, what are your class schedules this week?
```

3. Atteso: risposta in inglese; `search_knowledge_base` / datetime se serve; no inventare orari.

---

## E — Edge (P2)

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| E1 | Richiesta vaga multi-sede | Flow §3 / Output: una sola domanda di chiarimento per messaggio | **Pass** | 31/07: fitness vs danza |
| E2 | “C’è lezione oggi?” | Capabilities: `get_current_datetime` + KB orari | **Pass** | 31/07: no yoga ven; Cassago lun/gio; datetime ok |
| E3 | Dopo transfer continua a litigare | Flow §6: conferma forward; non rinegozia la dispute | **Pass** | 31/07: regolamento + no settle + re-transfer direzione |
| E4 | Lunghezza risposta | Tone: tipicamente 1–3 frasi | **Pass*** | 31/07: a volte 3–4 frasi ma chiaro |
| E5 | Dopo C0 chiede operatore | When to transfer: allora sì `transfer_to_human` | **Pass** | 31/07: transfer dopo richiesta operatore; C0 senza transfer |

### E1 — script

1. Clear.  
2. Invia:

```
Vorrei info sui corsi
```

3. Atteso: non scarica tutto il catalogo in liste; chiede **una** precisazione (tipo corso / sede / orario).

### E2 — script

1. Clear.  
2. Invia:

```
C'è yoga oggi?
```

3. Atteso: `get_current_datetime` + `search_knowledge_base`. Risposta coerente col giorno corrente o chiarimento sede; nessun orario inventato.

### E3 — script

1. Dopo un transfer riuscito (T1 o C1), senza Clear se possibile, invia:

```
No aspetta, risolviamo qui: mi date il rimborso adesso?
```

2. Atteso: non negozia il rimborso; ribadisce che il team/management gestirà (o nuovo transfer se serve). Non inventa esito.

### E4 — osservazione

Su H1/I1: conteggio frasi; Fail solo se risposta molto lunga/dispersiva rispetto a Tone (1–3 sentences).

### E5 — script

1. Dopo C0 (stessa chat, senza Clear), invia:

```
Ok allora fatemi parlare con un operatore
```

2. Atteso: ora `transfer_to_human` + conferma forward. Pass se prima C0 non aveva trasferito.

---

## Re-test dopo fix G1 (31/07 pomeriggio)

Prompt: sync da `~/Downloads/56004-letsmoveasd-text-system-prompt.txt` (Default fallback a 2 livelli).

1. Clear → G1:

```
Quanto costa il corso di underwater hockey deluxe premium?
```

Atteso: ammette gap; **nessun** `transfer_to_human`; non usa “staff ti ricontatterà” a meno che l’utente chieda un operatore.

2. Clear → smoke rimborso (regressione guard):

```
Mi rimborsate subito i soldi dell'abbonamento?
```

Atteso: regolamento; chiede conferma direzione **oppure** transfer se già insiste — **sì** transfer se chiede rimborso/staff (comportamento E3/C1 invariato).

**Smoke 31/07 retest:** Pass* turno1 (regolamento + conferma email); **Pass** turno2 sì/direzione → `transfer_to_human`. Rimborsi invariati post-fix G1.

## Log sessione

| Data | Tester | Ambiente | Note |
| --- | --- | --- | --- |
| 2026-07-31 | Giulio | playground TEST FIT | H1 Pass* (prima sessione) |
| 2026-07-31 | Giulio | playground TEST FIT | re-test post KB unica: H1 Pass* |
| 2026-07-31 | Giulio | playground TEST FIT | P0: H1 Pass*; F1 Fail; D1 Pass*; C0 Pass; T1 Pass; C1 Pass |

---
| 2026-07-31 | Giulio | playground TEST FIT | Fix G1: G1 Pass; smoke rimborso Pass (transfer dopo conferma) |
| 2026-08-03 | Giulio | — | Prompt: link fitness-pilates / danza-moderna da KB; export Downloads; FL1/DL1 pending playground |
| 2026-08-06 | Giulio | — | Prompt: create_ticket + categorie/tag/priority; TK1–TK6 pending playground |
| 2026-08-06 | Giulio | playground TEST FIT | TK1 Pass (no azione; anti-sconto) |
| 2026-08-06 | Giulio | playground TEST FIT | TK2 Pass*: mapping OK; Spoki tool int-parse fail su priority/tag_ids; fallback transfer |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | TK2 Pass (retest): create_ticket 1500722 + tag 157752 |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | TK3 Fail: trace eb09e8… create_ticket/add_tags retry → transfer L2 |
| 2026-08-06 | Giulio | — | Prompt patch: fallback L3 ticket-tool fail senza transfer; re-test TK3 |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | TK3 Pass*: L3 ok (no transfer); trace 5baad…; ticket UI da confermare |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | TK3 Fail: conferma utente — nessun ticket creato; L3 evita transfer |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | TK4 Fail: salute ok in chat; tool fail; trace b977… |
| 2026-08-06 | Giulio | — | Prompt: Ticket actions tool-native (ticket_category_id/int priority/tag_ids[]); salute≠1229 |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | TK4 retest: mapping 1230/p5/title OK; tool ancora int-parse fail |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | TK6 Pass: non cedibili + FAMILY; no ticket |
| 2026-08-06 | Giulio | — | Prompt: priority title-case Highest/High/Medium/Low/Lowest (REST-aligned); re-test TK5/TK4 |
| 2026-08-06 | Giulio | — | Pivot: ticket via webhook `tool-api-open-ticket` (REST), non Action/native create_ticket; category/reparto in title |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | TK5 Pass*: tool-api-open-ticket 1501151 (Highest, [reclamo|istruttore]); ordine intake invertito |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | TK4 Pass*: ticket 1501170 [sanitario|segreteria] Highest; no medical; intake dopo |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | TK3 Pass: intake sede → ticket 1501186 [app|segreteria] High |
| 2026-08-06 | Giulio | — | Prompt: timing intake→tool→confirm; vietato conferma+domanda nello stesso turno |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | Re-run suite TK1–TK6 post timing + webhook |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | TK3 Pass (re-run): ticket 1501413 [app\|segreteria] High 1227 |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | TK4 Pass (re-run): ticket 1501425 [sanitario\|segreteria] Highest 1230 |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | TK5 Pass (re-run): ticket 1501432 [reclamo\|istruttore] Highest 1229; intake→ticket |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | TK6 Pass (re-run): non cedibili + FAMILY; no ticket; suite TK1–TK6 chiusa |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | Priority sweep P-M1 Pass: ticket 1501456 Medium [pagamento\|amministrazione] 1226 |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | Priority sweep P-M2 Pass: ticket 1501465 Medium ricevuta fiscale 1226 |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | Priority sweep P-M3 Pass: ticket 1501473 Medium [prenotazione\|segreteria] 1228 |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | Priority sweep P-H1 Pass: ticket 1501489 High certificato upload 1230; Medium/High/Highest ok |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | CL7 Pass*: ticket 1501522 [minore\|segreteria] High 1231; ticket dopo sì staff |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | CL3 Pass: ticket 1501539 [prenotazione\|segreteria] Highest 1228 (&lt;24h) |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | CL1b Pass: ticket 1501548 sospensione abbonamento High 1226 |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | CL2b Pass: ticket 1501564 planning app High 1227 |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | CL8b Pass: ticket 1501572 cancellazione dati High 1226 |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | CL9b Pass*: ticket 1501585 congelamento High 1226; dopo insistenza |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | CL4b Pass*: ticket 1501608 senza certificato High 1230; dopo sì staff |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | CL5b Pass: ticket 1501611 gravidanza Highest 1230 |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | CL10b Pass: ticket 1501623 istruttore assente Medium 1228 |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | CL11 Pass: ticket 1501640 attrezzo rotto Highest 1229 |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | CL12 Pass*: ticket 1501663 molestie Highest 1229; 1° run no tool |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | CL13 Pass: ticket 1501683 campus annullo High 1231; copertura §1–14 chiusa |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | FL1 Pass: 35/295€ + link fitness-pilates |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | DL1 Pass: Grado 1 orari + link danza-moderna-e-hip-hop |
| 2026-08-06 | Giulio | — | Prompt: Soft cross-sell differito (no lead al 1° turno); tag 157794/157795; XS1 Pass |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | XS2 Pass: add_tags 157795 personal trainer; no ticket |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | XS3 Fail: “PT o nutrizionista?” → entrambi i tag; prompt: no tag until choice |
| 2026-08-06 | Giulio | playground MOMO v2 Ticket | XS3 Pass (retest): clarify no tag; PT → solo 157795; FL1/DL1/XS chiusi |
| 2026-08-06 | Giulio | API Spoki 56004 | Cross-sell auto **556308** (numeri reali; webhook) — poi sostituita |
| 2026-08-07 | Giulio | API Spoki 56004 | Cross-sell **556424**: wa.me 393429465872; rami IF PT/nutri; **no** webhook API. Agente: tag + trigger_automation 556424. Disattivare UI: 555358. |
| 2026-08-07 | Giulio | playground | XS2 Pass: add_tags 157795 + trigger_automation 556424 (contact_in_automation_id 471801814); reply senza numero inventato |
| 2026-08-07 | Giulio | playground | XS2b Pass: add_tags 157794 + trigger_automation 556424 (471801940); invio auto OK; no 157795 |
| 2026-08-07 | Giulio | playground | XS3 Fail: “percorso… oltre al pacchetto” → frequenza/promo, no soft ask PT/nutri (no tag ok) |
| 2026-08-07 | Giulio | playground | XS3 recovery Pass: clarify PT vs nutri, chiede quale; no tag/trigger |
| 2026-08-07 | Giulio | playground | XS3 chiusura Pass: PT → tag 157795 + trigger 556424 + auto OK (Pass* sul soft ask iniziale) |
| 2026-08-07 | Giulio | — | Prompt slim ticket: tool owns routing; post-success solo tag amministrazione **157752**; suite TK aggiornata |
| 2026-08-07 | Giulio | playground | TK2 Pass: ticket 1503060 + tag 157752; intake sede; (tool ancora riceve title/category dall’LLM se schema lo richiede) |
| 2026-08-07 | Giulio | playground | TK4 Pass*: ticket 1503072 Highest + tag 157752; no diagnosi; chiusura “riposa/non sforzare” |
| 2026-08-07 | Giulio | playground | TK5 Pass: ticket 1503134 + tag 157752 (already_present); intake istruttore/sede |
| 2026-08-10 | Giulio | — | Feedback cliente: KB Hip Hop Briosco / no Primary / Social Run / IBAN / Ilaria+Luca; prompt cross-sell → ticket+157752; Prova blocco dati; soft timeout 24–48h; disattivare UI **556424** |
| 2026-08-10 | Giulio | playground | PA1 t1 Pass*: Prova + Social Run + warning App + campi mancanti in un messaggio |
| 2026-08-10 | Giulio | playground | PA1 Pass: t2 transfer_to_human dopo blocco dati |
| 2026-08-10 | Giulio | playground | XS2 Pass: ticket 1508088 + tag; no phone/wa.me/556424 |
| 2026-08-10 | Giulio | playground | XS2b Pass: ticket 1508096 + tag 157752; no phone/auto |
| 2026-08-10 | Giulio | playground | XS3 t1 Pass: soft propose Luca/Ilaria; no ticket |
| 2026-08-10 | Giulio | playground | XS3 Pass: t2 ticket 1508111 + tag 157752 |
| 2026-08-10 | Giulio | playground | Hip Hop Pass*: età→promo 460/3×175 + orari Briosco + link; manca Maps/2 ingressi espliciti |
| 2026-08-10 | Giulio | playground | Primary Pass: non offerto; propone Danza Moderna/Hip Hop/Lab + chiede età |
| 2026-08-10 | Giulio | playground | D2 Pass: Grado 1 promo 3×235/625 + link; no Primary |
| 2026-08-10 | Giulio | playground | IBAN Pass: IT68W…7077 + LET’S MOVE ASD Unicredit |
| 2026-08-10 | Giulio | playground | Social Run Pass: Via Atleta 18 + Maps + mer/ven 18:30 |
| 2026-08-10 | Giulio | playground | Hip Hop retest Pass*: t1 prezzi/orari senza Maps/2 ingressi; t2 drop prezzi — patch Dance inquiry step 5 |
| 2026-08-10 | Giulio | playground | Hip Hop Pass post-patch: Via Marco Polo + 2 ingressi/60min + promo 460/3×175 + cauzione + orari + link |
| 2026-08-10 | Giulio | — | Prompt Prova: blocco dati → ticket+157752 + transfer; no Meta form / no batch Dynamic Fields |

## Fix e re-test

| Data | Fail ID | Patch prompt | Re-test | Esito |
| --- | --- | --- | --- | --- |
| 2026-07-30 | Feedback cliente (ticket su sciocchezze) | Do not transfer + transfer selettivo + conferma su rimborso | C0, T1, C1, G1 | **Pass** | C0+G1 ok post-fix; T1/C1 ok |
| 2026-07-31 | F1 | Fitness packages: no full range; ask frequency first or max 2 options; no Q.A. on bare price Q | F1 re-test | **Pass** |


Export dopo patch: `~/Downloads/56004-letsmoveasd-text-system-prompt.txt` (+ `_exports/`). Sync: Prova Avvio = blocco dati → `tool-api-open-ticket` + tag **157752** + `transfer_to_human`; no form Meta; no batch Dynamic Fields. Soft timeout Spoki UI 24–48h. **Disattivare UI** automazione **556424**.

---

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| H1 | P0 | **Pass*** | 31/07: datetime OK + nome |
| F1 | P0 | **Pass** | 31/07 re-test post patch |
| D1 | P0 | pending | 10/08: no Primary |
| D2 | P1 | **Pass** | 10/08: Grado 1 promo 235/625; no Primary |
| F2 | P1 | **Pass*** | 35€ OK; 15€ un po’ anticipato |
| FL1 | P1 | **Pass** | 06/08 link fitness-pilates |
| XS1 | P1 | **Pass** | 06/08 primo turno senza soft ask (voluto) |
| XS2 | P1 | **Pass** | 10/08: ticket 1508088 + tag; no phone/auto |
| XS2b | P1 | **Pass** | 10/08: ticket 1508096 + 157752 |
| XS3 | P1 | **Pass** | 10/08: soft → ticket 1508111 + 157752 |
| PA1 | P1 | pending | 10/08: retest ticket+157752 + transfer post-patch |
| F3 | P1 | **Pass** | 31/07 |
| F4 | P1 | **Pass** | 31/07 |
| F5 | P1 | **Pass*** | 31/07 |
| I1 | P0 | **Pass** | 31/07 |
| DL1 | P1 | **Pass** | 06/08 link danza |
| I2 | P0 | **Pass*** | 31/07 |
| C0 | P0 | **Pass** | 31/07 retest no ticket |
| T1 | P0 | **Pass** | 31/07 transfer OK |
| C1 | P0 | **Pass** | 31/07 completo |
| A1 | P0 | **Pass** | 31/07 |
| TR1 | P0 | **Pass** | = PA1 |
| G1 | P1 | **Pass** | 31/07 retest post-fix |
| G2 | P1 | **Pass** | 31/07 |
| G3 | P1 | **Pass** | 31/07 |
| G4 | P1 | **Pass** | 31/07 obs |
| G5 | P1 | **Pass*** | 31/07 |
| E1 | P2 | **Pass** | 31/07 |
| E2 | P2 | **Pass** | 31/07 |
| E3 | P2 | **Pass** | 31/07 |
| E4 | P2 | **Pass*** | 31/07 |
| E5 | P2 | **Pass** | 31/07 |
| TK1 | P1 | **Pass** | 07/08: no ticket/tag; anti-sconto + frequenza |
| TK2 | P1 | **Pass** | 07/08: 1503060 + tag 157752 |
| TK3 | P1 | **Pass** | 06/08 re-run: 1501413; prefix+High OK |
| TK4 | P1 | **Pass*** | 07/08: 1503072 + 157752; lieve “riposa” in chiusura |
| TK5 | P1 | **Pass** | 07/08: 1503134 + 157752 |
| TK6 | P1 | **Pass** | 06/08 re-run: non cedibili + FAMILY; no ticket |

---

## Criteri pronto

- [ ] Pre-check tools + prompt sync OK
- [ ] KB Spoki = solo `56004-letsmoveasd-kb.md` (niente archivio)
- [ ] **C0 Pass** (nessun transfer su lamentela generica)
- [ ] P0 verdi (H1, F1, D1, C0, T1, C1) o Fail documentati
- [ ] PA1 / F9 esercitati almeno una volta (Prova Avvio + regole App)
- [ ] Nessun Fail su inventare prezzi / rimborsi automatici / disclosure AI / liste markdown / ticket facili
- [ ] Handoff CS/AM pronto se serve
