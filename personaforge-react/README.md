# PersonaForge AI — React Frontend

A React + Vite + Tailwind conversion of the PersonaForge AI static HTML prototype. Build AI personas through a guided interview, generate production-grade system prompts, score them, and reuse them across ChatGPT, Claude, Gemini, and more.

## Tech Stack

- **React 18** — function components + hooks only
- **React Router v6** — client-side routing
- **Vite** — dev server and build tool
- **Tailwind CSS** — utility-first styling, configured with the PersonaForge design tokens (dark theme, purple/teal accents, Space Grotesk + Inter)

No TypeScript, no Redux — state is local (`useState`) or passed via props/context (`ToastProvider`). Swap in a real backend by replacing `src/data/mockData.js` with API calls.

## Getting Started

```bash
npm install
npm run dev       # starts Vite dev server at http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build locally
```

## Project Structure

```
personaforge-react/
├── index.html                     # Vite entry HTML (loads Google Fonts)
├── package.json
├── vite.config.js
├── tailwind.config.js             # design tokens: colors, fonts, animations
├── postcss.config.js
├── .eslintrc.json
├── .gitignore
└── src/
    ├── main.jsx                   # ReactDOM root + BrowserRouter
    ├── App.jsx                    # all route definitions
    ├── styles/
    │   └── index.css              # CSS vars, Tailwind directives, shared classes
    ├── data/
    │   └── mockData.js            # personas, templates, versions, suggestions (swap for API)
    ├── hooks/
    │   └── useBuilderForm.js      # multi-step builder form state
    ├── context/                   # (reserved for future auth/user context)
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.jsx        # left nav, active route highlighting
    │   │   ├── Topbar.jsx         # page title, search, mobile hamburger
    │   │   └── AppShell.jsx       # combines Sidebar + Topbar for app pages
    │   ├── ui/
    │   │   ├── Toast.jsx          # ToastProvider + useToast() hook
    │   │   ├── ScoreRing.jsx      # SVG circular score indicator
    │   │   └── PersonaCard.jsx    # reusable card w/ dropdown menu, archive
    │   └── builder/
    │       ├── OptionChip.jsx     # selectable card used in builder steps
    │       └── TagInput.jsx       # Enter-to-add tag input (always/never rules)
    └── pages/
        ├── Landing.jsx            # /
        ├── Auth.jsx                # /login, /register (tabbed)
        ├── Dashboard.jsx           # /dashboard
        ├── Builder.jsx             # /persona/new — 6-step interview
        ├── PersonaDetail.jsx       # /persona/:id — prompt, score, versions
        ├── Personas.jsx            # /personas — grid/list, search, archive
        ├── Templates.jsx           # /templates — featured + filterable grid
        ├── History.jsx             # /history — timeline of all prompt versions
        ├── Settings.jsx            # /settings — profile, security, plan, danger zone
        ├── Profile.jsx             # /u/:username — public profile
        └── NotFound.jsx            # * — 404 fallback
```

## Routes

| Path | Page | Notes |
|---|---|---|
| `/` | Landing | Public marketing page |
| `/login`, `/register` | Auth | Same component, tab state synced to URL |
| `/dashboard` | Dashboard | Stats, persona grid, activity, quick templates |
| `/persona/new` | Builder | 6-step form with live preview sidebar |
| `/persona/:id` | PersonaDetail | Tabs: Prompt / Score / Suggestions / Versions |
| `/personas` | Personas | Full library — grid or list view, archive/unarchive |
| `/templates` | Templates | Browse + filter + preview modal |
| `/history` | History | All prompt versions grouped by month, expandable |
| `/settings` | Settings | Profile, preferences, notifications, security, plan, danger zone |
| `/u/:username` | Profile | Public profile — personas / activity / about tabs |
| `*` | NotFound | 404 with quick links back into the app |

## Design System

Defined as CSS variables in `src/styles/index.css` and mirrored in `tailwind.config.js`:

- **Background:** `#0A0A0F` (bg) / `#111118` (surface) / `#16161E` (card)
- **Accent:** Purple `#7C6FE0` → `#9B8EF5`, Teal `#2DD4A8`
- **Type:** Space Grotesk (display/headings), Inter (body)
- **Borders:** subtle `rgba(255,255,255,0.07)`, hover state `0.13`

Reusable classes (`.card`, `.btn-primary`, `.btn-outline`, `.tag`, `.form-input`, `.toggle`) live in `index.css` so every page styles consistently without repeating Tailwind chains.

## State & Data

This is a frontend-only prototype — `src/data/mockData.js` exports the personas, templates, prompt versions, and suggestions used across every page. To connect a real backend (e.g. the Spring Boot API described in the product design docs):

1. Replace the static exports in `mockData.js` with `fetch`/`axios` calls (consider React Query for caching).
2. Add an `AuthContext` in `src/context/` to track the logged-in user and protect routes.
3. Wire `Auth.jsx`'s `handleLogin`/`handleRegister` to real `POST /api/auth/login` / `register` endpoints and store the JWT.
4. Replace the simulated "Generate Persona" timeout in `Builder.jsx` with a call to `POST /api/prompts/generate`.

## Accessibility

Carried over from the original HTML prototype: semantic roles (`role="list"`, `role="tablist"`, `role="dialog"`), `aria-label`/`aria-pressed`/`aria-selected` on interactive elements, keyboard support (`Enter`/`Space`) on custom buttons and cards, and visible focus states via Tailwind's default ring utilities plus custom `:focus-within` borders on inputs.
