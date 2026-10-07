import { ArrowLeftIcon, ArrowUpRight, CalendarDays, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import heroPattern from "@/assets/images/hero-pattern.webp";
import CalendarSection from "@/components/sections/calendar";
import Particles from "@/components/ui/particles";
import {
	type BphEventListItem,
	fetchBphEvents,
	formatWibRange,
} from "@/lib/bph-api";
import { formatEventCountdown } from "@/lib/event-time";

const statusConfig = {
	past: { label: "Selesai", bg: "bg-slate-100" },
	ongoing: { label: "Berlangsung", bg: "bg-[#CEAE65]" },
	upcoming: { label: "Akan datang", bg: "bg-[#72D5F6]" },
};

function EventCard({ event, now }: { event: BphEventListItem; now: number }) {
	const [imageFailed, setImageFailed] = useState(false);
	const image =
		!imageFailed && event.cover_image_url ? event.cover_image_url : heroPattern;
	const status = statusConfig[event.status];

	return (
		<article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
			<div className="relative aspect-video overflow-hidden bg-slate-100">
				<img
					src={image}
					alt=""
					loading="lazy"
					onError={() => setImageFailed(true)}
					className="h-full w-full object-cover"
				/>
				<span
					className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold text-[#06455B] ${status.bg}`}
				>
					{status.label}
				</span>
			</div>
			<div className="flex flex-1 flex-col p-5 [overflow-wrap:anywhere]">
				<h3 className="text-lg font-bold leading-snug text-[#06455B]">
					{event.title}
				</h3>
				<p className="mt-2 flex items-start gap-2 text-sm text-slate-600">
					<Users aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
					{event.organizer ?? "SGA Cakrawala"}
				</p>
				<p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
					{event.description || "Informasi acara belum tersedia."}
				</p>
				<p className="mt-4 flex items-start gap-2 text-sm font-medium leading-relaxed text-[#06455B]">
					<CalendarDays aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
					{formatWibRange(event.starts_at, event.ends_at)}
				</p>
				{event.status === "upcoming" && (
					<p className="mt-2 text-sm text-slate-600">
						{formatEventCountdown(event.starts_at, now)}
					</p>
				)}
				<div className="mt-auto pt-5">
					<Link
						to={`/events/${event.slug}`}
						aria-label={`Lihat detail ${event.title}`}
						className="inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-xl bg-[#06455B] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#05384A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#06455B]"
					>
						Lihat detail
						<ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
					</Link>
				</div>
			</div>
		</article>
	);
}

export default function EventPage() {
	const [now, setNow] = useState(() => Date.now());
	const [cmsEvents, setCmsEvents] = useState<BphEventListItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [cmsError, setCmsError] = useState<string | null>(null);
	const [attempt, setAttempt] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => setNow(Date.now()), 60_000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		let alive = true;
		setLoading(true);
		setCmsError(null);
		fetchBphEvents({ limit: 50 })
			.then((items) => alive && setCmsEvents(items))
			.catch(
				(error: Error) =>
					alive &&
					setCmsError(
						error.name === "RateLimitError"
							? error.message
							: "Daftar event belum bisa dimuat. Periksa koneksi lalu coba lagi.",
					),
			)
			.finally(() => alive && setLoading(false));
		return () => {
			alive = false;
		};
	}, [attempt]);

	return (
		<div className="min-h-screen bg-[#F8FAFC] text-[#06455B]">
			<section
				className="relative isolate overflow-hidden bg-[#07303F] bg-cover bg-center px-4 pb-10 pt-28 sm:px-6 sm:pb-16 sm:pt-36"
				style={{ backgroundImage: `url(${heroPattern})` }}
			>
				<Particles
					className="pointer-events-none absolute inset-0 -z-10"
					quantity={40}
					ease={80}
					color="#EBC05F"
					refresh={false}
				/>
				<div className="mx-auto max-w-6xl">
					<Link
						to="/#event"
						className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
					>
						<ArrowLeftIcon aria-hidden="true" className="size-4" />
						Kembali ke beranda
					</Link>
					<h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-5xl">
						Student <span className="text-[#EBC05F]">Event</span>
					</h1>
					<p className="mt-4 max-w-xl text-base leading-relaxed text-white/90">
						Temukan kegiatan SGA Cakrawala University. Lihat jadwal, kenali
						acaranya, dan ikut berpartisipasi.
					</p>
				</div>
			</section>
			<main className="mx-auto max-w-6xl space-y-12 px-4 py-8 sm:space-y-16 sm:px-6 sm:py-12">
				<section aria-labelledby="events-heading">
					<h2
						id="events-heading"
						className="mb-6 text-xl font-bold sm:text-2xl"
					>
						Jelajahi acara
					</h2>
					{loading && (
						<div
							role="status"
							aria-label="Memuat event"
							className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
						>
							{[0, 1, 2].map((i) => (
								<div
									key={i}
									aria-hidden="true"
									className="overflow-hidden rounded-2xl border border-slate-200 bg-white motion-safe:animate-pulse"
								>
									<div className="aspect-video bg-slate-200" />
									<div className="space-y-4 p-5">
										<div className="h-6 w-3/4 rounded bg-slate-200" />
										<div className="h-4 rounded bg-slate-100" />
										<div className="h-4 w-2/3 rounded bg-slate-100" />
										<div className="h-11 rounded bg-slate-100" />
									</div>
								</div>
							))}
						</div>
					)}
					{!loading && cmsError && (
						<div
							role="alert"
							className="rounded-2xl border border-slate-200 bg-white p-6"
						>
							<p className="text-sm leading-relaxed text-slate-700">
								{cmsError}
							</p>
							<button
								type="button"
								onClick={() => setAttempt((value) => value + 1)}
								className="mt-4 min-h-11 rounded-lg bg-[#06455B] px-4 py-2 text-sm font-semibold text-white"
							>
								Coba lagi
							</button>
						</div>
					)}
					{!loading &&
						!cmsError &&
						(cmsEvents.length ? (
							<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
								{cmsEvents.map((event) => (
									<EventCard key={event.id} event={event} now={now} />
								))}
							</div>
						) : (
							<p
								role="status"
								className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600"
							>
								Belum ada event yang tersedia. Cek kembali nanti untuk kegiatan
								berikutnya.
							</p>
						))}
				</section>
				<section aria-labelledby="calendar-heading">
					<h2 id="calendar-heading" className="text-xl font-bold sm:text-2xl">
						Kalender acara
					</h2>
					<p className="mb-6 mt-2 text-sm leading-relaxed text-slate-600">
						Pilih tanggal untuk melihat jadwal. Semua waktu ditampilkan dalam
						WIB.
					</p>
					<CalendarSection />
				</section>
			</main>
		</div>
	);
}
