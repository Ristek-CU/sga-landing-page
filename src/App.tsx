import HeroSection from "./components/sections/hero";
import AboutUsSection from "./components/sections/about-us";
import VisionSection from "./components/sections/vision";
import MissionSection from "./components/sections/mission";
import MeetOurTeamSection from "./components/sections/meet-our-team";
import DivisionSection from "./components/sections/division";
import EventSection from "./components/sections/event";
import OurPartnership from "./components/sections/our-partnership";
import TestimonySection from "./components/sections/testimony";
import JoinUsSection from "./components/sections/join-us";
import FooterSection from "./components/sections/footer";

function App() {
	return (
		<main className="grid w-full min-h-screen *:leading-[120%]">
			{/* Hero Section */}
			<HeroSection />

			{/* About Section */}
			<AboutUsSection />

			{/* Vision Section */}
			<VisionSection />

			{/* Mission Section */}
			<MissionSection />

			{/* Meet Our Team Section */}
			<MeetOurTeamSection />

			{/* Division Section */}
			<DivisionSection />

			{/* Event Section */}
			<EventSection />

			{/* Our Partnership Section*/}
			<OurPartnership />

			{/* Testimony Section */}
			<TestimonySection />

			{/* Join Us Section */}
			<JoinUsSection />

			{/* Footer Section */}
			<FooterSection />
		</main>
	);
}

export default App;
