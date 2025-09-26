import { InputForm } from "@/page/form-input";
import Particles from "@/components/ui/particles";

export default function ReportingPage() {
  return (
    <>
      <div className="relative flex flex-col w-full min-h-auto overflow-hidden text-white bg-hero bg-hero-pattern bg-fixed">
        <div className="flex flex-col items-center justify-center gap-4  container mx-auto px-5 z-[1]">
          <h1 className="grid pt-52 pb-15 text-3xl font-semibold leading-tight text-center md:text-5xl xl:text-5xl">
            <span>Form Pengaduan Mahasiswa</span>
          </h1>
        </div>
        <Particles
          quantity={500}
          size={0.1}
          staticity={50}
          className="absolute w-full h-full overflow-clip"
        />
      </div>
      <div>
        <InputForm />
      </div>
    </>
  );
}
