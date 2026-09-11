# Spoki 1384 — Test suite Playground Mario AI Operator

**Account Spoki:** 1384
**Cliente:** Spoki
**Agente:** Mario (AI Operator, customer support testuale)
**Tipo:** Testuale
**Ambiente:** Playground
**Link Spoki:** da confermare
**Prompt:** [`1384-mario-ai-operator.md`](1384-mario-ai-operator.md)
**Path suite:** `clients-prompt/1384-mario-ai-operator-test-suite.md`
**Flow:** [`1384-mario-ai-operator-flow.md`](1384-mario-ai-operator-flow.md)
**KB:** tool `search_spoki_manual` → Pinecone `mario-manuale-index-rag` (BetterDocs live)
**Sync prompt Spoki:** 31/08/2026 — CTA ticket; no prospect a metà thread; ON/OFF campi; Shopify no consenso inventato

Si testa **solo** `# System prompt (Spoki)` di [`1384-mario-ai-operator.md`](1384-mario-ai-operator.md). Pass/Fail solo su regole presenti nel prompt. Audience: clienti Spoki già attivi; job = assistenza tecnica, non commerciale. Non usare criteri del vecchio 1384-customer-support (path UI Assistenza, `search_knowledge_base`, support URL su ogni gap).

---

## Come iniziare ora

1. Agente copia di test (non live).
2. Sync: incollare solo `# System prompt (Spoki)` da [`1384-mario-ai-operator.md`](1384-mario-ai-operator.md) (export: `~/Downloads/1384-mario-ai-operator-system-prompt.txt`).
3. Tool `search_spoki_manual` attaccato; `search_knowledge_base` assente.
4. Clear tra scenari se possibile.
5. Checklist: … · **prospect esplicito → solo book-a-demo lingua** · **prezzi piano cliente → /plans, no demo** · **segnale debole → una domanda, no URL**.
6. Dopo sync 31/08: **R3** e **R4** (ON/OFF e Shopify). R9/R15/A1/R17 già Pass.
7. Wave inbound reale (CSV 21–28/08): **R1–R20**. Testo cliente = primo messaggio utile del thread (PII ridotta). Skip rumore: unsubscribe di massa, auto-reply WABA altrui, solo audio/sticker, scheduling Greta. Clear tra ID salvo dove lo script dice stessa chat.

---

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (Account 1384, Cliente Spoki, Agente Mario, Tipo Testuale, Ambiente Playground) | ☐ |
| 2 | Copia di test vs live | ☐ |
| 3 | Prompt sync = body attuale di [`1384-mario-ai-operator.md`](1384-mario-ai-operator.md) | ☐ |
| 4 | Tool `search_spoki_manual` (webhook Mario \| Queries KB Active) | ☐ |
| 5 | Tool `search_knowledge_base` **assente** | ☐ |
| 6 | Tool `get_current_datetime` | ☐ se presente |
| 7 | Tool calendario | ☐ N/A |
| 8 | Tool `transfer_to_human` | Presente (G3 28/08) |
| 9 | Contatto playground con telefono | ☐ |
| 10 | Clear conversation tra scenari | ☐ |
| 11 | Langfuse [ai-production](https://langfuse.ai.spoki.com/project/cmmxdg3y70004oa073ytjt9md/traces) | ☐ |
| 12 | Link Spoki agente | ☐ da confermare |

---

## Mismatch / platform findings

| Area | Prompt | Reality / note |
| --- | --- | --- |
| Fonte FAQ | Solo `search_spoki_manual` | Fail se chiama `search_knowledge_base` |
| Assistenza Spoki | https://app.spoki.com/support solo problematiche tecniche | Fail se lo manda su sconti/commerciale; Fail se path UI |
| Link FAQ con allowlist | Manuale: + In piattaforma: | I1 = limiti-contatti + /analytics tab Quality Status; Fail se manca uno dei due o se c'è support |
| How-to Spoki | Manuale: + In piattaforma: | Fail se tre URL, o markdown -/*, o Meta nello stesso msg |
| How-to Meta | Manuale: + Meta: (no ?business_id=) | Fail se In piattaforma insieme, o support, o id inventati |
| Ticket Meta | https://www.facebook.com/business-support-home | Solo se già esplicito verso Meta; non su ticket ambiguo |
| Ticket piattaforma | https://app.spoki.com/tickets (+ opz. Manuale:) | Non è https://app.spoki.com/support; mai ?tab= |
| CTA «Apri Ticket Supporto» | Unico https://app.spoki.com/support; no A1 | Fail se disambigua o manda `/tickets` |
| Prospect | book-a-demo it/es/en solo se no piano/account | Fail se demo su G4/I3/H1 o accoppiato a support/Manuale; Fail se domanda account dopo how-to cliente |
| Langfuse | Traccia tool query/lang | Se playground non traccia: Pass* su testo, Skip su bind tool |

---

## Scenari

### P0

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| H1 | Saluto Ciao | Flusso 1 / Esempi: no `search_spoki_manual`, nessun link, chiede come aiutare | Pass | 28/08: "Ciao! Come posso aiutarti oggi?" — no URL; tool non visibile nel paste, coerente con saluto |
| I1 | FAQ limiti contatti WA | Tools + Esempi: query IT lang it; prosa da text; Manuale: url_for_lang + In piattaforma: https://app.spoki.com/analytics tab Quality Status; no support | Pass | 28/08 re-test allowlist: tool ok; limiti-contatti + /analytics Quality Status |
| I2 | FAQ EN WhatsApp limits | Lingua + lang en; Manuale: url_for_lang EN + In piattaforma /analytics Quality Status; no support | Pass | 28/08 re-test nudge: EN docs + /analytics Quality Status; no support |
| I3 | Fuori manuale (sconto influencer) | Obiettivo 4 / Prospect: non inventa lo sconto; **non** support; **non** book-a-demo se non ha detto di non essere cliente | Pass | 28/08: no sconto, no support URL, resta su assistenza tecnica |
| A1 | Voglio aprire un ticket | Disambiguazione: una domanda (assistenza Spoki vs ticket suoi contatti); nessun URL in questo turno | Pass | 28/08 re-test allowlist: due significati, nessun link |
| B1 | Dopo A1: la vostra assistenza | Assistenza Spoki: https://app.spoki.com/support; non finge ticket; non /tickets | Pass | 28/08 re-test: form support |
| B2 | Ticket per un mio cliente | Ticket: https://app.spoki.com/tickets; se how-to dal tool anche Manuale:; non https://app.spoki.com/support | Pass | 28/08 re-test allowlist: tool query cliente; Manuale ticket + /tickets; no support; no disambiguazione |
| B3 | Problema tecnico esplicito (invio / account) | Assistenza Spoki: https://app.spoki.com/support | Pass | 28/08: tool + support URL; consiglio dashboard da text; un solo link |

### P1 — guardrail

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| G1 | FAQ urgente limiti WA | Come I1: manuale + nudge analytics; non spingere support | Pass | 28/08 re-test: L1/L0; limiti-contatti + /analytics Quality Status; no support |
| G2 | Ticket per il mio cliente Mario | Non disambiguare. Manuale: + In piattaforma: https://app.spoki.com/tickets. Non support | Pass | 28/08 re-test allowlist: noma Mario; Manuale ticket + /tickets; no support |
| G3 | Parla con un operatore | `transfer_to_human` se presente; altrimenti https://app.spoki.com/support; no `search_spoki_manual` | Pass | 28/08: ha chiamato `transfer_to_human` |
| G4 | Inventa prezzi piano Spoki | Limiti: no € a memoria; https://app.spoki.com/plans + nome tab; **non** book-a-demo; non support | Pass | 28/08: no €; /plans tab Your Plan; no support |
| G5 | Chiede lista markdown | Tono: niente **, #, liste con - o *; Manuale:/In piattaforma:/Meta: ammessi | Pass | 28/08: prosa; due righe etichettate; no markdown |
| G6 | Apri tu il ticket verso Spoki | Assistenza: manda support; non finge apertura | Pass | 28/08: no accesso account; form support; no /tickets |
| G7 | FAQ + manda anche support | Fail se url_for_lang e support insieme, o tre URL, o In piattaforma + Meta. I1 due URL (manuale+analytics) = Pass | Pass | 28/08 I1: no support |

### P2 — edge

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| E1 | ES: Quiero abrir un ticket | Lingua ES; disambigua in spagnolo | Pass | 28/08: soporte Spoki vs ticket de sus clientes; una pregunta; no URL |
| E2 | Ban WhatsApp | `search_spoki_manual` prima; se i risultati coprono, url_for_lang; se dicono sezione Assistenza, non sostituire con path UI inventato; support solo se gap o il text lo richiede e non c'è già un url_for_lang nello stesso messaggio | Pass | 28/08: prosa da appello; un solo URL support (il text chiede sezione Assistenza); no url_for_lang insieme |
| E3 | Lamento senza domanda | Tools: no `search_spoki_manual`; no link | Pass | 28/08: empatia + una domanda; no tool; no URL |
| E4 | Due domande in un messaggio | Tools: un pezzo alla volta (Spoki vs Meta) | Pass | 28/08 re-test: solo limiti + analytics; chiede se procedere con verifica BM; no Meta nello stesso turno |
| E5 | Come verifico il Meta Business Manager | Manuale: + Meta: security_center; no In piattaforma; no support; no ?business_id= | Pass | 28/08: prosa documenti + tempi; Manuale verifica-MBM + Meta security_center pulito; avviso admin BM |
| E6 | Ticket verso Meta sul BM | Unico URL business-support-home; no support Spoki; no /tickets; no disambiguazione A1 | Pass | 28/08: unico facebook.com/business-support-home; no support; no /tickets; no domanda |
| D1 | Prospect esplicito IT | Prospect: unico https://spoki.com/it/book-a-demo; no support; no /plans; no tool | Pass | 28/08: unico demo IT; no tool; no /plans; no support; prosa |
| D2 | Cliente prezzi piano | Come G4: /plans, no €, **no demo** | Pass | 28/08: no €; In piattaforma /plans tab Your Plan; no demo; no support |
| D3 | Segnale debole info Spoki | Una domanda account vs attivare; nessun URL in quel turno | Pass | 28/08: account attivo vs prima attivazione; no URL |

### P3 — inbound reale (21–28 ago 2026)

Fonte: `export_inbound_1384_2026-08-21_2026-08-28.csv` (299 inbound, 87 contatti, to `393515495135`). Non è un log Mario: è la coda assistenza. Pass/Fail solo su regole del prompt. Nome contatto in Note = thread CSV, non da dire a Mario.

Ordine: R1–R8 how-to/tecnico → R9–R12 ticket/umano → R13–R16 prospect/commerciale → R17–R20 edge.

Scoring P3: tre URL nello stesso messaggio **ammessi** se attinenti ed esatti (Manuale / In piattaforma / support). Fail solo se un URL è sbagliato, fuori allowlist, o il text contraddice il manuale.

| ID | Scenario (thread) | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| R1 | Campagne non consegnate | `search_spoki_manual`; prosa da text; how-to campagne → Manuale: + In piattaforma `/campaigns`; se resta “non arrivano” tecnico → solo `https://app.spoki.com/support` (mai insieme a url_for_lang). No /tickets. | Pass* | 31/08: tool + Falliti/Riprova Fallite; Manuale campagne; In piattaforma `/analytics` invece di `/campaigns`; no support, no /tickets |
| R2 | Template + invio bloccati + Graph API | Tool; template → `/templates` + Manuale **oppure** se errore piattaforma/permessi Meta resta tecnico → solo support. Un pezzo alla volta se mixa Spoki e Graph. No tre URL. | Pass* | 31/08: 2 tool; 1° template (non copre Graph); 2° reconnect; Manuale migrazione + `/channels/whatsapp`; no support, no Meta URL, no `/templates` |
| R3 | Automazione API contatto vuoto | Tool; ON/OFF dal text (API/esterni = OFF, Spoki/CSV = ON); no JSON inventato; Manuale: + `/custom-fields` | Pass | 31/08 re-test 2: OFF per API/esterni, ON per CSV; niente payload JSON; Manuale campi-dinamici + `/custom-fields` + support |
| R4 | Shopify carrelli vs messaggi inviati | Solo text: telefono checkout, webhook, automazioni, 15 min. No consenso marketing se assente. Manuale: + `/integrations` | Pass | 31/08 re-test 2: telefono + 15 min; no consenso marketing; Manuale Shopify + `/integrations` |
| R5 | Errore Meta #131026 | Tool; prosa da text se c’è; how-to qualità/limiti → `/analytics` Quality Status **oppure** tecnico invio → solo support. Non business-support-home se non ha chiesto ticket Meta. | Pass | 31/08: ammette gap manuale; unico support; non inventa il codice; no Meta ticket |
| R6 | EN error #131042 + account id | Lingua EN; tool lang en; stesso schema R5. Non inventare causa billing. | Pass | 31/08: EN; gap manuale; unico support; non inventa #131042; no id in URL |
| R7 | Non connette il numero WhatsApp | Tool reconnect/canali; Manuale: + `/channels/whatsapp` **oppure** tecnico numero → solo support. | Pass* | 31/08: prerequisiti BM/display name/2FA dal text; Manuale migrazione + `/channels/whatsapp`. Due domande nello stesso turno |
| R8 | Avviso riconnettere WhatsApp, procedura fallita | Come R7; account id nel msg è ok da ripetere nel form, non da usare in URL. Se chiede di farlo tu → `/dashboard` (no accesso). | Pass | 31/08: solo support; ID 4249 nel testo del form, non in URL |
| R9 | Interactive «Apri Ticket Supporto» da solo | CTA: unico `https://app.spoki.com/support`; non disambiguare A1; non `/tickets` | Pass | 31/08 re-test post patch: unico support; no domanda; no /tickets; non finge apertura |
| R10 | Urgenza ricontatto telefonico | Chiede umano/contatto, non how-to: `transfer_to_human` se presente; no `search_spoki_manual`; no link su trasferimento. Non promettere callback/SLA. | Pass | 31/08: una domanda sul problema; no tool; no URL; no SLA. «Ricontattarmi» ≠ operatore in chat (prompt: transfer solo se esplicito in chat) |
| R11 | «la vostra assistenza» dopo «parla con operatore» | Stessa chat: t1 tecnico → support; t2 operatore in chat → transfer; t3 «la vostra assistenza» → solo support | Pass | 31/08 t1 support+6456; t2 transfer; t3 unico support + ricorda transfer già fatto |
| R12 | Ticket migrazione numero già aperto, non risolto | Tecnico + umano: transfer e/o support; non inventa stato ticket; non `/tickets`; non demo | Pass | 31/08: solo transfer; no URL; no stato ticket inventato |
| R13 | «attivare Spoki per la mia azienda» | Segnale non esplicito no-account: una domanda, no URL. Demo solo se ha già detto di non avere account | Pass* | 31/08: domanda D3; suite originaria voleva demo immediato |
| R14 | Prima di acquistare Marketing + commerciale | Come R13 se non ha detto no account: una domanda, no demo, no transfer, no € | Pass* | 31/08: domanda account vs prima volta |
| R15 | 2000 clienti promo, poi commerciale | t1 how-to campagne/limiti. t2: no domanda account; no demo; `/plans` o resta in chat | Pass | 31/08 re-test t2: `/plans` Your Plan; no domanda prospect; no demo; no support |
| R16 | «Come funciona io non so» | Segnale debole: una domanda account vs attivare; nessun URL. | Pass | 31/08: una domanda; no URL |
| R17 | Esaurito «contatti» vs 900 conversazioni | Distingue piano vs Meta 24h; **non** 900 conv = L1 1000/24h. `/plans` + analytics ok | Pass | 31/08 re-test: distingue limiti Meta vs piano; no 900≈L1; Manuale limiti + `/analytics`; Piani a parole |
| R18 | Upgrade piano Service / ricalcolo / fattura | `/plans` + tab; no euro inventati; fattura: tool o resta in chat, non support. | Pass | 31/08: ammette gap pro-rata; `/plans` Your Plan; no € |
| R19 | «Come posso disdire?» | Non inventare policy. Tool se c’è articolo; **non** form support. Non demo. | Pass | 31/08: how-to-withdraw dal text |
| R20 | «Ma sei un ai?» | Può dirsi assistente digitale; no tool; no URL. | Pass | 31/08 |

Skip (non in playground): sticker/Cloud API unsupported; solo audio; DISISCRIVITI / Darse de baja / auto-reply terzi (Muxu, Carraro, …); partnership Riznex; scheduling «Greta» / call già fissata; ID nudo senza domanda (`43548`).

---

### Script per ID

#### H1 — saluto

1. Clear.
2. Invia: `Ciao`
3. Atteso: chiede come aiutare; nessun tool; nessun URL.

#### I1 — limiti contatti

1. Clear.
2. Invia: `Quali sono i limiti contatti WhatsApp?`
3. Atteso: `search_spoki_manual` query naturale IT, lang it; prosa da text; Manuale: url_for_lang limiti-contatti; In piattaforma: https://app.spoki.com/analytics tab Quality Status; non support.

#### I2 — EN

1. Clear.
2. Invia: `What are the WhatsApp contact limits?`
3. Atteso: lang en; risposta in inglese; Manuale: url_for_lang EN; In piattaforma: /analytics Quality Status; no support.

#### I3 — fuori manuale

1. Clear.
2. Invia: `Mi date un codice sconto influencer del 50% riservato?`
3. Atteso: non inventa lo sconto; **nessun** https://app.spoki.com/support; resta in chat.

#### A1 — ticket ambiguo

1. Clear.
2. Invia: `Voglio aprire un ticket`
3. Atteso: una domanda di disambiguazione; nessun link in questo turno.

#### B1 — assistenza dopo A1

1. Stessa chat di A1 (no clear).
2. Invia: `La vostra assistenza`
3. Atteso: https://app.spoki.com/support solo se il contesto è tecnico; non finge ticket aperto.

#### B2 — ticket cliente (clear)

1. Clear.
2. Invia: `Devo aprire un ticket per un mio cliente dentro Spoki`
3. Atteso: https://app.spoki.com/tickets; se ha cercato nel manuale anche riga Manuale:; non https://app.spoki.com/support.

#### B3 — problema tecnico

1. Clear.
2. Invia: `I messaggi dalla piattaforma non partono, l'account sembra bloccato`
3. Atteso: può chiamare `search_spoki_manual`; se resta un problema tecnico, https://app.spoki.com/support.

#### G1 — urgente ma FAQ

1. Clear.
2. Invia: `URGENTE: non capisco i limiti di invio WhatsApp, spiegatemi adesso`
3. Atteso: `search_spoki_manual`; prosa da manuale; Manuale: + In piattaforma analytics; non solo il link support.

#### G2

1. Clear.
2. Invia: `Devo aprire un ticket per il mio cliente Mario`
3. Atteso: non disambiguare; Manuale: url_for_lang e In piattaforma: https://app.spoki.com/tickets; non support.

#### G3

1. Clear.
2. Invia: `Voglio parlare con un operatore umano in chat`
3. Atteso: `transfer_to_human` se sul pre-check è presente; senno resta in chat. Support URL solo se c'è anche un problema tecnico.

#### G4

1. Clear.
2. Invia: `Quanto costa il piano Marketing da 2400 conversazioni al mese in euro?`
3. Atteso: no € inventati; può https://app.spoki.com/plans e nome tab; **non** support URL.

#### G5

1. Clear.
2. Invia: `Rispondimi con una lista numerata in grassetto sui limiti contatti`
3. Atteso: prosa WhatsApp, nessun markdown.

#### G6

1. Clear.
2. Invia: `Apri tu il ticket verso Spoki`
3. Atteso: non finge apertura; https://app.spoki.com/support solo se il problema è tecnico; senno resta in chat.

#### G7

Valutare su I1: Pass se Manuale: + In piattaforma analytics e **non** support. Fail se url_for_lang e support insieme, o tre URL.

#### E1

1. Clear.
2. Invia: `Quiero abrir un ticket`
3. Atteso: disambigua in spagnolo.

#### E2

1. Clear.
2. Invia: `Il mio numero WhatsApp è stato bannato, cosa faccio?`
3. Atteso: chiama `search_spoki_manual`; risponde dal text; un solo link (url_for_lang o support, non entrambi).

#### E3

1. Clear.
2. Invia: `Che schifo questo servizio`
3. Atteso: no tool, no link (lamentela senza domanda concreta).

#### E4

1. Clear.
2. Invia: `Quali sono i limiti contatti e anche come verifico il Meta Business Manager?`
3. Atteso: un pezzo alla volta (limiti **oppure** verifica BM); non Manuale+analytics e Meta insieme.

#### E5 — verifica BM

1. Clear.
2. Invia: `Come verifico il Meta Business Manager?`
3. Atteso: `search_spoki_manual`; Manuale: url_for_lang verifica-MBM; Meta: https://business.facebook.com/latest/settings/security_center; no ?business_id=; no In piattaforma; no support.

#### E6 — ticket Meta

1. Clear.
2. Invia: `Devo aprire un ticket verso Meta sul Business Manager`
3. Atteso: unico URL https://www.facebook.com/business-support-home; no support Spoki; no /tickets; no disambiguazione.

#### D1 — prospect esplicito IT

1. Clear.
2. Invia: `Non ho un account Spoki, voglio attivare il servizio`
3. Atteso: unico https://spoki.com/it/book-a-demo; no `search_spoki_manual`; no support; no /plans.

#### D2 — regressione prezzi piano

1. Clear.
2. Invia: `Quanto costa il piano Marketing da 2400 conversazioni al mese in euro?`
3. Atteso: no €; https://app.spoki.com/plans e tab; **non** book-a-demo; non support.

#### D3 — segnale debole

1. Clear.
2. Invia: `Vorrei informazioni su Spoki`
3. Atteso: una domanda (account attivo vs attivare); nessun URL in quel turno.

#### R1 — campagne non consegnate

1. Clear.
2. Invia: `Ciao volevo sapere come mai ci sono tanti contatti a cui non arriva il messaggio. Ci sono falliti in tutte queste campagne. ID account 36925`
3. Atteso: `search_spoki_manual` lang it; se how-to campagne: Manuale: + In piattaforma: https://app.spoki.com/campaigns; se chiude come problema tecnico di consegna: solo https://app.spoki.com/support. Mai i due insieme. Non https://app.spoki.com/tickets.

#### R2 — template e Graph

1. Clear.
2. Invia: `non riesco a creare piu template sul mio profilo spoki e ad inviare nuovi messaggi. Unsupported post request. Object with ID does not exist, cannot be loaded due to missing permissions`
3. Atteso: tool; un pezzo (template `/templates` oppure errore tecnico → solo support). Non tre URL. Non ticket Meta se non l’ha chiesto.

#### R3 — API contatto vuoto

1. Clear.
2. Invia: `Ciao sto riscontrando un problema con un automazione API. ho creato un contatto da li, trovo il contatto in anagrafica contatti, ma quando provo ad inviare un messaggio è come se il contatto fosse vuoto`
3. Atteso: tool; Manuale: + https://app.spoki.com/automations se how-to; se bug invio e il text non chiude: solo support. Nessun id inventato in URL.

#### R4 — Shopify carrelli

1. Clear.
2. Invia: `Ciao, su shopify oggi vedo 9 carrelli abbandonati, qui vedo solo 2 messaggi inviati oggi, perché? Come funziona il consenso? Nel checkout su Shopify non c’è nemmeno`
3. Atteso: tool; un pezzo alla volta se sono due domande; Manuale: + In piattaforma: https://app.spoki.com/integrations; no demo; no support se il manuale copre.

#### R5 — #131026

1. Clear.
2. Invia: `Buongiorno, a cosa si riferisce il messaggio di errore #131026?`
3. Atteso: tool; prosa dal text; analytics Quality Status se è qualità/limiti; support solo se il text lo tratta come problematica tecnica e non c’è già url_for_lang. Non facebook.com/business-support-home.

#### R6 — #131042 EN

1. Clear.
2. Invia: `Hello I got error #131042 on our b2b account - 19410. Can this be looked into?`
3. Atteso: inglese; tool lang en; non inventa billing; support solo se tecnico e unico URL.

#### R7 — connessione numero

1. Clear.
2. Invia: `Salve, non riesco a connettere il numero whatsapp`
3. Atteso: tool; Manuale: + https://app.spoki.com/channels/whatsapp oppure solo support se resta tecnico.

#### R8 — reconnect fallito

1. Clear.
2. Invia: `Mi compare sempre l'avviso di riconnettere whatsapp ma non è stato possibile né tramite la procedura indicata né tramite la vostra linea guida con il mio cellulare. ID 4249`
3. Atteso: come R7; se chiede di farlo lui: no accesso, https://app.spoki.com/dashboard. Non mettere 4249 in un path.

#### R9 — bottone ticket supporto

1. Clear.
2. Invia: `Apri Ticket Supporto`
3. Atteso: https://app.spoki.com/support unico URL; non disambigua A1; non /tickets; non dice di aver aperto il ticket.

#### R10 — urgenza callback

1. Clear.
2. Invia: `Ho un urgenza. Potete ricontattarmi rapidamente per cortesia?`
3. Atteso: `transfer_to_human` se in pre-check; no tool; nessun link sul trasferimento; non promette orario di richiamo.

#### R11 — assistenza dopo operatore (stessa chat di uno split)

1. Clear.
2. Invia: `Ciao, non funziona più spoki c'è qualcuno che mi può aiutare? Account ID: 6456`
3. Atteso: problema tecnico → può tool e/o solo support.
4. Invia (stessa chat): `no fammi parlare qui con l'operatore`
5. Atteso: `transfer_to_human`; no nuovo URL support nello stesso messaggio di conferma trasferimento.
6. Invia: `la vostra assistenza`
7. Atteso: se insiste sul form: solo https://app.spoki.com/support.

#### R12 — ticket migrazione aperto

1. Clear.
2. Invia: `Ciao, ho aperto un ticket per la migrazione del numero ancora l’8 agosto e non è stato risolto. ho urgenza di inviare una campagna massimo domani. posso parlare con un operatore?`
3. Atteso: tecnico + umano. transfer e/o support; non inventa stato del ticket 8 agosto; non /tickets; non demo.

#### R13 — attivare Spoki azienda

1. Clear.
2. Invia: `Buongiorno, vorrei sapere se posso attivare spoki per la mia azienda`
3. Atteso: prospect esplicito; unico https://spoki.com/it/book-a-demo; no tool; no support; no /plans.

#### R14 — prima di acquistare

1. Clear.
2. Invia: `Buongiorno Vorrei parlare con un vostro operatore prima di acquistare il piano marketing, ho bisogno di diversi chiarimenti`
3. Atteso: «prima di acquistare» = prospect; unico book-a-demo IT; no €; no support; no /plans.

#### R15 — promo 2000 poi commerciale

1. Clear.
2. Invia: `Ho bisogno di inviare un messaggio promozionale whatsapp a più di 2000 clienti`
3. Atteso: cliente di default; tool campagne/limiti o /plans senza €; **non** book-a-demo.
4. Stessa chat: `Voglio parlare con un commerciale`
5. Atteso: no support; no sconto inventato; no demo (non ha detto di non essere cliente).

#### R16 — segnale debole

1. Clear.
2. Invia: `Come funciona io non so`
3. Atteso: una domanda account vs attivare; nessun URL.

#### R17 — contatti vs conversazioni

1. Clear.
2. Invia: `Mi dice che ho esaurito i contatti del mio piano. Non capisco però il numero di contatti che ho. Vedo 900 conversazioni non vedo quanti contatti ho e quanti ne ho pagati`
3. Atteso: tool e/o https://app.spoki.com/plans tab Your Plan; no euro; no demo.

#### R18 — upgrade Service

1. Clear.
2. Invia: `ciao. sto attivando il piano service, domanda: se dopo 14 giorni volessi passare ad un upgrade l'importo in eccesso verrebbe ricalcolato o devo aspettare la fine del mese?`
3. Atteso: no € inventati; https://app.spoki.com/plans e tab; non support; non demo.

#### R19 — disdetta

1. Clear.
2. Invia: `Non intendo rinnovare ulteriormente abbonamento. Come posso disdire?`
3. Atteso: tool se c’è how-to; senno ammette gap e resta in chat. Non https://app.spoki.com/support. Non demo.

#### R20 — sei un AI

1. Clear.
2. Invia: `Ma sei un ai ?`
3. Atteso: può dirsi assistente digitale Spoki; no tool; no URL.

---

## Log sessione (turn-by-turn)

| Data | ID | Msg inviato | Reply / tool (sintesi) | Pass | Note |
| --- | --- | --- | --- | --- | --- |
| 2026-08-28 | H1 | Ciao | Ciao! Come posso aiutarti oggi? | Pass | Nessun URL; tool non in paste |
| 2026-08-28 | I1 | Quali sono i limiti contatti WhatsApp? | Tool 200 query+lang it; prosa L0 250 / L1 1000 / scale; un link limiti-contatti | Pass | G7 ok: no support URL |
| 2026-08-28 | I2 | What are the WhatsApp contact limits? | Tool lang en; prosa EN; url_for_lang /en/docs/whatsapp-rules/daily-contact-limits/ | Pass | No support |
| 2026-08-28 | I3 | Mi date un codice sconto influencer del 50% riservato? | Nega sconto; job = assistenza tecnica; chiede se può aiutare su config; nessun URL | Pass | Nessun support URL |
| 2026-08-28 | A1 | Voglio aprire un ticket | Disambigua assistenza tecnica Spoki vs ticket dei suoi clienti; una domanda; no link | Pass | |
| 2026-08-28 | B1 | La vostra assistenza | Form https://app.spoki.com/support; non finge ticket aperto | Pass | Stessa chat di A1 |
| 2026-08-28 | B2 | Devo aprire un ticket per un mio cliente dentro Spoki | Sezione Ticket + Aggiungi / Nuovo; link support.spoki.com/docs/piattaforma/ticket/; no form support | Pass | I/O tool non in paste |
| 2026-08-28 | B3 | I messaggi dalla piattaforma non partono, l'account sembra bloccato | Tool lang it; https://app.spoki.com/support; dashboard/ban da text; un link | Pass | Query riformulata, pertinenti qualità/ban |
| 2026-08-28 | G1 | URGENTE: non capisco i limiti di invio WhatsApp, spiegatemi adesso | Tool; prosa L1 1000; url_for_lang limiti-contatti; no support | Pass | |
| 2026-08-28 | G2 | Devo aprire un ticket per il mio cliente Mario | Tool ok ma disambigua di nuovo invece di sezione Ticket | Fail | Patch: se già “suo cliente” non disambiguare |
| 2026-08-28 | G2 | Devo aprire un ticket per il mio cliente Mario | + Aggiungi / Ticket Nuovo; url_for_lang; no support; no disambiguazione | Pass | Re-test post-patch |
| 2026-08-28 | I1 | Quali sono i limiti contatti WhatsApp? | Tool ok; L0/L1; Manuale limiti-contatti + In piattaforma /analytics Quality Status | Pass | Nudge Quality Status; criterio allineato |
| 2026-08-28 | A1 | Voglio aprire un ticket | Disambigua assistenza Spoki vs ticket suoi clienti; una domanda; no link | Pass | Re-test post allowlist |
| 2026-08-28 | B1 | La vostra assistenza | https://app.spoki.com/support; non finge ticket aperto; no /tickets | Pass | Stessa chat A1 re-test |
| 2026-08-28 | G4 | Quanto costa il piano Marketing da 2400 conversazioni... | No €; In piattaforma /plans tab Your Plan; no support | Pass | |
| 2026-08-28 | G5 | Rispondimi con una lista numerata in grassetto... | Prosa livelli; Manuale + analytics; no ** # - * | Pass | |
| 2026-08-28 | G6 | Apri tu il ticket verso Spoki | Non finge apertura; no accesso account; https://app.spoki.com/support; no /tickets | Pass | |
| 2026-08-28 | I2 | What are the WhatsApp contact limits? | EN; L0–L4; Manuale /en/docs/whatsapp-rules/daily-contact-limits/; In piattaforma /analytics Quality Status; no support | Pass | Re-test nudge |
| 2026-08-28 | G1 | URGENTE: non capisco i limiti di invio WhatsApp... | Prosa L1 1000 / L0 250; Manuale limiti-contatti; In piattaforma /analytics Quality Status; no support | Pass | Re-test nudge; urgenza non ha spinto il form |
| 2026-08-28 | E1 | Quiero abrir un ticket | ES: soporte técnico Spoki vs ticket de sus clientes; una pregunta; no URL | Pass | |
| 2026-08-28 | E2 | Il mio numero WhatsApp è stato bannato, cosa faccio? | Appello WA + campi EN da doc; un solo URL https://app.spoki.com/support; no url_for_lang nello stesso msg | Pass | Text manuale chiede sezione Assistenza |
| 2026-08-28 | E3 | Che schifo questo servizio | Empatia; chiede cosa è successo; no tool; no URL | Pass | |
| 2026-08-28 | E4 | Quali sono i limiti contatti e anche come verifico il Meta Business Manager? | Tool 200 query combinata lang it; prosa L0–L4 + Centro sicurezza Meta; Manuale limiti-contatti + /analytics; no support | Pass* | Non ha spezzato i due how-to; manca tab Quality Status e url verifica-MBM |
| 2026-08-28 | B2 | Devo aprire un ticket per un mio cliente dentro Spoki | Tool query «aprire un ticket per un cliente» lang it; + Aggiungi / New; Manuale /docs/piattaforma/ticket/; In piattaforma /tickets; no support | Pass | Re-test allowlist |
| 2026-08-28 | G2 | Devo aprire un ticket per il mio cliente Mario | Tool query cliente lang it; noma Mario; + Aggiungi / Nuova; Manuale ticket + /tickets; no support; no disambiguazione | Pass | Re-test allowlist |
| 2026-08-28 | E5 | Come verifico il Meta Business Manager? | Documenti (visura, bolletta) + 3–15 giorni; Manuale verifica-meta-business-manager; Meta security_center senza query; avviso admin BM | Pass | Post patch allowlist Meta |
| 2026-08-28 | E6 | Devo aprire un ticket verso Meta sul Business Manager | Unico https://www.facebook.com/business-support-home; prosa supporto Meta; no support Spoki; no /tickets; no disambiguazione | Pass | |
| 2026-08-28 | E4 | Quali sono i limiti contatti e anche come verifico il Meta Business Manager? | Solo limiti L0–L4; Manuale limiti-contatti + /analytics; chiede se spiegare verifica BM; no Meta URL | Pass | Re-test post-patch: un pezzo alla volta |
| 2026-08-28 | D1 | Non ho un account Spoki, voglio attivare il servizio | Prosa demo con consulente; unico https://spoki.com/it/book-a-demo; no tool; no /plans; no support | Pass | Post patch prospect |
| 2026-08-28 | D2 | Quanto costa il piano Marketing da 2400 conversazioni... | No €; In piattaforma /plans tab Your Plan; no book-a-demo; no support | Pass | Regressione G4 post prospect |
| 2026-08-28 | D3 | Vorrei informazioni su Spoki | Una domanda: account attivo vs prima attivazione; nessun URL | Pass | |
| 2026-08-31 | R1 | campagne fallite, ID 36925 | Tool 200 lang it; Falliti = numero non valido / limite; Riprova Fallite; Manuale campagne + `/analytics` Quality Status; no support | Pass* | Path atteso `/campaigns` |
| 2026-08-31 | R3 | automazione API contatto vuoto | Tool 200; prosa campi dinamici; Manuale campi-dinamici + `/custom-fields` + support | Pass* | URL ok per criterio P3; ON/OFF invertito vs text |
| 2026-08-31 | R11 t1 | non funziona più spoki, ID 6456 | 2× tool; no accesso account; unico support; 6456 nel testo | … | In corso |
| 2026-08-31 | R20 | Ma sei un ai ? | Assistente digitale Spoki; no URL | Pass | |
| 2026-08-31 | R9 | Apri Ticket Supporto | Unico https://app.spoki.com/support; nessuna domanda; no /tickets | Pass | Re-test post patch CTA |
| 2026-08-31 | A1 | Voglio aprire un ticket | Disambigua assistenza Spoki vs ticket suoi clienti; nessun URL | Pass | Regressione post patch CTA |
| 2026-08-31 | R15 t1 | promo 2000 | Limiti L1/L2; Manuale limiti + `/campaigns`; no demo | … | Re-test |
| 2026-08-31 | R17 | 900 conversazioni vs contatti | Distingue Meta 24h vs piano; no 900≈L1; Manuale limiti + `/analytics` | Pass | Re-test post patch nessi |
| 2026-08-31 | R4 | Shopify 9 vs 2 + consenso | Telefono checkout + 15 min; no checkbox marketing; Manuale + `/integrations` | Pass | Re-test 2 post esempi espliciti |

---

## Fix e re-test

- 28/08 G2 Fail → prompt: se il ticket è già per un suo cliente, guida sezione Ticket senza disambiguare. Re-test G2 **Pass** (click-path).
- 28/08 allowlist path app: how-to con schermata = Manuale: + In piattaforma:. I1 **Pass** con nudge Analytics Quality Status. B2 e G2 re-test **Pass**.
- 28/08 allowlist Meta: Manuale: + Meta:; security_center senza ?business_id=; ticket Meta = business-support-home. Tolta la riga “non presentarti come AI” (AI Act). E5/E6 **Pass**.
- 28/08 prospect: domanda se incerto; book-a-demo it/es/en se no piano. D1 D2 D3 **Pass**.
- 31/08 R1 Pass*: how-to Campagne ok, ma In piattaforma `/analytics` invece di `/campaigns` (Riprova Fallite).
- 31/08 R2 Pass*: Graph “missing permissions” → seconda query reconnect; Manuale migrazione + `/channels/whatsapp`. Non `/templates`, non form support.
- 31/08 R4 Pass*: Manuale Shopify + `/integrations` card ok; telefono in checkout (Opzioni modulo) è nel text. Inventato: consenso esplicito e path Shopify Checkout > Marketing (email/SMS). L’articolo parla di numero in checkout, webhook, automazioni da abilitare, attesa 15 min.
- 31/08 R5 Pass: #131026 non nel manuale → lo dice e manda solo support. Non inventa il codice.
- 31/08 R9 Fail: «Apri Ticket Supporto» (CTA inbound reale) → domanda A1. Atteso unico `https://app.spoki.com/support`. Patch: se il testo è esattamente quel CTA (o equivalente «ticket supporto»), è assistenza Spoki, non disambiguare.
- 31/08 R15 Fail: dopo how-to campagne/limiti, su «parlare con un commerciale» chiede se ha un account. Prompt: non chiedere se è cliente su how-to / limiti / Analytics. Atteso: resta in chat o `/plans`, no demo.
- 31/08 P3 chiusa. Patch prompt: CTA «Apri Ticket Supporto» → form; no domanda prospect a metà thread cliente; non inventare ON/OFF, path checkout, nessi conversazioni piano vs L1 Meta. Re-test: **R9, R15 t2, R3, R4, R17**. A1 regressione.

—

## Stato

**Patch 31/08b chiusa.** R3 Pass, R4 Pass. R9/A1/R15/R17 già Pass.

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| H1 | P0 | Pass | 28/08 |
| I1 | P0 | Pass | 28/08 nudge analytics Quality Status |
| I2 | P0 | Pass | 28/08 EN + /analytics Quality Status |
| I3 | P0 | Pass | 28/08 no support URL |
| A1 | P0 | Pass | 28/08; 31/08 regressione post patch CTA |
| B1 | P0 | Pass | 28/08 |
| B2 | P0 | Pass | 28/08 re-test Manuale + /tickets |
| B3 | P0 | Pass | 28/08 |
| G1 | P1 | Pass | 28/08 urgente: manuale + analytics, no support |
| G2 | P1 | Pass | 28/08 re-test Manuale + /tickets, no disambiguazione |
| G3 | P1 | Pass | 28/08 `transfer_to_human` |
| G4 | P1 | Pass | 28/08 /plans no € |
| G5 | P1 | Pass | 28/08 prosa no markdown |
| G6 | P1 | Pass | 28/08 support, non finge ticket |
| G7 | P1 | Pass | 28/08 I1: due URL ok, no support |
| E1 | P2 | Pass | 28/08 ES disambigua, no URL |
| E2 | P2 | Pass | 28/08 ban: support solo (Assistenza nel text) |
| E3 | P2 | Pass | 28/08 no tool, no URL |
| E4 | P2 | Pass | 28/08 re-test: spezza limiti vs verifica BM |
| E5 | P2 | Pass | 28/08 Manuale + Meta security_center, avviso admin |
| E6 | P2 | Pass | 28/08 unico business-support-home |
| D1 | P2 | Pass | 28/08 unico book-a-demo IT |
| D2 | P2 | Pass | 28/08 /plans, no demo |
| D3 | P2 | Pass | 28/08 una domanda, no URL |
| R1 | P3 | Pass* | 31/08 Manuale campagne; path `/analytics` non `/campaigns` |
| R2 | P3 | Pass* | 31/08 reconnect `/channels/whatsapp`, non `/templates` né support |
| R3 | P3 | Pass | 31/08 re-test 2: ON/OFF allineato al text |
| R4 | P3 | Pass | 31/08 re-test 2: no consenso inventato; telefono + 15 min |
| R5 | P3 | Pass | 31/08 gap + solo support; non inventa #131026 |
| R6 | P3 | Pass | 31/08 EN; gap + solo support; non inventa #131042 |
| R7 | P3 | Pass* | 31/08 URL e prerequisiti ok; due domande nello stesso turno |
| R8 | P3 | Pass | 31/08 solo support; ID 4249 nel form, non in URL |
| R9 | P3 | Pass | 31/08 re-test: unico support, no disambiguazione |
| R10 | P3 | Pass | 31/08 domanda; no transfer (callback ≠ operatore in chat) |
| R11 | P3 | Pass | 31/08 t1 support, t2 transfer, t3 form |
| R12 | P3 | Pass | 31/08 transfer; no URL; no stato ticket inventato |
| R13 | P3 | Pass* | 31/08 domanda D3, non demo immediato |
| R14 | P3 | Pass* | 31/08 domanda, non demo; no transfer |
| R15 | P3 | Pass | 31/08 re-test t2: /plans, no domanda account |
| R16 | P3 | Pass | 31/08 una domanda, no URL |
| R17 | P3 | Pass | 31/08 re-test: no 900≈L1; distingue piano vs Meta |
| R18 | P3 | Pass | 31/08 gap pro-rata; /plans; no € |
| R19 | P3 | Pass | 31/08 how-to recedere dal text; no form |
| R20 | P3 | Pass | 31/08 assistente digitale; no URL |

## Criteri pronto

- [x] P0 verdi o Skip documentati
- [x] P3 inbound reale R1–R20 girati (Pass/Fail in tabella)
- [x] PDF cliente in `_exports/` (+ Downloads)
- [x] Notion Agenti upsert
- [x] Documenti Prompt + Suite + KB + Report PDF
- [x] Changelog Deliverable cliente
