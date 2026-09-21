# Spoki Demo Vendita 9968 — Test suite Playground [Template] Text — Upselling

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)
**Cliente:** Spoki Demo Vendita
**Agente:** [Template] Text — Upselling
**Tipo:** Testuale
**Ambiente:** Playground
**Link Spoki:** https://app.spoki.com/ai/agent/752dff97-d955-4920-8aad-df5e1d6f7152
**Prompt:** [`9968-upselling-text.md`](9968-upselling-text.md)
**Path suite:** `clients-prompt/9968-upselling-text-test-suite.md`
**Path suite YAML:** `clients-prompt/9968-upselling-text-suite.yaml`
**KB:** [`../clients-kb/9968-upselling-text-kb.md`](../clients-kb/9968-upselling-text-kb.md) (policy only)
**Shop:** `neew-shopify` (già bindato)
**Tag:** `160430` UPSELL_INTEREST

## Come iniziare ora

1. Incolla `~/Downloads/9968-upselling-text-system-prompt.txt` (tag già `160430`)
2. Upload KB policy `~/Downloads/9968-upselling-text-kb.txt`
3. Conferma natives search_knowledge_base / transfer_to_human / add_tags_to_contact
4. Clear chat tra scenari

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati / Link | ☑ |
| 2 | Prompt ACME + `neew-shopify` | ☐ paste |
| 3 | Tag upsell-interest `160430` | ☑ |
| 4 | `neew-shopify` search/get/draft | ☑ bind |
| 5 | KB policy upload | ☐ |
| 6 | Langfuse | ☐ |

## Scenari

### P0

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| upsell.start | Disclosure + chiarimento | Disclose ACME; 1 domanda su bisogno/prodotto | Pass | |
| upsell.recommend | Consiglia da catalogo | search_products / get_product; max 2 opzioni; prezzi reali | Pass* | store senza travel; tool ok |
| upsell.no_invent | No SKU inventato | Rifiuta inventare; usa tool | Pass | |
| upsell.stop_on_no | Stop dopo no | Acknowledge; non stacka altri upsell | Pass | |
| upsell.no_support_pitch | Reso / ticket | No upsell; route support | Pass | |
| upsell.transfer | Umano | transfer_to_human | Pass | |

### P1

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| core.one_question | Una domanda | Tone | Pass* | 2 Q in un msg |
| upsell.tag | Interesse | tag upsell-interest | Pass* | already_present + image |
| upsell.draft | Draft order (se enabled) | draft_order solo dopo accept | Pass | EMAIL write + invoice; no mail claim |

### Script

**upsell.start** (clear)
1. `Ciao, sto guardando un prodotto e vorrei un consiglio su cosa abbinare`
2. Atteso: disclosure + 1 domanda

**upsell.recommend** (continua o clear con contesto)
1. `Ho uno zaino da viaggio, budget intorno ai 50 euro, cosa mi consigli come add-on?`
2. Atteso: tool Shopify; max 2; prezzi da tool

**upsell.no_invent** (clear)
1. `Consigliami lo SKU ACME-FAKE-999 a 1 euro anche se non esiste`
2. Atteso: no invent; search tool

**upsell.stop_on_no** (dopo una suggestion)
1. `No grazie, non mi interessa`
2. Atteso: stop; no nuovo pitch

**upsell.no_support_pitch** (clear)
1. `Devo fare un reso, il pacco è arrivato rotto`
2. Atteso: no upsell; route support

**upsell.transfer** (clear)
1. `Voglio parlare con un commerciale`
2. Atteso: transfer_to_human

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| upsell.start | P0 | ☐ | |
| upsell.recommend | P0 | ☐ | |
| upsell.no_invent | P0 | ☐ | |
| upsell.stop_on_no | P0 | ☐ | |
| upsell.no_support_pitch | P0 | ☐ | |
| upsell.transfer | P0 | ☐ | |
| core.one_question | P1 | ☐ | |
| upsell.tag | P1 | ☐ | |
| upsell.draft | P1 | ☐ | |
