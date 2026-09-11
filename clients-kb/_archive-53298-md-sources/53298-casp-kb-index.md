# Casp (53298) — Indice Knowledge Base (upload Spoki)

Account **53298** — Centro Applicazioni per la Sanità Pubblica (Casp).  
Agente text: Centro Unico Prenotazioni.

## Pacchetto da caricare in piattaforma

Caricare **solo** questi file (niente legacy, niente PDF errati):

### Policy (MD)

| # | File | Contenuto |
| --- | --- | --- |
| 1 | `53298-casp-kb-01-informazioni.md` | Contatti, orari amm., ruoli, sito, servizi, legal |
| 2 | `53298-casp-kb-02-copertura-territoriale.md` | Comuni, Posizione WhatsApp, fuori zona |
| 3 | `53298-casp-kb-03-costi-pagamenti.md` | Tariffe servizio, urbano/extra (tipologie strada), ticket/solvenza, IBAN |
| 4 | `53298-casp-kb-04-prescrizioni-gestione.md` | Tipi ricetta, NRE, manoscritte, senza ricetta |
| 5 | `53298-casp-kb-05-validita-prescrizioni.md` | 180gg SSN / 2 anni privata |
| 6 | `53298-casp-kb-06-esami-classificazione.md` | Special-org, non eseguibili, pediatria |
| 7 | `53298-casp-kb-07-preparazione-prelievo.md` | Digiuno, urine, feci, farmaci |
| 8 | `53298-casp-kb-08-dati-prenotazione.md` | Checklist pre-create |
| 9 | `53298-casp-kb-09-disponibilita-regole.md` | Policy date (CSV turnazioni SoT; same-day; domani prima delle 09:00) |
| 10 | `53298-casp-kb-10-referti.md` | WA / email / cartacea / FSE |
| 11 | `53298-casp-kb-11-modifica-cancellazione.md` | Post-create → sempre staff |
| 12 | `53298-casp-kb-12-reclami-contestazioni.md` | Reclami, rimborsi, no fattura |

### Dati strutturati (CSV)

| File | Contenuto | Upload? |
| --- | --- | --- |
| `53298-casp-tariffario-esami.csv` | 216 esami; TARIFFA normalizzata | **Sì** |
| `53298-casp-disponibilita-turnazioni.csv` | Disponibilità date (Data, Nr. infermieri) | **Sì** — SoT date proponibili; da riesportare a ogni aggiornamento staff |

## Non caricare (legacy / errore / staff-only)

- `53298-casp-kb-sito-associazione.md` — fuso in doc 01  
- `53298-casp-kb-zone-costi.md` / `53298-casp-zone-tipologie-costi.csv` — fusi in doc 02/03  
- `53298-casp-kb-tariffario-esami.md` — companion legacy  
- `53298-casp-kb-source-16c39342.pdf` — file errato (abstract emodialisi)

## Regole retrieval rapide

- Disponibilità date: **CSV turnazioni** (`Nr. infermieri` valorizzato) + policy doc 09. `get_available_slots` mai usato.  
- Create: **`create_event`** una volta dopo conferma, orario tecnico 07:00–07:30.  
- Copertura / Posizione: doc 02.  
- Costi servizio + ticket: doc 03 + tariffario CSV.  
- Post-create: doc 11 → transfer.
