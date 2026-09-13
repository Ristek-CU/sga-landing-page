import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

import "@fontsource-variable/plus-jakarta-sans/wght.css";
import "@fontsource-variable/plus-jakarta-sans/wght-italic.css";
import "./index.css";
import { Toaster } from "sonner";

import AppLayout from "./components/layout/index.tsx";
import UKMDetailPage from "./components/ukm/UKMDetailPage";
import { MobileMenuContextProvider } from "./contexts/mobile-menu-context.tsx";

import HomePage from "./pages/home.tsx";
import UkmPage from "./pages/ukm.tsx";

const ReportingPage = lazy(() => import("./pages/reporting.tsx"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "/student-voice",
				element: <ReportingPage />,
			},
		],
	},
	{
		// Halaman isi form: standalone tanpa navigasi (mirip /lapor di dashboard
		// Advocation) — link dibagikan dari CMS Hub, bukan dari menu situs.
		// Toaster tetap dipasang karena ReportingForm memakai toast.
		path: "/student-voice/:campaignSlug",
		element: (
			<>
				<Toaster position="top-center" />
				<ReportingPage />
			</>
		),
	},
	{
		path: "/student-societes",
		element: <UkmPage />,
	},
	{
		path: "/student-societes/:id",
		element: <UKMDetailPage />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<MobileMenuContextProvider>
			<RouterProvider router={router} />
		</MobileMenuContextProvider>
	</StrictMode>,
);
