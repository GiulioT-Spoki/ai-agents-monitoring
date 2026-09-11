# AVS ELECTRONICS — Appendice NVR v1.9 (ULTRA)

Sorgente: appendice **NVR v1.9**, edizione **26.05.26** (IT / EN / FR).  
Prodotti: **ULTRA 32**, **ULTRA 64**, **ULTRA 128**, **ULTRA 1000**.  
Non mischiare i marchi: **Dahua** (firmware custom AVS, porta **15001**) ≠ **Provision** / **TVT** (TVTAPI, Alarm Server **15200**) ≠ **Hikvision** (ISAPI, tipo connessione **NVR Hikvision**).  
Telecamere IP ONVIF **dirette** (senza NVR): appendice CAM ONVIF (`35832-ultra-cam-onvif-http-snap-v1-1`). Non usare questo file per XSAT / JET.

---

## Zone virtuali e videoverifica (comune a tutti gli NVR)

Bios **Zone**:

- Tipo connessione: **Telecamera** (EN: Camera / CCTV).
- Terminale: **Telecamera n** = numero della telecamera **aggiunta sull’NVR**.
- Esempio: zona tipo **Istantanea**, nome TELECAMERA 1.

Bios **Telecamere** (EN: TVCCs): modificare **Telecamera n**, selezionare **zone** ed **eventi** che attivano la videoverifica (codice utente/emergenza/falso; acceso/spento ON HOME AREA PERIMETRO; tamper; dispacci panico/medico/fuoco).

**myAVSAlarm:** nessuna programmazione extra in app. Le videoverifiche arrivano con allarme/evento associato. File: **TVCC → Registrazioni Video** (EN: CCTV → Video Recordings).

Bios **Data / Ora** (consigliato): timezone corretto; orologio **Eweb**; cambio legale/solare **Automatico**.

---

## 1. Dahua (serie 5xxxx, firmware custom AVS)

Interfaccia **nativa**. Solo NVR serie **5xxxx** con **firmware Custom AVS** scaricabile da area installatore **bios.myavsalarm.com**.

Modelli elencati (EI, anche varianti PoE 8P/16P): DHI-NVR5208-EI, 5216-EI, 5232-EI, 5416-EI, 5432-EI, 5464-EI, 5816-EI, 5832-EI, 5864-EI e le versioni `-8P` / `-16P` corrispondenti.

### NVR Dahua

1. Aggiornare il firmware custom AVS.
2. **SETTING → NETWORK → AVS**: Enable ON; **TCP Port 15001** (1025–65535); **SSL Port 15002** (1025–65535).
3. **CAMERA → Camera List**: aggiungere le telecamere.

### Bios

**Telecamere → NVR**:

- Modello: **NVR Dahua**.
- Indirizzo IP dell’NVR.
- Porta: **15001**.

### AI Dahua (telecamera)

- **Evento → Rilevamento video**: **Rilevazione movimento** resta **abilitata**.
- Area: regione su tutta la visione; **Sensibilità = 0**, **Soglia = 100**.
- Abilitare **Rilevamento intelligente movimento** secondo esigenze (es. persone sì, veicoli no).
- **Disabilitare Cambiamento scena** per evitare falsi allarmi da luci forti (fari auto).

---

## 2. Provision (protocollo TVTAPI)

Tutti gli NVR Provision con **TVTAPI**.

### NVR Provision

**Setting → Event and Analytics → Manage camera → Alarm Server**:

- Enable Alarm Server.
- Server address = **IP della centrale ULTRA**.
- Port = **15200** (server ricezione allarmi ULTRA).
- Protocol = **XML**.
- Send Heartbeat ON; Interval **10** s; Schedule **24x7**.

Aggiungere telecamere: **Setting → Camera → Manage camera → Add camera**.

**Motion** (ogni telecamera): Schedule 24x7; Record ON → Configure → in **Trigger recording** mettere in **Trigger camera** la telecamera in configurazione.

**Sensor**: Enable On; Duration **5 s** sui virtuali; Record ON → Configure → Trigger camera = telecamera del sensore virtuale.

**Setting → Network → Port**: **API Server** ON; Encryption **BASE64**.

### Bios

**Telecamere → NVR**:

- Modello: **NVR Provision**.
- Porta HTTP NVR: **80**.
- Username / password di accesso NVR (non inventare; l’esempio schermata `admin` non è un default di fabbrica ULTRA).
- Porta centrale: **15200**.

### FTP Provision (cloud video)

**Setting → Network → FTP**: Enable; Server **ftp.myavsalarm.com**; Port **21**; Username e Password **generati in area installatore bios.myavsalarm.com** (non copiare stringhe da screenshot); Max File Size **3**.

Per ogni telecamera: Schedule 24x7; Motion **Off**; AI **Off**; Sensor **On**; Stream **Sub-stream**; Snapshot **Off**; Alarm info **Off**.

**Setting → Record → Advanced**: Pre-record **3 s**; Delayed record **5 s**; Expiration **180 giorni**. Ciclo registrazioni per sovrascrivere i file vecchi.

---

## 3. TVT (protocollo TVTAPI)

Tutti gli NVR TVT con **TVTAPI**. Procedura analoga a Provision; menu **Function Panel**.

**AI/Event → Event Notification → Alarm Server**: Enable; Server = IP ULTRA; Port **15200**; Protocol **XML**; Heartbeat 10 s; 24x7.

Aggiungere telecamere: **Function Panel → Camera → Manage camera → Add camera**.

Motion e Sensor: come Provision (Record + Trigger camera; virtuali Enable On, Duration 5 s).

**Function Panel → Network → Port**: **API Server** ON; Authentication / Encryption **Basic** (non BASE64: quello è Provision).

### Bios

**Telecamere → NVR**: modello **NVR Provision/TVT**; porta HTTP **80**; user/password NVR; porta centrale **15200**.

### FTP TVT

Come Provision: **Function Panel → Network → FTP**; stesso host **ftp.myavsalarm.com:21**; credenziali da **bios.myavsalarm.com**; per camera Motion/Intelligence Off, Sensor On, Sub-stream; Advanced 3 s / 5 s / 180 giorni.

---

## 4. Hikvision (protocollo ISAPI)

Tutti gli NVR Hikvision con **ISAPI**. Non usare le porte Dahua 15001 né il solo tab NVR Dahua.

### NVR Hikvision

**Config. sistema → Configurazione di rete → Accesso alla piattaforma → ISAPI**: **abilita ISAPI**.

**Servizio di rete → HTTP(s)**:

- Disabilitare **HSTS**.
- Disabilitare **Abilita navigazione HTTPS**.
- Autenticazione: **digest/basic**.

### Invio allarmi telecamera → centrale

**Centro eventi → Configurazione evento**: per ogni telecamera il metodo di rilevazione (es. attraversamento linea).

Nella scheda **Metodo di collegamento** abilitare **Notifica al centro di sorveglianza**. Solo gli eventi con questa opzione vanno alla centrale. Per **non** inviare il Motion generico, togliere Notifica al centro di sorveglianza da quell’evento.

### Bios

**Telecamere → Tipo Connessione** (non il flusso Dahua su tab NVR):

- Tipo: **NVR Hikvision**.
- IP HTTP dell’NVR.
- Porta HTTP: **80**.
- Username / password NVR.
- Porta centrale: **15200**.

---

## Porte — non confondere

| Integrazione | Porta chiave |
| :--- | :--- |
| Dahua (AVS sul NVR) | TCP **15001** (SSL 15002 sul NVR) |
| Provision / TVT Alarm Server verso ULTRA | **15200** XML |
| Provision / TVT / Hikvision HTTP NVR in Bios | **80** (web) |
| Hikvision verso ULTRA | Porta centrale **15200** + ISAPI |
| CAM ONVIF diretta (altro documento) | Server ONVIF centrale **8085**, client HTTP TVCC **80** |

---

## Contatti

AVS Electronics S.p.A., Via Valsugana 63, 35010 Curtarolo (PD), Italy  
Tel. +39 049 9698411  
Email: avs@avselectronics.it  
Help desk: support@avselectronics.it  
Sito: avselectronics.com
