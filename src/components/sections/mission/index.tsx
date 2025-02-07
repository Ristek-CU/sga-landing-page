import { Badge } from "@/components/ui/badge";
import MissionCard from "./partials/mission-card";
// TODO: Should be fetched from the CMS in the future
import missions from "@/lib/data/missions.json";

export default function MissionSection() {
	return (
		<section
			id="mission"
			className="container flex flex-col w-full h-full gap-5 px-5 mx-auto bg-white py-25 xl:py-30 xl:gap-10 md:flex-row"
		>
			<div className="flex-1 space-y-5 text-center md:text-left">
				<Badge>Mission</Badge>
				<h2 className="text-2xl font-semibold leading-tight xl:text-4xl">
					Kami bertujuan untuk memfasilitasi komunikasi yang{" "}
					<span className="leading-tight text-yellow-500">
						efektif antara mahasiswa dan pihak universitas
					</span>
				</h2>
			</div>
			<div className="grid flex-1 gap-5">
				{missions.map(({ title, description }, i) => (
					<MissionCard key={i} title={title}>
						{description}
					</MissionCard>
				))}
			</div>
		</section>
	);
}
