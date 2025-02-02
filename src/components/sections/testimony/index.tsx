import { ArrowLeftIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import sgaMembers from "@/assets/images/sga-members.png";

export default function TestimonySection() {
	return (
		<section className="container w-full h-full gap-10 px-10 mx-auto bg-white py-28">
			<Carousel>
				<div className="flex justify-between space-y-6">
					<h2 className="text-4xl font-semibold leading-tight">
						<span className="block">Apa Kata Mereka</span>
						<span className="text-blue-500">Tentang SGA?</span>
					</h2>
					<div className="flex gap-1.5 justify-end">
						<CarouselPrevious
							variant="ghost"
							className="static translate-none text-black transition-shadow shadow-md hover:shadow-lg size-10 rounded-xl"
						>
							<ArrowLeftIcon className="size-full shrink-0" />
						</CarouselPrevious>
						<CarouselNext
							variant="ghost"
							className="static translate-none text-black transition-shadow shadow-md hover:shadow-lg size-10 rounded-xl"
						>
							<ArrowLeftIcon className="rotate-180 size-full shrink-0" />
						</CarouselNext>
					</div>
				</div>
				<CarouselContent>
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem>
							<Quote
								author={`M. Bima Saputera ${index + 1}`}
								position="CEO TutupJendela"
							>
								“During my time in RISTEK, it was a place where you can surround
								yourself wth brilliant minds in Fasilkom CU. They literally just
								flocked together in that small room. Therefore, I’d like to
								encourage you to join RISTEK for the learning opportunity you
								may potentially find by meeting these great people.”
							</Quote>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</section>
	);
}

interface QuoteProps extends PropsWithChildren {
	author: string;
	position: string;
}

function Quote({ author, position, children }: QuoteProps) {
	return (
		<div className="flex justify-between gap-x-15 gap-y-5">
			<figure className="flex flex-col justify-between h-full gap-5 sm:h-64">
				<blockquote className="text-2xl font-medium leading-tight text-gray-200">
					{children}
				</blockquote>
				<figcaption className="space-y-1.5">
					<p className="text-xl font-bold leading-tight">{author}</p>
					<p className="text-xl font-medium leading-tight text-gray-200">
						{position}
					</p>
				</figcaption>
			</figure>
			<img
				src={sgaMembers}
				alt="SGA Members"
				className="object-cover w-full h-full shrink-0 aspect-square rounded-xl max-h-64 sm:max-w-64"
			/>
		</div>
	);
}
