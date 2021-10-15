require("../calendar/calendar");

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
    this.$dropdown = $(dropdown);
    this.$dropdownInput = this.$dropdown.children(".dropdown__input");
    this.$dropdownMenu = this.$dropdown.children(".dropdown__menu");
    this.defaultPlaceholder = this.$dropdownInput.prop("placeholder");
    this.dropdownState = {};

    this.$dropdown.on("click", this.onClick.bind(this));
    this.$dropdown.on("rowUpdate", this.updateDropdownText.bind(this));
    this.$dropdown.on("focusout", this.onBlur.bind(this));
    this.rows = this.$dropdownMenu
      .children(".dropdown__row")
      .map((x, y) => {
        return new DropdownRow(y);
      })
      .toArray();
  }
  close() {
    this.$dropdownInput.removeClass("dropdown__input_expanded");
    this.$dropdownMenu.removeClass("dropdown__menu_expanded");
  }
  toggle() {
    this.$dropdown.toggleClass("dropdown_expanded");
    this.$dropdownInput.toggleClass("dropdown__input_expanded");
    this.$dropdownMenu.toggleClass("dropdown__menu_expanded");
  }
  onClick(event) {
    let $target = $(event.target);
    if ($target.hasClass("dropdown__input")) {
      this.toggle();
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
      this.$dropdown.trigger({
        type: "valueUpdate",
        value: { ...this.dropdownState },
      });

      if (valueText.length > 0) {
        this.$dropdownInput.prop("value", valueText);
      } else this.$dropdownInput.prop("value", null);
    }
  }
  isOutsideDropdown(event) {
    return event.relatedTarget.closest(".dropdown") !== this.$dropdown[0];
  }
}
