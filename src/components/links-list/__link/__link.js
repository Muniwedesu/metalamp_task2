import anime from "animejs";
const circleSize = 8;
function createObjectToAnimate(target) {
  const circle = document.createElement("div");
  circle.classList.add("animation__circle");
  //it'll need to be created every time IG
  //or I can just reposition it each time idk

  //move all of this to css?
  circle.style.width = `${circleSize}px`;
  circle.style.height = `${circleSize}px`;
  circle.style.position = "absolute";
  circle.style.borderRadius = "100%";
  circle.style.backgroundColor = "#000";
  circle.style.opacity = 0;
  // circle.style.transform = "translateX(-50%)";
  // circle.style.left = "50%";
  //just offset it by the cursor position
  circle.style.left = 0;
  circle.style.right = 0;
  circle.style.marginRight = "auto";
  circle.style.marginLeft = "auto";
  circle.style.transform = "translateY(-50%)";
  circle.style.top = "50%";
  circle.style.willChange = "transform, opacity";

  const animationWrapper = document.createElement("div");

  animationWrapper.classList.add("animation");
  animationWrapper.style.zIndex = "-1";
  animationWrapper.style.overflow = "hidden";
  animationWrapper.style.position = "absolute";
  animationWrapper.style.top = 0;
  animationWrapper.style.opacity = 1;
  animationWrapper.willChange = "opacity";

  let translateX = target.parentNode.classList.contains("links-list__item_inline") ? 120 : 105;
  animationWrapper.style.width = `${translateX}%`;

  //then center it somehow
  // console.log(animationWrapper.style.width);
  animationWrapper.style.left = "50%";
  animationWrapper.style.transform = `translateX(${-50}%)`;
  animationWrapper.style.height = "100%";
  animationWrapper.style.borderRadius = "2rem";

  animationWrapper.appendChild(circle);

  return animationWrapper;
}

function findObjectToAnimate(target) {
  //
  const objectToAnimate = target.querySelector(".animation");
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
    //get wrapper dimensions
    // console.log("received circle");
    const circle = animationObject.children[0];
    // console.log(animationObject.children);

    //add wrapper to the link node
    event.target.appendChild(animationObject);

    //this should happpen after DOM is ready
    const parentDimensions = {
      height: animationObject.getBoundingClientRect().height,
      width: animationObject.getBoundingClientRect().width,
    };
    //get circle, which is the only element inside wrapper
    // console.log("parent dimensions");
    // console.log(parentDimensions);
    //calculate circle size
    console.log(event);
    console.log(event.layerY); //top position
    console.log(event.layerX); //bottom position

    let c = parentDimensions.height;
    let r = parentDimensions.width / 2;

    let h = r - Math.sqrt(r * r - c * c * 0.25);
    if (!h) h = parentDimensions.height * 0.25;

    let ratio = (parentDimensions.width + 2 * h) / circleSize;
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
          complete: () => {
            // animationObject.style.backgroundColor = "rgba(0,0,0,0.03)";
          },
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
      // background: "rgb(255,0,0)",
      begin: () => {
        //maybe not remove this?
        // animationObject.classList.remove("animation");
      },
      complete: () => {
        // animationObject.remove();
      },
    });
  }
  animateEnter(event) {
    // correctly process entering when animation is not finished;
    // center element on cursor position

    if (event.target.classList.contains("links-list__link")) {
      setTimeout(() => {
        const animationObject =
          findObjectToAnimate(event.target) || createObjectToAnimate(event.target);
        // console.log(this.animation);
        //get a wrapper
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
          // console.log("condition 1");
          // console.log(this.animation);
          // console.log("completed");
          this.createLeavingAnimation(animationObject);
        } else {
          this.animation.children[0].finished.then(() => {
            // console.log("condition 2");
            this.animation.pause();
            //start this after previous animation was completed
            this.createLeavingAnimation(animationObject);
          });
        }
      }, 0);
    }
  }
}
