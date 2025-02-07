import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
// TODO: Should be from API / CMS
import membersData from "@/lib/data/members.json";
import DivisionSelectButton from "./partials/division-select-button";
import MemberCard from "./partials/member-card";

type Division = keyof typeof membersData;
const divisions = Object.keys(membersData) as Division[];

export default function DivisionSection() {
	const [selectedDivision, setSelectedDivision] =
		useState<Division>("Executive");

	const currentMembers = useMemo(
		() => membersData[selectedDivision],
		[selectedDivision],
	);

	return (
		<section
			id="division"
			className="container w-full h-full px-5 mx-auto bg-white py-25 xl:py-30"
		>
			<div className="space-y-6 text-center md:text-left">
				<Badge>Division</Badge>
				<h1 className="text-2xl font-semibold leading-tight text-center xl:text-4xl md:text-left">
					SGA terdiri dari berbagai divisi yang bekerja sama untuk menciptakan{" "}
					<span className="text-blue-500">
						lingkungan kampus yang dinamis dan mendukung.
					</span>
				</h1>
			</div>
			<div className="grid w-full grid-flow-row gap-5 mt-5 md:grid-flow-col xl:gap-20 md:gap-10 lg:mt-14">
				<div className="flex flex-col gap-4 xl:gap-10 w-max shrink-0">
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
				<div className="grid items-start content-start justify-start gap-3 lg:gap-5 grid-flow-col grid-rows-2 xl:grid-flow-row xl:grid-cols-4 xl:max-h-[1200px] overflow-y-auto overflow-x-auto w-full">
					{currentMembers.map(({ name, role, imagePath }) => (
						<MemberCard
							key={name}
							name={name}
							position={role}
							image={imagePath}
							linkedinUrl="#"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
