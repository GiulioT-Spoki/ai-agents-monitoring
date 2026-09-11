# Tool Webhook di prova "Echo URL dinamici" (test_helevo_url)

Tool temporaneo per verificare in Spoki playground che la sostituzione di `{{hotel_code}}` e `{{lang}}` nell'URL funzioni **prima** di configurare i tool Helevo reali.

Vedi anche: [`webhook-url-dinamici-spoki.md`](webhook-url-dinamici-spoki.md)

---

## Configurazione tool (da incollare nel form Spoki)

- **Nome tool:** `test_helevo_url`
- **Descrizione (quando usarlo):** Tool di test. Usalo SOLO quando l'utente o il tester chiede esplicitamente di verificare la sostituzione URL. Passa hotel_code e lang; restituisce l'echo della richiesta HTTP.
- **Metodo:** `GET`
- **URL:** `https://postman-echo.com/get?hotel_code={{hotel_code}}&lang={{lang}}`
- **Headers:** nessuno

---

## Schema parametri

```json
{
  "type": "object",
  "properties": {
    "hotel_code": {
      "type": "string",
      "description": "Codice hotel di test, es. KIN"
    },
    "lang": {
      "type": "string",
      "description": "Lingua di test, es. it-IT"
    }
  },
  "required": ["hotel_code", "lang"]
}
```

| Parametro | Handler | Obbligatorio |
| --- | --- | --- |
| `hotel_code` | LLM | Sì |
| `lang` | LLM | Sì |

---

## Come testare nel playground

1. Aggiungi questo tool a un agente di test (Custom, text)
2. Scrivi: "Chiama test_helevo_url con hotel_code KIN e lang it-IT"
3. Nella risposta del tool (o nei log di trace), verifica:
   - `args.hotel_code` = `"KIN"`
   - `args.lang` = `"it-IT"`
   - L'URL in `url` **non** contiene `{{hotel_code}}` né `{{lang}}`

Se OK → rimuovi questo tool e configura [`helevo-get-conventions-webhook-tool.md`](helevo-get-conventions-webhook-tool.md) e [`helevo-get-recommended-places-webhook-tool.md`](helevo-get-recommended-places-webhook-tool.md).

---

## Risposta attesa (Postman Echo)

```json
{
  "args": {
    "hotel_code": "KIN",
    "lang": "it-IT"
  },
  "url": "https://postman-echo.com/get?hotel_code=KIN&lang=it-IT"
}
```
