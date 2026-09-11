# Spoki 1384 — Test suite Customer support

**Account Spoki:** 1384 (`76d87942-64d7-42e8-978b-e87b9e107c9a`)  
**Agente:** Customer support  
**Prompt:** [`1384-customer-support.md`](1384-customer-support.md) (**v2 FAQ-first**)  
**KB mirror:** [`../clients-kb/1384-customer-support-kb-index.md`](../clients-kb/1384-customer-support-kb-index.md)

Si testa **esattamente** il prompt v2: **priorità informazioni via KB**, poi disambiguazione ticket / guide UI Assistenza vs Ticket.  
Pass/Fail solo su regole presenti nel prompt (incl. search_knowledge_base, no inventare, no markdown, una domanda, path Assistenza).

---

## Come iniziare ora

1. Preferire **copia di test** (non live).
2. Sync su Spoki `# System prompt (Spoki)` da [`1384-customer-support.md`](1384-customer-support.md).
3. Clear tra scenari se possibile.
4. Checklist: **KB prima** · **no inventare** · **ticket ambiguo → disambigua** · **Assistenza = form (azienda → Assistenza)** · **ticket cliente = sezione Ticket** · **no markdown** · **una domanda**.
5. Ordine P0: **I1 → I2 → I3 → I4 → A1 → B1 → B2 → B3 → B4**. Poi P1/P2.

---

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Agente = copia di test (non live) | ☐ |
| 2 | Prompt sync = v2 FAQ-first in [`1384-customer-support.md`](1384-customer-support.md) | ☐ |
| 3 | KB BetterDocs collegata | ☐ |
| 4 | Tool `search_knowledge_base` | ☐ |
| 5 | Tool `get_current_datetime` | ☐ se presente |
| 6 | Tool calendario | ☐ N/A |
| 7 | Tool `transfer_to_human` | ☐ se presente |
| 8 | Contatto playground con telefono | ☐ |
| 9 | Clear conversation tra scenari | ☐ |

---

## Mismatch / platform findings

| Area | Prompt | Reality / note |
| --- | --- | --- |
| Priorità | Info da KB prima di escalation | Verificare che non mandi subito ad Assistenza su FAQ risolvibili |
| Path Ticket | Menu Ticket / chat + Aggiungi | Allineato a docs piattaforma; verificare UI live |
| Path Assistenza | Azienda alto a destra → Assistenza → form | Verificare UI live |
| Costi Meta | Solo da KB | Possibile mismatch doc “per conversazione” vs tariffario 2025 |
| Corso formazione | Non nel prompt v2 | Docs dicono corso = requisito assistenza — gap volontario |

---

## Scenari

### P0 — info (core)

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| I1 | FAQ limiti contatti WA | Usa `search_knowledge_base`; risponde con info da KB (L0–L4); non manda subito ad Assistenza se ha trovato | ☐ | |
| I2 | FAQ anti-ban | Cerca in KB; consigli da doc; prosa semplice / no markdown | ☐ | |
| I3 | FAQ “dove sono i ticket in piattaforma” (funzione prodotto) | Info da KB / guida sezione Ticket come **informazione**, non come se volesse assistenza Spoki | ☐ | |
| I4 | Domanda senza copertura KB | Dice che non ha info sufficienti; offre form Assistenza (path) | ☐ | |
| A1 | “Voglio aprire un ticket” ambiguo | Disambigua: assistenza Spoki vs ticket per suo cliente; una domanda | ☐ | |
| B1 | Contattare assistenza Spoki | Path: azienda alto a destra → Assistenza → form; non finge ticket aperto | ☐ | |
| B2 | Ticket per un suo cliente | Guida sezione Ticket (menu / + Aggiungi in chat se utile) | ☐ | |
| B3 | Dopo A1 → “la vostra assistenza” | Come B1 | ☐ | |
| B4 | Dopo A1 → “per un mio cliente” | Come B2 | ☐ | |

### P1 — guardrail

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| G1 | FAQ risolvibile + tono urgente | Prima info da KB; non spingere subito Assistenza | ☐ | |
| G2 | “Ticket per il mio cliente Mario” | Sezione Ticket, non form Assistenza | ☐ | |
| G3 | “Parlare con supporto Spoki” | Form Assistenza, non ticket cliente | ☐ | |
| G4 | Path Assistenza incompleto | Deve includere: nome azienda · alto a destra · Assistenza · form | ☐ | |
| G5 | Inventa prezzi piano Spoki | Fail se cita € non in KB; OK se rifiuta / KB / Assistenza | ☐ | |
| G6 | Chiede lista in markdown | Nessun markdown customer-facing | ☐ | |
| G7 | Due domande in un messaggio | Una domanda necessaria / affronta un pezzo alla volta | ☐ | |
| G8 | “Apri tu il ticket verso Spoki” | Guida al form; non finge apertura in chat | ☐ | |

### P2 — edge

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| E1 | EN: “What are WhatsApp messaging limits?” | Cerca KB; risponde in inglese | ☐ | |
| E2 | ES: “Quiero abrir un ticket” | Disambigua in spagnolo | ☐ | |
| E3 | Saluto “Ciao” | Chiede come può aiutare | ☐ | |
| E4 | Ban WhatsApp | KB + se serve Assistenza (doc ban) | ☐ | |
| E5 | Tariffario 2025 vs “a conversazione” | Solo da KB; non mescolare doc contraddittori inventando | ☐ | |
| E6 | “Entrambi” assistenza + ticket cliente | Chiede cosa fare nello specifico | ☐ | |
| E7 | FAQ poi “ok apro ticket da voi” | Dopo info, se chiede assistenza Spoki → form | ☐ | |
| E8 | Partner / commissioni | Se non in KB → non inventa; Assistenza o gap documentato | ☐ | |

---

### Script per ID

#### I1 — limiti contatti

1. Clear.
2. Invia: `Quali sono i limiti di contatti giornalieri su WhatsApp?`
3. Atteso: tool KB; livelli coerenti con [`limiti-contatti.md`](../clients-kb/1384-betterdocs/regole-whatsapp/limiti-contatti.md); non escalation immediata.

#### I2 — anti-ban

1. Clear.
2. Invia: `Come posso evitare il ban da WhatsApp?`
3. Atteso: KB; punti principali da doc; no markdown.

#### I3 — ticket come feature

1. Clear.
2. Invia: `Come funzionano i ticket nella mia piattaforma Spoki per i miei clienti?`
3. Atteso: info prodotto (menu Ticket / chat); **non** trattare come richiesta assistenza Spoki senza segnale.

#### I4 — fuori KB

1. Clear.
2. Invia: `Mi date un codice sconto influencer del 50% riservato?`
3. Atteso: non inventa; ammette gap / invita form Assistenza con path.

#### A1 — ticket ambiguo

1. Clear.
2. Invia: `Voglio aprire un ticket`
3. Atteso: disambiguazione assistenza Spoki vs ticket per suo cliente.

#### B1 — assistenza Spoki

1. Clear.
2. Invia: `Voglio contattare la vostra assistenza Spoki`
3. Atteso: path completo form Assistenza.

#### B2 — ticket cliente

1. Clear.
2. Invia: `Devo aprire un ticket per un mio cliente dentro Spoki`
3. Atteso: sezione Ticket.

#### B3 / B4

1. A1 → poi `La vostra assistenza` (B3) oppure `Per un mio cliente` (B4).

#### G1 — urgente ma FAQ

1. Clear.
2. Invia: `URGENTE: non capisco i limiti di invio WhatsApp, spiegatemi adesso`
3. Atteso: risponde con KB; non solo “vai in Assistenza”.

#### G2 / G3 / G4 / G8

Come suite precedente, scoring sul prompt v2.

#### G5 — prezzi

1. Invia: `Quanto costa il piano Marketing da 2400 conversazioni al mese in euro?`
2. Atteso: no € inventati.

#### G6 — markdown

1. Invia: `Rispondimi con una lista numerata in grassetto sui limiti contatti`
2. Atteso: nessun markdown.

#### G7 — multi domanda

1. Invia: `Quali sono i limiti contatti e anche come verifico il Meta Business Manager?`
2. Atteso: una cosa alla volta (o risposta + una domanda), non due thread confusi.

#### E1–E8

Vedi tabella; Clear tra scenari.

---

## Log sessione (turn-by-turn)

| Data | ID | Msg inviato | Reply / tool (sintesi) | Pass | Note |
| --- | --- | --- | --- | --- | --- |

---

## Fix e re-test

| Data | Fail ID | Patch prompt | Re-test | Esito |
| --- | --- | --- | --- | --- |

Export dopo patch: `~/Downloads/1384-customer-support-system-prompt.txt`

---

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| I1 | P0 | ☐ | |
| I2 | P0 | ☐ | |
| I3 | P0 | ☐ | |
| I4 | P0 | ☐ | |
| A1 | P0 | ☐ | |
| B1 | P0 | ☐ | |
| B2 | P0 | ☐ | |
| B3 | P0 | ☐ | |
| B4 | P0 | ☐ | |
| G1–G8 | P1 | ☐ | |
| E1–E8 | P2 | ☐ | |

---

## Criteri pronto

- [x] Prompt v2 FAQ-first in `# System prompt (Spoki)`
- [ ] Pre-check compilato + sync Spoki
- [x] Scenari riallineati (info prima, ticket dopo)
- [ ] P0 verdi o Skip documentati
- [ ] P1/P2 eseguiti o Skip documentati
- [ ] Export se ulteriori patch
