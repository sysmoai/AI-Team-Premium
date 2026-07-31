// Intro copy for each /category/<slug> landing page.
//
// Lives in shared/ because both the page (client/src/pages/CategoryPage.tsx)
// and the metadata generator (scripts/gen-category-routes.mjs) read it. A
// second copy would drift, and the meta description is the one a search result
// actually displays.
//
// No prices here on purpose. Every figure on a category page is read from the
// catalog at render time, so intro copy that quoted a number would be the one
// place a stale price could survive a reprice.
//
//   body        the paragraph under the H1
//   meta        the meta description (kept under ~160 chars so it is not truncated)
//   titleLabel  optional. Headings read "<label> Tools", which is wrong when the
//               label is already a plural noun — "AI Assistants Tools",
//               "Bundles Tools". Set this to replace the whole phrase.

export const CATEGORY_INTROS = {
  "ai-assistant": {
    titleLabel: "AI Assistants",
    body: "General-purpose AI assistants — the tools you ask questions, draft with, and think out loud with. This is where most people start, and for many it is the only AI subscription they genuinely need. The differences that matter in practice are reasoning depth on hard problems, how much context the model holds at once, and how well it handles Bangla.",
    meta: "AI chat assistants in Bangladesh — ChatGPT, Claude, Gemini, Perplexity and more. Pay with bKash or Nagad, no international card needed.",
  },
  "ai-video": {
    body: "Two different jobs live in this category, and it is worth knowing which you need. Editing tools cut, caption and polish footage you already shot. Generation tools create footage that never existed from a text prompt or a still image. Editors are cheaper and cover most client work; generation is what you add when a brief calls for a shot you cannot practically film.",
    meta: "AI video tools in Bangladesh — CapCut, Runway, Kling, Luma and more for editing, captions and AI video generation. bKash and Nagad accepted.",
  },
  "ai-workspace": {
    body: "Tools that sit where the work already happens — notes, docs, meetings, boards and project tracking, with AI built in rather than bolted on. The practical test for anything here is whether your team will actually open it daily; a workspace tool nobody adopts costs more than it saves.",
    meta: "AI workspace and productivity tools in Bangladesh — Notion, Miro, Airtable, ClickUp, meeting assistants and more. Pay via bKash or Nagad.",
  },
  "ai-image": {
    body: "Image generation and editing, covering everything from product photos for a Facebook shop to logo and brand work. The split worth understanding: generators create an image from a prompt, editors fix and extend images you already have, and only some tools output true editable vectors — which is what you need if the result has to survive being printed on a banner.",
    meta: "AI image tools in Bangladesh — Midjourney, Ideogram, Recraft, Photoroom and more for generation, editing and product photos. bKash accepted.",
  },
  "ai-voice-music": {
    body: "Text-to-speech, voice cloning and music generation. For most freelancers here the practical use is voiceover — narration for tutorials, ads and explainer videos without booking a studio or a voice actor. Check language support before buying if you need Bangla narration rather than English.",
    meta: "AI voice and music tools in Bangladesh — ElevenLabs, Murf, Suno and more for voiceover, narration and music generation. Pay with bKash or Nagad.",
  },
  "ai-code": {
    body: "AI coding assistants, split between two approaches. Inline assistants suggest code as you type inside the editor you already use, with no workflow change. AI-first editors and agents take a whole task and edit across many files at once. Whichever you pick, the habit that actually produces the gains is reading every suggestion before accepting it.",
    meta: "AI coding tools in Bangladesh — GitHub Copilot, Cursor, Windsurf, Replit and more for developers. Pay via bKash or Nagad, no international card.",
  },
  "ai-writing": {
    body: "Writing, editing and paraphrasing tools. These earn their place mainly on non-native English writing — client emails, proposals, assignments and CVs, where a grammar mistake costs more than the subscription does. Worth pairing with a general assistant rather than buying instead of one.",
    meta: "AI writing tools in Bangladesh — Grammarly, QuillBot, Jasper and more for grammar, paraphrasing and content. bKash and Nagad accepted.",
  },
  "ai-design": {
    body: "Design and creative tools for people who are not full-time designers, plus the professional software for those who are. The dividing line is whether you are assembling from templates or building original artwork — template tools are far cheaper and cover most social and small-business work.",
    meta: "AI design tools in Bangladesh — Canva, Figma, Adobe Creative Cloud and more for graphics, UI and brand work. Pay with bKash or Nagad.",
  },
  automation: {
    body: "Workflow automation — connecting the apps you already use so that a trigger in one does the work in another, without writing code. The honest caveat is that these are priced per task or per operation, so cost scales with how much you actually run. Worth setting up carefully rather than broadly.",
    meta: "Automation tools in Bangladesh — Zapier, Make and workflow automation to connect your apps without code. Pay via bKash or Nagad.",
  },
  seo: {
    body: "SEO and marketing research platforms. These are the most expensive tools in the catalog and the hardest to justify casually — they earn out for agencies and people doing SEO as billable work, not for a single site. Each is bound to one login by its own terms, so plan for a personal account rather than sharing.",
    meta: "SEO and marketing tools in Bangladesh — Semrush, Ahrefs, Surfer SEO and more for keyword research and rank tracking. bKash accepted.",
  },
  "ai-learning": {
    body: "Course and skill-development subscriptions. Useful when you want structured learning with a certificate at the end rather than piecing together free tutorials. Check whether the certificate is recognised in your field before paying — for some careers it matters, for others the portfolio does the work.",
    meta: "Online learning subscriptions in Bangladesh — Coursera and course platforms with certificates. Pay in BDT via bKash or Nagad.",
  },
  bundles: {
    titleLabel: "AI Tool Bundles",
    body: "Curated multi-tool packages, priced below buying each subscription separately. These make sense once you know which tools you actually use daily — buying a bundle to discover that is usually more expensive than starting with one tool and adding the second when a real bottleneck appears.",
    meta: "AI tool bundles in Bangladesh — curated multi-tool packages at a lower combined price. Pay via bKash, Nagad or bank transfer.",
  },
};
