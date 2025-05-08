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
    "<+=50%",
  )
  .from(
    "#hero .desc > p",
    {
      opacity: 0,
      yPercent: 50,
      stagger: 0.15,
    },
    "<+=50%",
  )
  .from(
    "#hero .img",
    {
      xPercent: -100,
      opacity: 0,
      duration: 1,
    },
    "<+=50%",
  );

window.addEventListener("load", () => {
  heroTl.play();
});

// about
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#about",
      start: "top center",
    },
  })
  .from(SplitType.create("#about h2", { types: "words" }).words, {
    opacity: 0,
    y: 0,
    stagger: {
      amount: 0.25,
      from: "ranedgesdom",
    },
  })
  .add(() => {
    gsap.matchMedia().add("(min-width: 1024px)", () => {
      const aboutTextWrapper = document.querySelector("#aboutTextWrapper");
      const aboutImg = aboutTextWrapper.querySelector("#aboutImgWrapper");

      if (aboutImg) {
        aboutTextWrapper.addEventListener("mouseenter", () => {
          gsap.to(aboutImg, { opacity: 1, scale: 1 });
        });

        aboutTextWrapper.addEventListener("mouseleave", () => {
          gsap.to(aboutImg, { opacity: 0, scale: 0.25, rotate: 0 });
          // gsap.set(aboutImg, {})
        });

        let setImgLeft = gsap.quickTo(aboutImg, "left", {
          duration: 0.3,
          ease: "power3",
        });
        let setImgTop = gsap.quickTo(aboutImg, "top", {
          duration: 0.3,
          ease: "power3",
        });

        aboutTextWrapper.addEventListener("mousemove", (e) => {
          var rect = e.currentTarget.getBoundingClientRect();
          var x = e.clientX - rect.left;
          var y = e.clientY - rect.top;

          setImgLeft(x);
          setImgTop(y);
        });
      }
    });
  });

gsap
  .timeline({
    scrollTrigger: {
      trigger: "#solutions .box-1",
      start: "center center",
      end: "+=400%",
      scrub: 0.15,
      pin: true,
    },
  })
  .from(".box-1 .step-1", {
    xPercent: -100,
    opacity: 0,
    rotate: 180,
  })
  .from(
    SplitType.create(".box-1 .step-2", { types: "words" }).words,
    {
      X: -10,
      opacity: 0,
      stagger: 0.15,
    },
    "<+=50%",
  )
  .from(SplitType.create(".box-1 .step-3", { types: "lines" }).lines, {
    X: -10,
    opacity: 0,
    stagger: 0.15,
  })
  .from(
    ".box-1 .step-4",
    {
      x: 50,
      opacity: 0,
    },
    "<+=50%",
  )
  .from(
    ".box-1 .step-5 > span",
    {
      yPercent: -100,
      opacity: 0,
      stagger: 0.5,
    },
    "<+=50%",
  )
  .from(".box-1 .step-6", {
    xPercent: -100,
    opacity: 0,
    rotate: 180,
  })
  .from(SplitType.create(".box-1 .step-7", { types: "words" }).words, {
    X: -10,
    opacity: 0,
    stagger: 0.15,
  })
  .from(".box-1 .step-8 > li", {
    X: -10,
    opacity: 0,
    stagger: 0.15,
  });

// solutions
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#solutions .box-2",
      start: "center center",
      end: "+=400%",
      scrub: true,
      pin: true,
    },
  })
  .from(".box-2 .step-1", {
    xPercent: -100,
    opacity: 0,
    rotate: 180,
  })
  .from(
    SplitType.create(".box-2 .step-2", { types: "words" }).words,
    {
      X: -10,
      opacity: 0,
      stagger: 0.1,
    },
    "<+=50%",
  )
  .from(
    ".box-2 .step-3 > p",
    {
      X: -10,
      opacity: 0,
      stagger: 0.1,
    },
    "<+=50%",
  )
  .from(".box-2 .step-4", {
    xPercent: 50,
    opacity: 0,
  });

// block-image
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".block-image",
      start: "top bottom",
    },
  })
  .from(".block-image", {
    xPercent: 100,
    opacity: 0,
  });

// message
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#message",
      start: "top center",
    },
  })
  .from(SplitType.create("#message .title", { types: "words" }).words, {
    y: 0,
    opacity: 0,
    stagger: 0.15,
  })
  .from("#message .arrows", {
    xPercent: -50,
    opacity: 0,
    // stagger: 0.15,
  })
  .from(document.querySelectorAll("#message .swiper-tab"), {
    opacity: 0,
    yPercent: -50,
    stagger: 0.25,
  })
  .from("#message .swiper", {
    yPercent: 50,
    opacity: 0,
  });

// team
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#team",
      start: "top center",
    },
  })
  .from("#team .tag", {
    xPercent: 100,
    opacity: 0,
  })
  .from(SplitType.create("#team .desc", { types: "words" }).words, {
    X: -10,
    opacity: 0,
    stagger: 0.01,
  })
  .from("#team .arrows", {
    xPercent: -50,
    opacity: 0,
    // stagger: 0.15,
  })
  .from("#team .swiper .swiper-slide", {
    xPercent: 100,
    opacity: 0,
    stagger: 0.25,
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
