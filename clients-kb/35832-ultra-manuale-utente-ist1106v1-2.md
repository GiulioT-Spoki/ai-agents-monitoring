# AVS ELECTRONICS — Manuale utente ULTRA (IST1106V1.2)

Sorgente: Manuale utente centrale ULTRA, italiano.  
Modelli centrale: **ULTRA 32**, **ULTRA 64**, **ULTRA 128**, **ULTRA 1000**.  
Tastiere trattate in questo volume: **A300 / A300 Plus**, **A500 / A500 Plus / A500 XS4 / A500 Plus XS4**, **A600 / A600 Plus / A600 EVO / A600 EVO Plus**, **ICE**.  
Installazione **A1000 / A1000 PLUS**: `35832-ultra-tastiera-a1000-ist1117v1-1` (non è in questo volume).  
Le funzioni devono essere abilitate dall’installatore; alcune possono non essere attive o variare in visualizzazione.  
Non mischiare i layout tasti tra modelli diversi di tastiera. Non usare questo file per famiglie non ULTRA (XSAT, JET, ecc.).

Edizione copertina **26.05.26**: stesso documento IST1106V1.2 (Riello / AVS). Codici di fabbrica utente (manuale installatore IST1105): **Utente 1 = 000010**, **Emergenza 1 = 000011** (ultima cifra +1 senza riporto). Installatore 1 di fabbrica: **000000**.

Estensione garanzia 5 anni: tramite app my AVS Manager; in chat utente indirizzare all’installatore di fiducia.

---

## Contatti

AVS Electronics S.p.A., Via Valsugana 63, 35010 Curtarolo (PD), Italy  
Tel. +39 049 9698411  
Email: avs@avselectronics.it  
Help desk: support@avselectronics.it  
Sito: avselectronics.com  
App Manager / Panel ID: registrazione su myavsalarm.com (citare il sito a voce, senza incollare URL in chat se il prompt lo vieta).

---

## LED comuni (A300, A500*, A600*)

**Led rosso — impianto acceso** (settore/i associati alla tastiera): acceso = settore acceso; spento = spento; lampeggiante = spento con allarme nella precedente accensione; lampeggiante veloce = almeno un settore associato è acceso.

**Led giallo — rete 220 V:** acceso = rete presente; spento = assente.

**Led verde — impianto pronto:** acceso = tutte le zone pronte; spento = almeno una zona aperta; lampeggiante = almeno una zona esclusa.

**Led rosso avvisi** (non su A300 / A300 Plus): acceso = informazione sul display; spento = niente da visualizzare.

Illuminazione display A300/A500/A600: si attiva premendo un tasto (es. CLR).

---

## Tastiera A300 / A300 Plus (punti 1–20)

Display; LED verde pronto, giallo rete, rosso acceso; tasto menu utente; tempi OFF; tastierino; cancellazione dati; spegnimento; somma settori; conferma; memoria eventi; uscita menu; inserimento perimetro / freccia sx; inserimento area / freccia dx; attivazione uscite; inserimento HOME / freccia giù; inserimento ON / freccia su; reset memorie allarmi; reset linea fire.

---

## Tastiera A500 / A500 Plus / A500 XS4 / A500 Plus XS4

LED polifunzionali verde/giallo; LED rosso impianto acceso; LED giallo rete; display; ON / freccia su; A comandi polifunzionali / freccia sx; uscita menu / sequenza dispaccio; memoria eventi / dispaccio fuoco; tastierino; CLR; somma settori; ENT; LED verde pronto; LED rosso avvisi; B polifunzionali / freccia dx; inserimento AREA / dispaccio panico; HOME / dispaccio medico; spegnimento / freccia giù; menu utente; reset linea fire; reset memorie allarmi; tempi OFF; attivazione uscite; lettore chiave (solo Plus); RTC vocale; lettore chiave TOY (solo 500 Plus).  
Nel PDF due voci sono numerate entrambe 22 (menu utente e reset linea fire): in caso di dubbio usare le etichette, non solo il numero.

---

## Tastiera A600 / A600 Plus / A600 EVO / A600 EVO Plus

Display; LED rosso acceso; LED giallo rete; lettore chiave (Plus); menu utente; tastierino; tempi OFF; RTC vocale; CLR; spegnimento; reset linea fire; reset memorie; ENT; PE / freccia sx; ON / freccia su; HO / freccia giù; ENT (secondo); AR / freccia dx; lettore TOY (solo A600 EVO Plus); uscite; tasti polifunzionali; esclusione/reinclusione zone; memoria eventi; ESC; LED verde pronto; LED rosso avvisi; LED rossi polifunzionali.

---

## Visualizzazioni / comandi utente

Tre tipi (impostati dall’installatore):

- **Flat:** settori a gruppi di 16.
- **Compact:** settori di competenza a gruppi di 5. Esempi: n02 spento zone bilanciate; n06 acceso ON; n15 spento zone aperte; n44 AREA; n55 PERIMETRO.
- **Continua:** un settore alla volta + stringa. Comandi: frecce selezionano; ENT entra; CLR numero settore; 0 tutti i settori di competenza; ESC indietro.

Simboli Compact / Flat / Continua: OK o K = spento zone bilanciate; -- o - = spento zone aperte; On/O = ON; Ho/H = HOME; Ar/A = AREA; Pe/P = PERIMETER.

Altre scritte (subito o dopo codice, secondo programmazione): credito SIM basso/esaurito → ricaricare; stato fusibili → contattare installatore; codici cambiati; sensori batt. bassa / sopravvivenza / antimask / disqualifica / lenti sporche.

Cancellazione: RETE, BATTERIA, TELEFONICO si cancellano al ripristino anomalia. Eventi di allarme si cancellano con accensione/spegnimento impianto.

Prova circuito zone: dopo il codice utente, zone aperte o escluse sul display.

Allarmi: zone e guasti (es. fusibili) in sequenza sulla seconda riga; data/ora sopra.

---

## Codici utente

Personale e segreto. **4 o 5 cifre + ENT**, oppure **6 cifre senza ENT**.

**Variazione proprio codice:** codice → 1 → fino a «Codice utente» → ENT → CLR → nuovo codice → ENT → ESC. Se associato a più settori e non è attivo «Salta scelta settore», selezionare il settore. Dimenticanza del codice: non si può più variare da questo percorso.

**Utente Master:** oltre al profilo utente, può modificare i codici NON MASTER degli stessi settori, cambiarne la stringa, escluderli da tastiera e RTC (chiavi e telecomandi restano attivi).

**Variazione / cancellazione (Master):** codice → 1 → Codice utente → ENT → ENT su Modifica → CLR + numero codice → ENT. Variare: CLR, nuovo codice, ENT. Cancellare (disattivare tastiera/RTC): CLR due volte, ENT.

**Nuovo codice:** codice → 1 → Codice utente → ENT → Nuovo → ENT → CLR + numero da creare → ENT → Codice # n → CLR + PIN → ENT. Se chi crea è multisettore: passo Settori, CLR, frecce, CLR abilita/disabilita, ENT. Scadenza: data/orario oppure OFF = nessuna; poi si cancella da solo.

**Cambio stringa (max 32 caratteri):** Codice utente → ENT sul codice da variare → Modifica → Nome utente → CLR, alfanumerici. T9: 1=abc1 … 9=yz.9, 0=spazio _- ; maiuscole con una freccia, minuscole con l’altra; CLR cancella riga.

---

## Prova circuito

**Singolo settore:** codice → zone aperte: «Non pronto S n»; tutte chiuse: «Sett. Pronto S n».

**Somma settori:** codice → display accensioni → **0** → aperte visibili oppure «Centrale pronta».

**Più settori:** codice → tasti 1–9 selezionano (*) → ENT → «Sett. non pronti» o «Settori Pronti».

---

## Accensione e spegnimento

**Rapida:** ON ON ENT / HO HO ENT / AR AR ENT / PE PE ENT. Un settore se tastiera monsettore; simultanei se associata a più settori.

**Normale:** codice → stato zone → ON / HO / AR / PE.

**Tutti i settori (solo Somma settori):** codice → **0** → tasto modalità → LED rosso acceso.

**Più settori:** codice → 1–9 asterisco → ON/HO/AR/PE.

**Tasti A-B-C-D:** dopo il codice, A-B (A500) o A-B-C-D (A600) o ON-HO-AR-PE (A300). Mapping da concordare con l’installatore (spesso A=ON, B=HO, C=AR, D=PE).

**Tempi OFF:** dopo il codice, tasto **4** prima di armare: elimina tempi ingresso/uscita (display «Tempi Off»); 4 di nuovo ripristina. Si disattiva allo spegnimento. In memoria eventi: Tempi Off / Tempi On.

**Straordinario (programmatore orario):** buzzer preavviso; codice → 1 → «Attiva straordinario» → ENT. Ritarda accensione di **un’ora**, **max 3 volte**, poi accende comunque.

**Ronda:** in accensione, passaggio su sensori del settore ronda esclusi per un tempo poi riattivati. Può chiedere di nuovo il codice ronda a fine ispezione. Il codice RONDA non fa le funzioni del codice normale.

**Spegnimento rapido:** codice (con nota settore). LED lampeggiante = allarme avvenuto, zone sul display.

**Spegnimento normale:** codice → **5** Off. Stesso significato LED.

**Più settori:** codice → **0** → **5** Off → ESC.

---

## Codice di emergenza (antirapina)

Se programmato: spegnere sotto minaccia attiva uscita antirapina o chiamata silenziosa. Stesse funzioni del codice utente. Creato aggiungendo **1 all’ultima cifra senza riporto**. Esempi: 546321 → 546322; 546329 → 546320.

---

## Reset memorie allarme e tamper

Se l’utente è abilitato a Reset allarmi o Reset allarmi+tamper, senza reset **non si può accendere**. Codice → tasto **3** → ultima zona/tamper → fino a «Reset mem. allarme?» → ENT. Solo Reset allarmi: un tamper **non** si resetta e **non** si accende. Possibile anche da app myAVSAlarm.

---

## Esclusione / reinclusione zone (impianto spento)

Codice → 1 → ENT su Esclusione zone. (a) numero zona + ENT + ESC. (b) scorrere lista + ENT + ESC. Display mostra zona esclusa; LED verde lampeggia. Stessa procedura per reinserire.

---

## Numeri telefonici (impianto spento)

Solo numeri di competenza **Vocali e SMS**. Codice → 1 → Numeri telefon. → ENT → CLR → indice 1..64 → ENT → CLR → nuovo numero → ENT. Ogni cambio va seguito da **ricollaudo**.

---

## Beep tasti, data/ora, inibizione PO

**Beep:** codice → 1 → Beep dei tasti → ENT → CLR → ENT. Stesso per riattivare. Per tastiera.

**Data/ora (impianto spento):** codice → 1 → Data/Ora → ENT → CLR, campi Ore Minuti Giorno Mese Anno con frecce → ENT.

**Inibizione programmatore orario:** codice → 1 → Inibizione PO → CLR → ENT. Stesso per riattivare.

---

## GSM (modulo GSM) e XGSM 485 / XGSM 485 PRO

Percorso GSM: codice → 1 → **GSM U** → ENT. Credito: `?` se non disponibile. Intensità: tacche, **max 5**. Mese scadenza SIM: dopo ricarica impostare il mese; avviso il **giorno 1** del mese scelto (mettere anticipo rispetto allo scadere).

XGSM: codice → 1 → **XGSM 485** → ENT → SIM A o SIM B → ENT, poi credito / intensità / mese scadenza come sopra.

---

## Panel ID

Codice → 1 → Panel ID → ENT. Serve per registrare l’App Manager. Se non abilitato/disponibile il display è vuoto.

---

## Audio / display (A600 Plus, A500 Plus)

Codice → 1 + freccia → ENT. Volume Mute/Basso/Medio/Alto (Mute spegne tutte le comunicazioni audio). Audio stato zone / OC / eventi = SI per annunci vocali. Contrasto, luminosità LED, retroilluminazione.

**RTC da tastiera:** codice → tasto **7** → stessi comandi DTMF del telefono → ESC.

---

## Test

**Zone:** codice → 1 → Test delle Zone → ENT → periferica Centrale / Tastiere / Satellite → ENT. SI = allarme o memoria; NO = riposo. Satelliti: CLR cambia numero. Tasto 5 attiva/disattiva memoria allarme zona. Zone etichettate per morsetto (es. M.BA 1 S, M. ES. 5 D).

**Uscite:** codice → 1 → Test Uscite → ENT per avviare (CLR annulla). **3 secondi** tutte le segnalazioni (sirene interne/esterne) poi ripristino; anche autotest batterie.

**Telefonate:** codice → 1 → Test telefonate → ENT. Chiama/SMS ai numeri dell’utente.

**PSTN/GSM (solo IMQ, EN 50131):** codice → 1 → Test PSTN/GSM → ENT.

---

## HELP testuale, dispacci, memoria eventi

HELP: codice → ENT → scorrere funzioni → ENT.

**Dispaccio panico:** A300/A600: tenere **1** poi CLR. A500: **F1** poi **F4**.  
**Fuoco:** A300/A600: **2** + CLR. A500: **F1** + **F2**.  
**Medico:** A300/A600: **3** + CLR. A500: **F1** + **F3**.

**Memoria eventi:** codice → MEM → ultimo evento data/ora; frecce indietro; CLR stringa zona; altro CLR esito telefonate; ESC.

**Abilita installatore:** codice → 1 → Abilita Install. → ENT. Accesso programmazione da tastiera, USB o linea telefonica remota.

---

## Uscite O.C. e tasti polifunzionali

Fino a **400** uscite. Codice → tasto uscite (layout pag. 4–6). (a) numero + ENT. (b) scorrere + ENT. Usi: riscaldamento, irrigazione, ecc., anche da telefono.

Polifunzionali A-B-C-D: **anche senza codice**, comando + ENT. Funzione fissata dall’installatore per quella tastiera.

---

## Stato / accensione settori senza codice

Solo se **StatoSettoriSenzaCodice** è attivo. Da data/ora: ENT → 1–9 asterisco (inutile se un solo settore) → ON/HO/AR/PE. Se Accensione rapida è attiva per quel tipo (e Cambio Accensione senza Codice se il settore è già acceso) arma e torna a data/ora. Altrimenti chiede il codice. Esempi: HOME rapida sì: ENT → 6 → HO; HOME rapida no: ENT → 6 → AR → «Inserisci codice».

---

## Programmatore orario

Codice → 1 → Programm. Orario → ENT → Operazioni → giorno → ENT → CLR + n. operazione → ENT → orario → Tipo operazione: Nessuna; Attiva/Disattiva O.C.; Avviso Inser. S. (buzzer preavviso); Acc. ON/HO/AR/PE Sett.; Spegn. Sett.  
Festivi: Esegui nei festivi, S/n per ciascuna.  
**Copia da lunedì** fino a venerdì o domenica **sovrascrive** gli eventi da martedì in poi.

---

## Nomi/stringhe, stanze, termostato

Stringhe per Settori, Zone, O.C., Codici, Scenari, Stanze: codice → 1 → Nomi/Stringhe → tipo → CLR + numero → testo (stesso T9, max come da tastiera).

Stanze: associare OC con CLR CLR ENT = SI/NO.

Termostato (se cronotermostato abilitato sulla stanza): Temperature 1 Economy, 2 Normal, 3 Comfort; fasce E/N/C/- (OFF); copia da lunedì (sovrascrive); Modo estate SI/NO (NO = inverno). Esempio manuale: E=18.0 N=20.0 C=22.0.

---

## Tastiera ICE

Sblocco: swipe da sinistra su >> >> >> poi Modo Tastiera / App / Quick.  
LED rosso: acceso/spento/lampeggio come sopra (bianco = spento impianto sul LED 8). LED verde pronto. Slot Micro SD e mini USB: **uso installatore**. Modo Tastiera: come manuale A500. Modo App: codice **6 cifre**. Zone (rosse = aperte/allarmate; Escludi; filtri Tutte/Aperte/Escluse/Anomalia). Settori DIS/ON/HO/AR/PE; Accendi tutti / Spegni tutti. Funzioni (domotica). Eventi. Impostazioni: suono tasti, termometro correzione max −9, n. eventi max 200, durata retroilluminazione max 3 min, standby display, slideshow. Diagnostica: credito SIM, anomalie.

**QUICK Ice:** doppio tocco. Spegnimento chiede di nuovo il codice. Dispacci e OFF Slide se abilitati.

**Slideshow** (ICE ≥ 5.0p9): Micro SD max **32 GB**, Classe ≥ 2; formattata dalla tastiera; cartella PHOTO; max **200** JPG, max **7 MB** l’una; formato ottimale 16:9 480×272; non togliere la SD in presentazione. Default slideshow 1 ora se non ci sono anomalie/allarmi. Impostazioni App: tempo foto 10/20/30/60 s; durata 1/4/8/12 ore; Se acceso >> Foto OFF.

---

## Controllo telefonico remoto (DTMF)

Chiamare la linea della centrale; dopo gli squilli digitare lentamente il codice utente; settore se richiesto.

- 0 + n.zona + # : escludi/includi zona  
- 1 ESC cambio settore  
- 2 MEM eventi  
- 3 interrompe tutte le chiamate vocali (se abilitato nel profilo)  
- 4 interrompe solo le chiamate al proprio numero (sempre)  
- 5 OFF spegne  
- 6 + n.uscita + # (o 6 0 2 per OC 2) comanda O.C.  
- 7 TEST stato  
- 8 accensioni parziali: 1 HOME, 2 AREA, 3 PERIMETRO  
- 9 ON  
- # ENTER, * STOP  

Dopo una chiamata in ingresso, [7] avvia RTC se Abilita RTC nel profilo.

Stessi comandi da tastiera con tasto 7.

---

## SMS di comando (modulo GSM opzionale)

Eseguiti solo se: mittente associato a un utente; utente abilitato RTC con validazione automatica sul numero; sintassi corretta; azione permessa. Più comandi nello stesso SMS: max **43 caratteri**, max **5 comandi**, ciascuno avvolto da `#`. Spazi extra ignorati. Sempre SMS di risposta.

Sintassi:

- `#att numero_oc#` / `#disatt numero_oc#`
- `#acc on|ho|ar|pe settore#` es. `#acc ho 2#`
- `#sp settore#`
- `#escl numero_zona#` / `#reincl numero_zona#`
- `#stato settore N#` / `#stato settori#`
- `#stato zona N#` (aperta/tamper/esclusa/sopravvivenza) / `#stato zone#`
- `#stato uscita N#` / `#stato uscite#`
- `#stato sistema#` (anomalie + credito SIM)
- `#stop#` blocco chiamate

Esempio: `#escl 12#escl 15#acc on 2#stato sistema#`  
Sezioni troppo lunghe: troncate con puntini.

Manutenzione impianto: messaggio che invita a chiamare l’installatore (dati ditta da compilare in cantiere, non in questo file).
