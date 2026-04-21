import { ClockIcon, FlagIcon, ArrowRightIcon } from "lucide-react";
import Button from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";

export default function EventSection() {
	const [emblaRef] = useEmblaCarousel({ loop: false, dragFree: true });

	const carouselSlides = [
		// Card 1: Cakrawala Festival 2026
		<div
			key="event-1"
			className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full pointer-events-none"
			style={{
				background: "linear-gradient(180deg, #063A4C 0%, #0A5C75 100%)",
			}}
		>
			<div className="flex justify-center mb-1">
				<div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] bg-[#FCDD96]/15 backdrop-blur-md shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.15)] text-[18px] min-w-[160px]">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="url(#ongoing-gradient)"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<defs>
							<linearGradient
								id="ongoing-gradient"
								x1="0"
								y1="0"
								x2="1"
								y2="0"
							>
								<stop offset="0%" stopColor="#FCDD96" />
								<stop offset="100%" stopColor="#EBC05F" />
							</linearGradient>
						</defs>
						<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
					</svg>
					<span
						style={{
							background:
								"linear-gradient(90deg, #FCDD96 0%, #EBC05F 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							fontWeight: 600,
						}}
					>
						On Going
					</span>
				</div>
			</div>

			<div className="flex-1 flex flex-col">
				<div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
					<h3
						className="font-normal uppercase text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
						style={{
							color: "#EBC05F",
							textShadow: "0px 4px 4px rgba(0, 0, 0, 0.50)",
							fontFamily: '"Pink and Crimson", sans-serif',
						}}
					>
						CAKRAWALA FESTIVAL 2026
					</h3>
				</div>

				<p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
					Lorem ipsum dolor sit amet consectetur. Lectus amet
					congue mauris ut. Sit non in sed tristique. Tempus
					faucibus enim nulla lorem bibendum in cursus.
				</p>
			</div>

			<div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
				<div className="flex items-center gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clipRule="evenodd"
						/>
					</svg>
					<span>15 Desember 2006</span>
				</div>
				<div className="flex items-start gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Cakrawala University, Kampus Kemang</span>
				</div>
			</div>

			<Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#CEAE65] bg-[#CEAE65] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
				Join Now!
			</Button>

			<div className="flex justify-center items-center gap-2.5 mt-4">
				<div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
			</div>
		</div>,

		// Card 2: Cakrawala Arena 2026
		<div
			key="event-2"
			className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full pointer-events-none"
			style={{
				background: "linear-gradient(180deg, #063A4C 0%, #0A5C75 100%)",
			}}
		>
			<div className="flex justify-center mb-1">
				<div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] bg-[#89d4e5]/20 backdrop-blur-md shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.15)] text-[18px] min-w-[160px]">
					<ClockIcon
						className="w-6 h-6 text-[#89d4e5]"
						strokeWidth={2.5}
					/>
					<span className="text-[#89d4e5] font-semibold">
						Coming Soon
					</span>
				</div>
			</div>

			<div className="flex-1 flex flex-col">
				<div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
					<h3
						className="font-semibold text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
						style={{
							color: "#F4F4F4",
							textShadow: "0px 4px 4px rgba(0, 0, 0, 0.50)",
							fontFamily: '"Plus Jakarta Sans", sans-serif',
						}}
					>
						Cakrawala Arena 2026
					</h3>
				</div>

				<p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
					Lorem ipsum dolor sit amet consectetur. Lectus amet
					congue mauris ut. Sit non in sed tristique. Tempus
					faucibus enim nulla lorem bibendum in cursus.
				</p>
			</div>

			<div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
				<div className="flex items-center gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clipRule="evenodd"
						/>
					</svg>
					<span>15 Desember 2006</span>
				</div>
				<div className="flex items-start gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Cakrawala University, Kampus Kemang</span>
				</div>
			</div>

			<Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#A3A077] bg-[#A3A077] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
				Coming Soon
			</Button>

			<div className="flex justify-center items-center gap-2.5 mt-4">
				<div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
			</div>
		</div>,

		// Card 3: Hackatown Fest 2026
		<div
			key="event-3"
			className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full pointer-events-none"
			style={{
				background: "linear-gradient(180deg, #063A4C 0%, #0A5C75 100%)",
			}}
		>
			<div className="flex justify-center mb-1">
				<div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] bg-[#EE6C6C]/20 backdrop-blur-md shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.15)] text-[18px] min-w-[160px]">
					<FlagIcon
						className="w-6 h-6 text-[#EE6C6C]"
						strokeWidth={2.5}
					/>
					<span className="text-[#EE6C6C] font-semibold">
						Concluded
					</span>
				</div>
			</div>

			<div className="flex-1 flex flex-col">
				<div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
					<h3
						className="font-normal uppercase text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
						style={{
							color: "#CC68FA",
							textShadow:
								"-1px -1px 0 #3F2A48, 1px -1px 0 #3F2A48, -1px 1px 0 #3F2A48, 1px 1px 0 #3F2A48, -2px 0 0 #3F2A48, 2px 0 0 #3F2A48, 0 -2px 0 #3F2A48, 0 2px 0 #3F2A48, 0px 4px 4px rgba(0, 0, 0, 0.50)",
							fontFamily: '"Planet Kosmos", sans-serif',
							letterSpacing: "4px",
						}}
					>
						HACKATOWN FEST 2026
					</h3>
				</div>

				<p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
					Lorem ipsum dolor sit amet consectetur. Lectus amet
					congue mauris ut. Sit non in sed tristique. Tempus
					faucibus enim nulla lorem bibendum in cursus.
				</p>
			</div>

			<div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
				<div className="flex items-center gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clipRule="evenodd"
						/>
					</svg>
					<span>15 Desember 2006</span>
				</div>
				<div className="flex items-start gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Cakrawala University, Kampus Kemang</span>
				</div>
			</div>

			<Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#82886E] bg-[#82886E] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
				Closed
			</Button>

			<div className="flex justify-center items-center gap-2.5 mt-4">
				<div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
			</div>
		</div>,

		// Card 4: Cakrawala Leadership Camp 2026 (Copy of Card 2 style)
		<div
			key="event-4"
			className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full pointer-events-none"
			style={{
				background: "linear-gradient(180deg, #063A4C 0%, #0A5C75 100%)",
			}}
		>
			<div className="flex justify-center mb-1">
				<div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] bg-[#89d4e5]/20 backdrop-blur-md shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.15)] text-[18px] min-w-[160px]">
					<ClockIcon
						className="w-6 h-6 text-[#89d4e5]"
						strokeWidth={2.5}
					/>
					<span className="text-[#89d4e5] font-semibold">
						Coming Soon
					</span>
				</div>
			</div>

			<div className="flex-1 flex flex-col">
				<div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
					<h3
						className="font-semibold text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
						style={{
							color: "#F4F4F4",
							textShadow: "0px 4px 4px rgba(0, 0, 0, 0.50)",
							fontFamily: '"Plus Jakarta Sans", sans-serif',
						}}
					>
						Cakrawala Camp 2026
					</h3>
				</div>

				<p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
					Lorem ipsum dolor sit amet consectetur. Lectus amet
					congue mauris ut. Sit non in sed tristique. Tempus
					faucibus enim nulla lorem bibendum in.
				</p>
			</div>

			<div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
				<div className="flex items-center gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clipRule="evenodd"
						/>
					</svg>
					<span>15 Desember 2006</span>
				</div>
				<div className="flex items-start gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Cakrawala University, Kampus Kemang</span>
				</div>
			</div>

			<Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#A3A077] bg-[#A3A077] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
				Coming Soon
			</Button>

			<div className="flex justify-center items-center gap-2.5 mt-4">
				<div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
			</div>
		</div>,

		// Card 5: Cakrawala Fair 2026 (Copy of Card 1 style)
		<div
			key="event-5"
			className="rounded-[20px] p-6 flex flex-col gap-4 text-left shadow-lg overflow-hidden h-full w-full pointer-events-none"
			style={{
				background: "linear-gradient(180deg, #063A4C 0%, #0A5C75 100%)",
			}}
		>
			<div className="flex justify-center mb-1">
				<div className="inline-flex justify-center items-center gap-2 px-6 py-2.5 rounded-[30px] bg-[#FCDD96]/15 backdrop-blur-md shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(0,0,0,0.15)] text-[18px] min-w-[160px]">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="url(#ongoing-gradient-2)"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<defs>
							<linearGradient
								id="ongoing-gradient-2"
								x1="0"
								y1="0"
								x2="1"
								y2="0"
							>
								<stop offset="0%" stopColor="#FCDD96" />
								<stop offset="100%" stopColor="#EBC05F" />
							</linearGradient>
						</defs>
						<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
					</svg>
					<span
						style={{
							background:
								"linear-gradient(90deg, #FCDD96 0%, #EBC05F 100%)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							fontWeight: 600,
						}}
					>
						On Going
					</span>
				</div>
			</div>

			<div className="flex-1 flex flex-col">
				<div className="flex flex-col gap-0 mb-1 min-h-[85px] justify-center">
					<h3
						className="font-normal uppercase text-[24px] sm:text-[30px] leading-tight sm:leading-[38px] line-clamp-2"
						style={{
							color: "#EBC05F",
							textShadow: "0px 4px 4px rgba(0, 0, 0, 0.50)",
							fontFamily: '"Pink and Crimson", sans-serif',
						}}
					>
						CAKRAWALA FAIR 2026
					</h3>
				</div>

				<p className="text-[15px] text-[#F4F4F4] leading-[1.6] font-['Plus_Jakarta_Sans_Variable',sans-serif] text-justify flex-1 mt-4">
					Lorem ipsum dolor sit amet consectetur. Lectus amet
					congue mauris ut. Sit non in sed tristique. Tempus
					faucibus.
				</p>
			</div>

			<div className="flex flex-col gap-3 text-[15px] text-[#F4F4F4] mt-3">
				<div className="flex items-center gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clipRule="evenodd"
						/>
					</svg>
					<span>15 Desember 2006</span>
				</div>
				<div className="flex items-start gap-3">
					<svg
						className="w-5 h-5 text-[#EBC05F] shrink-0 mt-0.5"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
							clipRule="evenodd"
						/>
					</svg>
					<span>Cakrawala University, Kampus Kemang</span>
				</div>
			</div>

			<Button className="w-full pointer-events-auto h-12 flex items-center justify-center gap-[10px] rounded-[8px] border-2 border-[#CEAE65] bg-[#CEAE65] text-white hover:bg-transparent hover:text-white transition-all font-semibold mt-4 shadow-[0_4px_10px_0_rgba(255,255,255,0.15)] hover:shadow-none">
				Join Now!
			</Button>

			<div className="flex justify-center items-center gap-2.5 mt-4">
				<div className="w-[30px] h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
				<div className="w-2 h-2 bg-[#EBC05F] rounded-full"></div>
			</div>
		</div>,

		// Card 6: "Lihat Lainnya" / View More Viewport
		<div
			key="event-view-more"
			className="rounded-[20px] flex flex-col items-center justify-center gap-4 sm:gap-5 h-full w-full pointer-events-none"
			style={{ minHeight: "500px" }}
		>
			<Button className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full border-[3px] border-[#CEAE65]/20 bg-[#CEAE65] hover:bg-[#B3934F] text-white shadow-[0_4px_15px_0_rgba(206,174,101,0.4)] transition-transform hover:scale-105 pointer-events-auto flex items-center justify-center p-0 group">
				<ArrowRightIcon 
					className="group-hover:translate-x-2 transition-transform duration-300" 
					style={{ width: "48px", height: "48px" }}
					strokeWidth={2.5}
				/>
			</Button>
			<span className="font-semibold font-sans text-[#06455B] text-[18px] sm:text-[22px]">
				Lihat Lainnya
			</span>
		</div>
	];

	return (
		<section id="event" className="w-full h-full bg-white">
			<div className="container px-5 pt-[50px] sm:pb-[50px] mx-auto text-center flex flex-col items-center">
				<div className="inline-flex items-center justify-center rounded-[30px] p-[2px] bg-linear-to-b from-[#CEAE65] to-[#685833] mb-5 shadow-sm">
					<div className="bg-white rounded-[30px] px-8 py-2.5 flex items-center justify-center">
						<span
							className="font-bold text-lg sm:text-[22px]"
							style={{
								background:
									"linear-gradient(180deg, #CEAE65 0%, #896A22 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								fontFamily: '"Plus Jakarta Sans", sans-serif',
							}}
						>
							Event & Kegiatan
						</span>
					</div>
				</div>
				<h2 className="mt-4 sm:mt-5 text-center font-sans font-semibold text-[#06455B] text-[20px] sm:text-[37px] leading-normal sm:leading-[56px] w-full max-w-6xl mx-auto px-4 sm:px-0">
					An experience beyond the ordinary. Be part of something truly{' '}
					<span
						className="text-[#CEAE65] font-normal text-[36px] sm:text-[70px] leading-[0.8] tracking-wider inline align-baseline"
						style={{ fontFamily: "Italianno, cursive" }}
					>
						remarkable.
					</span>
				</h2>

				{/* Embla Carousel Container */}
				<div 
					className="overflow-hidden mt-6 sm:mt-8 w-full max-w-6xl mx-auto px-4 sm:px-0 cursor-grab active:cursor-grabbing select-none" 
					ref={emblaRef}
				>
					<div className="flex -ml-6 items-stretch">
						{carouselSlides.map((slide, index) => (
							<div
								key={index}
								className="shrink-0 flex-none w-[85%] md:w-[48%] lg:w-[33.3333%] min-w-0 pl-6 h-auto"
							>
								{React.cloneElement(slide as React.ReactElement, { key: `card-${index}` })}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
