import { Link } from "react-router";
import { BRAND, IconOrbit, LogoStacked } from "./LogoIcons";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ArrowUpRight,
  Brain,
  BarChart3,
  Cpu,
  Workflow,
  Shield,
  Zap,
  ChevronRight,
  Star,
} from "lucide-react";

const F = "'Inter', system-ui, -apple-system, sans-serif";

/* ─── Images ─── */
const IMG_HERO =
  "https://images.unsplash.com/photo-1760931969401-9bd6ee902798?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwQUklMjB0ZWNobm9sb2d5JTIwYWJzdHJhY3QlMjBkYXJrfGVufDF8fHx8MTc3MjUxNDU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_TEAM =
  "https://images.unsplash.com/photo-1760611656007-f767a8082758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwbWVldGluZyUyMG9mZmljZSUyMG1vZGVybnxlbnwxfHx8fDE3NzI0ODIzMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_AI =
  "https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG1hY2hpbmUlMjBsZWFybmluZyUyMG5ldXJhbCUyMG5ldHdvcmslMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3MjQyNTA3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_DASH =
  "https://images.unsplash.com/photo-1771736744114-b5f7559de0f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwc2NyZWVuJTIwYmx1ZXxlbnwxfHx8fDE3NzI1MTQ1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

/* ─── Data ─── */
const SERVICES = [
  {
    icon: Brain,
    title: "AI Strategy & Consulting",
    desc: "End-to-end AI roadmaps tailored to your business goals. From opportunity assessment to deployment planning.",
  },
  {
    icon: Cpu,
    title: "Machine Learning Engineering",
    desc: "Custom ML models designed, trained, and deployed at scale. Computer vision, NLP, and predictive analytics.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Intelligence",
    desc: "Transform raw data into actionable insights with advanced analytics pipelines and real-time dashboards.",
  },
  {
    icon: Workflow,
    title: "AI Process Automation",
    desc: "Intelligent automation that reduces costs and accelerates workflows across your entire organization.",
  },
  {
    icon: Shield,
    title: "AI Safety & Governance",
    desc: "Responsible AI frameworks ensuring compliance, fairness, and transparency in every deployment.",
  },
  {
    icon: Zap,
    title: "Rapid AI Prototyping",
    desc: "From concept to working prototype in weeks, not months. Validate AI ideas before committing resources.",
  },
];

const STATS = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Retention" },
  { value: "40+", label: "Enterprise Clients" },
  { value: "3.2×", label: "Avg. ROI Increase" },
];

const TESTIMONIALS = [
  {
    quote:
      "AI Team Premium transformed our data operations. Their ML models reduced our processing time by 60% and opened revenue streams we didn't know existed.",
    name: "Sarah Chen",
    role: "CTO, NexaFinance",
    stars: 5,
  },
  {
    quote:
      "The team's strategic approach to AI implementation was exactly what we needed. They didn't just build models — they built understanding across our organization.",
    name: "Marcus Rivera",
    role: "VP Engineering, CloudScale",
    stars: 5,
  },
  {
    quote:
      "Exceptional quality, clear communication, and results that exceeded every benchmark. They're our go-to AI partner for every new initiative.",
    name: "Dr. Amira Hassan",
    role: "Director of Innovation, MedTech Global",
    stars: 5,
  },
];

export function HomePage() {
  return (
    <div>
      {/* ══════════════════════════════════════════
          HERO POSTER
         ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: BRAND.navy }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={IMG_HERO}
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.15, mixBlendMode: "luminosity" }}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${BRAND.navy} 0%, rgba(15,23,42,0.6) 50%, ${BRAND.navy} 100%)`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-24 pb-28 md:pt-32 md:pb-36">
          <div className="flex flex-col items-center text-center">
            {/* Hero Logo */}
            <div className="mb-10">
              <LogoStacked
                size="xl"
                iconColor={BRAND.white}
                textColor={BRAND.white}
              />
            </div>

            {/* Tagline */}
            <h1
              className="max-w-3xl mx-auto"
              style={{
                color: BRAND.white,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                fontFamily: F,
                letterSpacing: "-0.02em",
              }}
            >
              Intelligence Meets
              <br />
              <span style={{ color: BRAND.blue }}> Innovation</span>
            </h1>

            <p
              className="mt-6 max-w-xl mx-auto"
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                fontFamily: F,
              }}
            >
              We architect, build, and deploy AI systems that drive real business
              outcomes. From strategy to production — your trusted AI partner.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 transition-all hover:opacity-90"
                style={{
                  background: BRAND.blue,
                  color: BRAND.white,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: F,
                }}
              >
                Explore Services
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 transition-all hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: BRAND.white,
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  fontFamily: F,
                }}
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>

        {/* Gradient fade to white */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: `linear-gradient(to top, ${BRAND.white}, transparent)`,
          }}
        />
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
         ══════════════════════════════════════════ */}
      <section className="relative -mt-8 z-10">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div
            className="rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
            style={{
              background: BRAND.white,
              boxShadow: "0 8px 40px rgba(37,99,235,0.08)",
              border: "1px solid rgba(37,99,235,0.06)",
            }}
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p
                  style={{
                    color: BRAND.blue,
                    fontSize: "2rem",
                    fontWeight: 700,
                    fontFamily: F,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p
                  className="mt-2"
                  style={{
                    color: BRAND.navy,
                    opacity: 0.45,
                    fontSize: "0.78rem",
                    fontFamily: F,
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
         ══════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
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
              What We Do
            </p>
            <h2
              style={{
                color: BRAND.navy,
                fontSize: "2.2rem",
                fontWeight: 700,
                lineHeight: 1.15,
                fontFamily: F,
              }}
            >
              AI Solutions That Deliver
            </h2>
            <p
              className="mt-4 max-w-lg mx-auto"
              style={{
                color: BRAND.navy,
                opacity: 0.5,
                fontSize: "0.95rem",
                lineHeight: 1.7,
                fontFamily: F,
              }}
            >
              From intelligent automation to deep learning — every service is
              designed to create measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="group rounded-2xl p-8 transition-all hover:shadow-lg cursor-pointer"
                style={{
                  background: BRAND.white,
                  border: "1px solid rgba(37,99,235,0.06)",
                }}
              >
                <div
                  className="inline-flex items-center justify-center rounded-xl mb-5"
                  style={{
                    width: 48,
                    height: 48,
                    background: BRAND.sky,
                  }}
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
                <div
                  className="mt-5 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    color: BRAND.blue,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    fontFamily: F,
                  }}
                >
                  Learn more <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRODUCT / SERVICE POSTER
         ══════════════════════════════════════════ */}
      <section style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
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
                Featured Platform
              </p>
              <h2
                style={{
                  color: BRAND.navy,
                  fontSize: "2rem",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  fontFamily: F,
                }}
              >
                AI Command Center
              </h2>
              <p
                className="mt-4"
                style={{
                  color: BRAND.navy,
                  opacity: 0.55,
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  fontFamily: F,
                }}
              >
                A unified dashboard to monitor, manage, and optimize all your AI
                deployments in real time. Built for enterprises that demand
                visibility and control.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Real-time model performance monitoring",
                  "Automated drift detection & retraining",
                  "One-click deployment across environments",
                  "Role-based access with audit logging",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3"
                    style={{ fontFamily: F }}
                  >
                    <span
                      className="flex-shrink-0 inline-flex items-center justify-center rounded-full mt-0.5"
                      style={{
                        width: 20,
                        height: 20,
                        background: BRAND.blue,
                        color: BRAND.white,
                        fontSize: "0.6rem",
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        color: BRAND.navy,
                        fontSize: "0.88rem",
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 mt-10 rounded-full px-8 py-3.5 transition-all hover:opacity-90"
                style={{
                  background: BRAND.blue,
                  color: BRAND.white,
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: F,
                }}
              >
                See the Platform
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </Link>
            </div>

            {/* Image */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 20px 60px rgba(37,99,235,0.12)",
                border: "1px solid rgba(37,99,235,0.08)",
              }}
            >
              <ImageWithFallback
                src={IMG_DASH}
                alt="AI Command Center Dashboard"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ABOUT / WHY US
         ══════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden">
              <ImageWithFallback
                src={IMG_TEAM}
                alt="AI Team Premium team"
                className="w-full h-auto block rounded-2xl"
              />
            </div>

            {/* Text */}
            <div>
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
                About Us
              </p>
              <h2
                style={{
                  color: BRAND.navy,
                  fontSize: "2rem",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  fontFamily: F,
                }}
              >
                A Team Built for the AI Era
              </h2>
              <p
                className="mt-4"
                style={{
                  color: BRAND.navy,
                  opacity: 0.55,
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  fontFamily: F,
                }}
              >
                AI Team Premium brings together researchers, engineers, and
                strategists who share a single mission: making AI work for real
                businesses. We combine deep technical expertise with pragmatic
                business understanding.
              </p>
              <p
                className="mt-4"
                style={{
                  color: BRAND.navy,
                  opacity: 0.55,
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  fontFamily: F,
                }}
              >
                Our Neural Nexus mark represents exactly who we are — three
                nodes of expertise connected through a shared intelligence
                network, orbiting the world of possibility.
              </p>

              <div className="flex items-center gap-6 mt-8">
                <IconOrbit size={48} color={BRAND.blue} />
                <div>
                  <p
                    style={{
                      color: BRAND.navy,
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      fontFamily: F,
                    }}
                  >
                    Neural Nexus Identity
                  </p>
                  <Link
                    to="/brand"
                    className="inline-flex items-center gap-1 mt-1"
                    style={{
                      color: BRAND.blue,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      fontFamily: F,
                    }}
                  >
                    Explore our brand system{" "}
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
         ══════════════════════════════════════════ */}
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
              Client Voices
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
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-8"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={BRAND.blue}
                      color={BRAND.blue}
                    />
                  ))}
                </div>
                <p
                  className="mb-6"
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "0.88rem",
                    lineHeight: 1.7,
                    fontFamily: F,
                    fontStyle: "italic",
                  }}
                >
                  "{t.quote}"
                </p>
                <div>
                  <p
                    style={{
                      color: BRAND.white,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      fontFamily: F,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      fontSize: "0.75rem",
                      fontFamily: F,
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
         ══════════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div
            className="rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center relative overflow-hidden"
            style={{ background: BRAND.blue }}
          >
            {/* Subtle pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px)",
                backgroundSize: "60px 60px, 40px 40px",
              }}
            />
            <div className="relative">
              <IconOrbit size={56} color={BRAND.white} className="mx-auto" />
              <h2
                className="mt-6"
                style={{
                  color: BRAND.white,
                  fontSize: "2rem",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  fontFamily: F,
                }}
              >
                Ready to Transform Your Business?
              </h2>
              <p
                className="mt-4 max-w-md mx-auto"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  fontFamily: F,
                }}
              >
                Let's explore how AI can accelerate your growth. No commitment
                — just a conversation.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 transition-all hover:opacity-90"
                  style={{
                    background: BRAND.white,
                    color: BRAND.blue,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    fontFamily: F,
                  }}
                >
                  Schedule a Call
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 transition-all hover:bg-white/10"
                  style={{
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: BRAND.white,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    fontFamily: F,
                  }}
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
