import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import DashboardOverview from "@/pages/dashboard-overview";
import DashboardLeadFinder from "@/pages/dashboard-lead-finder";
import DashboardCompetitors from "@/pages/dashboard-competitors";
import DashboardTrends from "@/pages/dashboard-trends";
import DashboardSettings from "@/pages/dashboard-settings";
import Analyze from "@/pages/analyze";
import Opportunity from "@/pages/opportunity";
import Brief from "@/pages/brief";
import LegalPrivacy from "@/pages/legal-privacy";
import LegalTerms from "@/pages/legal-terms";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/overview" component={DashboardOverview} />
      <Route path="/dashboard/lead-finder" component={DashboardLeadFinder} />
      <Route path="/dashboard/competitors" component={DashboardCompetitors} />
      <Route path="/dashboard/trends" component={DashboardTrends} />
      <Route path="/dashboard/settings" component={DashboardSettings} />
      <Route path="/analyze" component={Analyze} />
      <Route path="/opportunity/:id" component={Opportunity} />
      <Route path="/brief/:id" component={Brief} />
      <Route path="/legal/privacy" component={LegalPrivacy} />
      <Route path="/legal/terms" component={LegalTerms} />
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
