/* TrainIt — course catalog (single source of truth).
 *
 * The home page and each course page render their lists from this file,
 * so adding a chapter or a whole course is a data edit, not an HTML rewrite.
 *
 *   slug      folder name under courses/ (also the URL segment)
 *   title     display name
 *   category  short tag shown on the card
 *   summary   one-line description
 *   available false => shown as "Coming soon" (no link yet)
 *   chapters  ordered list of { file, title, ready }
 *               file  -> the .html in courses/<slug>/
 *               ready -> false means listed but not yet provided
 */
var COURSES = [
  {
    slug: "mulesoft",
    title: "MuleSoft with Claude Code",
    category: "Integration",
    summary: "From zero to MuleSoft Certified Developer Level 1, with Claude Code as your tutor.",
    available: true,
    chapters: [
      { file: "chapter-1.html",  title: "Foundations & first run",        ready: true  },
      { file: "chapter-2.html",  title: "Mule events & HTTP Listener",    ready: false },
      { file: "chapter-3.html",  title: "Calling APIs (HTTP Request)",    ready: false },
      { file: "chapter-4.html",  title: "File & Database connectors",     ready: false },
      { file: "chapter-5.html",  title: "DataWeave 2.0 transforms",       ready: false },
      { file: "chapter-6.html",  title: "Routers & flow control",         ready: false },
      { file: "chapter-7.html",  title: "Error handling",                 ready: false },
      { file: "chapter-8.html",  title: "API design (RAML / APIkit)",     ready: false },
      { file: "chapter-9.html",  title: "Batch processing",               ready: false },
      { file: "chapter-10.html", title: "Deploy to CloudHub",             ready: false },
      { file: "chapter-11.html", title: "Testing with MUnit",            ready: false },
      { file: "chapter-12.html", title: "Cert prep & portfolio",          ready: false }
    ]
  },

  // --- Future courses: drop a folder under courses/ and flip available. ---
  {
    slug: "database",
    title: "Database Essentials",
    category: "Data",
    summary: "Relational modeling, SQL, and query fundamentals.",
    available: false,
    chapters: []
  },
  {
    slug: "powerbi",
    title: "Power BI",
    category: "Analytics",
    summary: "Data modeling, DAX, and interactive dashboards.",
    available: false,
    chapters: []
  }
];
