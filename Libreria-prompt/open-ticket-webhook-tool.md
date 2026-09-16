# Tool Webhook "Apri Ticket" (tool-api-open-ticket)

Configurazione riutilizzabile per un tool webhook da inserire nella sezione "Agent's tools" di un agente Spoki. Il tool chiama l'API REST di Spoki per aprire un ticket di assistenza.

Assistenza vocale inbound (FAQ + prova + ticket via webhook): [`customer-support-voice-inbound.md`](../voice-agents-prompts/customer-support-voice-inbound.md). Variante senza API (action nativa `create_ticket`): [`customer-support-voice-inbound-native-ticket.md`](../voice-agents-prompts/customer-support-voice-inbound-native-ticket.md).

Prerequisito: la feature "Tickets" deve essere abilitata sull'account Spoki, altrimenti l'endpoint non e' disponibile.

---

## Configurazione tool (da incollare nel form Spoki)

- **Nome tool:** `tool-api-open-ticket`
- **Descrizione (quando usarlo):** Apri un ticket di assistenza quando il problema dell'utente non si risolve nella conversazione e va tracciato o preso in carico da un operatore. Raccogli prima un titolo sintetico del problema e una descrizione con i dettagli rilevanti.
- **Metodo:** `POST`
- **URL:** `https://api.spoki.com/api/1/tickets/`
- **Headers:**
  - `X-Spoki-Api-Key: <INSERISCI_API_KEY>`
  - `Content-Type: application/json`

---

## Schema parametri

Parametri che l'agente compila dinamicamente (stile function-calling):

```json
{
  "type": "object",
  "properties": {
    "contact_phone": {
      "type": "string",
      "description": "Numero di telefono del contatto in formato E.164 (prefisso internazionale con +). Esempio: +393331234567."
    },
    "title": {
      "type": "string",
      "description": "Titolo sintetico del ticket: un riassunto breve del problema o della richiesta."
    },
    "description": {
      "type": "string",
      "description": "Descrizione dettagliata del problema con i dati raccolti dalla conversazione."
    },
    "status": {
      "type": "string",
      "enum": ["Open", "In Progress", "Pending", "Closed"],
      "description": "Stato iniziale del ticket. Usa Open quando lo apri.",
      "default": "Open"
    },
    "priority": {
      "type": "string",
      "enum": ["Highest", "High", "Medium", "Low"],
      "description": "Priorita' del ticket in base all'urgenza riferita dall'utente.",
      "default": "Medium"
    },
    "reference": {
      "type": "string",
      "description": "Riferimento esterno opzionale (es. ID ordine o codice da un altro sistema) per il tracciamento."
    }
  },
  "required": ["contact_phone", "title", "status"]
}
```

| Parametro | Tipo | Obbligatorio | Note |
| --- | --- | --- | --- |
| `contact_phone` | string | Si | Formato E.164 (`+393331234567`) |
| `title` | string | Si | Riassunto breve del problema |
| `status` | string | Si | `Open` all'apertura |
| `priority` | string | No | Default `Medium` |
| `description` | string | No | Consigliata: dettagli del problema |
| `reference` | string | No | Riferimento esterno per il tracciamento |

---

## Template body JSON

Il body inviato all'endpoint mappa direttamente i parametri del tool:

```json
{
  "contact_phone": "{{contact_phone}}",
  "title": "{{title}}",
  "status": "{{status}}",
  "priority": "{{priority}}",
  "description": "{{description}}",
  "reference": "{{reference}}"
}
```

Pre-popolamento del telefono: nel form del tool puoi mappare `contact_phone` al dynamic field del contatto `%%PHONE%%`, cosi' l'agente non deve chiederlo all'utente. Se l'agente lo raccoglie manualmente, assicurati che sia comunque in formato E.164.

---

## Note operative

- Abilita la feature "Tickets" sull'account Spoki prima di testare il tool.
- `contact_phone` deve essere sempre in formato E.164 (con prefisso internazionale e `+`); numeri senza prefisso vengono rifiutati.
- L'API key resta un placeholder (`<INSERISCI_API_KEY>`): inseriscila nel form del tool su Spoki, non lasciarla nel testo del prompt.
- Risposta attesa: l'API restituisce l'oggetto ticket creato, incluso il suo `id`, utile per eventuali messaggi di conferma.

### Riga di istruzione-tipo per il prompt dell'agente

Da inserire nella sezione strumenti del prompt dell'agente che usera' il tool (esempio: al posto del `PLACEHOLDER_TOOL_NAME` nel prompt di Tecno Clinic):

> Quando il problema dell'utente non si risolve in chat e va preso in carico, raccogli un titolo sintetico e una descrizione del problema, poi chiama il tool `tool-api-open-ticket` per aprire il ticket. Conferma all'utente che la richiesta e' stata registrata.
