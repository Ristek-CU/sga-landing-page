import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Inisialisasi Lenis
        const lenis = new Lenis({
            duration: 1.2, // Mengatur seberapa lama/halus scrollnya (default 1.2)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Gaya efek perlambatannya
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true, // Halus saat pakai scroll wheel mouse
        });

        // Menghubungkan Lenis dengan Request Animation Frame bawaan browser
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Membersihkan Lenis saat komponen dilepas (unmount)
        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}