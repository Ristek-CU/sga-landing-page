import { CheckCircle2, FileUp, LoaderCircle, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

import Button from "../ui/button.tsx";
import { Input } from "../ui/input.tsx";
import { Textarea } from "../ui/textarea.tsx";
import {
	type Campaign,
	type CampaignField,
	fetchCampaign,
	fieldTypeHelp,
	getCachedCampaign,
	submitCampaignResponse,
} from "@/lib/student-voice";

export default function ReportingForm() {
	const { campaignSlug: routeCampaignSlug } = useParams<{
		campaignSlug?: string;
	}>();
	const campaignSlug = useMemo(
		() =>
			routeCampaignSlug ||
			new URLSearchParams(window.location.search).get("campaign") ||
			import.meta.env.VITE_STUDENT_VOICE_CAMPAIGN ||
			"student-voice",
		[routeCampaignSlug],
	);
	const [campaign, setCampaign] = useState<Campaign | null>(() =>
		getCachedCampaign(campaignSlug),
	);
	const [loading, setLoading] = useState(() => !getCachedCampaign(campaignSlug));
	const [submitting, setSubmitting] = useState(false);
	const [loadError, setLoadError] = useState("");
	const [errors, setErrors] = useState<Record<string, string[]>>({});
	const [successMessage, setSuccessMessage] = useState("");
	const [formKey, setFormKey] = useState(0);

	useEffect(() => {
		const controller = new AbortController();
		let active = true;
		const cachedCampaign = getCachedCampaign(campaignSlug);
		setSuccessMessage("");
		setErrors({});
		setLoadError("");
		setFormKey(0);
		if (cachedCampaign) {
			setCampaign(cachedCampaign);
			setLoading(false);
		} else {
			setCampaign(null);
			setLoading(true);
		}

		fetchCampaign(campaignSlug, controller.signal)
			.then((data) => {
				if (!active) return;
				setCampaign(data);
				setLoadError("");
			})
			.catch((error: unknown) => {
				if (error instanceof DOMException && error.name === "AbortError") return;
				if (!active) return;
				setLoadError(
					error instanceof Error ? error.message : "Form gagal dimuat.",
				);
			})
			.finally(() => {
				if (active) setLoading(false);
			});

		return () => {
			active = false;
			controller.abort();
		};
	}, [campaignSlug]);

	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!campaign || !campaign.isOpen || submitting) return;
		setSubmitting(true);
		setErrors({});

		try {
			const result = await submitCampaignResponse(
				campaign.slug,
				new FormData(event.currentTarget),
			);
			setSuccessMessage(result.message);
			window.scrollTo({ top: 0, behavior: "smooth" });
		} catch (error: unknown) {
			const typedError = error as Error & {
				errors?: Record<string, string[]>;
			};
			if (typedError.errors) {
				setErrors(typedError.errors);
			}
			toast.error("Respons belum terkirim", {
				description:
					error instanceof Error ? error.message : "Silakan coba lagi.",
			});
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) return <LoadingState />;
	if (loadError || !campaign)
		return <UnavailableState message={loadError || "Form tidak ditemukan."} />;
	if (successMessage)
		return (
			<div className="my-16 w-full rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-12 text-center shadow-sm">
				<CheckCircle2 className="mx-auto size-14 text-emerald-600" />
				<h2 className="mt-5 text-2xl font-semibold text-slate-900">
					Respons berhasil dikirim
				</h2>
				<p className="mx-auto mt-2 max-w-xl text-slate-600">{successMessage}</p>
				<Button
					className="mt-7"
					type="button"
					onClick={() => {
						setSuccessMessage("");
						setFormKey((key) => key + 1);
					}}
				>
					<RefreshCw className="mr-2 size-4" /> Isi respons lain
				</Button>
			</div>
		);

	// Campaign form (ada slug di route) pakai header ala Google Forms: strip
	// navy vertikal kiri + nama divisi pengumpul. Student Voice (tanpa slug)
	// tetap tampilan lama.
	const isCampaignRoute = !!routeCampaignSlug;

	return (
		<div className="min-w-0 w-full max-w-full py-12 motion-safe:animate-[form-reveal_420ms_cubic-bezier(0.22,1,0.36,1)] md:py-16">
			<div
				className={`mb-8 overflow-hidden border bg-white ${isCampaignRoute ? "rounded-2xl border-slate-200 shadow-[0_16px_48px_-24px_rgba(6,69,91,0.3)] md:flex" : "rounded-3xl border-[#CEAE65]/30 shadow-[0_20px_60px_-30px_rgba(6,69,91,0.35)]"}`}
			>
				{isCampaignRoute ? (
					<div className="flex w-full shrink-0 flex-col justify-between bg-[#06455B] p-6 text-white md:w-64 md:p-7">
						<div>
							<p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#CEAE65]">
								Form Campaign
							</p>
							<h2 className="mt-2 break-words text-xl font-semibold leading-snug [overflow-wrap:anywhere] md:text-2xl">
								{campaign.title}
							</h2>
							{campaign.description && (
								<p className="mt-3 line-clamp-4 break-words text-xs leading-5 text-white/70 [overflow-wrap:anywhere]">
									{campaign.description}
								</p>
							)}
						</div>
						<p className="mt-6 hidden items-center gap-2 text-[11px] text-white/60 md:flex">
							<CheckCircle2 className="size-3.5 text-[#CEAE65]" />
							Respons tercatat aman
						</p>
					</div>
				) : (
					<div className="h-2 bg-[#CEAE65]" />
				)}
				<div className={isCampaignRoute ? "flex-1 p-6 md:p-9" : "p-6 md:p-9"}>
					{!isCampaignRoute && (
						<p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9A7C35]">
							Student Voice
						</p>
					)}
					<h2
						className={`mt-2 break-words text-2xl font-semibold text-[#06455B] [overflow-wrap:anywhere] md:text-3xl ${isCampaignRoute ? "sr-only" : ""}`}
					>
						{campaign.title}
					</h2>
					{!isCampaignRoute && campaign.description && (
						<p className="mt-3 max-w-3xl whitespace-pre-line break-words text-sm leading-6 text-slate-600 [overflow-wrap:anywhere] md:text-base">
							{campaign.description}
						</p>
					)}
					<p className="mt-5 text-xs text-slate-500">
						<span className="text-red-500">*</span> Wajib diisi
					</p>
				</div>
			</div>
			{!campaign.isOpen ? (
				<UnavailableState
					message={
						campaign.status === "closed"
							? "Campaign ini sudah ditutup."
							: "Form sedang tidak menerima respons."
					}
					compact
				/>
			) : (
				<form
					key={formKey}
					onSubmit={submit}
					className="min-w-0 max-w-full space-y-5"
				>
					<input
						name="_website"
						tabIndex={-1}
						autoComplete="off"
						className="pointer-events-none fixed left-0 top-0 -z-10 size-px opacity-0"
						aria-hidden="true"
					/>
					{campaign.fields.map((field, index) => (
						<div
							key={field.id}
							className="min-w-0 max-w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition focus-within:border-[#CEAE65] focus-within:shadow-md md:p-7"
						>
							<div className="flex gap-3">
								<span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#06455B]/8 text-xs font-semibold text-[#06455B]">
									{index + 1}
								</span>
								<div className="min-w-0 flex-1">
									<label
										className="break-words text-sm font-semibold text-slate-900 [overflow-wrap:anywhere] md:text-base"
										htmlFor={`field_${field.id}`}
									>
										{field.label}
										{field.required && (
											<span className="ml-1 text-red-500">*</span>
										)}
									</label>
									{field.description && (
										<p className="mt-1 break-words text-sm text-slate-500 [overflow-wrap:anywhere]">
											{field.description}
										</p>
									)}
									<p
										id={`field_${field.id}_help`}
										className={`mt-1.5 break-words text-xs leading-5 [overflow-wrap:anywhere] ${field.type === "number" ? "font-medium text-red-600" : "text-slate-500"}`}
									>
										{field.type === "number" ? "* " : ""}
										{field.hint || fieldTypeHelp[field.type]}
									</p>
									<div className="mt-4">
										<DynamicField field={field} />
									</div>
									{errors[`field_${field.id}`]?.map((message) => (
										<p
											key={message}
											className="mt-2 text-sm font-medium text-red-600"
										>
											{message}
										</p>
									))}
								</div>
							</div>
						</div>
					))}
					{errors._form?.map((message) => (
						<p
							key={message}
							className="rounded-xl bg-red-50 p-4 text-sm text-red-700"
						>
							{message}
						</p>
					))}
					<div className="flex flex-col-reverse items-stretch justify-between gap-4 pt-2 sm:flex-row sm:items-center">
						<p className="max-w-xl text-xs leading-5 text-slate-500">
							{isCampaignRoute
								? "Respons dikirim langsung ke sistem SGA Cakrawala dan hanya dapat diakses oleh pengelola yang terautentikasi."
								: "Respons dikirim langsung ke sistem Advocation SGA dan hanya dapat diakses oleh pengelola yang terautentikasi."}
						</p>
						<Button
							type="submit"
							disabled={submitting}
							className="min-w-40 px-8 py-3.5"
						>
							{submitting ? (
								<>
									<LoaderCircle className="mr-2 size-4 animate-spin" />{" "}
									Mengirim...
								</>
							) : (
								"Kirim respons"
							)}
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}

function DynamicField({ field }: { field: CampaignField }) {
	const name = `field_${field.id}`;
	const describedBy = `${name}_help`;
	if (field.type === "paragraph")
		return (
			<Textarea
				id={name}
				name={name}
				required={field.required}
				maxLength={10000}
				aria-describedby={describedBy}
				className="min-h-32 resize-y"
				placeholder="Tulis jawaban kamu"
			/>
		);
	if (["short_text", "email", "number", "date"].includes(field.type)) {
		const isNumber = field.type === "number";
		return (
			<Input
				id={name}
				name={name}
				required={field.required}
				maxLength={field.type === "short_text" ? 500 : undefined}
				type={field.type === "short_text" ? "text" : field.type}
				inputMode={isNumber ? "decimal" : undefined}
				step={isNumber ? "any" : undefined}
				aria-describedby={describedBy}
				onInvalid={
					isNumber
						? (event) => {
								if (event.currentTarget.validity.badInput) {
									event.currentTarget.setCustomValidity("Masukkan angka saja.");
								}
							}
						: undefined
				}
				onInput={
					isNumber
						? (event) => event.currentTarget.setCustomValidity("")
						: undefined
				}
				placeholder={
					field.type === "email"
						? "nama@email.com"
						: isNumber
							? "Contoh: 10"
							: "Tulis jawaban kamu"
				}
			/>
		);
	}
	if (field.type === "dropdown")
		return (
			<select
				id={name}
				name={name}
				required={field.required}
				aria-describedby={describedBy}
				defaultValue=""
				className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm focus:border-[#CEAE65] focus:outline-none"
			>
				<option value="" disabled>
					Pilih jawaban
				</option>
				{field.options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		);
	if (field.type === "file")
		return (
			<label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#06455B]/30 bg-[#06455B]/[0.03] p-5 text-sm text-[#06455B] hover:bg-[#06455B]/[0.06]">
				<FileUp className="size-6 shrink-0" />
				<span>
					<strong>Pilih file</strong>
					<br />
					<small className="text-slate-500">
						Maks. 5 file, masing-masing 10MB
					</small>
				</span>
				<input
					id={name}
					name={name}
					required={field.required}
					type="file"
					aria-describedby={describedBy}
					multiple
					className="sr-only"
					accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx"
				/>
			</label>
		);
	const inputType = field.type === "checkboxes" ? "checkbox" : "radio";
	return (
		<div
			role="group"
			aria-describedby={describedBy}
			className={
				field.type === "linear_scale" ? "flex flex-wrap gap-3" : "space-y-3"
			}
		>
			{field.options.map((option, optionIndex) => (
				<label
					key={option}
					className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm transition hover:border-[#CEAE65] hover:bg-amber-50/40"
				>
					<input
						id={`${name}_${optionIndex}`}
						type={inputType}
						name={name}
						value={option}
						required={field.required && inputType === "radio" && optionIndex === 0}
						className="size-4 accent-[#06455B]"
					/>
					<span className="min-w-0 break-words [overflow-wrap:anywhere]">
						{option}
					</span>
				</label>
			))}
		</div>
	);
}

function LoadingState() {
	return (
		<div
			className="w-full max-w-full py-12 md:py-16"
			role="status"
			aria-label="Memuat form Student Voice"
		>
			<div className="overflow-hidden rounded-3xl border border-[#CEAE65]/20 bg-white shadow-sm">
				<div className="h-2 bg-[#CEAE65]/70" />
				<div className="space-y-4 p-6 md:p-9">
					<div className="h-3 w-28 animate-pulse rounded-full bg-[#CEAE65]/25" />
					<div className="h-8 w-3/4 animate-pulse rounded-lg bg-[#06455B]/10" />
					<div className="h-4 w-full animate-pulse rounded bg-slate-100" />
					<div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
				</div>
			</div>
			<div className="mt-5 space-y-5">
				{[0, 1, 2].map((i) => (
					<div
						key={i}
						className="rounded-2xl border border-slate-200 bg-white p-5 md:p-7"
					>
						<div className="flex gap-3">
							<div className="size-7 shrink-0 animate-pulse rounded-full bg-[#06455B]/10" />
							<div className="min-w-0 flex-1 space-y-4">
								<div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
								<div className="h-11 w-full animate-pulse rounded-lg bg-slate-100" />
							</div>
						</div>
					</div>
				))}
			</div>
			<span className="sr-only">Memuat form Student Voice...</span>
		</div>
	);
}

function UnavailableState({
	message,
	compact = false,
}: {
	message: string;
	compact?: boolean;
}) {
	return (
		<div
			className={`${compact ? "my-4" : "my-16"} rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center`}
		>
			<h2 className="text-lg font-semibold text-slate-900">
				Form belum tersedia
			</h2>
			<p className="mt-2 text-sm text-slate-600">{message}</p>
		</div>
	);
}
