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
		<div className="space-y-2 h-max w-38 xl:w-full xl:max-w-44">
			<div className="relative overflow-hidden size-full rounded-xl">
				<div
					className="absolute top-0 size-full bg-blue-600/20 z-1"
					aria-hidden
				/>
				<img
					className="object-cover object-top transition-all rounded-xl aspect-square size-full grayscale contrast-125"
					src={image ?? placeholder}
					onError={(e) => (e.currentTarget.src = placeholder)}
					alt={`A formal photo of ${name}`}
				/>
			</div>
			<div className="space-y-1">
				<h3 className="text-sm font-semibold text-gray-500 md:text-xl">
					{name}
				</h3>
				<p className="text-xs font-medium text-gray-200 md:text-sm">
					{position}
				</p>
				<div className="flex items-center gap-1">
					<a className="text-gray-200" href={linkedinUrl} target="_blank">
						<LinkedInLogo className="size-5 shrink-0" />
					</a>
				</div>
			</div>
		</div>
	);
}
