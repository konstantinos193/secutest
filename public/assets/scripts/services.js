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

// services
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#services",
      start: "top center",
    },
  })
  .from(SplitType.create("#services .title", { types: "words" }).words, {
    opacity: 0,
    yPercent: 100,
    stagger: 0.15,
  });

const services = document.querySelectorAll("#services .service");

gsap
  .matchMedia()
  .add("(min-width: 1024px)", () => {
    services.forEach((service, i) => {
      const isOdd = i % 2 === 0;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: service,
            start: "center center",
            end: "+=300%",
            pin: true,
            scrub: 0.5,
          },
        })
        .from(service.querySelector(".service-title"), {
          yPercent: 100,
          opacity: 0,
        })
        .from(service.querySelectorAll(".service-desc p"), {
          yPercent: 50,
          opacity: 0,
          stagger: 0.15,
        })
        .from(
          service.querySelector(".service-img"),
          {
            xPercent: 50 * (isOdd ? 1 : -1),
            opacity: 0,
          },
          "<+=50%",
        )
        .from(
          service.querySelector(".service-overlay"),
          {
            yPercent: 50,
            opacity: 0,
          },
          "<+=50%",
        )
        .from(
          service.querySelector(".service-icon"),
          {
            xPercent: 100,
            opacity: 0,
          },
          "<+=25%",
        )
        .to(
          service,
          {
            opacity: 0,
            yPercent: -50,
          },
        );
    });
  })
  .add("(max-width: 1023px)", () => {
    services.forEach((service, i) => {
      const isOdd = i % 2 === 0;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: service,
            start: "center center",
            end: "+=300%",
            pin: true,
            scrub: 0.5,
            // markers: true,
          },
        })
        // .from(service, {
        //   // opacity: 0,
        //   yPercent: 50,
        // })
        .from(
          service.querySelector(".service-img"),
          {
            xPercent: 50 * (isOdd ? 1 : -1),
            opacity: 0,
            // scale: 0.25,
          },
          "<+=50%",
        )
        .from(
          service.querySelector(".service-overlay"),
          {
            yPercent: 50,
            opacity: 0,
          },
          "<+=50%",
        )
        .from(
          service.querySelector(".service-icon"),
          {
            xPercent: 100,
            opacity: 0,
          },
          "<+=25%",
        )
        .from(service.querySelector(".service-title"), {
          yPercent: 100,
          opacity: 0,
        })
        .from(service.querySelectorAll(".service-desc p"), {
          yPercent: 50,
          opacity: 0,
          stagger: 0.15,
        });
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
