# AVS ELECTRONICS — Appendice MODBUS ULTRA v1.3

Sorgente: appendice MODBUS v1.3 e riedizione **26.05.26** (IT/EN/FR). Screenshot Bios: menu laterale **ETH / WiFi**, scheda **MODBUS** (Utente n.1 oppure Utente dinamico, porta 502). Timeout connessione: **60 secondi**. Versione software negli screenshot: IT 1.1(4), EN/FR 1.8(17).  
Prodotti coperti da questo documento (stessa appendice): **ULTRA 32**, **ULTRA 64**, **ULTRA 128**, **ULTRA 1000**.  
Non usare questo file per periferiche di altre famiglie (XSAT, JET, ecc.).  
Lingue nel PDF originale: italiano, inglese, francese. Sotto: italiano (riferimento) e inglese. I registri sono gli stessi in tutte le lingue.

Garanzia: il documento cita l’attivazione dell’estensione di garanzia a 5 anni tramite software Bios.

---

## Contatti (da piede pagina del manuale)

AVS Electronics S.p.A.  
Via Valsugana 63, 35010 Curtarolo (PD), Italy  
Tel. +39 049 9698411  
Email: avs@avselectronics.it  
Help desk: support@avselectronics.it  
Sito: avselectronics.com  

AVS si riserva di modificare i prodotti senza preavviso.

---

## Server MODBUS — programmazione Bios

Le centrali Ultra hanno il **server MODBUS abilitato di default**. Risponde sulla **porta 502**.

Nel software **Bios**, menu **ETH/WiFi / MODBUS**:

**Utente (default: Utente n.1)**  
- Codice utente specifico: accesso MODBUS automatico (il client non invia un codice utente). Le operazioni sono eseguite e memorizzate sul codice impostato. Default: Utente n.1.  
- **Utente dinamico**: alla prima connessione il client deve inviare un codice utente valido. Le operazioni sono riferite a quel codice.

**Porta**  
- Default: **502**.  
- Valore **0**: server disabilitato.

**Connessione**  
- Il server interno supporta **una sola connessione**.  
- Dopo il collegamento la centrale imposta un timeout di **60 secondi** per ricevere richieste dal client. Il timeout si rinnova a ogni richiesta. Allo scadere la centrale chiude la connessione.

**Indirizzamento registri**  
- Libreria/dispositivo **1-based**: usare i numeri di registro di questo documento così come sono.  
- Libreria/dispositivo **0-based**: **sottrarre 1** ai numeri indicati qui.

**Compatibilità Xtream**  
Alcuni blocchi sono etichettati XTREAM/COMPATIBILITA_ULTRA: registri come Xtream640, compatibili anche con ULTRA 1000 fino alla dimensione massima degli oggetti definiti in Xtream640.

---

## Lista registri (italiano)

Tipo dato ovunque sotto, salvo diversa nota: **16 bit unsigned**.  
Lettura tipica: **Read Holding Register (0x03)**, singolo o multiplo.

### 1. Zone aperte/chiuse (XTREAM / compatibilità ULTRA)

- Scrittura: **sola lettura**  
- 0 = zona bilanciata; 1 = zona sbilanciata (zone non consentite: sempre 0)  
- Registri: **1 = Zona 1 → 640 = Zona 640**

### 2. Codice utente (ULTRA)

- Lettura: 0x03. Scrittura: **Write Multiple Register (0x10)**  
- Scrittura: cifre 0..9 del codice utente  
- Lettura risposta: 1..N = codice N riconosciuto; 0 = non permesso; nome utente 32 caratteri  

Passo 1: scrittura 0x10, 6 cifre: **801 = cifra 1 → 806 = cifra 6**  
Passo 2 (opzionale): lettura 0x03, 1 dato: **811 = risposta**  
Passo 3 (opzionale): lettura 0x03, 32 caratteri: **821 → 852** (caratteri non usati = 0)

### 3. Settori (XTREAM / compatibilità ULTRA)

- Scrittura: **Write Single Register (0x06)** o 0x10  
- 0 = Disinserito; 1 = Home; 2 = Area; 3 = Perimetro; 4 = ON Totale; 7 = Non consentito  
- **901 = Settore 1 → 964 = Settore 64**

### 4. Zone allarme (XTREAM / compatibilità ULTRA)

- Sola lettura  
- 0 = bilanciata; 1 = sbilanciata (non consentite: 0)  
- **1001 = Zona 1 → 1640 = Zona 640**

### 5. Zone esclusione (XTREAM / compatibilità ULTRA)

- Scrittura: 0x06 o 0x10  
- 0 = zona attiva; 1 = zona esclusa (non consentite: 0)  
- **2001 = Zona 1 → 2640 = Zona 640**

### 6. Uscite O.C. (XTREAM / compatibilità ULTRA)

- Scrittura: 0x06 o 0x10  
- 0 = uscita disattiva; 1 = attiva (non consentite: 0)  
- **2701 = Uscita 1 → 2950 = Uscita 250**

### 7. Stato zone (ULTRA)

- Sola lettura  
- **3001 = Zona 1 → 4000 = Zona 1000**  

Bit:  
- BIT0 g1_STATO: 1=aperta, 0=bilanciata  
- BIT1 g1_TAMPER: tamper  
- BIT2 g1_ESCL: esclusa  
- BIT3 g1_ATTIVA: attiva per rilevamento allarmi  
- BIT4 g1_BATT_RADIO: anomalia batteria (solo sensori radio)  
- BIT5 g1_ANOMAL_SENS: anomalia generica (solo radio)  
- BIT6 g1_ANTIMASK: antimask  
- BIT7 g1_ALL_AVV: allarme avvenuto (memoria)  
- BIT8 g1_SOPRAVV: mancanza sopravvivenza (solo radio)  
- BIT9 g1_DISQUAL: disqualifica (solo barriere HP)  
- BIT10 g1_LENTI_SP: lenti sporche (solo barriere HP)  
- BIT11–BIT14: non usati  
- BIT15 g1_NO_PERMIS: 0=zona abilitata al controllo; 1=non abilitata (in lettura BIT0–BIT14 non significativi)

### 8. Uscite O.C. e domotiche (ULTRA)

- Scrittura: 0x06 o 0x10  
- **4501 = Uscita 1 → 4900 = Uscita 400**  
- 0 = disattiva; 1 = attiva  
- Moduli domotici: **1000 = 0% → 1100 = 100%**  
- Uscita corrente 4–20 mA (solo domotica): **1000 = 0.0 → 1255 = 25.5**  

Valori speciali in **sola lettura**:  
- 0xF0FF DOM_LEV_UNDF valore indefinito  
- 0xF0EE DOM_LEV_POVL protezione sovraccarico potenza  
- 0xF0ED DOM_LEV_TOVL protezione limite temperatura  
- 0xF0C1 DOM_LEV_TAP_UP tapparella in salita  
- 0xF0C2 DOM_LEV_TAP_DOWN tapparella in discesa  
- 0xFFFF (65535) uscita non abilitata al controllo

### 9. Zone esclusione (ULTRA)

- Scrittura: 0x06 o 0x10  
- 0 = attiva; 1 = esclusa; **65535 (0xFFFF)** = zona non abilitata (se lettura)  
- **5001 = Zona 1 → 6000 = Zona 1000**

### 10. Stato sistema (ULTRA)

Sola lettura.

**7001 = Centrale — varie**  
- BIT0 tamper switch  
- BIT2 mancanza rete  
- BIT3 batteria bassa  
- BIT4 batteria mancante  
- BIT8 anomalia modulo PSTN  
- BIT9 anomalia modulo GSM  
- BIT10 relè centrale attivo  

**7002 = Centrale — fusibili (PTC) uscite +13.8 V**  
- BIT2 RS485 #1 in protezione  
- BIT3 RS485 #2  
- BIT4 RS485 #3  
- BIT5 VLINEE  
- BIT6 VPOT  

**7003** assorbimento centrale (mA)  
**7004** PSTN volts (non disponibile)  
**7005** GSM Plug — credito SIM in centesimi di euro (0xFFFF = non disponibile)  
**7006** GSM Plug — livello segnale (0..8)

**7100 + n. tastiera (1..N)** tastiera — varie: BIT0 tamper pulsante; BIT1 tamper comunicazione; BIT15 non abilitato.

**7200 + n. satellite (1..N)** satellite — varie: BIT0 tamper pulsante/ingresso; BIT1 tamper comunicazione; BIT2 mancanza rete; BIT3 batteria bassa; BIT4 batteria mancante; BIT5 allarme fuoco; BIT6 interferenza radio; BIT10 relè attivo; BIT15 non abilitato.

**7300 + n. satellite** satellite — fusibili: BIT1 F1 OC; BIT2 F3 +V1; BIT3 F4 +V2; BIT5 F5 Vlinee; BIT6 F5 Vpot; BIT15 non abilitato.

**7400 + n. satellite** assorbimento satellite (mA)

**7500 + n. inseritore** inseritore — varie: BIT1 tamper comunicazione; BIT15 non abilitato.

**7600 + n. sirena** sirene HP — anomalie: BIT0 tamper pulsante; BIT1 tamper comunicazione; BIT5 stato allarme; BIT8 antischiuma; BIT9 temperatura; BIT10 vibrazione; BIT11 mancanza alimentazione; BIT12 batteria bassa; BIT13 batteria guasta; BIT15 non abilitato.

**7700 + n. sirena** sirene HP — guasti: BIT0 ponte a diodi; BIT1 cono; BIT2 flash; BIT3 LED verde; BIT4 LED rosso; BIT5 accelerometro; BIT15 non abilitato.

**7800 + n. sirena (n. satellite)** sirene wireless: BIT0 tamper pulsante/accelerometro; BIT3 batteria bassa; BIT5 allarme; BIT7 sopravvivenza; BIT15 non abilitato.

**XGSM485**  
- **7901** stato tamper: BIT0 pulsante/ingresso; BIT1 comunicazione; BIT15 non abilitato  
- **7902** stato generale: BIT0 SIM attiva 0=A 1=B; BIT3 anomalia GSM; BIT4 mancanza linea telefonica; BIT5 guasto linea simulata; BIT6 alimentazione bassa; BIT7 batteria bassa; BIT15 non abilitato  
- **7903** tensione alimentazione in decimi di volt  
- **7904** SIM A livello GSM  
- **7905** SIM A credito euro/cent (0xFFFF = non disponibile)  
- **7906** SIM B livello GSM  
- **7907** SIM B credito euro/cent (0xFFFF = non disponibile)

---

## MODBUS register list (English)

Ultra control units have the MODBUS server **enabled by default** on **port 502**. Program in Bios under **ETH/WiFi / MODBUS**.

User: specific user code = automatic access without the client sending a code (default User n.1). Dynamic User = client must send a valid user code at first connection.

Port default 502. Port **0** disables the server.

Single connection only. **60 second** idle timeout, renewed on each request; then the panel closes the connection.

1-based addressing: use register numbers as written. 0-based: subtract 1.

XTREAM/ULTRA compatibility blocks match Xtream640 object sizes, including ULTRA 1000 up to those maxima.

1. Open/closed zones (XTREAM): read-only 0x03; 0 balanced, 1 unbalanced; **1–640**  
2. User code (ULTRA): write 0x10 digits **801–806**; optional read **811** response; optional name **821–852**  
3. Sectors: 0 disarmed, 1 Home, 2 Area, 3 Perimeter, 4 Total ON, 7 not allowed; **901–964**  
4. Alarm zones: read-only; **1001–1640**  
5. Exclusion zones (XTREAM): 0 active, 1 excluded; **2001–2640**  
6. O.C. outputs (XTREAM): 0 off, 1 on; **2701–2950**  
7. Zone status (ULTRA): read-only bitfield; **3001–4000** (see Italian bit list)  
8. O.C. and home-automation outputs (ULTRA): **4501–4900**; percent 1000–1100; 4–20 mA 1000–1255; special codes 0xF0FF / 0xF0EE / 0xF0ED / 0xF0C1 / 0xF0C2 / 0xFFFF  
9. Exclusion zones (ULTRA): **5001–6000**; 0xFFFF = not enabled on read  
10. System status (ULTRA): **7001** panel bits (tamper, mains, battery, PSTN, GSM, relay); **7002** PTC fuses RS485/VLINEE/VPOT; **7003** mA; **7004** PSTN volts N/A; **7005–7006** GSM credit/signal; **7100+** keyboards; **7200+/7300+/7400+** satellites; **7500+** inserters; **7600+/7700+** HP sirens; **7800+** wireless sirens; **7901–7907** XGSM485
