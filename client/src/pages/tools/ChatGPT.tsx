import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageSquare } from "lucide-react";

export default function ChatGPT() {
  return (
    <Layout>
      <div className="bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            <div>
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-6">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">ChatGPT Plus <br/><span className="text-green-500">in Bangladesh</span></h1>
              <p className="text-lg text-muted-foreground mb-8">
                Unlock GPT-4, DALL-E 3, and Advanced Data Analysis without needing an international credit card. Pay easily with bKash or Nagad.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Access to GPT-4 and GPT-4o models",
                  "Faster response times during peak hours",
                  "Generate high-quality images with DALL-E 3",
                  "Create custom GPTs",
                  "Upgrade your own private account"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button onClick={() => window.open("https://wa.me/8801533262758", "_blank")} className="h-14 px-8 text-lg bg-green-600 hover:bg-green-700 text-white rounded-full">
                  Buy Now - ৳2,500/mo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-3xl transform rotate-3 opacity-10 blur-xl"></div>
              <div className="relative bg-card border border-border p-8 rounded-3xl shadow-xl text-center">
                <h3 className="text-2xl font-bold mb-2">Private Account</h3>
                <p className="text-muted-foreground mb-6">We upgrade your personal email.</p>
                <div className="text-5xl font-bold text-foreground mb-8">৳2,500<span className="text-lg text-muted-foreground">/mo</span></div>
                <ul className="text-left space-y-4 mb-8 border-t border-border pt-6">
                  <li className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium">Instant - 2 Hours</span>
                  </li>
                  <li className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Warranty</span>
                    <span className="font-medium">Full 30 Days</span>
                  </li>
                  <li className="flex justify-between pb-2">
                    <span className="text-muted-foreground">Support</span>
                    <span className="font-medium">24/7 Local BD</span>
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
