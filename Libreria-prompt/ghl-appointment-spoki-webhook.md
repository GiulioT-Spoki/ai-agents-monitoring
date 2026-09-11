# Webhook GHL → Spoki: mappare DATA_APPUNTAMENTO

Configurazione operativa per inviare la data/ora di inizio appuntamento da GoHighLevel al campo dinamico `DATA_APPUNTAMENTO` (tipo **Data e ora**) in Spoki tramite il trigger nativo **Go High Level**.

Riferimento trigger: [`go-high-level-trigger.md`](../../knowledge_base/spoki_docs/integrazioni/go-high-level-trigger.md)

---

## Prerequisiti Spoki

| Requisito | Valore atteso |
| --- | --- |
| Campo dinamico | `DATA_APPUNTAMENTO` |
| Tipo | Data e ora (`field_type: 3`) |
| Codice | Esattamente `DATA_APPUNTAMENTO` (maiuscolo, underscore) |
| Toggle contatto | ON |
| Placeholder template | `%%DATA_APPUNTAMENTO%%` |

Campo di fallback (solo se serve lo step Trasforma): `DATA_APPUNTAMENTO_RAW` (tipo Testo).

---

## Trigger GHL obbligatorio

Il merge field `{{appointment.start_time}}` è valorizzato **solo** con trigger legati al calendario:

- *Customer Booked Appointment*
- *Appointment Status* (con filtro sullo status desiderato)

Con trigger generici (es. *Contact Tag Added*) il webhook risponde 200 ma `DATA_APPUNTAMENTO` resta vuoto.

**Workaround:** step *Update Contact Field* in GHL che copia *Appointment > Start Time* in un custom field contatto (es. `booking_date`), poi nel webhook usa `{{contact.booking_date}}`.

---

## Body webhook GHL (configurazione corretta)

In GoHighLevel: azione **Webhook** o **Custom Webhook**.

| Impostazione | Valore |
| --- | --- |
| Method | `POST` |
| Content-Type | `application/json` |
| URL | Webhook URL dal trigger Go High Level in Spoki (copia esatta) |
| Secret | Se previsto nel trigger Spoki, includerlo come da UI |

### Payload produzione

Usa il picker merge field (icona `{ }`):

```json
{
  "phone": "{{contact.phone}}",
  "first_name": "{{contact.first_name}}",
  "last_name": "{{contact.last_name}}",
  "email": "{{contact.email}}",
  "custom_fields": {
    "DATA_APPUNTAMENTO": "{{appointment.start_time}}"
  }
}
```

### Payload test (valore ISO fisso)

Per isolare problemi di merge field vs formato:

```json
{
  "phone": "{{contact.phone}}",
  "first_name": "{{contact.first_name}}",
  "last_name": "{{contact.last_name}}",
  "email": "{{contact.email}}",
  "custom_fields": {
    "DATA_APPUNTAMENTO": "2025-07-08T14:30:00+02:00"
  }
}
```

- Se il test fisso popola il campo → il problema è `{{appointment.start_time}}` vuoto o trigger sbagliato.
- Se resta vuoto → struttura JSON errata o codice campo diverso.

---

## Errore più comune

`DATA_APPUNTAMENTO` **non** va al livello root del JSON.

```json
{
  "phone": "{{contact.phone}}",
  "DATA_APPUNTAMENTO": "{{appointment.start_time}}"
}
```

Questa struttura **non** popola il campo in Spoki. Il valore deve stare dentro `custom_fields`.

---

## Formati data accettati

Verificato via API Spoki (`contacts/sync` e webhook automazione): entrambi funzionano.

| Formato | Esempio |
| --- | --- |
| ISO 8601 | `2025-07-08T14:30:00+02:00` |
| Italiano (come example campo) | `08/07/25 14:30` |

GHL invia tipicamente ISO da `{{appointment.start_time}}`. Non serve conversione se il payload è dentro `custom_fields`.

---

## Fallback: Trasforma campo contatto

Usa questo percorso solo se il mapping diretto non funziona (formato GHL non interpretato).

### 1. Webhook GHL

```json
"custom_fields": {
  "DATA_APPUNTAMENTO_RAW": "{{appointment.start_time}}"
}
```

### 2. Step Spoki (subito dopo il trigger)

- Tipo: **Trasforma campo contatto**
- Origine: `DATA_APPUNTAMENTO_RAW`
- Trasformazione: **Testo → Data e ora**
- Formato: `YYYY-MM-DDTHH:mm:ss` (o auto-detect se disponibile)
- Destinazione: `DATA_APPUNTAMENTO`

Doc: [`step-trasforma-campo-contatto-quando-e-come-usarlo.md`](../../knowledge_base/spoki_docs/how-to/step-trasforma-campo-contatto-quando-e-come-usarlo.md)

---

## Test da terminale

Script: [`scripts/test_ghl_spoki_data_appuntamento.sh`](../../scripts/test_ghl_spoki_data_appuntamento.sh)

```bash
./scripts/test_ghl_spoki_data_appuntamento.sh \
  --webhook-url "https://api.spoki.com/wh/ap/<UUID>/" \
  --secret "<SECRET>" \
  --phone "+393331234567"
```

Verifica in Spoki: **Chat → Dettaglio contatto → DATA_APPUNTAMENTO**.

---

## Checklist post-configurazione

1. GHL execution log: body contiene `custom_fields.DATA_APPUNTAMENTO` non vuoto
2. Spoki: automazione avviata per il contatto corretto (match `phone` E.164)
3. Profilo contatto: `DATA_APPUNTAMENTO` valorizzato
4. Template: `%%DATA_APPUNTAMENTO%%` risolto nello step di invio messaggio
