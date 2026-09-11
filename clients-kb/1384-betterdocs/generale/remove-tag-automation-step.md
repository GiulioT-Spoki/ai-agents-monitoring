---
title: Remove Tag &#8211; Automation Step
slug: remove-tag-automation-step
author: Cosimo Franco
date: 2025-10-27
modified: 2025-10-27
word_count: 639
categories: 
url: https://support.spoki.com/docs/uncategorized/remove-tag-automation-step/
---

# Remove Tag &#8211; Automation Step

## Overview

The **Remove Tag** step deletes one or more tags (or tag categories) from the current contact/conversation while the automation is running. Use it to clean up temporary flags, end campaign memberships, or reset routing metadata after actions complete.

This step uses the same UI as "Add Tag" but performs the inverse operation.

## Why Remove Tags?

✅ **Lifecycle hygiene** – Clear temporary tags once no longer needed✅ **Accurate segmentation** – Keep audiences up‑to‑date for future campaigns✅ **Prevent reprocessing** – Remove tags that block re‑entry or re‑sending✅ **Close loops** – Mark completion by removing pre‑flow markers

## How to Add the Step

1. In the automation builder, click "Add Action" or the "+" button
1. Choose "Remove Tag"

## Configure the Step

The configuration offers two modes, identical to the Add Tag step:

### Mode 1: Tags (default)

- Select one or more tags to remove from the contact/conversation
- Search by tag name
- Multi‑select supported
- In this step, the selector also shows an option to remove all tags (see below)

### Mode 2: Categories

- Select one or more tag categories to remove
- Use this when your workflows assign categories directly and you want to clear them

Switching modes clears previous selections to avoid ambiguity.

## "Remove All" Option

When configured as **Remove Tag**, the tag selector includes a special option: **Remove all tags**.

- Choosing this option removes all tags from the conversation/contact
- Use with caution—this is irreversible for the current flow execution
- Best used at the end of a campaign or when intentionally resetting tag state

## Behavior Details

- The step is valid when at least one tag OR at least one category is selected, or when Remove all tags is chosen
- Only the specified tags/categories are removed; others remain untouched (unless using Remove all)
- You can place multiple Remove Tag steps across a flow to progressively tidy state

## Practical Examples

### 1) Campaign Exit Cleanup

```
`If/Else: Purchased during campaign?
 IF Yes → Remove Tag: bf_2025, promo_sent
 Add Tag: bf_2025_converted
 ELSE → Continue follow‑ups
`
```
### 2) Exit From Nurture

```
`If/Else: lead_score ≥ 80
 IF true → Remove Tag: nurture_needed
 Add Tag: qualified_lead
`
```
### 3) Reset Routing Flags

```
`If/Else: Issue resolved
 IF true → Remove Tag: needs_support, escalation
 Add Tag: resolved
`
```

## Best Practices

- Be intentional: Only remove tags that your flow previously added or that your team agreed to clear
- Prefer specific removals: Use Remove all sparingly—prefer removing known tags to avoid data loss
- Document changes: Add a Chat Note near significant tag removals to explain why
- Close the loop: After removing gating tags (e.g., processing), add a terminal tag (e.g., processed) for traceability
- Coordinate with other flows: If other automations rely on certain tags, remove them only after confirming it’s safe

## Interactions With Other Steps

- If / Else / Branching: Conditions may depend on tag presence—remove tags after those checks
- Start Automation: Before handing off, remove tags that would block the next flow
- Go to Step: After cleanup, jump to a shared completion section
- Add Tag: Swap tags to reflect state transition (remove old, add new)

## Troubleshooting

### Tag didn’t disappear

- Confirm the automation path actually executed this step
- Ensure you selected the correct tag/category name
- Check that other automations aren’t immediately re‑adding the tag

### Can’t find the tag to remove

- Verify the tag exists in Settings → Tags
- Check exact naming (case/spacing)
- If tags are assigned via integrations, confirm recent sync

### Removed too many tags accidentally

- The operation is not automatically reversible
- Add back the necessary tags with an Add Tag step and rerun for affected contacts
- Review usage of Remove all and restrict to end‑of‑flow resets

## Related Steps

- Add Tag – assign tags for segmentation and logic
- If / Else – test for tag presence before removal
- Start Automation – transition to a new flow after cleanup