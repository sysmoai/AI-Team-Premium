import { usePageMeta } from "../../hooks/use-page-meta";
import { trackWhatsAppClick } from "../../lib/analytics";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Check, Shield, Clock, Users, HeadphonesIcon, RefreshCw, Zap, ArrowRight, Star, ChevronRight, Layers, MessageCircle, Bot, Sparkles, MessageSquare } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export const TOOL_META = {
  "slug": "claude",
  "category": "chat",
  "priceBdt": 1495,
  "priceLabel": "\u09F71,495/mo",
  "model": "Claude 4 Sonnet + Opus",
  "contextWindow": "200K tokens",
  "multimodal": "Text, image, document analysis",
  "banglaQuality": "\u2B50\u2B50\u2B50\u2B50\u2B50 (excellent)",
  "speed": "Fast",
  "accuracy": "\u2B50\u2B50\u2B50\u2B50\u2B50",
  "pricingTier": "Premium",
  "brand": "Anthropic",
  "tagline": "The professional-grade AI assistant",
  "toolPath": "/tools/claude",
  "iconName": "Bot",
  "accent": "#D97706",
  "bestUseCase": "Professional research, coding, and document analysis",
  "bestFor": [
    "Advanced reasoning & analysis",
    "200K token context window",
    "Code generation & debugging",
    "Document analysis (PDF, images)",
    "Project knowledge base"
  ],
  "weaknesses": [
    "No image generation",
    "Limited availability during peak hours for shared plans"
  ]
} as const;

const toolMeta = {
  brand: "Anthropic",
  slug: "claude",
  name: "Claude Pro",
  tagline: "Claude Pro — AI Assistant for Professionals",
  description: "Buy Claude Pro in Bangladesh from AI Team Premium. \u09F71,495/month, 5\u201315 min delivery via bKash/Nagad. 30-day replacement warranty.",
  "priceLabel": "\u09F71,495/mo",
  category: "ai-assistant",
  icon: "\uD83E\uDDD9",
  color: "#D97706",
  gradient: "from-amber-500 to-orange-600",
  bgLight: "bg-amber-50",
  rank: 2,
  features: [
    "Advanced reasoning & analysis",
    "200K token context window",
    "Code generation & debugging",
    "Document analysis (PDF, images)",
    "Project knowledge base",
    "Priority access during peak hours",
  ],
faq: [
    {
      q: "What is Claude Pro?",
      a: "Claude Pro is Anthropic's premium AI assistant subscription. It offers advanced reasoning, a 200K token context window, code generation, and document analysis capabilities.",
    },
    {
      q: "How much does Claude Pro cost in Bangladesh?",
      a: "Claude Pro costs ৳1,495/month for a shared seat from AI Team Premium, payable in BDT via bKash, Nagad, or Bank Transfer — no international credit card required.",
    },
    {
      q: "How long does Claude Pro delivery take?",
      a: "Shared seats are delivered within 5–15 minutes after payment confirmation. Personal accounts take 2–4 hours.",
    },
    {
      q: "Is there a warranty?",
      a: "Yes, all shared plans include a 30-day replacement warranty. If your seat stops working, we replace it within 24 hours at no cost.",
    },
  ],
};

// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "claude",
  "category": "chat",
  "priceBdt": 1495,
  "priceLabel": "৳1,495/mo",
  "model": "Opus 4.6, Sonnet 4.6, Haiku 4.5, Fable 5",
  "contextWindow": "200K tokens",
  "multimodal": "Text, image, code, files",
  "banglaQuality": "⭐⭐⭐⭐ (very good)",
  "speed": "Fast (sub-second first token)",
  "accuracy": "⭐⭐⭐⭐⭐",
  "pricingTier": "Premium",
  "brand": "Anthropic",
  "tagline": "The AI assistant for professionals",
  "toolPath": "/tools/claude",
  "iconName": "Brain",
  "accent": "#D97706",
  "bestUseCase": "Advanced reasoning, coding, research, document analysis",
  "bestFor": [
    "Code generation & debugging",
    "Document analysis (PDF, images)",
    "200K token context window",
    "Project knowledge base",
    "Priority access during peak hours"
  ],
  "weaknesses": [
    "No image generation",
    "Stricter content filters than Grok"
  ]
} as const;

export default function ClaudePage() {
  usePageMeta({
    title: "Claude Pro in Bangladesh \u2014 \u09F71,495/mo | AI Team Premium",
    description: "Buy Claude Pro subscription in Bangladesh. \u09F71,495/month, 5\u201315 min delivery via bKash/Nagad. 30-day replacement warranty. WhatsApp support in Bangla & English.",
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${toolMeta.gradient} text-white overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-4 bg-white/20 text-white border-0">{toolMeta.brand}</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                {toolMeta.name}
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {toolMeta.tagline}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">5\u201315 min delivery</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">30-day warranty</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <HeadphonesIcon className="w-4 h-4" />
                  <span className="text-sm">24/7 support</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-amber-700 hover:bg-amber-50 font-semibold"
                  onClick={() => trackWhatsAppClick(toolMeta.name, undefined, toolMeta.priceLabel, "tool-hero")}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Order on WhatsApp — {toolMeta.priceLabel}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => trackWhatsAppClick(toolMeta.name, undefined, toolMeta.priceLabel, "tool-learn")}
                >
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <div className="text-6xl mb-4">{toolMeta.icon}</div>
                <div className="text-3xl font-bold mb-2">{toolMeta.priceLabel}</div>
                <div className="text-white/70 mb-6">per month — shared seat</div>
                <ul className="space-y-3">
                  {toolMeta.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-300" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Claude Pro?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {toolMeta.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${toolMeta.bgLight} flex items-center justify-center mb-4`}>
                      <Sparkles className="w-6 h-6" style={{color: toolMeta.color}} />
                    </div>
                    <h3 className="font-semibold mb-2">{feature}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Claude Pro?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start at {toolMeta.priceLabel} — delivery in 5\u201315 minutes
          </p>
          <Button
            size="lg"
            className={`bg-gradient-to-r ${toolMeta.gradient} text-white font-semibold`}
            onClick={() => trackWhatsAppClick(toolMeta.name, undefined, toolMeta.priceLabel, "tool-cta")}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Order on WhatsApp
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {toolMeta.faq.map((item, i) => (
              <details key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <summary className="font-semibold cursor-pointer">{item.q}</summary>
                <p className="mt-4 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
