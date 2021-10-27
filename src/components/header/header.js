import { animate } from "popmotion";
import { HeaderMenu } from "./__menu/__menu";

export class Header {
  constructor(header) {
    this.$header = $(header);

    this.$buttons = this.$header.find(".header__buttons");
    this.$loginButton = this.$buttons.children(".header__login");
    this.$signupButton = this.$buttons.children(".header__signup");

    const $headerMenuContainer = this.$header.find(".header__menu");
    this.navigationMenu = new HeaderMenu($headerMenuContainer);

    //navigation wasn't meant to exist anyway?

    this.$loginButton.on("click", () => {
      window.location.href = window.origin + "/login.html";
    });

    this.$signupButton.on("click", () => {
      window.location.href = window.origin + "/register.html";
    });

    this.$logo = this.$header.find(".logo");
    this.$logo.on("click", (event) => {
      window.location.href = window.origin + "/index.html";
    });
    //create a menu
    //move all these blocks to it
  }
}
//it just creates itself, probably should be moved to an abstract page class?
//but this is not allowed within BEM?
$(".header").map(function () {
  console.log(this);
  new Header(this);
});
