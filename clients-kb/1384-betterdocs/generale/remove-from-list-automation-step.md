---
title: Remove from List &#8211; Automation Step
slug: remove-from-list-automation-step
author: Cosimo Franco
date: 2026-03-19
modified: 2026-03-19
word_count: 459
categories: 
url: https://support.spoki.com/docs/uncategorized/remove-from-list-automation-step/
---

# Remove from List &#8211; Automation Step

## Overview

The **Remove from List** step unsubscribes the current contact from one or more of your lists during automation execution. Use it to end campaign participation, clean up audiences, and maintain accurate segmentation.

This step uses the same list selector as "Add to List", with an extra option to remove all lists if you choose to reset membership completely.

## Why Remove from Lists?

✅ **Lifecycle management** – Exit audiences when a program ends✅ **Accurate targeting** – Prevent future sends to completed cohorts✅ **Audience hygiene** – Keep lists clean and meaningful✅ **State transitions** – Move contacts between lists as they progress

## How to Add the Step

1. In the automation builder, click "Add Action" or the "+" button
1. Choose "Remove from List"

## Configure the Step

The configuration uses the same selector with search and pagination.

### Selecting Lists to Remove

- Choose one or more lists from the dropdown
- Use the search box to filter by name
- Scroll to load more results when available (pagination)

### Remove All Lists (Optional)

- In this mode, the selector provides a Remove all option
- When selected, the contact is removed from every list
- Use carefully—this is a full reset of list membership for the contact

The step becomes valid when at least one list is selected or **Remove all** is chosen.

## Behavior

- Only the specified lists are removed; others stay as-is (unless using Remove all)
- You can place multiple removal steps where appropriate (e.g., at campaign completion)
- This operation does not delete the lists themselves—only the contact’s membership

## Practical Examples

### 1) Campaign Completion

```
`If/Else: completed purchase?
 IF true → Remove from List: bf_2025_audience
 Add Tag: bf_2025_converted
`
```
### 2) Transition Between Programs

```
`Remove from List: onboarding_candidates
Add to List: onboarding_participants
`
```
### 3) Full Reset (Use Carefully)

```
`End of journey → Remove from List: (Remove all)
Add Tag: journey_complete
`
```

## Best Practices

- Be precise: Prefer removing specific lists over Remove all, unless you truly want a reset
- Coordinate with campaigns: Remove audiences as soon as objectives are met
- Audit regularly: Use reporting to verify list cleanliness
- Document intent: Add a Chat Note to explain bulk removals for future reviewers

## Interactions With Other Steps

- Add to List: Pair removal with enrollment to move contacts between cohorts
- If / Else: Remove lists conditionally based on behavior or status
- Start Automation: Clean up before handing off to a new flow

## Troubleshooting

### List not removed

- Ensure the automation path actually executed this step
- Confirm you selected the correct list name
- Check if another automation is re‑adding the contact to that list

### Can’t find the list

- Clear the search box and scroll to load more
- Verify the list exists and you have permission

### Step won’t save

- Select at least one list or choose Remove all