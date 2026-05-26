import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BRAND, WhatsAppIcon } from "@/components/brand/LogoIcons";
import { Link } from "wouter";
import { MessageCircle, ArrowRight } from "lucide-react";
import { config } from "@/lib/config";
import { trackWhatsAppClick, trackMessengerClick } from "@/lib/analytics";

export function SupportUpsell() {
  return (
    <Card 
      className="border-2 overflow-hidden rounded-2xl"
      style={{ 
        backgroundColor: BRAND.sky, 
        borderColor: BRAND.blue 
      }}
      data-testid="card-support-upsell"
    >
      <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: BRAND.navy }}>
            🎓 AI ব্যবহার শিখতে চান? Premium Support নিন
          </h2>
          <p className="text-lg" style={{ color: BRAND.navy, opacity: 0.8 }}>
            লাইভ Google Meet সেশনে আপনার কাজ অনুযায়ী কাস্টম prompt pack + workflow পান। ৳৭৯৯/ঘন্টা থেকে শুরু।
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
          <a
            href={config.whatsappGeneral}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(undefined, undefined, undefined, "support-upsell")}
            data-testid="button-book-support"
            className="inline-flex items-center justify-center gap-2 rounded-full h-11 px-5 font-bold text-white text-sm"
            style={{ background: "#25D366" }}
          >
            <WhatsAppIcon size={17} color="#fff" /> WhatsApp
          </a>
          <a
            href={config.messenger}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMessengerClick(undefined, "support-upsell")}
            data-testid="button-book-support-messenger"
            className="inline-flex items-center justify-center gap-2 rounded-full h-11 px-5 font-bold text-white text-sm"
            style={{ background: "#0084FF" }}
          >
            <MessageCircle className="w-4 h-4" /> Messenger
          </a>
          <Button
            variant="outline"
            className="w-full sm:w-auto gap-2 rounded-full h-11"
            asChild
            style={{ borderColor: BRAND.blue, color: BRAND.blue }}
            data-testid="link-support-details"
          >
            <Link href="/support">
              বিস্তারিত
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
