import sgaMembersFilter from "@/assets/images/sga-members-filter.jpg";

export default function MeetOurTeamSection() {
	return (
		<section
			id="meet-our-team"
			className="container w-full h-full px-10 mx-auto bg-white"
		>
			<div className="relative w-full h-full overflow-hidden rounded-3xl">
				<img
					src={sgaMembersFilter}
					alt="SGA Members"
					className="w-full h-auto"
				/>
				<div className="absolute top-0 z-10 flex flex-col items-center justify-between w-full h-full px-20">
					<h2 className="text-5xl font-bold leading-tight text-center text-white pt-36">
						Meet Our Team!
					</h2>
					<div className="hidden w-full px-10 bg-blue-600 lg:block py-9 rounded-t-3xl">
						<p className="text-2xl font-medium leading-tight text-center text-white">
							Berkenalan dengan Tim Catalina, angkatan pertama yang bersemangat
							memulai perjalanan SGA Cakrawala University. Tim ini terdiri dari
							mahasiswa berbakat yang memiliki visi dan misi untuk membawa
							perubahan positif di kampus.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
