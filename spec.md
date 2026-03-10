# Sidharth and Sahitya Treaty

## Current State
All data (calendar notes and treaty signatures) is stored in React `useState` only. Every page refresh wipes everything. There is no persistence layer -- the backend is essentially empty.

## Requested Changes (Diff)

### Add
- Backend: `addNote`, `deleteNote`, `getNotes` -- store/retrieve calendar notes (id, date, title, description, author)
- Backend: `signTreaty`, `getSignatures` -- store treaty signatures per user (Sidharth / Sahitya)
- Frontend: Load notes and signatures from backend on mount
- Frontend: Write to backend on add/delete note and on sign treaty

### Modify
- Frontend: Replace in-memory `useState` for notes and signatures with backend-synced state

### Remove
- Frontend: `INITIAL_NOTES` hardcoded seed data (replaced by backend-loaded data)

## Implementation Plan
1. Update `main.mo` to expose note CRUD and treaty signature APIs with stable storage
2. Regenerate `backend.d.ts` types
3. Update `App.tsx` to call backend on mount and on every mutation
