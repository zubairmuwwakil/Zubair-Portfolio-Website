import { Switch, Route, Router } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Portfolio from "@/pages/Portfolio";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Projects from "@/pages/Projects";
import CaseStudy from "@/pages/CaseStudy";
import Resume from "@/pages/Resume";
import NotFound from "@/pages/not-found";

// "" for a root deploy, "/Zubair-Portfolio-Website" for the Pages subpath build.
// The empty string matters: wouter joins base + href, so a base of "/" turns
// every <Link href="/blog"> into "//blog" — which a browser reads as the
// protocol-relative URL https://blog/ and follows off-site.
const basePath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

/**
 * GitHub Pages serves pre-rendered routes from directories, so /blog 301s to
 * /blog/ and the canonical URL carries the trailing slash. Route patterns are
 * written without it, so normalize before matching — otherwise a visitor landing
 * on the canonical /blog/ hydrates straight into the 404 component.
 */
const useNormalizedLocation: typeof useBrowserLocation = () => {
  const [location, navigate] = useBrowserLocation();
  const normalized = location.length > 1 ? location.replace(/\/+$/, "") : location;
  return [normalized || "/", navigate];
};

function AppRouter() {
  return (
    <Router base={basePath} hook={useNormalizedLocation}>
      <Switch>
        <Route path="/" component={Portfolio} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:slug" component={CaseStudy} />
        <Route path="/resume" component={Resume} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppRouter />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
