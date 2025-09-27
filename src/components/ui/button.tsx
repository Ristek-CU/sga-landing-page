import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
	"inline-flex cursor-pointer disabled:cursor-not-allowed items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm md:text-base font-medium ring-offset-current transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-yellow-500 text-gray-600 hover:bg-yellow-500/90",
				destructive: "bg-red-500 text-gray-50 hover:bg-red-500/90",
				"destructive-outline":
					"border-2 border-red-500 text-red-500 hover:bg-red-500/90 hover:text-white",
				outline:
					"border border-input bg-transparent text-gray-50 hover:bg-white/20",
				secondary: "bg-gray-50 text-gray-900 hover:bg-gray-50/90",
				ghost: "text-gray-50 hover:bg-gray-50/20",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export default Button;
