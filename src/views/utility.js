import { wrapGrid } from "animate-css-grid";
export class Grid {
  //yes it's not scalable
  constructor(grid, { breakpoints, sizes, options }) {
    this.grid = grid;
    this.$grid = $(grid);
    this.breaks = breakpoints;
    this.sizes = sizes;
    this.options = options;
    //calculated
    this.width = this.$grid.width();
    this.size = -1;
    $(window).on("resize", this.toggleGrid.bind(this));
    //this order for container not to run animation on load;
    this.toggleGrid();
    wrapGrid(this.grid, options);
  }

  determineSize() {
    if (this.isSmall()) this.size = 0;
    else if (this.isMedium()) this.size = 1;
    else if (this.isLarge()) this.size = 2;
  }

  toggleGrid() {
    this.width = this.$grid.width();

    this.determineSize();

    this.sizes.forEach((x, index) => {
      if (index === this.size) this.$grid.addClass(x);
      else this.$grid.removeClass(x);
    });
  }

  isSmall() {
    return this.width <= this.breaks.min && this.size !== 0;
  }
  isMedium() {
    return this.width > this.breaks.min && this.width <= this.breaks.max && this.size !== 1;
  }
  isLarge() {
    return this.width > this.breaks.max && this.size !== 2;
  }
}
