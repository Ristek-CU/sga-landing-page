import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import {
	DEFAULT_GUIDE_STEPS,
	type GuideStep,
} from "@/lib/ukm-utils";

gsap.registerPlugin(ScrollTrigger);

interface StepByStepGuideProps {
	steps?: GuideStep[];
	className?: string;
}

export default function StepByStepGuide({
	steps = DEFAULT_GUIDE_STEPS,
	className,
}: StepByStepGuideProps) {
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!sectionRef.current) return;

		const ctx = gsap.context(() => {
			ScrollTrigger.refresh();

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 85%",
					toggleActions: "play none none none",
				},
			});

			tl.fromTo(
				".gsap-step-header",
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.6,
					stagger: 0.15,
					ease: "power2.out",
					clearProps: "all",
				},
			).fromTo(
				".gsap-step-card",
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.5,
					stagger: 0.1,
					ease: "power2.out",
					clearProps: "all",
				},
				"-=0.3",
			);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			className={cn(
				"w-full bg-white py-14 px-4 sm:px-8 lg:px-40 flex flex-col items-center gap-6 overflow-hidden",
				className,
			)}
		>
			<div className="text-center w-full flex flex-col gap-2">
				<h2 className="gsap-step-header text-2xl md:text-3xl font-extrabold text-[#171717]">
					Kalo mau bikin <span className="text-[#13495A]">UKM</span> baru
					gimana sih caranya?
				</h2>
				<p className="gsap-step-header text-sm md:text-base text-[#404040]">
					Nah kalo dari Student Societies sendiri sih ada {steps.length}{" "}
					langkah dulu, ini dia langkah-langkahnya :
				</p>
			</div>

			<div className="w-full max-w-[1120px] flex flex-col gap-3 md:gap-4">
				{steps.map((step) => (
					<div
						key={step.id}
						className={cn(
							"gsap-step-card group relative w-full bg-[#13495A] text-white overflow-hidden shadow-sm",
							"rounded-2xl sm:rounded-full py-4 px-6 md:px-8 flex items-center gap-4 md:gap-6",
							"transition-all duration-300 ease-out",
							"hover:-translate-y-1 hover:bg-[#103e4d] hover:shadow-lg hover:shadow-[#13495A]/20 cursor-pointer",
						)}
					>
						<div
							className={cn(
								"shrink-0 w-10 h-10 md:w-12 md:h-12 bg-[#E6B93D] text-[#171717]",
								"rounded-full flex items-center justify-center font-bold text-lg md:text-xl z-10 shadow-md",
								"transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#f0c243]",
							)}
						>
							{step.id}
						</div>

						<p className="text-sm md:text-base lg:text-lg font-medium pr-12 md:pr-28 z-10 leading-snug">
							{step.text}
						</p>

						<img
							src="/Logo-Overlay.png"
							alt=""
							aria-hidden="true"
							className={cn(
								"absolute -right-6 md:-right-10 top-1/2 -translate-y-1/2",
								"w-[160px] md:w-[220px] h-auto opacity-55 rotate-[20deg]",
								"pointer-events-none z-0 object-contain select-none",
								"transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-[25deg] group-hover:opacity-75",
							)}
						/>
					</div>
				))}
			</div>
		</section>
	);
}