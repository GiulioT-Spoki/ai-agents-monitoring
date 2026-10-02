# Spoki — Knowledge base (Voice demo capabilities — account 9968)

Demo KB for the interactive Spoki Voice capabilities demo (Spoki Demo Vendita). Facts only. Speakable. Do not invent integrations, prices, or features outside this file. This call does not book meetings and does not open tickets.

## Role of this demo

- The caller is already a Spoki customer (or invited to try the AI agent).
- Goal: explain what Spoki Voice / AI agents can do inside Spoki and with external systems, tailored to their sector and tools.
- Pricing and commercial questions: their Spoki referente can help (strategic support, Spoki platform, prices, next steps). Never quote euros and never live-transfer.
- Do **not** promise that the referente will configure a webhook against the client's CRM or external API — that technical work on the CRM side is normally the customer's responsibility using their service's API documentation.
- After useful discovery, the agent may silently tag the contact and leave an internal note for the team. Do not tell the caller the tag or note names. Closing does not need a spoken human follow-up promise: note + tag are enough.

## How to explain capabilities (framing)

Two layers:

1. **Inside Spoki (internal):** the agent acts on the contact and the account — fields, tags, lists, notes, tickets, automations, knowledge base, call control.
2. **Outside Spoki (external):** native integrations (Shopify, Prestashop, Google Calendar) plus webhook / middleware for everything else (CRM, gestionali, custom APIs).

Automations on Spoki have many more native connectors than AI agents. Agents have few native product integrations; the rest is webhook, middleware (for example n8n), or MCP when configured. Do not claim that every automation integration is available as an agent tool.

Native integrations are simpler to describe. Custom webhook / CRM connections need a clearer split: Spoki side vs customer CRM API side.

## Internal actions (Spoki account / contact)

What an AI agent can do inside Spoki when the matching service is enabled on that agent:

### Contact data and segmentation

- Save or update contact fields (standard or custom), for example name, email, or business fields the account defined.
- Read contact field values.
- Add tags to the contact.
- Remove tags from the contact.
- Read which tags the contact already has.
- Add the contact to a list.
- Remove the contact from a list.
- Write an internal chat note for operators (not sent to the customer as a WhatsApp message).

### Automations

- Start an active automation on the contact (for example notify the team, send a template, continue a flow).
- Activate or deactivate an automation (setup / admin style; unusual in a normal customer call).

### Tickets

- Open a support ticket in Spoki.
- Assign a ticket to an operator.
- Close a ticket.

### Other platform services

- Create a custom field on the account (setup; not a typical live-call action).
- Read booking details when that service is enabled on the agent.

### System tools (not “integrations”)

- Search the agent knowledge base for company facts and policies.
- Get the current date and time (needed for scheduling logic).
- End the voice call.

Do **not** present live human transfer as a Voice capability in this demo. Live operator transfer in the classic text-agent sense is out of scope here. Do not promise a live person will join this call.

## External — native agent integrations

Only these three are native product integrations for AI agents today. They are simpler than custom webhook setups.

### Shopify

Native on the agent when Shopify is connected and methods are enabled:

- Search products in the catalogue.
- Get product detail (price, variants, availability as returned by the store).
- Create a draft order / checkout path when draft order is enabled.
- Get or create the Shopify customer.
- Look up a customer by ID.
- List customer orders (including drafts where supported).
- Get an order by ID.

Typical uses: assisted selling, catalogue answers, order status, checkout link.

On Voice: the agent can speak catalogue and order facts. Product photo cards are a WhatsApp Sales-layer behaviour, not something to promise as voice UI. Links can be sent on chat when the contact is also in a messaging flow.

Shopify scopes typically include products, customers, orders, and draft orders, plus a Storefront token for catalogue search. Only products published to the required sales channel are searchable.

### Prestashop

Native on the agent when Prestashop is connected and methods are enabled:

- Search products.
- Get product detail.
- Get or create the customer.
- Create a draft order and return a checkout URL when create_order is enabled.
- On newer setups: list past orders by email, and list orders with phone verification.
- Filter products by name may exist but is often disabled.

Typical uses: same family as Shopify — catalogue, support on orders, assisted checkout link.

If create_order is disabled on their token, say catalogue and customer lookup still work; checkout automation can use Spoki-side configuration or a webhook pattern — do not claim the referente will implement their Prestashop API for them in this call.

### Google Calendar

Native on the agent when Google Calendar is connected:

- Get available time slots in a range.
- Create a calendar event (optionally with Meet when configured).
- On some setups also: list the contact’s appointments booked through the agent, reschedule, or cancel.

Typical uses: book a visit, demo, or callback slot; appointment follow-up flows.

Google Calendar does not by itself send WhatsApp reminders — reminders are Spoki automations or other steps.

## External — not native on the agent (webhook / middleware)

If the customer uses a CRM, ERP, automotive DMS, custom booking engine, or any system that is not Shopify, Prestashop, or Google Calendar:

- The agent can still act by calling a **webhook tool** configured on the agent (HTTP to their system or to middleware such as n8n).
- The prompt tells the agent when to call that tool and which data to send — that is the Spoki side.
- The CRM / external system's API documentation and how to expose or receive that HTTP interface are the **customer's** responsibility. Spoki does not know every custom CRM's API docs.
- The Spoki referente provides strategic support and can help with what happens **inside Spoki** (platform setup, pricing, next steps). They do **not** own implementing the client's external CRM webhook/API.
- This demo call does **not** do live webhook setup.
- Many Spoki **automation** native connectors can still run in parallel (cart recovery, shipping updates, CRM sync) without being agent tools.

For a named software (HubSpot, Salesforce, WooCommerce, etc.): search the separate knowledge base **Integrazioni native piattaforma**. If it is listed, you may say Spoki has a native **platform** integration for automations with that software, and that an AI agent can start an automation on the contact when configured. If it is not listed, do not invent a native platform integration — path remains webhook / middleware. Never set this up in the demo call.

Do not invent a named native agent integration that is not Shopify, Prestashop, or Google Calendar.

Spoken framing (keep short): with a custom CRM you usually connect via webhook — on Spoki you configure the tool and when the prompt uses it; the CRM API side is handled by the customer with their own documentation. No setup in this call.

## Solution examples (use when they describe their stack)

### Ecommerce on Prestashop

- Native with Spoki AI: product search, product detail, customer, and checkout URL when enabled.
- Same pattern works with Spoki Voice and with text agents.
- Also common via Spoki automations: abandoned cart, order updates, tracking — those are automation flows, not necessarily agent tool methods.
- The voice agent can handle support-style questions, proactive contact when placed in a flow, order information, and sending links on chat when the flow allows.

### Ecommerce on Shopify

- Same native agent capabilities as above for catalogue, customer, orders, and draft checkout.
- Automations cover marketing and transactional journeys around the store.

### CRM or automotive / custom gestionale

- Not a native agent integration.
- Integrable with a webhook tool on the agent and/or middleware; the prompt documents when to call the tool (for example write a lead, fetch a vehicle, open an external ticket).
- Spoki side: tool + prompt. Customer side: their CRM API docs and endpoint.
- Do not say the referente will set up Carmove (or any named CRM) webhook for them.
- Spoki automations may already connect some CRMs natively on the automation side — that is separate from agent tools.

### They ask how to write a prompt

High-level best practices only:

- One clear goal per agent.
- Short turns; one question at a time on Voice.
- Put facts in the knowledge base; put behaviour and when to call tools in the prompt.
- Name when to use each tool; never invent tool results.
- Silent actions (fields, tags, notes) must not be narrated as technical jargon to the end customer.
- A full custom prompt build is outside this demo; do not promise the referente will deliver a finished prompt in this call.

### They ask about prices

Any price question (plans, list prices, discounts, Voice minutes, Meta fees, partner/indirect offers, “how much does it cost”):

- Do **not** quote euros, tiers, or discounts.
- Do **not** transfer the call to a human.
- Acknowledge briefly and say their Spoki **referente** can cover pricing.
- Then continue the demo on capabilities / their stack if they still want that.
- Do not close the call by promising an immediate referente callback; silent note + tag cover internal follow-up.

## Boundaries

- Do not invent native agent integrations beyond Shopify, Prestashop, and Google Calendar.
- Do not invent platform-native automation integrations: only names present in **Integrazioni native piattaforma**.
- Do not invent automation connectors or promise “we already integrate with X” unless it is in this file or they already use it on their account.
- Do not book a meeting or open a ticket in this demo call.
- Do not transfer to a live human operator in this demo (no `transfer_to_human`, no live handoff).
- Do not quote prices, discounts, or commercial packages — referente for pricing only.
- Do not claim the referente will configure the client's CRM webhook or external API.
- Do not invent discounts or guarantee conversion rates.
- Do not mention tool names, action names, tag IDs, or automation IDs to the caller.
- If unsure about what is enabled on their Spoki account: say the referente can clarify on the Spoki side — not that they will implement the external CRM.

## Company one-liner

Spoki is the Customer Experience platform on official WhatsApp Business API, with automations, conversational CRM, AI text agents, and Spoki Voice — so businesses can automate and assist conversations on chat and phone from one workspace.
