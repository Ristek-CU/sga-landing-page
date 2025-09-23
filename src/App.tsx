import { Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";

import AboutUsSection from "./components/sections/about-us";
import DivisionSection from "./components/sections/division";
import EventSection from "./components/sections/event";
import FooterSection from "./components/sections/footer";
import HeroSection from "./components/sections/hero";
import JoinUsSection from "./components/sections/join-us";
import MeetOurTeamSection from "./components/sections/meet-our-team";
import MissionSection from "./components/sections/mission";
import OurPartnershipSection from "./components/sections/our-partnership";
import TestimonySection from "./components/sections/testimony";
import VisionSection from "./components/sections/vision";

import Header from "./components/ui/header";
import MobileMenu from "./components/ui/mobile-menu";

import { MobileMenuContextProvider } from "./contexts/mobile-menu-context";
import ReportingPage from "./page/reporting";

function App() {
  return (
    <MobileMenuContextProvider>
      <Header />
      <MobileMenu />
      <Routes>
        <Route
          path="/"
          element={
            <main className="grid grid-flow-row w-full min-h-screen">
              <HeroSection />

              <AboutUsSection />

              <VisionSection />

              <MissionSection />

              <MeetOurTeamSection />

              <DivisionSection />

              <EventSection />

              <OurPartnershipSection />

              <TestimonySection />

              <JoinUsSection />
            </main>
          }
        />
        <Route path="/student-voice" element={<ReportingPage />} />
      </Routes>

      <FooterSection />
      <Toaster />
    </MobileMenuContextProvider>
  );
}

export default App;
