import $ from "jquery";
// console.log($("dropdown"));
class DropdownRow {
  constructor(row) {
    this.$row = $(row);
    this.$valueText = this.$row.find(".dropdown__text").last();
    this.label = this.$row.find(".dropdown__text").first().text();
    // console.log(this.$valueText);
    // console.log(this.$valueText.text());

    // console.log(this.$valueText);
    this.value = +this.$valueText.text();
    this.returnObject = {
      label: this.label,
      value: this.value,
    };
  }
  Add() {
    this.value += 1;
    this.$valueText.text(this.value);
    console.log(this.value);
    this.returnObject.label = this.label;
    this.returnObject.value = this.value;
    return this.returnObject;
  }
  Remove() {
    if (this.value > 0) {
      this.value -= 1;
      this.$valueText.text(this.value);
      console.log(this.value);
    }
    this.returnObject.label = this.label;
    this.returnObject.value = this.value;
    return this.returnObject;
  }
  Clear() {}
  GetValues() {
    return this.returnObject;
  }
}

export class Dropdown {
  constructor(dropdown) {
    // get our menu and dropdown input
    // create object
    // query selectors for menu and other things
    this.$dropdown = $(dropdown);
    this.$dropdownInput = this.$dropdown.children(".dropdown__input");
    this.$dropdownMenu = this.$dropdown.children(".dropdown__menu");

    // this.$dropdownMenuRow = this.dropdown;

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

    console.log(this.rows);
    //will be called in context of that object
    this.$dropdown.click(this.onClick.bind(this));
    //get list and input of this particular dropdown
    //or no?
    //vars to contain current state
    //on +/- button click update state
    //this.dropdownMenu = dropdown.$("dropdown");
    ///this.dropdownInput =
    this.updatePlaceholder();
  }
  toggle() {
    this.$dropdownInput.toggleClass("dropdown__input_expanded");
    this.$dropdownMenu.toggleClass("dropdown__menu_expanded");
  }
  onClick(event) {
    let $target = $(event.target);
    console.log($target);
    if ($target.hasClass("dropdown__input")) {
      console.log("dropdown toggle");
      this.toggle();
    } else if ($target.hasClass("dropdown__menu-button")) {
      //get index of the row somehow
      //fuck
      //sorry i'm
      // console.log(this.rows[$target.parent().parent().index()].Add());
      if ($target.index() == 2) {
        console.log(this.rows[$target.parent().parent().index()].Add());
        //updatePlaceholder(this.rows[$target.parent().parent().index()].Add());
        // $target.parent().children("p").text += 1;
      } else {
        console.log(this.rows[$target.parent().parent().index()].Remove());
      }
    } else if ($target.parent().hasClass("dropdown__menu-button")) {
      if ($target.text == "+") {
      } else {
      }
    }

    //if target is input toggle exp
  }
  updatePlaceholder(value) {
    let placeholder = "";
    let tmp = [];
    this.rows.forEach((row) => {
      let obj = row.GetValues();
      placeholder += `${obj.value} ${obj.label}, `;
      tmp.push(row.GetValues());
    });
    this.$dropdownInput.prop("placeholder", placeholder);
    console.log(tmp);
  }
}

$(document).ready(() => {
  console.log("ready");
  $(".dropdown").map(function () {
    new Dropdown(this);
  });
});
