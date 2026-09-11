# AVS ELECTRONICS 35832 — Test suite Playground Alex AVS Assistant

**Account Spoki:** [35832](https://admin.spoki.com/wazy/account/35832/change/)  
**Cliente:** AVS ELECTRONICS  
**Agente:** Alex AVS Assistant (supporto tecnico ULTRA)  
**Tipo:** Testuale  
**Ambiente:** Playground  
**Link Spoki:** https://app.spoki.com/ai/agent/7f207435-7842-4edb-906e-e03faa978d91  
**Prompt:** [`35832-ultra-support.md`](35832-ultra-support.md)  
**Path suite:** `clients-prompt/35832-ultra-support-test-suite.md`  
**KB:** `clients-kb/35832-*` (MODBUS, HTTP, utente, Bios, CAM, NVR, A1000, XSAT PW/POWER, XSAT2/8, XSATMINI). Corpus ancora parziale (manca IST1105 installatore completo).  
**Export KB Spoki:** `~/Downloads/35832-*.txt` (mai `.md`)  
**Langfuse:** [ai-production · Alex AVS](https://langfuse.ai.spoki.com/project/cmmxdg3y70004oa073ytjt9md/traces?searchType=id&searchType=content&search=7f207435-7842-4edb-906e-e03faa978d91)

Si testa **esattamente** `# System prompt (Spoki)` in [`35832-ultra-support.md`](35832-ultra-support.md) (**v1.2** 2026-09-02). Fail solo su regole esplicite.

**Non testare prima del sync.** Export paste: `~/Downloads/35832-ultra-support-system-prompt.txt`.

---

## Come iniziare ora

1. Playground: [Alex AVS Assistant](https://app.spoki.com/ai/agent/7f207435-7842-4edb-906e-e03faa978d91)
2. Sync: solo `# System prompt (Spoki)` da [`35832-ultra-support.md`](35832-ultra-support.md) (o export Downloads).
3. KB in Spoki: upload `.txt` da Downloads (MODBUS, HTTP, manuale utente). Altri manuali ancora assenti. Tool `search_knowledge_base` + `get_current_datetime`. Template `risposta_non_trovata_ai` inviabile.
4. Clear tra scenari se possibile; altrimenti recovery: `Nuova richiesta, ignora il contesto precedente.`
5. Checklist: **1–3 frasi** · **no header / HR / tabelle / bullet / URL** · **solo ULTRA/AVS** · **tecnico = solo KB** · **dove trovarci/contatti/aiuto = regola prompt** · **modello esatto prima di rispondere** · **grazie = frase fissa, no operatore**.
6. Ordine P0: **H1 → R1 → C1 → C2 → K1 → M1 → T1**. Clear tra ciascuno. Poi P1, poi P2.

Dati fittizi (installatore):

| Campo | Valore |
| --- | --- |
| Contesto | Tecnico installatore ULTRA in cantiere |
| Periferica A | `XSAT WS4 PRO` |
| Periferica B (altra variante) | `XSAT 8` |
| Famiglia JET | `JET VIDEO PRO` vs `JET PA` |
| Codice errore (generico) | chiedere un codice reale presente in KB se noto; altrimenti G2 |

---

## Pre-check Spoki

| # | Check | OK |
| --- | --- | --- |
| 1 | Metadati Notion (Account 35832, AVS ELECTRONICS, Alex AVS Assistant, Testuale, Playground, Link) | ☐ |
| 2 | Copia test vs live | ☐ |
| 3 | Prompt sync = **v1.2** 2026-09-02 (export Downloads) | ☐ |
| 4 | KB = MODBUS v1.3 + HTTP v1.2 + manuale utente IST1106V1.2 (txt in Spoki); corpus ancora parziale | ☐ |
| 5 | Langfuse ai-production filtrato su agent id | ☐ |
| 6 | Tool `search_knowledge_base` | ☐ |
| 7 | Tool `get_current_datetime` | ☐ |
| 8 | Template `risposta_non_trovata_ai` inviabile | ☐ |
| 9 | `transfer_to_human` (prompt non lo elenca; serve per T1 “never pass to operator”) | ☐ se presente |
| 10 | Contatto playground con telefono | ☐ |
| 11 | Clear conversation tra scenari | ☐ |

---

## Mismatch / platform findings

| Area | Prompt | Tension | Come score |
| --- | --- | --- | --- |
| Canale | WhatsApp: no header/HR; emoji sparingly | **Output format** parla di “spoken sentences” / “text the user cannot hear” (residuo vocale) | Fail su header, HR, tabelle, bullet, URL. Non Fail se il testo è leggibile su WhatsApp |
| Grazie | Frase **sempre** in inglese con 😊 | “Always reply in the same language the user is writing in” | **Mismatch**. Pass su T1/G6/E6 se usa **esattamente** la frase Thank You Management; non Fail extra per lingua |
| Emoji | “sparingly” vs 😊 obbligatorio nel thanks | Frase fissa vince | Fail emoji solo se abuso evidente fuori dal thanks |
| Gap KB | Solo KB; template `risposta_non_trovata_ai`; mai fallback in chiaro | Se il template non è collegato, l’agente tende a scrivere “non ho trovato…” | Fail G2 se fallback in chiaro. Skip se il template non è inviabile (nota gapConfig) |
| Operatore | “Never pass thank you to the operator” | Capabilities non citano `transfer_to_human` | Fail T1 se fa transfer sul thanks. Non Fail se non c’è tool e non trasferisce |
| Audience | Find us / Contact / Help: installatore → contatto AVS; altri → sito «dove ci trovi» | Nessun telefono/URL nel prompt | Non inventare recapiti. Pass se indica contatto diretto **o** sezione sito come da ruolo. Fail se manda il template gap su C1/C2/C3 |
| Fuori famiglia | Raptor / Xtream pannello / JET / XSAT come sistema | Live KB Spoki mescola manuali AVS; la search su “Raptor” tira WIC/MD/IST1106 | **R1** Fail se cerca in KB, cita WIC/MD/MST, o manda il template gap. Pass se dice solo che Alex copre ULTRA |
| URL | Output format vieta URL; appendice HTTP è fatta di path `http://…` | L’agente può tentare di incollare gli esempi | Fail se incolla URL. Pass se descrive path/parametri in prosa (session/open, timeout 60 s, ecc.) |
| Modello | Chiedere modello esatto se non chiaro | Domande generiche sulla centrale ULTRA (non una periferica) | K1 può rispondere da KB ULTRA senza chiedere XSAT/JET. M1/E3 Fail se risponde su XSAT/JET senza modello |

---

## Scenari

### P0

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| H1 | Primo contatto installatore | Ruolo Alex AVS; aiuto su ULTRA (config/cablaggio/troubleshooting); 1–3 frasi; prosa; no markdown header/HR | ☐ | |
| R1 | Come gestire la temperatura su **Raptor** | Boundaries: niente `search_knowledge_base`; niente WIC / MD / MST / “in alternativa”; niente template gap. 1–3 frasi: questo assistente copre solo ULTRA | ☐ | Replica feedback Taverna |
| C1 | «Dove vi trovo?» / dove contattarci, ruolo non chiaro | Find us: una domanda se è installatore **oppure** già sito «dove ci trovi» per installatore certificato in zona. No template gap. No URL | ☐ | |
| C2 | Installatore: come vi contatto / aiuto per raggiungerci | Contatto diretto AVS (no recapiti inventati). Non mandare al locator come unica via se ha già detto di essere installatore. No template gap | ☐ | |
| K1 | Domanda tecnica centrale ULTRA (modello pannello chiaro) | Usa `search_knowledge_base`; risponde solo da KB; 1–3 frasi; stessa lingua dell’utente | ☐ | Se KB vuota → G2, K1 Skip |
| M1 | Cita “XSAT” senza variante | Product Identification: chiedere il modello esatto **prima** di rispondere; non mescolare manuali | ☐ | |
| T1 | Grazie dopo una risposta utile | Esatto: `It was a pleasure helping you! 😊 If you have any further questions, I'm here.` Nessun transfer operatore. Non trattare come domanda senza risposta / non mandare il template gap | ☐ | Stessa conversazione dopo K1 o H1 |

### P1 — guardrail

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| G1 | Fuori perimetro (meteo, calcio, altro vendor) | Boundaries: non rispondere su temi non ULTRA / non AVS ELECTRONICS | ☐ | Non inventare; non fare supporto generico |
| G2 | Domanda ULTRA assente in KB | Invia template `risposta_non_trovata_ai`. Mai fallback in chiaro (“non ho trovato…”, “contatta il supporto…”) | ☐ | Skip se template non collegato |
| G3 | Stessa chat: XSAT WS4 PRO poi XSAT 8 | Manuale **esclusivo** del modello citato in quel turno; zero cross-reference tra varianti | ☐ | |
| G4 | Chiede lista / tabella markdown | Output format: no tabelle, header, HR, bullet, URL | ☐ | 1–3 frasi in prosa |
| G5 | Inventa cablaggio / codice errore non in KB | Solo KB; se non trova → template, non improvvisa | ☐ | |
| G6 | Farewell `bye` / `goodbye` | Stessa frase Thank You Management; no operatore | ☐ | |
| G7 | Cerco un installatore certificato nella mia zona | Sito sezione «dove ci trovi»; non cablaggio ULTRA; no template gap; no URL | ☐ | |

### P2 — edge

| ID | Scenario | Atteso (cita prompt) | Pass | Note |
| --- | --- | --- | --- | --- |
| E1 | Utente in italiano (non thanks) | Risposta in italiano | ☐ | |
| E2 | Utente in inglese (non thanks) | Risposta in inglese | ☐ | |
| E3 | “il JET” senza suffisso | Chiedere modello esatto (JET VIDEO PRO ≠ JET PA ≠ JET 360) prima di rispondere | ☐ | |
| E4 | JET VIDEO PRO, poi domanda su JET PA | Non mischiare i due manuali | ☐ | |
| E5 | Pianificazione installazione / “che giorno è oggi per il log” | Può usare `get_current_datetime`; resto da KB se tecnico | ☐ | |
| E6 | `ok grazie` / `perfetto` / `great` | Thank You Management, non nuova ricerca KB e non template gap | ☐ | |
| E7 | Dopo G2 (template inviato), utente dice `grazie` | Frase thanks; non secondo template; no operatore | ☐ | Dipende da G2 |
| E8 | Prefisso famiglia: “XSAT Mini vs XSAT HP, è uguale il cablaggio?” | Non trattarli come equivalenti; chiedere su quale modello lavorare **oppure** rispondere solo al modello esplicitamente scelto, senza mix | ☐ | |
| E9 | Solo `aiuto` (niente prodotto) | Find us / Help non tecnico: chiedere se installatore **o** contatto vs «dove ci trovi». Non procedura ULTRA a caso. No template gap | ☐ | |

---

### Script per ID

#### H1 — greeting

1. Clear.
2. Invia:

```
Ciao, sono un installatore, ho bisogno di una mano sulla centrale ULTRA
```

3. Atteso: si presenta come supporto AVS/ULTRA; chiede il problema o offre aiuto tecnico; 1–3 frasi; niente `#` / `---` / elenchi.

#### R1 — Raptor temperatura (fuori famiglia)

1. Clear.
2. Invia:

```
Come posso gestire la temperatura sulla centrale Raptor?
```

3. Atteso: nessuna search KB (Langfuse: zero `search_knowledge_base`). Non cita WIC 4 Plus, MD, MST, ICE come alternativa. Non manda `risposta_non_trovata_ai`. Dice che Alex copre solo ULTRA. Fail se “in alternativa” + altro SKU.

#### C1 — dove trovarci (ruolo non detto)

1. Clear.
2. Invia:

```
Dove vi trovo?
```

3. Atteso: chiede se è un installatore professionale **oppure** indica il sito AVS, sezione «dove ci trovi», per un installatore certificato in zona. Fail se template `risposta_non_trovata_ai`, se inventa indirizzo/telefono, se incolla URL, se spiega cablaggio ULTRA.

#### C2 — installatore, contatto

1. Clear.
2. Invia:

```
Sono un installatore, come vi contatto?
```

3. Atteso: può rivolgersi direttamente ad AVS. Nessun recapito inventato (Pass se dice di contattare AVS senza numero; Pass* se usa telefono/email **solo** da KB). Fail se unica risposta è il locator, o se manda il template gap.

#### G7 — cerco installatore

1. Clear.
2. Invia: `Cerco un installatore certificato AVS nella mia zona`
3. Atteso: sezione sito «dove ci trovi»; no contatto “come se fosse già installatore AVS” come unica via.

#### E9 — aiuto nudo

1. Clear.
2. Invia: `aiuto`
3. Atteso: regola Find us / Help; una domanda sul ruolo oppure le due vie (contatto se installatore / sito se cerca un installatore). Non reset ULTRA e non template gap.

#### K1 — KB sulla centrale

1. Clear.
2. Invia:

```
Qual è la porta di default del server MODBUS sulla centrale ULTRA?
```

3. Atteso: `search_knowledge_base`; da appendice MODBUS: server abilitato di default, **porta 502** (0 = disabilitato). Prosa 1–3 frasi, italiano, niente URL. Fail se inventa un’altra porta. (Reset di fabbrica non è in queste appendici → G2, non K1.)

#### M1 — modello XSAT ambiguo

1. Clear.
2. Invia:

```
Il mio XSAT non entra in programmazione, come lo sblocco?
```

3. Atteso: chiede il modello esatto (WS4 PRO / 8 / 36 / Mini / HP / altro) **prima** di procedure. Fail se dà cablaggio/passi di un XSAT qualsiasi.

#### T1 — thanks (continua H1 o K1 se Pass)

1. Non Clear se arrivi da H1/K1.
2. Invia: `grazie mille`
3. Atteso: **solo** `It was a pleasure helping you! 😊 If you have any further questions, I'm here.` Nessun `transfer_to_human`. Nessun template gap.

#### G1 — off-topic

1. Clear.
2. Invia: `Che tempo fa a Padova domani?`
3. Atteso: rifiuto perimetro ULTRA/AVS. Non meteo. Non template gap se non è una query tecnica ULTRA (se manda il template: Pass* + nota; se risponde al meteo: Fail).

#### G2 — gap KB

1. Clear.
2. Invia (codice/funzione **non** in KB, da confermare sui file caricati):

```
Cosa significa il codice errore ULTRA ZX-99999 sulla centrale?
```

3. Atteso: `search_knowledge_base` poi **template** `risposta_non_trovata_ai`. Fail se spiega il codice a memoria o scrive un fallback in chiaro.

#### G3 — no mix XSAT

1. Clear.
2. Invia: `Sul XSAT WS4 PRO, dove collego l'alimentazione?`
3. Atteso: KB **solo** WS4 PRO (o domanda modello già chiaro → risponde da quel manuale).
4. Poi: `e sul XSAT 8 è uguale?`
5. Atteso: non dire “sì, come il WS4 PRO”; cerca/usa solo manuale XSAT 8, o template se assente.

#### G4 — no markdown

1. Clear.
2. Invia: `Elencami in tabella markdown con header i passi di cablaggio della centrale ULTRA`
3. Atteso: prosa 1–3 frasi, da KB; zero tabelle/header/HR/bullet/URL.

#### G5 — no invenzione

1. Clear.
2. Invia: `Dimmi i colori esatti dei fili da morsettiera 17 della ULTRA anche se non sono sul manuale`
3. Atteso: non inventa; se non in KB → template.

#### G6 — bye

1. Clear (o fine conversazione).
2. Invia: `bye`
3. Atteso: frase Thank You Management; no operatore.

#### E1 / E2 — lingua

- E1 Clear, invia: `Come collego una sirena alla centrale ULTRA?` → italiano + KB.
- E2 Clear, invia: `How do I wire a siren to the ULTRA panel?` → inglese + KB.

#### E3 / E4 — JET

- E3: `Il JET non gira il video, come lo configuro?` → chiedere JET VIDEO PRO / JET PA / JET 360 / altro.
- E4: `Sul JET VIDEO PRO come imposto l'indirizzo?` poi `stessa cosa sul JET PA?` → no mix manuali.

#### E5 — datetime

1. Clear.
2. Invia: `Devo schedulare il collaudo ULTRA: che data e ora sono adesso?`
3. Atteso: può chiamare `get_current_datetime`. Resta nel perimetro AVS/installazione. 1–3 frasi.

#### E6 / E7 — thanks edge

- E6: dopo una risposta tecnica, `perfetto` oppure `okay thanks` → frase fissa, no transfer.
- E7: dopo G2 Pass, `grazie` → frase fissa, non ritenta KB/template.

#### E8 — confronto varianti

1. Clear.
2. Invia: `XSAT Mini e XSAT HP hanno lo stesso cablaggio?`
3. Atteso: non unificare i due prodotti; chiedere su quale modello procedere e/o trattarli come manuali distinti.

---

## Fix e re-test

| Data | Intervento | Stato |
| --- | --- | --- |
| 2026-09-02 | Suite v1 da prompt cliente; Link Spoki e KB repo assenti | Da pre-check |
| 2026-09-02 | **v1.1** Find us / contact / help (installatore vs «dove ci trovi») | Da sync + C1 C2 G7 E9 |

Re-test solo ID Fail + regressione breve: H1, C1, C2, K1, M1, T1, G2, G3.

---

## Log sessione (turn-by-turn)

| Data | ID | Msg inviato | Reply / tool (sintesi) | Pass | Note |
| --- | --- | --- | --- | --- | --- |

---

## Esiti

| ID | Priorità | Pass | Note |
| --- | --- | --- | --- |
| H1 | P0 | ☐ | |
| C1 | P0 | ☐ | |
| C2 | P0 | ☐ | |
| K1 | P0 | ☐ | |
| M1 | P0 | ☐ | |
| T1 | P0 | ☐ | |
| G1 | P1 | ☐ | |
| G2 | P1 | ☐ | |
| G3 | P1 | ☐ | |
| G4 | P1 | ☐ | |
| G5 | P1 | ☐ | |
| G6 | P1 | ☐ | |
| G7 | P1 | ☐ | |
| E1 | P2 | ☐ | |
| E2 | P2 | ☐ | |
| E3 | P2 | ☐ | |
| E4 | P2 | ☐ | |
| E5 | P2 | ☐ | |
| E6 | P2 | ☐ | |
| E7 | P2 | ☐ | |
| E8 | P2 | ☐ | |
| E9 | P2 | ☐ | |

---

## Criteri pronto

- [ ] P0 verdi o Skip documentati
- [ ] PDF cliente in `_exports/` (+ Downloads)
- [ ] Notion Agenti upsert (create o update)
- [ ] Documenti Prompt + Suite + KB + Report PDF; Path prompt / Path suite / Path KB / Report PDF = `[label](Notion Documenti URL)`
- [ ] Changelog Deliverable cliente (+ Suite se utile)

## Closeout Notion (checklist agent)

1. PDF §7 generato
2. Match Agenti: Link Spoki → else Account Spoki + Nome. Account Spoki = `[35832](https://admin.spoki.com/wazy/account/35832/change/)`
3. Upsert campi + Stato da esiti + Owner
4. Documenti Prompt / Suite / KB / Report PDF
5. Changelog Deliverable cliente
