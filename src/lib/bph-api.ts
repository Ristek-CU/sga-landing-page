import { z } from "zod";

// Konsumsi API publik BPH CMS Hub. Contract: docs/API.md di repo Ristek-CU/bph-cms
// (§1 wrapper seragam, §2 endpoint publik, §6 error, §7 rate limit).
const BASE_URL = (
	import.meta.env.VITE_BPH_API_URL || "https://bph-cms.sga-cakrawala.org/api/v1"
).replace(/\/+$/, "");

export interface BphEventSession {
	id: string;
	name: string;
	starts_at: string;
	ends_at: string | null;
	speaker: string | null;
	location: string | null;
	description: string | null;
}

export interface BphEventListItem {
	id: string;
	slug: string;
	title: string;
	description: string | null;
	cover_image_url: string | null;
	starts_at: string;
	ends_at: string | null;
	location: string | null;
	location_url: string | null;
	registration_url: string | null;
	registration_open: boolean;
	organizer: string | null;
	status: "ongoing" | "upcoming" | "past";
}

export interface BphEventDetail extends BphEventListItem {
	sessions: BphEventSession[];
}

interface BphResponse<T> {
	success: boolean;
	message?: string;
	errors?: unknown;
	data?: T;
}

// ponytail: cache in-memory 60 detik sesuai docs API.md §aturan cache; ganti ke
// sessionStorage/TanStack Query kalau butuh lintas reload.
const cache = new Map<string, { at: number; body: unknown }>();
const CACHE_MS = 60_000;

async function bphGet<T>(path: string): Promise<T> {
	const cached = cache.get(path);
	if (cached && Date.now() - cached.at < CACHE_MS) return cached.body as T;

	const response = await fetch(`${BASE_URL}${path}`, {
		headers: { Accept: "application/json" },
	});
	const body = (await response
		.json()
		.catch(() => null)) as BphResponse<T> | null;

	if (!response.ok || !body?.success || body.data === undefined) {
		const err = new Error(
			response.status === 429
				? "Terlalu banyak permintaan. Coba lagi beberapa saat."
				: body?.message || `Gagal memuat ${path} (${response.status}).`,
		);
		err.name =
			response.status === 404
				? "NotFoundError"
				: response.status === 429
					? "RateLimitError"
					: "ApiError";
		throw err;
	}

	cache.set(path, { at: Date.now(), body: body.data });
	return body.data;
}

/** GET /events/calendar?month=YYYY-MM — ringkas, untuk komponen kalender. */
export function fetchBphCalendar(month: string) {
	return bphGet<{ items: BphEventListItem[] }>(
		`/events/calendar?month=${encodeURIComponent(month)}`,
	).then((d) =>
		z
			.array(
				EventSchema.pick({
					slug: true,
					title: true,
					starts_at: true,
					ends_at: true,
					location: true,
				}).extend({ status: EventSchema.shape.status.optional() }),
			)
			.parse(d.items),
	);
}

/** GET /events?status=&limit=&page= — list publik untuk section/portal LP. */
export function fetchBphEvents(params?: {
	status?: "ongoing" | "upcoming" | "past";
	limit?: number;
	page?: number;
}): Promise<BphEventListItem[]> {
	const query = new URLSearchParams();
	if (params?.status) query.set("status", params.status);
	if (params?.limit) query.set("limit", String(params.limit));
	if (params?.page) query.set("page", String(params.page));
	const qs = query.toString();
	return bphGet<{ items: BphEventListItem[] }>(
		`/events${qs ? `?${qs}` : ""}`,
	).then((d) => z.array(EventSchema).parse(d.items));
}

/** GET /events/:slug — detail + sessions runsheet. 404 = draft/tidak ada. */
export function fetchBphEventDetail(slug: string): Promise<BphEventDetail> {
	return bphGet<unknown>(`/events/${encodeURIComponent(slug)}`).then((data) =>
		EventDetailSchema.parse(data),
	);
}

// ---- Formatter WIB (docs: render selalu WIB, timestamp ISO 8601 offset) ----

export function formatWibDate(iso: string): string {
	return new Intl.DateTimeFormat("id-ID", {
		dateStyle: "long",
		timeZone: "Asia/Jakarta",
	}).format(new Date(iso));
}

export function formatWibTime(iso: string): string {
	return new Intl.DateTimeFormat("id-ID", {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Asia/Jakarta",
	}).format(new Date(iso));
}

/** "21 September 2026, 16.10 – 17.00 WIB"; input invalid/kosong → fallback teks. */
export function formatWibRange(
	startsAt: string,
	endsAt: string | null,
): string {
	if (!startsAt || Number.isNaN(new Date(startsAt).getTime())) {
		return "Tanggal belum diumumkan";
	}
	const start = `${formatWibDate(startsAt)}, ${formatWibTime(startsAt)}`;
	if (!endsAt || Number.isNaN(new Date(endsAt).getTime())) {
		return `${start} WIB`;
	}
	const end =
		wibDateKey(startsAt) === wibDateKey(endsAt)
			? formatWibTime(endsAt)
			: `${formatWibDate(endsAt)}, ${formatWibTime(endsAt)}`;
	return `${start} – ${end} WIB`;
}

/** Tanggal kalender (YYYY-MM-DD) menurut WIB — bukan timezone browser. */
export function wibDateKey(iso: string): string {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Jakarta",
	}).format(new Date(iso));
}

/** Link tombol "Tambah ke Google Calendar". */
export function googleCalendarUrl(event: {
	title: string;
	starts_at: string;
	ends_at: string | null;
	location: string | null;
	description: string | null;
}): string {
	const fmt = (iso: string) =>
		new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
	const params = new URLSearchParams({
		action: "TEMPLATE",
		text: event.title,
		dates: `${fmt(event.starts_at)}/${fmt(event.ends_at ?? event.starts_at)}`,
	});
	if (event.location) params.set("location", event.location);
	if (event.description) params.set("details", event.description);
	return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const safeUrl = z
	.string()
	.max(2048)
	.transform((value) => {
		try {
			const url = new URL(value);
			return ["https:", "http:"].includes(url.protocol) &&
				!url.username &&
				!url.password
				? url.href
				: null;
		} catch {
			return null;
		}
	})
	.nullable();
const timestamp = z
	.string()
	.refine((value) => Number.isFinite(Date.parse(value)), "Invalid date");
const EventSchema = z.object({
	id: z.string(),
	slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
	title: z.string(),
	description: z.string().nullable(),
	cover_image_url: safeUrl,
	starts_at: timestamp,
	ends_at: timestamp.nullable(),
	location: z.string().nullable(),
	location_url: safeUrl,
	registration_url: safeUrl,
	registration_open: z.boolean(),
	organizer: z.string().nullable(),
	status: z.enum(["ongoing", "upcoming", "past"]),
});
const EventDetailSchema = EventSchema.extend({
	sessions: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			starts_at: timestamp,
			ends_at: timestamp.nullable(),
			speaker: z.string().nullable(),
			location: z.string().nullable(),
			description: z.string().nullable(),
		}),
	),
});
