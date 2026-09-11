# 34768 LucIA — PLACEHOLDER tool `tuotempo_search_availability`

> Stub da creare ora in Spoki (account **34768**).  
> **Non è operativo** finché Calatafimi non fornisce base URL test/prod, auth e mappa `activity_lid` / `location_lid`.

Template completo (parametri, schema, risposta): [`tuotempo-search-availability-webhook-tool.md`](tuotempo-search-availability-webhook-tool.md).  
Prompt agente: [`34768-calatafimi-med-prompt.md`](../clients-prompt/34768-calatafimi-med-prompt.md) — sezione `# APPOINTMENTS (TUOTEMPO)`.

Companion stub: [`34768-tuotempo-add-appointment-PLACEHOLDER.md`](34768-tuotempo-add-appointment-PLACEHOLDER.md).

---

## Configurazione stub (form Spoki)

- **Nome tool:** `tuotempo_search_availability`
- **Descrizione (quando usarlo):** Cerca slot disponibili in agenda Tuotempo per una prestazione. Usalo solo se base URL e auth sono reali e conosci `activity_lid`. Se il tool non è configurato o fallisce, non inventare slot: raccogli contatti e trasferisci a operatore.
- **Metodo:** `GET`
- **URL (placeholder — sostituire):**  
  `https://PLACEHOLDER-TUOTEMPO-BASE-URL.invalid/searchavailabilities?activity_lid={{activity_lid}}&ava_start_day={{ava_start_day}}&ava_end_day={{ava_end_day}}&ava_start_time=00:00&ava_end_time=23:59&ava_min_time={{ava_min_time}}&ava_max_time={{ava_max_time}}&ava_results_number=1000&resource_lid={{resource_lid}}&location_lid={{location_lid}}&insurance_lid={{insurance_lid}}`
- **Headers:**
  - `Authorization: PLACEHOLDER_TUOTEMPO_AUTH`
  - `Content-Type: application/json`

---

## Schema parametri (LLM)

Come nel template completo: obbligatori `activity_lid`, `ava_start_day`, `ava_end_day`; opzionali orari, `resource_lid`, `location_lid`, `insurance_lid`. Date `DD/MM/YYYY` via `get_current_datetime` (Europe/Rome).

---

## Checklist attivazione (quando arriva il cliente)

1. Sostituire `PLACEHOLDER-TUOTEMPO-BASE-URL.invalid` con URL test, poi prod.
2. Sostituire `PLACEHOLDER_TUOTEMPO_AUTH` con l’header reale.
3. Caricare tabella `activity_lid` / `location_lid` (KB o note tool).
4. Smoke-test search, poi add sul companion stub.

---

## Policy LucIA

- Proporre solo slot restituiti dal tool.
- Slot proposto ≠ prenotazione confermata: conferma solo dopo `tuotempo_add_appointment` OK.
- Non mostrare LID interni al paziente (usa `AVAILABILITY_LID` solo verso il tool add).
