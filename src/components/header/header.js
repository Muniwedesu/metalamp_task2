// import "./header.scss";
export class Header {
  constructor(header) {
    this.$header = $(header);
    this.$nav = this.$header.find(".header__navigation");
    this.$buttons = this.$header.find(".header__buttons");
    //create a menu
    //move all these blocks to it
  }
}

$(".header").map(function () {
  console.log(this);
  new Header(this);
});
