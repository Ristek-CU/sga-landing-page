import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					"vendor-react": ["react", "react-dom", "react-router"],
					"vendor-framer": ["framer-motion"],
					"vendor-ui": ["embla-carousel-react", "lucide-react", "sonner"],
					"vendor-form": ["react-hook-form", "@hookform/resolvers", "zod"],
				},
			},
		},
		chunkSizeWarningLimit: 300,
	},
});
