import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Brain } from "lucide-react";

export default function Claude() {
  return (
    <Layout>
      <div className="bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            <div>
              <div className="w-16 h-16 rounded-2xl bg-[#D97757]/10 flex items-center justify-center text-[#D97757] mb-6">
                <Brain className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Claude Pro <br/><span className="text-[#D97757]">in Bangladesh</span></h1>
              <p className="text-lg text-muted-foreground mb-8">
                Experience Anthropic's most intelligent model, Claude 3 Opus. Unmatched writing, coding, and analysis capabilities.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Access to Claude 3 Opus and Sonnet",
                  "5x more usage than the free tier",
                  "Massive 200K token context window",
                  "Perfect for coding and long-form writing",
                  "Zero international payment hassle"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D97757] shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button onClick={() => window.open("https://wa.me/8801533262758", "_blank")} className="h-14 px-8 text-lg bg-[#D97757] hover:bg-[#D97757]/90 text-white rounded-full">
                  Buy Now - ৳2,400/mo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[#D97757] rounded-3xl transform rotate-3 opacity-10 blur-xl"></div>
              <div className="relative bg-card border border-border p-8 rounded-3xl shadow-xl text-center">
                <h3 className="text-2xl font-bold mb-2">Claude Pro Official</h3>
                <p className="text-muted-foreground mb-6">Fully private subscription.</p>
                <div className="text-5xl font-bold text-foreground mb-8">৳2,400<span className="text-lg text-muted-foreground">/mo</span></div>
                <ul className="text-left space-y-4 mb-8 border-t border-border pt-6">
                  <li className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium">Fast (Under 2H)</span>
                  </li>
                  <li className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Payment</span>
                    <span className="font-medium">bKash / Nagad</span>
                  </li>
                  <li className="flex justify-between pb-2">
                    <span className="text-muted-foreground">Device</span>
                    <span className="font-medium">Web & Mobile</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
