# AVS ELECTRONICS — Tastiera A1000 IST1117V1.1

Sorgente: Manuale installazione tastiera touch **A1000**, IST1117V1.1 (IT / EN / FR / ES / DE).  
**A1000 ≠ A1000 PLUS ≠ A300 / A500 / A600 / ICE.** ICE e le altre tastiere ULTRA: `35832-ultra-manuale-utente-ist1106v1-2`. Non mischiare con XSAT.

---

## Hardware

Entrambi: 23 tasti capacitivi (6 multifunzione); LCD 32 caratteri + 7 LED; riconoscimento automatico baud seriale (**HIGH SPEED BUS / XTREAM BUS**); T1 e T2 ingresso zona e/o uscita Open Collector (compatibilità = centrale abbinata); Classe II; **+5 / +40 °C**; umidità 95%; **146,6 × 138,6 × 19 mm**.

Assorbimento (entrambi): display standby OFF **36 mA**, LOW **50 mA**, MID **58 mA**, display acceso **170 mA**, massimo **250 mA**.

**Solo A1000 PLUS:** sintesi vocale e speaker; audio analogico **IN SPK** solo con centrale **XTREAM** (collegare a OUT SPK in centrale); audio digitale via seriale (Raptor, Ultra); lettore NFC chiavi **TOY**; sonda temperatura.

Morsettiera: `−` alimentazione, **DA / DB** seriale centrale, `+` alimentazione, `−`, **IN SPK** (solo XTREAM), **T2 / T1**. Tamper antistrappo/antiapertura: se usato, fissare la molla in dotazione sul pulsante.

Installazione: fissaggio a parete fortemente raccomandato (anche scatola 503). Aggancio fermi superiori K, morsettiera J, laterali L, inferiori M, vite N. Apertura: togliere N, cacciavite a taglio **5 mm** negli spacchi M.

---

## Menu locale (codice 9698)

Se il tamper è **chiuso**, il menu è accessibile solo con seriale **scollegata**. Collegati alla centrale: aprire il tamper per il menu completo.

CLR + ESC (ultima freccia in alto a destra) → display modello, firmware, indirizzo → ENTER → codice **9698**. ESC esce.

| n | Parametro | Default / range |
| :--- | :--- | :--- |
| 1 ADDRESS | Indirizzo 1–16 (tasti ON/OFF) | **1** |
| 2 TAMPER | CLR per variare | **Abilitato** |
| 3 OFFSET TEMPER. | −9,9 … +9,9 °C, step 0,1 (ON/OFF) | **0,0 °C** |
| 4 DISPATCH | Tasti fuoco / medico / emergenza | **Disabilitati** |
| 5 HARDWARE L.LCD | 5–100%, step 5% | **60%** |
| 6 HARDWARE L.KEY | 20–100%, step 5% | **60%** |
| 7 BACK LIGHT KEY | OFF (tasti spenti e inibiti in standby, un tasto li riattiva); LOW; MID | **MID** |
| 8 NFC | CLR abilita/disabilita | **Abilitato** |

Pulizia: CLR + ON → **CLEANING**, tasti inibiti circa **15 s**.

**ULTRA da firmware 1.1.0.3:** i parametri 3, 4 e 7 della tastiera valgono solo se in Bios **Tastiere → Opzioni avanzate → Parametri A1000** è **Auto tast.** Altrimenti vincono i parametri della centrale.

---

## Modalità SMART

Abilitata = funzionalità completa; disabilitata = ridotta.

- XTREAM, RAPTOR e ULTRA fino a **1.1.0.2**: solo modalità ridotta.
- ULTRA **1.1.0.3**: solo modalità completa.
- ULTRA da **1.1.0.4**: scelta installatore SMART abilitata o disabilitata.

---

## Contatti

AVS Electronics S.p.A., Via Valsugana 63, 35010 Curtarolo (PD). Tel. +39 049 9698411. Help desk: support@avselectronics.it
