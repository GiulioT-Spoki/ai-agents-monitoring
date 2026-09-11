# Kaidor — Prompt vs Webhook

Brief operativo per agente customer care WhatsApp (pre-demo).

## Regola

| Layer | Ruolo |
| --- | --- |
| **Prompt** | Istruzioni: quando chiamare un tool, cosa chiedere al cliente, formato risposta, handoff a umano |
| **Webhook / tool** | Dato o azione *live* (stock, prezzo, punti, ticket) — l’agente non può inventarlo |
| **KB** (nota) | Solo statico: FAQ, policy, orari, regole Club. Non prezzi/stock/punti live |

Il prompt **non sostituisce** il webhook: gli dice *quando* e *come* usarlo. Senza tool, sui dati live può solo dire “non ho il dato” o passare a un operatore.

**Fuori scope — Vision:** non identifichiamo prodotti dalle foto. L’agente è troppo impreciso; in call si allinea il cliente: con una foto si chiede Style/codice o si passa a un operatore (la foto resta in chat per l’umano).

---

## Tabella casi

| Caso | Prompt (cosa scrivere) | Webhook / tool |
| --- | --- | --- |
| Click&Collect / FAQ | Scenario “usa KB per procedure e tempistiche”; se serve *stato ordine concreto* → tool o escalate | No di default. Sì solo se tracking ordine (es. PrestaShop order status) |
| Multi-SKU prezzo / stock **online** | Decomporre i Style (es. 831085, 831111); chiamare tool per ciascuno; rispondere in elenco (prezzo, disponibilità, link) | **Sì — PrestaShop** (prezzo, scheda, stock e-commerce) |
| Giacenza **in negozio** | Chiedere quale PV; non inventare quantità; gestire “non trovato” | **Sì — TrueStock** (API esterna in tempo reale). Dato *non* nel DB PrestaShop. Sul sito il modulo `truestockavailability` già collega TrueStock alla PDP |
| Kaidor Club (n. KC, punti) | Chiedere n. KC (o ID sicuro); privacy; formato risposta | **Sì — lookup su PrestaShop** via modulo `hukoloyaltymanager`. Saldo in `ps_huko_loyalty_point_deposits.points` |
| Link prodotto / carrello / multi-intent | Rispondere punto-per-punto; su URL/SKU invocare tool; non perdere intent secondari | **Sì — PrestaShop** product (e cart se disponibile) |
| Foto prodotto (richiesta cliente) | **Niente recognition.** Chiedere Style/codice/link; se non ce l’ha → transfer-human (foto già in thread per l’operatore). Non inventare SKU | Solo se arriva un codice/link → **PrestaShop**. Nessun tool vision |
| Reclamo esperienza in store (es. anello) | Empatia; raccolta (PV, data, prodotto, scontrino, foto); **nessuna promessa** di rimborso/riparazione; riassunto strutturato per operatore | **Sì —** `transfer-human` / `open-ticket` / `add-note`. Opz. lookup ordine se API |

**KB dove serve (senza webhook):** FAQ Click&Collect, policy reso/garanzia, orari/elenco negozi (nomi, non qty), regole Kaidor Club (non i saldi).

---

## Note tecniche (da Kaidor)

### Kaidor Club — `hukoloyaltymanager`

- Richiesta tipica: numero KC + saldo punti.
- Gestito dal modulo PrestaShop **hukoloyaltymanager**.
- Saldo per cliente: tabella `ps_huko_loyalty_point_deposits`, colonna `points`.
- Implicazione Spoki: non serve un provider fidelity esterno “sconosciuto” — serve un **endpoint/webhook** che legga PS (o esponga il dato del modulo) dato un identificativo cliente (n. KC). Da chiarire se il saldo è `SUM(points)` sui depositi o c’è già una riga/vista “saldo corrente”, e quale colonna mappa il numero KC.

### Giacenza negozio — TrueStock / `truestockavailability`

- **Non** è nel database PrestaShop.
- Disponibilità PV in **tempo reale** da API esterna **TrueStock**.
- Sul sito esiste già il modulo **truestockavailability** (collega TrueStock alla pagina prodotto).
- Implicazione Spoki: il webhook non interroga lo stock PS store; deve chiamare **TrueStock** (direttamente o riusando ciò che fa già il modulo). Da chiarire: endpoint/auth del modulo vs API vendor, e mapping nome negozio ↔ store id TrueStock.

---

## Solo prompt non basta

Senza webhook l’agente **non** può, in autonomia e in modo affidabile:

- Giacenza punto vendita (TrueStock)
- Saldo punti / numero KC live (`hukoloyaltymanager` / tabella depositi)
- Prezzo e stock online aggiornati (PrestaShop)
- Apertura ticket / transfer con payload strutturato

---

## Domande ancora aperte (prima di stimare attivazione)

1. **TrueStock:** il modulo `truestockavailability` espone già un endpoint riusabile (SKU + store), o Spoki deve chiamare l’API TrueStock “nuda” (credenziali, rate limit)?
2. **Mapping negozi:** come si traduce “negozio X” detto dal cliente nello store id TrueStock?
3. **Club:** con quale chiave cerchiamo il cliente (n. KC → quale colonna)? Il saldo è somma dei depositi o altro campo?
4. **PrestaShop:** già collegato a Spoki? Gli Style sono il campo `reference`?
5. **Foto prodotto:** ok allineare che l’AI non riconosce l’articolo e chiede codice / passa a umano?

---

## Bozza email — Gabriele

**Oggetto:** Kaidor — update integrazioni Club + TrueStock (pre-demo)

---

Ciao Gabriele,

ti aggiorno sulla classificazione Prompt vs Webhook per Kaidor: ci hanno passato due pezzi tecnici utili.

**1) Kaidor Club (n. KC + saldo punti)**  
Gestito dal modulo PrestaShop **hukoloyaltymanager**. Il saldo è in `ps_huko_loyalty_point_deposits.points`.  
Quindi non stiamo cercando un provider fidelity esterno: serve un webhook che, dato il n. KC (o altro ID), legga quel dato da PS.  
Resta da chiarire: chiave di lookup del cliente e se il saldo è `SUM(points)` sui depositi o c’è già un “saldo corrente” esposto dal modulo.

**2) Giacenza in negozio**  
Confermato: **non** è nel DB PrestaShop. È in tempo reale da API **TrueStock**; sul sito c’è già il modulo **truestockavailability** (PDP).  
Per Spoki il tool non può basarsi sullo stock PS: deve passare da TrueStock (idealmente riusando ciò che fa già il modulo).  
Resta da chiarire: endpoint/auth riusabile del modulo vs API vendor diretta, e mapping nome PV → store id TrueStock.

Il brief aggiornato è qui:

`clients-prompt/kaidor-brainstorming.md`

In sintesi invariata sul resto:

- **Prompt + KB:** FAQ, Click&Collect, policy, tono, triage reclami (raccolta + handoff).
- **Webhook:** PrestaShop (prezzo/stock online/multi-SKU) + TrueStock (PV) + lookup Club su PS (`hukoloyaltymanager`) + transfer-human / ticket.
- **Vision:** fuori scope (foto → chiedere Style o umano).

Per allineare demo vs fase 2, mi servirebbe un tuo parere su:

1. PrestaShop già (o facilmente) collegabile al loro Spoki? Style = `reference`?
2. Su TrueStock: riusiamo `truestockavailability` o andiamo sull’API esterna? Chi ha le credenziali?
3. Sul Club: endpoint custom leggero su PS (query n. KC → punti) è fattibile in tempi demo, o in call restiamo su FAQ + operatore?

Se preferisci, 15 minuti di call; altrimenti un reply su questi tre punti mi basta.

Grazie  
Giulio
