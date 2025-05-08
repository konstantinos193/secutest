(function () {
  const cursor = document.querySelector(".cursor");

  const links = document.querySelectorAll("a");
  const buttons = document.querySelectorAll("button");
  const hideCursor = document.querySelectorAll("[data-hide-cursor]");

  let setLeft = gsap.quickTo(cursor, "left", { duration: 0.3, ease: "power3" });
  let setTop = gsap.quickTo(cursor, "top", { duration: 0.3, ease: "power3" });

  const initCursor = () => {
    window.addEventListener("mousemove", (e) => {
      setLeft(e.clientX);
      setTop(e.clientY);

      if (
        e.target.matches("[data-hide-cursor]") ||
        e.target.closest("[data-hide-cursor]")
      )
        return;

      gsap.set(cursor, { opacity: 1, duration: 0.3, ease: "power3" });
    });

    links.forEach((link) =>
      link.addEventListener("mouseenter", (e) => {
        if (
          e.target.matches("[data-hide-cursor]") ||
          e.target.closest("[data-hide-cursor]")
        )
          return;

        gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: "power3" });
      }),
    );

    links.forEach((link) =>
      link.addEventListener("mouseleave", (e) => {
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3" });
      }),
    );

    buttons.forEach((button) =>
      button.addEventListener("mouseenter", (e) => {
        gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: "power3" });
      }),
    );

    buttons.forEach((button) =>
      button.addEventListener("mouseleave", (e) => {
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3" });
      }),
    );

    hideCursor.forEach((el) =>
      el.addEventListener("mouseenter", (e) => {
        gsap.to(cursor, { scale: 0, duration: 0.3, ease: "power3" });
      }),
    );

    hideCursor.forEach((el) =>
      el.addEventListener("mouseleave", (e) => {
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3" });
      }),
    );

    window.addEventListener("mousedown", () => {
      gsap.to(cursor, { scale: 2, duration: 0.3, ease: "power3" });
    });

    window.addEventListener("mouseup", () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3" });
    });
  };

  initCursor();
})();
