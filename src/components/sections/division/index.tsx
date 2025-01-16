import { Badge } from "@/components/ui/badge";
import sgaMembers from "@/assets/images/sga-members.png";
import MemberCard from "./partials/member-card";

export default function DivisionSection() {
	return (
		<section className="w-full h-full max-w-screen-xl gap-10 px-10 py-32 mx-auto bg-white">
			<div className="space-y-6">
				<Badge>Division</Badge>
				<h1 className="text-4xl font-semibold leading-tight">
					SGA terdiri dari berbagai divisi yang bekerja sama untuk menciptakan
					lingkungan kampus yang dinamis dan mendukung.
				</h1>
			</div>
			<div className="flex gap-16 mt-14">
				<div className="flex flex-col gap-7 w-80">
					<a href="#" className="py-4 text-2xl font-bold text-green-500">
						Executive
					</a>
					<a href="#" className="py-4 text-2xl font-normal text-gray-300">
						Public and Community Relations
					</a>
					<a href="#" className="py-4 text-2xl font-normal text-gray-300">
						Business And Partnership
					</a>
					<a href="#" className="py-4 text-2xl font-normal text-gray-300">
						Research and Technology
					</a>
					<a href="#" className="py-4 text-2xl font-normal text-gray-300">
						Student Advocacy and Welfare
					</a>
					<a href="#" className="py-4 text-2xl font-normal text-gray-300">
						Media and Information
					</a>
					<a href="#" className="py-4 text-2xl font-normal text-gray-300">
						Arts and Culture
					</a>
					<a href="#" className="py-4 text-2xl font-normal text-gray-300">
						Sports and Esports
					</a>
					<a href="#" className="py-4 text-2xl font-normal text-gray-300">
						Internal Organization Development
					</a>
					<a href="#" className="py-4 text-2xl font-normal text-gray-300">
						Secretary
					</a>
					<a href="#" className="py-4 text-2xl font-normal text-gray-300">
						Treasurer
					</a>
					<a href="#" className="py-4 text-2xl font-normal text-gray-300">
						Academic Affairs
					</a>
				</div>
				<div className="grid items-start content-start justify-start gap-5 xl:grid-cols-3 lg:grid-cols-2">
					{Array.from({ length: 6 }).map((_, i) => (
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
