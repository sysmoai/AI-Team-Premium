import { ToolDetail } from "@/components/ToolDetail";
import { SiGithub } from "react-icons/si";

const COPILOT_USE_CASES = [
  {
    emoji: "⚡",
    title: "Lightning-Fast Code Completion",
    who: "All developers — junior to senior, any language",
    makes: "Real-time autocomplete for entire functions, classes, and boilerplate from a comment",
    timeSaved: "Manual typing → 40–55% of code written by Copilot",
    prompt: "// Create a React custom hook for fetching paginated data from an API with loading, error, and hasMore states — Copilot completes the entire hook instantly",
  },
  {
    emoji: "🤖",
    title: "Autonomous Feature Implementation",
    who: "Software developers, product teams, startups",
    makes: "Copilot Agents autonomously reads your codebase, plans, and implements multi-file features",
    timeSaved: "2-day feature sprint → 2-hour agent session",
    prompt: "Copilot Agent: 'Add user role-based access control to this Express app — create middleware, update all routes, add database schema, and write tests.' Agent does it all autonomously.",
  },
  {
    emoji: "🐛",
    title: "Bug Detection & Fixing",
    who: "Developers debugging production issues and code reviews",
    makes: "Copilot identifies root cause, suggests the fix, and explains why the bug occurred",
    timeSaved: "3 hours debugging → 15 minutes with Copilot Chat",
    prompt: "Copilot Chat: 'This function returns undefined intermittently in production but works in tests — walk me through every possible cause and fix for this race condition'",
  },
  {
    emoji: "🧪",
    title: "Automatic Unit Test Generation",
    who: "Developers improving code quality, QA engineers",
    makes: "Full test suites generated from existing code — edge cases, happy paths, and error handling",
    timeSaved: "Writing tests manually → Copilot generates 80% automatically",
    prompt: "Select UserService.ts → Copilot: 'Generate Jest test suite for all methods — include happy paths, null inputs, error states, and mock the database calls'",
  },
  {
    emoji: "📋",
    title: "Pull Request Documentation",
    who: "Team leads, developers working on collaborative projects",
    makes: "Auto-generated PR descriptions that explain what changed, why, and how to test",
    timeSaved: "10 minutes per PR → 10 seconds with Copilot",
    prompt: "On GitHub: create pull request → Copilot auto-fills: 'Summary: Added JWT authentication middleware. Changes: 4 files. Testing: unit tests pass. Breaking changes: none.'",
  },
  {
    emoji: "🌐",
    title: "Multi-Language & Framework Support",
    who: "Full-stack developers, polyglot programmers",
    makes: "Expert-level suggestions in Python, JavaScript, TypeScript, Go, Rust, Java, C++, and 20+ more",
    timeSaved: "Context-switching learning time → Copilot knows every language",
    prompt: "Switching from Python to Go for a microservice — Copilot understands Go idioms, goroutines, and error handling patterns and completes code correctly without needing examples",
  },
  {
    emoji: "🔒",
    title: "Security Code Review",
    who: "Security-conscious developers, fintech and healthtech teams",
    makes: "Copilot flags SQL injection, XSS vulnerabilities, hardcoded secrets, and security anti-patterns",
    timeSaved: "Security audit ৳50,000 → Copilot continuous scanning",
    prompt: "Copilot Code Review on my PR: identified 3 issues — SQL injection in user search, CORS misconfiguration, and bcrypt rounds too low. Each with inline fix suggestion.",
  },
];

const COPILOT_COMPETITOR_ROWS = [
  { feature: "Code Completion (inline)", thisProduct: "⭐⭐⭐⭐⭐ (best-in-class)", chatgpt: "❌ No inline IDE completion", claude: "❌ No inline IDE completion", gemini: "✅ Gemini Code Assist (Google)" },
  { feature: "IDE Integration", thisProduct: "VS Code, JetBrains, Neovim, Xcode", chatgpt: "ChatGPT.com only", claude: "Claude.ai only", gemini: "VS Code, IntelliJ (Gemini Assist)" },
  { feature: "Copilot Agents (autonomous)", thisProduct: "✅ Multi-file autonomous coding", chatgpt: "✅ ChatGPT (limited agentic)", claude: "✅ Claude (Projects)", gemini: "Limited" },
  { feature: "AI Model Switching", thisProduct: "✅ GPT-4.1, Claude Sonnet, Gemini", chatgpt: "GPT only", claude: "Claude only", gemini: "Gemini only" },
  { feature: "PR Summary Generation", thisProduct: "✅ Auto on GitHub", chatgpt: "❌ No GitHub native", claude: "❌ No GitHub native", gemini: "❌ No GitHub native" },
  { feature: "Unit Test Generation", thisProduct: "✅ From existing code", chatgpt: "✅ On request (paste code)", claude: "✅ On request", gemini: "✅ On request" },
  { feature: "Code Review (inline)", thisProduct: "✅ In GitHub, native", chatgpt: "❌ No native review", claude: "❌ No native review", gemini: "❌ No native review" },
  { feature: "Security Scanning", thisProduct: "✅ Copilot Autofix (GitHub Advanced)", chatgpt: "❌ No", claude: "❌ No", gemini: "❌ No" },
  { feature: "Context from Your Codebase", thisProduct: "✅ Reads all open files", chatgpt: "File upload only", claude: "File upload only", gemini: "File upload only" },
  { feature: "Bangla Comment → Code", thisProduct: "✅ Understands Bangla comments", chatgpt: "✅ Excellent", claude: "✅ Excellent", gemini: "✅ Good" },
  { feature: "Works On Private Repos", thisProduct: "✅ Yes, stays in your IDE", chatgpt: "Upload to chatgpt.com", claude: "Upload to claude.ai", gemini: "Google servers" },
  { feature: "Mobile / Web Coding", thisProduct: "✅ GitHub.com Copilot", chatgpt: "✅ ChatGPT web", claude: "✅ Claude.ai web", gemini: "✅ Gemini web" },
  { feature: "AITP Price", thisProduct: "৳1,200/mo (Private)", chatgpt: "৳399/mo (text AI)", claude: "৳599/mo (text AI)", gemini: "৳449/mo (text AI)" },
];

const COPILOT_BASE_FAQS = [
  { q: "GitHub Copilot কি VS Code-এ কাজ করে?", a: "হ্যাঁ! GitHub Copilot VS Code, JetBrains IDE (IntelliJ, PyCharm, WebStorm), Neovim, Xcode এবং GitHub.com-এ সরাসরি কাজ করে। Extension install করলেই real-time code suggestions শুরু হয়।" },
  { q: "GitHub Copilot-এ কোন AI model ব্যবহার করা হয়?", a: "GitHub Copilot একাধিক model সাপোর্ট করে — GPT-4.1, Claude Sonnet, এবং Gemini 2.5। আপনি settings থেকে পছন্দের model বেছে নিতে পারবেন।" },
  { q: "Copilot Agents কী করে?", a: "Copilot Agents হলো autonomous coding mode। এটি feature request, bug fix বা refactor-এর জন্য নিজেই multiple files পড়ে, plan তৈরি করে এবং কোড লেখে — শুধু approve করলেই হয়।" },
  { q: "বাংলাদেশে GitHub Copilot কীভাবে কিনবো?", a: "AI Team Premium-এর মাধ্যমে ৳১,২০০/মাসে আপনার নিজের GitHub account-এ Copilot সক্রিয় করুন — bKash বা Nagad-এ পেমেন্ট, ২-৪ ঘন্টায় delivery।" },
  { q: "Copilot কি free GitHub account-এ চলবে?", a: "হ্যাঁ, আপনার free GitHub account-এই Copilot activate করা হবে। আলাদা paid GitHub plan লাগবে না।" },
];

const COPILOT_EXTENDED_FAQS = [
  { q: "How does GitHub Copilot learn from my codebase?", a: "GitHub Copilot reads all the files currently open in your IDE and uses them as context for suggestions. It understands your variable naming conventions, coding style, and existing patterns — making suggestions that fit your specific project rather than generic code. You can also open specific files to 'teach' Copilot your patterns. It does not permanently learn from your code or share it with other users." },
  { q: "Is GitHub Copilot worth it compared to using ChatGPT for coding?", a: "They serve different workflows. GitHub Copilot integrates directly into your IDE and provides real-time autocomplete as you type — no copy-paste required. ChatGPT is better for explaining concepts, discussing architecture, and generating code you then paste in. Most professional developers use Copilot for daily coding (inline completion) and ChatGPT or Claude for architectural discussions and code review. If you code in VS Code or JetBrains for hours daily, Copilot's inline suggestions are transformative." },
  { q: "Which programming languages does GitHub Copilot support best?", a: "Copilot has the highest quality suggestions for languages with the most public training data: Python, JavaScript, TypeScript, Java, C#, C++, Go, Ruby, and PHP. It's also strong in Rust, Kotlin, Swift, and shell scripting. For Bangladeshi developers working in Python (data science, Django), JavaScript/TypeScript (React, Node), or Java (Android, Spring Boot), Copilot is excellent from day one." },
  { q: "What is Copilot Chat and how is it different from inline completion?", a: "Copilot Chat is a conversational AI panel in VS Code and JetBrains — you ask questions in natural language and get answers about your code. Use it to: explain what a function does, suggest refactors for a selected block, generate documentation, debug errors (paste the error message and ask what's wrong), or ask 'How do I implement authentication in this Express app?'. It's like having a senior developer available via chat in your IDE." },
  { q: "Can GitHub Copilot help Bangladeshi developers get better at coding?", a: "Yes — Copilot is also a learning tool. When it suggests code you wouldn't have written yourself, you can ask Copilot Chat 'Explain why you wrote it this way' or 'What does this pattern do?' This accelerates learning by showing you real-world code patterns and best practices in context. Many Bangladeshi CS students use Copilot to understand how experienced developers structure code for different problems." },
  { q: "What is Copilot Autofix and how does it improve code security?", a: "Copilot Autofix is a GitHub Advanced Security feature that automatically detects security vulnerabilities in pull requests (SQL injection, XSS, hardcoded secrets, etc.) and suggests one-click code fixes. Instead of just flagging an issue, Copilot writes the corrected code and explains why the original was vulnerable. For Bangladeshi developers building fintech or health apps where security is critical, this catches issues before they reach production." },
  { q: "How many developers can use one GitHub Copilot account?", a: "The GitHub Copilot plan from AITP (৳1,200/mo) is activated on your personal GitHub account — it's a single-user licence. This gives you Copilot across all your repositories, both personal and where you're a contributor. GitHub Copilot Business (multi-seat for teams) requires separate pricing — contact us on WhatsApp for team pricing." },
];


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "copilot",
  "category": "code",
  "priceBdt": 599,
  "priceLabel": "৳599/mo",
  "model": "GPT-4.5 + Claude Sonnet 3.5 + Gemini 2.5 Pro",
  "contextWindow": "Full-file + workspace context",
  "multimodal": "Code, comments, chat",
  "banglaQuality": "N/A",
  "speed": "Real-time completions",
  "accuracy": "⭐⭐⭐⭐⭐",
  "pricingTier": "Mainstream",
  "brand": "GitHub",
  "tagline": "AI pair-programmer in your IDE",
  "toolPath": "/tools/copilot",
  "iconName": "Code2",
  "accent": "#171717",
  "bestUseCase": "Developers, software engineers",
  "bestFor": [
    "Inline code completion in VS Code, JetBrains, Neovim",
    "Multi-model: GPT-4.5 + Claude Sonnet 3.5 + Gemini",
    "Chat with your repo (Copilot Workspace)",
    "Best for daily developer productivity"
  ],
  "weaknesses": [
    "Not as good at standalone analysis as Claude",
    "Limited to coding context"
  ]
} as const;

export default function Copilot() {
  return (
    <ToolDetail
      name="GitHub Copilot"
      tagline="Your AI Pair Programmer"
      description="The AI coding tool used by millions of developers. Real-time code completion, Copilot Chat, autonomous Copilot Agents, pull-request summaries and test generation — upgraded privately on your GitHub account, payable via bKash/Nagad."
      accentColor="#24292F"
      icon={SiGithub as any}
      features={[
        "Multi-model code completion: GPT-4.1, Claude Sonnet, Gemini 2.5",
        "Copilot Chat — conversational AI in VS Code, JetBrains and web",
        "Copilot Agents — autonomous multi-file coding and refactoring",
        "AI-generated pull-request descriptions and summaries",
        "Unit test generation from your existing code",
        "Code review suggestions inline in GitHub",
        "Security vulnerability detection with one-click Autofix",
        "Supports VS Code, Neovim, JetBrains, Xcode and more",
        "Understands Bangla code comments for local context",
        "Upgraded privately on your own GitHub account",
        "30-day warranty · bKash / Nagad accepted",
      ]}
      plans={[
        {
          label: "GitHub Copilot — Private",
          price: "৳1,200",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Private",
          specs: [
            { label: "Access", value: "Your own GitHub" },
            { label: "Warranty", value: "Full 30 days" },
            { label: "Support", value: "WhatsApp 24/7" },
          ],
        },
      ]}
      specTables={[
        {
          title: "Code Completion & Chat",
          emoji: "💻",
          tier2Label: "Shared (৳649/mo)",
          tier3Label: "Personal (৳1,499/mo)",
          rows: [
            { label: "AI Models Available", free: "GPT-3.5 only (old free)", pro: "GPT-4.1, Claude Sonnet, Gemini", premium: "GPT-4.1, Claude Sonnet, Gemini" },
            { label: "Inline Code Completion", free: "Basic (300/mo free tier)", pro: "Unlimited", premium: "Unlimited (dedicated)" },
            { label: "Copilot Chat", free: "Limited", pro: "Unlimited, full context", premium: "Unlimited, full context" },
            { label: "Multi-file Context", free: "No", pro: "Yes, all open files", premium: "Yes, all open files" },
            { label: "Copilot Agents (autonomous)", free: "No", pro: "Yes, multi-file", premium: "Yes, multi-file" },
            { label: "PR Summary Generation", free: "No", pro: "Yes, auto on GitHub", premium: "Yes, auto on GitHub" },
            { label: "Unit Test Generation", free: "No", pro: "Yes, from existing code", premium: "Yes, from existing code" },
            { label: "Code Review Suggestions", free: "No", pro: "Yes, inline in GitHub", premium: "Yes, inline in GitHub" },
          ],
        },
        {
          title: "IDE Support & Advanced Features",
          emoji: "🔧",
          tier2Label: "Shared (৳649/mo)",
          tier3Label: "Personal (৳1,499/mo)",
          rows: [
            { label: "VS Code", free: "Yes (basic)", pro: "Full, all features", premium: "Full, all features" },
            { label: "JetBrains IDEs", free: "No", pro: "Full (IntelliJ, PyCharm, etc.)", premium: "Full (IntelliJ, PyCharm, etc.)" },
            { label: "Neovim", free: "No", pro: "Yes", premium: "Yes" },
            { label: "Xcode (iOS/macOS)", free: "No", pro: "Yes", premium: "Yes" },
            { label: "GitHub.com (web editor)", free: "No", pro: "Yes, full Copilot", premium: "Yes, full Copilot" },
            { label: "Security Autofix", free: "No", pro: "Yes (Copilot Autofix)", premium: "Yes (Copilot Autofix)" },
            { label: "Private Repo Support", free: "Yes", pro: "Yes, fully private", premium: "Yes, own GitHub account" },
            { label: "No Data Sharing Policy", free: "—", pro: "Opt-out available", premium: "Opt-out available (own settings)" },
          ],
        },
      ]}
      useCases={COPILOT_USE_CASES}
      competitorRows={COPILOT_COMPETITOR_ROWS}
      extendedFaqs={[...COPILOT_BASE_FAQS, ...COPILOT_EXTENDED_FAQS]}
    />
  );
}
