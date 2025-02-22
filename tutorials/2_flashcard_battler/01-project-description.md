
# AI-Powered Flashcard Battle

## Original MVP

A simple, HTMX-driven app loading random flashcards.

## Enhancements

- AI-Generated Multiple-Choice Questions (via the Vercel ai SDK and OpenAI).
- Two-Player Mode with alternating turns and dynamic scoring.
- Game Over Mode where first to 5 points wins.
- Restart Logic for instant replayability.

## Key Concepts

- Using HTMX to update partials without page reloads (e.g., `hx-get`/`hx-post`).
- Integrating OpenAI to generate random quiz questions.
- Managing Express Sessions for multi-player scoring.
- Implementing game logic (turn switching, game-over condition).
