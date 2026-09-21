# Spoki Demo Vendita 9968 — Test suite Playground [Template] Text — IVR Triage

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)
**Cliente:** Spoki Demo Vendita
**Agente:** [Template] Text — IVR Triage
**Tipo:** Testuale
**Ambiente:** Playground
**Link Spoki:** https://app.spoki.com/ai/agent/170eade0-78ff-46e4-ae11-2b996a7d778a
**Prompt:** [`9968-ivr-triage-text.md`](9968-ivr-triage-text.md)
**Path suite:** `clients-prompt/9968-ivr-triage-text-test-suite.md`
**Path suite YAML:** `clients-prompt/9968-ivr-triage-text-suite.yaml`
**KB:** [`9968-ivr-triage-text-kb.md`](../clients-kb/9968-ivr-triage-text-kb.md)

## Come iniziare ora

1. Incolla in Spoki il body da `# System prompt (Spoki)` in `9968-ivr-triage-text.md` (azioni su **due righe** separate — non concatenate)
2. Collega KB `.txt` da Downloads + tool `search_knowledge_base` / `transfer_to_human`
3. Playground con contact di test → Clear tra scenari
4. Score solo contro il prompt live

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (Account 9968, Agente, Link) | ☑ |
| 2 | Copia template demo | ☑ |
| 3 | Prompt sync (azioni su righe separate; COMPANY→ACME SRL) | ☑ da FAQ: ACME SRL in reply |
| 4 | KB fatti-only caricata `.txt` | ☑ doc `23652b69…` |
| 5 | Langfuse ai-production | ☑ |
| 6 | `search_knowledge_base` | ☑ |
| 7 | `transfer_to_human` | ☑ |
| 8 | Tag 160344–160349 + auto 567259 | ☑ nel prompt |
| 9 | Agente attivo | ☐ `is_active=false` / draft |

## Mismatch / platform findings

| Area | Prompt | Reality | Note |
| --- | --- | --- | --- |
| Actions syntax | tag then automation on separate lines | Live aveva `…tag@@@@action:trigger…` sullo stesso rigo | Fix obbligatorio prima dei P0 route |
| Tools table | nativi elencati | `tools_agent_association` vuota | Bind in UI |
| Company | ACME SRL | Live ancora `[COMPANY]` | Sync col file |

## Scenari

### P0

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| core.greeting | Accoglienza + disclosure | Disclose AI ACME SRL; se intent unclear → 1 domanda (flow §1–2) | Pass* | Langfuse `3b55e47b…` — disclosure + opzioni; leak letterale `[COMPANY]` |
| ivr.sales_route | Intent sales chiaro | Confirm intent + tag 160344 + auto 567259; conferma solo dopo successo | Pass* | Langfuse `bfebde19…` — tag `ivr-sales` 160344 ok → `trigger_automation` success; conferma dopo. Leak `[COMPANY]`. Auto args `{}` (preset UI?) |
| ivr.clarify | Intent unclear | Una domanda o max 4 opzioni; no loop >2 | Pass* | Langfuse `f9bccf29…` — 4 opzioni, no tag/auto; leak `[COMPANY]` |
| core.transfer | Richiesta operatore | `transfer_to_human`; conferma solo dopo successo | Pass* | Langfuse `9f14ebe1…` — TOOL escalated + conferma; leak `[COMPANY]` |
| ivr.urgent | Dispute pagamento | Skip triage → transfer immediato; no tag/auto | Pass* | Langfuse `4f4e1410…` — solo transfer escalated; no tag/auto; `[COMPANY]` |
| support.faq_in_kb | Orari da KB | `search_knowledge_base`; orari 9–18; poi chiede se serve reparto | Pass | Langfuse `f829ce0f…` — KB hit, lun–ven 09–18, chiede reparto; ACME SRL |

### P1

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| ivr.no_specialty | Chiede di chiudere vendita | Boundaries: no deep-sell / no invent department answers; route sales | ☐ | |
| core.one_question | Una domanda | Tone: one question at a time | ☐ | |

### Script per ID

**core.greeting**
1. Invia: `Ciao`
2. Atteso: disclosure AI ACME SRL + una domanda su cosa serve (intent unclear)

**ivr.sales_route** (clear chat)
1. Invia: `Vorrei un preventivo per WhatsApp AI per la mia azienda`
2. Atteso: conferma sales in una riga; tag 160344 poi auto 567259; messaggio “cosa succede dopo” solo se azioni ok; non citare id/tag

**ivr.clarify** (clear)
1. Invia: `Ho un problema`
2. Atteso: una domanda di chiarimento o fino a 4 opzioni (sales/booking/support/…)

**core.transfer** (clear)
1. Invia: `Posso parlare con un operatore?`
2. Atteso: `transfer_to_human`; conferma solo se ok

**ivr.urgent** (clear)
1. Invia: `Ho un addebito non autorizzato sulla carta, voglio parlare subito con qualcuno`
2. Atteso: transfer immediato; niente tag/automation

**support.faq_in_kb** (clear)
1. Invia: `A che ora siete aperti?`
2. Atteso: KB → lun–ven 09:00–18:00; chiede se serve ancora un reparto

## Fix e re-test

—

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| core.greeting | P0 | Pass* | leak `[COMPANY]` — sync prompt |
| ivr.sales_route | P0 | Pass* | tag+auto ok; `[COMPANY]`; auto args vuoti |
| ivr.clarify | P0 | Pass* | 4 opzioni, no route; `[COMPANY]` |
| core.transfer | P0 | Pass* | escalated ok; `[COMPANY]` |
| ivr.urgent | P0 | Pass* | transfer only; `[COMPANY]` |
| support.faq_in_kb | P0 | Pass | KB + orari + follow-up reparto |

## Criteri pronto

- [x] P0 verdi o Skip documentati
- [ ] PDF cliente in `_exports/` (+ Downloads)
- [ ] Notion closeout (§8)
- [ ] Suite YAML valid
