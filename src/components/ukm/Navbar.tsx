import { useEffect, useState } from "react";

const LINKS = [
	{ href: "#beranda", label: "Beranda" },
	{ href: "#eksplorasi", label: "UKM" },
	{ href: "#tentang", label: "Tentang" },
];

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	return (
		<>
			<nav
				className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
					isScrolled ? "bg-[#062932] shadow-md py-4" : "bg-transparent py-6"
				}`}
			>
				<div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
					<a
						href="#beranda"
						className="text-white text-xl md:text-2xl font-bold tracking-wide z-[60]"
					>
						StudentSocieties<span className="text-[#D49D3A]">.</span>
					</a>

					<div className="hidden md:flex space-x-8 items-center text-white/90">
						{LINKS.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="hover:text-white transition-colors font-medium border-b-2 border-transparent hover:border-white pb-1"
							>
								{link.label}
							</a>
						))}
					</div>

					<div className="md:hidden z-[60]">
						<button
							type="button"
							className="text-white hover:text-gray-300 focus:outline-none"
							onClick={() => setIsMobileMenuOpen((v) => !v)}
							aria-label="Menu"
						>
							{isMobileMenuOpen ? (
								<svg
									className="w-7 h-7"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									className="w-7 h-7"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</nav>

			<div
				className={`fixed inset-0 bg-[#062932] z-40 transition-transform duration-300 ease-in-out flex flex-col justify-center items-center ${
					isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
				}`}
			>
				<div className="flex flex-col items-center justify-center w-full max-w-sm px-6">
					{LINKS.map((link) => (
						<a
							key={link.href}
							href={link.href}
							onClick={() => setIsMobileMenuOpen(false)}
							className="group w-full text-center py-4 border-b border-white/10"
						>
							<span className="text-white text-lg font-medium border-b-2 border-transparent group-hover:border-white pb-1 transition-colors">
								{link.label}
							</span>
						</a>
					))}
				</div>
			</div>
		</>
	);
}