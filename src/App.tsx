import AboutUsSection from "./components/sections/about-us";
import DivisionSection from "./components/sections/division";
import HeroSection from "./components/sections/hero";
import MissionSection from "./components/sections/mission";
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

			{/* Division Section */}
			<DivisionSection />
		</main>
	);
}

export default App;
