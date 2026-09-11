# Tool Webhook "Trova appuntamenti Tuotempo" (tuotempo_get_appointments)

Configurazione riutilizzabile per un tool webhook da inserire nella sezione "Agent's tools" di un agente Spoki. Il tool recupera gli appuntamenti esistenti in agenda **Tuotempo**, per verificarli prima di una modifica o cancellazione o per informare il paziente.

Agente di riferimento: LucIA — Calatafimi Med ([`34768-calatafimi-med-prompt.md`](../clients-prompt/34768-calatafimi-med-prompt.md)).

Integrazione **diretta**: il tool chiama Tuotempo via HTTP. Base URL e auth solo nel form del tool su Spoki.

Meccanismo URL dinamici: [`webhook-url-dinamici-spoki.md`](webhook-url-dinamici-spoki.md).

---

## URL dinamici

L'URL usa placeholder `{{...}}` compilati dall'LLM. Per un lookup sul paziente puoi valorizzare `user_lid`; per un appuntamento specifico usa `app_lid`. Passa solo il parametro che serve, lasciando vuoto l'altro.

---

## Configurazione tool (da incollare nel form Spoki)

- **Nome tool:** `tuotempo_get_appointments`
- **Descrizione (quando usarlo):** Recupera gli appuntamenti esistenti di un paziente (per `user_lid`) o un appuntamento specifico (per `app_lid`). Usalo per verificare l'esistenza di un appuntamento prima di modificarlo o cancellarlo, o per rispondere a domande sul proprio appuntamento dopo aver verificato l'identità del paziente.
- **Metodo:** `GET`
- **URL:** `https://<TUOTEMPO_BASE_URL>/getappointments?user_lid={{user_lid}}&app_lid={{app_lid}}`
- **Headers:**
  - `Authorization: <INSERISCI_TUOTEMPO_AUTH>`
  - `Content-Type: application/json`

> `<TUOTEMPO_BASE_URL>` = `yourserveraddress/yourwspath` dell'istanza Calatafimi (da confermare). Auth non documentata nella collection.

---

## Schema parametri

```json
{
  "type": "object",
  "properties": {
    "user_lid": {
      "type": "string",
      "description": "Identificativo paziente Tuotempo. Usalo per elencare tutti gli appuntamenti del paziente. Lascia vuoto se cerchi per app_lid."
    },
    "app_lid": {
      "type": "string",
      "description": "Identificativo dell'appuntamento specifico. Usalo per recuperare un singolo appuntamento. Lascia vuoto se cerchi per user_lid."
    }
  },
  "required": []
}
```

| Parametro | Tipo | Obbligatorio | Note |
| --- | --- | --- | --- |
| `user_lid` | string | No | Lista appuntamenti del paziente |
| `app_lid` | string | No | Singolo appuntamento |

Passa **almeno uno** dei due. **Handler nel form Spoki:** entrambi su **LLM**.

---

## Risposta attesa

```json
{
  "result": "OK",
  "return": [
    {
      "APP_LID": "04/12/2018_09:50_3044_1_2_479",
      "APP_STATUS": "Confirmed",
      "APP_START_TIME": "09:50",
      "APP_END_TIME": "10:00",
      "APP_DATE": "04/12/2018",
      "APP_PRICE": "60",
      "RESOURCE_LID": "3044_20",
      "ACTIVITY_LID": "14427_2_10",
      "LOCATION_LID": "1011",
      "USER_LID": "2001114989",
      "USER_FIRST_NAME": "MARIA"
    }
  ],
  "msg": null
}
```

- Usa `APP_LID` per le azioni di modifica (`tuotempo_reschedule_appointment`) o cancellazione (`tuotempo_cancel_appointment`).
- Se `return` è vuoto, comunica che non risultano appuntamenti e chiedi i dati per una nuova prenotazione o trasferisci se opportuno.

---

## Note operative

- Verifica l'identità del paziente prima di comunicare dettagli di appuntamenti.
- Non comunicare i codici LID interni al paziente.
- Base URL e auth restano placeholder nel repo.

---

## Riga di istruzione-tipo per il prompt dell'agente

> Prima di modificare o cancellare un appuntamento, verifica l'identità del paziente e usa `tuotempo_get_appointments` per confermare che l'appuntamento esista, leggendo l'`APP_LID` dalla risposta. Non mostrare i codici interni al paziente.
