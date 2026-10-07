import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Particles from "@/components/ui/particles";

export default function HeroSection() {
	return (
		<section
			id="hero"
			className="relative flex flex-col w-full min-h-screen overflow-hidden text-white bg-hero bg-hero-pattern bg-cover bg-top bg-no-repeat bg-fixed font-sans"
		>
			{/* 1. Hapus pt-20 atau pt-32 agar konten tidak terdorong ke atas sejak awal.
                2. justify-center sekarang akan benar-benar menempatkan konten di titik mati tengah layar.
            */}
			<div className="container z-[1] mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-5">
				{/* Wrapper ini sekarang berada di tengah layar. 
                   Jika di mobile masih terasa kurang turun, kita bisa atur lewat mt (margin-top).
                */}
				<div className="w-full flex flex-col items-center justify-center text-center mt-10 sm:mt-0">
					{/* Badge */}
					<div className="mb-5 sm:mb-7">
						<Badge
							variant="special"
							className="px-8 py-2.5 sm:px-9 sm:py-3 [&_span]:text-xl sm:[&_span]:text-2xl"
						>
							Welcome to
						</Badge>
					</div>

					{/* Judul */}
					<h1 className="w-full px-0 mb-5 font-bold leading-[1.15] text-center tracking-normal md:leading-[1.05]">
						<span className="block text-[#F4F4F4] drop-shadow-sm text-[34px] sm:text-[44px] md:whitespace-nowrap md:text-[clamp(46px,5vw,70px)]">
							Student Government Association
						</span>
						<span className="block text-[#EBC05F] drop-shadow-sm text-[34px] sm:text-[44px] md:text-[clamp(46px,5vw,70px)] mt-1 md:mt-2">
							Cakrawala University
						</span>
					</h1>

					{/* Deskripsi */}
					<p className="max-w-[320px] sm:max-w-2xl lg:max-w-3xl text-[14px] sm:text-[17px] lg:text-[18px] font-semibold leading-relaxed text-center text-[#F4F4F4]/90 mx-auto">
						Mewujudkan Kepemimpinan Mahasiswa yang
						<br className="sm:hidden" /> Progresif dan Inklusif
					</p>

					{/* Button Area */}
					<div className="flex flex-row items-center justify-center w-full gap-4 sm:gap-6 pt-8 sm:pt-10">
						<Button className="flex h-auto w-fit items-center justify-center rounded-full border-2 border-[#CEAE65] bg-[#CEAE65] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_15px_0_rgba(206,174,101,0.3)] transition-all hover:bg-transparent hover:text-[#CEAE65] sm:px-7 sm:py-3 sm:text-[15px] lg:text-base">
							Partner With Us
						</Button>
						<Button className="flex h-auto w-fit items-center justify-center rounded-full border-2 border-[#009CC1] bg-[#009CC1] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_15px_0_rgba(0,156,193,0.3)] transition-all hover:bg-transparent hover:text-[#009CC1] sm:px-7 sm:py-3 sm:text-[15px] lg:text-base">
							Join With Us
						</Button>
					</div>
				</div>
			</div>

			<Particles
				quantity={450}
				size={0.4}
				staticity={40}
				className="absolute w-full h-full overflow-clip opacity-80 z-0 pointer-events-none"
			/>
		</section>
	);
}
