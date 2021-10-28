import { LinksList } from "../../links-list/links-list";
export class HeaderMenu {
  constructor($headerMenu) {
    this.$headerMenu = $headerMenu;
    this.$navigationBlock = this.$headerMenu.find(".header__navigation");
    this.$navigationTrigger = this.$headerMenu.find(".header__navigation-trigger");
    this.$navigationLabel = this.$headerMenu.find(".header__navigation-label");

    this.$navigationTrigger.on("change", this.toggleNavigationMenu.bind(this));
    console.log(this.$navigationTrigger);
    this.$list = new LinksList({ list: this.$navigationBlock.find(".links-list") });
  }

  toggleNavigationMenu() {
    this.$headerMenu.toggleClass("header__menu_open");
    this.$navigationLabel.toggleClass("header__navigation-label_open");
    this.$navigationBlock.toggleClass("header__navigation_visible");
  }
}
