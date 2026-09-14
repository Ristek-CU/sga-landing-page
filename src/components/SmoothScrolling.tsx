import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

export default function SmoothScrolling({
	children,
}: { children: React.ReactNode }) {
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		const prefersNativeScroll =
			window.matchMedia("(pointer: coarse)").matches ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersNativeScroll) return;

		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true,
		});
		lenisRef.current = lenis;

		// Sinkronkan scroll Lenis ke ScrollTrigger GSAP (untuk animasi UKM)
		lenis.on("scroll", ScrollTrigger.update);

		// Use rAF loop with proper cleanup
		let rafId: number;
		function raf(time: number) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}
		rafId = requestAnimationFrame(raf);

		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	}, []);

	return <div style={{ willChange: "scroll-position" }}>{children}</div>;
}
