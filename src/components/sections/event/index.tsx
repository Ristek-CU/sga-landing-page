import { CalendarFoldIcon } from "lucide-react";
import { type MouseEventHandler, useEffect, useState } from "react";

import sgaMembers from "@/assets/images/sga-members.png";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Particles from "@/components/ui/particles";
import { cn } from "@/lib/utils";

export default function EventSection() {
	const [api, setApi] = useState<CarouselApi>();
	// TODO: Still placeholder data
	const [events] = useState(() =>
		Array.from({ length: 5 }).map((_, index) => index),
	);
	const [currentEventIndex, setCurrentEventIndex] = useState(0);

	useEffect(() => {
		if (!api) return;

		setCurrentEventIndex(api.selectedScrollSnap());

		api.on("select", () => {
			setCurrentEventIndex(api.selectedScrollSnap());
		});
	}, [api]);

	useEffect(() => {
		api?.scrollTo(currentEventIndex);
	}, [api, currentEventIndex]);

	return (
		<section
			id="event"
			className="container w-full h-full gap-10 px-10 py-32 mx-auto text-center bg-white md:flex-row"
		>
			<Badge>Event & Kegiatan</Badge>
			<h2 className="mt-5 text-2xl font-semibold leading-tight xl:text-4xl">
				Get to know our <span className="text-blue-500">events</span> and{" "}
				<span className="text-green-500">participate</span> in it
			</h2>
			<Carousel
				className="relative w-full mt-10 overflow-hidden rounded-3xl !bg-hero bg-hero-pattern"
				setApi={setApi}
			>
				<CarouselContent>
					{events.map((index) => (
						<CarouselItem key={index} className="z-[1] my-auto w-0">
							<div className="grid w-full grid-flow-row gap-5 p-9 xl:p-12 md:grid-flow-col lg:gap-9 rounded-3xl">
								<img
									src={sgaMembers}
									alt="SGA Members"
									className="h-full w-full xl:max-w-[463px] aspect-video object-cover object-center rounded-2xl shrink-0"
								/>
								<div className="flex flex-col items-center justify-between h-full gap-10 md:items-start">
									<div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
										<Badge variant="special">Workshop</Badge>

										<div className="space-y-3 text-white">
											<h3 className="text-2xl font-bold leading-tight xl:text-4xl">
												SGA x Cakrawala University {index + 1}
											</h3>
											<div className="items-center hidden gap-1 md:flex">
												<CalendarFoldIcon className="size-6" />
												<p>January 2025</p>
											</div>
										</div>
										<p className="text-sm leading-tight text-white md:text-base">
											Ajang tahunan yang menghadirkan pembicara inspiratif untuk
											membahas topik-topik kepemimpinan dan inovasi.
										</p>
									</div>
									<Button className="w-full max-w-48">Selengkapnya</Button>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<Particles
					quantity={500}
					size={0.1}
					staticity={50}
					className="absolute top-0 w-full h-full overflow-clip"
				/>
			</Carousel>
			<div className="flex justify-center gap-3 mt-5">
				{events.map((index) => (
					<SlideNavigationButton
						key={index}
						isActive={currentEventIndex === index}
						index={index}
						onClick={() => setCurrentEventIndex(index)}
					/>
				))}
			</div>
		</section>
	);
}

interface SlideNavigationButtonProps {
	index: number;
	isActive: boolean;
	onClick: MouseEventHandler<HTMLButtonElement>;
}

function SlideNavigationButton({
	index,
	isActive,
	onClick,
}: SlideNavigationButtonProps) {
	return (
		<Button
			className={cn(
				"cursor-pointer h-4 p-0 transition-all rounded-full ease-out duration-300",
				isActive ? "bg-yellow-600 w-20" : "bg-yellow-200 w-4",
			)}
			onClick={onClick}
		>
			<span className="sr-only">Slide {index}</span>
		</Button>
	);
}
