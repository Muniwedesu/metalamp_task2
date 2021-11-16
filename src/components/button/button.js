import anime from "animejs";

function createCircle({ width, height }) {
  const circle = document.createElement("div");
  let d = Math.max(height, width);
  circle.ratio = height / d;

  circle.style.height = `${d}px`;
  circle.style.width = `${d}px`;
  circle.style.borderRadius = `${circle.style.height}`;
  circle.style.background = "#fff";
  circle.style.position = "absolute";
  circle.style.zIndex = 0;
  return circle;
}

class Button {
  constructor(HTMLElement = {}) {
    this.button = HTMLElement;
    this.width = this.button.getBoundingClientRect().width;
    this.height = this.button.getBoundingClientRect().height;
    this.text = HTMLElement.children[0];

    this.animationDuration = 300;
    this.button.addEventListener("mouseenter", this.onMouseEnter.bind(this));
    this.button.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  }
  onMouseEnter() {
    console.log("base enter");
  }
  onMouseLeave() {
    console.log("base leave");
  }
}
export class ButtonFilled extends Button {
  constructor(HTMLElement = {}) {
    super(HTMLElement);
  }
  onMouseEnter() {}
  onMouseLeave() {}
}
export class ButtonOutlined extends Button {
  constructor(HTMLElement = {}) {
    super(HTMLElement);
    //write down dimensions probably?
    //костыль на время
    if (!HTMLElement.classList.contains("button_outlined")) return;

    this.circle = this.button.appendChild(
      createCircle({ width: this.width, height: this.height })
    );

    this.button.style.overflow = "hidden";
  }
  onMouseEnter() {
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
  onMouseLeave() {
    anime({
      targets: this.circle,
      easing: "easeOutCubic",
      duration: this.animationDuration,
      opacity: 1,
      scale: 1,
    });
    anime({
      targets: this.text,
      easing: "easeInCubic",
      duration: this.animationDuration,
      color: "#bc9cff",
    });
  }
}
