### 🚀 **MVP for Crowd-Powered Story Builder**  
This project allows users to **collaboratively write a story** by submitting short snippets. HTMX dynamically updates the story without page reloads.  

---

## **📌 Features in MVP**
✅ Displays a **starter sentence**.  
✅ Users **submit a new sentence** using an input form.  
✅ HTMX **dynamically appends** the new sentence to the story.  

---

## **📂 Project Structure**
```
crowd-story-builder/
│── views/
│   ├── layout.hbs
│   ├── index.hbs
│   ├── story.hbs
│── public/
│   ├── styles.css
│── server.js
│── package.json
```

---

## **📜 Step 1: Install Dependencies**
```sh
mkdir crowd-story-builder && cd crowd-story-builder
npm init -y
npm install express express-handlebars
```

---

## **📜 Step 2: Create `server.js` (Main Express Server)**
This sets up an **Express server** that manages a **story array** in memory.

```javascript
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const PORT = 3000;

// Story storage (in-memory)
let story = [
  "Once upon a time, in a land far, far away..."
];

// Set up Handlebars
app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Serve static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Home route - displays the story
app.get("/", (req, res) => {
  res.render("index", { story });
});

// API route to add a new sentence
app.post("/add-sentence", (req, res) => {
  const newSentence = req.body.sentence.trim();
  if (newSentence) {
    story.push(newSentence);
  }
  res.render("story", { story });
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
    <title>Crowd-Powered Story Builder</title>
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
This **renders the story and an input form for adding new sentences**.

```html
<h1>Crowd-Powered Story Builder</h1>

<div id="story-container">
    {{> story}}
</div>

<form hx-post="/add-sentence" hx-target="#story-container" hx-swap="outerHTML">
    <label>Add the next sentence:</label>
    <input type="text" name="sentence" required>
    <button type="submit">Submit</button>
</form>
```

---

## **📜 Step 5: Create `views/story.hbs` (Story Partial)**
This **renders the current story dynamically**.

```html
<div id="story-container">
    <h2>Current Story:</h2>
    {{#each story}}
        <p>{{this}}</p>
    {{/each}}
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
    background: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background: #0056b3;
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
✔ **Form Handling & Input Submission** (`hx-post` sends data without a full reload).  
✔ **Dynamic Content Updates** (`hx-target="#story-container"` appends sentences).  
✔ **Partial HTML Rendering** (Only updates the story section, not the whole page).  

---
