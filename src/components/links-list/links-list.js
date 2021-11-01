import anime from "animejs";
const circleSize = 8;
function createObjectToAnimate(target) {
  const circle = document.createElement("div");
  circle.classList.add("animation__circle");

  //move all of this to css?
  circle.style.width = `${circleSize}px`;
  circle.style.height = `${circleSize}px`;
  circle.style.position = "absolute";
  circle.style.borderRadius = "100%";
  circle.style.backgroundColor = "#000";
  circle.style.opacity = 0;
  // circle.style.transform = "translateX(-50%)";
  // circle.style.left = "50%";
  circle.style.left = 0;
  circle.style.right = 0;
  circle.style.marginRight = "auto";
  circle.style.marginLeft = "auto";
  circle.style.transform = "translateY(-50%)";
  circle.style.top = "50%";

  const animationWrapper = document.createElement("div");

  animationWrapper.classList.add("animation");
  animationWrapper.style.zIndex = "-1";
  animationWrapper.style.overflow = "hidden";
  animationWrapper.style.position = "absolute";
  animationWrapper.style.top = 0;
  animationWrapper.style.left = 0;
  // animationWrapper.style.backgroundColor = "rgba(255,0,0,0.5)";
  // this should be 90% for inline links
  console.log(`target`);
  console.log(target);
  //this should check if list-link__item_inline class present;
  //fix classes for expandable lists, they should not contain this class
  console.log(target.parentNode);
  console.log(target.parentNode.classList);
  console.log(target.parentNode.classList.contains("links-list__item_inline"));
  animationWrapper.style.width = target.parentNode.classList.contains("links-list__item_inline")
    ? "120%"
    : "90%";

  //then center it somehow
  console.log(animationWrapper.style.width);
  animationWrapper.style.transform = "translateX(-10%)";
  animationWrapper.style.height = "100%";
  animationWrapper.style.borderRadius = "2rem";

  animationWrapper.appendChild(circle);

  return animationWrapper;
}

function findObjectToAnimate(target) {
  //
  return target.querySelector(".animation");
}

class Link {
  constructor(el) {
    this.$el = el;
    this.$el.addEventListener("mouseleave", this.animateLeave.bind(this));
    this.$el.addEventListener("mouseenter", this.animateEnter.bind(this));
  }
  //make it prettier or whatever
  createEnteringAnimation(animationObject, event) {
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
        duration: 500,
      })
      .add({
        opacity: [0.15, 0],
        duration: 500,
        complete: () => {
          animationObject.style.backgroundColor = "rgba(0,0,0,0.03)";
        },
      });
  }
  createLeavingAnimation(animationObject) {
    //tidy up
    //animation object should be used there
    let currentOpacity = animationObject.style.opacity;
    return anime({
      targets: animationObject,
      opacity: [currentOpacity, 0],
      duration: 500,
      easing: "linear",
      // background: "rgb(255,0,0)",
      complete: () => {
        animationObject.remove();
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
        if (this.animation.completed || this.animation.children[0].completed) {
          this.animation.pause();
          // console.log(this.animation);
          // console.log("completed");
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
export class LinksList {
  constructor({ list }) {
    this.$el = $(list);
    console.log(this.$el);
    this.$items = this.$el.children(".links-list__item");
    if (window.innerWidth < 1024) {
      this.$el.removeClass("links-list_inline");
      this.$items.removeClass("links-list__item_inline");
    }
    window.addEventListener("resize", (event) => {
      // console.log(event.target.innerWidth);
      if (event.target.innerWidth < 1024) {
        this.$el.removeClass("links-list_inline");
        this.$items.removeClass("links-list__item_inline");
      } else {
        this.$el.addClass("links-list_inline");
        this.$items.addClass("links-list__item_inline");
      }
    });
    this.$expandableList = this.$el.find(".links-list__expandable-list");

    this.$expandableList.siblings(".links-list__link").each((x, y) => {
      $(y).on("click", (event) => {
        $(this.$expandableList[x]).toggleClass("links-list__expandable-list_expanded");
        this.$expandableList[x].focus();
      });
    });
    this.$el.on("focusout", (event) => {
      // console.log("list focusout");
      if (event.relatedTarget !== event.target.previousElementSibling)
        event.target.classList.remove("links-list__expandable-list_expanded");
    });
    this.createLinkObjects();
  }
  createLinkObjects() {
    this.$el
      .find(".links-list__link")
      .toArray()
      .forEach((element) => {
        new Link(element);
      });
  }
  //create a class for each list item;
  // so there will be an animation object for each of it;

  closeAllChildren() {
    return;
  }
}
