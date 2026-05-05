interface MissionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const MissionCard = ({ title, description, icon }: MissionCardProps) => {
  return (
    <div className="bg-gradient-to-b from-[#06455B] to-[#056282] rounded-[20px] w-[257px] h-[346px] py-5 px-2.5 flex flex-col items-center text-center text-white shadow-xl hover:-translate-y-2 transition-transform duration-300">
      <div
        className="
          w-24 h-24  
          bg-white rounded-full 
          flex items-center justify-center 
          mb-2.5 
          text-[#056282]
        "
      >
        <div
          className="
            w-24 h-24
            flex items-center justify-center
          "
        >
          {icon}
        </div>
      </div>

      {/* judul n deskripsi*/}
      <h3 className="font-bold text-[28px] leading-[34px] text-[#EBC05F] mb-2.5 px-2">
        {title}
      </h3>
      <p className="font-medium text-[16px] leading-[24px] text-[#F4F4F4] mt-1">
        {description}
      </p>
    </div>
  );
};
