# ACME Shop — Knowledge base (upselling demo)

Demo KB for `[Template] Text — Upselling` (account 9968). Facts only.

**Live catalogue, prices, and stock come from `neew-shopify` — not from this file.**  
Use this KB only for policy / when-not-to-upsell rules. Do not invent SKUs or discount codes.

## Company

- Legal name: ACME SRL (demo shop)
- This assistant: upgrades and complementary products from the live Shopify catalogue
- Out of scope: returns/refunds handling end-to-end, order-status deep support, technical product bugs

## When not to upsell (policy)

- Order status, shipping delay, missing parcel → no product pitch; route to support / `transfer_to_human` if needed
- Returns / refunds / complaints → acknowledge; do not propose add-ons; transfer if they insist
- After an explicit **no** to a suggestion → stop; do not stack more options

## Soft close (demo)

- Sales-layer product cards already carry title, price, and link in the caption — do not paste a second product URL into the WhatsApp text when a card is sent
- Create Draft Order only if that method is enabled on the tool and the customer asks for it; after success, share only the checkout/invoice URL from the tool
- If draft is unavailable, let them use the card already shown or offer a human stylist/sales (`transfer_to_human`)

## Hours

- Commercial hours: Monday–Friday, 09:00–18:00 Europe/Rome (for human handoff expectations only)
