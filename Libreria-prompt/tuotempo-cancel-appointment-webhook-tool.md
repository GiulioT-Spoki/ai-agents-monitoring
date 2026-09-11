# Tool Webhook "Cancella appuntamento Tuotempo" (tuotempo_cancel_appointment)

Configurazione riutilizzabile per un tool webhook da inserire nella sezione "Agent's tools" di un agente Spoki. Il tool cancella un appuntamento esistente in agenda **Tuotempo**.

Agente di riferimento: LucIA — Calatafimi Med ([`34768-calatafimi-med-prompt.md`](../clients-prompt/34768-calatafimi-med-prompt.md)).

Prerequisito: appuntamento verificato con [`tuotempo-get-appointments-webhook-tool.md`](tuotempo-get-appointments-webhook-tool.md).

Integrazione **diretta**: base URL e auth solo nel form del tool su Spoki.

Meccanismo placeholder: [`webhook-url-dinamici-spoki.md`](webhook-url-dinamici-spoki.md).

---

## Configurazione tool (da incollare nel form Spoki)

- **Nome tool:** `tuotempo_cancel_appointment`
- **Descrizione (quando usarlo):** Cancella un appuntamento esistente. Usalo solo dopo aver verificato l'identità del paziente e confermato l'appuntamento (`app_lid`) con `tuotempo_get_appointments`, e dopo esplicita conferma di cancellazione da parte del paziente. Chiamalo una sola volta.
- **Metodo:** `POST`
- **URL:** `https://<TUOTEMPO_BASE_URL>/deleteappointment`
- **Headers:**
  - `Authorization: <INSERISCI_TUOTEMPO_AUTH>`
  - `Content-Type: application/json`

> `<TUOTEMPO_BASE_URL>` = `yourserveraddress/yourwspath` dell'istanza Calatafimi (da confermare). Auth non documentata nella collection. Il body della `deleteappointment` non è esplicitato nella collection Postman: il campo `app_lid` è dedotto dalla risposta di esempio (`return.APP_LID`) — confermare con Tuotempo il nome esatto del parametro.

---

## Body JSON inviato a Tuotempo

```json
{
  "app_lid": "{{app_lid}}"
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
      "description": "APP_LID dell'appuntamento da cancellare, così come restituito da tuotempo_get_appointments."
    }
  },
  "required": ["app_lid"]
}
```

**Handler nel form Spoki:** `app_lid` su **LLM**.

---

## Risposta attesa

```json
{
  "result": "OK",
  "return": {
    "DELETE_RESULT": "OK",
    "ERROR_MESSAGE": "",
    "APP_LID": "203612449"
  },
  "msg": ""
}
```

- Successo solo se `result: "OK"` e `return.DELETE_RESULT: "OK"`.
- Se l'esito non è `OK` o è ambiguo: non ritentare; chiama `transfer_to_human`.

---

## Note operative

- Cancella solo dopo conferma esplicita del paziente e verifica dell'appuntamento.
- Conferma la cancellazione solo dopo esito positivo esplicito del tool.
- Base URL e auth restano placeholder nel repo.

---

## Riga di istruzione-tipo per il prompt dell'agente

> Per cancellare un appuntamento: verifica l'identità del paziente, conferma l'appuntamento con `tuotempo_get_appointments`, chiedi conferma esplicita, poi chiama `tuotempo_cancel_appointment` una sola volta. Conferma la cancellazione solo se `DELETE_RESULT: OK`; altrimenti trasferisci a un operatore.
