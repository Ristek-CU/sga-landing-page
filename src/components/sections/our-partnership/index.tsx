

import { Badge } from "@/components/ui/badge";

export default function OurPartnership() {
    return (
        <section className="flex flex-col items-center justify-center w-full h-full max-w-screen-xl gap-10 px-10 py-32 mx-auto bg-white lg:flex-row">
            <div className="flex-1 space-y-6 text-center">
                <Badge>Our Partnership</Badge>
                <h1 className="text-4xl font-semibold leading-tight">
                    Help us achieve our mission
                </h1>
                <p className="text-gray-300 text-xl font-normal w-[822px] mx-auto">
                    SGA Cakrawala University menjalin kemitraan dengan berbagai organisasi dan institusi untuk mendukung pengembangan mahasiswa dan kegiatan kampus.
                </p>
            </div>
        </section>
    );
}
