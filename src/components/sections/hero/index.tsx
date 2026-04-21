import Button from "@/components/ui/button";
import Particles from "@/components/ui/particles";

export default function HeroSection() {
	return (
		<section
			id="hero"
			className="relative flex flex-col w-full min-h-screen overflow-hidden text-white bg-hero bg-hero-pattern bg-cover bg-top bg-no-repeat font-sans"
		>
			<div className="flex flex-col items-center justify-center w-full h-full gap-4 min-h-[768px] container mx-auto px-5 z-[1] pt-16 sm:pt-20">
				<div className="max-w-[1280px] w-full flex flex-col items-center justify-center mt-8 sm:mt-4">
					<div className="flex items-center justify-center px-6 py-2 sm:px-[40px] sm:py-[10px] h-[48px] sm:h-[60px] rounded-full bg-[rgba(235,192,95,0.2)] backdrop-blur-md shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.15)] text-center mt-6 sm:mt-10 lg:mt-12 mb-2 sm:mb-2 max-w-[200px] sm:max-w-none">
						<span className="font-sans text-[20px] sm:text-[28px] font-semibold leading-none bg-linear-to-r from-[#FCDD96] to-[#EBC05F] bg-clip-text text-transparent mt-0.5">
							Welcome to
						</span>
					</div>

					<h1 className="w-full text-center font-bold tracking-tight leading-[1.15] md:leading-[1.1] mt-2 sm:mt-3 mb-4 sm:mb-6 px-2 sm:px-0">
						<span className="block text-[#F4F4F4] drop-shadow-sm whitespace-normal md:whitespace-nowrap text-[26px] sm:text-[36px] md:text-[46px] lg:text-[60px] xl:text-[80px]">
							Student Government Association
						</span>
						<span className="block text-[#EBC05F] drop-shadow-sm whitespace-normal md:whitespace-nowrap text-[26px] sm:text-[36px] md:text-[46px] lg:text-[60px] xl:text-[80px] mt-1 md:mt-2">
							Cakrawala University
						</span>
					</h1>

					<p className="max-w-4xl mt-2 lg:mt-4 text-[14px] sm:text-[20px] lg:text-[22px] font-medium leading-relaxed sm:leading-[32px] text-center text-[#F4F4F4] w-full px-4">
						Mewujudkan Kepemimpinan Mahasiswa yang<br className="sm:hidden" />{' '}Progresif dan Inklusif
					</p>
					
					<div className="flex flex-row items-center justify-center w-full max-w-none gap-[12px] sm:gap-[30px] pt-4 sm:pt-8 lg:pt-10">
						<Button className="flex items-center justify-center gap-[10px] px-[16px] py-[8px] sm:px-[20px] sm:py-[10px] md:px-[18px] md:py-[8px] rounded-[12px] sm:rounded-[16px] border-2 border-[#CEAE65] bg-[#CEAE65] hover:bg-transparent hover:text-[#CEAE65] text-white shadow-[0_4px_10px_0_rgba(255,255,255,0.25)] hover:shadow-none font-medium text-[15px] sm:text-[20px] lg:text-[22px] leading-tight transition-all h-auto w-fit">
							Partner With Us
						</Button>
						<Button className="flex items-center justify-center gap-[10px] px-[16px] py-[8px] sm:px-[20px] sm:py-[10px] md:px-[18px] md:py-[8px] rounded-[12px] sm:rounded-[16px] border-2 border-[#009CC1] bg-[#009CC1] hover:bg-transparent hover:text-[#009CC1] text-white shadow-[0_4px_10px_0_rgba(255,255,255,0.25)] hover:shadow-none font-medium text-[15px] sm:text-[20px] lg:text-[22px] leading-tight transition-all h-auto w-fit">
							Join With Us
						</Button>
					</div>
				</div>
			</div>
			<Particles
				quantity={450}
				size={0.4}
				staticity={40}
				className="absolute w-full h-full overflow-clip opacity-80"
			/>
		</section>
	);
}
