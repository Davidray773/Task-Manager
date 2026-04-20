# Task Manager Frontend

This frontend is the React + Vite user interface for the Task Manager application. It connects to the backend API and provides authentication, dashboard, task management, and admin user management.

## Features

- User signup and login
- Role-based routing for admin and regular users
- Admin dashboard with task and user management
- User dashboard with task overview and task details
- File upload support for profile photos
- Redux state management with persistence
- Tailwind CSS styling and responsive layout

## Project Structure

- `src/`
  - `pages/`
    - `auth/` - Login and signup pages
    - `admin/` - Admin dashboard, task management, and user management pages
    - `user/` - User dashboard, task details, and personal task list pages
  - `components/` - Shared UI components such as layout, navbar, cards, and charts
  - `redux/` - Redux store and user slice
  - `routes/` - Protected routing logic
  - `utils/` - API client, helper functions, and upload utilities

## Prerequisites

- Node.js 18+ installed
- Backend server running at `http://localhost:3000`

## Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the app in the browser at the local Vite address shown in the terminal (usually `http://localhost:5173` or `http://localhost:5174`).

## Build

To build the frontend for production:

```bash
npm run build
```

## Preview

To preview the production build locally:

```bash
npm run preview
```

## Notes

- The frontend expects the backend API base URL in `src/utils/axioInstance.js` as `http://localhost:3000/api`.
- Authentication uses cookies and token-based verification, so the backend must support CORS with credentials enabled.
- Admin-only features are available when a logged-in user has the `admin` role.
