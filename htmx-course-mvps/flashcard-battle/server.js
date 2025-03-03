require("dotenv").config();
const express = require("express");
const session = require("express-session");
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

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "flashcard-secret",
    resave: false,
    saveUninitialized: true,
  })
);


// Home route - load the first AI-generated flashcard
app.get("/", async (req, res) => {
  req.session.score = 0; // Reset score at start
  const flashcard = await generateFlashcard();
  res.render("index", { flashcard });
});

// API route to generate a new flashcard dynamically
app.get("/flashcard", async (req, res) => {
  const flashcard = await generateFlashcard();
  res.render("flashcard", { flashcard });
});

// API route to check the answer
app.post("/check-answer", (req, res) => {
  const { selectedAnswer, correctAnswer } = req.body;
  const isCorrect = selectedAnswer === correctAnswer;

  // Update score in session
  if (isCorrect) {
    req.session.score = (req.session.score || 0) + 1;
  }

  res.render("feedback", { isCorrect, score: req.session.score, correctAnswer });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
