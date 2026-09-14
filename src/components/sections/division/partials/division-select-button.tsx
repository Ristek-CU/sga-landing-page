import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export interface DivisionSelectButtonProps extends PropsWithChildren {
	isActive?: boolean;
	onClick: () => void;
}

export default function DivisionSelectButton({
	isActive = false,
	onClick,
	children,
}: DivisionSelectButtonProps) {
	return (
		<button
			className={cn(
				"cursor-pointer text-sm md:text-base text-left transition-colors whitespace-nowrap",
				isActive
					? "font-bold text-[#D4B254]"
					: "font-normal text-white hover:text-gray-300",
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}