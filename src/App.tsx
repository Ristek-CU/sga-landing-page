import HeroSection from "./components/sections/hero";
import MissionSection from "./components/sections/mission";
import MeetOurTeamSection from "./components/sections/meet-our-team";

function App() {
	return (
		<main className="grid w-full min-h-screen">
			{/* Hero Section */}
			<HeroSection />

			{/* Mission Section */}
			<MissionSection />
			{/* Meet Our Team Section */}
			<MeetOurTeamSection />
		</main>
	);
}

export default App;
