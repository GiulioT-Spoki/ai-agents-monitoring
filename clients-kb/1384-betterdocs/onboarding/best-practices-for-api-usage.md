---
title: Best practices for API usage
slug: best-practices-for-api-usage
author: Alessandro Santoro
date: 2024-09-02
modified: 2024-09-02
word_count: 515
categories: Onboarding
url: https://support.spoki.com/docs/onboarding/best-practices-for-api-usage/
---

# Best practices for API usage

Below are some essential best practices for effective API usage. Following these guidelines will help you optimize your API interactions, ensuring reliability, security, and efficiency in your development process.

## Contact Updates When Starting Automations

When initiating automations for contacts, it’s important to know that manual updates to contact information before starting the automation are unnecessary.

**No Need for Manual Contact Updates:**

- Before starting an automation for a contact, you do not need to manually update their information.
- The platform automatically updates contact details during the process of starting an automation, ensuring that the most current data is used.

## Respecting API Rate Limits

When working with APIs, it’s crucial to respect the rate limits to ensure your requests are processed smoothly and to avoid being temporarily or permanently blocked. Rate limits define the maximum number of API calls you can make within a certain time frame, usually measured per minute.

Always refer to the official [API documentation](https://documenter.getpostman.com/view/21611004/UzBqnPvF) to find the specific rate limits for the API you are using.

## Sending Messages Efficiently

When deciding how to send messages via an API, it’s essential to choose the right method to ensure scalability, flexibility, and access to comprehensive analytics. Here’s a quick guide on when and how to use different messaging options.

**Use Start Automation for Scalable Messaging:**

- If you need to send a message, it’s recommended to use the Start Automation API rather than the Send Message API.
- Benefits of Start Automation:

Scalability: Automations can handle large volumes of messages efficiently without rate limits, making them ideal for high-frequency or bulk messaging tasks.
- Flexibility: Automations can be modified easily to include additional steps, not just message sending. This allows for more complex workflows, such as triggering follow-up actions or additional communications.
- Analytics: Automations offer robust statistics, providing insights into message delivery, open rates, and more, helping you optimize your communication strategies.

**When to Use Send Message:**

- The Send Message API should be used only when you need to send a one-off message that isn’t part of a template or automation.
- This method is more appropriate for individual, non-templated messages where automation is unnecessary.
- 

## Creating Templates Without an API

When creating templates for your communications, it’s important to know that this process cannot be done via an API. Instead, you should use the platform directly or embed the creation interface into your platform. Here’s how to proceed. Follow the [guide](https://support.spoki.com/docs/integrazioni/embed-spoki-on-your-software/) to discover how to embed Spoki into your software.

## Understanding and Using Webhooks

Webhooks are a powerful tool that allow your system to stay aligned with events happening on the Spoki platform. They enable real-time communication and automated responses based on specific triggers. Here’s what you need to know about webhooks and how they can benefit your integration. Discover all the webhooks that Spoki offers: [Spoki Webhooks](https://documenter.getpostman.com/view/21611004/UzBqnPvF#1aaf0d9e-9fd2-4358-b142-dbfcbc21dae1)

## Use API for mass sending of messages

Sending bulk messages via API is an essential feature for marketing campaigns, system notifications, and other tasks that require communicating to many recipients simultaneously. Follow the [API ](https://support.spoki.com/docs/integrazioni/embed-spoki-on-your-software/)[documentation](https://documenter.getpostman.com/view/21611004/UzBqnPvF#b3ad8aa9-dd95-4681-879c-3a4bf3aff158) to discover how to send mass messages through Spoki with **Start Automation for many contacts** API.