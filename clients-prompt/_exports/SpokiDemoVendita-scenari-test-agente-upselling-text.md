# Spoki Demo Vendita — Scenari di test dell’assistente WhatsApp

**Agente:** [Template] Text — Upselling  
**Account Spoki:** 9968  
**Tipo:** Testuale  
**Link agente:** https://app.spoki.com/ai/agent/752dff97-d955-4920-8aad-df5e1d6f7152  
**Data verifica:** 17 settembre 2026  
**Ambiente:** playground di test

---

## Contesto

Verificato l’assistente inbound di upselling/cross-sell su catalogo Shopify live (`neew-shopify`). Il lavoro ha incluso:

1. **Prompt operativo** ACME SRL allineato al modello gallery (Shopify-first, KB solo policy, URL plain obbligatorio, riuso e scrittura campi contatto).
2. **Tag** `UPSELL_INTEREST` `160430`.
3. **Tool** `neew-shopify` (search_products / get_product / draft_order) + `set_contact_field_value` + `add_tags_to_contact`.
4. **Suite P0/P1** playground + Langfuse.

## Esiti

| ID | Priorità | Esito | Note |
| --- | --- | --- | --- |
| upsell.start | P0 | Pass | Disclosure ACME + 1 domanda |
| upsell.recommend | P0 | Pass* | search_products; catalogo fashion (non travel) |
| upsell.no_invent | P0 | Pass | Rifiuta SKU inventato |
| upsell.stop_on_no | P0 | Pass | Stop senza nuovo pitch |
| upsell.no_support_pitch | P0 | Pass | KB + transfer su reso |
| upsell.transfer | P0 | Pass | transfer_to_human |
| core.one_question | P1 | Pass* | No dump/sconti; 2 Q in un msg |
| upsell.tag | P1 | Pass* | Tag 160430; card playground limitata |
| upsell.draft | P1 | Pass | set EMAIL + draft + invoice; no claim mail |

**Totale:** 6 Pass · 3 Pass*

## Note operative

- Catalogo demo `spoki-dev`: prodotti fashion (es. Y-3 tee ~66,67 €).
- Playground: preferire URL plain dal tool (le card prodotto spesso non si vedono).
- Draft order: riusare FIRST_NAME/LAST_NAME; scrivere EMAIL con `set_contact_field_value` prima del draft; condividere solo `invoice_url` (niente “ti mando anche la mail”).
- Agente lasciato in **DRAFT**.

## Artifact

- Prompt: `clients-prompt/9968-upselling-text.md`
- Suite: `clients-prompt/9968-upselling-text-test-suite.md` / `.yaml`
- KB: `clients-kb/9968-upselling-text-kb.md`
- Template: `text-agents-prompts/upselling-text-inbound.md`
