# 34768 LucIA — PLACEHOLDER tool `tuotempo_add_appointment`

> Stub da creare ora in Spoki (account **34768**).  
> **Non è operativo** finché Calatafimi non fornisce base URL test/prod, auth e mappa `activity_lid` / `location_lid`.

Template completo (body, schema, risposta): [`tuotempo-add-appointment-webhook-tool.md`](tuotempo-add-appointment-webhook-tool.md).  
Prompt agente: [`34768-calatafimi-med-prompt.md`](../clients-prompt/34768-calatafimi-med-prompt.md) — sezione `# APPOINTMENTS (TUOTEMPO)`.

Companion stub: [`34768-tuotempo-search-availability-PLACEHOLDER.md`](34768-tuotempo-search-availability-PLACEHOLDER.md) (serve lo slot/`availability_lid` prima di chiamare add).

---

## Configurazione stub (form Spoki)

- **Nome tool:** `tuotempo_add_appointment`
- **Descrizione (quando usarlo):** Crea l'appuntamento su uno slot restituito da `tuotempo_search_availability`. Chiamalo **una sola volta** dopo slot scelto + dati obbligatori paziente. Se il tool non è configurato o fallisce, non inventare conferma: handoff operatore.
- **Metodo:** `POST`
- **URL (placeholder — sostituire):**  
  `https://PLACEHOLDER-TUOTEMPO-BASE-URL.invalid/addappointment`
- **Headers:**
  - `Authorization: PLACEHOLDER_TUOTEMPO_AUTH`
  - `Content-Type: application/json`
- **Body:** come nel template completo (`availability_lid`, date/ore, `activity_lid`, `resource_lid`, `location_lid`, anagrafica, ecc.)

---

## Checklist attivazione (quando arriva il cliente)

1. Sostituire base URL placeholder con URL test, poi prod.
2. Sostituire auth placeholder.
3. Verificare che search e add usino la **stessa** istanza.
4. Smoke-test: search → scelta slot → add → `ADD_RESULT: OK`.
5. Aggiornare suite (B1/B2) togliendo Skip placeholder.

---

## Policy LucIA

- Confermare al paziente **solo** dopo successo tool (`ADD_RESULT: OK` / result OK).
- Una sola create per paziente/prestazione/slot nella conversazione.
- Non mostrare LID interni.
- Sposta/cancella → `transfer_to_human` (tool get/reschedule/cancel non attivi sul prompt).
