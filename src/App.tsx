import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Agendamento from "./pages/Agendamento";
import Confirmacao from "./pages/Confirmacao";
import Briefing from "./pages/Briefing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Header from "@/components/Header";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { professional } = useAuth();
  if (!professional) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppShell = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <div className="flex-1">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/agendar" element={<Agendamento />} />
        <Route path="/briefing" element={<Briefing />} />
        <Route path="/confirmacao" element={<Confirmacao />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
