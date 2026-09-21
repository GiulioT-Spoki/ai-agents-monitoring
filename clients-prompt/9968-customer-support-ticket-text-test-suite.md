# Spoki Demo Vendita 9968 — Test suite Playground [Template] Text — Customer Support ticket (after hours)

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)
**Cliente:** Spoki Demo Vendita
**Agente:** [Template] Text — Customer Support ticket (after hours)
**Tipo:** Testuale
**Ambiente:** Playground (di giorno = solo ramo **in-hours**)
**Link Spoki:** https://app.spoki.com/ai/agent/51a1aef2-0f79-4d28-94f2-295315439f01
**Prompt:** [`9968-customer-support-ticket-text.md`](9968-customer-support-ticket-text.md)
**Overlap:** ticket/diagnose diurno già coperto da [Technical Support](https://app.notion.com/p/3dce5c7af25c8149b4a2ef56e22d9d6a) — qui non rifacciamo quel path.

## Scope playground di giorno

Score solo: `get_current_datetime` → team online → transfer (niente fake offline, niente invent tracking).  
Path ticket after-hours: **deferred** (post-18:00).

## P0 (in-hours)

### cs_ticket.in_hours — datetime + online + transfer

**User:** Non riesco a tracciare il mio ordine, il tracking non aggiorna da ieri

**Expect:** Chiama get_current_datetime; dice che il team è operativo (09–18); offre transfer_to_human; non dice offline; non inventa stato tracking.

| Score | Notes |
| --- | --- |
| Pass | Langfuse `c23c494862f9a1fcf5b240d4acf5fbcd` — get_current_datetime Europe/Rome 16:17; team operativo; offre operatore; no fake offline / no invent tracking. Transfer tool al “sì”. |

### cs_ticket.no_fake_offline

Se nella reply precedente c’era “team offline” con orario diurno → Fail fino a re-paste prompt hours-branch.

| Score | Notes |
| --- | --- |
| Skip | Sostituito da in_hours dopo cambio modello |

### cs_ticket.start (legacy after-hours persona)

| Score | Notes |
| --- | --- |
| Pass* / superseded | `3b523cec…` — fingueva offline alle 16:09 senza datetime; modello aggiornato |

## Deferred (after 18:00)

- cs_ticket.offer / collect_confirm / refuse / after_hours.start
