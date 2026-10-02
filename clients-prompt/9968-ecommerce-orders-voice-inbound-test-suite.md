# Spoki Commerce / Demo 9968 — Test suite Voice Ecommerce order status

**Account Spoki:** 9968  
**Cliente:** Spoki Demo Vendita / Spoki Commerce  
**Agente:** [Template] Voice — Ecommerce order status (Shopify)  
**Tipo:** Vocale  
**Ambiente:** twin_text (P0 logic) + voice_playground (overlay) + voice_outbound (smoke)  
**Link Spoki:** https://app.spoki.com/ai/agent/b366de2b-9371-4fb7-9e87-ac7cde77fb2c  
**Twin text:** file pronto, agente Spoki non creato — [`9968-ecommerce-orders-text.md`](9968-ecommerce-orders-text.md)  
**Prompt:** [`9968-ecommerce-orders-voice-inbound.md`](9968-ecommerce-orders-voice-inbound.md)  
**KB:** `9968-ecommerce-orders-kb` + CSV shipping-returns  
**Shop:** `spoki-dev` / `neew-shopify` (tutti i metodi ON)  
**PRODUCT_LINK:** [331144](https://app.spoki.com/custom-fields/331144) = solo handle · auto [571639](https://app.spoki.com/automations/571639)  
**INVOICE_LINK:** [97498](https://app.spoki.com/custom-fields/97498) = solo token fattura · auto [571705](https://app.spoki.com/automations/571705)  
**Contatto test:** +393349173929 · email `giulio.trinchera@spoki.com` · ordini #1097 (bozza, fuori catalogo) e #1098 Babbol (pubblicato)  
**Langfuse:** [voice-agent](https://langfuse.ai.spoki.com/project/cmrw46ply0008o207yxewv4v1/traces)

## Canale

Il banco è la chiamata outbound verso +393349173929. Si traccia su Langfuse voice-agent, come le call già fatte. Il twin testuale non si usa in questa suite.

## Già visto in chiamata (29 set, non è uno score di suite)

| Pezzo | Esito |
| --- | --- |
| Conferma email + lista ordini #1097 e #1098 | Visto. Stato detto dalla lista, senza `get_order_by_id` |
| Scheda Y-3: handle in PRODUCT_LINK + 571639 | Secondo invio ok. Il primo ha mandato il valore vecchio del campo |
| Checkout: token in INVOICE_LINK + 571705 | Visto, call 56225. Bozza Shopify, non ordine pagato |
| `search_products` | Inaffidabile: "Babbol" e "makeup" tornano altri prodotti |
| FAQ reso, add_note, persona, email sbagliata, email vuota | Non provati |

## Come iniziare ora

1. Crea Voice + twin Text; sync prompt
2. Bind `neew-shopify` con **tutti** i metodi
3. Template WA: URL fisso + `%%PRODUCT_LINK%%`; auto 571639 attiva
4. KB txt + CSV
5. Ordine di prova sul customer del 334 (oggi 0 ordini)
6. Score vs prompt + success criteria

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati Account / Agente / Tipo | ☐ |
| 2 | Shopify tutti i metodi ON sull’agente | ☐ |
| 3 | PRODUCT_LINK 331144 + template pezzo fisso/dinamico allineati | ☐ |
| 4 | Auto 571639 attiva con step | ☐ |
| 5 | Prompt sync Voice + twin | ☐ |
| 6 | KB txt + CSV | ☐ |
| 7 | Actions: set field, trigger 571639, add_note | ☐ |
| 8 | Workflow / twin transfer | ☐ |
| 9 | Contatto 334 + **ordine reale** Shopify | ☐ |
| 10 | Chiavi da ruotare post-test | ☐ |

## Success criteria (da prompt)

- Stato ordine / tracking da Shopify, oppure
- Policy spedizione/reso da KB, oppure
- Follow-up staff dopo add_note, oppure
- Persona ora via Workflow / transfer

## Scenari

### P0 — twin_text

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| ecom.h1 | Intent ordine o prodotto | Non risaluta; una domanda | ☐ | |
| ecom.p1 | Cerca prodotto + manda WA | search/get → PRODUCT_LINK = handle → 571639 → dice inviato | ☐ | es. Babbol |
| ecom.o1 | Get Order by ID | status/tracking da tool | ☐ | ordine reale |
| ecom.o2 | Ordine non trovato | Non inventa | Pass | call 56281: 99999999 → Order not found, detto al cliente |
| ecom.c1 | Lista ordini | conferma EMAIL popolata → get_customer_orders | ☐ | |
| ecom.c2 | EMAIL popolata ma sbagliata | conferma no → overwrite → get_customer_orders | Pass | confermato dall'operatore su altri agenti, non ritestato qui |
| ecom.f1 | FAQ reso | KB | Pass | call 56238: 14 giorni, RMA, spese cliente |
| ecom.n1 | Danneggiato → add_note | sì → nota → follow-up | Pass | call 56253: sì, poi add_note, follow-up 1 giorno |
| ecom.d1 | Checkout | bozza → INVOICE_LINK = solo token → 571705, non 571639 | Pass | call 56225: messaggio WhatsApp col link di pagamento arrivato |
| ecom.t1 | Persona ora | transfer | Pass | call 56265: platform_transfer, "la passo a un operatore" |

### P1 — twin_text

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| ecom.g1 | PRODUCT_LINK senza dominio pieno | campo = path/handle, non https://… se template ha prefisso | ☐ | Langfuse |
| ecom.g2 | Rimborso immediato | Non promette | Pass | call 56298: niente rimborso, add_note vera. Il `[call tool]` era solo nel testo del modello, non in trascrizione |
| ecom.g3 | EMAIL unknown | spell + save prima lista ordini | ☐ | |

### Voice overlay — voice_playground (1 call)

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| voice.short_turns | Frasi corte | max 2–3 frasi | ☐ | |
| voice.one_question | Una domanda | una sola domanda | ☐ | |
| voice.no_tool_leak | No leak | niente nomi tool / JSON | ☐ | |

### Smoke — voice_outbound

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| ecom.v-o1 | Ordine reale a voce | get_order_by_id + status parlato; no URL | ☐ | automation → +393349173929 |

## Script copy-paste (P0)

**ecom.h1:** `Ciao, vorrei sapere dove è il mio ordine`  
**ecom.o1:** `Lo stato dell'ordine [NUMERO_REALE]`  
**ecom.o2:** `Ordine 99999999`  
**ecom.c1:** `Quali sono i miei ultimi ordini?` (contact con EMAIL) → conferma sì → tool  
**ecom.c2:** stesso script → agente legge EMAIL → tu: `No, è sbagliata` → nuova email → save → tool  
**ecom.f1:** `Entro quanti giorni posso fare un reso?`  
**ecom.n1:** `Il pacco è arrivato danneggiato, voglio un rimborso` → poi conferma sì al follow-up  
**ecom.t1:** `Voglio parlare con una persona`

## Mismatch / platform

| Area | Note |
| --- | --- |
| Integrazione account | Tutti e 7 i metodi Shopify ON a livello integrazione — sull’agente CS lasciarne off i 3 sales |
| Voice playground | %%FIELD%% vuoti → non testare o1/c1 lì |
| Credenziali | Client Secret + Storefront token da ruotare dopo la suite |
