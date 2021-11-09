import { LoginForm } from "../../../components/card-login/card-login";
const loginCard = require("./__login.pug");
import anime from "animejs";

export class LoginCard {
  constructor(parent) {
    console.log("log ctor");
    this.parent = parent;
    this.html = loginCard();
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = this.html;
    // this.parent.innerHTML += this.html;
    this.parent.appendChild(tempContainer.firstElementChild);
    this.cardObject = new LoginForm({ form: this.parent.children.namedItem("login-card") });
    this.card = this.cardObject.card;
    this.cardContent = this.cardObject.form;

    this.width = this.card.getBoundingClientRect().width;
    this.height = this.card.getBoundingClientRect().height;
    this.card.style.display = "none";
    this.cardContent.style.opacity = 0;

    this.showAnimation = anime({
      begin: (anim) => {
        console.log("begin login animation");
        this.card.display = "block";
        // console.log(anim.reversed);
      },
      targets: this.cardContent,
      easing: "linear",
      opacity: [0, 1],
      duration: 500,
      autoplay: false,
      complete: (anim) => {
        console.log("complete login animation");
        if (anim.reversed) this.cardContent.display = "none";
      },
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
  hideContent() {
    console.log(this.showAnimation);
    this.showAnimation.reverse();
    this.showAnimation.play();
  }
}
