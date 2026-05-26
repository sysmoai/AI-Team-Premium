import { ToolDetail } from "@/components/ToolDetail";
import { Monitor } from "lucide-react";

const M365_USE_CASES = [
  {
    emoji: "📝",
    title: "AI Document Drafting in Word",
    who: "Business professionals, HR managers, legal teams, consultants",
    makes: "Full reports, proposals, contracts, and SOPs from a short brief in minutes",
    timeSaved: "4 hours writing → 20 minutes with Copilot",
    prompt: "Copilot in Word: draft a 5-page service agreement for a Bangladeshi IT firm providing software development services to a UK client — professional, enforceable clauses",
  },
  {
    emoji: "📊",
    title: "Excel Data Analysis & Formulas",
    who: "Accountants, data analysts, operations teams",
    makes: "Complex VLOOKUP, pivot tables, conditional formatting, and statistical analysis from plain English",
    timeSaved: "Excel expert help ৳5,000 → Copilot included",
    prompt: "Copilot in Excel: from this 3-year sales dataset, create a pivot table showing monthly revenue by product category, add trend lines, and highlight months below target in red",
  },
  {
    emoji: "📊",
    title: "PowerPoint Presentation Builder",
    who: "Managers, students, sales teams, trainers",
    makes: "Professional 20-slide presentations from a Word document or brief prompt in 2 minutes",
    timeSaved: "6 hours PPT design → 5 minutes with Copilot",
    prompt: "Copilot in PowerPoint: create a 15-slide presentation from this Word document about our Q4 2025 business performance — include charts, key metrics, and executive recommendations",
  },
  {
    emoji: "📧",
    title: "Outlook Email Management",
    who: "Executives, managers, anyone managing high email volume",
    makes: "Auto-draft replies, summarise email threads, schedule follow-ups, and draft meeting agendas",
    timeSaved: "2 hours daily email → 30 minutes",
    prompt: "Copilot in Outlook: summarise this 45-email thread about the project delay, identify the 3 key decisions needed, and draft a diplomatic response to the client asking for an update",
  },
  {
    emoji: "🤝",
    title: "Teams Meeting Intelligence",
    who: "Team managers, project leads, remote workers",
    makes: "Auto-transcription, meeting summaries, action item lists, and searchable meeting history",
    timeSaved: "Manual meeting notes 1 hour → automatic in real-time",
    prompt: "Copilot in Teams: generate meeting summary from this 1-hour product review call — list decisions made, action items with owners, and any unresolved questions",
  },
  {
    emoji: "☁️",
    title: "OneDrive File Management",
    who: "Professionals, teams, students managing large file libraries",
    makes: "1TB secure cloud storage — access all documents from any device, anywhere",
    timeSaved: "USB drives and email attachments → instant cloud sync",
    prompt: "Store and share: 500GB of project files, presentations, and client documents — access from office PC, home laptop, and mobile. Automatic version history and recovery.",
  },
  {
    emoji: "📈",
    title: "Business Report Automation",
    who: "Operations managers, finance teams, reporting analysts",
    makes: "Monthly business reports auto-generated from data, with charts, commentary, and distribution via Outlook",
    timeSaved: "3 days monthly report → 2 hours",
    prompt: "Copilot workflow: Excel data → auto-generate Word report → add charts → create PowerPoint summary → email to management via Outlook. All in 30 minutes.",
  },
];

const M365_COMPETITOR_ROWS = [
  { feature: "Word (AI Copilot)", thisProduct: "✅ Full Copilot drafting", chatgpt: "✅ In ChatGPT UI only", claude: "✅ In Claude UI only", gemini: "✅ In Google Docs" },
  { feature: "Excel (AI Analysis)", thisProduct: "✅ Native Copilot in Excel", chatgpt: "✅ Code Interpreter", claude: "❌ No native app", gemini: "✅ In Google Sheets" },
  { feature: "PowerPoint (AI Slides)", thisProduct: "✅ Document → slides auto", chatgpt: "❌ No native PPT", claude: "❌ No native PPT", gemini: "✅ Google Slides" },
  { feature: "Outlook (AI Email)", thisProduct: "✅ Draft, summarise, schedule", chatgpt: "❌ No email integration", claude: "❌ No email integration", gemini: "✅ Gmail only" },
  { feature: "Teams (Meetings AI)", thisProduct: "✅ Transcribe + summarise", chatgpt: "❌ No meetings feature", claude: "❌ No meetings feature", gemini: "✅ Google Meet only" },
  { feature: "OneDrive Storage", thisProduct: "1TB per user", chatgpt: "❌ No storage", claude: "❌ No storage", gemini: "2TB (Gemini Personal plan)" },
  { feature: "Offline Access", thisProduct: "✅ Full desktop apps", chatgpt: "❌ Browser only", claude: "❌ Browser only", gemini: "Google Docs only" },
  { feature: "File Compatibility", thisProduct: "✅ .docx .xlsx .pptx native", chatgpt: "Upload/download only", claude: "Upload/download only", gemini: "Convert to Google format" },
  { feature: "IT Administration", thisProduct: "✅ Full enterprise controls", chatgpt: "❌ None", claude: "❌ None", gemini: "Limited Google Admin" },
  { feature: "Bangla Language Support", thisProduct: "✅ Word spell check in Bangla", chatgpt: "⭐⭐⭐⭐", claude: "⭐⭐⭐⭐", gemini: "⭐⭐⭐⭐⭐" },
  { feature: "Microsoft OneNote", thisProduct: "✅ Full access", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
  { feature: "Microsoft Access (database)", thisProduct: "✅ Included (PC)", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
  { feature: "AITPBD Shared Price", thisProduct: "৳899/mo", chatgpt: "৳399/mo (text AI only)", claude: "৳599/mo (text AI only)", gemini: "৳449/mo (Google suite)" },
];

const M365_FAQS = [
  { q: "What does Microsoft 365 Copilot do inside Word?", a: "Copilot in Word can draft entire documents from a short brief, rewrite or improve existing text, summarise long documents, extract key points from any document, translate content, and explain complex sections in plain language. For Bangladeshi business professionals writing proposals, reports, or legal documents, it eliminates the 'blank page' problem and dramatically speeds up document creation." },
  { q: "How does Copilot in Excel help non-technical users?", a: "Copilot in Excel lets you describe what you want in plain English and it creates the formulas, pivot tables, and charts for you. Instead of learning VLOOKUP or INDEX-MATCH, you type: 'Show me total sales by region for Q3, sorted highest to lowest.' Copilot writes the formula and creates the chart. For Bangladeshi accountants, business owners, and operations teams, this makes Excel data analysis accessible without training." },
  { q: "Can Microsoft 365 Copilot generate entire PowerPoint presentations?", a: "Yes. In PowerPoint, Copilot can generate a full presentation from a prompt ('Create a 15-slide business proposal for a Bangladeshi logistics startup') or from an existing Word document. It selects relevant layouts, adds placeholder content, suggests charts where data is referenced, and applies your theme consistently. The result is a professional first draft you can edit, not a bare template." },
  { q: "What does Copilot do in Microsoft Outlook?", a: "In Outlook, Copilot drafts email replies (you describe the tone and key points, it writes the full email), summarises long email threads (key decisions, pending actions, who said what), suggests meeting times and drafts meeting agendas, and can coach you on email tone ('Is this email too aggressive?'). For Bangladeshi managers handling 50+ emails daily, this can save 1–2 hours every day." },
  { q: "How does Microsoft Teams AI work for remote meetings?", a: "Teams with Copilot transcribes meetings in real-time, generates meeting summaries after the call ends, creates action item lists with owner assignments, and lets you ask questions like 'What was decided about the project deadline?' weeks later. For Bangladeshi businesses with distributed teams (office + remote workers), this means no missed decisions and searchable meeting history." },
  { q: "Does Microsoft 365 work on both Windows and Mac in Bangladesh?", a: "Yes. Microsoft 365 includes desktop apps for both Windows and Mac: Word, Excel, PowerPoint, OneNote, Outlook, and Teams. Additionally, all apps have browser versions (web apps at office.com) and mobile apps for Android and iOS. For Bangladeshi professionals switching between home and office, all files sync via OneDrive automatically." },
  { q: "What is the difference between Microsoft 365 Shared and Personal plans?", a: "The Shared plan (৳899/mo) provides a seat in a shared Microsoft 365 Business subscription — you get all the desktop and web apps plus 1TB OneDrive and Copilot AI features. The Personal plan (৳3,500/mo) upgrades or creates your own Microsoft account with full dedicated access, privacy, and admin control. For individuals, the Shared plan covers all day-to-day needs; enterprises needing custom email domains choose Personal." },
  { q: "Can I use Microsoft 365 offline without internet in Bangladesh?", a: "Yes. Microsoft 365 desktop apps (Word, Excel, PowerPoint, Outlook) work fully offline. Your files are stored locally and sync to OneDrive when you reconnect to internet. This is a major advantage over Google Workspace (which requires internet for most features) for Bangladeshi professionals with inconsistent connectivity or who travel to areas with poor network." },
  { q: "Does Microsoft 365 include Microsoft Access and Publisher?", a: "Microsoft 365 Business includes all core apps — Word, Excel, PowerPoint, Outlook, Teams, OneNote, and OneDrive. Microsoft Access (database tool) is included for Windows users only. Microsoft Publisher has been discontinued as of October 2026. For the full app list, the Shared plan covers all apps a Bangladeshi business professional needs daily." },
  { q: "Is Microsoft 365 Copilot better than ChatGPT for office work?", a: "Microsoft 365 Copilot has a unique advantage: it integrates directly inside your Word, Excel, and PowerPoint files — you don't need to copy-paste between apps. It also accesses your company's data (if using Business plan): your SharePoint files, Outlook emails, Teams messages. ChatGPT is better as a general AI assistant for open-ended tasks. For pure productivity in Microsoft Office apps, Copilot is purpose-built and more powerful." },
  { q: "How do I get Microsoft 365 Copilot from AITPBD?", a: "Message AI Team Premium BD on WhatsApp (+880 1533-262758) with 'I want Microsoft 365 Copilot'. We'll confirm which plan (Shared ৳899 or Personal ৳3,500) you need, take payment via bKash or Nagad, and deliver login credentials within 2–4 hours. The Shared plan is ready instantly; the Personal plan requires creating or upgrading a Microsoft account." },
];


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "microsoft365",
  "category": "writing",
  "priceBdt": 1499,
  "priceLabel": "৳1,499/mo",
  "model": "GPT-4.5 + Microsoft Graph",
  "contextWindow": "Your M365 workspace",
  "multimodal": "Text, spreadsheets, slides, email",
  "banglaQuality": "⭐⭐⭐⭐",
  "speed": "Fast (in-app)",
  "accuracy": "⭐⭐⭐⭐",
  "pricingTier": "Premium",
  "brand": "Microsoft",
  "tagline": "Copilot inside Word, Excel, PowerPoint, Outlook",
  "toolPath": "/tools/microsoft365",
  "iconName": "Briefcase",
  "accent": "#0078D4",
  "bestUseCase": "Office workers, analysts, managers",
  "bestFor": [
    "Drafting documents in Word with Copilot",
    "Excel formulas, charts and data analysis",
    "Auto-generating PowerPoint slides from prompts",
    "Outlook email summaries and replies",
    "Teams meeting transcripts and recap"
  ],
  "weaknesses": [
    "Locked to the Microsoft 365 ecosystem",
    "Expensive vs standalone chat AIs"
  ]
} as const;

export default function Microsoft365Page() {
  return (
    <ToolDetail
      name="Microsoft 365 Copilot"
      tagline="in Bangladesh"
      description="Microsoft 365 with Copilot AI brings intelligence to Word, Excel, PowerPoint, Outlook, and Teams. Draft documents, analyse data, build presentations, summarise emails — all with AI. Available in Bangladesh via bKash/Nagad, no international card needed."
      accentColor="#0078D4"
      icon={Monitor}
      features={[
        "Copilot in Word — draft, rewrite and summarise documents with AI",
        "Copilot in Excel — analyse data, create formulas and generate charts",
        "Copilot in PowerPoint — turn prompts or Word docs into full presentations",
        "Copilot in Outlook — draft emails and summarise long email threads",
        "Microsoft Teams with AI transcription and meeting summaries",
        "1TB OneDrive cloud storage for all files and documents",
        "Word, Excel, PowerPoint, OneNote, Access — full suite",
        "Works offline — full desktop apps for Windows and Mac",
        "Access from any device — PC, Mac, tablet, phone",
        "Full file compatibility — .docx, .xlsx, .pptx native format",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "Microsoft 365 Copilot — Shared",
          price: "৳899",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Shared",
          specs: [
            { label: "Apps", value: "Word · Excel · PPT · Teams" },
            { label: "Storage", value: "1TB OneDrive" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "Microsoft 365 Copilot — Personal",
          price: "৳3,500",
          period: "/mo",
          delivery: "4–6 hr delivery",
          type: "Personal",
          specs: [
            { label: "Access", value: "Dedicated private seat" },
            { label: "Copilot", value: "Full unlimited AI" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/microsoft365"
      specTables={[
        {
          title: "Copilot AI Features by App",
          emoji: "🤖",
          tier2Label: "Shared (৳799/mo)",
          tier3Label: "Personal (৳1,999/mo)",
          rows: [
            { label: "Copilot in Word", free: "No", pro: "Draft, rewrite, summarise docs", premium: "Draft, rewrite, summarise docs" },
            { label: "Copilot in Excel", free: "No", pro: "Formulas, pivot tables, charts", premium: "Formulas, pivot tables, charts" },
            { label: "Copilot in PowerPoint", free: "No", pro: "Brief → full presentation", premium: "Brief → full presentation" },
            { label: "Copilot in Outlook", free: "No", pro: "Draft emails, summarise threads", premium: "Draft emails, summarise threads" },
            { label: "Copilot in Teams", free: "No", pro: "Transcribe + meeting summaries", premium: "Transcribe + meeting summaries" },
            { label: "Microsoft Designer (AI images)", free: "No", pro: "Yes, in apps", premium: "Yes, in apps" },
            { label: "AI Data Analysis", free: "Basic Excel only", pro: "Full Copilot in Excel", premium: "Full Copilot in Excel" },
            { label: "Translation in Office", free: "Limited", pro: "50+ languages including Bangla", premium: "50+ languages including Bangla" },
          ],
        },
        {
          title: "Apps, Storage & Compatibility",
          emoji: "💻",
          tier2Label: "Shared (৳799/mo)",
          tier3Label: "Personal (৳1,999/mo)",
          rows: [
            { label: "Desktop Apps (Win + Mac)", free: "Online only (no desktop)", pro: "Yes, full desktop install", premium: "Yes, full desktop install" },
            { label: "OneDrive Storage", free: "5GB", pro: "1TB (shared plan)", premium: "1TB (own Microsoft account)" },
            { label: "Offline Access", free: "No (web apps only)", pro: "Yes (full desktop)", premium: "Yes (full desktop)" },
            { label: "Mobile Apps (Android/iOS)", free: "Limited", pro: "Full-featured", premium: "Full-featured" },
            { label: "Number of Devices", free: "1 device", pro: "Up to 5 devices", premium: "Up to 5 devices (own licence)" },
            { label: "File Format Compatibility", free: ".docx (basic)", pro: "All Office formats native", premium: "All Office formats native" },
            { label: "Microsoft Teams", free: "Free basic Teams", pro: "Full Copilot + transcription", premium: "Full Copilot + transcription" },
            { label: "SharePoint (Business)", free: "No", pro: "No", premium: "Yes (own Microsoft account)" },
          ],
        },
      ]}
      useCases={M365_USE_CASES}
      competitorRows={M365_COMPETITOR_ROWS}
      extendedFaqs={M365_FAQS}
    />
  );
}
