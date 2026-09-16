import { Outlet } from "react-router";
import { Toaster } from "sonner";

// Menggunakan @ agar langsung mengarah ke folder src/components
import SmoothScrolling from "@/components/SmoothScrolling";
import MobileMenu from "../ui/mobile-menu";
import Footer from "./footer";
import Header from "./header";

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
