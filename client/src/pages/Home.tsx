import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star, Shield, Zap, Code, Paintbrush, LineChart, MessageSquare, Brain } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-16 md:pt-24 pb-32">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              <span>#1 Premium AI Tools Provider in BD</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Empower Your Workflow with <br />
              <span className="gradient-text">Premium AI & Digital Solutions</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Get official ChatGPT Plus, Claude Pro, Midjourney, and top-tier Digital Services via bKash & Nagad. Instant access, zero hassle.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/ai-subscriptions">
                <Button className="w-full sm:w-auto h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-1">
                  View AI Tools <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full border-2 hover:bg-accent/5 transition-all">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border bg-card/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">
            Trusted by 5,000+ professionals. Pay locally with:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text for payment methods since actual logos might not exist in assets */}
            <div className="text-2xl font-bold tracking-tight text-pink-600">bKash</div>
            <div className="text-2xl font-bold tracking-tight text-orange-500">Nagad</div>
            <div className="text-2xl font-bold tracking-tight text-purple-600">Rocket</div>
            <div className="text-2xl font-bold tracking-tight text-blue-600">DBBL</div>
          </div>
        </div>
      </section>

      {/* Featured AI Subscriptions */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Trending AI Subscriptions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Upgrade your productivity without needing an international credit card.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "ChatGPT Plus", icon: MessageSquare, price: "৳2,500/mo", desc: "GPT-4, DALL-E 3, Advanced Data Analysis." },
              { title: "Claude Pro", icon: Brain, price: "৳2,400/mo", desc: "Claude 3 Opus, larger context window." },
              { title: "Gemini Advanced", icon: Star, price: "৳2,300/mo", desc: "Google's most capable AI model." }
            ].map((tool, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <tool.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{tool.title}</h3>
                <p className="text-muted-foreground mb-6 h-12">{tool.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-foreground">{tool.price}</span>
                  <Link href={`/tools/${tool.title.split(' ')[0].toLowerCase()}`}>
                    <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                      Details <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/ai-subscriptions">
              <Button variant="link" className="text-lg font-medium text-muted-foreground hover:text-primary">
                View all 20+ tools <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Digital Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From ideation to execution, we build digital experiences that drive growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Paintbrush, title: "Brand Identity", desc: "Logos, brand guidelines, and visual identity that resonates with your audience." },
              { icon: Code, title: "Web Development", desc: "High-performance, responsive websites built with modern React frameworks." },
              { icon: LineChart, title: "Digital Marketing", desc: "SEO, PPC, and social media strategies to scale your online presence." },
              { icon: Brain, title: "AI Consultancy", desc: "Integrate AI workflows into your business to save time and reduce costs." }
            ].map((service, i) => (
              <div key={i} className="flex gap-6 p-8 rounded-3xl bg-background border border-border hover:shadow-lg transition-all">
                <div className="shrink-0 w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                  <service.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Professionals Trust AITPBD</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We remove the friction of acquiring premium international digital tools and offer top-notch digital agency services specifically tailored for the Bangladeshi market.
              </p>
              <ul className="space-y-5">
                {[
                  "No International Credit Card Required",
                  "Instant Delivery for Subscriptions",
                  "24/7 Local Customer Support via WhatsApp",
                  "100% Genuine Official Accounts"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span className="text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-3xl transform rotate-3 opacity-20 blur-lg"></div>
              <div className="relative bg-card border border-border p-10 rounded-3xl shadow-xl">
                <Shield className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">Secure & Reliable</h3>
                <p className="text-muted-foreground mb-6">
                  Over 5,000+ satisfied clients across Bangladesh rely on us for their daily AI tool access and development projects.
                </p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 font-bold text-foreground">5.0/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] opacity-10 mix-blend-overlay bg-cover bg-center" />
        {/* abstract tech background */}
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Supercharge Your Digital Presence?
          </h2>
          <p className="text-primary-foreground/80 text-xl mb-10">
            Contact us today to get your premium subscriptions or discuss your next big project.
          </p>
          <Link href="/start-a-project">
            <Button className="h-14 px-8 text-lg rounded-full bg-white text-primary hover:bg-gray-100 shadow-xl transition-transform hover:-translate-y-1">
              Start a Project
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
