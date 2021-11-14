import anime from "animejs";

function createCircle(parent) {
  const circle = document.createElement("div");
  let d = Math.max(parent.getBoundingClientRect().height, parent.getBoundingClientRect().width);
  circle.style.height = `${d}px`;
  circle.style.width = `${d}px`;
  console.log(circle.style.height);
  console.log(circle.style.width);
  circle.style.borderRadius = `${circle.style.height}`;
  circle.style.background = "#fff";
  circle.style.position = "absolute";
  circle.style.zIndex = 0;
  circle.ratio = parent.getBoundingClientRect().height / d;
  return circle;
}

export class Button {
  constructor(HTMLElement = {}) {
    //write down dimensions probably?
    //костыль на время
    if (!HTMLElement.classList.contains("button_outlined")) return;
    this.width = 0;
    this.height = 0;
    this.button = HTMLElement;
    this.button.style.overflow = "hidden";
    this.text = HTMLElement.children[0];
    this.button.addEventListener("mouseenter", this.attachCircle.bind(this));
    this.button.addEventListener("mouseleave", this.detachCircle.bind(this));
    this.circle = this.button.appendChild(createCircle(this.button));
    this.animationDuration = 300;
  }
  detachCircle() {
    anime({
      targets: this.circle,
      easing: "easeOutCubic",
      duration: this.animationDuration,
      opacity: 1,
      scale: 1,
      completed: () => {
        // this.circle.remove();
      },
    });
    anime({
      targets: this.text,
      easing: "easeInCubic",
      duration: this.animationDuration,
      color: "#bc9cff",
    });
  }
  attachCircle() {
    anime({
      targets: this.circle,
      easing: "easeOutCubic",
      duration: this.animationDuration,
      opacity: 0,
      scale: this.circle.ratio,
    });
    anime({
      targets: this.text,
      easing: "easeInCubic",
      duration: this.animationDuration,
      color: "#fff",
    });
  }
}
