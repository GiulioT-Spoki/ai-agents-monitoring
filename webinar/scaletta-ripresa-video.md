# Scaletta di ripresa — Serie video "Creare agenti AI su Spoki"

Tre video separati, uno per livello di complessità, con lo stesso filo conduttore: la Pizzeria "Da Marco". Ogni video è autonomo ma richiama il precedente.

Il copione parlato completo è in `webinar-agenti-spoki-script.md`: qui sotto, dove serve, si rimanda alle relative sezioni invece di duplicare il testo.

Legenda colonne:
- **A camera / voce**: cosa dici (volto o voiceover).
- **A schermo**: cosa si vede (screen recording, slide, prompt, KB, chat demo).
- **Durata**: indicativa, per tenere il ritmo.

---

## Setup comune (da preparare una volta sola, prima di girare)

- Account Spoki di prova con un agente "Pizzeria Da Marco" già creato.
- KB "Pizzeria Da Marco — Info Base" pronta (vedi sezione *Knowledge base* del Livello 1 nello script).
- Tre versioni del prompt salvate a parte (Livello 1, 2, 3) per incollarle a schermo senza riscriverle in diretta.
- Tre campi dinamici creati: `FIRST_NAME`, `PHONE_CALLBACK`, `RICHIESTA` (servono dal video 2).
- Un'automazione collegata al tag `99001` (serve nel video 3) — anche solo abbozzata, basta mostrarne il trigger.
- Playground/anteprima chat aperta per le demo dal vivo.
- Sigla iniziale + lower third con titolo del video e numero della puntata (1/3, 2/3, 3/3).

---

## VIDEO 1 — Livello Principiante (target durata: 6-8 min)

Obiettivo del video: mostrare il più piccolo agente utile — legge la KB, sa che ore sono, risponde se il negozio è chiuso. Nessun tool extra, nessuna action, zero raccolta dati.

| # | A camera / voce | A schermo | Durata |
|---|---|---|---|
| 1 | Hook: "La gente ti scrive su WhatsApp quando sei chiuso e tu la mattina trovi 200 messaggi." Presenti il caso Pizzeria Da Marco. | Volto + titolo "Video 1/3 — Agente Principiante". | 0:30 |
| 2 | Concetti base: i 4 mattoni di un agente Spoki (prompt, KB, tool, action) e la differenza prompt vs KB. Tieni breve, è il fondamento di tutta la serie. | Slide o schema con i 4 blocchi. Riferimento: sezione *Concetti base* dello script. | 1:30 |
| 3 | Spieghi l'obiettivo del Livello 1 e perché orari/prezzi/numero verde sono "informazioni" → vanno in KB, non nel prompt. | Vai sull'agente in piattaforma Spoki. | 0:45 |
| 4 | Mostri e commenti il prompt: ruolo, tono, tool base (`search_knowledge_base`, `get_current_datetime`), flusso aperto/chiuso, limiti. | Incolli il prompt Livello 1 nel campo prompt dell'agente. | 1:30 |
| 5 | Mostri la KB collegata: orari, contatti, listino. Sottolinei che è "cosa so", non "come mi comporto". | Apri la KB "Pizzeria Da Marco — Info Base". | 1:00 |
| 6 | Demo dal vivo: tre scenari (prenotazione a negozio chiuso, lunedì chiuso, domanda sul prezzo della margherita). | Playground: digiti i messaggi cliente, mostri le risposte e le chiamate silenziose ai tool. | 1:30 |
| 7 | Punto chiave: per "insegnare i prezzi" non hai riscritto il prompt, hai solo aggiunto un paragrafo in KB. | Affianca prompt invariato + paragrafo KB nuovo. | 0:30 |
| 8 | Recap di cosa fa / cosa NON fa ancora l'agente. Aggancio al video 2: "e se volessi raccogliere i dati del cliente?". | Lower third con i punti del recap. | 0:30 |

Note di ripresa video 1:
- È il video "didattico di base": qui spendi i minuti sui concetti, negli altri due puoi accelerare.
- Tieni a portata di mano lo scenario "margherita" perché è il più efficace per far capire la separazione prompt/KB.

---

## VIDEO 2 — Livello Medio (target durata: 6-7 min)

Obiettivo del video: stesso agente, ma a negozio chiuso raccoglie nome, telefono e richiesta e li salva sul contatto via `@@action:set_contact_field_value@@`.

| # | A camera / voce | A schermo | Durata |
|---|---|---|---|
| 1 | Hook + richiamo: "Nel video 1 l'agente era gentile ma la conversazione moriva su 'siamo chiusi'. Adesso raccoglie i dati." | Volto + titolo "Video 2/3 — Agente Medio". Clip di 2-3 sec dal video 1. | 0:30 |
| 2 | Introduci le **action** e i **campi dinamici** (`%%FIRST_NAME%%` ecc.). Differenza tra tool (legge) e action (scrive in silenzio). | Slide rapida + mostri i 3 campi dinamici già creati nel CRM. | 1:15 |
| 3 | Mostri cosa cambia nel prompt rispetto al Livello 1: blocco "Dati utente", blocco "Action disponibili", sequenza di raccolta un dato alla volta. | Incolli il prompt Livello 2, evidenziando le parti nuove. | 1:45 |
| 4 | Sottolinei che la KB resta **identica**: non aggiungi conoscenza, aggiungi capacità di raccolta (responsabilità del prompt). | Mostri la KB invariata accanto al prompt. | 0:30 |
| 5 | Demo dal vivo: scenario Luca (mercoledì 15:00). Cliente lascia nome → telefono → richiesta, una cosa alla volta. | Playground + dopo ogni risposta apri il profilo contatto e mostri il campo che si popola. | 2:00 |
| 6 | "La mattina dopo lo staff apre Spoki e trova già la lista delle richieste pronte." | Vista profilo contatto con i 3 campi valorizzati. | 0:30 |
| 7 | Recap cosa ha imparato / cosa ancora non fa (i dati restano fermi). Aggancio al video 3: "come faccio a far partire qualcosa da solo?". | Lower third recap. | 0:30 |

Note di ripresa video 2:
- Il momento forte è vedere il campo che si popola in tempo reale: cura l'inquadratura split prompt-chat-contatto.
- Insisti sul "una domanda alla volta": è la regola che rende naturale la conversazione.

---

## VIDEO 3 — Livello Avanzato (target durata: 6-8 min)

Obiettivo del video: a raccolta completata, l'agente aggiunge un tag (`@@action:add_tags_to_contact?tag_ids=99001@@`) che innesca un'automazione Spoki (ticket + richiamo programmato + conferma al cliente).

| # | A camera / voce | A schermo | Durata |
|---|---|---|---|
| 1 | Hook + richiamo: "L'agente raccoglie i dati, ma restano fermi. Ultimo passo: far succedere qualcosa da solo." | Volto + titolo "Video 3/3 — Agente Avanzato". Clip dal video 2. | 0:30 |
| 2 | Spieghi il pattern: action che aggiunge un tag → il tag è il trigger di un'automazione configurata altrove. L'agente **innesca**, non **esegue**. | Slide con il concetto trigger → automazione. | 1:15 |
| 3 | Mostri cosa cambia nel prompt rispetto al Livello 2: solo il punto 5 del flusso + la nuova action `add_tags_to_contact`, con la condizione "solo se i 3 campi sono valorizzati". | Incolli il prompt Livello 3 evidenziando le differenze. | 1:30 |
| 4 | Mostri l'automazione collegata al tag (diagramma): apri ticket → assegna allo staff → programma richiamo → conferma WhatsApp al cliente. | Sezione "Automazioni" di Spoki + il diagramma flowchart dello script. | 1:30 |
| 5 | Demo dal vivo: stesso scenario Luca. Stavolta, completata la raccolta, parte il tag e l'automazione. | Playground + mostri il tag aggiunto al contatto e (se possibile) l'automazione che scatta. | 2:00 |
| 6 | Punto chiave: per cambiare cosa succede (es. notifica email) modifichi l'automazione, non il prompt. La logica di business sta fuori dall'agente. | Affianca prompt + automazione. | 0:45 |
| 7 | Chiusura della serie: riepilogo dei 3 livelli e i 3 take-away (prompt≠KB; un agente uno scopo; testa prima di pubblicare). | Slide finale con i 3 livelli + 3 take-away. Riferimento: sezione *Chiusura* dello script. | 1:00 |
| 8 | CTA: "Parti dal Livello 1, fallo funzionare, aggiungi capacità solo quando serve." Invito a provare in piattaforma. | Lower third CTA. | 0:30 |

Note di ripresa video 3:
- Se l'automazione reale è complessa da mostrare live, va benissimo fermarsi al trigger (tag aggiunto) e spiegare a voce/diagramma cosa accade dopo.
- Chiudi qui anche l'arco narrativo dell'intera serie: è l'ultimo video, dedica spazio ai take-away.

---

## Checklist comune di chiusura per ogni video

- [ ] Intro con numero puntata (x/3) e una frase che richiama il video precedente.
- [ ] Prompt e KB sempre leggibili a schermo (zoom/incollato, non riletto a voce per intero).
- [ ] Almeno una demo dal vivo nel playground.
- [ ] Recap finale + aggancio al video successivo (tranne il 3, che chiude la serie).
- [ ] Niente markdown nelle risposte dell'agente mostrate: WhatsApp non lo renderizza (ricordalo a voce almeno una volta).
