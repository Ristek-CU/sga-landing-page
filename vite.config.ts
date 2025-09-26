import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	// server: {
	//   proxy: {
	//     "/api": {
	//       target: "https://satgas.sga-cakrawala.org",
	//       changeOrigin: true,
	//       secure: false,
	//     },
	//   },
	// },
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
});
