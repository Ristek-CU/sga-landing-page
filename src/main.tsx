import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

import "@fontsource-variable/plus-jakarta-sans/wght.css";
import "@fontsource-variable/plus-jakarta-sans/wght-italic.css";
import "./index.css";

import AppLayout from "./components/layout/index.tsx";
import { MobileMenuContextProvider } from "./contexts/mobile-menu-context.tsx";

import HomePage from "./pages/home.tsx";
import ReportingPage from "./pages/reporting.tsx";

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
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<MobileMenuContextProvider>
			<RouterProvider router={router} />
		</MobileMenuContextProvider>
	</StrictMode>,
);
