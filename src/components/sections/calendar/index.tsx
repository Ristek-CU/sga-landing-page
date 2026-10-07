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
	past: "bg-slate-200",
};

interface CalendarEvent {
	slug: string;
	title: string;
	starts_at: string;
	ends_at: string | null;
	location: string | null;
	status: BphEventListItem["status"] | undefined;
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

	// YYYY-MM-DD dari komponen tanggal lokal — tanpa lewat Date/toISOString agar
	// tidak bergeser oleh timezone (cell grid = tanggal dilihat, bukan momen).
	const keyOf = (y: number, m: number, d: number) =>
		`${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

	// Hari bulan sebelumnya (tanggal negatif aman di Date constructor)
	for (let i = startOffset - 1; i >= 0; i--) {
		const dateObj = new Date(year, monthIndex, -i);
		cells.push({
			day: dateObj.getDate(),
			fullDateStr: keyOf(
				dateObj.getFullYear(),
				dateObj.getMonth(),
				dateObj.getDate(),
			),
			isOtherMonth: true,
		});
	}
	for (let day = 1; day <= daysInMonth; day++) {
		cells.push({
			day,
			fullDateStr: keyOf(year, monthIndex, day),
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
			fullDateStr: keyOf(
				dateObj.getFullYear(),
				dateObj.getMonth(),
				dateObj.getDate(),
			),
			isOtherMonth: true,
		});
	}
	return cells;
}

export default function CalendarSection() {
	const todayKey = wibDateKey(new Date().toISOString());
	const now = new Date(`${todayKey}T12:00:00`);
	const [currentYear, setCurrentYear] = useState(now.getFullYear());
	const [currentMonthIndex, setCurrentMonthIndex] = useState(now.getMonth());
	const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
	const [remoteEvents, setRemoteEvents] = useState<CalendarEvent[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [attempt, setAttempt] = useState(0);

	const monthParam = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, "0")}`;

	useEffect(() => {
		let alive = true;
		setLoading(true);
		setError(null);
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
			.catch((error: Error) => {
				if (alive) {
					setRemoteEvents([]);
					setError(
						error.name === "RateLimitError"
							? error.message
							: "Kalender belum bisa dimuat. Periksa koneksi lalu coba lagi.",
					);
				}
			})
			.finally(() => alive && setLoading(false));
		return () => {
			alive = false;
		};
	}, [monthParam, attempt]);

	const calendarCells = useMemo(
		() => generateMonthGrid(currentYear, currentMonthIndex),
		[currentYear, currentMonthIndex],
	);

	const eventsByDate = useMemo(() => {
		const map = new Map<string, CalendarEvent[]>();
		for (const event of remoteEvents) {
			const start = wibDateKey(event.starts_at);
			// The end timestamp is exclusive, including for events ending at midnight.
			const end = event.ends_at
				? wibDateKey(
						new Date(
							Math.max(
								Date.parse(event.starts_at),
								Date.parse(event.ends_at) - 1,
							),
						).toISOString(),
					)
				: start;
			for (const cell of calendarCells) {
				if (
					cell.isOtherMonth ||
					cell.fullDateStr < start ||
					cell.fullDateStr > end
				)
					continue;
				const list = map.get(cell.fullDateStr) ?? [];
				list.push(event);
				map.set(cell.fullDateStr, list);
			}
		}
		return map;
	}, [remoteEvents, calendarCells]);

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

	const selectedEvents = selectedDateStr
		? (eventsByDate.get(selectedDateStr) ?? [])
		: [];

	return (
		<div className="w-full">
			<div className="w-full bg-white rounded-2xl p-2 sm:p-6 border border-slate-200">
				{/* Header Navigation */}
				<div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-2 pt-2">
					<div className="flex flex-wrap items-center gap-2">
						<h3 className="text-lg font-bold text-[#093B4C] sm:text-xl">
							{months[currentMonthIndex]} {currentYear}
						</h3>
						<button
							onClick={() => {
								setCurrentYear(now.getFullYear());
								setCurrentMonthIndex(now.getMonth());
								setSelectedDateStr(null);
							}}
							className="rounded-full border border-gray-200 min-h-11 px-3 py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-50"
						>
							Hari ini
						</button>
					</div>

					<div className="flex items-center gap-1.5">
						<button
							onClick={handlePrevMonth}
							className="flex size-11 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
							aria-label="Bulan sebelumnya"
						>
							&#10094;
						</button>
						<button
							onClick={handleNextMonth}
							className="flex size-11 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100"
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
								idx >= 5 ? "text-[#80631D]" : "text-slate-600"
							}`}
						>
							{day}
						</div>
					))}
				</div>

				{/* Skeleton selama fetch bulan — bentuk sama dengan grid asli */}
				{loading && (
					<div className="grid grid-cols-7" aria-busy="true">
						{Array.from({ length: calendarCells.length }, (_, i) => (
							<div
								key={i}
								className="min-h-[64px] motion-safe:animate-pulse border-b border-r border-gray-100 p-1 sm:min-h-[96px] sm:p-1.5"
							>
								<div
									className={`mb-2 size-6 rounded-full bg-gray-100 ${i % 7 === 6 ? "ml-auto" : ""}`}
								/>
								<div className="h-3 w-full rounded bg-gray-100" />
							</div>
						))}
					</div>
				)}

				{/* Grid Tanggal */}
				<div className={loading || error ? "hidden" : "grid grid-cols-7"}>
					{calendarCells.map((item, idx) => {
						const dayEvents = eventsByDate.get(item.fullDateStr) ?? [];
						const isToday = item.fullDateStr === todayKey;
						const isSelected = item.fullDateStr === selectedDateStr;

						return (
							<button
								key={`${item.fullDateStr}-${idx}`}
								onClick={() => setSelectedDateStr(item.fullDateStr)}
								aria-label={`${new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(new Date(`${item.fullDateStr}T12:00:00`))}, ${dayEvents.length} acara`}
								aria-pressed={isSelected}
								aria-current={isToday ? "date" : undefined}
								disabled={item.isOtherMonth}
								className={`min-w-0 min-h-[64px] sm:min-h-[96px] border-b border-r border-gray-100 p-1 text-left align-top transition-colors focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-[#06455B] disabled:cursor-default sm:p-1.5 ${
									idx % 7 === 6 ? "border-r-0" : ""
								} ${isSelected ? "bg-[#05445E]/10 ring-2 ring-inset ring-[#05445E]" : "hover:bg-gray-50"}`}
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

								{dayEvents.length > 0 && (
									<span
										aria-hidden="true"
										className="mt-1 block text-center text-xs font-bold text-[#06455B] sm:hidden"
									>
										{dayEvents.length}
										<span className="sr-only"> acara</span>
									</span>
								)}
								{/* Full titles remain available in the selected-date panel. */}
								{dayEvents.slice(0, 2).map((e) => (
									<span
										key={e.slug}
										className={`mt-1 hidden truncate rounded px-1.5 py-0.5 text-xs font-semibold leading-tight text-[#06455B] sm:block ${
											e.status ? statusChip[e.status] : "bg-slate-200"
										} ${item.isOtherMonth ? "opacity-40" : ""}`}
										title={e.title}
									>
										{/* 00.00 = tanggal tanpa jam (fallback statis) → jangan render jam ngarang */}
										{formatWibTime(e.starts_at) === "00.00"
											? e.title
											: `${formatWibTime(e.starts_at)} · ${e.title}`}
									</span>
								))}
								{dayEvents.length > 2 && (
									<span className="mt-0.5 hidden sm:block text-xs font-medium text-slate-600">
										+{dayEvents.length - 2} lainnya
									</span>
								)}
							</button>
						);
					})}
				</div>

				{/* Panel Detail Tanggal Terpilih */}
				<div
					className="mt-4 min-h-[64px] border-t border-slate-200 px-2 pt-4"
					aria-live="polite"
				>
					{error ? (
						<div role="alert">
							<p className="text-sm text-slate-700">{error}</p>
							<button
								type="button"
								onClick={() => setAttempt((value) => value + 1)}
								className="mt-3 min-h-11 rounded-lg bg-[#06455B] px-4 py-2 text-sm font-semibold text-white"
							>
								Coba lagi
							</button>
						</div>
					) : loading ? (
						<p className="text-sm text-slate-600">Memuat kalender…</p>
					) : (
						<>
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
														e.status ? statusChip[e.status] : "bg-slate-200"
													}`}
												/>
												<span className="min-w-0">
													<span className="block [overflow-wrap:anywhere] text-sm font-bold text-[#093B4C]">
														{e.title}
													</span>
													<span className="block [overflow-wrap:anywhere] text-sm text-slate-600">
														{formatWibRange(e.starts_at, e.ends_at)}
														{e.location ? ` · ${e.location}` : ""}
													</span>
												</span>
											</Link>
										))}
									</div>
								) : (
									<p className="text-sm text-slate-600 italic">
										Tidak ada event di tanggal ini.
									</p>
								)
							) : (
								<p className="text-sm text-slate-600">
									Pilih tanggal untuk melihat detail event.
								</p>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
