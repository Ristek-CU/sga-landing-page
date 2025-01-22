import { type MouseEventHandler, useState } from "react";
import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import sgaMembers from "@/assets/images/sga-members.png";

export default function EventSection() {
	const [currentEvent, setCurrentEvent] = useState(0);

	return (
		<section
			id="event"
			className="w-full h-full max-w-screen-xl gap-10 px-10 py-32 mx-auto text-center bg-white lg:flex-row"
		>
			<Badge>Event & Kegiatan</Badge>
			<h2 className="mt-5 text-4xl font-semibold leading-tight">
				Get to know our <span className="text-blue-500">events</span> and{" "}
				<span className="text-green-500">participate</span> in it
			</h2>
			<div className="grid w-full grid-flow-row p-12 mt-10 lg:grid-flow-col gap-9 bg-hero bg-hero-pattern rounded-3xl">
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
								SGA x Cakrawala University
							</h3>
							<div className="flex items-center gap-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									className="size-6"
								>
									<path
										d="M8 2V6M16 2V6M3 10H21M15 22V18C15 17.4696 15.2107 16.9609 15.5858 16.5858C15.9609 16.2107 16.4696 16 17 16H21M21 17V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H16L21 17Z"
										stroke="white"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
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
			<div className="flex justify-center gap-3 mt-5">
				<SlideNavigationButton
					isActive={currentEvent === 0}
					index={0}
					onClick={() => setCurrentEvent(0)}
				/>
				<SlideNavigationButton
					isActive={currentEvent === 1}
					index={1}
					onClick={() => setCurrentEvent(1)}
				/>
				<SlideNavigationButton
					isActive={currentEvent === 2}
					index={2}
					onClick={() => setCurrentEvent(2)}
				/>
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
				"h-4 p-0 transition-all rounded-full ease-out duration-300",
				isActive ? "bg-yellow-600 w-20" : "bg-yellow-200 w-4",
			)}
			onClick={onClick}
		>
			<span className="sr-only">Slide {index}</span>
		</Button>
	);
}
