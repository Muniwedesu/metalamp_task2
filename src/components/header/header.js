import { LinksList } from "../links-list/links-list";
export class Header {
  constructor(header) {
    this.$header = $(header);

    this.$buttons = this.$header.find(".header__buttons");
    this.$loginButton = this.$buttons.children(".header__login");
    this.$signupButton = this.$buttons.children(".header__signup");

    this.$headerMenu = this.$header.find(".header__menu");
    this.$nav = this.$headerMenu.find(".header__navigation");
    this.$navigationTrigger = this.$headerMenu.find(".header__navigation-trigger");
    this.$navigationLabel = this.$headerMenu.find(".header__navigation-label");
    // this.$nav = this.$header.find(".header__navigation");
    this.$navigationTrigger.on("change", this.toggleNavigationMenu.bind(this));
    this.$list = new LinksList({ list: this.$header.find(".links-list") });
    console.log(this.$loginButton);

    //navigation wasn't meant to exist anyway?
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
  toggleNavigationMenu() {
    console.log("toggle");
    this.$navigationLabel.toggleClass("header__navigation-label_open");
  }
}
//it just creates itself, probably should be moved to an abstract page class?
//but this is not allowed within BEM?
$(".header").map(function () {
  console.log(this);
  new Header(this);
});
