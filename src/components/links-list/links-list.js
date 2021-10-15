export class LinksList {
  constructor({ list }) {
    this.$el = $(list);
    this.$expandableList = this.$el.find(".links-list__expandable-list");
    // console.log(this.$el);
    // console.log(this.$expandableList);
    // console.log(this.$expandableList.siblings(".links-list__link"));

    this.$expandableList.siblings(".links-list__link").each((x, y) => {
      $(y).on("click", (event) => {
        $(this.$expandableList[x]).toggleClass("links-list__expandable-list_expanded");
        this.$expandableList[x].focus();
      });
    });
    this.$el.on("focusout", (event) => {
      if (event.relatedTarget !== event.target.previousElementSibling)
        event.target.classList.remove("links-list__expandable-list_expanded");
    });
  }
}
