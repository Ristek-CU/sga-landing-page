import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full px-5 py-1 text-gray-500 text-sm xl:text-lg font-normal transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "bg-yellow-500 hover:bg-yellow-500/80",
				secondary: "bg-gray-50 hover:bg-gray-50/80",
				destructive: "bg-red-500 hover:bg-destructive/80",
				special: "",
				outline:
					"border-[2px] border-yellow-500 text-yellow-600 bg-transparent hover:bg-yellow-500/10",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
	if (variant === "special") {
		return (
			<div
				className={cn(
					"group relative flex max-w-fit flex-row items-center justify-center rounded-full bg-white/10 px-5 py-1 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-xs transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f]",
					className,
				)}
				{...props}
			>
				<div className="absolute inset-0 block h-full w-full animate-gradient bg-linear-to-r from-blue-300/50 via-green-300/100 to-yellow-300/100 bg-[length:var(--bg-size)_100%] p-[1px] [mask-composite:subtract]! [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]" />
				<span
					className="inline-block text-sm font-semibold text-center text-transparent xl:text-lg text-max bg-linear-to-r from-blue-300 via-green-300 to-yellow-300 bg-clip-text"
					children={children}
				/>
			</div>
		);
	}

	if (variant === "outline") {
		// Specific gradient styling matching Figma
		return (
			<div
				className={cn(
					"inline-flex items-center justify-center rounded-[30px] border-[2px] border-transparent bg-clip-padding px-[30px] py-[6px] text-sm xl:text-lg font-normal transition-colors relative before:absolute before:inset-0 before:-z-10 before:rounded-[30px] before:p-[2px] before:bg-linear-to-r before:from-[#CEAE65] before:to-[#685833] before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:subtract]!",
					className,
				)}
				{...props}
			>
				<span
					className="bg-linear-to-r from-[#CEAE65] to-[#896A22] bg-clip-text text-transparent font-medium"
					children={children}
				/>
			</div>
		);
	}

	return (
		<div
			className={cn(badgeVariants({ variant }), className)}
			children={children}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
