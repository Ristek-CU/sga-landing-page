import SectionLabel from "@/components/ui/section-label";
import CapacityIcon from "../../../assets/images/capacity.svg";
import CareerPreparedIcon from "../../../assets/images/careerprepared.svg";
import CollaborationIcon from "../../../assets/images/collaboration.svg";
import CoordinationIcon from "../../../assets/images/coordination.svg";
import { MissionCard } from "./partials/mission-card";

const missionData = [
	{
		title: "Coordination",
		description:
			"Jembatan Mahasiswa & Kampus untuk Efisiensi Waktu, Sinkronisasi Belajar, dan Komunikasi Dua Arah",
		icon: (
			<img
				src={CoordinationIcon}
				alt="Coordination"
				className="w-full h-full"
			/>
		),
	},
	{
		title: "Capacity",
		description: "Meningkatkan skill & ketahanan belajar mahasiswa",
		icon: <img src={CapacityIcon} alt="Capacity" className="w-full h-full" />,
	},
	{
		title: "Career Prepared",
		description: "1 (Kuliah) + 3 (Lomba, Organisasi, dan Intern)",
		icon: (
			<img
				src={CareerPreparedIcon}
				alt="Career Prepared"
				className="w-full h-full"
			/>
		),
	},
	{
		title: "Collaboration",
		description:
			"Memperluas akses pengalaman & jejaring lewat mitra luar kampus",
		icon: (
			<img
				src={CollaborationIcon}
				alt="Collaboration"
				className="w-full h-full"
			/>
		),
	},
];

const MissionSection = () => {
	return (
		// Penyesuaian padding agar seragam dengan section Vision
		<section
			id="mission"
			className="w-full scroll-mt-24 bg-[#f8f9fa] px-5 pt-4 pb-16 md:pt-6 md:pb-20"
		>
			<div className="mx-auto flex h-full w-full max-w-6xl flex-col">
				<div className="flex justify-center mb-8 md:mb-10">
					<SectionLabel>Mission</SectionLabel>
				</div>

				{/* 3. Penambahan sm:grid-cols-2 dan penyesuaian gap untuk mobile */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
					{missionData.map((item, index) => (
						<MissionCard
							key={index}
							title={item.title}
							description={item.description}
							icon={item.icon}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default MissionSection;
