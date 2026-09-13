import ReportingForm from "@/components/reporting/form";
import Particles from "@/components/ui/particles";
import { useParams } from "react-router";

// Nama "Form Pengaduan Mahasiswa" hanya untuk route tanpa slug (campaign
// default Student Voice). Form dari CMS Hub (/student-voice/:slug) merender
// standalone tanpa hero — judul sudah tampil di kartu form, dan cache belum
// tentu terisi saat render pertama.
const DEFAULT_TITLE = "Form Pengaduan Mahasiswa";

export default function ReportingPage() {
	const { campaignSlug } = useParams<{ campaignSlug?: string }>();

	if (campaignSlug) {
		return (
			<main className="container mx-auto flex min-w-0 max-w-full flex-col items-center justify-center gap-4 px-5 py-10 md:py-14">
				<ReportingForm />
			</main>
		);
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
