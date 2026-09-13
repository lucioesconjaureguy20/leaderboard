import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Leaderboard from "@/pages/Leaderboard";
import QzinoLeaderboard from "@/pages/QzinoLeaderboard";
import LoadingScreen from "@/components/LoadingScreen";

const queryClient = new QueryClient();

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col relative dark bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main className="flex-1 w-full pt-16 flex items-center justify-center py-12">
        {children}
      </main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <PageWrapper><Home /></PageWrapper>} />
      <Route path="/stake" component={() => <PageWrapper><Leaderboard /></PageWrapper>} />
      <Route path="/qzino" component={() => <PageWrapper><QzinoLeaderboard /></PageWrapper>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);

  function handleDone() {
    setLoaded(true);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {!loaded && <LoadingScreen onDone={handleDone} />}
        {loaded && (
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
