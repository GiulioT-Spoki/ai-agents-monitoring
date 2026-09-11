# AVS ELECTRONICS — CAM ONVIF HTTP / SNAP v1.1 (ULTRA)

Sorgente: appendice **CAM Onvif HTTP / SNAP v1.1**, edizione **26.05.26** (IT / EN / FR).  
Prodotti: **ULTRA 32**, **ULTRA 64**, **ULTRA 128**, **ULTRA 1000**.  
Richiede collegamento di rete tramite **interfaccia Ethernet integrata** della centrale.  
Non usare questo file per satelliti radio video (XSAT WS 4 VIDEO e simili) né per altre famiglie (JET, ecc.).  
Allarmi via stringhe HTTP verso zone Server HTTP: vedi appendice HTTP (`35832-ultra-http-v1-2`).  
NVR Dahua / Provision / TVT / Hikvision: appendice NVR (`35832-ultra-nvr-v1-9`). Non usare le porte NVR (15001 / 15200) per questa integrazione ONVIF diretta.

Funzioni disponibili:

1. Configurazione telecamere **ONVIF-compatibili** per **ricezione allarmi**.
2. Acquisizione **snapshot** e invio al cloud **myAVSAlarm** in caso di evento/allarme.

---

## 1. Predisposizione telecamere

- Impostare parametri di rete **statici**: IP, Gateway, DNS.
- Uniformare le credenziali su tutte le telecamere.
- Le credenziali devono accedere sia all’**interfaccia di configurazione web** sia alle **risorse ONVIF**.
- Se le credenziali di configurazione **non** valgono per ONVIF, creare un **account dedicato** con permessi ONVIF.

---

## 2. Bios — Tipo connessione

Menu (IT): **Telecamere → Tipo Connessione**.  
Menu (EN): **CCTV → Connection Type**.  
Menu (FR): **CCTVs → Type branchement**.

Selezionare: **CAM Onvif HTTP / SNAP**.

| Parametro | Ruolo | Valore di riferimento nel manuale |
| :--- | :--- | :--- |
| Username / Password protocollo ONVIF | Accesso risorse ONVIF | Inserire le credenziali ONVIF della telecamera |
| Username / Password protocollo HTTP | Accesso configurazione web | Inserire le credenziali web della telecamera |
| Porta Centrale Server ONVIF | Porta su cui la **centrale riceve gli allarmi** dalle telecamere | **8085** (abilitare) |
| Porta Client HTTP TVCC | Porta web delle telecamere | Default **80** (abilitare) |

Esempio di username negli screenshot (non è un default di fabbrica della centrale): `avsonvif`.

### Associazione telecamere (IP statici)

1. Abilitare **modalità di gestione con IP statici**.
2. **Configura indirizzi IP inclusi**.
3. **+ Aggiungi indirizzo IP**: scegliere **ID** (ID1 = Telecamera 1, ID2 = Telecamera 2, …) e inserire l’IP.

Gli IP negli screenshot sono solo esempi di laboratorio (es. `192.168.1.205` oppure `10.2.30.201`); non usarli come indirizzi reali dell’impianto.

---

## 3. Zona virtuale (telecamera come sensore)

Le telecamere ONVIF possono agire come rilevazione allarme se associate a zone ULTRA.

Bios, menu **Zone**:

- **Tipo connessione / Input fisico:** Telecamera (IT) / CCTV (EN).
- **Terminale:** Telecamera n / CCTV n (numero = ID nella lista IP).
- Esempio schermata: Zona 8, nome TELECAMERA 1, tipo **Istantanea**, inserita in ON / HOME / AREA / PERIMETRO.

### Guasto rete / telecamera irraggiungibile

- Display: **No com T.cam**.
- Notifica push su cloud **myAVSAlarm**.

Comportamento zona associata:

- Default: la zona **resta a riposo**.
- Opzione **Telecamera Offline → Zona Aperta** (EN: Offline TVCC → Zone Open): menu **Zone → Impostazioni generali**, firmware **> 1.0.0.6**. La zona resta aperta per tutta la durata dell’offline.

Notifica telefonica dell’evento di non comunicazione:

- **Telefonico → Numeri telefonici → Associazione eventi → Anomalia telecamere** (firmware **> 1.0.0.2**).
- Distinta da **Anomalia rete**.

---

## 4. Data / ora (consigliato per ONVIF)

Bios **Data / Ora**:

- Timezone corretto (esempio screenshot: UTC+01:00 Berlino, Parigi).
- Orologio: **Eweb**.
- Cambio legale/solare: **Automatico**.

---

## 5. Ricezione allarmi ONVIF e bypass

La centrale riceve allarmi via ONVIF. Dipende da **modello e firmware** della telecamera:

- alcune inviano solo certi eventi (es. motion);
- eventi programmati sulla telecamera (es. attraversamento) **possono non** transitare su ONVIF.

Se sul display compare **Non confg CAM** (EN: **Not CAM configured**; FR: **Caméra non configurée**): non si stabilisce il dialogo ONVIF.

Opzione Bios menu Telecamere / CCTV: **Bypass configurazione ONVIF allarmi** — disabilita il dialogo ONVIF per gli allarmi.

Alternativa allarmi: se la telecamera invia **stringhe HTTP** verso dispositivi esterni, configurare la centrale per riceverle e generare allarmi su **zone HTTP Server** (appendice HTTP).

**Video-verifica** resta possibile anche se la telecamera **non** invia allarmi ONVIF.

---

## 6. Video verifica e snapshot

Bios **Telecamere → Telecamera n** (o CCTV n):

- Selezionare categorie evento che devono generare videoverifica: codice utente / emergenza / falso; acceso/spento ON HOME AREA PERIMETRO; tamper; dispacci panico / medico / fuoco.
- Associare le **zone** che devono triggerare quella telecamera.

A evento associato: la centrale acquisisce **10 fotogrammi**, li invia a **myAVSAlarm**; il cloud genera un breve video allegato alla **notifica push**.

### Stringa snapshot HTTP ONVIF

Per ogni telecamera indicare l’URL di richiesta snapshot (varia per marca/modello). Si può:

- inserire il **path** completo (es. Hikvision 2: `/onvif-http/snapshot?Profile_1`);
- oppure il **Numero ULTRA** della tabella rapida (es. `12` = Hikvision 2).

**Test in browser prima di programmare** (esempio del manuale, solo prova):

Formato: `username:password@IP:porta` + stringa snapshot  
Esempio: `admin:Admin123@192.168.1.55:80/onvif-http/snapshot?Profile_1`  
Se credenziali e stringa sono corretti, il browser mostra lo snapshot. Non trattare queste credenziali come default di fabbrica.

Altro esempio di stringa nello stesso PDF: `/onvif/snapshot?channel=1&subtype=1`.

### Tabella rapida Numero ULTRA (IT)

| N. ULTRA | Marca | Stringa snapshot |
| :--- | :--- | :--- |
| 1 | Avigilon | `/media/cam0/still.jpg?res=max` |
| 2 | Axis 1 | `/jpg/image.jpg` |
| 3 | Axis 2 | `/axis-cgi/jpg/image.cgi?resolution=320x240&compression=25` |
| 4 | Bos | `/API/OnvifSnapshot/Get` |
| 5 | Bosch 1 | `/snap.jpg` |
| 6 | Bosch 2 | `/snap.jpg?VCAOverlay=1&JpegSize=M&JpegQuality=32` |
| 7 | Dahua 1 | `/cgi-bin/snapshot.cgi` |
| 8 | Dahua 2 | `/onvif/media_service/snapshot` |
| 9 | Dahua 3 | `/onvifsnapshot/media_service/snapshot?channel=1&subtype=0` |
| 10 | Dahua 4 | `/cgi-bin/snapshot.cgi?channel=1&type=1` |
| 11 | Hikvision 1 | `/onvif/snapshot` |
| 12 | Hikvision 2 | `/onvif-http/snapshot?Profile_1` |
| 13 | Hikvision 3 | `/ISAPI/Streaming/channels/1/picture` |
| 14 | Huawei 1 | `/onvif/Snapshot/ch1/Media1` |
| 15 | Huawei 2 | `/onvif/Snapshot/ch1/Media1` |
| 16 | Hykon IPC | `/snap.jpg` |
| 17 | Hykon ITC | `/images/snapshot.jpg` |
| 18 | Hyundai | `/onvif-http/snapshot?Profile_1` |
| 19 | Lilin | `/snap` |
| 20 | Mega-Pixel | `/GetImage.cgi?CH=0` |
| 21 | Onvif generica 1 | `/onvif/snapshot` |
| 22 | Onvif generica 2 | `/onvif/media_service/snapshot` |
| 23 | Onvif generica 3 | `/GetSnapshot` |
| 24 | Panasonic | `/SnapshotJPEG?Resolution=320x240&Quality=Standard` |
| 25 | Provision | `/snapshot.JPG` |
| 26 | Skilleye | `/snapshot.JPG` |
| 27 | Samsung | `/video?submenu=jpg` |
| 28 | Sdc | `/ONVIFMedia.cgi?action=getSnapshot&channel=2` |
| 29 | Sony | `/oneshotimage.jpg` |
| 30 | Surveon | `/surveon-cgi/jpg/image.cgi?stream=0` |
| 31 | Unv | `/images/snapshot.jpg` |
| 32 | Vultech Security | `/onvif/snapshot` (EN: `/Onvif/snapshot`) |
| 33 | Yoko | `/cgi-bin/image.cgi?StreamProfile=0` |

---

## Contatti

AVS Electronics S.p.A., Via Valsugana 63, 35010 Curtarolo (PD), Italy  
Tel. +39 049 9698411  
Email: avs@avselectronics.it  
Help desk: support@avselectronics.it  
Sito: avselectronics.com
