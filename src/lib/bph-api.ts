// Konsumsi API publik BPH CMS Hub. Contract: docs/API.md di repo Ristek-CU/bph-cms
// (§1 wrapper seragam, §2 endpoint publik, §6 error, §7 rate limit).
const BASE_URL = (
	import.meta.env.VITE_BPH_API_URL || "https://bph-cms.sga-cakrawala.org/api/v1"
).replace(/\/+$/, "");

export interface BphEventSession {
	id: string;
	title: string;
	starts_at: string;
	ends_at: string | null;
	speaker: string | null;
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

	if (!body?.success || body.data === undefined) {
		const err = new Error(
			body?.message || `Gagal memuat ${path} (${response.status}).`,
		);
		err.name = response.status === 404 ? "NotFoundError" : "ApiError";
		throw err;
	}

	cache.set(path, { at: Date.now(), body: body.data });
	return body.data;
}

/** GET /events/calendar?month=YYYY-MM — ringkas, untuk komponen kalender. */
export function fetchBphCalendar(month: string): Promise<BphEventListItem[]> {
	return bphGet<{ items: BphEventListItem[] }>(
		`/events/calendar?month=${month}`,
	).then((d) => d.items);
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
	).then((d) => d.items);
}

/** GET /events/:slug — detail + sessions runsheet. 404 = draft/tidak ada. */
export function fetchBphEventDetail(slug: string): Promise<BphEventDetail> {
	return bphGet<BphEventDetail>(`/events/${encodeURIComponent(slug)}`);
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

/** "21 September 2026, 16.10 – 17.00 WIB" */
export function formatWibRange(
	startsAt: string,
	endsAt: string | null,
): string {
	const start = `${formatWibDate(startsAt)}, ${formatWibTime(startsAt)}`;
	if (!endsAt) return `${start} WIB`;
	return `${start} – ${formatWibTime(endsAt)} WIB`;
}

/** "Sen, 21 Sep" untuk chip kalender. */
export function formatShortDate(iso: string): string {
	return new Intl.DateTimeFormat("id-ID", {
		weekday: "short",
		day: "numeric",
		month: "short",
		timeZone: "Asia/Jakarta",
	}).format(new Date(iso));
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
