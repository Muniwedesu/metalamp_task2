//
//
// render card depending on what?
const loginCard = require("./__login/__login.pug");
const registrationCard = require("./__register/__register.pug");
import anime from "animejs";

export class Account {
  constructor() {
    // console.log(loginCard());
    // console.log(registrationCard());
    console.log("account created");
    this.$cardContainer = $(".account__card");

    this.cardSizes = { login: {}, register: {} };
    this.cards = { login: loginCard(), register: registrationCard() };
    this.$cardContainer.html(this.cards.login);
    this.cardSizes.login.width = this.$cardContainer.children().width();
    this.cardSizes.login.height = this.$cardContainer.children().height();
    this.$cardContainer.html(this.cards.register);
    this.cardSizes.register.width = this.$cardContainer.children().width();
    this.cardSizes.register.height = this.$cardContainer.children().height();
    console.log(this.cardSizes);
    this.currentCard = "register";
    this.$cardContainer.on("click", this.swapCards.bind(this));
    this.$swapButton = $("a.button");
    console.log(this.$swapButton);
    this.$swapButton.on("click", this.swapCards.bind(this));

    // this.timeline.pause();
  }
  swapCards(event) {
    console.log("swap");
    event.preventDefault();
    let nextCard = "login";
    if (this.currentCard === "login") {
      nextCard = "register";
      this.currentCard = "register";
    } else {
      nextCard = "login";
      this.currentCard = "login";
    }
    this.timeline = anime
      .timeline({ easing: "linear" })
      .add({
        targets: (() => {
          console.log(this.$cardContainer.children().children());
          return this.$cardContainer.children().children()[0];
        })(),
        opacity: 0,
        duration: 200,
      })
      .add(
        {
          targets: this.$cardContainer[0],
          height: "80px",
          width: "80px",
          borderRadius: "100%",
          duration: 200,
        },
        "-=100"
      )
      .add({
        targets: this.$cardContainer[0],
        rotateX: "90deg",
        duration: 100,
        complete: (anim) => {
          this.$cardContainer.html(this.cards[nextCard]);
          this.$cardContainer.children().children()[0].style.opacity = 0;
          this.$cardContent = this.$cardContainer.children().children();
        },
        // duration: 0,
      })
      .add({
        targets: this.$cardContainer[0],
        rotateX: "0deg",
        duration: 200,
      })
      .add({
        duration: 200,
        borderRadius: 0,
        targets: this.$cardContainer[0],
        width: this.cardSizes[nextCard].width,
        height: this.cardSizes[nextCard].height,
      });
  }
}
new Account();
