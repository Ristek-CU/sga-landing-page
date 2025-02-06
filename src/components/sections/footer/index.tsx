import catalinaLogo from "@/assets/images/logo-catalina.png";
import sgaLogo from "@/assets/images/logo-sga.png";
import {
	FacebookLogo,
	LinkedInLogo,
	TikTokLogo,
	YoutubeLogo,
} from "@/components/ui/icons";
import { MailIcon, MapPinIcon } from "lucide-react";

export default function FooterSection() {
	return (
		<footer id="footer" className="w-full bg-blue-50 py-12.5">
			<div className="container px-5 mx-auto space-y-5">
				<div className="flex flex-row items-center justify-center w-full gap-6 sm:justify-start">
					<img src={sgaLogo} alt="SGA Logo" className="size-14 shrink-0" />
					<div className="w-[1px] h-14 bg-gray-100" />
					<img
						src={catalinaLogo}
						alt="Catalina Logo"
						className="size-14 shrink-0"
					/>
				</div>
				<div className="flex justify-between flex-col sm:flex-row w-full gap-5.5">
					<div className="w-full">
						<p className="w-full text-sm leading-tight max-w-125 md:text-base">
							Student Government Association (SGA) Cakrawala University adalah
							wadah resmi bagi mahasiswa untuk berpartisipasi dalam pengambilan
							keputusan yang mempengaruhi kehidupan kampus.
						</p>
					</div>
					<div className="flex w-full sm:justify-end">
						<div className="space-y-2">
							<div className="flex items-start gap-3.5 w-full max-w-125">
								<MapPinIcon className="size-6 shrink-0" />
								<address className="text-xs leading-tight md:text-base">
									Jl. Kemang Timur No.1, RT.14/RW.8, Pejaten Bar.,Ps. Minggu,
									Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12510
								</address>
							</div>
							<div className="flex items-start gap-3.5 max-w-125">
								<MailIcon className="size-6 shrink-0" />
								<a
									href="mailto:example@email.com"
									className="text-xs leading-tight text-blue-500 md:text-base"
								>
									example@email.com
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="h-[1px] w-full bg-gray-100" />
				<div className="flex justify-between w-full gap-2 sm:gap-10">
					<span className="flex-1 block w-full text-xs text-gray-200 md:text-base">
						© 2023 Cakrawala University. All Rights Reserved.
					</span>
					<div className="flex justify-end gap-1.5 sm:gap-5 shrink-0">
						{/* TODO: Put real social links */}
						<a href="#facebook">
							<FacebookLogo className="md:size-7.5 size-5" />
						</a>
						<a href="#linkedin">
							<LinkedInLogo className="md:size-7.5 size-5" fill="#0A66C2" />
						</a>
						<a href="#tiktok">
							<TikTokLogo className="md:size-7.5 size-5" />
						</a>
						<a href="#youtube">
							<YoutubeLogo className="md:size-7.5 size-5" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
