import { useEffect } from "react";

interface PageMeta {
  title: string;
  description?: string;
  path?: string;
}

const BASE = "AI Team Premium";
const SITE_URL = "https://aiteampremium.com";

function setMeta(selector: string, value: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) el.content = value;
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

export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    const fullTitle = title === BASE ? BASE : `${title} | ${BASE}`;
    const url = path
      ? `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
      : `${SITE_URL}${typeof window !== "undefined" ? window.location.pathname : ""}`;

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
    setCanonical(url);

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
