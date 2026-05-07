import VisionIllustration from "@/assets/images/vision.svg";

const VisionSection = () => {
  return (
    <section id="vision" className="py-16 md:py-20 px-5 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-20">
        
        {/* Ilustrasi */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={VisionIllustration}
            alt="Vision Illustration"
            // Diperkecil sedikit di mobile (w-4/5) agar tidak terlalu mendominasi layar
            className="w-4/5 sm:w-full max-w-[280px] sm:max-w-md h-auto object-contain"
          />
        </div>

        {/* Teks Konten */}
        {/* Tambahkan text-center dan flex-col items-center untuk merapikan di mobile */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center md:items-start md:text-left">
          
          <div className="mb-4 md:mb-6">
            <span className="inline-block px-5 py-1.5 border border-[#EAB308] text-[#EAB308] rounded-full text-xs font-bold uppercase tracking-widest">
              Vision
            </span>
          </div>

          {/* Header */}
          {/* Ukuran disesuaikan jadi text-2xl di mobile, <br> disembunyikan di mobile */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#004751] leading-snug md:leading-tight">
            Ekosistem Kampus Yang <br className="hidden md:block" />
            <span className="text-[#EAB308]">Sinergis dan Suportif</span>
          </h2>

          {/* Deskripsi */}
          {/* Teks paragraf disesuaikan jadi text-base di mobile */}
          <p className="mt-4 md:mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-md md:max-w-none">
            Mewujudkan ekosistem kampus yang sinergis dan suportif,
            memberdayakan mahasiswa menjadi insan yang kompeten, tangguh, dan
            siap berkarya.
          </p>

        </div>
      </div>
    </section>
  );
};

export default VisionSection;