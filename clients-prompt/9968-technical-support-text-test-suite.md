# Spoki Demo Vendita 9968 — Test suite Playground [Template] Text — Technical Support

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)
**Cliente:** Spoki Demo Vendita
**Agente:** [Template] Text — Technical Support
**Tipo:** Testuale
**Ambiente:** Playground
**Link Spoki:** https://app.spoki.com/ai/agent/7ba0e1c8-0cd3-4002-84d7-3ea2420475f3
**Prompt:** [`9968-technical-support-text.md`](9968-technical-support-text.md)
**Path suite:** `clients-prompt/9968-technical-support-text-test-suite.md`
**Path suite YAML:** `clients-prompt/9968-technical-support-text-suite.yaml`
**KB:** [`9968-technical-support-text-kb.md`](../clients-kb/9968-technical-support-text-kb.md)

## Come iniziare ora

1. Incolla body da `# System prompt (Spoki)` o `~/Downloads/9968-technical-support-text-system-prompt.txt` (ACME SRL + ticket rules)
2. KB `tech-support-kb` già linkata (o ricarica `.txt` da Downloads)
3. Tickets abilitati sull’account; clear chat tra scenari
4. Score solo contro prompt live

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (9968, Agente, Link) | ☑ |
| 2 | Copia template demo | ☑ |
| 3 | Prompt sync (ACME SRL + When to open / One case) | ☐ re-incolla Exports se live ancora `AcmeSRL` |
| 4 | KB collegata | ☑ |
| 5 | Langfuse ai-production | ☑ |
| 6 | search_knowledge_base | ☑ usato in greeting |
| 7 | transfer_to_human | ☑ |
| 8 | create_ticket (Tickets on) | ☑ ticket `1580295` |
| 9 | Agente attivo | ☐ `is_active=false` / DRAFT |

## Mismatch / platform findings

| Area | Prompt | Reality | Note |
| --- | --- | --- | --- |
| Company | ACME SRL (file + export) | Re-incolla Spoki se live ancora typo | Export `~/Downloads/9968-technical-support-text-system-prompt.txt` |
| Ticket rules | When to open / not + one case | — | Sync 2026-09-17 |

## Scenari

### P0

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| core.greeting | Issue + disclosure | Disclose AI; restate + 1 domanda contesto (flow §1) | Pass* | Langfuse `bebd7419…` — disclosure + restatement + 1 Q; brand `AcmeSRL`; KB già chiamata |
| support.kb_login | Non riesco ad accedere | search_knowledge_base prima dei passi; Procedure A step 1 | Pass* | Langfuse `637f241b…` — KB + Access denied → offre ticket; brand `AcmeSRL` |
| support.no_invent | Workaround inventato | Boundaries: no invent; offer ticket/transfer se fuori KB | Pass* | Langfuse `ef9f29a5…` — rifiuta script; offre ticket webhook standard; `AcmeSRL` |
| core.transfer | Voglio un operatore | transfer_to_human; conferma solo dopo successo | Pass* | Langfuse `8340c9ef…` — escalated + conferma; `AcmeSRL` |
| support.ticket_path | Ticket dopo KB fail | Summary + yes + campi + create_ticket solo dopo conferma | Pass* | Langfuse `3dc94d12…` — ticket Open `#1580295` / `spoki_12cef96e…`; campi Mario Rossi; batch campi+create (summary finale poco chiaro) |
| support.hours | Orari supporto | KB hours; get_current_datetime se serve; no promise fuori orario | Pass* | Langfuse `da59bf49…` — lun–ven 09–18 Roma da KB; `AcmeSRL` |

### P1

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| support.no_refund | Chiede rimborso | No promise refunds unless KB; escalate | Pass | Langfuse `0317148c…` — no promise; transfer |
| core.one_question | Una domanda | Tone: one question / one next step | Pass | Langfuse `f693169e…` — 1 Q + esempi |
| support.same_case_no_second_ticket | Dopo ticket, dettagli sullo stesso caso | Niente secondo create_ticket; staff legge la chat (One ticket = one case) | Pass | Langfuse `11f23b4b…` — ticket `spoki_4cceebe8…`; addendum in chat only |
| support.no_ticket_random | Richiesta random / FAQ già in KB | When not: no ticket (es. solo orari / saluto) | Pass | Langfuse `71cf0365…` — ACME SRL; orari; no ticket |

### Script per ID

**core.greeting**
1. Invia: `Non riesco ad entrare nella dashboard`
2. Atteso: disclosure ACME… + restatement + una sola domanda di contesto

**support.kb_login** (clear; o continua se già sul login)
1. Se fresh: `Non riesco ad accedere al pannello ACME, mi dice Access denied`
2. Atteso: KB prima dei consigli; path Procedure A (email account / escalate se Access denied)

**support.no_invent** (clear)
1. Invia: `Il mio ERP SAP del 1995 non sincronizza con ACME: inventami uno script Python per forzare i webhook`
2. Atteso: non inventa; dice di non avere la procedura / offre ticket o transfer

**core.transfer** (clear)
1. Invia: `Voglio parlare subito con un operatore`
2. Atteso: transfer_to_human; conferma dopo successo

**support.ticket_path** (multi-turn — clear)
1. `L'agente AI è Active ma non risponde da ieri alle 10`
2. Segui le sue domande; dopo i passi KB di’ che non funziona ancora
3. Accetta il ticket; fornisci nome/cognome/email se chiesti; conferma il summary
4. Atteso: create_ticket solo dopo conferma; conferma filing solo se tool ok

**support.hours** (clear)
1. Invia: `A che ora risponde il supporto umano?`
2. Atteso: lun–ven 09–18 Europe/Rome da KB; niente immediato fuori orario

**support.same_case_no_second_ticket** (multi-turn — dopo un ticket già aperto, o continua da ticket_path)
1. Dopo conferma ticket: `Aggiungo: il problema è iniziato dopo l'ultimo deploy di ieri`
2. Atteso: nessun secondo create_ticket; rassicura che lo staff legge la chat

**support.no_ticket_random** (clear)
1. Invia: `Ciao, a che ora risponde il supporto?`
2. Atteso: risponde da KB (orari); non offre né apre un ticket

## Fix e re-test

—

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| core.greeting | P0 | Pass* | AcmeSRL + KB early |
| support.kb_login | P0 | Pass* | KB escalate Access denied |
| support.no_invent | P0 | Pass* | no invent + offer ticket |
| core.transfer | P0 | Pass* | escalated ok |
| support.ticket_path | P0 | Pass* | ticket 1580295; batch campi+create |
| support.hours | P0 | Pass* | orari KB ok |
| support.no_ticket_random | P1 | Pass | FAQ orari; no ticket; ACME SRL |
| support.same_case_no_second_ticket | P1 | Pass | ticket + addendum no 2nd ticket |
| support.no_refund | P1 | Pass | no promise; transfer |
| core.one_question | P1 | Pass | disclose + 1 Q |

## Criteri pronto

- [x] P0 verdi o Skip documentati
- [ ] PDF cliente in `_exports/` (+ Downloads)
- [ ] Notion closeout (§8)
- [ ] Suite YAML valid
