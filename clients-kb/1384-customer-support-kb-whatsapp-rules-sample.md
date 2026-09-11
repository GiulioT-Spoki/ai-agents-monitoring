# Spoki 1384 — KB sample (search_knowledge_base)

> Estratto da una risposta tool `search_knowledge_base` (status success) sull’agente Customer support.
> Non è il system prompt. Chunk parziali / duplicati ripuliti per source_id.
> Dump completo BetterDocs: [`1384-customer-support-kb-index.md`](1384-customer-support-kb-index.md) → [`1384-betterdocs/`](1384-betterdocs/).

---

## Limiti contatti “giornalieri”

- **source_id:** `3643805b-f475-4f1c-a83f-75e4070490dd`
- **URL:** https://support.spoki.it/docs/regole-whatsapp/limiti-contatti/
- **Tags:** WhatsApp, limiti contatti, messaggi, Meta Business Manager

I limiti dei contatti determinano il numero di utenti unici a cui la tua azienda può inviare messaggi su base giornaliera. Questo include sia le nuove conversazioni sia le conversazioni esistenti con gli utenti. I limiti dei messaggi NON limitano il numero di messaggi che l’azienda può inviare, ma solo il numero di utenti a cui è possibile inviare messaggi. Inoltre, questi limiti NON si applicano ai messaggi in risposta a un messaggio inizialmente inviato da un utente entro un periodo di 24 ore.

- **Livello 0**: solo se il tuo Meta Business Manager non è verificato puoi inviare messaggi a 250 utenti diversi in un arco di tempo di 24 ore.
- **Livello 1**: 1000 utenti diversi / 24h. Al momento della registrazione con il numero di telefono, un’azienda parte dal livello 1.
- **Livello 2**: 10 000 utenti diversi / 24h.
- **Livello 3**: 100 000 utenti diversi / 24h.
- **Livello 4**: utenti illimitati / 24h.

### Spostamento dei livelli

- **URL:** https://support.spoki.it/docs/regole-whatsapp/limiti-contatti/#spostamento-dei-livelli

Promozione automatica in base a volume e qualità; declassamento se molti messaggi segnalati. Condizioni per promozione:

1. Stato numero **Collegato**
2. Qualità **Media** o **Alta**
3. Negli ultimi 7 giorni, avviate X o più conversazioni con clienti unici, dove X = limite corrente / 2

Quando le condizioni si verificano, WhatsApp estende il limite di un livello dopo 24 ore.

### Esempio (declassamento)

- **URL:** https://support.spoki.it/docs/regole-whatsapp/limiti-contatti/#esempio

Ogni volta che avvii una nuova conversazione con un cliente unico, WhatsApp verifica la qualità del numero. Se la valutazione è stata **Bassa** per gli ultimi 7 giorni, WhatsApp riduce automaticamente il limite di messaggi di un livello.

---

## Limiti contatti “giornalieri” (chunk stub)

- **source_id:** `288f39f8-e42a-4f7d-a8c6-a6d9b2606a9c`
- **URL:** https://support.spoki.it/docs/regole-whatsapp/limiti-contatti/
- **Content:** Informazioni sui limiti di contatti che possono essere gestiti giornalmente.

---

## Regole per evitare il ban da WhatsApp

- **source_id:** `a09c819c-117c-4f88-8b44-3ab80379335f`
- **URL:** https://support.spoki.it/docs/regole-whatsapp/regole-per-evitare-il-ban-da-whatsapp/
- **Tags:** WhatsApp, ban, marketing, API, business

Consigli:

1. **Liste di proprietà** — non usare liste acquistate da terzi.
2. **Storico con clienti caldi** — prime settimane: non campagne a 1000 clienti freddi/giorno; preferire clientela calda, max ~500/giorno all’inizio.
3. **Disiscrizione** — permettere opt-out.
4. **Template leggermente diversi** su invii massivi (sotto-liste).
5. Se business soggetto a segnalazioni: non inviare prima della verifica Meta Business Manager.
6. **Strategia consigliata:** primi invii massivi max 250 contatti/giorno; dopo 24h controllare qualità Alta/Media; se Bassa, bloccare invii per 7 giorni.
7. Messaggi di nurturing / valore.
8. Rinnovare template periodicamente.
9. Non usare frasi tipiche dello spam.
10. Non contattare insistentemente — successivo messaggio solo dopo risposta cliente.

Controllo qualità: Dashboard → “Stato dell’account WhatsApp”. WhatsApp non deve replicare le comunicazioni email; entrare “in punta di piedi”.

---

## WhatsApp Business — Nuovo modello tariffario 2025

- **source_id:** `9624fe55-191b-4908-bcec-036697a59c47`
- **URL:** https://support.spoki.it/docs/regole-whatsapp/whatsapp-business-nuovo-modello-tariffario-2025/

Riepilogo (dal 1° luglio 2025, dal chunk):

- Si **paga per ogni messaggio** inviato, non più per conversazione
- Messaggi **utility entro 24 ore** dalla richiesta del cliente: gratuiti
- Meta introduce **livelli di volume** (più invii, meno costi)
- Classificazione messaggi più rigida
- Serve revisione di template, sistemi e strategie

---

## Stato WhatsApp

- **source_id:** `f83e5741-a188-4056-934e-64a4142be32d`
- **URL:** https://support.spoki.it/docs/piattaforma/dashboard/#stato-whatsapp

Lo stato WhatsApp fornisce info sui limiti di invio giornalieri per account, in base a volumi pregressi e qualità dei messaggi.

---

## Verifica Meta Business Manager

- **source_id:** `f07de941-28ef-41df-a82c-13ea4e4ffd7d`
- **URL:** https://support.spoki.it/docs/onboarding/verifica-meta-business-manager/

Se business non verificato da Meta: max **250** utenti diversi / 24h. Per avviare verifica: profilo amministratore su Meta Business Manager; ID MBM corrispondente a quello collegato al numero Spoki.

---

## Costi

- **source_id:** `ef3edbaa-d2ea-49bb-99b8-ace38ed4568e`
- **URL:** https://support.spoki.it/docs/regole-whatsapp/conversazioni/#costi

Tariffazione Meta basata su conversazioni (finestre 24h). Categorie: marketing, notifiche di servizio, autenticazione, supporto. Prezzi aggiornati: https://developers.facebook.com/docs/whatsapp/pricing — possono variare per paese.

---

## Note per test suite

| Finding | Implicazione |
| --- | --- |
| Tool `search_knowledge_base` = success | Tool attivo sull’agente |
| Chunks da support.spoki.it | KB = docs assistenza Spoki (almeno regole WhatsApp) |
| source_id `3643805b-…` ripetuto 3 volte | Stesso doc spezzato (limiti / promozione / esempio) |
| Stub `288f39f8-…` quasi vuoto | Possibile rumore retrieval — verificare in P1/P2 |
| Contenuto costi 2025 vs “conversazioni” | Possibile mismatch doc (modello per-messaggio vs per-conversazione) — da cross-check in suite |
