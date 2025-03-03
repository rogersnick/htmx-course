### 🚀 **MVP for Flashcard Battler**  
✅ Displays a random flashcard (question).  
✅ Clicking "Show Answer" reveals the answer using `hx-swap`.  
✅ Clicking "Next" loads a new question using `hx-get`.  

---

### **📂 Project Structure**
```
flashcard-battle/
│── views/
│   ├── layout.hbs
│   ├── index.hbs
│   ├── flashcard.hbs
│── public/
│   ├── styles.css
│── server.js
│── package.json
```

---

### **📜 Step 1: Install Dependencies**
```sh
mkdir flashcard-battle && cd flashcard-battle
npm init -y
npm install express express-handlebars
```

---

### **📜 Step 2: Create `server.js` (Main Express Server)**
This sets up the **Express server**, serves **Handlebars views**, and provides a simple API to get flashcards.

```javascript
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const PORT = 3000;

// Sample flashcards
const flashcards = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "What is the speed of light?", answer: "299,792,458 m/s" },
];

// Set up Handlebars
app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Serve static files (optional styling)
app.use(express.static("public"));

// Home route - load a random flashcard
app.get("/", (req, res) => {
  const flashcard = flashcards[Math.floor(Math.random() * flashcards.length)];
  res.render("index", { flashcard });
});

// API route to get a new flashcard (HTMX will use this)
app.get("/flashcard", (req, res) => {
  const flashcard = flashcards[Math.floor(Math.random() * flashcards.length)];
  res.render("flashcard", { flashcard });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
```

---

### **📜 Step 3: Create `views/layout.hbs` (Base Layout)**
This **wraps all pages** in a simple structure. This loads htmx for us from the unpkg CDN (content delivery network).

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flashcard Battle</title>
    <script src="https://unpkg.com/htmx.org@1.9.5"></script>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div class="container">
        {{{body}}}
    </div>
</body>
</html>
```

---

### **📜 Step 4: Create `views/index.hbs` (Main Page)**
This **loads the first flashcard** and sets up HTMX to fetch new ones.

```html
<h1>Flashcard Battle</h1>
<div id="flashcard-container">
    {{> flashcard}}
</div>
<button hx-get="/flashcard" hx-target="#flashcard-container" hx-swap="outerHTML">
    Next Question
</button>
```

We are referencing a separate template called `flashcard`, which we will create next. We will re-use this template for rendering new questions when they are requested from the front end.

---

### **📜 Step 5: Create `views/flashcard.hbs` (Flashcard Partial)**
This **renders a flashcard**, with a button to reveal the answer.

```html
<div class="flashcard">
    <p><strong>Question:</strong> {{flashcard.question}}</p>
    <button hx-get="/flashcard" hx-target="#answer" hx-swap="outerHTML">Show Answer</button>
    <p id="answer" style="display: none;"><strong>Answer:</strong> {{flashcard.answer}}</p>
</div>
```

We are going to use this partial both on the homepage as well as in subsequent requests to `/flashcard`. Using the same code twice is good practice so that we only need to update one spot if anything changes.

---

### **📜 Step 6: Create `public/styles.css` (Basic Styling)**
This **adds some simple styling**.

```css
body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 50px;
}

.flashcard {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    display: inline-block;
}

button {
    margin-top: 10px;
    padding: 10px;
    border: none;
    background: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background: #0056b3;
}
```

We are keeping this basic for now. Feeling adventurous? Try out some alternatives like tailwind and design to your heart's content.

---

### **📜 Step 7: Run the Project**
Start the server:
```sh
node server.js
```
Then open **http://localhost:3000** in your browser.

---

## **🎯 How This MVP Teaches HTMX Basics**

✔ **Dynamic Content Swapping** (`hx-get` loads new flashcards).  
✔ **Server-Rendered HTML Snippets** (No JSON API needed).  
✔ **Progressive Enhancement** (Works even if JavaScript is disabled).

---
