# Tool "Registra orario di richiamo" (set_callback_time)

Tool webhook per agenti **vocali** Spoki: scrive il campo dinamico `CALLBACK_DATETIME` (tipo **Data e ora**) sul contatto tramite API Spoki. Sostituisce `@@action:set_contact_field_value` che in voice non funziona.

Dopo la scrittura, un'automazione Spoki separata con trigger **Condizione su Data** su quel campo può avviare **Spoki Voice** all'orario richiesto.

Riferimenti:
- API: [`POST /api/1/contacts/sync/`](../../api_documentation/spoki_api/api-reference/contacts/post-create-or-update-contact.md)
- Automazione reminder su data: [come-avviare-un-messaggio-di-reminder…](../../knowledge_base/spoki_docs/how-to/come-avviare-un-messaggio-di-reminder-in-automatico-da-spoki.md)
- Azione Voice: [setting-up-your-spoki-voice-agent.md](../../knowledge_base/spoki_docs/integrazioni/setting-up-your-spoki-voice-agent.md)

### Pattern consigliato: agente monotool (handoff)

Se l'agente di booking ha già tool calendar (o altri webhook), non collegare `set_callback_time` lì: in voice i multi-tool possono fingere successo. Preferire:

1. Agente booking → su callback chiude con Success Criteria **Call me back** (senza write).
2. Branch automazione **Call me back** → Spoki Voice su un **secondo agente** che ha solo `get_current_datetime` + `set_callback_time`.
3. Condizione su Data su `CALLBACK_DATETIME` → Spoki Voice di nuovo sull'agente booking.

Esempio Digital Sharing: [`54633-digitalsharing-callback-writer.md`](../voice-agents-prompts/54633-digitalsharing-callback-writer.md) + [`54633-digitalsharing-spoki-ui.md`](../voice-agents-prompts/54633-digitalsharing-spoki-ui.md).

---

## Flusso logico

1. L'agente raccoglie giorno/ora di richiamo e chiama `get_current_datetime` (Europe/Rome).
2. Risolve frasi relative ("domani alle 15", "tra 10 minuti") in un datetime concreto, lo ripete a voce e chiede conferma.
3. Dopo conferma, chiama `set_callback_time` **una sola volta**.
4. Solo se il tool risponde ok, conferma a voce che il richiamo è registrato e chiude.
5. Se il tool fallisce: non dire che è registrato; offri transfer o chiusura onesta.
6. Un'automazione Spoki (Condizione su Data → Spoki Voice) parte all'orario sul campo — non è l'agente a avviare la seconda chiamata.

---

## Prerequisito Spoki

Creare (se assente) il campo dinamico:

| Campo | Tipo | Note |
| --- | --- | --- |
| `CALLBACK_DATETIME` | Data e ora | ON sul dettaglio contatto; esempio `01/01/2026, 10.00` |

---

## Configurazione tool (da incollare nel form Spoki)

- **Nome tool:** `set_callback_time`
- **Descrizione (quando usarlo):** Registra l'orario di richiamo concordato sul contatto. Chiamalo una sola volta dopo che il cliente ha confermato giorno e ora. Passa il datetime risolto in Europe/Rome. Non chiamarlo se manca la conferma o se la chiamata è già chiusa. Non leggere ad alta voce la risposta tecnica del tool.
- **Metodo:** `POST`
- **URL:** `https://api.spoki.com/api/1/contacts/sync/`
- **Headers:**
  - `X-Spoki-Api-Key: <INSERISCI_API_KEY>`
  - `Content-Type: application/json`

> L'API key va nel form del tool, non nel prompt. n8n non è obbligatorio per questa write.

---

## Body — parametri

Body inviato:

```json
{
  "phone": "{{phone}}",
  "custom_fields": {
    "CALLBACK_DATETIME": "{{callback_datetime}}"
  }
}
```

Nel form Spoki, sezione **Body**:

| Name | Handler | Valore | Note |
| --- | --- | --- | --- |
| `phone` | Dynamic field | `%%PHONE%%` | E.164; già sul contatto |
| `callback_datetime` | LLM | — | Datetime risolto da passare in `custom_fields.CALLBACK_DATETIME` |

Se il form non supporta nested `custom_fields` come mappa fissa, costruisci il body così (placeholder tipici Spoki):

```json
{
  "phone": "{{phone}}",
  "custom_fields": {
    "CALLBACK_DATETIME": "{{callback_datetime}}"
  }
}
```

Schema function-calling per il parametro LLM:

```json
{
  "type": "object",
  "properties": {
    "callback_datetime": {
      "type": "string",
      "description": "Callback date and time in Europe/Rome already confirmed with the caller. Format month/day/year hour:minute, e.g. 07/17/2026 15:00. Resolve relative phrases with get_current_datetime first. Never invent a time the caller did not confirm."
    }
  },
  "required": ["callback_datetime"]
}
```

### Formato datetime

- Preferito: mese/giorno/anno ora:minuto (Europe/Rome), es. `07/17/2026 15:00`.
- Non usare ISO 8601 con offset per questo campo.
- Il valore deve coincidere con l'orario ripetuto a voce al cliente.

---

## Risposta attesa

`HTTP 200` con il contatto aggiornato (id, phone, eventuali `contactfield_set`) → campo scritto.

Se non-2xx o timeout: trattare come fallimento; l'agente non deve dire che il richiamo è registrato.

Rate limit sync contatti: 120/min.

---

## Automazione Spoki (separata dal tool)

Non collegare il richiamo all'orario al Success Criteria della call 1.

1. **Automazione nuova**, es. `[Account] Richiamo CALLBACK_DATETIME → Voice`
2. Trigger: **Condizione su Data** sul campo `CALLBACK_DATETIME` (condizione **È** / all'orario; offset 0 o pochi minuti se serve)
3. Azione: **Spoki Voice** → agente outbound di booking (o gemello con First Message da callback)
4. Pubblicare solo dopo smoke test con orario tra 2–5 minuti

Il Success Criteria "Call me back" della chiamata in corso resta per branching immediato (nota/tag/CRM): **non** deve avviare subito una seconda Voice call.

---

## Riga di istruzione-tipo per il prompt dell'agente

> If the customer asks to be called back: stop booking, collect day and time, resolve with `get_current_datetime` (Europe/Rome), repeat and confirm. After confirmation call `set_callback_time` once with the resolved datetime. Only if the tool succeeds, say the callback is registered and end politely. If the tool fails, do not claim it was saved; offer transfer or honest close. Do not use `@@action` tokens. Do not start another Spoki Voice call yourself.
