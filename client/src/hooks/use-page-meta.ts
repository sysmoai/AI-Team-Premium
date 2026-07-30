import { useEffect } from "react";
import { CANONICAL_MAP } from "@shared/canonical-map.js";

interface PageMeta {
  title: string;
  description?: string;
  path?: string;
}

const BASE = "AI Team Premium";
const SITE_URL = "https://www.aiteampremium.com";

function setMeta(selector: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    // Parse the selector to get the attribute name and value
    const match = selector.match(/\[(\w+)=["']([^"']+)["']\]/);
    if (match) {
      el.setAttribute(match[1], match[2]);
    }
    document.head.appendChild(el);
  }
  el.content = value;
}

function setCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

// Resolve a path through CANONICAL_MAP. Unmapped paths are their own canonical,
// so this is a no-op for every page that is not a known duplicate.
function canonicalUrlFor(pathname: string, fallback: string) {
  const map = CANONICAL_MAP as Record<string, string | undefined>;
  const target = map[pathname] ?? map[pathname.replace(/\/$/, "")];
  return target ? `${SITE_URL}${target}` : fallback;
}

export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    const fullTitle = title === BASE ? BASE : `${title} | ${BASE}`;
    const pathname = path
      ? path.startsWith("/")
        ? path
        : `/${path}`
      : typeof window !== "undefined"
        ? window.location.pathname
        : "";
    const url = `${SITE_URL}${pathname}`;

    const prevTitle = document.title;
    const prevDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "";
    const prevOgTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content ?? "";
    const prevOgDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content ?? "";
    const prevOgUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.content ?? "";
    const prevTwTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.content ?? "";
    const prevTwDesc = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.content ?? "";
    const prevCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "";

    document.title = fullTitle;
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[property="og:url"]', url);
    // og:url is this page's own URL; the canonical may point elsewhere. Several
    // products have both a hand-written page and a generated catalog page, and
    // both were being submitted in sitemap.xml — so they competed for the same
    // query. The server sends the consolidated canonical; without this the hook
    // would overwrite it with the page's own path on hydration.
    setCanonical(canonicalUrlFor(pathname, url));

    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[name="twitter:description"]', description);
    }

    return () => {
      document.title = prevTitle;
      setMeta('meta[property="og:title"]', prevOgTitle);
      setMeta('meta[name="twitter:title"]', prevTwTitle);
      setMeta('meta[property="og:url"]', prevOgUrl);
      if (prevCanonical) setCanonical(prevCanonical);
      if (description) {
        setMeta('meta[name="description"]', prevDesc);
        setMeta('meta[property="og:description"]', prevOgDesc);
        setMeta('meta[name="twitter:description"]', prevTwDesc);
      }
    };
  }, [title, description, path]);
}
