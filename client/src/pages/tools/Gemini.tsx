import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Star } from "lucide-react";

export default function Gemini() {
  return (
    <Layout>
      <div className="bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            <div>
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                <Star className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Gemini Advanced <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500">Google AI in BD</span></h1>
              <p className="text-lg text-muted-foreground mb-8">
                Subscribe to Google One AI Premium without a card. Get Gemini Advanced directly integrated into Docs, Gmail, and Drive.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Access to Gemini 1.5 Pro",
                  "2TB Google Drive Storage included",
                  "Integration with Google Workspace",
                  "State-of-the-art coding abilities",
                  "Directly upgraded on your Gmail"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button onClick={() => window.open("https://wa.me/8801533262758", "_blank")} className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                  Buy Now - ৳2,300/mo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-3xl transform rotate-3 opacity-10 blur-xl"></div>
              <div className="relative bg-card border border-border p-8 rounded-3xl shadow-xl text-center">
                <h3 className="text-2xl font-bold mb-2">Google One AI Premium</h3>
                <p className="text-muted-foreground mb-6">Upgraded on your personal Gmail.</p>
                <div className="text-5xl font-bold text-foreground mb-8">৳2,300<span className="text-lg text-muted-foreground">/mo</span></div>
                <ul className="text-left space-y-4 mb-8 border-t border-border pt-6">
                  <li className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="font-medium">2 Terabytes</span>
                  </li>
                  <li className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">100% Private</span>
                  </li>
                  <li className="flex justify-between pb-2">
                    <span className="text-muted-foreground">Payment</span>
                    <span className="font-medium">bKash/Nagad</span>
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
