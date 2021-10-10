import { Grid } from "../utility";

const SEARCH_ROOMS_GRID_BREAKPOINTS = { min: 472, max: 714 };
const GRID_CONTAINER_TAG = "search__rooms";
const GRID_CONTAINER = document.querySelector(".search__rooms");
const $GRID_CONTAINER = $(".search__rooms");
const GRID_SIZES = ["small", "medium", "large"].map((x) => {
  return `${GRID_CONTAINER_TAG}_grid_${x}`;
});

export class SearchPage {
  constructor() {
    const grid = new Grid(GRID_CONTAINER, SEARCH_ROOMS_GRID_BREAKPOINTS, GRID_SIZES);
  }
}
