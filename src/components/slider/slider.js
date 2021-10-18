import noUiSlider from "nouislider";
import cssClasses from "nouislider";
import "nouislider/dist/nouislider.css";
import "./slider.scss";
export class Slider {
  /**
   *
   * @param {HTMLElement} slider
   */
  constructor(slider) {
    console.log("slider ctor");
    console.log(slider);
    this.$slider = slider;
    this.$sliderContainer = slider.querySelector("#range-slider");
    this.minValueTooltip = slider.querySelector(".slider__tooltip_min");
    this.maxValueTooltip = slider.querySelector(".slider__tooltip_max");
    noUiSlider.cssClasses.handle += " slider__handle";
    this.slider = noUiSlider.create(this.$sliderContainer, {
      range: {
        min: 3000,
        max: 20000,
      },
      // step: 50,
      start: [3000, 20000],
      // margin: 30,
      // limit: 70,
      connect: true,
      direction: "ltr",
      orientation: "horizontal",
      behaviour: "tap-drag",
      // tooltips: true,
      // format
      // pips: {
      //   mode: "steps",
      //   stepped: true,
      //   density: 4,
      // },
    });
    this.slider.on(
      "update",
      function (values, handle) {
        console.log("start");
        let value = String(Math.round(values[handle]));
        // value = value.split("").reverse().join("");
        value = value.replace(/(\d{3})/g, " $1");
        // value = value.split("").reverse().join("");
        // console.log("end");
        if (handle) {
          this.maxValueTooltip.textContent = `${value}Р`;
        } else {
          this.minValueTooltip.textContent = `${value}Р`;
        }
      }.bind(this)
    );
  }
}

// handleLower: "handle-lower",
// handleUpper: "handle-upper",
// touchArea: "touch-area",
// vertical: "vertical",
// background: "background",
// draggable: "draggable",
// drag: "state-drag",
// tap: "state-tap",
// active: "active",
// tooltip: "tooltip",
// pips: "pips",
// pipsHorizontal: "pips-horizontal",
// pipsVertical: "pips-vertical",
// marker: "marker",
// markerHorizontal: "marker-horizontal",
// markerVertical: "marker-vertical",
// markerNormal: "marker-normal",
// markerLarge: "marker-large",
// markerSub: "marker-sub",
// value: "value",
// valueHorizontal: "value-horizontal",
// valueVertical: "value-vertical",
// valueNormal: "value-normal",
// valueLarge: "value-large",
// valueSub: "value-sub"
