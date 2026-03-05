import { Layout } from "@/components/layout/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { useCreateContact } from "@/hooks/use-contacts";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { usePageMeta } from "@/hooks/use-page-meta";
import { config } from "@/lib/config";
import { Phone, MapPin, Facebook, Instagram, Users, MessageCircle, Send, ArrowUpRight } from "lucide-react";

const CHANNELS = [
  { icon: Phone, label: "WhatsApp / Phone", value: "+880 1533-262758", sub: "Available 24/7", url: "tel:+8801533262758" },
  { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh", sub: null, url: null },
];

const SOCIAL = [
  { icon: <WhatsAppIcon size={15} color="currentColor" />, label: "WhatsApp", url: config.whatsappGeneral },
  { icon: <MessageCircle size={15} strokeWidth={2} />, label: "Messenger", url: config.messenger },
  { icon: <Facebook size={15} strokeWidth={2} />, label: "Facebook", url: config.fbPage },
  { icon: <Users size={15} strokeWidth={2} />, label: "FB Group", url: config.fbGroup },
  { icon: <Instagram size={15} strokeWidth={2} />, label: "Instagram", url: config.instagram },
];

const SERVICE_OPTIONS = [
  "ChatGPT Plus Subscription",
  "Claude Pro Subscription",
  "Gemini Advanced Subscription",
  "Grammarly Premium",
  "Other AI Tool Subscription",
  "Brand Identity Design",
  "Web Development",
  "Digital Marketing",
  "App Development",
  "AI Consultancy",
  "Multiple Services / Bundle",
  "General Inquiry",
];

export default function Contact() {
  usePageMeta({
    title: "Start a Project — Contact Us",
    description: "Get in touch with AI Team Premium BD. Order AI subscriptions or start a digital project. WhatsApp: +880 1533-262758",
  });

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: { name: "", whatsapp: "", service: "", needs: "" },
  });

  const { mutate: submitContact, isPending } = useCreateContact();

  const onSubmit = (data: InsertContact) => {
    submitContact(data, { onSuccess: () => form.reset() });
  };

  return (
    <Layout>
      <section className="py-20" style={{ background: BRAND.sky }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <p className="mb-3 uppercase" style={{ color: BRAND.blue, fontSize: "0.72rem", letterSpacing: "0.18em", fontWeight: 600 }}>Contact</p>
          <h1 style={{ color: BRAND.navy, fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.15 }}>
            Let's Start a Project
          </h1>
          <p className="mt-4 mx-auto max-w-xl" style={{ color: BRAND.navy, opacity: 0.5, fontSize: "0.95rem", lineHeight: 1.65 }}>
            Need AI subscriptions, a website, or a brand makeover? Reach out — fastest response on WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <a
                href={config.whatsappGeneral}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-contact-whatsapp"
                className="flex items-center gap-3 rounded-2xl p-5 transition-all"
                style={{ background: "#25D366", textDecoration: "none" }}
              >
                <WhatsAppIcon size={24} color="#fff" />
                <div>
                  <p style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 600 }}>Chat on WhatsApp</p>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem" }}>Fastest response — usually within minutes</p>
                </div>
                <ArrowUpRight size={18} color="#fff" className="ml-auto" />
              </a>

              <a
                href={config.messenger}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-contact-messenger"
                className="flex items-center gap-3 rounded-2xl p-5 transition-all"
                style={{ background: "#0084FF", textDecoration: "none" }}
              >
                <MessageCircle size={24} color="#fff" />
                <div>
                  <p style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 600 }}>Chat on Messenger</p>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem" }}>Also fast — Facebook Messenger</p>
                </div>
                <ArrowUpRight size={18} color="#fff" className="ml-auto" />
              </a>

              {CHANNELS.map((ch) => (
                <div key={ch.label} className="flex items-start gap-4">
                  <span className="inline-flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 44, height: 44, background: BRAND.sky }}>
                    <ch.icon size={18} color={BRAND.blue} strokeWidth={2} />
                  </span>
                  <div>
                    <p style={{ color: BRAND.navy, fontSize: "0.88rem", fontWeight: 600 }}>{ch.label}</p>
                    {ch.url ? (
                      <a href={ch.url} data-testid={`link-contact-${ch.label.toLowerCase().replace(/[\s/]+/g, '-')}`} style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.85rem", textDecoration: "none" }}>{ch.value}</a>
                    ) : (
                      <p style={{ color: BRAND.navy, opacity: 0.6, fontSize: "0.85rem" }}>{ch.value}</p>
                    )}
                    {ch.sub && <p style={{ color: BRAND.navy, opacity: 0.4, fontSize: "0.75rem", marginTop: 2 }}>{ch.sub}</p>}
                  </div>
                </div>
              ))}

              <div>
                <p className="mb-3" style={{ color: BRAND.navy, fontSize: "0.78rem", fontWeight: 600, opacity: 0.5 }}>Follow Us</p>
                <div className="flex items-center gap-2">
                  {SOCIAL.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      data-testid={`link-contact-social-${s.label.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center justify-center rounded-lg transition-all"
                      style={{ width: 38, height: 38, background: BRAND.sky, color: BRAND.blue }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl p-8 md:p-10" style={{ background: BRAND.white, border: "1px solid rgba(37,99,235,0.06)", boxShadow: "0 4px 24px rgba(37,99,235,0.06)" }}>
                <h2 className="mb-1" style={{ color: BRAND.navy, fontSize: "1.15rem", fontWeight: 700 }}>Send us a message</h2>
                <p className="mb-6" style={{ color: BRAND.navy, opacity: 0.4, fontSize: "0.82rem" }}>We'll get back to you within 24 hours.</p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel style={{ color: BRAND.navy, fontSize: "0.82rem", fontWeight: 500 }}>Full Name *</FormLabel>
                            <FormControl>
                              <Input data-testid="input-name" placeholder="Your name" className="h-11 rounded-xl" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.08)" }} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="whatsapp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel style={{ color: BRAND.navy, fontSize: "0.82rem", fontWeight: 500 }}>WhatsApp Number *</FormLabel>
                            <FormControl>
                              <Input data-testid="input-whatsapp" placeholder="+880 1X-XXXX-XXXX" className="h-11 rounded-xl" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.08)" }} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{ color: BRAND.navy, fontSize: "0.82rem", fontWeight: 500 }}>What do you need?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                            <FormControl>
                              <SelectTrigger data-testid="select-service" className="h-11 rounded-xl" style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.08)" }}>
                                <SelectValue placeholder="Select a service (optional)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {SERVICE_OPTIONS.map((opt) => (
                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="needs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel style={{ color: BRAND.navy, fontSize: "0.82rem", fontWeight: 500 }}>Tell us more *</FormLabel>
                          <FormControl>
                            <Textarea
                              data-testid="input-needs"
                              placeholder="I want to buy ChatGPT Plus for my team of 5, or I need a landing page design..."
                              className="min-h-[110px] resize-none rounded-xl"
                              style={{ background: BRAND.sky, border: "1px solid rgba(37,99,235,0.08)" }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <button
                      type="submit"
                      disabled={isPending}
                      data-testid="button-submit-contact"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 transition-all disabled:opacity-50"
                      style={{ background: BRAND.blue, color: BRAND.white, fontSize: "0.92rem", fontWeight: 600, border: "none", cursor: isPending ? "not-allowed" : "pointer" }}
                    >
                      <Send size={16} />
                      {isPending ? "Sending..." : "Submit Request"}
                    </button>
                    <p className="text-center" style={{ color: BRAND.navy, opacity: 0.35, fontSize: "0.72rem" }}>
                      By submitting, you agree to our <a href="/privacy-policy" data-testid="link-contact-privacy" style={{ textDecoration: "underline" }}>Privacy Policy</a>.
                    </p>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
