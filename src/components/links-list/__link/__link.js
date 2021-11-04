import anime from "animejs";

import {
  calculateCircleDimensions,
  addCenterMarkers,
  createCircle,
  createWrapper,
  setWrapperWidth,
} from "./__link-functions";

function createObjectToAnimate(target) {
  const circle = createCircle();
  // console.log(target);
  const animationWrapper = createWrapper();
  // animationWrapper.style.border = "1px solid black";

  animationWrapper.appendChild(circle);

  return animationWrapper;
}

function findObjectToAnimate(target) {
  const objectToAnimate = target.querySelector(".animation");
  //do something with this (if it's even necessary)
  if (objectToAnimate) objectToAnimate.style.opacity = 1;
  return objectToAnimate;
}

export class Link {
  constructor(el) {
    this.$el = el;
    this.$el.addEventListener("mouseleave", this.animateLeave.bind(this));
    this.$el.addEventListener("mouseenter", this.animateEnter.bind(this));
  }
  //make it prettier or whatever
  createEnteringAnimation(animationObject, event) {
    //do something with cases when this animation is not completed but is called again
    const circle = animationObject.children[0];
    event.target.appendChild(animationObject);
    //this should happpen after DOM is ready
    let circleParams = calculateCircleDimensions({
      animationObject: animationObject,
      layerX: event.layerX,
      itemWidth: event.target.getBoundingClientRect().width,
    });
    circle.style.top = `${event.layerY}px`;
    circle.style.left = `${circleParams.leftOffset}px`;

    return anime
      .timeline({})
      .add({
        targets: circle,
        opacity: [0, 0.4],
        scale: [1, circleParams.ratio],
        backgroundColor: ["#000", "#bc9cff"],
        easing: "easeOutSine",
        duration: 400,
      })
      .add(
        {
          targets: circle,
          opacity: [0.4, 0.15],
          backgroundColor: ["rgb(188,156,255)", "rgb(139,164,249)"],
          duration: 400,
          easing: "linear",
        },
        "-=200"
      );
  }
  createLeavingAnimation(animationObject) {
    //tidy up
    //animation object should be used there?
    let currentOpacity = animationObject.style.opacity;
    return anime({
      targets: animationObject,
      opacity: [currentOpacity, 0],
      duration: 200,
      easing: "linear",
    });
  }
  animateEnter(event) {
    // correctly process entering when animation is not finished;
    if (event.target.classList.contains("links-list__link")) {
      setTimeout(() => {
        const animationObject =
          findObjectToAnimate(event.target) || createObjectToAnimate(event.target);
        setWrapperWidth(
          animationObject,
          event.target.parentNode.classList.contains("links-list__item_inline")
        );
        this.animation = this.createEnteringAnimation(animationObject, event);
      }, 0);
    }
  }
  animateLeave(event) {
    //tidy up
    if (event.target.classList.contains("links-list__link")) {
      setTimeout(() => {
        const animationObject =
          findObjectToAnimate(event.target) || createObjectToAnimate(event.target);
        if (this.animation.completed || this.animation.children[0].completed) {
          this.createLeavingAnimation(animationObject);
        } else {
          this.animation.children[0].finished.then(() => {
            this.animation.pause();
            this.createLeavingAnimation(animationObject);
          });
        }
      }, 0);
    }
  }
}
