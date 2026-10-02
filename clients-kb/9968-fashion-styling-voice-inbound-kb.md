# SPOKI FASHION SHOP — Knowledge base (fashion styling voice inbound demo)

Demo KB for Voice — Fashion styling + boutique visit (account 9968). Facts only. Do not invent pieces, prices, or pairings outside this file and the linked CSVs.

**Catalogue (pieces + prices):** `clients-kb/9968-fashion-styling-catalogue.csv`  
**Pairings:** `clients-kb/9968-fashion-styling-pairings.csv`  

Upload both CSVs to Spoki together with this document (export this file as `.txt`). Speak prices only as in the catalogue CSV (round figures; Italian thousands with a dot when saying amounts aloud, e.g. mille duecento euro for 1200).

## Company

- Brand name: SPOKI FASHION SHOP
- Legal name: Spoki Fashion Shop Srl (demo)
- Positioning: contemporary high fashion boutique — tailored ready-to-wear, evening, outerwear, shoes, and accessories
- Channel: flagship boutique plus this inbound voice style advisor
- What the assistant does: style advice and outfit pairings from the catalogue CSV; books a boutique visit to try pieces on
- Out of scope: payment on the call, shipping checkout, custom atelier commissions in the first call, other brands not listed in the catalogue CSV

## Boutique

- City: Milan
- Address (demo): Via della Moda 12, 20121 Milan
- Visiting hours for booked try-on appointments: Monday–Friday, 09:00–18:00 Europe/Rome
- Saturday walk-in browsing: 10:00–14:00 Europe/Rome — **booked try-on slots via the voice assistant are weekdays only**
- Closed Sunday
- Visit length for a booked styling / try-on slot: **15 minutes**
- On visit: a stylist prepares the recommended pieces in the fitting room; no obligation to buy
- Languages in boutique: Italian, English, Spanish

## How try-on works

- Booked visits are for trying the recommended look (and close alternatives in the same size range)
- Bring a reference photo or note of the occasion if helpful
- Changes and returns on purchased items: 14 days, tags on, unworn; sale items final sale
- Exact size availability is confirmed in boutique — do not promise a size is in stock on the call

## Look lanes (facts)

Lanes are about silhouette and wardrobe, not a spoken gender question. Never ask if the caller is a man or a woman. Piece and pairing `lane` values live in the CSVs (`menswear` | `womenswear` | `unisex`).

**Lane signals (examples):**
- **womenswear:** dress, abito, tubino, pumps, clutch, gift “for her”, evening column / fluid dress
- **menswear:** completo, giacca e pantaloni, camicia, mocassini / loafer as main shoe, gift “for him”, business suit framing
- **unisex / day tailored (default if ambiguous):** office / business casual without dress vs suit cues; blazer + trousers; bomber; sneakers; belt refresh

**Selection rule:**
1. If signals point to a lane, recommend pairings from the pairings CSV with that `lane` (or unisex pairings that fit the occasion). Resolve `piece_skus` against the catalogue CSV for names and prices.
2. If signals are mixed or missing, prefer **unisex / day tailored** — Pairing C (code `C`) or Pairing D (code `D`) — or Pairing F (code `F`) if budget is under about €300.
3. Speak about pieces and silhouette (completo, abito, pezzi separati), never “look da uomo / look da donna” as clinical labels.
4. Recommend only combinations listed in the pairings CSV (or a clear subset of pieces from one pairing). Do not invent SKUs or prices.

## Soft budget guidance (facts for advice only)

- Soft comfort band for a full look: from about **€400** upward (typical total look about **€500–€1.000**)
- Under **€300** spoken budget: prefer Pairing F or a single hero piece from the catalogue CSV plus boutique visit to explore
- Undisclosed budget alone does **not** block a boutique visit
- Exact quote and size: only in boutique — do not invent a custom price
- Pairing soft totals are in `budget_total_eur` on the pairings CSV (round figures only; inspired by contemporary Italian mid-premium retail, not haute couture)

## FAQ

**Do I have to buy on the visit?**  
No. The visit is to try the recommended pieces; purchase is optional.

**Can you ship instead of a visit?**  
This demo assistant books boutique try-on visits only. Shipping is handled separately after purchase in boutique or by staff.

**Do you have menswear and womenswear?**  
Yes: see `lane` on the catalogue and pairings CSVs. Evening dresses and pumps are womenswear; tailored completo pieces lean menswear; several outerwear, sneakers, and belts are unisex. Choose the pairing whose lane matches the caller signals; if signals are missing, use unisex / day tailored (C or D). Do not invent pieces outside the catalogue CSV.

**Where are you based?**  
Milan boutique, Via della Moda 12 (demo address).

**Which languages?**  
Italian, English, and Spanish for this demo setup.
