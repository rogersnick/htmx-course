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

// Home route
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

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
