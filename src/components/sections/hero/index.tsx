import Button from "../../ui/button";
import Particles from "../../ui/particles";
import Header from "./partials/header";

export default function HeroSection() {
	return (
		<section className="relative flex flex-col w-full min-h-screen overflow-hidden text-white bg-hero bg-hero-pattern">
			<Header />
			<div className="flex flex-col items-center justify-center w-full h-full gap-4 min-h-[768px] max-w-screen-xl mx-auto px-10">
				<div className="group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-full bg-white/10 px-5 py-1 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
					<div className="absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-blue-300/50 via-green-300/100 to-yellow-300/100 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]" />
					<span className="inline-block text-lg font-semibold text-center text-transparent text-max bg-gradient-to-r from-blue-300 via-green-300 to-yellow-300 bg-clip-text">
						Welcome to
					</span>
				</div>
				<h1 className="grid text-6xl font-semibold leading-snug text-center">
					<span>Student Government Association</span>
					<span>Cakrawala University</span>
				</h1>
				<p className="text-lg font-normal text-center">
					Mewujudkan Kepemimpinan Mahasiswa yang Progresif dan Inklusif
				</p>
				<div className="flex justify-center w-full gap-5 pt-8">
					<Button className="w-40">Partner With Us</Button>
					<Button className="w-40" variant="secondary">
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
