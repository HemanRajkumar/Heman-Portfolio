# Heman Rajkumar — 3D Portfolio + AI Project Assistant

A full-stack portfolio: a React + Vite + Tailwind + React Three Fiber frontend, and a
FastAPI + Gemini backend that powers an "ask me anything about my projects" chat assistant.

```
portfolio/
├── frontend/     Vite + React app (Tailwind, R3F, Framer Motion, next-themes)
└── backend/      FastAPI service wrapping the Gemini API for the chat assistant
```

## 1. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env
# edit .env and paste your Gemini API key (https://aistudio.google.com/app/apikey)
uvicorn main:app --reload --port 8000
```

The backend loads `backend/project_details.txt` at startup as the Gemini system context —
that file already contains your real CV/project data pulled from your resume. Edit it any
time you want the assistant to know something new; no code changes needed.

Two endpoints are exposed:
- `POST /api/chat` — single JSON response `{ "response": "..." }`
- `POST /api/chat/stream` — Server-Sent Events stream, used by the frontend chat widget
- `GET /api/health` — quick check that the server is up and the API key is configured

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env      # points the app at your backend, defaults to localhost:8000
npm run dev
```

Open the printed local URL. The app defaults to your OS's light/dark preference and can be
toggled manually from the navbar.

### Add your own assets
- `frontend/public/profile.jpg` — your photo for the hero frame (falls back to initials if missing)
- `frontend/public/resume.pdf` — your CV, wired to the download button in the Resume section
- `frontend/public/assets/*.gif` — short preview GIFs referenced by `src/data/projects.json`
  (cards hide the image gracefully if a GIF isn't there yet)

### Editing project content
All project cards are driven by `frontend/src/data/projects.json` — add, remove, or edit
entries there; no component changes needed. Skills, certifications, and achievements live in
`frontend/src/data/cvData.js`.

## 3. Production build

```bash
cd frontend && npm run build   # outputs to frontend/dist
```

Deploy `frontend/dist` to any static host, and the `backend/` FastAPI app to any Python host
(Render, Railway, Fly.io, a VPS, etc.). Update `FRONTEND_ORIGIN` in `backend/.env` and
`VITE_API_BASE_URL` in `frontend/.env` to point at your deployed URLs.

## Notes on the 3D scene
`Hero3D.jsx` checks for WebGL support and honors `prefers-reduced-motion`; if either is
unavailable it swaps in a static concentric-rings fallback so the page still loads fast and
accessibly on low-power or motion-sensitive devices.
