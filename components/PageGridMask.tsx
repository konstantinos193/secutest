"use client";
import React, { useEffect, useRef } from "react";

const PageGridMask: React.FC = () => {
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (maskRef.current) {
        maskRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        maskRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div className="page-grid-mask" ref={maskRef}></div>;
};

export default PageGridMask;
