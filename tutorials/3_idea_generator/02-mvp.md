### 🚀 **MVP for Hackathon Idea Generator**  

✅ A simple **form** where users enter a keyword.  
✅ The server **generates a hackathon project idea** based on that keyword.  
✅ Uses **HTMX to dynamically update the idea display** without a page reload.  

---

## **📂 Project Structure**
```
hackathon-idea-generator/
│── views/
│   ├── layout.hbs
│   ├── index.hbs
│   ├── idea.hbs
│── public/
│   ├── styles.css
│── server.js
│── package.json
```

---

## **📜 Step 1: Install Dependencies**
```sh
mkdir hackathon-idea-generator && cd hackathon-idea-generator
npm init -y
npm install express express-handlebars
```

---

## **📜 Step 2: Create `server.js` (Main Express Server)**
This **sets up the Express server**, serves **Handlebars views**, and generates **random project ideas**.

```javascript
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const PORT = 3000;

// Sample ideas
const ideas = [
  "A social network for {keyword} enthusiasts.",
  "A {keyword}-themed AI chatbot.",
  "An open-source {keyword} tool for developers.",
  "A mobile app that helps people learn {keyword} interactively.",
  "A decentralized platform for {keyword} collaboration.",
  "A {keyword} marketplace for buying and selling digital assets."
];

// Set up Handlebars
app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Serve static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Home route - displays the form
app.get("/", (req, res) => {
  res.render("index");
});

// API route to generate an idea
app.post("/generate", (req, res) => {
  const keyword = req.body.keyword || "random";
  const ideaTemplate = ideas[Math.floor(Math.random() * ideas.length)];
  const idea = ideaTemplate.replace("{keyword}", keyword);
  res.render("idea", { idea });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
```

---

## **📜 Step 3: Create `views/layout.hbs` (Base Layout)**
This **wraps all pages** in a simple structure.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hackathon Idea Generator</title>
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

## **📜 Step 4: Create `views/index.hbs` (Main Page)**
This **renders the form** and an empty area for the generated idea.

```html
<h1>Hackathon Idea Generator</h1>

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

## **📜 Step 5: Create `views/idea.hbs` (Idea Partial)**
This **renders the generated hackathon idea** dynamically.

```html
<div id="idea-container">
    <h2>Generated Idea:</h2>
    <p>{{idea}}</p>
    <button hx-post="/generate" hx-target="#idea-container" hx-swap="outerHTML">
        Generate Another Idea
    </button>
</div>
```

---

## **📜 Step 6: Create `public/styles.css` (Basic Styling)**
```css
body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 50px;
}

input {
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px;
    border: none;
    background: #28a745;
    color: white;
    cursor: pointer;
}

button:hover {
    background: #218838;
}
```

---

## **📜 Step 7: Run the Project**
```sh
node server.js
```
Then open **http://localhost:3000** in your browser.

---

## **🎯 How This MVP Teaches HTMX Basics**
✔ **Forms & User Input** (`hx-post` submits the keyword).  
✔ **Dynamic Content Swapping** (`hx-target="#idea-container"` updates the UI).  
✔ **Partial HTML Rendering** (Only replaces the idea section, not the whole page).  

---
