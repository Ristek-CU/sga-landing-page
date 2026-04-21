import logo from "@/assets/images/logo-cakrawala.png";
import {
	InstagramLogo,
	LinkedInLogo,
	TikTokLogo,
	XLogo,
} from "@/components/ui/icons";
import { MapPinIcon } from "lucide-react";

export default function Footer() {
	return (
		<footer id="footer" className="w-full bg-[#06455B] text-[#F4F4F4]">
			<div className="container px-5 mx-auto py-8 lg:pt-[43px] lg:pb-[44px] flex flex-col gap-10 lg:gap-[72px]">
				<div className="flex flex-col lg:flex-row justify-between w-full gap-10 lg:gap-5">
					{/* Left Section */}
					<div className="flex flex-col gap-5 lg:gap-6 w-full lg:max-w-2xl items-center lg:items-start text-center lg:text-left">
						<div className="flex flex-row items-center justify-center lg:justify-start gap-4 lg:gap-6">
							<img src={logo} alt="Cakrawala Logo" className="w-[64px] h-[64px] lg:w-[88px] lg:h-[88px] object-contain shrink-0" />
							<div className="w-[2px] h-[64px] lg:h-[88px] bg-[#CEAE65]" />
							<img
								src={logo}
								alt="Cakrawala Logo"
								className="w-[64px] h-[64px] lg:w-[88px] lg:h-[88px] object-contain shrink-0"
							/>
						</div>
						<p className="text-[#F4F4F4] text-[15px] sm:text-base lg:text-[18px] leading-[1.6] px-2 lg:px-0 max-w-sm lg:max-w-none">
							Student Government Association (SGA) Cakrawala University adalah
							wadah resmi bagi mahasiswa untuk berpartisipasi dalam pengambilan
							keputusan yang mempengaruhi kehidupan kampus.
						</p>
					</div>

					{/* Right Section */}
					<div className="flex flex-col gap-5 lg:gap-4 w-full lg:max-w-[420px] items-center lg:items-end mt-4 lg:mt-0">
						<iframe 
							src="https://maps.google.com/maps?q=Cakrawala%20University,%20Jakarta&t=&z=13&ie=UTF8&iwloc=&output=embed" 
							className="w-full sm:w-[365px] h-[160px] rounded-lg border-0 shadow-sm" 
							allowFullScreen 
							loading="lazy" 
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
						<div className="flex items-start gap-4 w-full sm:w-[365px] bg-[#0A5C75]/40 lg:bg-transparent p-4 lg:p-0 rounded-xl text-left border border-white/10 lg:border-none">
							<MapPinIcon className="size-6 shrink-0 text-[#CEAE65]" />
							<address className="text-[#F4F4F4] text-[13px] sm:text-sm lg:text-base leading-relaxed not-italic">
								Jl. Kemang Timur No.1, RT.14/RW.8, Pejaten Bar.,Ps. Minggu,
								Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12510
							</address>
						</div>
					</div>
				</div>

				<div className="flex flex-col w-full gap-5">
					{/* Separator Line */}
					<div className="w-full h-[1px] bg-white/20" />

					{/* Bottom Section */}
					<div className="flex flex-col-reverse sm:flex-row justify-between w-full gap-4 items-center">
						<span className="flex-1 block w-full text-sm lg:text-base text-[#F4F4F4] sm:text-left text-center">
							© 2026 Cakrawala University. All Rights Reserved.
						</span>
						<div className="flex justify-center sm:justify-end gap-5 shrink-0">
							<a href="https://www.instagram.com/sga.cakrawala" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
								<InstagramLogo className="size-6 fill-[#CEAE65]" />
							</a>
							<a
								href="https://www.linkedin.com/company/sga-cakrawala-university"
								target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity"
							>
								<LinkedInLogo className="size-6 fill-[#CEAE65]" />
							</a>
							<a href="https://www.tiktok.com/@sgacakrawala" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
								<TikTokLogo className="size-6 fill-[#CEAE65] text-[#CEAE65]" />
							</a>
							<a href="https://x.com/sga_cakrawala" target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
								<XLogo className="size-6 fill-[#CEAE65]" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
