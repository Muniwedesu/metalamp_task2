import { Calendar } from "../calendar/calendar";
import { DropdownMenu } from "../dropdown/dropdown";

//for each input field add an update event
//receives .card__form
export class Form {
  constructor({ form }) {
    console.log(form);
    this.$form = $(form);
    this.dropdowns = this.$form.find(".dropdown");
    // this.submitButton = this.$form.find(".");
    this.formData = {};
    this.$form.on("valueUpdate", this.onValueUpdate.bind(this));
    this.dateDropdowns = [];
    this.dropdownMenus = [];
    //actually it's probably better to create input classes on the actual card objects
    //because form fields are known only at that point/
    for (let dropdown of this.dropdowns) {
      // console.log($(input).on("valueUpdate", this.onValueUpdate.bind(this)));
      // new DropdownMenu(input);
      // new Calendar(input);
      //why am I checking length?
      console.log("---");
      console.log(dropdown);
      console.log("---");
      if ($(dropdown).children(".dropdown__date").length > 0) {
        this.dateDropdowns.push(new Calendar(dropdown));
      } else {
        this.dropdownMenus.push(new DropdownMenu(dropdown));
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
    // console.log(event);

    // console.log(event.target.id.split(/[\w]*-/).at(-1)); (logs the last part of the id)
    //
    //process this only after user interaction
    console.log("EVENT: dropdown valueUpdate");
    if (event.target.id.split(/[\w]*-/).at(-1) === "arrival") {
      console.log("EVENT: arrival handler");
      // console.log(this.dateDropdowns[0].dp);
      let date = event.value.date;
      let tomorrow = new Date().setDate(date.getDate() + 1);
      this.dateDropdowns[1].dp.update({
        minDate: tomorrow,
      });
      // console.log(this.dateDropdowns[1].dp.selectedDates);
      if (date > this.dateDropdowns[1].dp.selectedDates[0]) {
        //clean this up
        this.dateDropdowns[1].dp.clear();
        $(this.dateDropdowns[1].dp.$datepicker).find(".-selected-").removeClass("-selected-");
        this.dateDropdowns[1].dp.selectDate(tomorrow);
      }
      this.formData.arrivalDate = event.value.date;
      // console.log(this.dateDropdowns[1].dp);
    } else {
      this.formData.departureDate = event.value.date;
      console.log("EVENT: departure handler");
    }
    console.log(this.formData);
    //we have only arrival and departure.
  }
}
// $(".card__form").map(function () {
//   console.log(this);
//   new Form(this);
// });
