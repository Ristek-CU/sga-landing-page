import sgaMembers from "@/assets/images/sga-members.png";
import { Badge } from "@/components/ui/badge";

export default function VisionSection() {
	return (
		<section className="flex flex-col w-full h-full max-w-xl gap-10 px-10 py-32 mx-auto bg-white lg:flex-row">
			<img src={sgaMembers} className="flex-1 w-full h-max" />
			<div className="flex-1 space-y-6">
				<Badge>Vision</Badge>
				<h1 className="text-4xl font-semibold leading-tight">
					Inspirasi Kepemimpinan dan Inovasi di{" "}
					<span className="text-green-500">Lingkungan Kampus</span>
				</h1>
				<p className="text-xl font-normal text-gray-300">
					Menjadi pelopor dalam pengembangan kepemimpinan mahasiswa yang
					berkelanjutan, dengan menciptakan lingkungan yang mendorong inovasi,
					kolaborasi, dan inklusivitas. Kami berkomitmen untuk memberdayakan
					setiap mahasiswa agar dapat menjadi pemimpin yang berintegritas,
					visioner, dan berkontribusi positif.
				</p>
			</div>
		</section>
	);
}
