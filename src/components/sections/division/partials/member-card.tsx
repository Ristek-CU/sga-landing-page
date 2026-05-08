import placeholder from "@/assets/images/profile-placeholder.png";
import { LinkedInLogo } from "@/components/ui/icons";

export interface MemberCardProps {
    name: string;
    position: string;
    image: string | null;
    linkedinUrl: string;
}

export default function MemberCard({
    name,
    position,
    linkedinUrl,
    image,
}: MemberCardProps) {
    return (
        /* 1. Mengecilkan lebar card (w-[160px]) dan padding (p-3) di mobile */
        <div className="group flex flex-col w-[160px] md:w-[260px] p-3 md:p-4 bg-white hover:bg-[#D4B254] border border-gray-100 shadow-sm rounded-xl md:rounded-2xl h-full transition-colors duration-300 ease-out select-none">

            {/* 2. Margin bawah gambar dikurangi di mobile */}
            <div className="relative w-full overflow-hidden rounded-lg md:rounded-xl aspect-[4/5] mb-3 md:mb-4 bg-gray-100">
                <img
                    draggable={false}
                    className="object-cover object-top w-full h-full transition-all duration-300 ease-out grayscale group-hover:grayscale-0"
                    src={image ?? placeholder}
                    onError={(e) => (e.currentTarget.src = placeholder)}
                    alt={`Photo of ${name}`}
                />
            </div>

            <div className="flex flex-col flex-1 px-1">
                {/* 3. Ukuran teks nama disesuaikan (text-sm di mobile, text-xl di desktop) */}
                <h3 className="min-h-[2.25rem] md:min-h-[3.25rem] text-sm md:text-xl font-bold text-gray-900 transition-colors duration-300 line-clamp-2 leading-tight group-hover:text-white">
                    {name}
                </h3>

                {/* 4. Ukuran teks posisi dibuat sangat ringkas di mobile (text-[10px]) */}
                <p className="mt-1 text-[10px] md:text-sm font-medium text-gray-500 transition-colors duration-300 group-hover:text-white/90">
                    {position}
                </p>

                <div className="pt-3 md:pt-4 pb-1 mt-auto">
                    <a
                        className="inline-flex items-center justify-center p-1.5 md:p-2 text-gray-400 transition-all duration-300 bg-gray-50 rounded-lg group-hover:text-[#D4B254] group-hover:bg-white hover:shadow-md"
                        href={linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => { e.stopPropagation(); }}
                    >
                        {/* Ukuran logo disesuaikan */}
                        <LinkedInLogo className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                </div>
            </div>

        </div>
    );
}