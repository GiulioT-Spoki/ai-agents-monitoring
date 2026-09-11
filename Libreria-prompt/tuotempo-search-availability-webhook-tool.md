# Tool Webhook "Cerca disponibilità Tuotempo" (tuotempo_search_availability)

Configurazione riutilizzabile per un tool webhook da inserire nella sezione "Agent's tools" di un agente Spoki. Il tool interroga l'agenda **Tuotempo** dell'istanza cliente per recuperare gli slot disponibili di una prestazione.

Agente di riferimento: LucIA — Calatafimi Med ([`34768-calatafimi-med-prompt.md`](../clients-prompt/34768-calatafimi-med-prompt.md)).

Integrazione **diretta** (nessun intermediario): il tool chiama Tuotempo via HTTP. Base URL e auth vanno inseriti solo nel form del tool su Spoki.

Meccanismo URL dinamici: [`webhook-url-dinamici-spoki.md`](webhook-url-dinamici-spoki.md).

---

## URL dinamici

L'URL usa placeholder `{{...}}` compilati dall'LLM al momento della chiamata (date risolte con `get_current_datetime`, prestazione dal contesto). Spoki sostituisce i valori prima di inviare la GET.

- `{{param}}` = parametro LLM (deciso in chat)
- `%%FIELD%%` = campo contatto Spoki (non usato qui)

I nomi nello schema JSON devono coincidere esattamente con quelli nell'URL. Per GET non serve body.

---

## Configurazione tool (da incollare nel form Spoki)

- **Nome tool:** `tuotempo_search_availability`
- **Descrizione (quando usarlo):** Cerca gli slot disponibili in agenda per una prestazione. Usalo dopo aver identificato la prestazione (`activity_lid`) e l'intervallo di date richiesto dal paziente. Restituisce una lista di slot con `AVAILABILITY_LID`, data, ora e prezzo.
- **Metodo:** `GET`
- **URL:** `https://<TUOTEMPO_BASE_URL>/searchavailabilities?activity_lid={{activity_lid}}&ava_start_day={{ava_start_day}}&ava_end_day={{ava_end_day}}&ava_start_time=00:00&ava_end_time=23:59&ava_min_time={{ava_min_time}}&ava_max_time={{ava_max_time}}&ava_results_number=1000&resource_lid={{resource_lid}}&location_lid={{location_lid}}&insurance_lid={{insurance_lid}}`
- **Headers:**
  - `Authorization: <INSERISCI_TUOTEMPO_AUTH>`
  - `Content-Type: application/json`

> `<TUOTEMPO_BASE_URL>` = `yourserveraddress/yourwspath` dell'istanza Calatafimi (da confermare con il cliente/Tuotempo). Il metodo di auth non è documentato nella collection Postman: chiedere a Tuotempo l'header corretto.

---

## Schema parametri

```json
{
  "type": "object",
  "properties": {
    "activity_lid": {
      "type": "string",
      "description": "Codice della prestazione richiesta (LID Tuotempo). Determinalo dalla prestazione richiesta dal paziente e dalla configurazione di Calatafimi Med."
    },
    "ava_start_day": {
      "type": "string",
      "description": "Primo giorno dell'intervallo di ricerca in formato DD/MM/YYYY. Risolvi le date relative (oggi, domani, settimana prossima) con get_current_datetime, timezone Europe/Rome."
    },
    "ava_end_day": {
      "type": "string",
      "description": "Ultimo giorno dell'intervallo di ricerca in formato DD/MM/YYYY. Se il paziente non indica un intervallo, usa una finestra ragionevole a partire da ava_start_day."
    },
    "ava_min_time": {
      "type": "string",
      "description": "Ora minima preferita in formato HH:MM. Usa 00:00 se il paziente non ha preferenze di orario."
    },
    "ava_max_time": {
      "type": "string",
      "description": "Ora massima preferita in formato HH:MM. Usa 23:59 se il paziente non ha preferenze di orario."
    },
    "resource_lid": {
      "type": "string",
      "description": "Codice della risorsa/operatore specifico (LID). Lascia stringa vuota se il paziente non ha preferenze."
    },
    "location_lid": {
      "type": "string",
      "description": "Codice della sede (LID). Usa la sede di Calatafimi Med richiesta o quella predefinita configurata."
    },
    "insurance_lid": {
      "type": "string",
      "description": "Codice convenzione/assicurazione (LID). Lascia stringa vuota se non applicabile."
    }
  },
  "required": ["activity_lid", "ava_start_day", "ava_end_day"]
}
```

| Parametro | Tipo | Obbligatorio | Note |
| --- | --- | --- | --- |
| `activity_lid` | string | Sì | Prestazione (LID) |
| `ava_start_day` | string | Sì | `DD/MM/YYYY` |
| `ava_end_day` | string | Sì | `DD/MM/YYYY` |
| `ava_min_time` | string | No | `HH:MM`, default `00:00` |
| `ava_max_time` | string | No | `HH:MM`, default `23:59` |
| `resource_lid` | string | No | Vuoto = qualsiasi risorsa |
| `location_lid` | string | No | Sede Calatafimi (LID) |
| `insurance_lid` | string | No | Vuoto = nessuna convenzione |

**Handler nel form Spoki:** tutti i parametri su **LLM**.

---

## Risposta attesa

```json
{
  "result": "OK",
  "return": [
    {
      "AVAILABILITY_LID": "15/10/2018_16:30_47_1_2_216",
      "AVA_DATE": "15/10/2018",
      "AVA_START_TIME": "16:30",
      "AVA_END_TIME": "16:40",
      "LOCATION_LID": "1011",
      "RESOURCE_LID": "47_77",
      "ACTIVITY_LID": "6003_2_35",
      "INSURANCE_LID": "",
      "AVA_PRICE": "60"
    }
  ],
  "msg": null
}
```

- `AVAILABILITY_LID` è il valore da passare a `tuotempo_add_appointment` per prenotare.
- Proponi normalmente lo slot utile più vicino; accogli una preferenza successiva solo se il tool conferma disponibilità.
- Se `return` è vuoto, comunica che non ci sono slot per l'intervallo richiesto e proponi un'alternativa o l'escalation.

---

## Note operative

- GET: parametri in query string, nessun body.
- Base URL e header di auth restano placeholder nel repo: inseriscili solo nel form del tool su Spoki.
- Non promettere un orario preciso non restituito dal tool.
- Se Tuotempo attiva una whitelist IP, verificare che le chiamate Spoki partano da IP consentiti.

---

## Riga di istruzione-tipo per il prompt dell'agente

> Quando il paziente chiede un appuntamento, identifica la prestazione (`activity_lid`) e risolvi le date con `get_current_datetime` (Europe/Rome), poi chiama `tuotempo_search_availability`. Proponi lo slot disponibile più vicino usando solo i dati restituiti; conserva l'`AVAILABILITY_LID` dello slot scelto per la prenotazione.
