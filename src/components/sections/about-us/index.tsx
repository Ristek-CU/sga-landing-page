import sgaMembers from "@/assets/images/sga-members.png";
import { Badge } from "@/components/ui/badge";

export default function AboutUsSection() {
	return (
		<section className="flex flex-col w-full h-full container gap-10 px-10 py-32 mx-auto bg-white lg:flex-row">
			<div className="flex-1 space-y-6">
				<Badge>About Us</Badge>
				<h2 className="text-4xl font-semibold leading-tight">
					Kenali Lebih Dekat SGA{" "}
					<span className="text-blue-500">Cakrawala University</span>
				</h2>
				<p className="text-xl font-normal text-gray-300">
					Student Government Association (SGA) Cakrawala University adalah wadah
					resmi bagi mahasiswa untuk berpartisipasi dalam pengambilan keputusan
					yang mempengaruhi kehidupan kampus. Kami berkomitmen untuk menjadi
					jembatan antara mahasiswa dan pihak universitas, serta mempromosikan
					kepemimpinan yang inklusif.
				</p>
			</div>
			<img src={sgaMembers} className="flex-1 w-full h-max" />
		</section>
	);
}
