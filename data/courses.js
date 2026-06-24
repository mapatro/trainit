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
      { file: "chapter-1.html",  title: "Foundations & first run",       ready: true },
      { file: "chapter-2.html",  title: "Mule events & the HTTP Listener", ready: true },
      { file: "chapter-3.html",  title: "Calling APIs with HTTP Request", ready: true },
      { file: "chapter-4.html",  title: "File & Database connectors",     ready: true },
      { file: "chapter-5.html",  title: "DataWeave 2.0 transforms",       ready: true },
      { file: "chapter-6.html",  title: "Routers & flow control",         ready: true },
      { file: "chapter-7.html",  title: "Error handling",                 ready: true },
      { file: "chapter-8.html",  title: "API design with RAML & APIkit",  ready: true },
      { file: "chapter-9.html",  title: "Batch processing",               ready: true },
      { file: "chapter-10.html", title: "Deploy to CloudHub",             ready: true },
      { file: "chapter-11.html", title: "Testing with MUnit",             ready: true },
      { file: "chapter-12.html", title: "Cert prep & portfolio",          ready: true }
    ]
  },

  {
    slug: "digital-marketing",
    title: "Digital Marketing — Grow ClearEaty with AI",
    category: "Growth",
    summary: "Hands-on growth playbook: SEO, ASO, organic social, Reddit, Instagram/Facebook ads, creators & a 90-day launch plan — every step produces a real ClearEaty asset using AI.",
    available: true,
    chapters: [
      { file: "chapter-1.html",  title: "Positioning & personas",               ready: true },
      { file: "chapter-2.html",  title: "Funnel, goals & metrics",              ready: true },
      { file: "chapter-3.html",  title: "Brand voice & identity",               ready: true },
      { file: "chapter-4.html",  title: "Landing page & website",               ready: true },
      { file: "chapter-5.html",  title: "App Store Optimization (ASO)",         ready: true },
      { file: "chapter-6.html",  title: "Content & SEO",                        ready: true },
      { file: "chapter-7.html",  title: "Organic social & communities",         ready: true },
      { file: "chapter-8.html",  title: "Short-form video & creative",          ready: true },
      { file: "chapter-9.html",  title: "Email, push & lifecycle",              ready: true },
      { file: "chapter-10.html", title: "Paid advertising",                     ready: true },
      { file: "chapter-11.html", title: "Influencer & creator marketing",       ready: true },
      { file: "chapter-12.html", title: "Conversion optimization & A/B testing", ready: true },
      { file: "chapter-13.html", title: "Analytics & reporting",                ready: true },
      { file: "chapter-14.html", title: "Launch & 90-day growth playbook",      ready: true }
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
