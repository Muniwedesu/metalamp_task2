import { RegisterForm } from "../../../components/card-register/card-register";
import anime from "animejs";

const registerCard = require("./__register.pug");

export class RegisterCard {
  constructor(parent) {
    //just HTML Object
    //load itself, get dimensions, set display to none
    //and opacity to 0
    console.log("reg ctor");
    this.parent = parent;
    this.html = registerCard();
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = this.html;
    // this.parent.innerHTML += this.html;
    this.parent.appendChild(tempContainer.firstElementChild);

    this.cardObject = new RegisterForm({ form: this.parent.children.namedItem("register-card") });
    this.card = this.cardObject.card;
    //ok for some reason link to htmlObject gets rewritten
    // console.log(this.cardObject);
    this.cardContent = this.cardObject.form;

    this.width = this.card.getBoundingClientRect().width;
    this.height = this.card.getBoundingClientRect().height;

    this.cardContent.style.opacity = 0;
    this.card.style.display = "none";
  }
  attach() {
    this.showContent();
  }
  detach() {
    this.hideContent();
  }
  showContent() {
    this.showAnimation = anime({
      begin: (anim) => {
        // if animation is reversed - display none,
        // otherwise block?
        console.log(anim.reversed);
        console.log("begin register animation");
        this.card.style.display = "block";
      },
      targets: this.cardContent,
      easing: "linear",
      opacity: ["0", "1"],
      duration: 200,
      round: 100,
      autoplay: false,
      complete: (anim) => {
        // if animation is reversed - display none,
        // otherwise block?
        console.log("complete register animation");
        if (anim.reversed) {
          this.card.style.display = "none";
        }
        anim.reverse();
      },
    });

    this.showAnimation.play();
  }
  hideContent() {
    this.showAnimation.play();
    // this.showAnimation.reverse();
  }
}
