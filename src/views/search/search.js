import { Calendar } from "../../components/calendar/calendar";
import { CardRoom } from "../../components/card-room/card-room";
import { CheckboxGroup } from "../../components/checkbox/checkboxGroup";
import { DropdownMenu } from "../../components/dropdown/dropdown";
import { Grid } from "../utility";
import { Slider } from "../../components/slider/slider";
import { FiltersMenu } from "./__filters/__filters";

const SEARCH_ROOMS_GRID_BREAKPOINTS = { min: 472, max: 714 };
const GRID_CONTAINER_TAG = "search__rooms";
const GRID_CONTAINER = document.querySelector(".search__rooms");
const $GRID_CONTAINER = $(".search__rooms");
const GRID_SIZES = ["small", "medium", "large"].map((x) => {
  return `${GRID_CONTAINER_TAG}_grid_${x}`;
});

export class SearchPage {
  constructor() {
    //detect all of the cards
    //and other interactive elemtns
    // filters menu
    // link dropdowns
    //link calendar range
    //make menu with additional things
    console.log("search ctor");
    const grid = new Grid(GRID_CONTAINER, {
      breakpoints: SEARCH_ROOMS_GRID_BREAKPOINTS,
      sizes: GRID_SIZES,
    });

    this.roomCards = $(".room-card")
      .map((x, elem) => {
        new CardRoom({ card: elem });
      })
      .toArray();
    this.filters = new FiltersMenu($(".search__filters"));
  }
}
const searchPage = new SearchPage();
