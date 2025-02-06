import { useCallback } from "react";

import { useMobileMenuContext } from "@/contexts/mobile-menu-context";
import { cn } from "@/lib/utils";
import Button from "./button";

export default function MobileMenu() {
	const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenuContext();

	const onLinkClick = useCallback(() => {
		setIsMobileMenuOpen(false);
	}, []);

	return (
		<nav
			className={cn(
				"fixed top-0 right-0 pt-30 px-5 flex flex-col gap-y-10 w-full h-full min-h-screen gap-5 text-white transition-transform duration-500 ease-out bg-blue-900/70 backdrop-blur-lg z-25 sm:pt-40 lg:hidden",
				isMobileMenuOpen ? "translate-x-0" : "translate-x-full not-sr-only",
			)}
		>
			<a href="#about-us" onClick={onLinkClick}>
				About Us
			</a>
			<a href="#vision" onClick={onLinkClick}>
				Vision & Mission
			</a>
			<a href="#division" onClick={onLinkClick}>
				Members
			</a>
			<a href="#our-partnership" onClick={onLinkClick}>
				Partnership
			</a>
			<Button
				variant="secondary"
				className="mt-2 bg-green-100 hover:bg-green-100/90"
			>
				Contact Us
			</Button>
		</nav>
	);
}
