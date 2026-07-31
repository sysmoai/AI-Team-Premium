import { config } from "@/lib/config";
import { bestTextOn } from "@/lib/contrast";
import { categoryLabel } from "@/lib/categories";
import { langOf } from "@/lib/lang";

/** The catalog row shape a card needs. Kept structural so both the full
 *  catalog page and a category page can pass their own product type. */
export interface ProductCardItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  descriptionBN?: string;
  tier?: string;
  badge?: string;
  capabilities?: string[];
  deliverySLA?: string;
  whatsappMsg?: string;
  brandColor?: string;
  /** Some tiers must not carry a published price — e.g. a seat-capped plan
   *  whose cost floor cannot be cleared at that cap. Quoted per enquiry. */
  priceOnRequest?: boolean;
}

export function productWhatsappHref(product: ProductCardItem) {
  const message =
    (product.whatsappMsg || `Hi! I want ${product.name} (৳${product.price}/mo)`) +
    " — please share payment details.";
  // The whole message must be encoded. Appending text after the encoded portion
  // corrupts the query string and WhatsApp drops or mangles the message.
  return `${config.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * One catalog product, as a card.
 *
 * Extracted because this markup is the storefront's most-repeated block and the
 * codebase has already been bitten by copy-pasting shared product logic (see the
 * note in lib/categories.ts). A second copy on the category pages would drift
 * the same way — the price block and the Bangla language tagging especially,
 * both of which are correctness issues rather than cosmetic ones.
 */
export function ProductCard({ product }: { product: ProductCardItem }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col">
      <div
        className="h-24 px-4 flex items-center justify-center font-bold text-xl text-center"
        style={{
          backgroundColor: product.brandColor || "#3b82f6",
          // Brand colours range from near-black to pale amber; white is
          // unreadable on the light end.
          color: bestTextOn(product.brandColor || "#3b82f6"),
        }}
      >
        {product.brand}
      </div>

      <div className="p-5 space-y-4 flex flex-col flex-1">
        <div>
          <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{product.name}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{product.description}</p>
          {/* Tagged as Bangla because the document is lang="en". Without it a
              screen reader applies English pronunciation and the text is
              unintelligible — WCAG 2.2 AA, 3.1.2. */}
          {product.descriptionBN && (
            <p
              {...langOf(product.descriptionBN)}
              className="text-sm text-gray-500 dark:text-gray-500 mt-2 line-clamp-3"
            >
              {product.descriptionBN}
            </p>
          )}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg">
          {product.priceOnRequest ? (
            <>
              <p className="text-lg font-bold text-green-700 dark:text-green-400">
                Request price on WhatsApp
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                হোয়াটসঅ্যাপে দাম জেনে নিন
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                ৳{product.price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {product.category === "bundles" ? "one-time" : "per month"}
              </p>
            </>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {product.tier && (
            <span className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded">
              {product.tier}
            </span>
          )}
          <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
            {categoryLabel(product.category)}
          </span>
          {product.badge && (
            <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 rounded">
              {product.badge}
            </span>
          )}
        </div>

        {product.capabilities && product.capabilities.length > 0 && (
          <div className="text-xs text-gray-600 dark:text-gray-400">
            <p className="font-semibold mb-1">Includes</p>
            <p>{product.capabilities.join(" · ")}</p>
          </div>
        )}

        {product.deliverySLA && (
          <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 p-2 rounded">
            Delivery: {product.deliverySLA}
          </div>
        )}

        <a
          href={productWhatsappHref(product)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Order ${product.name} on WhatsApp`}
          className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-lg transition flex items-center justify-center gap-2"
        >
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
