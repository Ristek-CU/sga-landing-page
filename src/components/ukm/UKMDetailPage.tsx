import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";

import ukmsData from "@/lib/data/ukm-section.json";
import { cn } from "@/lib/utils";
import {
	formatWhatsappLink,
	normalizeUKMList,
} from "@/lib/ukm-utils";

type TabType = "info" | "programs" | "documentation" | "management";

const ukmItems = normalizeUKMList(ukmsData as unknown[]);

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

	const banner = ukm.bannerUrl || ukm.image;
	const logoUrl = ukm.logoUrl;
	const logoSvg = ukm.logoSvg;
	const programs = ukm.programs;
	const management = ukm.management;
	const missions = ukm.mission;
	const documentations = ukm.documentations;

	const instagramLink = ukm.instagramUrl || "#";
	const whatsappLink = formatWhatsappLink(ukm.whatsapp);
	const registerLink = ukm.registrationUrl || "#";

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
							{ukm.categoryBadge && (
								<span className="inline-block px-3 py-1 text-xs font-bold bg-[#D49D3A] text-slate-950 rounded-md shadow-sm">
									{ukm.categoryBadge}
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
								"py-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2",
								activeTab === tab.key
									? "border-[#D49D3A] text-[#08333e]"
									: "border-transparent text-slate-500 hover:text-slate-800",
							)}
						>
							{tab.label}
							{tab.count !== undefined && tab.count > 0 && (
								<span
									className={cn(
										"px-2 py-0.5 rounded-full text-[10px]",
										activeTab === tab.key
											? "bg-[#D49D3A]/20 text-[#08333e]"
											: "bg-slate-100 text-slate-500",
									)}
								>
									{tab.count}
								</span>
							)}
						</button>
					))}
				</div>
			</div>

			{/* TAB CONTENT AREA */}
			<div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-10">
				<div ref={contentRef}>
					{activeTab === "info" && (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							<div className="lg:col-span-2 space-y-8">
								<div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
									<h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
										<span className="w-2 h-2 rounded-full bg-[#D49D3A]" />
										Tentang {ukm.name}
									</h3>
									<p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
										{ukm.shortDesc}
									</p>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
										<h4 className="text-base font-bold text-slate-900 mb-3 text-[#08333e]">
											Visi
										</h4>
										<p className="text-slate-600 text-sm leading-relaxed">
											{ukm.vision || "Belum ada visi tercatat."}
										</p>
									</div>
									<div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
										<h4 className="text-base font-bold text-slate-900 mb-3 text-[#08333e]">
											Misi
										</h4>
										{missions.length > 0 ? (
											<ul className="space-y-2">
												{missions.map((m, idx) => (
													<li
														key={idx}
														className="text-slate-600 text-sm flex items-start gap-2.5"
													>
														<span className="text-[#D49D3A] font-bold mt-0.5">
															•
														</span>
														<span>{m}</span>
													</li>
												))}
											</ul>
										) : (
											<p className="text-slate-500 text-sm">
												Belum ada misi tercatat.
											</p>
										)}
									</div>
								</div>
							</div>

							{/* Sidebar Action / Contact */}
							<div className="space-y-6">
								<div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
									<h3 className="text-base font-bold text-slate-900">
										Tertarik Bergabung?
									</h3>
									<p className="text-xs text-slate-500 leading-relaxed">
										Daftarkan dirimu sekarang dan jadilah bagian dari perjalanan
										seru bersama {ukm.name}!
									</p>
									<a
										href={registerLink}
										target="_blank"
										rel="noopener noreferrer"
										className={cn(
											"w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm text-white shadow-md transition-all",
											registerLink === "#"
												? "bg-slate-300 cursor-not-allowed pointer-events-none"
												: "bg-[#08333e] hover:bg-[#06262e]",
										)}
									>
										Daftar Anggota Sekarang
									</a>
								</div>

								<div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
									<h4 className="text-sm font-bold text-slate-900">
										Kontak & Sosial Media
									</h4>
									<div className="space-y-3 text-xs">
										{ukm.instagramUrl && (
											<a
												href={instagramLink}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-3 text-slate-600 hover:text-[#D49D3A] transition-colors"
											>
												<span className="font-semibold">Instagram:</span>
												<span className="truncate">{ukm.instagramUrl}</span>
											</a>
										)}
										{ukm.whatsapp && (
											<a
												href={whatsappLink}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-3 text-slate-600 hover:text-[#D49D3A] transition-colors"
											>
												<span className="font-semibold">WhatsApp:</span>
												<span>{ukm.whatsapp}</span>
											</a>
										)}
									</div>
								</div>
							</div>
						</div>
					)}

					{activeTab === "programs" && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{programs.length > 0 ? (
								programs.map((p, idx) => (
									<div
										key={idx}
										className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
									>
										<div>
											<div className="flex items-center justify-between gap-2 mb-3">
												<span className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-md">
													{p.category || "Kegiatan"}
												</span>
												{p.period && (
													<span className="text-[11px] text-[#D49D3A] font-semibold">
														{p.period}
													</span>
												)}
											</div>
											<h4 className="text-base font-bold text-slate-900 mb-2">
												{p.name}
											</h4>
											<p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
												{p.desc}
											</p>
										</div>
									</div>
								))
							) : (
								<p className="col-span-full text-center py-12 text-slate-500 text-sm">
									Belum ada program kerja yang diunggah.
								</p>
							)}
						</div>
					)}

					{activeTab === "documentation" && (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{documentations.length > 0 ? (
								documentations.map((d) => (
									<div
										key={d.id}
										className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm flex flex-col"
									>
										<div className="relative h-48 bg-slate-100 overflow-hidden">
											<img
												src={d.image}
												alt={d.title}
												className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
											/>
										</div>
										<div className="p-5 flex-1 flex flex-col justify-between">
											<div>
												{d.date && (
													<span className="text-[10px] text-[#D49D3A] font-semibold mb-1 block">
														{d.date}
													</span>
												)}
												<h4 className="text-sm font-bold text-slate-900 mb-1">
													{d.title}
												</h4>
												{d.description && (
													<p className="text-slate-500 text-xs leading-relaxed">
														{d.description}
													</p>
												)}
											</div>
										</div>
									</div>
								))
							) : (
								<p className="col-span-full text-center py-12 text-slate-500 text-sm">
									Belum ada dokumentasi yang diunggah.
								</p>
							)}
						</div>
					)}

					{activeTab === "management" && (
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
							{management.length > 0 ? (
								management.map((m, idx) => (
									<div
										key={idx}
										className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center flex flex-col items-center"
									>
										<div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 border border-slate-200 overflow-hidden mb-3 flex items-center justify-center">
											{m.avatar ? (
												<img
													src={m.avatar}
													alt={m.name}
													className="w-full h-full object-cover"
												/>
											) : (
												<span className="text-base sm:text-lg font-bold text-slate-400">
													{m.name.substring(0, 2).toUpperCase()}
												</span>
											)}
										</div>
										<h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
											{m.name}
										</h4>
										<p className="text-[11px] text-[#D49D3A] font-medium mt-0.5">
											{m.role}
										</p>
										{m.division && (
											<span className="text-[10px] text-slate-400 mt-1">
												{m.division}
											</span>
										)}
									</div>
								))
							) : (
								<p className="col-span-full text-center py-12 text-slate-500 text-sm">
									Belum ada struktur pengurus yang diunggah.
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
