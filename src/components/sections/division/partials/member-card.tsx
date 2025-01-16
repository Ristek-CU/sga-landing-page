import { LinkedInLogo } from "@/components/ui/icons";

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
		<div className="space-y-4 h-max">
			<img
				className="object-cover rounded-xl aspect-square max-w-64"
				src={image}
				alt="SGA Members"
			/>
			<div className="space-y-2">
				<h3 className="text-3xl font-semibold text-gray-500">{name}</h3>
				<p className="text-xl font-medium text-gray-200">{position}</p>
				<div className="flex items-center gap-2">
					<a className="text-gray-200" href={linkedinUrl}>
						<LinkedInLogo className="size-5" />
					</a>
				</div>
			</div>
		</div>
	);
}
