import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import Particles from "@/components/ui/particles";

export default function JoinUsSection() {
	return (
		<section
			id="join-us"
			className="container w-full h-full gap-10 px-5 py-12.5 xl:pb-30 mx-auto bg-white"
		>
			<div className="relative rounded-4xl grid grid-cols-1 md:grid-cols-2 w-full h-full md:max-h-[430px] justify-between overflow-hidden text-white bg-hero bg-hero-pattern bg-fixed">
				<div className="flex flex-col justify-between p-12 gap-y-5 z-[1]">
					<Badge variant="special" className="self-center sm:self-auto">
						SGA is Hiring!
					</Badge>
					<span className="flex text-3xl font-bold leading-tight xl:text-5xl">
						It's your turn to make ideas happen.
					</span>
					<p className="flex mb-5 text-sm font-normal leading-tight xl:text-base">
						We're waiting for digital talents like you to join our team and help
						us to create an impact on society. Choose your desired path and
						start making changes through what you love.
					</p>
					<a
						className={buttonVariants()}
						href="https://s.id/daftarSGA"
						target="_blank"
					>
						Join Us
					</a>
				</div>
				<div className="hidden grid-flow-col justify-end gap-3 -mr-12 xl:-mr-6 overflow-hidden z-[1] md:grid">
					<Marquee className={`[--duration:15s]`} vertical>
						{Array.from({ length: 4 }, (_, i) => i).map((item) => (
							<img
								key={item}
								src={`https://picsum.photos/200/200?random=${item}`}
								alt="Partner"
								className="object-cover size-44 aspect-square rounded-xl shrink-0"
							/>
						))}
					</Marquee>
					<Marquee className={`[--duration:15s]`} vertical reverse>
						{Array.from({ length: 4 }, (_, i) => i + 4).map((item) => (
							<img
								key={item}
								src={`https://picsum.photos/200/200?random=${item}`}
								alt="Partner"
								className="object-cover size-44 aspect-square rounded-xl shrink-0"
							/>
						))}
					</Marquee>
					<Marquee className={`[--duration:15s]`} vertical>
						{Array.from({ length: 4 }, (_, i) => i + 8).map((item) => (
							<img
								key={item}
								src={`https://picsum.photos/200/200?random=${item}`}
								alt="Partner"
								className="hidden object-cover size-44 aspect-square rounded-xl shrink-0 xl:block"
							/>
						))}
					</Marquee>
				</div>
				<Particles
					quantity={200}
					size={0.1}
					staticity={50}
					className="absolute w-full h-full overflow-clip"
				/>
			</div>
		</section>
	);
}
