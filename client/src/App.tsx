import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainNav from "@/components/MainNav";
import Home from "@/pages/Home";
import Offres from "@/pages/Offres";
import Chambres from "@/pages/Chambres";
import Restaurants from "@/pages/Restaurants";
import BienEtreLoisirs from "@/pages/BienEtreLoisirs";
import Evenements from "@/pages/Evenements";
import ServicesBoutiques from "@/pages/ServicesBoutiques";
import Galerie from "@/pages/Galerie";
import DecouvrirAntananarivo from "@/pages/DecouvrirAntananarivo";
import Contact from "@/pages/Contact";
import Mariages from "@/pages/Mariages";
import Corporate from "@/pages/Corporate";
import Celebrations from "@/pages/Celebrations";
import Galas from "@/pages/Galas";
import Admin from "@/pages/Admin";
import AdminLogin from "@/pages/AdminLogin";
import NotFound from "@/pages/not-found";
import { LanguageProvider } from "./components/context/LanguageContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={Admin} />
      <Route path="/offres" component={Offres} />
      <Route path="/chambres" component={Chambres} />
      <Route path="/restaurants" component={Restaurants} />
      <Route path="/bien-etre-loisirs" component={BienEtreLoisirs} />
      <Route path="/evenements" component={Evenements} />
      <Route path="/mariages" component={Mariages} />
      <Route path="/corporate" component={Corporate} />
      <Route path="/celebrations" component={Celebrations} />
      <Route path="/galas" component={Galas} />
      <Route path="/services-boutiques" component={ServicesBoutiques} />
      <Route path="/galerie" component={Galerie} />
      <Route path="/decouvrir-antananarivo" component={DecouvrirAntananarivo} />
      <Route path="/contact" component={Contact} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <MainNav />}
      <Router />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
