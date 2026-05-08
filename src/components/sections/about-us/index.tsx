// Import gambar-gambar Anda di sini
import sgaMembers from "@/assets/images/sga-members.png";

export default function AboutUsSection() {
	return (
		<section
			id="about-us"
			className="w-full bg-[#f8f9fa] pt-20 pb-20 xl:py-28 overflow-hidden"
		>
			{/* KUNCI PERBAIKAN: max-w-7xl dihapus di sini, kembali ke container murni */}
			<div className="container flex flex-col items-center w-full h-full px-5 mx-auto">

				<div className="flex justify-center w-full mb-10 lg:mb-12">
					<span className="px-6 py-2 text-sm font-semibold tracking-wider text-[#D4B254] border-2 border-[#D4B254] rounded-full bg-white shadow-sm">
						About Us
					</span>
				</div>

				{/* Konten */}
				<div className="flex flex-col items-start w-full lg:flex-row gap-x-12 lg:gap-x-16 gap-y-16">

					<div className="flex flex-col flex-1 w-full space-y-6 lg:space-y-8">

						<h2 className="mt-0 text-3xl font-bold leading-tight md:text-4xl lg:text-4xl xl:text-5xl text-[#0f3d44]">
							Kenali Lebih Dekat <br className="hidden lg:block" />
							<span className="text-[#D4B254]">SGA Cakrawala University</span>
						</h2>

						<p className="text-base font-normal leading-relaxed text-justify text-gray-700 md:text-lg lg:text-lg xl:text-xl">
							Student Government Association (SGA) Cakrawala University adalah wadah
							resmi bagi mahasiswa untuk berpartisipasi dalam pengambilan keputusan
							yang mempengaruhi kehidupan kampus. Kami berkomitmen untuk menjadi
							jembatan antara mahasiswa dan pihak universitas, serta mempromosikan
							kepemimpinan yang inklusif.
						</p>
					</div>

					{/* Tumpukan Gambar */}
					<div className="flex justify-center flex-1 w-full mt-0 pt-0 lg:justify-end xl:justify-center">
						<div className="relative w-full max-w-[450px] xl:max-w-[500px] h-[350px] sm:h-[400px] xl:h-[450px]">
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