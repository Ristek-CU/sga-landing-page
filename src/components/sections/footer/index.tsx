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
		<footer className="w-full bg-blue-50 px-30 py-12.5 space-y-5">
			<div className="flex items-center gap-6">
				<img src={sgaLogo} alt="SGA Logo" className="size-16 shrink-0" />
				<div className="w-[1px] h-16 bg-gray-100" />
				<img
					src={catalinaLogo}
					alt="Catalina Logo"
					className="size-16 shrink-0"
				/>
			</div>
			<div className="w-full flex justify-between mb-10">
				<div className="w-full">
					<p className="leading-tight w-full max-w-125">
						Student Government Association (SGA) Cakrawala University adalah
						wadah resmi bagi mahasiswa untuk berpartisipasi dalam pengambilan
						keputusan yang mempengaruhi kehidupan kampus.
					</p>
				</div>
				<div className="w-full flex justify-end">
					<div className="space-y-2">
						<div className="flex items-center gap-3.5 w-full max-w-125">
							<MapPinIcon className="size-6 shrink-0" />
							<address className="leading-tight">
								Jl. Kemang Timur No.1, RT.14/RW.8, Pejaten Bar.,Ps. Minggu, Kota
								Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12510
							</address>
						</div>
						<div className="flex items-center gap-3.5 max-w-125">
							<MailIcon className="size-6 shrink-0" />
							<a
								href="mailto:example@email.com"
								className="leading-tight text-blue-500"
							>
								example@email.com
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className="h-[1px] w-full bg-gray-100" />
			<div className="flex w-full justify-between gap-10">
				<span className="block text-gray-200">
					© 2023 Cakrawala University. All Rights Reserved.
				</span>
				<div className="flex justify-end gap-5">
					{/* TODO: Put real social links */}
					<a href="#facebook">
						<FacebookLogo className="size-7.5" />
					</a>
					<a href="#linkedin">
						<LinkedInLogo className="size-7.5" fill="#0A66C2" />
					</a>
					<a href="#tiktok">
						<TikTokLogo className="size-7.5" />
					</a>
					<a href="#youtube">
						<YoutubeLogo className="size-7.5" />
					</a>
				</div>
			</div>
		</footer>
	);
}
