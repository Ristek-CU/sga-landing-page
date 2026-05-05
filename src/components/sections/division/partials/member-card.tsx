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
		<div className="group flex flex-col w-[220px] md:w-[260px] p-4 bg-white hover:bg-[#D4B254] border border-gray-100 shadow-sm rounded-2xl h-full transition-colors duration-300 ease-out select-none">

			<div className="relative w-full overflow-hidden rounded-xl aspect-[4/5] mb-4 bg-gray-100">
				<img
					draggable={false}
					className="object-cover object-top w-full h-full transition-all duration-300 ease-out grayscale group-hover:grayscale-0"
					src={image ?? placeholder}
					onError={(e) => (e.currentTarget.src = placeholder)}
					alt={`Photo of ${name}`}
				/>
			</div>

			<div className="flex flex-col flex-1 px-1">
				{/* PERUBAHAN DI SINI: Tambahkan min-h-[2.5rem] md:min-h-[3.25rem] */}
				<h3 className="min-h-[2.5rem] md:min-h-[3.25rem] text-base font-bold text-gray-900 transition-colors duration-300 md:text-xl line-clamp-2 leading-tight group-hover:text-white">
					{name}
				</h3>

				<p className="mt-1 text-xs font-medium text-gray-500 transition-colors duration-300 md:text-sm group-hover:text-white/90">
					{position}
				</p>

				<div className="pt-4 pb-1 mt-auto">
					<a
						className="inline-flex items-center justify-center p-2 text-gray-400 transition-all duration-300 bg-gray-50 rounded-lg group-hover:text-[#D4B254] group-hover:bg-white hover:shadow-md"
						href={linkedinUrl}
						target="_blank"
						rel="noreferrer"
						onClick={(e) => { e.stopPropagation(); }}
					>
						<LinkedInLogo className="w-5 h-5" />
					</a>
				</div>
			</div>

		</div>
	);
}