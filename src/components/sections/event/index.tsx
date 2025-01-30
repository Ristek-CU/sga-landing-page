import { type MouseEventHandler, useEffect, useState } from "react";
import { CalendarFoldIcon } from "lucide-react";

import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import sgaMembers from "@/assets/images/sga-members.png";

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
			className="container w-full h-full gap-10 px-10 py-32 mx-auto text-center bg-white lg:flex-row"
		>
			<Badge>Event & Kegiatan</Badge>
			<h2 className="mt-5 text-4xl font-semibold leading-tight">
				Get to know our <span className="text-blue-500">events</span> and{" "}
				<span className="text-green-500">participate</span> in it
			</h2>
			<Carousel
				className="w-full mt-10 overflow-hidden rounded-3xl !bg-hero bg-hero-pattern"
				setApi={setApi}
			>
				<CarouselContent>
					{events.map((index) => (
						<CarouselItem key={index}>
							<div className="grid w-full grid-flow-row p-12 lg:grid-flow-col gap-9 rounded-3xl">
								<img
									src={sgaMembers}
									alt="SGA Members"
									className="h-full w-full max-w-[463px] aspect-video object-cover object-center rounded-2xl shrink-0"
								/>
								<div className="flex flex-col justify-between h-full gap-10">
									<div className="space-y-5 text-left">
										<div className="group relative flex max-w-fit flex-row items-center justify-center rounded-full bg-white/10 px-5 py-1 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
											<div className="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-blue-300/50 via-green-300/100 to-yellow-300/100 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]" />
											<span className="inline-block text-lg font-semibold text-center text-transparent text-max bg-gradient-to-r from-blue-300 via-green-300 to-yellow-300 bg-clip-text">
												Workshop
											</span>
										</div>
										<div className="space-y-3 text-white">
											<h3 className="text-4xl font-bold leading-tight">
												SGA x Cakrawala University {index + 1}
											</h3>
											<div className="flex items-center gap-1">
												<CalendarFoldIcon className="size-6" />
												<p>January 2025</p>
											</div>
										</div>
										<p className="leading-tight text-white">
											Ajang tahunan yang menghadirkan pembicara inspiratif untuk
											membahas topik-topik kepemimpinan dan inovasi.
										</p>
									</div>
									<Button className="w-max">Selengkapnya</Button>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
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
