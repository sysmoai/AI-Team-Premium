import { Link } from "react-router";
import { BRAND, IconOrbit } from "./LogoIcons";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ArrowUpRight,
  Brain,
  BarChart3,
  Cpu,
  Workflow,
  Shield,
  Zap,
  Check,
  ChevronRight,
} from "lucide-react";

const F = "'Inter', system-ui, -apple-system, sans-serif";

const IMG_AI =
  "https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG1hY2hpbmUlMjBsZWFybmluZyUyMG5ldXJhbCUyMG5ldHdvcmslMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3MjQyNTA3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_AUTO =
  "https://images.unsplash.com/photo-1761195696590-3490ea770aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdCUyMGF1dG9tYXRpb24lMjB0ZWNobm9sb2d5JTIwaW5kdXN0cnl8ZW58MXx8fHwxNzcyNTE0NTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const CORE = [
  {
    icon: Brain,
    title: "AI Strategy & Consulting",
    desc: "We assess your landscape, identify high-value AI opportunities, and build a phased roadmap from pilot to enterprise scale.",
    features: [
      "AI readiness assessment",
      "Opportunity mapping & prioritization",
      "Technology stack recommendations",
      "Change management planning",
    ],
  },
  {
    icon: Cpu,
    title: "Machine Learning Engineering",
    desc: "Custom models built on your data, optimized for your constraints, and deployed into production with monitoring baked in.",
    features: [
      "Custom model development",
      "Computer vision & NLP",
      "Model optimization & compression",
      "MLOps & CI/CD pipelines",
    ],
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Intelligence",
    desc: "From data lake architecture to executive dashboards — we make your data speak the language of business decisions.",
    features: [
      "Data pipeline engineering",
      "Real-time analytics dashboards",
      "Predictive & prescriptive analytics",
      "Data quality & governance",
    ],
  },
  {
    icon: Workflow,
    title: "AI Process Automation",
    desc: "Intelligent agents and workflows that handle the repetitive so your team can focus on what matters.",
    features: [
      "Intelligent document processing",
      "Workflow orchestration",
      "Conversational AI & chatbots",
      "RPA + AI hybrid automation",
    ],
  },
  {
    icon: Shield,
    title: "AI Safety & Governance",
    desc: "Responsible AI isn't optional — we embed fairness, explainability, and compliance from day one.",
    features: [
      "Bias detection & mitigation",
      "Explainability frameworks",
      "Regulatory compliance (EU AI Act)",
      "AI risk assessment",
    ],
  },
  {
    icon: Zap,
    title: "Rapid AI Prototyping",
    desc: "Validate before you invest. Working prototypes in 2–4 weeks that prove the concept and build stakeholder confidence.",
    features: [
      "2–4 week proof of concept",
      "Interactive demos & pilots",
      "Feasibility analysis",
      "Stakeholder presentation packs",
    ],
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    desc: "Deep-dive into your business, data, and goals to define the highest-impact AI opportunities.",
  },
  {
    step: "02",
    title: "Design",
    desc: "Architecture, model selection, and a clear roadmap with milestones, metrics, and guardrails.",
  },
  {
    step: "03",
    title: "Build",
    desc: "Agile development with weekly demos. Custom models trained, tested, and validated on your data.",
  },
  {
    step: "04",
    title: "Deploy",
    desc: "Production-grade deployment with monitoring, alerting, and automated retraining pipelines.",
  },
  {
    step: "05",
    title: "Scale",
    desc: "Expand across the organization. Continuous optimization, new use cases, and measurable ROI.",
  },
];

export function ServicesPage() {
  return (
    <div>
      {/* Header */}
      <section style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-16">
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
            Our Services
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
            End-to-End AI Solutions
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
            From strategic consulting to production-grade deployment — we
            cover every stage of the AI lifecycle with precision and care.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE.map((svc) => (
              <div
                key={svc.title}
                className="rounded-2xl p-8 flex flex-col"
                style={{
                  background: BRAND.white,
                  border: "1px solid rgba(37,99,235,0.06)",
                }}
              >
                <div
                  className="inline-flex items-center justify-center rounded-xl mb-5"
                  style={{ width: 48, height: 48, background: BRAND.sky }}
                >
                  <svc.icon size={22} color={BRAND.blue} strokeWidth={2} />
                </div>
                <h3
                  className="mb-3"
                  style={{
                    color: BRAND.navy,
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    fontFamily: F,
                    lineHeight: 1.3,
                  }}
                >
                  {svc.title}
                </h3>
                <p
                  className="mb-6"
                  style={{
                    color: BRAND.navy,
                    opacity: 0.5,
                    fontSize: "0.85rem",
                    lineHeight: 1.65,
                    fontFamily: F,
                  }}
                >
                  {svc.desc}
                </p>
                <ul className="mt-auto space-y-2.5">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <Check
                        size={14}
                        color={BRAND.blue}
                        strokeWidth={3}
                        className="flex-shrink-0"
                      />
                      <span
                        style={{
                          color: BRAND.navy,
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          fontFamily: F,
                        }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ background: BRAND.navy }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <div className="text-center mb-16">
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
              Our Process
            </p>
            <h2
              style={{
                color: BRAND.white,
                fontSize: "2rem",
                fontWeight: 700,
                lineHeight: 1.15,
                fontFamily: F,
              }}
            >
              From Idea to Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROCESS.map((p, i) => (
              <div
                key={p.step}
                className="rounded-2xl p-6 relative"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p
                  className="mb-3"
                  style={{
                    color: BRAND.blue,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    fontFamily: F,
                    letterSpacing: "0.06em",
                  }}
                >
                  STEP {p.step}
                </p>
                <h3
                  className="mb-2"
                  style={{
                    color: BRAND.white,
                    fontSize: "1rem",
                    fontWeight: 600,
                    fontFamily: F,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.8rem",
                    lineHeight: 1.6,
                    fontFamily: F,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image + CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden">
              <ImageWithFallback
                src={IMG_AI}
                alt="AI visualization"
                className="w-full h-auto block rounded-2xl"
              />
            </div>
            <div>
              <h2
                style={{
                  color: BRAND.navy,
                  fontSize: "2rem",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  fontFamily: F,
                }}
              >
                Technology That Understands Your Business
              </h2>
              <p
                className="mt-4"
                style={{
                  color: BRAND.navy,
                  opacity: 0.5,
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  fontFamily: F,
                }}
              >
                We don't believe in black-box solutions. Every model we build
                is explainable, auditable, and designed to integrate
                seamlessly with your existing systems and workflows.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 mt-8 rounded-full px-8 py-3.5 transition-all hover:opacity-90"
                style={{
                  background: BRAND.navy,
                  color: BRAND.white,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: F,
                }}
              >
                Start a Conversation
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
