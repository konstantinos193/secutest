import { useEffect } from "react";

export default function useLenis() {
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Dynamically import Lenis to avoid SSR issues
    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({ lerp: 0.07 });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Optional: If you use GSAP ScrollTrigger
      if (window.gsap && window.gsap.ScrollTrigger) {
        lenis.on("scroll", window.gsap.ScrollTrigger.update);
      }

      // Clean up
      return () => {
        lenis.destroy();
      };
    });
  }, []);
}