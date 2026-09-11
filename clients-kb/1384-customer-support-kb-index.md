# Spoki 1384 — Indice KB Customer support (BetterDocs)

> Metadati debug. Mirror locale della knowledge base pubblica BetterDocs usata (o allineabile) dall’agente **Customer support** su account Spoki `1384` / UUID `76d87942-64d7-42e8-978b-e87b9e107c9a`.

| Campo | Valore |
| --- | --- |
| Endpoint | `https://support.spoki.com/wp-json/wp/v2/docs` |
| Estrazione | 2026-07-31 |
| Documenti | **176** (0 fail) |
| Dump | [`1384-betterdocs/`](1384-betterdocs/) |
| Indice per categoria | [`1384-betterdocs/INDEX.md`](1384-betterdocs/INDEX.md) |
| JSON grezzo | [`1384-betterdocs/all_docs_raw.json`](1384-betterdocs/all_docs_raw.json) (~3.8 MB) |
| Sample tool (limiti WA) | [`1384-customer-support-kb-whatsapp-rules-sample.md`](1384-customer-support-kb-whatsapp-rules-sample.md) |

`support.spoki.it` reindirizza a `support.spoki.com` (stessa API).

## Categorie (API)

| Categoria | N. doc | Cartella |
| --- | --- | --- |
| How to | 73 | [`1384-betterdocs/how-to/`](1384-betterdocs/how-to/) |
| Integrazioni | 38 | [`1384-betterdocs/integrazioni/`](1384-betterdocs/integrazioni/) |
| Piattaforma | 17 | [`1384-betterdocs/piattaforma/`](1384-betterdocs/piattaforma/) |
| Onboarding | 12 | [`1384-betterdocs/onboarding/`](1384-betterdocs/onboarding/) |
| Strategie | 10 | [`1384-betterdocs/strategie/`](1384-betterdocs/strategie/) |
| Regole WhatsApp | 8 | [`1384-betterdocs/regole-whatsapp/`](1384-betterdocs/regole-whatsapp/) |
| Release Notes | 4 | [`1384-betterdocs/release-notes/`](1384-betterdocs/release-notes/) |
| Strategies (EN) | 3 | [`1384-betterdocs/strategie/`](1384-betterdocs/strategie/) / generale |
| Integrations (EN) | 1 | [`1384-betterdocs/integrations/`](1384-betterdocs/integrations/) |
| (senza cat. / generale) | 13 | [`1384-betterdocs/generale/`](1384-betterdocs/generale/) |

## Articoli chiave per cross-check (Regole WhatsApp)

Già visti nel dump tool `search_knowledge_base`:

- [`limiti-contatti.md`](1384-betterdocs/regole-whatsapp/limiti-contatti.md)
- [`regole-per-evitare-il-ban-da-whatsapp.md`](1384-betterdocs/regole-whatsapp/regole-per-evitare-il-ban-da-whatsapp.md)
- [`whatsapp-business-nuovo-modello-tariffario-2025.md`](1384-betterdocs/regole-whatsapp/whatsapp-business-nuovo-modello-tariffario-2025.md)

## Prompt / suite

- Prompt: [`../clients-prompt/1384-customer-support.md`](../clients-prompt/1384-customer-support.md)
- Test suite: [`../clients-prompt/1384-customer-support-test-suite.md`](../clients-prompt/1384-customer-support-test-suite.md)

## Refresh

```bash
python scripts/docs_scrape_support_spoki_to_markdown.py \
  -o clients-kb/1384-betterdocs
```
