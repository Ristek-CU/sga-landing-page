import { useState, useRef, useEffect } from "react";
import type { LandingEvent } from "@/lib/landing-api";

interface EventItem {
  date: string; // YYYY-MM-DD
  title: string;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const daysHeader = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

// Fungsi menghitung nomor minggu dalam 1 tahun (ISO Week)
function getWeekNumber(date: Date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export default function CalendarSection({ events }: { events: LandingEvent[] }) {
  const [currentYear, setCurrentYear] = useState<number>(() => new Date().getFullYear());
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(() => new Date().getMonth());
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrevMonth = () => {
    setSelectedDateStr(null);
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonthIndex((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    setSelectedDateStr(null);
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonthIndex((prev) => prev + 1);
    }
  };

  const handleSelectMonth = (idx: number) => {
    setCurrentMonthIndex(idx);
    setSelectedDateStr(null);
    setIsDropdownOpen(false);
  };

  const eventsList: EventItem[] = events.flatMap((event) => {
    if (!event.start_date) return [];
    const date = new Date(event.start_date);
    if (Number.isNaN(date.getTime())) return [];
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return [{ date: `${date.getFullYear()}-${month}-${day}`, title: event.name }];
  });

  // Logika pembuatan Grid 7 Hari yang Presisi
  const generateMonthGrid = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonthIndex + 1, 0);

    // Dapatkan indeks hari pertama (0 = Senin, 6 = Minggu)
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const daysInMonth = lastDayOfMonth.getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonthIndex, 0).getDate();

    const gridDays = [];

    // Hari bulan sebelumnya
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const dateObj = new Date(currentYear, currentMonthIndex - 1, day);
      gridDays.push({
        day,
        dateObj,
        isOtherMonth: true,
        fullDateStr: dateObj.toISOString().split("T")[0],
      });
    }

    // Hari bulan berjalan
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(currentYear, currentMonthIndex, day);
      const yearStr = dateObj.getFullYear();
      const monthStr = String(dateObj.getMonth() + 1).padStart(2, "0");
      const dayStr = String(day).padStart(2, "0");
      gridDays.push({
        day,
        dateObj,
        isOtherMonth: false,
        fullDateStr: `${yearStr}-${monthStr}-${dayStr}`,
      });
    }

    // Hari bulan berikutnya agar pas kelipatan 7
    const remainingSlots = (7 - (gridDays.length % 7)) % 7;
    for (let day = 1; day <= remainingSlots; day++) {
      const dateObj = new Date(currentYear, currentMonthIndex + 1, day);
      gridDays.push({
        day,
        dateObj,
        isOtherMonth: true,
        fullDateStr: dateObj.toISOString().split("T")[0],
      });
    }

    // Kelompokkan per minggu (baris)
    const rows = [];
    for (let i = 0; i < gridDays.length; i += 7) {
      const weekDays = gridDays.slice(i, i + 7);
      // Ambil hari Kamis/pertengahan minggu untuk hitung nomor minggu konsisten
      const midWeekDate = weekDays[3] ? weekDays[3].dateObj : weekDays[0].dateObj;
      const weekNumber = getWeekNumber(midWeekDate);
      rows.push({ weekNumber, days: weekDays });
    }

    return rows;
  };

  const calendarRows = generateMonthGrid();

  const getEventForDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    return eventsList.find((e) => e.date === dateStr);
  };

  const selectedEvent = getEventForDate(selectedDateStr);

  return (
    <div className="w-full flex flex-col items-center py-2 px-2 sm:px-4">
      <div className="w-full max-w-[340px] sm:max-w-[380px] bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col items-center relative">
        
        {/* Header Navigation */}
        <div className="relative mb-6 flex items-center justify-between w-full px-2" ref={dropdownRef}>
          <button
            onClick={handlePrevMonth}
            className="p-2 text-gray-600 hover:text-[#05445E] transition font-bold text-base sm:text-lg rounded-full hover:bg-gray-100 flex items-center justify-center w-8 h-8"
            title="Previous Month"
          >
            &#10094;
          </button>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-[#05445E] hover:bg-[#033144] text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide shadow-sm flex items-center gap-2 transition"
            >
              <span>{months[currentMonthIndex]} {currentYear}</span>
              <span className="text-[10px]">▼</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-11 left-1/2 -translate-x-1/2 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-48 overflow-y-auto p-1.5 scrollbar-thin">
                {months.map((monthName, idx) => (
                  <button
                    key={monthName}
                    onClick={() => handleSelectMonth(idx)}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                      idx === currentMonthIndex
                        ? "bg-[#05445E] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {monthName}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleNextMonth}
            className="p-2 text-gray-600 hover:text-[#05445E] transition font-bold text-base sm:text-lg rounded-full hover:bg-gray-100 flex items-center justify-center w-8 h-8"
            title="Next Month"
          >
            &#10095;
          </button>
        </div>

        {/* Layout Tabel Terkunci (8 Kolom) */}
        <div className="w-full flex flex-col gap-2 text-center text-xs sm:text-sm font-medium">
          
          {/* Header Baris Hari */}
          <div className="grid grid-cols-8 gap-1 items-center">
            {/* Space Kosong khusus untuk menyelaraskan dengan kolom Week Number */}
            <div className="w-full" />
            {daysHeader.map((day, idx) => (
              <div
                key={day}
                className={`font-semibold py-1 ${
                  idx >= 5 ? "text-[#D4B254]" : "text-gray-400"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Render Baris per Baris (Terkunci Kolom 1 = Week, Kolom 2-8 = Tanggal) */}
          {calendarRows.map((row) => (
            <div key={`row-${row.weekNumber}`} className="grid grid-cols-8 gap-1 items-center">
              
              {/* Kolom 1: Selalu Kunci Nomor Minggu di Paling Kiri */}
              <div className="bg-[#05445E] text-white font-semibold rounded-lg py-1.5 flex items-center justify-center text-[11px] sm:text-xs">
                {row.weekNumber}
              </div>

              {/* Kolom 2 s/d 8: Hari (Mo - Su) */}
              {row.days.map((item, dayIdx) => {
                const isSelected = item.fullDateStr === selectedDateStr && !item.isOtherMonth;
                const isWeekend = dayIdx >= 5;
                const hasEvent = getEventForDate(item.fullDateStr);

                return (
                  <button
                    key={item.fullDateStr}
                    onClick={() => {
                      if (!item.isOtherMonth) {
                        setSelectedDateStr(item.fullDateStr);
                      }
                    }}
                    className={`relative py-1.5 rounded-lg flex flex-col items-center justify-center font-medium transition-all ${
                      isSelected
                        ? "bg-[#05445E] text-white font-bold rounded-xl shadow-md"
                        : item.isOtherMonth
                        ? "text-gray-300 pointer-events-none"
                        : isWeekend
                        ? "text-[#D4B254] hover:bg-gray-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{item.day}</span>
                    {hasEvent && !item.isOtherMonth && (
                      <span className="w-1.5 h-1.5 rounded-full mt-0.5 bg-[#D4B254]" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer Event */}
        <div className="mt-6 pt-3 border-t border-gray-100 w-full text-center min-h-[44px] flex items-center justify-center">
          {selectedDateStr && selectedEvent ? (
            <div className="bg-[#05445E] text-white px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-2 w-full">
              <span className="text-[#D4B254]">●</span>
              <span>{selectedEvent.title}</span>
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">
              Tidak ada event di tanggal ini
            </p>
          )}
        </div>

      </div>
    </div>
  );
}