import { ArrowLeft, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import sgaLogo from "@/assets/images/logo-cakrawala.png";
import { UKM_NAV_LINKS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="sticky top-0 z-50 bg-[#08333e]/95 backdrop-blur border-b border-white/10 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between h-16 sm:h-20">
				{/* Logo / Brand */}
				<Link to="/" className="flex items-center gap-3 group">
					<img
						src={sgaLogo}
						alt="Logo Universitas Cakrawala"
						className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
					/>
					<div className="border-l border-white/20 pl-3">
						<span className="text-xs sm:text-sm font-bold tracking-tight block leading-none">
							Student Societies
						</span>
						<span className="text-[10px] sm:text-xs text-[#D49D3A] font-medium tracking-wide">
							SGA Cakrawala
						</span>
					</div>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden md:flex items-center gap-6 lg:gap-8">
					{UKM_NAV_LINKS.map((link) => {
						if (link.isRoute) {
							return (
								<Link
									key={link.to}
									to={link.to}
									className="text-xs lg:text-sm font-semibold text-slate-200 hover:text-[#D49D3A] transition-colors"
								>
									{link.label}
								</Link>
							);
						}
						return (
							<a
								key={link.to}
								href={link.href}
								className="text-xs lg:text-sm font-semibold text-slate-200 hover:text-[#D49D3A] transition-colors"
							>
								{link.label}
							</a>
						);
					})}
				</div>

				{/* CTA back to main site */}
				<div className="hidden md:flex items-center gap-4">
					<Link
						to="/"
						className={cn(
							"inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all",
							"bg-white/10 hover:bg-white/20 text-white border border-white/20",
						)}
					>
						<ArrowLeft className="w-3.5 h-3.5" />
						Website Utama
					</Link>
				</div>

				{/* Mobile menu trigger */}
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className="md:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
					aria-label="Toggle navigation menu"
				>
					{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>
			</div>

			{/* Mobile Dropdown */}
			{isOpen && (
				<div className="md:hidden bg-[#06262e] border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
					{UKM_NAV_LINKS.map((link) => {
						if (link.isRoute) {
							return (
								<Link
									key={link.to}
									to={link.to}
									onClick={() => setIsOpen(false)}
									className="block py-2 text-sm font-medium text-slate-200 hover:text-[#D49D3A]"
								>
									{link.label}
								</Link>
							);
						}
						return (
							<a
								key={link.to}
								href={link.href}
								onClick={() => setIsOpen(false)}
								className="block py-2 text-sm font-medium text-slate-200 hover:text-[#D49D3A]"
							>
								{link.label}
							</a>
						);
					})}
					<div className="pt-4 border-t border-white/10">
						<Link
							to="/"
							onClick={() => setIsOpen(false)}
							className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white"
						>
							<ArrowLeft className="w-3.5 h-3.5" />
							Kembali ke Website Utama
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}
