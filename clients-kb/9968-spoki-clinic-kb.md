# SPOKI CLINIC — Knowledge base (reception demo)

Facts only for account 9968 demo. Do not invent sede, prezzi, branche o disponibilità fuori da questo file. Non è un documento clinico: nessuna diagnosi, terapia o consiglio medico.

Demo KB per l’agente TEXT — Reception clinica (`a906dd6f-bf28-4ac9-a288-c7e046b5c5ec`).

## Identità

- Brand: **SPOKI CLINIC**
- Tipo: poliambulatorio specialistico privato (demo fittizia)
- Cosa offre: prenotazione visite specialistiche nelle sole branche elencate sotto, tutte nella stessa sede
- Cosa non offre: SSN/ticket, telemedicina, laboratorio, imaging (RX/RM/TC/ecografie), pronto soccorso, pediatria, cardiologia, dermatologia, ginecologia e qualsiasi branca non in listino

## Sede e orari

- Indirizzo: Via Giuseppe Fanelli 210, 70125 Bari (Italia) — sede unica
- Timezone: Europe/Rome
- Accettazione / visite: lunedì–venerdì 08:30–19:00; sabato 09:00–13:00; chiuso domenica e festivi
- Email: reception@spokiclinic.demo
- Telefono: +39 080 0000000
- Modalità visita: **sempre in presenza** in sede. Non è un servizio di telemedicina o video-consulto; eventuali link Meet generati dal calendario non sono la modalità della visita

## Regole di prenotazione

- Durata standard di ogni appuntamento: **30 minuti** (tutte le branche)
- Prenotazione solo su disponibilità reale del calendario della branca corretta (tool Google Calendar omonimo)
- Dati utili per la prenotazione: nome e cognome; email se disponibile (per conferma)
- Disdetta o spostamento: fino a **24 ore** prima dell’orario dell’appuntamento
- Fuori dagli orari di accettazione non esistono slot inventati: solo disponibilità restituite dal calendario
- Pagamento: in sede (contanti o carta). Nessun link di pagamento o IBAN fuori da questa KB

## Listino (privato, demo, IVA inclusa)

Prezzi pubblici demo. Non inventare sconti, pacchetti o prestazioni non elencate.

| Branca (nome calendario / tool) | Prima visita | Controllo (stessa branca, entro 30 giorni) |
| --- | ---: | ---: |
| Otorinolaringoiatria | €110 | €80 |
| Traumatologia | €115 | €80 |
| Ortopedia | €120 | €80 |
| Urologia | €120 | €80 |
| Chirurgia generale | €130 | €80 |

## Orientamento richiesta → calendario

La reception orienta la prenotazione sul **calendario omonimo** alla branca. I nomi sotto coincidono letteralmente con i tool Google Calendar dell’agente. È un catalogo di orientamento reception, **non** una diagnosi.

### Traumatologia

Prenotare sul calendario **Traumatologia** quando c’è un **trauma recente** (caduta, incidente, infortunio sportivo o sul lavoro) con distorsione, contusione, dolore acuto post-trauma, sospetta lesione acuta di articolazione/muscolo/tendine, **senza** criteri di emergenza (vedi sezione Emergenze).

Esempi tipici di formulazione: «sono caduto ieri», «mi sono storpio la caviglia al calcio», «dopo lo scontro mi fa male il polso».

### Ortopedia

Prenotare sul calendario **Ortopedia** per dolore, rigidità o limitazione muscolo-scheletrica **senza trauma recente**: ginocchio/schiena/spalla/anca cronici, artrosi, rigidità articolare, controllo post-operatorio programmato non urgente.

Esempi: «mi fa male il ginocchio da mesi», «ho la schiena bloccata da tempo», «controllo dopo protesi».

### Urologia

Prenotare sul calendario **Urologia** per vescica e vie urinarie, prostata, disturbi urinari, dolore o sintomi tipici dell’apparato genito-urinario maschile, sospetto calcolo non urgente.

Esempi: «bruciore quando urino», «problemi di prostata», «mi fa male il fianco e pensano a un calcolo».

### Otorinolaringoiatria

Prenotare sul calendario **Otorinolaringoiatria** per orecchio, naso, gola, sinusite, abbassamento di voce, acufeni, vertigini tipiche ORL, difficoltà respiratorie nasali non urgenti.

Esempi: «non sento da un orecchio», «ho il naso chiuso da settimane», «mi fa male la gola / raucedine».

### Chirurgia generale

Prenotare sul calendario **Chirurgia generale** per ernie, cisti/lipomi, medicazioni o valutazione ferite programmate, addome non urgente da valutare in ambulatorio chirurgico, second opinion pre-intervento di chirurgia generale.

Esempi: «ho un’ernia», «c’è un nodulo/cisti sotto pelle», «vorrei una visita chirurgica per un lipoma».

### Ortopedia vs Traumatologia

- Evento traumatico **recente** → calendario **Traumatologia**
- Quadro **cronico / degenerativo**, senza trauma recente → calendario **Ortopedia**
- Se il contatto non indica se c’è stato un trauma recente, la domanda di chiarimento reception è: «È dopo un trauma, una caduta o un infortunio recente?»

### Fuori perimetro (non prenotabili qui)

Branche e servizi **non** disponibili in SPOKI CLINIC in questa demo: cardiologia, dermatologia, ginecologia, pediatria, neurologia, oculistica, laboratorio, imaging, pronto soccorso interno. In questi casi: SPOKI CLINIC non offre quella prestazione; non prenotare su nessuno dei cinque calendari.

## Emergenze

Non prenotare un appuntamento ambulatoriale. Indirizzo a **118** o **Pronto Soccorso** ospedaliero (nessuna valutazione clinica da parte dell’assistente) in presenza di, tra gli altri:

- dolore toracico, difficoltà respiratoria grave
- trauma grave, deformità evidenti, incapacità di caricare un arto dopo trauma importante
- perdita di coscienza, confusione acuta, deficit neurologico improvviso (forza/sensibilità)
- emorragia importante, ferita profonda con tessuti esposti
- qualsiasi situazione che la persona descrive come emergenza o urgenza immediata

## Out of scope

- Diagnosi, terapie, farmaci, dosaggi, interpretazione di referti o immagini
- Consigli medici o “cosa dovresti fare clinicamente”
- Inventare disponibilità, prezzi, sedi, branche o orari non presenti in questa KB
- Confermare una visita senza esito positivo del tool di calendario della branca corretta
