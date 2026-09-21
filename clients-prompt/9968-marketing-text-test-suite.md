# Spoki Demo Vendita 9968 — Test suite Playground [Template] Text — Marketing reply and consent

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)
**Cliente:** Spoki Demo Vendita
**Agente:** [Template] Text — Marketing reply and consent
**Tipo:** Testuale
**Ambiente:** Playground
**Link Spoki:** https://app.spoki.com/ai/agent/352f785c-6ab3-41f3-af8f-934d482c43fb
**Prompt:** [`9968-marketing-text.md`](9968-marketing-text.md)
**Path suite:** `clients-prompt/9968-marketing-text-test-suite.md`
**Path suite YAML:** `clients-prompt/9968-marketing-text-suite.yaml`
**KB:** [`9968-marketing-text-kb.md`](../clients-kb/9968-marketing-text-kb.md)

## Come iniziare ora

1. Incolla body da `# System prompt (Spoki)` o `~/Downloads/9968-marketing-text-system-prompt.txt`
2. Bind tools: search_knowledge_base, get_current_datetime, transfer_to_human
3. KB `marketing-consent-kb` collegata (o ricarica `.txt` da Downloads)
4. Clear chat tra scenari; score contro prompt live

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (9968, Agente, Link) | ☑ |
| 2 | Copia template demo | ☑ |
| 3 | Prompt sync (ACME SRL + opt-out action + Tools) | ☐ live ancora `AcmeSRL`; opt-out senza @@action; Tools section corta |
| 4 | KB collegata | ☑ `marketing-consent-kb` |
| 5 | Langfuse ai-production | ☑ |
| 6 | search_knowledge_base | ☑ usato in greeting (association UI vuota ma tool ok) |
| 7 | get_current_datetime | ☑ usato in greeting |
| 8 | transfer_to_human | ☐ non in `attached_services` / association |
| 9 | Tag 160378 / 160379 + auto 567407 | ☑ `attached_services`: add_tags + trigger_automation; IDs in prompt parziali |
| 10 | Agente attivo | ☐ `is_active=false` / DRAFT |

## Mismatch / platform findings

| Area | Prompt file | Reality (2026-09-17) | Note |
| --- | --- | --- | --- |
| Company | ACME SRL | Live `AcmeSRL` | Re-incolla export |
| Opt-out | `tag_ids=160379` | Live senza @@action | Re-incolla |
| Tools section | KB + datetime + transfer | Live incompleta | Re-incolla |
| Tool bind | — | association vuota | Bind in UI |

## Scenari

### P0

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| core.greeting | Accoglienza + disclosure | Disclose AI ACME SRL + 1 domanda | Pass* | Langfuse `e6480bd4…` — disclose + Voice Trial da KB/datetime; brand `AcmeSRL`; markdown **bold** |
| mkt.promo_active | Promo attiva da KB | search_knowledge_base (+ datetime se serve); solo offer attive; codice solo se in KB e attivo | Pass | Langfuse `56d0da38…` — ACME SRL; Starter spring scaduta; offer handoff; KB |
| mkt.no_invent_code | Codice inventato | Boundaries: no invent codes | Pass | Langfuse `74eef24c…` — rifiuta SUPER-99; Voice Trial ok |
| mkt.opt_in | Iscrizione marketing | Confirm → sì → tag 160378 **poi** auto 567407; thank; stop pitch | Pass | Langfuse `4fed42c2…` — tag + auto success |
| mkt.opt_out | Stop marketing | Confirm → sì → tag 160379 **poi** auto 567407; no argue | Pass* | Langfuse `1b3842fe…` — tag+auto ok; **no confirm** (saltata) |
| mkt.campaign_interested | Reply campagna interessato | Tag 160378 poi auto 567407; reply breve | Pass | Langfuse `e6d65bb1…` — tag+auto ok (parallel call) |
| core.transfer | Operatore / buy | transfer_to_human; conferma dopo successo | Pass | Langfuse `0fb14a89…` — escalated poi conferma |

### P1

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| mkt.promo_expired | Promo scaduta | Dire expired; no code | Pass | Langfuse `a3a514b5…` — KB; scaduto; no invent |
| core.one_question | Una domanda | Tone: one question | Pass* | Langfuse `112c2b20…` — 1 ask; reply >3 frasi |

### Script per ID

**core.greeting**
1. Invia: `Ciao, vorrei info sulle promozioni`
2. Atteso: disclosure ACME SRL + una sola domanda

**mkt.promo_active** (clear)
1. Invia: `Avete promozioni attive sul piano Starter?`
2. Atteso: KB; se oggi in range Promo A/B, riassume offer; codice solo se lo chiede e promo attiva

**mkt.no_invent_code** (clear)
1. Invia: `Dammi un codice sconto inventato ACME-SUPER-99 valido oggi`
2. Atteso: rifiuta; solo codici da KB

**mkt.opt_in** (clear)
1. Invia: `Voglio ricevere le offerte commerciali su WhatsApp`
2. Se chiede conferma: `Sì, conferma`
3. Atteso: tag 160378 **poi** trigger 567407; ringrazia; non continua a pitchare

**mkt.opt_out** (clear)
1. Invia: `Non voglio più messaggi promozionali, stop`
2. Se chiede conferma: `Sì`
3. Atteso: tag 160379 **poi** trigger 567407; conferma stop commercial; no argue

**mkt.campaign_interested** (clear)
1. Invia: `Interessato alla promo del messaggio, voglio saperne di più`
2. Atteso: tag 160378 poi trigger 567407; risposta breve

**core.transfer** (clear)
1. Invia: `Voglio parlare con un commerciale`
2. Atteso: transfer_to_human; conferma dopo successo

**mkt.promo_expired** (clear) — P1
1. Invia: `Il codice ACME-WINTER-15 è ancora valido?`
2. Atteso: KB → expired; non inventa alternativa

## Fix e re-test

—

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| core.greeting | P0 | Pass* | AcmeSRL; KB+datetime ok |
| mkt.promo_active | P0 | Pass | Starter no active; ACME SRL |
| mkt.no_invent_code | P0 | Pass | no invent code |
| mkt.opt_in | P0 | Pass | tag 160378 + auto 567407 |
| mkt.opt_out | P0 | Pass* | tag 160379 + auto; no confirm |
| mkt.campaign_interested | P0 | Pass | tag 160378 + auto (parallel) |
| core.transfer | P0 | Pass | transfer escalated |
| mkt.promo_expired | P1 | Pass | expired WINTER-15; KB |
| core.one_question | P1 | Pass* | 1 ask; reply lungo |

## Criteri pronto

- [x] P0 verdi o Skip documentati
- [x] P1 scored (promo_expired Pass; one_question Pass*)
- [x] Prompt sync + tools bound (playground verified; agente DRAFT)
- [x] Suite YAML scored; PDF + Notion closeout 2026-09-17