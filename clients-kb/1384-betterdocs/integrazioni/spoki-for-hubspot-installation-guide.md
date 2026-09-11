---
title: Spoki for HubSpot &#8211; Installation Guide
slug: spoki-for-hubspot-installation-guide
author: Salvatore Corsa
date: 2026-02-03
modified: 2026-02-03
word_count: 380
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/spoki-for-hubspot-installation-guide/
---

# Spoki for HubSpot &#8211; Installation Guide

# Introduction

Spoki integrates WhatsApp messaging directly into your HubSpot CRM. With this app you can:

- Chat with contacts via WhatsApp directly from the contact record page
- Automate WhatsApp messages using HubSpot workflows

## Requirements

Before installing, make sure you have:

- A HubSpot account (Professional or Enterprise recommended for workflow features)
- A Spoki account with an active WhatsApp Business API connection
- Admin permissions in your HubSpot portal

## Installation

### Step 1: Find the App

1. Go to the HubSpot App Marketplace
1. Search for “Spoki”
1. Click on the Spoki app card

### Step 2: Install the App

1. Click “Install app”
1. Select the HubSpot account where you want to install the app
1. Review the permissions requested:
- Read contacts – to display contact information
- Write contacts – to update contact data
- Automation – to use workflow actions
1. Click “Connect app”

### Step 3: Authorize with Spoki

1. You will be redirected to Spoki’s authorization page
1. Log in with your Spoki credentials
1. Select the Spoki workspace to connect
1. Click “Enable” to complete the connection

## Configure the Spoki Card

The Spoki card allows you to chat with contacts directly from their record page.

### Add the Card to Contact View

1. Navigate to Contacts in HubSpot
1. Open any contact record
1. Click “Customize” (top right)
1. In the sidebar section, click “+ Add cards”
1. Find “Spoki” in the card library and add it
1. Click “Save”

### Using the Card

1. Open a contact record
1. Find the Spoki card in the sidebar
1. Click “Open Spoki Chat”
1. A chat window will open where you can send WhatsApp messages to the contact

**Note**: The contact must have a valid phone number to receive WhatsApp messages.

## Configure Workflow Actions

The Spoki workflow action allows you to automatically trigger WhatsApp automations when contacts enter a workflow.

### Create a Workflow with Spoki Action

1. Go to Automation > Workflows
1. Create a new workflow or edit an existing one
1. Click “+” to add an action
1. Search for “Start Spoki Automation”
1. Configure the action fields:

FieldDescriptionRequired**Automation UUID**The unique ID of your Spoki automationYes**Automation Secret**The secret key for authenticationYes**Phone**Contact’s phone number (use contact property)Yes**First Name**Contact’s first nameNo**Last Name**Contact’s last nameNo**Email**Contact’s email addressNo**Custom Fields**Additional data in JSON formatNo
### Finding Your Automation UUID and Secret

1. Log in to your Spoki dashboard
1. Go to Automations
1. Select the automation you want to trigger
1. Copy the UUID and Secret from the HubSpot trigger