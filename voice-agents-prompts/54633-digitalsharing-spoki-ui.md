# 54633 Digital Sharing — Istruzioni Spoki UI

Non copiare questo file nel system prompt. Usarlo per configurare gli agenti vocali sull'account 54633.

## Agenti

| Ruolo | File prompt | Note |
| --- | --- | --- |
| Agente 1 — booking | [`54633-digitalsharing-voice-outbound.md`](54633-digitalsharing-voice-outbound.md) | id attuale `54440282-4d4c-4ea2-9462-98a5baa916fd` |
| Agente 2 — callback writer | [`54633-digitalsharing-callback-writer.md`](54633-digitalsharing-callback-writer.md) | nuovo Custom agent; solo write `CALLBACK_DATETIME` |

---

## Agente 1 — Booking

### System prompt

Incollare solo la sezione **System prompt (Spoki)** da [`54633-digitalsharing-voice-outbound.md`](54633-digitalsharing-voice-outbound.md), escludendo i metadati debug in testa.

### First Message (proposta)

Sostituire:

`Ciao, sono Giulio AI, responsabile executive di Canale 8.`

Con:

`Buongiorno, parlo con %%FIRST_NAME%%? La chiamo da Canale 8 per Segreti di Stile.`

Se `%%FIRST_NAME%%` è vuoto: `Buongiorno, la chiamo da Canale 8 per Segreti di Stile.`

### Success Criteria (proposta)

- Success: the user confirmed a slot and the calendar event was created successfully.
- Call me back: the user asked to be called later or said it was not a good time.
- Neutral: conversation happened but no booking and no clear callback request.
- No answer / rejected: call not completed.

### Knowledge Base

1. [`54633-digitalsharing-kb-sede.md`](../clients-kb/54633-digitalsharing-kb-sede.md)
2. [`54633-digitalsharing-kb-progetto.md`](../clients-kb/54633-digitalsharing-kb-progetto.md)

Scollegare vecchie KB TV.

### Tools (agente 1)

- `Calendar Digital Sharing S.r.l.`
- `get_current_datetime`, `search_knowledge_base`, `transfer_to_human`
- **Niente** `set_callback_time` su questo agente (evita falso positivo multi-tool)

Nessun `@@action`.

---

## Agente 2 — Callback writer

Creare un nuovo **Custom** voice agent. Incollare solo **System prompt (Spoki)** da [`54633-digitalsharing-callback-writer.md`](54633-digitalsharing-callback-writer.md).

### First Message (proposta)

`Buongiorno%%FIRST_NAME%%, la richiamo da Canale 8 solo per fissare l'orario di richiamo.`

Se il nome è vuoto: `Buongiorno, la richiamo da Canale 8 solo per fissare l'orario di richiamo.`

### Success Criteria (proposta)

- Success: the user confirmed a callback time and `set_callback_time` saved `CALLBACK_DATETIME`.
- Neutral: conversation happened but no confirmed callback time.
- Call me back / No answer: as needed; non far partire un terzo agente in loop.

### Tools (agente 2)

- `set_callback_time` — da [`set-callback-datetime-webhook-tool.md`](../Libreria-prompt/set-callback-datetime-webhook-tool.md)
  - Body params: `phone` (Dynamic field `PHONE`) + `custom_fields` (Object, LLM) con chiave `CALLBACK_DATETIME` in formato `MM/DD/YYYY HH:mm` (es. `07/17/2026 15:00`)
- `get_current_datetime`
- Opzionale: `transfer_to_human`
- **Niente** calendar

Nessuna KB obbligatoria.

### Runtime

Temperature bassa (0.1–0.3). Voice speed 0.9x–1.1x.

---

## Campo dinamico CALLBACK_DATETIME

| Code | Tipo | Dettaglio contatto |
| --- | --- | --- |
| `CALLBACK_DATETIME` | Data e ora | ON |

---

## Automazioni

### 1) Branch Call me back → agente 2 (obbligatorio)

Sul workflow che già avvia **agente 1** (Spoki Voice):

1. Branch **Call me back** → azione **Spoki Voice** → **agente 2** (delay 0 o pochi secondi).
2. Branch Success / Neutral / No answer: non avviare agente 2.

L'agente 2 non eredita il transcript: chiede di nuovo giorno/ora e scrive il campo.

### 2) Condizione su Data → agente 1 (richiamo all'orario)

Automazione dedicata, es. `[54633] Richiamo CALLBACK_DATETIME → Voice`:

1. Trigger: **Condizione su Data** su `CALLBACK_DATETIME` (**È** / all'orario).
2. Azione: **Spoki Voice** → **agente 1** (booking).
3. Pubblicare dopo smoke: write agente 2 ok, poi orario tra 2–5 minuti.

Riferimenti: [reminder su data](../../knowledge_base/spoki_docs/how-to/come-avviare-un-messaggio-di-reminder-in-automatico-da-spoki.md), [Spoki Voice](../../knowledge_base/spoki_docs/integrazioni/setting-up-your-spoki-voice-agent.md).

---

## Cosa dire al cliente (limiti)

| Tema | Messaggio |
| --- | --- |
| Invite calendar destinatario | Ticket Spoki/Google; prompt non garantisce l'invite. |
| Email conferma | Fuori scope; in sviluppo piattaforma. |
| Richiamo all'orario | Agente 2 scrive `CALLBACK_DATETIME`; automazione Condizione su Data richiama con agente 1. |
| Memoria tra call | Nessun transcript condiviso; solo `%%` già sul contatto. |
| ASR | Non gestibile da prompt. |
| Falso successo tool multipli | Per questo `set_callback_time` sta solo sull'agente 2. |
