/* TrainIt — shared client-side helpers. Pure vanilla JS, no dependencies. */
(function () {
  "use strict";

  /**
   * Render the course catalog into an element with [data-courses].
   * Reads the global COURSES array (from data/courses.js).
   * basePath = path prefix from the current page to the site root ("" at root).
   */
  function renderCourseGrid(basePath) {
    var host = document.querySelector("[data-courses]");
    if (!host || typeof COURSES === "undefined") return;

    host.innerHTML = COURSES.map(function (c) {
      var ready = (c.chapters || []).filter(function (ch) { return ch.ready; }).length;
      var total = (c.chapters || []).length;
      var soon = c.available === false;
      var status = soon ? "Coming soon" : ready + " of " + total + " chapters live";
      var href = soon ? "javascript:void(0)" : basePath + "courses/" + c.slug + "/index.html";
      return (
        '<a class="card" href="' + href + '"' + (soon ? ' aria-disabled="true"' : "") + ">" +
        '<span class="badge">' + escapeHtml(c.category || "Course") + "</span>" +
        "<h3>" + escapeHtml(c.title) + "</h3>" +
        "<p>" + escapeHtml(c.summary || "") + "</p>" +
        '<div class="meta">' + status + "</div></a>"
      );
    }).join("");
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  window.TrainIt = { renderCourseGrid: renderCourseGrid };
})();
