// Reusable tool page template for product pages

import { Layout } from '@/components/layout/Layout';
import { WhatsAppIcon, BRAND } from '@/components/brand/LogoIcons';
import { formatPriceWithPeriod, formatPricingForDisplay } from './format';

export function ToolPageTemplate({
  title,
  description,
  toolName,
  toolIcon: Icon,
  toolColor,
  pricingTiers,
  features,
  disclosures,
  whatsAppNumber,
  ctaText = 'Ask on WhatsApp',
}) {
  const handleWhatsAppClick = (tier) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in ${toolName} ${tier ? `(${tier})` : ''}. Please share pricing and details.`
    );
    window.open(`https://wa.me/${whatsAppNumber}?text=${message}`, '_blank');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <div
            className="inline-flex items-center justify-center rounded-2xl mb-6"
            style={{
              width: 64,
              height: 64,
              background: `${toolColor}15`,
            }}
          >
            {Icon && <Icon size={32} color={toolColor} strokeWidth={1.8} />}
          </div>
          <h1
            style={{
              color: BRAND.navy,
              fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            {toolName} <span style={{ color: toolColor }}>in Bangladesh</span>
          </h1>
          <p
            className="mt-4 mx-auto max-w-xl"
            style={{
              color: BRAND.navy,
              opacity: 0.5,
              fontSize: '0.95rem',
              lineHeight: 1.65,
            }}
          >
            {description}
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      {pricingTiers && pricingTiers.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2
              style={{
                color: BRAND.navy,
                fontSize: '1.8rem',
                fontWeight: 700,
                marginBottom: '3rem',
                textAlign: 'center',
              }}
            >
              Pricing Plans
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.slug}
                  className="rounded-2xl p-7"
                  style={{
                    background: BRAND.white,
                    border:
                      tier.badge === 'Most Popular'
                        ? `2px solid ${toolColor}`
                        : '1px solid rgba(37,99,235,0.06)',
                    boxShadow:
                      tier.badge === 'Most Popular'
                        ? `0 8px 32px ${toolColor}20`
                        : undefined,
                  }}
                >
                  {tier.badge && (
                    <span
                      style={{
                        display: 'inline-block',
                        background: `${toolColor}15`,
                        color: toolColor,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        marginBottom: '1rem',
                      }}
                    >
                      {tier.badge}
                    </span>
                  )}

                  <h3 style={{ color: BRAND.navy, fontWeight: 600, fontSize: '1.1rem' }}>
                    {tier.title}
                  </h3>

                  <p style={{ color: BRAND.navy, opacity: 0.6, fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    {tier.description}
                  </p>

                  <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <p
                      style={{
                        color: toolColor,
                        fontSize: '1.8rem',
                        fontWeight: 700,
                      }}
                    >
                      {formatPriceWithPeriod(tier.priceBDT, tier.period || 'month')}
                    </p>
                  </div>

                  {tier.features && (
                    <ul style={{ marginBottom: '1.5rem' }}>
                      {tier.features.map((feature, idx) => (
                        <li
                          key={idx}
                          style={{
                            color: BRAND.navy,
                            fontSize: '0.9rem',
                            marginBottom: '0.5rem',
                          }}
                        >
                          ✓ {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    onClick={() => handleWhatsAppClick(tier.title)}
                    style={{
                      width: '100%',
                      background: toolColor,
                      color: 'white',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <WhatsAppIcon size={16} />
                    {ctaText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Disclosures Section */}
      {disclosures && (
        <section className="py-20" style={{ background: 'rgba(0,0,0,0.02)' }}>
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h3 style={{ color: BRAND.navy, fontWeight: 700, marginBottom: '1rem' }}>
              Important Disclosures
            </h3>
            <div style={{ maxWidth: '42rem' }}>
              {disclosures.map((section, idx) => (
                <div key={idx} style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: BRAND.navy, fontWeight: 600, marginBottom: '0.5rem' }}>
                    {section.heading}
                  </h4>
                  <p style={{ color: BRAND.navy, opacity: 0.7, fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

export default ToolPageTemplate;
