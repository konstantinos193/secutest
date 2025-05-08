"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const CaseStudies = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    // SplitType for subtitle and title (cast to HTMLElement)
    const subtitle = sectionRef.current.querySelector('.subtitle') as HTMLElement | null;
    const title = sectionRef.current.querySelector('.title') as HTMLElement | null;
    let splitSubtitle: SplitType | undefined;
    let splitTitle: SplitType | undefined;
    if (subtitle) splitSubtitle = new SplitType(subtitle, { types: 'words' });
    if (title) splitTitle = new SplitType(title, { types: 'words' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
      },
    });
    if (splitSubtitle) {
      tl.from(splitSubtitle.words, {
        opacity: 0,
        y: 20,
        stagger: 0.05,
      });
    }
    if (splitTitle) {
      tl.from(splitTitle.words, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
      });
    }

    // Animate feature block steps (left/right)
    const feature = sectionRef.current.querySelector('.feature');
    if (feature) {
      const left = feature.querySelector('.left');
      const right = feature.querySelector('.right');
      const step1 = feature.querySelector('.step-1'); // image/caption
      const step2 = feature.querySelectorAll('.step-2 > span'); // icon
      const step3 = feature.querySelector('.step-3'); // heading
      const step4 = feature.querySelector('.step-4'); // description
      const step5 = feature.querySelector('.step-5'); // button
      const featureTl = gsap.timeline({
        scrollTrigger: {
          trigger: feature,
          start: 'top 80%',
        },
      });
      if (left) {
        featureTl.from(left, {
          x: -100,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
      if (step2.length) {
        featureTl.from(step2, {
          x: -50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
        }, '-=0.5');
      }
      if (right) {
        featureTl.from(right, {
          x: 100,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.6');
      }
      if (step3) {
        featureTl.from(step3, {
          y: 40,
          opacity: 0,
          duration: 0.5,
        }, '-=0.5');
      }
      if (step4) {
        featureTl.from(step4, {
          y: 30,
          opacity: 0,
          duration: 0.5,
        }, '-=0.4');
      }
      if (step5) {
        featureTl.from(step5, {
          y: 20,
          opacity: 0,
          duration: 0.4,
        }, '-=0.3');
      }
    }
    // Magnetic effect for See More button
    const magnetic = sectionRef.current.querySelectorAll('.magnetic');
    const cleanupFns: (() => void)[] = [];
    magnetic.forEach((element) => {
      let xSet = gsap.quickTo(element, 'x', { duration: 0.3, ease: 'power3' });
      let ySet = gsap.quickTo(element, 'y', { duration: 0.3, ease: 'power3' });
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
      element.addEventListener('mousemove', onMove as EventListener);
      element.addEventListener('mouseout', onOut as EventListener);
      cleanupFns.push(() => {
        element.removeEventListener('mousemove', onMove as EventListener);
        element.removeEventListener('mouseout', onOut as EventListener);
      });
    });
    return () => {
      tl.kill();
      splitSubtitle?.revert();
      splitTitle?.revert();
      cleanupFns.forEach(fn => fn());
    };
  }, []);

  return (
    <section id="case-studies" className="py-10 lg:py-32" ref={sectionRef}>
      <div className="wrapper">
        <header className="mb-10 text-center lg:mb-20">
          <p className="subtitle mb-1 text-[6px] font-bold leading-normal text-white text-opacity-50 lg:mb-8 lg:text-sm">
            Case Studies
          </p>
          <h2 className="title mx-auto max-w-[200px] text-[clamp(1.125rem,0.6408rem+2.0657vw,2.5rem)] font-extrabold leading-relaxed lg:max-w-[505px]">
            PROFESSIONAL SECURITY
          </h2>
        </header>
        <div id="cases" className="space-y-10 lg:space-y-28">
          <div className="feature flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-10">
            {/* Left: image/caption/icon */}
            <div className="left relative flex flex-col items-center step-1">
              <figure className="flex shrink-0 gap-4">
                <figcaption className="img-desc -rotate-180 rounded border border-neutral-50 border-opacity-50 bg-zinc-900 px-4 py-6 text-[10px] text-white text-opacity-50 lg:rounded-2xl lg:border-2 lg:px-6 lg:py-8 lg:text-xl" style={{ writingMode: 'vertical-rl' }}>
                  We perform over 100 Successful <br />Cases every year
                </figcaption>
                <Image
                  className="security-img flex-1 rounded-2xl border-2 border-neutral-50 border-opacity-50 grayscale transition-[filter] hover:grayscale-0 max-lg:max-w-[250px]"
                  src="/assets/caseStudies/1709808490_security-img.png"
                  alt="Security case study"
                  width={250}
                  height={250}
                />
              </figure>
              <div className="step-2 flex justify-center mt-4">
                <span>
                  <Image
                    src="/assets/images/security-icon.png"
                    alt="Security icon"
                    width={60}
                    height={60}
                    className="w-[60px] lg:w-[106px] lg:translate-x-1/3 lg:rtl:-translate-x-1/3"
                  />
                </span>
              </div>
            </div>
            {/* Right: text content */}
            <div className="right security-content mx-auto max-w-[590px] space-y-8 flex flex-col justify-center">
              <h3 className="step-3 text-base font-extrabold leading-normal lg:text-3xl">
                Our approach at SECU
              </h3>
              <div className="step-4 space-y-3 text-sm leading-relaxed lg:text-lg">
                Our approach is solution-centric, tailored to the unique security challenges faced by each client.<br />
                We employ the ASE strategy of Risk Assessment, Strategizing, and Operational Excellence to provide comprehensive and customized solutions to our clients.
              </div>
              <div className="step-5">
                <Link href="/case-studies/1" className="button magnetic inline-flex h-[35px] w-[100px] items-center justify-center rounded-full border border-white border-opacity-10 bg-white bg-opacity-10 font-inter text-[10px] font-semibold text-white lg:h-[46px] lg:w-[160px] lg:text-sm">
                  See More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies; 