// Marks Bangla text as Bangla inside an English document.
//
// index.html declares lang="en", and the catalog carries ~3,000 lines of Bangla
// (descriptionBN, useCases, whyBuyBN) that render inside it. A screen reader
// applies the document language to any text that does not override it, so Bangla
// was being pronounced with English rules — unintelligible, on a site whose whole
// point is Bangla-first support. That is WCAG 2.2 AA 3.1.2, Language of Parts.
//
// Applied by content rather than by component, because the same components render
// English on the editorial tool pages and Bangla on the catalog pages. Tagging the
// component would mislabel whichever language it did not expect.
//
//   <p {...langOf(text)}>{text}</p>
//
// Bengali script block: U+0980–U+09FF.
const BENGALI = /[ঀ-৿]/;

export function isBangla(text: unknown): boolean {
  return typeof text === "string" && BENGALI.test(text);
}

/** Spread onto an element: yields `lang="bn"` for Bangla text, nothing otherwise. */
export function langOf(text: unknown): { lang?: "bn" } {
  return isBangla(text) ? { lang: "bn" } : {};
}
