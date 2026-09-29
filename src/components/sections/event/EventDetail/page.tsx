import heroPattern from "@/assets/images/hero-pattern.webp";
import Footer from "@/components/layout/footer";
import eventsData from "@/lib/data/events.json";
import { type Variants, motion, useReducedMotion } from "framer-motion";
import { ArrowLeftIcon, CalendarDaysIcon, MapPinIcon } from "lucide-react";
import { Link, useParams } from "react-router";

type EventJsonItem = (typeof eventsData)[number];

const statusLabels: Record<string, string> = {
	completed: "Completed",
	ongoing: "On Going",
	coming_soon: "Coming Soon",
};

const motionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUpVariants: Variants = {
	hidden: { opacity: 0, y: 28 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.55, ease: motionEase },
	},
};

const fadeInVariants: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { duration: 0.65, ease: motionEase },
	},
};

const contentGroupVariants: Variants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.12,
			delayChildren: 0.08,
		},
	},
};

function StatusBadge({ status }: { status: string }) {
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
			{statusLabels[status] ?? status}
		</span>
	);
}

function NotFoundEvent({ message }: { message?: string }) {
	return (
		<div className="min-h-screen bg-[#F4F4F4] text-[#06455B]">
			<main className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6 text-center">
				<h1 className="text-3xl font-bold sm:text-5xl">
					Event tidak ditemukan
				</h1>
				<p className="mt-4 max-w-xl text-sm leading-relaxed text-[#06455B]/70 sm:text-base">
					{message ||
						"Event yang kamu buka belum tersedia atau sudah dipindahkan."}
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
	const shouldReduceMotion = useReducedMotion();

	const event: EventJsonItem | undefined = eventsData.find(
		(item) => item.id === id,
	);

	if (!event) {
		return <NotFoundEvent />;
	}

	const heroImage = event.heroImageUrl || event.imageUrl || heroPattern;
	const logoImage = event.logoUrl || event.imageUrl || heroPattern;
	const initialMotion = shouldReduceMotion ? false : "hidden";

	return (
		<div className="min-h-screen bg-[#F4F4F4] font-sans text-[#06455B]">
			<motion.header
				initial={initialMotion}
				animate="show"
				variants={fadeInVariants}
				className="relative min-h-[360px] overflow-hidden bg-[#1B1A24] bg-cover bg-center sm:min-h-[420px]"
				style={{ backgroundImage: `url(${heroImage})` }}
			>
				<div className="absolute inset-0 bg-[#120F18]/75" />
				<div className="absolute inset-0 bg-linear-to-b from-black/35 via-[#261526]/45 to-[#120F18]/80" />

				<motion.div variants={fadeUpVariants}>
					<Link
						to="/events"
						className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full bg-[#06455B]/90 px-4 py-2 text-sm font-bold text-[#20BEE4] shadow-lg ring-1 ring-white/10 backdrop-blur transition hover:bg-[#07556D] sm:left-8 sm:top-7 sm:text-base"
					>
						<ArrowLeftIcon className="size-5" />
						Kembali
					</Link>
				</motion.div>

				<div className="relative z-10 mx-auto flex min-h-[360px] w-full max-w-6xl items-end px-6 pb-9 pt-24 sm:min-h-[420px] sm:px-8 sm:pb-12">
					<motion.div
						variants={contentGroupVariants}
						className="flex w-full flex-col gap-5 sm:flex-row sm:items-end sm:gap-7"
					>
						<motion.div
							variants={fadeUpVariants}
							className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-[24px] bg-white p-3 shadow-2xl sm:size-36"
						>
							<img
								src={logoImage}
								alt={event.title}
								className="h-full w-full rounded-[18px] object-cover"
							/>
						</motion.div>

						<motion.div variants={fadeUpVariants} className="pb-1">
							<StatusBadge status={event.status} />
							<h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight text-[#F4C95D] drop-shadow sm:text-6xl">
								{event.title}
							</h1>
						</motion.div>
					</motion.div>
				</div>
			</motion.header>

			<motion.nav
				initial={initialMotion}
				animate="show"
				variants={fadeUpVariants}
				className="bg-white shadow-sm"
			>
				<div className="mx-auto max-w-6xl px-6 sm:px-8">
					<div className="inline-flex border-b-[3px] border-[#06455B] px-4 py-6 text-xl font-bold text-[#06455B] sm:px-5">
						Tentang Acara
					</div>
				</div>
			</motion.nav>

			<motion.main
				initial={initialMotion}
				animate="show"
				variants={contentGroupVariants}
				className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8"
			>
				{/* About Section */}
				<motion.section
					variants={fadeUpVariants}
					className="rounded-lg bg-linear-to-br from-[#06455B] to-[#05708E] px-5 py-5 text-white shadow-sm sm:px-7 sm:py-6"
				>
					<h2 className="text-xl font-extrabold leading-tight sm:text-2xl">
						{event.aboutTitle || "Tentang Acara"}
					</h2>
					<p className="mt-3 text-xs leading-relaxed text-white/85 sm:text-sm">
						{event.about ||
							event.description ||
							"Informasi acara belum tersedia."}
					</p>
				</motion.section>

				{/* Timeline Section */}
				{event.timeline && event.timeline.length > 0 && (
					<motion.section
						variants={fadeUpVariants}
						className="rounded-lg bg-linear-to-br from-[#06455B] to-[#05708E] px-5 py-5 text-white shadow-sm sm:px-7 sm:py-6"
					>
						<h2 className="mb-4 text-xl font-extrabold leading-tight sm:text-2xl">
							Timeline
						</h2>
						<ol className="space-y-2">
							{event.timeline.map((step, index) => (
								<li
									key={index}
									className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-2.5 backdrop-blur-sm transition-colors hover:bg-white/15"
								>
									<span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#CEAE65] text-xs font-bold text-[#06455B]">
										{index + 1}
									</span>
									<span className="text-sm font-medium text-white/90">
										{step}
									</span>
								</li>
							))}
						</ol>
					</motion.section>
				)}

				{/* Event Info Section */}
				<motion.section
					variants={fadeUpVariants}
					className="rounded-lg bg-linear-to-br from-[#06455B] to-[#05708E] px-5 py-5 text-white shadow-sm sm:px-7 sm:py-6"
				>
					<h2 className="text-xl font-extrabold leading-tight sm:text-2xl">
						{event.title}
					</h2>

					<p className="mt-2 text-xs leading-relaxed text-white/70 sm:text-sm">
						{event.description || "Informasi acara belum tersedia."}
					</p>

					<div className="mt-4 flex flex-col gap-2 text-sm font-semibold text-white/80 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
						<div className="flex items-center gap-2">
							<CalendarDaysIcon className="size-4 shrink-0 text-[#F4C95D]" />
							<span>{event.date}</span>
						</div>
						{event.location && (
							<>
								<span className="hidden text-white/50 sm:block">&bull;</span>
								<div className="flex items-center gap-2">
									<MapPinIcon className="size-4 shrink-0 text-[#F4C95D]" />
									<span>{event.location}</span>
								</div>
							</>
						)}
					</div>

					{event.organizer && (
						<p className="mt-3 text-xs text-white/50">
							Diselenggarakan oleh:{" "}
							<span className="font-semibold text-white/70">
								{event.organizer}
							</span>
						</p>
					)}
				</motion.section>

				{/* Registration Button */}
				<motion.div variants={fadeUpVariants}>
					{event.registrationUrl &&
					event.registrationUrl.toLowerCase() !== "none" ? (
						<a
							href={event.registrationUrl}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center justify-center rounded-lg bg-[#F4C95D] px-8 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#E4B848] sm:text-base"
						>
							Register
						</a>
					) : (
						<p className="text-sm font-semibold text-[#06455B]/70">
							Informasi pendaftaran belum tersedia.
						</p>
					)}
				</motion.div>
			</motion.main>

			<Footer />
		</div>
	);
}
