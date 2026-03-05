import { useEffect } from "react";

interface PageMeta {
  title: string;
  description?: string;
}

const BASE = "AI Team Premium BD";

function setMeta(selector: string, value: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) el.content = value;
}

export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    const fullTitle = title === BASE ? BASE : `${title} | ${BASE}`;
    const prevTitle = document.title;
    const prevDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "";
    const prevOgTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content ?? "";
    const prevOgDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content ?? "";
    const prevTwTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.content ?? "";
    const prevTwDesc = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.content ?? "";

    document.title = fullTitle;
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[name="twitter:title"]', fullTitle);

    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[name="twitter:description"]', description);
    }

    return () => {
      document.title = prevTitle;
      setMeta('meta[property="og:title"]', prevOgTitle);
      setMeta('meta[name="twitter:title"]', prevTwTitle);
      if (description) {
        setMeta('meta[name="description"]', prevDesc);
        setMeta('meta[property="og:description"]', prevOgDesc);
        setMeta('meta[name="twitter:description"]', prevTwDesc);
      }
    };
  }, [title, description]);
}
