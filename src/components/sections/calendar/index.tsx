import {
	type BphEventListItem,
	fetchBphCalendar,
	formatWibRange,
	formatWibTime,
	wibDateKey,
} from "@/lib/bph-api";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

const months = [
	"Januari",
	"Februari",
	"Maret",
	"April",
	"Mei",
	"Juni",
	"Juli",
	"Agustus",
	"September",
	"Oktober",
	"November",
	"Desember",
];

const daysHeader = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const statusChip: Record<BphEventListItem["status"], string> = {
	upcoming: "bg-[#72D5F6]",
	ongoing: "bg-[#CEAE65]",
	past: "bg-slate-400",
};

interface CalendarEvent {
	slug: string;
	title: string;
	starts_at: string;
	ends_at: string | null;
	location: string | null;
	status: BphEventListItem["status"];
}

/** Grid 7 kolom (Sen–Min) + baris pembatas tipis, gaya Google Calendar bulanan. */
function generateMonthGrid(year: number, monthIndex: number) {
	const firstDay = new Date(year, monthIndex, 1);
	// getDay(): 0=Minggu; geser ke indeks 0=Senin.
	const startOffset = (firstDay.getDay() + 6) % 7;
	const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

	const cells: {
		day: number;
		fullDateStr: string;
		isOtherMonth: boolean;
	}[] = [];

	for (let i = startOffset - 1; i >= 0; i--) {
		const dateObj = new Date(year, monthIndex, -i);
		cells.push({
			day: dateObj.getDate(),
			fullDateStr: wibDateKey(dateObj.toISOString()),
			isOtherMonth: true,
		});
	}
	for (let day = 1; day <= daysInMonth; day++) {
		const dateObj = new Date(year, monthIndex, day);
		cells.push({
			day,
			fullDateStr: wibDateKey(dateObj.toISOString()),
			isOtherMonth: false,
		});
	}
	while (cells.length % 7 !== 0) {
		const dateObj = new Date(
			year,
			monthIndex + 1,
			cells.length - startOffset - daysInMonth + 1,
		);
		cells.push({
			day: dateObj.getDate(),
			fullDateStr: wibDateKey(dateObj.toISOString()),
			isOtherMonth: true,
		});
	}
	return cells;
}

export default function CalendarSection({
	events = [],
}: { events?: CalendarEvent[] }) {
	const now = new Date();
	const [currentYear, setCurrentYear] = useState(now.getFullYear());
	const [currentMonthIndex, setCurrentMonthIndex] = useState(now.getMonth());
	const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
	const [remoteEvents, setRemoteEvents] = useState<CalendarEvent[]>([]);
	const [loading, setLoading] = useState(false);

	const monthParam = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, "0")}`;

	useEffect(() => {
		let alive = true;
		setLoading(true);
		fetchBphCalendar(monthParam)
			.then((items) => {
				if (!alive) return;
				setRemoteEvents(
					items.map((e) => ({
						slug: e.slug,
						title: e.title,
						starts_at: e.starts_at,
						ends_at: e.ends_at,
						location: e.location,
						status: e.status,
					})),
				);
			})
			.catch(() => alive && setRemoteEvents([]))
			.finally(() => alive && setLoading(false));
		return () => {
			alive = false;
		};
	}, [monthParam]);

	// ponytail: prop `events` fallback statis (events.json) dipakai bila CMS kosong/error;
	// buang setelah semua event live di BPH CMS.
	const eventsList = useMemo(
		() =>
			(remoteEvents.length > 0
				? remoteEvents
				: events
						.filter((e) => e.starts_at)
						.map((e) => ({ ...e, status: e.status as CalendarEvent["status"] }))
			).map((e) => ({ ...e, dateKey: wibDateKey(e.starts_at) })),
		[remoteEvents, events],
	);

	const calendarCells = useMemo(
		() => generateMonthGrid(currentYear, currentMonthIndex),
		[currentYear, currentMonthIndex],
	);

	const eventsByDate = useMemo(() => {
		const map = new Map<string, CalendarEvent[]>();
		for (const e of eventsList) {
			const list = map.get(e.dateKey) ?? [];
			list.push(e);
			map.set(e.dateKey, list);
		}
		return map;
	}, [eventsList]);

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

	const todayKey = wibDateKey(now.toISOString());
	const selectedEvents = selectedDateStr
		? (eventsByDate.get(selectedDateStr) ?? [])
		: [];

	return (
		<div className="w-full flex justify-center px-2 sm:px-4">
			<div className="w-full max-w-[900px] bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-gray-100">
				{/* Header Navigation */}
				<div className="mb-6 flex items-center justify-between gap-3">
					<div className="flex items-center gap-2">
						<h3 className="text-lg font-bold text-[#093B4C] sm:text-xl">
							{months[currentMonthIndex]} {currentYear}
						</h3>
						<button
							onClick={() => {
								setCurrentYear(now.getFullYear());
								setCurrentMonthIndex(now.getMonth());
								setSelectedDateStr(null);
							}}
							className="rounded-full border border-gray-200 px-3 py-1 text-[11px] font-semibold text-gray-500 transition hover:bg-gray-50"
						>
							Hari ini
						</button>
					</div>

					<div className="flex items-center gap-1.5">
						{loading && (
							<span className="mr-1 text-[11px] text-gray-400">memuat…</span>
						)}
						<button
							onClick={handlePrevMonth}
							className="flex size-8 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
							aria-label="Bulan sebelumnya"
						>
							&#10094;
						</button>
						<button
							onClick={handleNextMonth}
							className="flex size-8 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
							aria-label="Bulan berikutnya"
						>
							&#10095;
						</button>
					</div>
				</div>

				{/* Header Hari */}
				<div className="grid grid-cols-7 border-y border-gray-100 bg-gray-50/60">
					{daysHeader.map((day, idx) => (
						<div
							key={day}
							className={`py-2 text-center text-[11px] font-semibold sm:text-xs ${
								idx >= 5 ? "text-[#D4B254]" : "text-gray-400"
							}`}
						>
							{day}
						</div>
					))}
				</div>

				{/* Grid Tanggal */}
				<div className="grid grid-cols-7">
					{calendarCells.map((item, idx) => {
						const dayEvents = eventsByDate.get(item.fullDateStr) ?? [];
						const isToday = item.fullDateStr === todayKey;
						const isSelected = item.fullDateStr === selectedDateStr;

						return (
							<button
								key={`${item.fullDateStr}-${idx}`}
								onClick={() => setSelectedDateStr(item.fullDateStr)}
								className={`min-h-[72px] sm:min-h-[96px] border-b border-r border-gray-100 p-1 text-left align-top transition-colors sm:p-1.5 ${
									idx % 7 === 6 ? "border-r-0" : ""
								} ${isSelected ? "bg-[#05445E]/5" : "hover:bg-gray-50"}`}
							>
								<span
									className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-medium sm:text-sm ${
										isToday
											? "bg-[#05445E] font-bold text-white"
											: item.isOtherMonth
												? "text-gray-300"
												: "text-gray-700"
									}`}
								>
									{item.day}
								</span>

								{/* Chip event gaya Google Calendar: maks 2 + indikator sisa */}
								{dayEvents.slice(0, 2).map((e) => (
									<span
										key={e.slug}
										className={`mt-1 block truncate rounded px-1.5 py-0.5 text-[10px] font-semibold leading-tight text-white sm:text-[11px] ${
											statusChip[e.status] ?? "bg-[#05445E]"
										} ${item.isOtherMonth ? "opacity-40" : ""}`}
										title={e.title}
									>
										{formatWibTime(e.starts_at)} · {e.title}
									</span>
								))}
								{dayEvents.length > 2 && (
									<span className="mt-0.5 block text-[10px] font-medium text-gray-400">
										+{dayEvents.length - 2} lainnya
									</span>
								)}
							</button>
						);
					})}
				</div>

				{/* Panel Detail Tanggal Terpilih */}
				<div className="mt-5 min-h-[64px]">
					{selectedDateStr ? (
						selectedEvents.length > 0 ? (
							<div className="space-y-2">
								{selectedEvents.map((e) => (
									<Link
										key={e.slug}
										to={`/events/${e.slug}`}
										className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-3 transition hover:border-[#05445E]/30 hover:bg-[#05445E]/5"
									>
										<span
											className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
												statusChip[e.status] ?? "bg-[#05445E]"
											}`}
										/>
										<span className="min-w-0">
											<span className="block truncate text-sm font-bold text-[#093B4C]">
												{e.title}
											</span>
											<span className="block text-xs text-gray-500">
												{formatWibRange(e.starts_at, e.ends_at)}
												{e.location ? ` · ${e.location}` : ""}
											</span>
										</span>
									</Link>
								))}
							</div>
						) : (
							<p className="text-sm text-gray-400 italic">
								Tidak ada event di tanggal ini.
							</p>
						)
					) : (
						<p className="text-sm text-gray-400">
							Pilih tanggal untuk melihat detail event.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
