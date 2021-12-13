import anime from "animejs";

export class CheckboxGroup {
  /**
   * @param {HTMLElement} checkboxGroup
   */
  constructor(checkboxGroup) {
    console.log(checkboxGroup);
    this.$checkboxGroup = $(checkboxGroup);
    this.$checkboxList = this.$checkboxGroup.find(".checkbox-group__list");
    this.$checkboxName = this.$checkboxGroup.find(".checkbox-group__name");
    this.isOpen = false;
    this.$checkboxName.on("click", () => {
      if (this.isOpen) this.close();
      else this.open();
    });
    // this.checkboxGroup.getBoundingClientRect();
  }
  open() {
    this.isOpen = true;
    this.$checkboxList.addClass("checkbox-group__list_expanded");
    this.$checkboxName.addClass("checkbox-group__name_expanded");
  }
  close() {
    this.isOpen = false;
    this.$checkboxList.removeClass("checkbox-group__list_expanded");
    this.$checkboxName.removeClass("checkbox-group__name_expanded");
  }
}
