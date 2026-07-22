import { ToolDetail } from "@/components/ToolDetail";
import { Brain } from "lucide-react";

const CLAUDE_USE_CASES = [
  {
    emoji: "📝",
    title: "Thesis & Research Writing",
    who: "University students, graduate researchers",
    makes: "Full thesis chapter drafts with proper academic structure, citations and Bangla summaries",
    timeSaved: "3 weeks writing → 3 days",
    prompt: "আমার থিসিসের literature review লেখো: 'বাংলাদেশে নবায়নযোগ্য শক্তির ভবিষ্যৎ' — academic tone, APA citations, 2,000 words",
  },
  {
    emoji: "💻",
    title: "Code Review & Debugging",
    who: "Developers, software engineers, CS students",
    makes: "Detailed code review with security issues, performance fixes, and refactored code",
    timeSaved: "2-day debugging → 20 minutes",
    prompt: "Review this 500-line React component for performance bottlenecks, security issues, and best-practice violations — explain each fix in Bangla",
  },
  {
    emoji: "📄",
    title: "Business Proposal Drafting",
    who: "Entrepreneurs, startup founders, consultants",
    makes: "Complete investor pitch deck content, executive summaries, and financial narratives",
    timeSaved: "1 week writing → 4 hours",
    prompt: "Write a 10-page business proposal for a Bangladeshi EdTech startup targeting rural students — include market analysis, financial projections, and risk assessment",
  },
  {
    emoji: "⚖️",
    title: "Legal Document Analysis",
    who: "Lawyers, business owners, HR professionals",
    makes: "Plain-language summaries of contracts, NDAs, and compliance documents with key risk flags",
    timeSaved: "Lawyer consultation ৳10,000 → ৳0",
    prompt: "Analyse this employment contract and identify any unfair clauses for a Bangladeshi employee — explain risks in simple Bangla",
  },
  {
    emoji: "📊",
    title: "Data Report Generation",
    who: "Analysts, accountants, business owners",
    makes: "Structured data analysis reports from raw spreadsheet data with executive insights",
    timeSaved: "3 days analysis → 45 minutes",
    prompt: "Analyse these 6 months of sales data from my Daraz store and write a comprehensive report with trends, top products, and strategic recommendations",
  },
  {
    emoji: "✉️",
    title: "Professional Email & Communication",
    who: "Managers, sales teams, client-facing professionals",
    makes: "Polished formal emails, client proposals, and internal memos in both Bangla and English",
    timeSaved: "2 hours daily writing → 15 minutes",
    prompt: "Draft a formal complaint email to our international supplier about delayed shipment affecting our Eid stock — professional, assertive, in English",
  },
  {
    emoji: "🎓",
    title: "Curriculum & Course Design",
    who: "Teachers, coaching centre owners, EdTech creators",
    makes: "Full course outlines, lesson plans, quiz questions, and study materials",
    timeSaved: "2 months curriculum planning → 1 week",
    prompt: "Design a 12-week Python programming course for Bangladeshi HSC students — week-by-week outline, project ideas, assessment rubrics, in Bangla",
  },
];

const CLAUDE_COMPETITOR_ROWS = [
  { feature: "AI Model", thisProduct: "Claude Sonnet 3.5 (latest)", chatgpt: "GPT-4o", claude: "Claude 3 Haiku (free)", gemini: "Gemini 2.5 Pro" },
  { feature: "Context Window", thisProduct: "200,000 tokens (~150K words)", chatgpt: "128K tokens", claude: "8K tokens (free)", gemini: "1M tokens" },
  { feature: "Extended Thinking", thisProduct: "✅ Deep reasoning mode", chatgpt: "✅ o3-mini", claude: "❌ No (free)", gemini: "✅ Flash Thinking" },
  { feature: "Writing Quality", thisProduct: "⭐⭐⭐⭐⭐ Best-in-class", chatgpt: "⭐⭐⭐⭐", claude: "⭐⭐⭐ (limited)", gemini: "⭐⭐⭐⭐" },
  { feature: "Code Generation", thisProduct: "⭐⭐⭐⭐⭐ Excellent", chatgpt: "⭐⭐⭐⭐⭐", claude: "⭐⭐⭐", gemini: "⭐⭐⭐⭐" },
  { feature: "Document Analysis (PDF)", thisProduct: "✅ Full 200K context", chatgpt: "✅ Good", claude: "❌ No (free)", gemini: "✅ Good" },
  { feature: "Image Understanding", thisProduct: "✅ Yes (multimodal)", chatgpt: "✅ Yes", claude: "❌ No (free)", gemini: "✅ Yes" },
  { feature: "Web Search", thisProduct: "✅ Real-time web", chatgpt: "✅ Yes", claude: "❌ No", gemini: "✅ Yes (Google)" },
  { feature: "Bangla Language Quality", thisProduct: "⭐⭐⭐⭐⭐", chatgpt: "⭐⭐⭐⭐", claude: "⭐⭐⭐", gemini: "⭐⭐⭐⭐⭐" },
  { feature: "Usage Limits (Paid)", thisProduct: "5× more than free", chatgpt: "GPT-4o limited", claude: "Very limited (free)", gemini: "High limits" },
  { feature: "Projects / Memory", thisProduct: "✅ Projects feature", chatgpt: "✅ Memory", claude: "❌ No (free)", gemini: "✅ Gems" },
  { feature: "API Access", thisProduct: "Via Anthropic API", chatgpt: "Via OpenAI API", claude: "Limited (free)", gemini: "Via Google AI" },
  { feature: "AITP Shared Price", thisProduct: "৳599/mo", chatgpt: "৳399/mo", claude: "Free (limited)", gemini: "৳449/mo" },
];

const CLAUDE_FAQS = [
  { q: "What is Claude Extended Thinking and when should I use it?", a: "Extended Thinking is Claude's deep reasoning mode — it gives Claude more 'thinking time' to work through complex problems step-by-step before answering. Use it for difficult coding problems, multi-step mathematical proofs, complex analysis tasks, and strategic decisions where accuracy matters more than speed. It's similar to ChatGPT's o3-mini reasoning models." },
  { q: "How does the 200,000 token context window help me?", a: "The 200K context window means Claude can read and analyse approximately 150,000 words in a single conversation. This lets you upload entire research papers, large codebases, complete books, and lengthy legal documents. ChatGPT Plus has 128K tokens. For Bangladeshi students writing thesis with many references, or developers reviewing large codebases, this is a massive advantage." },
  { q: "Is Claude better than ChatGPT for writing?", a: "Claude is widely considered the best AI for long-form writing quality — essays, reports, creative content, and professional documents. Claude writes in a more natural, human-like style with less 'AI tone'. For coding, both ChatGPT and Claude are excellent. For academic writing and analysis, most users prefer Claude. For custom GPTs and plugins, ChatGPT wins." },
  { q: "Can Claude read and analyse PDF documents?", a: "Yes. Claude Pro can upload and analyse PDF files, Word documents, images, and spreadsheets. With the 200K context window, Claude can read documents up to approximately 500 pages in a single session. This is perfect for Bangladeshi students analysing research papers, lawyers reviewing contracts, or businesses processing reports." },
  { q: "What is Claude Projects and how does it help business users?", a: "Claude Projects lets you create dedicated workspaces for different clients or tasks, with persistent instructions and uploaded documents. For example, a marketing agency can create separate projects for each client with their brand guidelines, tone of voice, and target audience uploaded — Claude remembers this context every time." },
  { q: "How does Claude handle Bangla language tasks?", a: "Claude Sonnet 3.5 generates high-quality Bangla text — for academic writing, business emails, social media content, and customer service responses. Claude understands Bangla prompts (you can write instructions in Bangla) and responds accurately. It handles both formal literary Bangla and everyday conversational Bangla well." },
  { q: "What's the difference between Claude Shared and Claude Personal plan?", a: "The Shared plan (৳599/mo) gives you access via a shared account — you use the full Claude Pro features but share the account with a small number of other users. The Personal plan (৳2,500/mo) upgrades your own email address to Claude Pro — fully private, no sharing, and your data stays linked to your own Anthropic account." },
  { q: "Is there a usage limit on Claude Pro?", a: "Claude Pro gives you approximately 5× more usage than the free tier, which handles all normal workloads. Heavy usage (sending 100+ long messages per day) may hit soft limits during peak hours, causing a temporary slowdown. For most students, freelancers, and professionals using Claude for daily work, the Pro limit is more than sufficient." },
  { q: "Can I use Claude for coding projects in multiple files?", a: "Yes. Claude Pro with Extended Thinking can handle large multi-file codebases. You can paste multiple files into a single conversation and ask Claude to understand the codebase structure, find bugs, or add new features. For Bangladeshi developers working on large projects, this makes Claude an excellent alternative to GitHub Copilot for code review and architecture discussions." },
  { q: "How fast is delivery for Claude Pro from AI Team Premium?", a: "For the Shared plan, delivery is 5–15 minutes after payment confirmation on WhatsApp. For the Personal plan (upgrade to your own account), delivery takes 2–4 hours as we need to process the upgrade through legitimate channels. Both plans include a 30-day replacement warranty and 24/7 WhatsApp support in Bangla and English." },
  { q: "Does Claude Pro include access to all Claude models?", a: "Claude Pro gives access to Claude Sonnet 3.5 — Anthropic's current most capable model — with Extended Thinking enabled. It also allows switching to Claude Haiku for faster responses. As Anthropic releases new models (Claude Opus 4, etc.), Pro subscribers get priority access before free users." },
];


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "claude",
  "category": "chat",
  "priceBdt": 599,
  "priceLabel": "৳599/mo",
  "model": "Claude Sonnet 3.5",
  "contextWindow": "200K tokens (~150K words)",
  "multimodal": "Text, image, PDF, spreadsheets",
  "banglaQuality": "⭐⭐⭐⭐⭐",
  "speed": "Fast — Extended Thinking adds delay",
  "accuracy": "⭐⭐⭐⭐⭐",
  "pricingTier": "Premium",
  "brand": "Anthropic",
  "tagline": "Best AI for long-form writing & analysis",
  "toolPath": "/tools/claude",
  "iconName": "Brain",
  "accent": "#D97757",
  "bestUseCase": "Writers, researchers, senior devs",
  "bestFor": [
    "Long-form essays, thesis & academic writing",
    "Analysing huge PDFs / books (200K context)",
    "Nuanced reasoning with Extended Thinking",
    "Code review of large multi-file projects",
    "Professional tone, less 'AI-sounding' output"
  ],
  "weaknesses": [
    "No native image generation",
    "Slightly stricter than ChatGPT on some topics"
  ]
} as const;

export default function Claude() {
  return (
    <ToolDetail
      name="Claude Pro"
      tagline="in Bangladesh"
      description="Anthropic's most capable AI — Claude Sonnet 3.5 with Extended Thinking, a 200K token context window, and exceptional writing, coding and analysis. Buy with bKash/Nagad, no international card needed."
      accentColor="#D97757"
      icon={Brain}
      features={[
        "Claude Sonnet 3.5 — Anthropic's most advanced model",
        "Extended Thinking for deep, step-by-step reasoning",
        "200,000 token context window (analyse entire books or codebases)",
        "Superior long-form writing, essays and creative content",
        "Best-in-class code generation, debugging and refactoring",
        "Image and document understanding (PDFs, spreadsheets)",
        "Projects — persistent context workspaces per client or task",
        "Real-time web search with accurate citations",
        "Accurate Bangla language generation",
        "5× more usage than the free tier",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "Claude Pro — Shared",
          price: "৳599",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Shared",
          specs: [
            { label: "Access", value: "Shared seat" },
            { label: "Warranty", value: "Full 30 days" },
            { label: "Support", value: "24/7 WhatsApp" },
          ],
        },
        {
          label: "Claude Pro — Personal",
          price: "৳2,500",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Personal",
          specs: [
            { label: "Access", value: "Your own email" },
            { label: "Device", value: "Web & Mobile" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      specTables={[
        {
          title: "AI Reasoning & Context",
          emoji: "🧠",
          tier2Label: "Shared (৳599/mo)",
          tier3Label: "Personal (৳2,500/mo)",
          rows: [
            { label: "AI Model", free: "Claude 3 Haiku", pro: "Claude Sonnet 3.5 (latest)", premium: "Claude Sonnet 3.5 (dedicated)" },
            { label: "Context Window", free: "8,000 tokens", pro: "200,000 tokens", premium: "200,000 tokens" },
            { label: "Extended Thinking", free: "No", pro: "Yes (unlimited)", premium: "Yes (unlimited)" },
            { label: "Web Search", free: "No", pro: "Yes, real-time", premium: "Yes, real-time" },
            { label: "Projects (persistent context)", free: "No", pro: "Yes", premium: "Yes (private workspace)" },
            { label: "Daily Message Limit", free: "Very limited", pro: "5× more than free", premium: "Full personal quota" },
            { label: "Priority Access", free: "No (queued)", pro: "Yes", premium: "Yes (dedicated queue)" },
            { label: "Early Model Access", free: "No", pro: "Yes", premium: "Yes (first access)" },
          ],
        },
        {
          title: "Writing, Code & Document Features",
          emoji: "📝",
          tier2Label: "Shared (৳599/mo)",
          tier3Label: "Personal (৳2,500/mo)",
          rows: [
            { label: "Document Upload (PDF, Word)", free: "No", pro: "Yes, up to 200K tokens", premium: "Yes, full 200K tokens" },
            { label: "Image Analysis", free: "No", pro: "Yes (multimodal)", premium: "Yes (multimodal)" },
            { label: "Spreadsheet Analysis", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Code Generation", free: "Limited", pro: "Full, multi-file", premium: "Full, multi-file" },
            { label: "Long-Form Writing", free: "Short outputs only", pro: "Books, reports, theses", premium: "Books, reports, theses" },
            { label: "API Access", free: "No", pro: "Shared access only", premium: "Own Anthropic API key" },
            { label: "Bangla Language Quality", free: "Basic", pro: "Excellent (Sonnet 4)", premium: "Excellent (Sonnet 4)" },
            { label: "Output Length", free: "~2,000 words max", pro: "~10,000+ words", premium: "~10,000+ words (private)" },
          ],
        },
      ]}
      useCases={CLAUDE_USE_CASES}
      competitorRows={CLAUDE_COMPETITOR_ROWS}
      extendedFaqs={CLAUDE_FAQS}
    />
  );
}
