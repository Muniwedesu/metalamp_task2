import { Rates } from "../rates/rates";

export class CardRoom {
  constructor({ card }) {
    this.$card = $(card);
    this.$rates = this.$card.find(".rates");
    this.$rates.each((x, elem) => {
      new Rates(elem);
    });
  }
}
