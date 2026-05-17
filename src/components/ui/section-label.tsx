import { cn } from "@/lib/utils";
import type React from "react";

interface SectionLabelProps {
	children: React.ReactNode;
	className?: string;
}

export default function SectionLabel({
	children,
	className,
}: SectionLabelProps) {
	return (
		<div
			className={cn(
				"inline-flex items-center justify-center rounded-[30px] bg-linear-to-b from-[#CEAE65] to-[#685833] p-[2px] shadow-sm",
				className,
			)}
		>
			<div className="flex items-center justify-center rounded-[30px] bg-white px-8 py-2.5 sm:px-9 sm:py-3">
				<span
					className="font-bold text-xl sm:text-2xl"
					style={{
						background: "linear-gradient(180deg, #CEAE65 0%, #896A22 100%)",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
					}}
				>
					{children}
				</span>
			</div>
		</div>
	);
}
