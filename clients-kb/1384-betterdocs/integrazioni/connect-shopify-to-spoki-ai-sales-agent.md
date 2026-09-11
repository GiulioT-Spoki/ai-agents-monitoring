---
title: Connect Shopify to Spoki AI Sales Agent
slug: connect-shopify-to-spoki-ai-sales-agent
author: Cosimo Franco
date: 2025-07-02
modified: 2026-07-29
word_count: 833
categories: Integrazioni
url: https://support.spoki.com/docs/integrazioni/connect-shopify-to-spoki-ai-sales-agent/
---

# Connect Shopify to Spoki AI Sales Agent

**Part 1: Generating API Credentials in Shopify**

To integrate your Shopify store with Spoki, you need to create a custom app within your Shopify admin panel. This process will generate the necessary API credentials that allow Spoki to securely connect to your store.

This guide will walk you through the entire process step-by-step. At the end, you will have four pieces of information to enter into your Spoki account:

1. Shopify Email
1. Store Name
1. Shopify Admin Access Token
1. Storefront Access Token

Let’s get started!

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-02-at-16.49.04-1024x722.png)

### Step 1: Navigate to Apps and Sales Channels

1. Log in to your Shopify admin dashboard.
1. On the left-hand navigation menu, click on Settings.
1. In the Settings menu, click on Apps and sales channels.
1. Click the Develop apps button.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-06-20-at-11.23.04-1-1024x697.png)

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-06-20-at-11.23.32-3-1024x708.png)

### Step 2: Create a New Custom App

1. On the “App development” page, click the Create an app button in the top right corner.
1. A pop-up window will appear.
- In the App name field, enter a name that you’ll recognize, such as Spoki AI Integration.
- In the App developer dropdown, select your name or the store owner’s account.
- Click Create app.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-06-20-at-11.24.07-1-1024x562.png)

### Step 3: Configure Admin API Scopes (Permissions)

After creating the app, you’ll land on its overview page. Now you need to grant it the necessary permissions to manage your products, orders, etc.

1. Click on the Configuration tab.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-06-20-at-11.24.32-2-1024x732.png)
1. Configure Admin API Scopes:
- In the “Admin API integration” section, click Configure.
- Select the following permissions by checking the boxes next to them

read_products
- write_product_listings and read_product_listings
- write_orders and read_orders
- write_customers and read_customers
- write_draft_orders and read_draft_orders
1. Click Save.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-06-20-at-11.25.13-3-1024x916.png)
1. Configure Storefront API Scopes:
- Go back to the Configuration tab.
- Scroll down to the “Storefront API integration” section and click Configure.
- Select the permissions needed for the Spoki AI to search your store, such as unauthenticated_read_product_listings. (Note: Select all scopes recommended by Spoki for full functionality).
- Click Save.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-02-at-16.36.48-2-1024x778.png)
![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-02-at-16.37.16-1-1024x916.png)

### Step 4: Install the App and Retrieve Your Credentials

Now that the permissions are configured, you can install the app on your store to generate the final API credentials.

1. Click on the API credentials tab.
1. Click the Install app button at the top right.
1. A confirmation pop-up will appear. Click Install.

### Step 5: Copy Your API Keys and Access Token

After installation, you will be taken back to the **API credentials** page. This is where you will find all the keys needed for the Spoki integration.

**IMPORTANT:** The Admin API access token is only shown **ONCE**. For security reasons, you cannot view it again after you leave this page. Please copy it and save it in a safe place immediately.

1. In the “Admin API access token” section, click Reveal token once.
1. The token will be revealed. Copy this token and paste it into the corresponding field in your Spoki setup page.
1. The Storefront API access token will be visible. Copy this value as well.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-06-20-at-11.25.36-1-1024x906.png)

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-07-02-at-16.37.45-2-1024x783.png)

### **Part 2: Connecting to Spoki**

Now that you have your Shopify credentials, let’s enter them into your Spoki dashboard.

#### Step 1: Navigate to AI Integrations in Spoki

1. In your Spoki dashboard, go to the AI section from the left-hand menu.
1. Select the Integrations and Tools tab.
1. Scroll down to the AI Integrations section and click the Add Integrations button.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-10-17-at-14.49.36-1024x313.png)

#### Step 2: Choose the Shopify Integration

1. A pop-up will appear listing available integrations.
1. Click on Shopify to proceed.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-10-17-at-14.49.52-1024x540.png)
![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-10-17-at-14.50.12-1024x378.png)

#### Step 3: Enter Your Shopify Credentials

This is where you’ll paste the information you gathered in Part 1.

- Shopify Email: Enter the email address you use to log in to Shopify.
- Store Name: Enter the unique part of your <your-store-name>.myshopify.com URL. For example, if your URL is spoki-dev.myshopify.com, you would enter spoki-dev.
- Shopify Access Token: Paste the Admin API Access Token you copied from Shopify in Part 1, Step 5.
- Storefront Access Token: Paste the Storefront API Access Token you copied from Shopify in Part 1, Step 5.

Once all fields are filled, click **Save**.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-10-17-at-14.50.19-1024x703.png)

#### Step 4: Activate Shopify Options

After saving your credentials, you will be taken to the final step where you can activate the specific AI functions you want to use.

1. Toggle on the features you want the Spoki AI to handle, such as Search Products, Get Order by ID, Create Draft Order, etc.
1. Click Save.

![](https://support.spoki.com/wp-content/uploads/2025/07/Screenshot-2025-10-17-at-14.50.58-1024x768.png)

**Congratulations!** Your Shopify store is now fully integrated with your Spoki AI Sales Agent. The connection is active, and the AI can now use the functions you enabled.

### Key Shopify Documentation Links:

1. Custom Apps Overview: Explains what custom apps are and why they are used.
- Custom Apps
1. API Access Scopes: A developer page that explains what permissions (scopes) are and why they’re needed. Very useful for users who want to understand what they are granting access to.
- Scopes
1. Admin API Authentication: Explains how the Admin API tokens work.
- Api Access Tokens
1. Storefront API Overview: Explains what the Storefront API is used for.
- Storefront

Related Articles: [the integrate whatsapp with shopify guide](https://support.spoki.com/en/docs/integrations/integrate-whatsapp-with-shopify/)[the connect shopify to spoki ai sales agent guide](https://support.spoki.com/docs/integrazioni/connect-shopify-to-spoki-ai-sales-agent/)