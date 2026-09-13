import { z } from "zod";

export const FieldTypeSchema = z.enum([
	"short_text",
	"paragraph",
	"email",
	"number",
	"multiple_choice",
	"checkboxes",
	"dropdown",
	"linear_scale",
	"date",
	"file",
]);

export type FieldType = z.infer<typeof FieldTypeSchema>;

export const CampaignFieldSchema = z.object({
	// AdvocationDashboard pakai number (Prisma autoincrement); SGA CMS Hub pakai
	// uuidv7 string — terima keduanya karena field_<id> hanya dipakai sebagai nama.
	id: z.union([z.number(), z.string()]),
	label: z.string(),
	description: z.string().nullable().default(null),
	type: FieldTypeSchema,
	hint: z.string().optional(),
	required: z.boolean(),
	options: z.array(z.string()).default([]),
});

export type CampaignField = z.infer<typeof CampaignFieldSchema>;

export const CampaignSchema = z.object({
	slug: z.string(),
	title: z.string(),
	description: z.string().nullable().default(null),
	status: z.string(),
	isOpen: z.boolean(),
	opensAt: z.string().nullable().default(null),
	closesAt: z.string().nullable().default(null),
	fields: z.array(CampaignFieldSchema).default([]),
});

export type Campaign = z.infer<typeof CampaignSchema>;

export interface ApiError {
	message?: string;
	errors?: Record<string, string[]>;
}

export const fieldTypeHelp: Record<FieldType, string> = {
	short_text: "Isi dengan jawaban singkat dan langsung pada inti pertanyaan.",
	paragraph: "Jelaskan jawaban secara lengkap. Maksimal 10.000 karakter.",
	email: "Masukkan alamat email aktif, contoh: nama@email.com.",
	number: "Masukkan angka saja.",
	multiple_choice: "Pilih satu jawaban yang paling sesuai.",
	checkboxes: "Kamu dapat memilih lebih dari satu jawaban.",
	dropdown: "Buka daftar lalu pilih satu jawaban.",
	linear_scale: "Pilih satu angka pada skala yang tersedia.",
	date: "Pilih tanggal melalui kalender atau masukkan tanggal yang valid.",
	file: "Unggah maksimal 5 file, masing-masing maksimal 10MB.",
};

const campaignCache = new Map<string, Campaign>();

// Form student-voice kini dikelola SGA CMS Hub (Student Voice Studio) — kontrak
// endpoint-nya identik (lihat komentar di form.public.route.ts CMS Hub).
// Campaign lama masih hidup di backend AdvocationDashboard, jadi urutan sumber:
// CMS Hub dulu, kalau 404 jatuh ke backend satgas lama.
export const apiBases = (
	[
		(typeof import.meta !== "undefined" &&
			import.meta.env &&
			import.meta.env.VITE_CMS_API_URL) ||
			"https://cms.sga-cakrawala.org/api/v1",
		(typeof import.meta !== "undefined" &&
			import.meta.env &&
			import.meta.env.VITE_ADVOCATION_API_URL) ||
			"https://satgas.sga-cakrawala.org",
	] as string[]
)
	.map((u) => u.replace(/\/$/, ""))
	.filter((u, i, arr) => u && arr.indexOf(u) === i);

// Path endpoint beda: CMS Hub /forms/:slug, satgas lama /api/v1/campaigns/:slug.
const endpoints = (slug: string) =>
	apiBases.map((base) =>
		base.endsWith("/api/v1")
			? `${base}/forms/${encodeURIComponent(slug)}`
			: `${base}/api/v1/campaigns/${encodeURIComponent(slug)}`,
	);

export function getCachedCampaign(slug: string): Campaign | null {
	return campaignCache.get(slug) ?? null;
}

export async function fetchCampaign(
	slug: string,
	signal?: AbortSignal,
): Promise<Campaign> {
	const cached = campaignCache.get(slug);
	if (cached) return cached;

	let notFound = true;
	let lastMessage = "Form belum tersedia.";
	for (const url of endpoints(slug)) {
		const res = await fetch(url, { headers: { Accept: "application/json" }, signal });
		const payload = await res.json().catch(() => null);
		if (res.ok) {
			const parsed = CampaignSchema.safeParse(payload?.data);
			if (!parsed.success) {
				console.error("Student Voice CMS schema mismatch:", parsed.error);
				throw new Error("Format data form tidak valid dari server.");
			}
			campaignCache.set(slug, parsed.data);
			return parsed.data;
		}
		if (res.status !== 404) notFound = false;
		lastMessage = payload?.message || lastMessage;
	}
	throw new Error(notFound ? "Form belum tersedia." : lastMessage);
}

export async function submitCampaignResponse(
	slug: string,
	formData: FormData,
): Promise<{ message: string }> {
	// Submit harus ke backend yang punya formnya — fetchCampaign dulu untuk
	// menentukan sumber, lalu POST ke endpoint yang sama.
	await fetchCampaign(slug);
	let lastError: (Error & { errors?: Record<string, string[]> }) | null = null;
	for (const url of endpoints(slug)) {
		const res = await fetch(url, {
			method: "POST",
			headers: { Accept: "application/json" },
			body: formData,
		});
		const payload = (await res.json().catch(() => null)) as ApiError | null;
		if (res.ok) {
			return {
				message: payload?.message || "Respons kamu sudah diterima. Terima kasih!",
			};
		}
		if (res.status === 422 || res.status === 409) {
			const err = new Error(payload?.message || "Respons belum tersimpan.") as Error & {
				errors?: Record<string, string[]>;
			};
			err.errors = payload?.errors;
			throw err; // form ketemu, validasi/tutup — jangan coba backend lain
		}
		lastError = new Error(payload?.message || "Respons belum tersimpan.") as Error & {
			errors?: Record<string, string[]>;
		};
		lastError.errors = payload?.errors;
	}
	throw lastError ?? new Error("Respons belum tersimpan.");
}
