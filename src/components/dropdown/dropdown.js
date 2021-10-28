import { Calendar } from "../calendar/calendar";
import anime from "animejs/lib/anime.es.js";

class DropdownRow {
  constructor(row) {
    this.$row = $(row);
    this.$valueText = this.$row.find(".dropdown__text").last();
    this.label = this.$row.find(".dropdown__text").first().text();

    this.value = +this.$valueText.text();
    this.returnObject = {
      label: this.label,
      value: this.value,
    };
    this.$row.trigger("rowUpdate", [this.label, this.value]);
  }
  Add() {
    this.value += 1;
    this.update();
  }
  Remove() {
    if (this.value > 0) {
      this.value -= 1;
    }
    this.update();
  }
  update() {
    this.$valueText.text(this.value);
    this.$row.trigger("rowUpdate", [this.label, this.value]);
  }
  Clear() {}
}

export class DropdownMenu {
  constructor(dropdown) {
    this.$dropdownBlock = $(dropdown);
    this.$dropdownInput = this.$dropdownBlock.children(".dropdown__input");
    this.$dropdownMenu = this.$dropdownBlock.children(".dropdown__menu");

    this.defaultPlaceholder = this.$dropdownInput.prop("placeholder");
    this.dropdownState = {};

    this.$dropdownBlock.on("click", this.onClick.bind(this));
    this.$dropdownBlock.on("rowUpdate", this.updateDropdownText.bind(this));
    this.$dropdownBlock.on("focusout", this.onBlur.bind(this));
    this.heights = [null, null];
    this.rows = this.$dropdownMenu
      .children(".dropdown__row")
      .map((x, y) => {
        return new DropdownRow(y);
      })
      .toArray();

    this.isOpened = false;
    this.easing = "easeOutQuint";
  }

  close() {
    this.isOpened = false;
    let initialHeight = anime.get(this.$dropdownMenu.get(0), "height");
    console.log("close");

    this.$dropdownBlock.removeClass("dropdown_expanded");
    this.$dropdownInput.removeClass("dropdown__input_expanded");
    this.$dropdownMenu.removeClass("dropdown__menu_expanded");

    const timeline = anime.timeline({});
    let finalHeight = "0px";
    timeline.add({
      targets: this.$dropdownMenu.children().toArray(),
      opacity: [1, 0],
      duration: 25,
      easing: "linear",
    });
    timeline.add({
      targets: this.$dropdownMenu.get(0),
      height: [initialHeight, finalHeight],
      padding: ["7px", 0],
      paddingLeft: ["15px", 0],
      borderColor: "rgba(31, 32, 65, 0)",
      duration: 200,
      easing: this.easing,
      delay: 50,
    });
  }
  open() {
    this.isOpened = true;
    console.log("open");

    let initialHeight = anime.get(this.$dropdownMenu.get(0), "height");

    this.$dropdownBlock.addClass("dropdown_expanded");
    this.$dropdownInput.addClass("dropdown__input_expanded");
    this.$dropdownMenu.addClass("dropdown__menu_expanded");
    if (!this.finalHeight) this.finalHeight = anime.get(this.$dropdownMenu.get(0), "height");

    console.log(`init ${initialHeight}`);
    console.log(`target ${this.finalHeight}`);

    const timeline = anime.timeline({});
    timeline.add({
      targets: this.$dropdownMenu.get(0),
      height: [initialHeight, this.finalHeight],
      easing: this.easing,
      padding: [0, "7px"],
      paddingLeft: [0, "15px"],
      borderColor: "rgba(31, 32, 65, 0.5)",
      duration: 100,
    });
    timeline.add(
      {
        targets: this.$dropdownMenu.children().toArray(),
        opacity: [0, 1],
        duration: 200,
        delay: anime.stagger(50, { start: 100 }),
        easing: "easeOutQuart",
      },
      "-=200"
    );
  }

  onClick(event) {
    //process all clicks inside dropdown
    let $target = $(event.target);
    if ($target.hasClass("dropdown__input")) {
      if (this.isOpened) this.close();
      else this.open();
    } else if ($target.hasClass("dropdown__menu-button")) {
      let rowIndex = $target.parents(".dropdown__row").index();
      if ($target.index() == 2) {
        this.rows[rowIndex].Add();
      } else {
        this.rows[rowIndex].Remove();
      }
    } else if ($target.parent().hasClass("dropdown__menu-button")) {
      $target.parent().trigger("click");
    }

    //implement actions for "clear" and "apply" buttons
  }
  onBlur(event) {
    if (!event.relatedTarget || this.isOutsideDropdown(event)) {
      this.close();
    }
  }
  updateDropdownText(event, label, value) {
    //on("event") shold pass data here...
    /*problems: 
    - construct a new string depending on the state object
    how do I process text?
    
    
    */
    if (label) {
      this.dropdownState[label] = value;
      let valueText = "";
      for (let label in this.dropdownState) {
        if (this.dropdownState[label] > 0) {
          valueText += `${label}: ${this.dropdownState[label]} `;
        }
      }
      if (valueText.length > 30) {
        valueText = valueText.slice(0, 30).trim();
        valueText += "...";
      }
      this.$dropdownBlock.trigger({
        type: "valueUpdate",
        value: { ...this.dropdownState },
      });

      if (valueText.length > 0) {
        this.$dropdownInput.prop("value", valueText);
      } else this.$dropdownInput.prop("value", null);
    }
  }
  isOutsideDropdown(event) {
    return event.relatedTarget.closest(".dropdown") !== this.$dropdownBlock[0];
  }
}
