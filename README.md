# 🛒 MegaMart — AI-Powered Smart Grocery & Retail Store

> **Live Application URL:** [https://megamart-app.vercel.app](https://megamart-app.vercel.app)  
> **GitHub Repository:** [https://github.com/username/megamart-app](https://github.com/username/megamart-app)

---

## 📌 Problem & Target Audience

### **The Problem**
Inflation and fluctuating market rates make monthly and weekly household grocery budgeting extremely challenging for middle-class families. Shoppers frequently face:
1. **Budget Overruns:** Exceeding allocated household budget at checkout.
2. **Impulse Purchases & Waste:** Buying unnecessary items without a tailored shopping plan.
3. **Nutritional Imbalance:** Sacrificing dietary quality to stay within strict financial limits.

### **Target Audience**
- **Household Decision-Makers & Homemakers:** Looking to streamline weekly shopping without overspending.
- **Budget-Conscious Individuals & Students:** Needing strict expenditure control for groceries.
- **Local Supermarket Shoppers:** Seeking an intelligent digital shopping experience.

### **Our Solution — MegaMart**
MegaMart is an end-to-end web application that seamlessly combines an e-commerce grocery storefront with an intelligent **AI Smart Grocery Planner**. Users can browse daily essential items, manage their cart, and instantly generate custom, balanced weekly grocery plans aligned precisely with their family size and available budget.

---

## ✨ Features List

- 🛍️ **Interactive Product Catalog:** Browse categorized grocery items with live pricing in PKR (Staples, Dairy, Vegetables, Meat, etc.).
- 🛒 **Dynamic Shopping Cart:** Add or remove items in real time with instant order total calculations.
- 🤖 **AI Smart Grocery & Budget Assistant:** Intelligent algorithm that crafts a complete customized shopping list based on budget constraints, family size, and dietary requirements.
- ⚡ **Instant Cart Integration:** Smooth user interface with immediate feedback, price summaries, and streamlined checkout workflows.
- 📱 **Fully Responsive Layout:** Optimized for mobile screens, tablets, and desktop computers.

---

## 🤖 The AI Feature & System Instructions

### **Overview**
The **MegaMart AI Assistant** acts as an expert financial and dietary counselor. Driven by Google Gemini 1.5 Flash, it calculates required nutrition and staple ratios against user-defined monetary limits (in PKR) and family size, producing a categorized list and cost-saving tips.

### **System Prompt / Instructions**
Below is the exact system instruction prompt integrated into the API backend (`/api/ai-assistant`):

```text
You are the AI Grocery & Shopping Assistant for "MegaMart".
Create a recommended weekly grocery shopping list based on the user's constraints.

User Constraints:
- Weekly Budget: PKR {budget}
- Family Size: {familySize} persons
- Preferences/Notes: {dietaryPreference}

Instructions:
1. Provide a categorized list (e.g., Staples, Vegetables, Dairy, Meat/Protein).
2. Keep total estimated cost strictly within the given budget in PKR.
3. Format the output cleanly in readable Markdown with estimated item prices.
4. Give 1-2 money-saving tips at the end tailored to Pakistani grocery markets.
