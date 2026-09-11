---
title: Send Webhook to Make &#8211; Automation Step
slug: send-webhook-to-make-automation-step
author: Cosimo Franco
date: 2025-10-24
modified: 2025-10-24
word_count: 472
categories: 
url: https://support.spoki.com/docs/uncategorized/send-webhook-to-make-automation-step/
---

# Send Webhook to Make &#8211; Automation Step

## Overview

The **Send Webhook to Make** step sends a POST request to a Make (formerly Integromat) webhook URL. Use it to trigger Make scenarios from your automation and pass contact/automation data as JSON.

## Prerequisites

- A Make scenario with a Webhooks module configured to receive a custom webhook
- The generated Make webhook URL (typically https://hook.<region>.make.com/<id>)

## How to Add the Step

1. In the automation builder, click "Add Action" or the "+" button
1. Choose "Send Webhook to Make"

## Configure the Step

### Webhook URL (Required)

- Paste the Make webhook URL
- The step becomes valid when a link‑shaped string is provided (full URL recommended)

### Test Connection

- Click Test connection to send a sample payload to your Make webhook
- The UI displays success or error immediately so you can verify connectivity

### Payload Preview

- Below the URL, you’ll see the JSON payload schema that Spoki will POST to Make
- It includes automation context, contact details, and custom fields (depending on what you use)

Example structure (illustrative):

`{
 "automation": "{{ automation }}",
 "contact": "{{ contact }}",
 "context": "{{ context }}",
 "metadata": "{{ metadata }}",
 "contact__email": "{{ contact.email }}",
 "contact__firstname": "{{ contact.firstname }}",
 "contact__surname": "{{ contact.surname }}",
 "custom_field__ORDER_ID": "{{ %%ORDER_ID%% }}",
 "custom_field__CITY": "{{ %%CITY%% }}"
}
`

## What Gets Sent

- Method: POST
- URL: Your Make webhook URL
- Headers: Content-Type: application/json
- Body: JSON payload as shown in the schema preview

In Make, use the Webhooks module → Custom webhook to capture the payload and map fields to subsequent modules (e.g., Google Sheets, CRMs, internal APIs).

## Best Practices

- Test first: Use the Test connection button while the Make scenario is listening
- Minimize PII: Send only the fields you need; comply with your privacy policy
- Standardize codes: Keep custom field codes stable so your Make mapping doesn’t break
- Store response IDs: If your scenario returns IDs by subsequent webhooks, save them to custom fields for traceability
- Add notes/tags: Document the handoff (sent_to_make) for easy auditing

## Interactions With Other Steps

- Populate Contact Field – Prepare values before sending to Make
- If / Else – Trigger Make only in specific conditions
- Send Webhook – For direct API calls, prefer the Webhook step; for no‑code orchestration, use Make

## Troubleshooting

### Test connection failed

- Ensure the Make scenario is in listening mode
- Verify the webhook URL (copy/paste without whitespace)
- Check Make’s execution log for errors

### Make didn’t receive data

- Confirm the automation actually executed this step
- Verify URL correctness and network availability

### Fields missing in Make

- Make learns fields from sample payloads; click Run once in Make and send a test
- Ensure custom field codes exist and are spelled correctly