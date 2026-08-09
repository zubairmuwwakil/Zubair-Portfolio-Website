import { useEffect } from "react";
import { DEFAULT_SHARE_IMAGE, shareImageSize } from "@/lib/schema";

type JsonLdNode = Record<string, unknown>;

export type DocumentHead = {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  image?: string;
  /** One node, or several to emit as separate blocks (e.g. Article + BreadcrumbList). */
  jsonLd?: JsonLdNode | JsonLdNode[] | null;
};

const JSON_LD_MARKER = "data-route-jsonld";

/** `content: null` removes the tag — see the og:image:width call below for why. */
function upsertMeta(
  selector: string,
  attr: "name" | "property",
  value: string,
  content: string | null,
) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);

  // Nothing to declare for this route. Drop whatever index.html shipped rather
  // than leave it describing something this page no longer points at.
  if (content === null) {
    const stale = el;
    if (!stale) return () => {};
    stale.remove();
    return () => {
      document.head.appendChild(stale);
    };
  }

  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  const previous = el.getAttribute("content");
  el.setAttribute("content", content);
  return () => {
    if (previous === null) el.remove();
    else el.setAttribute("content", previous);
  };
}

/**
 * Sets per-route head tags by mutating document.head directly.
 *
 * This is why no head-management dependency is needed: react-snap serializes
 * the DOM after effects have run, so whatever this writes ends up in the static
 * HTML that crawlers see. It *overwrites* the tags already in index.html rather
 * than appending, which matters for canonical — two rel=canonical elements on a
 * page make both of them ambiguous, and index.html ships one hardcoded to "/".
 */
export function useDocumentHead({
  title,
  description,
  canonical,
  ogType = "website",
  image = DEFAULT_SHARE_IMAGE,
  jsonLd = null,
}: DocumentHead) {
  useEffect(() => {
    const restores: Array<() => void> = [];

    const previousTitle = document.title;
    document.title = title;
    restores.push(() => {
      document.title = previousTitle;
    });

    let canonicalEl = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    const previousCanonical = canonicalEl.getAttribute("href");
    canonicalEl.setAttribute("href", canonical);
    restores.push(() => {
      if (previousCanonical === null) canonicalEl?.remove();
      else canonicalEl?.setAttribute("href", previousCanonical);
    });

    // index.html declares og:image:width/height for the generic card, so every
    // route that swaps og:image has to restate them or it inherits the previous
    // image's shape. The numbers come from the file itself; null when the image
    // isn't one we can measure, which removes the inherited tags entirely.
    const size = shareImageSize(image);

    restores.push(
      upsertMeta('meta[name="description"]', "name", "description", description),
      upsertMeta('meta[property="og:title"]', "property", "og:title", title),
      upsertMeta('meta[property="og:description"]', "property", "og:description", description),
      upsertMeta('meta[property="og:url"]', "property", "og:url", canonical),
      upsertMeta('meta[property="og:type"]', "property", "og:type", ogType),
      upsertMeta('meta[property="og:image"]', "property", "og:image", image),
      upsertMeta(
        'meta[property="og:image:width"]',
        "property",
        "og:image:width",
        size ? String(size.width) : null,
      ),
      upsertMeta(
        'meta[property="og:image:height"]',
        "property",
        "og:image:height",
        size ? String(size.height) : null,
      ),
      upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title),
      upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description),
      upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", image),
    );

    // Drop any route JSON-LD already in the document before adding ours. On a
    // pre-rendered page the previous build's block is baked into the HTML, and
    // react-snap can re-crawl its own output — without this the blocks compound
    // and the page ships two conflicting copies of the same entity.
    document.head
      .querySelectorAll(`script[${JSON_LD_MARKER}]`)
      .forEach((stale) => stale.remove());

    // Separate <script> blocks rather than one @graph, so every block keeps a
    // top-level @type. That is what the duplicate-entity check in verify-seo
    // reads, and what the Rich Results Test reports each feature against.
    for (const node of jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute(JSON_LD_MARKER, "true");
      script.textContent = JSON.stringify(node, null, 2);
      document.head.appendChild(script);
      restores.push(() => script.remove());
    }

    return () => {
      for (const restore of restores) restore();
    };
  }, [title, description, canonical, ogType, image, JSON.stringify(jsonLd)]);
}
