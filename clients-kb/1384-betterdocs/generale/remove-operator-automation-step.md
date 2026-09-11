---
title: Remove Operator &#8211; Automation Step
slug: remove-operator-automation-step
author: Cosimo Franco
date: 2025-10-27
modified: 2025-10-27
word_count: 346
categories: 
url: https://support.spoki.com/docs/uncategorized/remove-operator-automation-step/
---

# Remove Operator &#8211; Automation Step

## Overview

The **Remove Operator** step detaches one or more operators from the current conversation/contact. Use it to clear outdated assignments, complete handoffs, or tidy owners after a workflow finishes.

This step shares its UI with the Add Operator step, but removes operators instead of assigning them.

## Why Remove Operators?

✅ **Clean up ownership** – Avoid stale owners after resolution✅ **Handoffs** – Remove previous team when routing to a new team✅ **Load control** – Free up operator queues✅ **Process hygiene** – Keep conversation owners current and accurate

## How to Add the Step

1. In the automation builder, click "Add Action" or the "+" button
1. Choose "Remove Operator"

## Configure the Step

The configuration contains one input:

### Operators (multi‑select)

- Select one or more operators to remove
- Search by name
- Multi‑select is supported
- The selector includes a Remove all option to clear all operators from the conversation
- The step becomes valid when at least one operator is selected or Remove all is chosen

The Random/All toggle is not relevant when removing.

## Behavior

- Only the selected operators are removed (unless Remove all)
- The conversation remains open—assignment changes only
- You can chain this step with Add Operator to perform a clean handoff

## Practical Examples

### 1) Resolution Cleanup

```
`If/Else: issue resolved
 IF true → Remove Operator: previous assignees
 Add Tag: resolved
`
```
### 2) Handoff Between Teams

```
`Remove Operator: Tier 1
Add Operator: Tier 2 (Random)
Chat as Unread
`
```
### 3) SLA Escalation

```
`If/Else: time > SLA
 IF true → Remove Operator: junior
 Add Operator: senior (All)
`
```

## Best Practices

- Remove precisely: Prefer specific removals; use Remove all sparingly
- Document handoffs: Add a Chat Note explaining the reason
- Pair with tags: Track ownership changes (escalated, handoff_tier2)
- Coordinate with schedules: Automate removals when shifts end

## Interactions With Other Steps

- Add Operator: Assign after removal for clean handoffs
- Chat as Unread: Flag for next assignee
- If / Else: Remove conditionally based on status or SLA

## Troubleshooting

### Operators not removed

- Ensure the step executed in the current path
- Confirm operator names match current assignees

### Step won’t save

- Select at least one operator or choose Remove all