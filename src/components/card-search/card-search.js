import { Form } from "../card/card";

const MS_TO_DAYS = 1 / (1000 * 3600 * 24);
export class SearchForm extends Form {
  constructor({ form }) {
    super({ form: form });
    console.log("search-form ctor");
  }
  onValueUpdate(event) {
    if (event.value.date) {
      this.handleStayingDateUpdate(event);
    } else {
      this.formData = Object.assign(this.formData, event.value);
    }
  }
  //-------------------------------------------------------------------------
  //utility methods
  //-------------------------------------------------------------------------
  handleStayingDateUpdate(event) {
    // console.log("EVENT: dropdown valueUpdate");
    if (event.target.id.split(/[\w]*-/).at(-1) === "arrival") {
      // console.log("EVENT: arrival handler");

      //fix time difference problems
      // console.log(this.dateDropdowns[0].dp);
      let date = event.value.date;
      let tomorrow = new Date().setDate(date.getDate() + 1);
      let departureDP = this.dateDropdowns[1].dp;
      departureDP.update({ minDate: tomorrow });
      // console.log(this.dateDropdowns[1].dp.selectedDates);
      if ((departureDP.selectedDates[0] - date) * MS_TO_DAYS < 1) {
        //clean this up
        departureDP.clear();
        $(departureDP.$datepicker).find(".-selected-").removeClass("-selected-");
        departureDP.selectDate(tomorrow);
      }
      this.formData.arrivalDate = event.value.date;
      // console.log(this.dateDropdowns[1].dp);
    } else {
      // console.log(this.formData.departureDate);
      if (this.formData.departureDate !== event.value.date) {
        this.formData.departureDate = event.value.date;
        console.log("EVENT: departure handler");
      }
    }
  }
}
