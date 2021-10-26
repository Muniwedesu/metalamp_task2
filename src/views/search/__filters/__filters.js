import { Calendar } from "../../../components/calendar/calendar";

import { CheckboxGroup } from "../../../components/checkbox/checkboxGroup";
import { DropdownMenu } from "../../../components/dropdown/dropdown";

import { Slider } from "../../../components/slider/slider";

export class FiltersMenu {
  constructor(filters) {
    this.$filters = $(filters);

    this.calendar = new Calendar($(".dropdown__date").parents(".dropdown"));

    this.dropdowns = $(".dropdown")
      .contents(".dropdown__input")
      .each((x, y) => {
        new DropdownMenu($(y).parents(".dropdown"));
      });
    this.$checkboxGroup = $(".checkbox-group_expandable");
    this.checkboxGroup = new CheckboxGroup(this.$checkboxGroup);

    this.$slider = document.querySelector(".slider");

    this.slider = new Slider(this.$slider);

    this.$filtersToggle = this.$filters.find(".search__filters-toggle");
    this.$filtersContainer = this.$filters.find(".search__filters-container");
    this.$filtersToggleLabel = this.$filters.find(".search__filters-toggle-label");
    this.$filtersToggle.on("change", this.toggleMenu.bind(this));
  }
  toggleMenu() {
    this.$filters.toggleClass("search__filters_open");
    this.$filtersToggleLabel.toggleClass("search__filters-toggle-label_open");
    this.$filtersContainer.toggleClass("search__filters-container_visible");

    setTimeout(this.changeLabel.bind(this), 200);
  }
  changeLabel() {
    this.$filtersToggleLabel.text(
      this.$filtersToggleLabel.text() === "filter_list" ? "filter_list_off" : "filter_list"
    );
  }
}
