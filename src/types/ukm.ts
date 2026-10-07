export interface ProgramKerja {
	name: string;
	desc: string;
	period?: string;
	category?: string;
}

export interface PengurusUKM {
	name: string;
	role: string;
	avatar?: string;
	division?: string;
}

export interface UKMDocumentation {
	id: string | number;
	image: string;
	title: string;
	description: string;
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
	logoUrl?: string;
	bannerUrl?: string;
	instagramUrl?: string;
	whatsapp?: string;
	registrationUrl?: string;
}
