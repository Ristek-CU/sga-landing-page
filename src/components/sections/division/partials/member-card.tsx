import { LinkedInLogo } from "@/components/ui/icons";
import sgaMembers from "@/assets/images/sga-members.png";

export interface MemberCardProps {
	name: string;
	position: string;
	image: string;
	linkedinUrl: string;
}

export default function MemberCard({
	name,
	position,
	linkedinUrl,
	image,
}: MemberCardProps) {
	return (
		<div className="space-y-2 h-max w-22 md:w-38 xl:w-full xl:max-w-44">
			<img
				className="object-cover rounded-xl aspect-square size-full"
				src={image}
				onError={(e) => (e.currentTarget.src = sgaMembers)}
				alt={`A formal photo of ${name}`}
			/>
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
