import anime from "animejs";

const circleRadius = 4;
function createCircle(target, pos) {
  const circle = document.createElement("div");
  circle.diameter = circleRadius;
  circle.style.width = `${circle.diameter}px`;
  circle.style.height = `${circle.diameter}px`;
  circle.style.borderRadius = "100%";
  // circle.style.transform = `scaleX(${circle.diameter})`;
  // circle.style.transform = `scaleY(${circle.diameter})`;
  //then scale it to 2px size.
  //no-no-no-no, this won't work
  //backgroundColor: ["rgb(188,156,255)", "rgb(139,164,249)"],
  circle.style.position = "absolute";
  circle.style.background = "rgb(255,255,255)";
  circle.style.background = "radial-gradient(circle, #EAE0FF 0%, #DCCCFF 30%)";
  circle.style.zIndex = 5;
  //#DCCCFF #EAE0FF
  //should I really calculate position?
  // console.log(pos);
  circle.style.left = `${pos.left}px`;
  circle.style.top = `${pos.top}px`;
  // console.log(circle);
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
    let swapButton = this.cardContent.querySelector("a.button");
    let buttonPosition = {
      top:
        swapButton.offsetTop + (swapButton.getBoundingClientRect().height - circleRadius) * 0.5,
      left:
        swapButton.offsetLeft + (swapButton.getBoundingClientRect().width - circleRadius) * 0.5,
    };

    this.circle = createCircle(this.card, buttonPosition);
    let scale = ((newR + 100) / this.circle.diameter) * 2;
    const tl = anime
      .timeline()
      .add({
        targets: this.circle,
        scaleX: scale,
        scaleY: scale,
        duration: this.options.circleDuration * 0.6,
        easing: "easeOutCubic",
      })
      .add(
        {
          targets: this.circle,
          opacity: [1, 0],
          duration: this.options.circleDuration * 0.33,
          easing: "easeOutCubic",
          complete: () => {
            this.circle.remove();
          },
        },
        `-=${this.options.circleDuration * 0.5}`
      )
      .add(
        {
          targets: this.cardContent,
          opacity: [1, 0],
          duration: this.options.circleDuration * 0.2,
          easing: "easeOutCubic",
        },
        `-=${this.options.circleDuration * 0.6}`
      );
  }
  show() {
    this.card.style.display = "block";
  }
  hide() {
    this.card.style.display = "none";
  }
}
