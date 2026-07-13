import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";
import CampaignPopup from "@/components/CampaignPopup";
import Index from "./pages/Index.tsx";
import Meny from "./pages/Meny.tsx";
import Upplevelser from "./pages/Upplevelser.tsx";
import Information from "./pages/Information.tsx";
import BokaOss from "./pages/BokaOss.tsx";
import VarResa from "./pages/VarResa.tsx";
import AventyrSnart from "./pages/AventyrSnart.tsx";
import FAQ from "./pages/FAQ.tsx";
import Cateringpaket from "./pages/Cateringpaket.tsx";
import Grill from "./pages/Grill.tsx";
import Foodtruck from "./pages/Foodtruck.tsx";
import PopUp from "./pages/PopUp.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
};

// Footer is hidden on the immersive "Vårt Äventyr" journey route
const ConditionalFooter = () => {
  const { pathname } = useLocation();
  if (pathname === "/var-resa") return null;
  return <Footer />;
};

const ConditionalNavbar = () => {
  const { pathname } = useLocation();
  if (pathname === "/var-resa") return null;
  return <Navbar />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/THECODEBASE/">
          <ScrollToTop />
          <BackgroundMusic />
          <CampaignPopup />
          <ConditionalNavbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/meny" element={<Meny />} />
            <Route path="/upplevelser" element={<Upplevelser />} />
            <Route path="/information" element={<Information />} />
            <Route path="/boka-oss" element={<BokaOss />} />
            <Route path="/var-resa" element={<VarResa />} />
            <Route path="/aventyr-snart" element={<AventyrSnart />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/cateringpaket" element={<Cateringpaket />} />
            <Route path="/grill" element={<Grill />} />
            <Route path="/foodtruck" element={<Foodtruck />} />
            <Route path="/pop-up" element={<PopUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ConditionalFooter />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
