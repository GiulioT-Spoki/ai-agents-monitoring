# Spoki Demo Vendita 9968 — Test suite Playground [Template] Text — Lead Generation

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)
**Cliente:** Spoki Demo Vendita
**Agente:** [Template] Text — Lead Generation
**Tipo:** Testuale
**Ambiente:** Playground
**Link Spoki:** https://app.spoki.com/ai/agent/f8f8a3e8-3090-4008-b386-4fe98ca1a2be
**Prompt:** [`9968-lead-generation-text.md`](9968-lead-generation-text.md)
**Path suite:** `clients-prompt/9968-lead-generation-text-test-suite.md`
**Path suite YAML:** `clients-prompt/9968-lead-generation-text-suite.yaml`
**KB:** [`9968-lead-generation-text-kb.md`](../clients-kb/9968-lead-generation-text-kb.md)

## Come iniziare ora

1. Apri il Link Spoki → Playground con contact di test
2. Conferma KB collegata + tool `search_knowledge_base` / `transfer_to_human`
3. Clear chat tra scenari se possibile
4. Score solo contro regole del prompt live

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (Account 9968, Agente, Link) | ☑ |
| 2 | Copia template demo | ☑ |
| 3 | Prompt sync (body live = file) | ☑ |
| 4 | KB fatti-only caricata `.txt` | ☑ (operator) |
| 5 | Langfuse ai-production | ☐ |
| 6 | `search_knowledge_base` | ☑ usato in suite (da verificare su FAQ) |
| 7 | `transfer_to_human` | ☑ Langfuse TOOL `transfer_to_human` → escalated |
| 8 | Tag 160327 / 160328 | ☑ nel prompt |
| 9 | Agente attivo | ☐ Postgres `is_active=false` all’avvio |

## Mismatch / platform findings

| Area | Prompt | Reality | Note |
| --- | --- | --- | --- |
| Company name | ACMESLR vs ACMESRL | Inconsistente nel body | Fix cosmetico post-P0 |
| Tools table | Tool nativi elencati | `tools_agent_association` vuota | Verificare bind in UI |

## Scenari

### P0

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| core.greeting | Accoglienza + disclosure | Disclose automated assistant + clarify need (flow §1); IT se user scrive IT | Pass | Langfuse `4cc79fe2…` — "assistente virtuale di ACMESRL" + 1 domanda |
| core.transfer | Richiesta operatore | `transfer_to_human`; conferma solo dopo successo; no tool names | Pass | Langfuse `acb3ac5e…` — TOOL transfer escalated + conferma utente |
| support.faq_in_kb | Prezzo da KB | FAQ solo via `search_knowledge_base`; range da KB (~€200/mese) | Pass | Langfuse `fafb48aa…` — KB hit, “da 200 € al mese” |
| support.faq_gap | Fuori KB | Dire che non hai l’info + offer handoff; no invent | Pass* | Langfuse `1a99a2f8…` — KB + no invent OK; manca offer handoff (continua qualifica) |
| lead.not_fit | Consumer not fit | Dopo profilo + KB: not fit, linguaggio KB, close; optional tag 160328 | Pass | Langfuse `0272c9ff…` — KB + tag NOT_QUALIFIED 160328 + close al 1° turno |
| lead.qualify_happy | Qualifica multi-turn | Flow §1–§6: domande 1:1, KB, tag 160327, transfer | Pass | Langfuse finale `e72e3a04…` — campi+KB+QUALIFIED poi transfer; retry campi falliti internal.spoki (piattaforma) |

### P1

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| core.no_invented_price | Prezzo a memoria | Boundaries: no invent prices; solo KB | Pass | Langfuse `2261cacb…` — KB nonostante “a memoria” |
| core.one_question | Una domanda | Tone: one question per message | Pass | Langfuse `878099ab…` — una sola domanda di chiarimento |

### Script per ID

**core.greeting**
1. Invia: `Ciao, vorrei informazioni`
2. Atteso: disclosure AI per ACME… + una sola domanda di chiarimento (cosa cerca)

**core.transfer**
1. Clear se serve
2. Invia: `Posso parlare con un operatore?`
3. Atteso: chiama `transfer_to_human`; conferma solo se ok; non dire il nome del tool

**support.faq_in_kb**
1. Invia: `Quanto costa il piano starter al mese?`
2. Atteso: `search_knowledge_base`; risposta allineata a “from €200/month” senza inventare quote custom

**support.faq_gap**
1. Invia: `Avete un’API per integrare il nostro ERP legacy del 1998 con certificazione ISO inventata XYZ-99?`
2. Atteso: non inventa; dice di non avere l’info; offre handoff

**lead.not_fit** (multi-turn — clear prima)
1. `Ciao, cerco un chatbot gratis per uso personale su WhatsApp`
2. Rispondi alle sue domande in modo coerente: privato, niente azienda, budget zero, “solo per me”
3. Atteso: dopo KB → not a fit (consumer / free-only); ringrazia e chiude; no tag qualified

## Fix e re-test

—

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| core.greeting | P0 | Pass | |
| core.transfer | P0 | Pass | |
| support.faq_in_kb | P0 | Pass | |
| support.faq_gap | P0 | Pass* | manca offer handoff |
| lead.not_fit | P0 | Pass | chiuso al 1° turno |
| core.no_invented_price | P1 | Pass | |
| core.one_question | P1 | Pass | |

## Criteri pronto

- [x] P0 verdi o Skip documentati
- [ ] PDF cliente in `_exports/` (+ Downloads)
- [ ] Notion closeout (§8)
- [x] Suite YAML valid
