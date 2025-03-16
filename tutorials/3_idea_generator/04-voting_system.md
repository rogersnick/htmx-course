### 🚀 **Enhancing the Hackathon Idea Generator with Voting System**  
This update adds:  
✅ **Voting system (Upvote / Downvote)** to rate generated ideas.  
✅ **Persistent vote count stored in session** (Resets when the page refreshes).  
✅ **HTMX updates votes dynamically without page reloads**.  

---

## **📂 Updated Project Structure**
```
hackathon-idea-generator/
│── views/
│   ├── layout.hbs
│   ├── index.hbs
│   ├── idea.hbs
│   ├── votes.hbs
│── public/
│   ├── styles.css
│── server.js
│── .env
│── package.json
```

---

## **📜 Step 1: Install `sqlite3`

```bash
npm i sqlite3
```

## **📜 Step 2: Create `database.js` (SQLite Database Setup)**

This script:  
✅ **Initializes a database to store hackathon ideas and votes**  
✅ **Ensures each idea is stored with its vote count**  

```javascript
const Database = require("better-sqlite3");

const db = new Database("ideas.db");

// Initialize the table for ideas
db.prepare(`
    CREATE TABLE IF NOT EXISTS ideas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        idea TEXT,
        votes INTEGER DEFAULT 0
    )
`).run();

module.exports = db;
```

## **📜 Step 3: Update `server.js` to Create New Ideas in Database**

- Stores **vote count in database**.  
- Updates **votes dynamically via HTMX**.

```javascript
const db = require("./database");
...
// API route to generate an AI-powered idea and store it in the database
app.post("/generate", async (req, res) => {
  const category = req.body.category;
  const idea = await generateIdea(category);

  const stmt = db.prepare("INSERT INTO ideas (category, idea, votes) VALUES (?, ?, ?)");
  stmt.run(category, idea, 0, function(err) {
    if (err) {
      return res.status(500).send("Database error");
    }
    // Use this.lastID within the callback to access the generated id
    const savedIdea = { id: this.lastID, idea, votes: 0 };
    res.render("idea", { idea: savedIdea.idea, votes: savedIdea.votes, ideaId: savedIdea.id });
  });
});
```

---

## **📜 Step 4: Update `views/idea.hbs` (Idea Partial)**

- Adds **upvote / downvote buttons**.  

```html
<div id="idea-container">
    <h2>Generated Idea:</h2>
    <p>{{idea}}</p>

    <div id="votes-container">
        {{> votes}}
    </div>

    <button hx-post="/generate" hx-target="#idea-container" hx-swap="outerHTML">
        Generate Another Idea
    </button>
</div>
```

---

## **📜 Step 5: Create `views/votes.hbs` (Votes Partial)**

- Displays **current vote count**.  
- Clicking **upvote/downvote updates the vote count** dynamically.  

```html
<p>Votes: <span id="vote-count">{{votes}}</span></p>

<button hx-post="/vote-up" hx-target="#votes-container" hx-swap="outerHTML">
    👍 Upvote
</button>

<button hx-post="/vote-down" hx-target="#votes-container" hx-swap="outerHTML">
    👎 Downvote
</button>
```
---

## **📜 Step 6: Update `server.js` to record votes

We will now create the routes to handle voting up and down. Keeping this as simple as possible:

```js
// API route to upvote an idea
app.post("/vote-up/:id", (req, res) => {
  const ideaId = req.params.id;
  db.run("UPDATE ideas SET votes = votes + 1 WHERE id = ?", ideaId, function(err) {
    if (err) {
      return res.status(500).send("Database error");
    }
    db.get("SELECT votes FROM ideas WHERE id = ?", ideaId, (err, row) => {
      if (err) {
        return res.status(500).send("Database error");
      }
      res.render("votes", { votes: row.votes, ideaId });
    });
  });
});

// API route to downvote an idea
app.post("/vote-down/:id", (req, res) => {
  const ideaId = req.params.id;
  db.run("UPDATE ideas SET votes = votes - 1 WHERE id = ?", ideaId, function(err) {
    if (err) {
      return res.status(500).send("Database error");
    }
    db.get("SELECT votes FROM ideas WHERE id = ?", ideaId, (err, row) => {
      if (err) {
        return res.status(500).send("Database error");
      }
      res.render("votes", { votes: row.votes, ideaId });
    });
  });
});
```

Check-in - make sure everything is working. Open the network inspector and look at the html to understand what htmx is doing here.

---

## **📜 Step 4: Run the AI-Powered Hackathon Idea Generator with Voting**

```sh
node server.js
```

Then open **http://localhost:3000** in your browser.

---

## **🎯 What This Enhancement Achieves**

✔ **Upvote / Downvote Feature with Live Updates**.  
✔ **HTMX-Based Dynamic Content Updates (No Page Refresh)**.  

---
