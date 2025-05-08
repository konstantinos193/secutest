"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import gsap from 'gsap';
import SplitType from 'split-type';

interface HeroProps {
  videoReady: boolean;
}

const Hero: React.FC<HeroProps> = ({ videoReady }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle video loading
  useEffect(() => {
    if (!isMounted) return;

    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleVideoError = () => {
        console.error('Error loading video');
        setVideoError(true);
      };

      const handleVideoLoad = () => {
        if (!hasAnimated) {
          setHasAnimated(true);
        }
      };

      video.addEventListener('error', handleVideoError);
      video.addEventListener('loadeddata', handleVideoLoad);

      return () => {
        video.removeEventListener('error', handleVideoError);
        video.removeEventListener('loadeddata', handleVideoLoad);
      };
    }
  }, [hasAnimated, isMounted]);

  // Animate elements in strict sequence
  useEffect(() => {
    let splitTypeInstance: SplitType | null = null;

    if ((videoReady || videoError) && !hasAnimated && videoRef.current) {
      import('split-type').then(({ default: SplitType }) => {
        const heroTl = gsap.timeline();

        // 1. Background video: just fade in
        heroTl.fromTo(
          videoRef.current,
          { opacity: 0, scale: 1.25 },
          { opacity: 1, scale: 1, duration: 1.125, ease: "power4.out" }
        );

        // 2. Horizontal line
        const hr = document.querySelector("#hero hr");
        if (hr) {
          heroTl.fromTo(
            hr,
            { scaleX: 0 },
            { scaleX: 1, duration: 1, ease: "power2.inOut" }
          );
        }

        // 3. Title (split and animate chars) - immediately after line
        heroTl.add(() => {
          try {
            const title = document.querySelector('#hero .title');
            if (title) {
              splitTypeInstance = new SplitType(title as HTMLElement, { types: 'chars' });
              gsap.set(title, { opacity: 0 });
              const chars = title.querySelectorAll('.char');
              gsap.set(chars, { opacity: 0, yPercent: 50 });
              gsap.to(title, { opacity: 1, duration: 0.001 });
              gsap.to(chars, {
                yPercent: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.25,
                ease: "power2.inOut"
              });
            }
          } catch (error) {
            console.error('Error in text animation:', error);
            const title = document.querySelector('#hero .title');
            if (title) {
              gsap.to(title, { opacity: 1, duration: 0.5 });
            }
          }
        });

        // 4. Description
        const desc = document.querySelector("#hero .desc");
        if (desc) {
          heroTl.fromTo(
            desc,
            { opacity: 0, y: 80 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.inOut" }
          );
        }

        // 5. Image
        const img = document.querySelector("#hero .img");
        if (img) {
          heroTl.fromTo(
            img,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power2.inOut" }
          );
        }

        heroTl.eventCallback('onComplete', () => {
          setHasAnimated(true);
          setTimeout(() => {
            if (splitTypeInstance) {
              try {
                splitTypeInstance.revert();
              } catch (error) {
                console.error('Error reverting SplitType:', error);
              }
              splitTypeInstance = null;
            }
          }, 700);
        });
        heroTl.play();
      });
    }

    return () => {
      if (splitTypeInstance) splitTypeInstance.revert();
    };
  }, [videoReady, videoError, hasAnimated]);

  if (!isMounted) {
    return (
      <section id="hero" className="relative flex flex-col justify-center lg:min-h-dvh">
        <div className="hero__content relative z-20 pb-20 pe-4 ps-12 pt-48 lg:px-0 lg:pb-40 lg:pt-48">
          <div className="mx-auto max-w-[1050px]">
            <h1
              className="title relative z-30 overflow-hidden leading-tight text-white"
              style={{
                fontSize: "clamp(1.375rem, 0.2746rem + 4.6948vw, 4.5rem)",
                opacity: 1,
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
              <Image
                src="/assets/images/hero-image.png"
                className="h-[150px] w-[120px] rounded-lg border border-white border-opacity-25 object-cover object-center grayscale transition-[filter] hover:grayscale-0 lg:h-[327px] lg:w-[290px] lg:rounded-[34px]"
                style={{ transform: 'translate(-50%, -50%)' }}
                alt="SECU Hero"
                width={120}
                height={150}
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
          playsInline
          id="heroImg"
          src="/assets/videos/bg.mp4"
          className="absolute inset-0 z-10 h-full w-full object-cover object-top"
          onError={() => setVideoError(true)}
        />
      </section>
    );
  }

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
            <Image
              src="/assets/images/hero-image.png"
              className="h-[150px] w-[120px] rounded-lg border border-white border-opacity-25 object-cover object-center grayscale transition-[filter] hover:grayscale-0 lg:h-[327px] lg:w-[290px] lg:rounded-[34px]"
              style={{ transform: 'translate(-50%, -50%)' }}
              alt="SECU Hero"
              width={120}
              height={150}
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
        playsInline
        id="heroImg"
        src="/assets/videos/bg.mp4"
        className="absolute inset-0 z-10 h-full w-full object-cover object-top"
        onError={() => setVideoError(true)}
      />
    </section>
  );
};

export default Hero;