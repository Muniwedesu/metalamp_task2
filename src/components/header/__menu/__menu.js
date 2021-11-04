import { LinksList } from "../../links-list/links-list";
export class HeaderMenu {
  constructor($headerMenu) {
    this.$headerMenu = $headerMenu;
    this.$navigationBlock = this.$headerMenu.find(".header__navigation");
    this.$navigationTrigger = this.$headerMenu.find(".header__navigation-trigger");
    this.$navigationLabel = this.$headerMenu.find(".header__navigation-label");
    this.isDesktop = true;
    // so
    // it should open on focus/click
    // but...
    // I can't just use focus event
    // well I can use "change" event for input
    // and change it on focus
    // or click ()

    //on window resize open the menu when it's needed and prevent it from closing?
    // guess I have no other choice
    this.checkIfDesktop();
    window.addEventListener("resize", () => {
      //$breakpoint-desktop
      this.checkIfDesktop();
    });

    //also do the other thing when it becomes smaller
    console.log(this.$navigationTrigger[0].checked);
    this.$navigationTrigger.on("change", this.toggleNavigationMenu.bind(this));
    this.$headerMenu.on("focusout", this.toggleNavigationMenu.bind(this));
    this.$list = new LinksList({ list: this.$navigationBlock.find(".links-list") });
    //add a method to close all expandable lists ^ on focusout
    // fix ability to open multiple expandable lists
    //
    //fix focusout event so it toggles
  }
  checkIfDesktop(windowWidth) {
    if (window.innerWidth > 1024) {
      this.isDesktop = true;
      this.open({});
    } else {
      this.isDesktop = false;
      this.close({});
    }
  }
  toggleNavigationMenu(event) {
    // console.log(event);
    // console.log(event.relatedTarget);
    // fire on focusout?
    // nah
    // initial state is "checked"
    // therefore the menu should open when checkbox is unchecked
    //this should be available only if it's mobile view
    if (!this.isDesktop) {
      if (event.type === "focusout" && this.$headerMenu[0].contains(event.relatedTarget)) {
        this.$navigationTrigger[0].focus();
        event.preventDefault();
        console.log("focus menu");
      } else if (event.type === "focusout" && !event.relatedTarget) {
        //close all expanded lists too
        this.$list.closeAllChildren();
        this.close(event);
      } else {
        console.log(this.$navigationTrigger[0].checked);
        //do nothing
        if (this.isOpen) this.close(event);
        else if (!this.isOpen) {
          event.preventDefault();
          this.open(event);
        }
      }
    }
  }
  close(event) {
    console.log("closed");
    if (event.type !== "change") console.log(event);
    // this.$navigationTrigger[0].checked = true;
    this.isOpen = false;
    //this shouldn't be on by default
    console.log("menu closed");
    this.$headerMenu.css("overflow", "hidden");
    this.$headerMenu.removeClass("header__menu_open");
    this.$navigationLabel.removeClass("header__navigation-label_open");
    this.$navigationBlock.removeClass("header__navigation_visible");
  }
  open(event) {
    if (event) {
      if (event.type !== "change") console.log(event);
    }
    //do something with this?
    console.log("opened");
    this.$navigationTrigger[0].focus();

    this.isOpen = true;
    this.$headerMenu.addClass("header__menu_open");
    this.$navigationLabel.addClass("header__navigation-label_open");
    this.$navigationBlock.addClass("header__navigation_visible");
    setTimeout(() => {
      this.$headerMenu.css("overflow", "visible");
    }, 200);
  }
}
