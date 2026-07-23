import { ToolDetail } from "@/components/ToolDetail";
import { BookOpen } from "lucide-react";

const NOTION_USE_CASES = [
  {
    emoji: "📚",
    title: "Student Knowledge Base",
    who: "University students, HSC candidates, researchers",
    makes: "AI-organised study notes, lecture summaries, and connected wiki of all subjects",
    timeSaved: "Scattered notes → structured knowledge system in 1 day",
    prompt: "Notion AI: summarise these 30 pages of class notes on Organic Chemistry into a concise revision guide with key reactions, mnemonics, and exam tips in Bangla",
  },
  {
    emoji: "🚀",
    title: "Startup Operations Hub",
    who: "Startup founders, small business owners, teams",
    makes: "Complete company wiki, OKR tracking, meeting notes, and project roadmaps in one place",
    timeSaved: "Scattered Google Docs, Sheets, Slack → one organised workspace",
    prompt: "Notion AI: from this meeting recording transcript, extract: decisions made, action items with owners and deadlines, open questions — format as a Notion page",
  },
  {
    emoji: "✍️",
    title: "Content Calendar & Blog Management",
    who: "Content creators, bloggers, marketing teams",
    makes: "AI-generated blog outlines, social media calendars, and content databases with status tracking",
    timeSaved: "Random content creation → 3-month planned calendar in 1 hour",
    prompt: "Notion AI: create a 12-week content calendar for a Bangladeshi fintech startup — topics, channels (blog, LinkedIn, Facebook), and key messages. Auto-fill with AI-generated outlines.",
  },
  {
    emoji: "🔄",
    title: "Project Management with AI",
    who: "Project managers, dev teams, freelancers",
    makes: "Kanban boards, sprint planning, task databases with AI-generated descriptions and deadlines",
    timeSaved: "Jira/Asana subscription ৳5,000/mo → Notion all-in-one",
    prompt: "Build a sprint planning board for a 6-person software team: backlog, sprint queue, in-progress, review, done. AI: generate task descriptions from user stories automatically.",
  },
  {
    emoji: "🌐",
    title: "Notion Website / Portfolio",
    who: "Freelancers, designers, consultants building online presence",
    makes: "Professional public portfolio page or landing page published directly from Notion",
    timeSaved: "Web developer ৳20,000 → Notion site in 2 hours",
    prompt: "Build a Notion portfolio page: about me, services (web development, UI/UX), portfolio projects with images, client testimonials, WhatsApp CTA. Publish as public website.",
  },
  {
    emoji: "🤖",
    title: "AI Database & Table Generation",
    who: "Operations teams, HR, researchers collecting structured data",
    makes: "AI creates database schema, fills properties, and auto-tags entries from text descriptions",
    timeSaved: "Database design + manual data entry → AI fills from text",
    prompt: "Notion AI: from this list of 50 Bangladeshi NGOs (name, sector, location written in paragraphs), create a structured database with columns: Name, Sector, Location, Founded, Contact — auto-fill from text",
  },
  {
    emoji: "📋",
    title: "Meeting Notes to Action Items",
    who: "Managers, consultants, business professionals",
    makes: "Paste meeting transcript → AI extracts decisions, action items, and next steps automatically",
    timeSaved: "30 minutes post-meeting admin → 2 minutes",
    prompt: "Notion AI: here is the transcript of a 1-hour stakeholder meeting. Extract: (1) decisions made, (2) action items with person responsible, (3) follow-up questions, (4) next meeting agenda",
  },
];

const NOTION_COMPETITOR_ROWS = [
  { feature: "AI Writing Assistant", thisProduct: "✅ Built into every page", chatgpt: "✅ Separate tool", claude: "✅ Separate tool", gemini: "✅ In Google Docs" },
  { feature: "Database (Structured Data)", thisProduct: "✅ Native Notion databases", chatgpt: "❌ No database", claude: "❌ No database", gemini: "✅ Google Sheets" },
  { feature: "Kanban / Project Board", thisProduct: "✅ Native Kanban view", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
  { feature: "Document Summarisation", thisProduct: "✅ AI inside Notion pages", chatgpt: "✅ Excellent", claude: "✅ Best-in-class", gemini: "✅ Good" },
  { feature: "AI Fill Properties (databases)", thisProduct: "✅ Yes, unique Notion feature", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
  { feature: "Public Website / Portfolio", thisProduct: "✅ Publish any page as website", chatgpt: "❌ No", claude: "❌ No", gemini: "Limited" },
  { feature: "Team Wiki / Knowledge Base", thisProduct: "✅ Purpose-built", chatgpt: "❌ No wiki", claude: "❌ No wiki", gemini: "Limited (Google Sites)" },
  { feature: "API / Integration", thisProduct: "✅ Notion API + 50+ integrations", chatgpt: "Plugin ecosystem", claude: "Limited API", gemini: "Google workspace only" },
  { feature: "Offline Access", thisProduct: "Limited (desktop app)", chatgpt: "Browser only", claude: "Browser only", gemini: "Google Docs offline" },
  { feature: "Bangla Language AI", thisProduct: "✅ AI writes in Bangla in workspace", chatgpt: "✅ Excellent", claude: "✅ Excellent", gemini: "✅ Excellent" },
  { feature: "Calendar Integration", thisProduct: "✅ Native calendar view", chatgpt: "❌ No", claude: "❌ No", gemini: "✅ Google Calendar" },
  { feature: "AI Translate (in-doc)", thisProduct: "✅ Translate any page", chatgpt: "✅ Paste-and-translate", claude: "✅ Paste-and-translate", gemini: "✅ In Google Docs" },
  { feature: "AITP Shared Price", thisProduct: "৳450/mo (Team Seat)", chatgpt: "৳499/mo (AI only)", claude: "৳1,495/mo (AI only)", gemini: "৳899/mo (AI only)" },
];

const NOTION_FAQS = [
  { q: "What is Notion AI and what can it do inside my workspace?", a: "Notion AI is an AI assistant built directly into your Notion pages and databases. It can: draft content from prompts, summarise long documents, extract action items from meeting notes, translate pages, improve or rewrite existing text, auto-fill database properties from text, brainstorm ideas, and answer questions about your workspace content. Unlike ChatGPT (a separate app), Notion AI works inside your existing workspace — your notes, documents, and databases." },
  { q: "Is Notion good for Bangladeshi students for study notes?", a: "Notion is the best all-in-one study tool for Bangladeshi university students. Create linked databases for every subject, add lecture notes with AI summaries, build a master revision wiki where concepts link to each other, and use Kanban boards for assignment tracking. Notion AI can summarise 30-page lecture notes into a concise revision guide in Bangla in seconds — work that would take hours manually." },
  { q: "What is the difference between Notion AI Team Seat and Personal Seat?", a: "The Team Seat (৳450/mo) adds your account to a shared Notion workspace — you get full Notion Plus features (unlimited pages, blocks, file uploads) plus Notion AI. Your personal pages are private within the workspace. The Personal Seat (৳1,800/mo) upgrades your own Notion account directly — fully private, your own workspace with admin control, custom domain for published pages." },
  { q: "Can I publish a website from Notion for free?", a: "Yes. Any Notion page can be published as a public website with a Notion subdomain (yourname.notion.site). With Notion Plus (included in our plans), you can add a custom domain. This is popular for Bangladeshi freelancers publishing portfolios, consultants creating client-facing project hubs, and educators building course landing pages — without needing web hosting." },
  { q: "How does Notion AI Fill Properties work for databases?", a: "AI Fill Properties is one of Notion's unique AI features. When you have a database (e.g., a contacts database or product catalog), Notion AI can automatically fill or generate property values based on other fields. For example: 'Generate a 1-sentence description for each product based on the product name and category' — AI fills 100 rows instantly. This is extremely useful for content management, research databases, and CRM-style workflows." },
  { q: "Can Notion replace Jira, Asana, and Trello for project management?", a: "Yes, for most small to medium teams. Notion Kanban boards, timeline views, and database filters replicate core project management features. You can build sprint boards, milestone trackers, bug trackers, and resource management tools in Notion. The key advantage is everything connects — your project board links to your meeting notes, which link to your product specs, all in one workspace. For advanced features like automated Jira integrations, dedicated PM tools still have an edge." },
  { q: "How does Notion compare to Obsidian for note-taking?", a: "Notion and Obsidian serve different needs. Obsidian is a local-only, markdown-based tool with a powerful graph view — better for personal knowledge management and privacy-focused users. Notion is cloud-based, more collaborative, has built-in databases and project management, and now has AI. For Bangladeshi users who want team collaboration, database features, and public website publishing, Notion wins. For personal knowledge management and offline-first usage, Obsidian is strong." },
  { q: "Can I use Notion offline in Bangladesh?", a: "Notion has a desktop app (Mac and Windows) and mobile apps that cache recently viewed pages for offline reading. However, creating or editing pages requires an internet connection for syncing. For Bangladeshi users with inconsistent internet, this is a limitation. If you need a fully offline note-taking tool, consider Obsidian. For team collaboration and AI features, Notion's internet requirement is standard for cloud collaboration tools." },
  { q: "Does Notion AI work in Bangla for Bangladeshi users?", a: "Yes. Notion AI can write, translate, and summarise content in Bangla. You can give prompts in Bangla ('এই বৈঠকের নোটগুলো সংক্ষিপ্ত করো' = 'Summarise these meeting notes') and Notion AI responds in Bangla. For Bangladeshi teams wanting to build knowledge bases or internal documentation in Bangla, Notion AI handles this naturally." },
  { q: "How many pages and blocks can I create with the Notion Plus plan?", a: "Notion Plus (included in both our Team and Personal seat plans) has unlimited pages, unlimited blocks, and unlimited file uploads up to 5MB per file. There is no cap on how much content you create. Free Notion limits you to 1,000 blocks total — which you'd hit within a week of serious use. Plus removes this limit permanently." },
  { q: "Can Notion integrate with other tools I use?", a: "Yes. Notion has native integrations with Slack (send notifications), GitHub (link pull requests to tasks), Jira (sync issues), Google Drive (embed files), Calendly (embed booking), Figma (embed designs), and many more. The Notion API allows custom integrations with any tool that has an API. For Bangladeshi teams using a mix of tools, Notion serves as the central hub that connects everything." },
];


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "notion",
  "category": "writing",
  "priceBdt": 499,
  "priceLabel": "৳499/mo",
  "model": "GPT-4.5 + Claude Sonnet 3.5",
  "contextWindow": "Your entire workspace",
  "multimodal": "Text, file uploads",
  "banglaQuality": "⭐⭐⭐⭐",
  "speed": "Fast",
  "accuracy": "⭐⭐⭐⭐",
  "pricingTier": "Affordable",
  "brand": "Notion",
  "tagline": "AI inside your knowledge base",
  "toolPath": "/tools/notion",
  "iconName": "FileText",
  "accent": "#000000",
  "bestUseCase": "Teams, knowledge workers, PMs",
  "bestFor": [
    "Q&A across your entire Notion workspace",
    "Auto-summarise meeting notes & docs",
    "AI Connectors to Slack, Google Drive, GitHub",
    "Best for team knowledge workflows"
  ],
  "weaknesses": [
    "Only useful if you already live in Notion",
    "Standalone writing weaker than ChatGPT / Claude"
  ]
} as const;

export default function NotionPage() {
  return (
    <ToolDetail
      name="Notion AI"
      tagline="in Bangladesh"
      description="Notion AI brings an intelligent writing assistant directly into your Notion workspace. Summarise documents, auto-generate action items, draft content, and build databases — without leaving Notion. Perfect for Bangladeshi students, freelancers, and teams."
      accentColor="#000000"
      icon={BookOpen}
      features={[
        "AI writing & editing inside any Notion page",
        "Summarise long documents and research papers instantly",
        "Auto-generate action items from meeting notes",
        "AI-powered database and table generation from text",
        "AI Fill Properties — auto-populate database fields with AI",
        "Brainstorm, outline and draft content in one click",
        "Translate content across Bangla, English and 20+ languages",
        "Ask AI questions about any page or document in your workspace",
        "Publish any Notion page as a public website or portfolio",
        "Unlimited pages, blocks, and file uploads (Plus plan)",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "Notion AI — Team Seat",
          price: "৳450",
          period: "/mo",
          delivery: "5–15 min delivery",
          type: "Team",
          specs: [
            { label: "Access", value: "Team workspace seat" },
            { label: "AI usage", value: "Unlimited in workspace" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "Notion AI — Personal Seat",
          price: "৳1,800",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Personal",
          specs: [
            { label: "Access", value: "Dedicated private seat" },
            { label: "AI usage", value: "Unlimited personal" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/notion"
      specTables={[
        {
          title: "Notion AI Features",
          emoji: "🤖",
          tier2Label: "Shared (৳499/mo)",
          tier3Label: "Personal (৳999/mo)",
          rows: [
            { label: "AI Writing Assistant", free: "No (free plan)", pro: "Yes, unlimited", premium: "Yes, unlimited (dedicated)" },
            { label: "Document Summarisation", free: "No", pro: "Yes, any page", premium: "Yes, any page" },
            { label: "Action Item Extraction", free: "No", pro: "Yes, from any text", premium: "Yes, from any text" },
            { label: "AI Translate", free: "No", pro: "20+ languages incl. Bangla", premium: "20+ languages incl. Bangla" },
            { label: "AI Fill Properties (database)", free: "No", pro: "Yes, unique Notion feature", premium: "Yes, unique Notion feature" },
            { label: "AI Q&A on workspace", free: "No", pro: "Yes, search entire workspace", premium: "Yes, own private workspace" },
            { label: "AI Autofill", free: "No", pro: "Yes, tables and databases", premium: "Yes, tables and databases" },
            { label: "Custom AI instructions", free: "No", pro: "Yes, per page", premium: "Yes, per page (private)" },
          ],
        },
        {
          title: "Workspace & Collaboration",
          emoji: "🏢",
          tier2Label: "Shared (৳499/mo)",
          tier3Label: "Personal (৳999/mo)",
          rows: [
            { label: "Total Blocks", free: "1,000 (then locked)", pro: "Unlimited", premium: "Unlimited (own workspace)" },
            { label: "File Upload Size", free: "5MB/file", pro: "5MB/file (Plus)", premium: "5MB/file (Plus) or 250MB (Pro)" },
            { label: "Page Version History", free: "7 days", pro: "30 days", premium: "90 days (Business)" },
            { label: "Public Website Publishing", free: "Limited", pro: "Yes + custom domain", premium: "Yes + custom domain" },
            { label: "Guest Invites", free: "10 guests", pro: "100+ guests", premium: "250 guests (Business)" },
            { label: "API Access", free: "No", pro: "Yes, full Notion API", premium: "Yes, full Notion API (own key)" },
            { label: "Multiple Workspaces", free: "Limited", pro: "Unlimited", premium: "Unlimited" },
            { label: "Calendar View", free: "No", pro: "Yes", premium: "Yes" },
          ],
        },
      ]}
      useCases={NOTION_USE_CASES}
      competitorRows={NOTION_COMPETITOR_ROWS}
      extendedFaqs={NOTION_FAQS}
    />
  );
}
