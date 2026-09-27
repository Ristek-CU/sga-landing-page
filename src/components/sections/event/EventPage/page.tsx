import { useState, useEffect } from "react";
import { Users, Calendar } from "lucide-react";

// Import Particles & Background Asset
import Particles from "@/components/ui/particles";
import heroPattern from "@/assets/images/hero-pattern.webp";

// Import Data Statis dari lib/data/events.json
import eventsData from "@/lib/data/events.json";

// Tipe Data Event
export type EventStatus = "completed" | "ongoing" | "coming_soon";

export interface EventItem {
  id: string;
  title: string;
  status: EventStatus;
  membersCount: string;
  description: string;
  imageUrl: string;
  logoUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

export default function EventPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulasi Fetch API menggunakan data JSON
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 400));
        setEvents(eventsData as EventItem[]);
      } catch (error) {
        console.error("Gagal mengambil data event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Penanganan path image
  const bgImageUrl = typeof heroPattern === "string" ? heroPattern : (heroPattern as { src: string }).src;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans relative">
      
      {/* Effect Paralax */}
      <div 
        className="sticky top-0 h-[420px] w-full bg-[#07303F] bg-cover bg-center bg-no-repeat overflow-hidden z-0"
        style={{ backgroundImage: `url(${bgImageUrl})` }}
      >
        <Particles
          className="absolute inset-0 z-0 pointer-events-none"
          quantity={80}
          ease={80}
          color="#EBC05F"
          refresh={false}
        />
      </div>

      {/* ================= 2. FOREGROUND CONTENT ================= */}
      <div className="relative z-10 -mt-[420px]">
        
        {/* HERO TEXT SECTION */}
        <section className="h-[420px] pt-24 pb-12 px-4 text-center flex flex-col justify-center items-center">
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            {/* Heading Hero dengan Warna #F4F4F4 dan Accent #EBC05F dari Figma */}
            <h1 className="text-3xl sm:text-5xl lg:text-[69px] font-bold tracking-tight mb-4 text-[#F4F4F4] leading-tight lg:leading-[82px] max-w-4xl drop-shadow-md">
              Eksplorasi{" "}
              <span className="text-[#EBC05F]">
                Event Student Government Association
              </span>
            </h1>

            {/* Paragraph Hero */}
            <p className="text-[#F4F4F4]/80 text-xs sm:text-sm lg:text-base max-w-2xl leading-relaxed drop-shadow">
              Temukan berbagai Unit Kegiatan Mahasiswa di{" "}
              <span className="text-[#EBC05F] font-medium">
                Universitas Cakrawala
              </span>{" "}
              dan bergabunglah dengan komunitas yang mendukung minat, relasi, serta
              pengembangan dirimu.
            </p>
          </div>
        </section>

        {/* SECTION BOTTOM GRID */}
        <section className="bg-[#F8FAFC] pt-8 pb-24 shadow-[0_-15px_30px_rgba(0,0,0,0.12)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            
            {/* Tag Badge "Events" */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center justify-center p-[2px] rounded-[30px] bg-gradient-to-r from-[#CEAE65] to-[#685833] shadow-sm">
                <div className="px-[30px] py-[6px] rounded-[28px] bg-white flex items-center justify-center gap-[10px]">
                  <span className="text-[#CEAE65] font-semibold text-sm sm:text-base">
                    Events
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Card Event */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {isLoading
                ? // Skeleton Loading State
                  Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden h-[380px] animate-pulse p-4 flex flex-col justify-between"
                    >
                      <div className="bg-slate-200 h-48 rounded-xl w-full" />
                      <div className="space-y-2 mt-4">
                        <div className="bg-slate-200 h-5 w-3/4 rounded" />
                        <div className="bg-slate-200 h-4 w-full rounded" />
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="bg-slate-200 h-6 w-16 rounded" />
                        <div className="bg-slate-200 h-8 w-24 rounded-lg" />
                      </div>
                    </div>
                  ))
                : // Render Cards
                  events.map((event) => {
                    const isComingSoon = event.status === "coming_soon";

                    return (
                      <div
                        key={event.id}
                        className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden flex flex-col relative transition-all hover:shadow-xl hover:-translate-y-1"
                      >
                        {/* Overlay Khusus Coming Soon */}
                        {isComingSoon && (
                          <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] z-20 flex items-center justify-center p-4">
                            <div className="bg-[#72D5F6] text-white font-bold text-base sm:text-lg px-7 py-2.5 rounded-full shadow-lg border border-white/60 tracking-wide">
                              Coming Soon
                            </div>
                          </div>
                        )}

                        {/* Wrapper Isi Card */}
                        <div
                          className={`flex-1 flex flex-col transition-all duration-300 ${
                            isComingSoon ? "opacity-50 blur-[1px] select-none pointer-events-none" : ""
                          }`}
                        >
                          {/* Gambar / Banner Card */}
                          <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-200">
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />

                            {/* Badge Status Completed / On Going */}
                            {!isComingSoon && (
                              <div className="absolute top-3 left-3 z-10">
                                {event.status === "completed" && (
                                  <span className="bg-[#E85050] text-white text-[11px] font-semibold px-3 py-1 rounded-md shadow-sm">
                                    Completed
                                  </span>
                                )}
                                {event.status === "ongoing" && (
                                  <span className="bg-[#EBC05F] text-white text-[11px] font-semibold px-3 py-1 rounded-md shadow-sm">
                                    On Going
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Body Content Card */}
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              {/* Avatar Logo, Title & Members */}
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                                    <img
                                      src={
                                        event.logoUrl ||
                                        "https://api.dicebear.com/7.x/identicon/svg?seed=cakra"
                                      }
                                      alt="logo"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <h3 className="font-bold text-slate-800 text-base sm:text-lg leading-snug line-clamp-1">
                                    {event.title}
                                  </h3>
                                </div>

                                {/* Member Counter */}
                                <div className="flex items-center gap-1 text-slate-500 text-xs shrink-0 mt-1">
                                  <Users className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{event.membersCount}</span>
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 my-3">
                                {event.description}
                              </p>
                            </div>

                            {/* Card Footer: Social Icons & Action Button */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2.5 text-slate-600">
                                <a
                                  href={event.instagramUrl || "#"}
                                  className="hover:text-[#063A4C] transition-colors"
                                  aria-label="Instagram"
                                >
                                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                  </svg>
                                </a>
                                <a
                                  href={event.tiktokUrl || "#"}
                                  className="hover:text-[#063A4C] transition-colors"
                                  aria-label="TikTok"
                                >
                                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.28-2.6.72-5.22 2.64-6.92 1.47-1.32 3.48-2.02 5.48-1.87v4.11c-.96-.13-1.96.11-2.73.68-.9.63-1.45 1.68-1.42 2.78.01 1.02.53 1.99 1.38 2.53.86.56 1.97.64 2.89.24 1.01-.42 1.73-1.38 1.83-2.47.07-2.32.02-4.63.03-6.95V0l-.02.02z" />
                                  </svg>
                                </a>
                              </div>

                              <button
                                disabled={isComingSoon}
                                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                                  isComingSoon
                                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                    : "bg-[#0B3B4F] hover:bg-[#062c3b] text-white cursor-pointer active:scale-95"
                                }`}
                              >
                                Discover Event
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>

            {/* Tombol "Calendar" */}
            <div className="flex justify-center mt-12">
              <button className="inline-flex items-center justify-center p-[2px] rounded-[30px] bg-gradient-to-r from-[#CEAE65] to-[#685833] hover:opacity-95 transition-all cursor-pointer shadow-sm">
                <div className="px-[30px] py-[6px] rounded-[28px] bg-white flex items-center justify-center gap-[10px]">
                  <Calendar className="w-4 h-4 text-[#CEAE65]" />
                  <span className="text-[#CEAE65] font-semibold text-sm sm:text-base">
                    Calendar
                  </span>
                </div>
              </button>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
