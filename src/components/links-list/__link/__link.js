import anime from "animejs";

import { AnimationWrapper } from "./__link-functions";

export class Link {
  constructor(el) {
    this.$el = el;
    this.$el.addEventListener("mouseleave", this.animateLeave.bind(this));
    this.$el.addEventListener("mouseenter", this.animateEnter.bind(this));

    this.wrapper = new AnimationWrapper(this.$el);
  }
  animateEnter(event) {
    if (event.target.classList.contains("links-list__link")) {
      // in firefox layerX sometimes returns wrong values
      ///
      this.wrapper.addCircle({
        layerX: event.layerX,
        layerY: event.layerY,
        itemWidth: event.target.getBoundingClientRect().width,
        isDesktop: event.target.parentNode.classList.contains("links-list__item_inline"),
      });
    }
  }
  animateLeave(event) {
    if (event.target.classList.contains("links-list__link")) {
      this.wrapper.removeCircle();
    }
  }
}
