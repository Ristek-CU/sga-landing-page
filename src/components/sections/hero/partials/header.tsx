import catalinaLogo from "@/assets/images/logo-catalina.png";
import sgaLogo from "@/assets/images/logo-sga.png";
import Button from "@/components/ui/button";
import { AlignJustifyIcon } from "lucide-react";

export default function Header() {
	return (
		<header className="absolute top-0 left-0 z-10 w-full">
			<div className="container flex items-center justify-between w-full px-5 py-10 mx-auto">
				<div className="flex items-center gap-6">
					<img src={sgaLogo} alt="SGA Logo" className="size-14 shrink-0" />
					<div className="w-[1px] h-14 bg-gray-50" />
					<img
						src={catalinaLogo}
						alt="Catalina Logo"
						className="size-14 shrink-0"
					/>
				</div>
				<div className="items-center justify-center flex-1 hidden gap-10 lg:flex">
					<a href="#">About Us</a>
					<a href="#">Vision & Mission</a>
					<a href="#">Members</a>
					<a href="#">Partnership</a>
				</div>
				<Button
					variant="secondary"
					className="hidden bg-green-100 hover:bg-green-100/90 lg:block"
				>
					Contact Us
				</Button>
				<Button
					variant="secondary"
					className="px-3 py-1 bg-green-100 hover:bg-green-100/90 shrink-0 lg:hidden"
				>
					<AlignJustifyIcon className="size-6" />
				</Button>
			</div>
		</header>
	);
}
