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

function App() {
	return (
		<main className="grid w-full min-h-screen *:leading-[120%]">
			{/* <HeroSection />

			<AboutUsSection />

			<VisionSection />

			<MissionSection />

			<MeetOurTeamSection />

			<DivisionSection />

			<EventSection />

			<OurPartnershipSection />*/}

			<TestimonySection />

			<JoinUsSection />

			<FooterSection />
		</main>
	);
}

export default App;
