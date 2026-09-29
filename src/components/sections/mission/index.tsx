import { useEffect, useState } from "react";

import SectionLabel from "@/components/ui/section-label";
import CapacityIcon from "../../../assets/images/capacity.svg";
import CareerPreparedIcon from "../../../assets/images/careerprepared.svg";
import CollaborationIcon from "../../../assets/images/collaboration.svg";
import CoordinationIcon from "../../../assets/images/coordination.svg";
import { fetchLandingContent, type LandingMission } from "@/lib/landing-api";
import { MissionCard } from "./partials/mission-card";

const missionIcons: Record<string, string> = {
	coordination: CoordinationIcon,
	capacity: CapacityIcon,
	"career prepared": CareerPreparedIcon,
	collaboration: CollaborationIcon,
};

const MissionSection = () => {
	const [missions, setMissions] = useState<LandingMission[]>([]);
	const [loadError, setLoadError] = useState("");

	useEffect(() => {
		let active = true;
		fetchLandingContent()
			.then(({ missions: data }) => {
				if (active) {
					setMissions([...data].sort((a, b) => a.display_order - b.display_order));
				}
			})
			.catch((error: unknown) => {
				if (active) {
					setLoadError(
						error instanceof Error ? error.message : "Gagal memuat misi.",
					);
				}
			});

		return () => {
			active = false;
		};
	}, []);

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
				{loadError && <p role="alert" className="text-center text-sm text-red-700">{loadError}</p>}
				{missions.length === 0 && !loadError && (
					<p role="status" className="text-center text-sm text-slate-500">Memuat misi...</p>
				)}
				<div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
					{missions.map((item) => (
						<MissionCard
							key={item.id}
							title={item.title.trim()}
							description={item.description}
							icon={
								<img
									src={missionIcons[item.title.trim().toLowerCase()] ?? CoordinationIcon}
									alt=""
									className="h-full w-full"
								/>
							}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default MissionSection;
