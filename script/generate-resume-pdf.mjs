import { createServer } from "http";
import { readFile, writeFile, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import url from "url";
import puppeteer from "puppeteer";
import { findChrome } from "./find-chrome.mjs";

/**
 * Renders the US and Canadian PDFs by printing the already-built /resume/ page.
 *
 * Why print the page rather than lay the PDF out separately: the served PDF has
 * drifted from the site twice. Once it was a different document altogether — the
 * page said backend engineer and the download said "IT Coordinator & Application
 * Developer". Later the page was corrected to show the degree as in progress
 * while the PDF still claimed a conferred B.Sc. and an M.Sc. that was never the
 * enrolled program. Both times nothing failed, because a hand-exported binary
 * has no connection to the content it is supposed to mirror.
 *
 * Printing dist/resume/index.html makes that drift impossible by construction:
 * client/content/resume.md is the only source, and the PDF is a view of it. It
 * also fixes a subtler bug for free. The old PDF's visible text read
 * github.com/zubairmuwwakil while the link annotation underneath still pointed
 * at github.com/ZthEchelon, a username vacated long ago — GitHub redirects
 * renamed repositories but not vacated usernames, so the link 404'd. Reading the
 * résumé could never reveal that; only clicking it. Chrome builds annotations
 * from the <a href> it actually renders, so they cannot disagree again.
 *
 * Run it AFTER a build, since it reads dist/: `npm run build:ssg && npm run resume:pdf`.
 *
 * The page is served over HTTP rather than loaded via file://, because the
 * prerendered HTML references /assets/... with absolute paths that file:// would
 * resolve against the filesystem root.
 */

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

/**
 * The page omits the phone number on purpose — it is indexed, and a number on an
 * indexed page is scraped into spam lists within days (see the comment in
 * client/src/pages/Resume.tsx). The PDFs are public too, so each carries only
 * its application-specific number. Keep these details here instead of the
 * markdown so the web page does not display either phone number.
 */
const RESUME_VARIANTS = [
  { filename: "resume.pdf", phone: "(347) 794-7301" },
  {
    filename: "resume-canada.pdf",
    phone: "(647) 643-5497",
    locationLine: "Whitby, ON · Canadian citizen — no sponsorship required",
  },
];
const EMAIL = "zmuwwakil@gmail.com";

/**
 * Projects printed in the PDF, in order of the signal they carry for an
 * early-career application. Everything in resume.md stays on the web page; this
 * only decides what fits on paper.
 *
 * Printing all seven ran to four pages, and a four-page résumé from a candidate
 * with no conferred degree gets skimmed rather than read. Two pages is the
 * ceiling. The alternative — a second, shorter markdown file for the PDF — is
 * exactly the arrangement that let the old PDF drift out of step with the page,
 * so the selection lives here instead of forking the content.
 *
 * Chosen for: shipped-and-maintained production software (The Pickleball
 * Social), backend
 * and operational depth (MarketLens), and testing rigour that is unusual at
 * this level and cheap for a screener to verify (glicko2-ts: a published
 * package, 100% branch coverage, mutation-tested against 18 seeded defects).
 *
 * Omitted projects are not weaker work. PickMe is a second shipped App Store
 * app, but The Pickleball Social already carries the ships-and-maintains-iOS
 * signal, while
 * nothing else on the résumé carries what glicko2-ts does. orc, Looply and
 * MindSky likewise overlap with the four kept signals. All of them stay on the
 * web page, and the case studies carry them in full. Reordering this array is
 * the whole mechanism for changing that call.
 *
 * Matching is on the project heading's leading name. A name here that no longer
 * appears in resume.md fails the build rather than silently printing nothing.
 */
const PDF_PROJECTS = ["The Pickleball Social", "MarketLens", "glicko2-ts"];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

function serve(dir) {
  const server = createServer(async (req, res) => {
    try {
      const clean = decodeURIComponent(req.url.split("?")[0]);
      let file = path.join(dir, clean);
      // Keep traversal inside dist/ — the request path is untrusted input even
      // from our own Chrome.
      if (!path.resolve(file).startsWith(path.resolve(dir))) {
        res.writeHead(403).end("forbidden");
        return;
      }
      if (existsSync(file) && (await stat(file)).isDirectory()) {
        file = path.join(file, "index.html");
      }
      if (!existsSync(file)) {
        res.writeHead(404).end("not found");
        return;
      }
      const body = await readFile(file);
      res.writeHead(200, { "content-type": MIME[path.extname(file)] ?? "application/octet-stream" });
      res.end(body);
    } catch (err) {
      res.writeHead(500).end(String(err));
    }
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

/**
 * Print rules. The résumé page is a web page first: it carries the site header,
 * footer, a "Download PDF" button and a "Back to portfolio" link, none of which
 * belong on paper. Light theme is forced because the PDF is printed as often as
 * it is read on screen, and a dark background wastes a recruiter's toner.
 */
const PRINT_CSS = `
  @page { size: Letter; margin: 0.35in 0.55in; }

  :root, :root[data-theme="dark"] { color-scheme: light !important; }

  html, body {
    background: #fff !important;
    color: #16181d !important;
    font-size: 10.4pt !important;
  }

  /* Site chrome, in-page actions, and anything that is navigation rather than
     content. The row of Download / Email / LinkedIn / GitHub buttons is the
     whole point of the web page and dead weight on paper — they are anchors,
     not buttons, so hiding the button selector alone left them printing. The
     contact line injected below carries the same information as text. */
  header nav, nav, footer, [data-print-hide],
  article > header > div, button {
    display: none !important;
  }

  /* BlogLayout reserves space for the fixed site header that is not printing. */
  main { padding-top: 0 !important; margin-top: 0 !important; }

  /* Trailing space below the last line spilled a few pixels past the second
     page and produced a blank third page — the content itself fitted. Anything
     after the final paragraph has to collapse to nothing. */
  html, body, main, article, .border-t {
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
  }
  article > div > *:last-child, article p:last-child, article ul:last-child {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }
  article > header > p:first-child { font-size: 7.5pt !important; margin: 0 !important; }

  /* The gradient treatment on the name renders as washed-out grey in print. */
  .text-gradient {
    background: none !important;
    -webkit-background-clip: initial !important;
    -webkit-text-fill-color: #16181d !important;
    color: #16181d !important;
  }

  main, article, .prose { max-width: none !important; width: 100% !important; }
  article > header { margin-bottom: 0.5rem !important; }

  h1 { font-size: 19pt !important; margin: 0 0 1pt !important; }

  /* The markdown renderer shifts headings down a level so the page h1 can be
     the name: a level-2 heading becomes h3, a level-3 heading becomes h4. */
  article h3 {
    font-size: 11.2pt !important;
    margin: 6.5pt 0 2.5pt !important;
    padding-bottom: 1.5pt !important;
    border-bottom: 0.6pt solid #c7ccd4 !important;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
  article h4 { font-size: 10.3pt !important; margin: 5pt 0 0.5pt !important; }

  /* Font size has to be set per element, not inherited from body. The page
     styles text with Tailwind utilities on the elements themselves (li renders
     at 16px/26px), so a size on html or body never reaches it — which is how
     this first printed to four pages. */
  article p, article li, article ul, article ol {
    font-size: 9pt !important;
    line-height: 1.23 !important;
    margin-top: 0 !important;
    margin-bottom: 1.8pt !important;
  }
  article ul { margin: 1pt 0 3pt !important; padding-left: 11pt !important; }
  article li { padding-left: 0 !important; margin-bottom: 0.4pt !important; }

  /* The technical-skills block is seven label/value paragraphs and is the
     densest run on the page; it reads fine a touch smaller. */
  article h3 + p { font-size: 8.5pt !important; line-height: 1.2 !important; }

  article p code, article li code {
    font-size: 8.9pt !important;
    background: none !important;
    padding: 0 !important;
  }

  /* Keep a role or project together with its first bullets. A heading stranded
     at the foot of page one is the usual way a two-page résumé looks careless. */
  article h4 { break-after: avoid-page; page-break-after: avoid; }
  li, article h4 { break-inside: avoid-page; page-break-inside: avoid; }

  /* Links stay blue and clickable — Chrome emits real annotations from these —
     but lose the underline, which at 10pt turns dense bullets into mush. */
  a { color: #1a4fa0 !important; text-decoration: none !important; }

  .border-t { border-top: none !important; }

  #pdf-contact {
    margin: 5pt 0 0 !important;
    font-size: 9.1pt !important;
    line-height: 1.35 !important;
    color: #3b4049 !important;
  }
  #pdf-contact a { color: #3b4049 !important; }
`;

const chrome = await findChrome();
const { server, port } = await serve(dist);
const target = `http://127.0.0.1:${port}/resume/`;

const browser = await puppeteer.launch({
  executablePath: chrome || undefined,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

async function renderVariant(variant) {
  const page = await browser.newPage();

  // Match the viewport to the printable width (Letter 8.5in less the @page side
  // margins, at 96dpi). Chrome lays the PDF out at the page width whatever the
  // viewport is, so leaving the default 800px made every measurement taken here
  // narrower-wrapping and shorter than the real printed result — the debug
  // output said the content fitted two pages while the PDF came out three.
  const PRINT_WIDTH_PX = Math.round((8.5 - 0.55 * 2) * 96);
  await page.setViewport({ width: PRINT_WIDTH_PX, height: 1200, deviceScaleFactor: 1 });
  await page.goto(target, { waitUntil: "networkidle0", timeout: 60_000 });

  // The page is prerendered, but React hydrates over it; wait for the content
  // the markdown produces rather than a fixed sleep.
  await page.waitForFunction(
    () => document.querySelectorAll("article h3").length > 2,
    { timeout: 30_000 },
  );

  if (variant.locationLine) {
    const updated = await page.evaluate((locationLine) => {
      const source = "Brooklyn, NY · U.S. & Canadian citizen — no sponsorship required";
      const paragraph = [...document.querySelectorAll("article > div p")].find(
        (p) => p.textContent.includes(source),
      );
      if (!paragraph) return false;
      paragraph.textContent = paragraph.textContent.replace(source, locationLine);
      return true;
    }, variant.locationLine);
    if (!updated) throw new Error(`could not set location for ${variant.filename}`);
  }

  const injected = await page.evaluate(
    ({ phone, email }) => {
      const header = document.querySelector("article > header");
      if (!header) return false;

      // The existing mono line already prints the GitHub and LinkedIn handles.
      // Reuse it so the contact block reads as one line of text, and prepend the
      // details the web page withholds.
      const handles = header.querySelector("p.font-mono");
      const existing = handles ? handles.textContent.trim() : "";
      if (handles) handles.remove();

      // Built from DOM nodes rather than innerHTML: `existing` is text scraped
      // from the rendered page, and interpolating scraped text into markup is
      // how an injection bug gets written even when today's input is harmless.
      const line = document.createElement("p");
      line.id = "pdf-contact";
      // Location already appears in the markdown line just below; repeating
      // it here printed "Brooklyn, NY" twice, two lines apart.
      line.append(document.createTextNode(`${phone} · `));

      const mail = document.createElement("a");
      mail.href = `mailto:${email}`;
      mail.textContent = email;
      line.append(mail);

      if (existing) {
        line.append(document.createElement("br"));
        // The handles print as text on the web page; in a PDF they are the
        // reader's only route to the profiles, so make them real links.
        for (const [i, part] of existing.split("·").entries()) {
          const handle = part.trim();
          if (!handle) continue;
          if (i > 0) line.append(document.createTextNode(" · "));
          const a = document.createElement("a");
          a.href = `https://${handle}`;
          a.textContent = handle;
          line.append(a);
        }
      }
      header.appendChild(line);
      return true;
    },
    { phone: variant.phone, email: EMAIL },
  );
  if (!injected) throw new Error("could not find article header to inject contact line");

  // Hide the projects not selected for print. A project is its h4 heading plus
  // every node up to the next h4 or h3, so the run is collected by walking
  // siblings rather than assuming a wrapper element that the renderer does not
  // emit.
  const selection = await page.evaluate((keep) => {
    const headings = [...document.querySelectorAll("article h4")];
    const projectsSection = [...document.querySelectorAll("article h3")].find(
      (h) => h.textContent.trim().toLowerCase().startsWith("projects"),
    );
    if (!projectsSection) return { error: "no Projects section found" };

    // Only h4s after the Projects heading are projects; the earlier ones are roles.
    const after = headings.filter(
      (h) => projectsSection.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_FOLLOWING,
    );

    const seen = [];
    const hidden = [];
    for (const h of after) {
      const name = h.textContent.trim();
      seen.push(name);
      const wanted = keep.some((k) => name.toLowerCase().startsWith(k.toLowerCase()));
      if (wanted) continue;

      const run = [h];
      for (let n = h.nextElementSibling; n; n = n.nextElementSibling) {
        if (n.tagName === "H4" || n.tagName === "H3") break;
        run.push(n);
      }
      run.forEach((n) => {
        n.style.display = "none";
      });
      hidden.push(name);
    }
    return { seen, hidden };
  }, PDF_PROJECTS);

  if (selection.error) throw new Error(selection.error);

  // Rewrite links that point at this throwaway server. The page is served from
  // 127.0.0.1 on a random port, so every in-site href ("/projects/marketlens/")
  // resolved to it — and Chrome bakes the resolved absolute URL into the PDF
  // annotation. The first working draft shipped a résumé whose case-study links
  // all pointed at http://127.0.0.1:51056/, which would be dead for every
  // reader. Link text is unaffected; only the href is repointed.
  // Taken from the page's own rel=canonical rather than a constant duplicated
  // here, so the origin cannot disagree with what the site publishes.
  const origin = await page.evaluate(() => {
    const canonical = document.querySelector('link[rel="canonical"]')?.href;
    return canonical ? new URL(canonical).origin : null;
  });
  if (!origin) throw new Error("no rel=canonical on /resume/ — cannot resolve the public origin");

  const rewritten = await page.evaluate((origin) => {
    const localhost = `${window.location.protocol}//${window.location.host}`;
    let n = 0;
    for (const a of document.querySelectorAll("a[href]")) {
      const href = a.getAttribute("href");
      const abs = a.href;
      if (abs.startsWith(localhost)) {
        a.setAttribute("href", origin + abs.slice(localhost.length));
        n += 1;
      } else if (href.startsWith("/")) {
        a.setAttribute("href", origin + href);
        n += 1;
      }
    }
    return n;
  }, origin);

  const missing = PDF_PROJECTS.filter(
    (k) => !selection.seen.some((n) => n.toLowerCase().startsWith(k.toLowerCase())),
  );
  if (missing.length) {
    throw new Error(
      `PDF_PROJECTS names not found in resume.md: ${missing.join(", ")}. ` +
        `Projects present: ${selection.seen.join(" | ")}`,
    );
  }

  await page.addStyleTag({ content: PRINT_CSS });

  // The pinned puppeteer here is 1.20 (a transitive dependency of react-snap),
  // which predates emulateMediaType and prefers-color-scheme emulation. The
  // light palette is forced in PRINT_CSS instead, which also covers a stored
  // dark-theme preference that media emulation would not.
  if (typeof page.emulateMediaType === "function") {
    await page.emulateMediaType("print");
  } else {
    await page.emulateMedia("print");
  }

  // RESUME_PDF_DEBUG=1 reports where the vertical space is going. Page count
  // alone does not say which block overflowed, and tuning print CSS blind is
  // slow — this turned a four-page first draft into a measured problem.
  if (process.env.RESUME_PDF_DEBUG) {
    const blocks = await page.evaluate(() => {
      const out = [];
      const article = document.querySelector("article");
      out.push({ what: "article (total)", px: Math.round(article.getBoundingClientRect().height) });
      out.push({
        what: "header block",
        px: Math.round(article.querySelector("header").getBoundingClientRect().height),
      });
      for (const h of article.querySelectorAll("h3")) {
        let px = h.getBoundingClientRect().height;
        for (let n = h.nextElementSibling; n && n.tagName !== "H3"; n = n.nextElementSibling) {
          if (getComputedStyle(n).display === "none") continue;
          px += n.getBoundingClientRect().height;
        }
        out.push({ what: h.textContent.trim().slice(0, 34), px: Math.round(px) });
      }
      return out;
    });
    const perPage = (11 - 0.35 * 2) * 96; // Letter height minus @page margins, at 96dpi
    console.log(`  [debug] ~${Math.round(perPage)}px fits one page`);
    for (const b of blocks) console.log(`  [debug] ${String(b.px).padStart(5)}px  ${b.what}`);
  }

  const pdf = await page.pdf({
    format: "letter",
    printBackground: false,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
  });

  const outPath = path.join(root, "client", "public", variant.filename);
  await writeFile(outPath, pdf);

  // A résumé that silently grows to three pages is a regression worth seeing in
  // the build log rather than discovering in an application portal.
  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(
    `Wrote client/public/${variant.filename} — ${pages} page(s), ${(pdf.length / 1024).toFixed(0)} kB, printed from ${target}`,
  );
  console.log(`  printed projects: ${PDF_PROJECTS.join(", ")}`);
  if (selection.hidden.length) {
    console.log(`  web page only:    ${selection.hidden.join(", ")}`);
  }
  if (pages > 2) {
    console.warn(`  ! ${pages} pages. Early-career résumés are expected to be one, two at most.`);
  }
  await page.close();
}

try {
  for (const variant of RESUME_VARIANTS) await renderVariant(variant);
} finally {
  await browser.close();
  server.close();
}
