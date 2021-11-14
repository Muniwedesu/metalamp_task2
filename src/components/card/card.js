import { Calendar } from "../calendar/calendar";
import { DropdownMenu } from "../dropdown/dropdown";
import { Button } from "../button/button";
//for each input field add an update event
//receives .card__form
export class Form {
  constructor({ form }) {
    // console.log("base ctor");
    //this class only creates dropdowns
    //and things which are common for each card
    // console.log(form);
    this.parent = $(form);
    this.card = this.parent[0];
    // console.log("card");
    // console.log(this.card);
    // console.log("card");
    this.form = this.card.children[0];
    this.dropdowns = this.parent.find(".dropdown");
    // this.submitButton = this.$form.find(".");
    this.formData = {};
    this.dateDropdowns = [];
    this.dropdownMenus = [];
    this.buttons = [...this.parent.find(".button").toArray()];
    //
    this.buttons.forEach((button) => {
      new Button(button);
    });

    //for each check if it has dropdown__date or dropdown__input
    //if it has two date dropdowns, pass options for the second one?

    //actually it's probably better to create input classes on the actual card objects
    //because form fields are known only at that point//

    let formFields = this.parent.find(".form__field").each((x, element) => {
      // there's
      // dates pair
      // one date
      // one dropdown menu
      // one input.
      let dropdowns = $(element).find(".dropdown");
      // console.log(dropdowns.children(".dropdown__date"));
      if (dropdowns.length > 1 && dropdowns.children(".dropdown__date").length) {
        this.dateDropdowns.push(new Calendar(dropdowns[0]));
        this.dateDropdowns.push(new Calendar(dropdowns[1], { position: "bottom right" }));
        // console.log("date pair");
        // console.log(dropdowns);
        //create 2 calendars
      } else if (dropdowns.length === 1) {
        if (dropdowns.children().hasClass("dropdown__date")) {
          this.dateDropdowns.push(new Calendar(dropdowns[0]));
          // console.log(dropdowns);
          // console.log("one date");
        } else if (dropdowns.children().hasClass("dropdown__menu")) {
          this.dropdownMenus.push(new DropdownMenu(dropdowns[0]));
          //create one calendar
          //determine what elements
          // console.log("menu");
        }
      }
    });
    // console.log(formFields);

    // this.form = form;??
    // this.inputs = inputs;
    // just pass input and value in the event
    //on event write data here or smth
    //also I should proccess form submission here probably
    this.parent.on("valueUpdate", this.onValueUpdate.bind(this));
  }
  onValueUpdate(event) {
    //receives {guests : {adults: 0, children: 0, babies: 0}}
    // {dates: {arrival: date, departure: date}}
    // console.log(event);
    // console.log(event.target.id.split(/[\w]*-/).at(-1)); (logs the last part of the id)
    //
    //process this only after user interaction:
    //either disable default values or ...
    //we have only arrival and departure.
  }
}
// $(".card__form").map(function () {
//   console.log(this);
//   new Form(this);
// });
