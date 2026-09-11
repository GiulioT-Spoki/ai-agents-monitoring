# Calatafimi Med 34768 — Test suite playground/live LucIA

**Account Spoki:** 34768  
**Agente:** Custom — LucIA (assistente virtuale testo)  
**Link Spoki:** https://app.spoki.com/ai/agent/7e189bbe-86c9-4ec9-8898-90ac7d1fac5b  
**Canale:** WhatsApp testo  
**Prompt:** [`34768-calatafimi-med-prompt.md`](34768-calatafimi-med-prompt.md)  
**KB (Spoki):** 3 markdown operativi (`kb-01/02/03`) + **3 CSV** listini (`listino-privato-lab.csv`, `listino-ticket-ssn.csv`, `listino-specialistiche.csv`); fallback md listino-01…09; stub/index non in Spoki ([`kb-index`](../clients-kb/34768-calatafimi-med-kb-index.md))  
**Prompt sync:** 11/08/2026 — body `# System prompt (Spoki)` + KB multi-file + Tuotempo **2 placeholder**; **patch E1**; **patch %%PHONE%%**; **patch DR2/CU3/PRV1/NUT2** (no PHONE in chiaro; no promo € inventati; glicemia ≠ curva; no volunteer promo nutrizione)  
**Integrazione:** Tuotempo stub — solo `tuotempo_search_availability` + `tuotempo_add_appointment` ([`PLACEHOLDER search`](../Libreria-prompt/34768-tuotempo-search-availability-PLACEHOLDER.md), [`PLACEHOLDER add`](../Libreria-prompt/34768-tuotempo-add-appointment-PLACEHOLDER.md)); get/reschedule/cancel **non** nel prompt  
**Variante legacy:** [`34768-calatafimi-med-prompt-lucia.md`](34768-calatafimi-med-prompt-lucia.md) (FIRST_NAME, ack transfer esplicito) — **non** è il prompt sotto test salvo sync diverso

Si testa **solo** la sezione `# System prompt (Spoki)` di `34768-calatafimi-med-prompt.md`. Non inventare criteri assenti dal prompt (es. uso di FIRST_NAME, testo fisso di transfer, emoji). Soft-book: **Fail** se LucIA chiede il numero WhatsApp/cellulare (già in '%%PHONE%%').

---

## Come iniziare ora

1. Agente **copia di test** (non live, se esiste separato).
2. Sync prompt: incollare solo `# System prompt (Spoki)` da [`34768-calatafimi-med-prompt.md`](34768-calatafimi-med-prompt.md).
3. Clear conversation tra scenari se possibile; altrimenti recovery (“nuova richiesta, dimentica il contesto precedente”).
4. Checklist: **saluto solo al 1° messaggio** · **breve, solo ciò che è chiesto** · **costi solo se chiesti (privato; ticket solo se chiesto)** · **no chiedere telefono WA (%%PHONE%%)** · **no nomi medici in disponibilità salvo richiesta** · **mai conferma appuntamento** · **KB prima di inventare** · **no diagnosi** · **closing → no tool** · **operatore → transfer** · **orari/date → datetime Europe/Rome**.
5. Ordine P0: **H1 → H2 → C1 → K1 → T1 → E1** → Clear; poi booking **B2** (handoff, no conferma). **B1 Skip** finché Tuotempo non ha URL/auth reali.
6. Dopo patch %%PHONE%%: smoke **P0b** (dermato senza chiedere tel) + **BOOK1** prima di riprendere Q1+.
7. P1: **P1** (prezzo solo se chiesto), **D1**, **M1**, **L1**, prep ecografia / ferie agosto. P2: **PR1**, **X1**.

---

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Agente = copia di test LucIA (account 34768) | ☐ |
| 2 | Prompt sync = `# System prompt (Spoki)` di [`34768-calatafimi-med-prompt.md`](34768-calatafimi-med-prompt.md) | ☐ |
| 3 | KB Spoki = **3 md** (kb-01/02/03 ≤16k) + **3 CSV** listini; fallback 9 chunk md solo se CSV non usabile; no stub/index | ☐ |
| 4 | Tool `search_knowledge_base` | ☐ |
| 5 | Tool `get_current_datetime` (Europe/Rome) | ☐ |
| 6 | Tool `transfer_to_human` (+ default reply Spoki) | ☐ |
| 7 | Tool stub `tuotempo_search_availability` creato in Spoki (URL/auth ancora placeholder OK) | ☐ |
| 8 | Tool stub `tuotempo_add_appointment` creato in Spoki (URL/auth ancora placeholder OK) | ☐ |
| 9 | Tool get/reschedule/cancel Tuotempo **assenti** dal prompt / non creati | ☐ |
| 10 | `activity_lid` / `location_lid` — Skip finché non arrivano dal cliente | ☐ |
| 11 | Contatto playground con telefono ('%%PHONE%%' popolato) | ☐ |
| 12 | Clear conversation tra scenari | ☐ |
| 13 | Prompt: USER INFO '%%PHONE%%' — LucIA non chiede cellulare WA | ☐ |

---

## Mismatch / platform findings

| Area | Prompt (sotto test) | Reality / note |
| --- | --- | --- |
| Variante Lucia | Nessun FIRST_NAME; transfer immediato senza frase fissa | File `*-prompt-lucia.md` ha `%%FIRST_NAME%%` e ack “Capisco, la metto…” — Fail solo se sync Lucia |
| KB locale | Risposte da KB Spoki | Preferito: 3 md + 3 CSV; check md `scripts/check_34768_kb_char_limit.py` |
| Default reply transfer | Step 3: default reply + `transfer_to_human` | Verificare testo default configurato in Spoki UI |
| Prezzi | Listino Doc 1 specialistiche; lab wgeslaan **assente**; costi solo se chiesti; ticket → operatore (Doc 3) | Fail se inventa € / volunteer prezzi / calcola ticket da sola |
| Conferma booking | Doc 2: mai confermare; dopo anagrafica → ricontatto operatore | Conflitto risolto: no conferma AI (prompt aggiornato 11/08) |
| Preventivo | Singoli + totale; prelievo da aggiungere (4€ solo se chiesto); service `/N` | Regole in prompt QUOTATIONS + KB laboratorio |
| Disponibilità / medici | No nomi salvo richiesta; lista Doc 4 in KB | Doc 2 + Doc 4 |
| Ferie agosto | Chiusura tutte le sedi 10–15 agosto | In KB; anno non specificato nella fonte |
| Promo fine chat | Doc 5: sempre a fine conversazione; per sesso se noto | In prompt; contenuto KB = promo **maggio** (verificare validità in agosto) |
| IBAN lab | Solo esami laboratorio; no pagamento prima del prelievo | Doc 6; esempio fonte corretto (NON accettati pagamenti antecedenti) |
| Prelievi | Sede senza prenotazione; domicilio: prima regime (Doc 10), poi template; emocoltura→operatore | Doc 7+10; costi domicilio solo se chiesti |
| Radiologia | No TAC; RX sede Med 2; RM solo articolari aperte; MOC no total body | Doc 8 |
| Sedi/orari | Tre sedi Doc 9 come fonte ufficiale FAQ | Doc 7 prelievi subordinato; conflitti sabato annotati |
| Check-up | UOMO/DONNA/Buona Salute/MST; solo se chiedono pacchetto | Doc 11; prezzo pacchetto non somma |
| Preventivo ricette | Disclaimer; regime esente/ticket/privato; codici/diagnosi | Doc 12–13; listino ticket in KB; privato lab ancora gap |
| Integrazione Tuotempo | 2 tool placeholder (search + add); get/reschedule/cancel fuori prompt | Create via add quando credenziali live; modifica/cancella → handoff |
| Base URL Tuotempo | `https://PLACEHOLDER-TUOTEMPO-BASE-URL.invalid/...` | In attesa URL test/prod dal cliente |
| Auth Tuotempo | `PLACEHOLDER_TUOTEMPO_AUTH` | In attesa auth dal cliente |
| `deleteappointment` body | `{ "app_lid": ... }` | Body non esplicitato nella collection; `app_lid` dedotto dalla risposta — confermare nome parametro |
| `getUsers` / `lockAvailability` / `unlockAvailability` | Cartelle vuote nella collection | Lookup paziente e lock slot non coperti in v1 |

| Data | Finding | Impatto |
| --- | --- | --- |
| 2026-08-11 | Collection Tuotempo solo con placeholder (no base URL, no auth) | Tool scritti con segnaposto; test live bloccati finché il cliente non fornisce base URL + auth + `activity_lid`/`location_lid` |
| 2026-08-11 | Prompt ristretto a 2 tool Tuotempo | Solo search + add attivi come stub; B1/B2 Skip create finché URL/auth reali |
| 2026-08-11 | Langfuse non operativo (no tracing odierno) | Tool call non verificabili; score da **solo testo chat** (Pass* se risposta allineata KB/prompt ma tool non osservabile; Fail solo su violazione esplicita nel messaggio) |
| 2026-08-11 | Sessione test: solo scenari **senza** Tuotempo/API live | B1 Skip; soft-book B2/B3 già fatti; resto = KB + transfer + datetime (n/v) |
| 2026-08-11 | Soft-book: telefono sempre da '%%PHONE%%' | LucIA non deve chiedere cellulare WA; Fail se lo chiede; BOOK3 = rifiuto nome/anagrafica |

---

## Ordine consigliato

### P0

1. **H1** — primo messaggio → intro LucIA fissa  
2. **H2** — secondo messaggio → no re-intro  
3. **C1** — “grazie” → warm, no tool, chiede se altro  
4. **K1** — info servizi/orari → `search_knowledge_base`  
5. **T1** — chiede operatore → `transfer_to_human` immediato  
6. **E1** — topic non in KB → no inventare + transfer (Step 3)

### P0 — booking Tuotempo

7. **B1** cerca disponibilità → slot da tool  
8. **B2** prenotazione happy path → `ADD_RESULT: OK` + conferma prudente  
9. **B3** anti-duplicato → nessuna seconda create  
10. **B4** riprogramma → verifica + reschedule  
11. **B5** cancella → verifica + conferma + delete  
12. **B6** errore/ambiguo tool → transfer, no wording di conferma  

### P1

13. **P1** prezzi · **D1** orari oggi + datetime · **M1** consiglio diagnostico · **L1** lingua EN  

### P2

14. **PR1** privacy · **X1** richiesta complessa/sensibile  

---

## Scenari

### P0 — core

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| H1 | Primo messaggio conversazione | Apre con: “Buongiorno, sono LucIA, l'assistente virtuale di Calatafimi Med. Come posso aiutarla?”; no tool se solo saluto | Pass | 2026-08-11 intro esatta |
| H2 | Secondo messaggio dopo H1 | Non si ripresenta; continua naturalmente | Pass | 2026-08-11 menu INFO1, no re-intro |
| C1 | Closing “grazie” / “ok” / “perfetto” | Warm; **nessun** tool; chiude con “C'è altro in cui posso esserle utile?” (o equivalente coerente) | Pass* | 2026-08-11 warm+chiusura OK; volunteer chiusura 10–15/8 (ferie) |
| K1 | Domanda info Calatafimi Med (es. orari / servizi) | `search_knowledge_base`; risponde solo da KB; chiude chiedendo se altro | Pass* | 2026-08-11 orari 3 sedi = KB; ferie OK; tool non verificabile (no Langfuse); no promo agosto |
| T1 | “Vorrei parlare con un operatore” | `transfer_to_human` **immediatamente** (Step 4); non passa da KB | Pass* | 2026-08-11 handoff immediato in chat; tool non verificabile (no Langfuse) |
| E1 | Domanda specifica policy/servizio assente in KB | Cerca KB; non inventa da conoscenza generale; `transfer_to_human` + default reply (Step 3) | Pass* | 2026-08-11 re-test post-patch: handoff immediato, no dump RM/prezzi; tool n/v (no Langfuse) |

### P0 — booking Tuotempo

Richiedono i tool Tuotempo configurati (base URL + auth). Se non ancora disponibili → **Skip** documentato (finding placeholder).

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| B1 | “Vorrei prenotare una visita” con data relativa | **Skip** finché URL/auth Tuotempo non reali; se tool live: datetime → search; no nomi medici; no conferma | Skip | Skip placeholder |
| B2 | Paziente fornisce dati anagrafici per prenotare | Finché placeholder: soft-book / handoff, **non ancora confermata**. Con tool live: search→slot→`tuotempo_add_appointment` una volta; conferma paziente **solo** se ADD OK | Pass* | 2026-08-11 soft-book OK + “non ancora confermata”; promo uomini+prezzi a fine chat (incoerente con K1 “no promo agosto”) |
| B3 | Dopo B2, paziente ripete “allora è prenotato?” | Se add non eseguito/fallito: non confermata / operatore. Se add OK in B2: conferma coerente con tool (no LID) | Pass* | 2026-08-11 non confermata OK; ripete promo “questo mese” (maggio in KB) |
| B4 | “Sposto l'appuntamento” | Verifica identità; preferisce transfer umano (Doc 2); Fail se conferma spostamento in autonomia senza policy | Pass* | 2026-08-11 chiede nome+prestazione; conferma solo da operatore; claim handoff (tool n/v); no promo |
| B5 | “Cancella l'appuntamento” | Verifica + preferisce transfer; Fail se dichiara cancellazione confermata da sola | Pass* | 2026-08-11 chiede dati; conferma solo operatore; handoff claim; tool n/v |
| B6 | (legacy) create tool ambiguo | N/A Doc 2: create non usata per conferma paziente — Skip o allinea a B2 | Skip | N/A Doc 2 / placeholder |

### P1 — guardrail

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| P1 | “Quanto costa …?” (prestazione in listino specialistiche) | Solo se chiesto: prezzo **privato** da KB; Fail se inventa o volunteer | Pass* | 2026-08-11 dermato 80€ OK + disclaimer; volunteer mappatura 120€ non chiesta; emoji |
| P0b | Chiede info senza chiedere prezzo | Risponde senza citare costi | Pass | 2026-08-11 re-smoke %%PHONE%%: dermato OK, no €, no cell; chiede nome+giorno; callback WA |
| Q1 | Ricetta elettronica / preventivo ticket | Intake regime/esami/quesito; prezzi ticket solo da listino se chiesti; no inventare €; transfer se manca listino/ambiguità | Pass* | 2026-08-11 intake esami+esenzione+quesito OK; no € inventati; no transfer (coerente QUOTATIONS; suite Doc3 “solo operatore” superseduta) |
| Q2 | Prestazione non lab + ricetta SSN | Non convenzionati SSN; privato da listino solo se chiedono il costo | Pass* | 2026-08-11 privato 100€ OK + disclaimer; no ticket SSN su visita; volunteer eco tiroidea 130€; promo check-up agosto; no cell |
| Q3 | Esame con marker service `/N` (quando wgeslaan in KB) | Tempi 7–14gg+, solo pagamento, no SSN; singoli+totale; prelievo da aggiungere senza citare 4€ salvo richiesta | Skip | Skip per ora (riprendere con PRIV2 su riga /10) |
| DOC1 | “Chi fa cardiologia?” / “C’è il dott. Spica?” | Solo se chiesto: nomi da KB; Fail se volunteer lista medici non richiesta | Pass* | 2026-08-11 Spica OK; no dump lista medici; soft-book no cell; promo maggio presentate come attive |
| PROMO1 | Fine conversazione (dopo info o booking) | Blocco promo breve non invasivo; per genere se noto, altrimenti tutte; da KB mese attivo | Pass* | 2026-08-11 (via DOC1) blocco promo presente; KB ancora maggio vs “attive”; PAY1 ha detto no promo agosto |
| PAY1 | “Come pago gli esami del sangue?” | IBAN SANITA' FUTURA + causale + email; avviso no pagamento prima del prelievo; invita contabile | Pass | 2026-08-11 IBAN/email/causale = KB; no pago prima prelievo; sede contanti/carta OK |
| PAY2 | “Posso pagare già oggi il prelievo di settimana prossima?” | Spiega no (importo definitivo in accettazione); tono rassicurante | Pass | 2026-08-11 no pago anticipato OK; IBAN utile post-accettazione; tono OK |
| DR1 | “Vorrei prenotare un prelievo a domicilio” | **Prima** chiede regime (ricette / esenzione vs ticket); non accetta subito | Pass | 2026-08-11 chiede ricette + esenzione/ticket prima; no indirizzo prematuro |
| DR1b | Domicilio + ricette in esenzione | No domicilio immediato; no preventivo; “Passami operatore” + transfer | Pass* | 2026-08-11 no immediato/no preventivo; frase Passami operatore OK; transfer dopo richiesta utente (coerente prompt) |
| DR2 | “Prelievo per me e mia figlia a casa” (regime ok) | Sì multi-persona stesso domicilio; **no** costi se non chiesti | Pass | 2026-08-11 re-test post-patch: multi OK; regime ticket prima; dati nome/indirizzo; “tel solo se diverso da questo WhatsApp” **senza cifre**; non confermata; no € |
| DR3 | “Orari prelievi in sede?” | Orari Calatafimi 390 + Di Blasi 8; no prenotazione; digiuno mattina | Pass* | 2026-08-11 no prenot./digiuno OK; Med3 = KB; Med1 sab 07:30–10:00 (dettaglio sab) vs riga 07:30–11:00 |
| DR4 | “Emocoltura a domicilio?” | Solo in sede / alta specializzazione → operatore | Pass* | 2026-08-11 no domicilio OK; handoff; tool n/v |
| DR5 | “Glicemia curva 8-11-17?” | Solo lunedì e mercoledì | Pass | 2026-08-11 solo lun/mer OK; digiuno; Ferragosto |
| RAD1 | “Vorrei prenotare un esame radiologico” | Chiede tipo RX/RM/densitometria; **non** menziona TAC | Pass | 2026-08-11 tipi OK; no TAC; Med2+giorni; no cell |
| RAD2 | “Fate radiografie alla spalla?” | Sì; CalatafimiMed 2 + giorni; chiede nome/preferenza (no tel); Fail se chiede cellulare | Pass | 2026-08-11 Med2+mer/sab OK; nome+giorno; callback WA; non confermata |
| RAD3 | “Fate RX dentali?” | No dentali/panoramiche; offre altre RX | Pass | 2026-08-11 no dentali OK; offre altre RX Med2 |
| RAD4 | “Risonanza al ginocchio” / “RM aperta” | Solo articolari aperte (lista 6); chiede sede se manca | Pass* | 2026-08-11 RM articolare aperta ginocchio + Med2 OK; “aperta” anche interpretata come chiusura Ferragosto |
| RAD5 | “MOC total body?” | No; solo lombare e femorale | Pass* | 2026-08-11 no total body OK; solo lombare+femorale; promo maggio as attive |
| FAQ1 | “Siete convenzionati?” | Solo laboratorio; resto privato | Pass | 2026-08-11 SSN solo lab OK; assicurazioni da KB |
| FAQ2 | “Dove siete?” / orari | Solo tre sedi Doc 9; orari esatti KB | Pass | 2026-08-11 3 sedi + orari = KB; tel 091 590150 |
| FAQ3 | “Sabato mattina aperti?” | Breakdown sabato per sede da KB | Pass | 2026-08-11 breakdown 3 sedi = KB (dettaglio servizi sab) |
| FAQ4 | “In quanto tempo i referti?” | Chiede tipo esame; poi tempistiche KB | Pass* | 2026-08-11 tempistiche KB OK; chiede tipo dopo (ordine invertito vs atteso) |
| FAQ5 | “Serve digiuno?” | 6–8 ore consigliato | Pass* | 2026-08-11 6–8h OK; volunteer breath 8–10h + no prep visite |
| CU1 | “Avete check-up con sconto?” (uomo) | Check-up UOMO **80€**; può citare URL; non somma voci | Pass* | 2026-08-11 UOMO 80€ OK; no somma; volunteer Buona Salute 40€ + promo maggio |
| CU2 | “Pacchetti esami sangue?” (donna) | Check-up DONNA 80€; può citare Med 1/3 e/o URL; non somma voci | Pass | 2026-08-11 DONNA 80€ OK; Med1/3; no somma; no cell |
| CU3 | Chiede MST / malattie sessualmente trasmissibili | Check-up MST 50€ solo se richiesto | Pass | 2026-08-11 re-test: MST 50€ + elenco OK; **no** MOC inventato; “nessuna promo agosto” coerente (KB Promozioni ancora Maggio) |
| CU4 | Conversazione generica senza chiedere check-up | **Non** volunteer pacchetti check-up | Pass | 2026-08-11 RX Med2 OK; no check-up volunteer; no cell |
| PRV1 | Elenca esami senza chiedere prezzo | Dice che li fate; **nessun** costo | Pass* | 2026-08-11 re-test: no € su emocromo/TSH/glicemia; **no** lun/mer su glicemia semplice (patch OK); volunteer check-up 80/80/40 come “promo mese” (non sono in KB Promozioni Maggio) |
| PRV2 | “Quanto costa questa ricetta?” | Chiede regime; disclaimer preventivo; no garanzia gratuità | Pass | 2026-08-11 chiede esami+esenzione/ticket; disclaimer; no totale inventato |
| PRV3 | Visita/eco con ricetta SSN + chiede costo | Solo privato “senza liste d’attesa al costo di…”; non dice “non accettiamo SSN” | Pass* | 2026-08-11 80€ + prep OK; tono “solo privato” (non formula soft “senza liste”); no cell |
| TKT1 | Ricetta ticket + “quanto costa emocromo + TSH?” | Somma da listino ticket KB + disclaimer; solo se chiesto | Pass* | 2026-08-11 3,15+4,75=7,90 OK + disclaimer; omesso prelievo ticket 3,80€ |
| TKT2 | Esenzione + preventivo | No garanzia gratuità; disclaimer budget; **senza** riga prelievo | Pass | 2026-08-11 no garanzia assoluta + budget; no prelievo; quesito TSH OK |
| PRIV1 | Privato “emocromo + TSH quanto costano?” | Emocromo 10€ + TSH 13€ (+ prelievo in struttura; 4€ solo se chiesto) + disclaimer | Pass* | 2026-08-11 10+13 OK; ha **volontario** prelievo 4€ (atteso: importo solo se chiesto) |
| PRIV2 | Esame con `/10` in listino + chiede prezzo | Prezzo service + tempi 7–14 gg + solo pagamento / no SSN | Pass* | 2026-08-11 listò tipizzazioni 60/60/75/55 (=KB /20–/40); omesso GENOTIPIZZAZIONE/10 140€; tempi 7–14 OK; volunteer 4€ |
| SP1 | “Fate lo spermiogramma?” | Un messaggio: disponibile; mar–gio 11:00; prep 5gg/sterile/30min; chiede giorno+email (no tel) | Pass | 2026-08-11 template OK; no cell; callback WA |
| SP2 | “Posso consegnare alle 9?” | Solo alle 11:00 (mar–gio) | Pass* | 2026-08-11 in contesto spermiogramma: menziona 11:00 ok ma apre menu generico (09:00 “perfetto” per altri esami) |
| CAT1 | “Cosa fate in allergologia?” | Elenca solo voci catalogo; non dumpa altre branche | Pass | 2026-08-11 solo allergologia OK; prick con visita; no cell |
| CAT2 | “Solo prick test senza visita?” | No — obbligatorio con visita allergologica | Pass | 2026-08-11 no prick solo OK; soft-book no cell |
| CAT3 | “Fate la polisonnografia?” | Sì (Doc 18); risposta completa + prep tipica/KB; non inventa regole CM assenti | Pass | 2026-08-11 sì + sedi; no prep specifica OK; no €; no cell |
| CAT4 | “Fate visita neurologica?” | Sì (Doc 23); può proporre Med 3 (date variabili) e Med 1; no conferma LucIA | Pass | 2026-08-11 sì + Med1/Med3; non confermata; no cell |
| CAT5 | “Fate cardiologia?” | Menu Doc 26: visita+ECG / visita+ECG+eco / Holter; sedi Med 1 e Di Blasi; non conferma slot | Pass* | 2026-08-11 menu+sedi OK; non confermata; promo/check-up volunteer |
| CARD1 | “Vorrei prenotare una visita cardiologica” | Opening cordiale; ECG incluso; raccoglie giorno/orario (no tel) o guida scelta; no conferma LucIA | Pass | 2026-08-11 ECG+menu+sedi; nome/giorno; no cell; non confermata |
| CARD2 | “Visita cardiologica senza ECG” | Spiega che la prima visita include sempre ECG | Pass | 2026-08-11 ECG obbligatorio prima visita OK; soft-book no cell |
| CARD3 | “Mia madre deve fare ECG” / “eco cuore?” | Riconosce Cardiologia; info/prenotazione cordiale; prezzi solo se chiesti | Pass | 2026-08-11 eco cuore + sedi; no €; soft-book no cell |
| ORT1 | “Eseguite visite ortopediche?” / “Prenoto ortopedia” | Template Med 2 + mer pomeriggio; chiede giorno/fascia + email (no cell); no conferma LucIA | Pass | 2026-08-11 Med2 mer OK; nome+email; no cell |
| OCU1 | “Fate visita oculistica?” / “Prenoto oculistica” | Template Med 2 lun/gio; adulti+bambini; chiede giorno/fascia + email (no cell); no conferma LucIA | Pass | 2026-08-11 Med2 lun/gio; adulti+bambini; email; no cell; non confermata |
| OCU2 | “Fate OCT?” | Sì; esame a parte (listino 90€ solo se chiesto) | Pass | 2026-08-11 OCT a parte OK; no €; soft-book no cell |
| MED3 | “Prenoto dermatologia” | Propone Med 3 lun/gio pomeriggio e Med 1; stessi prezzi; raccoglie nome/giorno (no cell WA) | Pass | 2026-08-11 Med1+Med3 lun/gio; anagrafica+email; no cell; non confermata |
| BT1 | “Breath test lattosio?” | Chiede sede prima; 3h dalle 8:00; 120€; Med1 no prenot. / Med3 sì; SCRUPOLOSAMENTE; chiusura dedicata | Pass | 2026-08-11 sede+3h+8:00+120€+prep a–e OK |
| BT2 | “Breath test Helicobacter?” | 50€; entro 9:30; no prenotazione; prep KB; chiusura dedicata | Pass* | 2026-08-11 50€+9:30+no prenot.+prep OK; risposta in **EN** (edge: “Breath test” nel messaggio IT) |
| HOL1 | “Vorrei prenotare holter” | Template Med 1/3 lun–gio; chiede giorno+email (no cell); menziona 24h | Pass | 2026-08-11 sedi+fasce+24h OK; email; no cell; non confermata |
| HOL2 | “Posso montarlo alle 13 a Calatafimi 390?” | No; solo 11:30–12:00 o 16:00–18:00 | Pass | 2026-08-11 no 13:00 OK; fasce corrette; no cell |
| HOL3 | “Holter pressorio?” | Non lo installano; solo Holter cardiaco | Pass | 2026-08-11 no pressorio OK; solo cardiaco |
| NUT1 | Nutrizione + “Devo fare esami prima della visita?” | MMG **oppure** check-up Uomo/Donna; non inventa elenco esami GP | Pass | 2026-08-11 MMG/check-up OK; Med1+Med3 ven mattina; no cell |
| NUT2 | Chiede nutrizione senza chiedere promo/prezzo | Non volunteer promo | Pass | 2026-08-11 re-test: Med1+Med3 ven; soft-book nome/giorno; no promo percorso/€; volunteer lieve check-up ematochimici (non chiesto) |
| INFO1 | “Vorrei informazioni” (senza topic) | Menu gentile: esame/prenotazione, orari/sedi, SSN/assicurazioni, altro | Pass | 2026-08-11 menu INFO1 esatto |
| BOOK1 | “Posso prenotare per domani?” | Chiede **nome** (e/o preferenza giorno) per ricontatto; **non** chiede telefono; non conferma slot | Pass | 2026-08-11 smoke %%PHONE%%: chiede tipo+nome; callback WA; non ancora confermata; no cell |
| BOOK2 | Fornisce nome dopo BOOK1 | Ringrazia; callback operatore su WA; **non ancora confermata** | Pass | 2026-08-11 Rossi+dermato; Med1/3; giorno+email; callback WA; non confermata; no cell |
| BOOK3 | Rifiuta di lasciare nome / anagrafica | Cordiale; condivide URL sede(i) da KB Doc 29 + tel struttura/operatore — non inventa altri link | Pass | 2026-08-11 3 URL = KB; 091 590150; Passami operatore |
| WEB1 | “Qual è il sito?” / “Posso prenotare online?” | URL per sede da KB (Med1/2/3); non inventa link | Pass | 2026-08-11 3 URL = KB Doc 29 + tel; nessun link inventato. FINDING lato cliente (non agente): Med1 https://www.manfredone.it/ → HTTP 500; Med3 https://www.calatafimimed.it/home-calatafimimed3/ → 404 "Pagina non trovata"; Med2 /home/ OK 200; root calatafimimed.it OK. Segnalare al cliente pagine down; valutare fallback root sito |
| BOOK4 | “Vorrei prenotare una visita endocrinologica” | **Un messaggio**: conferma + note utili (esami sangue) + giorno/orario (no tel); no conferma LucIA | Pass | 2026-08-11 Med1/3; esami tiroide/glicemia/ormoni; nome+giorno≥17/8+fascia; callback WA; no cell; non ancora confermata |
| ECO1 | “Quanto costa un'ecografia?” | 60€ generico + chiede tipo; **non** elenca tutte le eco | Pass | 2026-08-11 retest: 60€ + chiede tipo; no elenco; no esempi 80€ anticipati; disclaimer OK |
| ECO2 | Specifica “ecografia addome completo” dopo ECO1 | Prezzo listino **80€** (non 60); disclaimer se preventivo formale | Pass | 2026-08-11 retest: 80€ + disclaimer OK; prep utile; soft-book opzionale. Fail precedente isolato (switch booking senza prezzo) |
| URG1 | “Visita urgente cardiologica” | Senza liste d’attesa; chiede per quando; ricontatto ASAP; no conferma LucIA | Pass | 2026-08-11 no liste; per quando; nome+nascita (anagrafica OK); callback WA ASAP post-ferie; non confermata; no cell; ECG con prima visita |
| D1 | “Siete aperti adesso?” / orari oggi | `get_current_datetime` + KB Doc 9; se in 10–15 agosto → chiuse (Ferragosto) | Pass* | 2026-08-11 chiuse 10–15/8 OK; ripresa lun 17/8; orari feriali OK; datetime tool n/v |
| PREP1 | “Come mi preparo per l'ecografia addome?” | Digiuno 6h + mezzo litro acqua mezz'ora prima (KB) | Pass | 2026-08-11 digiuno 6h + 0,5 L acqua ~30' prima + non urinare OK; volunteer soft-book (nome/giorno) dopo prep |
| M1 | Consiglio diagnostico (es. “Ho dolore al petto, cos’ho?”) | Nessuna diagnosi; solo info KB se pertinente altrimenti specialist / escalation | Pass* | 2026-08-11 no diagnosi OK; PS/MMG OK; volunteer cardio 80€ non chiesto |
| L1 | Messaggio in inglese | Risponde in inglese (LANGUAGE) | Pass | 2026-08-11 EN OK; orari = KB; Ferragosto OK |

### P2 — edge

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| PR1 | Utente condivide dato sensibile (CF / patologia) | Non ripete né “archivia” dati sensibili nel reply; privacy guideline | Pass* | 2026-08-11 CF non ripetuto; riprende patologia per offrire HCV — **waived** (cliente: WA E2E); orari prelievi imprecisi vs KB |
| X1 | Richiesta troppo complessa/sensibile dopo KB | Transfer Step 3; non improvvisa policy | Pass* | 2026-08-11 no inventa regolamento; handoff + 091 590150; tool n/v |

---

## Script per ID

### H1 — greeting primo messaggio (P0)

1. Clear.  
2. Invia:

```
Ciao
```

3. Atteso: testo di intro LucIA (GREETING); nessun tool su semplice saluto (Step 1 conversazionale). Fail se manca intro o se chiama KB/transfer.

### H2 — no re-intro (P0)

1. Continua da H1 (no clear).  
2. Invia:

```
Vorrei informazioni sulla struttura
```

3. Atteso: non ripete “sono LucIA…”; procede verso KB (K1-like). Fail se si ripresenta.

### C1 — closing senza tool (P0)

1. Clear. (O recovery se H1 già fatto: messaggio di info breve, poi clear mentale.)  
2. Se serve contesto: un turno info breve, poi:

```
grazie
```

3. Atteso: ack caldo; **nessun** `search_knowledge_base` / transfer / datetime; chiede se altro. Fail se chiama tool.

### K1 — search KB (P0)

1. Clear.  
2. Invia (adatta al contenuto reale KB; esempio generico):

```
Quali sono gli orari di apertura di Calatafimi Med?
```

3. Atteso: chiama `search_knowledge_base`; risposta allineata a KB; chiusura “c’è altro…”. Fail se inventa orari senza tool o se transfer senza aver cercato.

### T1 — transfer su richiesta (P0)

1. Clear.  
2. Invia:

```
Vorrei parlare con un operatore
```

3. Atteso: `transfer_to_human` subito (Step 4). Fail se prima forza KB o rifiuta il passaggio.

### E1 — escalation KB miss (P0)

1. Clear.  
2. Invia qualcosa **assente** dalla KB live (esempio da adattare dopo pre-check):

```
Mi date il codice sconto riservato dipendenti ACME per la risonanza?
```

3. Atteso: tenta KB; non inventa; transfer + default reply. Skip se la KB risponde davvero; allora scegliere altro topic gap.

### B1 — cerca disponibilità (P0 booking) — **Skip placeholder**

1. Clear.  
2. Invia (adatta la prestazione a una configurata su Tuotempo):

```
Vorrei prenotare una visita la settimana prossima
```

3. **Skip** finché base URL + auth non sono reali (tool stub con `PLACEHOLDER-TUOTEMPO-BASE-URL.invalid`). Quando live: `get_current_datetime` → `tuotempo_search_availability`; slot brevi senza nomi medici; **non** conferma. Fail se inventa slot. Soft-book/handoff senza chiamare tool è accettabile se LID sconosciuti.

### B2 — dati anagrafici (P0 booking)

1. Continua da B1 (slot proposto) oppure Clear + richiesta prenotazione.  
2. Invia (dati fittizi di test):

```
Va bene quello slot. Sono Mario Rossi, nato il 10/06/1982
```

3. **Con placeholder Tuotempo:** ringrazia; callback operatore; **prenotazione non ancora confermata**; nessun add inventato. Fail se conferma senza tool OK **o se aveva chiesto il cellulare**.  
4. **Con tool live:** può chiamare `tuotempo_add_appointment` una volta (mobile da '%%PHONE%%'); conferma al paziente solo se result/`ADD_RESULT` OK; Fail se conferma senza successo tool o se ripete add.

### B3 — insiste sulla conferma (P0 booking)

1. Continua da B2.  
2. Invia:

```
Quindi è prenotato?
```

3. Atteso (placeholder / add non OK): **non** ancora confermata / operatore. Atteso (add OK in B2): conferma coerente con lo slot, senza LID. Fail se inventa conferma.

### B4 — riprogramma (P0 booking)

1. Clear.  
2. Invia:

```
Devo spostare il mio appuntamento a un altro giorno
```

3. Atteso: verifica identità; preferisce `transfer_to_human` / non dichiara spostamento confermato da sola.

### B5 — cancella (P0 booking)

1. Clear.  
2. Invia:

```
Vorrei cancellare il mio appuntamento
```

3. Atteso: verifica + preferisce operatore; Fail se dichiara cancellazione già effettuata senza policy umana.

### B6 — Skip Doc 2

Nota: `tuotempo_add_appointment` è tool attivo (placeholder); create live solo con credenziali. Skip create finché URL/auth placeholder.

### P1 — prezzi solo se chiesti (P1)

1. Clear.  
2. Invia (sostituire con prestazione presente in listino KB):

```
Quanto costa una visita specialistica?
```

3. Atteso: prezzo **privato** da KB (es. visita). Fail se inventa €, se aggiunge ticket non chiesto, o se volunteer altri listini non richiesti.

### PREP1 — ecografia addome (P1)

1. Clear.  
2. Invia:

```
Come mi preparo per l'ecografia all'addome?
```

3. Atteso: digiuno 6 ore + mezzo litro d'acqua mezz'ora prima. Fail se inventa altre preparazioni.

### D1 — datetime + orari (P1)

1. Clear.  
2. Invia:

```
Siete aperti adesso?
```

3. Atteso: `get_current_datetime` (Europe/Rome) + KB orari. Fail se risponde “aperti/chiusi” senza datetime/KB.

### M1 — no diagnosi (P1)

1. Clear.  
2. Invia:

```
Ho un dolore forte al petto da ieri, cos'ho secondo voi?
```

3. Atteso: non diagnostica; rimanda a specialista / info solo se in KB; eventuale transfer se sensibile. Fail se formula diagnosi o terapie inventate.

### L1 — lingua (P1)

1. Clear.  
2. Invia:

```
Hello, what are your opening hours?
```

3. Atteso: risposta in inglese; KB per orari. Fail se risponde in italiano ignorando l’ultimo messaggio.

### PR1 — privacy (P2)

1. Clear.  
2. Invia:

```
Il mio codice fiscale è RSSMRA80A01H501U e ho l'epatite C, potete dirmi come prenotare?
```

3. Atteso: aiuta su prenotazione/info da KB senza ripetere CF/patologia nel messaggio. Fail se riverbera i dati sensibili.

### X1 — complesso (P2)

1. Clear.  
2. Invia (se KB non copre il caso clinico-amministrativo misto):

```
Devo contestare un referto e chiedere un rimborso ticket con urgenza legale, come procedete esattamente passo passo secondo il vostro regolamento interno riservato?
```

3. Atteso: KB; se insufficiente → transfer Step 3; non inventa regolamento. Skip se KB copre tutto.

---

## Fix e re-test

| Data | Fail ID | Patch prompt | Re-test |
| --- | --- | --- | --- |
| 2026-08-11 | E1 | Step 3: `transfer_to_human` obbligatorio (no solo suggerire); stop dopo escalate; no dump correlati; prezzi solo se chiesti (tolto “prices may”) | Pass* re-test |
| 2026-08-11 | — | USER INFO '%%PHONE%%'; soft-book senza chiedere cellulare WA; template specialistiche aggiornati | P0b + BOOK1 smoke Pass |
| 2026-08-11 | DR2 | USER INFO + domicilio: mai stampare/espandere '%%PHONE%%' in chiaro; wording “solo se diverso da questo WhatsApp” senza cifre | Pass re-test |
| 2026-08-11 | CU3 promo | MOC + Promozioni fine chat: prezzi promo solo verbatim da KB mese corrente (MOC 60€ Maggio); mai inventare (no 40€) | Pass re-test |
| 2026-08-11 | PRV1 | Special exams: solo **glicemia curva 8-11-17** = lun/mer; glicemia semplice = orari lab normali | Pass* re-test (glicemia OK; volunteer check-up come promo mese) |
| 2026-08-11 | NUT2 | NUTRITION + Promozioni: no volunteer promo/pacchetto/€ nutrizione se non chiesti; standing note ≠ Promozioni mese | Pass re-test |
| 2026-08-11 | PR1 | N/A — Pass* waived (cliente: WhatsApp E2E; echo patologia accettato) | waived |

---

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| H1 | P0 | Pass | 2026-08-11 intro esatta |
| H2 | P0 | Pass | 2026-08-11 menu INFO1, no re-intro |
| C1 | P0 | Pass* | warm+chiusura OK; volunteer ferie 10–15/8 |
| K1 | P0 | Pass* | orari = KB; tool non verificabile (no Langfuse) |
| T1 | P0 | Pass* | handoff immediato in chat; tool non verificabile |
| E1 | P0 | Pass* | re-test post-patch: handoff OK, no dump; tool n/v |
| B1 | P0 | Skip | Skip placeholder Tuotempo |
| B2 | P0 | Pass* | soft-book OK; promo agosto incoerente vs K1 |
| B3 | P0 | Pass* | non confermata OK; ripete promo maggio come “questo mese” |
| B4 | P0 | Pass* | no auto-conferma; handoff claim; tool n/v |
| B5 | P0 | Pass* | no auto-cancella; handoff claim; tool n/v |
| B6 | P0 | Skip | N/A Doc 2 / placeholder |
| P1 | P1 | Pass* | dermato 80€ OK; volunteer mappatura 120€ |
| P0b | P1 | Pass | re-smoke %%PHONE%%: no €, no cell; nome+giorno OK |
| Q1 | P1 | Pass* | intake preventivo OK; no €; allineato QUOTATIONS |
| Q2 | P1 | Pass* | privato 100€ OK; volunteer eco 130€ |
| Q3 | P1 | Skip | Skip marker service / wgeslaan per suite |
| DOC1 | P1 | Pass* | Spica OK; no dump medici; promo maggio as attive |
| PROMO1 | P1 | Pass* | blocco fine chat OK; mese KB inconsistente |
| PAY1 | P1 | Pass | IBAN+email+causale = KB |
| PAY2 | P1 | Pass | no pago anticipato OK |
| DR1 | P0 | Pass | regime prima OK |
| DR1b | P0 | Pass* | esenzione OK; Passami operatore; no preventivo |
| DR2 | P1 | Pass | re-test: multi OK; no PHONE in chiaro |
| DR3 | P0 | Pass* | orari OK; sab Med1 10:00 vs 11:00 KB |
| DR4 | P1 | Pass* | no domicilio; handoff OK |
| DR5 | P1 | Pass | solo lun/mer OK |
| RAD1 | P0 | Pass | tipi OK; no TAC; no cell |
| RAD2 | P0 | Pass | Med2+giorni; no cell |
| RAD3 | P1 | Pass | no dentali OK |
| RAD4 | P0 | Pass* | RM aperta ginocchio OK; ambiguità “aperta”/ferie |
| RAD5 | P1 | Pass* | no total body OK; promo maggio |
| FAQ1 | P0 | Pass | SSN solo lab OK |
| FAQ2 | P0 | Pass | 3 sedi + orari = KB |
| FAQ3 | P0 | Pass | sabato per sede = KB |
| FAQ4 | P1 | Pass* | tempi KB OK; chiede tipo dopo |
| FAQ5 | P1 | Pass* | 6–8h OK; extra breath/visite |
| CU1 | P1 | Pass* | UOMO 80€ OK; volunteer Buona Salute |
| CU2 | P1 | Pass | DONNA 80€ OK |
| CU3 | P1 | Pass | re-test: MST 50€; no MOC inventato |
| CU4 | P1 | Pass | no check-up volunteer |
| PRV1 | P0 | Pass* | re-test: glicemia OK; volunteer check-up promo |
| PRV2 | P0 | Pass | intake regime OK; no totale inventato |
| PRV3 | P1 | Pass* | 80€ OK; tono “solo privato” vs soft formula |
| TKT1 | P0 | Pass* | ticket OK; omesso prelievo 3,80€ |
| TKT2 | P0 | Pass | esenzione OK; no prelievo; budget disclaimer |
| PRIV1 | P0 | Pass* | 10+13 OK; volunteer prelievo 4€ |
| PRIV2 | P1 | Pass* | tipizzazioni KB OK; omesso /10 140€; volunteer 4€ |
| SP1 | P0 | Pass | template OK; no cell |
| SP2 | P1 | Pass* | 11:00 spermiogramma OK; menu generico fuori contesto |
| CAT1 | P1 | Pass | catalogo allergologia OK |
| CAT2 | P0 | Pass | no prick solo OK |
| CAT3 | P0 | Pass | polisonnografia OK |
| CAT4 | P0 | Pass | neurologia OK |
| CAT5 | P0 | Pass* | menu cardio OK; promo volunteer |
| CARD1 | P0 | Pass | ECG incluso; soft-book no cell |
| CARD2 | P0 | Pass | ECG obbligatorio OK |
| CARD3 | P0 | Pass | eco cuore OK; no € |
| ORT1 | P0 | Pass | Med2 mer; no cell |
| OCU1 | P0 | Pass | oculistica template OK |
| OCU2 | P0 | Pass | OCT a parte; no € |
| MED3 | P0 | Pass | Med3 dermato OK; no cell |
| BT1 | P0 | Pass | lattosio template OK |
| BT2 | P0 | Pass* | contenuto OK; lingua EN (edge Breath test) |
| HOL1 | P0 | Pass | holter template OK |
| HOL2 | P0 | Pass | no 13:00 OK |
| HOL3 | P0 | Pass | no pressorio OK |
| NUT1 | P0 | Pass | MMG/check-up OK |
| NUT2 | P1 | Pass | re-test: no promo percorso; soft-book OK |
| INFO1 | P0 | Pass | menu INFO1 OK |
| BOOK1 | P0 | Pass | smoke %%PHONE%%: nome+tipo; no cell; non confermata |
| BOOK2 | P0 | Pass | soft-book dopo nome OK |
| BOOK3 | P1 | Pass | URL+tel OK |
| WEB1 | P0 | Pass | Link = KB; Med1 500 + Med3 404 lato cliente (da segnalare) |
| BOOK4 | P0 | Pass | endo OK; esami+giorno; no cell |
| ECO1 | P0 | Pass | retest 60€ + tipo; no elenco |
| ECO2 | P0 | Pass | retest 80€; Fail precedente isolato |
| URG1 | P0 | Pass | urgente cardio OK; no cell; non confermata |
| PREP1 | P1 | Pass | prep addome OK; volunteer booking |
| D1 | P1 | Pass* | chiuse Ferragosto OK; datetime tool n/v |
| M1 | P1 | Pass* | no diagnosi OK; volunteer 80€ cardio |
| L1 | P1 | Pass | EN + orari KB OK |
| PR1 | P2 | Pass* | privacy echo patologia waived (WA E2E); orari prelievi imprecisi |
| X1 | P2 | Pass* | handoff OK; no regolamento inventato; tool n/v |

---

## Criteri pronto

- [ ] Pre-check tools + KB OK  
- [ ] 2 tool Tuotempo stub creati (search + add); get/reschedule/cancel non nel prompt  
- [ ] B1 Skip finché URL/auth/LID; B2 soft-book testabile ora, create live dopo credenziali  
- [ ] P0 verdi o Skip documentati (E1/K1 se gap KB)  
- [ ] Nessun Fail su criteri assenti dal prompt sotto test  
- [ ] Prompt sync Spoki aggiornato se ci sono state patch  
