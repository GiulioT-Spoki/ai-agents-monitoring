---
title: Connect your Shopify store to Spoki AI Sales Agent — Dev Dashboard (new method)
slug: connect-your-shopify-store-to-spoki-ai-sales-agent-dev-dashboard-new-method
author: Cosimo Franco
date: 2026-03-23
modified: 2026-03-23
word_count: 1012
categories: 
url: https://support.spoki.com/docs/uncategorized/connect-your-shopify-store-to-spoki-ai-sales-agent-dev-dashboard-new-method/
---

# Connect your Shopify store to Spoki AI Sales Agent — Dev Dashboard (new method)

This guide walks you through creating an app in the [Shopify Dev Dashboard,](https://dev.shopify.com/dashboard) obtaining the credentials needed, and connecting your store to the Spoki AI Sales Agent.

*As of January 2026, Shopify requires all new apps to be created through the Dev Dashboard. The older path (Shopify Admin → Settings → Develop apps) no longer supports creating new apps.*

### Overview

The Spoki AI Sales Agent connects to your Shopify store through a custom app you create in the Shopify Dev Dashboard. This gives you full control over what the agent can access and ensures your store data remains secure.

You will need two types of credentials:

- Client ID + Client Secret
- Storefront Access Token

### Step 1 — Create a new app in the Dev Dashboard

1. Open the Shopify Dev Dashboard and log in with your Shopify account.
1. In the left panel, make sure you are on Apps.
1. 3. Click Create app in the top-right corner.
1. In the App name field, enter a recognizable name such as Spoki AI Agent.
1. Click Create.

![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-19-at-08.35.16-2-1024x474.png)

![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-19-at-08.35.35-1024x474.png)

*For a full walkthrough, see Create apps using the[ Dev Dashboard in the Shopify](https://shopify.dev/docs/apps/build/dev-dashboard/create-apps-using-dev-dashboard) developer docs.*

### Step 2 — Create a version with the required scopes

Before the app can be installed on your store, you need to create a version and configure the [access scopes](https://shopify.dev/docs/api/usage/access-scopes) it needs.

1. Inside your app, click the Versions tab.
1. Under Access scopes, click on the Select scopes to open a modal for selecting scopes. 
- Select all scopes recommended by Spoki for full functionality : read_customers,write_customers,write_draft_orders,read_draft_orders,read_orders,write_orders,read_products
1. Click Create version (or Release).

![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-19-at-08.36.06-1024x474.png)
![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-19-at-08.42.27-1-1024x624.png)
![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-19-at-08.43.04-1-1024x624.png)
### Step 3 — Install the app on your store

- In the Shopify Dev Dashboard, click Apps in the left panel.
- Click on the app you created (in the blow image Spoki-ai).

![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-19-at-12.00.30-1024x407.png)
- In the top-right corner of the app page, click **Install app**.
- You will be redirected to a page where you can select which store to install the app on — choose your store and confirm it

![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-19-at-12.01.06-1-1024x476.png)
![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-19-at-12.15.12-1024x476.png)
After selecting your store, you will be redirected to your Shopify Admin. From the left menu, go to Apps — your newly installed app will appear there.

![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-19-at-12.26.40-1024x393.png)

### Step 4 — Generate a Storefront Access Token

The Storefront Access Token is separate from your Admin API credentials and gives the AI agent public read access to your product catalog. In order to obtain it you should use **headless**

- Install the Headless channel from the Shopify App Store.
- After installation, click Add storefront.

![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-19-at-14.25.12-1024x344.png)
- In the storefront settings, go to Manage API access and click Storefront API.

![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-19-at-14.25.30-1024x401.png)
- Copy the value in the Public access token field — this is your Storefront Access Token, which you will enter in Step 6 when configuring the Shopify tool in Spoki.

![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-19-at-14.26.09-1024x423.png)
### I**mportant — product visibility requirement**

The Storefront Access Token created through the Headless channel only returns products that are **published to that Headless sales channel**. Products published only to the Online Store or other channels will **not** appear in the AI agent’s product search.

Before going live, make sure all relevant products are published to the Headless channel 

### Step 6 — Add credentials to Spoki

Before you begin, retrieve the credentials from your installed app

- Client ID and Client Secret : in the Shopify Dev Dashboard, click Apps, select your app, then go to Settings. Your Client ID is always visible; click Reveal next to Client secret to view it.

![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-19-at-14.34.44-1024x446.png)
- Storefront Access Token : explained in step 4

Now connect your store in the Spoki dashboard:

### Step 7 — **Connecting to Spoki**

- In your Spoki dashboard, go to the AI section from the left-hand menu.
- Select the Integrations and Tools tab.
- Inside the Integrations and Tools tab click the New Tool button.

![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-23-at-09.07.54-1024x452.png)
- then a pop-up will appear listing available integrations.
- Click on Shopify to proceed.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-10-17-at-14.49.52-1024x540.png)
![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-23-at-09.10.58-1024x465.png)
**Paste the information you’ve gathered here.**Ensure that the authentication mode is set to **Dev Dashboard (Recommended)**

- Name: Enter a descriptive name
- Description: Provide a clear and concise description
- Store Name:  Enter the unique part of your <your-store-name>.myshopify.com URL. For example, if your URL is spoki-dev.myshopify.com, you would enter spoki-dev.
- Client ID: Enter Client ID obtained from Step-6
- Client Secret: Enter Client Secret obtained from Step 6
- Storefront Access Token : Enter Storefront Access Token obtained from Step 4

![](https://support.spoki.com/wp-content/uploads/2026/03/Screenshot-2026-03-23-at-09.19.25.png)
## Frequently asked questions

1) **The AI agent can’t find some of my products — what should I check?**

See the **Important — product visibility requirement** note at the in Step 5 for the full explanation and fix.

If you obtained your Storefront Access Token from the Headless channel , only products **published to that Headless sales channel** are visible to the agent’s product search. Products published solely to the Online Store or any other channel are not returned.

To fix this, go to Shopify Admin → **Products**, select all products, click **More actions → Make available**, and enable the **Headless** channel. After saving, all selected products will appear in the agent’s search results. Remember to do this for any new products you add in the future.

2)**I previously created a custom app via the Shopify Admin — does it still work?** Yes. Apps created in the Shopify Admin before January 2026 continue to work. You only need to follow this guide if you are creating a new integration. 

3)**Do I need to request access to customer data (orders, contacts, etc.) through the Partner Dashboard?**

It depends on your account type:

– **Regular store owner** (no Shopify Partner account): No extra step is needed. Protected customer data is available to your custom app immediately.

– **Shopify Partner**: You must declare the data fields your app uses in the Partner Dashboard (Apps → your app → API access requests → Protected customer data access). Because this is a custom app, the access is granted immediately — there is no Shopify review or waiting period. This is different from public apps, where the same declaration triggers a manual review that can take several days.

See [Work with protected customer](https://shopify.dev/docs/apps/launch/protected-customer-data) data in the Shopify developer docs for the full details.