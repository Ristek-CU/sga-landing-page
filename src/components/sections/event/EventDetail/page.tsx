import heroPattern from "@/assets/images/hero-pattern.webp";
import Footer from "@/components/layout/footer";
import {
	type BphEventDetail,
	fetchBphEventDetail,
	formatWibRange,
	googleCalendarUrl,
} from "@/lib/bph-api";
import { type Variants, motion, useReducedMotion } from "framer-motion";
import {
	ArrowLeftIcon,
	CalendarDaysIcon,
	ClockIcon,
	ExternalLinkIcon,
	MapPinIcon,
	UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const statusLabels: Record<BphEventDetail["status"], string> = {
	past: "Selesai",
	ongoing: "On Going",
	upcoming: "Coming Soon",
};

const statusColors: Record<BphEventDetail["status"], string> = {
	past: "bg-[#CEAE65]/20 text-[#F4C95D] ring-[#CEAE65]/40",
	ongoing: "bg-[#EBC05F]/20 text-[#F4C95D] ring-[#EBC05F]/40",
	upcoming: "bg-[#72D5F6]/20 text-[#72D5F6] ring-[#72D5F6]/40",
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

const contentGroupVariants: Variants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.12,
			delayChildren: 0.08,
		},
	},
};

function StatusBadge({ status }: { status: BphEventDetail["status"] }) {
	return (
		<span
			className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold ring-1 ${statusColors[status]}`}
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
						"Event yang kamu buka belum tersedia, draft, atau sudah dipindahkan."}
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
	const { slug } = useParams();
	const shouldReduceMotion = useReducedMotion();
	const initialMotion = shouldReduceMotion ? false : "hidden";

	const [event, setEvent] = useState<BphEventDetail | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!slug) return;
		let alive = true;
		setLoading(true);
		setError(null);
		fetchBphEventDetail(slug)
			.then((data) => alive && setEvent(data))
			.catch((e: Error) => alive && setError(e.message))
			.finally(() => alive && setLoading(false));
		return () => {
			alive = false;
		};
	}, [slug]);

	// Halaman ini di luar AppLayout (tanpa Lenis) — scroll manual ke atas saat
	// ganti event/pindah ke sini.
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [slug]);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-[#F4F4F4] text-sm text-[#06455B]/60">
				Memuat event…
			</div>
		);
	}

	if (!event) {
		return <NotFoundEvent message={error ?? undefined} />;
	}

	const heroImage = event.cover_image_url || heroPattern;
	const canRegister =
		event.registration_url && event.registration_open !== false;

	return (
		<div className="min-h-screen bg-[#F4F4F4] font-sans text-[#06455B]">
			<motion.header
				initial={initialMotion}
				animate="show"
				variants={fadeUpVariants}
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
					<motion.div
						variants={contentGroupVariants}
						className="flex w-full flex-col gap-5"
					>
						<motion.div variants={fadeUpVariants} className="pb-1">
							<StatusBadge status={event.status} />
							<h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-[#F4C95D] drop-shadow sm:text-5xl">
								{event.title}
							</h1>
						</motion.div>
					</motion.div>
				</div>
			</motion.header>

			<motion.main
				initial={initialMotion}
				animate="show"
				variants={contentGroupVariants}
				className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8"
			>
				{/* Info utama */}
				<motion.section
					variants={fadeUpVariants}
					className="rounded-lg bg-linear-to-br from-[#06455B] to-[#05708E] px-5 py-5 text-white shadow-sm sm:px-7 sm:py-6"
				>
					<h2 className="text-xl font-extrabold leading-tight sm:text-2xl">
						Tentang Acara
					</h2>
					<p className="mt-3 text-xs leading-relaxed text-white/85 sm:text-sm">
						{event.description || "Informasi acara belum tersedia."}
					</p>

					<div className="mt-4 flex flex-col gap-2 text-sm font-semibold text-white/80 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
						<div className="flex items-center gap-2">
							<CalendarDaysIcon className="size-4 shrink-0 text-[#F4C95D]" />
							<span>{formatWibRange(event.starts_at, event.ends_at)}</span>
						</div>
						{event.location && (
							<div className="flex items-center gap-2">
								<MapPinIcon className="size-4 shrink-0 text-[#F4C95D]" />
								<span>{event.location}</span>
							</div>
						)}
						{event.organizer && (
							<div className="flex items-center gap-2">
								<UserIcon className="size-4 shrink-0 text-[#F4C95D]" />
								<span>{event.organizer}</span>
							</div>
						)}
					</div>
				</motion.section>

				{/* Runsheet sesi */}
				{event.sessions.length > 0 && (
					<motion.section
						variants={fadeUpVariants}
						className="rounded-lg bg-linear-to-br from-[#06455B] to-[#05708E] px-5 py-5 text-white shadow-sm sm:px-7 sm:py-6"
					>
						<h2 className="mb-4 text-xl font-extrabold leading-tight sm:text-2xl">
							Runsheet
						</h2>
						<ol className="space-y-2">
							{event.sessions.map((session) => (
								<li
									key={session.id}
									className="rounded-lg bg-white/10 px-4 py-2.5 backdrop-blur-sm transition-colors hover:bg-white/15"
								>
									<div className="flex items-center gap-2 text-sm font-semibold text-white/90">
										<ClockIcon className="size-3.5 shrink-0 text-[#F4C95D]" />
										{formatWibRange(session.starts_at, session.ends_at)}
									</div>
									<p className="mt-1 text-sm font-bold text-[#F4C95D]">
										{session.name}
									</p>
									{session.speaker && (
										<p className="mt-0.5 text-xs text-white/70">
											Pemateri: {session.speaker}
										</p>
									)}
									{session.description && (
										<p className="mt-1 text-xs leading-relaxed text-white/70">
											{session.description}
										</p>
									)}
								</li>
							))}
						</ol>
					</motion.section>
				)}

				{/* Aksi */}
				<motion.div variants={fadeUpVariants} className="flex flex-wrap gap-3">
					{canRegister ? (
						<a
							href={event.registration_url ?? undefined}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center justify-center rounded-lg bg-[#F4C95D] px-8 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#E4B848] sm:text-base"
						>
							Daftar
						</a>
					) : event.registration_url && !event.registration_open ? (
						<p className="inline-flex items-center text-sm font-semibold text-[#06455B]/70">
							Pendaftaran ditutup.
						</p>
					) : null}

					{event.location_url && (
						<a
							href={event.location_url}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 rounded-lg border border-[#06455B]/20 bg-white px-6 py-3 text-sm font-extrabold text-[#06455B] shadow-sm transition hover:bg-gray-50 sm:text-base"
						>
							<MapPinIcon className="size-4" />
							Lihat Lokasi
							<ExternalLinkIcon className="size-3.5 opacity-60" />
						</a>
					)}

					<a
						href={googleCalendarUrl(event)}
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-lg border border-[#06455B]/20 bg-white px-6 py-3 text-sm font-extrabold text-[#06455B] shadow-sm transition hover:bg-gray-50 sm:text-base"
					>
						<CalendarDaysIcon className="size-4" />
						Google Calendar
					</a>
				</motion.div>
			</motion.main>

			<Footer />
		</div>
	);
}
