import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export interface DivisionSelectButtonProps extends PropsWithChildren {
	isActive?: boolean;
	onClick: () => void;
}

export default function DivisionSelectButton({
	isActive,
	onClick,
	children,
}: DivisionSelectButtonProps) {
	return (
		<button
			className={cn(
				"py-4 text-xl text-left",
				isActive === true
					? "font-bold text-green-500"
					: "font-normal text-gray-300",
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
