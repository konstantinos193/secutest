"use client";
import Link from "next/link";

const socialLinks = [
  { href: "#", icon: "twitter" },
  { href: "#", icon: "Instagram" },
  { href: "#", icon: "linkedin" },
  { href: "#", icon: "email" },
];

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "SERVICES" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/contact", label: "CONTACT US" },
];

export default function Footer() {
  return (
    <footer className="footer py-10 lg:py-20">
      <div className="wrapper mx-auto max-w-[1400px] px-4">
        <ul className="social-links mb-4 flex items-center justify-center gap-4 lg:mb-8 lg:gap-8">
          {socialLinks.map(({ href, icon }) => (
            <li className="button" key={icon}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <svg className="icon h-8 w-8 text-white">
                  <use href={`/assets/images/sprite.svg#${icon}`} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
        <nav className="footer__nav mb-4 lg:mb-8">
          <ul className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="link inline-block text-xs uppercase text-white/70 hover:text-white transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="copyrights text-center text-xs text-white/40">
          Copyright © 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
}