import { DetailsForm } from "../../components/card-details/card-details";
import { Grid } from "../utility";
import { DoughnutChart } from "../../components/doughnut/doughnut";

//modify these
const DETAILS_CONTENT_GRID_BREAKPOINTS = { min: 647, max: 900 };
const GRID_CONTAINER_TAG = "details__content";

const PHOTO_GRID_BREAKPOINTS = { min: 768, max: 768 };
const PHOTO_GRID_CONTAINER_TAG = "details__photos";
//not these
const GRID_CONTAINER = document.querySelector(`.${GRID_CONTAINER_TAG}`);
const PHOTO_GRID_CONTAINER = document.querySelector(`.${PHOTO_GRID_CONTAINER_TAG}`);

const GRID_SIZES = ["small", "medium", "large"].map((x) => {
  return `${GRID_CONTAINER_TAG}_grid_${x}`;
});

const PHOTO_GRID_SIZES = ["small", "medium", "large"].map((x) => {
  return `${PHOTO_GRID_CONTAINER_TAG}_grid_${x}`;
});
export class DetailsPage {
  constructor() {
    this.grid = new Grid(GRID_CONTAINER, {
      breakpoints: DETAILS_CONTENT_GRID_BREAKPOINTS,
      sizes: GRID_SIZES,
    });
    // photo-grid animations
    this.photos = new Grid(PHOTO_GRID_CONTAINER, {
      breakpoints: PHOTO_GRID_BREAKPOINTS,
      sizes: PHOTO_GRID_SIZES,
      options: {
        stagger: 0,
        duration: 250,
        easing: "easeIn",
      },
    });
    //
    this.form = $(".card__form")[0];
    // console.log(this.form);
    this.$card = new DetailsForm({ form: this.form });
    //
    this.$photoGrid = $(PHOTO_GRID_CONTAINER);
    this.$photoGrid.on("click", this.onSelectPhoto.bind(this));
    this.$gridWraps = $(".details__photo-wrap");
    // console.log(this.$gridWraps);
    //receives card(s)
    //comments block
    //manages grid
    const elem = $(".doughnut");
    //come up with a better solution
    new DoughnutChart(elem, {
      title: "reviews",
      labels: ["Великолепно", "Хорошо", "Удовлетворительно", "Разочарован"].reverse(),
      values: [130, 65, 65, 0].reverse(),
    });
  }
  onSelectPhoto(event) {
    if (event.target.tagName === "IMG") {
      this.$gridWraps.each((x, y) => {
        $(y).removeClass("details__photo-wrap_large");
      });
      $(event.target).parent().addClass("details__photo-wrap_large");
    }
  }
}

const detailsPage = new DetailsPage();
