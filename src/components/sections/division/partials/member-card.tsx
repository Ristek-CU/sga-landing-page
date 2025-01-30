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
    <div className="space-y-2 h-max max-w-44">
      <img
        className="object-cover rounded-xl aspect-square size-full"
        src={image}
        alt="SGA Members"
      />
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-gray-500">{name}</h3>
        <p className="text-sm font-medium text-gray-200">{position}</p>
        <div className="flex items-center gap-1">
          <a className="text-gray-200" href={linkedinUrl}>
            <LinkedInLogo className="size-5 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
