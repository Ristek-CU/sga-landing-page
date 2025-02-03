import { Badge } from "@/components/ui/badge";
import MissionCard from "./partials/mission-card";

export default function MissionSection() {
	// TODO: Should be fetched from the CMS in the future
	const missions = [
		{
			title: "Meningkatkan Komunikasi",
			description:
				"Memfasilitasi komunikasi yang efektif antara mahasiswa dan pihak universitas untuk memastikan aspirasi mahasiswa didengar dan ditindaklanjuti.",
		},
		{
			title: "Mendukung Inovasi",
			description:
				"Mendukung kegiatan mahasiswa yang inovatif dan kreatif untuk menciptakan lingkungan belajar yang dinamis dan inspiratif.",
		},
		{
			title: "Menjamin Kesejahteraan",
			description:
				"Memastikan kesejahteraan mahasiswa melalui kebijakan yang adil, program dukungan, dan lingkungan yang inklusif.",
		},
	];

	return (
		<section className="container flex flex-col w-full h-full gap-5 px-10 py-32 mx-auto bg-white xl:gap-10 md:flex-row">
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
