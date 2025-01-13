import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Plus Jakarta Sans Variable", ...fontFamily.sans],
		},
		extend: {
			backgroundImage: {
				"hero-pattern":
					"url('./assets/images/hero-pattern.svg'), radial-gradient(50% 50% at 50% 0%, rgba(0, 159, 128, .4) 0%, rgba(0, 159, 128, 0.00) 100%)",
			},
			colors: {
				hero: "#002F3E",
				blue: {
					"50": "#e6f5f9",
					"100": "#b0e1ed",
					"200": "#8ad3e4",
					"300": "#54bfd7",
					"400": "#33b2d0",
					"500": "#009fc4",
					"600": "#0091b2",
					"700": "#00718b",
					"800": "#00576c",
					"900": "#004352",
				},
				green: {
					"50": "#e6f5f2",
					"100": "#b0e1db",
					"200": "#8ad3c5",
					"300": "#54bfaa",
					"400": "#33b299",
					"500": "#009180",
					"600": "#009174",
					"700": "#00715b",
					"800": "#005746",
					"900": "#004336",
				},
				yellow: {
					"50": "#fff7ec",
					"100": "#fee7c3",
					"200": "#fddba5",
					"300": "#fcca7c",
					"400": "#fcc063",
					"500": "#fbb03c",
					"600": "#e4a037",
					"700": "#b27d2b",
					"800": "#886121",
					"900": "#694a19",
				},
				gray: {
					"50": "#e9e9ea",
					"100": "#bbbbbc",
					"200": "#9a9b9c",
					"300": "#6c6d6f",
					"400": "#505153",
					"500": "#363740",
					"600": "#242528",
					"700": "#1a1a1c",
					"800": "#141416",
					"900": "#0f1011",
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
