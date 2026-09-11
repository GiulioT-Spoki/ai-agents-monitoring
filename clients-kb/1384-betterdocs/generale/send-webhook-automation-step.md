---
title: Send Webhook &#8211; Automation Step
slug: send-webhook-automation-step
author: Cosimo Franco
date: 2025-10-24
modified: 2025-10-24
word_count: 756
categories: 
url: https://support.spoki.com/docs/uncategorized/send-webhook-automation-step/
---

# Send Webhook &#8211; Automation Step

## Overview

The **Send Webhook** step calls an external HTTP endpoint from your automation. You can choose the HTTP method, set headers, build a JSON payload (with variables), and optionally save parts of the response back into contact/custom fields.

## When to Use

✅ Integrate with external CRMs/ERPs/payment systems✅ Trigger downstream workflows (Zapier/Make/custom APIs)✅ Enrich contact data from third‑party sources✅ Log events or analytics in your data platform

## How to Add the Step

1. In the automation builder, click "Add Action" or the "+" button
1. Choose "Send Webhook"

## Configure the Step

The configuration has four parts: URL & method, headers, payload, and response mapping.

### 1) URL & Method (Required)

- Method: GET, POST, PUT, PATCH, DELETE
- URL must be present and must not contain spaces
- You can inject dynamic values using custom fields into the URL with %%FIELD_CODE%%

Examples:

- https://api.example.com/contacts?email=%%EMAIL%%
- https://api.example.com/orders/%%ORDER_ID%%

Validation messages will appear if the URL is empty or contains spaces.

### 2) Headers

- A default header Content-Type: application/json is pre‑filled
- Add/edit headers in the Edit tab; empty headers are auto‑removed in Preview
- You can insert dynamic values with %%FIELD_CODE%% (e.g., Authorization: Bearer %%API_TOKEN%%)

### 3) JSON Payload (for POST/PUT/PATCH)

- For POST, PUT, and PATCH you can edit a JSON payload with autocomplete/validation
- Two tabs: Edit (monaco JSON editor with schema hints) and Preview (computed view)
- Use the "Add entities" helper to insert common properties quickly

Property helper inserts canonical keys:

- Contact object: "contact": "{{ contact }}"
- Contact fields: "contact__email": "{{ contact.email }}"
- Custom fields: "custom_field__CUSTOM_CODE": "{{ %%CUSTOM_CODE%% }}"
- Other entities: "automation" | "context" | "metadata"

You can also hand‑craft JSON and mix variables, e.g.:

`{
 "email": "{{ contact.email }}",
 "order_id": "{{ %%ORDER_ID%% }}",
 "campaign": "{{ context.campaign }}",
 "note": "Lead {{ %%FIRST_NAME%% }} from {{ %%CITY%% }}"
}
`
For `GET` and `DELETE`, the payload section is hidden; use query parameters instead.

### 4) Save Response to Fields (Optional)

- Add rows specifying what part of the JSON response to save and where
- Response paths must start with data (e.g., data.id, data.user.email)
- Map each path to a destination field: a contact field (FIRST_NAME/LAST_NAME/EMAIL) or a custom field code
- Only rows with both a valid data path and a destination are saved

Preview shows a compact summary of the mappings you configured.

## Validation Rules

- URL: required, no spaces
- JSON: must be valid (editor shows errors)
- Headers: each row needs both key and value
- Response mapping: responseField must start with data and have a destination

Submit button activates only when the step is valid.

## Practical Examples

### 1) Create/Update Contact in CRM

```
`Method: POST
URL: https://crm.example.com/api/contacts
Headers: Authorization: Bearer %%CRM_TOKEN%%
Payload:
{
 "email": "{{ contact.email }}",
 "first_name": "{{ contact.firstname }}",
 "last_name": "{{ contact.surname }}",
 "phone": "{{ contact.telephone }}",
 "ltv": "{{ %%LTV%% }}"
}
Save response:
- data.id → CUSTOM FIELD: CRM_CONTACT_ID
`
```
### 2) Check Payment Status

```
`Method: GET
URL: https://payments.example.com/api/orders/%%ORDER_ID%%
Headers: Authorization: Bearer %%PAYMENT_TOKEN%%
Save response:
- data.status → CUSTOM FIELD: PAYMENT_STATUS
- data.amount → CUSTOM FIELD: LAST_PAYMENT_AMOUNT
`
```
### 3) Log Event

```
`Method: POST
URL: https://logs.example.com/events
Payload:
{
 "type": "automation_step",
 "automation": "{{ automation }}",
 "contact": "{{ contact }}",
 "metadata": "{{ metadata }}"
}
`
```

## Best Practices

- Security: Put secrets in headers or protected fields, not in URLs
- PII: Avoid sending unnecessary personal data; follow your privacy policy
- Idempotency: Include idempotency keys for POST requests if your API supports them
- Resilience: Save important response IDs (e.g., data.id) to custom fields for later steps
- Observability: Add tags/notes after webhook for easier tracing

## Troubleshooting

### JSON invalid / button disabled

- Fix JSON errors in the Edit tab; Preview must show a valid result

### Mapping not saved

- Ensure each row has a data... response path and a destination field

### URL validation error

- Remove spaces and ensure the URL is not empty; use %%FIELD_CODE%% variables instead of string concatenation

### Headers ignored

- Empty header rows are removed in Preview; ensure both key and value are set

### Payload not shown

- Payload is available only for POST/PUT/PATCH; for GET/DELETE use query params