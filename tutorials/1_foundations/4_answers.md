**Checkpoint Question 1:**  
*“Which HTMX attribute(s) would you use if you wanted to validate an email field only after the user finishes typing (with a half-second delay)?”*

**Answer:**  
You would use a combination of `hx-get` (or `hx-post`), **plus** a carefully configured `hx-trigger` attribute that includes both `delay:500ms` (debouncing) and `changed` (only trigger if the value has actually changed). For example:

```html
<input
  type="email"
  name="email"
  hx-get="/validate-email"
  hx-trigger="keyup changed delay:500ms"
  hx-target="#email-feedback"
  hx-swap="innerHTML"
/>
```

This ensures that **every time** the user types in the email field, the request to `/validate-email` only fires if the input has changed and the user has paused typing for at least 500ms.

---

**Checkpoint Question 2:**  
*“How might you send multiple form fields to a single endpoint for real-time preview or validation, and what performance considerations should you keep in mind?”*

**Answer:**  
1. **Single Form, Shared Endpoint**  
   - Put all your fields (e.g., `title`, `content`, `tags`, etc.) inside **one form** and specify `hx-post="/preview"` (or `hx-get="/preview"`) on each field. Because HTMX automatically includes the other fields in the form data, the server sees the **complete** set of fields with every request, even if only one field changes.
   - Alternatively, if each field has its own `hx-post` or `hx-get`, you could unify them by using the same endpoint (`/preview`). This way, your server can generate one comprehensive preview based on all current form values.

2. **Performance Considerations**  
   - **Debouncing & Change Detection**: Use `delay:xxx` and `changed` to avoid spamming the server with a request on every keystroke.  
   - **Server Load**: Each field triggers a new request; for very large forms or high-traffic environments, you might want to combine updates or reduce how often they occur.  
   - **Concurrency**: If multiple fields trigger requests rapidly, ensure your server can handle concurrent previews or validations gracefully.  
   - **Response Size**: Sending back a large snippet for every small keystroke can be overkill. For complex previews, consider returning concise HTML or optimizing your data structures.

By carefully balancing these factors—using triggers to minimize unnecessary calls and returning efficient partials—you can provide real-time previews or validations without overloading the server or degrading user experience.