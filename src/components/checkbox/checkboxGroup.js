export class CheckboxGroup {
  /**
   * @param {HTMLElement} checkboxGroup
   */
  constructor(checkboxGroup) {
    console.log(checkboxGroup);
    this.$checkboxGroup = $(checkboxGroup);
    this.$checkboxList = this.$checkboxGroup.find(".checkbox-group__list");
    this.$checkboxName = this.$checkboxGroup.find(".checkbox-group__name");
    this.$checkboxName.on("click", () => {
      this.$checkboxList.toggleClass("checkbox-group__list_expanded");
      this.$checkboxName.toggleClass("checkbox-group__name_expanded");
    });
  }
}
