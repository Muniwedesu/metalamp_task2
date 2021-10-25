// require("jquery");
import AirDatepicker from "air-datepicker";

const clearButton = {
  tagName: "button",
  className: "button button_text calendar-button",
  content(dp) {
    return "Очистить";
  },
  onClick(dp) {
    dp.clear();
    console.log(dp.$el);
    dp.$el.value = dp.$el.attributes["placeholder"].value;
    console.log();
  },
};

const applyButton = {
  tagName: "button",
  className: "button button_text calendar-button",
  content: "Применить",
  onClick(dp) {
    dp.hide();
  },
};
function getAttributesForCalendarType(type = "date-single") {
  switch (type) {
    case "date-range":
      return {
        multipleDates: 2,
        multipleDatesSeparator: " - ",
        dateFormat: "dd MMM",
        range: true,
      };
    default:
      return {
        dateFormat: "dd.MM.yyyy",
        // selectedDates: [new Date()],
      };
  }
}

const defaultConfig = {
  inline: false,
  language: "en",
  navTitles: { days: "MMMM yyyy", years: "MMMM yyyy", months: "MMMM yyyy" },
  nextHtml: "arrow_forward",
  prevHtml: "arrow_back",
  clearButton: true,
  view: "days",
  minView: "days",
  buttons: [clearButton, applyButton],
};
export class Calendar {
  constructor(dropdown, options = {}) {
    //here should be passed each dropdown
    this.$dropdown = $(dropdown).find(".dropdown__date");

    let id = $(this.$dropdown).contents("input").attr("id");
    //come up with better names
    let typeValue = $(this.$dropdown).contents("input").attr("data-type");
    let type = getAttributesForCalendarType(typeValue);
    this.dp = new AirDatepicker(`#${id}`, {
      ...defaultConfig,
      ...type,
      ...options,
      onSelect({ date, datepicker }) {
        // console.log(datepicker);
        // console.log((datepicker.$el.value = new Intl.DateTimeFormat("ru-RU").format(date)));
        $(datepicker.$el).trigger({ type: "valueUpdate", value: { date: date } });
      },
    });
    // this.$dropdown.on("click", this.toggleDropdown.bind(this));
    this.initializeDatepicker();
  }
  // toggleDropdown(event) {
  //   //if it's visible - close it
  //   //but how do I get its state if the click event fires after showing dp?
  //   //if input is focused and calendar is shown?
  //   // console.log(event);
  //   console.log(document.activeElement.tagName === "INPUT");
  //   console.log(this.dp.visible);
  //   // if (this.dp.visible) this.dp.hide();
  //   // else this.dp.show();
  // }
  initializeDatepicker() {
    this.dp.hide();
    //this is for hiding calendar on first render (it appears at the bottom of the page otherwise)
    $(this.dp.$datepicker).css("top", "-10000px");
    $(".air-datepicker-button").children().addClass("controls-label button__label");
  }
}
/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/

$(document).ready(() => {
  //this code is just for rendering calendar on the UI-kit page
  //I probably need to move it somewhere else.
  var clearButton = {
    tagName: "button",
    className: "button button_text calendar-button",
    content(dp) {
      return "Очистить";
    },
    onClick(dp) {
      return;
    },
  };
  var applyButton = {
    tagName: "button",
    className: "button button_text calendar-button",
    content: "Применить",
    onClick(dp) {
      return;
    },
  };
  let exampleDP = new AirDatepicker(`#example`, {
    // container: ".dropdown__date",
    inline: true,
    language: "en",
    navTitles: { days: "MMMM yyyy", years: "MMMM yyyy", months: "MMMM yyyy" },
    nextHtml: "arrow_forward",
    prevHtml: "arrow_back",
    clearButton: true,
    view: "days",
    minView: "days",
    // position: "left bottom",
    // offset: -150,
    dateFormat: "dd.MMM.yyyy",
    multipleDates: 2,
    multipleDatesSeparator: " - ",
    dateFormat: "dd MMM",
    range: true,
    buttons: [clearButton, applyButton],
  });
});
