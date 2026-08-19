import { gsap } from "gsap";
import {
	Fragment,
	useEffect,
	useRef,
	useState,
} from "react";

import ukmPageContent from "@/lib/data/ukm-page-content.json";
import { cn } from "@/lib/utils";
import { parseHighlightText } from "@/lib/ukm-utils";

interface HeroData {
	tagline?: string;
	title?: string;
	highlightText?: string;
	description?: string;
	ctaText?: string;
	ctaLink?: string;
	images?: string[];
	imageBgColors?: string[];
}

export default function HeroSection() {
	// Static import, no fetch; keep loading-free render.
	const [data] = useState<HeroData>(ukmPageContent.hero);
	const containerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				".gsap-hero-text",
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.12,
					ease: "power3.out",
					clearProps: "all",
				},
			);

			gsap.fromTo(
				".gsap-hero-img",
				{ scale: 0.7, opacity: 0 },
				{
					scale: 1,
					opacity: 1,
					duration: 0.9,
					stagger: 0.1,
					ease: "back.out(1.2)",
					delay: 0.2,
					clearProps: "all",
				},
			);

			gsap.to(".gsap-circle-rotate-1", {
				rotation: 360,
				transformOrigin: "49% 51%",
				duration: 45,
				repeat: -1,
				ease: "none",
			});
			gsap.to(".gsap-circle-rotate-2", {
				rotation: -360,
				transformOrigin: "51% 49%",
				duration: 60,
				repeat: -1,
				ease: "none",
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	const tagline = data?.tagline || "Halo Cakranians!";
	const titleText =
		data?.title || "Temukan UKM yang\nSesuai dengan\nMinatmu.";
	const highlight = data?.highlightText || "UKM";
	const description =
		data?.description ||
		"Jelajahi berbagai UKM resmi Universitas Cakrawala, pelajari setiap kegiatannya, dan temukan komunitas yang mendukung perkembanganmu selama berkuliah.";
	const ctaText = data?.ctaText || "Jelajahi UKM";
	const ctaLink = data?.ctaLink || "#eksplorasi";

	const images = data?.images || [];
	const bgColors = data?.imageBgColors || [];

	const renderTitle = () =>
		titleText.split("\n").map((line, index, arr) => {
			const tokens = parseHighlightText(line, highlight);
			return (
				<Fragment key={index}>
					{tokens.map((token, i) =>
						token.isHighlight ? (
							<span key={i} className="text-[#D49D3A]">
								{token.text}
							</span>
						) : (
							token.text
						),
					)}
					{index < arr.length - 1 && <br />}
				</Fragment>
			);
		});

	const hoverCardClass = cn(
		"group cursor-pointer w-full overflow-hidden shadow-xl rounded-[53.807px]",
		"transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#D49D3A]/25",
	);

	const imgClass =
		"w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110";

	return (
		<section
			ref={containerRef}
			className={cn(
				"relative flex items-center overflow-hidden",
				"pt-20 pb-12 lg:pt-[90px] lg:pb-16 lg:min-h-screen",
				"bg-[#07323e] text-white",
			)}
		>
			{/* BACKGROUND DECORATION */}
			<div
				className={cn(
					"absolute pointer-events-none z-[0] flex items-center justify-center",
					"-bottom-[240px] -right-[240px] w-[700px] h-[700px]",
					"sm:-bottom-[280px] sm:-right-[280px] sm:w-[840px] sm:h-[840px]",
					"lg:-bottom-[330px] lg:-right-[330px] lg:w-[960px] lg:h-[960px]",
				)}
			>
				<svg
					className="gsap-circle-rotate-1 absolute w-full h-full opacity-70"
					viewBox="0 0 960 960"
					fill="none"
				>
					<circle cx="480" cy="480" r="478" stroke="#D49D3A" strokeWidth="2" />
				</svg>
				<svg
					className="gsap-circle-rotate-2 absolute w-[62%] h-[62%] opacity-70"
					viewBox="0 0 560 560"
					fill="none"
				>
					<circle cx="280" cy="280" r="278" stroke="#D49D3A" strokeWidth="2" />
				</svg>
			</div>

			{/* CONTAINER */}
			<div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 relative z-[2]">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
					{/* LEFT COLUMN */}
					<div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-5 z-[2]">
						<span className="gsap-hero-text text-xs sm:text-sm font-medium text-white/90 tracking-wide">
							{tagline}
						</span>

						<h1
							className={cn(
								"gsap-hero-text w-full self-stretch tracking-tight text-white",
								"font-extrabold",
								"text-2xl leading-tight sm:text-3xl lg:text-[48px] lg:leading-[64px]",
							)}
						>
							{renderTitle()}
						</h1>

						<p className="gsap-hero-text text-xs sm:text-sm text-white/75 leading-relaxed max-w-[440px]">
							{description}
						</p>

						<div className="gsap-hero-text my-1">
							<a
								href={ctaLink}
								className={cn(
									"inline-flex items-center justify-center rounded-xl shadow-md transition-all duration-200",
									"px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold bg-[#D49D3A] text-[#08333e]",
									"hover:bg-[#c38e2e] active:scale-95",
								)}
							>
								{ctaText}
							</a>
						</div>

						{/* BADGES */}
						<div className="gsap-hero-text flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-5 mt-2 sm:mt-4">
							{[
								{ icon: "/Comments.svg", text: "Komunitas\nAktif" },
								{ icon: "/Week Schedule.svg", text: "Event\nMenarik" },
								{ icon: "/Post.svg", text: "Informasi\nTerpusat" },
							].map((badge, idx) => (
								<div key={idx} className="flex items-center gap-2.5">
									<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
										<img
											src={badge.icon}
											alt={badge.text.replace("\n", " ")}
											className="w-5 h-5 object-contain"
										/>
									</div>
									<span className="text-[11px] sm:text-xs font-semibold text-white/90 text-left leading-tight whitespace-pre-line">
										{badge.text}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* RIGHT COLUMN: FOTO COLLAGE */}
					<div className="hidden lg:flex lg:col-span-7 relative w-full items-center justify-end mt-0 py-4">
						<div className="relative z-[1] flex justify-end items-start gap-4 w-full max-w-[540px] ml-auto">
							<div className="w-1/3 flex flex-col gap-4">
								<div className="gsap-hero-img w-full">
									<div className={cn(hoverCardClass, "aspect-[161/342]")} style={{ backgroundColor: bgColors[0] }}>
										<img src={images[0]} alt="Member 1" className={imgClass} />
									</div>
								</div>
								<div className="gsap-hero-img w-full">
									<div className={cn(hoverCardClass, "aspect-square")} style={{ backgroundColor: bgColors[1] }}>
										<img src={images[1]} alt="Member 2" className={imgClass} />
									</div>
								</div>
							</div>

							<div className="w-1/3 flex flex-col gap-4 pt-10">
								<div className="gsap-hero-img w-full">
									<div className={cn(hoverCardClass, "aspect-square")} style={{ backgroundColor: bgColors[2] }}>
										<img src={images[2]} alt="Member 3" className={imgClass} />
									</div>
								</div>
								<div className="gsap-hero-img w-full">
									<div className={cn(hoverCardClass, "aspect-[161/342]")} style={{ backgroundColor: bgColors[3] }}>
										<img src={images[3]} alt="Member 4" className={imgClass} />
									</div>
								</div>
							</div>

							<div className="w-1/3 flex flex-col justify-center pt-6">
								<div className="gsap-hero-img w-full">
									<div className={cn(hoverCardClass, "aspect-[161/342]")} style={{ backgroundColor: bgColors[4] }}>
										<img src={images[4]} alt="Member 5" className={imgClass} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}