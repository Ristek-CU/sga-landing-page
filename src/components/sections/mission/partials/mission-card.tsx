interface MissionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const MissionCard = ({ title, description, icon }: MissionCardProps) => {
  return (
    <div className="bg-gradient-to-b from-[#06455B] to-[#056282] rounded-[20px] w-full h-full md:w-[257px] md:h-[346px] mx-auto py-5 px-3 md:px-2.5 flex flex-col items-center text-center text-white shadow-xl hover:-translate-y-2 transition-transform duration-300">
      
      {/* Ukuran lingkaran icon */}
      <div
        className="
          w-16 h-16 md:w-24 md:h-24  
          bg-white rounded-full 
          flex items-center justify-center 
          mb-3 md:mb-2.5 
          text-[#056282]
          shrink-0
        "
      >
        <div
          className="
            w-10 h-10 md:w-24 md:h-24
            flex items-center justify-center
          "
        >
          {icon}
        </div>
      </div>

      {/* Judul dan deskripsi dikembalikan ke ukuran aslinya di md (desktop) */}
      <h3 className="font-bold text-lg md:text-[28px] leading-tight md:leading-[34px] text-[#EBC05F] mb-1.5 md:mb-2.5 px-1 md:px-2">
        {title}
      </h3>
      <p className="font-medium text-xs md:text-[16px] leading-snug md:leading-[24px] text-[#F4F4F4] mt-1">
        {description}
      </p>
      
    </div>
  );
};