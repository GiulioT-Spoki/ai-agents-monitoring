# Checklist debug system prompt — agente vocale Spoki

Checklist operativa da seguire in ordine. Non riscrivere il prompt finché non hai famiglia di bug + evidenza (sezione 0).

**Fonti:**
- [reference.md](../clients-prompt/reference.md) — best practice generali
- [guida-prompt-spoki.md](../guida-prompt-spoki.md) — struttura, ALWAYS/NEVER, iteration
- Template in questa cartella (es. `data-collection-voice-outbound.md`, `sales-rep-voice-outbound.md`)
- [analisi-prompt-gallery.html](../../analisi-prompt-gallery.html) — `channelConfusion`, `dirtyPrompt`, `gapConfig`, `weakSC`
- [setting-up-your-spoki-voice-agent.md](../../knowledge_base/spoki_docs/integrazioni/setting-up-your-spoki-voice-agent.md)

---

## Differenze testo vs voce (filtro mentale)

Se il prompt vocale “sembra” un prompt WhatsApp, è già un sospetto primario.

| Aspetto | Agente testuale | Agente vocale |
| --- | --- | --- |
| Canale | WhatsApp / chat | Telefono: tutto viene letto ad alta voce |
| Output | Prosa WhatsApp-safe (no markdown nelle risposte) | Niente markdown, simboli, elenchi, URL, emoji **nel parlato** |
| Side effect | Token `@@action:...@@` | **Mai** `@@action`; solo tool server |
| Turn design | 1–3 frasi, una domanda | Max 2–3 frasi parlate, una domanda, anti-ripetizione, silenzio/rumore |
| Apertura | Saluto nel flusso chat | First Message = campo UI separato; prompt: non risalutare |
| Success | Meno centrale | Success Criteria per branching automazioni |
| Fallimento tipico | Action sbagliata, routing, KB contradictoria | Residui chat, prompt sporco, tool non collegati |

---

## Scheda caso (compilare all’inizio)

| Campo | Valore |
| --- | --- |
| Account / agente | |
| Inbound o outbound | |
| Tipo agente (Custom / Sales / Customer) | |
| Problema in 1 riga | |
| Evidenza 1 (transcript / call ID) | |
| Evidenza 2 | |
| Famiglia bug | ☐ channelConfusion ☐ dirtyPrompt ☐ gapConfig ☐ weakSC ☐ flusso ☐ KB ☐ tool/runtime ☐ temperature/voce |

---

## 0. Isola il sintomo

- [ ] Problema osservato scritto in 1 riga
- [ ] Inbound/outbound e tipo agente annotati
- [ ] 1–2 evidenze raccolte (Playground transcript e/o recording + summary in Calls)
- [ ] Famiglia di bug classificata (scheda sopra)
- [ ] **Stop:** non riscrivere il prompt senza famiglia + evidenza

---

## 1. Igiene canale e prompt sporco (P0)

Confronta con un template in questa cartella, poi spunta:

- [ ] Nessun riferimento a WhatsApp, “scrivere”, markdown nelle **risposte**, emoji, URL da leggere
- [ ] Nessun token `@@action:...@@`
- [ ] Nessun preambolo Generate-with-AI / ChatGPT (“Sure! Here’s a prompt…”)
- [ ] Header `#` solo per strutturare istruzioni; non devono finire nel parlato
- [ ] Ruolo esplicito: assistente vocale al telefono; inbound/outbound chiaro
- [ ] Regola parlato: max 2–3 frasi, una domanda, no ripetizione messaggio precedente, gestione silenzio/rumore

Se fallisce qui: ripulisci prima di ogni altro fix.

**Template di confronto:** ☐ data-collection ☐ sales-rep ☐ lead-qualification-inbound ☐ lead-qualification-outbound ☐ altro: ___

---

## 2. First Message ↔ prompt ↔ flusso

- [ ] First Message (UI Spoki) = solo apertura; non duplicato nel system prompt come secondo saluto
- [ ] Prompt: parti dalla risposta del chiamante; non risalutare
- [ ] Outbound: “non parlare finché il chiamante non risponde” coerente con First Message
- [ ] `%%FIRST_NAME%%`, `%%PHONE%%`, ecc. solo in dati chiamante / First Message — non inventate nelle risposte

Sintomi tipici se fallisce: doppio saluto, domanda ripetuta, attesa sbagliata.

---

## 3. Architettura prompt

- [ ] Prompt = come comportarsi; KB = cosa sa (niente cataloghi/policy lunghe nel prompt)
- [ ] Sezioni aggregate: Ruolo / Lingua / Tono / Dati / Flusso / Strumenti / Limiti / Chiusura
- [ ] Passi numerati; scenari in blocchi `### If Scenario…` (non regole sparse)
- [ ] Steer positivo > liste lunghe ALWAYS/NEVER
- [ ] Sotto ~16k caratteri; info critica non sepolta in fondo
- [ ] Lingua istruzioni coerente con pratica del progetto; risposta nella lingua del chiamante

---

## 4. Tool e side effect (gapConfig)

| Tool citato nel prompt | Presente in Agent tools? | Nome allineato? | Quando / campi documentati? |
| --- | --- | --- | --- |
| | ☐ | ☐ | ☐ |
| | ☐ | ☐ | ☐ |
| | ☐ | ☐ | ☐ |

- [ ] Ogni tool citato esiste e ha nome allineato
- [ ] Prompt dice quando chiamarlo, con quali campi, e di non leggere ad alta voce l’output tecnico
- [ ] Nessuna promessa a voce (“ti mando WhatsApp”, “ti metto un tag”) senza tool/automation reale
- [ ] Webhook/esterni raggiungibili (firewall)
- [ ] Transfer umano: istruzioni + tool `transfer_to_human` (o equivalente) configurato

---

## 5. Success Criteria e automazioni

- [ ] Success Criteria a livelli utili (win pieno / parziale / fail), non una riga vaga
- [ ] Coerenti con ciò che il prompt considera “chiamata riuscita”
- [ ] Branch automation (Success / Neutral / Call me back / No answer) allineati ai criteria
- [ ] Automation non live finché Playground non passa

---

## 6. KB e contraddizioni

| Documento KB | Collegato all’agente? | Note |
| --- | --- | --- |
| | ☐ | |
| | ☐ | |

- [ ] Documenti KB collegati (non basta crearli)
- [ ] Nessuna voce duplicata con dati conflittuali
- [ ] Nella KB non ci sono istruzioni di comportamento
- [ ] Se ignora la KB: cerca conflitti/duplicati prima di rafforzare il prompt

---

## 7. Parametri runtime

- [ ] Temperature: support 0.1–0.3; sales più alta — **mai 0**
- [ ] Voice speed 0.9x–1.1x
- [ ] Default Reply impostata
- [ ] Voce allineata a brand/persona

Valori osservati: temp ___ | speed ___ | voice ___ | default reply ☐ sì ☐ no

---

## 8. Playground — killer scenarios

Metodo: test → annota quando/come/perché → fix **una** causa → ri-test fail + 2 happy path → ascolta recording → solo dopo automation.

| # | Scenario | Pass/Fail | Quando / come / perché | Fix applicato |
| --- | --- | --- | --- | --- |
| 1 | Happy path fino a tool + chiusura | ☐ P ☐ F | | |
| 2 | Chiamante interrompe / cambia argomento | ☐ P ☐ F | | |
| 3 | Silenzio / audio poco chiaro | ☐ P ☐ F | | |
| 4 | Rifiuto / “richiamatemi” | ☐ P ☐ F | | |
| 5 | Fuori scope / handover umano | ☐ P ☐ F | | |
| 6 | Dato già in `%%FIELD%%` (non richiedere di nuovo) | ☐ P ☐ F | | |
| 7 | Tentativo di far leggere URL / lista / markdown | ☐ P ☐ F | | |
| 8 | | ☐ P ☐ F | | |
| 9 | | ☐ P ☐ F | | |
| 10 | | ☐ P ☐ F | | |

Post-test audio:

- [ ] Recording ascoltato: non legge simboli, liste, URL, nomi tool
- [ ] Ri-test scenari falliti + 2 regression happy-path
- [ ] Solo dopo: collega/verifica automazioni e branch

---

## 9. Gemello testuale (se esiste)

Coppia voice/text: ___

- [ ] Diff: rimosso dal voice tutto ciò che è solo testo (`@@action`, regole WhatsApp, multi-step lunghi da chat)
- [ ] Nel voice restano solo flusso parlato + tool server + chiusura chiamata
- [ ] Nessun copy-paste da chat senza passare dal filtro sezione 1

---

## Cosa non fare

- Liste ALWAYS/NEVER sempre più lunghe per “forzare” il modello
- Knowledge nel prompt “per essere più sicuro”
- `@@action` su voice sperando che funzioni come in chat
- Debug in produzione/automation prima del Playground
- Metadati debug dentro il prompt Spoki (tienili fuori, come appendice Dimann)

---

## Esito

| Campo | Valore |
| --- | --- |
| Data | |
| Famiglia bug confermata | |
| Fix principali | |
| Playground: scenari passati / totali | |
| Pronto per automation live | ☐ sì ☐ no |
| Note | |
