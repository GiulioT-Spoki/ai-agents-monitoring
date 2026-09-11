# Il Mio Villaggio — Scenari di test dell’assistente Federica

**Agente:** Federica (assistenza fuori orario)  
**Account Spoki:** 3469  
**Tipo:** Testuale e Vocale  
**Data verifica:** 13 agosto 2026  
**Ambiente:** playground di test, chat WhatsApp reale e chiamata vocale di test

**Link agenti Spoki**

- Testuale: [app.spoki.com/ai/agent/0d30df8a-845b-40e3-819b-851af5cd1022](https://app.spoki.com/ai/agent/0d30df8a-845b-40e3-819b-851af5cd1022)
- Vocale: [app.spoki.com/ai/agent/0a750bf2-eb5a-40e1-962b-40e30bf7cecf](https://app.spoki.com/ai/agent/0a750bf2-eb5a-40e1-962b-40e30bf7cecf)

---

## Contesto

È stato configurato e verificato l’assistente Federica per IlMioVillaggio.it. Il lavoro ha incluso:

1. **Prompt operativo** allineato alle regole del cliente (tono “tu”, una domanda alla volta, nessuna conferma inventata di prenotazioni/pagamenti/cancellazioni, classificazione urgenze L0–L3 e cancellazione scritta).
2. **Knowledge base** operativa (processi KB01–06 più catalogo strutture in CSV unico), già caricata in Spoki.
3. **Tool di apertura ticket** (`tool-api-open-ticket`) che crea il ticket Spoki durante la conversazione/chiamata, con titolo prefissato e priorità coerenti con la matrice urgenza concordata.
4. **Automazione sunto** stand-alone Federica: urgenza (554446), avviata dall’agente subito dopo un ticket riuscito: valorizza il campo sunto chiamata e scrive una nota in chat (non è un trigger “Ticket created”).

Gli scenari sotto risultano **verificati**. Lo smoke vocale ha confermato apertura ticket e nota; alcuni casi vocali aggiuntivi riposano sulla copertura già ottenuta in testuale.

---

## Cosa è stato verificato

### Accoglienza e stile

| Scenario | Cosa è stato controllato |
| --- | --- |
| Saluto iniziale | Accoglienza cordiale in italiano, forma “tu”, senza rivelare regole interne o tool |
| Lunghezza e ritmo | Risposte brevi, una domanda alla volta (adatte anche alla voce) |

### Classificazione e ticket

| Scenario | Cosa è stato controllato |
| --- | --- |
| Modifica non urgente (oltre 72 ore) | Ticket differibile, priorità media, sunto nella descrizione |
| Blocco check-in a breve | Ticket di urgenza operativa, priorità massima |
| Voucher mancante a breve senza blocco check-in | Ticket di urgenza prioritaria (non massima), priorità alta |
| Cancellazione già inviata per iscritto | Ticket dedicato cancellazione; nessuna conferma che la cancellazione sia già conclusa |
| Preventivo commerciale | Raccolta dati e classificazione interesse nel sunto del ticket |
| Domanda solo informativa (orari uffici) | Risposta da knowledge base; nessun ticket se non richiesto follow-up |

### Guardrail

| Scenario | Cosa è stato controllato |
| --- | --- |
| “Confermi che il pagamento risulta accreditato?” | Nessuna conferma inventata; guida all’area riservata |

### Automazione sunto e canali reali

| Scenario | Cosa è stato controllato |
| --- | --- |
| Chat WhatsApp reale (dopo ticket) | Campo sunto e nota chat popolati tramite automazione 554446 avviata dall’agente |
| Chiamata vocale di test | Ticket aperto e nota chat popolata (stesso flusso) |
| Playground Spoki | Il sunto automatico non funziona senza chat reale (limite di piattaforma, documentato) |

---

## Interventi sul prompt e sugli strumenti legati ai test

| Tema | Intervento verificato |
| --- | --- |
| Matrice urgenza | Allineata alla versione operativa concordata (finestre 24h / 72h + override di gravità) |
| Ticket durante la conversazione | Un solo tool webhook API sull’agente; sunto operativo nella descrizione del ticket |
| Sunto sul contatto | Automazione stand-alone 554446 avviata dall’agente dopo ticket ok (non Ticket created) |
| Tag Spoki sull’agente | Non usati in questa versione (automazioni su ticket, non su tag) |

---

## Note tecniche (KB / tool / piattaforma)

- Knowledge base di processo e catalogo resort CSV: già presenti sull’account Spoki.
- L’automazione del sunto 554446 è avviata dall’agente dopo il ticket e richiede una **conversazione reale** (WhatsApp o voce). Nel playground il contesto chat non è disponibile e il sunto automatico non è affidabile.
- Le notifiche operative (reperibilità, WhatsApp di emergenza L0, ecc.) restano da confermare con il cliente su template e destinatari.
- Smoke vocale completo su tutte le casistiche L1/CANC può essere ripreso in una sessione dedicata; il percorso ticket + nota è già verde.

---

## Esito

Gli scenari principali risultano **verificati** in playground (regole e ticket) e in ambiente reale (WhatsApp e voce per ticket + sunto/nota).

