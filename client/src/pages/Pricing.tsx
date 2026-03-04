import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Zap } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Solo Starter",
      desc: "Perfect for freelancers and solo entrepreneurs starting out.",
      price: "Custom",
      features: [
        "1 Basic AI Tool Subscription",
        "Standard Support",
        "Basic Branding Package",
        "Delivery within 48 hours"
      ],
      popular: false,
    },
    {
      name: "Pro Pack",
      desc: "For growing businesses needing serious tools and digital presence.",
      price: "Custom",
      features: [
        "3 Premium AI Tool Subscriptions",
        "Priority Support via WhatsApp",
        "Complete Brand Identity",
        "Landing Page Website",
        "SEO Optimization Setup"
      ],
      popular: true,
    },
    {
      name: "Agency Team",
      desc: "Full-scale solution for established teams and agencies.",
      price: "Custom",
      features: [
        "Unlimited Shared AI Tools",
        "24/7 Dedicated Support",
        "Full Stack Web App Development",
        "Comprehensive Marketing Campaign",
        "Custom AI Workflow Integration"
      ],
      popular: false,
    }
  ];

  return (
    <Layout>
      <div className="bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Service Pricing Plans</h1>
            <p className="text-lg text-muted-foreground">
              Because every business is unique, our service packages are custom-quoted. Review our general tiers below to see where you fit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative flex flex-col p-8 rounded-3xl border bg-card ${
                  plan.popular 
                  ? 'border-primary shadow-2xl shadow-primary/10 md:-translate-y-4' 
                  : 'border-border shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Zap className="w-4 h-4" /> Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 h-10">{plan.desc}</p>
                <div className="text-4xl font-bold mb-8">{plan.price}</div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/start-a-project" className="mt-auto">
                  <Button 
                    className={`w-full h-12 rounded-xl text-lg ${
                      plan.popular 
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                    }`}
                  >
                    Request Quote
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-20 max-w-3xl mx-auto text-center border-t border-border pt-12">
            <h3 className="text-2xl font-bold mb-4">Looking just for Subscriptions?</h3>
            <p className="text-muted-foreground mb-6">
              If you only want to buy individual AI tools like ChatGPT or Midjourney, you don't need a service plan. Check out our standalone subscription prices.
            </p>
            <Link href="/ai-subscriptions">
              <Button variant="outline" className="rounded-full px-8">View Subscription Prices</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
