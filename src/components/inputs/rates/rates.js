require("jquery");
export class Rates {
  constructor($rates) {
    //it has own container. how to determine which star was clicked?
    console.log("created class from");
    console.log($rates);
    console.log($rates.children());
    // search for input, get the value, initialize the thing
    // don't forget to update value etc
    this.$rates = $rates;
    this.$rates.on("click", this.onClick.bind(this));
    this.$rates.on("mouseover", this.onEnter.bind(this));
    this.$rates.on("mouseout", this.onLeave.bind(this));
    this.$rates.on("keydown", this.onClick.bind(this));
    this.$rates.on("focusin", this.onEnter.bind(this));
    this.$rates.on("focusout", this.onLeave.bind(this));

    this.$stars = this.$rates.children();

    this.maxValue = this.$rates.children().length;
    console.log(this.$stars.closest(".rates__star_selected"));

    this.initialValue = this.$stars.closest(".rates__star_selected").attr("data-value");
    //Maybe I don't need to store this
    this.previousValue = this.initialValue;
    this.currentValue = this.initialValue;

    console.log("initial = " + this.initialValue);
  }
  onLeave(event) {
    let clickedStarIndex = $(event.target).attr("data-value");
    //values are [1...5]
    for (let i = 0; i < this.maxValue; ++i) {
      if (i < clickedStarIndex) {
        $(this.$stars[i]).removeClass("rates__star_hovered");
      }
    }
  }
  onEnter(event) {
    let clickedStarIndex = $(event.target).attr("data-value");
    for (let i = 0; i < this.maxValue; ++i) {
      if (i < clickedStarIndex) {
        $(this.$stars[i]).addClass("rates__star_hovered");
      }
    }
  }
  onClick(event) {
    if (event.code === "Space" || event.type === "click") {
      // console.log(event);
      let clickedStarIndex = $(event.target).attr("data-value");
      if (clickedStarIndex !== this.currentValue) {
        $(this.$stars[this.previousValue - 1]).removeClass("rates__star_selected");
        this.previousValue = clickedStarIndex;
        this.currentValue = clickedStarIndex;
        $(this.$stars[clickedStarIndex - 1]).addClass("rates__star_selected");
        // console.log(clickedStarIndex);
        for (let i = 0; i < this.maxValue; ++i) {
          if (i < clickedStarIndex) {
            // console.log(`sel ${i}`);
            $(this.$stars[i]).text("star");
          } else {
            // console.log(`rem ${i}`);
            $(this.$stars[i]).text("star_border");
          }
        }
      }
    }
  }
}
$(document).ready(() => {
  console.log($(".rates__star"));
  $(".rates").map(function () {
    new Rates($(this));
  });
});
