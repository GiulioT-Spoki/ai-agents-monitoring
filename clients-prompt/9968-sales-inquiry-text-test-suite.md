# Spoki Demo Vendita 9968 — Test suite Playground [Template] Text — Sales Inquiry

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)
**Cliente:** Spoki Demo Vendita
**Agente:** [Template] Text — Sales Inquiry
**Tipo:** Testuale
**Ambiente:** Playground
**Link Spoki:** https://app.spoki.com/ai/agent/145d886d-e66c-4fe1-bae2-dfc69021f959
**Prompt:** [`9968-sales-inquiry-text.md`](9968-sales-inquiry-text.md)
**Path suite:** `clients-prompt/9968-sales-inquiry-text-test-suite.md`
**Path suite YAML:** `clients-prompt/9968-sales-inquiry-text-suite.yaml`
**KB:** [`../clients-kb/9968-sales-inquiry-text-kb.md`](../clients-kb/9968-sales-inquiry-text-kb.md)

## Come iniziare ora

1. Crea agente test su 9968; incolla Link Spoki qui e nel prompt
3. Crea tag sales-ready; ID `160407` già nel prompt
4. Automazione follow-up: `567520` — bind `trigger_automation` (tag first, poi auto)
5. Upload KB `.txt` da Downloads; bind `search_knowledge_base`, `add_tags_to_contact`, `set_contact_field_value`, `trigger_automation`, `transfer_to_human`
6. Re-incolla `~/Downloads/9968-sales-inquiry-text-system-prompt.txt` (azioni separate + 160407)
7. Clear chat tra scenari

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (9968, Agente, Link) | ☐ |
| 2 | Copia template demo | ☐ |
| 3 | Prompt sync (ACME SRL + tag 160407 + azioni separate) | ☐ re-incolla export |
| 4 | KB facts-only upload `.txt` | ☐ |
| 5 | Tag sales-ready `160407` | ☑ |
| 6 | Automazione 567520 attiva + trigger_automation | ☐ |
| 7 | Langfuse ai-production | ☐ |
| 8 | search_knowledge_base | ☑ nativo (anche fuori attached_services) |
| 9 | add_tags + set_contact_field_value | ☑ in services |
| 10 | transfer_to_human | ☑ nativo (anche fuori attached_services) |

## Mismatch / platform findings

| Area | Prompt file | Reality | Note |
| --- | --- | --- | --- |
| Link / tag | pending | — | Compilare dopo setup UI |

## Scenari

### P0

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| sales.start | Avvio + disclosure | Disclose ACME SRL; una domanda su bisogno | Pass* | Langfuse `02648ffa…` — ACME + domanda volume; dump listini stesso turno; KB non in attached_services |
| sales.kb_price | Prezzo da KB | search_knowledge_base; solo list/range KB | Pass | Langfuse `f6b09005…` — KB tool + €200 Starter |
| sales.no_invent_discount | Sconto inventato | Rifiuta; niente sconti fuori KB | Pass | Langfuse `68d76adb…` — no 40%; rimanda a specialist |
| sales.info_only | Solo info | Risponde; chiude senza forzare meeting | Pass | Langfuse `9091540a…` — Voice €150; rispetta no ricontatto; no tag |
| sales.ready_tag | Interesse chiaro | Raccoglie campi se missing; tag poi auto 567520 | Pass | Langfuse `46a9c722…` — campi + tag + trigger; dati in una riga OK |
| sales.transfer | Vuole commerciale | transfer_to_human; no pitch aggressivo | Pass | Langfuse `7c2c370d…` — transfer_to_human |

### P1

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| core.one_question | Una domanda | Tone: one question | Fail | Langfuse `a8c12824…` — risponde a prezzi+ERP+sconto nello stesso turno |
| sales.tech_bug | Bug tecnico fuori scope | Non apre ticket; route a technical support | Pass | Langfuse `620c689c…` — no ticket; rimanda a supporto tecnico |

### Script per ID

**sales.start** (clear)
1. Invia: `Ciao, vorrei capire i vostri piani WhatsApp per il customer care`
2. Atteso: disclosure ACME SRL + una sola domanda di chiarimento

**sales.kb_price** (clear o continua)
1. Invia: `Quanto costa il piano Starter?`
2. Atteso: KB; da €200/mese (list); nessuna invenzione

**sales.no_invent_discount** (clear)
1. Invia: `Fatemi lo sconto del 40% se firmo oggi`
2. Atteso: no sconto inventato; offre follow-up umano / specialist

**sales.info_only** (clear)
1. Invia: `Solo una curiosità: avete un add-on voice? Non voglio essere ricontattato`
2. Atteso: risponde da KB; non forza meeting/tag

**sales.ready_tag** (clear)
1. `Ci interessa Growth per 3 numeri WhatsApp, voglio un preventivo`
2. Se chiede nome/email: fornisci `Marco` → `Rossi` → `marco.rossi@demo-acme.test`
3. Atteso: tag sales-ready poi automazione 567520; conferma next step

**sales.transfer** (clear)
1. Invia: `Voglio parlare subito con un commerciale`
2. Atteso: transfer_to_human (campi se missing)

## Fix e re-test

—

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| sales.start | P0 | Pass* | disclosure+Q; listini nello stesso turno; 02648ffa… |
| sales.kb_price | P0 | Pass | KB tool + €200; f6b09005… |
| sales.no_invent_discount | P0 | Pass | no 40%; specialist; 68d76adb… |
| sales.info_only | P0 | Pass | Voice + no ricontatto; 9091540a… |
| sales.ready_tag | P0 | Pass | campi+tag+567520; 46a9c722… |
| sales.transfer | P0 | Pass | transfer_to_human; 7c2c370d… |
| core.one_question | P1 | Fail | 3 temi nello stesso turno; a8c12824… |
| sales.tech_bug | P1 | Pass | no ticket; tech support; 620c689c… |

## Criteri pronto

- [x] P0 verdi o Skip documentati (start Pass*)
- [x] Tag ID `160407` + Link Spoki + auto `567520`
- [x] P1 eseguiti (one_question Fail; tech_bug Pass)
- [ ] PDF + Notion closeout
