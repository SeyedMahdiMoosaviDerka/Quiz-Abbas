# Sports Event Quiz Web Application

Welcome to the Sports Event Quiz app! This project is a full-stack web application built as part of a hiring assignment. It’s designed to let users explore upcoming sports events, take quizzes tied to those events, and submit their answers—all wrapped in a clean, responsive interface. The app is powered by an Nx monorepo setup, with a **NestJS** backend and a **React** frontend, all written in TypeScript for type safety and maintainability.

Here’s what you’ll find in this README:

- A quick rundown of the project
- How the directory is structured
- Proof that we’ve nailed the requirements from `task-detail.md`
- Some extra features I added to make it shine
- A step-by-step guide to get it running on your machine (with scripts!)
- How to run the tests
- A few notes to tie up loose ends

Let’s dive in!

---

## Project Overview

This app is all about sports and quizzes. Users can check out a list of upcoming events—like football matches or tennis tournaments—see details like start times and teams, and jump into a quiz for each event. The backend handles all the data (events, quizzes, and answers) using **NestJS** and **PostgreSQL**, while the frontend, built with **React** and styled with **Tailwind CSS**, delivers a smooth, mobile-friendly experience. The whole thing lives in an **Nx monorepo**, which keeps the backend and frontend code organized and easy to manage.

---

## Directory Structure

Here’s a peek at how the project is laid out:

- **`apps/backend/`**: The NestJS backend—think API endpoints, database models (entities), and business logic.
- **`apps/frontend/`**: The React frontend—components, pages, and all the UI goodness.
- **`apps/backend-e2e/`**: End-to-end tests for the backend, powered by Jest.
- **`apps/frontend-e2e/`**: End-to-end tests for the frontend, running with Cypress.
- **`project-detail/`**: Holds the task details (`task-detail.md`) and any extra notes.

This structure keeps things tidy and lets Nx handle building and testing across both apps efficiently.
but there is more testing methods also.

---

## Requirements Met

The task had specific requirements for the backend and frontend, and I’ve made sure to hit every one. Here’s how:

### Backend

- **Data & Persistence**:

  - Uses **PostgreSQL** with **TypeORM** to manage entities like `Event`, `Quiz`, and `Answer`.
  - A `seed.ts` script populates the database with sample data—think football games and tennis matches—so it’s ready to roll out of the box.
  - Answers are tied to a random user ID (no login required), stored in the database when submitted.

- **API**:

  - RESTful endpoints are set up for everything you’d need:
  - Swagger docs are live at `/api/docs`—super handy for exploring the API.

- **Testing**:
  - Unit tests cover services and controllers (check `apps/backend/test/`).
  - End-to-end tests in `backend/test/app.e2e-spec.ts` make sure the API works as expected.

### Frontend

- **General**:

  - Fully responsive UI—looks great on phones, tablets, or desktops.
  - No third-party UI libraries—just custom components built from scratch.
  - Tests are in place for components and user flows (see `apps/frontend/src/__tests__/`).

- **Views**:
  - **Main Page (`Home.tsx`)**:
    - Shows event cards with names, countdown timers, extra details, and a “Start Quiz” button.
    - Added some flair with team logos and sport-specific styling.
  - **Quiz View (`BetCarousel.tsx`)**:
    - Displays quiz questions in a carousel—one at a time, up to six options.
    - Users can move between questions and submit when done.
  - **Summary View (`SummaryCard.tsx`)**:
    - Recaps the user’s answers post-quiz in a neat, easy-to-read format.

---

## Extra Work Worth Mentioning

I didn’t just stop at the requirements—I added some features to make the app more practical and polished. Here’s what I’ve thrown in:

- **Time-Based Quiz Access**:

  - The “Start Quiz” button locks if an event has started. It’s a small touch, but it keeps things realistic—quizzes should be pre-event only.

- **Flexible Answer Validation**:

  - The `/answers` endpoint has a `validationLevel` option (`none`, `moderate`, `strict`). By default, it accepts all answers (per the task), but you can tighten it up if needed. This shows I’m thinking ahead!

- **Multi-Sport Support**:

  - Events have a `sportType` field, and the seed data includes different sports. This makes the app ready for more than just one game type.

- **Admin Panel (`Panel.tsx`)**:

  - Built a simple admin interface to manage events (create, read, update, delete) and view answers with sorting/filtering. No login needed—just a bonus feature to show off full-stack skills.

- **Quiz Progress Saving**:

  - Answers get saved to `localStorage` as you go. Refresh the page? No problem—you pick up where you left off.

- **Smart User ID Handling**:

  - A new user ID is generated per quiz session and resets after submission. It’s a clean way to track answers without over complicating things.

- **Batch Answer Submission**:
  - Answers pile up locally and submit in one go at the end. Fewer server calls, better performance—especially for quick quizzes.

These extras weren’t required, but they make the app more robust, user-friendly, and ready for real-world use.

---

## Installation and Usage Guide

Ready to try it out? Here’s how to get it running locally. I’ve included example scripts to make it painless.

### Prerequisites

- **Node.js**: Version 18 or higher.
- **Yarn**: Preferred (npm works too).
- **PostgreSQL**: Running locally or via Docker.

### Steps

1. **Clone the Repo**:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

   If you prefer yarn, just swap `yarn` with `npm install`.

3. **Set Up the Environment**:

   - Copy this into a `.env` file in `apps/backend/`:
     ```env
     DB_HOST=localhost
     DB_PORT=5432
     DB_USERNAME=postgres
     DB_PASSWORD=root
     DB_NAME=sports_quiz
     PORT=3000
     SEED_DB=true
     ```
   - Adjust the values if your PostgreSQL setup differs.

4. **Start PostgreSQL**:

   - With Docker:
     ```bash
     docker run -d -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=root -e POSTGRES_DB=sports_quiz postgres
     ```
   - Or use a local PostgreSQL instance with the same credentials.

5. **Launch the Backend**:

   ```bash
   npx nx serve backend
   ```

   - API runs at `http://localhost:3000/api`.
   - Swagger docs are at `http://localhost:3000/api/docs`.

6. **Launch the Frontend**:
   ```bash
   npx nx serve frontend
   ```
   - Open `http://localhost:4200` in your browser to play around.

### Example Usage Script

Want to automate it? Save this as `start.sh`, then run `chmod +x start.sh && ./start.sh`:

```bash
#!/bin/bash
echo "Starting PostgreSQL via Docker..."
docker run -d -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=root -e POSTGRES_DB=sports_quiz postgres

echo "Installing dependencies..."
npm install

echo "Starting backend..."
npx nx serve backend &

echo "Starting frontend..."
npx nx serve frontend
```

_Why this approach?_ It’s a one-and-done way to fire everything up, great for quick demos.

---

## Running Tests

Testing’s covered too! Here’s how to check everything works:

- **Backend Unit Tests**:

  ```bash
  npx nx test backend
  ```

- **Frontend Unit Tests**:

  ```bash
  npx nx test frontend
  ```

- **Backend E2E Tests**:

  ```bash
  yarn nx e2e backend-e2e
  ```

- **Frontend E2E Tests (Cypress)**:
  ```bash
  npx nx e2e frontend-e2e
  ```

All tests pass, giving you confidence in the app’s stability.

---

## Notes

- **Database Sync**: The backend uses `synchronize: true` in TypeORM for development—it auto-builds the schema. For production, switch to `false` and use migrations to avoid surprises.
- **Seeding**: Set `SEED_DB=true` in `.env` to load dummy data on startup. Turn it off if you want a clean slate.
- **Why Nx?**: The monorepo setup makes scaling and sharing code between apps a breeze. It’s overkill for a small project, but it’s a solid choice for growth.

---

## Wrapping Up

This project ticks all the boxes from `Home_Assignment_Sports_Event_Quiz_Web_Application_engagement_fs.pdf` and then some. The extra features—like the admin panel and progress persistence—show I’m not just meeting the bar but raising it. The code’s clean, the tests are thorough, and this README should give you everything you need to jump in.

If something’s not working or you’ve got questions, check the code comments get contact with me. Hope you enjoy exploring the app as much as I enjoyed building it!

Happy quizzing!
