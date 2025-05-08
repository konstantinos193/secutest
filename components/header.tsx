"use client";
import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import gsap from "gsap";
import MenuOverlay from "./MenuOverlay";
import Headroom from "headroom.js";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLHeadElement>(null);

  useEffect(() => {
    const buttons = document.querySelectorAll(".magnetic");
    buttons.forEach((element) => {
      let xSet = gsap.quickTo(element, "x", { duration: 0.3, ease: "power3" });
      let ySet = gsap.quickTo(element, "y", { duration: 0.3, ease: "power3" });

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

      element.addEventListener("mousemove", onMove);
      element.addEventListener("mouseout", onOut);

      // Cleanup
      return () => {
        element.removeEventListener("mousemove", onMove);
        element.removeEventListener("mouseout", onOut);
      };
    });

    if (!headerRef.current) return;
    const headroom = new Headroom(headerRef.current, {
      classes: {
        initial: "navbar",
        pinned: "navbar-pinned",
        unpinned: "navbar-unpinned",
      },
    });
    headroom.init();
    return () => headroom.destroy();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        id="navbar"
        className="navbar wrapper header-transparent px-10 py-12 lg:px-[2.5rem] lg:py-[3rem]"
      >
        <button
          className="navbar__menu-btn button magnetic"
          onClick={() => setMenuOpen(true)}
          type="button"
          aria-label="Open menu"
        >
          <div className="bars">
            <span className="bar bar__1"></span>
            <span className="bar bar__2"></span>
          </div>
          <span className="text">menu</span>
        </button>
        <a href="/services">
          <button className="button btn magnetic">
            <svg>
              <use href="/assets/images/sprite.svg#explore"></use>
            </svg>
            Explore Secu
          </button>
        </a>
      </header>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}