# Il Mio Villaggio 3469 — Indice KB (uso interno, non caricare in Spoki)

> Metadati debug. **Non** caricare questo indice in Spoki.
> Limite FE Spoki: **≤16 000 caratteri** per documento **testo**. I CSV tabellari non sono soggetti al limite: Spoki li indicizza per riga (stesso pattern di CASP 53298 e dei listini Calatafimi 34768).
> Export Spoki: in Downloads usare **`.txt`** (mai `.md` — Spoki rifiuta gli upload markdown). In repo i fatti restano `.md`.

## Contesto

- **Account Spoki:** 3469
- **Cliente:** Il Mio Villaggio (IlMioVillaggio.it — marchio di Ekiwi S.r.l.)
- **Layer A:** KB ufficiale processi (PDF → markdown KB01–06)
- **Layer B:** catalogo strutture, **un solo CSV** con una riga per sezione di scheda

## Caricare in Spoki (7 documenti)

### Layer A — Operativo (processi)

| File | Caratteri |
| --- | ---: |
| [`3469-il-mio-villaggio-kb-01-identita-ruolo-servizi.md`](3469-il-mio-villaggio-kb-01-identita-ruolo-servizi.md) | 4329 (OK) |
| [`3469-il-mio-villaggio-kb-02-contatti-reparti-orari.md`](3469-il-mio-villaggio-kb-02-contatti-reparti-orari.md) | 2868 (OK) |
| [`3469-il-mio-villaggio-kb-03-preventivi-prenotazioni.md`](3469-il-mio-villaggio-kb-03-preventivi-prenotazioni.md) | 6432 (OK) |
| [`3469-il-mio-villaggio-kb-04-sito-area-riservata.md`](3469-il-mio-villaggio-kb-04-sito-area-riservata.md) | 4049 (OK) |
| [`3469-il-mio-villaggio-kb-05-post-prenotazione.md`](3469-il-mio-villaggio-kb-05-post-prenotazione.md) | 5173 (OK) |
| [`3469-il-mio-villaggio-kb-06-dati-preventivi-assistenza.md`](3469-il-mio-villaggio-kb-06-dati-preventivi-assistenza.md) | 5357 (OK) |

### Layer B — Catalogo strutture (1 documento)

- [`3469-il-mio-villaggio-kb-resort-schede.csv`](3469-il-mio-villaggio-kb-resort-schede.csv) — 468 righe, 19 resort, 284 KB
- Colonne: `resort_id, resort, brand, area, sezione, contenuto, prezzo_indicativo, url`
- Una riga per sezione di scheda; ogni riga ripete resort/brand/area/prezzo/url ed è quindi citabile da sola. La riga `Scheda sintetica` di ogni resort serve da routing ("quali villaggi avete in Calabria?").

| Resort | Brand | Area | Righe CSV |
| --- | --- | --- | ---: |
| Serena Majestic Hotel | Bluserena | Abruzzo | 25 |
| Serena Majestic Residence | Bluserena | Abruzzo | 21 |
| Serenè Resort | Bluserena | Calabria | 27 |
| Sibari Green Resort | Bluserena | Calabria | 25 |
| Alborea Ecolodge Resort | Ethra Reserve | Puglia | 24 |
| GranSerena Hotel | Bluserena | Puglia | 26 |
| Kalidria Hotel & Thalasso Spa | Ethra Reserve | Puglia | 28 |
| Torreserena Resort | Bluserena | Puglia | 29 |
| Calaserena Resort | Bluserena | Sardegna | 30 |
| Serenusa Resort | Bluserena | Sicilia | 28 |
| Futura Club Itaca Nausicaa - Offerte Last | Futura Club | Calabria | 26 |
| Futura Club La Praya - Offerte Last | Futura Club | Calabria | 26 |
| Villaggio Acquamarina - Offerte Last | Acquamarina | Campania | 24 |
| TH Marina di Pisticci - Ti Blu Village | TH Resorts | Basilicata | 23 |
| TH Simeri Village | TH Resorts | Calabria | 23 |
| Calanè Resort | Bluserena | Puglia | 31 |
| Is Serenas Badesi Resort | Bluserena | Sardegna | 28 |
| EraOra Hotel Village Paestum | EraOra | Campania | 22 |
| Valentino Village | Ethra Reserve | Puglia | 2 |

## Fallback (caricare solo se Spoki non indicizza bene il CSV)

- 22 schede resort in repo come `.md`; per Spoki esportare `.txt` (già pronti in Downloads `fallback-txt/`)
- [`3469-il-mio-villaggio-kb-catalogo-resort.csv`](3469-il-mio-villaggio-kb-catalogo-resort.csv) — vecchio CSV di routing, va in coppia con le schede testo
- In alternativa: `python3 scripts/build_3469_resort_csv.py --split-by-area` produce un CSV per destinazione invece di un file unico

## Non caricare in Spoki

- Questo indice (`3469-il-mio-villaggio-kb-index.md`)
- `_raw-3469-scrape/` (HTML cache)
- PDF provenance `3469-il-mio-villaggio-kb-0N-*.pdf`
- `3469-il-mio-villaggio-urls-scrape.csv` (lista URL grezza)

## Gap / da ricevere

- Restanti ~34 documenti KB ufficiali (uno alla volta)
- Collection pages `/villaggi/*` non scrapate (UI noise)
- Prompt system Spoki in `clients-prompt/`
- **Valentino Village**: scheda incompleta allo scraping (2 righe), la pagina sorgente espone solo la descrizione — da riscrapare o integrare a mano

## Rigenerare

```
python3 scripts/build_3469_resort_csv.py   # CSV catalogo + questo indice
python3 scripts/check_3469_kb_char_limit.py  # limite 16k sui markdown
```

## Convenzione naming

- Processi: `3469-il-mio-villaggio-kb-{NN}-{slug}.md`
- Catalogo: `3469-il-mio-villaggio-kb-resort-schede.csv`
- Fallback resort: `3469-il-mio-villaggio-kb-resort-{id}-{slug}.md` (+ `-01`/`-02` se chunk)
