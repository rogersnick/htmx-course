require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const { generateFlashcard } = require('./lib/generate-flash-card');

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
app.get("/", async (_req, res) => {
  const flashcard = await generateFlashcard();
  res.render("index", { flashcard });
});

// API route to generate a new flashcard dynamically
app.get("/flashcard", async (_req, res) => {
  console.log('get flashcard')
  const flashcard = await generateFlashcard();
  res.render("flashcard", { flashcard });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
