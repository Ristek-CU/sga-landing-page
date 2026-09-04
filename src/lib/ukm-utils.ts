import type { ProgramKerja, UKMDocumentation, UKMItem } from "@/types/ukm";

/**
 * Utility Highlight Text Parsing
 */
export interface TextToken {
	text: string;
	isHighlight: boolean;
}

export function parseHighlightText(text: string, highlight: string): TextToken[] {
	if (!highlight) return [{ text, isHighlight: false }];
	const regex = new RegExp(`(${highlight})`, "gi");
	return text.split(regex).map((part) => ({
		text: part,
		isHighlight: part.toLowerCase() === highlight.toLowerCase(),
	}));
}

/**
 * Utility Ekstraksi Kategori
 */
export function processCategories(
	catData: { id: string; name: string }[] | null,
	items: UKMItem[],
): string[] {
	if (catData) {
		const formattedCat = catData.map((c) => c.name);
		return Array.from(
			new Set(
				["Semua", ...formattedCat.filter((c) => c && c !== "Semua")],
			),
		);
	}

	const extractedCat = items
		.map((item) => item.category)
		.filter((c): c is string => Boolean(c) && c !== "Semua");
	return Array.from(new Set(["Semua", ...extractedCat]));
}

/**
 * Utility Filter UKM
 */
export function filterUkms(
	ukmList: UKMItem[],
	selectedCategory: string,
	searchQuery: string,
): UKMItem[] {
	const query = searchQuery.toLowerCase().trim();

	return ukmList.filter((ukm) => {
		const matchesCategory =
			selectedCategory === "Semua" || ukm.category === selectedCategory;

		const matchesSearch =
			!query ||
			ukm.name.toLowerCase().includes(query) ||
			ukm.shortDesc?.toLowerCase().includes(query) ||
			ukm.category.toLowerCase().includes(query);

		return matchesCategory && matchesSearch;
	});
}

export function isImageUrl(url?: string): boolean {
	if (!url) return false;
	return (
		url.startsWith("http://") ||
		url.startsWith("https://") ||
		url.startsWith("/")
	);
}

export function getInitials(name?: string, avatarInitials?: string): string {
	if (avatarInitials && !isImageUrl(avatarInitials)) return avatarInitials;
	if (!name) return "P";
	return name
		.split(" ")
		.filter(Boolean)
		.map((n) => n[0])
		.join("")
		.substring(0, 2)
		.toUpperCase();
}

/**
 * Normalizes a raw UKM record into a canonical UKMItem.
 * Resolves legacy aliases at ingestion time so UI callers have a single clean shape.
 */
export function normalizeUKMItem(raw: Record<string, unknown>): UKMItem {
	const rawPrograms = Array.isArray(raw.programs) ? raw.programs : [];
	const programs: ProgramKerja[] = rawPrograms.map(
		(p: Record<string, unknown>) => ({
			name: String(p.name || p.title || "Program Kerja"),
			desc: String(p.desc || ""),
			period: (p.period || p.schedule || p.time) as string | undefined,
			category: (p.category || p.badge) as string | undefined,
		}),
	);

	const rawManagement = Array.isArray(raw.management) ? raw.management : [];
	const management = rawManagement.map((m: Record<string, unknown>) => ({
		name: String(m.name || "Pengurus"),
		role: String(m.role || ""),
		avatar: m.avatar as string | undefined,
		division: m.division as string | undefined,
	}));

	const rawDocs = raw.documentations || raw.documentation;
	const documentations = normalizeDocumentations(rawDocs);

	const whatsappNumber =
		raw.whatsapp || raw.phone || raw.contactPhone;
	const whatsapp =
		typeof whatsappNumber === "string" || typeof whatsappNumber === "number"
			? String(whatsappNumber)
			: undefined;

	const instagramUrl = (raw.instagramUrl || raw.instagram) as
		| string
		| undefined;

	const registrationUrl = (raw.registrationUrl || raw.registerUrl) as
		| string
		| undefined;

	return {
		id: (raw.id as string | number) ?? "",
		name: String(raw.name || ""),
		category: String(raw.category || ""),
		shortDesc: String(raw.shortDesc || raw.fullDesc || ""),
		vision: String(raw.vision || ""),
		mission: Array.isArray(raw.mission) ? (raw.mission as string[]) : [],
		image: String(
			raw.image || raw.bannerUrl || "https://via.placeholder.com/1200x500?text=No+Image",
		),
		bannerUrl: (raw.bannerUrl || raw.image) as string | undefined,
		members: String(raw.members || raw.membersCount || ""),
		programs,
		management,
		documentations,
		categoryBadge: (raw.categoryBadge || raw.category) as string | undefined,
		logoSvg: raw.logoSvg as string | undefined,
		logoUrl: raw.logoUrl as string | undefined,
		instagramUrl,
		whatsapp,
		registrationUrl,
	};
}

export function normalizeUKMList(rawList: unknown[]): UKMItem[] {
	if (!Array.isArray(rawList)) return [];
	return rawList.map((item) => normalizeUKMItem(item as Record<string, unknown>));
}

export function normalizeDocumentations(rawDocs: unknown): UKMDocumentation[] {
	if (!Array.isArray(rawDocs)) return [];

	return rawDocs.map((item: unknown, idx: number) => {
		if (typeof item === "string") {
			return {
				id: idx,
				image: item,
				title: `Dokumentasi ${idx + 1}`,
				description: "",
				date: "",
			};
		}
		const d = (item as Record<string, unknown>) || {};
		return {
			id: (d.id as string | number | undefined) ?? idx,
			image:
				(d.image as string | undefined) ||
				(d.url as string | undefined) ||
				(d.src as string | undefined) ||
				"https://via.placeholder.com/600x400?text=Dokumentasi",
			title:
				(d.title as string | undefined) ||
				(d.name as string | undefined) ||
				(d.caption as string | undefined) ||
				`Kegiatan ${idx + 1}`,
			description:
				(d.description as string | undefined) || (d.desc as string | undefined) || "",
			date:
				(d.date as string | undefined) ||
				(d.period as string | undefined) ||
				(d.time as string | undefined) ||
				"",
		};
	});
}

export function formatWhatsappLink(
	phone?: string,
	fallbackUrl = "#",
): string {
	if (!phone) return fallbackUrl;
	if (phone.startsWith("http://") || phone.startsWith("https://"))
		return phone;
	const cleanPhone = phone.replace(/[^0-9]/g, "");
	return cleanPhone ? `https://wa.me/${cleanPhone}` : fallbackUrl;
}

export interface GuideStep {
	id: number;
	text: string;
}

export const DEFAULT_GUIDE_STEPS: GuideStep[] = [
	{
		id: 1,
		text: "Mahasiswa baru wajib mengikuti UKM yang sudah ada terlebih dahulu.",
	},
	{
		id: 2,
		text: "Menghubungi Student Societies Development SGA melalui contact person yang tersedia.",
	},
	{
		id: 3,
		text: "Menyusun proposal (program kerja, struktur pengurus dengan minimal 10 anggota, dan logo) menggunakan template yang disediakan.",
	},
	{
		id: 4,
		text: "Proposal direview oleh Student Societies Development SGA.",
	},
	{
		id: 5,
		text: "Proposal diteruskan ke Student Innovation Center (SIC) untuk review dan persetujuan.",
	},
	{
		id: 6,
		text: "Jika disetujui, proses pembentukan UKM dapat dilanjutkan.",
	},
];
