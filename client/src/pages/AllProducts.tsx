import { useState, useMemo } from "react";
import { Link } from "wouter";
import allProducts from "../data/products-all.json";
import { config } from "../lib/config";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  tier?: string;
  badge?: string;
  capabilities?: string[];
  deliverySLA?: string;
  whatsappMsg?: string;
  brandColor?: string;
}

// Use all products directly (flat array)
const products: Product[] = Array.isArray(allProducts) ? allProducts : (allProducts as any).products || [];

export default function AllProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"all" | "summary">("all");

  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))).sort(), []);
  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))).sort(), []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = !selectedBrand || p.brand === selectedBrand;
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [searchTerm, selectedBrand, selectedCategory]);

  const getCategoryLabel = (category: string) => {
    return category
      .split("-")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">🛒 Complete AI Catalog — 107 Premium Tools</h1>
          <p className="text-blue-100 text-lg">Browse {products.length} premium AI subscription plans • {brands.length} brands • {categories.length} categories</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search & Filters */}
        <div className="mb-8 space-y-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-base"
            />
          </div>

          {/* Brand Filter */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 dark:text-gray-300">Filter by Brand:</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBrand(null)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  !selectedBrand
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300"
                }`}
              >
                All Brands
              </button>
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    selectedBrand === brand
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700 dark:text-gray-300">Filter by Category:</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  !selectedCategory
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300"
                  }`}
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-600">
          <div className="flex justify-between items-center">
            <p className="text-gray-800 dark:text-gray-200">
              Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> premium AI products
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("all")}
                className={`px-3 py-1 text-sm rounded ${viewMode === "all" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-slate-700"}`}
              >
                All ({products.length})
              </button>
              <button
                onClick={() => setViewMode("summary")}
                className={`px-3 py-1 text-sm rounded ${viewMode === "summary" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-slate-700"}`}
              >
                By Brand ({brands.length})
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition border border-gray-200 dark:border-slate-700 overflow-hidden group"
              >
                {/* Header */}
                <div
                  className="h-32 p-4 text-white flex items-center justify-center font-bold text-2xl"
                  style={{ backgroundColor: product.brandColor || "#3b82f6" }}
                >
                  {product.brand}
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{product.description}</p>
                  </div>

                  {/* Price */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                      ৳{product.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      per month
                    </p>
                  </div>

                  {/* Tier & Badge */}
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded">
                      {product.tier}
                    </span>
                    {product.badge && (
                      <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 rounded">
                        ⭐ {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Capabilities */}
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <p className="font-semibold mb-1">Features:</p>
                    <p>{product.capabilities?.join(", ") || "Premium features included"}</p>
                  </div>

                  {/* Delivery SLA */}
                  <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 p-2 rounded">
                    ⏱️ Delivery: {product.deliverySLA}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={`${config.whatsappUrl}?text=${encodeURIComponent(product.whatsappMsg || `Hi! I want ${product.name} (৳${product.price}/mo)`)} from AI Team Premium. Please share payment details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    💬 WhatsApp Order
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">No products found</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedBrand(null);
                setSelectedCategory(null);
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-slate-700 grid grid-cols-4 gap-4 text-center">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg border-2 border-blue-300 dark:border-blue-700">
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">🎯 107</p>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">Total Products</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg border-2 border-green-300 dark:border-green-700">
            <p className="text-4xl font-bold text-green-600 dark:text-green-400">{brands.length}</p>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">Premium Brands</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg border-2 border-purple-300 dark:border-purple-700">
            <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">{categories.length}</p>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">Categories</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg border-2 border-orange-300 dark:border-orange-700">
            <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">✅</p>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">All Live</p>
          </div>
        </div>
      </div>
    </div>
  );
}
