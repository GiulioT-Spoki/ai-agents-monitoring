# Tool Webhook "Raccolta dati" (collect_data_webhook)

Configurazione riutilizzabile per un tool webhook da inserire nella sezione "Agent's tools" di un agente vocale Spoki. Il tool invia i dati raccolti in chiamata a un endpoint esterno (n8n, CRM, foglio Google, ecc.).

Prompt di riferimento: [`data-collection-voice-outbound.md`](../voice-agents-prompts/data-collection-voice-outbound.md). Qualifica lead + ricontatto (campi Spoki via action, senza questo webhook): [`lead-qualification-voice-callback.md`](../voice-agents-prompts/lead-qualification-voice-callback.md).

---

## Flusso logico

1. L'agente raccoglie i campi durante la chiamata (memoria conversazione + `%%...%%` pre-popolati).
2. Quando i campi obbligatori sono disponibili (default: nome + motivo), l'agente chiama `collect_data_webhook` una sola volta.
3. n8n riceve il payload, lo inoltra alla destinazione configurata (CRM, sheet, API esterna).
4. n8n risponde al tool con esito; l'agente conferma al chiamante solo dopo successo.

---

## Configurazione tool (da incollare nel form Spoki)

- **Nome tool:** `collect_data_webhook`
- **Descrizione (quando usarlo):** Registra i dati raccolti durante la chiamata. Chiamalo una sola volta quando nome e motivo del contatto sono disponibili. Non chiamarlo se mancano i campi obbligatori o se la chiamata non ha avuto risposta.
- **Metodo:** `POST`
- **URL:** `https://<TUO_N8N>/webhook/collect-data`
- **Headers:**
  - `Content-Type: application/json`

> Credenziali API esterne (CRM, Spoki, ecc.) restano in n8n, non nel tool.

---

## Schema parametri

```json
{
  "type": "object",
  "properties": {
    "contact_phone": {
      "type": "string",
      "description": "Numero di telefono del contatto in formato E.164. Esempio: +393331234567."
    },
    "first_name": {
      "type": "string",
      "description": "Nome del contatto raccolto o confermato in chiamata."
    },
    "last_name": {
      "type": "string",
      "description": "Cognome del contatto, se raccolto."
    },
    "email": {
      "type": "string",
      "description": "Email del contatto, se raccolta."
    },
    "reason": {
      "type": "string",
      "description": "Motivo del contatto o descrizione della richiesta."
    },
    "notes": {
      "type": "string",
      "description": "Note aggiuntive fornite dal contatto prima della registrazione, se presenti."
    }
  },
  "required": ["contact_phone", "first_name", "reason"]
}
```

| Parametro | Tipo | Obbligatorio | Note |
| --- | --- | --- | --- |
| `contact_phone` | string | Sì | Formato E.164; pre-popola con `%%PHONE%%` |
| `first_name` | string | Sì | |
| `reason` | string | Sì | Motivo o richiesta |
| `last_name` | string | No | |
| `email` | string | No | |
| `notes` | string | No | |

Pre-popolamento: nel form del tool mappa `contact_phone` al dynamic field `%%PHONE%%`.

---

## Body JSON inviato a n8n

```json
{
  "contact_phone": "{{contact_phone}}",
  "first_name": "{{first_name}}",
  "last_name": "{{last_name}}",
  "email": "{{email}}",
  "reason": "{{reason}}",
  "notes": "{{notes}}"
}
```

---

## Workflow n8n (schema minimo)

**Nodo 1 — Webhook (trigger)**  
Riceve il body su `POST /webhook/collect-data`.

**Nodo 2 — Set: normalizza**  
- `timestamp` = `new Date().toISOString()`  
- Rimuovi chiavi con valore vuoto

**Nodo 3 — Destinazione** (scegli una o più):
- HTTP Request verso CRM (HubSpot, Salesforce, ecc.)
- Google Sheets → Append Row
- Spoki API → aggiorna contatto o scrivi nota

**Nodo 4 — Respond to Webhook**  
`{ "status": "ok" }`

### Esempio mapping Google Sheets

| Colonna | Campo |
| --- | --- |
| A | timestamp |
| B | contact_phone |
| C | first_name |
| D | last_name |
| E | email |
| F | reason |
| G | notes |

### Esempio nota Spoki (opzionale)

```
POST https://api.spoki.com/api/1/messages/send/
{
  "type": "Note",
  "content_type": "Text",
  "phone": "{{ $json.body.contact_phone }}",
  "text": "Dati raccolti in chiamata\nNome: {{ $json.body.first_name }} {{ $json.body.last_name }}\nEmail: {{ $json.body.email }}\nMotivo: {{ $json.body.reason }}\nNote: {{ $json.body.notes }}"
}
```

---

## Risposta attesa al tool

```json
{
  "status": "ok"
}
```

L'agente usa questa risposta per confermare al chiamante che la richiesta è stata registrata.

---

## Note operative

- Chiamare il tool **una sola volta** per chiamata completata.
- Non confermare la registrazione al chiamante finché il tool non restituisce successo.
- Se il tool fallisce, riprova una volta; se fallisce di nuovo, scusati e indica che la richiesta verrà gestita manualmente.
- Per aggiungere campi custom, estendi lo schema parametri e la sezione "Campi da raccogliere" nel prompt.

---

## Riga di istruzione-tipo per il prompt dell'agente

> Quando nome e motivo del contatto sono disponibili, chiedi se desidera aggiungere altro, poi chiama `collect_data_webhook` con tutti i dati raccolti. Conferma al chiamante che la richiesta è stata registrata solo dopo risposta di successo dal tool.
