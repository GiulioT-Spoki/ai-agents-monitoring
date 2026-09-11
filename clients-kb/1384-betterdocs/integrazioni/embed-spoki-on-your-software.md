---
title: Incorpora Spoki nel tuo software
slug: embed-spoki-on-your-software
author: Cosimo Franco
date: 2023-02-08
modified: 2025-09-30
word_count: 1009
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/embed-spoki-on-your-software/
---

# Incorpora Spoki nel tuo software

Come posso integrare Spoki per visualizzare la chat di WhatsApp nella pagina dei dettagli del contatto nel mio software?Come posso permettere ai miei clienti di richiedere un template di WhatsApp direttamente dal mio software di gestione?

Soddisfa queste necessità, e molte altre, incorporando Spoki nel tuo software!

## Funzionalità

Ecco cosa puoi fare incorporando Spoki con l’iframe:

- Incorporamento iframe: consenti ai tuoi clienti di utilizzare le funzionalità di Spoki senza uscire dal tuo sistema di gestione.
- Auto-login tramite token: non è necessario fornire le credenziali di Spoki ai tuoi utenti, puoi autenticare l’utente del servizio associato prima di visualizzare l’iframe.
- Nascondere il brand di Spoki: il logo di Spoki non sarà visibile nell’iframe.
- Multi-Sessione: utilizza simultaneamente Spoki in diverse schede con sessioni differenti.
- Prevenire la navigazione: nell’iframe la barra di navigazione non sarà visibile, limitando l’uso a una pagina specifica.
- Ricevi notifiche quando:

Le chat non lette sono cambiate
- La lista delle chat nella pagina “Chats” è cambiata
- La lista dei messaggi nella pagina “Chat Detail” è cambiata

## Come fare

Per incorporare l’iframe di Spoki, segui questi semplici passaggi:

#### 1. Richiedi la chiave API

- Vai su Integrazioni / API / Richiedi chiave API

![](https://support.spoki.com/wp-content/uploads/2023/02/Screenshot-2023-02-08-alle-14.12.12-1-1024x690.png)
- Inserisci la motivazione e clicca su “Richiedi chiave API”.
- Esempio: “Voglio sviluppare l’integrazione di Spoki nel mio sistema di gestione per incorporare un iframe della chat nei dettagli di un contatto.”

![](https://support.spoki.com/wp-content/uploads/2023/02/Screenshot-2023-02-08-alle-14.15.58-1024x318.png)

- Salva la chiave API generata. Non sarai in grado di usarla finché non sarà approvata. Riceverai un’email con l’esito della richiesta entro un massimo di 48 ore.aximum of 48h.

![](https://support.spoki.com/wp-content/uploads/2023/02/Screenshot-2023-02-08-alle-14.22.46.png)

#### 2. Genera il Token Privato

Il **Token Privato** è associato a un utente specifico del tuo account.Puoi ottenere un Token Privato per:

- Utente Servizio (raccomandato)
- Il tuo stesso utente
- Chiedere ad altri utenti di effettuare il login e darti il token (non raccomandato, usa meglio gli utenti servizio)

Per ottenere il Token Privato:

1. Vai su Utenti & Ruoli / Aggiungi.
1. Seleziona il ruolo, scegli “Utente Servizio” come tipo di utente, inserisci il nome, quindi clicca “Aggiungi”.

![](https://support.spoki.com/wp-content/uploads/2023/02/Screenshot-2023-02-08-alle-14.34.34.png)

- Clicca sull’icona della chiave accanto all’utente servizio.
- Clicca su “Genera nuova chiave privata”.

![](https://support.spoki.com/wp-content/uploads/2023/02/Screenshot-2023-02-08-alle-14.37.50.png)

- Salva l’email e la chiave privata.IMPORTANTE: Assicurati di salvare questa chiave, non potrai accedervi nuovamente. Tieni la chiave protetta, chiunque la possieda può agire per tuo conto. In caso di problemi, rigenera la chiave.

![](https://support.spoki.com/wp-content/uploads/2023/02/Screenshot-2023-02-08-alle-14.40.21-1.png)

### Incorpora l’iframe

**ATTENZIONE**: Non sarai autorizzato a usare questa API finché non avrai una **Chiave API approvata**!

Ora inizia a programmare:

- Nel tuo codice HTML, inserisci un div vuoto per l’incorporamento di Spoki:

` <body>
 ...
 <div id="spoki-embedding"></div>`
- Inserisci lo stile CSS nell’head della tua pagina:

```
` ...
 <style>
 #spoki-embedding iframe {
 position: fixed;
 bottom: 10px;
 right: 10px;
 height: 600px;
 width: 450px;
 border: 2px solid #cccccc;
 border-radius: 8px;
 }
 </style>
 </head>`
```
- Prima della fine del body, inserisci questo script per eseguire l’autenticazione usando la Chiave API e la Chiave Privata, e quindi per inserire l’iframe nel div:

```
` ...
 <script type="application/javascript">
 // Init Spoki iFrame, you can open every Spoki page you need
 function initSpokiIframe() {
 const headers = new Headers();
 headers.append("Content-Type", "application/json");
 headers.append("X-Spoki-Api-Key", "***{{Api-Key}}***");
 const body = JSON.stringify({
 email: "***{{Email}}***",
 private_key: "***{{Private-Key}}***"
 });
 const requestOptions = {
 method: "POST",
 headers,
 body,
 redirect: "follow"
 };
 fetch("https://app.spoki.it/api/1/auth/get_authentication_token/", requestOptions)
 .then(response => response.json())
 .then(({ token, uid }) => {
 // the slug of the Spoki page you want to open
 const pageSlug = "chats";

 const iframeParent = document.getElementById("spoki-embedding");
 const iframeEl = document.createElement("iframe");
 iframeEl.setAttribute("frameborder", "0");
 iframeEl.setAttribute("src", `https://spoki.app/${pageSlug}?auth_token=${token}&auth_uid=${uid}&language=en`);
 iframeParent.appendChild(iframeEl);
 })
 .catch(error => console.log("Spoki error", error));
 }

 // Call on startup
 (initSpokiIframe)();
 </script>
 </body>`
```
- Puoi sostituire il valore di pageSlug con le seguenti rotte di Spoki:Lista chat: chatsDettaglio chat: chats/:uuid (dove puoi ottenere il link della chat tramite le API dei contatti)Template: templatesE puoi aggiungere query parametri all’URL come:"&can_view_chat_list=false" → Nasconde il pulsante per tornare alla lista chat."&can_reply_in_chat=false" → Nasconde il footer della chat per impedire la risposta dall’iframe."&can_send_paypal_in_chat=false" → Nasconde la scheda PayPal nel footer della chat.set
- If you need to open the iFrame in a specific language you can pass as param to the src of the iFrame the language parameter (supported values are it, en, es)

Se devi aprire l’iFrame in una lingua specifica puoi passare come parametro all’src dell’iFrame il parametro della lingua (i valori supportati sono it, en, es)

Vuoi saperne di più su come ottenere le API di autenticazione?? [Guarda la documentazione API](https://documenter.getpostman.com/view/21611004/UzBqnPvF#bb7ac7d0-3dfe-4365-a6e3-94d59acb3332)

### 4. Subscribe to iFrame Events

4. Iscriviti agli eventi dell’iframe

Con Spoki, puoi iscriverti agli eventi dell’iframe, ad esempio:

- Modifica delle chat non lette:

eventType: hasUnreadChatsChanged
- data: { hasUnreadChats: boolean }

***Modifica della lista delle chat nella pagina “Chats”**:*
- eventType: chatsChanged
- data: { chats: Chat[]; hasFilters: boolean; page: number }

***Modifica della lista dei messaggi nella pagina “Chat Detail”**:*
- data: { chat: Chat; page: number; messages: Message[] }

`...
<script type="application/javascript">
 function initSpokiIframe() {
 ...
 .then(({ token, uid }) => {
 // Call it if you need to subscribe to Spoki events
 subscribeToSpoki(); 
 ...
 })
 ...
 }

 // Subscribe to the Spoki iFrame to get notified about events
 function subscribeToSpoki() {
 window.addEventListener("message", (event) => {
 if (event.origin !== "https://spoki.app") return;
 const { eventType, data } = event.data;
 switch (eventType) {
 case "hasUnreadChatsChanged":
 /** Unread chats changed (pageSlug: works on every page)
 * hasUnreadChats: boolean
 */
 console.log("Spoki", eventType, data);
 break;
 case "chatsChanged":
 /** The list of chats in the Chats Page changed (pageSlug: chats)
 * chats: Chat[]
 * hasFilters: boolean
 * page: number
 */
 console.log("Spoki", eventType, data);
 break;
 case "chatMessagesChanged":
 /** The list of messages in the Chat Detail Page changed (pageSlug: chats/:uuid)
 * chat: Chat
 * page: number
 * messages: Message[]
 */
 console.log("Spoki", eventType, data);
 break;
 default:
 console.log("Spoki", "Unhandled message event type", eventType, data);
 }
 },
 false
 ); 
 ...
</script>`

### 5. Ottieni l’approvazione della chiave API, quindi divertiti 🎉

Ben fatto! Ora i tuoi clienti possono utilizzare Spoki direttamente dal tuo software web.

Non ti resta che aspettare l’approvazione della chiave API.

Grazie per il tuo tempo.

Divertiti con Spoki 🎉

### Download the Demo File

[test_spoki_iframe](https://support.spoki.com/wp-content/uploads/2023/04/test_spoki_iframe.html)[Download](https://support.spoki.com/wp-content/uploads/2023/04/test_spoki_iframe.html)