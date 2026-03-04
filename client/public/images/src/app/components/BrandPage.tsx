import { useState } from "react";
import { BRAND } from "./LogoIcons";
import { ConceptsPage } from "./ConceptsPage";
import { FinalSelectionPage } from "./FinalSelectionPage";
import { ColorSystemPage } from "./ColorSystemPage";
import { GuidelinesPage } from "./GuidelinesPage";

const F = "'Inter', system-ui, -apple-system, sans-serif";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "logos", label: "Logo System" },
  { id: "colors", label: "Colors" },
  { id: "guidelines", label: "Guidelines" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TAB_CONTENT: Record<TabId, React.FC> = {
  overview: ConceptsPage,
  logos: FinalSelectionPage,
  colors: ColorSystemPage,
  guidelines: GuidelinesPage,
};

export function BrandPage() {
  const [active, setActive] = useState<TabId>("overview");
  const Content = TAB_CONTENT[active];

  return (
    <div>
      {/* Header */}
      <section style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-6">
          <p
            className="mb-3 uppercase"
            style={{
              color: BRAND.blue,
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              fontWeight: 600,
              fontFamily: F,
            }}
          >
            Brand Identity
          </p>
          <h1
            style={{
              color: BRAND.navy,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              fontFamily: F,
            }}
          >
            Neural Nexus Brand System
          </h1>
          <p
            className="mt-4 max-w-2xl"
            style={{
              color: BRAND.navy,
              opacity: 0.5,
              fontSize: "1rem",
              lineHeight: 1.7,
              fontFamily: F,
            }}
          >
            The complete visual identity for AI Team Premium BD — icon mark,
            logo lockups, color palette, and usage guidelines.
          </p>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 mt-8 overflow-x-auto pb-px">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className="px-5 py-2.5 rounded-t-xl transition-all flex-shrink-0"
                style={{
                  background:
                    active === tab.id ? BRAND.white : "transparent",
                  color:
                    active === tab.id ? BRAND.blue : BRAND.navy,
                  fontSize: "0.82rem",
                  fontWeight: active === tab.id ? 600 : 450,
                  fontFamily: F,
                  borderBottom:
                    active === tab.id
                      ? `2px solid ${BRAND.blue}`
                      : "2px solid transparent",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div
        className="mx-auto max-w-7xl px-6 lg:px-10 py-12"
        style={{ background: BRAND.white }}
      >
        <Content />
      </div>
    </div>
  );
}
