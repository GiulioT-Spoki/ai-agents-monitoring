# Dreaming Sicily 53917 — Test suite playground/live Agente Chat

**Account Spoki:** 53917  
**Cliente:** Dreaming Sicily  
**Agente:** Custom — Agente Chat (copia di test)  
**Prompt:** [`53917-dreaming-sicily-agente-chat.md`](53917-dreaming-sicily-agente-chat.md) (**v3.5** — originale cliente + ops Spoki)  
**KB:** [`53917-dreaming-sicily-kb.txt`](../clients-kb/53917-dreaming-sicily-kb.txt) (upload Spoki; sorgente [`.md`](../clients-kb/53917-dreaming-sicily-kb.md); indice [`kb-index`](../clients-kb/53917-dreaming-sicily-kb-index.md))  
**Actions:** add_tags_to_contact + trigger_automation?automation_id=546258 (Assegnazione operatore)  
**Prompt sync:** 18/08/2026 — v3.5 da sincronizzare (export `~/Downloads/53917-Dreaming-Sicily-Agente-Chat/53917-dreaming-sicily-agente-chat-system-prompt.txt`, ~13.5k / 16k)  
**KB sync:** 12/08/2026 — upload solo `.txt`  
**Backup originale:** `_backups/53917-dreaming-sicily-agente-chat.20260810-141518.md` · **v3.4:** `...20260817-140751-v3.4.md` · **pre-v3.5:** `...20260818-091228-pre-v3.5.md`

Si testa **solo** `# System prompt (Spoki)` **v3.5**.

Checklist tonale v3.5: **una domanda per messaggio** (fail se 2 domande) · max 2 righe · emoji + domanda breve · ascolto attivo · zero leak tool · backtick solo sui tool, mai sulle Action `@@action:…@@` · camere una alla volta · flussi dedicati Crociera/Estero/Minicrociera · SOS/pratica → **Priorita_SOS 158242** (non DA LEGGERE) · chiusura 153150 → riepilogo → 546258 → transfer → stop.

> Re-test obbligatorio in playground **e** chat WhatsApp reale (il cliente ha visto leak/tag fallire in live su v3.4).

---

## Checklist Spoki (pre-test)

| # | Check | OK |
| --- | --- | --- |
| 1 | Un solo agente attivo durante i test | ☐ |
| 2 | Prompt sync = `# System prompt (Spoki)` **v3.5** | ☐ |
| 3 | KB = solo `53917-dreaming-sicily-kb.txt` | ☐ |
| 4 | Tool `search_knowledge_base` | ☐ |
| 5 | Tool `transfer_to_human` | ☐ |
| 6 | Action `add_tags_to_contact` (**non** anche come tool) | ☐ |
| 7 | Action `trigger_automation` → **546258** attiva | ☐ |
| 8 | Tag `Priorita_SOS` **158242** presente in account (API 18/08 OK) | ☐ |
| 9 | Contatto playground con telefono + %%FIRST_NAME%% | ☐ |
| 10 | Clear conversation tra scenari | ☐ |

---

## Come iniziare

1. Sync prompt v3.5 (export Downloads o sezione Spoki dal `.md`).
2. Clear tra scenari.
3. Ordine **P0-FB**: FB3 → FB4 → FB5 → FB6 → FB7 → FB8 → FB9.
4. P0: **H1 → ONE1 → S1 → A1 → SOS1 → PRA1**.
5. P1: SKIP1 · DATE1 · BUD1 · CALL1 · THIRD1 · PRA2 · I1–I3 · PAY1.
6. P2: META1 · N1 · MOTO1/MOTO2 · E1 · ALT1 · EST1 · CRU1 · MINI1 · ROOM1 · PROF1–PROF3 · CLOSE1 · CLOSE2.
7. Ripetere P0-FB su WhatsApp reale.

---

## Scoring senza Langfuse

- Testo: menu, 1 domanda/turno, template, KB, località moto.
- Tag: verifica a posteriori sul contatto.
- 546258 / transfer: effetti visibili (AI ferma, chat assegnata).
- Fail **ONE1 / FB8**: due punti interrogativi o due richieste distinte nello stesso messaggio agente.

---

## Mismatch / platform

| Area | v3.5 | Note |
| --- | --- | --- |
| SOS / pratica | Priorita_SOS **158242** | Creato cliente 18/08; non usare 153212 |
| Moto località | Solo KB (4 con / 3 senza) | No Panarea/Mazara |
| Leak `[call tool …]` | Sezione Azioni interne | Se persiste → Action duplicata come tool |
| Camere | Numero camere → una camera/msg | ROOM1 |
| Crociera / Estero / Minicrociera | Flussi dedicati ripristinati | CRU1 / EST1 / MINI1 |

---

## Scenari

### P0-FB — regressioni feedback cliente

| ID | Criticità | Atteso v3.5 | Pass | Note |
| --- | --- | --- | --- | --- |
| FB3 | Su “ciao” non chiede settore | Menu 4 settori verbatim; Fail se apertura generica | ✅ | playground 18/08 |
| FB4 | Leak `[call tool …]` | Nessun tool/ID/parentesi quadra nel testo | ✅ | + tag 152758; skip destinazione dopo Cefalù |
| FB5 | Risposte lunghe | Max 2 righe, emoji + domanda breve | ✅ | |
| FB6 | Ospiti aggregati | Loop camere una alla volta | ✅ | ROOM1: 3 camere |
| FB7 | Flusso non si chiude | Riepilogo + 546258 + transfer + stop | ✅ | CLOSE1 live ok; CLOSE2 ancora da fare |
| FB8 | Più domande nello stesso msg | Esattamente 1 domanda | ✅ | = ONE1; live ok |
| FB9 | Tag non applicati | Tag settore/sotto/profilo/153150 o 158242 sul contatto | ✅ | live: Hotel+Gruppo+153150 |

### P0 — core

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| H1 | Ciao senza settore | Menu 4 settori; 1 domanda | ✅ | = FB3 |
| ONE1 | Dopo una risposta | Una sola domanda; Fail se 2 | ✅ | = FB8 |
| S1 | “info hotel” | **152758** + destinazione; no menu | ✅ | no menu; Ciao John |
| A1 | Hotel happy path 1 camera | Sequenza; Famiglia **152761**; no 153150 prima della fine | ✅ | Famiglia ok; chiusura + 153150 + 546258 |
| SOS1 | Inclusioni tour specifiche | **158242** → 546258 → transfer → template SOS | ✅ | template SOS; transfer; automation ok; tag Priorita_SOS (non 153212) |
| PRA1 | “aggiungi culla” | Solo richiesta dati; no Action prima dei dati | ✅ | template pratica; cognome intestatario (≠ LAST_NAME contatto) ok |

### P1

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| SKIP1 | Zona+date+ospiti nel 1° msg | Non ri-chiede; passa al campo successivo | ☐ | |
| DATE1 | “fine luglio” | Chiede inizio/fine precisi | ☐ | |
| BUD1 | Budget vago | Chiede cifra massima | ☐ | |
| CALL1 | Vuole chiamata | Template chiamata | ☐ | |
| THIRD1 | Conferma altro numero | Template terzi | ☐ | |
| PRA2 | Dopo PRA1: dati completi | **158242** → 546258 → transfer; no 153150 | ✅ | playground 18/08 |
| I1 | “Siete un’agenzia?” | KB: portale/Info Point | ☐ | |
| I2 | Tariffe bambini / nc | KB | ☐ | |
| I3 | Boat & Breakfast / skipper | KB; no SOS | ☐ | |
| PAY1 | Pagamenti generali | KB metodi; no 158242/546258 | ☐ | |

### P2

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| META1 | Ads struttura+date | Solo dato mancante | ☐ | |
| META2 | “info promo” | Chiede riferimento | ☐ | |
| N1 | “gommone” | **152759**+**153749**; 1 domanda/turno | ☐ | |
| MOTO1 | Moto senza patente | 3 tag; località KB senza patente | ☐ | |
| MOTO2 | Moto con patente | 3 tag; 4 località KB; Fail se Panarea | ☐ | |
| E1 | Tour / esperienza | **152760** (+153750 se tour) | ☐ | |
| ALT1 | “Altro” dal menu | Smistamento estero/crociera/altro | ☐ | |
| ROOM1 | Hotel 3 camere | N camere → Camera 1 → 2 → 3; età bimbi | ✅ | = FB6 |
| EST1 | Maldive / estero | **152766**; **aeroporto**; loop camere | ✅ | playground + live: Malpensa in riepilogo; chiusura ok |
| CRU1 | Crociera MSC/Costa | **153051**; compagnia→itinerario→porto→… | ✅ | playground + live: solo Crociere+153150; no Charter |
| MINI1 | Escursione in barca | **152759**+**153750**; costa→porto→gruppo/esclusivo | ✅* | flusso minicrociera ok; tag: Esperienze 152760+153750 (atteso Nautica 152759+153750) |
| PROF1 | 1 adulto | **152928** | ☐ | |
| PROF2 | Coppia esplicita | **152762** | ☐ | |
| PROF3 | Famiglia / Gruppo | **152761** / **152763** | ✅* | ha usato Gruppo 152763 (3 nuclei+bimbi); Famiglia 152761 ok se 1 nucleo |
| CLOSE1 | Fine hotel + anagrafica | **153150** → riepilogo → 546258 → transfer | ✅ | live 3 camere Cefalù; anagrafica saltata |
| CLOSE2 | Dopo transfer | Nuovo msg cliente non riapre flusso | ☐ | FB7 |

---

### Script chiave

#### FB3 / H1
`ciao` → menu Hotel Villaggi Case / Nautica / Esperienze / Altro. Fail se “come posso aiutarti?” o domanda su tour/date.

#### FB4
`Ciao, info hotel a Cefalù` → testo pulito + tag 152758 sul contatto. Fail se `[call tool`, `add_tags`, `@@action`, ID numerici nel testo.

#### ONE1 / FB8
Dopo S1: `Giardini Naxos` → esattamente una domanda (date). Contare `?` e richieste.

#### ROOM1 / FB6
Hotel → `3 camere` → un msg Camera 1, poi 2, poi 3. Fail se totale aggregato adulti/bambini o più camere nello stesso msg.

#### SOS1
`Ciao, cosa include il pacchetto dell'Hotel Baia del Sol?` → **158242** → 546258 → transfer → template SOS. Fail se 153212 o risposta inventata senza transfer.

#### PRA2
Dopo PRA1: `Hotel Villa Athena, 12-19 agosto, Rossi` → **158242** → 546258 → transfer.

#### EST1
`Vorrei un viaggio alle Maldive` → 152766 → destinazione → **aeroporto** → date → n camere → una camera/msg.

#### CRU1
`Vorrei una crociera nel Mediterraneo` → 153051 → MSC/Costa → itinerario → porto → date → n cabine → una cabina/msg → club → tipologia → extra → budget. Fail se accorpa domande.

#### MINI1
`Vorrei un'escursione in barca alle Egadi` → 152759+153750 → costa → porto → gruppo o esclusivo → date.

#### CLOSE1 / CLOSE2
Completare hotel + anagrafica → 153150 + riepilogo consulente + 546258 + transfer. Poi `ok grazie` → Fail se riparte il menu.

#### MOTO1 / MOTO2
Come v3.4: senza patente solo Marina di Ragusa / San Vito / Letojanni; con patente Letojanni / Giardini / Marina di Ragusa / Cefalù.

---

## Dati fittizi

| Campo | Valore |
| --- | --- |
| Nome / Cognome | Marco Bianchi |
| Email | marco.bianchi@example.com |
| Hotel zona | Taormina / Cefalù |
| Date hotel | 10–17 agosto |
| Ospiti 1 camera | 2 adulti, 1 bambino 6 anni |
| ROOM1 | 3 camere (es. 2+1 / 2 / 2+2 età 4 e 9) |
| Trattamento | Mezza pensione |
| Budget | 2500 € totali |
| Pratica | Hotel Villa Athena, 12–19 agosto, Rossi |

---

## Fix log

| Data | ID | Patch | Re-test | Esito |
| --- | --- | --- | --- | --- |
| 12/08/2026 | — | v3.2–v3.4 playground | suite Pass | storico |
| 17/08/2026 | FB3–9 | feedback cliente su v3.4 live | — | Fail cliente |
| 18/08/2026 | — | **v3.5**: originale + ops; flussi dedicati; camere split; Priorita_SOS **158242**; 1 domanda/turno | P0-FB + CRU1/EST1/MINI1/ROOM1 | pending |
| 18/08/2026 | P0-FB | Happy path hotel 3 camere playground | FB3–FB9, H1, ONE1, ROOM1, CLOSE1 | Pass |
| 18/08/2026 | P0 | S1 A1 SOS1 PRA1 PRA2 | suite core | Pass |
| 18/08/2026 | EST1 live | Estero Maldive WhatsApp | B2 | Pass |

---

## Criteri pronto

- [x] Prompt v3.5 in `# System prompt (Spoki)` (~13.5k < 16k)
- [x] Priorita_SOS 158242 in mappa SOS/pratica
- [x] Flussi Crociera / Estero / Minicrociera ripristinati
- [x] Export Downloads aggiornato
- [x] Checklist Spoki nel prompt + in questa suite
- [x] Prompt v3.5 (+fix anagrafica + fix charter) incollato in Spoki
- [ ] Pre-check compilato
- [x] P0-FB verdi in playground (FB3–FB9)
- [x] P0-FB verdi su WhatsApp reale (FB3–FB9, CLOSE1; CLOSE2 pending)
- [ ] Verificato: `add_tags_to_contact` non duplicato come tool
