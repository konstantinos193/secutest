// hero
const heroTitleSplited =
  document.dir == "rtl"
    ? SplitType.create("#hero .title", {
        types: "words",
      })
    : SplitType.create("#hero .title", {
        types: "words, chars",
      });
const heroTl = gsap
  .timeline({ paused: true })
  .from("#heroImg", {
    scale: 1.25,
    opacity: 0,
    duration: 1.125,
  })
  .from(
    "#hero hr",
    {
      scaleX: 0,
      delay: 0.5,
      duration: 1,
    },
    "<+=10%",
  )
  .from(
    document.dir == "rtl" ? heroTitleSplited.words : heroTitleSplited.chars,

    {
      yPercent: 100,
      scale: 0.85,
      opacity: 0,
      stagger: 0.04,
      rotate: 5,
      ease: "power2.inOut",
    },
    "-=25%",
  )
  .from(
    "#hero .img",
    {
      xPercent: -100,
      opacity: 0,
      duration: 1,
    },
    "-=40%",
  )
  .from(
    "#hero .desc > p",
    {
      opacity: 0,
      yPercent: 50,
      stagger: 0.15,
    },
    "-=50%",
  );

window.addEventListener("load", () => {
  heroTl.play();
});

const cases = document.querySelectorAll("#cases .case");

cases.forEach((caseStudy, i) => {
  const isOdd = i % 2 === 0;

  gsap
    .timeline({
      scrollTrigger: {
        trigger: caseStudy,
        start: "top bottom",
        end: "+=150%",
        scrub: 0.5,
      },
    })
    .from(caseStudy.querySelector(".step-1"), {
      xPercent: 50 * (isOdd ? -1 : 1),
      opacity: 0,
    })
    .from(caseStudy.querySelectorAll(".step-2 > span"), {
      xPercent: -50,
      opacity: 0,
      stagger: 0.15,
    })
    .from(caseStudy.querySelector(".step-3"), {
      xPercent: -100,
      opacity: 0,
      rotate: 180,
    })
    .from(caseStudy.querySelector(".step-4"), {
      yPercent: 50,
      opacity: 0,
    })
    .from(caseStudy.querySelectorAll(".step-5 > p"), {
      yPercent: 50,
      opacity: 0,
      stagger: 0.15,
    })
    .from(caseStudy.querySelector(".step-6"), {
      yPercent: 50,
      opacity: 0,
    });
});

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
