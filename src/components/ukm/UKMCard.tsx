import { Link } from "react-router";

import type { UKMItem } from "@/types/ukm";
import { cn } from "@/lib/utils";
import { getInitials, isImageUrl } from "@/lib/ukm-utils";

interface UKMCardProps {
	ukm: UKMItem;
	className?: string;
}

export default function UKMCard({ ukm, className }: UKMCardProps) {
	const coverImage =
		ukm.bannerUrl ||
		ukm.image ||
		"https://via.placeholder.com/600x400?text=No+Image";
	const logoUrl = ukm.logoUrl || ukm.image;
	const logoSvg = ukm.logoSvg;
	const memberText = ukm.members || ukm.membersCount;
	const categoryText = ukm.category || ukm.categoryBadge;
	const instagramLink = ukm.instagramUrl || ukm.instagram;

	return (
		<div
			className={cn(
				"group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between h-full",
				"transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl",
				className,
			)}
		>
			<div>
				{/* COVER BANNER */}
				<div className="relative h-44 w-full overflow-hidden bg-slate-100">
					<img
						src={coverImage}
						alt={ukm.name || "UKM Image"}
						className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
						loading="lazy"
					/>
					{categoryText && (
						<div className="absolute top-3 left-3">
							<span className="px-3 py-1 text-[11px] font-bold bg-[#D49D3A] text-slate-900 rounded-md shadow-sm">
								{categoryText}
							</span>
						</div>
					)}
				</div>

				{/* KONTEN KARTU */}
				<div className="p-4 sm:p-5">
					<div className="flex items-start gap-3">
						<div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center text-slate-700 font-bold text-xs p-0.5">
							{logoSvg ? (
								<div
									className="w-full h-full flex items-center justify-center p-1"
									dangerouslySetInnerHTML={{ __html: logoSvg }}
								/>
							) : isImageUrl(logoUrl) ? (
								<img
									src={logoUrl}
									alt={ukm.name}
									className="w-full h-full object-cover rounded-full"
								/>
							) : (
								<span>{getInitials(ukm.name)}</span>
							)}
						</div>

						<div>
							<h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-1">
								{ukm.name}
							</h3>
							{memberText && (
								<div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mt-0.5">
									<svg
										className="w-3.5 h-3.5 text-slate-500 shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
										/>
									</svg>
									<span>
										{typeof memberText === "number"
											? `${memberText}+ Anggota`
											: memberText}
									</span>
								</div>
							)}
						</div>
					</div>

					<p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
						{ukm.shortDesc || ukm.fullDesc || "Belum ada deskripsi singkat."}
					</p>
				</div>
			</div>

			{/* FOOTER & BUTTON */}
			<div className="px-4 sm:px-5 pb-4 pt-1 flex items-center justify-between border-t border-slate-100/60 mt-2">
				<div className="flex items-center gap-3 text-slate-500">
					{instagramLink && (
						<a
							href={instagramLink}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Instagram ${ukm.name}`}
							className="hover:text-pink-600 transition-colors p-1 rounded-md hover:bg-slate-50"
						>
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
						</a>
					)}
				</div>

				<Link
					to={`/student-societes/${ukm.id}`}
					className={cn(
						"bg-[#08333e] hover:bg-[#06262e] active:scale-95 text-white text-xs font-semibold",
						"px-4 py-2 rounded-lg transition-all duration-150 shadow-sm inline-block text-center",
					)}
				>
					Detail UKM
				</Link>
			</div>
		</div>
	);
}