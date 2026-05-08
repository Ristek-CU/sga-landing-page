import AboutUsSection from "@/components/sections/about-us";
import DivisionSection from "@/components/sections/division";
import EventSection from "@/components/sections/event";
import HeroSection from "@/components/sections/hero";
import JoinUsSection from "@/components/sections/join-us";
import MeetOurTeamSection from "@/components/sections/meet-our-team";
import MissionSection from "@/components/sections/mission";
import OurPartnershipSection from "@/components/sections/our-partnership";
import TestimonySection from "@/components/sections/testimony";
import VisionSection from "@/components/sections/vision";

export default function HomePage() {
	return (
		<main className="grid grid-flow-row w-full min-h-screen">
			<HeroSection />
			<AboutUsSection />
			<VisionSection />
			<MissionSection />
			<MeetOurTeamSection />
			<DivisionSection />
			<EventSection />
			<OurPartnershipSection />
			<TestimonySection />
			<JoinUsSection />
		</main>
	);
}
