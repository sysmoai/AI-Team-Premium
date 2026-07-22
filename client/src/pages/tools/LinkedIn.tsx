import { ToolDetail } from "@/components/ToolDetail";
import { Briefcase } from "lucide-react";

const LINKEDIN_USE_CASES = [
  {
    emoji: "💼",
    title: "Direct Recruiter Outreach",
    who: "Job seekers, fresh graduates, career changers",
    makes: "Message any recruiter at Google, Meta, or top Dhaka tech firms directly via InMail",
    timeSaved: "Months of passive waiting → active outreach in days",
    prompt: "InMail to recruiter: 'Hi [Name], I noticed [Company] is expanding its Dhaka tech team. As a senior React developer with 4 years experience, I'd love to explore opportunities...'",
  },
  {
    emoji: "🎓",
    title: "LinkedIn Learning Skill Upgrade",
    who: "Professionals, career switchers, students building marketable skills",
    makes: "Complete data science, digital marketing, or project management certification paths",
    timeSaved: "৳20,000 course → ৳0 (16,000+ courses included)",
    prompt: "Complete: 'Become a Data Analyst' learning path — Excel, SQL, Python, Tableau. All 16,000+ courses available, earn LinkedIn certificates to add to your profile.",
  },
  {
    emoji: "🤝",
    title: "B2B Lead Generation",
    who: "Sales professionals, business development managers, startup founders",
    makes: "Find and message ideal prospects at target companies using advanced search filters",
    timeSaved: "Cold email guessing → precise LinkedIn targeting",
    prompt: "Premium Business: search 'Head of Marketing' in 'Pharmaceuticals' in Bangladesh → 50 results. Filter by connections. Send InMail with targeted pitch.",
  },
  {
    emoji: "🔍",
    title: "Understand Who Viewed Your Profile",
    who: "Job seekers, freelancers, consultants, business professionals",
    makes: "See the full 90-day list of everyone who viewed your profile — identify warm leads and recruiters",
    timeSaved: "Blind guessing → actionable profile visitor intelligence",
    prompt: "Profile visitors list: 'Talent Acquisition Manager at Samsung Bangladesh viewed your profile yesterday.' → send connection request with personalised note immediately.",
  },
  {
    emoji: "📊",
    title: "AI-Powered Resume & Profile Coaching",
    who: "Job seekers, professionals wanting promotion, freelancers building credibility",
    makes: "LinkedIn's AI reviews your profile and gives specific improvement suggestions for your target role",
    timeSaved: "Career counsellor ৳5,000 → AI coaching included",
    prompt: "LinkedIn AI feedback on your profile: 'Your headline is too generic. Change to: Senior Full-Stack Developer | React, Node.js | Open to Dhaka & Remote Roles' for 4× more recruiter views.",
  },
  {
    emoji: "💰",
    title: "Salary Negotiation Research",
    who: "Professionals receiving job offers, employees requesting raises",
    makes: "Bangladesh-specific salary benchmarks for your role, industry, and experience level",
    timeSaved: "Negotiating blind → data-backed negotiation",
    prompt: "LinkedIn Salary Insights: 'Senior Software Engineer in Dhaka, 5 years experience, Technology sector' → median salary range ৳80,000–1,20,000/month with 25th–75th percentile data",
  },
  {
    emoji: "🎤",
    title: "AI Interview Preparation",
    who: "Job candidates preparing for technical and HR interviews",
    makes: "Practice 50+ role-specific interview questions with real-time AI feedback on your answers",
    timeSaved: "Mock interview coach ৳3,000/session → AI coaching included",
    prompt: "LinkedIn Interview Prep: 'Product Manager role at a Dhaka startup' → practice STAR method answers to 'Tell me about a product you launched and what you learned'",
  },
];

const LINKEDIN_COMPETITOR_ROWS = [
  { feature: "InMail Credits (direct outreach)", thisProduct: "5/mo (Career) · 15/mo (Business)", chatgpt: "❌ None", claude: "❌ None", gemini: "❌ None" },
  { feature: "Profile Viewers (90 days)", thisProduct: "✅ Full list, 90 days", chatgpt: "❌ None", claude: "❌ None", gemini: "❌ None" },
  { feature: "LinkedIn Learning Courses", thisProduct: "16,000+ courses included", chatgpt: "❌ No courses", claude: "❌ No courses", gemini: "❌ No courses" },
  { feature: "Salary Benchmarks", thisProduct: "✅ BD market data", chatgpt: "General estimates only", claude: "General estimates only", gemini: "General estimates only" },
  { feature: "AI Interview Prep", thisProduct: "✅ Built-in, role-specific", chatgpt: "✅ Text-based only", claude: "✅ Text-based only", gemini: "✅ Text-based only" },
  { feature: "Job Applicant Ranking", thisProduct: "✅ See where you stand", chatgpt: "❌ None", claude: "❌ None", gemini: "❌ None" },
  { feature: "AI Resume Suggestions", thisProduct: "✅ LinkedIn-native, targeted", chatgpt: "✅ General writing help", claude: "✅ General writing help", gemini: "✅ General writing help" },
  { feature: "Advanced People Search", thisProduct: "✅ By title, company, location", chatgpt: "❌ No people search", claude: "❌ No people search", gemini: "❌ No people search" },
  { feature: "Company Insights (Business)", thisProduct: "✅ Growth data, headcount", chatgpt: "Limited web data", claude: "Limited web data", gemini: "Google data only" },
  { feature: "Open Profile (be findable)", thisProduct: "✅ Anyone can InMail you", chatgpt: "❌ None", claude: "❌ None", gemini: "❌ None" },
  { feature: "Certificate of Completion", thisProduct: "✅ LinkedIn-verified badges", chatgpt: "❌ No certificates", claude: "❌ No certificates", gemini: "❌ No certificates" },
  { feature: "Networking Intelligence", thisProduct: "✅ Mutual connections, paths", chatgpt: "❌ None", claude: "❌ None", gemini: "❌ None" },
  { feature: "AITP Price (Career)", thisProduct: "৳999/mo", chatgpt: "৳399/mo (different tool)", claude: "৳599/mo (different tool)", gemini: "৳449/mo (different tool)" },
];

const LINKEDIN_FAQS = [
  { q: "What is the difference between LinkedIn Premium Career and Premium Business?", a: "LinkedIn Premium Career (৳999/mo) is for job seekers — you get 5 InMail credits, full profile viewers list, AI resume coaching, interview prep, and job applicant insights. Premium Business (৳1,800/mo) is for sales and B2B — you get 15 InMail credits, unlimited people browsing, company growth insights, and advanced lead search. Job seekers choose Career; salespeople and founders choose Business." },
  { q: "How do InMail credits work and why are they valuable in Bangladesh?", a: "InMail lets you message anyone on LinkedIn directly — even if they're not connected to you. This is invaluable for reaching HR managers, recruiters, and decision-makers at Bangladeshi and international companies. Unlike connection requests (which many people ignore), InMails are guaranteed to be delivered to the recipient's inbox, with LinkedIn showing your full profile. Used strategically, one InMail to the right recruiter can change your career." },
  { q: "Can I access LinkedIn Learning courses on any topic?", a: "Yes. LinkedIn Learning includes 16,000+ courses in technology (Python, cloud, cybersecurity), business (management, finance, marketing), design (UI/UX, video editing), and soft skills. Courses are self-paced, available in multiple languages (including English), and include quizzes and projects. Completion generates a LinkedIn certificate that appears directly on your profile — a credible professional signal." },
  { q: "How does LinkedIn's AI resume builder work?", a: "LinkedIn's AI resume and profile tools analyse your current profile, job history, and skills against your target roles. It suggests specific improvements: better headline formulations, skill additions you're missing for target roles, richer descriptions for your experience, and endorsement strategies. For Bangladeshi professionals applying to international companies, these AI suggestions significantly improve recruiter attraction." },
  { q: "What is the 'See Who Viewed Your Profile' feature and how do I use it strategically?", a: "Premium Career and Business show you everyone who viewed your profile in the last 90 days — including their name, job title, and company. Without Premium, you only see 5 viewers maximum and the rest are anonymous. Strategically, if a recruiter from a target company viewed your profile, that's a warm signal — you can send them a connection request or InMail immediately while your profile is fresh in their mind." },
  { q: "Is LinkedIn Premium worth it for Bangladeshi students and fresh graduates?", a: "For final-year students and fresh graduates, LinkedIn Premium Career is highly worth it during the job search phase. The InMail credits let you bypass the 'send connection request → wait for acceptance → message' workflow and contact recruiters directly. The interview prep tools and job applicant insight (seeing how your qualifications compare to other applicants) give concrete advantages. Use it intensively for 2–3 months during active job searching." },
  { q: "What job-related insights does LinkedIn Premium provide that Free doesn't?", a: "LinkedIn Premium shows you: (1) Applicant insights — for each job you've applied to, see how you rank vs. other applicants by skills, education, and experience. (2) InMail to the hiring manager directly. (3) Company growth trends — is the company hiring, stable, or shrinking? (4) Who exactly from that company has viewed your profile since you applied. These insights help you prioritise applications and personalise outreach." },
  { q: "Can LinkedIn Premium help with freelancing and finding international clients?", a: "Yes — especially the Business plan. Advanced people search lets you find CMOs, CTOs, and marketing managers at companies that might hire Bangladeshi freelancers. With InMail, you can pitch your services directly. Profile visitor data shows when someone from a foreign company viewed your portfolio. For Bangladeshi developers, designers, and consultants targeting international clients, LinkedIn Premium Business is a powerful BD-to-global pipeline tool." },
  { q: "How does LinkedIn Premium AI interview preparation actually work?", a: "LinkedIn's AI Interview Prep presents role-specific questions based on your target job (you input the role and company type). You record a video or audio answer, and the AI evaluates: your content quality, pace, keyword coverage, and delivery confidence. It then gives specific feedback like 'Your answer lacked a concrete example — use the STAR method here.' Available for hundreds of job roles including software engineering, marketing, and management." },
  { q: "Is LinkedIn Premium delivered to my own LinkedIn account?", a: "Yes. LinkedIn Premium Career (৳999/mo) and Business (৳1,800/mo) from AITP are upgraded directly on your own LinkedIn account — you keep all your connections, messages, and history. We need your LinkedIn email address to process the upgrade. Delivery takes 2–4 hours. After upgrade, you see the 'Premium' gold badge on your profile immediately." },
  { q: "Can I cancel LinkedIn Premium through AITP after one month?", a: "Yes. LinkedIn Premium from AITP is month-to-month — you pay for one month at a time via bKash or Nagad. You can choose not to renew after any month. Since it's a private upgrade on your own account, your LinkedIn data, connections, and history remain intact even if you downgrade to Free. Simply don't pay for the next month to revert." },
];


// TOOL_META — structured snapshot consumed by /compare/:slug
export const TOOL_META = {
  "slug": "linkedin",
  "category": "writing",
  "priceBdt": 899,
  "priceLabel": "৳899/mo",
  "model": "LinkedIn AI (writing assist)",
  "contextWindow": "Your profile + network",
  "multimodal": "Text, profile data",
  "banglaQuality": "⭐⭐⭐",
  "speed": "Real-time",
  "accuracy": "⭐⭐⭐⭐",
  "pricingTier": "Mainstream",
  "brand": "LinkedIn",
  "tagline": "Career & business networking with AI",
  "toolPath": "/tools/linkedin",
  "iconName": "Linkedin",
  "accent": "#0A66C2",
  "bestUseCase": "Job seekers, recruiters, B2B sales",
  "bestFor": [
    "InMail messages to anyone on LinkedIn",
    "Who's Viewed Your Profile (last 90 days)",
    "AI-assisted profile + cover letter writing",
    "LinkedIn Learning (20,000+ courses)",
    "Top Applicant + salary insights"
  ],
  "weaknesses": [
    "Not a general-purpose AI tool",
    "Value depends on active job search / sales"
  ]
} as const;

export default function LinkedInPage() {
  return (
    <ToolDetail
      name="LinkedIn Premium"
      tagline="in Bangladesh"
      description="LinkedIn Premium gives Bangladeshi job seekers and professionals InMail credits to contact recruiters directly, full profile viewer insights, AI-powered resume coaching, and access to 16,000+ LinkedIn Learning courses — from ৳999/month via bKash or Nagad."
      accentColor="#0A66C2"
      icon={Briefcase}
      features={[
        "InMail credits — message any recruiter or employer directly",
        "See who viewed your profile — full 90-day list",
        "AI-powered resume and LinkedIn profile suggestions",
        "Job applicant insights — see how you rank vs other applicants",
        "LinkedIn Learning — 16,000+ courses in tech, design, business",
        "AI interview preparation with real-time feedback",
        "Salary benchmarks and compensation data for BD market",
        "Advanced people search by title, company, location, industry",
        "Company insights — growth trends, headcount, hiring signals",
        "Business plan: 15 InMails and unlimited people browsing",
        "30-day replacement warranty · 24/7 WhatsApp support",
      ]}
      plans={[
        {
          label: "LinkedIn Premium Career",
          price: "৳999",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Career",
          specs: [
            { label: "InMail", value: "5 credits/month" },
            { label: "Learning", value: "16,000+ courses" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
        {
          label: "LinkedIn Premium Business",
          price: "৳1,800",
          period: "/mo",
          delivery: "2–4 hr delivery",
          type: "Business",
          specs: [
            { label: "InMail", value: "15 credits/month" },
            { label: "Browse", value: "Unlimited profiles" },
            { label: "Payment", value: "bKash / Nagad" },
          ],
        },
      ]}
      path="/tools/linkedin"
      specTables={[
        {
          title: "Career & Job Search Features",
          emoji: "💼",
          tier2Label: "Shared (৳699/mo)",
          tier3Label: "Personal (৳1,799/mo)",
          rows: [
            { label: "InMail Credits", free: "0 (cannot message strangers)", pro: "5/mo (Career) · 15/mo (Business)", premium: "15/mo (Business, own account)" },
            { label: "Profile Viewers", free: "Last 5 only, mostly anonymous", pro: "Full 90-day list with names", premium: "Full 90-day list (own account)" },
            { label: "Job Applicant Insights", free: "No", pro: "Yes, rank vs other applicants", premium: "Yes, rank vs other applicants" },
            { label: "AI Resume Coach", free: "No", pro: "Yes, role-targeted suggestions", premium: "Yes, role-targeted suggestions" },
            { label: "AI Interview Prep", free: "No", pro: "Yes, video + AI feedback", premium: "Yes, video + AI feedback" },
            { label: "Salary Insights", free: "No", pro: "Yes, BD market data", premium: "Yes, BD market data" },
            { label: "Open Profile (findable)", free: "No", pro: "Yes", premium: "Yes (own account)" },
            { label: "Job Search Filters (Premium)", free: "Basic", pro: "Advanced (skills, experience)", premium: "Advanced (skills, experience)" },
          ],
        },
        {
          title: "Learning & Professional Development",
          emoji: "🎓",
          tier2Label: "Shared (৳699/mo)",
          tier3Label: "Personal (৳1,799/mo)",
          rows: [
            { label: "LinkedIn Learning Courses", free: "1-month free trial only", pro: "16,000+ all unlimited", premium: "16,000+ all unlimited" },
            { label: "Course Certificates", free: "Limited (free courses only)", pro: "All certificates on profile", premium: "All certificates on own profile" },
            { label: "Learning Paths", free: "No", pro: "Curated career-specific paths", premium: "Curated career-specific paths" },
            { label: "Company Insights", free: "No", pro: "Growth, headcount, hiring trends", premium: "Growth, headcount, hiring trends" },
            { label: "People Search (Business)", free: "Limited", pro: "Unlimited by title, company", premium: "Unlimited by title, company" },
            { label: "Profile Badge", free: "None", pro: "Gold 'Premium' badge", premium: "Gold 'Premium' badge (own profile)" },
            { label: "Priority Applicant Tag", free: "No", pro: "Yes, stands out to recruiters", premium: "Yes, stands out to recruiters" },
            { label: "InMail Response Rate", free: "N/A", pro: "~18% (vs 3% cold email)", premium: "~18% (vs 3% cold email)" },
          ],
        },
      ]}
      useCases={LINKEDIN_USE_CASES}
      competitorRows={LINKEDIN_COMPETITOR_ROWS}
      extendedFaqs={LINKEDIN_FAQS}
    />
  );
}
