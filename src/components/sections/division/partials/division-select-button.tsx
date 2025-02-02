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
				"cursor-pointer py-4 text-xl text-left w-max transition-colors",
				isActive
					? "font-bold text-green-500"
					: "font-normal text-gray-300 hover:text-green-400",
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
