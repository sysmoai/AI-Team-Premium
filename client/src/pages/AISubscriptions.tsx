import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import { Link } from "wouter";

export default function AISubscriptions() {
  const subscriptions = [
    { name: "ChatGPT Plus", price: "৳2,500/mo", type: "Private", link: "/tools/chatgpt" },
    { name: "Claude Pro", price: "৳2,400/mo", type: "Private", link: "/tools/claude" },
    { name: "Gemini Advanced", price: "৳2,300/mo", type: "Private", link: "/tools/gemini" },
    { name: "Midjourney", price: "৳1,200/mo", type: "Shared", link: "#" },
    { name: "Grammarly Premium", price: "৳800/mo", type: "Private", link: "/tools/grammarly" },
    { name: "Canva Pro", price: "৳350/mo", type: "Team", link: "#" },
    { name: "Perplexity Pro", price: "৳2,400/mo", type: "Private", link: "#" },
    { name: "GitHub Copilot", price: "৳1,200/mo", type: "Private", link: "#" },
  ];

  return (
    <Layout>
      <div className="bg-background pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">All Premium AI Tools</h1>
            <p className="text-lg text-muted-foreground">
              Get access to the world's most powerful AI tools without a credit card. Choose your tool, pay locally, and get instant access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subscriptions.map((sub, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-colors shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg">{sub.name}</h3>
                  <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-medium">
                    {sub.type}
                  </span>
                </div>
                <div className="text-3xl font-bold mb-6">{sub.price}</div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex items-center text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mr-2" /> Official Access
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mr-2" /> Full Warranty
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mr-2" /> Pay via bKash/Nagad
                  </li>
                </ul>

                {sub.link !== "#" ? (
                  <Link href={sub.link}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl">
                      View Details
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" className="w-full rounded-xl hover:bg-accent/10 hover:text-accent border-border" onClick={() => window.open("https://wa.me/8801533262758", "_blank")}>
                    Get Now via WhatsApp
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-muted/50 rounded-3xl p-8 border border-border text-center">
            <Info className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Need a tool not listed here?</h3>
            <p className="text-muted-foreground mb-6">We can procure almost any digital subscription for you.</p>
            <Button variant="outline" onClick={() => window.open("https://wa.me/8801533262758", "_blank")} className="rounded-full">
              Request Custom Tool
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
