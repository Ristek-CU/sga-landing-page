import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";

export default function OurPartnership() {
	return (
		<section className="w-full h-full container gap-10 px-10 py-32 mx-auto bg-white space-y-10 text-center">
			<div className="space-y-5">
				<Badge>Our Partnership</Badge>
				<h1 className="text-4xl font-semibold leading-tight">
					Help us achieve our mission
				</h1>
			</div>
			<p className="text-gray-300 text-xl font-normal w-[822px] mx-auto">
				SGA Cakrawala University menjalin kemitraan dengan berbagai organisasi
				dan institusi untuk mendukung pengembangan mahasiswa dan kegiatan
				kampus.
			</p>
			<div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
				<Marquee className="[--duration:15s]" pauseOnHover>
					{Array(4)
						.fill(0)
						.map((_, i) => (
							<div key={i} className="flex items-center justify-around gap-4">
								<img
									src={`https://picsum.photos/200/200?random=${i}`}
									alt="Partner"
									className="w-auto h-24 aspect-video object-cover"
								/>
							</div>
						))}
				</Marquee>
				<Marquee className="[--duration:15s]" pauseOnHover reverse>
					{Array(4)
						.fill(0)
						.map((_, i) => (
							<div key={i} className="flex items-center justify-around gap-4">
								<img
									src={`https://picsum.photos/200/200?random=${i}`}
									alt="Partner"
									className="w-auto h-24 aspect-video object-cover"
								/>
							</div>
						))}
				</Marquee>
				<div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
				<div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
			</div>
		</section>
	);
}
