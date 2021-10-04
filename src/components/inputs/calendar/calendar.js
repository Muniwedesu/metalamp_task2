require("jquery");
// require("jquery-ui/ui/widgets/datepicker");
require("air-datepicker");
import "./calendar.scss";

$(document).ready(() => {
  $("#calendar").datepicker({
    language: "en",
    navTitles: { days: "MM yyyy", years: "MM yyyy", months: "MM yyyy" },
    nextHtml: "arrow_forward",
    prevHtml: "arrow_back",
    clearButton: true,
    view: "days",
    minView: "days",
    // position: "left bottom",
    offset: -150,
    dateFormat: "dd.mm.yyyy",
    multipleDates: 2,
    multipleDatesSeparator: " - ",
    dateFormat: "dd M",
    range: true,
  });
  //come up with a way of determining which type of selection is used
  //i.e. range or single value, style it accordingly
  console.log($(".datepicker--buttons"));
  let $buttons = $(".datepicker--buttons");
  //add two buttons here.
  //how to
  $(".datepicker--button").remove();
  $(".button").addClass("datepicker--button");
  $buttons.append($(".button"));
  $($(".button")[0]).attr("data-action", "clear");
  $($(".button")[1]).attr("data-action", "apply");
  console.log($($(".button")[0]));
  console.log($($(".button")[1]));
  $(".calendar-input").append($(".datepickers-container"));
  //on "apply" just close it?
  //or will it be used only on filter?
  // $(".datepicker--button").addClass("button button_text");
  console.log($(".datepicker--button"));
});
