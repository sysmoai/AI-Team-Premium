import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Paintbrush, MonitorSmartphone, Target, Smartphone, BrainCircuit, ArrowRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Paintbrush,
      title: "Brand Identity Design",
      desc: "We craft memorable brand identities that communicate your values. From logo design to full brand guidelines, we ensure your business stands out.",
      features: ["Logo Design", "Brand Guidelines", "Marketing Collateral", "UI/UX Design"]
    },
    {
      icon: MonitorSmartphone,
      title: "Web Development",
      desc: "Custom, responsive, and high-performance websites. Whether it's a corporate site or a complex web app, we build scalable solutions.",
      features: ["React / Next.js", "E-commerce Solutions", "CMS Development", "Performance Optimization"]
    },
    {
      icon: Target,
      title: "Digital Marketing",
      desc: "Data-driven marketing strategies to increase your reach, engage your audience, and drive conversions across all digital channels.",
      features: ["SEO Optimization", "Social Media Management", "PPC Campaigns", "Content Strategy"]
    },
    {
      icon: Smartphone,
      title: "App Development",
      desc: "Native and cross-platform mobile applications designed for seamless user experiences on iOS and Android devices.",
      features: ["React Native", "Flutter", "UI/UX App Design", "App Store Deployment"]
    },
    {
      icon: BrainCircuit,
      title: "AI Consultancy",
      desc: "Stay ahead of the curve. We analyze your business processes and integrate AI tools to automate workflows and boost productivity.",
      features: ["Workflow Automation", "Custom ChatGPT Bots", "Prompt Engineering", "Team Training"]
    }
  ];

  return (
    <Layout>
      <div className="bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Digital Services</h1>
            <p className="text-lg text-muted-foreground">
              AITPBD is more than just tools. We are a full-service digital agency dedicated to elevating your brand and technical capabilities.
            </p>
          </div>

          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={index} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
                  <div className="relative bg-card border border-border p-12 rounded-3xl shadow-xl flex items-center justify-center aspect-[4/3]">
                     <service.icon className="w-32 h-32 text-primary opacity-80" />
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">{service.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                  <ul className="grid grid-cols-2 gap-4 pt-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-foreground font-medium">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6">
                    <Link href="/start-a-project">
                      <Button className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90">
                        Inquire Now <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
