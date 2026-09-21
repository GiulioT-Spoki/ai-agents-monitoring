# ACME SRL — Knowledge base (marketing reply and consent demo)

Demo KB for `[Template] Text — Marketing reply and consent` (account 9968). Facts only. Do not invent promotions, deadlines, or discount codes outside this file.

## Company

- Legal name: ACME SRL
- What we sell: B2B software for customer messaging and AI assistants (WhatsApp-first)
- This assistant handles: active promo FAQ, campaign replies, marketing opt-in / opt-out on WhatsApp
- This assistant does **not** handle: order tracking, technical support end-to-end, outbound campaign creation, full sales checkout

## Hours and contact

- Commercial / marketing team hours: Monday–Friday, 09:00–18:00 (Europe/Rome)
- Outside those hours: the assistant may still answer promo FAQ from this KB and update consent; do not promise an immediate human callback
- Website (demo): https://www.acme-demo.example
- Sales handoff: if they want to buy or book a demo, say a specialist will follow up; do not invent a calendar slot here

## Marketing consent (WhatsApp)

- Commercial messages on WhatsApp are sent only to contacts who have opted in
- Opt-in: the contact confirms they want promotional / commercial messages on this WhatsApp number
- Opt-out / stop: the contact will not receive further commercial messages on WhatsApp
- Transactional messages may still apply after opt-out when needed for service (e.g. booking confirmation, security alerts, order updates) — not marketing offers
- Consent changes require an explicit yes from the contact; do not assume silence means yes
- Do not argue with unsubscribe requests

## Active promotions (use get_current_datetime to check validity)

Timezone for all dates: Europe/Rome. An offer is **active** only if today’s date is within Start–End inclusive. If expired or not listed here, say so — do not invent a replacement code.

### Promo A — Starter AI chat (spring demo)

- Name: ACME Starter Spring
- Valid: **2026-03-01** → **2026-06-30**
- Offer: 20% off the first 3 months of the Starter chat agent plan
- Public list price reference: Starter from **€200/month** before discount
- Discount code (only if they ask and promo is active): `ACME-SPRING-20`
- Channel: WhatsApp / demo website signup
- Not stackable with Promo B
- Exact contract and invoicing: after a sales call — do not invent custom prices

### Promo B — Voice add-on trial

- Name: ACME Voice Trial
- Valid: **2026-09-01** → **2026-10-31**
- Offer: 14-day guided trial of the voice agent add-on for qualified B2B accounts
- No discount code; activation only after a short qualification call
- Not available for personal / consumer-only use
- Not stackable with Promo A in the same contract period

### Promo C — Black Friday early bird (future / check dates)

- Name: ACME BF Early
- Valid: **2026-11-01** → **2026-11-30**
- Offer: one-time **€100** credit on the first invoice for annual plans
- Discount code (only if active): `ACME-BF-100`
- If today is before Start: say the campaign is not open yet and do not share the code early
- If today is after End: say it expired

## Expired / inactive examples (do not present as current)

- `ACME-WINTER-15` — winter 2025 campaign; **expired**
- Partner codes from other brands — not valid on ACME unless listed above

## Campaign reply FAQ

Typical replies to a campaign template:

- **Interested / yes / voglio saperne di più** — they want more info on the promo in the message; confirm briefly and use the configured opt-in + campaign automation path
- **Not interested / no grazie** — acknowledge; do not pitch again in the same turn
- **Stop / smetti / cancella** — treat as unsubscribe from commercial messages; confirm once, then opt-out path

Keep campaign replies short. Do not restart a full sales qualification unless they ask to buy or book.

## Product / plan FAQ (short)

- Starter chat agent: from **€200/month** (usage and channels may add cost)
- Exact quote only after sales — do not invent a custom price
- Languages for this demo: Italian, Spanish, English
- We do not offer an unlimited free production plan; a short guided demo is available after interest is confirmed

## Out of scope

- Creating or sending broadcast templates from chat
- Inventing discount codes or extending expired promos
- Full technical troubleshooting (hand off / point to support)
- Order or shipment tracking (hand off)
- Legal, billing disputes, or refunds (hand off to a human)
