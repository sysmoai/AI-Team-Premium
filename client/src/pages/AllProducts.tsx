import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { usePageMeta } from "@/hooks/use-page-meta";
import catalog from "../data/products-catalog.json";
import { CATEGORY_LABELS, categoryLabel } from "@/lib/categories";
import { ProductCard } from "@/components/product/ProductCard";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  descriptionBN?: string;
  tier?: string;
  badge?: string;
  accessType?: string;
  capabilities?: string[];
  deliverySLA?: string;
  whatsappMsg?: string;
  brandColor?: string;
  featured?: boolean;
  // Some tiers must not carry a published price — e.g. a seat-capped plan whose
  // cost floor cannot be cleared at that cap. Those are quoted per enquiry.
  priceOnRequest?: boolean;
}

const products: Product[] = catalog as Product[];

const ACCESS_LABELS: Record<string, string> = {
  shared: "Shared",
  personal: "Personal",
  bundle: "Bundle",
};

// The header links into a category (/all-products?category=seo). Reading it here
// is what makes those links land on a filtered list rather than on the full
// catalog with the filter reset — without this the menu points 78 products at
// one undifferentiated page.
function categoryFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const c = new URLSearchParams(window.location.search).get("category");
  // Only accept a category the catalog actually has, so a stale or hand-typed
  // value falls back to "all" instead of rendering an empty list.
  return c && products.some((p) => p.category === c) ? c : null;
}

export default function AllProducts() {
  usePageMeta({
    title: "All AI Tools & Services — 129+ Premium Subscriptions",
    description: "Browse our complete catalog of 129+ AI tools and services — ChatGPT, Claude, Midjourney, Notion, Grammarly, and more. All payable in BDT via bKash and Nagad.",
    path: "/all-products",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl);
  const [selectedAccess, setSelectedAccess] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), []);
  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))).sort(), []);
  const accessTypes = useMemo(
    () => Array.from(new Set(products.map((p) => p.accessType).filter(Boolean) as string[])).sort(),
    []
  );

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const result = products.filter((p) => {
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.descriptionBN || "").includes(searchTerm.trim()) ||
        (p.capabilities || []).some((c) => c.toLowerCase().includes(q));
      const matchesBrand = !selectedBrand || p.brand === selectedBrand;
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesAccess = !selectedAccess || p.accessType === selectedAccess;
      return matchesSearch && matchesBrand && matchesCategory && matchesAccess;
    });

    const sorted = [...result];
    if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.price - b.price);
    return sorted;
  }, [searchTerm, selectedBrand, selectedCategory, selectedAccess, sortBy]);

  const hasFilters = Boolean(searchTerm || selectedBrand || selectedCategory || selectedAccess);
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSelectedAccess(null);
  };

  const chip = (active: boolean) =>
    `px-3 py-1.5 text-sm rounded-full border transition ${
      active
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-600 hover:border-blue-400"
    }`;

  return (
    <Layout>
      <div className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Complete AI Catalog — {products.length} Premium Tools
            </h1>
            <p className="text-blue-50 text-base md:text-lg">
              {products.length} subscription plans across {brands.length} brands and {categories.length} categories.
              Pay with bKash or Nagad. Order on WhatsApp.
            </p>
            <p className="text-blue-50 text-sm md:text-base mt-2">
              বাংলাদেশ থেকে bKash/Nagad-এ পেমেন্ট। ইন্টারন্যাশনাল কার্ড লাগবে না।
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Search + sort */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by tool, brand, or feature…"
              aria-label="Search products"
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              aria-label="Sort products"
              className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            >
              <option value="featured">Featured first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>

          {/* Filters */}
          <div className="space-y-3 mb-6">
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-20">Category</span>
              <button onClick={() => setSelectedCategory(null)} className={chip(!selectedCategory)}>
                All
              </button>
              {categories.map((c) => (
                <button key={c} onClick={() => setSelectedCategory(c)} className={chip(selectedCategory === c)}>
                  {categoryLabel(c)}
                </button>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-20">Access</span>
              <button onClick={() => setSelectedAccess(null)} className={chip(!selectedAccess)}>
                All
              </button>
              {accessTypes.map((a) => (
                <button key={a} onClick={() => setSelectedAccess(a)} className={chip(selectedAccess === a)}>
                  {ACCESS_LABELS[a] || a}
                </button>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-20">Brand</span>
              <button onClick={() => setSelectedBrand(null)} className={chip(!selectedBrand)}>
                All
              </button>
              {brands.map((b) => (
                <button key={b} onClick={() => setSelectedBrand(b)} className={chip(selectedBrand === b)}>
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredProducts.length}</span> of{" "}
              {products.length}
            </p>
            {hasFilters && (
              <button onClick={resetFilters} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Clear filters
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 dark:text-gray-400">No products match those filters.</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-gray-300 dark:border-slate-700 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{products.length}</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Products</p>
            </div>
            <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{brands.length}</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Brands</p>
            </div>
            <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{categories.length}</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Categories</p>
            </div>
            <div className="p-5 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                ৳{Math.min(...products.map((p) => p.price)).toLocaleString()}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm font-semibold">Starting from</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
