import { useMemo } from "react";
import { useRoute, Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { usePageMeta } from "@/hooks/use-page-meta";
import { categoryLabel } from "@/lib/categories";
import { ProductCard, type ProductCardItem } from "@/components/product/ProductCard";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { CATEGORY_INTROS as RAW_INTROS } from "@shared/category-intros.js";
import catalog from "../data/products-catalog.json";
import NotFound from "@/pages/not-found";

interface CatalogRow extends ProductCardItem {
  slug: string;
  featured?: boolean;
}

const products = catalog as unknown as CatalogRow[];

interface CategoryIntro {
  /** Optional. Replaces "<label> Tools" when the label is already plural. */
  titleLabel?: string;
  body: string;
  meta: string;
}

// The slug comes off the URL, so it is a plain string — the literal-keyed
// object from shared/ cannot be indexed by one directly. An unknown slug
// yields undefined here and the page falls through to the 404 below.
const CATEGORY_INTROS = RAW_INTROS as Record<string, CategoryIntro | undefined>;

function bdt(n: number) {
  return `৳${n.toLocaleString("en-US")}`;
}

/**
 * A category landing page.
 *
 * These exist because the header linked every category at
 * /all-products?category=<slug>. That works for a person — the list filters —
 * but a query string is not a separate page to a crawler, so twelve real
 * categories collapsed into one indexable URL and none of them could rank for
 * their own demand ("AI video tools Bangladesh", "AI coding tools Bangladesh").
 */
export default function CategoryPage() {
  const [, params] = useRoute("/category/:slug");
  const slug = params?.slug ?? "";

  const inCategory = useMemo(
    () => products.filter((p) => p.category === slug),
    [slug]
  );

  // Cheapest first: the price floor is the reason most visitors are on a
  // category page at all, so lead with it rather than with catalog order.
  const sorted = useMemo(() => {
    const priced = inCategory.filter((p) => !p.priceOnRequest && p.price > 0);
    const onRequest = inCategory.filter((p) => p.priceOnRequest || !(p.price > 0));
    return [...priced.sort((a, b) => a.price - b.price), ...onRequest];
  }, [inCategory]);

  const sellable = inCategory.filter((p) => !p.priceOnRequest && p.price > 0);
  const from = sellable.length ? Math.min(...sellable.map((p) => p.price)) : null;
  const families = new Set(inCategory.map((p) => p.slug)).size;
  const label = categoryLabel(slug);
  const intro = CATEGORY_INTROS[slug];

  // "<label> Tools" reads wrong when the label is already a plural noun
  // ("AI Assistants Tools"), so those categories override the whole phrase.
  const heading = intro?.titleLabel ?? `${label} Tools`;

  // A slug the catalog has no products for renders the 404 below. The hook has
  // to run before that return, so the title is switched here rather than left
  // to describe a category that does not exist — otherwise /category/anything
  // advertised itself as a real page ("Does Not Exist Tools in Bangladesh")
  // while showing a 404 body, which is exactly the soft-404 pattern that gets
  // a URL indexed and then penalised.
  const exists = inCategory.length > 0;

  usePageMeta({
    // Must match the title built in scripts/gen-category-routes.mjs — the server
    // ships that title and this hook replaces it on mount; if they disagree a
    // crawler can record a different title than the page settles on.
    title: !exists
      ? "Page Not Found"
      : from
        ? `${heading} in Bangladesh — ${families} ${families === 1 ? "Tool" : "Tools"} from ${bdt(from)}${slug === "bundles" ? "" : "/mo"}`
        : `${heading} in Bangladesh — Pricing & Plans`,
    description: exists ? intro?.meta : undefined,
    path: exists ? `/category/${slug}` : undefined,
  });

  if (!exists) return <NotFound />;

  const otherCategories = Array.from(new Set(products.map((p) => p.category)))
    .filter((c) => c !== slug)
    .sort();

  return (
    <Layout>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "All Products", path: "/all-products" },
          { name: label, path: `/category/${slug}` },
        ]}
      />

      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          >
            <Link href="/" className="hover:underline">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/all-products" className="hover:underline">All Products</Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">{label}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {heading} <span className="text-blue-600 dark:text-blue-400">in Bangladesh</span>
          </h1>

          {intro && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
              {intro.body}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
            <span>
              <strong className="text-gray-900 dark:text-white">{families}</strong>{" "}
              {families === 1 ? "tool" : "tools"}
              {inCategory.length !== families && <> · {inCategory.length} plans</>}
            </span>
            {from !== null && (
              <span>
                from <strong className="text-green-700 dark:text-green-400">{bdt(from)}</strong>
                {slug === "bundles" ? " one-time" : "/month"}
              </span>
            )}
            <span>bKash · Nagad · Bank transfer</span>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Browse other categories</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {otherCategories.map((c) => (
              <Link
                key={c}
                href={`/category/${c}`}
                className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:border-blue-400 transition"
              >
                {categoryLabel(c)}
              </Link>
            ))}
            <Link
              href="/all-products"
              className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:border-blue-400 transition"
            >
              All {products.length} plans →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
