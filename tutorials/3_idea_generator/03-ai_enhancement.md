### 🚀 **Enhancing Hackathon Idea Generator with AI-Powered Ideas**

This update will:  
✅ **Use OpenAI (via Vercel SDK) to generate hackathon ideas dynamically**.  
✅ **Replace hardcoded ideas with AI-generated ones**.  
✅ **Allow users to input keywords and receive unique project ideas**.  

---

## **📂 Updated Project Structure**
```
hackathon-idea-generator/
│── views/
│   ├── layout.hbs
│   ├── index.hbs
│   ├── idea.hbs
│── public/
│   ├── styles.css
│── server.js
│── .env
│── package.json
```

---

## **📜 Step 1: Install New Dependencies**
```sh
npm install dotenv ai @ai-sdk/openai
```

- **`dotenv`** → Securely store OpenAI API key.  
- **`ai`** → Vercel SDK for AI-powered responses.  
- **`@ai-sdk/openai`** → Let's us use models from OpenAI with the SDK

---

## **📜 Step 2: Configure OpenAI API in `.env`**  
Create a **`.env`** file in the root directory:  

```
OPENAI_API_KEY=your-openai-api-key-here
```

> 🚨 **Replace `your-openai-api-key-here` with your actual OpenAI API key**.

---

## **📜 Step 3: Update `server.js` to Use AI for Generating Ideas**  
- Accepts **user input (keywords)**.  
- Uses **OpenAI to generate relevant project ideas**.  
- Returns **AI-generated response dynamically via HTMX**.  

Add the required imports at the top. dotenv allows us to store our api key in an environment variable.

```javascript
require("dotenv").config();
const ai = require('ai');
const openaiSDK = require("@ai-sdk/openai");
```

Now, we will adjust the api routes to use dynamically generated ideas:

```js
// API route to generate AI-powered idea
app.post("/generate", async (req, res) => {
  const keyword = req.body.keyword || "random";
  const idea = await generateIdea(keyword);
  res.render("idea", { idea });
});

// Function to generate an AI-powered hackathon idea
async function generateIdea(keyword) {
  try {
    const { text } = await ai.generateText({
      model: openaiSDK.openai('gpt-3.5-turbo'),
      system: "You are a creative hackathon idea generator. Return a single, short idea based on the category.",
      prompt: `Generate a hackathon idea in the category: ${keyword}`,
      temperature: 0.8
    })

    return text;
  } catch (error) {
    console.error("Error generating idea:", error);
    return "Oops! Could not generate an idea. Try again.";
  }
}
```

---

## **📜 Step 4: Update `views/index.hbs` (Main Page)**
- User **inputs a keyword**, submits the form, and HTMX updates the UI dynamically.  

```html
<h1>Hackathon Idea Generator (AI-Powered)</h1>

<form hx-post="/generate" hx-target="#idea-container" hx-swap="outerHTML">
    <label>Enter a keyword:</label>
    <input type="text" name="keyword" required>
    <button type="submit">Generate Idea</button>
</form>

<div id="idea-container">
    <p>Enter a keyword above to generate a hackathon project idea!</p>
</div>
```

---

## **📜 Step 5: Run the AI-Powered Hackathon Idea Generator**
```sh
node server.js
```
Then open **http://localhost:3000** in your browser.

---

## **🎯 What This Enhancement Achieves**
✔ **AI-Generated Hackathon Ideas Based on User Input**.  
✔ **Instant Feedback with HTMX-Powered Updates**.  
✔ **Fully Dynamic Content Without Page Refreshes**.  

---
