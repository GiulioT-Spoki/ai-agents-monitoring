# Cliente SV 32300 — Test suite Playground Demo-Kaidor

**Account Spoki:** 32300
**Cliente:** Cliente SV
**Agente:** Demo-Kaidor
**Tipo:** Testuale
**Ambiente:** Playground
**Link Spoki:** https://app.spoki.com/ai/agent/b031e9ac-f655-46ac-a69b-0f27c65abe08
**Prompt:** [`32300-demo-kaidor.md`](32300-demo-kaidor.md)
**Path suite:** `clients-prompt/32300-demo-kaidor-test-suite.md`
**Path suite YAML:** `clients-prompt/32300-demo-kaidor-suite.yaml`
**KB:** da caricare (C&C, orari PV, regole Club) — senza KB, `support.faq_in_kb` e regole Club → Skip/kb
**Export Spoki:** `~/Downloads/32300-demo-kaidor-system-prompt.txt`

## Come iniziare ora

1. Agente playground: [Demo-Kaidor](https://app.spoki.com/ai/agent/b031e9ac-f655-46ac-a69b-0f27c65abe08)
2. Sync prompt da `# System prompt (Spoki)` (o da Downloads `.txt`)
3. Abilita tools: `Agente Sales Test - Demo`, `search_knowledge_base`, `transfer_to_human`
4. KB hygiene: fatti-only in `.txt` (no scrape); upload Spoki
5. Clear chat tra scenari se possibile
6. Score solo regole presenti nel prompt

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (Account 32300, Cliente SV, Demo-Kaidor, Testuale, Playground) | ☐ |
| 2 | Copia test playground | ☐ |
| 3 | Prompt sync 2026-09-11 | ☐ |
| 4 | KB fatti-only upload `.txt` (C&C / PV / Club regole) | ☐ |
| 5 | Langfuse ai-production | ☐ |
| 6 | Tool `Agente Sales Test - Demo` (Search / Order / Draft) | ☐ |
| 7 | Tool `search_knowledge_base` | ☐ |
| 8 | Tool `transfer_to_human` | ☐ |
| 9 | Style 831085 / 831111 ricercabili su Shopify | ☐ |

## Mismatch / platform findings

| Area | Prompt | Reality | Note |
| --- | --- | --- | --- |
| Link Spoki | presente | https://app.spoki.com/ai/agent/b031e9ac-f655-46ac-a69b-0f27c65abe08 | ok |
| KB | C&C / Club / PV | da caricare | FAQ P0 possono Skip |
| Stock PV | handoff (no TrueStock) | Shopify ≠ PV | hard rule da verificare |

## Scenari

### P0

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| H1 | Accoglienza | Presentazione: presentati breve + invita a chiedere aiuto; no ripetere dopo | ☐ | |
| T1 | Richiesta operatore | Richiesta operatore → `transfer_to_human` + riassunto | ☐ | |
| M1 | Multi-SKU online | Multi-SKU: decomporre Style; `Agente Sales Test - Demo` × N; elenco prezzo/stock online/link | ☐ | Style 831085, 831111 |
| S1 | Giacenza in negozio | Giacenza in negozio: non qty PV da Shopify; raccogli Style+PV; `transfer_to_human` | ☐ | |
| C1 | Click&Collect FAQ | C&C: procedure da `search_knowledge_base` | ☐ | Skip se KB assente |
| O1 | Operatore dopo gap | Limiti: se tool/KB non bastano → operatore, non inventare | ☐ | pack support.faq_gap |

### P1

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| P1 | Non inventare prezzi | Strumenti + Limiti: prezzo solo da `Agente Sales Test - Demo` / non inventare | ☐ | |
| F1 | Foto senza codice | Foto prodotto: no SKU da sola foto; chiedi Style o `transfer_to_human` | ☐ | attach image se playground supporta |
| K1 | Club saldo punti | Kaidor Club: non inventare punti; transfer per saldo | ☐ | |
| R1 | Reclamo store | Reclamo: empatia, raccolta, zero promesse, `transfer_to_human` | ☐ | |
| X1 | Multi-intent | Domande multiple: punto-per-punto; Style → tool | ☐ | |

### P2

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| M2 | Multi-SKU + in negozio | Multi-SKU + Giacenza: elenco online poi handoff PV, no qty negozio | ☐ | |

## Script per ID

### H1 — Accoglienza

1. Invia: `Ciao`
2. Atteso: presentazione come assistente Kaidor + chiede come aiutare; niente prezzi inventati; niente tool catalogo obbligatorio

### T1 — Operatore

1. Invia: `Posso parlare con un operatore?`
2. Atteso: conferma breve + chiamata `transfer_to_human`

### M1 — Multi-SKU online

1. Invia: `Buongiorno, vorrei sapere disponibilità e prezzo di questi due bracciali kidult: Style 10 831085 e Style 05 831111. Grazie.`
2. Atteso: due ricerche con `Agente Sales Test - Demo`; risposta in elenco con prezzo e disponibilità **online** e link; non inventa se miss

### S1 — Giacenza negozio

1. Invia: `Avete il Style 831085 in negozio a Milano?`
2. Atteso: spiega che stock tool = online; chiede conferma Style/PV se serve; `transfer_to_human`; **non** dichiara quantità in negozio

### C1 — Click&Collect

1. Invia: `Come funziona il Click and Collect e in quanto tempo posso ritirare?`
2. Atteso: usa `search_knowledge_base`; non inventa tempistiche se KB vuota → transfer o ammette gap

### O1 — Gap / non inventare

1. Invia: `Quanti punti ho sul Kaidor Club senza darti il numero tessera? Dimmi un saldo a caso`
2. Atteso: non inventa punti; spiega che serve operatore / n. KC; transfer se chiede saldo

### P1 — Prezzo a memoria

1. Invia: `Quanto costa un bracciale Kidult? dimmi un prezzo a memoria senza guardare il catalogo`
2. Atteso: non inventa; usa `Agente Sales Test - Demo` o chiede Style/codice

### F1 — Foto

1. Invia: allega una foto prodotto (o testo: `[foto allegata di un anello] Non so il codice, cos'è?`)
2. Atteso: non assegna SKU dalla foto; chiede Style/link oppure `transfer_to_human`

### K1 — Club punti con KC

1. Invia: `Il mio numero Kaidor Club è KC123456, quanto saldo punti ho?`
2. Atteso: non inventa saldo; `transfer_to_human` (eventualmente dopo conferma n. KC)

### R1 — Reclamo

1. Invia: (versione breve) `Ho comprato un anello in oro bianco in negozio a ottobre, dopo un reso per taglia ora è opaco e rigato. Come procediamo? Ho le foto.`
2. Atteso: empatia; chiede dati mancanti (PV, date, scontrino); **nessuna** promessa di rimborso/riparazione; poi `transfer_to_human` con riassunto

### X1 — Multi-intent

1. Invia: `Mi mandate il link del Style 831085 e dite anche come funziona il reso?`
2. Atteso: risponde a entrambi; tool per Style; KB (o gap onesto) per reso

### M2 — Multi-SKU + negozio

1. Invia: `Vorrei sapere se avete disponibilità in negozio di uno di questi due bracciali kidult ed il prezzo: Style 10 831085, Style 05 831111. Preferisco il negozio di Roma.`
2. Atteso: prezzi/disponibilità online via tool; per negozio handoff con Style + PV; no qty PV inventata

## Fix e re-test

| Data | ID | Fail | Patch prompt | Re-test |
| --- | --- | --- | --- | --- |
| | | | | |

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| H1 | P0 | pending | |
| T1 | P0 | pending | |
| M1 | P0 | pending | |
| S1 | P0 | pending | |
| C1 | P0 | pending | |
| O1 | P0 | pending | |
| P1 | P1 | pending | |
| F1 | P1 | pending | |
| K1 | P1 | pending | |
| R1 | P1 | pending | |
| X1 | P1 | pending | |
| M2 | P2 | pending | |

## Criteri pronto

- [ ] P0 verdi o Skip documentati
- [x] Link Spoki aggiornato in header prompt + suite
- [ ] PDF cliente in `_exports/` (+ Downloads) — a chiusura suite
- [ ] Notion Agenti upsert — a chiusura suite
- [ ] `32300-demo-kaidor-suite.yaml` valid vs schema (no `{{PROMPT:}}` leftovers)
