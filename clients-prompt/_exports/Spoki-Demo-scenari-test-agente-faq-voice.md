# Spoki Demo / ACME SRL — Scenari di test dell’assistente FAQ Voice

**Agente:** [Template] Voice - FAQs  
**Account Spoki:** 9968  
**Tipo:** Vocale  
**Link agente di test:** [app.spoki.com](https://app.spoki.com/ai/agent/2b20d8bd-33e9-4e46-b648-55f508b778c7)  
**Data verifica:** 28 settembre 2026  
**Ambiente:** playground / chiamate di test (overlay voice)

---

## Contesto

Twin vocale del template FAQ testuale già verificato. Stesso perimetro: risposte da knowledge base ACME, nessun task; escalation umana via **Platform Transfer** in Workflow (non `transfer_to_human`).

La logica FAQ era già passata sul twin text; in voce è stato verificato l’overlay (parlato, tool, transfer).

---

## Cosa è stato verificato

| Scenario | Esito |
| --- | --- |
| Domanda in KB (registrazione app) | Verificato — `search_knowledge_base` + risposta corretta |
| Fuori ambito (meteo) | Verificato — non inventa |
| Richiesta task (prenota tecnico) | Verificato — solo FAQ + offre operatore |
| Più temi / codice + disdetta + costi | Verificato (accettato in overlay; ASR/barge-in) |
| Passaggio a operatore | Verificato — `platform_transfer` eseguito (call 55465) |
| Chiusura chiamata | Verificato — `end_call` |

---

## Note tecniche

- Agente ACTIVE su account 9968; KB `faq-howto-sample-kb` collegata  
- Temperature 0.6 (template Low tipicamente ~0.3)  
- In voce l’ASR può alterare “disdico” / interrompere turni: meglio una frase chiara e senza barge-in precoce  
- KB sample ACME: da sostituire prima del go-live cliente  

---

## Prossimi passi

1. Mantenere Platform Transfer in Workflow allineato all’intent “vuole un umano”  
2. Allineare temperature Low se si usa come template prodotto  
3. Sostituire la KB demo con documenti reali del cliente
