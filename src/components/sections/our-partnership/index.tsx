import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";

export default function OurPartnershipSection() {
	return (
		<section className="container w-full h-full gap-10 px-10 py-32 mx-auto space-y-10 text-center bg-white">
			<div className="space-y-5">
				<Badge>Our Partnership</Badge>
				<h1 className="text-4xl font-semibold leading-tight">
					Help us achieve our mission
				</h1>
			</div>
			<p className="text-gray-300 text-xl font-normal w-[822px] mx-auto leading-tight">
				SGA Cakrawala University menjalin kemitraan dengan berbagai organisasi
				dan institusi untuk mendukung pengembangan mahasiswa dan kegiatan
				kampus.
			</p>
			<div className="relative flex flex-col items-center justify-center w-full overflow-hidden rounded-lg bg-background">
				<Marquee className="[--duration:15s]" pauseOnHover>
					{Array(4)
						.fill(0)
						.map((_, i) => (
							<div key={i} className="flex items-center justify-around gap-4">
								<img
									src={`https://picsum.photos/200/200?random=${i}`}
									alt="Partner"
									className="object-cover w-auto h-24 aspect-video"
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
									className="object-cover w-auto h-24 aspect-video"
								/>
							</div>
						))}
				</Marquee>
				<div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none bg-gradient-to-r from-white"></div>
				<div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none bg-gradient-to-l from-white"></div>
			</div>
		</section>
	);
}
