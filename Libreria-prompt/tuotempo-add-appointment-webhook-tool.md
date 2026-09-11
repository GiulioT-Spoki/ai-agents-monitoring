# Tool Webhook "Prenota appuntamento Tuotempo" (tuotempo_add_appointment)

Configurazione riutilizzabile per un tool webhook da inserire nella sezione "Agent's tools" di un agente Spoki. Il tool crea un appuntamento in agenda **Tuotempo** su uno slot precedentemente trovato con [`tuotempo-search-availability-webhook-tool.md`](tuotempo-search-availability-webhook-tool.md).

Agente di riferimento: LucIA — Calatafimi Med ([`34768-calatafimi-med-prompt.md`](../clients-prompt/34768-calatafimi-med-prompt.md)).

Integrazione **diretta**: il tool chiama Tuotempo via HTTP. Base URL e auth solo nel form del tool su Spoki.

Meccanismo placeholder: [`webhook-url-dinamici-spoki.md`](webhook-url-dinamici-spoki.md).

---

## Placeholder nel body

- `{{param}}` = parametro LLM (deciso/confermato in chat: slot, dati anagrafici)
- `%%FIELD%%` = campo contatto Spoki (`%%PHONE%%`, `%%FIRST_NAME%%`, ecc.) pre-popolato

I nomi nello schema JSON devono coincidere esattamente con i placeholder nel body.

---

## Configurazione tool (da incollare nel form Spoki)

- **Nome tool:** `tuotempo_add_appointment`
- **Descrizione (quando usarlo):** Crea l'appuntamento su uno slot disponibile. Chiamalo **una sola volta**, dopo aver raccolto e confermato tutti i dati obbligatori del paziente e scelto uno slot (`availability_lid`) restituito da `tuotempo_search_availability`. Non chiamarlo se manca un dato obbligatorio o se un appuntamento per stesso paziente/prestazione/data è già stato creato con successo in questa conversazione.
- **Metodo:** `POST`
- **URL:** `https://<TUOTEMPO_BASE_URL>/addappointment`
- **Headers:**
  - `Authorization: <INSERISCI_TUOTEMPO_AUTH>`
  - `Content-Type: application/json`

> `<TUOTEMPO_BASE_URL>` = `yourserveraddress/yourwspath` dell'istanza Calatafimi (da confermare). Auth non documentata nella collection: chiedere a Tuotempo l'header corretto.

---

## Body JSON inviato a Tuotempo

```json
{
  "app_date": "{{app_date}}",
  "app_start_time": "{{app_start_time}}",
  "app_end_time": "{{app_end_time}}",
  "app_action": "add",
  "activity_lid": "{{activity_lid}}",
  "availability_lid": "{{availability_lid}}",
  "resource_lid": "{{resource_lid}}",
  "insurance_lid": "{{insurance_lid}}",
  "location_lid": "{{location_lid}}",
  "user_lid": "{{user_lid}}",
  "user_first_name": "{{user_first_name}}",
  "user_second_name": "{{user_second_name}}",
  "user_mobile_phone": "{{user_mobile_phone}}",
  "user_email": "{{user_email}}",
  "user_date_of_birth": "{{user_date_of_birth}}",
  "user_privacy": "1"
}
```

Paziente nuovo: lascia `user_lid` vuoto (Tuotempo crea l'utente e restituisce `USER_LID`).
Paziente già noto: valorizza `user_lid` con quello restituito da una precedente ricerca/creazione.

---

## Schema parametri

```json
{
  "type": "object",
  "properties": {
    "availability_lid": {
      "type": "string",
      "description": "AVAILABILITY_LID dello slot scelto, così come restituito da tuotempo_search_availability. Non modificarlo."
    },
    "app_date": {
      "type": "string",
      "description": "Data dell'appuntamento in formato DD/MM/YYYY, coerente con lo slot scelto."
    },
    "app_start_time": {
      "type": "string",
      "description": "Ora di inizio HH:MM, coerente con lo slot scelto (AVA_START_TIME)."
    },
    "app_end_time": {
      "type": "string",
      "description": "Ora di fine HH:MM, coerente con lo slot scelto (AVA_END_TIME)."
    },
    "activity_lid": {
      "type": "string",
      "description": "Codice prestazione (LID) dello slot scelto."
    },
    "resource_lid": {
      "type": "string",
      "description": "Codice risorsa (LID) dello slot scelto (RESOURCE_LID)."
    },
    "location_lid": {
      "type": "string",
      "description": "Codice sede (LID) dello slot scelto (LOCATION_LID)."
    },
    "insurance_lid": {
      "type": "string",
      "description": "Codice convenzione (LID) se applicabile; altrimenti stringa vuota."
    },
    "user_lid": {
      "type": "string",
      "description": "Identificativo paziente Tuotempo se già noto; stringa vuota per un nuovo paziente."
    },
    "user_first_name": {
      "type": "string",
      "description": "Nome del paziente, confermato in chat."
    },
    "user_second_name": {
      "type": "string",
      "description": "Cognome del paziente, confermato in chat."
    },
    "user_mobile_phone": {
      "type": "string",
      "description": "Numero di cellulare del paziente in formato E.164. Pre-popola con %%PHONE%% se coincide con il contatto."
    },
    "user_email": {
      "type": "string",
      "description": "Email del paziente, se raccolta."
    },
    "user_date_of_birth": {
      "type": "string",
      "description": "Data di nascita in formato DD/MM/YYYY, se richiesta dalla struttura."
    }
  },
  "required": ["availability_lid", "app_date", "app_start_time", "app_end_time", "activity_lid", "resource_lid", "location_lid", "user_first_name", "user_second_name", "user_mobile_phone"]
}
```

**Handler nel form Spoki:** parametri anagrafici pre-popolabili dal contatto su **Dynamic field** (`user_mobile_phone` → `%%PHONE%%`, `user_first_name` → `%%FIRST_NAME%%` se coerente); tutti gli altri su **LLM**.

---

## Risposta attesa

```json
{
  "result": "OK",
  "return": {
    "ADD_RESULT": "OK",
    "ERROR_MESSAGE": "",
    "APP_LID": "203612449",
    "USER_LID": "995282"
  },
  "msg": ""
}
```

- Successo solo se `result: "OK"` e `return.ADD_RESULT: "OK"` con `APP_LID` valorizzato.
- Conserva `APP_LID` (per modifica/cancellazione) e `USER_LID` (paziente ora noto).
- Se `ADD_RESULT` non è `OK` o la risposta è ambigua: **non** ritentare la creazione; chiama `transfer_to_human`.

---

## Note operative

- **Anti-duplicato:** dopo un `ADD_RESULT: OK`, non richiamare mai il tool per lo stesso appuntamento, nemmeno se il paziente ripete il messaggio.
- Conferma al paziente solo dopo esito positivo esplicito; usa wording coerente con lo stato reale (vedi regole prompt).
- Base URL e auth restano placeholder nel repo.

---

## Riga di istruzione-tipo per il prompt dell'agente

> Dopo che il paziente ha scelto uno slot e hai confermato tutti i dati obbligatori, chiama `tuotempo_add_appointment` una sola volta passando l'`availability_lid` esatto e i dati coerenti con lo slot. Conferma la prenotazione solo se la risposta contiene `ADD_RESULT: OK` e un `APP_LID`; altrimenti indica che la conferma è in sospeso e trasferisci a un operatore.
