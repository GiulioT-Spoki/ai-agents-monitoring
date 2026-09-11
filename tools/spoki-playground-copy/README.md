# Spoki Playground — Copia risposta agente

Estensione Chrome MVP: copia negli appunti la conversazione del playground
Spoki (`app.spoki.com/ai/agent/{uuid}`), con i ruoli già etichettati, così a
fine scenario incolli una volta sola invece di fare la spola a ogni turno.
Sola lettura: non invia messaggi, non pulisce la chat, non tocca il prompt.

## Installazione

1. `chrome://extensions` → attiva **Modalità sviluppatore**
2. **Carica estensione non pacchettizzata** → seleziona questa cartella
   (`tools/spoki-playground-copy`)

## Uso

Apri un agente sul playground: in basso a destra compaiono i bottoni.

- **Copia conversazione** — copia tutto il transcript nel formato
  `Utente: …` / `Agente: …`, un turno per blocco. Il toast conferma quanti
  turni ha trovato.
- **Solo ultima** — copia la sola ultima risposta dell'agente, per ricontrollare
  un singolo turno.
- **Scegli bolla** — se prende l'elemento sbagliato, clicca qui e poi su una
  bolla dell'agente. Il selettore (e il lato della chat) resta salvato per le
  volte successive. `Esc` annulla.
- **Reset** — dimentica il selettore salvato e torna al rilevamento automatico.

## Come individua i messaggi

Se è aperto un modale, cerca solo lì dentro (il playground è un modale).
Come transcript prende l'elemento con più figli che contengono testo, a parità
il più profondo: una lista di messaggi batte la struttura di pagina. I ruoli
arrivano dalle classi/attributi (`agent`, `assistant`, `bot`, `user`…) e, dove
mancano, dall'allineamento orizzontale, assumendo l'agente a sinistra. Le righe
centrate (separatori di data) e gli orari vengono scartati.

Nessun selettore Spoki è hardcodato, quindi un restyle del playground non rompe
l'estensione: al massimo serve un **Scegli bolla**, che memorizza anche su quale
lato sta l'agente.
