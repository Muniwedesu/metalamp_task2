import { Card } from "../../components/card/card";
import { Grid } from "../utility";

//modify these
const DETAILS_CONTENT_GRID_BREAKPOINTS = { min: 647, max: 900 };
const GRID_CONTAINER_TAG = "details__content";
const DETAILS_PHOTOS_GRID_BREAKPOINTS = [];

//not these
const GRID_CONTAINER = document.querySelector(`.${GRID_CONTAINER_TAG}`);
const $GRID_CONTAINER = $(`.${GRID_CONTAINER_TAG}`);

const GRID_SIZES = ["small", "medium", "large"].map((x) => {
  return `${GRID_CONTAINER_TAG}_grid_${x}`;
});

export class DetailsPage {
  constructor() {
    const grid = new Grid(GRID_CONTAINER, DETAILS_CONTENT_GRID_BREAKPOINTS, GRID_SIZES);
    // const photoGrid = new Grid();
    //receives card(s)
    //comments block
    //manages grid
  }
}
