# Dreaming Sicily 53917 — Indice KB (uso interno, non caricare in Spoki)

> Metadati debug. In Spoki caricare **solo** [`53917-dreaming-sicily-kb.txt`](53917-dreaming-sicily-kb.txt) (plain text).

## File operativi

| File | Uso |
| --- | --- |
| [`53917-dreaming-sicily-kb.txt`](53917-dreaming-sicily-kb.txt) | Upload Spoki (plain text, ottimizzata retrieval) |
| [`53917-dreaming-sicily-kb.md`](53917-dreaming-sicily-kb.md) | Sorgente editabile in repo (non caricare in Spoki) |

## Ottimizzazione retrieval (10/08/2026)

Rispetto alla prima unificazione:

- Chunk tematici autosufficienti (ogni sezione risponde da sola se recuperata)
- Alias / domande tipiche WhatsApp in coda a ogni blocco
- Deduplica anagrafica vs FAQ “chi siete”
- Moto d’acqua: due sezioni separate (con / senza patente) + sinonimi jet ski
- Confini espliciti: fornitori terzi, no listini in KB, problemi pratica ≠ FAQ pagamenti
- Nessuna istruzione di comportamento agente (resta nel prompt)

Backup pre-ottimizzazione: `_backups/53917-dreaming-sicily-kb.20260810-152839.md`

## Sorgenti fattuali

1. Anagrafica — chi siamo, ruolo, sede legale Palermo  
2. FAQ — modello operativo, soggiorni/bambini, nautica/B&B, pagamenti/maltempo  
3. Disponibilità moto d’acqua Sicilia (con / senza patente)

## Cosa non va in KB (resta nel prompt)

- Flussi di qualificazione, una domanda alla volta, template SOS/pratica
- Tag di settore/profilo/esito con ID reali (prompt v3)
- Automation `546258` “Assegnazione operatore” + `transfer_to_human`
- Istruzioni di stile WhatsApp

## Allineamento prompt v3 ↔ KB (moto d’acqua)

| Condizione | Località |
| --- | --- |
| Con patente | Letojanni, Giardini Naxos, Marina di Ragusa, Cefalù |
| Senza patente | Marina di Ragusa, San Vito Lo Capo, Letojanni |

Panarea / Mazara / Castellammare (paste prompt v1) **non** sono in KB.

## Gap fattuali ancora assenti

- Contatti ufficiali (email / telefono / sito) se diversi da WhatsApp
- Elenco agenzie partner per appuntamenti di persona
- Listini / schede strutture ed esperienze
- Orari ufficio feriali

## Prompt / suite / export

- [`../clients-prompt/53917-dreaming-sicily-agente-chat.md`](../clients-prompt/53917-dreaming-sicily-agente-chat.md) (v3)
- [`../clients-prompt/53917-dreaming-sicily-agente-chat-test-suite.md`](../clients-prompt/53917-dreaming-sicily-agente-chat-test-suite.md)
- Downloads: `~/Downloads/53917-dreaming-sicily-kb.txt` + system-prompt.txt
