import { Link } from "wouter";
import { Zap, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
                <Zap className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-lg">AITPBD</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Empowering Bangladesh with premium AI tools and cutting-edge digital services. Pay locally, access globally.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Premium AI Tools</h3>
            <ul className="space-y-3">
              <li><Link href="/tools/chatgpt" className="text-muted-foreground hover:text-primary transition-colors text-sm">ChatGPT Plus</Link></li>
              <li><Link href="/tools/claude" className="text-muted-foreground hover:text-primary transition-colors text-sm">Claude Pro</Link></li>
              <li><Link href="/tools/gemini" className="text-muted-foreground hover:text-primary transition-colors text-sm">Gemini Advanced</Link></li>
              <li><Link href="/tools/grammarly" className="text-muted-foreground hover:text-primary transition-colors text-sm">Grammarly Premium</Link></li>
              <li><Link href="/ai-subscriptions" className="text-muted-foreground hover:text-primary transition-colors text-sm">View All Subscriptions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Brand Identity Design</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Web Development</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Digital Marketing</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">App Development</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">AI Consultancy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors text-sm">Pricing Plans</Link></li>
              <li><Link href="/start-a-project" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Team Premium BD. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Made with <Zap className="w-4 h-4 text-primary" /> in Bangladesh
          </div>
        </div>
      </div>
    </footer>
  );
}
