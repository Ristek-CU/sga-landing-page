import sgaMembers from "@/assets/images/sga-members.png";
import { Badge } from "@/components/ui/badge";

export default function VisionSection() {
	return (
		<section
			id="vision"
			className="container flex flex-col-reverse items-center w-full h-full px-5 mx-auto bg-white pt-25 sm:pb-25 xl:py-30 gap-x-10 gap-y-5 lg:flex-row"
		>
			<img src={sgaMembers} className="flex-1 w-full h-max" />
			<div className="flex-1 space-y-5">
				<Badge>Vision</Badge>
				<h1 className="text-2xl font-semibold leading-tight xl:text-4xl">
					Inspirasi Kepemimpinan dan Inovasi di{" "}
					<span className="text-green-500">Lingkungan Kampus</span>
				</h1>
				<p className="text-sm font-normal leading-tight text-gray-300 xl:text-xl xl:mt-10">
					Menjadi inisiator dan agen inovasi yang mendukung percepatan kemajuan
					kampus. Berkomitmen untuk mendorong mahasiswa dan institusi agar terus
					berakselerasi, melakukan perbaikan berkelanjutan, serta bersaing,
					bahkan melampaui kampus-kampus yang telah mapan
				</p>
			</div>
		</section>
	);
}
