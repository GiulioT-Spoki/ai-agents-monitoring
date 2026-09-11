# Let’s Move — Aggiornamenti Knowledge Base e Assistente Momo

**Account Spoki:** 56004  
**Agente:** Momo (danza + fitness)  
**Data:** 10–11 agosto 2026

Documento di sintesi su quanto aggiornato in **Knowledge Base** e **system prompt**. Non include la configurazione delle automazioni Spoki.

---

## 1. Knowledge Base

File unico: knowledge base Let’s Move (sincronizzata sull’agente).

| Area | Cosa è stato aggiornato |
| --- | --- |
| **Hip Hop** | Sede Briosco (Via Marco Polo 6 + Maps); 2 ingressi/settimana obbligatori; lezioni da 60 minuti; listino standard e promo fino al 25 settembre 2026; orari mercoledì/venerdì livello 1 e 2; livelli legati a età e capacità (decisioni tecniche allo staff) |
| **Primary** | Corso non più offerto: rimosso dalla KB |
| **Social Run** | Inclusa tra le attività fitness; mercoledì e venerdì alle 18:30; Via dell’Atleta 18, Veduggio con Colzano + Maps |
| **Pagamenti** | IBAN Unicredit intestato a LET’S MOVE ASD |
| **Team** | Ilaria Fontana = biologa nutrizionista; Luca Pirovano = personal trainer (senza prezzi né numeri di telefono personali) |

---

## 2. System prompt (Momo)

| Area | Comportamento aggiornato |
| --- | --- |
| **Danza** | Non propone Primary; Hip Hop usa i dati KB (sede, modalità, prezzi, orari) |
| **Nutrizione / Personal trainer** | Risponde prima alla domanda; se pertinente propone in modo soft Ilaria o Luca; se il cliente vuole essere ricontattato apre un **ticket** (tag amministrazione). Nessun telefono personale né link WhatsApp diretti |
| **Prova Avvio** | Chiede tutti i dati richiesti in **un unico messaggio** (con avviso di non attivare l’App da soli). Dopo i dati: ticket con i dati in descrizione + passaggio allo staff. Niente form Meta WhatsApp e niente compilazione automatica di molti campi contatto da un solo messaggio |
| **IBAN** | Comunicato solo se il cliente chiede bonifico/pagamento, e solo dai dati KB |
| **Sollecito se non rispondono** | Nel prompt è presente il testo di esempio del messaggio di richiamo. Il timer 24–48 ore va configurato in piattaforma Spoki (automazioni), non dal solo prompt |

---

## 3. Verifiche playground

Scenari principali verificati con esito positivo dopo gli aggiornamenti:

- Prova Avvio (raccolta dati in blocco → ticket + passaggio allo staff)
- Interesse Personal Trainer (Luca) e nutrizionista (Ilaria) → ticket
- Hip Hop a Briosco (prezzi promo / orari / sede)
- Primary non più disponibile
- Danza Moderna età 6 anni (Grado 1, prezzi promo)
- IBAN e Social Run

---

## 4. Nota operativa (fuori da questo documento)

Restano attività di **configurazione Spoki**, non di KB/prompt:

- Soft timeout / sollecito automatico a 24–48 ore (automazione)
- Disattivazione dell’eventuale automazione legacy di routing telefonico per nutrizione/PT

---

*Documento generato per allineamento cliente / operations. Contatto tecnico: sync KB + system prompt sull’agente Momo in Spoki.*
