# Dimann 47493 — Test suite playground HCP

**Account Spoki:** 47493  
**Agente:** Agente HCP  
**Prompt:** [`47493 - Agente HCP.md`](47493%20-%20Agente%20HCP.md)  
**KB:** nessuna associata (test sul prompt)  
**Verifica Spoki:** [`47493-dimann-spoki-verifica.md`](47493-dimann-spoki-verifica.md)

---

## Come iniziare ora

1. Playground agente **HCP** (non Trigger / Concierge).
2. Contatto con tag **HCP**.
3. Clear conversation tra scenari.
4. Checklist: sempre **Lei** · **zero emoji** · no diagnosi / terapie.

### Automazioni

| Evento | 537990 |
| --- | --- |
| Ramo 1 / 3 / 4 chiusura | Sì |
| Ramo 2 problema ordine campioncini | Sì |
| Ramo 2 solo form compilato / OK | **No** |

### Ordine consigliato

1. **H-H1** (ramo 1) → Clear  
2. **H-H2** (ramo 2 form) → Clear  
3. **H-H3** (ramo 3) → Clear  
4. **H-H4** (ramo 4) → Clear  
5. **H-E1** (libero campioncini) → Clear  
6. **H-E2** (tono Lei) — osservazionale su tutti i test  

Incolla qui le risposte per Pass/Fail.

---

## Setup

- Tag HCP presente
- Messaggio iniziale = testo trigger HCP **non modificato** (per menu), oppure testo libero per H-E1
- Annotare il testo trigger esatto usato in playground:

```
Invia ESATTAMENTE QUESTO MESSAGGIO per iniziare una conversazione HCP con Dimann
```

Se il playground non ha il pulsante reale, usare una frase convenuta che l’agente tratta come trigger non modificato (come per Triage), oppure partire direttamente con `1`/`2`/`3`/`4` dopo un messaggio che apre il menu.

---

## H — Happy path per ramo

| ID | Passi | Atteso | 537990 | Pass | Note |
| --- | --- | --- | --- | --- | --- |
| H-H1 | Trigger → menu → `1` → caso paziente completo → chiusura | Menu apertura Lei; domanda caso; chiusura verbatim-ish + 537990 | Sì | **Pass** | 20/07 — flusso completo; 537990 OK; Lei; no emoji |
| H-H2 | Trigger → `2` → conferma form OK | Link `https://mailchi.mp/dimann.com/area-medici`; **no** 537990 | No | **Pass** | 20/07 — form OK; chiusura cortese; 537990 non parte |
| H-H3 | Trigger → `3` → argomento → mattina/pomeriggio → chiusura | Due domande poi chiusura + 537990 | Sì | **Pass** | 20/07 — flusso exact; 537990 OK |
| H-H4 | Trigger → `4` → descrizione → chiusura | Chiusura + 537990 | Sì | **Pass** | 20/07 — exact; 537990 OK |

### H-H1 — script

1. Invia trigger HCP (non modificato) → atteso menu 1–4 (Lei, no emoji).  
2. Scrivi: `1`  
3. Atteso: testo «La ascolto, mi descriva pure il caso…»  
4. Scrivi un caso completo, es.:

```
Paziente 42 anni, ciclo regolare, cistite ricorrente ogni 2-3 mesi, urinocoltura negativa l'anno scorso, ha già fatto cicli di antibiotici, non ha usato Dimann. Chiedo quale protocollo consigliate in profilassi.
```

5. Se chiede gap: rispondi e attendi chiusura.  
6. Atteso chiusura: ringrazia + passata alle colleghe + **537990**.

### H-H2 — script

1. Trigger → `2`  
2. Atteso: form mailchi + offerta aiuto su ordini precedenti.  
3. Scrivi: `Perfetto, procedo con il form, grazie`  
4. Pass: chiusura senza 537990 (o nessun trigger_automation).

### H-H3 — script

1. Trigger → `3`  
2. `Vorrei parlare della gamma prodotti e della distribuzione in farmacia`  
3. `Mattina`  
4. Atteso chiusura informatore + **537990**.

### H-H4 — script

1. Trigger → `4`  
2. `Vorrei sapere se organizzate eventi ECM quest'anno`  
3. Atteso: ascolto + chiusura + **537990**.

---

## E — Edge

| ID | Input | Atteso | 537990 | Pass | Note |
| --- | --- | --- | --- | --- | --- |
| H-E1 | `Buongiorno, mi servono i campioncini Dimann per lo studio` | **Niente menu**; diretto ramo 2 + link form | No (se solo form) | **Pass** | 20/07 — skip menu OK |
| H-E2 | Qualsiasi ramo | Mai «tu»; mai emoji | — | | Osservazionale |
| H-E3 | Ramo 2: `Il pacco campioncini non è mai arrivato, ordine di marzo` | Ascolto + chiusura + **537990** | Sì | | |
| H-E4 | Ramo 1 caso incompleto (solo «cistite ricorrente») | Gap fill **una domanda alla volta** | Dopo chiusura | | |

---

## Esiti esecuzione

**Data setup:** 20 luglio 2026  
**Stato:** prompt in repo; **nessuna KB**; playground pronto — inizia da **H-H1**.

| ID | Pass | Note |
| --- | --- | --- |
| H-H1 | **Pass** | Menu + caso + chiusura + 537990; Lei; no emoji |
| H-H2 | **Pass** | Form mailchi; no 537990 |
| H-H3 | **Pass** | Argomento + fascia + chiusura + 537990 |
| H-H4 | **Pass** | Descrizione + chiusura + 537990 |
| H-E1 | **Pass** | Skip menu; form diretto |
| H-E2 | **Pass** | Lei + no emoji su tutti i test H |
| H-E3 | ☐ | |
| H-E4 | ☐ | |

### Log

```
Prompt sync: sì (verbatim 20/07)
KB: nessuna associata — test sul solo prompt
Primo test playground: H-H1
```

---

## Riepilogo

| Sezione | Totale | Pass | Fail | Non eseguito |
| --- | --- | --- | --- | --- |
| H | 4 | 4 | 0 | 0 |
| E | 4 | 2 | 0 | 2 |

---

## Criteri go-live HCP (minimi)

- [x] H-H1 PASS + 537990
- [x] H-H2 PASS senza 537990 (solo form)
- [x] H-H3 PASS + 537990
- [x] H-E1 PASS (skip menu)
- [x] Sempre Lei, zero emoji (osservato su H-H1…H-H4 + H-E1)
- [x] Nessuna KB da importare (confermato)

**Esito sessione 20/07/2026:** percorso critico HCP **validato**. Opzionali: H-E3 (problema ordine campioncini + 537990), H-E4 (gap fill ramo 1).
