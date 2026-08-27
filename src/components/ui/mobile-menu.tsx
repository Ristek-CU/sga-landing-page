import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useLocation } from "react-router";

import { useMobileMenuContext } from "@/contexts/mobile-menu-context";
import { cn } from "@/lib/utils";
import Button from "./button";

export default function MobileMenu() {
	const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenuContext();
	const { pathname } = useLocation();

	const onLinkClick = useCallback(() => {
		setIsMobileMenuOpen(false);
	}, [setIsMobileMenuOpen]);

	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname, setIsMobileMenuOpen]);

	useEffect(() => {
		if (!isMobileMenuOpen) return;

		const previousBodyOverflow = document.body.style.overflow;
		const previousHtmlOverflow = document.documentElement.style.overflow;
		document.body.style.overflow = "hidden";
		document.documentElement.style.overflow = "hidden";

		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsMobileMenuOpen(false);
		};
		window.addEventListener("keydown", closeOnEscape);

		return () => {
			document.body.style.overflow = previousBodyOverflow;
			document.documentElement.style.overflow = previousHtmlOverflow;
			window.removeEventListener("keydown", closeOnEscape);
		};
	}, [isMobileMenuOpen, setIsMobileMenuOpen]);

	const links = [
		{ label: "About Us", href: "/#about-us" },
		{ label: "Vision & Mission", href: "/#vision" },
		{ label: "Members", href: "/#division" },
		{ label: "Event", href: "/#event" },
		{ label: "Student Voice", href: "/student-voice" },
	];

	return (
		<nav
			id="mobile-navigation"
			aria-label="Navigasi utama"
			aria-hidden={!isMobileMenuOpen}
			className={cn(
				"fixed inset-0 z-40 h-[100dvh] w-full overflow-y-auto overscroll-contain bg-[#06455B]/98 text-white backdrop-blur-xl transition-[opacity,visibility] duration-300 ease-out lg:hidden",
				isMobileMenuOpen
					? "visible opacity-100"
					: "pointer-events-none invisible opacity-0",
			)}
		>
			<div className="relative mx-auto flex min-h-full w-full max-w-md flex-col px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(6.75rem+env(safe-area-inset-top))] sm:px-8 sm:pt-32">
				<div
					className="pointer-events-none absolute -right-24 top-28 size-64 rounded-full border-[42px] border-[#CEAE65]/10"
					aria-hidden="true"
				/>
				<p className="relative text-[11px] font-bold uppercase tracking-[0.24em] text-[#CEAE65]">
					Explore Cakrawala
				</p>
				<div className="relative mt-5 divide-y divide-white/12 border-y border-white/12">
					{links.map((link, index) => {
						const isActive =
							link.href === "/student-voice" && pathname === "/student-voice";
						return (
							<a
								key={link.href}
								href={link.href}
								onClick={onLinkClick}
								tabIndex={isMobileMenuOpen ? 0 : -1}
								className={cn(
									"group flex min-h-14 w-full items-center gap-4 py-3 text-left text-lg font-semibold tracking-[-0.02em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CEAE65]",
									isActive
										? "text-[#F0D899]"
										: "text-white hover:text-[#F0D899]",
								)}
							>
								<span className="w-5 font-mono text-[10px] text-white/40">
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="flex-1">{link.label}</span>
								<ArrowUpRight className="size-4 text-white/35 transition group-hover:text-[#CEAE65]" />
							</a>
						);
					})}
				</div>
				<Button
					variant="secondary"
					className="relative mt-6 w-full rounded-full bg-[#CEAE65] py-3 text-[#06455B] hover:bg-[#dcc47f]"
					tabIndex={isMobileMenuOpen ? 0 : -1}
				>
					Contact Us
				</Button>
				<p className="relative mt-auto pt-8 text-center text-[10px] uppercase tracking-[0.18em] text-white/40">
					SGA Cakrawala · Student Government Association
				</p>
			</div>
		</nav>
	);
}
