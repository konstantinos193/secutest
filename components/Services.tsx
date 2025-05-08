"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from "gsap";

interface Service {
  title: string;
  description: string;
  image: string;
  topOffset: number;
}

const services: Service[] = [
  {
    title: "Emergency Management",
    description: "",
    image: "/assets/services/1730973537_Group 1000010850.png",
    topOffset: 40
  },
  {
    title: "Crisis Management",
    description: "",
    image: "/assets/services/1730973579_Group 1000010851 (1).png",
    topOffset: 36
  },
  {
    title: "Event Risk Management",
    description: "",
    image: "/assets/services/1730973547_Vector.png",
    topOffset: 32
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const elements = sectionRef.current.querySelectorAll('.magnetic');
    const cleanupFns: (() => void)[] = [];

    elements.forEach((element) => {
      const xSet = gsap.quickTo(element, "x", { duration: 0.3, ease: "power3" });
      const ySet = gsap.quickTo(element, "y", { duration: 0.3, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        xSet(x * 0.3);
        ySet(y * 0.2);
      };
      const onOut = () => {
        xSet(0);
        ySet(0);
      };

      element.addEventListener("mousemove", onMove as EventListener);
      element.addEventListener("mouseout", onOut as EventListener);

      cleanupFns.push(() => {
        element.removeEventListener("mousemove", onMove as EventListener);
        element.removeEventListener("mouseout", onOut as EventListener);
      });
    });

    return () => cleanupFns.forEach(fn => fn());
  }, []);

  return (
    <section id="services" className="relative py-32" ref={sectionRef}>
      <div className="wrapper">
        <header className="sticky top-20 mb-10 text-center lg:mb-20">
          <p className="subtitle mb-1 text-[10px] font-bold leading-normal text-white text-opacity-50 lg:mb-8 lg:text-sm">
            OUR SERVICES
          </p>
          <h2 
            className="title mx-auto max-w-[200px] font-extrabold leading-relaxed lg:max-w-[505px]"
            style={{ fontSize: 'clamp(1.375rem, -0.0313rem + 4.5vw, 2.5rem)' }}
          >
            When you need better security
          </h2>
        </header>

        <ul id="servicesList" className="services-list space-y-10 lg:space-y-28">
          {services.map((service, index) => (
            <li key={index} className="sticky" style={{ top: `${service.topOffset}px` }}>
              <div className="mx-auto flex flex-col gap-8 rounded-lg border border-neutral-50 border-opacity-50 bg-zinc-900 p-6 lg:min-h-[420px] lg:max-w-[880px] lg:flex-row lg:items-center lg:gap-8 lg:rounded-[32px] lg:border-2 lg:px-14 lg:py-16">
                <div className="max-lg:order-2 flex-1">
                  <h3 className="mb-2 text-sm font-bold leading-normal lg:mb-5 lg:text-[32px]">
                    {service.title}
                  </h3>
                  <p className="text-gradient text-[12px] lowercase leading-relaxed lg:mb-12 lg:text-base">
                    {service.description}
                  </p>

                  <Link href="/services" className="link magnetic inline-block text-[8px] lg:text-sm">
                    Learn More
                  </Link>
                </div>

                <div className="flex-1">
                  <div className="relative w-full mt-4 lg:mt-8 max-w-[80px] shrink-0 max-lg:order-1 lg:mx-auto lg:max-w-[194px] aspect-square">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 80px, 194px"
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services; 