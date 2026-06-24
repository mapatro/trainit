# TrainIt — Claude context

TrainIt is a lightweight, **pure-HTML** training site (no framework, no build step for
the chapters themselves). Each **course** is a folder of self-contained `.html` chapter
pages under `courses/<slug>/`.

- **Repo:** `github.com/mapatro/trainit` · **Local:** `C:\Projects\trainit\`
- **Live:** `trainit.patroventure.com` (HTTP live; HTTPS cert issued by GitHub when eligible)
- **Deploy:** automatic via **GitHub Actions** (`.github/workflows/pages.yml`) on push to
  `main`. The deploy step takes ~4 min. **Do NOT switch Pages back to "Deploy from a
  branch"** — the legacy Jekyll builder failed silently on this repo.
- **Courses today:** `mulesoft` (12 chapters), `digital-marketing` (14 chapters, a
  ClearEaty growth course).

## Read these first

- **`README.md` is the playbook** for everything here — the **chapter contract**, the two
  ways to build a course (Pattern A: provided chapter files; Pattern B: generated from a
  spec), how to register a course in `data/courses.js`, the `?v=` cache-buster, and the
  Actions deploy. Follow it whenever adding or editing a course.
- For parent-business context (other Patroventure products, expenses, ideas, launch
  standards), read **`C:\Projects\patroventure-business\CLAUDE.md`**. TrainIt is listed
  in that folder's `PRODUCTS.md`.

## Quick facts for edits

- `data/courses.js` is the single source of truth for the catalog + chapter lists; the
  catalog and course pages render from it (no HTML edit to list a new course/chapter).
- After changing `data/courses.js`, bump the `?v=` on every `courses.js` include.
- Chapter pages are **self-contained** (own inline CSS/JS); only the root `index.html`
  and the per-course `index.html` / `start-here.html` use `assets/css/styles.css`.
- Node is available locally for generator/transform scripts; Python is not. Run throwaway
  scripts from a scratch dir (e.g. `C:\Projects\_build\`) and delete it.
