# Tool Webhook "Luoghi consigliati" (get_recommended_places)

Configurazione riutilizzabile per un tool webhook da inserire nella sezione "Agent's tools" di un agente Spoki. Il tool interroga l'API Helevo (Api4) per recuperare le attrazioni turistiche consigliate nei dintorni di una struttura ACV.

Agente di riferimento: ACV Concierge (`acv-concierge-prompt.md`).

Documentazione API: `api_documentation/Helevo/api-reference/recommended-places/get-recommended-places-luoghi-consigliati.md`

Meccanismo URL dinamici: [`webhook-url-dinamici-spoki.md`](webhook-url-dinamici-spoki.md) — test pre-volo: [`helevo-echo-test-webhook-tool.md`](helevo-echo-test-webhook-tool.md)

---

## URL dinamici

L'URL usa placeholder `{{hotel_code}}` e `{{lang}}` compilati dall'LLM al momento della chiamata. Spoki sostituisce i valori prima di inviare la GET.

- `{{param}}` = parametro LLM (deciso in chat)
- `%%FIELD%%` = campo contatto Spoki (non usato qui)

I nomi nello schema JSON devono coincidere esattamente con quelli nell'URL. Per GET non serve body: i parametri stanno in query string.

---

## Configurazione tool (da incollare nel form Spoki)

- **Nome tool:** `get_recommended_places`
- **Descrizione (quando usarlo):** Recupera l'elenco dei luoghi consigliati (attrazioni turistiche) nei dintorni di una struttura ACV. Usalo quando l'ospite chiede cosa visitare, cosa fare, escursioni, punti di interesse o suggerimenti turistici. Prima di chiamare il tool, identifica la struttura (`hotel_code`) e la lingua dell'ospite (`lang`).
- **Metodo:** `GET`
- **URL:** `https://appazzurroclub.it/admin/public/api/Api4/recommended-places?hotel_code={{hotel_code}}&lang={{lang}}`
- **Headers:**
  - `Authorization: <INSERISCI_HELEVO_TOKEN>`

> Per test (solo se autorizzato da ACV/Helevo): sostituire la base URL con `https://test.appazzurroclub.it/serveracv/public/api/Api4`.

---

## Schema parametri

Parametri che l'agente compila dinamicamente (stile function-calling):

```json
{
  "type": "object",
  "properties": {
    "hotel_code": {
      "type": "string",
      "enum": ["ALE", "CLA", "DOL", "KIN", "HK2", "MON", "POL", "RES", "ROS", "TOK", "FFV", "CHA", "MED"],
      "description": "Codice alfanumerico immutabile della struttura ACV in cui soggiorna l'ospite."
    },
    "lang": {
      "type": "string",
      "enum": ["it-IT", "en-EN", "de-DE", "fr-FR"],
      "description": "Lingua dei contenuti da restituire. Usa la lingua in cui sta scrivendo l'ospite."
    }
  },
  "required": ["hotel_code", "lang"]
}
```

| Parametro | Tipo | Obbligatorio | Note |
| --- | --- | --- | --- |
| `hotel_code` | string (enum) | Sì | Codice struttura ACV (3 caratteri) |
| `lang` | string (enum) | Sì | Locale `xx-XX` supportato da Helevo |

**Handler nel form Spoki:** entrambi i parametri su **LLM** (non Dynamic field).

---

## Checklist configurazione Spoki UI

1. Agent → **Agent's tools** → Add tool → Webhook
2. Nome: `get_recommended_places`
3. Method: `GET`
4. URL: incolla la riga URL sopra (con `{{hotel_code}}` e `{{lang}}`)
5. Headers: `Authorization: <token Helevo>` (valore fisso, non nel prompt)
6. Body: lascia vuoto
7. Parameters: incolla lo schema JSON sopra
8. Per ogni parametro (`hotel_code`, `lang`): handler **LLM**
9. Salva e testa prima con [`helevo-echo-test-webhook-tool.md`](helevo-echo-test-webhook-tool.md), poi sostituisci l'URL con Helevo
10. Collega al prompt [`acv-concierge-prompt.md`](../clients-prompt/acv-concierge-prompt.md)

Verifica curl locale (pattern URL già testato):

```bash
curl -sS "https://appazzurroclub.it/admin/public/api/Api4/recommended-places?hotel_code=KIN&lang=it-IT"
```

---

## Risposta attesa

JSON con array `data` e campo `code` (200 se ok). Ogni elemento puo' includere:

| Campo | Significato |
| --- | --- |
| `luogo` | Località |
| `titolo` | Nome del luogo |
| `descrizione` | Descrizione |
| `periodo` | Periodo di interesse: `I` (inverno) o `E` (estate) |
| `lang` | Lingua del record |
| `lat` / `lng` | Coordinate geografiche |

Se l'ospite chiede suggerimenti stagionali, filtra i risultati in base a `periodo`. Non condividere coordinate raw salvo richiesta esplicita dell'ospite.

---

## Note operative

- Il token Helevo va inserito **solo** nel form del tool su Spoki (`Authorization: <token>`), mai nel prompt né nel repository.
- Se Helevo attiva un elenco IP autorizzati, verificare che le chiamate Spoki partano da IP consentiti.
- Se la risposta e' vuota o `code` diverso da 200, comunicare all'ospite che al momento non ci sono luoghi consigliati disponibili per quella struttura.

### Riga di istruzione-tipo per il prompt dell'agente

> Quando l'ospite chiede cosa visitare o cosa fare nei dintorni, identifica prima la struttura ACV e la lingua, poi chiama `get_recommended_places` con `hotel_code` e `lang`. Presenta al massimo 3–5 suggerimenti per messaggio usando solo i dati restituiti dall'API.
