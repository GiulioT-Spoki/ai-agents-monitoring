# Tool Webhook "Riprogramma appuntamento Tuotempo" (tuotempo_reschedule_appointment)

Configurazione riutilizzabile per un tool webhook da inserire nella sezione "Agent's tools" di un agente Spoki. Il tool sposta un appuntamento esistente in agenda **Tuotempo** su un nuovo slot.

Agente di riferimento: LucIA — Calatafimi Med ([`34768-calatafimi-med-prompt.md`](../clients-prompt/34768-calatafimi-med-prompt.md)).

Prerequisiti: appuntamento verificato con [`tuotempo-get-appointments-webhook-tool.md`](tuotempo-get-appointments-webhook-tool.md) e nuovo slot trovato con [`tuotempo-search-availability-webhook-tool.md`](tuotempo-search-availability-webhook-tool.md).

Integrazione **diretta**: base URL e auth solo nel form del tool su Spoki.

Meccanismo placeholder: [`webhook-url-dinamici-spoki.md`](webhook-url-dinamici-spoki.md).

---

## Configurazione tool (da incollare nel form Spoki)

- **Nome tool:** `tuotempo_reschedule_appointment`
- **Descrizione (quando usarlo):** Sposta un appuntamento esistente su un nuovo slot. Usalo solo dopo aver verificato l'identità del paziente, confermato l'appuntamento esistente (`app_lid`) e ottenuto un nuovo slot disponibile (`new_availability_lid`). Chiamalo una sola volta.
- **Metodo:** `POST`
- **URL:** `https://<TUOTEMPO_BASE_URL>/rescheduleAppointment`
- **Headers:**
  - `Authorization: <INSERISCI_TUOTEMPO_AUTH>`
  - `Content-Type: application/json`

> `<TUOTEMPO_BASE_URL>` = `yourserveraddress/yourwspath` dell'istanza Calatafimi (da confermare). Auth non documentata nella collection.

---

## Body JSON inviato a Tuotempo

```json
{
  "app_lid": "{{app_lid}}",
  "new_availability_lid": "{{new_availability_lid}}",
  "new_app_date": "{{new_app_date}}",
  "new_app_start_time": "{{new_app_start_time}}",
  "app_end_time": "{{app_end_time}}"
}
```

---

## Schema parametri

```json
{
  "type": "object",
  "properties": {
    "app_lid": {
      "type": "string",
      "description": "APP_LID dell'appuntamento esistente, così come restituito da tuotempo_get_appointments."
    },
    "new_availability_lid": {
      "type": "string",
      "description": "AVAILABILITY_LID del nuovo slot scelto, così come restituito da tuotempo_search_availability."
    },
    "new_app_date": {
      "type": "string",
      "description": "Nuova data DD/MM/YYYY, coerente con il nuovo slot."
    },
    "new_app_start_time": {
      "type": "string",
      "description": "Nuova ora di inizio HH:MM, coerente con il nuovo slot."
    },
    "app_end_time": {
      "type": "string",
      "description": "Ora di fine HH:MM del nuovo slot (AVA_END_TIME)."
    }
  },
  "required": ["app_lid", "new_availability_lid", "new_app_date", "new_app_start_time", "app_end_time"]
}
```

**Handler nel form Spoki:** tutti i parametri su **LLM**.

---

## Risposta attesa

```json
{
  "result": "OK",
  "return": {
    "UPDATE_RESULT": "OK",
    "ERROR_MESSAGE": ""
  },
  "msg": ""
}
```

- Successo solo se `result: "OK"` e `return.UPDATE_RESULT: "OK"`.
- Se l'esito non è `OK` o è ambiguo: non ritentare; chiama `transfer_to_human`.

---

## Note operative

- Conferma lo spostamento solo dopo esito positivo esplicito del tool.
- Non riprogrammare due volte per lo stesso cambio se il paziente ripete il messaggio.
- Base URL e auth restano placeholder nel repo.

---

## Riga di istruzione-tipo per il prompt dell'agente

> Per spostare un appuntamento: verifica l'identità del paziente, conferma l'appuntamento con `tuotempo_get_appointments`, trova il nuovo slot con `tuotempo_search_availability`, poi chiama `tuotempo_reschedule_appointment` una sola volta. Conferma lo spostamento solo se `UPDATE_RESULT: OK`; altrimenti trasferisci a un operatore.
