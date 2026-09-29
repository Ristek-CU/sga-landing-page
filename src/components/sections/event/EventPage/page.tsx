import { ArrowLeftIcon, CalendarDays, Users } from "lucide-react";
import { Link } from "react-router";

import heroPattern from "@/assets/images/hero-pattern.webp";
import CalendarSection from "@/components/sections/calendar";
import Particles from "@/components/ui/particles";
import eventsData from "@/lib/data/events.json";
import type { LandingEvent } from "@/lib/landing-api";

type EventJsonItem = (typeof eventsData)[number];

const statusConfig: Record<string, { label: string; bg: string }> = {
	completed: { label: "Completed", bg: "bg-[#F06A6A]" },
	ongoing: { label: "On Going", bg: "bg-[#CEAE65]" },
	coming_soon: { label: "Coming Soon", bg: "bg-[#72D5F6]" },
};

/** Map event.json item → LandingEvent so CalendarSection stays compatible */
function toLandingEvent(e: EventJsonItem): LandingEvent {
	return {
		id: e.id,
		name: e.title,
		description: e.description,
		start_date: e.date === "Coming Soon" ? null : e.date,
		end_date: null,
		location: e.location,
		status: e.status,
		logo_path: e.imageUrl,
		registration_link: e.registrationUrl ?? null,
	};
}

function InstagramIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" className={className}>
			<path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
		</svg>
	);
}

function TiktokIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" className={className}>
			<path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.43 0-2.59-1.16-2.59-2.59a2.59 2.59 0 0 1 2.59-2.59c.28 0 .55.04.81.13V9.73a5.62 5.62 0 0 0-.81-.06c-3.13 0-5.68 2.55-5.68 5.68 0 3.13 2.55 5.68 5.68 5.68 3.13 0 5.68-2.55 5.68-5.68V9.41a7.29 7.29 0 0 0 4.27 1.37V7.7a4.28 4.28 0 0 1-3.15-1.88Z" />
		</svg>
	);
}

function EventCard({ event }: { event: EventJsonItem }) {
	const isComingSoon = event.status === "coming_soon";
	const image = event.imageUrl || heroPattern;
	const logo = event.logoUrl || heroPattern;
	const status = statusConfig[event.status] ?? statusConfig.coming_soon;

	return (
		<article className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
			{/* Coming Soon overlay */}
			{isComingSoon && (
				<div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-sm">
					<span className="rounded-full bg-[#72D5F6] px-8 py-3 text-lg font-bold tracking-wide text-white shadow-lg sm:text-xl">
						Coming Soon
					</span>
				</div>
			)}

			<div className={`flex flex-1 flex-col ${isComingSoon ? "opacity-40 blur-[2px]" : ""}`}>
				{/* Image + Status Badge */}
				<div className="relative h-44 w-full overflow-hidden bg-slate-200">
					<img
						src={image}
						alt={event.title}
						className="h-full w-full object-cover"
					/>
					<span
						className={`absolute left-3 top-3 rounded-full px-4 py-1 text-[11px] font-bold text-white shadow ${status.bg}`}
					>
						{status.label}
					</span>
				</div>

				{/* Card Body */}
				<div className="flex flex-1 flex-col px-5 pb-5 pt-4">
					{/* Logo + Title + Members Row */}
					<div className="flex items-start gap-3">
						<div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-slate-100 bg-slate-50">
							<img
								src={logo}
								alt={`${event.title} logo`}
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex flex-col pt-0.5">
							<h2 className="line-clamp-1 text-sm font-extrabold leading-snug text-[#333333]">
								{event.title}
							</h2>
							<div className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
								<Users className="size-3.5 shrink-0 text-slate-500" />
								<span>{event.membersCount}</span>
							</div>
						</div>
					</div>

					{/* Description */}
					<p className="mt-3.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
						{event.description || "Informasi acara belum tersedia."}
					</p>

					{/* Bottom: Social Icons + Discover Button */}
					<div className="mt-auto flex items-center justify-between pt-5">
						<div className="flex items-center gap-2.5">
							{event.instagramUrl && (
								<a
									href={event.instagramUrl}
									target="_blank"
									rel="noreferrer"
									className="text-slate-500 transition-colors hover:text-[#E1306C]"
									aria-label="Instagram"
								>
									<InstagramIcon className="size-4.5" />
								</a>
							)}
							{event.tiktokUrl && (
								<a
									href={event.tiktokUrl}
									target="_blank"
									rel="noreferrer"
									className="text-slate-500 transition-colors hover:text-black"
									aria-label="TikTok"
								>
									<TiktokIcon className="size-4.5" />
								</a>
							)}
						</div>

						<Link
							to={`/events/${event.id}`}
							className="inline-flex items-center justify-center rounded-lg bg-[#0B3B4F] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#062c3b] active:scale-[0.98]"
						>
							Discover Event
						</Link>
					</div>
				</div>
			</div>
		</article>
	);
}

export default function EventPage() {
	const events: EventJsonItem[] = eventsData;

	const bgImageUrl =
		typeof heroPattern === "string"
			? heroPattern
			: (heroPattern as { src: string }).src;

	// Convert to LandingEvent[] for CalendarSection compatibility
	const landingEvents: LandingEvent[] = events.map(toLandingEvent);

	return (
		<div className="relative min-h-screen bg-[#F8FAFC] font-sans">
			{/* Back Button */}
			<Link
				to="/#event"
				className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full bg-[#06455B]/90 px-4 py-2 text-sm font-bold text-[#20BEE4] shadow-lg ring-1 ring-white/10 backdrop-blur transition hover:bg-[#07556D] sm:left-8 sm:top-7 sm:text-base"
			>
				<ArrowLeftIcon className="size-5" />
				Kembali
			</Link>

			<div
				className="sticky top-0 z-0 h-[420px] w-full overflow-hidden bg-[#07303F] bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: `url(${bgImageUrl})` }}
			>
				<Particles
					className="pointer-events-none absolute inset-0 z-0"
					quantity={80}
					ease={80}
					color="#EBC05F"
					refresh={false}
				/>
			</div>

			<div className="relative z-10 -mt-[420px]">
				<section className="flex h-[420px] flex-col items-center justify-center px-4 pb-12 pt-24 text-center">
					<div className="mx-auto flex max-w-5xl flex-col items-center">
						<h1 className="mb-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-[#F4F4F4] drop-shadow-md sm:text-5xl lg:text-[69px] lg:leading-[82px]">
							Eksplorasi{" "}
							<span className="text-[#EBC05F]">Event Student Government Association</span>
						</h1>
						<p className="max-w-2xl text-xs leading-relaxed text-[#F4F4F4]/80 drop-shadow sm:text-sm lg:text-base">
							Temukan event terbaru dari{" "}
							<span className="font-medium text-[#EBC05F]"> SGA Cakrawala University</span>.
						</p>
					</div>
				</section>

				<section className="bg-[#F8FAFC] pb-24 pt-8 shadow-[0_-15px_30px_rgba(0,0,0,0.12)]">
					<div className="mx-auto max-w-6xl px-4 sm:px-6">
						<div className="mb-8 flex justify-center">
							<div className="rounded-[30px] bg-gradient-to-r from-[#CEAE65] to-[#685833] p-[2px] shadow-sm">
								<div className="rounded-[28px] bg-white px-[30px] py-[6px] text-sm font-semibold text-[#CEAE65] sm:text-base">
									Events
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
							{events.map((event) => (
								<EventCard key={event.id} event={event} />
							))}
						</div>

						{events.length === 0 && (
							<p className="py-8 text-center text-sm text-slate-500">
								Belum ada event yang tersedia.
							</p>
						)}

						<div className="mt-12 flex justify-center">
							<div className="inline-flex items-center gap-[10px] rounded-[28px] bg-white px-[30px] py-[6px]">
								<CalendarDays className="size-4 text-[#CEAE65]" />
								<span className="text-sm font-semibold text-[#CEAE65] sm:text-base">
									Calendar
								</span>
							</div>
						</div>

						<div className="mt-8 flex w-full justify-center">
							<CalendarSection events={landingEvents} />
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
