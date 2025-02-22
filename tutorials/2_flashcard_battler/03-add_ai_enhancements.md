### 🚀 **Enhancing Flashcard Battle with AI-Generated Questions**  
This enhancement will:  
✅ **Use OpenAI** (via Vercel SDK) to dynamically generate flashcard questions.  
✅ **Replace hardcoded questions** with AI-generated ones.  
✅ **Keep HTMX interactions intact** for dynamic updates.  

---

### **📂 Updated Project Structure**
```
flashcard-battle/
│── views/
│   ├── layout.hbs
│   ├── index.hbs
│   ├── flashcard.hbs
│── public/
│   ├── styles.css
│── server.js
│── .env
│── package.json
```

---

### **📜 Step 1: Install Dependencies**
```sh
npm install express express-handlebars dotenv ai
```

- **`express` & `express-handlebars`** → Server & templating engine.  
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

---

### **📜 Step 3: Update `server.js` (Main Express Server)**
- Connects to OpenAI using Vercel SDK.  
- Generates **flashcard questions dynamically**.  

```javascript
require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const ai = require('ai');
const openaiSDK = require("@ai-sdk/openai");

const app = express();
const PORT = 3000;

// Set up Handlebars
app.engine(
"hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/",
    partialsDir: __dirname + "/views/",
  })
);
app.set("view engine", "hbs");

// Serve static files
app.use(express.static("public"));

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

// Function to generate a flashcard using OpenAI
async function generateFlashcard() {
  try {
    const { text } = await ai.generateText({
      model: openaiSDK.openai('gpt-3.5-turbo'),
      system: "You are a creative quiz master.",
      prompt: "Generate a multiple-choice question with four options. Format the response as JSON: { 'question': '...', 'choices': ['A', 'B', 'C', 'D'], 'answer': 'Correct Answer' }.",
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
// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
```

---

### **📜 Step 4: Update `views/index.hbs` (Main Page)**
This ensures **HTMX loads new AI-generated flashcards dynamically**.

```html
<h1>AI-Powered Flashcard Battle</h1>

<div id="flashcard-container">
    {{> flashcard}}
</div>

<button hx-get="/flashcard" hx-target="#flashcard-container" hx-swap="outerHTML">
    Next Question
</button>
```

---

### **📜 Step 5: Update `views/flashcard.hbs` (Flashcard Partial)**
This **renders each new flashcard dynamically**.

```html
<div class="flashcard">
    <p><strong>Question:</strong> {{flashcard.question}}</p>
    <button hx-get="/flashcard" hx-target="#answer" hx-swap="outerHTML">Show Answer</button>
    <p id="answer" style="display: none;"><strong>Answer:</strong> {{flashcard.answer}}</p>
</div>
```

---

### **📜 Step 6: Run the Updated Project**
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