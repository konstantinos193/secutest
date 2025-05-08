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
      // scale: 0.85,
      opacity: 0,
      stagger: document.dir == "rtl" ? 0.04 : 0.05,
      // rotate: 5,
      ease: "power2.inOut",
    },
    "<+=50%",
  )
  .from(
    "#hero .desc",
    {
      opacity: 0,
      yPercent: 50,
      duration: 0.5,
    },
    // "<+=80%",
  });

if (document.querySelector("#hero .button")) {
  heroTl.from(
    "#hero .button",
    {
      xPercent: -100,
      opacity: 0,
      duration: 1,
    },
    "<+=50%",
  );
}

heroTl.from(
  "#hero .img",
  {
    xPercent: -100,
    opacity: 0,
    duration: 1,
  },
  "<+=20%",
);

window.addEventListener("load", () => {
  if (document.querySelector("#hero .button")) {
    heroTl.play();
  }
});

// about
if (document.querySelector("#about .subtitle")) {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
      },
    })
    .from(SplitType.create("#about .subtitle", { types: "words" }).words, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
    })
    .from(
      SplitType.create("#about .title", {
        types: "words",
      }).words,
      {
        opacity: 0,
        y: 50,
        stagger: 0.1,
      },
    )
    .from("#about .marquee-wrapper", {
      x: 50,
      opacity: 0,
      duration: 1,
    })
    .from(
      ["#about .section-desc", "#about .button"],
      {
        y: 50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.5,
      },
      "-=25%",
    );
}

// clients
if (document.querySelector("#clients img")) {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#clients",
        start: "top bottom",
        scrub: 0.5,
      },
    })
    .from("#clients img", {
      yPercent: 100,
      opacity: 0,
      stagger: {
        amount: 0.25,
        from: "center",
      },
    });
}

// services
if (document.querySelector("#servicesList > li")) {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#services",
        start: "top center",
      },
    })
    .from(SplitType.create("#services .subtitle", { types: "words" }).words, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
    })
    .from(
      SplitType.create("#services .title", {
        types: "words",
      }).words,
      {
        opacity: 0,
        y: 50,
        stagger: 0.1,
      },
    )
    .from("#servicesList > li", {
      y: 50,
      opacity: 0,
      stagger: 0.25,
    });
}

gsap
  .timeline({
    scrollTrigger: {
      trigger: "#case-studies",
      start: "top center",
      // pin: true,
      // scrub: 0.5,
    },
  })
  .from(SplitType.create("#case-studies .subtitle", { types: "words" }).words, {
    opacity: 0,
    y: 20,
    stagger: 0.05,
  })
  .from(
    SplitType.create("#case-studies .title", {
      types: "words",
    }).words,
    {
      opacity: 0,
      y: 50,
      stagger: 0.1,
    },
  );

const featuresList = document.querySelectorAll(".feature");
featuresList.forEach((feature) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: feature,
        start: "center center",
        // pin: "#featureList",
        pin: true,
        scrub: 0.5,
      },
    })
    .from(
      feature.querySelectorAll("figure > *"),
      {
        x: 50,
        opacity: 0,
        stagger: 0.25,
      },
      "-=25%",
    )
    .from(feature.querySelectorAll(".security-content > *"), {
      y: 25,
      opacity: 0,
      stagger: 0.25,
    })
    .from(
      feature.querySelector(".security-icon"),
      {
        scale: 0,
        opacity: 0,
        duration: 0.75,
      },
      "-=50%",
    );
});

// global
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#global",
      start: "top center",
    },
  })
  .from("#global .flag", {
    opacity: 0,
    scale: 0,
    duration: 1,
  })
  .from(
    document.dir == "rtl"
      ? SplitType.create("#global .text", { types: "words" }).words
      : SplitType.create("#global .text", { types: "chars" }).chars,
    {
      y: 50,
      opacity: 0,
      stagger: document.dir == "rtl" ? 0.1 : 0.04,
    },
    "-=50%",
  );

// statistics
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#statistics",
      start: "top center",
      // end: "+=200%",
      // scrub: true,
      // pin: true,
    },
  })
  .from(".statistics__tag", {
    yPercent: 20,
    opacity: 0,
    duration: 1,
  })
  .from(
    SplitType.create("#statistics .statistics__text", {
      types: "words",
    }).words,
    {
      yPercent: 10,
      opacity: 0,
      stagger: 0.01,
      // duration: 0.1,
    },
  )
  .from(
    ".statistics-box",
    {
      xPercent: 80 * (document.dir == "rtl" ? -1 : 1),
      opacity: 0,
      duration: 1,
    },
    "-=80%",
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
