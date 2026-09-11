# URL dinamici nei webhook degli agenti AI Spoki

Riferimento condiviso per tool webhook configurati in **Agent's tools** che chiamano API esterne (Helevo, n8n, ecc.).

---

## Come funziona

Quando l'agente invoca un tool webhook, Spoki:

1. chiede al modello i valori dei parametri (function calling);
2. sostituisce i placeholder `{{nome_parametro}}` nell'URL, nel body e/o negli headers;
3. esegue la richiesta HTTP verso l'endpoint esterno.

Il meccanismo vale per **qualsiasi destinazione** (Helevo, Postman Echo, n8n, ecc.), non solo per l'API Spoki.

Esempio già usato nel repo per query string su GET:

[`get-contact-id-webhook-tool.md`](get-contact-id-webhook-tool.md)

```
GET https://api.spoki.com/api/1/contacts/?phone={{contact_phone}}
```

---

## Due sintassi di placeholder (non confonderle)

| Sintassi | Compilato da | Uso tipico |
| --- | --- | --- |
| `{{param_name}}` | **LLM** al momento della chiamata tool | Valori decisi in chat (`hotel_code`, `lang`, titolo ticket, ecc.) |
| `%%FIELD_CODE%%` | **Spoki** dal profilo contatto | Valori già noti sul contatto (`%%PHONE%%`, `%%FIRST_NAME%%`) |

Per i tool Helevo ACV servono `{{hotel_code}}` e `{{lang}}` (handler **LLM**), perché dipendono da cosa dice l'ospite.

`%%PHONE%%` negli URL delle **automazioni** Spoki è un contesto diverso (step automazione, non Agent's tools). Stessa idea, sintassi e sorgente dati diversi.

---

## Regola critica

Il nome dentro `{{...}}` deve coincidere **esattamente** con il nome del parametro nello schema JSON del tool.

- Corretto: URL `?hotel_code={{hotel_code}}` + schema con `"hotel_code"`
- Errato: URL `?hotel_code={{hotelCode}}` + schema con `"hotel_code"`

---

## Configurazione GET con query string (form Spoki)

1. **Method:** `GET`
2. **URL:** template con placeholder, es. `...?hotel_code={{hotel_code}}&lang={{lang}}`
3. **Parameters / JSON schema:** dichiara ogni parametro usato nell'URL
4. **Handler:** **LLM** per parametri decisi in chat; **Dynamic field** solo se il valore viene dal contatto
5. **Body:** vuoto
6. **Headers:** valori fissi (es. token API) o `%%FIELD%%` se dal contatto

---

## Verifica del pattern (test eseguito)

### 1. Postman Echo (simula URL risolto da Spoki)

Richiesta equivalente a quella che Spoki invierebbe dopo la sostituzione `{{hotel_code}}` → `KIN`, `{{lang}}` → `it-IT`:

```bash
curl -sS "https://postman-echo.com/get?hotel_code=KIN&lang=it-IT"
```

Risposta attesa in `args`:

```json
{
  "hotel_code": "KIN",
  "lang": "it-IT"
}
```

Verificato: il pattern query string multi-parametro funziona a livello HTTP.

### 2. Helevo produzione (endpoint reali)

```bash
curl -sS "https://appazzurroclub.it/admin/public/api/Api4/recommended-places?hotel_code=KIN&lang=it-IT"
curl -sS "https://appazzurroclub.it/admin/public/api/Api4/conventions?hotel_code=KIN&lang=it-IT"
```

Verificato: entrambi rispondono `code: 200` con dati (`recommended-places`: 7 item, `conventions`: 15 item per KIN/it-IT).

### 3. Test in Spoki playground (da fare in UI)

Prima di collegare Helevo in produzione, usa il tool di prova:

[`helevo-echo-test-webhook-tool.md`](helevo-echo-test-webhook-tool.md)

1. Aggiungi il tool echo all'agente
2. Nel playground chiedi: "Chiama il tool con hotel_code KIN e lang it-IT"
3. Nei log/trace verifica che l'URL effettivo contenga `hotel_code=KIN&lang=it-IT` e **non** i placeholder letterali `{{hotel_code}}`

Se i placeholder restano non sostituiti → controlla che i parametri siano nello schema JSON e che i nomi matchino l'URL.

---

## Fallback (proxy n8n)

Se la sostituzione multi-parametro in URL non funzionasse in un edge case della UI Spoki:

- Tool Spoki: `POST` verso webhook n8n con body `{ "hotel_code": "{{hotel_code}}", "lang": "{{lang}}" }`
- n8n costruisce la GET verso Helevo server-side
- Token Helevo resta solo in n8n

Pattern di riferimento: [`transfer-human-webhook-tool.md`](transfer-human-webhook-tool.md)
