const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const PORT = 3000;

// Story storage (in-memory)
let story = [
  "Once upon a time, in a land far, far away..."
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
