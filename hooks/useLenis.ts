import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

      // Register ScrollTrigger if not already registered
      if (typeof window !== "undefined" && gsap && !(gsap as any).ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }

      // Optional: If you use GSAP ScrollTrigger
      if ((gsap as any).ScrollTrigger) {
        lenis.on("scroll", (gsap as any).ScrollTrigger.update);
      }

      // Clean up
      return () => {
        lenis.destroy();
      };
    });
  }, []);
}