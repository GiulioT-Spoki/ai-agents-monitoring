# Spoki Demo Vendita 9968 — Test suite VOICE - WEBINAR 14/10/26

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)
**Cliente:** Spoki Demo Vendita — brand SPOKI FASHION SHOP
**Agente:** VOICE - WEBINAR 14/10/26
**Notion:** [VOICE - WEBINAR 14/10/26](https://app.notion.com/p/3ece5c7af25c8154bc12d0954c0e0c13)
**Tipo:** Vocale
**Ambiente:** `voice_outbound` (automazione Spoki Voice → contatto test; TBD dopo create agente)
**Link Spoki:** https://app.spoki.com/ai/agent/58ef6461-6304-40bb-88c8-1cc16066481a
**Prompt:** [`9968-fashion-styling-voice-inbound.md`](9968-fashion-styling-voice-inbound.md)
**Path suite YAML:** `clients-prompt/9968-fashion-styling-voice-inbound-suite.yaml`
**KB rules:** [`9968-fashion-styling-voice-inbound-kb.md`](../clients-kb/9968-fashion-styling-voice-inbound-kb.md)
**KB catalogue:** [`9968-fashion-styling-catalogue.csv`](../clients-kb/9968-fashion-styling-catalogue.csv)
**KB pairings:** [`9968-fashion-styling-pairings.csv`](../clients-kb/9968-fashion-styling-pairings.csv)

Niente gemello testuale. Ogni scenario = chiamata sul contatto **+393349173929** (dopo automazione). Score: transcript parlato + span Langfuse + no leak.

## Come iniziare ora

1. Sync system prompt da `# System prompt (Spoki)` del file prompt
2. First message = stringa nel file prompt
3. KB: export `.txt` da `9968-fashion-styling-voice-inbound-kb.md` + upload `9968-fashion-styling-catalogue.csv` + `9968-fashion-styling-pairings.csv`
4. Tools: `sales-rep-calendar-booking` (get_available_time_slots, create_calendar_event) + search_knowledge_base + get_current_datetime
5. Actions: `set_contact_field_value` **solo EMAIL** (mai FIRST_NAME / LAST_NAME)
6. Contatto fisso: **+393349173929**
7. Dopo ogni call: controlla ultimo tracing

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Prompt sync (fashion flow, no BANT, no FIRST/LAST actions) | ☐ |
| 2 | KB collegata `.txt` | ☐ |
| 3 | Tool calendar bind → get_available_time_slots + create_calendar_event | ☐ |
| 4 | search_knowledge_base + get_current_datetime | ☐ |
| 5 | Action set_contact_field_value EMAIL only | ☐ |
| 6 | Automazione call → **+393349173929** | ☐ |
| 7 | Langfuse voice-agent search agent id | ☐ |

## Scenari P0 — voice_outbound

| ID | Scenario | Contatto | Atteso | Pass | Trace |
| --- | --- | --- | --- | --- | --- |
| v.greeting | Apertura | qualunque | Dopo First Message: no secondo saluto; chiarisce occasione (1 domanda); **non** chiede nome né genere | ☐ | |
| v.style | Intake stile | qualunque | occasione → silhouette → gusto → budget soft; una domanda a turno; poi KB + 1–2 abbinamenti + micro-feedback | ☐ | |
| v.lane_menswear | Ufficio / completo | qualunque | segnale completo/ufficio → Pairing C (menswear/day tailored); **non** chiede uomo/donna | ☐ | |
| v.lane_womenswear | Cena / abito | qualunque | segnale abito/cena → Pairing A o B; **non** chiede uomo/donna | ☐ | |
| v.faq | Orari / pezzo in KB | qualunque | search_knowledge_base; fatti boutique o prezzo pezzo da KB; no invent; no leak tool | ☐ | |
| v.out_of_catalog | Pezzo fuori catalogo | qualunque | non inventa; dice che non è in catalogo (o offre alternativa KB); no prezzi inventati | ☐ | |
| v.email_confirm | EMAIL già popolata | EMAIL nota | dopo accettazione visita: pronuncia email, chiede conferma; se ok → **set EMAIL** (overwrite) poi slots; se diversa → spell + set EMAIL; **mai** chiedere di dettare se già valorizzata | ☐ | |
| v.decline_visit | Rifiuto visita | qualunque | dopo consiglio, se rifiuta visita: ringrazia, chiude, **no** calendar | ☐ | |
| v.book | Happy path book | EMAIL da raccogliere o da confermare | consiglio → visite sì → email → datetime → slots → create solo dopo accept; Summary boutique; Attendees = email | ☐ | |

### Overlay (stessa call o Start Call)

| ID | Atteso | Pass | Note |
| --- | --- | --- | --- |
| voice.short_turns | max 2–3 frasi | ☐ | |
| voice.one_question | una domanda | ☐ | |
| voice.no_tool_leak | no nomi tool/action | ☐ | |
| voice.no_name_fields | mai set FIRST_NAME / LAST_NAME | ☐ | |
| voice.no_gender_ask | mai “è uomo o donna?” | ☐ | |

## Script operatore (quando risponde)

**v.greeting**
- Dopo il first message: “Cerco un look per una cena formale”
- Atteso: non risaluta; non chiede nome; una domanda di stile/occasione

**v.style**
- Occasione cena formale → silhouette abito → stile classico → budget circa 500 euro
- Atteso: KB; propone Pairing A (womenswear); micro-feedback; una domanda a turno; mai chiede genere

**v.lane_menswear**
- “Cerco un completo per l’ufficio, business casual”
- Atteso: Pairing C (o pezzi da C); non chiede se è uomo/donna

**v.lane_womenswear**
- “Vorrei un abito per una cena formale”
- Atteso: Pairing A o B; non chiede se è uomo/donna

**v.faq**
- “A che ora è aperta la boutique?” oppure “Quanto costa il blazer Brera?”
- Atteso: KB; Lun–Ven 09–18 / da ~€430 blazer o look da ~€500; non inventa

**v.out_of_catalog**
- “Avete sneakers Gucci rosse fluorescenti?”
- Atteso: non inventa il pezzo; resta sul catalogo demo; opzionale alternativa da KB

**v.email_confirm**
- Contatto con EMAIL già valorizzata
- Accetta visita in boutique
- Atteso: conferma email a voce; se “sì” → set EMAIL (overwrite) poi calendar; se “no, è …” → spell + set EMAIL; non chiedere spelling se già valorizzata

**v.decline_visit**
- Dopo il consiglio: “Per ora no, grazie, non voglio prenotare”
- Atteso: ringrazia; fine; zero get_available_time_slots / create_calendar_event

**v.book**
- Cena formale, abito, classico, budget ~500, accetta visita
- Email (spell + conferma) se mancante
- Accetta primo slot weekday
- Atteso: get_current_datetime → get_available_time_slots → create_calendar_event con Summary `Boutique visit - SPOKI FASHION SHOP`, attendees email, start/end locale 15 min; conferma solo dopo success

## Esiti

| ID | Pass | Note |
| --- | --- | --- |
| v.greeting | ☐ | |
| v.style | ☐ | |
| v.lane_menswear | ☐ | |
| v.lane_womenswear | ☐ | |
| v.faq | ☐ | |
| v.out_of_catalog | ☐ | |
| v.email_confirm | ☐ | |
| v.decline_visit | ☐ | |
| v.book | ☐ | |
| voice.short_turns | ☐ | |
| voice.one_question | ☐ | |
| voice.no_tool_leak | ☐ | |
| voice.no_name_fields | ☐ | |
| voice.no_gender_ask | ☐ | |
