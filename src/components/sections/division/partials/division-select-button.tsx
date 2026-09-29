import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

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
				"cursor-pointer text-xs md:text-base text-center lg:text-left transition-colors whitespace-nowrap",
				"rounded-full px-4 py-2 lg:px-0 lg:py-0 lg:rounded-none lg:bg-transparent", // Tag styling for mobile
				isActive
					? "bg-[#D4B254] text-[#0f3d44] font-bold lg:bg-transparent lg:text-[#D4B254]"
					: "bg-white/10 text-white font-normal hover:bg-white/20 lg:bg-transparent lg:hover:text-gray-300 lg:hover:bg-transparent",
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
