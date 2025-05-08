import gsap from "gsap";

const attractHover = (elements, xMultiplier = 1, yMultiplier = 1) => {
  elements.forEach((element) => {
    let xSet = gsap.quickTo(element, "x", {
      duration: 0.3,
      ease: "power3",
    });
    let ySet = gsap.quickTo(element, "y", {
      duration: 0.3,
      ease: "power3",
    });

    element.addEventListener("mousemove", (e) => {
      const position = element.getBoundingClientRect();
      const xCoordinates = e.x - position.left - position.width / 2;
      const yCoordinates = e.y - position.top - position.height / 2;

      xSet(xCoordinates * xMultiplier);
      ySet(yCoordinates * yMultiplier);
    });

    element.addEventListener("mouseout", () => {
      xSet(0);
      ySet(0);
    });
  });
};

export const initAttractHover = () => {
  attractHover(document.querySelectorAll(".button"), 0.3, 0.2);
  attractHover(document.querySelectorAll(".link"), 0.1, 0.5);
}; 