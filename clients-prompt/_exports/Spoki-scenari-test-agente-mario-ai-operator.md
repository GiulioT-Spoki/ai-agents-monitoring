# Spoki — Scenari di test dell’assistente WhatsApp

**Agente:** Mario (AI Operator, assistenza tecnica)
**Account Spoki:** 1384
**Tipo:** Testuale
**Link agente:** da confermare (copia di test in playground)
**Data verifica:** 31 agosto 2026
**Ambiente:** playground di test

---

## Contesto

È stato configurato e verificato l’assistente **Mario** per i clienti già attivi di Spoki. Il lavoro ha incluso:

1. **Prompt operativo** orientato all’assistenza tecnica e agli how-to di piattaforma, non alla vendita.
2. **Manuale live** (BetterDocs) tramite ricerca sul manuale ufficiale, senza knowledge base statica caricata sull’agente.
3. **Link in piattaforma** verso le schermate corrette (`app.spoki.com`), distinti dai link del manuale e dal form di assistenza tecnica Spoki.
4. **Due significati di “ticket”:** assistenza verso Spoki vs ticket dei contatti gestiti dal cliente in piattaforma.
5. **Verifica su messaggi inbound reali** (coda WhatsApp 21–28 agosto 2026): campagne, riconnessione canale, campi dinamici, Shopify, limiti piano vs Meta, recedere dal servizio, richiesta commerciale a metà chat.

Gli scenari sotto sono stati eseguiti sul playground con il prompt aggiornato. Risultano **verificati**. Alcuni how-to coprono il nucleo (articolo + schermata corretta) anche se non enumerano ogni sottopasso dell’articolo.

---

## Cosa è stato verificato

### Accoglienza e stile

| Scenario | Cosa è stato controllato |
| --- | --- |
| Saluto senza domanda | Accoglienza e richiesta di come aiutare; nessun link e nessuna ricerca nel manuale |
| Messaggio in inglese (limiti WhatsApp) | Risposta in inglese, articolo del manuale in lingua, schermata Analytics |
| Messaggio in spagnolo (aprire un ticket) | Disambiguazione in spagnolo, senza link in quel turno |
| Richiesta di lista markdown / grassetto | Prosa adatta a WhatsApp, senza formattazione markdown |
| Lamentela generica | Empatia e una domanda sul problema; nessun link |
| “Ma sei un AI?” | Si presenta come assistente digitale; nessun link |

### Manuale, limiti WhatsApp e canale

| Scenario | Cosa è stato controllato |
| --- | --- |
| Limiti contatti WhatsApp | Spiegazione dai livelli del manuale; link all’articolo; in piattaforma Analytics (Quality Status); nessun form assistenza |
| Stessa domanda in inglese | Stesso comportamento, con URL del manuale in inglese |
| Richiesta urgente sugli stessi limiti | Spiega comunque i livelli; non spinge il form di assistenza |
| Ban del numero WhatsApp | Procedura di appello dal manuale; unico link al form di assistenza tecnica, come previsto dall’articolo |
| Conversazioni del piano vs limiti Meta | Non confonde le conversazioni del piano Spoki con i tetti Meta sui contatti unici in 24 ore |
| Permessi Graph / template | Indirizza a riconnettere il canale WhatsApp, non alla sezione Template |
| Riconnessione canale (prerequisiti) | Chiede i prerequisiti dal manuale; se la riconnessione fallisce, form di assistenza con l’ID in testo, non nell’URL |

### Ticket e assistenza

| Scenario | Cosa è stato controllato |
| --- | --- |
| “Voglio aprire un ticket” (ambiguo) | Una domanda: assistenza Spoki vs ticket di un contatto in piattaforma; nessun link in quel turno |
| Conferma “la vostra assistenza” | Form `https://app.spoki.com/support`; non finge di aver aperto il ticket |
| Ticket per un cliente dentro Spoki | Sezione Ticket in piattaforma; articolo del manuale; nessun form assistenza Spoki |
| “Apri tu il ticket verso Spoki” | Spiega di non avere accesso all’account; invita al form di assistenza |
| Pulsante o testo “Apri Ticket Supporto” | Va subito al form di assistenza Spoki; non chiede se è ticket dei contatti; non manda a `/tickets` |
| Problema tecnico (invio / account bloccato) | Form di assistenza tecnica |
| Richiesta esplicita di un operatore in chat | Passaggio a operatore umano, senza sostituirlo con il form |
| “Ricontattarmi” senza chiedere un operatore | Resta in chat; non trasferisce |
| Apertura ticket di migrazione + operatore | Trasferimento; non inventa uno stato ticket |

### Piani, commerciale e prospect

| Scenario | Cosa è stato controllato |
| --- | --- |
| Prezzo piano in euro | Non inventa importi; rimanda a Piani (tab Your Plan) |
| Codice sconto influencer | Non inventa sconti; non manda il form di assistenza; resta in chat |
| Upgrade / conguaglio | Ammette il vuoto se non è nel manuale; rimanda a Piani; nessun importo inventato |
| Segnale commerciale debole | Una domanda di chiarimento; non manda subito il link demo |
| “Voglio parlare con un commerciale” dopo un how-to da cliente | Rimanda a Piani; non chiede se ha un account e non manda il book-a-demo |
| Demo | Solo se è chiaro che chi scrive non ha piano o account |

### How-to prodotto (campi, Shopify, campagne, recedere)

| Scenario | Cosa è stato controllato |
| --- | --- |
| Campi dinamici ON / OFF | ON = associati ai contatti Spoki (es. CSV); OFF = valorizzati da software o API esterno; non inverte i due casi e non inventa payload JSON |
| Carrelli abbandonati Shopify | Passi dell’articolo (telefono in checkout, webhooks, automazioni, attesa 15 minuti); non inventa checkbox di consenso marketing in Checkout |
| Campagne | How-to dal manuale e schermata in piattaforma |
| Recedere dal servizio | Istruzioni dell’articolo (email a support@spoki.com e tempi indicati); non usa il form ticket come sostituto |

---

## Interventi sul prompt legati ai test / feedback

| Tema | Intervento verificato |
| --- | --- |
| Fonte delle FAQ | Ricerca sul manuale ufficiale prima di rispondere a how-to e regole WhatsApp |
| Schermate in piattaforma | Link solo da elenco consentito; tab e overlay descritti a parole |
| Ticket ambiguo vs CTA supporto | Disambiguazione solo se “aprire un ticket” è vago; “Apri Ticket Supporto” va al form assistenza |
| Limiti WhatsApp | Oltre al manuale, invita a consultare Analytics → Quality Status |
| Assistenza Spoki | Form dedicato solo per problematiche tecniche, mai accoppiato al link del manuale nello stesso messaggio |
| Prospect a metà chat | Dopo how-to o limiti da cliente già attivo, una richiesta commerciale non riapre la domanda “hai un account?” |
| Campi dinamici e Shopify | Allineati al testo del manuale; niente passi o JSON inventati |
| Metriche | Conversazioni del piano Spoki distinte dai limiti Meta |

---

## Note tecniche (manuale / tool / piattaforma)

- Il manuale è allineato a BetterDocs in tempo reale; non va caricato un file knowledge base statico sull’agente.
- Il form di assistenza Spoki e la sezione Ticket del cliente sono URL distinti e non vanno scambiati.
- L’UUID dell’agente in Spoki (link della copia di test) resta da confermare per l’anagrafica interna.
- Copilot in dashboard (`/dashboard`) è distinto da Mario: Mario non opera sull’account al posto del cliente.
- Alcuni how-to inbound coprono il nucleo corretto (articolo e schermata) senza elencare ogni sottopasso; non è stato inventato contenuto assente dal manuale.

---

## Esito

Gli scenari elencati risultano **verificati** in playground, inclusi i casi tratti dalla coda inbound reale del 21–28 agosto 2026.

**Operatività consigliata:** confermare il link dell’agente di test in Spoki; allineare il prompt live con lo stesso system prompt; in produzione ripetere un controllo breve su saluto, limiti WhatsApp (manuale + Analytics), i due percorsi ticket, la CTA “Apri Ticket Supporto” e una richiesta commerciale dopo un how-to da cliente.
