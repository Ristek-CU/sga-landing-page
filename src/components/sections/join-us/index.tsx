import Button from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import Particles from "@/components/ui/particles";

export default function JoinUsSection() {
	return (
		<section className="container w-full h-full gap-10 px-10 py-32 mx-auto bg-white">
			<div className="relative rounded-4xl grid grid-cols-2 w-full h-full max-h-[430px] justify-between overflow-hidden text-white bg-hero bg-hero-pattern">
				<div className="flex flex-col justify-between p-12 gap-y-5 z-[1]">
					<div className="group relative flex max-w-fit flex-row items-center justify-center rounded-full bg-white/10 px-5 py-1 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-xs transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
						<div className="absolute inset-0 block h-full w-full animate-gradient bg-linear-to-r from-blue-300/50 via-green-300/100 to-yellow-300/100 bg-[length:var(--bg-size)_100%] p-[1px] [mask-composite:subtract]! [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]" />
						<span className="inline-block text-lg font-semibold text-center text-transparent text-max bg-linear-to-r from-blue-300 via-green-300 to-yellow-300 bg-clip-text">
							SGA is Hiring!
						</span>
					</div>
					<span className="flex text-5xl font-bold leading-tight">
						It's your turn to make ideas happen.
					</span>
					<p className="flex mb-5 text-base font-normal leading-tight">
						We're waiting for digital talents like you to join our team and help
						us to create an impact on society. Choose your desired path and
						start making changes through what you love.
					</p>
					<Button>Join Us</Button>
				</div>
				<div className="flex justify-end gap-3 -mx-6 overflow-hidden z-[1]">
					{Array.from({ length: 3 }, (_, i) => i).map((amount) => (
						<Marquee
							key={amount}
							className="[--duration:15s]"
							vertical
							reverse={amount % 2 === 0}
						>
							{Array.from({ length: 4 }, (_, i) => i).map((item) => (
								<img
									key={item}
									src={`https://picsum.photos/200/200?random=${item}`}
									alt="Partner"
									className="object-cover size-44 aspect-square rounded-xl shrink-0"
								/>
							))}
						</Marquee>
					))}
				</div>
				<Particles
					quantity={500}
					size={0.1}
					staticity={50}
					className="absolute w-full h-full overflow-clip"
				/>
			</div>
		</section>
	);
}
