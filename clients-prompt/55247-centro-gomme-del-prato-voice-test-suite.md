# Centro Gomme — Test suite Playground (9968)

**Account Spoki (playground):** [9968](https://admin.spoki.com/wazy/account/9968/change/)  
**Account Spoki (cliente, target live):** [55247](https://admin.spoki.com/wazy/account/55247/change/) — *non ancora; questa copia andrà sostituita*  
**Cliente:** Centro Gomme del Prato  
**Agente:** Voice inbound — FAQ orari/prezzi/servizi + preventivo soft (copia playground)  
**Tipo:** Vocale  
**Ambiente:** Playground  
**Link Spoki:** https://app.spoki.com/ai/agent/00047b34-32d6-4fb5-8615-6810543012cd  
**Prompt:** [`55247-centro-gomme-del-prato-voice.md`](55247-centro-gomme-del-prato-voice.md)  
**Path suite:** `clients-prompt/55247-centro-gomme-del-prato-voice-test-suite.md`  
**Path suite YAML:** `clients-prompt/55247-centro-gomme-del-prato-voice-suite.yaml`  
**KB (repo):** [`../clients-kb/55247-centro-gomme-kb.md`](../clients-kb/55247-centro-gomme-kb.md) · FAQ · listino CSV  
**KB upload Spoki:** `~/Downloads/55247-centro-gomme-kb.txt` + `…-kb-faq.txt` + `…-listino.csv` (**mai** `.md`)  
**Pattern:** Let’s Move FAQ-from-KB, senza ticket/mail/booking  
**Temperatura:** Deterministica  
**Twin Testuale:** TBD (consigliato per P0 logici; voice playground senza contatto)  
**Prompt sync Spoki:** 2026-09-11 — da confermare paste su 9968

Si testa solo `# System prompt (Spoki)`. Fail se inventa prezzi/orari, fissa appuntamenti, promette mail/ticket, dumpa listino, legge URL/tool names.

**Vocale §3b:** logica FAQ/prezzi/preventivo → twin Testuale (`twin_text`) o messaggi nel playground se disponibile. Overlay voce (`voice_playground`): frasi corte, una domanda, no leak tool. Transfer = Workflow Platform Transfer (**non** tool `transfer_to_human`).

---

## Come iniziare ora

1. Apri https://app.spoki.com/ai/agent/00047b34-32d6-4fb5-8615-6810543012cd (account **9968**)
2. Paste `~/Downloads/55247-centro-gomme-del-prato-voice-system-prompt.txt` + First message + Success criteria
3. Upload KB: `.txt` + `.csv` da Downloads (no `.md`)
4. Tools: `search_knowledge_base`, `get_current_datetime` — niente ticket
5. Workflow: End Call + Platform Transfer (Intent in `04-workflow-intents.txt`)
6. Ideal: crea **twin Testuale** stesso prompt/tools → P0 lì
7. Clear / recovery tra scenari
8. Ordine P0: **H1 → P1 → S1 → Q1 → A1 → G1 → F1**

---

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati: Account 9968, Cliente Centro Gomme, Vocale, Playground, Link UUID | ☐ |
| 2 | Copia playground (non live 55247) | ☐ |
| 3 | Prompt sync = body `# System prompt (Spoki)` | ☐ |
| 4 | First Message inbound OK | ☐ |
| 5 | KB: `kb.txt` + `kb-faq.txt` + `listino.csv` (no scrape/PDF/md) | ☐ |
| 6 | Tool `search_knowledge_base` | ☐ |
| 7 | Tool `get_current_datetime` (Europe/Rome) | ☐ |
| 8 | **Nessun** ticket / mail tool | ☐ |
| 9 | Workflow End Call + Platform Transfer | ☐ |
| 10 | Temperatura Deterministica | ☐ |
| 11 | Langfuse voice-agent (search agent id) | ☐ |
| 12 | Twin Testuale creato (opzionale ma consigliato) | ☐ |

---

## Mismatch / platform findings

| Area | Prompt | Reality | Note |
| --- | --- | --- | --- |
| Transfer | Workflow Platform Transfer | no `transfer_to_human` tool | T1 = accept + stop; Intent Workflow |
| Account | Cliente 55247 | Test su 9968 | Sostituire agente quando ready |
| Voice PG | %%FIELDS%% empty | OK per FAQ | Twin per scala |

---

## Scenari

### H1 — Orari (P0) · `cg.h1` · twin_text / voice_playground

**Utente:** `Che orari fate?`  
**Atteso (FAQ + search_knowledge_base):** Lun–Ven 8–12 e 14–18:30; non inventa sabato.  
**Fail:** orari inventati; URL a voce; listino non chiesto.

| Esito | Finding |
| --- | --- |
| ☑ Pass / ☐ Fail / ☐ Skip | |

### P1 — Prezzo cambio gomme (P0) · `cg.p1`

**Utente:** `Quanto costa il cambio gomme stagionale su cerchi da 17?`  
**Atteso:** listino → 10 € a gomma (16–17); parlato naturale; una fascia.  
**Fail:** inventa €; dump listino; tratta come prezzo prodotto gomme.

| Esito | Finding |
| --- | --- |
| ☑ Pass / ☐ Fail / ☐ Skip | |

### S1 — Servizi (P0) · `cg.s1`

**Utente:** `Fate anche la convergenza e il deposito gomme?`  
**Atteso:** sì entrambi da KB/CSV; breve.  
**Fail:** inventa servizi; propone appuntamento.

| Esito | Finding |
| --- | --- |
| ☑ Pass / ☐ Fail / ☐ Skip | |

### Q1 — Preventivo (P0) · `cg.q1`

**Utente:** `Vorrei un preventivo per quattro gomme nuove.`  
**Atteso:** form sito = testo. Ordine una domanda/turno: **Misura → Stagionalità → Mezzo → Modello**; chiude solo dopo i 4 (o rifiuto esplicito); staff prepara preventivo; no mail/ticket/€ prodotto; no anagrafica step 2.  
**Fail:** salta Modello (o altro campo step 1) e chiude; inventa €; promette email; ticket; slot.

| Esito | Finding |
| --- | --- |
| ☑ Pass / ☐ Fail / ☐ Skip | Re-test OK dopo fix form-sito (Misura→Stagionalità→Mezzo→Modello). |

### A1 — Appuntamento (P0) · `cg.a1`

**Utente:** `Vorrei prenotare per venerdì alle undici.`  
**Atteso:** non conferma slot; non fissa appuntamenti; offre orari/indirizzo o persona.  
**Fail:** “ok prenotato”; inventa disponibilità.

| Esito | Finding |
| --- | --- |
| ☑ Pass / ☐ Fail / ☐ Skip | |

### G1 — Gap sabato (P0) · `cg.g1`

**Utente:** `Aprite il sabato?`  
**Atteso:** gap KB; non inventa; non promette callback automatico sul solo gap; offre persona o altro.  
**Fail:** inventa orario sabato.

| Esito | Finding |
| --- | --- |
| ☑ Pass / ☐ Fail / ☐ Skip | Soft→Pass re-test: gap sabato chiaro (solo Lun–Ven pubblicati; no inferenza chiusi). |

### F1 — Obbligo invernali (P0) · `cg.f1`

**Utente:** `Quando sono obbligatorie le gomme invernali?`  
**Atteso:** FAQ 15 nov–15 apr (o catene).  
**Fail:** date sbagliate.

| Esito | Finding |
| --- | --- |
| ☑ Pass / ☐ Fail / ☐ Skip | |

### H2 — Aperti adesso (P1) · `cg.h2`

**Utente:** `Siete aperti adesso?`  
**Atteso:** `get_current_datetime` + orari KB a **due fasce** (08–12 e 14–18:30); tra 12–14 chiusi; mai “orario continuato”.  
**Fail:** senza datetime; inventa; dice orario continuato / aperti fino a 18:30 senza pausa.

| Esito | Finding |
| --- | --- |
| ☑ Pass / ☐ Fail / ☐ Skip | Re-test OK: due fasce, no orario continuato. |

### T1 — Umano (P1) · `cg.t1`

**Utente:** `Mi passa un operatore.`  
**Atteso:** accetta; no nomi Workflow/tool; stop. Transfer reale = Intent Workflow.  
**Fail:** rifiuta; inventa ticket; chiama tool inesistente.

| Esito | Finding |
| --- | --- |
| ☑ Pass / ☐ Fail / ☐ Skip | |

### C1 — Sede (P1) · `cg.c1`

**Utente:** `Dove siete e che numero avete?`  
**Atteso:** Via 1 Maggio 11 Osio Sopra (BG / Bergamo); 035 502992 e/o 351 5898010; no URL.  
**Fail:** inventa; legge URL.

| Esito | Finding |
| --- | --- |
| ☑ Pass / ☐ Fail / ☐ Skip | |

### F2 — 4 stagioni / mm (P1) · `cg.f2`

**Utente:** `Con le quattro stagioni posso circolare tutto l'anno? E a quanti millimetri si cambiano?`  
**Atteso:** sì tutto l’anno; 1,6 mm legale (non confondere col consiglio 4 mm invernali/neve).  
**Fail:** inventa divieto; mm inventati.

| Esito | Finding |
| --- | --- |
| ☑ Pass / ☐ Fail / ☐ Skip | |

### NP1 — No prezzo senza listino (P1) · `core.no_invented_price` / `cg.np1`

**Utente:** `Quanto costa il reset dei sensori TPMS?`  
**Atteso:** servizio sì se in CSV; **non** inventa €; offre preventivo/staff.  
**Fail:** inventa prezzo TPMS.

| Esito | Finding |
| --- | --- |
| ☑ Pass / ☐ Fail / ☐ Skip | Servizio + tester professionale da KB; prezzo non in listino. |

### V-H1 — Overlay voce breve (P0) · `voice.short_turns` · voice_playground

In una Start Call: dopo First Message, utente: `Che orari fate?`  
**Atteso:** max 2–3 frasi; una domanda se presente; no markdown/URL/tool names.

| Esito | Finding |
| --- | --- |
| ☑ Pass / ☐ Fail / ☐ Skip | Overlay voce già eseguito in playground (confermato tester). |

---

## Fix e re-test

| ID | Fix | Sync Spoki | Re-test |
| --- | --- | --- | --- |
| H2 | Due fasce; ban orario continuato | paste + kb.txt | ☑ Pass |
| G1 | Gap sabato senza inferire chiusi | stesso | ☑ Pass |
| C1 | Via 1 Maggio + BG | kb.txt | ☑ Pass smoke |

---

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| H1 | P0 | Pass | |
| P1 | P0 | Pass | |
| S1 | P0 | Pass | |
| Q1 | P0 | Pass | Re-test post-fix |
| A1 | P0 | Pass | |
| G1 | P0 | Pass | Re-test OK post-fix UX sabato |
| F1 | P0 | Pass | |
| H2 | P1 | Pass | Re-test OK post-fix |
| T1 | P1 | Pass | |
| C1 | P1 | Pass | + smoke indirizzo Via 1 Maggio OK |
| F2 | P1 | Pass | |
| NP1 | P1 | Pass | |
| V-H1 | P0 | Pass | Overlay voce già fatto |

**Data run:** 2026-09-11  
**Tester:** Giulio (playground 9968)

---

## Criteri pronto

- [x] P0 verdi (logici + overlay voce)
- [x] Twin Testuale creato o Skip documentato — Skip (test su playground messaggi/voce)
- [x] PDF cliente
- [x] Notion closeout (Link Spoki = UUID playground; target live 55247)
- [ ] YAML valid vs schema (opzionale)
- [ ] Agente sostituito / clonato su **55247**
