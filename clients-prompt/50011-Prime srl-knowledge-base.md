# Knowledge Base — Prime srl (Primerent)
---

## 1. Promozione attiva: "Ready to Drive"

**Nome promozione:** Ready to Drive
**Codice promo:** 'READYTODRIVE'
**Periodo di validità (date di noleggio):** dal 30 Maggio 2026 al 2 Giugno 2026
**Costi inclusi:** IVA inclusa nei prezzi indicati.
**Costi esclusi:** consegna e riconsegna del veicolo NON sono incluse nelle tariffe promozionali.
**Esposizione della promo:** la promozione è già stata visualizzata dall'utente prima dell'inizio della chat (es. tramite landing page, ads, materiale promozionale esterno).

---

## 2. Catalogo auto in promozione

Sono ammessi in promozione esclusivamente i modelli, le città di ritiro e i prezzi totali (IVA inclusa) qui sotto elencati. Qualunque combinazione diversa (auto non in lista, città non in lista, date diverse dal periodo promo) è fuori dal perimetro della promozione.

### 2.1 BMW Z4 sDrive 30i
- **Città di ritiro disponibili:** Roma, Milano, Nizza
- **Prezzo totale (IVA inclusa):** €530
- **Categoria età minima:** 25 anni

### 2.2 BMW 420i Cabrio M Sport Pro
- **Città di ritiro disponibili:** Roma, Milano, Nizza
- **Prezzo totale (IVA inclusa):** €500
- **Categoria età minima:** 25 anni

### 2.3 BMW X3 30e xDrive
- **Città di ritiro disponibili:** Roma, Milano
- **Prezzo totale (IVA inclusa):** €500
- **Categoria età minima:** 25 anni

### 2.4 Audi Q8 50TDI S Line
- **Città di ritiro disponibili:** Roma, Milano
- **Prezzo totale (IVA inclusa):** €480
- **Categoria età minima:** 25 anni

### 2.5 Land Rover Defender 110
- **Città di ritiro disponibili:** Roma, Milano, Firenze
- **Prezzo totale (IVA inclusa):** €700
- **Categoria età minima:** 25 anni

### 2.6 Volkswagen Multivan Style XL
- **Città di ritiro disponibili:** Roma, Milano, Firenze, Nizza
- **Prezzo totale (IVA inclusa):** €600
- **Categoria età minima:** 25 anni

### 2.7 Mini John Cooper Works Cabrio
- **Città di ritiro disponibili:** Roma, Milano, Firenze, Nizza
- **Prezzo totale (IVA inclusa):** €480
- **Categoria età minima:** 25 anni

### 2.8 Mercedes-Benz CLE 200 Cabrio AMG Line
- **Città di ritiro disponibili:** Roma, Milano, Nizza
- **Prezzo totale (IVA inclusa):** €500
- **Categoria età minima:** 25 anni

---

## 3. Tabella riassuntiva città → auto disponibili

- **Roma:** BMW Z4, BMW 420i Cabrio, BMW X3 30e, Audi Q8, Land Rover Defender, VW Multivan, Mini JCW Cabrio, Mercedes CLE 200 Cabrio
- **Milano:** BMW Z4, BMW 420i Cabrio, BMW X3 30e, Audi Q8, Land Rover Defender, VW Multivan, Mini JCW Cabrio, Mercedes CLE 200 Cabrio
- **Firenze:** Land Rover Defender, VW Multivan, Mini JCW Cabrio
- **Nizza:** BMW Z4, BMW 420i Cabrio, VW Multivan, Mini JCW Cabrio, Mercedes CLE 200 Cabrio

---

## 4. Policy età minima di guida (Age Gate)

L'età minima per guidare un veicolo dipende dalla categoria del modello.

### 4.1 Auto Sportive
- **Età minima:** 30 anni
- **Marche/modelli inclusi:** Ferrari, Lamborghini, Porsche
- **Nota:** queste vetture NON fanno parte della promozione "Ready to Drive"; sono indicate qui solo per applicare correttamente la policy di età qualora l'utente le richieda.

### 4.2 Auto Standard (Premium / Luxury / SUV / Cabrio non-sportive)
- **Età minima:** 25 anni
- **Marche/modelli inclusi:** BMW, Audi, Land Rover, Volkswagen, Mini, Mercedes-Benz
- **Nota:** tutte le auto attualmente in promozione "Ready to Drive" rientrano in questa categoria.

---

## 5. Argomenti riservati all'operatore umano

I seguenti argomenti non rientrano nelle informazioni che l'assistente può comunicare e sono di competenza esclusiva dell'operatore umano:

- **Chilometri inclusi nel noleggio** (sinonimi tipici dell'utente: "km inclusi", "chilometraggio", "limite km")
- **Deposito cauzionale** (sinonimi tipici dell'utente: "deposito", "cauzione", "deposito cauzionale")

---

## 6. Casi fuori dal perimetro della promozione

Le seguenti richieste dell'utente NON rientrano nel perimetro della promozione "Ready to Drive":

- Richiesta di un modello di auto NON presente nel catalogo promozionale (sezione 2).
- Richiesta di una città di ritiro NON elencata per l'auto scelta.
- Richiesta per date di noleggio diverse dal periodo 30 Maggio – 2 Giugno.
- Età utente inferiore al minimo richiesto per la categoria di veicolo scelta (vedi sezione 4).

---

## 7. Schema dati del lead promo

Definisce quali campi compongono un lead promozionale "Ready to Drive" e quali sono obbligatori per considerare il lead qualificato.

**Campi OBBLIGATORI (5):**
1. Nome
2. Cognome
3. Età o Data di nascita (necessaria per applicare l'Age Gate, sezione 4)
4. Modello auto promo scelto (dal catalogo, sezione 2)
5. Città di ritiro (compatibile con il modello scelto, vedi sezione 3)

**Campi OPZIONALI (1):**
1. Indirizzo Email

---

## 8. Contatti e canali ufficiali

- **Sito ufficiale:** www.primerentcar.com
- **Canale richieste fuori promo:** modulo di preventivo standard sul sito ufficiale.
- **Canale chat WhatsApp:** utilizzato esclusivamente per la qualificazione di lead della promozione "Ready to Drive". Al termine della qualificazione il lead viene trasferito a un operatore umano tramite transfer_to_human.

---

## 9. Glossario operativo

- **Optioning:** prenotazione preliminare (opzione) di un veicolo alle tariffe promo, in attesa che un operatore umano finalizzi i controlli standard e il preventivo ufficiale. L'utente NON sta ancora effettuando un noleggio confermato.
- **RECAP:** riepilogo strutturato dei dati del lead (Nome, Cognome, Età, Auto, Città di ritiro, eventuale Email) che viene trasmesso all'operatore umano tramite il tool transfer_to_human.
- **Lead qualificato:** utente che ha fornito tutti i dati obbligatori, ha scelto una combinazione auto+città valida dal catalogo promo, soddisfa l'Age Gate e ha confermato il riepilogo.
