import { AlignJustifyIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import arvanaLogo from "@/assets/images/Logo-Arvana.png";
import sgaLogo from "@/assets/images/Logomark.webp";
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
		<header className="pointer-events-none fixed left-0 top-0 z-50 flex w-[100dvw] max-w-[100dvw] justify-center px-2 pt-[env(safe-area-inset-top)] transition-all sm:px-0">
			<div
				className={cn(
					"pointer-events-auto flex w-full origin-top transform-gpu items-center justify-between border text-white antialiased backface-hidden transition-all duration-500 ease-in-out",
					scrollY > 50
						? "mt-2 max-w-[calc(100%-0.5rem)] rounded-full border-white/20 bg-[#0f3d44]/88 px-3 py-2.5 shadow-2xl backdrop-blur-md sm:mt-4 sm:max-w-[95%] sm:px-5 sm:py-3 lg:mt-6 lg:max-w-5xl lg:px-10"
						: "mt-0 max-w-7xl rounded-none border-transparent bg-transparent px-2 py-4 sm:px-6 sm:py-6 lg:px-10",
				)}
			>
				<HashLink
					to="/#hero"
					href="/#hero"
					className="flex min-w-0 items-center gap-2.5 sm:gap-6"
				>
					<img
						src={sgaLogo}
						alt="SGA Logo"
						className={cn(
							"shrink-0 object-contain transition-all duration-500 ease-in-out",
							scrollY > 50 ? "size-8 sm:size-10" : "size-9 sm:size-12",
						)}
					/>
					<div className="h-7 w-px shrink-0 bg-white/30 sm:h-10" />
					<img
						src={arvanaLogo}
						alt="Arvana Logo"
						className={cn(
							"shrink-0 object-contain transition-all duration-500 ease-in-out",
							scrollY > 50 ? "size-8 sm:size-10" : "size-9 sm:size-12",
						)}
					/>
				</HashLink>

				<div className="items-center justify-center flex-1 hidden gap-8 lg:flex text-sm font-medium transform-gpu backface-hidden">
					<HashLink
						to="/#about-us"
						href="/#about-us"
						className="hover:text-[#D4B254] transition-colors duration-300"
					>
						About Us
					</HashLink>
					<HashLink
						to="/#vision"
						href="/#vision"
						className="hover:text-[#D4B254] transition-colors duration-300"
					>
						Vision & Mission
					</HashLink>
					<HashLink
						to="/#division"
						href="/#division"
						className="hover:text-[#D4B254] transition-colors duration-300"
					>
						Members
					</HashLink>
					{/* <HashLink to="/#our-partnership" href="/#our-partnership" className="hover:text-[#D4B254] transition-colors duration-300">
						Partnership
					</HashLink> */}
					<HashLink
						to="/#event"
						href="/#event"
						className="hover:text-[#D4B254] transition-colors duration-300"
					>
						Event
					</HashLink>
					<Link
						to="/student-voice"
						className="hover:text-[#D4B254] transition-colors duration-300"
					>
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
					className="relative size-10 shrink-0 overflow-hidden rounded-full border-none bg-[#D4B254] p-0 text-white hover:bg-[#c29f45] lg:hidden"
					onClick={toggleMobileMenu}
					aria-label={isMobileMenuOpen ? "Tutup navigasi" : "Buka navigasi"}
					aria-controls="mobile-navigation"
					aria-expanded={isMobileMenuOpen}
				>
					<AlignJustifyIcon
						className={cn(
							"absolute inset-0 m-auto size-6 scale-75 rotate-90 opacity-0 transition-all duration-300 ease-out",
							{ "scale-100 rotate-0 opacity-100": !isMobileMenuOpen },
						)}
					/>
					<XIcon
						className={cn(
							"absolute inset-0 m-auto size-6 scale-75 -rotate-90 opacity-0 transition-all duration-300 ease-out",
							{ "scale-100 rotate-0 opacity-100": isMobileMenuOpen },
						)}
					/>
				</Button>
			</div>
		</header>
	);
}
