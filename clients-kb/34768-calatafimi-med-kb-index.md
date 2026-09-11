# Calatafimi Med 34768 — Indice KB (uso interno, non caricare in Spoki)

> Metadati debug. **Non** caricare questo indice in Spoki.
> Limite FE Spoki: **≤16 000 caratteri** per documento KB (1 file = 1 documento).

## File operativi (caricare in Spoki)

Limite FE: **≤16 000 caratteri** per documento **markdown**. I **CSV** tabellari (pattern CASP 53298) sono preferiti per i listini: di solito Spoki li indicizza per riga e evitano i 9 chunk markdown.

### Preferito — listini CSV

| File | Uso |
| --- | --- |
| [`34768-calatafimi-med-kb-listino-privato-lab.csv`](34768-calatafimi-med-kb-listino-privato-lab.csv) | ~1646 voci lab **privato** (codice, mnemonico, descrizione, prezzo, service, note) |
| [`34768-calatafimi-med-kb-listino-ticket-ssn.csv`](34768-calatafimi-med-kb-listino-ticket-ssn.csv) | ~152 voci lab **ticket SSN** (Wgeslaan) |
| [`34768-calatafimi-med-kb-listino-specialistiche.csv`](34768-calatafimi-med-kb-listino-specialistiche.csv) | ~69 prestazioni specialistiche private (branca, prestazione, prezzo) |

### KB fatti markdown (3 parti, ≤16k)

| File | Uso | Limite |
| --- | --- | --- |
| [`34768-calatafimi-med-kb-01-struttura-operativa.md`](34768-calatafimi-med-kb-01-struttura-operativa.md) | Sedi, contatti/siti, SSN, prenotazioni, radiologia, prelievi, prep, chiusure, promo | ≤16k |
| [`34768-calatafimi-med-kb-02-prestazioni-prezzi.md`](34768-calatafimi-med-kb-02-prestazioni-prezzi.md) | Allowlist, catalogo Doc 17, medici (+ listino specialistiche anche in CSV) | ≤16k |
| [`34768-calatafimi-med-kb-03-laboratorio-checkup-ticket.md`](34768-calatafimi-med-kb-03-laboratorio-checkup-ticket.md) | Regole lab/IBAN/service, check-up (+ ticket anche in CSV) | ≤16k |

### Fallback — listino privato markdown (solo se CSV non usabile)

| File | Uso |
| --- | --- |
| [`34768-calatafimi-med-kb-listino-privato-lab-01.md`](34768-calatafimi-med-kb-listino-privato-lab-01.md) … [`-09.md`](34768-calatafimi-med-kb-listino-privato-lab-09.md) | Stesso listino privato spezzato ≤16k |

### Stub aggregati (non caricare in Spoki)

| File | Uso |
| --- | --- |
| [`34768-calatafimi-med-kb.md`](34768-calatafimi-med-kb.md) | Indice puntatori |
| [`34768-calatafimi-med-kb-listino-privato-lab.md`](34768-calatafimi-med-kb-listino-privato-lab.md) | Indice chunk listino md |

> In Spoki caricare di default: **3 CSV listini + 3 markdown operativi** (6 documenti). I 9 chunk md listino solo come fallback. Non caricare questo indice né gli stub.

Check locale markdown ≤16k: `python3 scripts/check_34768_kb_char_limit.py`

## Fonti integrate

| # | Documento | Data merge | Contenuto portato in KB |
| --- | --- | --- | --- |
| 1 | Prezzi Specialistiche CALATAFIMIMED (paste chat) | 11/08/2026 | Listino specialistiche/prestazioni; nota convenzioni assicurative; regole raddoppio RX/RM a due segmenti; vincolo rimozione cerume dopo prima visita |
| 2 | Informazioni generiche (paste chat) | 11/08/2026 | Preparazione ecografia addome (digiuno 6h + 0,5 L acqua); chiusura sedi 10–15 agosto (Ferragosto) |
| 3 | Preventivi (paste chat) | 11/08/2026 | Ambito laboratorio vs specialistiche; prelievo 4,00 €; marker esami in service `/10`–`/70`; tempi referto 7–14 gg; solo pagamento / no SSN; no convenzione SSN per prestazioni non di laboratorio |
| 4 | Lista medici (paste chat) | 11/08/2026 | Medici per specializzazione (Allergologia→Urologia; Ortopedia chirurgica; Radiologia; ecc.) |
| 5 | Promozioni (paste chat) | 11/08/2026 | Promo mese di **maggio**: donne (fasce nascita 1976–1991 / prima del 1966); uomini (cardio+ECG, urologia+eco+PSA); cardio+ECG anche donne |
| 6 | IBAN coordinate bancarie per esami (paste chat) | 11/08/2026 | Bonifico solo lab (sede/domicilio): SANITA' FUTURA SRL; IBAN IT78T0200804666000102728843; causale; email pagamenti@manfredone.it; no pagamento prima di prelievo/accettazione |
| 7 | Prelievi (paste chat) | 11/08/2026 | Sedi e orari prelievi (Calatafimi 390, Di Blasi 8); no prenotazione in sede; domicilio Palermo/Monreale e tariffario multi-persona; emocoltura solo sede; BHCG a pagamento; glicemia 8-11-17 lun/mer; lab chiude 18:00 |
| 8 | Radiologia (paste chat) | 11/08/2026 | No TAC; RX/RM/MOC; disponibilità mer 14:30 / sab 09:00; RX a CalatafimiMed 2 (Viale Regione Siciliana 279); no dentale; RM aperte articolari (6 distretti); MOC solo lombare+femorale |
| 9 | FAQ code (paste chat) | 11/08/2026 | Sedi/orari Med 1–2–3; tel 091590150; convenzione solo lab; tempistiche referti; digiuno 6–8h; urinocoltura; prenotazione online specialistiche; disdetta dati richiesti |
| 10 | Limitazione del budget (paste chat) | 11/08/2026 | Restrizione budget analisi → domicilio: ok privato/ticket; esenzione non immediata (costo agevolato≈ticket) via operatore; no preventivi domicilio in esenzione |
| 11 | Check-up esami ematochimici (paste chat) | 11/08/2026 | Check-up UOMO 90€, DONNA 80€, Buona Salute 40€; MST 50€ (secondario); test gravidanza urina/sangue; prezzo pacchetto non somma voci |
| 12 | Preventivo ricette (paste chat) | 11/08/2026 | Regime esente/ticket/privato; quesito diagnostico tiroide/urinocoltura/HbA1c; codici regionali tipici; disclaimer preventivo; no ricette SSN su visite/diagnostica |
| 13 | Listino ticket Wgeslaan (paste chat) | 11/08/2026 | ~150 esami laboratorio con prezzo ticket SSN; prelievo venoso ticket 3,80 €; regola: no prelievo nel preventivo in esenzione |
| 14 | Richiesta info + visite urgenti (paste chat) | 11/08/2026 | Nessun fatto nuovo in KB (comportamento conversazionale → prompt). Gap: URL form/sito prenotazione ancora assente |
| 15 | Listino privato esami del sangue (paste PDF Sanit Futura 07/04/2026) | 11/08/2026 | ~1646 voci private + marker service /10–/90; prelievo 4€; prelievo domicilio 10€; sezioni Bios/Fleming/Genoma/Varelli/Sofar/Cito; 57 NON USARE |
| 16 | Spermiogramma (paste chat) | 11/08/2026 | Unica prenotazione lab; mar–gio 11:00; prep astinenza ≥5 gg; barattolo sterile; entro 30 min; prezzo in listino privato 50€ (SQA-Vision) |
| 17 | Prestazioni per branca (paste chat) | 11/08/2026 | Catalogo ufficiale per branca; vincoli prick/mappatura/doppler angiologo; fuori lista = non eseguita |
| 18 | Visite che facciamo (paste chat) | 11/08/2026 | Allowlist branche/servizi (incl. Cardiologia, Nutrizione, Holter, Polisonnografia, Osteopatia, Psicoterapia, Venerologia, Centro Menopausa, Obesità, …) |
| 19 | Holter (paste chat) | 11/08/2026 | Solo Holter cardiaco (no pressorio); Med 1 e Med 3 lun–gio; fasce Med1 11:30–12 / 16–18; Med3 10:00–10:30; 24h poi riconsegna |
| 20 | Check-up Donna (paste chat + blog) | 11/08/2026 | 80€; sedi Med 1 e Med 3; descrizione ambiti; URL https://calatafimimed.it/blog/check-up-donna |
| 21 | Check-up Uomo (paste chat + web) | 11/08/2026 | Prezzo **80€** (aggiorna Doc 11); descrizione ambiti + PSA; URL https://www.calatafimimed.it/check-up-uomo |
| 22 | Nutrizione (paste chat) | 11/08/2026 | Promo percorso attiva (non volunteer); pre-visita: MMG o check-up Uomo/Donna |
| 23 | Via Di Blasi / Med 3 specialistiche (paste chat) | 11/08/2026 | Branche prenotabili Med 3 + giorni; liste più brevi; stessi prezzi; anche a Corso Calatafimi; **Neurologia** riabilitata |
| 24 | Breath test lattosio + HP (paste chat) | 11/08/2026 | Lattosio 120€, 3h dalle 8:00; Med1 no prenotazione / Med3 sì; prep SCRUPOLOSAMENTE; HP 50€ entro 9:30 no prenotazione |
| 25 | Voglio prenotare un esame (paste chat) | 11/08/2026 | Schema 1 messaggio (conferma + note utili + giorno/orario/tel); note cardio/endocrino/eco addome; ecografie: 60€ generico, no elenco se non chiesto |
| 26 | Visita cardiologica (paste chat) | 11/08/2026 | Riconoscimento branca; pacchetti generici; sedi Med1+Med3; ECG sempre in prima visita; Holter lun–gio 11:30–12 / 16–18 (Med1) |
| 27 | Ortopedia (paste chat) | 11/08/2026 | Visita ortopedica: Med 2 Viale Regione Siciliana 279; mercoledì pomeriggio; template prenotazione cell+email |
| 28 | Visita oculistica (paste chat) | 11/08/2026 | Med 2; lun 15–20 / gio 15:30–20; adulti+pediatrica; include vista/fondo/tono; OCT disponibile a parte; durata 25–30 min |
| 29 | Sito web sedi (paste chat) | 11/08/2026 | Med1 manfredone.it; Med2 calatafimimed.it/home/; Med3 calatafimimed.it/home-calatafimimed3/ |

## Cosa è stato rimosso dalla KB unificata (va nel prompt / non in KB)

### Da Doc 1

- Istruzione operativa: “quando viene richiesto un costo… comunicalo sempre” → **sovrascritta da Doc 2/3** (costi solo se chiesti), con **eccezione Doc 5** per il blocco promo a fine conversazione

### Da Doc 2 (comportamento → prompt)

- Non fornire nomi medici nelle disponibilità salvo richiesta
- Risposte brevi; solo info richieste (**eccezione**: promozioni a fine conversazione, Doc 5)
- Non confermare appuntamenti; handoff operatore dopo anagrafica

### Da Doc 3 (comportamento → prompt)

- Prezzi **solo** se chiesti esplicitamente; mai fuori dai listini forniti
- Preventivo: costi singoli + totale
- Ticket / ricetta elettronica → operatore umano (messaggio tipo “Passami operatore”)
- Testo da usare per esami in service (lab esterno, tempi, solo pagamento, no SSN)
- Non garantire mai la gratuità degli esami
- Prelievo: non citare i 4,00 € salvo richiesta esplicita; dire sempre che al costo esami va aggiunto il prelievo
- Prestazione non esame del sangue + ricetta → non convenzionati SSN + costo privato da listino (se chiesto)

### Da Doc 4 (comportamento → prompt)

- Fornire i nomi dei medici **solo** quando il paziente li richiede; lista usata per richieste di medici specifici

### Da Doc 5 (comportamento → prompt)

- A fine di **ogni** conversazione/prenotazione comunicare **sempre** le promozioni attive del mese
- Inferire sesso dalla conversazione e proporre promo per genere; se incerto → tutte le promo
- Tono garbato, non invasivo, sintetico

### Da Doc 6 (comportamento → prompt)

- Testo tipo per invio IBAN + invito a mandare contabile
- Sempre avvisare: no pagamenti prima della data prelievo/accettazione; meglio attendere il desk per l’importo definitivo
- Spiegazione se chiedono perché non si può pagare prima (importo definitivo in accettazione)
- Tono cordiale, professionale, rassicurante
- Ambito: solo esami di laboratorio (sede o domicilio)

### Da Doc 7 (comportamento → prompt)

- Template raccolta dati per prenotazione prelievo a domicilio
- Multi-persona stesso domicilio: sì, possibile
- Costi domicilio (10/15 € e sconto dalla 3ª) solo se chiesti
- Emocoltura domicilio → operatore
- Richieste domicilio dopo le 18:00 → presa in carico senza garanzia + ricontatto operatore
- Prelievi in sede: orari + no prenotazione + digiuno
- Ticket: mai se non esplicitamente richiesto (allineato Doc 3)

### Da Doc 8 (comportamento → prompt)

- Flusso “esame radiologico” generico: conferma → chiedere tipo (RX / RM / densitometria, no TAC) → giorno/fascia + cellulare
- Flusso RX specifica parte del corpo: conferma + sede CalatafimiMed 2 + giorni + dati paziente
- Eccezione RX dentale / panoramica: risposta negativa + offerta RX altre parti
- Flusso RM: solo aperte articolari (6 distretti); chiedere sede anatomica se manca
- Flusso MOC: lombare+femorale; rifiuto gentile total body
- Template di wording cortesi (emoji opzionali nella fonte)

### Da Doc 9 (comportamento → prompt)

- “Come prenotare”: capire COSA + raccogliere anagrafica (nome, cognome, data e luogo nascita, tel); non confermare; ricontatto operatore
- Tempistiche referti: prima identificare gli esami
- Farmaci da sospendere: no consiglio medico autonomo
- Template risposte sedi/orari (generale e sabato mattina) — solo orari FAQ
- Disdetta/modifica: chiedere cognome/nome/prestazione; conferma solo da operatore
- Breath test: (storico Doc 9) prep ora in Doc 24 — seguire `# BREATH TEST` / KB

### Da Doc 10 (comportamento → prompt)

- Non accettare subito il prelievo domiciliare: prima accertare regime (ricette? esenzione vs ticket vs privato)
- Se esenzione: no domicilio immediato; possibile costo agevolato ≈ ticket; **mai** preventivo; handoff con frase “Passami operatore”
- Se privato/ticket: si può proseguire raccolta dati domicilio

### Da Doc 11 (comportamento → prompt)

- Offrire check-up **solo** se il paziente chiede pacchetti/check-up scontati
- Proporre sempre UOMO/DONNA in base al sesso (non Buona Salute come prima scelta, anche per i giovani)
- MST e secondari: solo su richiesta specifica
- Comunicare il prezzo del pacchetto, non il calcolo delle singole prestazioni

### Da Doc 20 (fatti → KB; comportamento → prompt)

- Check-up Donna: confermare 80€, sedi Med 1/3, URL blog se utile; descrivere ambiti inclusi da KB (non inventare esami extra)

### Da Doc 21 (fatti → KB; comportamento → prompt)

- Check-up Uomo: prezzo **80€** (non più 90€ Doc 11); URL pagina; descrivere ambiti (incl. PSA) da KB

### Da Doc 22 (comportamento → prompt)

- Nutrizione: non citare promo/dettagli/prezzi se non chiesti
- “Esami prima della visita/percorso?” → medico di base **oppure** check-up Uomo/Donna; situazioni particolari → MMG

### Da Doc 23 (comportamento → prompt)

- Proporre **Med 3** (Di Blasi 8) per le branche elencate: liste d’attesa più brevi; stessi prezzi; anche disponibili a Corso Calatafimi 390
- Citare giorni fissi da KB quando rilevanti; date variabili → operatore
- **Neurologia** si offre (sovrascrive esclusione Doc 18)

### Da Doc 24 (comportamento → prompt)

- Breath test lattosio: **chiedere sempre prima la sede** (Med 1 no prenotazione / Med 3 sì)
- Usare la parola **SCRUPOLOSAMENTE** sulla preparazione; se non rispettata → esame non eseguibile
- Chiudere con: «Se ha necessità di altre informazioni, siamo disponibili.»
- Non dare info alimentari superflue oltre al protocollo KB
- HP: 50€, entro 9:30, no prenotazione; prep da KB

### Da Doc 25 (comportamento → prompt)

- Prenotazione visita/esame **nominata**: **un solo messaggio** = conferma disponibilità + note utili (da KB) + chiedere giorno, orario e telefono; tono gentile con emoji leggere
- Dopo i dati: no conferma LucIA (invariato)
- Ecografie senza tipo: sempre **60,00 €** generico + chiedere specifica; prezzo diverso solo dopo; **non** elencare tutte le ecografie se non richiesto
- Override: Holter / radiologia / breath / spermiogramma / domicilio / **ortopedia** / **oculistica** / cardiologia → sezioni dedicate

### Da Doc 26 (comportamento → prompt)

- Riconoscere ECG / eco cuore / Holter / visita cardiologica come **Cardiologia**
- Domanda generica → elencare solo i **3 pacchetti** + sedi Med 1 e Di Blasi; poi continuare dopo la scelta
- Prima visita cardiologica **sempre con ECG**; se chiedono senza ECG → spiegare; ECG solo possibile ma consigliabile valutazione specialista
- Holter: lun–gio; Med 1 11:30–12 / 16–18 (Doc 26); Med 3 10:00–10:30 resta Doc 19
- Opening: «Certo, possiamo aiutarti con la prenotazione 😊»

### Da Doc 27 (comportamento → prompt)

- Visita ortopedica (info o prenotazione): template unico Med 2 + mercoledì pomeriggio + giorno/fascia + cell + email
- No conferma LucIA; prezzi solo se chiesti

### Da Doc 28 (comportamento → prompt)

- Visita oculistica (anche pediatrica): template Med 2 + lun/gio pomeriggio + giorno/fascia + cell + email
- Comunicare cosa include (vista, fondo, tonometria); durata 25–30 min; gocce dilatanti caso per caso
- OCT disponibile come esame a parte (listino)
- No conferma LucIA; prezzi solo se chiesti

### Da Doc 29 (comportamento → prompt)

- Condividere URL sede da KB (non inventare link)
- “Prenotare online” / rifiuto contatto → URL Med 1/2/3 + tel 091 590150 se utile

### Da Doc 12 (comportamento → prompt)

- Elenco esami senza richiesta prezzo → solo “li facciamo”, no costi
- Disclaimer obbligatorio su ogni preventivo (indicativo → conferma desk)
- Flusso esente / ticket / privato; mai garantire gratuità né “100% in esenzione”
- Per ogni esenzione: frase limitazioni budget + consigliabile operatore
- Scadenza ricetta: citarla solo se mancano &lt; 4 settimane
- Visite/diagnostica: solo costo privato con formula “senza liste d’attesa al costo di…”; non dire che non si accettano SSN
- Preventivo privato listino solo senza ricette; ticket solo lab ematochimici

### Da Doc 13 (comportamento → prompt)

- Prezzi ticket **solo** se chiesti e **solo** su ricette ticket, dal listino Wgeslaan in KB
- In esenzione: **omettere** il prelievo dal preventivo (senza doverlo spiegare)

### Da Doc 14 (comportamento → prompt)

- Info generiche senza topic → menu (esame/prenotazione, orari/sedi, SSN/assicurazioni, altro)
- Intent prenotazione / prima data / giorno specifico → chiedere nome + telefono per ricontatto
- Dopo ricezione contatto: ringraziare + callback operatore; **non** far confermare LucIA (adattato vs “ti do conferma”)
- Se rifiuta il contatto → proporre URL sede da KB (Doc 29) o telefono/operatore; non inventare link
- Dopo info, se vuole prenotare → confermare intent + anagrafica completa (nome, cognome, data/luogo nascita, telefono)
- Prenotazione esame specifico → possibile + info utili da KB + giorno/orario preferito
- Visita urgente → previa prenotazione senza liste d’attesa; chiedere per quando; ricontatto ASAP
- Domande libere → risposta mirata (KB per fatti centro) + CTA nome/numero

### Da Doc 15 (comportamento → prompt)

- Preventivi **privati** lab da listino dedicato; +prelievo 4€ (importo solo se chiesto)
- Preferire prezzo in-sede se esistono duplicati service; NON USARE / 0,00 dubbi → desk
- Marker `/N` → testo service (tempi, solo pagamento, no SSN)

### Da Doc 16 (comportamento → prompt)

- Flusso spermiogramma in un unico messaggio amichevole (emoji ok in questo flusso): conferma + prep + mar–gio 11:00 + giorno preferito + telefono + email
- Se chiede altro orario → solo 11:00
- Dopo contatti: callback operatore, no conferma LucIA
- Prezzo solo se chiesto (listino privato)

### Da Doc 17 (comportamento → prompt)

- Non dumpare tutte le prestazioni di una branca se non richieste
- Si possono dare i costi delle prestazioni di cui si parla (da listino)
- Fuori catalogo Doc 17 (nella branca) → non eseguita
- Prick solo con visita allergologica; mappatura nei solo con visita dermatologica
- Doppler con angiologo più costoso di radiologo/ecografista

### Da Doc 18 (comportamento → prompt)

- Se chiede una visita/esame in allowlist → conferma + risposta esaustiva (cos’è + prep)
- Prep CM solo da KB; se manca, prep generale tipica + conferma desk (no inventare prezzi/sedi/SSN)
- Limitarsi alle branche/servizi Doc 18
- Cardiologia / Nutrizione / Holter / Polisonnografia / ecc. **offerte** (risolve gap Doc 17)

### Da Doc 19 (comportamento → prompt)

- Holter = branca Cardiologia; template sedi Med 1/3 + giorno + cell + email
- Solo Holter **cardiaco**; negare Holter **pressorio**
- Fasce Med 1 vs Med 3; fuori fascia (es. 13:00 Med 1) → no, reindirizzare
- 24h di indosso + ritorno per disinstallazione
- Dopo dati: no conferma LucIA

## Conflitti / decisioni

| Tema | Fonti | Decisione |
| --- | --- | --- |
| Prezzo Check-up Uomo | Doc 11 (90€) vs Doc 21 (80€) | **Vince Doc 21**: 80,00 € |
| Promo nutrizione | Doc 22 + listino Doc 1 | Promo **attiva**; non volunteer; prezzo listino 140€ percorso finché non arriva dettaglio promo |
| Neurologia | Doc 18 no vs Doc 23 sì | **Vince Doc 23**: visita neurologica offerta |
| Orari Med 3 | Doc 9 solo mattina vs Doc 23 pomeriggi specialistici | Coesistono: mattina = lab/prelievi FAQ; pomeriggi = cliniche specialistiche Doc 23 |
| Allowlist branche | Doc 17 vs Doc 18/23 | Doc 18 base + Doc 23 (Neurologia + sedi Med 3) |
| Cardiologia / Nutrizione | Doc 17 omessi vs Doc 18 | **Vince Doc 18**: si eseguono |
| Holter | Doc 18 + Doc 19 + Doc 26 | Fatti operativi **Doc 19** (sedi/fasce/24h/no pressorio); Doc 26 rinforza Med1 11:30–12 / 16–18 |
| Geriatria | Doc 17 sì vs Doc 18/23 no | Non offrire come branca |
| Polisonnografia | Doc 17 vs Doc 18 | **Si esegue** (Doc 18) |
| Info ChatGPT/Google | Doc 18 vs no-invent CM | OK info generale; regole CM solo KB |
| Catalogo vs listino prezzi | Doc 1 vs 17/18 | Prezzi da Doc 1; offerta da 18/23 (+17 dettaglio) |
| Prenotazione / conferma / lab | | Invariati (Doc 25 = schema messaggio; conferma solo operatore) |
| Breath test prezzi | Listino Doc 15 vs Doc 24 | **Vince Doc 24**: lattosio 120€, HP 50€ |
| Prep breath | Gap FAQ vs Doc 24 | **Chiuso** da Doc 24 |
| Ecografie prezzo generico | Doc 1 listino + Doc 25 | Domanda generica → **60€** + chiedere tipo; elenco completo solo se richiesto |
| Cardiologia generica | Doc 26 | Menu 3 opzioni (visita+ECG / +eco / Holter); ECG obbligatorio in prima visita |
| Ortopedia sede | Doc 27 | Visita ortopedica → **solo Med 2**, mercoledì pomeriggio |
| Oculistica sede/fasce | Doc 28 | Med 2; lun 15:00–20:00; gio 15:30–20:00; OCT offerto (listino) |
| URL siti sedi | Doc 29 | Gap URL chiuso: Med1 manfredone.it; Med2/3 calatafimimed.it (path dedicati) |

## Gap fattuali ancora assenti

- Dettaglio **prezzo promo** nutrizione se diverso dal listino 140€
- Sedi esplicite Check-up Uomo (Donna: Med 1/3; Uomo non citato in Doc 21)
- Dettaglio prestazioni / prezzi per branche Doc 18 senza Doc 17 (Centro Menopausa, Osteopatia, Psicoterapia, Venerologia, Obesità, Chirurgia ortopedica)
- Prep CM dedicate per Polisonnografia, EMG, ecc. (**Holter**, **Breath test**, sedi web Doc 29 chiusi)
- **Promozioni mese corrente (agosto)** oltre nutrizione (Doc 5 ancora maggio)
- Importo numerico costo agevolato domicilio in esenzione
- Contatti email generali (oltre pagamenti@)
- Anno chiusura 10–15 agosto
- Giorni/orari presenza medici
- Zone domicilio oltre Palermo e Monreale
- Orari fine fascia radiologia
- Chiarire conflitti orari prelievi sabato Doc 7 vs Doc 9
- Completare/validare OCR Doc 15
- Completare codici regionali Doc 13
- Sede precisa consegna spermiogramma
- Certificati/rinnovi e Proctologia: in listino Doc 1 ma non in Doc 18 — conferma se ancora offerti |

## Prompt / suite

- [`../clients-prompt/34768-calatafimi-med-prompt.md`](../clients-prompt/34768-calatafimi-med-prompt.md)
- [`../clients-prompt/34768-calatafimi-med-test-suite.md`](../clients-prompt/34768-calatafimi-med-test-suite.md)
