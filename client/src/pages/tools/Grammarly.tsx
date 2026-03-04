import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, PenTool } from "lucide-react";

export default function Grammarly() {
  return (
    <Layout>
      <div className="bg-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            <div>
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-500 mb-6">
                <PenTool className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Grammarly Premium <br/><span className="text-teal-500">for BD Writers</span></h1>
              <p className="text-lg text-muted-foreground mb-8">
                Perfect your writing with advanced grammar, tone, and plagiarism checking. Essential for students, writers, and professionals.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Advanced Grammar & Spell Check",
                  "Vocabulary enhancements & sentence rewrites",
                  "Plagiarism checker",
                  "Tone adjustments",
                  "Works on browser, Word, and desktop"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button onClick={() => window.open("https://wa.me/8801533262758", "_blank")} className="h-14 px-8 text-lg bg-teal-600 hover:bg-teal-700 text-white rounded-full">
                  Buy Now - ৳800/mo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-teal-500 rounded-3xl transform rotate-3 opacity-10 blur-xl"></div>
              <div className="relative bg-card border border-border p-8 rounded-3xl shadow-xl text-center">
                <h3 className="text-2xl font-bold mb-2">Grammarly Premium</h3>
                <p className="text-muted-foreground mb-6">Official Private Account.</p>
                <div className="text-5xl font-bold text-foreground mb-8">৳800<span className="text-lg text-muted-foreground">/mo</span></div>
                <ul className="text-left space-y-4 mb-8 border-t border-border pt-6">
                  <li className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">Private Upgrade</span>
                  </li>
                  <li className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">1 Month (Renewable)</span>
                  </li>
                  <li className="flex justify-between pb-2">
                    <span className="text-muted-foreground">Support</span>
                    <span className="font-medium">Local BD Support</span>
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
