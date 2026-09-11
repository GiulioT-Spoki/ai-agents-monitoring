# Tool Webhook "Passa a operatore umano" (transfer_to_human)

Configurazione riutilizzabile per un tool webhook da inserire nella sezione "Agent's tools" di un agente Spoki. Il tool gestisce l'handoff a un operatore umano e, contestualmente, lascia in chat una **nota di riepilogo** con il contesto raccolto dall'AI, così l'operatore non deve rileggere tutta la conversazione.

Si tratta di un'azione composta (nota + assegnazione), quindi il tool **non chiama direttamente l'API Spoki** ma un **webhook n8n** che orchestra in sequenza due chiamate REST a Spoki.

---

## Flusso logico

1. L'AI decide di trasferire (richiesta del cliente, risposta non affidabile, verifica specifica, valutazione clinica) e compila i parametri.
2. n8n riceve la chiamata e:
   - scrive una **nota di chat** (`type: "Note"`) con il riepilogo, via `POST /api/1/messages/send/`;
   - dalla risposta della nota recupera `contact.id`;
   - **assegna l'operatore** scelto, via `POST /api/1/contacts/{id}/add_operator/`.
3. n8n risponde al tool con esito e nome operatore assegnato.

> Comodità sfruttata: la risposta dell'Add Note include l'oggetto `contact` con il suo `id`, che `add_operator` richiede al posto del telefono. Nessuna lookup aggiuntiva.

---

## Configurazione tool (da incollare nel form Spoki)

- **Nome tool:** `transfer_to_human`
- **Descrizione (quando usarlo):** Trasferisci la conversazione a un operatore umano quando il cliente lo richiede esplicitamente, quando non trovi una risposta affidabile entro i tentativi previsti, quando servono verifiche specifiche o quando è richiesta una valutazione clinica/su ricetta. Prima di chiamare il tool, raccogli un riepilogo sintetico della richiesta e gli eventuali dati utili (nome, email, numero ordine, motivo).
- **Metodo:** `POST`
- **URL:** `https://<TUO_N8N>/webhook/transfer-to-human`
- **Headers:**
  - `Content-Type: application/json`

> La chiave API Spoki **non** va messa qui: vive dentro n8n. Il tool parla solo con n8n.

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
    "operator_email": {
      "type": "string",
      "enum": ["giulio.trinchera@spoki.com", "riccardo.marino@spoki.com"],
      "description": "Email dell'operatore a cui assegnare la chat, scelto in base al tipo di assistenza necessaria."
    },
    "reason": {
      "type": "string",
      "description": "Motivo del trasferimento: perché l'AI sta passando la chat (es. valutazione clinica, prodotto non disponibile, richiesta esplicita del cliente)."
    },
    "summary": {
      "type": "string",
      "description": "Riepilogo sintetico della conversazione e delle richieste del cliente, utile all'operatore per avere subito il contesto."
    },
    "customer_name": {
      "type": "string",
      "description": "Nome e cognome del cliente, se raccolti durante la conversazione."
    },
    "customer_email": {
      "type": "string",
      "description": "Email del cliente, se raccolta."
    },
    "order_id": {
      "type": "string",
      "description": "Numero/identificativo ordine, se pertinente e raccolto."
    }
  },
  "required": ["contact_phone", "operator_email", "reason", "summary"]
}
```

| Parametro | Tipo | Obbligatorio | Note |
| --- | --- | --- | --- |
| `contact_phone` | string | Sì | Formato E.164 (`+393331234567`) |
| `operator_email` | string (enum) | Sì | Operatore destinatario dell'handoff |
| `reason` | string | Sì | Perché si trasferisce |
| `summary` | string | Sì | Riepilogo per l'operatore |
| `customer_name` | string | No | Se raccolto |
| `customer_email` | string | No | Se raccolto |
| `order_id` | string | No | Se pertinente |

Pre-popolamento del telefono: nel form del tool mappa `contact_phone` al dynamic field `%%PHONE%%`, così l'agente non deve chiederlo.

---

## Body JSON inviato a n8n

```json
{
  "contact_phone": "{{contact_phone}}",
  "operator_email": "{{operator_email}}",
  "reason": "{{reason}}",
  "summary": "{{summary}}",
  "customer_name": "{{customer_name}}",
  "customer_email": "{{customer_email}}",
  "order_id": "{{order_id}}"
}
```

---

## Workflow n8n

**Nodo 1 — Webhook (trigger)**
Riceve il body qui sopra su `POST /webhook/transfer-to-human`.

**Nodo 2 — HTTP Request: scrivi nota di riepilogo**
- Method: `POST`
- URL: `https://api.spoki.com/api/1/messages/send/`
- Headers: `X-Spoki-Api-Key: <API_KEY_SPOKI>`, `Content-Type: application/json`
- Body (JSON). Il testo della nota è composto dai campi; si usa `JSON.stringify` sul testo per evitare errori di JSON non valido con eventuali a capo:

```
{
  "type": "Note",
  "content_type": "Text",
  "phone": "{{ $json.body.contact_phone }}",
  "text": {{ JSON.stringify(
      "Handoff AI -> operatore\n"
      + "Motivo: " + ($json.body.reason || "-") + "\n"
      + "Cliente: " + ($json.body.customer_name || "-") + "\n"
      + "Email: " + ($json.body.customer_email || "-") + "\n"
      + "Ordine: " + ($json.body.order_id || "-") + "\n\n"
      + "Riepilogo: " + ($json.body.summary || "-")
  ) }}
}
```

**Nodo 3 — HTTP Request: assegna operatore**
- Method: `POST`
- URL: `https://api.spoki.com/api/1/contacts/{{ $json.contact.id }}/add_operator/`
  (`contact.id` arriva dalla risposta del Nodo 2)
- Headers: `X-Spoki-Api-Key: <API_KEY_SPOKI>`, `Content-Type: application/json`
- Body:

```json
{
  "email": "{{ $('Webhook').item.json.body.operator_email }}"
}
```

**Nodo 4 — Respond to Webhook**
Restituisce al tool un esito sintetico, es. `{ "status": "ok", "assigned_to": "<email>" }`, che l'AI può usare per confermare al cliente.

---

## Note operative

- L'operatore indicato in `operator_email` **deve già essere un utente dell'account Spoki** (invitato e attivo da `https://spoki.app/users-and-roles`). Se l'email non corrisponde a un operatore, `add_operator` risponde `spoki::3004 - "No operator found with this email"`.
- `add_operator` ha **rate limit 5/min**: ampiamente sufficiente per handoff conversazionali.
- La **nota di chat** non viene inviata al cliente: resta come annotazione interna nella conversazione, visibile all'operatore.
- Le due email sono **placeholder**: aggiorna l'`enum` quando avrai gli operatori definitivi e la regola di routing per tipo di assistenza (es. prodotti/privati vs clinico/ricetta vs ordini).
- In alternativa all'`enum` di email, si può esporre un parametro semantico `assistance_type` e mappare tipo → email dentro n8n, tenendo le email fuori dal prompt dell'agente.

---

## Riga di istruzione-tipo per il prompt dell'agente

Da inserire nella sezione strumenti del prompt (l'agente Pharmalab richiama già `transfer_to_human`):

> Quando devi passare la conversazione a una persona reale (richiesta esplicita del cliente, risposta non affidabile dopo i tentativi previsti, verifica specifica, valutazione clinica o tema su ricetta), prepara un riepilogo sintetico della richiesta con i dati raccolti (nome, email, ordine se presenti), scegli l'operatore adeguato al tipo di assistenza e chiama `transfer_to_human`. Conferma poi al cliente che un operatore specializzato lo prenderà in carico.
