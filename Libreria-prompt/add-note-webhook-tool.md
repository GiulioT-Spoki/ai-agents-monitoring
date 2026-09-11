# Tool "Crea nota di riepilogo in chat" (add_note)

Tool che scrive una **nota interna** nella chat di un contatto, usata per lasciare all'operatore umano un riepilogo del contesto raccolto dall'AI prima di un handoff. La nota non viene inviata al cliente: resta visibile solo agli operatori nella conversazione.

Chiama direttamente l'API Spoki. A differenza dell'assegnazione operatore, qui **non serve l'id del contatto**: l'endpoint lavora con il telefono, quindi nessun problema di parametri nel path.

Testato dal vivo: `POST /messages/send/` con `type: "Note"` risponde `200` e restituisce l'`uuid` della nota.

---

## Configurazione tool (da incollare nel form Spoki)

- **Nome tool:** `add_note`
- **Descrizione (quando usarlo):** Scrivi una nota interna nella chat con il riepilogo delle informazioni raccolte, da usare quando stai passando la conversazione a un operatore umano. Includi motivo della richiesta, dati del cliente già emersi (nome, email, ordine) e un breve riassunto. La nota è solo per gli operatori, non viene inviata al cliente.
- **Metodo:** `POST`
- **URL:** `https://api.spoki.com/api/1/messages/send/`
- **Headers:**
  - `X-Spoki-Api-Key: <INSERISCI_API_KEY>`
  - `Content-Type: application/json`

---

## Body — parametri

Il body da inviare è:

```json
{
  "type": "Note",
  "content_type": "Text",
  "phone": "%%PHONE%%",
  "text": "<riepilogo composto dall'AI>"
}
```

Nel form Spoki, sezione **Body**, definisci quattro parametri:

| Name | Handler | Valore | Note |
| --- | --- | --- | --- |
| `type` | Valore fisso (se disponibile) altrimenti LLM | `Note` | Deve essere esattamente `Note` |
| `content_type` | Valore fisso (se disponibile) altrimenti LLM | `Text` | Deve essere esattamente `Text` |
| `phone` | Dynamic field | `%%PHONE%%` | Telefono del contatto, già in E.164 |
| `text` | LLM | — | Il riepilogo scritto dall'agente |

Note sui valori fissi: se il form non offre un handler "valore fisso/costante", imposta `type` e `content_type` come parametri LLM con una **descrizione vincolante** che imponga il valore esatto (es. per `type`: "Restituisci sempre ed esclusivamente la parola: Note"; per `content_type`: "Restituisci sempre ed esclusivamente la parola: Text").

Schema parametro `text` (function-calling):

```json
{
  "type": "object",
  "properties": {
    "text": {
      "type": "string",
      "description": "Riepilogo per l'operatore: motivo del trasferimento, nome/email/ordine se emersi, e un breve riassunto della richiesta del cliente. Testo discorsivo, niente formattazione."
    }
  },
  "required": ["text"]
}
```

---

## Risposta attesa

```json
{ "uuid": "b7614246-4b93-40d1-8c58-f70985c2b663" }
```

`HTTP 200` con l'`uuid` della nota creata → nota scritta correttamente in chat.

---

## Note operative

- La nota **non** viene inviata al cliente: è un'annotazione interna alla chat, visibile agli operatori.
- Non è soggetta alle regole WhatsApp (niente finestra 24h, niente template): viene sempre registrata.
- `phone` deve essere in E.164; `%%PHONE%%` lo è già.
- Rate limit dell'endpoint nota: 240/min.
- L'API key resta un placeholder (`<INSERISCI_API_KEY>`): va nel form del tool, non nel prompt.

---

## Riga di istruzione-tipo per il prompt dell'agente

> Quando stai per passare la conversazione a un operatore, prima chiama il tool `add_note` con un riepilogo che includa il motivo del trasferimento, i dati del cliente già emersi (nome, email, eventuale numero ordine) e un breve riassunto della richiesta. Non comunicare al cliente che stai scrivendo una nota interna.
