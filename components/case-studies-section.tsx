'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { initAttractHover } from '../public/assets/scripts/attract-on-hover';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudiesSection() {
  useEffect(() => {
    // Split subtitle and title into words (for CSS, not animation)
    new SplitType('.case-studies-subtitle', { types: 'words', tagName: 'div', wordClass: 'word' });
    new SplitType('.case-studies-title', { types: 'words', tagName: 'div', wordClass: 'word' });

    // Animation timeline (copied from case-studies.js, adapted for single case)
    const feature = document.querySelector('.feature');
    if (!feature) return;
    const figcaption = feature.querySelector('.img-desc');
    const img = feature.querySelector('.security-img');
    const icon = feature.querySelector('.security-icon');
    const h3 = feature.querySelector('.security-content h3');
    const desc = feature.querySelector('.security-content div');
    const btn = feature.querySelector('.security-content a');

    // Set initial state
    gsap.set([figcaption, img, icon, h3, desc, btn], { opacity: 0, y: 50, scale: 1 });
    gsap.set(icon, { scale: 0.8 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: feature,
        start: 'center center',
        end: '+=600',
        scrub: true,
        pin: true,
        pinSpacing: true,
      },
    });
    tl.to(figcaption, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0)
      .to(img, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '+=0.15')
      .to(h3, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '+=0.15')
      .to(desc, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '+=0.15')
      .to(btn, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '+=0.15')
      .to(icon, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, '+=0.15');

    // Enable magnetic button effect
    initAttractHover();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="case-studies" className="py-10 lg:py-32">
      <div className="wrapper">
        <header className="mb-10 text-center lg:mb-20">
          <p className="case-studies-subtitle subtitle mb-1 text-[6px] font-bold leading-normal text-white text-opacity-50 lg:mb-8 lg:text-sm">
            Case Studies
          </p>
          <h2 className="case-studies-title title mx-auto max-w-[200px] text-[clamp(1.125rem,0.6408rem+2.0657vw,2.5rem)] font-extrabold leading-relaxed lg:max-w-[505px]">
            PROFESSIONAL SECURITY
          </h2>
        </header>
        <div id="cases" className="space-y-10 lg:space-y-28">
          <div className="feature flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-10">
            <div className="relative">
              <figure className="flex shrink-0 gap-4">
                <figcaption className="img-desc -rotate-180 rounded border border-neutral-50 border-opacity-50 bg-zinc-900 px-4 py-6 text-[10px] text-white text-opacity-50 lg:rounded-2xl lg:border-2 lg:px-6 lg:py-8 lg:text-xl" style={{ writingMode: 'vertical-rl' }}>
                  We perform over 100 Successful <br />Cases every year
                </figcaption>
                <Image
                  className="security-img flex-1 rounded-2xl border-2 border-neutral-50 border-opacity-50 grayscale transition-[filter] hover:grayscale-0 max-lg:max-w-[250px]"
                  src="/assets/images/1709808490_security-img.png"
                  alt="Security"
                  width={500}
                  height={300}
                />
              </figure>
              <div className="security-icon absolute end-0 top-0 lg:top-1/2">
                <Image
                  src="/assets/images/security-icon.png"
                  alt="Security Icon"
                  width={106}
                  height={106}
                  className="w-[60px] -translate-y-1/2 lg:w-[106px] lg:translate-x-1/3 lg:rtl:-translate-x-1/3"
                />
              </div>
            </div>
            <div className="security-content mx-auto max-w-[590px] space-y-8">
              <h3 className="text-base font-extrabold leading-normal lg:text-3xl">
                Our approach at SECU
              </h3>
              <div className="space-y-3 text-sm leading-relaxed lg:text-lg">
                Our approach is solution-centric, tailored to the unique security challenges faced by each client.
                <br />
                <br />
                We employ the ASE strategy of Risk Assessment, Strategizing, and Operational Excellence to provide comprehensive and customized solutions to our clients.
              </div>
              <a
                href="https://secu.sa/case-studies/1"
                className="button inline-flex h-[35px] w-[100px] items-center justify-center rounded-full border border-white border-opacity-10 bg-white bg-opacity-10 font-inter text-[10px] font-semibold text-white lg:h-[46px] lg:w-[160px] lg:text-sm"
              >
                See More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 