export class LinksList {
  constructor({ list }) {
    this.$el = $(list);
    this.$items = this.$el.find(".links-list__item");
    if (window.innerWidth < 1024) {
      this.$el.removeClass("links-list_inline");
      this.$items.removeClass("links-list__item_inline");
    }
    window.addEventListener("resize", (event) => {
      console.log(event.target.innerWidth);
      if (event.target.innerWidth < 1024) {
        this.$el.removeClass("links-list_inline");
        // this.$el.addClass("links-list_vertical");
        this.$items.removeClass("links-list__item_inline");
      } else {
        // this.$el.removeClass("links-list_vertical");
        this.$el.addClass("links-list_inline");
        this.$items.addClass("links-list__item_inline");
      }
    });
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
