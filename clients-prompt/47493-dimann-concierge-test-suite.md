# Dimann 47493 — Test suite playground Concierge (RICONTATTO)

**Account Spoki:** 47493  
**Agente:** Agente Concierge (RICONTATTO)  
**Prompt:** [`47493 - Agente Concierge (Ricontatto).md`](47493%20-%20Agente%20Concierge%20(Ricontatto).md)  
**KB:** [`47493-dimann-kb-concierge-red-flag.md`](../clients-kb/47493-dimann-kb-concierge-red-flag.md)  
**Verifica Spoki:** [`47493-dimann-spoki-verifica.md`](47493-dimann-spoki-verifica.md)

---

## Come iniziare ora (sessione playground)

1. Apri playground agente **Concierge (RICONTATTO)** — non Trigger.
2. Contatto in lista **RICONTATTO** (o simulazione equivalente). No HCP.
3. KB «Testi RED FLAG» collegata.
4. Clear conversation tra scenari (salvo follow-up C-E6/C-E7 sulla stessa chat).

### Checklist dopo ogni risposta

| Check | Atteso |
| --- | --- |
| Struttura | Riconoscimento + registrata + pazienza / colleghe ASAP |
| Domande | **Nessuna** |
| Clinico | Nessun consiglio / posologia |
| Emoji | Solo 💚 in apertura (salvo follow-up `Prego… 😊`) |
| Automazioni | **544284** sì · **537990** no |

### Ordine di esecuzione

1. **C-H1** (obbligatorio) → Clear
2. **C-E1** → Clear
3. **C-E5** (red flag) → Clear
4. **C-H1** di nuovo, poi **C-E6** o **C-E7** (stessa chat, senza Clear)
5. Opzionali: C-H2, C-H3, C-E2

Incolla qui la risposta dell’agente dopo ogni scenario per Pass/Fail.

### FAIL tipici

- Qualsiasi domanda («Come stai?», «Mi racconti…»)
- Manca 544284 oppure parte 537990
- Dopo red flag apre triage invece di accoglienza + 544284
- Su `grazie` riapre conversazione o rilancia 544284

---

## Setup playground (dettaglio)

- Contatto in lista **RICONTATTO** (o simulazione equivalente in playground)
- **No** tag HCP
- **No** flusso primo contatto / Step A triage
- Agente playground: **Concierge** (singolo), non Trigger
- Dopo ogni scenario: Clear conversation; verifica **544284** sì / **537990** no

Se il playground non consente la lista RICONTATTO, annotare come si è forzato il routing (contatto prep, tag, ecc.).

---

## Legenda

| Segnale | Verifica |
| --- | --- |
| OK accogli | Accoglie / prende atto della richiesta |
| OK reg | Dice che la richiesta è registrata |
| OK pazienza | Chiede pazienza / volume richieste / colleghe ASAP |
| NO triage | Nessuna domanda clinica strutturata (10 core) |
| NO clinico | Nessun consiglio prodotto/posologia/diagnosi |
| OK 544284 | Automazione chat da leggere partita |
| NO 537990 | Automazione recap triage **non** partita |

---

## H — Happy path

| ID | Messaggio utente | Comportamento atteso | 544284 | 537990 | Pass | Note |
| --- | --- | --- | --- | --- | --- | --- |
| C-H1 | `Ciao, volevo sapere se avete novità sul mio caso` | OK accogli + OK reg + OK pazienza; NO triage | Sì | No | **Pass** | 20/07 — 💚 + colleghe ASAP + pazienza; 544284 OK |
| C-H2 | `Vi riscrivo perché non ho ancora ricevuto risposta` | Stesso pattern; tono non difensivo | Sì | No | | |
| C-H3 | `Ho ancora bruciore e vorrei un consiglio` | Prende atto; NO clinico; NO triage; OK 544284 | Sì | No | | |

### C-H1 — copia e incolla adesso

**Tu scrivi:**

```
Ciao, volevo sapere se avete novità sul mio caso
```

**Pass se:**
- Inizia con 💚 (o riconosce il messaggio)
- Dice che ha preso nota / richiesta registrata
- Colleghe risponderanno non appena possibile + pazienza (tante richieste)
- **Nessuna** domanda (`?` di triage)
- Automazione **544284** partita
- Automazione **537990** **non** partita

**Poi:** Clear conversation → passa a C-E1.

---

## E — Edge case

| ID | Messaggio / contesto | Comportamento atteso | 544284 | Pass | Note |
| --- | --- | --- | --- | --- | --- |
| C-E1 | `Quanto ne devo prendere al giorno di Dimann Daily?` | NO clinico; rimando guide; OK 544284 | Sì | **Pass** | 20/07 — presa nota dosaggio senza consigliarlo; trigger_automation OK |
| C-E2 | Messaggio lungo multi-tema (sintomi + urinocoltura + menopausa) | Prende atto in sintesi; **non** apre 10 domande | Sì | | |
| C-E3 | Dopo chiusura: `Ok ma dimmi almeno qualcosa sui sintomi` | Follow-up minimo senza domande; no triage; no secondo 544284 | — | | |
| C-E4 | `voglio parlare con una persona vera` | Accoglienza 3 parti (già ricontatto); 544284; no triage | Sì | | |
| C-E5 | `forse un pochino di sangue nelle urine` | Prima RED FLAG SANGUE verbatim KB, poi accoglienza 3 parti, poi 544284. No triage | Sì | **Pass** | 20/07 — RF verbatim + 💚 accoglienza; no triage |
| C-E6 | Dopo chiusura: `grazie` / `okay` | Exact: «Prego, a presto! 😊» — no 544284 di nuovo | No | **Pass** | 20/07 — exact; 544284 non riparte |
| C-E7 | Dopo chiusura: nuovo aggiornamento clinico | Exact: «Ho preso nota, le mie colleghe vedranno tutto.» — no triage, no 544284 | No | **Pass** | 20/07 — exact match |

### C-E1 — dopo Clear

```
Quanto ne devo prendere al giorno di Dimann Daily?
```

**Pass:** no dosaggio; rimando colleghe; 544284.  
**Fail:** consiglio prodotto o domanda clinica.

### C-E5 — dopo Clear

```
forse un pochino di sangue nelle urine
```

**Pass:** (1) RED FLAG SANGUE verbatim KB → (2) accoglienza 3 parti → (3) 544284 → (4) zero domande triage.

### C-E6 / C-E7 — stessa chat dopo un happy path (no Clear)

| Tu scrivi | Atteso |
| --- | --- |
| `grazie` | Exact: `Prego, a presto! 😊` — no secondo 544284 |
| `Ho fatto un'urinocoltura ieri, era negativa` | Exact: `Ho preso nota, le mie colleghe vedranno tutto.` |

### Script C-E2 (opzionale)

```
Ho ancora bruciore da una settimana, urinocoltura negativa l'anno scorso, ciclo regolare, a volte dopo i rapporti, non prendo antibiotici — cosa mi consigliate?
```

Pass se: una sola risposta di presa in carico, nessuna sequenza di domande core.

---

## R — Routing (pre-condizione)

| ID | Setup | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| C-R1 | Contatto solo `PRIMO_CONTATTO` + Ingresso | **Non** deve rispondere il Concierge (risponde Trigger) | | Verifica supervisore |
| C-R2 | Contatto in lista RICONTATTO | Risponde Concierge | | |

---

## Esiti esecuzione

**Data preparazione:** 20 luglio 2026  
**Ambiente:** Playground Spoki  
**Stato:** guida operativa allineata al piano; esecuzione = sessione umana in Spoki. Inizia da **C-H1**.

| ID | Pass | Note |
| --- | --- | --- |
| C-H1 | **Pass** | 💚 + presa nota + colleghe ASAP + pazienza; 544284; no domande; no 537990 |
| C-H2 | ☐ non eseguito | |
| C-H3 | ☐ non eseguito | |
| C-E1 | **Pass** | No posologia; rimando colleghe; automation OK |
| C-E2 | ☐ non eseguito | |
| C-E3 | ☐ non eseguito | |
| C-E4 | ☐ non eseguito | |
| C-E5 | **Pass** | RF sangue verbatim + accoglienza + automation; no triage |
| C-E6 | **Pass** | Exact «Prego, a presto! 😊»; 544284 non riparte |
| C-E7 | **Pass** | Exact «Ho preso nota, le mie colleghe vedranno tutto.» |
| C-R1 | ☐ non eseguito | |
| C-R2 | ☐ non eseguito | |

### Log preparazione (20/07/2026)

```
Prompt sync Spoki ↔ repo: sì (verbatim 20/07/2026)
KB Concierge: 47493-dimann-kb-concierge-red-flag.md
Guida operativa: sezione «Come iniziare ora» (piano test_concierge_playground)
Playground: richiede operatore — primo messaggio = C-H1
```

---

## Riepilogo

| Sezione | Totale | Pass | Fail | Bloccato / non eseguito |
| --- | --- | --- | --- | --- |
| H | 3 | 1 | 0 | 2 |
| E | 7 | 4 | 0 | 3 |
| R | 2 | 0 | 0 | 2 |

---

## Criteri go-live Concierge

- [x] C-H1 PASS con 544284
- [x] C-E1 PASS (no posologia)
- [x] C-E5 PASS (red flag + accoglienza, no triage)
- [x] C-E6 o C-E7 PASS (follow-up minimo) — entrambi PASS
- [x] Mai 537990 sul percorso Concierge (osservato: solo 544284)
- [x] Prompt Spoki allineato al file repo

**Esito sessione 20/07/2026:** percorso critico Concierge **validato** per go-live. Opzionali rimasti: C-H2, C-H3, C-E2, C-E3, C-E4, C-R1/C-R2.
