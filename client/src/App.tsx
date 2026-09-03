import { Switch, Route, useLocation } from "wouter";
import { useEffect, lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "@/components/ThemeProvider";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

import Home from "./pages/Home";
const ChatGPTPlans = lazy(() => import("./pages/ChatGPTPlans"));
const AISubscriptions = lazy(() => import("./pages/AISubscriptions"));
const Services = lazy(() => import("./pages/Services"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/legal/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/legal/RefundPolicy"));
const AccessTypes = lazy(() => import("./pages/legal/AccessTypes"));
const PricingHowItWorks = lazy(() => import("./pages/legal/PricingHowItWorks"));
const NonAffiliationPage = lazy(() => import("./pages/legal/NonAffiliation"));
const CorrectionsPolicyPage = lazy(() => import("./pages/legal/CorrectionsPolicy"));
const IncidentEscalationPage = lazy(() => import("./pages/legal/IncidentEscalation"));
const ChatGPT = lazy(() => import("./pages/tools/ChatGPT"));
const Claude = lazy(() => import("./pages/tools/Claude"));
const Gemini = lazy(() => import("./pages/tools/Gemini"));
const Grammarly = lazy(() => import("./pages/tools/Grammarly"));
const Canva = lazy(() => import("./pages/tools/Canva"));
const Midjourney = lazy(() => import("./pages/tools/Midjourney"));
const Perplexity = lazy(() => import("./pages/tools/Perplexity"));
const Grok = lazy(() => import("./pages/tools/Grok"));
const Copilot = lazy(() => import("./pages/tools/Copilot"));
const Vault = lazy(() => import("./pages/tools/Vault"));
const NotionPage = lazy(() => import("./pages/tools/Notion"));
const Microsoft365Page = lazy(() => import("./pages/tools/Microsoft365"));
const LinkedInPage = lazy(() => import("./pages/tools/LinkedIn"));
const ElevenLabsPage = lazy(() => import("./pages/tools/ElevenLabs"));
const SuperGrok = lazy(() => import("./pages/tools/SuperGrok"));
const GoogleAIPro = lazy(() => import("./pages/tools/GoogleAIPro"));
const LeonardoPage = lazy(() => import("./pages/tools/Leonardo"));
const RunwayPage = lazy(() => import("./pages/tools/Runway"));
const KlingPage = lazy(() => import("./pages/tools/Kling"));
const ManusPage = lazy(() => import("./pages/tools/Manus"));
const PoePage = lazy(() => import("./pages/tools/Poe"));
const FireflyPage = lazy(() => import("./pages/tools/Firefly"));
const IdeogramPage = lazy(() => import("./pages/tools/Ideogram"));
const FreepikPage = lazy(() => import("./pages/tools/Freepik"));
const AdobeCCPage = lazy(() => import("./pages/tools/AdobeCC"));
// Catalog-driven detail page. Declared last among /tools/* routes so the
// hand-built pages above keep serving their own slugs.
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const AuditDashboard = lazy(() => import("./pages/admin/AuditDashboard"));
const ComparePage = lazy(() => import("./pages/Compare"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const PlusShared = lazy(() => import("./pages/chatgpt/PlusShared"));
const GoShared = lazy(() => import("./pages/chatgpt/GoShared"));
const GoPersonal = lazy(() => import("./pages/chatgpt/GoPersonal"));
const PlusPremiumShared = lazy(() => import("./pages/chatgpt/PlusPremiumShared"));
const PlusPersonalSeat = lazy(() => import("./pages/chatgpt/PlusPersonalSeat"));
const BusinessShared = lazy(() => import("./pages/chatgpt/BusinessShared"));
const BusinessPremiumShared = lazy(() => import("./pages/chatgpt/BusinessPremiumShared"));
const BusinessPersonalLike = lazy(() => import("./pages/chatgpt/BusinessPersonalLike"));
const ProPremiumShared = lazy(() => import("./pages/chatgpt/ProPremiumShared"));
const ClaudePlans = lazy(() => import("./pages/ClaudePlans"));
const GeminiPlans = lazy(() => import("./pages/GeminiPlans"));
const GrammarlyPlans = lazy(() => import("./pages/GrammarlyPlans"));
const CanvaPlans = lazy(() => import("./pages/CanvaPlans"));
const PerplexityPlans = lazy(() => import("./pages/PerplexityPlans"));
const GrokPlans = lazy(() => import("./pages/GrokPlans"));
const AIToolsVault = lazy(() => import("./pages/AIToolsVault"));
const AIOpsSprint = lazy(() => import("./pages/services/AIOpsSprint"));
const BrandDesign = lazy(() => import("./pages/services/BrandDesign"));
const WebDevelopment = lazy(() => import("./pages/services/WebDevelopment"));
const DigitalMarketing = lazy(() => import("./pages/services/DigitalMarketing"));
const AppDevelopment = lazy(() => import("./pages/services/AppDevelopment"));
const AiAdvisory = lazy(() => import("./pages/services/AiAdvisory"));
const AiSetupSecurity = lazy(() => import("./pages/services/AiSetupSecurity"));
const AiTraining = lazy(() => import("./pages/services/AiTraining"));
const AiAutomation = lazy(() => import("./pages/services/AiAutomation"));
const ManagedAiOperations = lazy(() => import("./pages/services/ManagedAiOperations"));
const EvidenceReviewPage = lazy(() => import("@/pages/EvidenceReviewPage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogCategory = lazy(() => import("./pages/BlogCategory"));
const AIReadinessAssessment = lazy(() => import("./pages/AIReadinessAssessment"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/chatgpt-plans" component={EvidenceReviewPage} />
        <Route path="/chatgpt/plus-shared" component={EvidenceReviewPage} />
        <Route path="/chatgpt/go-shared" component={EvidenceReviewPage} />
        <Route path="/chatgpt/go-personal" component={EvidenceReviewPage} />
        <Route path="/chatgpt/plus-premium-shared" component={EvidenceReviewPage} />
        <Route path="/chatgpt/plus-personal-seat" component={EvidenceReviewPage} />
        <Route path="/chatgpt/business-shared" component={EvidenceReviewPage} />
        <Route path="/chatgpt/business-premium-shared" component={EvidenceReviewPage} />
        <Route path="/chatgpt/business-personal-like" component={EvidenceReviewPage} />
        <Route path="/chatgpt/pro-premium-shared" component={EvidenceReviewPage} />
        <Route path="/claude-plans" component={EvidenceReviewPage} />
        <Route path="/gemini-plans" component={EvidenceReviewPage} />
        <Route path="/grammarly-plans" component={EvidenceReviewPage} />
        <Route path="/canva-plans" component={EvidenceReviewPage} />
        <Route path="/perplexity-plans" component={EvidenceReviewPage} />
        <Route path="/grok-plans" component={EvidenceReviewPage} />
        <Route path="/ai-tools-vault" component={AIToolsVault} />
        <Route path="/services/ai-ops-sprint" component={EvidenceReviewPage} />
        <Route path="/services/brand-design" component={BrandDesign} />
        <Route path="/services/web-development" component={WebDevelopment} />
        <Route path="/services/digital-marketing" component={DigitalMarketing} />
        <Route path="/services/app-development" component={AppDevelopment} />
        <Route path="/services/ai-advisory" component={AiAdvisory} />
        <Route path="/services/ai-setup-security" component={AiSetupSecurity} />
        <Route path="/services/ai-training" component={AiTraining} />
        <Route path="/services/ai-automation" component={AiAutomation} />
        <Route path="/services/managed-ai-operations" component={EvidenceReviewPage} />
        <Route path="/support" component={Services} />
        <Route path="/services" component={Services} />
        <Route path="/ai-subscriptions" component={AISubscriptions} />
        <Route path="/all-products" component={AllProducts} />
        <Route path="/products" component={AllProducts} />
        <Route path="/category/:slug" component={CategoryPage} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/about" component={About} />
        {/* /contact had route metadata and a sitemap entry but no route, so it
            fell through to NotFound: the server answered 200 with a real title
            while the visitor saw "page not found". A soft 404 we were actively
            submitting to Google. Both paths render the same page; /contact is
            the canonical one. */}
        <Route path="/contact" component={Contact} />
        <Route path="/start-a-project" component={Contact} />
        <Route path="/refund-policy" component={RefundPolicy} />
        <Route path="/access-types" component={AccessTypes} />
        <Route path="/pricing-how-it-works" component={PricingHowItWorks} />
        <Route path="/non-affiliation" component={NonAffiliationPage} />
        <Route path="/corrections" component={CorrectionsPolicyPage} />
        <Route path="/incident-escalation" component={IncidentEscalationPage} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsOfService} />
        <Route path="/tools/chatgpt" component={EvidenceReviewPage} />
        <Route path="/tools/claude" component={EvidenceReviewPage} />
        <Route path="/tools/gemini" component={EvidenceReviewPage} />
        <Route path="/tools/grammarly" component={EvidenceReviewPage} />
        <Route path="/tools/canva" component={EvidenceReviewPage} />
        <Route path="/tools/midjourney" component={EvidenceReviewPage} />
        <Route path="/tools/perplexity" component={EvidenceReviewPage} />
        <Route path="/tools/grok" component={EvidenceReviewPage} />
        <Route path="/tools/copilot" component={EvidenceReviewPage} />
        <Route path="/tools/vault" component={EvidenceReviewPage} />
        <Route path="/tools/notion" component={EvidenceReviewPage} />
        <Route path="/tools/microsoft365" component={EvidenceReviewPage} />
        <Route path="/tools/linkedin" component={EvidenceReviewPage} />
        <Route path="/tools/elevenlabs" component={EvidenceReviewPage} />
        <Route path="/tools/supergrok" component={EvidenceReviewPage} />
        <Route path="/tools/google-ai-pro" component={EvidenceReviewPage} />
        <Route path="/tools/leonardo" component={EvidenceReviewPage} />
        <Route path="/tools/runway" component={EvidenceReviewPage} />
        <Route path="/tools/kling" component={EvidenceReviewPage} />
        <Route path="/tools/manus" component={EvidenceReviewPage} />
        <Route path="/tools/poe" component={EvidenceReviewPage} />
        <Route path="/tools/firefly" component={EvidenceReviewPage} />
        <Route path="/tools/ideogram" component={EvidenceReviewPage} />
        <Route path="/tools/freepik" component={EvidenceReviewPage} />
        <Route path="/tools/adobe-cc" component={EvidenceReviewPage} />
        {/* Catalog fallback: serves every product family that has no bespoke
            page above. wouter matches in order, so this never shadows them. */}
        <Route path="/tools/:slug" component={ProductDetail} />
        <Route path="/admin/audit" component={AuditDashboard} />
        <Route path="/compare" component={ComparePage} />
        <Route path="/compare/:slug" component={ComparePage} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/category/:slug">{(params) => <BlogCategory slug={params.slug} />}</Route>
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/ai-readiness" component={AIReadinessAssessment} />
        <Route component={NotFound} />
      </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AnalyticsProvider />
            <Toaster />
            <Router />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
