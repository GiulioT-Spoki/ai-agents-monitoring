# Casp — Scenari di test dell’assistente WhatsApp (Centro Unico Prenotazioni)

**Agente:** Centro Unico Prenotazioni (test)  
**Account Spoki:** 53298  
**Cliente:** Centro Applicazioni per la Sanità Pubblica (Casp)  
**Tipo:** Testuale  
**Link agente:** [app.spoki.com/ai/agent/e903108c…](https://app.spoki.com/ai/agent/e903108c-507b-4360-8905-3c6439cf16a1)  
**Data verifica:** 17 agosto 2026  
**Ambiente:** playground di test  

---

## Contesto

È stato configurato e verificato un assistente WhatsApp per le **prenotazioni di prelievo domiciliare** Casp. In questa sessione sono stati validati:

1. **Prompt operativo** (versione corrente v5): raccolta dati, costi, date, creazione evento su Calendar CUP, passaggio a operatore.
2. **Knowledge Base compressa** (6 documenti di testo + tariffario CSV + foglio turnazioni CSV): le date proponibili arrivano dal foglio turnazioni, non da Google Calendar.
3. **Correzioni emerse dai test:** campi telefono/email nell’evento Calendar; protezione contro doppie prenotazioni; passaggio a operatore reale (non solo dichiarato a parole).

Questo report elenca **solo gli scenari eseguiti e verificati**.

---

## Cosa è stato verificato

### Accoglienza e intent

| Scenario | Cosa è stato controllato |
| --- | --- |
| Saluto generico | Saluto coerente con l’ora, ringraziamento Casp, una domanda sul motivo del contatto |
| Richiesta di prelievo a domicilio | Parte dalla ricetta / documento, senza inventare costi o confermare l’appuntamento in anticipo |

### Informazioni di servizio

| Scenario | Cosa è stato controllato |
| --- | --- |
| Orari | Orari amministrativi lun–sab 09:00–12:00, distinti dalla fascia prelievi mattutina 06:00–08:30 |
| Costo a Monopoli (Via Roma 1, urbano) | 15 € di servizio, distinto dal ticket sanitario |

### Prenotazione completa

| Scenario | Cosa è stato controllato |
| --- | --- |
| Happy path fino a conferma | Raccolta dati, costi stimati, data dal foglio turnazioni (es. 19 agosto), digiuno e istruzioni, riepilogo, un solo evento Calendar |
| Contenuto evento Calendar | Titolo, indirizzo, orario tecnico 07:00–07:30, descrizione con nominativo, CF, telefono, esami, ricetta, referto e costi; invito email se il contatto ha email in Spoki |
| Ripetizione “ok prenota” dopo conferma | Non crea un secondo appuntamento; se insiste, passa allo staff |

### Passaggio a operatore e limiti

| Scenario | Cosa è stato controllato |
| --- | --- |
| Richiesta operatore | Passaggio effettivo allo staff |
| Emergenza (dolore toracico / difficoltà respiratorie) | Indica di chiamare il 112 e interrompe il flusso |
| Interpretazione esami / valori | Non interpreta i risultati; invita a rivolgersi al medico |
| Senza ricetta (solvenza) | Spiega il regime a pagamento, raccoglie i dati utili e passa allo staff **senza** creare l’appuntamento |
| Fuori zona (es. Bari) | Comunica che non è copertura ordinaria e passa allo staff |
| Prenotazione per oggi | Passa allo staff (niente prenotazione autonoma same-day) |
| Prenotazione per domani dopo le 09:00 | Passa allo staff anche se il giorno successivo risulta aperto sul foglio turni |
| Giorno chiuso sul foglio turni (es. sabato senza infermieri) | Comunica indisponibilità e propone la prima data aperta successiva |
| Modifica / spostamento appuntamento già esistente | Passa allo staff; non modifica il calendario in autonomia |

---

## Interventi sul prompt legati ai test

| Tema emerso | Intervento verificato |
| --- | --- |
| Evento Calendar senza telefono / dati | Specificati i campi obbligatori dell’evento; uso del numero contatto Spoki; descrizione multi-riga |
| Email sul contatto Spoki | Se presente, viene aggiunta come unico invitato all’evento |
| Secondo “ok prenota” ricreava l’appuntamento | Regola anti-duplicato: dopo un create riuscito non si richiama il tool |
| Passaggio a operatore solo dichiarato a parole | Divieto di simulare i tool; il transfer deve essere effettivamente eseguito |

---

## Note operative per Casp

- Il **foglio turnazioni** (Data + Nr. infermieri) è la fonte delle date che l’assistente può proporre. Cella vuota = giorno chiuso.
- Google Calendar serve a **registrare** l’appuntamento (orario tecnico interno 07:00–07:30, non comunicato come ora di arrivo).
- Quando una giornata è piena o salta, basta **svuotare** la casella Nr. infermieri: l’assistente smette di proporla.
- Modifiche e disdette restano in carico al personale Casp.
- Il foglio attuale arriva a fine agosto: va esteso prima di settembre, altrimenti l’assistente non avrà date da proporre.
