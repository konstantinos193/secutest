'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 28, label: "Years", sub: "doing our best" },
  { value: 24, label: "CLIENTS" },
  { value: 25, label: "EMPLOYEES" },
  { value: 22, label: "events" },
  { value: 32, label: "protection hours" },
  { value: 45, label: "Covert operations" },
  { value: 21, label: "nationalities Revenue" },
  { value: 21, label: "countries" },
  { value: 32, label: "Cumulative security" },
];

export default function StatisticsSection() {
  useEffect(() => {
    // Animation timeline copied from original JS
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#statistics",
          start: "top center",
        },
      })
      .from(".statistics__tag", {
        yPercent: 20,
        opacity: 0,
        duration: 1,
      })
      .from(
        SplitType.create("#statistics .statistics__text", {
          types: "words",
        }).words,
        {
          yPercent: 10,
          opacity: 0,
          stagger: 0.01,
        },
      )
      .from(
        ".statistics-box",
        {
          xPercent: 80 * (document.dir == "rtl" ? -1 : 1),
          opacity: 0,
          duration: 1,
        },
        "-=80%",
      );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="statistics" className="overflow-hidden py-16 lg:py-32">
      <div className="wrapper">
        <div className="mb-10 lg:mb-20">
          <div 
            className="statistics__tag mb-6 flex h-[22px] w-fit items-center justify-center gap-2 rounded-full border border-white border-opacity-15 px-3 py-2 lg:mb-9 lg:h-[55px] lg:px-6"
            style={{
              translate: 'none',
              rotate: 'none',
              scale: 'none',
              opacity: 1,
              transform: 'translate(0px, 0px)',
              width: 'fit-content',
              minWidth: '285.828px',
              height: '55px',
              padding: '8px 24px',
              marginBottom: '36px',
              borderWidth: '1px',
              borderColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Image
              src="/assets/icons/timer.svg"
              alt="Timer icon"
              width={24}
              height={24}
              className="h-2.5 w-2.5 lg:h-6 lg:w-6"
              style={{
                height: '24px',
                width: '24px'
              }}
            />
            <span 
              className="text-gradient text-[8px] lg:text-xl"
              style={{
                fontSize: '20px',
                lineHeight: '24px',
                fontFamily: 'Michroma, sans-serif'
              }}
            >
              Facts & Figures
            </span>
          </div>
          <p className="statistics__text text-[12px] capitalize leading-loose lg:text-[22px] lg:leading-[41px]">
            At SECU, our mission is to provide exceptional security solutions to our clients. We leverage cutting-edge technology and a global network of highly trained professionals to achieve this objective. Our team comprises seasoned experts from the military and police forces worldwide, with years of experience in identifying problem areas and designing customized solutions to address them effectively.
          </p>
        </div>
        
        <div 
          className="statistics-box mx-auto w-[280px] rounded-md border-2 border-white border-opacity-15 bg-neutral-900 lg:w-[1069px] lg:rounded-3xl"
        >
          <div className="grid flex-none grid-flow-col divide-x divide-white divide-opacity-15 overflow-hidden">
            <div className="marquee grid grid-flow-col flex-nowrap divide-x divide-white divide-opacity-15">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex w-max flex-col items-center justify-center px-8 py-6 lg:px-24 lg:py-10"
                >
                  <div className="statistics-number-wrapper w-fit">
                    <div className="mb-1 flex lg:mb-2">
                      <p className="statistics-number text-gradient font-jazmin-alt text-[46px] font-medium leading-none lg:text-[100px]">
                        {stat.value}
                      </p>
                      {stat.label === "Years" && (
                        <p className="text-gradient text-[6px] capitalize tracking-tight lg:text-2xl">
                          {stat.label}
                        </p>
                      )}
                    </div>
                    {stat.sub ? (
                      <p className="text-gradient text-[8px] capitalize lg:text-lg">{stat.sub}</p>
                    ) : (
                      <p className="text-gradient text-[8px] capitalize lg:text-lg">{stat.label}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="marquee grid grid-flow-col flex-nowrap divide-x divide-white divide-opacity-15">
              {stats.map((stat, idx) => (
                <div
                  key={`duplicate-${idx}`}
                  className="flex w-max flex-col items-center justify-center px-8 py-6 lg:px-24 lg:py-10"
                >
                  <div className="statistics-number-wrapper w-fit">
                    <div className="mb-1 flex lg:mb-2">
                      <p className="statistics-number text-gradient font-jazmin-alt text-[46px] font-medium leading-none lg:text-[100px]">
                        {stat.value}
                      </p>
                      {stat.label === "Years" && (
                        <p className="text-gradient text-[6px] capitalize tracking-tight lg:text-2xl">
                          {stat.label}
                        </p>
                      )}
                    </div>
                    {stat.sub ? (
                      <p className="text-gradient text-[8px] capitalize lg:text-lg">{stat.sub}</p>
                    ) : (
                      <p className="text-gradient text-[8px] capitalize lg:text-lg">{stat.label}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 