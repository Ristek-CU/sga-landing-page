import ticketBg from "@/assets/images/ticketevet-bg.png";

export default function EventSection() {
	const handleNavigate = () => {
		window.location.href = "/events";
	};

	return (
		<section className="flex w-full flex-col items-center justify-center bg-[#F8F9FA] px-4 py-16 font-['Plus_Jakarta_Sans',sans-serif]">
			<div className="mb-10 flex max-w-4xl flex-col items-center text-center">
				<div className="mb-8 flex justify-center">
					<div className="inline-flex items-center justify-center rounded-[30px] bg-gradient-to-r from-[#CEAE65] to-[#685833] p-[2px] shadow-sm">
						<div className="inline-flex items-center justify-center gap-[10px] rounded-[28px] bg-white px-[30px] py-[6px]">
							<span className="text-sm font-semibold text-[#CEAE65] sm:text-base">
								Event &amp; Kegiatan
							</span>
						</div>
					</div>
				</div>

				<h2 className="max-w-[1235px] text-2xl font-semibold leading-[40px] text-[#093B4C] sm:text-[37px] sm:leading-[48px]">
					An experience beyond the ordinary. Be part of something truly
					<span className="-mt-1 block font-italianno text-5xl font-normal leading-[60px] text-[#DDA835] sm:-mt-2 sm:text-[80px] sm:leading-[66px]">
						remarkable
					</span>
				</h2>
			</div>

			<div className="relative ml-50 aspect-[760/260] w-full max-w-[980px] drop-shadow-2xl transition-transform duration-300 hover:scale-[1.01]">
				<img
					src={ticketBg}
					alt="SGA Event Ticket"
					className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain"
				/>

				<div className="relative z-10 flex h-full w-full">
					<div className="box-border flex h-full w-[78%] flex-col justify-between pb-8 pl-6 pr-3 pt-6 sm:pb-22 sm:pl-8 sm:pr-5 sm:pt-8">
						<div className="space-y-1 pl-6 pt-6">
							<h3 className="text-lg font-bold tracking-wide text-white sm:text-2xl md:text-[32px]">
								Eksplorasi <span className="text-[#E3AF35]">Event</span>
							</h3>
							<p className="text-xs font-semibold text-[#E3AF35] sm:text-base md:text-[20px]">
								Student Government Association
							</p>
							<p className="text-[11px] font-medium text-white/90 sm:text-sm md:text-[17px]">
								Cakrawala University
							</p>
						</div>

						<div className="w-full">
							<button
								type="button"
								onClick={handleNavigate}
								className="ml-4 flex h-9 w-[87%] cursor-pointer items-center justify-center rounded-xl bg-[#EEBA41] text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-[#D4A230] active:scale-[0.98] sm:h-[44px] sm:text-sm md:text-base"
							>
								Discover Now
							</button>
						</div>
					</div>

					<div className="h-full w-[32%]" />
				</div>
			</div>
		</section>
	);
}
