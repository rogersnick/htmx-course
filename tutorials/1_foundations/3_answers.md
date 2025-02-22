Below are concise code snippets demonstrating **one way** to address each of the checkpoint questions from Chapter 3.

---

## 1. Creating a Button That Fetches Data From a New Endpoint

### Client-Side (HTML)

```html
<!-- index.ejs or similar template -->
<button
  hx-get="/new-endpoint"
  hx-target="#target-div"
  hx-swap="innerHTML"
>
  Fetch Data
</button>

<div id="target-div">
  <!-- Response snippet from /new-endpoint will appear here -->
</div>

<!-- Include HTMX -->
<script src="https://unpkg.com/htmx.org@1.9.2"></script>
```

### Server-Side (Express Route)

```js
// index.js
app.get('/new-endpoint', (req, res) => {
  // Return a small HTML snippet (could be dynamic or from a partial)
  const snippet = `<p>Fresh data fetched from the server!</p>`;
  res.send(snippet);
});
```

**How It Works:**  
- When the button is clicked, HTMX makes a `GET` request to `/new-endpoint`.  
- The server responds with a snippet of HTML, which replaces the content inside the `<div id="target-div">`.

---

## 2. Handling an Error Message That Replaces Normal Content

### Client-Side (HTML)

```html
<!-- index.ejs or similar template -->
<div id="response-container">
  <p>This content will be replaced if the server returns an error snippet.</p>
</div>

<button
  hx-get="/error-example"
  hx-target="#response-container"
  hx-swap="innerHTML"
>
  Trigger Error
</button>

<!-- Include HTMX -->
<script src="https://unpkg.com/htmx.org@1.9.2"></script>
```

### Server-Side (Express Route)

```js
// index.js
app.get('/error-example', (req, res) => {
  // Simulate a server error by sending a 500 status
  res.status(500).send(`
    <p style="color: red;">
      Oops! Something went wrong on the server.
    </p>
  `);
});
```

**How It Works:**  
- Clicking **Trigger Error** calls `/error-example`.  
- The server responds with an HTTP 500 status code and an error message snippet (`<p style="color: red;">...`).  
- HTMX sees the valid (though error) HTML response and swaps it into `#response-container`, thereby replacing the original content.

---

### Further Considerations

- **Advanced Error Handling**: You can also listen for HTMX events like `htmx:responseError` in JavaScript if you want more granular control (e.g., show a custom alert or log details).  
- **Partial Templates**: Rather than returning inline HTML strings, you can render EJS or other templating language partials for both successful data fetches and error states.

These two examples illustrate the basic mechanics of fetching data and handling server-side errors in an HTMX-powered page without requiring a full page reload.