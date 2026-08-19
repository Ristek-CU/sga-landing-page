import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";

import ukmsData from "@/lib/data/ukm-section.json";
import type { UKMItem } from "@/types/ukm";
import { cn } from "@/lib/utils";
import { formatWhatsappLink, getInitials, isImageUrl } from "@/lib/ukm-utils";

type TabType = "info" | "programs" | "documentation" | "management";

const ukmItems = ukmsData as unknown as UKMItem[];

export default function UKMDetailPage() {
	const { id } = useParams<{ id: string }>();
	const [activeTab, setActiveTab] = useState<TabType>("info");
	const contentRef = useRef<HTMLDivElement>(null);

	const ukm = ukmItems.find((item) => String(item.id) === String(id));

	// Tab transition animation
	useEffect(() => {
		if (ukm && contentRef.current) {
			gsap.fromTo(
				contentRef.current,
				{ opacity: 0, y: 15 },
				{ opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
			);
		}
	}, [ukm, activeTab]);

	if (!ukm) {
		return (
			<div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
				<h2 className="text-2xl font-bold text-slate-800 mb-2">
					UKM Tidak Ditemukan
				</h2>
				<p className="text-sm text-slate-500 mb-6 max-w-md">
					Data Unit Kegiatan Mahasiswa yang Anda cari tidak tersedia atau
					telah dihapus.
				</p>
				<Link
					to="/student-societes"
					className={cn(
						"px-6 py-2.5 rounded-xl shadow-md transition-all",
						"bg-[#08333e] hover:bg-[#06262e] text-white text-xs font-bold",
					)}
				>
					Kembali ke Daftar UKM
				</Link>
			</div>
		);
	}

	const banner =
		ukm.bannerUrl ||
		ukm.image ||
		"https://via.placeholder.com/1200x500?text=No+Image";
	const logoUrl = ukm.logoUrl;
	const logoSvg = ukm.logoSvg;
	const programs = ukm.programs || [];
	const management = ukm.management || [];
	const missions = ukm.mission || [];
	const documentations = ukm.documentations || [];

	const instagramLink = ukm.instagram || ukm.instagramUrl || "#";
	const whatsappLink = formatWhatsappLink(
		ukm.whatsapp || ukm.phone || ukm.contactPhone,
	);
	const registerLink = ukm.registrationUrl || ukm.registerUrl || "#";

	const tabList: { key: TabType; label: string; count?: number }[] = [
		{ key: "info", label: "Tentang & Visi Misi" },
		{ key: "programs", label: "Program Kerja", count: programs.length },
		{
			key: "documentation",
			label: "Dokumentasi",
			count: documentations.length,
		},
		{ key: "management", label: "Pengurus", count: management.length },
	];

	return (
		<div className="min-h-screen bg-slate-50 flex flex-col w-full">
			{/* HERO BANNER */}
			<div className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] bg-slate-900 shrink-0">
				<img src={banner} alt={ukm.name} className="w-full h-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />

				<div className="absolute top-6 left-4 sm:left-8 lg:left-12 z-10">
					<Link
						to="/student-societes"
						className={cn(
							"inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all shadow-lg",
							"bg-black/40 hover:bg-black/70 border border-white/20 backdrop-blur-md",
							"text-white text-xs font-bold",
						)}
					>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2.5"
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
						Kembali
					</Link>
				</div>

				<div className="absolute bottom-0 left-0 right-0 pb-8 pt-16 px-4 sm:px-8 lg:px-12">
					<div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end gap-5">
						{(logoSvg || logoUrl) && (
							<div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-3 border border-white/20 shadow-2xl shrink-0 flex items-center justify-center text-slate-800">
								{logoSvg ? (
									<div
										className="w-full h-full flex items-center justify-center"
										dangerouslySetInnerHTML={{ __html: logoSvg }}
									/>
								) : (
									<img
										src={logoUrl}
										alt={ukm.name}
										className="w-full h-full object-cover rounded-xl"
									/>
								)}
							</div>
						)}
						<div className="text-white space-y-2">
							{(ukm.category || ukm.categoryBadge) && (
								<span className="inline-block px-3 py-1 text-xs font-bold bg-[#D49D3A] text-slate-950 rounded-md shadow-sm">
									{ukm.category || ukm.categoryBadge}
								</span>
							)}
							<h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight drop-shadow-md">
								{ukm.name}
							</h1>
							{ukm.members && (
								<p className="text-xs sm:text-sm text-slate-300 font-medium">
									{ukm.members}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* STICKY TAB NAV */}
			<div className="sticky top-0 z-30 w-full bg-white border-b border-slate-200 shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex overflow-x-auto gap-6 sm:gap-10">
					{tabList.map((tab) => (
						<button
							key={tab.key}
							onClick={() => setActiveTab(tab.key)}
							className={cn(
								"py-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap",
								activeTab === tab.key
									? "border-[#08333e] text-[#08333e]"
									: "border-transparent text-slate-500 hover:text-slate-800",
							)}
						>
							{tab.label}{" "}
							{tab.count !== undefined && `(${tab.count})`}
						</button>
					))}
				</div>
			</div>

			{/* CONTENT */}
			<main
				ref={contentRef}
				className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12"
			>
				{activeTab === "info" && (
					<div className="space-y-8">
						<section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
							<h3 className="font-bold text-slate-900 text-base sm:text-lg mb-4 pb-3 border-b border-slate-100">
								Tentang UKM
							</h3>
							<p className="text-slate-600 leading-relaxed text-xs sm:text-sm whitespace-pre-line">
								{ukm.fullDesc || ukm.shortDesc || "Belum ada deskripsi."}
							</p>
						</section>

						{ukm.vision && (
							<section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
								<h3 className="font-bold text-slate-900 text-base sm:text-lg mb-4 pb-3 border-b border-slate-100">
									Visi
								</h3>
								<p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
									{ukm.vision}
								</p>
							</section>
						)}

						{missions.length > 0 && (
							<section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
								<h3 className="font-bold text-slate-900 text-base sm:text-lg mb-4 pb-3 border-b border-slate-100">
									Misi Utama
								</h3>
								<ul className="space-y-3 text-xs sm:text-sm text-slate-600">
									{missions.map((m, idx) => (
										<li key={idx} className="flex items-start gap-3">
											<svg
												className="w-5 h-5 text-[#D49D3A] shrink-0 mt-0.5"
												fill="none"
												stroke="currentColor"
												strokeWidth="2.5"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M5 13l4 4L19 7"
												/>
											</svg>
											<span className="leading-snug">{m}</span>
										</li>
									))}
								</ul>
							</section>
						)}
					</div>
				)}

				{activeTab === "programs" && (
					<section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
						<div className="flex items-center gap-2 pb-4 border-b border-slate-100">
							<svg
								className="w-5 h-5 text-[#D49D3A]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
								/>
							</svg>
							<h3 className="font-bold text-slate-900 text-base sm:text-lg">
								Program Kerja Unggulan
							</h3>
						</div>

						<div className="grid grid-cols-1 gap-4">
							{programs.length > 0 ? (
								programs.map((prog, idx) => (
									<div
										key={idx}
										className="p-5 bg-white rounded-xl border border-slate-200/90 border-l-4 border-l-[#D49D3A] shadow-sm hover:shadow-md transition-shadow"
									>
										<div className="flex flex-wrap items-center justify-between gap-2 mb-2">
											<h4 className="font-bold text-slate-900 text-sm sm:text-base">
												{prog.name || prog.title}
											</h4>
											<span className="px-3 py-1 text-[10px] font-bold tracking-wider text-[#9a6f23] bg-amber-50 border border-amber-200 rounded-full shrink-0 uppercase">
												{prog.category || prog.badge || "PROGRAM"}
											</span>
										</div>

										{(prog.period || prog.schedule || prog.time) && (
											<div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3 font-medium">
												<svg
													className="w-4 h-4 text-slate-400"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<circle cx="12" cy="12" r="10" strokeWidth="2" />
													<path
														strokeWidth="2"
														strokeLinecap="round"
														d="M12 6v6l4 2"
													/>
												</svg>
												<span>{prog.period || prog.schedule || prog.time}</span>
											</div>
										)}

										<p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
											{prog.desc}
										</p>
									</div>
								))
							) : (
								<p className="text-slate-400 italic text-xs">
									Belum ada data program kerja.
								</p>
							)}
						</div>
					</section>
				)}

				{activeTab === "documentation" && (
					<section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
						<div className="flex items-center justify-between pb-4 border-b border-slate-100">
							<div className="flex items-center gap-2">
								<svg
									className="w-5 h-5 text-[#D49D3A]"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								<h3 className="font-bold text-slate-900 text-base sm:text-lg">
									Dokumentasi & Galeri Kegiatan
								</h3>
							</div>
							<span className="text-xs font-semibold text-slate-400">
								{documentations.length} Foto & Berita
							</span>
						</div>

						{documentations.length > 0 ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{documentations.map((item, idx) => (
									<div
										key={item.id || idx}
										className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
									>
										<div className="relative w-full aspect-video bg-slate-100 overflow-hidden">
											<img
												src={item.image}
												alt={item.title}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
												loading="lazy"
											/>
											{item.date && (
												<div className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold bg-black/60 text-white backdrop-blur-md rounded-md shadow-sm">
													{item.date}
												</div>
											)}
										</div>

										<div className="p-5 flex flex-col flex-1 justify-between space-y-3">
											<div>
												<h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-[#08333e] transition-colors mb-2">
													{item.title}
												</h4>
												{item.description && (
													<p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
														{item.description}
													</p>
												)}
											</div>

											{item.date && (
												<div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium pt-3 border-t border-slate-100">
													<svg
														className="w-3.5 h-3.5 text-slate-400"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<rect
															x="3"
															y="4"
															width="18"
															height="18"
															rx="2"
															strokeWidth="2"
														/>
														<path
															strokeWidth="2"
															strokeLinecap="round"
															d="M16 2v4M8 2v4M3 10h18"
														/>
													</svg>
													<span>{item.date}</span>
												</div>
											)}
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
								<svg
									className="w-12 h-12 text-slate-300 mx-auto mb-3"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1.5"
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								<p className="text-slate-500 font-medium text-xs sm:text-sm">
									Belum ada dokumentasi kegiatan yang diunggah.
								</p>
							</div>
						)}
					</section>
				)}

				{activeTab === "management" && (
					<section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
						<h3 className="font-bold text-slate-900 text-base sm:text-lg pb-4 border-b border-slate-100">
							Struktur Pengurus UKM
						</h3>

						{management.length > 0 ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
								{management.map((p, idx) => (
									<div
										key={idx}
										className="p-4 bg-white rounded-xl border border-slate-200/90 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
									>
										<div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 font-bold text-slate-700 text-sm border border-slate-200 overflow-hidden">
											{p.avatar && isImageUrl(p.avatar) ? (
												<img
													src={p.avatar}
													alt={p.name}
													className="w-full h-full object-cover"
												/>
											) : (
												<span>{getInitials(p.name, p.avatar)}</span>
											)}
										</div>
										<div className="min-w-0 flex-1">
											<p className="text-[10px] font-bold uppercase tracking-wider text-slate-800 leading-none mb-1">
												{p.role || "PENGURUS"}
											</p>
											<p className="font-bold text-slate-900 text-xs sm:text-sm truncate leading-snug">
												{p.name}
											</p>
											<p className="text-xs text-slate-400 truncate mt-0.5">
												{p.division}
											</p>
										</div>
									</div>
								))}
							</div>
						) : (
							<p className="text-slate-400 italic text-xs">
								Belum ada data pengurus.
							</p>
						)}
					</section>
				)}
			</main>

			{/* FOOTER BAR */}
			<footer className="w-full bg-white border-t border-slate-200 py-6 px-4 sm:px-8 lg:px-12 mt-auto">
				<div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<a
							href={instagramLink}
							target="_blank"
							rel="noopener noreferrer"
							title="Instagram UKM"
							className={cn(
								"w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center",
								"text-slate-700 hover:bg-slate-50 hover:text-pink-600 transition-all shadow-sm active:scale-95",
							)}
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
						</a>

						<a
							href={whatsappLink}
							target="_blank"
							rel="noopener noreferrer"
							title="Kontak / WhatsApp UKM"
							className={cn(
								"w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center",
								"text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-all shadow-sm active:scale-95",
							)}
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.8"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
						</a>
					</div>

					<a
						href={registerLink}
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							"px-8 py-3 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all duration-200",
							"bg-[#22c55e] hover:bg-[#16a34a] text-white active:scale-95 flex items-center justify-center",
						)}
					>
						Daftar Sekarang
					</a>
				</div>
			</footer>
		</div>
	);
}