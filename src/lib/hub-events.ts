import { z } from "zod";

// Cermin kontrak GET /api/v1/events milik SGA CMS Hub
// (bph-cms/src/modules/openapi/schemas.ts → eventListItemSchema).
// Status ongoing/upcoming/past dihitung server — FE tidak boleh menghitung ulang.
export const HubEventStatusSchema = z.enum(["ongoing", "upcoming", "past"]);

export type HubEventStatus = z.infer<typeof HubEventStatusSchema>;

export const HubEventSchema = z.object({
	id: z.string(),
	slug: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	cover_image_url: z.string().nullable(),
	starts_at: z.string(),
	ends_at: z.string(),
	location: z.string(),
	location_url: z.string().nullable(),
	registration_url: z.string().nullable(),
	registration_open: z.boolean(),
	organizer: z.string().nullable(),
	status: HubEventStatusSchema,
});

export type HubEvent = z.infer<typeof HubEventSchema>;

export const HubEventListSchema = z.object({
	items: z.array(HubEventSchema),
	meta: z.object({
		current_page: z.number(),
		total: z.number(),
		per_page: z.number(),
	}),
});

export type HubEventList = z.infer<typeof HubEventListSchema>;

export interface HubApiError {
	message?: string;
	errors?: Record<string, string[]>;
}

export const hubApiBase = (
	(typeof import.meta !== "undefined" &&
		import.meta.env &&
		import.meta.env.VITE_BPH_API_URL) ||
	"https://bph-cms.sga-cakrawala.org"
).replace(/\/$/, "");

// FE-INTEGRATION.md §6: data publik aman di-cache klien maksimal 60 detik supaya
// publish/unpublish terlihat cepat tanpa menahan status basi lebih lama.
const CACHE_TTL_MS = 60_000;
let cachedList: { at: number; list: HubEventList } | null = null;

export function getCachedHubEvents(): HubEventList | null {
	if (!cachedList || Date.now() - cachedList.at > CACHE_TTL_MS) return null;
	return cachedList.list;
}

export async function fetchHubEvents(
	signal?: AbortSignal,
): Promise<HubEventList> {
	const cached = getCachedHubEvents();
	if (cached) return cached;

	const res = await fetch(`${hubApiBase}/api/v1/events`, {
		headers: { Accept: "application/json" },
		signal,
	});
	const payload = (await res.json()) as HubApiError & { data?: unknown };
	if (!res.ok) {
		const err = new Error(payload.message || "Event gagal dimuat.") as Error & {
			errors?: Record<string, string[]>;
		};
		err.errors = payload.errors;
		throw err;
	}

	const parsed = HubEventListSchema.safeParse(payload.data);
	if (!parsed.success) {
		console.error("Hub events schema mismatch:", parsed.error);
		throw new Error("Format data event tidak valid dari server.");
	}

	cachedList = { at: Date.now(), list: parsed.data };
	return parsed.data;
}

const WIB = "Asia/Jakarta";

const wibDate = new Intl.DateTimeFormat("id-ID", {
	timeZone: WIB,
	day: "numeric",
	month: "long",
	year: "numeric",
});

export function formatEventPeriodWIB(startsAt: string, endsAt: string): string {
	const start = new Date(startsAt);
	if (Number.isNaN(start.getTime())) return "";
	const startLabel = wibDate.format(start);
	const end = new Date(endsAt);
	if (Number.isNaN(end.getTime())) return startLabel;
	const endLabel = wibDate.format(end);
	return startLabel === endLabel ? startLabel : `${startLabel} – ${endLabel}`;
}

// Template URL resmi Google Calendar (FE-INTEGRATION.md §5) — tanpa backend.
// dates pakai format basic UTC YYYYMMDDTHHMMSSZ, dikonversi dari ISO ber-offset.
const toGcalTimestamp = (iso: string) => {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "";
	return date
		.toISOString()
		.replace(/[-:]/g, "")
		.replace(/\.\d{3}Z$/, "Z");
};

export function buildGoogleCalendarUrl(event: HubEvent): string {
	const url = new URL("https://calendar.google.com/calendar/render");
	url.searchParams.set("action", "TEMPLATE");
	url.searchParams.set("text", event.title);
	url.searchParams.set(
		"dates",
		`${toGcalTimestamp(event.starts_at)}/${toGcalTimestamp(event.ends_at)}`,
	);
	url.searchParams.set("details", event.description ?? "");
	url.searchParams.set("location", event.location);
	return url.toString();
}
