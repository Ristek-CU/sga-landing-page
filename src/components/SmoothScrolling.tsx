import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export default function SmoothScrolling({
	children,
}: { children: React.ReactNode }) {
	const lenisRef = useRef<Lenis | null>(null);
	const { pathname, hash } = useLocation();

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
			lenisRef.current = null;
		};
	}, []);

	useEffect(() => {
		const frame = requestAnimationFrame(() => {
			let target: HTMLElement | null = null;
			try {
				target = hash
					? document.getElementById(decodeURIComponent(hash.slice(1)))
					: null;
			} catch {
				// An invalid URL fragment should not prevent navigation.
			}
			const top = target
				? Math.max(0, target.getBoundingClientRect().top + window.scrollY - 96)
				: 0;
			lenisRef.current?.scrollTo(top, { immediate: true, force: true });
			window.scrollTo({ top, behavior: "instant" });
			ScrollTrigger.refresh();
		});
		return () => cancelAnimationFrame(frame);
	}, [pathname, hash]);

	return <div style={{ willChange: "scroll-position" }}>{children}</div>;
}
