import catalinaLogo from "@/assets/images/logo-catalina.png";
import sgaLogo from "@/assets/images/logo-sga.png";
import Button from "@/components/ui/button";

export default function Header() {
	return (
		<header className="absolute top-0 left-0 z-10 w-full">
			<div className="flex items-center justify-around w-full max-w-(--breakpoint-xl) px-10 py-10 mx-auto">
				<div className="flex items-center gap-6">
					<img src={sgaLogo} alt="SGA Logo" className="size-16 shrink-0" />
					<div className="w-[1px] h-16 bg-gray-50" />
					<img
						src={catalinaLogo}
						alt="Catalina Logo"
						className="size-16 shrink-0"
					/>
				</div>
				<div className="flex items-center justify-center flex-1 gap-10">
					<a href="#">About Us</a>
					<a href="#">Vision & Mission</a>
					<a href="#">Members</a>
					<a href="#">Partnership</a>
				</div>
				<Button variant="secondary">Contact Us</Button>
			</div>
		</header>
	);
}
