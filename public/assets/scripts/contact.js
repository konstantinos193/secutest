// form
const formTl = gsap
  .timeline({
    paused: true,
  })
  .from(SplitType.create("#contactForm h2", { types: "words" }).words, {
    yPercent: 50,
    opacity: 0,
    stagger: 0.15,
  })
  .from("#contactForm form .group input, #contactForm form .group textarea", {
    xPercent: 25 * (document.dir == "rtl" ? 1 : -1),
    opacity: 0,
    stagger: 0.15,
  })
  .fromTo(
    "#contactForm form .group div",
    {
      scaleX: 0,
    },
    {
      scaleX: 1,
      stagger: 0.15,
    },
    "<+=25%",
  )
  .from("#contactForm form button", {
    xPercent: -25,
    opacity: 0,
  });

window.onload = function () {
  formTl.play();
};

// contact info
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#contactInfo",
      start: "center center+=25%",
    },
  })
  .fromTo(
    "#contactInfo .top-line",
    {
      scaleX: 0,
    },
    {
      scaleX: 1,
      duration: 0.6,
    },
  )
  .fromTo(
    "#contactInfo .middle-line",
    {
      scaleY: 0,
    },

    { scaleY: 1, duration: 0.6 },
    "<",
  )
  .from("#contactInfo .contact-info > *", {
    yPercent: 25,
    opacity: 0,
    stagger: 0.25,
  })
  .fromTo(
    "#contactInfo .bottom-line",
    {
      scaleX: 0,
    },
    {
      scaleX: 1,
      duration: 0.6,
    },
    "<",
  );

// map
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#map",
      start: "top center",
      // scrub: 0.5,
    },
  })
  .from(SplitType.create("#map h2", { types: "words" }).words, {
    y: 50,
    opacity: 0,
    stagger: 0.15,
    ease: "power2.inOut",
  })
  .fromTo(
    "#map .map-overlay",
    {
      scaleY: 1,
    },
    {
      scaleY: 0,
      ease: "power2.inOut",
    },
    "<+=80%",
  );

// contact
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#contact",
      start: "top center",
    },
  })
  .from(
    document.dir == "rtl"
      ? ".contact__title span:nth-child(1)"
      : SplitType.create(".contact__title span:nth-child(1)", {
          types: "chars",
        }).chars,
    {
      opacity: 0,
      yPercent: -100,
      stagger: 0.05,
    },
  )
  .from(
    document.dir == "rtl"
      ? ".contact__title span:nth-child(2)"
      : SplitType.create(".contact__title span:nth-child(2)", {
          types: "chars",
        }).chars,
    {
      opacity: 0,
      yPercent: -100,
      stagger: 0.05,
    },
    "-=50%",
  )
  .from(
    document.dir == "rtl"
      ? ".contact__title span:nth-child(3)"
      : SplitType.create(".contact__title span:nth-child(3)", {
          types: "chars",
        }).chars,
    {
      opacity: 0,
      yPercent: -100,
      stagger: 0.05,
    },
    "-=50%",
  )
  .from(".contact__form", {
    opacity: 0,
    yPercent: 50,
  });
