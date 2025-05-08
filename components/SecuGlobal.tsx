"use client";
import React, { useEffect, useRef } from "react";
import Script from "next/script";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface DATController {
  domElement: HTMLElement;
  add: (obj: object, propName: string) => void;
  remove: (obj: object) => void;
  destroy: () => void;
}

interface DATGUI {
  addFolder: (name: string) => DATController;
  add: (obj: object, propName: string) => DATController;
  addColor: (obj: object, propName: string) => DATController;
  removeFolder: (folder: DATController) => void;
  destroy: () => void;
}

interface DAT {
  GUI: new () => DATGUI;
  Controller: new (obj: object, propName: string) => DATController;
}

declare global {
  interface Window {
    DAT: DAT;
  }
}

gsap.registerPlugin(ScrollTrigger);

interface MouseMoveEvent {
  clientX: number;
  clientY: number;
}

const SecuGlobal: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseMoveEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(sectionRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="secu-global" ref={sectionRef}>
      <div className="wrapper">
        <div className="relative">
          <div id="globe-container"></div>
          <p className="subtitle">
            More than 3 Decades <br /> of successful work
          </p>
        </div>
        <p className="title">SECU</p>
      </div>
      {/* Load Three.js and Globe.js only on the client */}
      <Script src="/assets/scripts/three.min.js" strategy="afterInteractive" />
      <Script src="/assets/scripts/globe.js" strategy="afterInteractive" />
    </section>
  );
};

export default SecuGlobal; 