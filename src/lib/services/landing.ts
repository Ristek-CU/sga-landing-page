// src/lib/services/landing.ts

// Tipe Data untuk Member
export interface Member {
	name: string;
	role: string;
	imagePath?: string | null;
	linkedInUrl: string;
}

// Tipe Data Map Divisi (e.g. { "Badan Pengurus Harian": [Member, Member] })
export type MembersDataMap = Record<string, Member[]>;

// Tipe Data Event 
export interface EventItem {
	id?: string | number;
	title: string;
	description: string;
	date?: string;
	location?: string;
	status?: string;
	link?: string;
}

// Tipe Data Response API Landing secara keseluruhan
export interface LandingApiResponse {
	status?: boolean;
	message?: string;
	data?: {
		members?: MembersDataMap;
		events?: EventItem[];
		[key: string]: any; // Menampung data section lain jika ada
	};
}

// ✅ Ambil Base URL dari file .env (.env.development / .env.production)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const API_URL = `${BASE_URL}/sga-profile/v1/landing`;

/**
 * Memanggil seluruh data landing page dari API
 */
export const getLandingData = async (): Promise<LandingApiResponse> => {
	const response = await fetch(API_URL);

	if (!response.ok) {
		throw new Error(`Gagal mengambil data dari server. Status: ${response.status}`);
	}

	return response.json();
};

/**
 * Helper khusus untuk langsung mengambil data members/divisi
 */
export const getMembersData = async (): Promise<MembersDataMap> => {
	const result = await getLandingData();
	return result?.data?.members || {};
};

/**
 * Helper khusus untuk langsung mengambil data events
 */
export const getEventsData = async (): Promise<EventItem[]> => {
	const result = await getLandingData();
	return result?.data?.events || [];
};