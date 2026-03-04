import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <Layout>
      <div className="bg-background py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">About AITPBD</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
            {/* Using an unplash image for visual break */}
            {/* modern abstract business team aesthetic */}
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
              alt="Team at work" 
              className="w-full h-auto rounded-3xl shadow-xl mb-10"
            />
            
            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Who We Are</h2>
            <p>
              AI Team Premium BD (AITPBD) started with a simple mission: to bridge the gap between global technology and the Bangladeshi market. We noticed that many talented professionals, students, and businesses in Bangladesh were struggling to access premium global AI tools due to international payment restrictions.
            </p>
            
            <p>
              We solve this by acting as your trusted local partner. We provide genuine, official access to tools like ChatGPT Plus, Claude Pro, and Midjourney, allowing you to pay in BDT via accessible methods like bKash and Nagad.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">More Than Just Tools</h2>
            <p>
              As our client base grew, so did their needs. Today, AITPBD is a full-fledged digital agency. Our team of expert designers, developers, and marketers help brands build their digital identity from the ground up. Whether you need a stunning new logo, a high-performance web application, or an AI-driven marketing campaign, we have the expertise to deliver.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Our Core Values</h2>
            <ul>
              <li><strong>Trust & Transparency:</strong> We deliver exactly what we promise. No hidden fees, no fake accounts.</li>
              <li><strong>Local First:</strong> Built for Bangladesh. We understand local challenges and provide tailored solutions.</li>
              <li><strong>Cutting-Edge:</strong> We stay ahead of tech trends so our clients don't have to.</li>
            </ul>
          </div>
          
          <div className="mt-16 text-center bg-card border border-border p-10 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">Join our growing community</h3>
            <p className="text-muted-foreground mb-8">Ready to take your digital capabilities to the next level?</p>
            <Link href="/start-a-project">
              <Button className="rounded-full px-8 bg-primary text-white h-12 text-lg">Contact Our Team</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
