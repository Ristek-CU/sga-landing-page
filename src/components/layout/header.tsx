import { AlignJustifyIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import catalinaLogo from "@/assets/images/logo-catalina.png";
import sgaLogo from "@/assets/images/logo-sga.png";
import Button from "@/components/ui/button";
import { useMobileMenuContext } from "@/contexts/mobile-menu-context";
import { cn } from "@/lib/utils";

export default function Header() {
	const { pathname } = useLocation();
	const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenuContext();
	const [scrollY, setScrollY] = useState(() => window.scrollY);

	useEffect(() => {
		const handleScroll = () => {
			// Gunakan requestAnimationFrame agar performa scroll lebih ringan
			window.requestAnimationFrame(() => {
				setScrollY(window.scrollY);
			});
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const HashLink = pathname === "/" ? "a" : Link;

	return (
		<header className="fixed top-0 left-0 z-50 w-full flex justify-center pointer-events-none transition-all">
			<div
				className={cn(
					"pointer-events-auto flex items-center justify-between w-full text-white transition-all duration-500 ease-in-out border origin-top transform-gpu backface-hidden antialiased",
					scrollY > 50
						? "max-w-[95%] lg:max-w-5xl mt-4 lg:mt-6 bg-[#0f3d44]/75 backdrop-blur-md border-white/20 shadow-2xl py-3 px-6 lg:px-10 rounded-full"
						: "max-w-7xl mt-0 bg-transparent border-transparent py-6 px-6 lg:px-10 rounded-none"
				)}
			>
				<HashLink
					to="/#hero"
					href="/#hero"
					className="flex items-center gap-4 sm:gap-6"
				>
					<img
						src={sgaLogo}
						alt="SGA Logo"
						className={cn(
							"shrink-0 object-contain transition-all duration-500 ease-in-out",
							scrollY > 50 ? "size-9 sm:size-10" : "size-10 sm:size-12"
						)}
					/>
					<div className="w-[1px] h-8 sm:h-10 bg-white/30" />
					<img
						src={catalinaLogo}
						alt="Catalina Logo"
						className={cn(
							"shrink-0 object-contain transition-all duration-500 ease-in-out",
							scrollY > 50 ? "size-9 sm:size-10" : "size-10 sm:size-12"
						)}
					/>
				</HashLink>

				<div className="items-center justify-center flex-1 hidden gap-8 lg:flex text-sm font-medium transform-gpu backface-hidden">
					<HashLink to="/#about-us" href="/#about-us" className="hover:text-[#D4B254] transition-colors duration-300">
						About Us
					</HashLink>
					<HashLink to="/#vision" href="/#vision" className="hover:text-[#D4B254] transition-colors duration-300">
						Vision & Mission
					</HashLink>
					<HashLink to="/#division" href="/#division" className="hover:text-[#D4B254] transition-colors duration-300">
						Members
					</HashLink>
					{/* <HashLink to="/#our-partnership" href="/#our-partnership" className="hover:text-[#D4B254] transition-colors duration-300">
						Partnership
					</HashLink> */}
					<HashLink to="/#event" href="/#event" className="hover:text-[#D4B254] transition-colors duration-300">
						Event
					</HashLink>
					<Link to="/student-voice" className="hover:text-[#D4B254] transition-colors duration-300">
						Student Voice
					</Link>
				</div>

				<Button
					variant="secondary"
					className="hidden lg:block bg-[#D4B254] hover:bg-[#c29f45] text-white border-none rounded-full px-8 py-2 transition-all font-medium"
				>
					Contact us
				</Button>

				<Button
					variant="secondary"
					className="relative overflow-hidden bg-[#D4B254] text-white size-10 hover:bg-[#c29f45] shrink-0 lg:hidden rounded-full border-none"
					onClick={toggleMobileMenu}
				>
					<AlignJustifyIcon
						className={cn(
							"absolute inset-0 m-auto size-6 opacity-0 transition-all duration-300 ease-out -translate-x-10",
							{ "opacity-100 translate-x-0": !isMobileMenuOpen }
						)}
					/>
					<XIcon
						className={cn(
							"absolute inset-0 m-auto size-6 opacity-0 transition-all duration-300 ease-out translate-x-10",
							{ "opacity-100 translate-x-0": isMobileMenuOpen }
						)}
					/>
				</Button>
			</div>
		</header>
	);
}