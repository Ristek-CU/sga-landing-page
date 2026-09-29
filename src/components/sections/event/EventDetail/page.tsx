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
	Share2Icon,
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

/** Hitung mundur ke starts_at: hari/jam/menit/detik, update tiap detik. */
function Countdown({ startsAt }: { startsAt: string }) {
	const target = new Date(startsAt).getTime();
	const [now, setNow] = useState(() => Date.now());

	useEffect(() => {
		const timer = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(timer);
	}, []);

	const diff = target - now;
	if (Number.isNaN(target) || diff <= 0) return null;

	const days = Math.floor(diff / 86_400_000);
	const hours = Math.floor((diff % 86_400_000) / 3_600_000);
	const minutes = Math.floor((diff % 3_600_000) / 60_000);
	const seconds = Math.floor((diff % 60_000) / 1000);

	const cells =
		days > 0
			? [
					{ v: days, l: "Hari" },
					{ v: hours, l: "Jam" },
					{ v: minutes, l: "Menit" },
				]
			: [
					{ v: hours, l: "Jam" },
					{ v: minutes, l: "Menit" },
					{ v: seconds, l: "Detik" },
				];

	return (
		<div
			className="flex items-center gap-2"
			aria-label="Countdown menuju event"
		>
			{cells.map((cell) => (
				<div
					key={cell.l}
					className="flex min-w-[52px] flex-col items-center rounded-xl bg-white/10 px-2.5 py-1.5 ring-1 ring-white/15 backdrop-blur-sm"
				>
					<span className="text-lg font-extrabold tabular-nums text-[#F4C95D] sm:text-xl">
						{String(cell.v).padStart(2, "0")}
					</span>
					<span className="text-[10px] font-semibold tracking-wide text-white/60">
						{cell.l}
					</span>
				</div>
			))}
		</div>
	);
}

/** Satu tombol share: Web Share API di mobile, fallback salin link di desktop. */
function ShareButton({ title }: { title: string }) {
	const [copied, setCopied] = useState(false);
	const shareUrl = window.location.href;

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
		} catch {
			// Clipboard API butuh secure context; fallback lama tetap jalan.
			const el = document.createElement("textarea");
			el.value = shareUrl;
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			el.remove();
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleShare = async () => {
		if ("share" in navigator) {
			await navigator.share({ title, url: shareUrl }).catch(() => {});
		} else {
			await copy();
		}
	};

	return (
		<button
			type="button"
			onClick={handleShare}
			className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-extrabold shadow-sm transition active:scale-[0.98] sm:px-8 sm:text-base ${
				copied
					? "bg-green-600 text-white"
					: "border border-[#06455B]/20 bg-white text-[#06455B] hover:bg-gray-50"
			}`}
			aria-label="Bagikan event"
		>
			<Share2Icon className="size-4" />
			{copied ? "Tersalin!" : "Bagikan"}
		</button>
	);
}

/** Skeleton loading — bentuk mirip layout asli, animasi pulse. */
function SkeletonPage() {
	return (
		<div
			className="min-h-screen bg-[#F4F4F4] font-sans text-[#06455B]"
			aria-busy="true"
			aria-label="Memuat event"
		>
			<div className="relative min-h-[360px] bg-[#1B1A24] sm:min-h-[420px]">
				<div className="absolute inset-0 bg-linear-to-b from-black/35 to-[#120F18]/80" />
				<div className="relative z-10 mx-auto flex min-h-[360px] w-full max-w-6xl items-end px-4 pb-9 pt-24 sm:min-h-[420px] sm:px-8 sm:pb-12">
					<div className="w-full animate-pulse space-y-4">
						<div className="h-8 w-28 rounded-full bg-white/10" />
						<div className="h-10 w-3/4 rounded-lg bg-white/10 sm:h-14" />
						<div className="h-10 w-1/2 rounded-lg bg-white/10 sm:h-14" />
					</div>
				</div>
			</div>
			<div className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
				{[0, 1].map((i) => (
					<div
						key={i}
						className="animate-pulse space-y-3 rounded-lg bg-white px-5 py-5 shadow-sm sm:px-7 sm:py-6"
					>
						<div className="h-6 w-40 rounded bg-[#06455B]/10" />
						<div className="h-3 w-full rounded bg-[#06455B]/10" />
						<div className="h-3 w-11/12 rounded bg-[#06455B]/10" />
						<div className="h-3 w-2/3 rounded bg-[#06455B]/10" />
					</div>
				))}
			</div>
		</div>
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
		return <SkeletonPage />;
	}

	if (!event) {
		return <NotFoundEvent message={error ?? undefined} />;
	}

	const heroImage = event.cover_image_url || heroPattern;
	const canRegister =
		event.registration_url && event.registration_open !== false;
	const isUpcoming = event.status === "upcoming";

	return (
		<div className="min-h-screen bg-[#F4F4F4] font-sans text-[#06455B]">
			<motion.header
				initial={initialMotion}
				animate="show"
				variants={fadeUpVariants}
				className="relative flex min-h-[320px] flex-col justify-end overflow-hidden bg-[#1B1A24] bg-cover bg-center pt-28 sm:min-h-[420px]"
				style={{ backgroundImage: `url(${heroImage})` }}
			>
				<div className="absolute inset-0 bg-[#120F18]/75" />
				<div className="absolute inset-0 bg-linear-to-b from-black/35 via-[#261526]/45 to-[#120F18]/80" />

				<div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-8 sm:px-8 sm:pb-12">
					<Link
						to="/events"
						className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-white/20 active:scale-[0.98] sm:text-sm"
					>
						<ArrowLeftIcon className="size-4" />
						Kembali
					</Link>
					<motion.div variants={fadeUpVariants}>
						<StatusBadge status={event.status} />
						<h1 className="mt-3 max-w-4xl text-2xl font-extrabold leading-snug text-[#F4C95D] drop-shadow sm:text-4xl sm:leading-tight lg:text-5xl">
							{event.title}
						</h1>
					</motion.div>

					{isUpcoming && (
						<motion.div variants={fadeUpVariants}>
							<Countdown startsAt={event.starts_at} />
						</motion.div>
					)}

					{/* CTA utama selalu terlihat di hero — tidak perlu scroll dulu */}
					<motion.div
						variants={fadeUpVariants}
						className="flex flex-wrap items-center gap-3"
					>
						{canRegister && (
							<a
								href={event.registration_url ?? undefined}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center justify-center rounded-xl bg-[#F4C95D] px-7 py-3 text-sm font-extrabold text-[#06455B] shadow-md transition hover:bg-[#E4B848] active:scale-[0.98] sm:text-base"
							>
								Daftar Sekarang
							</a>
						)}
						<ShareButton title={event.title} />
					</motion.div>
				</div>
			</motion.header>

			<motion.main
				initial={initialMotion}
				animate="show"
				variants={contentGroupVariants}
				className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-6 sm:gap-5 sm:px-6 sm:py-8"
			>
				{/* Info utama */}
				<motion.section
					variants={fadeUpVariants}
					className="rounded-2xl bg-linear-to-br from-[#06455B] to-[#05708E] px-4 py-5 text-white shadow-sm sm:px-7 sm:py-6"
				>
					<h2 className="text-lg font-extrabold leading-tight sm:text-2xl">
						Tentang Acara
					</h2>
					<p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
						{event.description || "Informasi acara belum tersedia."}
					</p>

					<div className="mt-5 flex flex-col gap-3 text-sm font-semibold text-white/80 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2">
						<div className="flex items-start gap-2">
							<CalendarDaysIcon className="mt-0.5 size-4 shrink-0 text-[#F4C95D]" />
							<span>{formatWibRange(event.starts_at, event.ends_at)}</span>
						</div>
						{event.location && (
							<div className="flex items-start gap-2">
								<MapPinIcon className="mt-0.5 size-4 shrink-0 text-[#F4C95D]" />
								<span>{event.location}</span>
							</div>
						)}
						{event.organizer && (
							<div className="flex items-start gap-2">
								<UserIcon className="mt-0.5 size-4 shrink-0 text-[#F4C95D]" />
								<span>{event.organizer}</span>
							</div>
						)}
					</div>

					{/* Aksi sekunder: lokasi + kalender */}
					<div className="mt-5 flex flex-wrap gap-2.5 border-t border-white/15 pt-4">
						{event.location_url && (
							<a
								href={event.location_url}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white ring-1 ring-white/15 transition hover:bg-white/20 active:scale-[0.98] sm:text-sm"
							>
								<MapPinIcon className="size-3.5" />
								Lihat Lokasi
								<ExternalLinkIcon className="size-3 opacity-60" />
							</a>
						)}
						<a
							href={googleCalendarUrl(event)}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white ring-1 ring-white/15 transition hover:bg-white/20 active:scale-[0.98] sm:text-sm"
						>
							<CalendarDaysIcon className="size-3.5" />
							Simpan ke Google Calendar
						</a>
					</div>
				</motion.section>

				{/* Runsheet sesi */}
				{event.sessions.length > 0 && (
					<motion.section
						variants={fadeUpVariants}
						className="rounded-2xl bg-linear-to-br from-[#06455B] to-[#05708E] px-4 py-5 text-white shadow-sm sm:px-7 sm:py-6"
					>
						<h2 className="mb-4 text-lg font-extrabold leading-tight sm:text-2xl">
							Runsheet
						</h2>
						<ol className="space-y-2.5">
							{event.sessions.map((session) => (
								<li
									key={session.id}
									className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-white/15"
								>
									<div className="flex items-center gap-2 text-xs font-semibold text-white/90 sm:text-sm">
										<ClockIcon className="size-3.5 shrink-0 text-[#F4C95D]" />
										{formatWibRange(session.starts_at, session.ends_at)}
									</div>
									<p className="mt-1.5 text-sm font-bold text-[#F4C95D] sm:text-base">
										{session.name}
									</p>
									{session.speaker && (
										<p className="mt-1 text-xs text-white/70 sm:text-sm">
											Pemateri: {session.speaker}
										</p>
									)}
									{session.description && (
										<p className="mt-1 text-xs leading-relaxed text-white/70 sm:text-sm">
											{session.description}
										</p>
									)}
								</li>
							))}
						</ol>
					</motion.section>
				)}
			</motion.main>

			<Footer />
		</div>
	);
}
