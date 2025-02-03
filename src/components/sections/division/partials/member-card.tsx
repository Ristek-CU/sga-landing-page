import { LinkedInLogo } from "@/components/ui/icons";
import placeholder from "@/assets/images/profile-placeholder.png";

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
	image = placeholder,
}: MemberCardProps) {
	return (
		<div className="space-y-2 h-max w-22 md:w-38 xl:w-full xl:max-w-44">
			<div className="relative size-full rounded-xl overflow-hidden">
				<div
					className="absolute size-full top-0 bg-blue-600/20 z-1"
					aria-hidden
				/>
				<img
					className="object-cover object-top rounded-xl aspect-square size-full transition-all grayscale contrast-125"
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
					<a className="text-gray-200" href={linkedinUrl}>
						<LinkedInLogo className="size-2.5 md:size-5 shrink-0" />
					</a>
				</div>
			</div>
		</div>
	);
}
