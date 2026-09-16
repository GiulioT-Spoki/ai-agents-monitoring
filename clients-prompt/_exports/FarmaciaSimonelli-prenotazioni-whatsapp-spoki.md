# Farmacia Simonelli — prenotazioni WhatsApp: cosa si può fare e cosa serve dal tecnico

**Oggetto email:** Farmacia Simonelli — prenotazioni WhatsApp: cosa si può fare e cosa serve dal tecnico

Buongiorno,

vi scriviamo per chiarire se un agente WhatsApp Spoki può gestire le prenotazioni online della farmacia (pagina [www.farmaciasimonelli.com/prenotazioni](https://www.farmaciasimonelli.com/prenotazioni)) e, in caso positivo, come procedere in modo corretto.

Vi chiediamo di inoltrare questa comunicazione anche al vostro tecnico / referente di Farmacia Evoluta (o chi gestisce il sistema di prenotazioni), perché nella seconda parte ci sono indicazioni operative per loro.

---

## 1. Risposta in sintesi (per voi)

**L’agente Spoki non “compila” il form sul sito** come farebbe una persona al browser: non apre la pagina e non clicca date e orari.

**Può però prenotare in automatico** se colleghiamo WhatsApp al sistema che già usa il sito dietro le quinte. In pratica:

1. il cliente scrive su WhatsApp (servizio, giorno, ora, nome, ecc.);
2. Spoki raccoglie i dati in chat;
3. un collegamento tecnico **realizzato e gestito da voi** crea la prenotazione nello stesso sistema del sito;
4. il cliente riceve conferma su WhatsApp.

**Alternative più semplici** (senza integrazione completa):

- l’agente invia il link alla pagina di prenotazione e guida il cliente;
- oppure raccoglie i dati e li passa allo staff della farmacia, che prenota manualmente.

---

## 2. Cosa abbiamo verificato sul vostro sito

La pagina di prenotazione non è un semplice modulo isolato: è un sistema di booking (Farmacia Evoluta / piattaforma **QoreSuite**) che:

- mostra categorie e servizi (es. misurazioni, medicazioni, fisioterapia, ecc.);
- fa scegliere data e orario in base agli slot liberi;
- chiede i dati del paziente e crea l’appuntamento in agenda.

Quindi, per automatizzare da WhatsApp, non basta “riempire un form”: bisogna dialogare con quell’agenda.

---

## 3. Come proporremmo di farlo (schema operativo)

Proposta consigliata:

**WhatsApp → Agente Spoki → ponte tecnico lato vostro (n8n o equivalente) → sistema prenotazioni QoreSuite**

**Chi fa cosa**

- **Spoki:** configura l’agente WhatsApp e i tool che chiamano gli URL che ci fornite (URL fissi; parametri in query/body).
- **Voi / il vostro tecnico:** realizzate e gestite il ponte verso QoreSuite (n8n, middleware, o quanto preferite). Spoki **non** configura, ospita né mantiene n8n o infrastruttura del cliente.

Su Spoki, una volta pronti i vostri endpoint, colleghiamo tipicamente **3 azioni** dell’agente:

1. **Elenco servizi** — per capire cosa si può prenotare
2. **Cerca disponibilità** — per proporre date/orari liberi
3. **Crea prenotazione** — solo dopo conferma esplicita del cliente

Il numero di telefono può arrivare dal contatto WhatsApp; gli altri dati (servizio, data, ora, nome, cognome, email, note, consensi) li raccoglie l’agente in conversazione.

**Nota importante:** alcune prestazioni sul sito prevedono pagamento online (PayPal) o solo prenotazione telefonica. In una prima fase consigliamo di attivare solo i servizi “semplici” (pagamento in farmacia / senza PayPal), e lasciare gli altri al link del sito o allo staff.

---

## 4. Parte per il tecnico (da inoltrare)

### Contesto

- Widget booking sul sito: [www.farmaciasimonelli.com/prenotazioni](https://www.farmaciasimonelli.com/prenotazioni)
- Cliente QoreSuite: `farmaciasimonelli`
- Script widget: [cdn-booking-form / bookingform.js](https://storage.googleapis.com/cdn-booking-form/bookingform.js)
- API usata dal widget: [app.qoresuite.com](https://app.qoresuite.com)

### Endpoint rilevanti (già usati dal form pubblico)

Base: [app.qoresuite.com](https://app.qoresuite.com)

- `GET /api/booking/farmaciasimonelli`
- `GET /api/booking/farmaciasimonelli/services`
- `GET /api/booking/farmaciasimonelli/services/{service_id}?extras=`
- `POST /api/booking/farmaciasimonelli/services/{service_id}/bookings`
- (anche waiting list / coupon / PayPal, non in scope MVP)

La GET servizi e la GET disponibilità rispondono senza autenticazione lato widget. Il POST booking invia un payload con `details` (name, surname, email, phone/phoneWithDial, notes, consensi marketing/profiling/salute, ecc.), dati dello slot e `payment`.

### Vincolo Spoki (importante per il disegno)

Nei tool HTTP degli agenti Spoki:

- **URL del tool = statico** (niente `service_id` nel path lato Spoki);
- parametri solo in **Query (GET)** o **Body (POST)**;
- telefono: handler **Dynamic field** (`%%PHONE%%`);
- resto dei parametri: handler **LLM**.

Poiché QoreSuite mette `{service_id}` nel **path**, Spoki non può chiamare direttamente disponibilità/book rispettando il vincolo di URL statico. Serve quindi un **adapter lato vostro** (n8n o equivalente) con URL fissi verso Spoki, che costruisca le chiamate QoreSuite. **La realizzazione e la manutenzione di questo adapter sono a carico vostro / del vostro tecnico**; Spoki si limita a puntare i tool dell’agente agli URL che ci comunicherete.

### Adapter da realizzare lato vostro (3 webhook — esempio)

1. `GET/POST` `.../simonelli-list-services` → proxy a `GET .../services` (risposta ridotta: id, name, price, category, duration)
2. `GET` `.../simonelli-availability?service_id=&date_from=&date_to=&extras=` → proxy a `GET .../services/{id}?extras=` e filtro solo slot `available: true` (lista corta)
3. `POST` `.../simonelli-book` con body tipo:

```json
{
  "service_id": "...",
  "date": "YYYY-MM-DD",
  "start_hour": 9,
  "start_min": 55,
  "duration": 10,
  "name": "...",
  "surname": "...",
  "email": "...",
  "phone": "...",
  "notes": "...",
  "marketing": true,
  "privacy_accept": true
}
```

mappato a `POST .../services/{service_id}/bookings` nel formato atteso da QoreSuite.

### Cosa ci serve da voi / da Farmacia Evoluta–QoreSuite

1. Conferma che sia accettabile creare prenotazioni via API server-side (stesso canale del widget, ma da bot WhatsApp).
2. Schema ufficiale del POST booking + campi privacy/consensi obbligatori.
3. Eventuali auth, rate limit, whitelist IP, ambiente di test.
4. Idealmente: endpoint con `service_id` in query/body (così si potrebbe semplificare o eliminare il proxy).
5. Elenco servizi da includere in MVP (consiglio: solo cash / no PayPal; escludere i “solo telefonici”).
6. Gli **URL pubblici dei vostri webhook** (list / availability / book), pronti da collegare nei tool Spoki.  
   **Attenzione:** non servono di nuovo i link delle pagine del sito (es. `/prenotazioni`). Servono gli URL del **vostro ponte tecnico** (tipicamente webhook n8n o equivalente), quelli che Spoki chiamerà a ogni prenotazione.

---

## 5. Prossimi passi

1. Voi confermate se volete l’automazione completa o, in prima battuta, solo link + raccolta dati / ticket allo staff.
2. Il vostro tecnico (o Farmacia Evoluta) conferma fattibilità API, realizza il ponte e ci comunica gli **URL dei webhook del ponte** (n8n o equivalente) — non le URL del sito.
3. Spoki configura l’agente su quegli URL di webhook e insieme facciamo un test su 1–2 servizi semplici.

Restiamo a disposizione per una call breve a tre (farmacia + vostro tecnico + Spoki) se utile.

Cordiali saluti
