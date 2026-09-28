import arvanaLogo from "@/assets/images/Logo-Arvana.png";
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
		<footer
			id="footer"
			className="w-full bg-[#06455B] text-[#F4F4F4] border-t border-white/5"
		>
			<div className="container px-6 mx-auto py-10 lg:pt-[43px] lg:pb-[44px] flex flex-col gap-8 lg:gap-[72px]">
				<div className="flex flex-col lg:flex-row justify-between w-full gap-8 lg:gap-5">
					{/* Left Section - Branding */}
					<div className="flex flex-col gap-5 lg:gap-6 w-full lg:max-w-2xl items-start">
						{/* Logo Group */}
						<div className="flex flex-row items-center gap-3 lg:gap-6">
							<img
								src={logo}
								alt="Cakrawala Logo"
								className="w-[48px] h-[48px] lg:w-[88px] lg:h-[88px] object-contain shrink-0"
							/>
							{/* Garis Vertikal Emas */}
							<div className="w-[1.5px] h-[40px] lg:h-[88px] bg-[#CEAE65]" />
							<img
								src={arvanaLogo}
								alt="Arvana Logo"
								className="w-[48px] h-[48px] lg:w-[88px] lg:h-[88px] object-contain shrink-0"
							/>
						</div>

						<p className="text-[#F4F4F4]/90 text-[14px] lg:text-[18px] leading-relaxed max-w-[320px] lg:max-w-[550px]">
							Student Government Association (SGA) Cakrawala University adalah
							wadah resmi bagi mahasiswa untuk berpartisipasi dalam pengambilan
							keputusan yang mempengaruhi kehidupan kampus.
						</p>
					</div>

					{/* Right Section - Location & Map */}
					<div className="flex flex-col gap-4 w-full lg:max-w-[400px] items-start lg:items-end">
						{/* Map Container */}
						<div className="w-full sm:w-[365px] h-[140px] lg:h-[160px] overflow-hidden rounded-xl shadow-lg border border-white/10">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.024765620641!2d106.824247075874!3d-6.260468993728157!2m3!1f0!2f0!3f0!3m2!1i1024!2i1024!4f13.1!3m3!1m2!1s0x2e69f3d9b4b9b9b9%3A0x1b1b1b1b1b1b1b1b!2sJl.%20Kemang%20Timur%20No.1!5e0!3m2!1sid!2sid!4v1715000000000!5m2!1sid!2sid"
								className="w-full h-full border-0 grayscale-[10%]"
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							></iframe>
						</div>

						{/* Address */}
						<div className="flex items-start gap-3 w-full sm:w-[365px] mt-2">
							<MapPinIcon className="size-5 lg:size-6 shrink-0 text-[#CEAE65]" />
							<address className="text-[#F4F4F4]/80 text-[13px] lg:text-base leading-snug not-italic">
								Jl. Kemang Timur No.1, RT.14/RW.8, Pejaten Bar., Ps. Minggu,
								Jakarta Selatan, DKI Jakarta 12510
							</address>
						</div>
					</div>
				</div>

				<div className="flex flex-col w-full gap-6">
					{/* Separator Line - Warna Emas Sesuai Gambar */}
					<div className="w-full h-[1.5px] bg-[#CEAE65]/60" />

					{/* Bottom Section */}
					<div className="flex flex-col-reverse md:flex-row justify-between w-full gap-6 items-center">
						{/* Copyright */}
						<span className="text-[12px] lg:text-[15px] text-[#F4F4F4]/70 text-center md:text-left font-medium">
							© 2026 Cakrawala University. <br className="block md:hidden" />{" "}
							All Rights Reserved.
						</span>

						{/* Social Media - Warna Emas & Efek Hover */}
						<div className="flex justify-center md:justify-end gap-6 shrink-0">
							<a
								href="https://www.instagram.com/sga.cakrawala"
								target="_blank"
								rel="noreferrer"
								className="group"
							>
								<InstagramLogo className="size-[24px] lg:size-7 fill-[#CEAE65] group-hover:fill-[#EBC05F] transition-all transform group-hover:scale-110" />
							</a>
							<a
								href="https://www.linkedin.com/company/sga-cakrawala-university"
								target="_blank"
								rel="noreferrer"
								className="group"
							>
								<LinkedInLogo className="size-[24px] lg:size-7 fill-[#CEAE65] group-hover:fill-[#EBC05F] transition-all transform group-hover:scale-110" />
							</a>
							<a
								href="https://www.tiktok.com/@sgacakrawala"
								target="_blank"
								rel="noreferrer"
								className="group"
							>
								<TikTokLogo className="size-[24px] lg:size-7 text-[#CEAE65] fill-[#CEAE65] group-hover:text-[#EBC05F] group-hover:fill-[#EBC05F] transition-all transform group-hover:scale-110" />
							</a>
							<a
								href="https://x.com/sga_cakrawala"
								target="_blank"
								rel="noreferrer"
								className="group"
							>
								<XLogo className="size-[24px] lg:size-7 fill-[#CEAE65] group-hover:fill-[#EBC05F] transition-all transform group-hover:scale-110" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
