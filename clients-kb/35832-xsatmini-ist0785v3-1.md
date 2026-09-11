# AVS ELECTRONICS — XSATMINI IST0785V3.1

Sorgente: Scheda satellite seriale **XSATMINI**, IST0785V3.1 (IT / EN / FR / DE).  
**XSATMINI ≠ XSAT Mini come nome commerciale da non confondere con XSAT2 / XSAT8 / XSAT 36.** Non è ULTRA. Ingressi **senza resistenze di bilanciamento** (chiusi a negativo). Uscite **contatto pulito C / NA**, 12 V **100 mA** (non Open Collector 50 mA delle XSAT2/8). Preferire l’italiano se DE/FR/EN OCR divergono (OUT1 in modo sensore = blocco ON/OFF, non “non usato”; IN3 in modo sensore = **antimask**, non tamper).

---

## Caratteristiche

3 ingressi, 3 uscite. Tensione **10,5–15 V**. Assorbimento max a 13,8 V: **20 mA**. Dimensioni **30 × 40 × 15 mm** (esclusi fili). Ambiente **+5 / +40 °C**. IN/OUT su **fili volanti**; seriale e alimentazione su **morsetti** (+, DA, DB, −). 8 DIP. Non esporre a stillicidio/spruzzi. Collaudo secondo legge 46/90 e CEI 79-3.

Tre modalità (ingressi/uscite cambiano):

1. **Sensore seriale** — la centrale lo vede come **BMHP** o **OUTSPIDER**: allarme, tamper, antimask. OUT1 = ON/OFF (blocco) del settore associato al sensore.
2. **Satellite a 3 zone / 3 ingressi** — tre zone di allarme distinte; 3 uscite programmabili in centrale (OC 1–3 del satellite X).
3. **Satellite a 3 funzioni di zona** — IN1 allarme, IN2 tamper, IN3 antimask dello **stesso** sensore; 3 uscite programmabili in centrale.

---

## Morsetti per modalità

| Punto | Sempre / 3 ingressi | Sensore seriale o 3 funzioni di zona |
| :--- | :--- | :--- |
| IN 1 | Allarme zona 1 in **ogni** modalità | Allarme |
| IN 2 | Allarme zona 2 (solo 3 ingressi) | **Tamper** |
| IN 3 | Allarme zona 3 (solo 3 ingressi) | **Antimask** |
| OUT 1 | OC 1 satellite (3 ingressi o 3 funzioni) | **Blocco** (On/Off impianto); si disattiva all’inserimento nei modi associati al sensore |
| OUT 2 e OUT 3 | OC 2 e OC 3 satellite | **Non usati** (sensore seriale) |

---

## DIP 1–5 — indirizzo

Indirizzi **1–16**: satellite **o** sensore seriale. Indirizzi **17–32**: **solo** sensore seriale.

DIP 1–4 come le altre XSAT (bit 1,2,4,8 → indirizzo = somma + 1) con **DIP 5 OFF** = 1–16. **DIP 5 ON** = stesso pattern DIP 1–4 di 1–16 ma come sensore **17–32** (17 = tutti OFF + DIP5 ON, analogo al sat 1).

Tabella a stampa: la riga DIP 1–4 = OFF ON ON ON + DIP5 ON è etichettata due volte “Sensore 32”. Per pattern: quella riga è **sensore 31** (stesso DIP 1–4 del satellite 15); tutti ON + DIP5 ON = **sensore 32**. Non esiste una riga “31” stampata.

---

## DIP 6–8 — bus e modo

**DIP 6:** OFF = **XTREAM**; ON = **HIGH SPEED**.

**DIP 7 / DIP 8** (il manuale non documenta ON/OFF):

| DIP7 | DIP8 | Modo |
| :--- | :--- | :--- |
| OFF | OFF | **Sensore** BMHP/OUTSPIDER. OUT1 blocco; OUT2 e OUT3 non usate |
| OFF | ON | **Satellite a 3 funzioni di zona** (allarme/tamper/antimask dell’ingresso fisico 1). 3 uscite libere |
| ON | ON | **Satellite a 3 ingressi** (allarme IN1, IN2, IN3). 3 uscite libere |

---

## Contatti

Via Valsugana 63, 35010 Curtarolo (PD). Tel. 049 9698411. Fax 049 9698407. Assistenza 049 9698444. support@avselectronics.it
