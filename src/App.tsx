import AboutUsSection from "./components/sections/about-us";
import HeroSection from "./components/sections/hero";
import MissionSection from "./components/sections/mission";
import VisionSection from "./components/sections/vision";
import MeetOurTeamSection from "./components/sections/meet-our-team";
import EventSection from "./components/sections/event";
import OurPartnership from "./components/sections/our-partnership";

function App() {
	return (
		<main className="grid w-full min-h-screen">
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

			{/* Event Section */}
			<EventSection />
      
      {/* Our Partnership Section*/}
			<OurPartnership/>
		</main>
	);
}

export default App;
