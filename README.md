# TrainIt

A lightweight, **pure-HTML** training site, hosted at `trainit.patroventure.com`.
Each **course** (MuleSoft, Digital Marketing, …) is a folder of self-contained
`.html` chapter pages. No framework. Deployed by GitHub Actions.

This README is also the **playbook for adding a new course** — follow it and a new
course (Database, PowerBI, …) comes out looking and behaving exactly like the
existing two.

## Structure

```
trainit/
├── index.html                      # Catalog — lists every course (data-driven)
├── CNAME                           # Custom domain (trainit.patroventure.com)
├── .nojekyll                       # Serve files as-is (no Jekyll)
├── .github/workflows/pages.yml     # Deploy: uploads repo → GitHub Pages
├── assets/
│   ├── css/styles.css              # Styles for the CATALOG + COURSE-INDEX pages only
│   └── js/main.js                  # Renders the catalog from data/courses.js
├── data/
│   └── courses.js                  # SINGLE SOURCE OF TRUTH: courses + chapters
└── courses/
    ├── mulesoft/                   # Course built from PROVIDED chapter files (Pattern A)
    │   ├── index.html              # Course overview (renders its chapter list from courses.js)
    │   └── chapter-1.html … 12     # Self-contained chapter pages
    └── digital-marketing/          # Course built from a SPEC via a generator (Pattern B)
        ├── index.html
        ├── start-here.html         # Optional one-page intro/brief
        └── chapter-1.html … 14
```

> **Chapter pages are self-contained** — each carries its own inline CSS/JS (Google
> Fonts via CDN is fine) and does **not** use `assets/css/styles.css`. Only the root
> `index.html` and the per-course `index.html`/`start-here.html` use the shared CSS.

---

## The TrainIt chapter contract

Every `courses/<slug>/chapter-N.html`, however it's authored, must have all of:

1. **Title:** `Chapter N · <Subtitle> — <Course Name> · TrainIt`
2. **Top nav bar** placed immediately before `<header class="hero">`:
   `TrainIt / <Course> / Chapter N` plus a right-aligned `← All chapters` link to
   `index.html` (dark bar, JetBrains Mono — copy it from any existing chapter).
3. **Footer** begins with `TrainIt · ` (e.g. `TrainIt · MuleSoft × Claude Code · Chapter N of 12 · …`).
4. **Left-nav course map** (not a top strip): the content sits in
   `<div class="course-shell"><aside class="sidenav">…</aside><main class="course-main">…</main></div>`.
   The sidenav is `<ol class="sidenav-list">` of **clickable** items —
   `<li class="active"><a href="chapter-N.html"><b>NN</b> Title</a></li>` for the
   current chapter, `class="done"` for earlier ones, plain `<li>` for later ones.
5. **Responsive + accessible:** sidebar collapses under 900px; respects
   `prefers-reduced-motion`.

The shared `<style>` block + left-nav CSS are identical across chapters — copy from an
existing chapter, or (Pattern B) keep them in the generator.

---

## Adding a course — Pattern A: provided chapter files (how MuleSoft was built)

Use when chapters arrive as ready-made HTML (e.g. authored in claude.ai chat),
dropped in `Downloads` as `<slug>-chapter-N.html` (often minified, self-contained).

1. `mkdir courses/<slug>`.
2. For each provided file → copy to `courses/<slug>/chapter-N.html`, then apply the
   **chapter contract** above. Because files may be minified, do the edits with a small
   **Node transform script** (string replaces) rather than by hand:
   - rewrite `<title>` to the contract format,
   - insert the nav bar before `<header class="hero">`,
   - prefix the footer with `TrainIt · `,
   - convert the top `roadmap`/`chips` block into the `course-shell` + `sidenav` +
     `course-main` layout, and **linkify** each sidebar `<li>` into an `<a href="chapter-N.html">`.
   (Run such throwaway scripts from a scratch dir like `C:\Projects\_build\`, then
   delete it — they don't need to live in the repo. Node is available; Python is not.)
3. Create `courses/<slug>/index.html` — copy `courses/mulesoft/index.html`, change the
   `slug` in its render script and the hero text.
4. Register the course in `data/courses.js` (see below) and deploy.

## Adding a course — Pattern B: generated from a spec (how Digital Marketing was built)

Use when you're given a **build spec** (a `.md` describing chapters/sections) and need
to author the content. This is the cleanest path for consistency.

1. Write **one Node generator** (`gen.js`) that holds: the shared `<style>`, the nav
   bar, the `sidebar(active)` + `course-shell` skeleton, small block helpers
   (`P`, `DO`, `PR` prompt box, `TEST`, `NOTE`, `MORE`, `FIG` for inline SVG), and a
   `CHAPTERS` array of content. Render each chapter already conforming to the contract.
2. **Ground the content in reality.** If the spec references a real product, read that
   product's repo/brand docs and fix any drift before generating (e.g. for ClearEaty:
   it's free/no-ads, US store + diaspora engine, *informational, not medical*).
3. Run it → it writes `courses/<slug>/chapter-1..N.html` and prints the `chapters:[…]`
   block for `data/courses.js`.
4. Create `courses/<slug>/index.html` (copy `courses/digital-marketing/index.html`,
   change slug + hero). Optionally add a `start-here.html` brief and a "Read first"
   card at the top of the course index.
5. Register the course in `data/courses.js` and deploy.
6. Keep `gen.js` if you want reproducible regeneration (run from a scratch dir, or
   commit it under a `tools/` folder).

---

## Register the course in `data/courses.js`

`data/courses.js` is the only thing the catalog + course pages read. Add one object to
the `COURSES` array:

```js
{
  slug: "powerbi",                         // = folder name under courses/ and the URL
  title: "Power BI",
  category: "Analytics",                   // small tag shown on the catalog card
  summary: "One line describing the course.",
  available: true,                         // false → shows "Coming soon", no link
  chapters: [
    { file: "chapter-1.html", title: "…", ready: true },   // ready:false → listed, greyed
    // …
  ]
}
```

The root `index.html` and each course `index.html` render themselves from this — **no
HTML edit needed to list a new course or chapter.**

### Bump the cache-buster

The catalog JS is cached ~10 min by browsers. After changing `data/courses.js`, bump the
`?v=` on every `courses.js` include so returning visitors see it immediately:
`index.html`, and each `courses/<slug>/index.html` (currently `?v=3`).

---

## Deploy (GitHub Actions → trainit.patroventure.com)

Deployment is automatic via **`.github/workflows/pages.yml`** (Pages source = *GitHub
Actions*). Just:

```bash
git add -A && git commit -m "…" && git push origin main
```

The workflow uploads the repo and publishes it. The final "Deploy to GitHub Pages" step
takes **~4 minutes** (it waits for the CDN) — that's normal, not a hang. Watch it at
`github.com/mapatro/trainit/actions`.

> **Do not switch Pages back to "Deploy from a branch."** The legacy Jekyll builder
> failed silently on this repo ("Page build failed", no logs). The Actions workflow is
> the reliable path and gives real logs.

### After deploy
- Hard-refresh (**Ctrl+Shift+R**) to clear the 10-min page/JS cache.
- DNS: Namecheap `CNAME trainit → mapatro.github.io` (already set).
- **HTTPS:** the cert is issued by GitHub automatically once the domain is eligible; it
  can lag (minutes → hours). Enable *Settings → Pages → Enforce HTTPS* once it's valid.
  Site works on `http://` meanwhile.

---

## Quick checklist for a new course

- [ ] `courses/<slug>/` created; chapters named `chapter-N.html`
- [ ] Every chapter meets the **chapter contract** (title, nav, footer, clickable left-nav)
- [ ] `courses/<slug>/index.html` created (slug + hero updated)
- [ ] (optional) `start-here.html` + "Read first" card
- [ ] Course added to `COURSES` in `data/courses.js`
- [ ] `?v=` cache-buster bumped on all `courses.js` includes
- [ ] Committed, pushed; Actions run green; spot-checked live URLs (HTTP 200)
