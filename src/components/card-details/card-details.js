import { Form } from "../card/card";
import { SearchForm } from "../card-search/card-search";

const MS_TO_DAYS = 1 / (1000 * 3600 * 24);
export class DetailsForm extends SearchForm {
  constructor({ form, roomNumber, roomPrice, $summaryList }) {
    super({ form: form });
    //get room number maybe?
    //get price per day
    console.log("details-form ctor");
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
    console.log(this);
  }
  onValueUpdate(event) {
    if (event.value.date) {
      this.handleStayingDateUpdate(event);
    } else {
      this.formData = Object.assign(this.formData, event.value);
    }
    this.updateSummaryList();
  }
  //-------------------------------------------------------------------------
  //utility methods
  //-------------------------------------------------------------------------
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
