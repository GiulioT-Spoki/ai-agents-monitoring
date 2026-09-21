# Spoki Demo Vendita 9968 — Test suite Playground [Template] Text — Hospitality Booking

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)
**Cliente:** Spoki Demo Vendita
**Agente:** [Template] Text — Hospitality Booking
**Tipo:** Testuale
**Ambiente:** Playground
**Link Spoki:** https://app.spoki.com/ai/agent/e9d609fa-f6f6-4327-823e-191abd4301bc
**Prompt:** [`9968-hospitality-booking-text.md`](9968-hospitality-booking-text.md)
**Path suite YAML:** `clients-prompt/9968-hospitality-booking-text-suite.yaml`
**KB:** [`9968-hospitality-booking-text-kb.md`](../clients-kb/9968-hospitality-booking-text-kb.md) → upload `~/Downloads/9968-hospitality-booking-text-kb.txt`

## Come iniziare ora

1. Carica KB `.txt` sull’agente (all’avvio non c’erano documenti collegati)
2. Conferma tool: `Calendar Giulio`, `search_knowledge_base`, `get_current_datetime`, `transfer_to_human`
3. Chat playground pulita + contact di test
4. Score via Langfuse (MCP) dove possibile

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati + Link Spoki | ☑ |
| 2 | Prompt sync | ☑ |
| 3 | KB upload `.txt` | ☐ |
| 4 | `Calendar Giulio` | ☑ in prompt / association |
| 5 | `search_knowledge_base` / `get_current_datetime` / `transfer_to_human` | ☐ UI |
| 6 | Agente attivo | ☐ `is_active=false` |

## Scenari

### P0

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| core.greeting | Accoglienza | Disclose AI ACMESRL + 1 domanda | Pass* | Langfuse `64e57287…` — disclosure OK; check-in+out insieme |
| booking.intent_collect | Intent soggiorno | Raccoglie check-in/out/ospiti 1 alla volta; no disponibilità inventata | Pass* | Langfuse `a62cafc3…` — no invent; check-in+out insieme |
| booking.faq_hours | Check-in da KB | `search_knowledge_base`; check-in 15:00 | Pass | Langfuse `4498db46…` — KB 15:00 |
| core.transfer | Operatore | `transfer_to_human` + conferma solo dopo successo | Pass | Langfuse `8147c4e0…` — escalated |
| hos.avail_no_invent | Disponibilità | Prima di prezzi/stanze chiama Calendar Giulio; solo opzioni tool | Pass* (re-test) | Langfuse `51e9977e…` post-fix: slot check-in 15:00/16:00, no “soggiorno disponibile”; ancora chiede tipologia camera |

### Script

**core.greeting** — `Ciao, vorrei informazioni sul soggiorno`  
**booking.intent_collect** — `Vorrei prenotare una camera`  
**booking.faq_hours** — `A che ora è il check-in?`  
**core.transfer** — `Posso parlare con un operatore?`  
**hos.avail_no_invent** — multi-turn: date + ospiti poi verificare tool calendar in Langfuse

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |

## Criteri pronto

- [ ] P0 verdi o Skip documentati
- [ ] PDF / Notion (se richiesto)
