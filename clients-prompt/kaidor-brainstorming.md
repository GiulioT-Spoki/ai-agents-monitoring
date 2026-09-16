# Kaidor — Shopify-only (Prompt vs Tool vs Handoff)

Brief operativo per agente customer care WhatsApp. Scope: **tutto il fattibile con Shopify**.

## Regola

| Layer | Ruolo |
| --- | --- |
| **Prompt** | Quando chiamare il tool, cosa chiedere, formato risposta, handoff |
| **Tool Shopify** | Dato live catalogo/prezzo/stock online/ordine — nome tool: `Agente Sales Test - Demo` |
| **KB** | Solo statico: FAQ, policy, orari, regole Club. Mai prezzi/stock/punti live |
| **Handoff** | Giacenza PV, saldo Club, vision senza codice, reclami qualità |

Il prompt **non inventa** prezzo, stock o punti. Per catalogo/ordine online chiama sempre `Agente Sales Test - Demo`.

**Fuori scope attivazione:** webhook TrueStock/Huko, lookup live Kaidor Club, vision full-loop.

---

## Matrice casi

| Caso | Prompt | `Agente Sales Test - Demo` | KB | Handoff |
| --- | --- | --- | --- | --- |
| Foto prodotto | Triage: chiedere Style/link; no inventare SKU | Sì, se arriva codice/link | Linee/naming opz. | Sì, se solo foto |
| Multi-SKU prezzo/stock **online** | Decomporre Style; risposta in elenco | Sì (Search Products × N) | No dati live | Se codice assente |
| Giacenza **in negozio** | Chiedere Style + PV; non usare stock Shopify come PV | No per qty PV | Elenco PV (nomi/orari) | Sì — verifica negozio |
| Kaidor Club (n. KC, punti) | Privacy; non inventare saldo | No | Regole Club | Sì — saldo live |
| Reclamo esperienza store | Empatia; raccolta; zero promesse | Opz. Get Order se n. ordine | Policy rese/garanzia | Sì — transfer/ticket |
| Click&Collect / FAQ | KB-first; ordine concreto → tool | Get Order by ID se disponibile | FAQ C&C, tempistiche | Se tracking fallisce |
| Multi-intent / link / carrello | Punto-per-punto; URL/SKU → tool | Search + Draft Order se attivo | Spedizioni/pagamenti | Se tool fallisce |

---

## Blocchi prompt (da incollare)

### Multi-SKU disponibilità e prezzo

```text
### Multi-SKU disponibilità e prezzo
Se il messaggio contiene più Style/codici (es. 831085, 831111):
1. Estrai tutti i codici.
2. Per ciascuno usa il tool `Agente Sales Test - Demo` (ricerca prodotto).
3. Rispondi in elenco: Style | prezzo | disponibilità online | link.
4. Se il cliente chiede disponibilità "in negozio" / "punto vendita": non usare lo stock Shopify come giacenza PV; spiega che verifichi con il negozio, chiedi quale PV e fai transfer-human.
5. Se un codice non esiste: dillo esplicitamente, non inventare.
```

### Foto prodotto

```text
### Foto prodotto
Non identificare lo SKU dalla sola foto.
Chiedi Style, codice o link. Se li fornisce → usa `Agente Sales Test - Demo`.
Se non li ha → transfer-human (la foto resta in chat per l'operatore).
```

### Giacenza punto vendita

```text
### Giacenza in negozio
Lo stock del tool `Agente Sales Test - Demo` è disponibilità online, non giacenza del punto vendita.
Se chiedono disponibilità in negozio: raccogli Style/codice + nome PV, non inventare quantità, transfer-human per verifica.
```

### Kaidor Club

```text
### Kaidor Club
Puoi spiegare regole del Club solo da Knowledge Base (come funziona, livelli, iscrizione).
Non fornire né inventare numero KC o saldo punti.
Per saldo/tessera: raccogli n. KC (o dato richiesto da policy) e transfer-human.
```

### Reclamo / esperienza in store

```text
### Reclamo / esperienza in store
Empatia; raccogli: PV, data acquisto, prodotto, scontrino/ordine, foto, richiesta.
Non promettere rimborso, riparazione o ammissione di colpa.
Se ha numero ordine online → `Agente Sales Test - Demo` (Get Order) solo per contesto.
Poi riassunto strutturato + transfer-human / open-ticket.
```

### Click&Collect / FAQ

```text
### Click&Collect e FAQ operative
Per procedure e tempistiche: usa solo la Knowledge Base.
Se chiede lo stato di un ordine specifico: usa `Agente Sales Test - Demo` (Get Order by ID) con il numero ordine; se manca o fallisce → transfer-human.
```

### Multi-intent / link / carrello

```text
### Domande multiple, link, carrello
Rispondi punto-per-punto a ogni richiesta nel messaggio.
Se c'è URL prodotto o SKU/Style → `Agente Sales Test - Demo`.
Se chiede di preparare un ordine/carrello e Create Draft Order è disponibile → usa il tool; altrimenti guida al checkout o handoff.
Non perdere intent secondari (es. anche una domanda FAQ nello stesso messaggio).
```

---

## Tempistiche installazione

### Lato Kaidor

| Attività | Effort |
| --- | --- |
| FAQ C&C, policy rese/garanzia, regole Club (statiche), orari PV | 2–5 gg lavorativi |
| Conferma Style (es. 831085) ricercabile come SKU/barcode/title su Shopify | 0.5–1 gg |
| Definire inbox / chi riceve transfer e ticket | 0.5 gg |

### Lato Spoki

| Attività | Effort |
| --- | --- |
| Verifica tool `Agente Sales Test - Demo` (Search Products, Get Order, Draft Order) | 0.5 gg |
| Scrittura prompt + hard rules handoff PV/Club/foto | 2–3 gg |
| Upload KB | 0.5–1 gg |
| Transfer / open-ticket / add-note | 0.5 gg |
| Playground + refine | 1–2 gg |
| UAT congiunto sui 7 scenari | 2–3 gg |

**Totale calendar tipico F1:** ~1–1.5 settimane.

### Istruzione AI (passaggi)

1. Abilitare funzioni su `Agente Sales Test - Demo`
2. Incollare i blocchi prompt sopra nel system prompt
3. Caricare KB (C&C, policy, Club regole, orari)
4. Test playground: multi-SKU, link, C&C, foto senza codice, “in negozio”, Club punti, reclamo
5. Fix hard rules dove inventa stock PV o punti
6. UAT con Kaidor
7. Go-live soft + monitoraggio handoff

---

## Costi di attivazione

Pacchetto **Shopify-only** (nessun webhook custom).

| Voce | Incluso | Driver |
| --- | --- | --- |
| **F1 — Attivazione Shopify** | Agente care, prompt, KB, `Agente Sales Test - Demo`, transfer/ticket, UAT | Setup standard + gg prompt/KB/test |
| **Non incluso (fase successiva)** | TrueStock giacenza PV, Club saldo live, Vision full-loop | Custom integration / prodotto vision — stima separata se API disponibili |

In handoff: PV e Club restano **coperti operativamente** (raccolta + operatore), non in autonomia AI.

**Prerequisito demo multi-SKU:** Style Kaidor trovabile da `Agente Sales Test - Demo`. Se il match fallisce, sistemare mapping SKU su Shopify prima del go-live.

---

## Gap espliciti (non quotati in F1)

- Giacenza PV: oggi TrueStock/Huko, non Shopify → handoff
- Kaidor Club saldo: fuori Shopify → handoff (+ regole in KB)
- Vision: fuori MVP → chiedere codice o handoff
