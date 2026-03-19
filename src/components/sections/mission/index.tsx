import { MissionCard } from "./partials/mission-card";
import CoordinationIcon from "../../../assets/images/coordination.svg";
import CapacityIcon from "../../../assets/images/capacity.svg";
import CareerPreparedIcon from "../../../assets/images/careerprepared.svg";
import CollaborationIcon from "../../../assets/images/collaboration.svg";

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
    <section id="mission" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-10">
          <span className="px-5 py-1.5 border border-[#EAB308] text-[#EAB308] rounded-full text-xs font-bold uppercase tracking-widest">
            Mission
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
