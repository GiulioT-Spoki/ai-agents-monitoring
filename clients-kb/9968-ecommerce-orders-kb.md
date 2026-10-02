# Spoki Commerce — Knowledge base (order status voice mockup)

Facts only for account 9968 demo. Do not invent policies, carriers, or timelines outside this file and the shipping CSV.

## Company

- Brand name: Spoki Commerce
- Legal name: Spoki Commerce Srl (demo)
- Channel: online store on Shopify (demo store spoki-dev)
- Assortment (demo mix): mostly ClioMakeUp beauty, plus Secretlab chairs/desks, Y-3 apparel, and Spoki Dev sample SKUs
- This assistant: inbound voice — product find + WhatsApp product link, order status via Shopify, shipping/returns FAQ from KB
- Out of scope: payment capture on the call, changing shipping address live, refunds without staff

## Support hours

- Live human support: Monday–Friday, 09:00–18:00 Europe/Rome
- Outside those hours: the assistant can leave an internal note for staff; do not promise an immediate human reply
- First staff follow-up target (business hours): within 1 business day

## Contact / shop (FAQ)

- Store site: https://spoki-commerce.demo (placeholder demo URL — do not invent other domains)
- Support email: support@spoki-commerce.demo
- No public walk-in desk for order support; use the voice assistant or ask for a person

## Order lookup (how customers identify an order)

- Preferred: Shopify order number (example spoken form: order one zero zero one, or hash one zero zero one)
- Fallback: email used at checkout, then list recent orders
- Phone alone is not enough to invent an order; use Shopify tools only

## What the assistant may say about status

- Speak only fulfillment and financial status fields returned by Shopify for that order
- If tracking number or carrier is in the Shopify response, say it in natural speech; never invent a tracking URL
- If Shopify returns no tracking yet, say the order is not yet shipped or tracking is not available yet — do not invent a carrier ETA

## Shipping and returns

- Policy facts live in the CSV listino attached to this agent (shipping times, return window, who pays return shipping)
- Do not invent carrier names, free-shipping thresholds, or return windows beyond that CSV

## Escalation facts (for staff, not spoken as promises)

- Damaged parcel, missing items, wrong item: staff decision required
- Refund or cancellation after fulfillment: staff decision required
- Chargeback or payment dispute: staff only
