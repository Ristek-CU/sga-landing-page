import HeroSection from "./components/sections/hero";
import MissionSection from "./components/sections/mission";

function App() {
	return (
		<main className="grid w-full min-h-screen">
			{/* Hero Section */}
			<HeroSection />

			{/* Mission Section */}
			<MissionSection />
		</main>
	);
}

export default App;
