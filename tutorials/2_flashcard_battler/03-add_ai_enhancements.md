### 🚀 **Enhancing Flashcard Battle with AI-Generated Questions**

This enhancement will:  
✅ **Use OpenAI** (via Vercel SDK) to dynamically generate flashcard questions.  
✅ **Replace hardcoded questions** with AI-generated ones.  
✅ **Keep HTMX interactions intact** for dynamic updates.  

---

### **📂 Updated Project Structure**

```tree
flashcard-battle/
│── views/
│   ├── layout.hbs
│   ├── index.hbs
│   ├── flashcard.hbs
│── public/
│   ├── styles.css
│── lib/
│   ├── generate-flash-card.js
│── server.js
│── .env
│── package.json
```

---

### **📜 Step 1: Install Dependencies**

In order to upgrade the MVP, we will need to install three new dependencies.

```sh
npm install dotenv ai @ai-sdk/openai
```

- **`dotenv`** → Securely store OpenAI API key.  
- **`ai`** → Vercel's SDK for AI-based responses.
- **`@ai-sdk/openai`** → Let's us use models from OpenAI with the SDK

---

### **📜 Step 2: Configure OpenAI API in `.env`**
Create a **`.env`** file in the root directory:

```
OPENAI_API_KEY=your-openai-api-key-here
```

> 🚨 **Replace `your-openai-api-key-here` with your actual OpenAI API key**.

Once you have created this file, add this line to the top of `server.js`

```js
// server.js
require("dotenv").config();
```
This wil ensure that we can access our environment variables using `process.env.OPENAI_API_KEY`. This is required for working with the `ai` sdk.

---

### **📜 Step 3: Create `lib/generate-flash-card.js`**
- Connects to OpenAI using Vercel SDK.  
- Generates **flashcard questions dynamically**.  

Now that we have our API keys set up, let's create some code to actually generate flashcards. Make a new file called `generate-flash-card.js` and add the following code to it:

```js
// lib/generate-flash-card.js
const ai = require('ai');
const openaiSDK = require("@ai-sdk/openai");

const prompt = `
Task:
Generate a challenging trivia question.

Response:
Reply with valid json responses.

Format:
{
  "question": "...",
  "answer": "..."
}
`

async function generateFlashcard() {
  try {
    const { text } = await ai.generateText({
      model: openaiSDK.openai('gpt-4o-mini'),
      system: "You are a quiz master focused on HTMX.",
      prompt,
      temperature: 0.9,
    });

    const response = JSON.parse(text);
    return response;
  } catch (error) {
    console.error("Error generating flashcard:", error);
    return {
      question: "Error generating question.",
      choices: [],
      answer: "N/A",
    };
  }
}

module.exports = { generateFlashcard };
```


### **📜 Step 4: Update `server.js` (Main Express Server)**
- Connects the routes `/` and `/flashcard` to our trivia generating code.

Now that we have a function to generate flash cards, let's hook it up to a couple of our routes. Import that function in `server.js` and replace the code for our two `GET` requests with the following.


```javascript
// server.js
const { generateFlashcard } = require('./lib/generate-flash-card');

...

// Home route - load the first AI-generated flashcard
app.get("/", async (req, res) => {
  const flashcard = await generateFlashcard();
  res.render("index", { flashcard });
});

// API route to generate a new flashcard dynamically
app.get("/flashcard", async (req, res) => {
  const flashcard = await generateFlashcard();
  res.render("flashcard", { flashcard });
});

...
```

---

### **📜 Step 5: Run the Updated Project**
```sh
node server.js
```
Then open **http://localhost:3000** in your browser.

---

## **🎯 What This Enhancement Achieves**
✔ **Replaces Static Questions with AI-Generated Ones**.  
✔ **Dynamically Generates Unique Questions Every Time**.  
✔ **Keeps HTMX-Based Page Updates & Interactivity**.  

---