// Import gambar-gambar Anda di sini
import sgaMembers from "@/assets/images/sga-members.webp";
import SectionLabel from "@/components/ui/section-label";

export default function AboutUsSection() {
	return (
		<section
			id="about-us"
			className="w-full scroll-mt-24 bg-[#f8f9fa] pt-16 pb-20 md:pt-20 md:pb-24 overflow-hidden"
		>
			<div className="container flex flex-col items-center w-full h-full max-w-6xl px-5 mx-auto">
				<div className="flex justify-center w-full mb-9 lg:mb-11">
					<SectionLabel>About Us</SectionLabel>
				</div>

				{/* Konten */}
				<div className="grid items-center w-full gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
					<div className="flex flex-col w-full space-y-5 lg:space-y-6">
						<h2 className="mt-0 text-3xl font-bold leading-tight md:text-4xl lg:text-[40px] text-[#0f3d44]">
							Kenali Lebih Dekat <br className="hidden lg:block" />
							<span className="text-[#D4B254]">SGA Cakrawala University</span>
						</h2>

						<p className="text-base font-normal leading-relaxed text-justify text-gray-700 md:text-lg lg:text-[19px]">
							Student Government Association (SGA) Cakrawala University adalah
							wadah resmi bagi mahasiswa untuk berpartisipasi dalam pengambilan
							keputusan yang mempengaruhi kehidupan kampus. Kami berkomitmen
							untuk menjadi jembatan antara mahasiswa dan pihak universitas,
							serta mempromosikan kepemimpinan yang inklusif.
						</p>
					</div>

					{/* Tumpukan Gambar */}
					<div className="flex justify-center w-full mt-0 pt-0 lg:justify-end">
						<div className="relative w-full max-w-[430px] lg:max-w-[480px] h-[325px] sm:h-[360px] lg:h-[390px]">
							<img
								src={sgaMembers}
								alt="SGA Activity 1"
								className="absolute top-[0%] left-[5%] w-[55%] h-[60%] object-cover rounded-2xl shadow-lg -rotate-6 z-10 transition-all duration-300 hover:z-40 hover:scale-105 cursor-pointer"
							/>
							<img
								src={sgaMembers}
								alt="SGA Activity 2"
								className="absolute top-[10%] right-[0%] w-[50%] h-[55%] object-cover rounded-2xl shadow-lg rotate-6 z-20 transition-all duration-300 hover:z-40 hover:scale-105 cursor-pointer"
							/>
							<img
								src={sgaMembers}
								alt="SGA Activity 3"
								className="absolute bottom-[5%] left-[15%] w-[70%] h-[50%] object-cover rounded-2xl shadow-2xl -rotate-2 z-30 transition-all duration-300 hover:z-40 hover:scale-105 cursor-pointer"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
