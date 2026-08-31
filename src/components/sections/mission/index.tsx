import { useEffect, useState } from "react";
import { MissionCard } from "./partials/mission-card";
import CoordinationIcon from "../../../assets/images/coordination.svg";
import CapacityIcon from "../../../assets/images/capacity.svg";
import CareerPreparedIcon from "../../../assets/images/careerprepared.svg";
import CollaborationIcon from "../../../assets/images/collaboration.svg";
import { Badge } from "@/components/ui/badge";

// Import service API dari landing.ts
import { getLandingData } from "@/lib/services/landing";

// Interface tipe data Mission dari API
export interface MissionItem {
  title: string;
  description: string;
  iconPath?: string | null;
}

// Fallback Icon Lokal berdasarkan nama Mission
const LOCAL_ICONS: Record<string, string> = {
  Coordination: CoordinationIcon,
  Capacity: CapacityIcon,
  "Career Prepared": CareerPreparedIcon,
  Collaboration: CollaborationIcon,
};

const MissionSection = () => {
  const [missions, setMissions] = useState<MissionItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Menggunakan service getLandingData() agar terintegrasi secara konsisten
        const result = await getLandingData();

        // 1. Ambil array 'missions' dari data API
        const rawMissions = result?.data?.missions || [];

        // 2. Transformasi data agar sesuai dengan komponen
        const formattedMissions: MissionItem[] = rawMissions.map((item: any) => ({
          title: item.title || item.name || "",
          description: item.description || "",
          iconPath: item.image_path || item.icon_path || null,
        }));

        setMissions(formattedMissions);
      } catch (err) {
        console.error("Fetch mission error:", err);
        setError("Gagal memuat data mission.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMissions();
  }, []);

  // Helper fungsi untuk merender gambar icon (API URL / Fallback SVG Lokal)
  const renderIcon = (item: MissionItem) => {
    const iconSrc = item.iconPath || LOCAL_ICONS[item.title];

    if (!iconSrc) return null;

    return (
      <img
        src={iconSrc}
        alt={item.title}
        className="w-full h-full object-contain"
      />
    );
  };

  return (
    <section id="mission" className="py-16 md:py-20 px-5 max-w-7xl mx-auto">
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-center mb-8 md:mb-12">
          <Badge variant="special">Mission</Badge>
        </div>

        {/* State Loading / Error / Konten Utama */}
        {isLoading ? (
          <div className="py-8 text-center text-gray-500">
            Memuat data mission...
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">{error}</div>
        ) : missions.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            Data mission tidak ditemukan.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {missions.map((item, index) => (
              <MissionCard
                key={index}
                title={item.title}
                description={item.description}
                icon={renderIcon(item)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MissionSection;