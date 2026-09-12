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

export const apiBase = (
	(typeof import.meta !== "undefined" &&
		import.meta.env &&
		import.meta.env.VITE_ADVOCATION_API_URL) ||
	"https://satgas.sga-cakrawala.org"
).replace(/\/$/, "");

export function getCachedCampaign(slug: string): Campaign | null {
	return campaignCache.get(slug) ?? null;
}

export async function fetchCampaign(
	slug: string,
	signal?: AbortSignal,
): Promise<Campaign> {
	const cached = campaignCache.get(slug);
	if (cached) return cached;

	const res = await fetch(`${apiBase}/api/v1/campaigns/${encodeURIComponent(slug)}`, {
		headers: { Accept: "application/json" },
		signal,
	});
	const payload = await res.json();
	if (!res.ok) {
		throw new Error(payload.message || "Form belum tersedia.");
	}

	const parsed = CampaignSchema.safeParse(payload.data);
	if (!parsed.success) {
		console.error("Student Voice CMS schema mismatch:", parsed.error);
		throw new Error("Format data form tidak valid dari server.");
	}

	campaignCache.set(slug, parsed.data);
	return parsed.data;
}

export async function submitCampaignResponse(
	slug: string,
	formData: FormData,
): Promise<{ message: string }> {
	const res = await fetch(`${apiBase}/api/v1/campaigns/${encodeURIComponent(slug)}`, {
		method: "POST",
		headers: { Accept: "application/json" },
		body: formData,
	});

	const payload = (await res.json()) as ApiError;
	if (!res.ok) {
		const err = new Error(payload.message || "Respons belum tersimpan.") as Error & {
			errors?: Record<string, string[]>;
		};
		err.errors = payload.errors;
		throw err;
	}

	return {
		message: payload.message || "Respons kamu sudah diterima. Terima kasih!",
	};
}
