# 55247 Centro Gomme — Indice KB

## File

| File | Ruolo |
| --- | --- |
| [`55247-centro-gomme-kb.md`](55247-centro-gomme-kb.md) | KB narrativa (sede, orari, form preventivo, sintesi FAQ) |
| [`55247-centro-gomme-kb-faq.md`](55247-centro-gomme-kb-faq.md) | FAQ completa (pneumatici / stagioni / cerchi NAD) |
| [`55247-centro-gomme-listino.csv`](55247-centro-gomme-listino.csv) | Servizi (/servizi/) + prezzi listino; senza URL |

Prompt: [`../clients-prompt/55247-centro-gomme-del-prato-voice.md`](../clients-prompt/55247-centro-gomme-del-prato-voice.md)

## In KB ora

- Sede / contatti / orari Lun–Ven
- Preset form preventivo
- FAQ
- Catalogo servizi + listino € → CSV (inclusi TPMS, meccanica, carrelli senza prezzo)

## Ancora non in KB (sito)

| Pagina | Cosa manca | Priorità voice |
| --- | --- | --- |
| [/promozioni/](https://centrogommeosio.com/promozioni/) | Q8 / Fidaty / garanzia / sconti aziende Pirelli / MAK / usato | Media (validare date) |
| [/cerchi-in-lega/](https://centrogommeosio.com/cerchi-in-lega/) | Brand MAK GMP OZ; inch-up; form marca/modello/anno + pollici 15–22 | Media (parziale via FAQ NAD) |
| [/noleggio-autovetture/](https://centrogommeosio.com/noleggio-autovetture/) | Es. Nissan Qashqai; form date noleggio | Bassa |
| [/convenzioni/](https://centrogommeosio.com/convenzioni/) | Convenzioni autonoleggio (pagina sottile) | Bassa |
| [/azienda/](https://centrogommeosio.com/azienda/) | Staff (Roberto, Mirko, Mattia, Marco); storia 1986 | Bassa |
| Footer | P.IVA 01712150166; SDI T04ZHR3 | Bassa |
| Listino | Prezzo TPMS se non pubblicato | Gap → staff |
| [/fissaunappuntamento/](https://centrogommeosio.com/fissaunappuntamento/) | Booking online | Fuori scope AI |

## Sync Spoki

1. Upload `55247-centro-gomme-kb.md`
2. Upload `55247-centro-gomme-kb-faq.md`
3. Upload `55247-centro-gomme-listino.csv`
4. Dopo cambio listino sul sito: aggiornare solo il CSV
5. Dopo cambio FAQ sul sito: aggiornare `kb-faq.md` + sintesi date nella KB narrativa
