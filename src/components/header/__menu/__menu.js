import { LinksList } from "../../links-list/links-list";
export class HeaderMenu {
  constructor($headerMenu) {
    this.$headerMenu = $headerMenu;
    this.$navigationBlock = this.$headerMenu.find(".header__navigation");
    this.$navigationTrigger = this.$headerMenu.find(".header__navigation-trigger");
    this.$navigationLabel = this.$headerMenu.find(".header__navigation-label");

    if (window.innerWidth > 1024) {
      this.$headerMenu.addClass("header__menu_open");
    }
    window.addEventListener("resize", () => {
      if (event.target.innerWidth < 1024) {
        // this.$headerMenu.removeClass("header__menu_open");
        //set open class
      } else {
        // this.$headerMenu.addClass("header__menu_open");
        //remove open class
      }
    });
    this.$navigationTrigger.on("change", this.toggleNavigationMenu.bind(this));

    this.$list = new LinksList({ list: this.$navigationBlock.find(".links-list") });
  }

  toggleNavigationMenu() {
    this.$headerMenu.toggleClass("header__menu_open");
    this.$navigationLabel.toggleClass("header__navigation-label_open");
    this.$navigationBlock.toggleClass("header__navigation_visible");
  }
}
