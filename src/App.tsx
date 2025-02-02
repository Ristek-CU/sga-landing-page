import AboutUsSection from "./components/sections/about-us";
import HeroSection from "./components/sections/hero";
import MissionSection from "./components/sections/mission";
import VisionSection from "./components/sections/vision";
import TestimonySection from "./components/sections/testimony";

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

			{/* Testimony Section */}
			<TestimonySection />
		</main>
	);
}

export default App;
