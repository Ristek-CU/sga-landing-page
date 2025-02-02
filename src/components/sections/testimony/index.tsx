import Button from "@/components/ui/button";

export default function TestimonySection() {
	return (
		<section className="container w-full h-full gap-10 px-10 mx-auto bg-white py-28">
			<div className="flex justify-between space-y-6">
				<h2 className="text-4xl font-semibold leading-tight">
					<span className="block">Apa Kata Mereka</span>
					<span className="text-blue-500">Tentang SGA?</span>
				</h2>
				<div className="flex gap-1.5 justify-end">
					<Button variant="ghost" size="icon" className="text-black">
						Left
					</Button>
					<Button variant="ghost" size="icon" className="text-black">
						Right
					</Button>
				</div>
			</div>
			<div className="grid flex-1 gap-5"></div>
		</section>
	);
}
