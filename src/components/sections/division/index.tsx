import { Badge } from "@/components/ui/badge";
import sgaMembers from "@/assets/images/sga-members.png";
import MemberCard from "./partials/member-card";
import DivisionSelectButton from "./partials/division-select-button";
import { useState } from "react";

// TODO: Should be from API / CMS
const divisions = [
	"Executive",
	"Public and Community Relations",
	"Business And Partnership",
	"Research and Technology",
	"Student Advocacy and Welfare",
	"Media and Information",
	"Arts and Culture",
	"Sports and Esports",
	"Internal Organization Development",
	"Secretary",
	"Treasurer",
	"Academic Affairs",
];

export default function DivisionSection() {
	const [selectedDivision, setSelectedDivision] = useState("Executive");

	return (
		<section
			id="division"
			className="w-full h-full max-w-screen-xl gap-10 px-10 py-32 mx-auto bg-white"
		>
			<div className="space-y-6">
				<Badge>Division</Badge>
				<h1 className="text-4xl font-semibold leading-tight">
					SGA terdiri dari berbagai divisi yang bekerja sama untuk menciptakan
					lingkungan kampus yang dinamis dan mendukung.
				</h1>
			</div>
			<div className="flex gap-16 mt-14">
				<div className="flex flex-col gap-7 w-80">
					{divisions.map((division) => (
						<DivisionSelectButton
							isActive={selectedDivision === division}
							onClick={() => setSelectedDivision(division)}
						>
							{division}
						</DivisionSelectButton>
					))}
				</div>
				<div className="grid items-start content-start justify-start gap-5 xl:grid-cols-3 lg:grid-cols-2 max-h-[1200px] overflow-y-auto">
					{Array.from({ length: 20 }).map((_, i) => (
						<MemberCard
							key={i}
							name="Sayyid Haidar"
							position="President"
							image={sgaMembers}
							linkedinUrl="#"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
