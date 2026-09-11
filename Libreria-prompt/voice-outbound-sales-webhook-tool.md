# Tool Webhook "Registra lead outbound venditore" (voice_outbound_sales_webhook)

Configurazione riutilizzabile per un tool webhook da inserire nella sezione "Agent's tools" di un agente vocale outbound Spoki. Il tool persiste i dati raccolti in chiamata verso n8n, che orchestra l'aggiornamento CRM, la creazione task e la nota interna per il venditore.

Riferimenti:
- Schema payload: [`../outbound-sales-agent/webhook-payload.schema.json`](../outbound-sales-agent/webhook-payload.schema.json)
- Esempio: [`../outbound-sales-agent/webhook-payload.example.json`](../outbound-sales-agent/webhook-payload.example.json)
- Mapping CRM: [`voice-outbound-sales-crm-mapping.md`](voice-outbound-sales-crm-mapping.md)
- Verticali e campi: [`../outbound-sales-agent/vertical-config.json`](../outbound-sales-agent/vertical-config.json)

---

## Flusso logico

1. L'agente raccoglie i dati durante la chiamata (memoria conversazione + `%%...%%` pre-popolati).
2. Quando il lead è completo (vedi prompt), l'agente chiama `voice_outbound_sales_webhook` una sola volta.
3. n8n riceve il payload, arricchisce `call.*` e `timestamp` se mancanti, poi:
   - upsert contatto HubSpot / Spoki;
   - crea task o meeting in base a `next_action.type`;
   - scrive nota interna in chat Spoki;
   - risponde al tool con esito.
4. L'agente conferma al chiamante solo dopo risposta di successo dal tool.

---

## Configurazione tool (da incollare nel form Spoki)

- **Nome tool:** `voice_outbound_sales_webhook`
- **Descrizione (quando usarlo):** Registra il lead outbound a fine chiamata quando tutti i campi obbligatori sono stati raccolti. Estrae i dati dalla conversazione e li invia al sistema esterno. Chiamalo una sola volta per chiamata, dopo aver definito la prossima azione e redatto il riepilogo per il venditore. Non chiamarlo se la chiamata è terminata senza risposta o se mancano campi obbligatori.
- **Metodo:** `POST`
- **URL:** `https://<TUO_N8N>/webhook/voice-outbound-sales`
- **Headers:**
  - `Content-Type: application/json`

> La chiave API CRM/Spoki **non** va messa qui: vive dentro n8n.

---

## Schema parametri

Parametri che l'agente compila dinamicamente (function-calling). I nomi devono coincidere esattamente con i placeholder `{{...}}` nel body.

```json
{
  "type": "object",
  "properties": {
    "vertical": {
      "type": "string",
      "enum": ["generic_b2b", "automotive", "local_services", "real_estate"],
      "description": "Verticale commerciale. Default: generic_b2b."
    },
    "contact_phone": {
      "type": "string",
      "description": "Telefono del contatto in E.164. Usa %%PHONE%% se disponibile."
    },
    "first_name": {
      "type": "string",
      "description": "Nome del contatto raccolto o confermato in chiamata."
    },
    "last_name": {
      "type": "string",
      "description": "Cognome, se raccolto."
    },
    "email": {
      "type": "string",
      "description": "Email, se raccolta."
    },
    "company_name": {
      "type": "string",
      "description": "Nome azienda, se raccolto."
    },
    "role": {
      "type": "string",
      "description": "Ruolo del contatto in azienda, se raccolto."
    },
    "crm_contact_id": {
      "type": "string",
      "description": "ID contatto CRM se pre-popolato (%%CRM_CONTACT_ID%%)."
    },
    "assigned_rep_id": {
      "type": "string",
      "description": "ID venditore assegnato se pre-popolato (%%ASSIGNED_REP_ID%%)."
    },
    "qualification_status": {
      "type": "string",
      "enum": ["qualified", "not_qualified", "nurture"],
      "description": "Esito qualifica valutato dall'agente."
    },
    "interest_level": {
      "type": "string",
      "enum": ["hot", "warm", "cold"],
      "description": "Livello di interesse per prioritizzazione venditore."
    },
    "need": {
      "type": "string",
      "description": "Esigenza o obiettivo principale del contatto."
    },
    "current_solution": {
      "type": "string",
      "description": "Come gestisce oggi il problema, se emerso."
    },
    "budget_range": {
      "type": "string",
      "description": "Fascia di budget indicativa, se emersa."
    },
    "timeline": {
      "type": "string",
      "description": "Entro quando vorrebbe procedere."
    },
    "decision_maker": {
      "type": "string",
      "description": "Chi decide l'acquisto, se emerso."
    },
    "objections": {
      "type": "string",
      "description": "Obiezioni emerse, separate da punto e virgola."
    },
    "competitor_mentioned": {
      "type": "string",
      "description": "Competitor citato dal contatto, se presente."
    },
    "disqualification_reason": {
      "type": "string",
      "description": "Motivo se qualification_status è not_qualified."
    },
    "marca": {
      "type": "string",
      "description": "Solo verticale automotive: marca veicolo di interesse."
    },
    "modello": {
      "type": "string",
      "description": "Solo verticale automotive: modello veicolo."
    },
    "regione": {
      "type": "string",
      "description": "Solo verticale automotive o local_services: regione/zona."
    },
    "transaction_type": {
      "type": "string",
      "enum": ["buy", "rent", "sell"],
      "description": "Solo verticale real_estate."
    },
    "area": {
      "type": "string",
      "description": "Solo verticale real_estate: zona di interesse."
    },
    "city": {
      "type": "string",
      "description": "Solo verticale local_services: città."
    },
    "postal_code": {
      "type": "string",
      "description": "Solo verticale local_services: CAP."
    },
    "address": {
      "type": "string",
      "description": "Solo verticale local_services: indirizzo completo se raccolto."
    },
    "next_action_type": {
      "type": "string",
      "enum": [
        "callback_requested",
        "appointment_booked",
        "send_quote",
        "send_brochure",
        "call_back_later",
        "no_interest"
      ],
      "description": "Prossima azione concordata o dedotta dalla chiamata."
    },
    "preferred_datetime": {
      "type": "string",
      "description": "Data/ora preferita per ricontatto in ISO 8601 con offset, se emersa."
    },
    "appointment_datetime": {
      "type": "string",
      "description": "Data/ora appuntamento confermato, se prenotato in chiamata."
    },
    "appointment_location": {
      "type": "string",
      "description": "Luogo appuntamento: sede, indirizzo cliente o video call."
    },
    "consent_to_contact": {
      "type": "boolean",
      "description": "True se il contatto acconsente al ricontatto."
    },
    "summary": {
      "type": "string",
      "description": "Riepilogo discorsivo per il venditore: contesto, interesse, obiezioni, prossimo passo. Minimo 2 frasi."
    }
  },
  "required": [
    "vertical",
    "contact_phone",
    "first_name",
    "qualification_status",
    "next_action_type",
    "summary"
  ]
}
```

| Parametro | Tipo | Obbligatorio | Note |
| --- | --- | --- | --- |
| `vertical` | enum | Sì | Default `generic_b2b` nel prompt |
| `contact_phone` | string | Sì | Pre-popola con `%%PHONE%%` |
| `first_name` | string | Sì | |
| `qualification_status` | enum | Sì | |
| `next_action_type` | enum | Sì | |
| `summary` | string | Sì | Per venditore/CRM |
| Campi vertical-specific | string | Condizionale | Vedi `vertical-config.json` |
| `need`, `timeline` | string | Sì per `generic_b2b` | Raccolti in chiamata, inviati nel body |

Pre-popolamento: nel form del tool mappa `contact_phone` → `%%PHONE%%`, `crm_contact_id` → `%%CRM_CONTACT_ID%%`, `assigned_rep_id` → `%%ASSIGNED_REP_ID%%`.

---

## Body JSON inviato a n8n

```json
{
  "event": "voice_outbound.completed",
  "vertical": "{{vertical}}",
  "contact": {
    "phone": "{{contact_phone}}",
    "first_name": "{{first_name}}",
    "last_name": "{{last_name}}",
    "email": "{{email}}",
    "company_name": "{{company_name}}",
    "role": "{{role}}",
    "crm_contact_id": "{{crm_contact_id}}",
    "assigned_rep_id": "{{assigned_rep_id}}"
  },
  "qualification": {
    "status": "{{qualification_status}}",
    "interest_level": "{{interest_level}}",
    "need": "{{need}}",
    "current_solution": "{{current_solution}}",
    "budget_range": "{{budget_range}}",
    "timeline": "{{timeline}}",
    "decision_maker": "{{decision_maker}}",
    "objections": "{{objections}}",
    "competitor_mentioned": "{{competitor_mentioned}}",
    "disqualification_reason": "{{disqualification_reason}}"
  },
  "product_context": {
    "marca": "{{marca}}",
    "modello": "{{modello}}",
    "regione": "{{regione}}",
    "transaction_type": "{{transaction_type}}",
    "area": "{{area}}"
  },
  "location": {
    "city": "{{city}}",
    "postal_code": "{{postal_code}}",
    "address": "{{address}}"
  },
  "next_action": {
    "type": "{{next_action_type}}",
    "preferred_datetime": "{{preferred_datetime}}",
    "appointment_datetime": "{{appointment_datetime}}",
    "appointment_location": "{{appointment_location}}",
    "consent_to_contact": {{consent_to_contact}}
  },
  "summary": "{{summary}}"
}
```

> n8n aggiunge `timestamp` e `call.*` lato server. Per `objections`, n8n può fare split su `;` e produrre un array.

---

## Workflow n8n (schema)

**Nodo 1 — Webhook (trigger)**  
`POST /webhook/voice-outbound-sales`

**Nodo 2 — Set: normalizza payload**  
- `timestamp` = `new Date().toISOString()`  
- `objections` = split su `;` se stringa  
- Rimuovi chiavi vuote da `product_context` e `location`

**Nodo 3 — Switch: `next_action.type`**

| Branch | Azione |
| --- | --- |
| `callback_requested`, `call_back_later`, `send_quote`, `send_brochure` | Crea task HubSpot |
| `appointment_booked` | Crea/aggiorna meeting |
| `no_interest` | Solo aggiorna contatto |
| default | Upsert contatto |

**Nodo 4 — HTTP: upsert HubSpot contact**  
Vedi mapping in [`voice-outbound-sales-crm-mapping.md`](voice-outbound-sales-crm-mapping.md).

**Nodo 5 — HTTP: nota Spoki**  
`POST /api/1/messages/send/` con `type: "Note"`.

**Nodo 6 — Respond to Webhook**  
`{ "status": "ok", "contact_id": "...", "task_id": "..." }`

---

## Risposta attesa al tool

```json
{
  "status": "ok",
  "crm_contact_id": "12345",
  "task_id": "67890"
}
```

L'agente usa questa risposta per confermare al chiamante che verrà ricontattato.

---

## Note operative

- Chiamare il tool **una sola volta** per chiamata completata con risposta.
- Non confermare la registrazione al chiamante finché il tool non restituisce successo (stesso pattern di Giovanna).
- Se il tool fallisce, riprova una volta; se fallisce di nuovo, scusati e indica che un consulente ricontatterà manualmente.
- Per verticale `automotive`, i campi `marca`, `modello`, `regione` diventano obbligatori nel prompt anche se opzionali nello schema tool.
- Rate limit: progettato per 1 chiamata tool per conversazione; ampiamente sotto i limiti Spoki/n8n.
