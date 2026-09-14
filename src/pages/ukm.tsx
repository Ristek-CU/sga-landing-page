import SmoothScrolling from "@/components/SmoothScrolling";
import HeroSection from "@/components/ukm/HeroSection";
import Navbar from "@/components/ukm/Navbar";
import StepByStepGuide from "@/components/ukm/StepByStepGuide";
import UKMSection from "@/components/ukm/UKMSection";

export default function UkmPage() {
	return (
		<SmoothScrolling>
			<Navbar />
			<main className="bg-[#08333e] min-h-screen">
				<HeroSection />
				<UKMSection />
				<StepByStepGuide />
			</main>
		</SmoothScrolling>
	);
}