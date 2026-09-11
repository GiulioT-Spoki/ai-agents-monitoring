---
title: Update Ticket &#8211; Automation Step
slug: update-ticket-automation-step
author: Cosimo Franco
date: 2025-10-24
modified: 2025-10-24
word_count: 549
categories: 
url: https://support.spoki.com/docs/uncategorized/update-ticket-automation-step/
---

# Update Ticket &#8211; Automation Step

## Overview

The **Update Ticket** step modifies an existing support ticket linked to the current contact. Use it to change the ticket’s status, priority, category, or owner as your automation progresses.

This step locates the ticket via a Reference value, then applies the updates you choose.

## Why Update a Ticket via Automation?

✅ **Lifecycle transitions** – Move tickets across statuses as conditions change✅ **Escalation** – Increase priority or change owner automatically✅ **Re‑classification** – Adjust categories when new information arrives✅ **Triage at scale** – Consistent, rule‑driven ticket management

## How to Add the Step

1. In the automation builder, click "Add Action" or the "+" button
1. Choose "Update Ticket"

## Configure the Step

The configuration form contains these inputs:

![](./images/update-ticket-configuration.png)

### 1) Reference (Required)

- A short identifier used to locate the ticket to update (max 256 chars)
- Supports dynamic variables (recommended), e.g., %%TICKET_REFERENCE%%, %%ORDER_ID%%, %%EMAIL%%
- If your automation uses a "Ticket Status Changed" starter, the field suggests %%TICKET_REFERENCE%% by default
- A warning appears reminding you to use a variable‑based reference for reliable matching

### 2) New Status (Optional)

- Select the new status or choose "Keep current status"
- Some statuses may be disabled to avoid loops when your automation is triggered by a ticket status change (see Safeguards below)

### 3) New Priority (Optional)

- Select the new priority or choose "Keep current priority"

### 4) New Category (Optional)

- Select the new category or choose "Keep current category"
- You can also type to create a new category inline

### 5) New Owner (Optional)

- Assign a new owner (operator/role) or keep the current owner

The step is valid when Reference is set and you select at least one change among status, priority, category, or owner.

## Safeguards Against Trigger Loops

If your automation is started by a "Ticket Status Changed" trigger, some statuses may be disabled in the selector:

- If the trigger is configured without a specific “to” status, status updates are disabled to prevent endless loops
- If the trigger specifies one or more target statuses (e.g., to = Resolved), those same statuses are disabled in this step

This ensures updating the ticket doesn’t immediately retrigger the same automation in a loop.

## Practical Examples

### 1) Move to In Progress on First Reply

```
`Customer Response → Update Ticket
 Reference: %%TICKET_REFERENCE%%
 New Status: In Progress
 New Owner: Assigned agent
`
```
### 2) Escalate Priority After Deadline

```
`Delay: 24h
If/Else: ticket still waiting → Update Ticket
 Reference: %%TICKET_REFERENCE%%
 New Priority: High
 New Owner: Senior Support
`
```
### 3) Re‑classify by Category

```
`If/Else: message contains "billing" → Update Ticket
 Reference: %%TICKET_REFERENCE%%
 New Category: Billing
`
```
### 4) Resolve After Confirmation

```
`If/Else: customer confirmed resolution → Update Ticket
 Reference: %%TICKET_REFERENCE%%
 New Status: Resolved
`
```

## Best Practices

- Always use variables in Reference: e.g., %%TICKET_REFERENCE%%, not plain text
- Change only what’s needed: Leave other fields to “Keep current …”
- Respect triggers: Avoid changing to statuses that would re‑fire the same starter
- Document transitions: Add a Chat Note near significant updates
- Pair with notifications: Use tags, Chat as Unread, or operator assignment to signal updates

## Interactions With Other Steps

- Open Ticket – Create first, then update as new info arrives
- Chat as Unread – Flag the conversation after status/owner changes
- Add/Remove Operator – Combine with ownership changes at conversation level
- If / Else – Gate updates by SLA time, response content, or priority