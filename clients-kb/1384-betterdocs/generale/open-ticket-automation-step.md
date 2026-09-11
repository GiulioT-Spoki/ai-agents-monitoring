---
title: Open Ticket &#8211; Automation Step
slug: open-ticket-automation-step
author: Cosimo Franco
date: 2026-03-19
modified: 2026-03-19
word_count: 735
categories: 
url: https://support.spoki.com/docs/uncategorized/open-ticket-automation-step/
---

# Open Ticket &#8211; Automation Step

## Overview

The **Open Ticket** step creates a support ticket for the current contact from within your automation. Use it to hand off conversations to your helpdesk workflow with structured details like title, priority, status, category and owner.

## Why Open a Ticket via Automation?

✅ **Operational handoff** – Transfer cases from marketing/sales flows to support✅ **Consistency** – Enforce required ticket fields and naming patterns✅ **Speed** – Create tickets automatically when conditions are met✅ **Traceability** – Keep an auditable record linked to the conversation

## How to Add the Step

1. In the automation builder, click "Add Action" or the "+" button
1. Choose "Open Ticket"

## Configure the Step

The configuration form includes these fields:

### 1) Title (Required)

- Short subject line for the ticket (max 256 chars)
- Supports variables if you build titles in previous steps and pass them in

### 2) Priority (Required)

- Select a priority (Lowest, Low, Medium, High, Highest, Urgent)
- Defaults to Medium

### 3) Status (Required)

- Select an initial status (e.g., Open, In Progress, Pending, Waiting, Resolved, Closed, Terminated)
- List shows both your custom statuses and the platform defaults
- Defaults to Open

### 4) Category (Optional)

- Choose one category for the ticket
- You can also type to create a new category inline

### 5) Owner (Optional)

- Assign to an operator (role) at ticket creation
- Use the operator picker to select a user/role
- Leave empty to create an unassigned ticket

### 6) Description (Optional)

- Rich‑text field (max 1024 chars)
- Recommended for summarizing symptoms, steps to reproduce, or customer notes

### 7) Reference (Optional, variable‑friendly)

- Short reference (max 256 chars) that can include dynamic variables
- Insert custom field codes like %%ORDER_ID%%, %%EMAIL%%
- If you enter plain text without at least one custom field variable, the UI shows a warning to help you avoid unhelpful/static references

The step is valid when Title, Priority, and Status are filled.

## Smart Warnings

- If your automation already has a "Ticket Created" trigger configured, a warning appears to prevent duplicated ticket creation in the same flow
- The Reference field warns when it doesn’t include any variable codes (encourages meaningful, searchable references)

## Practical Examples

### 1) Create Ticket on Failure

`Webhook: sync to CRM
If/Else: webhook_status != 200
 IF true → Open Ticket
 Title: "CRM sync failed for %%EMAIL%%"
 Priority: High
 Status: Open
 Category: Integrations
 Owner: Support L2
 Description: "Error during CRM sync. Details attached in conversation."
 Reference: "SYNC-%%ORDER_ID%%"
 Chat as Unread
`
### 2) Product Issue Escalation

```
`If/Else: message contains "broken" OR "not working"
 IF true → Open Ticket
 Title: "Product issue from %%FIRST_NAME%%"
 Priority: Highest
 Status: Open
 Category: Product → Warranty
 Owner: Hardware Team
 Description: "Customer reported a malfunction. Please review."
 Reference: "WARR-%%ORDER_ID%%"
`
```
### 3) VIP Support

```
`If/Else: tag contains "vip" AND LTV > 10000
 IF true → Open Ticket
 Title: "VIP assistance for %%FIRST_NAME%% %%LAST_NAME%%"
 Priority: Urgent
 Owner: VIP Team
 Description: "Priority support required"
 Reference: "VIP-%%EMAIL%%"
`
```

## Best Practices

- Make titles scannable: Include key identifiers (email, order id, product) via variables
- Set owner intentionally: Route directly to the most relevant team
- Use categories consistently: Create/maintain a clear taxonomy
- Capture context: Add a short description to help the assignee act fast
- Reference with variables: Always include at least one variable in Reference for searchability
- Avoid duplicates: Don’t combine this step with a "Ticket Created" starter for the same condition

## Interactions With Other Steps

- Chat as Unread – Visually flag the conversation after ticket creation
- Add Operator – Assign human owners alongside the ticket owner if needed
- Add Tag – Mark context (e.g., ticket_opened, integration_error)
- Go to Step – Jump to your escalation/triage branch
- Customer Response – Collect extra details before opening, or follow‑up after

## Troubleshooting

### Step is disabled / can’t submit

- Ensure Title, Priority, and Status are provided
- If you see a warning about an existing "Ticket Created" trigger, consider removing one to avoid duplicates

### Reference warning appears

- Add at least one variable placeholder (e.g., %%ORDER_ID%%, %%EMAIL%%)

### Owner not set

- Select a role/user in the Owner field; otherwise the ticket remains unassigned

### Status labels look different

- Your account may include custom statuses; choose the one that matches your workflow

## Warnings & Solutions

- Warning: This automation has the "Ticket Created" start trigger; adding Open Ticket can create an infinite loop
Solution: Remove either the start trigger or this step, so a single event doesn’t continuously create tickets.