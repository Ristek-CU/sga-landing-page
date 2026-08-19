import HeroSection from "@/components/ukm/HeroSection";
import StepByStepGuide from "@/components/ukm/StepByStepGuide";
import UKMSection from "@/components/ukm/UKMSection";

export default function UkmPage() {
	return (
		<main className="w-full">
			<HeroSection />
			<UKMSection />
			<StepByStepGuide />
		</main>
	);
}