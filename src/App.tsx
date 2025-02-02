import AboutUsSection from "./components/sections/about-us";
import DivisionSection from "./components/sections/division";
import EventSection from "./components/sections/event";
import HeroSection from "./components/sections/hero";
import JoinUsSection from "./components/sections/join-us";
import MeetOurTeamSection from "./components/sections/meet-our-team";
import MissionSection from "./components/sections/mission";
import OurPartnership from "./components/sections/our-partnership";
import TestimonySection from "./components/sections/testimony";
import VisionSection from "./components/sections/vision";

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
		</main>
	);
}

export default App;
