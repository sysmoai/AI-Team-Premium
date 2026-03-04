import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Home from "./pages/Home";
import AISubscriptions from "./pages/AISubscriptions";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import ChatGPT from "./pages/tools/ChatGPT";
import Claude from "./pages/tools/Claude";
import Gemini from "./pages/tools/Gemini";
import Grammarly from "./pages/tools/Grammarly";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ai-subscriptions" component={AISubscriptions} />
      <Route path="/services" component={Services} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/about" component={About} />
      <Route path="/start-a-project" component={Contact} />
      
      {/* Legal */}
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      
      {/* Tools */}
      <Route path="/tools/chatgpt" component={ChatGPT} />
      <Route path="/tools/claude" component={Claude} />
      <Route path="/tools/gemini" component={Gemini} />
      <Route path="/tools/grammarly" component={Grammarly} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
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
