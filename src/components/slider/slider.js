import noUiSlider from "nouislider";
// import "nouislider/dist/nouislider.css";
export class Slider {
  /**
   *
   * @param {HTMLElement} slider
   */
  constructor(slider) {
    console.log("slider ctor");
    console.log(slider);
    this.slider = slider;
    noUiSlider.create(this.slider, {
      range: {
        min: 120,
        max: 250,
      },
      step: 30,
      start: [150, 180],
      margin: 30,
      // limit: 70,
      connect: true,
      direction: "ltr",
      orientation: "horizontal",
      behaviour: "tap-drag",
      tooltips: true,
      // format
      pips: {
        mode: "steps",
        stepped: true,
        density: 4,
      },
      // cssPrefix: "noUi-",
      // cssClasses: {
      //   target: "target",
      // },
    });
  }
}
