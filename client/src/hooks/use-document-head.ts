import { useEffect } from "react";

export type DocumentHead = {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  image?: string;
  jsonLd?: Record<string, unknown> | null;
};

const JSON_LD_MARKER = "data-route-jsonld";

function upsertMeta(selector: string, attr: "name" | "property", value: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
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
  image = "https://zubairmuwwakil.com/assets/zubair-muwwakil.jpg",
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

    restores.push(
      upsertMeta('meta[name="description"]', "name", "description", description),
      upsertMeta('meta[property="og:title"]', "property", "og:title", title),
      upsertMeta('meta[property="og:description"]', "property", "og:description", description),
      upsertMeta('meta[property="og:url"]', "property", "og:url", canonical),
      upsertMeta('meta[property="og:type"]', "property", "og:type", ogType),
      upsertMeta('meta[property="og:image"]', "property", "og:image", image),
      upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title),
      upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description),
      upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", image),
    );

    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute(JSON_LD_MARKER, "true");
      script.textContent = JSON.stringify(jsonLd, null, 2);
      document.head.appendChild(script);
      restores.push(() => script.remove());
    }

    return () => {
      for (const restore of restores) restore();
    };
  }, [title, description, canonical, ogType, image, JSON.stringify(jsonLd)]);
}
