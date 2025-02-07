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

function App() {
	return (
		<MobileMenuContextProvider>
			<Header />
			<MobileMenu />

			<main className="grid w-full min-h-screen">
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

			<FooterSection />
		</MobileMenuContextProvider>
	);
}

export default App;
