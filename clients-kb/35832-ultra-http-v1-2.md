# AVS ELECTRONICS — Appendice protocollo HTTP ULTRA v1.2

Sorgente: appendice HTTP v1.2 e riedizione **26.05.26**. Bios: **Regole Client/Server** → tab **Server HTTP**. Esempio schermata: Username `admin`, Porta TCP **8080**, Autenticazione **Nessuna**, Forza terminazione **disabilitata**. La porta TCP è programmabile (non è fissa a 502). Edizione 26.05.26: uscite fuori sessione in italiano usano `/cmd/nosess/out/enable` e `/cmd/nosess/out/disable` (allineate all’inglese).  
Prodotti: **ULTRA 32**, **ULTRA 64**, **ULTRA 128**, **ULTRA 1000**.  
Non usare questo file per altre famiglie prodotto (XSAT, JET, ecc.).  
Porte NVR / ONVIF diretta (15001, 15200, 8085) non sono questo Server HTTP: vedi `35832-ultra-nvr-v1-9` e `35832-ultra-cam-onvif-http-snap-v1-1`.  
Lingue nel PDF: IT, EN, FR. Sotto: italiano (riferimento) e inglese. I path API sono quelli IT/EN (`zone=all`, non `toutes`).

Costante query presente in tutti gli esempi del manuale: `ultra=kOU9Rc885y1Gia3p`.

---

## Contatti

AVS Electronics S.p.A., Via Valsugana 63, 35010 Curtarolo (PD), Italy  
Tel. +39 049 9698411  
Email: avs@avselectronics.it  
Help desk: support@avselectronics.it  
Sito: avselectronics.com

---

## Ruolo del server HTTP

HTTP è un protocollo applicativo: il client richiede, il server risponde.

Il server HTTP della centrale ULTRA copre tre usi:

1. **Protocollo AVS-HTTP** — dispositivi remoti (es. applicazioni PC) che implementano le API dei capitoli seguenti.
2. **Terze parti / protocollo personalizzato** — messaggi http senza personalizzazione AVS-HTTP. La centrale risponde positivamente a messaggi **senza invio di dati** se soddisfano le **Regole Server** di accettabilità.
3. **Regole Client** — la centrale può agire da client e inviare stringhe a server esterni.

---

## Configurazione Server HTTP (Bios)

Menu **Regole Client/Server / Server HTTP**:

- **Porta TCP**: porta logica di ascolto
- **Autenticazione**: nessuna, Base64 o Digest
- **Username e password** se autenticazione richiesta
- **Forza terminazione connessione**: chiudere la connessione dopo la risposta, senza aspettare il client

---

## 1. Protocollo AVS-HTTP (con sessione)

Il client deve **aprire una sessione**, poi può inviare comandi e richieste di stato. Se non interrogata, la centrale chiude la sessione dopo **60 secondi**. Il timeout si rinnova a ogni richiesta. Chiusura anticipata con `/session/close`.

Segnaposto:

- `<indirizzo server>` = indirizzo della centrale Ultra
- `<porta>` = porta di ascolto del server HTTP
- `<panel-id>` = PANEL ID
- `<pin utente>` = codice utente che esegue richieste/comandi

Base: `http://<indirizzo server>:<porta>`  
Query comune: `ultra=kOU9Rc885y1Gia3p&pid=<panel-id>&user=<pin utente>`

### Sessione

- Apertura: `/session/open?ultra=kOU9Rc885y1Gia3p&pid=<panel-id>&user=<pin utente>`
- Chiusura: `/session/close?ultra=kOU9Rc885y1Gia3p&pid=<panel-id>&user=<pin utente>`

### Zone (in sessione)

- Allarme auto-ripristinante: `/cmd/zone/alarm-ar?...&zone=<num. zona>`
- Allarme zona: `/cmd/zone/alarm?...&zone=<num. zona>`
- Ripristino: `/cmd/zone/restore?...&zone=<num. zona>`
- Esclusione: `/cmd/zone/exclusion?...&zone=<num. zona>`
- Inclusione: `/cmd/zone/inclusion?...&zone=<num. zona>`
- Tamper: `/cmd/zone/tamper?...&zone=<num. zona>`

### Uscite (in sessione)

- Attivazione: `/cmd/out/enable?...&out=<num. uscita>`
- Disattivazione: `/cmd/out/disable?...&out=<num. uscita>`

### Settori / partition (in sessione)

- Arm On: `/cmd/sector/arm-on?...&sector=<num. settore>`
- Arm Home: `/cmd/sector/arm-home?...&sector=<num. settore>`
- Arm Area: `/cmd/sector/arm-area?...&sector=<num. settore>`
- Arm Perimetro: `/cmd/sector/arm-perimeter?...&sector=<num. settore>`
- Disarm: `/cmd/sector/disarm?...&sector=<num. settore>`

### Richieste di stato (risposta file JSON)

- Sistema: `/info/system?...`
- Zona: `/info/zone?...&zone=<num. zona>`
- Tutte le zone: `/info/zone?...&zone=all`
- Allarme zona: `/info/zone/alarm?...&zone=<num. zona>`
- Allarmi tutte: `/info/zone/alarm?...&zone=all`
- Settore: `/info/sector?...&sector=<num. settore>`
- Tutti i settori: `/info/sector?...&sector=all`
- Uscita: `/info/out?...&out=<num. uscita>`
- Tutte le uscite: `/info/out?...&out=all`

Esempio risposta stato sistema: file `system.json` con oggetto `station` (tamper, AC_mains, battery_voltage, battery_presence, PSTN_line, GSM_line, output_relay, fuse_bus_1/2/3, detectors_powerSupply_fuse, Siren_powerSupply_fuse, current_draw, GSM_Plug credit/sig_level, keypads, satellite, readers, sirens_HP, sirens_RF, XGSM_485).

### Messaggi fuori sessione

**Non** richiedono pin utente né apertura sessione. Query: `ultra=kOU9Rc885y1Gia3p&pid=<panel-id>` (senza `user`).

Zone:

- `/cmd/nosess/zone/alarm-ar?...&zone=<num. zona>`
- `/cmd/nosess/zone/alarm?...&zone=<num. zona>`
- `/cmd/nosess/zone/restore?...&zone=<num. zona>`

Uscite (edizione **26.05.26**, IT/EN): `/cmd/nosess/out/enable` e `/cmd/nosess/out/disable`. Se un PDF precedente mostra `noses` (una sola s), trattarlo come refuso OCR: il path corretto è **nosess**.

---

## 2. Protocollo personalizzato — Regole Server

Dopo aver impostato la porta, il server risponde su `http://<indirizzo server>:<porta>`.

Bios, menu **Regole Client/Server / Regole Server**:

- Indirizzo MAC (+) e Indirizzo IP (+) degli apparati abilitati
- Metodo: Qualsiasi / GET / POST
- Evento generato all’arrivo della stringa
- Zona / Uscita / Settore / Scenario (numero oggetto)
- Richiesta: stringa personalizzata
- Corpo (facoltativo): **NON USATO**

Esempio: zona 5 come Server HTTP, richiesta `allarmezona5` (IT) / `alarmzone5` (EN). Inviando `http://<indirizzo>:<porta>/allarmezona5` la zona 5 viene aperta e richiusa.

### Carattere speciale `$`

Nel campo Richiesta, `$` fa leggere dalla stringa il numero di Zona/Uscita/Settore/Scenario. Il campo oggetto in regola viene disabilitato.

Esempio: evento Accensione Settore (ON), richiesta `on$`. Il client invia `on1` → settore 1 ON, `on2` → settore 2 ON, e così via.

---

## 3. Regole Client (la centrale invia)

Bios, **Regole Client/Server / Regole Client**:

- Evento, oggetto (indice), Azione (+) per server e stringa
- Indirizzo IP, Porta
- Metodo: GET / PUT / POST / DELETE
- Autenticazione: **NO**
- Resource, Query

Stringa composta: `<Indirizzo IP>:<Porta>/<Resource>?<Query>`  
(Nel PDF IT compare anche `:<Porta>/>Resource>` con typo; la forma corretta è quella con `/` singolo prima della resource, come in EN.)

---

## English summary

Bios: Client/Server Rules / HTTP Server — TCP port; auth none/Base64/Digest; username/password; force connection termination after response.

AVS-HTTP: open session first; idle close after 60 seconds; renews on each request.

Paths use `ultra=kOU9Rc885y1Gia3p`, `pid`, and `user` (except nosess). Status calls return JSON (`system.json` for `/info/system`). Use `zone=all`, `sector=all`, `out=all` for bulk status.

Out-of-session: no user pin and no session. EN paths for outputs use **nosess** (`/cmd/nosess/out/enable`, `/cmd/nosess/out/disable`). IT print uses **noses** on those two output URLs.

Custom Server Rules: MAC/IP allowlists, method Any/GET/POST, event, object number, request string, body unused. Dollar `$` in request captures object number (`on1`…`on4` with request `on$`).

Client Rules: Ultra sends to external servers; methods GET/PUT/POST/DELETE; authentication NO; composed as `IP:Port/Resource?Query`.
