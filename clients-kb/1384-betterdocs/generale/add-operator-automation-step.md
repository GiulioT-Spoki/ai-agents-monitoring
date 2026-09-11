---
title: Add Operator &#8211; Automation Step
slug: add-operator-automation-step
author: Cosimo Franco
date: 2026-03-19
modified: 2026-03-19
word_count: 393
categories: 
url: https://support.spoki.com/docs/uncategorized/add-operator-automation-step/
---

# Add Operator &#8211; Automation Step

## Overview

The **Add Operator** step assigns one or more operators to the current conversation/contact during the automation. Use it to route inquiries to the right people or teams.

This step shares its UI with the Remove Operator step, but performs assignment instead of removal.

## Why Add Operators?

✅ **Load balancing** – Assign to the appropriate team or rotate through operators✅ **Expert routing** – Direct issues to subject‑matter experts✅ **Escalation** – Add senior operators when conditions require✅ **Account ownership** – Attach an owner for continuity

## How to Add the Step

1. In the automation builder, click "Add Action" or the "+" button
1. Choose "Add Operator"

## Configure the Step

The configuration contains two inputs:

### 1) Operators (multi‑select)

- Select one or more operators from the dropdown
- Search by name
- Multi‑select is supported
- The step becomes valid when at least one operator is selected

### 2) Assignment Method (when multiple operators)

- Appears only when 2+ operators are selected
- Two options:
All – Assign the conversation to all selected operators
- Random – Assign to one operator chosen at random from the selected list

Random is useful for round‑robin style assignment without maintaining counters.

## Behavior

- Operators you select are added to the conversation when the step executes
- If you chose Random, only one operator from the selection will be assigned
- If you chose All, all selected operators will be assigned

## Practical Examples

### 1) Sales Handoff

```
`If/Else: Qualified lead?
 IF true → Add Operator: Sales Team (Random)
`
```
### 2) Priority Escalation

```
`If/Else: High priority
 IF true → Add Operator: Senior Support (All)
`
```
### 3) Language‑Specific Routing

```
`If/Else: language = IT
 IF true → Add Operator: Italian Speakers (Random)
`
```

## Best Practices

- Keep lists curated: Ensure the operator list reflects active team members
- Use Random for fairness: Distribute volume evenly without extra logic
- Combine with tags/notes: Provide context on why the assignment occurred
- Pair with Chat as Unread: Visually flag the conversation after assignment

## Interactions With Other Steps

- If / Else: Choose different operator pools by condition
- Chat as Unread: Highlight assigned chats
- Add Tag: Mark ownership reasons (e.g., vip_priority)
- Go to Step: Route back to a central processing point after assignment

## Troubleshooting

### Step won’t save

- Select at least one operator

### Random/All toggle disabled

- Toggle appears only when you selected 2+ operators

### Assigned to unexpected operator

- For Random method, the selection is made at execution time; ensure the chosen pool is correct