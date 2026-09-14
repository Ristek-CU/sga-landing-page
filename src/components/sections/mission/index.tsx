import { MissionCard } from "./partials/mission-card";
import CoordinationIcon from "../../../assets/images/coordination.svg";
import CapacityIcon from "../../../assets/images/capacity.svg";
import CareerPreparedIcon from "../../../assets/images/careerprepared.svg";
import CollaborationIcon from "../../../assets/images/collaboration.svg";
import { Badge } from "@/components/ui/badge"; 

const missionData = [
  {
    title: "Coordination",
    description:
      "Jembatan Mahasiswa & Kampus untuk Efisiensi Waktu, Sinkronisasi Belajar, dan Komunikasi Dua Arah",
    icon: (
      <img
        src={CoordinationIcon}
        alt="Coordination"
        className="w-full h-full"
      />
    ),
  },
  {
    title: "Capacity",
    description: "Meningkatkan skill & ketahanan belajar mahasiswa",
    icon: <img src={CapacityIcon} alt="Capacity" className="w-full h-full" />,
  },
  {
    title: "Career Prepared",
    description: "1 (Kuliah) + 3 (Lomba, Organisasi, dan Intern)",
    icon: (
      <img
        src={CareerPreparedIcon}
        alt="Career Prepared"
        className="w-full h-full"
      />
    ),
  },
  {
    title: "Collaboration",
    description:
      "Memperluas akses pengalaman & jejaring lewat mitra luar kampus",
    icon: (
      <img
        src={CollaborationIcon}
        alt="Collaboration"
        className="w-full h-full"
      />
    ),
  },
];

const MissionSection = () => {
  return (
    // Penyesuaian padding agar seragam dengan section Vision
    <section id="mission" className="py-16 md:py-20 px-5 max-w-7xl mx-auto">
      <div className="flex flex-col w-full h-full">
        
        <div className="flex justify-center mb-8 md:mb-12">
          {/* 2. Menggunakan komponen Badge */}
          <Badge variant="special">Mission</Badge>
        </div>

        {/* 3. Penambahan sm:grid-cols-2 dan penyesuaian gap untuk mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {missionData.map((item, index) => (
            <MissionCard
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default MissionSection;