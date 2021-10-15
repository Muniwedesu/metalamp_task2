import { LinksList } from "../links-list/links-list";
export class Header {
  constructor(header) {
    this.$header = $(header);
    this.$nav = this.$header.find(".header__navigation");
    this.$buttons = this.$header.find(".header__buttons");
    this.$loginButton = this.$buttons.children(".header__login");
    this.$signupButton = this.$buttons.children(".header__signup");
    this.$list = new LinksList({ list: this.$header.find(".links-list") });
    console.log(this.$loginButton);
    this.$loginButton.on("click", () => {
      console.log("login");
      window.location.href = window.origin + "/login.html";
    });
    this.$signupButton.on("click", () => {
      console.log("sign");
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

$(".header").map(function () {
  console.log(this);
  new Header(this);
});
