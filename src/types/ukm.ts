export interface ProgramKerja {
	name?: string;
	title?: string;
	desc: string;
	period?: string;
	schedule?: string;
	time?: string;
	category?: string;
	badge?: string;
}

export interface PengurusUKM {
	name: string;
	role: string;
	avatar?: string;
	division?: string;
}

export interface UKMDocumentation {
	id?: string | number;
	image?: string;
	title?: string;
	description?: string;
	date?: string;
}

export interface UKMItem {
	id: string | number;
	name: string;
	category: string;
	shortDesc: string;
	vision: string;
	mission: string[];
	image: string;
	members: string;
	programs: ProgramKerja[];
	management: PengurusUKM[];
	documentations: UKMDocumentation[];
	categoryBadge?: string;
	logoSvg?: string;
	instagram?: string;
	instagramUrl?: string;
	phone?: string;
	whatsapp?: string;
	registrationUrl?: string;
	// Optional aliases kept for forward-compat with richer CMS data later.
	fullDesc?: string;
	bannerUrl?: string;
	logoUrl?: string;
	membersCount?: string | number;
	registerUrl?: string;
	contactPhone?: string;
}