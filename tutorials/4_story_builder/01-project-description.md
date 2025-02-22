# Community Story Builder

## Original MVP

A crowd-edited story where users append lines in real time.

## Enhancements (making it a full Choose Your Own Adventure):

- Prisma + SQLite for storing story snippets and choices.
- AI-Generated Story Snippets: Each snippet spawns multiple possible “next actions,” and the crowd votes on which path to take.
- Voting System + Auto-Finalize after 24 hours (if there’s at least one vote).
- Countdown Timer on the UI to let users see how much time remains.
- Previous Snippet Links for easy navigation of the story chain.

## Key Concepts

- Persistent relational schema (snippets & choices) with Prisma.
- Branching logic: multiple possible next actions, each linking to new snippets.
- Deadline-based auto-finalization (background job) if no one finalizes manually.
- Coherent AI prompts referencing the entire or partial prior context to keep the story consistent.
