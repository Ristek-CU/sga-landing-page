import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import Header from "./partials/header";

export default function HeroSection() {
	return (
		<section className="relative flex flex-col w-full min-h-screen overflow-hidden text-white bg-hero bg-hero-pattern">
			<Header />
			<div className="flex flex-col items-center justify-center w-full h-full gap-4 min-h-[768px] container mx-auto px-5 z-[1]">
				<Badge variant="special">Welcome to</Badge>

				<h1 className="grid text-3xl font-semibold leading-tight text-center md:text-5xl xl:text-6xl">
					<span>Student Government Association</span>
					<span>Cakrawala University</span>
				</h1>
				<p className="text-base font-normal leading-tight text-center md:text-lg">
					Mewujudkan Kepemimpinan Mahasiswa yang Progresif dan Inklusif
				</p>
				<div className="flex justify-center w-full gap-5 pt-8">
					<Button className="w-40">Partner With Us</Button>
					<Button className="w-40 bg-green-50" variant="secondary">
						Join With Us
					</Button>
				</div>
			</div>
			<Particles
				quantity={500}
				size={0.1}
				staticity={50}
				className="absolute w-full h-full overflow-clip"
			/>
		</section>
	);
}
