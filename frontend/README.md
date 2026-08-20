# Muhammad Qasim — Portfolio (Full Stack)

A React + Vite portfolio site with a full MERN backend and a built-in admin
panel for managing content (projects, skills, certificates, services, about,
statistics, and contact messages) without touching code.

- **Frontend:** React, Vite, React Router, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth — see `backend/README.md` for full API docs

## Project Structure

```
/                     Frontend (Vite + React)
  src/
    pages/            Public site pages (Home, About, Journey, Projects, ...)
    components/        Shared UI (Navbar, Footer, StarField, ProjectBanner, ...)
    data/              Static fallback content (projects, certificates, semesters, ...)
    services/          Axios API client + per-resource service functions
    admin/             Admin panel (login, layout, management pages)
  public/              Static assets (favicon, resume PDF)
backend/               MERN backend — see backend/README.md
```

## Running Locally

You need two terminals — one for the backend, one for the frontend.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env      # then fill in MONGODB_URI, JWT secrets, email creds
npm run seed               # populates MongoDB with the real portfolio content
npm run dev                 # starts the API on http://localhost:5000
```

See `backend/README.md` for the full environment variable list, API
reference, and security notes.

### 2. Frontend

```bash
npm install
cp .env.example .env       # VITE_API_URL defaults to http://localhost:5000/api
npm run dev                 # starts the site on http://localhost:5173
```

### 3. Admin Panel

Visit `http://localhost:5173/admin/login` and sign in with the
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` you set in `backend/.env` before
seeding. From there you can manage:

- About section (bio, social links)
- Skills, Education, Experience
- Projects (title, description, tech, category, semester, links)
- Certificates
- Services
- Statistics (the animated counters shown on the public site)
- Contact messages received through the public contact form

## Frontend ↔ Backend Integration

The contact form on `/contact` is fully wired to the backend: submissions
are validated, saved to MongoDB, and emailed to the admin address.

The public content pages (Projects, Skills, Certificates, Services, About,
Statistics) currently render from the static files in `src/data/` and
in-page arrays — this keeps the site fully functional even without the
backend running (e.g. on static hosting). The `src/services/` API client is
ready to use; swapping any page from static data to a live `useEffect` +
API call is a small, mechanical change (see `src/admin/pages/*.jsx` for the
pattern: fetch on mount, loading state, render). The admin panel already
reads and writes through the real API.

## Building for Production

```bash
npm run build      # frontend -> dist/
cd backend && npm start   # backend, set NODE_ENV=production and a real MONGODB_URI
```
