require("jquery");
// require("jquery-ui/ui/widgets/datepicker");
// require("air-datepicker");
import AirDatepicker from "air-datepicker";
import "./calendar.scss";

$(document).ready(() => {
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

  $(".dropdown__date").map(function () {
    console.log($(this));

    let id = $(this).contents("input").attr("id");
    //come up with better names
    let typeValue = $(this).contents("input").attr("data-type");
    let type = {};
    if (typeValue === "date-range") {
      type = {
        multipleDates: 2,
        multipleDatesSeparator: " - ",
        dateFormat: "dd MMM",
        range: true,
      };
    } else {
      type = {
        dateFormat: "dd.MM.yyyy",
        selectedDates: [new Date()],
      };
    }
    let dp = new AirDatepicker(`#${id}`, {
      // container: ".dropdown__date",
      inline: false,
      language: "en",
      navTitles: { days: "MMMM yyyy", years: "MMMM yyyy", months: "MMMM yyyy" },
      nextHtml: "arrow_forward",
      prevHtml: "arrow_back",
      clearButton: true,
      view: "days",
      minView: "days",
      // position: "left bottom",
      // offset: -150,
      buttons: [clearButton, applyButton],
      ...type,
    });
  });

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
  // `<button class="button button_text air-datepicker-button" data-action="clear"> <span class="controls-label button__label">очистить</span></button>`;
  //select span inside button, add to it controls-label button__label
  $(".air-datepicker-button").children().addClass("controls-label button__label");

  //come up with a way of determining which type of selection is used
  //i.e. range or single value, style it accordingly

  // console.log($(".air-datepicker-buttons"));
  // let $buttons = $(".air-datepicker-buttons");

  //add two buttons here.
  //how to

  // $(".air-datepicker-button").remove();
  // $(".calendar-button").addClass("air-datepicker-button");

  // $buttons.append($(".calendar-button"));
  // $($(".calendar-button")[0]).attr("data-action", "clear");
  // $($(".calendar-button")[1]).attr("data-action", "apply");

  // console.log($($(".button")[0]));
  // console.log($($(".button")[1]));

  // $(".calendar-input").append($(".datepickers-container"));

  //on "apply" just close it?
  //or will it be used only on filter?
  // $(".datepicker--button").addClass("button button_text");

  //need to disable style rules changing

  // console.log($(datepicker));

  // console.log($(".datepicker--button"));
});
