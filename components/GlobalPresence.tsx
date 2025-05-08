"use client";
import React from "react";
import Image from "next/image";

const GlobalPresence = () => (
  <section id="global" className="wrapper py-32">
    <Image
      src="/assets/images/ksa-map.png"
      alt="KSA Map"
      width={1000}
      height={1000}
      className="flag mx-auto w-full max-w-[1000px]"
    />
    <div id="map-container" className="flag mx-auto w-full max-w-[1000px]"></div>
    <p
      className="text text-gradient relative z-20 -mt-[5rem] font-light leading-none tracking-tighter lg:-mt-[15rem] lg:ms-20 rtl:leading-tight"
      style={{ fontSize: "clamp(3.375rem, -8.0313rem + 36.5vw, 12.5rem)" }}
    >
      National <br /> Presence
    </p>
  </section>
);

export default GlobalPresence;