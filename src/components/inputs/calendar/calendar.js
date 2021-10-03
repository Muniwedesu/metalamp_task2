require("jquery");
// require("jquery-ui/ui/widgets/datepicker");
require("air-datepicker");
import "./calendar.scss";

$(document).ready(() => {
  $("#calendar").datepicker({
    language: "en",
    multipleDates: 2,
    navTitles: { days: "MM yyyy", years: "MM yyyy", months: "MM yyyy" },
    nextHtml: "arrow_forward",
    prevHtml: "arrow_back",
    clearButton: true,
    view: "days",
    minView: "days",
    position: "top left",
    offset: -208,
    range: true,
  });
});
