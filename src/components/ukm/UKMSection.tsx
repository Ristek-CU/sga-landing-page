import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";

import ukmsData from "@/lib/data/ukm-section.json";
import ukmCategoriesData from "@/lib/data/ukm-categories.json";
import type { UKMItem } from "@/types/ukm";
import { cn } from "@/lib/utils";
import { filterUkms, processCategories } from "@/lib/ukm-utils";
import UKMCard from "./UKMCard";

gsap.registerPlugin(ScrollTrigger);

const ukmItems = ukmsData as unknown as UKMItem[];

export default function UKMSection() {
	const [categories] = useState<string[]>(() =>
		processCategories(ukmCategoriesData, ukmItems),
	);
	const [selectedCategory, setSelectedCategory] = useState("Semua");
	const [searchQuery, setSearchQuery] = useState("");

	const sectionRef = useRef<HTMLElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const isInitialRender = useRef(true);

	const filteredUkms = useMemo(
		() => filterUkms(ukmItems, selectedCategory, searchQuery),
		[selectedCategory, searchQuery],
	);

	// Scroll-trigger animation on first load
	useEffect(() => {
		if (!sectionRef.current) return;

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					toggleActions: "play none none none",
				},
			});

			tl.from(".gsap-ukm-header", {
				y: 40,
				opacity: 0,
				duration: 0.6,
				stagger: 0.15,
				ease: "power2.out",
			})
				.from(
					".gsap-ukm-filter",
					{
						y: 30,
						opacity: 0,
						duration: 0.5,
						stagger: 0.1,
						ease: "power2.out",
					},
					"-=0.3",
				)
				.from(
					".gsap-card-item",
					{
						y: 40,
						opacity: 0,
						duration: 0.5,
						stagger: 0.08,
						ease: "power2.out",
					},
					"-=0.2",
				);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	// Filter/search animation (skip initial render)
	useEffect(() => {
		if (!gridRef.current) return;

		if (isInitialRender.current) {
			isInitialRender.current = false;
			return;
		}

		const ctx = gsap.context(() => {
			gsap.fromTo(
				".gsap-card-item",
				{ y: 20, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.35,
					stagger: 0.05,
					ease: "power2.out",
					overwrite: "auto",
				},
			);
		}, gridRef);

		return () => ctx.revert();
	}, [selectedCategory, searchQuery]);

	return (
		<section
			ref={sectionRef}
			id="eksplorasi"
			className="py-16 bg-[#F8FAFC] min-h-screen"
		>
			<div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8">
				{/* HEADER SECTION */}
				<div className="text-center max-w-2xl mx-auto mb-8">
					<h2 className="gsap-ukm-header text-2xl sm:text-3xl font-extrabold text-[#08333e]">
						Eksplorasi UKM
					</h2>
					<p className="gsap-ukm-header text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">
						Temukan berbagai Unit Kegiatan Mahasiswa di{" "}
						<strong className="text-slate-800">Universitas Cakrawala</strong>{" "}
						dan bergabunglah dengan komunitas yang mendukung minat, relasi,
						serta pengembangan dirimu.
					</p>
				</div>

				{/* SEARCH BAR */}
				<div className="gsap-ukm-filter max-w-md mx-auto mb-6">
					<input
						type="text"
						placeholder="Cari nama UKM atau kategori..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className={cn(
							"w-full px-5 py-2.5 rounded-full shadow-sm transition-all",
							"text-xs sm:text-sm text-slate-700 bg-white border border-slate-200",
							"focus:outline-none focus:border-[#08333e]",
						)}
					/>
				</div>

				{/* FILTER CATEGORY BUTTONS */}
				<div className="gsap-ukm-filter flex flex-wrap items-center justify-center gap-2.5 mb-10">
					{categories.map((cat) => {
						const isActive = selectedCategory === cat;
						return (
							<button
								key={cat}
								onClick={() => setSelectedCategory(cat)}
								className={cn(
									"px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 active:scale-95 bg-white",
									isActive
										? "text-slate-900 border-2 border-slate-900 shadow-sm"
										: "text-slate-600 border border-slate-200 hover:border-slate-400",
								)}
							>
								{cat}
							</button>
						);
					})}
				</div>

				{/* GRID UKM */}
				{filteredUkms.length > 0 ? (
					<div
						ref={gridRef}
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
					>
						{filteredUkms.map((ukm) => (
							<div key={ukm.id} className="gsap-card-item">
								<UKMCard ukm={ukm} />
							</div>
						))}
					</div>
				) : (
					<div className="text-center py-12 bg-white rounded-xl border border-slate-200">
						<p className="text-xs text-slate-500 font-medium">
							Tidak ada UKM yang ditemukan.
						</p>
					</div>
				)}
			</div>
		</section>
	);
}