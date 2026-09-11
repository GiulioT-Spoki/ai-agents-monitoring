# AVS ELECTRONICS — XSAT 36 / PW / POWER IST0754V4.2

Sorgente: Manuale installazione IST0754V4.2 (IT / EN / FR).  
**Non è ULTRA.** Non usare la tabella DIP di questo file per satelliti ULTRA o per A1000.  
**XSAT 36 ≠ XSAT PW3 ≠ XSAT PW5 ≠ XSAT PW5 Q ≠ XSAT PW3 Q ≠ POWER 3 ≠ POWER 5 ≠ POWER 5 Q ≠ POWER 3 Q ≠ XSAT2 ≠ XSAT8 ≠ XSATMINI.**  
POWER 3/5 = schede **gestione** alimentatore; POWER 3 Q / 5 Q = **alimentatori** switching rete. Preferire l’italiano se EN/FR divergono (es. ALIM **14,5 V**, non 4,5 V).

IMQ Grado 2 (EN 50131-1, EN 50131-3:2009, EN 50131-6:2008, CEB T031) **decade** se i dispositivi non sono in **CONT-XTREAM**, **CONT SX** o **CONT SAT W**. Installazione solo personale qualificato.

---

## Ruoli

**XSAT36, XSAT PW3, XSAT PW5:** 10 zone (+10 doppie se centrale compatibile) o 18 (+18) con modulo **XEXP8**; 1 ingresso FIRE 12 V bifilare; 1 relè allarme sicurezza positiva; 8 OC 50 mA (bistabile o a tempo). Tamper T bilanciato 4k7, non escludibile (anche su POWER 3/5). Programmazione da tastiera o PC. Quattro conduttori. Scheda **152 × 119 × 24 mm**. Ambiente **-10 / +55 °C**, 95%. Tensione nominale **9–15 V**. Assorbimento: POWER 3/5 **50 mA**, XSAT36 **50 mA**, XSAT PW3/PW5 **60 mA**. Accessori relè **XMR2, MR4, MR8**.

**POWER 3:** gestione switching **50 W – 3,4 A – 14,5 V**; max ai morsetti ++ **1,95 A**.  
**POWER 5:** **75 W – 5 A – 14,5 V**; max ++ **3,55 A**.  
**XSAT PW3 / PW5:** stesse correnti su ++ e **VLINEE**.

**XSAT PW3** può gestire **POWER 1**; **XSAT PW5** può gestire **POWER 4**: uscita POWER su ALIM dell’XSAT PW a **14,5 V** (trimmer sul POWER); batteria **solo** su BATT dell’XSAT PW, **non** sull’uscita batteria del POWER. Info rete/batteria/autotest gestite dall’XSAT PW.

**XSAT36** non gestisce le informazioni di un alimentatore supplementare. Seriale **+ DA DB −**.

---

## POWER 3/5 — morsetti e analogico SAT03

DA DB − RS485; T tamper 4k7; VPOT max **850 mA** (F6, ricarica batterie sirene autoalimentate); ALIM 14,5 V; BATT max **600 mA**; + protetti F4 e F3; negativi carichi.  
**AL** presenza rete (verso SAT03 CHAR): Vx **3,25 V** mancanza rete, **4,3 V** rete OK.  
**AT** autotest batteria: chiudere temporaneamente AT al positivo.  
**LB** batteria: Vy **4,3 V** carica, **4,14 V** bassa, **3,7 V** mancante.

Fusibili POWER: F2 **5 A** inversione batteria; F3/F4 **3,15 A**; F6 **2 A** VPOT.  
S1: chiusura breve = accensione con sola batteria (senza rete). S2 aperto = tamper abilitato, chiuso = escluso. S3 aperto (non usato). RESET satellite. DIP 1–4 indirizzo; DIP **5 OFF = XTREAM, ON = HIGH SPEED**.

---

## XSAT PW3 / PW5 — extra rispetto POWER

L1–L5 e L6–L10 zone; VLINEE (F5); **+SA** (F6): positivo costante che **manca in allarme** (sirena autoalimentata 12 V); **+S** (F6): positivo **in allarme** (sirena non autoalimentata); C NC NO relè sicurezza positiva; F linea FIRE 4k7; OC 1–8; ALIM/BATT come POWER. Fusibili F1 **3,15 A** (OC), F5 **3,15 A** (VLINEE), F2–F6 come POWER. CONN. = **XEXP8**.

**XSAT36 fusibili:** F1 e F5 **1 A** (non 3,15 A).

---

## Indirizzi DIP 1–4 (XTREAM / Logitel / Concorde — non ULTRA)

Indirizzo duplicato: satelliti non funzionano, tamper in centrale. DIP 1–4:

Tutti OFF = SAT 1 (XTREAM, Logitel 8 Plus ADVANCE / ADVANCE 88, Concorde Plus 54).  
ON OFF OFF OFF = SAT 2; OFF ON OFF OFF = SAT 3; ON ON OFF OFF = SAT 4; poi SAT 5–16 solo colonna **XTREAM** (Logitel solo 1–4; Concorde solo 1). Combinazioni: bit DIP1 = 1, DIP2 = 2, DIP3 = 4, DIP4 = 8, indirizzo = somma + 1.

RS485 in parallelo se indirizzi diversi e modelli compatibili con la centrale. Cavo schermato 4× **0,5 mm**. Lunghezza **600 m** totali condivisa con tastiere sulla stessa porta. POWER 3/5 e XSAT PW: su centrali predisposte, via seriale anche batteria bassa/mancante, presenza rete, autotest, fusibili, assorbimento.

---

## Zone, FIRE, OC

Singolo bilanciamento: 4k7; corto o taglio = allarme. Doppio: due 4k7; corto/taglio = tamper distinto. Switch Alarm (centrali predisposte): inerziali/tapparella, 4k7, **solo singolo**, no zone gemelle, sensibilità **Numero Impulsi**. Zone doppie (centrali predisposte): 10→20 senza moduli, **tre** resistenze (4k7 + **10k**).

**FIRE** (PW3, PW5, XSAT36): rivelatori 12 V in parallelo su **+** e **F** (terminale 4k7); soglia in centrale. **Mai escludibile**; se non usata, resta bilanciata 4k7. Prestazioni **non certificate** CEI 79-2 / EN 50131-1/3.

OC: negativo 50 mA. Relè opzionali XMR2 / MR4 / MR8 (manuale modulo; MR4/MR8 cavo in dotazione).

---

## POWER Q (IMQ) e contenitore

POWER 3 Q / 5 Q e XSAT PW3Q / PW5Q: interruttore onnipolare **16 A curva C**, distacco ≥ 3 mm; cavi 230 V doppio isolamento; terra su torretta; VADJ **non modificare** (fabbrica). Avvio senza rete: batteria + ponticello **S1** qualche secondo; sotto soglia si stacca. Fascette sulla guaina; 3 fili 230 V e 2 fili 13,8 V legati tra loro.

Sezione alimentatrice IMQ (riferimento Q): Tipo A, Classe II, 230 V~ 50 Hz, 13,8 V nom., max rete 0,8 A; limiti EN50131-6 vs T031 diversi (es. 2,1 A vs 750 mA alimentatore); batteria 12 V 18 Ah; batteria bassa **10,5 V**, ripristino **13,2 V**.

CONT-XTREAM: tasselli **6 mm**; antimanomissioni sul Tamper; kit antistrappo (distanziatore sulla molla).

---

## Contatti

AVS Electronics S.p.A., Via Valsugana 63, 35010 Curtarolo (PD). Tel. +39 049 9698411. Help desk: support@avselectronics.it
