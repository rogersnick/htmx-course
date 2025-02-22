# Hackathon Idea Generator

## Original MVP

A minimal project that takes a user keyword and returns a random hackathon idea.

## Enhancements

- AI-Powered Idea Generation with categories.
- Persistent Database (using better-sqlite3) for storing and tracking votes.
- Voting System with upvote/downvote.
- Real-Time Updates via WebSockets—all users see vote changes instantly.

## Key Concepts

- Database integration to store generated ideas and track votes.
- HTMX partial updates for up/down voting.
- WebSockets to broadcast changes to all connected clients (no polling).
- AI (OpenAI) to create fresh hackathon ideas per category.
