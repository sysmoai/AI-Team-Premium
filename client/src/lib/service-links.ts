// Service pages (/services/*, /support) are under evidence review: they render a
// noindex "being re-verified" notice with no offer on it. Linking the header,
// footer and homepage there sent every service-curious visitor into a dead end.
//
// Until a service page is cleared, its links go to the contact form with the
// service preselected, so the visitor lands one tap away from a WhatsApp
// message that already names what they want. Contact.tsx reads `?service=`.
export const SERVICE = {
  aiSupport: "AI Support / Training Session",
  consultancy: "AI Consultancy",
  brandDesign: "Brand Identity Design",
  webDev: "Web Development",
  marketing: "Digital Marketing",
  appDev: "App Development",
} as const;

export function serviceInquiryHref(service: string): string {
  return `/contact?service=${encodeURIComponent(service)}`;
}
