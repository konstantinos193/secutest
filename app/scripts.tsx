'use client';

import Script from 'next/script';

export default function Scripts() {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.33/dist/lenis.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/gsap@3.12.4/dist/gsap.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/gsap@3.12.4/dist/ScrollTrigger.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/headroom.js@0.12.0/dist/headroom.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/scripts/main28b5.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/scripts/cursor.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/scripts/AttractOnHover.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/scripts/three.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/scripts/globe.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/scripts/index.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://unpkg.com/aos@next/dist/aos.js"
        strategy="afterInteractive"
      />
    </>
  );
} 