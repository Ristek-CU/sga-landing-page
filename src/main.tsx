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

// 1. TAMBAHKAN IMPORT EventPage DI SINI:
import EventDetailPage from "./components/sections/event/EventDetail/page.tsx";
import EventPage from "./components/sections/event/EventPage/page.tsx";

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
      // 2. TAMBAHKAN ROUTE EVENT DI SINI:
      {
        path: "/events",
        element: <EventPage />,
      },
    ],
  },
  {
    path: "/events/:id",
    element: <EventDetailPage />,
  },
  {
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
