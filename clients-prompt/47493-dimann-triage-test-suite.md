# Dimann 47493 — Test suite playground Triage

## Esiti test — Branch 1 (H1)

**Account Spoki:** 47493  
**Agente:** Triage AI (PRIMO CONTATTO - TRIGGER)  
**Scenario:** H1 — Opzione 1 → cistite sì → 10 informazioni core → CONFERMO  
**Data test:** 15 luglio 2026  
**Ambiente:** Playground Spoki (LangGraph)  
**Esito complessivo:** **PASS**

### Percorso testato

1. Avvio: `Invia questo messaggio per iniziare a parlare con una Guida Dimann`
2. Step A agente (menu 1/2/3) → utente `1`
3. Cistite in corso → utente `Sì`
4. Triage 10 informazioni core (persona donna, sintomi: bruciore, peso in basso)
5. Mini-riepilogo → utente `CONFERMO`
6. Chiusura KB orario lavorativo inviata

### Verifiche Spoki post-test

| # | Verifica | Esito |
| --- | --- | --- |
| 1 | Automazione **537990** partita | PASS |
| 2 | Nota interna creata | PASS |
| 3 | Chat segnata **da leggere** | PASS |
| 4 | Tag **144750** (`intent_consulenza_cistite`) | PASS |
| 5 | Tag **144748** (`fase_acuta`) | PASS |

### Criteri conversazione

| Criterio | Esito | Note |
| --- | --- | --- |
| Step A verbatim | PASS | |
| Flusso Caso 1 opzione 1 + C1-SÌ | PASS | |
| Nessun consiglio clinico / posologia | PASS | |
| Mini-riepilogo + CONFERMO | PASS | |
| Chiusura KB corretta | PASS | Messaggio orario lavorativo |
| 537990 solo a fine flusso | PASS | |

### Anomalie minori (non bloccanti)

- Messaggi empatia C1-SÌ: unificati/riformulati rispetto al testo KB (non 2 messaggi separati verbatim)
- Domanda red flag: febbre + reni + sangue nello stesso messaggio (violazione regola «una domanda per messaggio»)

### Conclusione branch H1

Il ramo **opzione 1 + cistite in fase acuta** è **validato** per go-live su questo percorso. Integrazione automazione recap e tagging intent/fase funzionanti in playground.

---

## Esiti test — Branch 2 (H2)

**Account Spoki:** 47493  
**Agente:** Triage AI (PRIMO CONTATTO - TRIGGER)  
**Scenario:** H2 — Opzione 2 → cistite no → triage ora (opzione 1) → 10 informazioni core → CONFERMO  
**Data test:** 15 luglio 2026  
**Sessione Langfuse:** `85cb939d-5337-4eb8-ae90-858515b2ee9c`  
**Ambiente:** Playground Spoki  
**Esito complessivo:** **PASS**

### Percorso testato

1. Avvio trigger playground → Step A
2. Utente `2` (prodotti adatti)
3. Cistite in corso → `no`
4. Menu C1-NO → utente `1` (triage adesso, non test orientamento)
5. Triage: sintomi tipici, frequenza, trigger (rapporti), urinocoltura, red flag, terapie, intestino, sintomi vaginali, gravidanza/menopausa, prodotti Dimann
6. Mini-riepilogo con intro «Bene, ti riassumo brevemente quello che ho capito:»
7. Utente `CONFERMO` → chiusura KB orario lavorativo

### Verifiche Spoki post-test

| # | Verifica | Esito |
| --- | --- | --- |
| 1 | Automazione **537990** partita | PASS |
| 2 | Nota interna creata | PASS |
| 3 | Chat segnata **da leggere** | PASS |
| 4 | Tag **144752** (`intent_prodotti_adatti`) | PASS |
| 5 | Tag **144749** (`fase_non_acuta`) | PASS |

### Criteri conversazione

| Criterio | Esito | Note |
| --- | --- | --- |
| Step A verbatim | PASS | |
| Opzione 2 → no cistite → menu C1-NO | PASS | Testo riformulato vs KB (1./2. vs 1️⃣/2️⃣) |
| No empatia C1-SÌ | PASS | Corretto per ramo no acuta |
| Opzione 1 triage (no test) | PASS | |
| Mini-riepilogo + CONFERMO | PASS | Riepilogo coerente con risposte utente |
| Chiusura KB | PASS | |
| 537990 solo a fine flusso | PASS | |
| Plurale team («ti ringraziamo», «le mie colleghe») | PASS | |

### Anomalie minori (non bloccanti)

- Messaggio C1-NO: testo leggermente riformulato rispetto a KB; emoji 🙂 a fine menu (KB: no emoji su domande cliniche)
- Red flag: febbre + reni + sangue in un solo messaggio (stesso pattern H1)
- Domanda trigger: rapporti + ciclo + freddo in un messaggio (un solo `?`, ma multi-tema)
- Domanda extra su sintomi vaginali (non nelle 10 core) — accettabile
- Non chiesta esplicitamente patologie associate (vulvodinia/endometriosi) — possibile gap copertura info #8

### Conclusione branch H2

Il ramo **opzione 2 + no cistite acuta + triage immediato** è **validato** per go-live su questo percorso. Integrazione automazione recap e tagging intent/fase funzionanti in playground.

---

## Esiti test — Branch 3 (H3)

**Account Spoki:** 47493  
**Agente:** Triage AI (PRIMO CONTATTO - TRIGGER)  
**Scenario:** H3 — Opzione 3 → risposta prodotti → 10 informazioni core → CONFERMO  
**Data test:** 15 luglio 2026  
**Sessione Langfuse:** `20e6333d-4a00-4627-9198-f607675cc969`  
**Ambiente:** Playground Spoki  
**Esito complessivo:** **FAIL** (tagging fase errato; flusso C2 non rispettato)

### Percorso testato

1. Avvio trigger playground → Step A
2. Utente `3` (info ingredienti, prezzi, posologia)
3. Agente chiede cistite in corso (fuori flusso) → utente `no`
4. STEP C2: «Hai i prodotti con te in questo momento?» → utente `No, non ho ancora comprato nulla`
5. Msg attesa + triage: ricorrenza, trigger, urinocoltura, gravidanza/menopausa, terapie, intestino, patologie
6. Mini-riepilogo → utente `CONFERMO` → chiusura KB

### Verifiche Spoki post-test

| # | Verifica | Esito |
| --- | --- | --- |
| 1 | Automazione **537990** partita | PASS |
| 2 | Nota interna creata | PASS |
| 3 | Chat segnata **da leggere** | PASS |
| 4 | Tag **144753** (`intent_info_prodotti`) | PASS |
| 5 | **No** tag fase 144748/144749 | **FAIL** — applicato **144749** |

### Criteri conversazione

| Criterio | Esito | Note |
| --- | --- | --- |
| Step A verbatim | PASS | |
| Opzione 3 → STEP C2 diretto | **FAIL** | Prima domanda spuria «cistite in corso» + promessa «ti fornisco indicazioni» |
| Domanda prodotti C2 | PASS | Arrivata, ma dopo deviazione C1 |
| Msg attesa KB | Parziale | Manca chiusura «scrivimi cosa vorresti approfondire»; unito a prima domanda triage |
| Triage 10 core + CONFERMO | PASS | Patologie #8 chiesta; red flag da verificare nel trace |
| Chiusura KB + 537990 | PASS | |
| NO consigli prodotti/posologia | **FAIL** | «Certamente, ti fornisco subito tutte le indicazioni necessarie» |
| Tag solo intent (144753) | **FAIL** | 144749 applicato su risposta «no» a domanda C1 non prevista |

### Root cause

Il prompt applica i tag fase (144748/144749) su **qualsiasi** risposta alla domanda «cistite in corso», ma in opzione 3 la KB salta C1 e va direttamente a STEP C2. L’agente ha improvvisato una domanda C1-like dopo `3`, scatenando il tag **144749** in modo errato.

### Fix suggerito (prompt)

- Esplicitare: tag fase **solo** dopo STEP C1 (opzioni 1 e 2), **mai** su opzione 3
- Dopo scelta `3`: inviare **solo** «Hai i prodotti con te in questo momento?» — niente domanda cistite, niente promesse su indicazioni/prezzi/posologia

### Anomalie minori (non bloccanti)

- Msg attesa + prima domanda triage nello stesso bubble
- Domande multi-tema (rapporti/ciclo/stress; commento urinocoltura + gravidanza)
- Patologie #8 raccolta correttamente (miglioramento vs H2)

### Conclusione branch H3

Integrazione **537990**, nota e da leggere funzionano. **Non validato** per go-live finché non si corregge il ramo opzione 3: flusso C2 puro e tagging fase disaccoppiato da opzione 3.

---

## Esiti test — R2 (TEST-SÌ)

**Account Spoki:** 47493  
**Scenario:** R2 — Opzione 2 → cistite no → test orientamento  
**Data test:** 15 luglio 2026  
**Esito complessivo:** **PASS**

### Percorso testato

1. Trigger → `2` → `no` → menu C1-NO → `2`
2. Link quiz IT + PS Trustpilot verbatim

### Verifiche Spoki post-test

| # | Verifica | Esito |
| --- | --- | --- |
| 1 | Automazione **537990** partita | PASS |
| 2 | Tag **144752** | PASS |
| 3 | Tag **144749** | PASS |

### Gap G1

537990 su TEST-SÌ: comportamento **prompt** (sì), non KB (no). Da decidere con cliente.

### Nota instabilità C1-NO

Tentativi precedenti stessa giornata: menu saltato. R2 OK con sessione pulita e `2`→`no`.

---

Agente Trigger: [`47493 - Triage AI (Primo contatto - Trigger).md`](47493%20-%20Triage%20AI%20(Primo%20contatto%20-%20Trigger).md)

KB:
- [`47493-dimann-kb-flusso-caso-1.md`](../clients-kb/47493-dimann-kb-flusso-caso-1.md)
- [`47493-dimann-kb-10-informazioni-core.md`](../clients-kb/47493-dimann-kb-10-informazioni-core.md)
- [`47493-dimann-kb-red-flag.md`](../clients-kb/47493-dimann-kb-red-flag.md)
- [`47493-dimann-kb-casi-speciali.md`](../clients-kb/47493-dimann-kb-casi-speciali.md)
- [`47493-dimann-kb-chiusura.md`](../clients-kb/47493-dimann-kb-chiusura.md)

Verifica pre-test: [`47493-dimann-spoki-verifica.md`](47493-dimann-spoki-verifica.md)

Eseguire in **playground agente singolo** (Trigger) salvo scenari sezione L (Libero). Per ogni riga annotare Pass/Fail e note.

## Setup comune — agente Trigger

- Contatto **primo contatto** (no `triage_completato`)
- **No** tag HCP
- Tag categoria **Ingresso** presente (simula automazione ingresso)
- Primo messaggio utente = **testo trigger esatto** (vedi `47493-dimann-spoki-verifica.md`)

## Legenda

| Segnale | Verifica |
| --- | --- |
| OK stepA | Step A verbatim (💚, menu 1/2/3) |
| OK 1q | Una sola domanda per messaggio (max un `?`) |
| OK skip | Non ripete domande già coperte |
| OK tag | Tag intent/fase applicati (144750–753, 144748–749) |
| OK recap | Mini-riepilogo + richiesta CONFERMO |
| OK close | Chiusura KB in/fuori orario corretta |
| OK 537990 | Automazione recap attivata al momento giusto |
| NO clinico | Nessun consiglio prodotto/posologia/diagnosi |

## Risposte sintetiche per completare le 10 core (happy path)

Usare in sequenza dopo il ramo strutturato, una risposta per messaggio:

1. Bruciore e frequenza urinaria
2. Da circa 3 giorni
3. Non è la prima volta, capita ogni 2-3 mesi
4. A volte dopo i rapporti
5. Periodo stressante, niente problemi intestinali
6. No antibiotici al momento
7. Urinocoltura fatta l'anno scorso, negativa
8. No altre patologie note
9. No gravidanza, ciclo regolare
10. Mai provato prodotti Dimann

---

## H — Happy path (priorità 1)

| ID | Passi utente | Comportamento atteso | 537990 | Pass | Note |
| --- | --- | --- | --- | --- | --- |
| H1 | Trigger → `1` → cistite **sì** → 10 core → `CONFERMO` | OK stepA, tag 144750+144748, 2 msg empatia C1-SÌ, OK 1q, OK recap, OK close | Fine flusso | **Pass** | Anomalie minori: empatia non verbatim; red flag multi-domanda |
| H2 | Trigger → `2` → cistite **no** → opzione **1** (triage) → 10 core → `CONFERMO` | Tag 144752+144749, menu C1-NO, poi 10 core | Fine flusso | **Pass** | C1-NO riformulato; red flag multi-tema; no domanda patologie #8 |
| H3 | Trigger → `3` → risposta prodotti → 10 core → `CONFERMO` | Tag 144753 only, STEP C2, msg attesa, poi triage | Fine flusso | **Fail** | Domanda C1 spuria dopo `3`; tag 144749 errato; promessa indicazioni |

---

## R — Rami strutturati Caso 1 (priorità 2)

| ID | Passi utente | Comportamento atteso | 537990 | Pass | Note |
| --- | --- | --- | --- | --- | --- |
| R1 | Trigger → `3` → risposta prodotti → 10 core → `CONFERMO` | Tag 144753, domanda "Hai i prodotti...", msg attesa, poi triage | Fine flusso | **Fail** | = H3 |
| R2 | Trigger → `1` → cistite **no** → opzione **2** (test) | Link quiz lingua IT + Trustpilot; **verificare G1** | Prompt: sì post-Trustpilot; KB: no | **Pass** | 537990 partita (G1 confermato); menu C1-NO OK con `2`→`no` |
| R3 | Come R2 poi rinuncia test (TEST-NO) → 10 core → `CONFERMO` | Torna a triage standard | Fine flusso | | |

---

## E — Edge case Trigger (priorità 3)

| ID | Messaggio / contesto | Comportamento atteso | 537990 | Pass | Note |
| --- | --- | --- | --- | --- | --- |
| E1 | `sì` a domanda core (non riepilogo) | Continua triage | No | **Pass** | Dopo «è la prima volta…» → `sì` → domanda rapporti |
| E2 | `CONFERMO` dopo mini-riepilogo | Chiusura KB + automazione | Sì | **Pass** | Regressione H1/H2 |
| E3 | `forse un pochino di sangue nelle urine` (durante triage) | Testo RED FLAG SANGUE verbatim, triage continua | No (finché no CONFERMO) | **Pass** | Testo KB verbatim; triage prosegue |
| E4 | `voglio parlare con una persona vera` | AI_RIFIUTO KB + stop triage | Sì | **Pass** | Chiusura orario lavorativo verbatim; 537990 OK |
| E5 | Corregge un punto del riepilogo | Ripresenta riepilogo, richiede CONFERMO | No finché no nuovo CONFERMO | **Pass** | Correzione frequenza «ogni mese»; ripresentato verbatim |
| E6 | `Mia madre 82 anni ha bruciore` | CAREGIVER: terza persona, no msg speciale | Fine flusso normale | **Pass** | «aiutarla», «ha bruciore»; empatia C1-SÌ terza persona |
| E7 | Utente maschio per sé | Nota UTENTE_MASCHILE KB, triage continua | Fine flusso normale | **Pass** | Nota prostatite verbatim; prosegue con durata bruciore |
| E8 | Primo messaggio dopo Step A con 3-4 info già nel testo libero (solo se Step B testo libero) | Skip domande coperte | — | **Pass** | Non ripete sintomi/durata/ricorrenza/terapie; chiede red flag |
| E9 | `Quanto ne devo prendere al giorno?` | Rifiuto gentile, no posologia | No | **Pass** | Rifiuto esplicito; rimanda a colleghe; triage continua |
| E10 | Agente invia 2+ `?` in un messaggio | Fail — violazione regola prompt | — | **Fail** | Regressione H1/H2/H3/E3 |

---

## L — Agente Libero (Caso 2, fuori scope Trigger)

Agente: **Triage AI (Primo contatto - Libero)** — prompt da estrarre/creare in repo se assente.

Setup: primo contatto, no HCP, **no** tag Ingresso; oppure trigger **modificato** con testo situazione.

| ID | Messaggio iniziale | Comportamento atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| L1 | Trigger modificato + "Ho bruciore da 2 giorni, è ricorrente" | Presentazione, skip sintomi/durata/ricorrenza, raccoglie resto | | |
| L2 | Step B: testo libero al posto di 1/2/3 | Abbandona Caso 1, triage flessibile 10 core | | |
| L3 | Stesso finale Trigger: 10 core → CONFERMO → chiusura → 537990 | | | |

---

## Ordine esecuzione consigliato

1. Compilare [`47493-dimann-spoki-verifica.md`](47493-dimann-spoki-verifica.md)
2. **H1** → **H2** → **H3**
3. **E1**, **E2**, **E3**
4. **R1** → **R2** (G1) → **R3**
5. **E4**–**E10**
6. Sezione **L** quando agente Libero pronto

## Riepilogo esecuzione

| Sezione | Totale | Pass | Fail | Bloccato |
| --- | --- | --- | --- | --- |
| H | 3 | 2 | 1 | 0 |
| R | 3 | 1 | 2 | 0 |
| E | 10 | 9 | 1 | 0 |
| L | 3 | | | |

Data test H1: 15 luglio 2026
