# TrainIt

A lightweight, **pure-HTML** training site, hosted under `trainit.patroventure.com`.
Each **course** (MuleSoft, Database, PowerBI, …) is a folder of self-contained
`.html` chapter pages. No build step, no framework — open `index.html` and go.

## Structure

```
trainit/
├── index.html              # Catalog — lists every course
├── CNAME                    # Custom domain for GitHub Pages (trainit.patroventure.com)
├── .nojekyll                # Tell GitHub Pages to serve files as-is
├── assets/
│   ├── css/styles.css       # Styles for catalog + course-index pages only
│   └── js/main.js           # Renders the catalog from data/courses.js
├── data/
│   └── courses.js           # Single source of truth: courses + chapters
└── courses/
    └── mulesoft/
        ├── index.html       # Course overview + chapter list (auto-generated)
        └── chapter-1.html   # A provided, fully self-contained chapter page
```

> **Chapter pages are self-contained** — each carries its own inline CSS/JS and does
> not use `assets/css/styles.css`. Only `index.html` and the course pages do.

## Adding a chapter (the normal workflow)

1. Drop the new file in Downloads as `mulesoft-chapter-N.html` (the existing naming).
2. It gets placed as `courses/mulesoft/chapter-N.html`, branded under TrainIt
   (TrainIt nav bar at the top, footer line) — design otherwise untouched.
3. In `data/courses.js`, set that chapter's `ready: true`.
4. Commit & push — GitHub Pages redeploys automatically.

## Adding a whole new course (Database, PowerBI, …)

1. `mkdir courses/<slug>` (e.g. `courses/powerbi`).
2. Copy `courses/mulesoft/index.html` as a template; change the slug + titles.
3. Add the chapter `.html` files.
4. Add a course entry to the `COURSES` array in `data/courses.js` and set
   `available: true`. The catalog renders itself — no edit to root `index.html`.

## Deploy (GitHub Pages → trainit.patroventure.com)

This folder is a git repo ready to push. One-time setup:

1. **Create the repo** on GitHub (e.g. `patroventure/trainit`) and push:
   ```bash
   git remote add origin https://github.com/<owner>/trainit.git
   git push -u origin main
   ```
2. **Enable Pages**: repo → Settings → Pages → Source = *Deploy from a branch* →
   Branch `main` / `/ (root)` → Save. The `CNAME` file sets the custom domain.
3. **DNS** (at patroventure.com's DNS provider): add a record
   `CNAME  trainit  →  <owner>.github.io`
4. Wait for DNS + Pages to issue HTTPS (a few minutes to ~an hour). Done.

Every later `git push` to `main` redeploys automatically.
