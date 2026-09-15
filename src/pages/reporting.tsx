import logoSga from "@/assets/images/Logomark.webp";
import ReportingForm from "@/components/reporting/form";
import Particles from "@/components/ui/particles";
import { fetchCampaign, getCachedCampaign } from "@/lib/student-voice";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

// Nama "Form Pengaduan Mahasiswa" hanya untuk route tanpa slug (campaign
// default Student Voice). Form dari CMS Hub (/student-voice/:slug) merender
// standalone tanpa hero — judul sudah tampil di kartu form, dan cache belum
// tentu terisi saat render pertama.
const DEFAULT_TITLE = "Form Pengaduan Mahasiswa";

export default function ReportingPage() {
	const { campaignSlug, formSlug } = useParams<{
		campaignSlug?: string;
		formSlug?: string;
	}>();
	// /student-voice/:slug (pengaduan standalone) dan /:slug (form reguler CMS Hub)
	// masuk jalur yang sama — ReportingForm resolve slug + backend-nya sendiri.
	const slug = campaignSlug ?? formSlug;

	if (slug) {
		return <FormShell campaignRoute={!!campaignSlug} />;
	}

	return (
		<>
			<div className="relative flex w-full max-w-full flex-col overflow-hidden bg-hero bg-hero-pattern bg-fixed text-white">
				<div className="flex flex-col items-center justify-center gap-4 container mx-auto px-5 z-[1]">
					<h1 className="sm:pt-52 pt-36 pb-15 text-3xl font-semibold leading-tight text-center md:text-5xl xl:text-5xl">
						{DEFAULT_TITLE}
					</h1>
				</div>
				<Particles
					quantity={500}
					size={0.1}
					staticity={50}
					className="absolute w-full h-full overflow-clip"
				/>
			</div>
			<main className="container mx-auto flex min-w-0 max-w-full flex-col items-center justify-center gap-4 px-5">
				<ReportingForm />
			</main>
		</>
	);
}

// Shell standalone utk form berslug: bar identitas + background warna yang
// diatur admin di CMS Hub (form.backgroundColor). Cache dicek dulu supaya
// render pertama tidak flash warna default.
function FormShell({ campaignRoute }: { campaignRoute: boolean }) {
	const { campaignSlug, formSlug } = useParams<{
		campaignSlug?: string;
		formSlug?: string;
	}>();
	const slug = campaignSlug ?? formSlug ?? "";
	const [bg, setBg] = useState(
		() => getCachedCampaign(slug)?.backgroundColor ?? "#F6F4EF",
	);

	useEffect(() => {
		const controller = new AbortController();
		fetchCampaign(slug, controller.signal)
			.then((c) => c.backgroundColor && setBg(c.backgroundColor))
			.catch(() => undefined); // error form ditangani ReportingForm
		return () => controller.abort();
	}, [slug]);

	return (
		<div className="min-h-svh" style={{ backgroundColor: bg }}>
			{/* Bar identitas — pembeda dari Student Voice: campaign form pakai
			    strip navy + logo SGA yang balik ke landing page. */}
			<header className="sticky top-0 z-20 border-b border-white/10 bg-[#06455B]/95 backdrop-blur">
				<div className="container mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
					<a
						href="/"
						className="flex items-center gap-2.5 text-white transition hover:opacity-85"
						aria-label="SGA Cakrawala — kembali ke halaman utama"
					>
						<img src={logoSga} alt="Logo SGA Cakrawala" className="size-8" />
						<span className="text-sm font-semibold tracking-wide">
							SGA Cakrawala
						</span>
					</a>
					<span className="rounded-full border border-[#CEAE65]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#CEAE65]">
						{campaignRoute ? "Campaign" : "Form"}
					</span>
				</div>
			</header>
			<main className="container mx-auto flex min-w-0 max-w-3xl flex-col items-center px-5 py-10 md:py-14">
				<ReportingForm formSlug={slug} />
			</main>
			<footer className="border-t border-slate-200/70 py-6 text-center text-xs text-slate-500">
				Dikumpulkan melalui {campaignRoute ? "Campaign" : "Form"} SGA Cakrawala
			</footer>
		</div>
	);
}
