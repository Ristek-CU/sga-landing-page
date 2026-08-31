import { useMemo, useState, useRef, useEffect } from "react";
import heroPattern from "@/assets/images/sga-pattern.webp";
import { Badge } from "@/components/ui/badge";
import Particles from "@/components/ui/particles";
import DivisionSelectButton from "./partials/division-select-button";
import MemberCard from "./partials/member-card";

// Import service API dan Tipe Data dari landing.ts
import { getLandingData, MembersDataMap } from "@/lib/services/landing";

// Custom Order Urutan Divisi
const DIVISION_ORDER = [
  "Executive Board",
  "Media And Information",
  "Research And Technology",
  "Public And Community Relations",
  "UKM Development",
  "Business And Partnership",
  "Intellectual And Career Development",
  "Student Advocacy And Welfare",
];

export default function DivisionSection() {
  const [membersData, setMembersData] = useState<MembersDataMap>({});
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dan Transform Data dari API saat komponen dimuat
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Memanggil data melalui service landing.ts
        const result = await getLandingData();

        // 1. Ambil array 'members' dari data API
        const rawDivisionMembers = (result?.data?.members as any) || [];

        // 2. Format ulang data dari array API ke objek Records
        const formattedMembersData: MembersDataMap = {};

        if (Array.isArray(rawDivisionMembers)) {
          rawDivisionMembers.forEach((div: any) => {
            if (div.division_name && div.members) {
              formattedMembersData[div.division_name] = div.members.map((m: any) => ({
                name: m.fullname,
                role: m.role?.name || "-",
                imagePath: m.image_path ?? null,
                linkedInUrl: m.linkedin_url,
              }));
            }
          });
        }

        // 3. Simpan data yang sudah diformat ke State
        setMembersData(formattedMembersData);

        // 4. Pilih divisi pertama sesuai urutan khusus secara otomatis
        const availableDivisions = Object.keys(formattedMembersData).sort((a, b) => {
          const indexA = DIVISION_ORDER.indexOf(a);
          const indexB = DIVISION_ORDER.indexOf(b);
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        });

        if (availableDivisions.length > 0) {
          setSelectedDivision(availableDivisions[0]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Gagal memuat data tim.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Ambil daftar nama divisi dan urutkan berdasarkan DIVISION_ORDER
  const divisions = useMemo(() => {
    return Object.keys(membersData).sort((a, b) => {
      const indexA = DIVISION_ORDER.indexOf(a);
      const indexB = DIVISION_ORDER.indexOf(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [membersData]);

  // Ambil daftar anggota berdasarkan divisi yang dipilih
  const currentMembers = useMemo(
    () => (selectedDivision && membersData[selectedDivision]) ? membersData[selectedDivision] : [],
    [membersData, selectedDivision]
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => { setIsDragging(false); };
  const handleMouseUp = () => { setIsDragging(false); };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section
      id="division"
      className="relative w-full py-20 overflow-hidden bg-[#0f3d44] xl:py-28"
    >
      {/* Background & Particles */}
      <div
        className="absolute inset-0 z-0 bg-fixed bg-center bg-cover opacity-50 pointer-events-none"
        style={{ backgroundImage: `url(${heroPattern})` }}
      />
      <Particles
        className="absolute inset-0 z-[1] pointer-events-none"
        quantity={100}
        ease={80}
        color="#F4CE6A"
        refresh
      />

      <div className="container relative z-10 flex flex-col items-center w-full h-full px-5 mx-auto">
        <div className="flex justify-center w-full mb-12 lg:mb-16">
          <Badge variant="special">Meet Our Team!</Badge>
        </div>

        {/* State Loading / Error / Konten Utama */}
        {isLoading ? (
          <div className="py-12 text-center text-white">Memuat data tim...</div>
        ) : error ? (
          <div className="py-12 text-center text-red-300">{error}</div>
        ) : divisions.length === 0 ? (
          <div className="py-12 text-center text-white">Data anggota tidak ditemukan.</div>
        ) : (
          <div className="flex flex-row w-full gap-x-4 lg:gap-x-16 gap-y-10 items-stretch">
            {/* Sidebar Menu Divisi (Kiri) */}
            <div className="flex flex-col gap-4 w-28 sm:w-32 lg:w-64 shrink-0 h-[340px] lg:h-auto overflow-y-auto lg:overflow-visible pb-4 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex flex-col gap-3 lg:gap-6 w-full px-1">
                {divisions.map((division) => (
                  <DivisionSelectButton
                    key={division}
                    isActive={selectedDivision === division}
                    onClick={() => setSelectedDivision(division)}
                  >
                    {division}
                  </DivisionSelectButton>
                ))}
              </div>
            </div>

            {/* Area Card Member (Kanan) */}
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={`flex flex-row flex-1 w-full gap-4 lg:gap-6 pb-8 pl-1 overflow-x-auto select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
                isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
              }`}
            >
              {currentMembers.map(({ name, role, imagePath, linkedInUrl }) => (
                <div
                  key={name}
                  className="shrink-0 snap-start w-[160px] sm:w-[240px] lg:w-auto h-[320px] lg:h-full"
                >
                  <MemberCard
                    name={name}
                    position={role}
                    image={imagePath ?? null}
                    linkedinUrl={linkedInUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}