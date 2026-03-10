# Sidharth and Sahitya Treaty

## Current State
New project, no existing code.

## Requested Changes (Diff)

### Add
- Login page with username/password authentication
  - Accepted usernames: Sidharth, Sahitya
  - Shared password: Tillu
- After login, show a calendar-based system where users can add, view, and manage treaty notes/events per date
- Display logged-in user's name
- Logout button

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: Store calendar events/notes with date, title, description, and author (username)
2. Login logic: frontend-only credential check (Sidharth or Sahitya + password Tillu)
3. Calendar view: monthly calendar grid, click a date to add/view notes
4. Event list per selected date
5. Add/delete events tied to a date
