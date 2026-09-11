# 54633 Digital Sharing — Test suite Playground

**Account:** 54633  
**Agente 1 (booking):** `54440282-4d4c-4ea2-9462-98a5baa916fd` — [`54633-digitalsharing-voice-outbound.md`](54633-digitalsharing-voice-outbound.md)  
**Agente 2 (callback writer):** da creare — [`54633-digitalsharing-callback-writer.md`](54633-digitalsharing-callback-writer.md)  
**Pre-check UI:** [`54633-digitalsharing-spoki-ui.md`](54633-digitalsharing-spoki-ui.md)

Indirizzo atteso in ogni scenario location: **Via Galileo Ferraris 39, 80142 Napoli**.

Per ogni riga: Pass / Fail + nota da transcript o summary.

## Setup

- [x] Prompt agente 1 aggiornato (solo sezione System prompt) — L/B ok; callback senza `set_callback_time`
- [ ] Prompt agente 2 creato e incollato in Spoki
- [ ] KB sede + progetto collegate sull'agente 1; vecchie KB TV scollegate
- [ ] First Message e Success Criteria aggiornati (agente 1 + agente 2)
- [x] Calendar tool collegato sull'agente 1 — B1 ok
- [ ] `set_callback_time` collegato **solo** sull'agente 2 ([libreria](../Libreria-prompt/set-callback-datetime-webhook-tool.md))
- [ ] Campo `CALLBACK_DATETIME` (Data e ora) creato
- [ ] Workflow: branch **Call me back** → Spoki Voice → agente 2
- [ ] Automazione Condizione su Data → Spoki Voice → agente 1 (dopo smoke C)

Transcript Playground 16/07/26 15:13 (L1–L5 + B1 stessa call).

## Scenari — Indirizzo (P0) — agente 1

| # | Input utente (dopo first message / a metà flusso) | Atteso | P/F | Note |
| --- | --- | --- | --- | --- |
| L1 | Dove vi trovate? | Indirizzo completo Napoli subito, una frase | P | "Via Galileo Ferraris 39 a Napoli" |
| L2 | Dove devo venire? | Stesso indirizzo | P | Idem + già spinge conferma nome |
| L3 | Qual è l'indirizzo della sede? | Stesso indirizzo | P | Idem |
| L4 | Siete a Milano? | Corregge: Napoli + indirizzo; non conferma Milano | P | "No, la sede è in Via…" |
| L5 | Dove fate l'intervista? (prima di chiedere "indirizzo") | Indirizzo completo senza attendere follow-up | P | "presso la nostra sede, in Via…" subito |

## Scenari — Booking e calendar fields — agente 1

| # | Scenario | Atteso | P/F | Note |
| --- | --- | --- | --- | --- |
| B1 | Happy path: conferma dati, vuole prenotare, accetta primo slot | Event creato; a voce: data, ora, indirizzo; **niente URL/Meet** | P | Slot ven 17/07 9:00 + indirizzo; no URL. Silenzio gestito ("Pronto?"). Email %% già popolata, chiesta conferma |
| B2 | Verifica evento creato (calendar mittente) | Location e/o Description con Via Galileo Ferraris 39, Napoli | P | Verifica manuale utente |
| B3 | Tool calendar fallisce al primo tentativo | Retry una volta; se fallisce ancora: no conferma falsa, offer transfer | — | Skip: difficile da forzare in Playground; ritestare se compare in produzione |
| B4 | Invite sul calendar destinatario | Annotare solo esito; **non è criterio di pass prompt** (ticket) | P | EMAIL dinamico popolato sul contatto → invite ok |

## Scenari — Callback (dual agent)

| # | Scenario | Atteso | P/F | Note |
| --- | --- | --- | --- | --- |
| C1a | Agente 1: "Non è momento buono, richiamo domani alle 15" | Esce dal booking; **non** chiama `set_callback_time`; non dice "registrato nel sistema"; chiude → SC Call me back | ☐ | |
| C1b | Automazione: Call me back → agente 2 | Parte Voice agente 2; chiede giorno/ora; `set_callback_time`; campo popolato; "registrato" solo post-success | ☐ | |
| C2a | Agente 1: "Richiamatemi tra 10 minuti" | Come C1a: handoff verbale, no write | ☐ | |
| C2b | Agente 2: risolve "tra 10 minuti" | `get_current_datetime` + tool; datetime sul campo ≈ now+10min Europe/Rome | ☐ | |
| C3 | Dopo write, richiamo booking con %% popolati | Agente 1 non richiede di nuovo email/telefono; conferma nome/cognome e prosegue booking | ☐ | |
| C4 | Smoke scheduling: orario tra 2–5 min via agente 2 | Campo popolato; Condizione su Data avvia agente 1 all'orario | ☐ | Dopo auto live |

## Scenari — Obiezioni canale — agente 1

| # | Scenario | Atteso | P/F | Note |
| --- | --- | --- | --- | --- |
| O1 | L'intervista è in TV? | Web radio / network; non TV | ☐ | |
| O2 | Sei un robot? | Disclosure AI chiara in italiano | ☐ | |

## Post-test

- [ ] Recording agente 1/2: nessun markdown, lista, URL
- [ ] Nessun token `@@action`
- [ ] Agente 1 non ha `set_callback_time` tra i tool
- [ ] Branch Call me back avvia agente 2 (non agente 1 di nuovo)
- [ ] Su fallimento tool agente 2: non dice "registrato"
- [ ] C4: Condizione su Data → agente 1 all'orario (non subito a fine call 1)

## Esito

| Campo | Valore |
| --- | --- |
| Data | |
| Location pass / total | |
| Booking pass / total | |
| Callback pass / total | |
| Pronto per test esterni | ☐ sì ☐ no |
| Note | |
