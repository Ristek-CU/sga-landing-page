import heroPattern from "@/assets/images/sga-pattern.webp";
import { Badge } from "@/components/ui/badge";
import Particles from "@/components/ui/particles";
import { fetchLandingContent, type LandingDivision } from "@/lib/landing-api";
import { useEffect, useRef, useState } from "react";
import DivisionSelectButton from "./partials/division-select-button";
import MemberCard from "./partials/member-card";

const divisionOrder = [
	"Executive Board",
	"Media And Information",
	"Research And Technology",
	"Public And Community Relations",
	"UKM Development",
	"Business And Partnership",
	"Intellectual And Career Development",
	"Student Advocacy And Welfare",
];

export default function DivisionSection() {
	const [divisions, setDivisions] = useState<LandingDivision[]>([]);
	const [selectedDivision, setSelectedDivision] = useState(divisionOrder[0]);
	const [isLoading, setIsLoading] = useState(true);
	const [loadError, setLoadError] = useState("");
	const currentMembers = divisions.find(
		(division) => division.division_name === selectedDivision,
	)?.members ?? [];

	useEffect(() => {
		let active = true;
		fetchLandingContent()
			.then(({ members }) => {
				if (!active) return;
				const byName = new Map(
					members.map((division) => [division.division_name, division]),
				);
				setDivisions(
					divisionOrder.flatMap((name) => {
						const division = byName.get(name);
						return division
							? [{
								...division,
								members: [...division.members].sort(
									(a, b) => (a.role?.hierarchy_level ?? 0) - (b.role?.hierarchy_level ?? 0),
								),
							}]
							: [];
					}),
				);
			})
			.catch((error: unknown) => {
				if (active) {
					setLoadError(
						error instanceof Error ? error.message : "Gagal memuat anggota.",
					);
				}
			})
			.finally(() => {
				if (active) setIsLoading(false);
			});

		return () => {
			active = false;
		};
	}, []);

	const scrollRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!scrollRef.current) return;
		setIsDragging(true);
		setStartX(e.pageX - scrollRef.current.offsetLeft);
		setScrollLeft(scrollRef.current.scrollLeft);
	};

	const handleMouseLeave = () => {
		setIsDragging(false);
	};
	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !scrollRef.current) return;
		e.preventDefault();
		const x = e.pageX - scrollRef.current.offsetLeft;
		const walk = (x - startX) * 1.5;
		scrollRef.current.scrollLeft = scrollLeft - walk;
	};

	return (
		<section
			id="division"
			className="relative w-full scroll-mt-24 py-20 overflow-hidden bg-[#0f3d44] xl:py-28"
		>
			{/* Background & Particles tetap sama */}
			<div
				className="absolute inset-0 z-0 bg-fixed bg-center bg-cover opacity-50 pointer-events-none"
				style={{ backgroundImage: `url(${heroPattern})` }}
			/>
			<Particles
				className="absolute inset-0 z-[1] pointer-events-none"
				quantity={100}
				ease={80}
				color="#F4CE6A"
				refresh
			/>

			<div className="container relative z-10 flex flex-col items-center w-full h-full px-5 mx-auto">
				<div className="flex justify-center w-full mb-12 lg:mb-16">
					<Badge
						variant="special"
						className="px-8 py-2.5 sm:px-9 sm:py-3 [&_span]:text-xl sm:[&_span]:text-2xl"
					>
						Meet The Team
					</Badge>
				</div>

				{/* Layout: flex-col on mobile (Tags on top), flex-row on desktop (Sidebar left) */}
				<div className="flex flex-col lg:flex-row w-full gap-x-4 lg:gap-x-16 gap-y-8 lg:gap-y-10 items-stretch">
					{/* Sidebar Menu Divisi */}
					<div className="flex flex-row lg:flex-col gap-3 w-full lg:w-64 shrink-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
						<div className="flex flex-row lg:flex-col gap-3 lg:gap-6 w-max lg:w-full px-1">
							{divisions.map((division) => (
								<DivisionSelectButton
									key={division.division_id}
									isActive={selectedDivision === division.division_name}
									onClick={() => setSelectedDivision(division.division_name)}
								>
									{division.division_name}
								</DivisionSelectButton>
							))}
						</div>
					</div>

					{/* Area Card Member (Kanan/Bawah) */}
					<div
						ref={scrollRef}
						onMouseDown={handleMouseDown}
						onMouseLeave={handleMouseLeave}
						onMouseUp={handleMouseUp}
						onMouseMove={handleMouseMove}
						className={`flex flex-row flex-1 w-full gap-4 lg:gap-6 pb-8 pl-1 overflow-x-auto select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"}`}
					>
						{isLoading && <p role="status" className="text-white">Memuat anggota...</p>}
						{loadError && <p role="alert" className="text-white">{loadError}</p>}
						{currentMembers.map((member) => (
							<div
								key={member.id}
								className="shrink-0 snap-start w-[160px] sm:w-[240px] lg:w-auto h-[320px] lg:h-full"
							>
								<MemberCard
									name={member.fullname}
									position={member.role?.name ?? "Anggota"}
									image={member.image_path}
									linkedinUrl={member.linkedin_url ?? "https://www.linkedin.com/"}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
