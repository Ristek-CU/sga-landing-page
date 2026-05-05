import { useMemo, useState, useRef } from "react";
import heroPattern from "@/assets/images/sga-pattern.webp";
import membersData from "@/lib/data/members.json";
import { Badge } from "@/components/ui/badge";
import Particles from "@/components/ui/particles";
import DivisionSelectButton from "./partials/division-select-button";
import MemberCard from "./partials/member-card";

type Division = keyof typeof membersData;
const divisions = Object.keys(membersData) as Division[];

export default function DivisionSection() {
	const [selectedDivision, setSelectedDivision] = useState<Division>("Executive");

	const currentMembers = useMemo(
		() => membersData[selectedDivision],
		[selectedDivision],
	);

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

	const handleMouseLeave = () => { setIsDragging(false); };
	const handleMouseUp = () => { setIsDragging(false); };

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
			className="relative w-full py-20 overflow-hidden bg-[#0f3d44] xl:py-28"
		>
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
					<Badge variant="special">Meet Our Team!</Badge>
				</div>

				<div className="flex flex-col w-full lg:flex-row gap-x-12 lg:gap-x-16 gap-y-10">

					<div className="flex flex-col gap-4 w-full lg:w-64 shrink-0 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
						<div className="flex lg:flex-col gap-5 lg:gap-6 w-max lg:w-full px-1">
							{divisions.map((division) => (
								<DivisionSelectButton
									key={division}
									isActive={selectedDivision === division}
									onClick={() => setSelectedDivision(division)}
								>
									{division}
								</DivisionSelectButton>
							))}
						</div>
					</div>

					<div
						ref={scrollRef}
						onMouseDown={handleMouseDown}
						onMouseLeave={handleMouseLeave}
						onMouseUp={handleMouseUp}
						onMouseMove={handleMouseMove}
						className={`flex flex-row flex-1 w-full gap-6 pb-8 pl-1 overflow-x-auto select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'}`}
					>
						{currentMembers.map(({ name, role, imagePath, linkedInUrl }) => (
							<div key={name} className="shrink-0 snap-start h-full">
								<MemberCard
									name={name}
									position={role}
									image={imagePath}
									linkedinUrl={linkedInUrl}
								/>
							</div>
						))}
					</div>

				</div>
			</div>
		</section>
	);
}