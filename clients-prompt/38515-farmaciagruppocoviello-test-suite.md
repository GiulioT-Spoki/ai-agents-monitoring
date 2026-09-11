# Gruppo Coviello — Test suite playground

Agente: [`38515-farmaciagruppocoviello-text.md`](38515-farmaciagruppocoviello-text.md)
KB: [`38515-farmaciagruppocoviello-kb.md`](../clients-kb/38515-farmaciagruppocoviello-kb.md)

Eseguire in **playground agente singolo** (e opzionalmente multi-agent). Per ogni scenario annotare risposta, azioni (`create_ticket`, owner_id), Pass/Fail.

## Legenda

| Segnale | Verifica |
| --- | --- |
| OK sede | Chiede/conferma sede solo quando serve per il ticket |
| OK info | Risponde informativamente senza forzare scelta sede |
| OK ticket | Un solo `create_ticket` con owner_id corretto |
| NO ticket | Nessun ticket (richiesta solo informativa) |
| NO dup | Nessun secondo ticket nella stessa conversazione |

## Owner_id attesi

| Sede | owner_id |
| --- | --- |
| Farmacia Passo Corese | 43069 |
| Farmacia Feronia | 44813 |
| Farmacia Tiberina | 44355 |
| Farmacia Cucchiaroni | 46859 |
| Parafarmacia Gruppo Coviello | 44804 |

---

## A — Primo contatto e welcome

| ID | Messaggio | Comportamento atteso | Ticket | Pass | Note |
| --- | --- | --- | --- | --- | --- |
| A1 | `Ciao` | Welcome + elenco sedi | NO | | |
| A2 | `Buongiorno, vorrei informazioni` | Chiedere che tipo di informazione — non solo elenco sedi | NO | | |
| A3 | `Salve` (secondo messaggio dopo A1) | Non ripetere welcome completo | NO | | |

---

## B — Richieste vaghe: informative vs operative

| ID | Messaggio | Comportamento atteso | Ticket | Pass | Note |
| --- | --- | --- | --- | --- | --- |
| B1 | `Dove siete?` | Indirizzi/elenco da KB; chiedere se serve sede specifica | NO | | |
| B2 | `Quali farmacie avete?` | Elenco 5 sedi (nomi only, puntati) | NO | | |
| B3 | `Siete aperti oggi?` | Chiedere a quale sede o chiarire intento | NO | | |
| B4 | `A che ora chiudete?` | Chiedere quale sede | NO | | |
| B5 | `Quanto dista la farmacia da Capena?` | Chiarire intento; possibile Tiberina | NO | | |
| B6 | `Avete il Tachipirina?` | Chiedere sede; non dare info prodotto | SI dopo sede | | |
| B7 | `Ho bisogno di un farmaco` | Chiedere sede + quale farmaco | SI dopo dettagli | | |
| B8 | `Vorrei parlare con qualcuno` | Chiedere sede + motivo breve | SI | | |
| B9 | `Informazioni sui servizi` | Chiarire se generico o sede specifica | Dipende | | |
| B10 | `Fate le consegne a domicilio?` | Info da KB; ticket solo se prenotazione | Dipende | | |

**Fail tipico:** risponde sempre "A quale sede vuoi rivolgerti?" su B1-B5 senza capire se la domanda è generica.

---

## C — Mappatura sede (alias inequivocabili)

| ID | Messaggio | Sede attesa | Conferma extra | owner_id | Pass | Note |
| --- | --- | --- | --- | --- | --- | --- |
| C1 | `Tiberina, avete la crema X?` | Farmacia Tiberina | No | 44355 | | |
| C2 | `Sono di Fiano, mi serve un integratore` | Farmacia Feronia | No | 44813 | | |
| C3 | `Monterotondo, prenotazione` | Farmacia Cucchiaroni | No | 46859 | | |
| C4 | `Parafarmacia, info prodotti` | Parafarmacia | No | 44804 | | |
| C5 | `Fionaro` (typo) | Farmacia Feronia | No | 44813 | | |
| C6 | `Tibernia` (typo) | Farmacia Tiberina | No | 44355 | | |

---

## D — Disambiguazione Passo Corese

| ID | Messaggio | Comportamento atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| D1 | `Passo Corese, avete il Brufen?` | Chiedere farmacia vs parafarmacia | | |
| D2 | `Corese` | Stesso di D1 | | |
| D3 | `Passo Corese, farmacia` | Farmacia Passo Corese, procedi | | |
| D4 | `Corese parafarmacia` | Parafarmacia, procedi | | |
| D5 | `Fermi, ricetta` | Farmacia Passo Corese (alias inequivocabile) | | |

**Fail:** default silenzioso su Farmacia Passo Corese senza chiedere (D1, D2).

---

## E — Eccezione ricetta

| ID | Input | Comportamento atteso | owner_id | Pass | Note |
| --- | --- | --- | --- | --- | --- |
| E1 | Foto ricetta, no testo | Passo Corese diretto, no disambiguazione | 43069 | | |
| E2 | PDF ricetta + `passo corese` | Passo Corese, no farmacia vs parafarmacia | 43069 | | |
| E3 | `Ecco la mia ricetta` + immagine | Passo Corese, poi ticket | 43069 | | |

---

## F — Multi-messaggio e anti-duplicazione

Eseguire in **una sola conversazione** continua.

| ID | Sequenza | Comportamento atteso | Ticket | Pass | Note |
| --- | --- | --- | --- | --- | --- |
| F1 | `Ciao` → `Tiberina` → `Cerco la vitamina D` | Un solo ticket Tiberina | 1x 44355 | | |
| F2 | `Feronia` → `Tachipirina` → foto confezione | Un solo ticket Feronia | 1x 44813 | | |
| F3 | Dopo ticket: `Ah e serve anche lo sciroppo` | No secondo ticket | 0 nuovi | | |
| F4 | `ho un'altra domanda` + nuova richiesta | Nuovo ticket solo se TICKETS_IN_STATUS vuoto | Dipende | | |

---

## G — Pre-check ticket esistente

Richiede contatto con `TICKETS_IN_STATUS_*` popolato.

| ID | Setup | Messaggio | Comportamento atteso | Pass | Note |
| --- | --- | --- | --- | --- | --- |
| G1 | Ticket OPEN esistente | `Tiberina, mi serve aiuto` | "Già in carico", no create_ticket | | |
| G2 | Nessun ticket aperto | `Cucchiaroni, info` | create_ticket normale | | |

---

## H — Media e link

| ID | Input | Comportamento atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| H1 | Solo foto prodotto | Risponde; chiede sede | | |
| H2 | Solo link | Risponde; chiede sede | | |
| H3 | `Tiberina` + PDF | Un ticket; media nel contesto | | |

---

## I — Guardrail e edge case

| ID | Messaggio | Comportamento atteso | Pass | Note |
| --- | --- | --- | --- | --- |
| I1 | `Che dosaggio di Tachipirina per mio figlio?` | No consiglio medico; sede per inoltrare | | |
| I2 | `asdfghjkl` | Error handling + elenco sedi | | |
| I3 | `Voglio cambiare farmacia` (dopo Tiberina) | Conferma nuova sede prima di ticket | | |
| I4 | `Hello, I need help` | Risposta in inglese | | |

---

## J — Sede precedente

| ID | Setup | Messaggio | Comportamento atteso | Pass | Note |
| --- | --- | --- | --- | --- | --- |
| J1 | Conv. precedente con Feronia | `Ciao, mi serve aiuto` | Propone Feronia, attende conferma | | |
| J2 | Stesso setup | `No, Tiberina` | Usa Tiberina | | |

---

## Checklist rapida (15 min)

| # | Scenario | Fatto | Pass |
| --- | --- | --- | --- |
| 1 | B2 — elenco sedi, no ticket | | |
| 2 | B3 — orari, chiede sede o chiarisce | | |
| 3 | B6 — prodotto, chiede sede | | |
| 4 | D1 — disambiguazione Passo Corese | | |
| 5 | E1 — ricetta → Passo Corese | | |
| 6 | C1 — alias Tiberina + ticket | | |
| 7 | F1 — 3 messaggi, 1 ticket | | |
| 8 | F3 — no duplicato post-ticket | | |

---

## Scheda singolo test

```
Scenario:
Messaggio/i:
Risposta agente:
Azioni (create_ticket, owner_id):
Pass/Fail:
Note:
```
