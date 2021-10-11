import { Form } from "../card/card";
const MS_TO_DAYS = 1 / (1000 * 3600 * 24);
export class DetailsForm extends Form {
  constructor({ form, roomNumber, roomPrice, $summaryList }) {
    //get room number maybe?
    //get price per day
    super({ form: form });
    this.pricePerDay = this.$form.find(".room-info__price").text().split("₽ ")[0];
    // console.log(this.pricePerDay);
    this.$summaryList = $(".summary-list");
    // console.log(this.$summaryList);
    this.$summaryItemsValue = this.$summaryList
      .children(".summary-list__item")
      .children(".summary-list__value");
    this.$summaryTotalValue = this.$summaryList
      .children(".summary-list__total")
      .children(".summary-list__total-value");
    // console.log(this.$summaryTotal);
    this.$priceSummary = this.$summaryList.children(".summary-list__price");
    // console.log(this.$priceSummary);
    this.$priceSummaryKey = this.$priceSummary.children(".summary-list__key");
    // console.log(this.$priceSummaryKeyContainer);
    this.$priceSummaryValue = this.$priceSummary.children(".summary-list__value");
    this.updateSummaryList();
  }
  onValueUpdate(event) {
    if (event.value.date) {
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
    } else {
      this.formData = Object.assign(this.formData, event.value);
    }

    // console.log(this.formData);
    this.updateSummaryList();
  }

  updateSummaryList() {
    // console.log(this.formData.departureDate);
    let daySpan = 0;
    if (this.formData.departureDate) {
      daySpan = this.getDaySpan();
      this.setListValues(daySpan);
      return;
    }
    this.setListValues(daySpan);
  }
  //-------------------------------------------------------------------------
  //utility methods
  //-------------------------------------------------------------------------
  getDaySpan(start = this.formData.arrivalDate, end = this.formData.departureDate) {
    let startUTC = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    let endUTC = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
    // console.log(
    //   `${endUTC * MS_TO_DAYS} - ${startUTC * MS_TO_DAYS} = ${(endUTC - startUTC) * MS_TO_DAYS}`
    // );
    return (endUTC - startUTC) * MS_TO_DAYS;
  }
  calculatePrice(daySpan) {
    return {
      string: `${this.pricePerDay} x ${daySpan}`,
      value: `${this.pricePerDay * daySpan}₽`,
    };
  }
  setListValues(daySpan) {
    this.$priceSummaryKey.text(this.calculatePrice(daySpan).string);
    this.$priceSummaryValue.text(this.calculatePrice(daySpan).value);
    let totalPrice = 0;
    this.$summaryItemsValue.map((x, y, z) => {
      totalPrice += +$(y).text().split("₽")[0];
    });
    this.$summaryTotalValue.text(totalPrice);
  }
}

// let arrivalDate = Date.UTC(
//   this.formData.arrivalDate.getFullYear(),
//   this.formData.arrivalDate.getMonth(),
//   this.formData.arrivalDate.getDate()
// );
// let departureDate = Date.UTC(
//   this.formData.departureDate.getFullYear(),
//   this.formData.departureDate.getMonth(),
//   this.formData.departureDate.getDate()
// );
// console.log(
//   `${departureDate * MS_TO_DAYS} - ${arrivalDate * MS_TO_DAYS} = ${
//     (departureDate - arrivalDate) * MS_TO_DAYS
//   }`
// );
