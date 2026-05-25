import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "./pages/Home";
import ChatGPTPlans from "./pages/ChatGPTPlans";
import AISubscriptions from "./pages/AISubscriptions";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import RefundPolicy from "./pages/legal/RefundPolicy";
import ChatGPT from "./pages/tools/ChatGPT";
import Claude from "./pages/tools/Claude";
import Gemini from "./pages/tools/Gemini";
import Grammarly from "./pages/tools/Grammarly";
import Canva from "./pages/tools/Canva";
import Midjourney from "./pages/tools/Midjourney";
import Perplexity from "./pages/tools/Perplexity";
import Grok from "./pages/tools/Grok";
import Copilot from "./pages/tools/Copilot";
import Vault from "./pages/tools/Vault";
import NotionPage from "./pages/tools/Notion";
import Microsoft365Page from "./pages/tools/Microsoft365";
import LinkedInPage from "./pages/tools/LinkedIn";
import ElevenLabsPage from "./pages/tools/ElevenLabs";
import SuperGrok from "./pages/tools/SuperGrok";
import GoogleAIPro from "./pages/tools/GoogleAIPro";
import LeonardoPage from "./pages/tools/Leonardo";
import RunwayPage from "./pages/tools/Runway";
import KlingPage from "./pages/tools/Kling";
import PlusShared from "./pages/chatgpt/PlusShared";
import PlusPremiumShared from "./pages/chatgpt/PlusPremiumShared";
import PlusPersonalSeat from "./pages/chatgpt/PlusPersonalSeat";
import BusinessShared from "./pages/chatgpt/BusinessShared";
import BusinessPremiumShared from "./pages/chatgpt/BusinessPremiumShared";
import BusinessPersonalLike from "./pages/chatgpt/BusinessPersonalLike";
import ProPremiumShared from "./pages/chatgpt/ProPremiumShared";
import ClaudePlans from "./pages/ClaudePlans";
import GeminiPlans from "./pages/GeminiPlans";
import GrammarlyPlans from "./pages/GrammarlyPlans";
import CanvaPlans from "./pages/CanvaPlans";
import PerplexityPlans from "./pages/PerplexityPlans";
import GrokPlans from "./pages/GrokPlans";
import AIToolsVault from "./pages/AIToolsVault";
import AIOpsSprint from "./pages/services/AIOpsSprint";
import BrandDesign from "./pages/services/BrandDesign";
import WebDevelopment from "./pages/services/WebDevelopment";
import DigitalMarketing from "./pages/services/DigitalMarketing";
import AppDevelopment from "./pages/services/AppDevelopment";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/chatgpt-plans" component={ChatGPTPlans} />
        <Route path="/chatgpt/plus-shared" component={PlusShared} />
        <Route path="/chatgpt/plus-premium-shared" component={PlusPremiumShared} />
        <Route path="/chatgpt/plus-personal-seat" component={PlusPersonalSeat} />
        <Route path="/chatgpt/business-shared" component={BusinessShared} />
        <Route path="/chatgpt/business-premium-shared" component={BusinessPremiumShared} />
        <Route path="/chatgpt/business-personal-like" component={BusinessPersonalLike} />
        <Route path="/chatgpt/pro-premium-shared" component={ProPremiumShared} />
        <Route path="/claude-plans" component={ClaudePlans} />
        <Route path="/gemini-plans" component={GeminiPlans} />
        <Route path="/grammarly-plans" component={GrammarlyPlans} />
        <Route path="/canva-plans" component={CanvaPlans} />
        <Route path="/perplexity-plans" component={PerplexityPlans} />
        <Route path="/grok-plans" component={GrokPlans} />
        <Route path="/ai-tools-vault" component={AIToolsVault} />
        <Route path="/services/ai-ops-sprint" component={AIOpsSprint} />
        <Route path="/services/brand-design" component={BrandDesign} />
        <Route path="/services/web-development" component={WebDevelopment} />
        <Route path="/services/digital-marketing" component={DigitalMarketing} />
        <Route path="/services/app-development" component={AppDevelopment} />
        <Route path="/support" component={Services} />
        <Route path="/services" component={Services} />
        <Route path="/ai-subscriptions" component={AISubscriptions} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/about" component={About} />
        <Route path="/start-a-project" component={Contact} />
        <Route path="/refund-policy" component={RefundPolicy} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsOfService} />
        <Route path="/tools/chatgpt" component={ChatGPT} />
        <Route path="/tools/claude" component={Claude} />
        <Route path="/tools/gemini" component={Gemini} />
        <Route path="/tools/grammarly" component={Grammarly} />
        <Route path="/tools/canva" component={Canva} />
        <Route path="/tools/midjourney" component={Midjourney} />
        <Route path="/tools/perplexity" component={Perplexity} />
        <Route path="/tools/grok" component={Grok} />
        <Route path="/tools/copilot" component={Copilot} />
        <Route path="/tools/vault" component={Vault} />
        <Route path="/tools/notion" component={NotionPage} />
        <Route path="/tools/microsoft365" component={Microsoft365Page} />
        <Route path="/tools/linkedin" component={LinkedInPage} />
        <Route path="/tools/elevenlabs" component={ElevenLabsPage} />
        <Route path="/tools/supergrok" component={SuperGrok} />
        <Route path="/tools/google-ai-pro" component={GoogleAIPro} />
        <Route path="/tools/leonardo" component={LeonardoPage} />
        <Route path="/tools/runway" component={RunwayPage} />
        <Route path="/tools/kling" component={KlingPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
