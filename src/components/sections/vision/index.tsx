import VisionIllustration from "@/assets/images/vision.svg";

const VisionSection = () => {
  return (
    <section id="vision" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        {/*ilustrasi */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={VisionIllustration}
            alt="Vision Illustration"
            className="w-full max-w-md h-auto object-contain"
          />
        </div>

        {/*teks konten */}
        <div className="w-full md:w-1/2 text-left">
          <div className="mb-6">
            <span className="px-5 py-1.5 border border-[#EAB308] text-[#EAB308] rounded-full text-xs font-bold uppercase tracking-widest">
              Vision
            </span>
          </div>

          {/* header*/}
          <h2 className="text-3xl md:text-5xl font-bold text-[#004751] leading-tight">
            Ekosistem Kampus Yang <br />
            <span className="text-[#EAB308]">Sinergis dan Suportif</span>
          </h2>

          {/* deskripsi */}
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
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
