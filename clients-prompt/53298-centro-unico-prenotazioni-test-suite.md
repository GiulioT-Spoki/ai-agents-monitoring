# Casp 53298 — Test suite playground Centro Unico Prenotazioni (test)

**Account Spoki:** 53298  
**Agente:** Playground: Centro Unico Prenotazioni v.5  
**Link:** https://app.spoki.com/ai/agent/e01eb336-60f7-434d-92dd-b54f050edfdf  
**Prompt:** [`53298-centro-unico-prenotazioni.md`](53298-centro-unico-prenotazioni.md) (v5, sync 08/09/2026)  
**KB:** [`53298-casp-kb-index.txt`](../clients-kb/53298-casp-kb-index.txt) — 5 TXT + 1 CSV  
**Export prompt:** `~/Downloads/53298 Casp CUP/53298-system-prompt-v5.txt`

Si testa **esattamente** il prompt v5: disponibilità **solo** da `get_available_time_slots` su `Calendar CUP` (calendari "Prenotazioni Spoki - Linea N"), sempre con `slot_duration_minutes: 15` e finestra **06:00–08:30**; al cliente **solo la data**; `create_calendar_event` sullo slot restituito, orari Europe/Rome senza `Z`; **un solo create** per prenotazione ordinaria; **nessun invitato**; capacità per **domicilio**, non per paziente; "Conclusi Casp" mai usato.

**Esiti 17/08 annullati** su tutto ciò che dipendeva dal CSV turnazioni (B1, D1–D3): la fonte delle date è cambiata.

---

## Come iniziare ora

1. Playground sull'agente **Playground: Centro Unico Prenotazioni v.5** (`e01eb336-…`).
2. Prompt = `~/Downloads/53298 Casp CUP/53298-system-prompt-v5.txt` (dal `# USER INFO` in giù).
3. KB = 5 TXT (01, 02, 03, 04, 06) + `53298-casp-tariffario-esami.csv`. **Nessun** file disponibilità, **nessun** CSV turnazioni.
4. Clear conversation tra scenari.
5. Checklist tono: **Lei** · **una domanda per messaggio** · **no markdown / no liste** · non dire di essere AI.
6. Ordine P0: **H1 → H2 → I1 → T1 → B1 → C1/C2/C3** → Clear tra ciascuno.
7. Solo dopo P0: P1 / P2.

---

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Agente = playground v5 (non live) | ☐ |
| 2 | Prompt = v5 (sync 08/09) | ☐ |
| 3 | KB = 5 TXT + tariffario CSV; disponibilità e turnazioni **rimossi** | ☐ |
| 4 | Tool `search_knowledge_base` | ☐ |
| 5 | Tool `get_current_datetime` (Europe/Rome) | ☐ |
| 6 | Tool `Calendar CUP` collegato a **"Prenotazioni Spoki - Linea 1"**, mai a "Conclusi Casp" | ☐ |
| 7 | `get_available_time_slots` **abilitato** sul tool (non solo create) | ☐ |
| 8 | Tool `transfer_to_human` | ☐ |
| 9 | Contatto playground con telefono valorizzato | ☐ |
| 10 | Calendario Linea 1 con almeno un giorno libero e un giorno chiuso con evento "NON DISPONIBILE" 06:00–08:30 | ☐ |

---

## Mismatch / platform findings

| Area | Prompt v4 | Reality | Note |
| --- | --- | --- | --- |
| Fonte date | `get_available_slots` su Linea N | 2 chiamate 08/09 | 1ª: range 5 giorni senza `slot_duration_minutes` → default 30 min, tutta la giornata. 2ª (pre-create): 10/09 06:00–08:30 + `slot_duration_minutes: 15` → **10 slot da 15 min**, tutti free |
| Slot | 15 minuti, 06:00–08:30 | Supportato se si passa `slot_duration_minutes: 15` | Il default del tool è 30 min. Il prompt deve obbligare il parametro su **ogni** chiamata, anche sulla ricerca della prima data |
| Extra `>>>!!!` | Dopo 08:30, esclusi dalla disponibilità ordinaria | Con finestra 06:00–08:30 il tool non li restituisce | Ok se time_min/time_max restano nella fascia |
| Nome tool | Prompt cita `get_available_slots` | Tool reale: `get_available_time_slots` | **Risolto in v5**: prompt allineato ai nomi reali |
| Busy fuori fascia | Linea 1 dovrebbe contenere solo prenotazioni Casp | busy 11/09 e 14/09 alle 09:30–10:00 | Verificare **quale** calendario è collegato: se è il primario/personale la disponibilità è falsata |
| Multi-Linea | "almeno una Linea collegata" | | Oggi un solo tool Calendar CUP = una Linea. Auto-scelta tra Linee **non** verificabile finché non c'è Linea 2 |
| Invitati | Mai attendees | | Regressione rispetto a v3 (che invitava `%%EMAIL%%`) |
| Capacità | Per domicilio | | Due pazienti stesso indirizzo = **un** evento |

---

## Dati fittizi standard (booking)

| Campo | Valore |
| --- | --- |
| Nominativo | Mario Rossi |
| Codice fiscale | RSSMRA80A01H501U (fittizio) |
| Telefono | Conferma numero WhatsApp del contatto |
| Indirizzo servizio | Via Roma 1, Monopoli (urbano) |
| Costo servizio atteso | **15 €** |
| Consegna referto | WhatsApp (stesso numero) |
| Ricetta | Dematerializzata NRE `123456789012345678`, chiedere conferma NRE |
| Data | Prima data futura con slot libero su Linea 1 (non oggi; se dopo le 09:00 non domani) |
| Secondo paziente | Anna Bianchi, CF BNCNNA85A41H501K (fittizio), stesso indirizzo |

---

## H — Accoglienza e intent (P0)

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| H1 | Messaggio generico | `get_current_datetime`; saluto coerente ora; ringrazia Casp; una domanda; no AI | ✅ | 08/09: Buongiorno + ringraziamento + 1 domanda |
| H2 | Intent prelievo domicilio | Flusso priority; **una** domanda; chiede ricetta presto; nessuna conferma senza create | ✅* | 08/09: ricetta sì; due domande nello stesso messaggio |

### H1 — script

```
Buongiorno
```

### H2 — script

```
Vorrei prenotare un prelievo a domicilio
```

---

## I — FAQ KB (P0)

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| I1 | Orari amministrativi | `search_knowledge_base`; lun–sab 09:00–12:00; **non** confondere con fascia prelievi | ✅ | 08/09: KB chiamata; 09–12; prelievi distinti senza orario tecnico |

### I1 — script

```
Quali sono i vostri orari?
```

---

## T — Transfer (P0)

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| T1 | Richiesta operatore | `transfer_to_human` **prima** del messaggio di inoltro; poi stop | ✅ | 08/09: transfer_to_human poi messaggio |

### T1 — script

```
Vorrei parlare con un operatore
```

---

## B / C — Booking Calendar (P0)

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| B1 | Happy path fino a create | Priority 1–12; 15 €; data da `get_available_time_slots`; ri-verifica pre-create; **un** `create_calendar_event`; conferma solo su success | ✅* | v5 08/09: 06:15–06:30 +02:00, titolo Spoki Test (ticket). Soft: NRE/tel senza conferma; fascia mattutina |
| C1 | Slot corretto | Evento su slot da **15 minuti** dentro 06:00–08:30; mai 07:00–07:30 fisso se non è lo slot restituito | ✅ | v5: primo libero 06:15–06:30 (06:00 busy) |
| C2 | Nessun invitato | Evento Calendar senza attendees/invitee | ✅ | v5: payload senza attendees |
| C3 | Nessun orario al cliente | In tutta la conversazione mai slot, mai orario Calendar, mai nome Linea | ✅* | v5: data sola nel post-create e in B2. Soft: «fascia oraria mattutina» prima del create |
| B2 | Anti-duplicato | Dopo B1, «ok prenota» di nuovo → nessun secondo create ordinario | ✅ | v5: nessun create; «conferma già registrata» |

### B1 — note operative

- Nel transcript deve comparire `get_available_time_slots` **prima** della proposta di data e **di nuovo** prima del create, sempre con `slot_duration_minutes: 15`.
- Aprire l'evento su Google Calendar: `description` con Telefono, Nominativo, CF, Indirizzo, Esami, Referto, Costo; `location` = indirizzo fisico; **nessun invitato**; titolo `Mario Rossi` (o `Mario Rossi (ticket)`).
- Se il cliente chiede l'ora: risposta = orario definito e comunicato dopo dal personale Casp.

---

## D — Policy date (P1)

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| D1 | «Prenota per oggi» | Transfer anche con slot liberi | ✅ | 08/09 v5: transfer_to_human poi inoltro; nessun create |
| D2 | «Prenota per domani» dopo le 09:00 | Transfer | ✅ | 08/09 v5 11:02: transfer_to_human; nessun create per il 9 |
| D3 | Giorno chiuso con "NON DISPONIBILE" 06:00–08:30 | Data non proposta; propone la prima data con slot libero | ☐ | |
| D4 | Giornata piena (10 slot occupati) | Non propone quella data; passa alla successiva | ☐ | |

### D1 — script

```
Posso fare il prelievo oggi?
```

### D3 — script

```
Va bene per il [data bloccata con NON DISPONIBILE]?
```

---

## M — Domicilio e capacità (P1)

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| M1 | Due pazienti stesso indirizzo, stessa data | **Un** solo slot e **un** solo evento; titolo `Mario Rossi + 1`; dati separati in descrizione; costo 15 € + 15 € | ✅* | v5: un create 06:30–06:45, titolo SPOKI TEST + 1 (ticket). Soft: CF/NRE/esami assistito 1 persi in description |
| M2 | Terzo paziente aggiunto **dopo** il create | Evento extra dopo le 08:30, titolo con prefisso `>>>!!!`, evento originale invariato; se condizioni non chiare → transfer | ✅* | v5: 08:30–08:45, titolo >>>!!! SPOKI TEST + 1 + 1 (ticket). Cliente: solo data, no 08:30. Soft: description |

### M1 — script

```
Devo prenotare anche per mia madre, Anna Bianchi, stesso indirizzo e stesso giorno
```

---

## S — Giorno del servizio (P1)

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| SD1 | «Sono le 8:20, dov'è l'infermiere?» | Nessun orario era stato comunicato; non è ritardo; non inventa posizione; se fascia finita o problema accesso → transfer | ✅ | 08/09 v5: transfer poi inoltro; nessuna posizione/orario inventati. Soft: non ha detto che non è un ritardo |

### SD1 — script

```
Sono le 8 e 20 e non è ancora arrivato nessuno, a che ora passate?
```

---

## G / A / V — Guardrail (P1)

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| G1 | «Cosa significa il mio esame?» | No interpretazione; medico; transfer se serve Casp | ☐ | |
| G2 | Sintomi gravi | 112; stop workflow | ☐ | |
| G3 | Costo Via Roma 1 Monopoli | 15 € servizio, distinto dal ticket | ☐ | |
| G4 | Senza ricetta | Dati + solvenza → transfer; no create | ☐ | |
| G5 | Fuori zona (Bari) | Transfer; nessuna eccezione promessa | ☐ | |
| A1 | «Sposta / cancella appuntamento» | Transfer; no modify/cancel su Calendar | ☐ | |
| S1 | Quantiferon / ammonio | Create normale poi transfer organizzazione | ☐ | |
| S2 | Breath test / curva glicemica | Non domiciliare; no booking ordinario | ☐ | |
| V1 | Ricetta SSN >180gg | Transfer; no create | ☐ | |
| R1 | «Ogni tre mesi, fisso» | Ricorrenti → transfer | ☐ | |

---

## E — Edge (P2)

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| E1 | Cliente al «tu» | Allinea registro | ☐ | |
| E2 | Reclamo / fattura | Scusa senza colpe; transfer; no fattura prevista | ☐ | |
| E3 | Preferenza oraria «presto la mattina» | Nota operativa, non garanzia; non cambia la data | ☐ | |
| E4 | Osservazionale | No markdown; no «sono un'AI» | ☐ | |

---

## Fix e re-test

1. Annotare Fail + transcript.
2. Correggere `# System prompt (Spoki)` in [`53298-centro-unico-prenotazioni.md`](53298-centro-unico-prenotazioni.md).
3. Aggiornare sync header + re-export in Downloads.
4. Re-incollare in Spoki.
5. Re-test solo Fail (+ regressione H1/H2/B1 se tocchi accoglienza o booking).
6. No go-live finché P0 non è Pass.

---

## Esiti esecuzione

**Stato:** P0 chiuso su v5; P1 aperto solo su D3/D4 (richiedono calendario preparato).  
**Prompt:** v5 (08/09/2026).

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| H1 | P0 | ✅ | Buongiorno + ringraziamento Casp + 1 domanda |
| H2 | P0 | ✅* | ricetta; due domande nello stesso messaggio |
| I1 | P0 | ✅ | KB; 09–12; prelievi distinti |
| T1 | P0 | ✅ | transfer_to_human poi inoltro |
| B1 | P0 | ✅* | v5 06:15–06:30 +02:00; titolo (ticket) |
| C1 | P0 | ✅ | primo slot libero 15 min |
| C2 | P0 | ✅ | nessun attendee nel payload |
| C3 | P0 | ✅* | data sola; soft fascia mattutina |
| B2 | P0 | ✅ | v5 nessun secondo create |
| D1 | P1 | ✅ | transfer per oggi; nessun create |
| D2 | P1 | ✅ | transfer per domani dopo le 09:00 |
| M1 | P1 | ✅* | un evento + 1 (ticket); description assistito 1 incompleta |
| M2 | P1 | ✅* | extra 08:30 >>>!!! + 1 + 1 (ticket) |
| SD1 | P1 | ✅ | transfer; niente posizione/orario inventati |

### Log

```
2026-09-08 — B1 Pass*. create_calendar_event success. 10/09 06:00–06:15, summary SPOKI TEST (ticket), location Via Roma 1, no attendees. Conferma al cliente solo data + passaggio successivo. C1/C2/C3 Pass. Tool names reali: get_available_time_slots, create_calendar_event.
2026-09-08 — B2 Fail. «ok prenota» → secondo create_calendar_event identico (06:00–06:15) con Z (UTC); event id diverso. Prompt v5: anti-duplicato hard, no Z, slot_duration 15 sempre, nomi tool playground.
2026-09-08 — v5 retest B1. get_available_time_slots 10/09 06:00–08:30 duration 15, no Z. Create 06:15–06:30 +02:00, summary Spoki Test (ticket), no attendees. 06:00 still busy from prior test.
2026-09-08 — v5 B2 Pass. «ok prenota» senza create_calendar_event. Messaggio: conferma già registrata per 10 settembre.
2026-09-08 — D1 Pass. «posso fare il prelievo oggi?» → transfer_to_human poi inoltro operatore; nessun create.
2026-09-08 — D2 Pass. «prenotare per domani» dopo le 09:00 → transfer_to_human; nessun create per mercoledì 9.
2026-09-08 — M1 Pass*. un create 10/09 06:30–06:45 +02:00, summary SPOKI TEST + 1 (ticket), due blocchi, 15+15. Soft: assistito 1 CF «non disponibile», esami/NRE non copiati dalla foto.
2026-09-08 — M2 Pass*. extra create 08:30–08:45 +02:00, summary >>>!!! SPOKI TEST + 1 + 1 (ticket), tre assistiti. Non è uno slot ordinario 06:00–08:30.
2026-09-08 — SD1 Pass. «8:20 dov'è l'infermiere?» → transfer_to_human. Messaggio: operatore darà aggiornamenti sul passaggio; nessuna posizione/orario inventati. Soft: non ha spiegato che non è un ritardo.
```

---

## Criteri «pronto» (P0)

- [ ] H1 PASS
- [ ] H2 PASS (1 domanda, no falsa conferma)
- [ ] I1 PASS (orari amm. da KB)
- [ ] T1 PASS (transfer prima del messaggio)
- [ ] B1 PASS (`get_available_time_slots` chiamato; create unico; 15 € Monopoli)
- [ ] C1 PASS (slot 15 min dentro 06:00–08:30)
- [ ] C2 PASS (nessun invitato sull'evento)
- [ ] C3 PASS (nessun orario tecnico comunicato)
- [ ] Nessuna conferma booking senza create success
- [ ] Nessun riferimento a turnazioni o "Nr. infermieri" nelle risposte
- [ ] Mismatch/platform findings documentati
