# Dibenedetto Automotive — Scenari di test dell’assistente WhatsApp

**Agente:** Francesca (Dibenedetto Automotive Text)  
**Account Spoki:** 57298  
**Tipo:** Testuale  
**Link agente:** https://app.spoki.com/ai/agent/bbd9b412-76d6-4885-ba1e-cbf153ca43c2  
**Data verifica:** 15 settembre 2026  
**Ambiente:** playground di test

---

## Contesto

È stato configurato e verificato l’assistente WhatsApp Francesca per Dibenedetto Automotive. Il lavoro ha incluso:

1. **Prompt operativo** snello: risposta da fatti verificati, proposta di appuntamento al reparto corretto (showroom/call vendita; ingresso officina/carrozzeria; noleggio), ticket Spoki con owner e campi dinamici, senza confermare autonomamente giorno e orario.
2. **Knowledge base in CSV**: orari per fasce di reparto e tabella di routing ticket (intent → referente / owner Spoki). Sede e sito restano nel prompt.
3. **Fix post-test**: il ticket non viene più aperto al primo messaggio con campi “da raccogliere”; si apre a fine percorso, quando la preferenza di appuntamento (o il rifiuto) è nota. Il telefono non è obbligatorio nel ticket (il contatto Spoki è già collegato).
4. **Catalogo Motork**: il feed JSON pubblico restituisce sempre l’intero stock senza filtro; non è collegato come tool all’agente (stesso limite già visto su integrazioni feed dump). L’agente non inventa prezzi o disponibilità e orienta al sito o all’appuntamento commerciale.

Gli scenari sotto sono stati eseguiti sul playground con prompt e KB aggiornati. Risultano **verificati**.

---

## Cosa è stato verificato

### Accoglienza e stile

| Scenario | Cosa è stato controllato |
| --- | --- |
| Saluto iniziale | Presentazione come Francesca, menu servizi, tono formale |
| Due richieste insieme (usato + tagliando) | Chiede quale percorso affrontare per primo, senza mescolare i flussi |

### Vendita e stock

| Scenario | Cosa è stato controllato |
| --- | --- |
| Interesse usato / disponibilità | Qualifica, proposta appuntamento con Leonardo (showroom o call), fasce commerciali corrette |
| Chiusura appuntamento vendita | Inoltro a Leonardo; conferma slot solo dall’operatore; ticket vendita con owner corretto |
| Domanda prezzo / stock KM0 | Nessun prezzo o stock inventato; rimando al sito ufficiale e/o appuntamento vendita |

### Officina

| Scenario | Cosa è stato controllato |
| --- | --- |
| Richiesta tagliando | Damiana, fasce 08:00–13:00 / 15:00–18:00, raccolta giorno e veicolo |
| Chiusura appuntamento officina | Inoltro a Damiana senza conferma slot; ticket officina con owner corretto |
| Solo orari, senza appuntamento | Risponde con le fasce; apre comunque ticket informativo al reparto (come da brief di inoltro obbligatorio) |

### Ticket e passaggio umano

| Scenario | Cosa è stato controllato |
| --- | --- |
| Timing ticket | Nessun ticket prematuro con campi finti; apertura a fine raccolta |
| Owner e descrizione | Vendita → Leonardo; officina → Damiana; nessun campo telefono obbligatorio nella description |
| Richiesta operatore | Passaggio con transfer_to_human |
| Emergenza sicurezza (spia / odore) | Invito a fermarsi; escalation al responsabile con priorità alta e passaggio umano |

---

## Interventi sul prompt legati ai test / feedback

| Tema | Intervento verificato |
| --- | --- |
| Ticket al primo messaggio | Regola esplicita: create_ticket solo a fine path, dopo preferenza o rifiuto appuntamento |
| Placeholder in description | Vietati testi tipo “da definire / da raccogliere / non specificato” |
| Telefono sul ticket | Non richiesto: il ticket resta collegato al contatto della chat |
| Motork / listino live | Non collegato come tool; niente inventare prezzi o stock |

---

## Note tecniche (KB / tool / piattaforma)

- KB Spoki: CSV orari + CSV ticket-routing (upload `.csv`, non markdown).
- Feed Motork `jsonfeed.dibenedettoautomotive.it/parcoauto/`: export intero ~23 veicoli, senza filtro per marca/modello; non usare come webhook tool diretto (rischio analogo ad altri feed dump).
- Azioni Spoki usate: `create_ticket` con `owner_id`, `set_contact_field_value`, `transfer_to_human`, `search_knowledge_base`, `get_current_datetime`.

---

## Esito

Gli scenari elencati risultano **verificati** sul playground di test.

**Operatività consigliata:** mantenere il prompt e i due CSV allineati su Spoki; per lo stock veicoli valutare in seguito uno snapshot CSV in knowledge base o un’API filtrabile, senza collegare il feed Motork grezzo come tool.
