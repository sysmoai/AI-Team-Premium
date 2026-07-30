import { useEffect } from "react";

/**
 * Reveals `[data-reveal]` elements as they scroll into view.
 *
 * Deliberately a ~40-line IntersectionObserver rather than framer-motion:
 * the homepage is the entry chunk, and pulling a motion library in for
 * fade-and-rise would grow the bundle we just spent effort shrinking. The
 * visual result is identical.
 *
 * Elements keep their layout box at all times (only opacity/transform move),
 * so revealing can never shift layout — important because CLS is a ranking
 * signal and this page is the main organic landing target.
 *
 * `data-reveal-delay="120"` staggers an element by that many ms.
 */
export function useReveal() {
  useEffect(() => {
    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (nodes.length === 0) return;

    // Reduced motion, or a browser without IntersectionObserver: show
    // everything immediately rather than leaving it stuck at opacity 0.
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay ?? 0);
          if (delay > 0) {
            el.style.transitionDelay = `${delay}ms`;
          }
          el.classList.add("is-revealed");
          observer.unobserve(el); // reveal once; don't re-run on scroll back
        }
      },
      // threshold MUST stay 0. intersectionRatio is measured against the
      // element's own size, so anything taller than roughly 8x the shrunk
      // viewport can never reach a fractional threshold — it would sit at
      // opacity 0 permanently. That is invisible content, not just a missing
      // animation, and it would not reproduce on a large desktop screen.
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
}
