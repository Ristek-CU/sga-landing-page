import { Outlet } from "react-router";
import { Toaster } from "sonner";

import MobileMenu from "../ui/mobile-menu";
import Footer from "./footer";
import Header from "./header";
// Menggunakan @ agar langsung mengarah ke folder src/components
import SmoothScrolling from "@/components/SmoothScrolling";

export default function AppLayout() {
	return (
		// Ganti fragment kosong <> dengan <SmoothScrolling>
		<SmoothScrolling>
			<Header />
			<MobileMenu />
			<Outlet />
			<Footer />
			<Toaster position="top-center" />
		</SmoothScrolling>
	);
}