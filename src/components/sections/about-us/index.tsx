import sgaMembers from "@/assets/images/sga-members.png";
import { Badge } from "@/components/ui/badge";

export default function AboutUsSection() {
	return (
		<section
			id="about-us"
			className="container flex flex-col items-center w-full h-full px-5 mx-auto bg-white pt-25 sm:pb-25 xl:py-30 gap-x-10 gap-y-5 lg:flex-row"
		>
			<div className="flex-1 space-y-5">
				<Badge>About Us</Badge>
				<h2 className="text-2xl font-semibold leading-tight xl:text-4xl">
					Kenali Lebih Dekat SGA{" "}
					<span className="text-blue-500">Cakrawala University</span>
				</h2>
				<p className="text-sm font-normal leading-tight text-gray-300 xl:text-xl xl:mt-10">
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
