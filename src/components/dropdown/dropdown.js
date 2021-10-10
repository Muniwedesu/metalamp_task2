// import $ from "jquery/dist/min";
require("../calendar/calendar");

// console.log($("dropdown"));
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
  }
  Add() {
    this.value += 1;
    this.$valueText.text(this.value);
    this.$row.trigger("valueChange", [this.label, this.value]);
  }
  Remove() {
    if (this.value > 0) {
      this.value -= 1;
      this.$valueText.text(this.value);
    }
    this.$row.trigger("valueChange", [this.label, this.value]);
  }
  Clear() {}
  GetValues() {
    return this.returnObject;
  }
}
//try to create an event listener from all of the descendants
//attach closing method on the window
//

export class DropdownMenu {
  constructor(dropdown) {
    // get our menu and dropdown input
    // create object
    // query selectors for menu and other things
    this.$dropdown = $(dropdown);
    this.$dropdownInput = this.$dropdown.children(".dropdown__input");
    this.$dropdownMenu = this.$dropdown.children(".dropdown__menu");
    // console.log(this.$dropdownInput.prop("placeholder"));
    this.defaultPlaceholder = this.$dropdownInput.prop("placeholder");
    this.dropdownState = {};
    // this.$dropdownMenuRow = this.dropdown;
    this.dropdownState["взрослые"] = 0;
    this.dropdownState["дети"] = 0;
    this.dropdownState["младенцы"] = 0;
    // console.log(this.$dropdownMenu.children());
    //construct a list of row object,
    // console.log(this.$dropdownMenu.children(".dropdown__row").first());
    // console.log(this.$dropdownMenu.children(".dropdown__row").first());
    //create rows only if dropdown has menu
    this.rows = [];
    this.$rows = this.$dropdownMenu.children();
    if (this.$rows.length > 0) {
      // console.log(this.$rows);
    }

    for (let row of this.$rows) {
      // console.log("row:");
      // console.log(row);

      this.rows.push(new DropdownRow(row));
    }

    // console.log(this.rows);
    //will be called in context of that object
    // this.$dropdown.click(this.onClick.bind(this));
    this.$dropdown.on("click", this.onClick.bind(this));

    this.$dropdown.on("valueChange", this.updatePlaceholder.bind(this));
    //hide menu when clicked outside
    this.$dropdown.on("focusout", this.onBlur.bind(this));
    // this.$dropdown.on("focusin", this.toggle.bind(this));

    // $(document).on("click", this.close.bind(this));
    //get list and input of this particular dropdown
    //or no?
    //vars to contain current state
    //on +/- button click update state
    //this.dropdownMenu = dropdown.$("dropdown");
    ///this.dropdownInput =
    this.updatePlaceholder();
  }
  onBlur(event) {
    console.log(event);
    if (
      event.relatedTarget &&
      (event.relatedTarget.classList.contains("dropdown__menu") ||
        event.relatedTarget.classList.contains("dropdown__menu-button") ||
        event.relatedTarget.classList.contains("dropdown__input") ||
        event.relatedTarget.classList.contains("dropdown"))
    ) {
      console.log("click inside list");
    } else {
      if (this.$dropdownInput.hasClass("dropdown__input_expanded")) this.toggle();
    }
  }
  toggle() {
    console.log("toggle dropdown");
    this.$dropdownInput.toggleClass("dropdown__input_expanded");
    this.$dropdownMenu.toggleClass("dropdown__menu_expanded");
  }
  onClick(event) {
    // console.log("event:");
    // console.log(event);

    let $target = $(event.target);
    // console.log("target");
    // console.log($target);
    if ($target.hasClass("dropdown__input")) {
      // console.log("dropdown toggle");
      this.toggle();
    } else if ($target.hasClass("dropdown__menu-button")) {
      //get index of the row somehow
      // console.log(this.rows[$target.parent().parent().index()].Add());
      if ($target.index() == 2) {
        this.rows[$target.parent().parent().index()].Add();
        // console.log(this.rows[$target.parent().parent().index()].Add());
        //updatePlaceholder(this.rows[$target.parent().parent().index()].Add());
        // $target.parent().children("p").text += 1;
      } else {
        this.rows[$target.parent().parent().index()].Remove();
        // console.log(this.rows[$target.parent().parent().index()].Remove());
      }
      // this.updatePlaceholder();
    } else if ($target.parent().hasClass("dropdown__menu-button")) {
      // console.log("click on label:");
      $target.parent().trigger("click");
    }

    //process events for "clear" and "apply" buttons
  }
  updatePlaceholder(event, label, value) {
    //on("event") shold pass data here...
    /*problems: 
    - construct a new string depending on the state object
    
    
    
    */
    this.dropdownState[label] = value;
    //пройтись по всем свойствам
    //записать в строку все, что не равны нулю
    //??
    //Запятые?
    let valueText = "";
    for (let label in this.dropdownState) {
      if (this.dropdownState[label] > 0) {
        valueText += `${label}: ${this.dropdownState[label]} `;
      }
    }
    // console.log(this.dropdownState);
    this.$dropdown.trigger({
      type: "valueUpdate",
      value: { ...this.dropdownState },
    });
    // let tmp = [];
    // this.rows.forEach((row) => {
    //   let obj = row.GetValues();
    //   if (obj.value > 0) valueText += `${obj.value} ${obj.label}, `;
    //   tmp.push(row.GetValues());
    // });
    if (valueText.length > 0) {
      this.$dropdownInput.prop("value", valueText);
    } else this.$dropdownInput.prop("value", null);

    // console.log(tmp);
  }
}

$(document).ready(() => {
  $(".dropdown").map(function () {
    // console.log(this);
    // if (!$(this).children("div").hasClass("dropdown__date")) new DropdownMenu(this);
  });
});
