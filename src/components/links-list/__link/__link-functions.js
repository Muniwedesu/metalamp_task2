const circleSize = 2;
import anime from "animejs";
class Queue {
  constructor() {
    //queue implementation is faster only in Chrome and
    //only when n >= 100000
    //in this case there'll be no more than 3-5 els
    this.container = [];
  }
  enqueue(item) {
    return this.container.push(item);
  }
  dequeue() {
    return this.container.shift();
  }
}
class Circle {
  constructor(parent, params) {
    this.el = document.createElement("div");
    this.parent = parent;
    this.diameter = 2;

    this.p = this.calculateCircleDimensions(params);
    this.animationDuration = 400;
    this.initialize();

    anime
      .timeline({
        targets: this.el,
        duration: this.animationDuration,
      })
      .add({
        opacity: [0, 0.4],
        easing: "easeOutSine",
        duration: this.animationDuration * 0.5,
      })
      .add(
        {
          scale: [1, this.p.ratio],
          easing: "easeOutSine",
          backgroundColor: ["rgb(188,156,255)", "rgb(139,164,249)"],
          duration: this.animationDuration,
        },
        "-=200"
      )
      .add(
        {
          opacity: [0.4, 0.15],
          easing: "easeOutCubic",
        },
        "-=200"
      );
  }
  remove() {
    return anime({
      targets: this.el,
      opacity: 0,
      duration: this.animationDuration,
      easing: "easeInCubic",
      complete: () => {
        this.el.remove();
      },
    });
  }
  calculateCircleDimensions({ parentWidth, parentHeight, itemWidth, layerX, layerY }) {
    let c = parentHeight;
    let r = parentWidth * 0.5;

    //4 is magic number used not to calculate circle radius so it will fill
    // wrapper container in every position
    let h = r - Math.sqrt(r * r - c * c * 0.25) + 4;
    if (!h) h = c * 0.25;

    let scaledOffset = layerX * (parentWidth / itemWidth);

    r += Math.abs(scaledOffset - parentWidth * 0.5);
    return {
      ratio: (2 * (r + h)) / this.diameter,
      leftOffset: scaledOffset,
      topOffset: layerY,
    };
  }
  initialize() {
    //probably better move this to css
    this.el.classList.add("animation__circle");

    this.el.style.width = `${circleSize}px`;
    this.el.style.height = `${circleSize}px`;

    this.el.style.position = "absolute";
    this.el.style.borderRadius = "100%";
    this.el.style.backgroundColor = "#bc9cff";
    this.el.style.opacity = 0;

    this.el.style.left = 0;
    this.el.style.zIndex = "-1";

    this.el.style.transform = "translateX(-50%)";
    this.el.style.transform += "translateY(-50%)";
    this.el.style.willChange = "transform, opacity";
    this.el.style.top = `${this.p.topOffset}px`;
    this.el.style.left = `${this.p.leftOffset}px`;
    this.parent.appendChild(this.el);
  }
}
export class AnimationWrapper {
  constructor(parent) {
    this.parent = parent;
    this.create();
    this.parent.appendChild(this.el);
    // this.width = this.el.getBoundingClientRect().width;
    // this.height = this.el.getBoundingClientRect().height;
    console.log(this.width);
    this.circles = new Queue();
  }
  addCircle({ layerX, itemWidth, layerY, isDesktop }) {
    //
    this.el.style.width = `${isDesktop ? 120 : 105}%`;

    this.circles.enqueue(
      new Circle(this.el, {
        ...this.getDimensions(),
        itemWidth: itemWidth,
        layerX: layerX,
        layerY: layerY,
      })
    );
  }
  removeCircle() {
    // console.log("removing circle");
    let circle = this.circles.dequeue();
    circle.remove();
  }
  getDimensions() {
    let dims = this.el.getBoundingClientRect();
    return { parentWidth: dims.width, parentHeight: dims.height };
  }
  create() {
    this.el = document.createElement("div");
    this.initialize();
  }
  initialize() {
    this.el.classList.add("animation");
    this.el.style.zIndex = "-1";
    this.el.style.boxSizing = "border-box";
    this.el.style.overflow = "hidden";
    this.el.style.position = "absolute";
    this.el.style.top = 0;
    this.el.style.opacity = 1;
    this.el.style.left = "50%";
    this.el.style.transform = `translateX(${-50}%)`;
    this.el.style.height = "100%";
    this.el.style.borderRadius = "2rem";
    this.el.willChange = "opacity";
    this.el.style.width = "100%";
  }
}

export function addCenterMarkers(target) {
  let circleCenter = document.createElement("div");
  circleCenter.style.position = "absolute";
  circleCenter.style.top = "50%";
  circleCenter.style.left = "50%";
  circleCenter.style.transform = "translateX(-50%)";
  circleCenter.style.transform += "translateY(-50%)";
  circleCenter.style.width = "1px";
  circleCenter.style.height = "100%";
  circleCenter.style.background = "red";
  let circleCenterH = document.createElement("div");
  circleCenterH.style.position = "absolute";
  circleCenterH.style.top = "50%";
  circleCenterH.style.transform += "translateY(-50%)";
  circleCenterH.style.width = "100%";
  circleCenterH.style.height = "1px";
  circleCenterH.style.background = "red";
  target.appendChild(circleCenter);
  target.appendChild(circleCenterH);
}
