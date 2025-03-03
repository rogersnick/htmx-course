### 🚀 **Enhancing AI-Powered Flashcard Battle – Multiple Choice + Scoring**

We'll improve the **Flashcard Battle** by adding:  
✅ **Multiple-choice answers** instead of open-ended questions.  
✅ **Real-time score tracking** (stored in session).  
✅ **HTMX-based feedback system** (correct/incorrect response updates dynamically).  

---

## **📂 Updated Project Structure**

```tree
flashcard-battle/
│── views/
│   ├── layout.hbs
│   ├── index.hbs
│   ├── flashcard.hbs
│   ├── feedback.hbs
│── public/
│   ├── styles.css
│── lib/
│   ├── generate-flash-card.js
│── server.js
│── package.json
```

---

## **📜 Step 1: Install dependencies and update `server.js`**

We'll start this upgrade by installing a new package.

```bash
npm i express-session
```

This package will set up a basic session management middleware for our requests. We will use it to facilitate scoring. If we wanted to use this in production, we could attach a more durable memory store, but for now, we'll just use the default in memory store. Add the following near the top of `server.js`.

```javascript
const session = require("express-session");

...

app.use(
  session({
    secret: "flashcard-secret",
    resave: false,
    saveUninitialized: true,
  })
);
```

Now that we have our sessions configured, we can access it in our routes to associate scores with our users. We will set the score to zero during the initial page load, and increment it any time the user has a correct answer.

```javascript
// Home route - set initial score to zero
app.get("/", async (req, res) => {
  req.session.score = 0; // Reset score at start
  const flashcard = await generateFlashcard();
  res.render("index", { flashcard, score: req.session.score });
});

// API route - check answer and increment if correct
app.post("/check-answer", (req, res) => {
  const { selectedAnswer, correctAnswer } = req.body;
  const isCorrect = selectedAnswer === correctAnswer;

  if (isCorrect) {
    req.session.score = (req.session.score || 0) + 1;
  }

  res.render("feedback", { isCorrect, score: req.session.score });
});
```

## **📜 Step 2: Update The Prompt (Create Multiple Choice Questions)**

We can instruct the AI to generate a **question + four answer choices** using the Task, Response, Format method.

```javaascript
// lib/generate-flash-card.js
const prompt = `
Task:
Generate a multiple-choice question with four options.

Response:
Please provide a response in plain valid json, without any markdown formatting.

Format:
{
  "question": "...",
  "choices": ["A: ...", "B: ...", "C: ...", "D: ..."],
  "answer": "Correct Answer" 
}
`
```

You can customize the topics and style of questions by changing the `system_prompt`. Try "You are a quiz master focused on HTMX attributes.", or "You are a cave man struggling to communicate, and can only use one syllable words." for a little fun. Experiment with your own.

---

## **📜 Step 3: Update `views/flashcard.hbs` (Flashcard Partial)**
- Renders **multiple-choice options**.  
- submitting the form **sends data to `/check-answer`**.  

We will update the flash card partial with a form that has one selection for each of the flashcard choices, and an empty div to catch the feedback. We'll use `hx-target` to tell htmx that we want to replace that div with the returned HTML from the `/check-answer` route after the form is submitted and posts there.. 

```html
<div class="flashcard">
    <p><strong>Question:</strong> {{flashcard.question}}</p>

    <form hx-post="/check-answer" hx-target="#feedback-container" hx-swap="outerHTML">
        {{#each flashcard.choices}}
            <label>
                <input type="radio" name="selectedAnswer" value="{{this}}" required>
                {{this}}
            </label><br>
        {{/each}}
        <input type="hidden" name="correctAnswer" value="{{flashcard.answer}}">
        <button type="submit">Submit Answer</button>
    </form>

    <div id="feedback-container"></div>
</div>
```

---

## **📜 Step 5: Create `views/feedback.hbs` (Feedback Partial)**
- Displays **correct/incorrect message**.  
- Updates **score dynamically**.

```html
<div>
    {{#if isCorrect}}
        <p style="color: green;"><strong>✅ Correct!</strong></p>
    {{else}}
        <p style="color: red;"><strong>❌ Incorrect.</strong></p>
    {{/if}}
    <p>Current Score: <span id="score">{{score}}</span></p>
</div>
```

---

## **📜 Step 6: Run the Enhanced Project**
```sh
node server.js
```
Then open **http://localhost:3000** in your browser.

---

## **🎯 New Features Added**
✔ **AI-Generated Multiple-Choice Questions**.  
✔ **Interactive Answer Checking (HTMX Form Submission)**.  
✔ **Score Tracking (Session-Based, Updates Dynamically)**.  

---
