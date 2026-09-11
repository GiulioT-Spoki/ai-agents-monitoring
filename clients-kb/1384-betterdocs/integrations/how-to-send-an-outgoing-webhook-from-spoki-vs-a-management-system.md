---
title: How to send an outgoing Webhook from Spoki vs. a management system
slug: how-to-send-an-outgoing-webhook-from-spoki-vs-a-management-system
author: Emanuela Locorotondo
date: 2024-03-13
modified: 2024-03-13
word_count: 300
categories: Integrations
url: https://support.spoki.com/docs/integrations/how-to-send-an-outgoing-webhook-from-spoki-vs-a-management-system/
---

# How to send an outgoing Webhook from Spoki vs. a management system

In the Integrations section of the platform, you can enable Webhook delivery to your management system for a variety of events that occur on Spoki.

Log in to the platform and go to Integrations >> Webhook >> click on Add Webhook

![](https://support.spoki.com/wp-content/uploads/2024/03/agg-webhook-in-uscita-1024x462-1.png)
Next, a tab will open with a list of events that you can notify your management system of. You can choose to enable Webhooks for as many events as you wish.

![](https://support.spoki.com/wp-content/uploads/2024/03/evento-1024x469-1.png)
- Chat unread messages: this event is notified when a chat has unread messages or when it has no more messages. It is the equivalent of the green badge shown in the platform;
- Message sent: this event is notified when a message has been sent and each time it is updated;
- Message received: this event is notified when a message has been received and each time it is updated.
- Note added: this event is notified when a note has been added to the chat;
- Contact created: this event is notified when a contact is created;
- Contact updated: this event is notified when a contact is updated;
- Contact deleted: this event is notified when a contact is deleted;
- Tag added to contact: this event is notified when a tag is added to a contact;
- Tag deleted from contact: this event is notified when a tag is deleted from a contact;
- Contact added to list: this event is notified when a contact is added to the list;
- Contact deleted from list: this event is notified when a contact is deleted from the list;
- ContactField created or updated: this event is notified when a ContactField is created or updated.

On the tab you are asked to indicate the Callback URL of your management system, to which notifications of that specific selected event will be sent whenever it occurs on Spoki.