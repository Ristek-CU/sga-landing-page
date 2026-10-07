import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

import sgaLogo from "@/assets/images/Logomark.webp";
import heroPattern from "@/assets/images/hero-pattern.webp";

export default function EventSection() {
	return (
		<section
			id="event"
			aria-labelledby="event-section-heading"
			className="scroll-mt-24 bg-[#F8F9FA] px-4 py-12 sm:px-6 sm:py-16"
		>
			<div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
				<p className="mb-5 text-sm font-semibold text-[#80631D] sm:text-base">
					Event &amp; Kegiatan
				</p>
				<h2
					id="event-section-heading"
					className="text-balance text-2xl font-semibold leading-snug text-[#093B4C] sm:text-4xl"
				>
					An experience beyond the ordinary. Be part of something truly
					<span className="mt-1 block font-italianno text-6xl font-normal leading-none text-[#9A701C] sm:text-7xl">
						remarkable
					</span>
				</h2>
			</div>

			<div className="mx-auto grid w-full max-w-4xl overflow-hidden rounded-2xl bg-[#06455B] text-white shadow-lg sm:grid-cols-[minmax(0,1fr)_10rem] lg:grid-cols-[minmax(0,1fr)_12rem]">
				<div
					className="min-w-0 bg-cover bg-center p-6 sm:p-8 lg:p-10"
					style={{
						backgroundImage: `linear-gradient(90deg, #06455Bee, #06455Bcc), url(${heroPattern})`,
					}}
				>
					<h3 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
						Eksplorasi <span className="text-[#EEBA41]">Event</span>
					</h3>
					<p className="mt-3 max-w-sm text-base font-semibold leading-relaxed text-[#F0D899] sm:text-lg">
						Student Government Association
					</p>
					<p className="mt-1 text-sm leading-relaxed text-white/90 sm:text-base">
						Cakrawala University
					</p>
					<Link
						to="/events"
						className="mt-6 inline-flex min-h-12 w-full items-center justify-between gap-4 rounded-xl bg-[#EEBA41] px-5 py-3 text-sm font-bold text-[#06455B] transition-colors hover:bg-[#F0C65D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:gap-8 sm:text-base"
					>
						Jelajahi acara
						<ArrowUpRight aria-hidden="true" className="size-5 shrink-0" />
					</Link>
				</div>

				<div className="relative flex items-center justify-center gap-3 border-t-2 border-dashed border-white/30 px-6 py-5 sm:flex-col sm:gap-4 sm:border-l-2 sm:border-t-0 sm:p-6">
					<span
						aria-hidden="true"
						className="absolute -left-3 -top-3 size-6 rounded-full bg-[#F8F9FA]"
					/>
					<span
						aria-hidden="true"
						className="absolute -right-3 -top-3 size-6 rounded-full bg-[#F8F9FA] sm:-bottom-3 sm:-left-3 sm:right-auto sm:top-auto"
					/>
					<img
						src={sgaLogo}
						alt="SGA"
						width={48}
						height={48}
						loading="lazy"
						className="size-10 object-contain sm:size-12"
					/>
					<p className="text-sm font-semibold tracking-wide text-[#F0D899] sm:text-center">
						Event &amp; Kegiatan
					</p>
				</div>
			</div>
		</section>
	);
}
