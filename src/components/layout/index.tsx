import { Outlet } from "react-router";
import { Toaster } from "sonner";

import MobileMenu from "../ui/mobile-menu";
import Footer from "./footer";
import Header from "./header";

export default function AppLayout() {
	return (
		<>
			<Header />
			<MobileMenu />
			<Outlet />
			<Footer />
			<Toaster position="top-center" />
		</>
	);
}
