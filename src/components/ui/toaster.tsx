"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			className="toaster group"
			style={
				{
					"--normal-bg": "var(--color-white)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
				} as React.CSSProperties
			}
			position="top-center"
			{...props}
		/>
	);
};

export { Toaster };
