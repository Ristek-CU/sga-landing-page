export interface LandingMission {
	id: string;
	title: string;
	description: string;
	display_order: number;
}

export interface LandingMember {
	id: string;
	fullname: string;
	linkedin_url: string | null;
	image_path: string | null;
	role: {
		name: string;
		hierarchy_level: number;
	} | null;
}

export interface LandingDivision {
	division_id: string;
	division_name: string;
	members: LandingMember[];
}

export interface LandingEvent {
	id: string;
	name: string;
	description: string | null;
	start_date: string | null;
	end_date: string | null;
	location: string | null;
	status: string;
	logo_path: string | null;
	registration_link: string | null;
}

export type LandingEventStatus = "completed" | "ongoing" | "coming_soon";

export interface LandingContent {
	missions: LandingMission[];
	members: LandingDivision[];
	events: LandingEvent[];
}

interface LandingApiResponse {
	success: boolean;
	message?: string;
	data?: Partial<LandingContent>;
}

const landingEndpoint = (
	import.meta.env.VITE_API_BASE_URL ||
	"https://superapp.sga-cakrawala.org/sga-profile/v1/landing"
).replace(/\/+$/, "");

let landingRequest: Promise<LandingContent> | null = null;

export function fetchLandingContent(): Promise<LandingContent> {
	if (landingRequest) return landingRequest;

	landingRequest = fetch(landingEndpoint, {
		headers: { Accept: "application/json" },
	})
		.then(async (response) => {
			const payload = (await response.json().catch(() => null)) as LandingApiResponse | null;
			const { missions, members, events } = payload?.data ?? {};

			if (
				!response.ok ||
				!payload?.success ||
				!Array.isArray(missions) ||
				!Array.isArray(members) ||
				!Array.isArray(events)
			) {
				throw new Error(payload?.message || `Gagal memuat landing (${response.status}).`);
			}

			return { missions, members, events };
		})
		.catch((error: unknown) => {
			landingRequest = null;
			throw error;
		});

	return landingRequest;
}

export function getLandingEventStatus(event: LandingEvent): LandingEventStatus {
	const status = event.status.trim().toLowerCase();
	if (["completed", "concluded", "past"].includes(status)) return "completed";
	if (["ongoing", "in progress"].includes(status)) return "ongoing";
	return "coming_soon";
}

export function formatLandingEventDate(event: LandingEvent): string {
	if (!event.start_date) return "Tanggal belum diumumkan";
	const start = new Date(event.start_date);
	if (Number.isNaN(start.getTime())) return "Tanggal belum diumumkan";

	const dateFormatter = new Intl.DateTimeFormat("id-ID", { dateStyle: "long" });
	const startLabel = dateFormatter.format(start);
	if (!event.end_date) return startLabel;

	const end = new Date(event.end_date);
	if (Number.isNaN(end.getTime())) return startLabel;
	if (start.toDateString() === end.toDateString()) return startLabel;
	return `${startLabel} - ${dateFormatter.format(end)}`;
}

export function getLandingEventImage(path: string | null): string | null {
	return path && path.trim().toLowerCase() !== "none" ? path : null;
}
