# Boldrin Group 43885 — Test suite playground/live Agente Vendita (chiusura estiva)

**Account Spoki:** 43885  
**Agente:** Custom — Agente Vendita Boldrin (variante chiusura estiva, copia di test)  
**Prompt:** [`43885-boldrin-group-prompt-v3-chiusura-estiva.md`](43885-boldrin-group-prompt-v3-chiusura-estiva.md)  
**Tool catalogo:** `PS Spoki v2.0`  
**KB:** nessuna (catalogo solo via tool)

Si testa **solo** la sezione `# System prompt (Spoki)` del prompt chiusura estiva. Non inventare criteri assenti dal prompt. Questo agente ha la chiusura estiva **sempre attiva**: non richiedere `get_current_datetime` per decidere l’handover.

**Messaggio handover estivo atteso (must-have su T1 / N1 / E1):**

> Assistenza (in chat) + email `info@boldrintech.it` + pausa estiva 10–21 agosto + ordini eCommerce dal 1 agosto evasi dal 25 agosto.  
> Nessuna data di riapertura inventata. Nessun tempo di risposta preciso.

---

## Come iniziare ora

1. Playground sull’agente **copia di test** chiusura estiva (non sull’agente vendite normale / v2).
2. Sync prompt: incollare solo `# System prompt (Spoki)` da [`43885-boldrin-group-prompt-v3-chiusura-estiva.md`](43885-boldrin-group-prompt-v3-chiusura-estiva.md).
3. Clear conversation tra scenari se possibile; altrimenti recovery (“nuova richiesta, dimentica il contesto precedente”).
4. Checklist: **una domanda alla volta** in raccolta info · prodotti **solo** da `PS Spoki v2.0` · URL dal campo `url` (+ `/it/` o `/en/` se manca) · Codice articolo = solo `reference` · handover = messaggio **estivo** (non quello “fuori chiusura”).
5. Ordine P0: **H1 → C1 → T1 → N1 → E1** → Clear tra ciascuno.
6. Solo dopo P0 verdi: P1 (Q1, Q2, Y1, R1, P1, U1), poi P2 (L1, E2).

---

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Agente = copia di test chiusura estiva (account 43885), non live vendite normale | ☐ |
| 2 | Prompt sync = sezione `# System prompt (Spoki)` di [`43885-boldrin-group-prompt-v3-chiusura-estiva.md`](43885-boldrin-group-prompt-v3-chiusura-estiva.md) | ☐ |
| 3 | Tool `PS Spoki v2.0` collegato e funzionante (query + language) | ☐ |
| 4 | `get_current_datetime` **non** obbligatorio per chiusura (se presente: non deve disattivare l’handover estivo) | ☐ N/A o OK |
| 5 | Handover = messaggio (Assistenza + email) **e** `transfer_to_human` nello stesso turno; dopo transfer niente altri messaggi AI | ☐ |
| 6 | Contatto playground con telefono valorizzato | ☐ |
| 7 | Clear conversation disponibile tra scenari | ☐ |

---

## Mismatch / platform findings

| Area | Prompt | Reality | Note |
| --- | --- | --- | --- |
| Catalogo | Solo `PS Spoki v2.0` | Dipende da Prestashop live | Skip se tool down |
| Catalogo EN | Query con language=en | 2 query regolatore GPL Italia → “No products…” | L1: gap catalogo/query EN; URL `/en/` non verificabile |
| Codice articolo | Solo campo `reference` | Payload `search_products` **senza** `reference` (solo `id` numerico es. 514) | Agente deve omettere riga Codice articolo; R1/E2 limitati finché il tool non espone reference |
| URL lingua | Aggiungere solo `/it/` o `/en/` dopo dominio se mancante | Tool restituisce url senza `/it/` (es. `…/514-….html`); agente aggiunge `/it/` | 04/08 C1 OK |
| Handover | Messaggio Assistenza + email + `transfer_to_human` stesso turno; pausa AI post-transfer | Platform: transfer senza messaggio poteva bloccare la chat (fix Text Agents) | Fail se manca messaggio, Assistenza, o transfer |
| Chiusura | Sempre attiva in questo agente | Calendario reale può essere fuori 10–21 agosto | E1: deve comunque usare messaggio estivo |
| Handover EN | Stessa lingua del cliente | Blocco estivo hardcodato in IT | L1 Fail 04/08 |

---

## Ordine consigliato

### P0

1. **H1** — raccolta info senza tool  
2. **C1** — codice articolo trovato (happy path catalogo)  
3. **T1** — post-vendita → handover estivo  
4. **N1** — prodotto non in catalogo → handover estivo  
5. **E1** — handover fuori calendario reale → comunque messaggio estivo  

### P1

6. **Q1** accessori solo da tool · **Q2** seconda query · **Y1** conferma “sì grazie” · **R1** codice già proposto · **P1** prezzo · **U1** scheda senza URL  

### P2

7. **L1** inglese · **E2** id numerico ≠ codice articolo  

---

## H — Raccolta informazioni

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| H1 | Cerco riduttore senza dati | Una domanda (GPL/metano); **non** chiama `PS Spoki v2.0`; non cita prodotti | **Pass** | 04/08: chiede GPL/metano; no tool; no prodotti |

### H1 — script (P0, primo)

1. Clear.  
2. Invia:

```
Cerco un riduttore di pressione.
```

3. Atteso: chiede tipo di gas (GPL o metano) o altra domanda minima famiglia; **nessuna** chiamata tool; nessun nome/prezzo/link prodotto.

---

## C — Codice articolo / catalogo

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| C1 | Voglio comprare RG001.35 | Chiama `PS Spoki v2.0` (query codice, language it); scheda con title, reference, prezzo da priceV2, Scheda prodotto con URL tool (+ `/it/` se manca); non handover | **Pass** | 04/08: tool OK; `/it/` aggiunto su url; prezzo 5.64 vs 11.27 OK; `reference` assente nel payload → riga Codice articolo correttamente omessa |

### C1 — script (P0)

1. Clear.  
2. Invia:

```
Voglio comprare RG001.35.
```

3. Atteso: tool call nello stesso turno; proposta completa; URL non inventato; Codice articolo = `reference` (non id numerico).  
4. Se tool vuoto dopo 2 query: non inventare; handover estivo → segnare **Skip** o **Pass\*** solo se handover corretto, e annotare gap catalogo.

---

## T / N / E — Handover estivo

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| T1 | Post-vendita stato ordine | Handover estivo; **non** chiama `PS Spoki v2.0`; non inventa tracking; invita Assistenza + `info@boldrintech.it`; cita chiusura 10–21 agosto e evasione dal 25/08 | **Pass** | 04/08: messaggio estivo completo; no catalogo |
| N1 | DIVAL 160 non in catalogo | Max 2 query tool; non propone modelli a memoria; messaggio “non in catalogo” + handover estivo | **Pass** | 04/08: non inventa; handover estivo OK (log 2ª query non verificato) |
| E1 | Handover con data reale fuori 10–21 agosto | Usa comunque messaggio estivo; **Fail** se salta la chiusura perché “non è agosto” o se chiama `get_current_datetime` per disattivarla | **Pass** | 04/08 (fuori intervallo): messaggio estivo comunque usato |

### T1 — script (P0)

1. Clear.  
2. Invia:

```
Dove è il mio ordine? Non ho ricevuto la merce.
```

3. Atteso: messaggio handover estivo (Assistenza + email + 10–21 agosto + evasione dal 25 agosto). Nessun tool catalogo. Nessuna promessa di tempi di risposta precisi.

### N1 — script (P0)

1. Clear.  
2. Invia:

```
Mi serve un DIVAL 160.
```

3. Atteso: chiamate `PS Spoki v2.0` (fino a 2 query). Se entrambe vuote (o nessun DIVAL 160 coerente): non inventa URL; handover estivo.  
4. **Fail** se propone DIVAL 500 (o altro) come equivalente senza spiegare differenze / senza conferma.

### E1 — script (P0)

1. Clear.  
2. Invia (stesso intento di T1, in un giorno di test fuori dal 10–21 agosto):

```
Ho bisogno di parlare con un operatore per una fattura.
```

3. Atteso: **stesso** messaggio estivo (chiusura attiva).  
4. **Fail** se usa solo il messaggio “fuori chiusura” senza email/pausa estiva, o se ragiona sulla data corrente per omettere la chiusura.

---

## Q / Y / R / P / U — Guardrail catalogo (P1)

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| Q1 | Accessori 20×1,5 dx | Chiama tool; elenca **solo** prodotti nei risultati, ciascuno con url; non inventa raccordi | **Pass** | 04/08: 4 item tutti in payload (80,1624,1511,76); `/it/` OK; prezzi OK |
| Q2 | Inversore manuale 20×1,5 | Se prima query vuota → seconda query diversa prima di “non in catalogo”; handover estivo solo se entrambe vuote | **Pass** | 04/08: 1ª query `inversore manuale 20x1,5` → id 1571; URL `/it/` OK; prezzo 28,23 |
| Y1 | Conferma “sì grazie” | Dopo offerta “ti serve anche X?”, propone X (tool se serve); non cambia argomento | **Pass** | 04/08: 2 tool nello stesso turno (`manichetta 20x1,5 gpl` + `raccordo 20x1,5 gpl`); entrambi i prodotti nei risultati; URL `/it/` OK |
| R1 | Codice già proposto AB110.00 | Conferma corrispondenza; non dice “non in catalogo” | **Pass** | 04/08: conferma AB110.00 = chiave già proposta (id 1600); tool recall OK; + handover estivo per quotazione (amount 0) |
| P1 | Prezzo compareAtPrice / amount 0 | Solo priceV2; se compareAtPrice diverso mostra sconto; se amount 0 → “Quotazione su richiesta” (mai € 0,00) | **Pass** | 04/08: C1 sconto OK; Q2 solo priceV2; R1 prep amount 0.0 → “Quotazione su richiesta” |
| U1 | Prodotto senza campo url | Non scrive “Scheda prodotto:” vuota; non invita a cliccare link | **Skip** | 04/08: playground non consente mock payload senza url |

### Q1 — script

1. Clear.  
2. Invia:

```
Tutti gli accessori per connessione 20×1,5 dx
```

3. Atteso: tool call; solo item restituiti; ogni scheda con URL reale. **Fail** se aggiunge prodotti assenti dai risultati.

### Q2 — script

1. Clear.  
2. Invia:

```
Hai un inversore manuale per il 20x1,5?
```

3. Atteso: prima query tipo “inversore manuale 20x1,5”; se vuota, seconda (es. CT150 / descrizione). “Non in catalogo” solo dopo entrambe vuote + handover estivo.

### Y1 — script (multi-turno)

1. Clear.  
2. Portare la conversazione fino a una proposta con fascetta/tubo (o simile) e domanda “Ti serve anche …?”. Se serve, guidare con:

```
Cerco una fascetta per tubo GPL.
```

poi rispondere alle domande minime una alla volta finché propone e chiede se serve anche il tubo.  
3. Invia:

```
sì grazie
```

4. Atteso: propone il tubo (o X offerto); richiama tool se necessario; non chiede portagomma o altro non richiesto.

### R1 — script (multi-turno)

1. Clear.  
2. Ottenere una proposta di chiave/antiscintilla con `reference` AB110.00 (query catalogo se serve).  
3. Invia:

```
La ab110.00 va bene?
```

4. Atteso: conferma che è lo stesso prodotto già indicato; scheda con reference + url; **non** “non in catalogo”.

### P1 — script

1. Clear.  
2. Invia un codice noto con prezzo (es. RG001.35 come C1, o altro disponibile).  
3. Atteso: prezzo allineato a `priceV2.amount`; se `compareAtPrice` valorizzato e diverso → mostra entrambi; se amount 0 → quotazione su richiesta.

### U1 — script

1. Clear.  
2. Solo se in Langfuse/playground si vede un risultato tool **senza** `url`: verificare che l’agente non emetta “Scheda prodotto:” vuota né “puoi cliccare sui link”.  
3. Se non riproducibile: **Skip** + nota platform.

---

## L / E2 — Lingua e edge (P2)

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| L1 | Primo messaggio in inglese | Risponde in EN per tutta la chat; se propone prodotto, URL con `/en/` se mancava nel tool | **Pass** | 04/08 re-test post patch: handover estivo intero in EN; URL `/en/` ancora N/A (non raggiunto prodotto) |
| E2 | Id numerico come codice | Non usa id PrestaShop (es. 525) come “Codice articolo”; solo `reference` o omette la riga | **Pass** | 04/08: tool vuoto su “525”; non inventa; chiede codice commerciale; handover estivo; nessuna riga Codice articolo con id |

### L1 — script

1. Clear.  
2. Invia:

```
I need a pressure regulator for LPG.
```

3. Atteso: inglese; una domanda alla volta; se arriva a proposta, language=`en` sul tool e URL `/en/` se necessario.

### E2 — script

1. Clear.  
2. Invia:

```
Voglio il prodotto 525
```

3. Atteso: cerca via tool; se trova prodotto, Codice articolo = `reference` (mai “525” come codice articolo se 525 è solo id). Se non trova: non inventa; handover estivo dopo query ammesse.

---

## Fix e re-test

| Data | ID fail | Patch prompt | Re-test |
| --- | --- | --- | --- |
| 04/08 | L1 | Messaggio handover estivo IT + EN; regola lingua obbligatoria; sync 4/08 patch L1 | **Pass** re-test |

---

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| H1 | P0 | **Pass** | 04/08 |
| C1 | P0 | **Pass** | 04/08: reference assente nel tool → riga omessa OK |
| T1 | P0 | **Pass** | 04/08 |
| N1 | P0 | **Pass** | 04/08 |
| E1 | P0 | **Pass** | 04/08: chiusura sempre attiva |
| Q1 | P1 | **Pass** | 04/08 |
| Q2 | P1 | **Pass** | 04/08 |
| Y1 | P1 | **Pass** | 04/08: 2 query tool stesso turno |
| R1 | P1 | **Pass** | 04/08 |
| P1 | P1 | **Pass** | 04/08: anche amount 0 su id 1600 |
| U1 | P1 | **Skip** | mock url assente non disponibile |
| L1 | P2 | **Pass** | 04/08 re-test: handover EN OK |
| E2 | P2 | **Pass** | 04/08 |

---

## Criteri pronto

- [ ] Pre-check Spoki completo (tool `PS Spoki v2.0` OK)
- [x] P0 (H1, C1, T1, N1, E1) Pass o Skip documentati
- [x] T1 e E1 usano messaggio estivo con `info@boldrintech.it` (senza dipendere dalla data reale)
- [x] Nessun Fail aperto su inventare prodotti / URL / codice = id numerico
- [x] Fail L1 risolto (handover estivo in lingua cliente)
- [x] P1 critici (Q1, Q2) eseguiti o Skip motivati
- [x] R1 / P1 / E2 Pass; U1 Skip
- [x] Prompt sync aggiornato in Spoki dopo eventuali patch (L1 EN handover)
