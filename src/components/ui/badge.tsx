import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full px-5 py-1 text-gray-500 text-lg font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "bg-yellow-500 hover:bg-yellow-500/80",
				secondary: "bg-gray-50 hover:bg-gray-50/80",
				destructive: "bg-red-500 hover:bg-destructive/80",
				outline: "",
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

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
