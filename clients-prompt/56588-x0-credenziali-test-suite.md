# Dottor Grandine 56588 — Test suite Playground X0 Credenziali

**Account Spoki:** [56588](https://admin.spoki.com/wazy/account/56588/change/)  
**Cliente:** Dottor Grandine  
**Agente:** Agents / X0 - Credenziali  
**Tipo:** Vocale  
**Ambiente:** Playground  
**Link Spoki:** https://app.spoki.com/ai/agent/90d2cee4-33e6-4064-9a70-74727a42b092  
**Prompt:** [`56588-x0-credenziali.md`](56588-x0-credenziali.md)  
**Flow map (internal):** [`56588-x0-credenziali-flow.md`](56588-x0-credenziali-flow.md)  
**Path suite:** `clients-prompt/56588-x0-credenziali-test-suite.md`  
**Path suite YAML:** [`56588-x0-credenziali-suite.yaml`](56588-x0-credenziali-suite.yaml)  
IDs YAML: `L1` → `x0.l1`, `D1` → `x0.d1`, `C1` → `x0.c1`, `V1` → `x0.v1` (pack overlay `voice.*`).

**Dove si esegue cosa.** Il playground vocale non aggancia un contatto, quindi i `%%CAMPI%%` sono vuoti: `x0.l1`–`x0.v1` e `voice.asr_normalize` sono `voice_outbound` (automazione Spoki Voice verso contatto di test). Restano in `voice_playground` solo `voice.short_turns`, `voice.one_question`, `voice.no_secrets_spoken`, che non dipendono dai dati del contatto e stanno in una sola Start Call. Creando un **gemello testuale** con lo stesso prompt e gli stessi tool, la logica (ordine tool, normalizzazione, chiusure anomale) si sposta su `twin_text` e le chiamate scendono a una.  
**KB:** non citata nel prompt  
**Langfuse:** [voice-agent](https://langfuse.ai.spoki.com/project/cmrw46ply0008o207yxewv4v1/traces?searchType=id&searchType=content&search=90d2cee4-33e6-4064-9a70-74727a42b092)

Si testa **esattamente** il prompt in `# System prompt (Spoki)`. Fail solo su regole esplicite. Contradizioni interne del prompt = mismatch, non Fail extra.

**Versione sotto test: v2 (2026-08-31)** — patch bloccanti: JSON letto solo internamente e nessuna conferma JSON, `get_current_datetime` per la data evento, sezione CHIUSURE ANOMALE, max 2 richieste per dato. Export per il paste: `~/Downloads/56588-x0-credenziali-system-prompt.txt`. **Non testare prima del sync.**

---

## Come iniziare ora

1. Playground: [X0 - Credenziali](https://app.spoki.com/ai/agent/90d2cee4-33e6-4064-9a70-74727a42b092)
2. Paste del prompt v2 da `~/Downloads/56588-x0-credenziali-system-prompt.txt`
3. Conferma tools: `xLogin`, `get_current_datetime`, `xVerificaDuplicato`, `xCreaPratica` (nomi allineati)
3. Clear / nuova chiamata tra scenari quando possibile
4. Vocale: max 2 frasi/turno; una domanda; no JWT a voce
5. Ordine P0: **L1 → D1 → C1 → V1** (stessa chiamata per D1–V1 dopo L1 ok)

Dati fittizi (stessa chiamata D1–V1):

| Campo | Detto a voce | Atteso in variabile / tool |
| --- | --- | --- |
| Targa | `AB 123 CD` | `AB123CD` |
| Data evento | `il ventinove luglio duemilaventisei` | `2026-07-29` (passata rispetto a oggi 2026-08-31) |
| Cellulare | `più trentanove tre tre tre uno due tre quattro cinque sei sette` | `3331234567` |
| Email | `mario punto rossi chiocciola example punto com` | `mario.rossi@example.com` |
| Privacy | `Sì, do il consenso` | consenso esplicito |

---

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (Account 56588, Dottor Grandine, X0 Credenziali, Vocale, Playground, Link) | ☑ |
| 2 | Copia test vs live | ☐ Playground (live non in scope) |
| 3 | Prompt sync = **v2** 2026-08-31 (export Downloads) | ☐ |
| 4 | KB | ☐ N/A (prompt non la richiede) |
| 5 | Langfuse voice-agent filtrato su agent id | ☐ |
| 6 | Tool `xLogin` | ☐ |
| 7 | Tool `xVerificaDuplicato` | ☐ |
| 8 | Tool `xCreaPratica` | ☐ |
| 8b | Tool `get_current_datetime` collegato (richiesto dalla regola data v2) | ☐ |
| 9 | Variabili `%%RIPORTAL_JWT%%` `%%TARGA_VEICOLO%%` `%%DATA_EVENTO%%` `%%CELLULARE%%` `%%EMAIL%%` `%%INCARICO_ID%%` | ☐ |
| 10 | First Message UI: non deve duplicare un secondo saluto / non deve chiedere targa prima di `xLogin` | ☐ |
| 11 | Clear / nuova chiamata tra scenari | ☐ |

---

## Mismatch / platform findings (prompt vs voce)

| Area | Prompt | Tension | Come score |
| --- | --- | --- | --- |
| Post-webhook (v1) | «leggi ogni coppia chiave-valore», «risposta esauriente tecnica», «chiedi conferma JSON» vs chiusura breve immediata | **Risolto in v2**: lettura solo interna, nessuna conferma JSON, niente nomi campo/tool a voce | Se in v2 legge ancora il JSON o chiede conferma = Fail su V1 |
| Data evento (v1) | «ieri»/«29 luglio» → YYYY-MM-DD, «solo oggi o date passate», senza tool tempo | **Risolto in v2**: `get_current_datetime` + regola anno mancante + richiesta unica se futura | Dipende dal tool collegato (pre-check 8b); se il tool manca → Skip con nota gapConfig |
| Rami di uscita (v1) | STEP COMPLETATO solo per duplicato/blocked/resume/creata | **Risolto in v2**: sezione CHIUSURE ANOMALE per login fail, privacy negata, HTTP≥400, id illeggibile, dato mancante dopo 2 tentativi | Verificare che in questi rami **non** dica «Ora passiamo alla gestione del danno» |
| Codice GRD | Ramo resume: «+ codice GRD/idIncarico se presente» | Regole create: «non dire GRD» | **Aperto**: su E3 non è Fail dire GRD, su V1 sì |
| Path campi verifica | «Incarico già presente», `success`, `idStatoIncarico`, `value` vuoto | Il prompt non dice dove stanno i campi (root vs `value`) | **Aperto**: se interpreta male un body reale, chiarire nel prompt |
| Igiene vocale | Nessuna regola su silenzio/rumore/interruzioni né `transfer_to_human` | Rischio stallo su silenzio; nessun handover | **Aperto**: check sezioni 1–4 checklist voice; Skip se non riproducibile in playground |
| **Playground vocale senza contatto** | Il prompt salva e rilegge `%%RIPORTAL_JWT%%`, `%%TARGA_VEICOLO%%`, `%%DATA_EVENTO%%`, `%%CELLULARE%%`, `%%EMAIL%%`, `%%INCARICO_ID%%` | Start Call non aggancia un contatto: i `%%CAMPI%%` restano vuoti (nel playground testuale invece si sceglie il contatto) | **Platform**. L1→V1 non sono eseguibili in Start Call: vanno in `voice_outbound` (automazione Spoki Voice verso contatto di test). Solo tono/leak/una-domanda restano in `voice_playground`. Richiesta a prodotto: contatto selezionabile anche nel playground vocale |
| Canale | «Login ok.» detto al chiamante | Gergo interno su telefono | **Aperto** (cosmetico): non Fail, il prompt lo impone |

---

## Scenari

### P0

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| L1 | Avvio chiamata | Prima di qualsiasi domanda: `xLogin`. Se ok: solo «Login ok.» Nessun JWT. Nessuna targa prima. Nessun altro webhook | ☐ | |
| D1 | Raccolta 5 campi, una domanda | Targa formato 2L-3N-2L; data naturale (no YYYY-MM-DD a voce); cell; email; privacy. Non ripetere i dati dopo ogni risposta | ☐ | |
| C1 | Conferma unica | Dopo privacy, prima di webhook: riepilogo umano una volta + «Confermi?». Poi «Verifico se esiste già una pratica.» + `xVerificaDuplicato` | ☐ | |
| V1 | Nessun duplicato → create → chiusura | Se «Nessun Incarico presente»: «Non risulta una pratica aperta. Procedo con la creazione.» + `xCreaPratica`. Id numerico → «Pratica creata. Il tuo riferimento è [cifre].» Poi esatto: «Ora passiamo alla gestione del danno.» Nessun JSON letto a voce, nessuna richiesta di conferma JSON, niente altre domande/webhook | ☐ | |

### P1 — guardrail

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| G1 | Targa invalida | Non salva; richiedi formato. Max 2 richieste, poi CHIUSURE ANOMALE | ☐ | |
| G2 | Data futura | Chiede una data passata e richiede una volta; non salva futura | ☐ | |
| G3 | Privacy negata | Non puoi procedere; nessun webhook; chiusura anomala (no «Ora passiamo alla gestione del danno») | ☐ | |
| G4 | Login fail | Errore breve + chiusura anomala; nessun dato raccolto | ☐ | Skip se non si può forzare fail |
| G5 | Fuori scope | Non chiedere n. sinistro, compagnia, danni in questo step | ☐ | |
| G6 | JWT | Mai letto a voce / mai in transcript customer-facing | ☐ | da L1/D1 |

### P2 — edge

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| E1 | Data umana «ieri» | Chiama `get_current_datetime`; a voce italiano; variabile YYYY-MM-DD (`2026-08-30` se oggi è 31/08/2026). Non chiedere formato tecnico | ☐ | |
| E1b | «29 luglio» senza anno | Occorrenza più recente già passata → `2026-07-29` | ☐ | |
| E2 | Cell `0039` / `39…` | Solo cifre; togli 0039; se inizia 39 e >10 cifre togli 39 | ☐ | |
| E3 | Duplicato resume | «Incarico già presente» + idStatoIncarico 1/2/4: STOP crea. Resume + GRD/id se presente. Poi STEP COMPLETATO | ☐ | |
| E4 | Duplicato blocked | Stesso messaggio duplicato ma stato non 1/2/4: «La tua pratica è già in lavorazione…» + STEP COMPLETATO, no `xCreaPratica` | ☐ | |
| E5 | HTTP verifica ≥400 | Non `xCreaPratica`; chiusura anomala | ☐ | Skip se non iniettabile |
| E6 | Create senza `value.idIncarico` numerico | Non salvare `%%INCARICO_ID%%`, non STEP COMPLETATO, chiusura anomala | ☐ | Skip se non iniettabile |

---

### Script per ID

#### L1 — login all’avvio

1. Clear / nuova chiamata Playground. **Non parlare.**
2. Atteso: tool `xLogin` **prima** di domande. Parlato: solo «Login ok.» (o errore + stop). Nessun JWT. Nessuna richiesta targa.
3. Incolla qui transcript + JSON tool.

#### D1 — raccolta (stessa chiamata dopo L1 Pass)

Dopo «Login ok», rispondi **un turno alla volta** (aspetta la domanda):

1. Targa: `AB 123 CD` (atteso save `AB123CD`, nessuna eco targa, poi domanda data naturale tipo «In che giorno ha grandinato?»)
2. Data: `il ventinove luglio duemilaventisei` (niente YYYY-MM-DD a voce; non ripetere la data in tecnico)
3. Cellulare: `3331234567`
4. Email: `mario.rossi@example.com`
5. Privacy: `Sì, do il consenso`

Atteso: una domanda per volta; non ripetere i dati dopo ogni risposta; non webhook prima del riepilogo.

#### C1 — riepilogo + verifica

1. Dopo privacy, **non** inviare altro se l’agente riepiloga da solo.
2. Atteso parlato (forma umana, una volta): targa AB123CD, data in italiano (29 luglio 2026), cellulare 3331234567, email, «Confermi?»
3. Invia: `Sì, confermo`
4. Atteso: solo «Verifico se esiste già una pratica.» + tool `xVerificaDuplicato` (nessun `xCreaPratica` in questo turno). Incolla body.

#### V1 — create o duplicato (continua C1)

In base al body reale:

- «Nessun Incarico presente» + value vuoto / success=true: «Non risulta una pratica aperta. Procedo con la creazione.» + `xCreaPratica`. Poi id numerico → «Pratica creata. Il tuo riferimento è [solo cifre JSON].» subito «Ora passiamo alla gestione del danno.» Stop.
- «Incarico già presente»: **non** `xCreaPratica`; resume o blocked come da `idStatoIncarico`; poi STEP COMPLETATO. Segnare Pass su V1 solo se nessun duplicato; se duplicato → Pass E3/E4 e V1 Skip.

---

## Fix e re-test

| Data | Intervento | Stato |
| --- | --- | --- |
| 2026-08-31 | v2 pre-test sui 3 bloccanti: lettura JSON interna + nessuna conferma JSON; `get_current_datetime` + regola anno per la data; CHIUSURE ANOMALE; max 2 richieste per dato | Export in `~/Downloads/56588-x0-credenziali-system-prompt.txt` — **sync Spoki da fare** |

Restano aperti (non patchati per scelta): GRD resume vs create, path dei campi nel body di `xVerificaDuplicato`, silenzio/rumore e `transfer_to_human`.

---

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| L1 | P0 | ☐ | |
| D1 | P0 | ☐ | |
| C1 | P0 | ☐ | |
| V1 | P0 | ☐ | |
| G1–G6 | P1 | ☐ | |
| E1–E6 | P2 | ☐ | |

Stato suite: **In test** — prompt v2 scritto, sync Spoki pendente, nessuno scenario ancora eseguito.

## Criteri pronto

- [ ] P0 verdi o Skip documentati
- [ ] PDF cliente in `_exports/` (+ Downloads)
- [ ] Notion Agenti upsert
- [ ] Documenti Prompt + Suite (+ Report PDF); Path = link Notion
- [ ] Changelog Deliverable cliente
