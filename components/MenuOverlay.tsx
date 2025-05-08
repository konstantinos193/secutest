"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import SplitType from "split-type";
import { useRouter, usePathname } from 'next/navigation';

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ open, onClose }) => {
  const [isVisible, setIsVisible] = useState(open);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const splitInstance = useRef<any>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close handler with reverse animation
  const handleClose = () => {
    if (timelineRef.current) {
      timelineRef.current.reverse();
      // Wait for the reverse animation to finish, then call onClose
      timelineRef.current.eventCallback("onReverseComplete", () => {
        setIsVisible(false);
        onClose();
      });
    } else {
      setIsVisible(false);
      onClose();
    }
  };

  useEffect(() => {
    if (open) setIsVisible(true);
  }, [open]);

  useEffect(() => {
    if (!isVisible) return;

    // Split brand text into chars
    if (brandRef.current) {
      splitInstance.current = new SplitType(brandRef.current, { types: "chars" });
    }

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Animate overlay
    if (overlayRef.current) {
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: "power2.out" }
      );
    }

    // Animate menu sliding in from top
    if (menuRef.current) {
      tl.fromTo(
        menuRef.current,
        { y: "-100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.15, ease: "power2.out" },
        "-=0.05"
      );
    }

    // Animate brand chars
    if (brandRef.current) {
      const chars = brandRef.current.querySelectorAll(".char");
      if (chars.length > 0) {
        tl.fromTo(
          chars,
          { yPercent: 50, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.25 },
          "<+=0.075"
        );
      }
    }

    // Animate nav links
    if (menuItemsRef.current) {
      const linkItems = menuItemsRef.current.querySelectorAll(".link");
      if (linkItems.length > 0) {
        tl.fromTo(
          linkItems,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.25, ease: "power4.out" },
          "-=0.15"
        );
      }
    }

    // Animate CTA
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.15, ease: "power4.out" },
        "+=0.09"
      );
    }

    // Animate footer
    if (footerRef.current) {
      tl.fromTo(
        footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: "power4.out" },
        "+=0.05"
      );
    }

    // Magnetic effect for all .magnetic elements inside the overlay
    const cleanupFns: (() => void)[] = [];
    if (overlayRef.current) {
      const magneticElements = overlayRef.current.querySelectorAll('.magnetic');
      magneticElements.forEach((element) => {
        const isButton = element.classList.contains('button');
        const xMultiplier = isButton ? 0.3 : 0.1;
        const yMultiplier = isButton ? 0.2 : 0.5;

        let xSet = gsap.quickTo(element, "x", { duration: 0.12, ease: "expo.out" });
        let ySet = gsap.quickTo(element, "y", { duration: 0.12, ease: "expo.out" });

        const onMove = (e: Event) => {
          if (!(e instanceof MouseEvent)) return;
          const rect = element.getBoundingClientRect();
          const elemCenterX = rect.left + window.scrollX + rect.width / 2;
          const elemCenterY = rect.top + window.scrollY + rect.height / 2;
          const x = e.pageX - elemCenterX;
          const y = e.pageY - elemCenterY;
          xSet(x * xMultiplier);
          ySet(y * yMultiplier);
        };

        const onOut = () => {
          xSet(0);
          ySet(0);
        };

        element.addEventListener("mousemove", onMove);
        element.addEventListener("mouseout", onOut);

        cleanupFns.push(() => {
          element.removeEventListener("mousemove", onMove);
          element.removeEventListener("mouseout", onOut);
        });
      });
    }

    return () => {
      tl.kill();
      if (splitInstance.current) {
        splitInstance.current.revert();
      }
      cleanupFns.forEach((cleanupFn) => cleanupFn());
    };
  }, [isVisible]);

  // Click outside to close
  useEffect(() => {
    if (!isVisible) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isVisible, handleClose]);

  // Escape key to close
  useEffect(() => {
    if (!isVisible) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isVisible, handleClose]);

  // Prevent background scroll
  useEffect(() => {
    if (isVisible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isVisible]);

  console.log("MenuOverlay open:", open, "isVisible:", isVisible);

  if (!isVisible) return null;

  return (
    <div className="menu" ref={overlayRef} style={{ overflow: 'hidden' }}>
      <p className="menu__brand" ref={brandRef}>SECU</p>
      <div>
        <nav id="menuNav" className="menu__nav">
          <ul className="menu__nav-list group" ref={menuItemsRef}>
            <li className="link magnetic">
              <a
                className="menu__nav-link"
                href="/"
                onClick={e => {
                  if (pathname === '/') {
                    e.preventDefault();
                    handleClose();
                  }
                }}
              >
                HOME
              </a>
            </li>
            <li className="link magnetic">
              <Link className="menu__nav-link" href="/about">ABOUT</Link>
            </li>
            <li className="link magnetic">
              <Link className="menu__nav-link" href="/services">SERVICES</Link>
            </li>
            <li className="link magnetic">
              <Link className="menu__nav-link" href="/case-studies">Case studies</Link>
            </li>
            <li className="link magnetic">
              <Link className="menu__nav-link" href="/projects">PROJECTS</Link>
            </li>
            <li className="link magnetic">
              <Link className="menu__nav-link" href="/contact">CONTACT US</Link>
            </li>
            <li className="link magnetic">
              <Link className="menu__nav-link" href="/lang/ar" lang="ar" dir="rtl">عربي</Link>
            </li>
          </ul>
        </nav>
        <button type="button" className="button menu__cta magnetic" ref={ctaRef}>
          <span className="text-gradient">Send request</span>
        </button>
      </div>
      <div className="menu__footer" ref={footerRef}>
        <a href="mailto:info@secu.com" className="text-gradient">info@secu.com</a>
      </div>
      <button className="menu__x button magnetic" type="button" onClick={handleClose}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
};

export default MenuOverlay;
