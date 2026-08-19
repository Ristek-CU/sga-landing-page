import Button from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import { Badge } from "@/components/ui/badge"; 

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative flex flex-col w-full min-h-screen overflow-hidden text-white bg-hero bg-hero-pattern bg-cover bg-top bg-no-repeat bg-fixed font-sans"
        >
            {/* 1. Hapus pt-20 atau pt-32 agar konten tidak terdorong ke atas sejak awal.
                2. justify-center sekarang akan benar-benar menempatkan konten di titik mati tengah layar.
            */}
            <div className="flex flex-col items-center justify-center w-full min-h-screen container mx-auto px-5 z-[1]">
                
                {/* Wrapper ini sekarang berada di tengah layar. 
                   Jika di mobile masih terasa kurang turun, kita bisa atur lewat mt (margin-top).
                */}
                <div className="w-full flex flex-col items-center justify-center text-center mt-10 sm:mt-0">
                    
                    {/* Badge */}
                    <div className="mb-4 sm:mb-6">
                        <Badge variant="special">Welcome to</Badge>
                    </div>

                    {/* Judul */}
                    <h1 className="w-full text-center font-bold tracking-tight leading-[1.2] md:leading-[1.1] mb-6 px-2 sm:px-0">
                        <span className="block text-[#F4F4F4] drop-shadow-sm text-[26px] sm:text-[34px] md:text-[42px] lg:text-[48px] xl:text-[64px]">
                            Student Government Association
                        </span>
                        <span className="block text-[#EBC05F] drop-shadow-sm text-[26px] sm:text-[34px] md:text-[42px] lg:text-[48px] xl:text-[64px] mt-1 md:mt-2">
                            Cakrawala University
                        </span>
                    </h1>

                    {/* Deskripsi */}
                    <p className="max-w-[320px] sm:max-w-2xl lg:max-w-3xl text-[14px] sm:text-[18px] lg:text-[20px] font-medium leading-relaxed text-center text-[#F4F4F4]/90 mx-auto">
                        Mewujudkan Kepemimpinan Mahasiswa yang<br className="sm:hidden" /> Progresif dan Inklusif
                    </p>
                    
                    {/* Button Area */}
                    <div className="flex flex-row items-center justify-center w-full gap-[12px] sm:gap-[25px] pt-8 sm:pt-10">
                        <Button className="flex items-center justify-center px-[18px] py-[10px] sm:px-[24px] sm:py-[12px] rounded-[12px] sm:rounded-[14px] border-2 border-[#CEAE65] bg-[#CEAE65] hover:bg-transparent hover:text-[#CEAE65] text-white shadow-[0_4px_15px_0_rgba(206,174,101,0.3)] transition-all font-semibold text-[13px] sm:text-[16px] lg:text-[18px] h-auto w-fit">
                            Partner With Us
                        </Button>
                        <Button className="flex items-center justify-center px-[18px] py-[10px] sm:px-[24px] sm:py-[12px] rounded-[12px] sm:rounded-[14px] border-2 border-[#009CC1] bg-[#009CC1] hover:bg-transparent hover:text-[#009CC1] text-white shadow-[0_4px_15px_0_rgba(0,156,193,0.3)] transition-all font-semibold text-[13px] sm:text-[16px] lg:text-[18px] h-auto w-fit">
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