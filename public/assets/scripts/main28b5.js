gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  lerp: 0.07,
});

lenis.on("scroll", ScrollTrigger.update);

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const header = document.querySelector(".navbar");

const headroom = new Headroom(header, {
  classes: {
    initial: "navbar",
    pinned: "navbar-pinned",
    unpinned: "navbar-unpinned",
  },
});
headroom.init();

const menuTl = gsap.timeline({ paused: true });

menuTl
  .fromTo(
    "#menu",
    {
      y: "-100%",
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.15,
    },
  )
  .fromTo(
    document.dir == "rtl" ? "#menu .menu__brand" : SplitType.create("#menu .menu__brand", { types: "chars" }).chars,
    {
      yPercent: 50,
      opacity: 0,
    },
    {
      yPercent: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 0.25,
    },
    "<+=50%",
  )
  .fromTo(
    "#menu .menu__nav-link",
    {
      y: 80,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.25,
      ease: "power4.out",
    },
    "-=60%",
  )
  .fromTo(
    "#menu .menu__cta",
    {
      y: 80,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.15,
      ease: "power4.out",
    },
    "+=90%",
  )
  .fromTo(
    "#menu .menu__footer",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.15,
      ease: "power4.out",
    },
    "+=50%",
  );

function openMenu() {
  lenis.stop();
  menuTl.play();
}
function closeMenu() {
  lenis.start();
  menuTl.reverse();
}

gsap.matchMedia().add("(min-width: 1024px)", () => {
  const bgMask = document.querySelector(".page-grid-mask");

  window.addEventListener("mousemove", (event) => {
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    bgMask.style.setProperty("--mouse-x", cursorX + "px");
    bgMask.style.setProperty("--mouse-y", cursorY + "px");
  });
});
