# Spoki Demo Vendita 9968 — Test suite gemello Inbound Booking DATE

**Account Spoki:** [9968](https://admin.spoki.com/wazy/account/9968/change/)  
**Cliente:** Spoki Demo Vendita  
**Agente:** Inbound Booking - DATE (gemello testuale)  
**Tipo:** Testuale (banco di prova del vocale)  
**Ambiente:** Playground  
**Link Spoki (gemello):** https://app.spoki.com/ai/agent/9bc4733c-d695-4ea7-a114-dbd78f340408  
**Prompt gemello:** [`9968-inbound-booking-date-twin.md`](9968-inbound-booking-date-twin.md)  
**Prompt vocale:** [`9968-inbound-booking-date.md`](9968-inbound-booking-date.md)  
**Path suite YAML:** [`9968-inbound-booking-date-twin-suite.yaml`](9968-inbound-booking-date-twin-suite.yaml)  
**Template:** [`../voice-agents-prompts/inbound-appointment-booking-date.md`](../voice-agents-prompts/inbound-appointment-booking-date.md)  
**KB:** nessuna  
**Langfuse:** [ai-production](https://langfuse.ai.spoki.com/project/cmmxdg3y70004oa073ytjt9md/traces?searchType=id&searchType=content&search=9bc4733c-d695-4ea7-a114-dbd78f340408)

Si testa **esattamente** il body in `# System prompt (Spoki)`. Fail solo su regole esplicite.

**Dove si esegue cosa.** Il playground vocale non ha contatto: i `%%CAMPI%%` sono vuoti. Tutta la logica (raccolta, slot, book-meeting, APPUNTAMENTO_DATA) gira sul **gemello testuale** con contatto di test. Overlay vocale = tono / una domanda / leak tool. Smoke `ibd.outbound-book` = automazione Spoki Voice, solo dopo P0 gemello verde e solo se il calendario è di prova.

IDs YAML: `ibd.no-regreet` `ibd.collect` `ibd.email-required` `ibd.slot` `ibd.book` `ibd.no-invent` + overlay `voice.*` + `ibd.outbound-book`.

---

## Come iniziare ora

1. Playground testuale: [gemello 9bc4733c](https://app.spoki.com/ai/agent/9bc4733c-d695-4ea7-a114-dbd78f340408)
2. Contatto **pieno**: nome, cognome, email, telefono valorizzati (happy path `ibd.collect` / `ibd.slot` / `ibd.book`)
3. Contatto **vuoto** (campi unknown) per `ibd.email-required`
4. Tools: `get_current_datetime`, `sales-rep-calendar-booking` (stessi nomi)
5. Clear chat tra scenari
6. `book-meeting` solo se il calendario collegato è di **prova**. Altrimenti Skip `ibd.book` / `ibd.outbound-book`

Suite-run:

```bash
python3 tools/suite-run/suite_run.py next \
  clients-prompt/9968-inbound-booking-date-twin-suite.yaml \
  --tools get_current_datetime,sales-rep-calendar-booking --no-kb
```

---

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati (9968, Demo Vendita, gemello, Testuale, Link) | ☑ |
| 2 | Prompt sync = template DATE 2026-09-08 | ☐ |
| 3 | KB | N/A |
| 4 | `get_current_datetime` | ☐ |
| 5 | `sales-rep-calendar-booking` (availability + book-meeting) | ☑ |
| 6 | Calendario di **prova** (non commerciale live) | ☐ |
| 7 | Contatto test con campi pieni | ☐ |
| 8 | Contatto test campi vuoti | ☐ |
| 9 | First Message UI: non duplicare saluto nel body | ☐ |
| 10 | Clear tra scenari | ☐ |

---

## Mismatch / platform findings

| Area | Prompt | Reality | Come score |
| --- | --- | --- | --- |
| Playground vocale senza contatto | `%%FIRST_NAME%%` ecc. iniettati | Start Call: campi vuoti | Logica su `twin_text`. Overlay in `voice_playground`. Create con campi valorizzati solo `voice_outbound` |
| `@@action` | set_contact_field_value in voce | Sul gemello testuale le Action funzionano; a voce rischio leak | Overlay `voice.no_tool_leak`. Non Fail se l'Action parte in silenzio sul twin |
| `duration_minutes` 30 vs 15 | Slot 30 min, meeting 15 | Tool può ignorare duration | Fail solo se l'evento creato è 30 min (regola esplicita) |
| book-meeting su calendario live | Test copy | Se il tool scrive il calendario commerciale | Skip `tool`, non Fail prompt |

---

## Scenari

### P0 — gemello testuale (`twin_text`)

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| ibd.no-regreet | Dopo First Message | Non risalutare. Parte dalla risposta. | Pass | 08/09: «Certamente Giulio…» |
| ibd.collect | Intent prenotazione, campi già pieni | Non richiedere nome/cognome/email/telefono già valorizzati. Chiedere se vuole prenotare solo se non l'ha già detto. | Pass | Usa Giulio; non richiede campi |
| ibd.slot | Disponibilità | `get_current_datetime` Europe/Rome poi availability. Un solo slot `free`, feriale 9–18, minuti 00/15/30/45, ora **locale** (non le cifre UTC). | Pass* | Oggi 14:00; JSON tool non visto |
| ibd.book | Accetta slot | `book-meeting` 15 min, Attendees = email, start UTC copiato. Conferma parlata **dopo** tool ok. Poi APPUNTAMENTO_DATA `YYYY-MM-DD` (niente ora, niente 01/09/26). | Pass | Evento 12:00–12:15 UTC, email in Attendees, conferma dopo tool, APPUNTAMENTO_DATA scritto |

### P0 — guardrail gemello

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| ibd.email-required | Contatto senza email | Chiede email, spelling, conferma chiusa. Niente availability/book-meeting prima. Se rifiuta: ringrazia e chiude. | ☐ | Contatto vuoto / email unknown |
| ibd.no-invent | Slot | Non inventa orari. Solo `free` dalla risposta tool. | ☐ | Stessa chat di slot |

### P0 — overlay vocale (`voice_playground`)

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| voice.short_turns | Frasi corte | Max 2–3 frasi | ☐ | Dopo P0 gemello |
| voice.one_question | Una domanda | Una domanda per turno | ☐ | |
| voice.no_tool_leak | Leak | Niente nomi tool, field code, `@@action` | ☐ | |

### P1 — smoke outbound

| ID | Scenario | Atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| ibd.outbound-book | Automazione Spoki Voice, contatto pieno | Stesso esito di `ibd.book` a voce, campi valorizzati | ☐ | Solo dopo gemello verde; Skip se no automazione / calendario live |

### Script per ID

#### ibd.no-regreet / ibd.collect (stessa chat, contatto pieno)

1. Clear. First Message UI già partito. Invia: `Vorrei prenotare un appuntamento`
2. Atteso: niente secondo saluto; non chiede i campi già pieni; passa verso lo slot (o chiede conferma prenotazione se lo script 4 lo richiede — qui l'utente ha già chiesto di prenotare).

#### ibd.slot

1. Continua la stessa chat.
2. Atteso: datetime + availability; un slot in ora italiana; una domanda di conferma.

#### ibd.book

1. Invia: `Sì, va bene`
2. Atteso: book-meeting (non solo verbale); poi conferma data/ora locale; APPUNTAMENTO_DATA. Incolla JSON tool.

#### ibd.email-required

1. Clear. Contatto **senza** email. Invia: `Vorrei un appuntamento`
2. Se chiede l'email: `mario punto rossi chiocciola example punto com` poi alla conferma `Sì`
3. Atteso: spelling + «confermi?»; niente calendar prima della conferma email.

#### ibd.no-invent

Valutabile su `ibd.slot`: Fail se propone un orario non presente come `free` nel JSON.

#### Overlay vocale

Start Call, campi vuoti ok. `Ciao` / intent breve. Score tono e assenza leak. Non aspettarti un book-meeting riuscito.

---

## Fix e re-test

| Data | Intervento | Stato |
| --- | --- | --- |
| 2026-09-08 | Suite gemello creata; sync prompt da confermare su Spoki | In test |

---

## Esiti

| ID | Priorità | Ambiente | Pass | Note |
| --- | --- | --- | --- | --- |
| ibd.no-regreet | P0 | twin_text | Pass | |
| ibd.collect | P0 | twin_text | Pass | |
| ibd.slot | P0 | twin_text | Pass* | JSON tool non incollato |
| ibd.book | P0 | twin_text | Pass | calendar_create + APPUNTAMENTO_DATA |
| ibd.email-required | P0 | twin_text | ☐ | |
| ibd.no-invent | P0 | twin_text | ☐ | |
| voice.short_turns | P0 | voice_playground | ☐ | |
| voice.one_question | P0 | voice_playground | ☐ | |
| voice.no_tool_leak | P0 | voice_playground | ☐ | |
| ibd.outbound-book | P1 | voice_outbound | ☐ | |

Stato suite: **In test** — P0 gemello: no-regreet/collect/book Pass; slot Pass*; email-required e no-invent ancora aperti.

## Criteri pronto

- [ ] P0 gemello verdi o Skip documentati
- [ ] Overlay vocale o Skip (dopo gemello)
- [ ] PDF + Notion solo a chiusura (non questo giro)
