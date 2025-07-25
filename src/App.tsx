import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import spaceBackground from "@/assets/satellite-background.png";
import Login from './pages/LoginPage';
import Landing from './pages/LandingPage';

const queryClient = new QueryClient();

const App = () => (
  <div 
    className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
    style={{ backgroundImage: `url(${spaceBackground})` }}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* landing */}
            <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </div>
);

export default App;
