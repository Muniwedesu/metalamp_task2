import anime from "animejs";
const circleSize = 2;
import { addCenterMarkers, createCircle, createWrapper } from "./__link-functions";

function setWrapperWidth(wrapper, isDesktop) {
  let translateX = isDesktop ? 120 : 105;
  wrapper.style.width = `${translateX}%`;
}

function createObjectToAnimate(target) {
  const circle = createCircle();
  // console.log(target);
  const animationWrapper = createWrapper();
  // animationWrapper.style.border = "1px solid black";
  //120 : 105;

  //then center it somehow
  // console.log(animationWrapper.style.width);
  animationWrapper.appendChild(circle);

  return animationWrapper;
}

function findObjectToAnimate(target) {
  const objectToAnimate = target.querySelector(".animation");
  //do something with this (if it's even necessary)
  if (objectToAnimate) objectToAnimate.style.opacity = 1;
  return objectToAnimate;
}
function calculateCircleDimensions(target) {}

export class Link {
  constructor(el) {
    this.$el = el;
    this.$el.addEventListener("mouseleave", this.animateLeave.bind(this));
    this.$el.addEventListener("mouseenter", this.animateEnter.bind(this));
  }
  //make it prettier or whatever
  createEnteringAnimation(animationObject, event) {
    //do something with cases when this animation is not completed but is called again
    //get wrapper dimensions
    const circle = animationObject.children[0];

    event.target.appendChild(animationObject);

    //this should happpen after DOM is ready
    const parentDimensions = {
      height: animationObject.getBoundingClientRect().height,
      width: animationObject.getBoundingClientRect().width,
    };

    console.log(event);
    console.log(event.layerY); //top position
    console.log(event.layerX); //bottom position
    console.log(parentDimensions.width / event.target.getBoundingClientRect().width); //bottom position
    console.log(
      event.layerX * (parentDimensions.width / event.target.getBoundingClientRect().width)
    ); //bottom position

    let c = parentDimensions.height;
    let r = parentDimensions.width * 0.5;
    console.log(`r = ${r}`);
    //here
    let scaledOffset =
      event.layerX * (parentDimensions.width / event.target.getBoundingClientRect().width);

    let h = r - Math.sqrt(r * r - c * c * 0.25);
    if (!h) h = parentDimensions.height * 0.25;

    r += Math.abs(scaledOffset - parentDimensions.width * 0.5);
    console.log(`offset = ${event.layerX}`);
    console.log(`scaled offset = ${scaledOffset}`);
    console.log(`width = ${parentDimensions.width}`);
    console.log(`r' = ${r}`);
    let ratio = (2 * (r + h)) / circleSize;
    //use relative units for margins

    circle.style.top = `${event.layerY}px`;
    circle.style.left = `${scaledOffset}px`;

    return anime
      .timeline({})
      .add({
        targets: circle,
        opacity: [0, 0.15],
        scale: [1, ratio],
        easing: "easeOutSine",
        duration: 300,
      })
      .add(
        {
          targets: circle,
          opacity: [0.15, 0.05],
          duration: 300,
          easing: "linear",
        },
        "-=200"
      );
  }
  createLeavingAnimation(animationObject) {
    //tidy up
    //animation object should be used there
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
    // center element on cursor position

    if (event.target.classList.contains("links-list__link")) {
      setTimeout(() => {
        const animationObject =
          findObjectToAnimate(event.target) || createObjectToAnimate(event.target);
        //get a wrapper
        setWrapperWidth(
          animationObject,
          event.target.parentNode.classList.contains("links-list__item_inline")
        );
        this.animation = this.createEnteringAnimation(animationObject, event);
      }, 0);
    }
  }
  animateLeave(event) {
    if (event.target.classList.contains("links-list__link")) {
      setTimeout(() => {
        // this.animation.pause();
        const animationObject =
          findObjectToAnimate(event.target) || createObjectToAnimate(event.target);
        // const circle = animationObject.children[0];
        //
        console.log("condition");
        if (this.animation.completed || this.animation.children[0].completed) {
          // this.animation.pause();
          this.createLeavingAnimation(animationObject);
        } else {
          this.animation.children[0].finished.then(() => {
            this.animation.pause();
            //start this after previous animation was completed
            this.createLeavingAnimation(animationObject);
          });
        }
      }, 0);
    }
  }
}
