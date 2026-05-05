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
	VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, children, ...props }: BadgeProps) {
	return variant === "special" ? (
		<div
			className={cn(
				// PERUBAHAN 1: bg-white/10 menjadi bg-[#F4CE6A]/20 (Emas transparan)
				// PERUBAHAN 2: Shadow biru (#8fdfff) diubah menjadi shadow emas transparan (rgba)
				"group relative flex max-w-fit flex-row items-center justify-center rounded-full bg-[#F4CE6A]/20 px-5 py-1 text-sm font-medium shadow-[inset_0_-8px_10px_rgba(244,206,106,0.15)] backdrop-blur-xs transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_rgba(244,206,106,0.3)]",
				className,
			)}
			{...props}
		>
			{/* PERUBAHAN 3: Border animasi gradien diubah dari biru/hijau menjadi gradasi warna emas/kuning */}
			<div className="absolute inset-0 block h-full w-full animate-gradient bg-linear-to-r from-[#F4CE6A]/40 via-yellow-200 to-[#D4B254] bg-[length:var(--bg-size)_100%] p-[1px] [mask-composite:subtract]! [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]" />

			<span
				className="inline-block text-sm font-semibold text-center text-[#F4CE6A] xl:text-lg text-max tracking-wide drop-shadow-sm"
				children={children}
			/>
		</div>
	) : (
		<div
			className={cn(badgeVariants({ variant }), className)}
			children={children}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };