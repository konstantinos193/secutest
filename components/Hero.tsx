"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import SplitType from 'split-type';
import gsap from 'gsap';

interface HeroProps {
  videoReady: boolean;
}

const Hero: React.FC<HeroProps> = ({ videoReady }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animate elements in strict sequence
  useEffect(() => {
    if (videoReady && !hasAnimated && videoRef.current) {
      const heroTl = gsap.timeline();

      // 1. Background video: just fade in
      heroTl.fromTo(
        videoRef.current,
        { opacity: 0, scale: 1.25 },
        { opacity: 1, scale: 1, duration: 1.125, ease: "power4.out" }
      );

      // 2. Horizontal line
      heroTl.fromTo(
        "#hero hr",
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power2.inOut" }
      );

      // 3. Title (split and animate chars) - immediately after line
      heroTl.add(() => {
        splitRef.current = new SplitType('#hero .title', { types: 'chars' });
        gsap.set('#hero .title', { opacity: 0 });
        gsap.set('#hero .title .char', { opacity: 0, yPercent: 50 });
        gsap.to('#hero .title', { opacity: 1, duration: 0.001 });
        gsap.to('#hero .title .char', {
          yPercent: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.25,
          ease: "power2.inOut"
        });
      });

      // 4. Description
      heroTl.fromTo(
        "#hero .desc",
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.inOut" }
      );

      // 5. Image
      heroTl.fromTo(
        "#hero .img",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.inOut" }
      );

      heroTl.eventCallback('onComplete', () => {
        setHasAnimated(true);
        // Wait 0.7s (adjust as needed) before reverting SplitType
        setTimeout(() => {
          if (splitRef.current) {
            splitRef.current.revert();
            splitRef.current = null;
          }
        }, 700); // 700ms delay, adjust for your taste
      });
      heroTl.play();
    }
  }, [videoReady, hasAnimated]);

  return (
    <section id="hero" className="relative flex flex-col justify-center lg:min-h-dvh">
      <div className="hero__content relative z-20 pb-20 pe-4 ps-12 pt-48 lg:px-0 lg:pb-40 lg:pt-48">
        <div className="mx-auto max-w-[1050px]">
          <h1
            className="title relative z-30 overflow-hidden leading-tight text-white"
            style={{
              fontSize: "clamp(1.375rem, 0.2746rem + 4.6948vw, 4.5rem)",
              opacity: 0,
              wordBreak: 'break-word',
              whiteSpace: 'pre-line'
            }}
          >
            SECU for innovative<br />
            security solutions.
          </h1>
        </div>
        <hr className="relative z-10 mb-2 mt-4 h-px border border-white border-opacity-25 lg:mb-8 lg:mt-11" />
        <div className="relative mx-auto max-w-[1050px]">
          <div className="img absolute bottom-0 start-0 z-20 lg:top-0">
            <img
              src="/assets/images/hero-image.png"
              className="h-[150px] w-[120px] rounded-lg border border-white border-opacity-25 object-cover object-center grayscale transition-[filter] hover:grayscale-0 lg:h-[327px] lg:w-[290px] lg:rounded-[34px]"
              style={{
                transform: 'translate(-50%, -50%)',
              }}
              alt="SECU Hero"
            />
          </div>
          <p
            className="desc relative z-30 mb-8 leading-normal text-white text-opacity-85"
            style={{ fontSize: "clamp(0.625rem, 0.3609rem + 1.1268vw, 1.375rem)" }}
          >
            We strive to safeguard you, your loved ones and your assets!<br />
            Choose SECU for unparalleled security expertise and peace of mind.
          </p>
        </div>
      </div>
      <video
        ref={videoRef}
        muted
        loop
        autoPlay
        id="heroImg"
        src="/assets/videos/bg.mp4"
        className="absolute inset-0 z-10 h-full w-full object-cover object-top"
      />
    </section>
  );
};

export default Hero;