import { Calendar } from "../calendar/calendar";
import { DropdownMenu } from "../dropdown/dropdown";

//for each input field add an update event
class Form {
  constructor(form) {
    this.$form = $(form);
    this.inputs = this.$form.find(".dropdown");
    // this.submitButton = this.$form.find(".");
    this.formData = {};
    this.$form.on("valueUpdate", this.onValueUpdate.bind(this));
    for (let input of this.inputs) {
      // console.log($(input).on("valueUpdate", this.onValueUpdate.bind(this)));
      // new DropdownMenu(input);
      // new Calendar(input);
      if ($(input).children(".dropdown__date").length > 0) {
        new Calendar(input);
      } else {
        new DropdownMenu(input);
      }
    }
    // this.form = form;??
    // this.inputs = inputs;
    // just pass input and value in the event
    //on event write data here or smth
    //also I should proccess form submission here probably
  }
  onValueUpdate(event) {
    //receives {guests : {adults: 0, children: 0, babies: 0}}
    // {dates: {arrival: date, departure: date}}
    console.log(event);
  }
}
$(".card__form").map(function () {
  console.log(this);
  new Form(this);
});
