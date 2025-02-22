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

// Home route - load a random flashcard
app.get("/", (req, res) => {
  const flashcard = flashcards[Math.floor(Math.random() * flashcards.length)];
  res.render("index", { flashcard });
});

// API route to get a new flashcard
app.get("/flashcard", (req, res) => {
  const flashcard = flashcards[Math.floor(Math.random() * flashcards.length)];
  res.render("flashcard", { flashcard });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
