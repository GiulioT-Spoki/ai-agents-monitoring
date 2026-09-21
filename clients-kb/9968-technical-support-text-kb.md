# ACME SRL — Knowledge base (technical support demo)

Demo KB for `[Template] Text — Technical Support` (account 9968). Facts and procedures only. Do not invent steps outside this file.

## Company

- Legal name: ACME SRL
- Product: B2B WhatsApp messaging and AI assistants (web dashboard + WhatsApp channel)
- Support covers: login, message delivery, agent replies, knowledge-base upload, basic integrations
- Support does **not** cover: custom software development, hardware, competitor products, legal advice

## Support hours and SLA

- Live support hours: Monday–Friday, 09:00–18:00 (Europe/Rome)
- Outside those hours: the assistant may continue KB troubleshooting and can open a ticket; do not promise an immediate human reply
- Ticket first response target (business hours): within **1 business day**
- Refunds / credits / commercial discounts: not handled by technical support — escalate to a human or sales

## How to collect a good report (for the assistant)

Ask one item at a time if missing:

1. Product area (dashboard login, outbound WhatsApp message, inbound reply, AI agent, KB upload)
2. Approximate time when it started (date + hour, Europe/Rome)
3. Exact error text or screenshot description
4. Browser / app version if relevant (Chrome, Safari, mobile WhatsApp)
5. Steps already tried

## Procedure A — Cannot log in to the dashboard

Follow in order. Wait for the user result after each critical step.

1. Confirm they use the email of the ACME account owner or invited user (not a personal Gmail unless invited).
2. Ask them to open the login page in a private/incognito window and try again.
3. If they forgot the password: use “Forgot password” on the login page; the reset email arrives within a few minutes. Check spam.
4. If the reset email never arrives: confirm the email spelling; if still failing after 15 minutes, escalate (ticket).
5. If they see “Account suspended” or “Access denied”: do not try further self-serve — escalate (ticket).

## Procedure B — WhatsApp message not delivered (outbound)

Follow in order.

1. Confirm the destination number includes country code (Italy: +39…).
2. Confirm the WhatsApp channel / number in ACME shows status **Connected** in Settings → Channels.
3. If status is Disconnected / Error: reconnect the channel following the on-screen QR / Meta link. Retry send after Connected.
4. If Connected but message stays Pending > 5 minutes: check Meta / WhatsApp Business quality alerts in the channel panel. If a quality block is shown, escalate (ticket) — support cannot override Meta blocks from chat.
5. If the contact opted out or blocked the business: delivery will fail; explain that ACME cannot force delivery. No further reboot steps.

## Procedure C — AI agent does not reply

Follow in order.

1. Confirm the agent is **Active** (not Draft / inactive) on the agent page.
2. Confirm the conversation is on a channel linked to that agent (WhatsApp number / inbox rule).
3. Confirm the contact is not already handed to a human (transfer_to_human / escalated): if escalated, the AI stays off until a human reopens AI.
4. Ask whether a recent prompt or KB change was saved; if yes, wait ~1 minute and send a new test message in a **cleared** playground or new chat.
5. If Active + correct channel + not escalated and still silent after two test messages: escalate (ticket) with agent name and approximate time.

## Procedure D — Knowledge base not used / wrong answers

Follow in order.

1. Confirm the document is linked to the agent (Documents / Knowledge on the agent page).
2. Confirm the file type is `.txt` or `.csv` (markdown `.md` uploads are rejected by the platform).
3. Confirm the fact exists in the linked file (no inventing missing prices or policies).
4. Ask them to re-upload a clean `.txt` if the file came from a website scrape with menus/cookies.
5. If the fact is in the linked `.txt` and search still fails after re-link: escalate (ticket).

## Procedure E — Integration webhook fails (HTTP errors)

1. Confirm the destination URL is HTTPS and publicly reachable.
2. Confirm the expected HTTP status from their server is 2xx within 10 seconds.
3. Ask for the approximate failing timestamp and HTTP status code (400 / 401 / 500).
4. 401/403: check API key / signature on their side — ACME support does not share production secrets in chat.
5. Persistent 5xx after they confirm their server is healthy: escalate (ticket) with timestamp and status code.

## When to open a ticket (after KB path)

Open a ticket only if the user explicitly confirms, after a short summary, and when:

- A procedure above ends on “escalate (ticket)”, or
- KB has no matching procedure, or
- The user is angry / reports payment or legal dispute (prefer human transfer when available)

Ticket summary should include: product area, error text, time started, steps already tried, contact email.

## Out of scope (do not invent)

- Sales quotes, plan upgrades, promo codes
- Order shipping / courier tracking as a primary job
- Changing Meta Business Manager ownership for the customer
- Guaranteeing delivery times against WhatsApp/Meta outages
