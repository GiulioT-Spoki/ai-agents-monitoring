# Tool "Trova ID contatto" (get_contact_id)

Tool di test per recuperare l'ID interno Spoki di un contatto a partire dal suo numero di telefono. Serve come **primo passo** del flusso di assegnazione operatore: l'ID restituito viene poi passato al tool che assegna l'operatore (`POST /contacts/{id}/add_operator/`).

Chiama direttamente l'API Spoki, nessun intermediario.

---

## Configurazione tool (da incollare nel form Spoki)

- **Nome tool:** `get_contact_id`
- **Descrizione (quando usarlo):** Recupera l'ID interno del contatto a partire dal suo numero di telefono. Usalo quando devi compiere un'azione che richiede l'ID del contatto (es. assegnare un operatore). Restituisce l'ID nel campo `results[0].id`.
- **Metodo:** `GET`
- **URL:** `https://api.spoki.com/api/1/contacts/?phone={{contact_phone}}`
- **Headers:**
  - `X-Spoki-Api-Key: <INSERISCI_API_KEY>`
  - `Content-Type: application/json`

---

## Schema parametri

```json
{
  "type": "object",
  "properties": {
    "contact_phone": {
      "type": "string",
      "description": "Numero di telefono del contatto in formato E.164, con prefisso internazionale e il +. Esempio: +393331234567."
    }
  },
  "required": ["contact_phone"]
}
```

| Parametro | Tipo | Obbligatorio | Note |
| --- | --- | --- | --- |
| `contact_phone` | string | Sì | Formato E.164 con `+` (il filtro `phone=` senza `+` restituisce 0 risultati) |

Pre-popolamento: mappa `contact_phone` al dynamic field `%%PHONE%%`, che è già in formato E.164. Così l'agente non deve chiederlo all'utente.

---

## Risposta attesa

```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 37910031,
      "first_name": "Testo nome",
      "phone": "+393349173929",
      "email": null,
      "chat_link": "https://app.spoki.com/chats/..."
    }
  ]
}
```

L'ID da usare nei passi successivi è **`results[0].id`** (qui `37910031`).

- `count: 1` → contatto trovato.
- `count: 0` → nessun contatto con quel numero (verifica che il telefono sia in E.164 con il `+`).

---

## Note operative

- Endpoint **GET**: il numero va nella query string (`?phone=...`), non nel body.
- Il `+` del formato E.164 è obbligatorio per il match.
- Rate limit: 120/min.
- L'API key resta un placeholder (`<INSERISCI_API_KEY>`): inseriscila nel form del tool su Spoki, non nel testo del prompt.

---

## Riga di istruzione-tipo per il prompt dell'agente

> Quando ti serve l'ID del contatto (ad esempio per assegnare un operatore), chiama il tool `get_contact_id` passando il numero `%%PHONE%%`. Leggi l'ID dal campo `results[0].id` della risposta e usalo nel passo successivo. Non comunicare l'ID al cliente.
