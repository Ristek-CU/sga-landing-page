import Footer from "@/components/layout/footer";
import eventsData from "@/lib/data/events.json";
import {
	ArrowLeftIcon,
	CalendarDaysIcon,
	MapPinIcon,
} from "lucide-react";
import { Link, useParams } from "react-router";

type EventStatus = "completed" | "ongoing" | "coming_soon";

interface EventDetailItem {
	id: string;
	title: string;
	status: EventStatus;
	description: string;
	aboutTitle: string;
	about: string;
	imageUrl: string;
	heroImageUrl?: string;
	logoUrl?: string;
	date: string;
	location: string;
	organizer: string;
	registrationUrl?: string;
	timeline: string[];
}

const events = eventsData as EventDetailItem[];

const statusLabel: Record<EventStatus, string> = {
	completed: "Completed",
	ongoing: "On Going",
	coming_soon: "Coming Soon",
};

function getEventYear(date: string) {
	const match = date.match(/\d{4}/);
	return match ? match[0] : "";
}

function StatusBadge({ status }: { status: EventStatus }) {
	const color =
		status === "completed"
			? "bg-[#CEAE65]/20 text-[#F4C95D] ring-[#CEAE65]/40"
			: status === "ongoing"
				? "bg-[#EBC05F]/20 text-[#F4C95D] ring-[#EBC05F]/40"
				: "bg-[#72D5F6]/20 text-[#72D5F6] ring-[#72D5F6]/40";

	return (
		<span
			className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold ring-1 ${color}`}
		>
			{statusLabel[status]}
		</span>
	);
}

function TimelineItem({ index, label }: { index: number; label: string }) {
	return (
		<li className="flex min-h-[62px] items-center gap-6 rounded-full bg-white px-5 py-3 text-[#06455B] shadow-sm sm:min-h-[72px] sm:px-7">
			<span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F4C95D] text-lg font-bold text-[#06455B] sm:size-14">
				{index}
			</span>
			<span className="text-base font-bold leading-snug sm:text-lg">{label}</span>
		</li>
	);
}

function NotFoundEvent() {
	return (
		<div className="min-h-screen bg-[#F4F4F4] text-[#06455B]">
			<main className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 text-center">
				<h1 className="text-3xl font-bold sm:text-5xl">Event tidak ditemukan</h1>
				<p className="mt-4 max-w-xl text-sm leading-relaxed text-[#06455B]/70 sm:text-base">
					Event yang kamu buka belum tersedia atau sudah dipindahkan.
				</p>
				<Link
					to="/events"
					className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#06455B] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#05384A]"
				>
					<ArrowLeftIcon className="size-4" />
					Kembali ke Event
				</Link>
			</main>
			<Footer />
		</div>
	);
}

export default function EventDetailPage() {
	const { id } = useParams();
	const event = events.find((item) => item.id === id);

	if (!event) {
		return <NotFoundEvent />;
	}

	const year = getEventYear(event.date);
	const heroImage = event.heroImageUrl || event.imageUrl;

	return (
		<div className="min-h-screen bg-[#F4F4F4] font-sans text-[#06455B]">
			<header
				className="relative min-h-[360px] overflow-hidden bg-[#1B1A24] bg-cover bg-center sm:min-h-[420px]"
				style={{ backgroundImage: `url(${heroImage})` }}
			>
				<div className="absolute inset-0 bg-[#120F18]/75" />
				<div className="absolute inset-0 bg-linear-to-b from-black/35 via-[#261526]/45 to-[#120F18]/80" />

				<Link
					to="/events"
					className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full bg-[#06455B]/90 px-4 py-2 text-sm font-bold text-[#20BEE4] shadow-lg ring-1 ring-white/10 backdrop-blur transition hover:bg-[#07556D] sm:left-8 sm:top-7 sm:text-base"
				>
					<ArrowLeftIcon className="size-5" />
					Kembali
				</Link>

				<div className="relative z-10 mx-auto flex min-h-[360px] w-full max-w-6xl items-end px-6 pb-9 pt-24 sm:min-h-[420px] sm:px-8 sm:pb-12">
					<div className="flex w-full flex-col gap-5 sm:flex-row sm:items-end sm:gap-7">
						<div className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-[24px] bg-white p-3 shadow-2xl sm:size-36">
							<img
								src={event.logoUrl || event.imageUrl}
								alt={`${event.title} logo`}
								className="h-full w-full rounded-[18px] object-contain"
							/>
						</div>

						<div className="pb-1">
							<StatusBadge status={event.status} />
							<h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight text-[#F4C95D] drop-shadow sm:text-6xl">
								{event.title}
							</h1>
							<p className="mt-2 text-base font-medium text-white/85 sm:text-xl">
								{event.organizer}
							</p>
						</div>
					</div>
				</div>
			</header>

			<nav className="bg-white shadow-sm">
				<div className="mx-auto max-w-6xl px-6 sm:px-8">
					<div className="inline-flex border-b-[3px] border-[#06455B] px-4 py-6 text-xl font-bold text-[#06455B] sm:px-5">
						Tentang Acara
					</div>
				</div>
			</nav>

			<main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-9 sm:px-8 sm:py-12">
				<section className="rounded-[10px] bg-linear-to-br from-[#06455B] to-[#05708E] px-8 py-8 text-white shadow-sm sm:px-12 sm:py-10">
					<h2 className="text-3xl font-extrabold leading-tight sm:text-5xl">
						{event.aboutTitle}
					</h2>
					<p className="mt-5 max-w-5xl text-base leading-relaxed text-white/85 sm:text-lg">
						{event.about}
					</p>
				</section>

				<section className="rounded-[10px] bg-linear-to-br from-[#06455B] to-[#05708E] px-5 py-8 text-white shadow-sm sm:px-7 sm:py-10">
					<h2 className="px-2 text-3xl font-extrabold sm:px-4 sm:text-5xl">
						Timeline
					</h2>
					<ol className="mt-8 flex flex-col gap-6">
						{event.timeline.map((item, index) => (
							<TimelineItem key={item} index={index + 1} label={item} />
						))}
					</ol>
				</section>

				<section className="rounded-[10px] bg-linear-to-br from-[#06455B] to-[#05708E] px-8 py-8 text-white shadow-sm sm:px-12 sm:py-10">
					<h2 className="text-3xl font-extrabold leading-tight sm:text-5xl">
						{event.title}
						{year ? ` ${year}` : ""}
					</h2>
					<p className="mt-5 max-w-5xl text-base leading-relaxed text-white/85 sm:text-lg">
						{event.description}
					</p>

					<div className="mt-7 flex flex-col gap-4 text-lg font-semibold text-white/80 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 sm:text-2xl">
						<div className="flex items-center gap-3">
							<CalendarDaysIcon className="size-6 shrink-0 text-[#F4C95D]" />
							<span>{event.date}</span>
						</div>
						<span className="hidden text-white/70 sm:block">•</span>
						<div className="flex items-center gap-3">
							<MapPinIcon className="size-6 shrink-0 text-[#F4C95D]" />
							<span>{event.location}</span>
						</div>
					</div>
				</section>

				<div>
					<a
						href={event.registrationUrl || "#"}
						target="_blank"
						rel="noreferrer"
						className="inline-flex min-w-[260px] items-center justify-center rounded-[10px] bg-[#F4C95D] px-10 py-4 text-xl font-extrabold text-white shadow-sm transition hover:bg-[#E4B848] sm:text-2xl"
					>
						Register
					</a>
				</div>
			</main>

			<Footer />
		</div>
	);
}
