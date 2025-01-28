import { Badge } from "@/components/ui/badge";
import sgaMembers from "@/assets/images/sga-members.png";
import MemberCard from "./partials/member-card";
import DivisionSelectButton from "./partials/division-select-button";
import { useMemo, useState } from "react";
// TODO: Should be from API / CMS
import membersData from "@/lib/data/members.json";

type Division = keyof typeof membersData;

export default function DivisionSection() {
	const divisions = Object.keys(membersData) as Division[];

	const [selectedDivision, setSelectedDivision] =
		useState<Division>("Executive");

	const currentMembers = useMemo(
		() => membersData[selectedDivision],
		[selectedDivision],
	);

	return (
		<section
			id="division"
			className="w-full h-full container gap-10 px-10 py-32 mx-auto bg-white"
		>
			<div className="space-y-6">
				<Badge>Division</Badge>
				<h1 className="text-4xl font-semibold">
					SGA terdiri dari berbagai divisi yang bekerja sama untuk menciptakan
					lingkungan kampus yang dinamis dan mendukung.
				</h1>
			</div>
			<div className="flex gap-20 mt-14">
				<div className="flex flex-col gap-4 w-80 shrink-0">
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
				<div className="grid items-start content-start justify-start gap-5 xl:grid-cols-4 lg:grid-cols-2 max-h-[1200px] overflow-y-auto">
					{currentMembers.map(({ name, role }, i) => (
						<MemberCard
							key={i}
							name={name}
							position={role}
							// TODO: This is still a placeholder image, the finished one should be unique per member
							image={sgaMembers}
							linkedinUrl="#"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
