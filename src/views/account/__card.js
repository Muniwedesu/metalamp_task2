import anime from "animejs";

function createCircle(target) {
  const circle = document.createElement("div");
  circle.radius = 32;
  circle.style.width = `${circle.radius}px`;
  circle.style.height = `${circle.radius}px`;
  circle.style.borderRadius = "100%";
  // circle.style.transform = `scaleX(${circle.radius})`;
  // circle.style.transform = `scaleY(${circle.radius})`;
  //then scale it to 2px size.
  //no-no-no-no, this won't work
  //backgroundColor: ["rgb(188,156,255)", "rgb(139,164,249)"],
  circle.style.position = "absolute";
  circle.style.background = "rgb(255,255,255)";
  circle.style.background =
    "radial-gradient(circle, rgba(188,156,255, 0.3) 0%, rgba(188,156,255,0.5) 30%)";
  circle.style.zIndex = 5;
  //should I really calculate position?
  circle.style.right = "40px";
  circle.style.bottom = "40px";

  console.log("create circle");
  target.appendChild(circle);
  return circle;
}
export class AccountCard {
  constructor(
    parent,
    options = { animationDuration: 1500 },
    cardParams = {
      id: null,
      pug: null,
      class: null,
    }
  ) {
    this.options = options;

    this.parent = parent;

    this.html = cardParams.pug();

    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = this.html;
    this.parent.appendChild(tempContainer.firstElementChild);

    this.cardObject = new cardParams.class({
      form: this.parent.children.namedItem(cardParams.id),
    });

    this.card = this.cardObject.card;
    this.cardContent = this.cardObject.form;

    this.width = this.card.getBoundingClientRect().width;
    this.height = this.card.getBoundingClientRect().height;

    this.card.style.display = "none";
    this.card.style.position = "relative";
    this.card.style.overflow = "hidden";
    this.cardContent.style.opacity = 0;

    this.showAnimation = anime({
      begin: (anim) => {
        if (!anim.reversed) {
          console.log("showing login");
          this.card.style.display = "block";
        }
      },
      targets: this.cardContent,
      easing: "linear",
      opacity: [0, 1],
      duration: this.options.animationDuration * 0.5,
      autoplay: false,
    });
  }

  attach() {
    this.showContent();
  }
  detach() {
    this.hideContent();
  }
  showContent() {
    this.showAnimation.play();
  }
  hideContent(newDimensions = { width: 100, height: 100 }) {
    let newR = Math.max(newDimensions.height, newDimensions.width);
    console.log(newR);
    this.circle = createCircle(this.card);
    // let scale = newR / (Math.max(this.width, this.height) / this.circle.radius);
    let scale = ((newR + 100) / this.circle.radius) * 2;
    console.log(scale);
    const tl = anime
      .timeline()
      .add({
        targets: this.circle,
        //create funcs to calculate new dimensions
        scaleX: scale,
        scaleY: scale,
        duration: this.options.circleDuration * 0.5,
        // borderColor: "rgb(139,164,249)",
        // backgroundColor: "rgb(255,255,255)",
        easing: "easeOutCubic",
      })
      .add(
        {
          targets: this.circle,
          opacity: [1, 0],
          duration: this.options.circleDuration * 0.33,
          easing: "easeOutCubic",
          // borderColor: "rgb(255,255,255)",
          complete: () => {
            console.log("removeCircle");
            this.circle.remove();
          },
        },
        `-=${this.options.circleDuration * 0.4}`
      )
      .add(
        {
          targets: this.cardContent,
          opacity: [1, 0],
          duration: this.options.circleDuration * 0.2,
          easing: "easeOutCubic",
        },
        `-=${this.options.circleDuration * 0.5}`
      );
  }
  show() {
    this.card.style.display = "block";
  }
  hide() {
    this.card.style.display = "none";
  }
}
