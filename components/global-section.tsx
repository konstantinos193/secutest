'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function GlobalSection() {
  useEffect(() => {
    // Split text into chars
    const split = new SplitType('.global-title', { types: 'chars', tagName: 'div', charClass: 'char' });
    const chars = document.querySelectorAll('.global-title .char');
    gsap.set(chars, { opacity: 0, y: 60 });
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      stagger: 0.04,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.2,
    });
    return () => {
      split.revert();
    };
  }, []);

  return (
    <section id="global" className="wrapper py-32">
      <Image
        src="/assets/images/ksa-map.png"
        className="flag mx-auto w-full max-w-[1000px]"
        alt="KSA Map"
        width={1000}
        height={600}
        priority
      />
      <div id="map-container" className="flag mx-auto w-full max-w-[1000px]" />
      <p className="global-title text text-gradient relative z-20 -mt-[5rem] font-light leading-none tracking-tighter lg:-mt-[15rem] lg:ms-20 rtl:leading-tight" style={{ fontSize: 'clamp(3.375rem, -8.0313rem + 36.5vw, 12.5rem)' }}>
        National <br /> Presence
      </p>
    </section>
  );
} 