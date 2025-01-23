import AboutUsSection from "./components/sections/about-us";
import HeroSection from "./components/sections/hero";
import MissionSection from "./components/sections/mission";
import OurPartnership from "./components/sections/our-partnership";
import VisionSection from "./components/sections/vision";

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

			{/* Our Partnership Section*/}
			<OurPartnership/>
		</main>
	);
}

export default App;
