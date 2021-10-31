import anime from "animejs";
const circleSize = 8;
function createOrFindCircle(target) {
  let circle = target.querySelector("div");
  // console.log(circle);
  if (!circle) {
    circle = document.createElement("div");
    circle.style.width = `${circleSize}px`;
    circle.style.height = `${circleSize}px`;
    circle.style.position = "absolute";
    circle.style.borderRadius = "100%";
    circle.style.zIndex = "-1";
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
    target.appendChild(circle);
  }

  target.parentNode.style.overflow = "hidden";
  // target.parentNode.style.border = "1px solid black";

  return circle;
}
class Link {
  constructor(el) {
    this.$el = el;
    this.$el.addEventListener("mouseleave", this.animateLeave.bind(this));
    this.$el.addEventListener("mouseenter", this.animateEnter.bind(this));
  }
  //make it prettier or whatever
  enteringAnimation(circle, event) {
    const parentDims = {
      height: event.target.parentNode.getBoundingClientRect().height,
      width: event.target.parentNode.getBoundingClientRect().width,
    };

    let c = parentDims.height;
    let r = parentDims.width / 2;

    let h = r - Math.sqrt(r * r - c * c * 0.25);
    if (!h) h = parentDims.height * 0.25;

    let ratio = (parentDims.width + 2 * h) / circleSize;
    return anime
      .timeline({})
      .add({
        targets: circle,
        opacity: [0, 0.15],
        scale: [1, ratio],
        easing: "easeOutSine",
        duration: 200,
      })
      .add(
        {
          targets: circle,
          opacity: [0.15, 0.03],
          easing: "linear",
          duration: 200,
          complete: () => {
            //set target to menu item?
            //set background to gray color
            //remove circle
            //remove overflow: hidden
            this.$el.parentNode.style.backgroundColor = "rgba(0, 0, 0, 0.03)";
            this.$el.parentNode.style.overflow = "visible";
            circle.remove();
          },
        },
        "-=100"
      );
  }
  leavingAnimation(circle) {
    //tidy up
    let currentOpacity = circle.style.opacity;
    return anime({
      targets: circle,
      opacity: [currentOpacity, 0],
      duration: 100,
      easing: "linear",
      // background: "rgb(255,0,0)",
      complete: () => {
        circle.remove();
      },
    });
  }
  animateEnter(event) {
    // correctly process entering when animation is not finished;
    // spawn element on cursor position
    if (event.target.classList.contains("links-list__link")) {
      setTimeout(() => {
        const circle = createOrFindCircle(event.target);
        // console.log(this.animation);
        this.animation = this.enteringAnimation(circle, event);
      }, 0);
    }
  }
  animateLeave(event) {
    if (event.target.classList.contains("links-list__link")) {
      setTimeout(() => {
        // this.animation.pause();
        const circle = createOrFindCircle(event.target);
        if (this.animation.completed || this.animation.children[0].completed) {
          this.animation.pause();
          // console.log(this.animation);
          // console.log("completed");
          this.leavingAnimation(circle);
        } else {
          this.animation.children[0].finished.then(() => {
            this.animation.pause();
            //start this after previous animation was completed
            this.leavingAnimation(circle);
          });
        }
      }, 0);
    }
  }
}
export class LinksList {
  constructor({ list }) {
    this.$el = $(list);
    this.$items = this.$el.find(".links-list__item");
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
    this.$items
      .children(".links-list__link")
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
