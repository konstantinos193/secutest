"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import SplitType from 'split-type';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useEffect(() => {
    const title = new SplitType('#about h2', { types: 'words' });
    gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top center',
      },
    })
      .from(title.words, {
        opacity: 0,
        y: 0,
        stagger: {
          amount: 0.25,
          from: 'random',
        },
      })
      .from('#about .marquee-wrapper', {
        x: 50,
        opacity: 0,
        duration: 1,
      }, '-=0.5')
      .from(['#about .section-desc', '#about .button'], {
        y: 50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.5,
      }, '-=0.25');

    // Magnetic effect for .magnetic buttons in About section
    const magneticButtons = document.querySelectorAll('#about .magnetic');
    const cleanupFunctions: (() => void)[] = [];

    magneticButtons.forEach((element) => {
      let xSet = gsap.quickTo(element, "x", { duration: 0.3, ease: "power3" });
      let ySet = gsap.quickTo(element, "y", { duration: 0.3, ease: "power3" });

      const onMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = element.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;
        xSet(x * 0.3);
        ySet(y * 0.2);
      };

      const onOut = () => {
        xSet(0);
        ySet(0);
      };

      element.addEventListener("mousemove", onMove as EventListener);
      element.addEventListener("mouseout", onOut);

      cleanupFunctions.push(() => {
        element.removeEventListener("mousemove", onMove as EventListener);
        element.removeEventListener("mouseout", onOut);
      });
    });

    // Return cleanup function that removes all event listeners
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, []);

  return (
    <section id="about" className="overflow-hidden py-10 lg:py-40">
      <div className="wrapper">
        <p className="subtitle mb-1 text-[10px] font-bold leading-normal text-white text-opacity-50 lg:mb-8 lg:text-sm">
          WHO WE ARE
        </p>
        <h2
          className="title leading-normal text-white"
          style={{ fontSize: 'clamp(1.5rem, -2.25rem + 12vw, 4.5rem)' }}
        >
          When you need better security
        </h2>
        <div className="marquee-wrapper my-3 grid grid-flow-col gap-4 lg:my-14">
          <div className="marquee duraon grid w-max grid-flow-col gap-4">
            {[1, 2, 3].map((i) => (
              <Image
                key={`first-${i}`}
                src={`/assets/images/home-about-${i}.png`}
                alt=""
                width={600}
                height={320}
                className="block h-[100px] w-[200px] rounded-lg border border-white/40 object-cover object-center grayscale saturate-150 transition-[filter] hover:grayscale-0 lg:h-[320px] lg:w-[600px] lg:rounded-2xl"
              />
            ))}
          </div>
          <div className="marquee duraon grid w-max grid-flow-col gap-4">
            {[1, 2, 3].map((i) => (
              <Image
                key={`second-${i}`}
                src={`/assets/images/home-about-${i}.png`}
                alt=""
                width={600}
                height={320}
                className="block h-[100px] w-[200px] rounded-lg border border-white/40 object-cover object-center grayscale saturate-150 transition-[filter] hover:grayscale-0 lg:h-[320px] lg:w-[600px] lg:rounded-2xl"
              />
            ))}
          </div>
        </div>
        <p className="section-desc mb-4 text-sm font-medium leading-relaxed text-white text-opacity-85 lg:mb-8 lg:text-3xl lg:leading-relaxed">
          SECU, Saudi Arabias premier security and protection agency, offers a comprehensive range of services that combine local knowledge with global expertise. The agency specializes in risk management, training, and integrated security solutions to ensure the safety and stability of individuals, organizations, and events.
        </p>
        <Link
          href="/about"
          className="button magnetic inline-flex h-[35px] w-[100px] items-center justify-center rounded-full border border-white border-opacity-10 bg-white bg-opacity-10 text-[10px] font-semibold capitalize text-white lg:h-[55px] lg:w-[240px] lg:text-base"
        >
          See More
        </Link>
      </div>
    </section>
  );
};

export default About; 