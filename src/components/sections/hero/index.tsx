import Button from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import { Badge } from "@/components/ui/badge"; 

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative flex flex-col w-full min-h-screen overflow-hidden text-white bg-hero bg-hero-pattern bg-cover bg-top bg-no-repeat bg-fixed font-sans"
        >
            {/* Mengubah justify-center menjadi justify-start dan menambah pt (padding top) agar konten naik */}
            <div className="flex flex-col items-center justify-start w-full h-full container mx-auto px-5 z-[1] pt-[120px] sm:pt-[150px] md:pt-[180px]">
                <div className="max-w-[1200px] w-full flex flex-col items-center justify-center">
                    
                    {/* Badge sedikit lebih rapat */}
                    <div className="mb-4 sm:mb-6">
                        <Badge variant="special">Welcome to</Badge>
                    </div>

                    {/* Ukuran Font diperkecil (Contoh: lg:text-[60px] jadi [48px]) */}
                    <h1 className="w-full text-center font-bold tracking-tight leading-[1.2] md:leading-[1.1] mb-4 sm:mb-6 px-2 sm:px-0">
                        <span className="block text-[#F4F4F4] drop-shadow-sm whitespace-normal md:whitespace-nowrap text-[24px] sm:text-[34px] md:text-[42px] lg:text-[48px] xl:text-[64px]">
                            Student Government Association
                        </span>
                        <span className="block text-[#EBC05F] drop-shadow-sm whitespace-normal md:whitespace-nowrap text-[24px] sm:text-[34px] md:text-[42px] lg:text-[48px] xl:text-[64px] mt-1 md:mt-2">
                            Cakrawala University
                        </span>
                    </h1>

                    {/* Deskripsi diperkecil sedikit agar hirarkinya jelas */}
                    <p className="max-w-3xl text-[14px] sm:text-[18px] lg:text-[20px] font-medium leading-relaxed text-center text-[#F4F4F4]/90 w-full px-4">
                        Mewujudkan Kepemimpinan Mahasiswa yang<br className="sm:hidden" /> Progresif dan Inklusif
                    </p>
                    
                    {/* Button Area */}
                    <div className="flex flex-row items-center justify-center w-full max-w-none gap-[12px] sm:gap-[25px] pt-8 sm:pt-10">
                        <Button className="flex items-center justify-center gap-[10px] px-[20px] py-[10px] sm:px-[24px] sm:py-[12px] rounded-[12px] sm:rounded-[14px] border-2 border-[#CEAE65] bg-[#CEAE65] hover:bg-transparent hover:text-[#CEAE65] text-white shadow-[0_4px_15px_0_rgba(206,174,101,0.3)] transition-all font-semibold text-[14px] sm:text-[16px] lg:text-[18px]">
                            Partner With Us
                        </Button>
                        <Button className="flex items-center justify-center gap-[10px] px-[20px] py-[10px] sm:px-[24px] sm:py-[12px] rounded-[12px] sm:rounded-[14px] border-2 border-[#009CC1] bg-[#009CC1] hover:bg-transparent hover:text-[#009CC1] text-white shadow-[0_4px_15px_0_rgba(0,156,193,0.3)] transition-all font-semibold text-[14px] sm:text-[16px] lg:text-[18px]">
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