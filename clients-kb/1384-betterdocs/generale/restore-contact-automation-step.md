---
title: Restore Contact &#8211; Automation Step
slug: restore-contact-automation-step
author: Cosimo Franco
date: 2025-10-24
modified: 2025-10-24
word_count: 436
categories: 
url: https://support.spoki.com/docs/uncategorized/restore-contact-automation-step/
---

# Restore Contact &#8211; Automation Step

## Overview

The **Restore Contact** step unblocks a contact that was previously blocked. Use it to re‑enable communication after a user opts back in, an investigation clears an issue, or a policy restriction no longer applies.

This step has no configuration. When execution reaches it, the contact is restored (unblocked).

## Why Restore a Contact via Automation?

✅ **Honor new consent** – Re‑enable messaging when a user opts back in✅ **Operational recovery** – Reverse automated blocks after resolution✅ **Policy updates** – Resume communication when restrictions change✅ **Automated workflows** – Unblock at the correct moment in a journey

## How to Add the Step

1. In the automation builder, click "Add Action" or the "+" button
1. Choose "Restore Contact"

![](./images/restore-contact-action-menu.png)

## How It Works

When the automation reaches this step:

1. The contact’s blocked state is cleared
1. Messaging to/from the contact is allowed again
1. The step completes immediately and the flow continues

If the contact had been blocked due to opt‑out, also ensure their consent status (Marketing Acceptance) matches their new preference.

## Common Use Cases

### 1) User Re‑Subscribes

```
`If/Else: user replied "START" or clicked "Subscribe"
 IF true → Restore Contact
 Marketing Acceptance: Subscribed
 Add to List: marketing_master
 Send Template: "Thanks for re‑subscribing!"
`
```
### 2) Issue Resolved

```
`If/Else: investigation completed AND no violation
 IF true → Restore Contact
 Remove Tag: blocked_for_abuse
 Add Chat Note: "Restored after review"
`
```
### 3) Temporary Suspension Lifted

```
`Delay: until policy window ends
Restore Contact
`
```

## Best Practices

- Record context: Add a Chat Note explaining why the contact was restored
- Align consent: Update Marketing Acceptance to the correct state
- Re‑introduce carefully: Send a confirmation message first, then resume flows
- Re‑enroll selectively: Add to relevant lists/automations as needed—not all at once

## Interactions With Other Steps

- Block Contact: Opposite action; use to toggle communication state
- Marketing Acceptance: Set consent to Subscribed/No status as appropriate
- Add to List / Remove from List: Manage audiences after restoration
- Add Tag / Remove Tag: Track reasons (e.g., restored_by_request, false_positive)

## Limitations & Considerations

- Restoring only affects block status; it does not alter lists, tags, or consent by itself
- If the user never provided marketing consent, restoring does not grant permission to send marketing messages
- Consider jurisdictional rules before resuming outreach

## Troubleshooting

### Contact still appears blocked

- Ensure the automation path executed this step
- Confirm there isn’t another automation blocking again afterward
- Check manual UI state to verify latest status

### Messages not sending after restore

- Confirm consent status allows marketing messages
- Verify channel availability and 24‑hour messaging rules
- Check for flow conditions (tags/lists) preventing sends