'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function ContactSection() {
  useEffect(() => {
    // Split each line of the heading into chars
    const lines = document.querySelectorAll('.contact__title span');
    const splits = Array.from(lines).map(line =>
      new SplitType(line, { types: 'chars', tagName: 'div', charClass: 'char' })
    );
    const chars1 = lines[0]?.querySelectorAll('.char') || [];
    const chars2 = lines[1]?.querySelectorAll('.char') || [];
    gsap.set([chars1, chars2], { opacity: 0, y: 60 });
    const tl = gsap.timeline();
    tl.to(chars1, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.7,
      ease: 'power3.out',
    })
      .to(chars2, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.5')
      .from('.contact__form', {
        opacity: 0,
        y: 50,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.3');
    return () => {
      splits.forEach(split => split.revert());
    };
  }, []);

  return (
    <section id="contact" className="contact">
      <div className="wrapper">
        <header className="contact__header">
          <h2 className="contact__title">
            <span className="text-gradient">Let us</span>
            <span className="text-gradient">secure you</span>
          </h2>
        </header>
        <form className="contact__form" method="post" action="https://secu.sa/requestService">
          <input type="hidden" name="_token" value="" autoComplete="off" />
          <div className="space-y-4 lg:space-y-6">
            <input type="text" required name="name" className="contact__form-input" placeholder="Name" />
            <input type="email" required name="email" className="contact__form-input" placeholder="Email" />
            <input type="text" required name="security_type" className="contact__form-input" placeholder="Security Type" />
            <input type="text" required name="project_details" className="contact__form-input" placeholder="Project Details" />
          </div>
          <button type="submit" className="contact__form-btn">
            Submit Message
          </button>
        </form>
      </div>
    </section>
  );
} 