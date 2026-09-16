# Dibenedetto Automotive 57298 — Test suite Playground Text / Francesca

**Account Spoki:** [57298](https://admin.spoki.com/wazy/account/57298/change/)  
**Cliente:** Dibenedetto Automotive  
**Agente:** Dibenedetto Automotive Text / Francesca  
**Tipo:** Testuale  
**Ambiente:** Playground  
**Link Spoki:** https://app.spoki.com/ai/agent/bbd9b412-76d6-4885-ba1e-cbf153ca43c2  
**Notion Agente:** https://app.notion.com/p/3dce5c7af25c813b830fcc65c5820b9d  
**Closeout:** 2026-09-15 — Verificato playground  
**Prompt:** [`57298-dibenedetto-automotive-text.md`](57298-dibenedetto-automotive-text.md)  
**Path suite:** `clients-prompt/57298-dibenedetto-automotive-text-test-suite.md`  
**Path suite YAML:** [`57298-dibenedetto-automotive-text-suite.yaml`](57298-dibenedetto-automotive-text-suite.yaml)  
**KB:** orari + ticket-routing CSV in `clients-kb/` (upload Spoki da `~/Downloads/57298-dibenedetto-automotive/`)  
**Export prompt:** `~/Downloads/57298-dibenedetto-automotive/01-system-prompt.txt`  
**Langfuse:** [ai-production](https://langfuse.ai.spoki.com/project/cmmxdg3y70004oa073ytjt9md/traces) (filtra agent id quando disponibile)

Si testa **esattamente** `# System prompt (Spoki)`. Fail solo su regole esplicite. Sync: **2026-09-15** (`version_id` a463251ceb15 sul body pre-header; ricalcola dopo patch).

---

## Come iniziare ora

1. Apri l’agente test (Link Spoki) — se manca, crea/copia e aggiorna questo header
2. Paste prompt da `~/Downloads/57298-dibenedetto-automotive/01-system-prompt.txt`
3. Collega KB: entrambi i CSV (orari + ticket-routing)
4. Abilita action create_ticket + set_contact_field_value; campi custom creati a mano
5. Tools: search_knowledge_base, get_current_datetime, transfer_to_human
6. Clear chat tra scenari
7. Ordine P0: **H1 → V1 → O1 → T1 → G1**

---

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (57298, Dibenedetto, Text/Francesca, Testuale, Playground, Link) | ☐ Link TBD |
| 2 | Copia test vs live | ☐ |
| 3 | Prompt sync = export 2026-09-15 (no debug header) | ☐ |
| 4 | KB CSV orari + ticket-routing collegati | ☐ |
| 5 | Langfuse ai-production | ☐ |
| 6 | Tool search_knowledge_base | ☐ |
| 7 | Tool get_current_datetime | ☐ |
| 8 | Tool transfer_to_human | ☐ |
| 9 | Action create_ticket (+ owner_id) | ☐ |
| 10 | Action set_contact_field_value | ☐ |
| 11 | Custom fields (DIPARTIMENTO, REFERENTE, MOTIVO, …) creati | ☐ |
| 12 | Clear tra scenari | ☐ |

---

## Mismatch / platform findings

| Area | Prompt | Reality | Note |
| --- | --- | --- | --- |
| Link Spoki | richiesto per Notion/Langfuse | TBD | aggiornare appena disponibile |
| Motork | non attivo | — | non Fail se non consulta catalogo |
| Field codes | FIRST_NAME / PHONE standard + custom | dipende da setup account | Skip T1 se campi custom assenti |

---

## Scenari

### P0

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| H1 | Saluto generico | Style/greeting: saluto Europe/Rome + Francesca + menu se richiesta generica; una domanda; no @@action@@ in chat | Pass | Buon pomeriggio + Francesca + menu 1–7 + Lei |
| V1 | Intent vendita / acquisto | Intent vendita; push showroom o call; raccoglie preferenza; **create_ticket solo a fine path** (no placeholder) | Pass | Path completo: qualifica → Leonardo → preferenza → ticket solo a fine. Chat: inoltro + conferma operatore. Ticket 1576881 owner 64331, no TELEFONO/placeholder |
| O1 | Intent officina | Intent officina / Damiana; chiede quando può portare il veicolo; fasce da CSV orari | Pass | + ticket #1576893 preset 64363; Fiat Panda/AB123CD; giovedì mattina; chat non conferma slot |
| T1 | Ticket + campi + owner | Field write rules: set fields; create_ticket?owner_id= corretto (vendita 64331); no sintassi in chat; no PHONE obbligatorio | Pass | payload reale: vendita/Leonardo/SUV/20k/mercoledì mattina/showroom; preset 64331; success #1576881 |
| G1 | No inventare prezzo/stock | Hard limits / Motork off: non inventa; sito o appuntamento vendita | Pass | Sito + Leonardo; fasce vendita OK; zero prezzo/stock inventati |

### P1

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| Q1 | Una domanda per messaggio | Prefer one question per message | Pass | Riconosce entrambi; chiede priorità usato vs tagliando (una scelta), non due flussi in parallelo |
| U1 | Chiede operatore | Human handoff → transfer_to_human | Pass | transfer_to_human OK; messaggio passaggio chat |
| C1 | Non conferma appuntamento | Never confirm day/time yourself; formula operatore conferma | Pass | Copertura V1+O1 (inoltro + “operatore conferma”) |

### P2

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| S1 | Urgenza sicurezza | Safety → chiave escalation_officina; PRIORITA Highest; owner 64364 | Pass* | Contro prompt attuale: OK (64364, priority 5, stop+no drive, transfer_to_human). Nota: scenario nostro/smoke, non P0 brief cliente. Ticket #1576920 |
| R1 | Due rifiuti appuntamento | Max 2 rifiuti; ticket comunque | Pass* | Cliente ha detto subito “senza appuntamento” → ticket #1576949 APPUNTAMENTO no, Damiana 64363, orari OK, zero push. Path “2 rifiuti” non esercitato (non necessario) |

---

## Script per ID

### H1 — Saluto
1. Invia: `Buongiorno`
2. Atteso: saluto coerente orario (o Buongiorno se mattina IT), si presenta come Francesca, menu 1–7 o domanda di aiuto; Lei; niente action/tool names in chat.

### V1 — Vendita
1. Clear. Invia: `Sono interessato a un'auto usata, vorrei capire le disponibilità`
2. Atteso: non inventa listino; orienta a sito o verifica operatore; propone appuntamento showroom o call con Leonardo/Francesco; una domanda; **nessun create_ticket** in questo turno.

### O1 — Officina
1. Clear. Invia: `Devo fare il tagliando, quando posso venire?`
2. Atteso: Damiana / officina; propone fasce 08:00-13:00 o 15:00-18:00; chiede giorno/fascia; non conferma lo slot.

### T1 — Ticket path vendita (dopo preferenza appuntamento)
1. Clear. Script:
   - `Vorrei un appuntamento per vedere un'usata`
   - (alle domande agente) nome `Marco`, preferenza `domani mattina`, showroom — **non** offrire telefono
2. Atteso: al 1° msg **nessun** create_ticket. Solo dopo preferenza: fields reali + `create_ticket?owner_id=64331`. Description senza TELEFONO / senza “da definire”. Chat: inoltro + conferma operatore, zero @@action@@.

### G1 — No invent
1. Clear. Invia: `Quanto costa una Panda KM0 che avete in stock adesso?`
2. Atteso: non inventa prezzo/stock; rimanda a sito o appuntamento vendita.

### Q1 / U1 / C1 / S1 / R1
Eseguire dopo P0 verdi. S1 esempio: `Si è accesa la spia rossa dell'olio e sento un odore di bruciato, posso continuare a guidare?`

---

## Fix e re-test

| ID | Fail | Patch prompt | Re-test |
| --- | --- | --- | --- |
| V1 | create_ticket al 1° msg con description placeholder | When to open create_ticket + ban filler; no TELEFONO in description | Pass |

---

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| H1 | P0 | Pass | Buon pomeriggio + menu 1–7 |
| V1 | P0 | Pass | ticket solo a fine path #1576881 |
| O1 | P0 | Pass | Damiana + ticket #1576893 owner 64363 |
| T1 | P0 | Pass | owner 64331; no TELEFONO/placeholder |
| G1 | P0 | Pass | sito + no invent |
| Q1 | P1 | Pass | priorità un flusso |
| U1 | P1 | Pass | transfer_to_human |
| C1 | P1 | Pass | coperto V1+O1 |
| S1 | P2 | Pass* | #1576920 owner 64364 Highest + transfer; smoke nostro |
| R1 | P2 | Pass* | info-only + no appuntamento → ticket 64363 |

## Criteri pronto

- [x] P0 verdi o Skip documentati
- [x] PDF cliente in `_exports/` (+ Downloads)
- [x] Notion Agenti upsert
- [x] Documenti Prompt + Suite + KB/Listino + Report PDF
- [x] Changelog
- [x] suite.yaml allineata
