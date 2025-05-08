"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  "logo-1.png",
  "logo-2.png",
  "logo-3.png",
  "logo-4.png",
  "logo-5.png",
  "logo-6.png",
];

export default function ClientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    // Select all img elements inside the section
    const images = sectionRef.current.querySelectorAll("img");
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        scrub: 0.5,
      },
    });

    timeline.from(images, {
      yPercent: 100,
      opacity: 0,
      stagger: {
        amount: 0.25,
        from: "center",
      },
    });

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  return (
    <section id="clients" className="py-16 lg:py-32" ref={sectionRef}>
      <div className="wrapper">
        <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
          {clients.map((logo) => (
            <Image
              key={logo}
              src={`/assets/logos/${logo}`}
              className="size-10 object-contain object-center lg:size-40"
              alt={logo.replace(/\.png$/, "")}
              width={100}
              height={50}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 