require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const ai = require('ai');
const openaiSDK = require("@ai-sdk/openai");
const db = require("./database");


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
app.use(express.urlencoded({ extended: true }));

// Home route - renders form
app.get("/", (req, res) => {
  res.render("index");
});

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


// Function to generate an AI-powered hackathon idea
async function generateIdea(keyword) {
  try {
    const { text } = await ai.generateText({
      model: openaiSDK.openai('gpt-4o-mini'),
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

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
