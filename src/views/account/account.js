//
import { RegisterCard } from "./__register/__register"; //
import { LoginCard } from "./__login/__login";
// render card depending on what?
const loginCard = require("./__login/__login.pug");
const registerCard = require("./__register/__register.pug");
import anime from "animejs";
const cardSwapAnimation = function () {};

class CardIndex {
  constructor(card, objectList) {
    this.currentIndex = objectList.indexOf(card);
    this.objectList = objectList;
    this.mod = this.objectList.length;
    console.log(`index ctor: ${this.currentIndex}, ${card}`);
  }
  cardName() {
    return this.objectList[this.currentIndex];
  }
  next() {
    this.currentIndex = ++this.currentIndex % this.mod;
    return this.currentIndex;
  }
  current() {
    return this.currentIndex;
  }
}
export class Account {
  constructor() {
    this.$cardContainer = $(".account__card");
    this.urlParams = this.getAction();

    this.cardContainer = this.$cardContainer[0];

    this.duration = 300;
    this.circleDuration = 1500;
    this.cards = {
      register: new RegisterCard(this.$cardContainer[0], {
        circleDuration: this.circleDuration,
        animationDuration: this.duration,
      }),
      login: new LoginCard(this.$cardContainer[0], {
        circleDuration: this.circleDuration,
        animationDuration: this.duration,
      }),
    };

    let card = this.urlParams.get("action") || "login";

    this.cardIndex = new CardIndex(card, Object.keys(this.cards));
    this.loadCard(card);

    this.$swapButton = $("a.button");
    this.attachSwapAction();
    //1. fix url not changing on swap
    //2. fix the first swap animation when page loads
    //3.
  }

  swapCards(event) {
    console.log("swap");
    event.preventDefault();
    let currentCard = this.cardIndex.cardName();
    this.cardIndex.next();
    let nextCard = this.cardIndex.cardName();

    this.timeline = anime
      .timeline({ easing: "linear", targets: this.cardContainer })
      .add({
        //this depends on circleDuration
        begin: () => {
          this.cards[currentCard].hideContent({
            width: this.cards[nextCard].width,
            height: this.cards[nextCard].height,
          });
        },
        duration: this.duration,
        easing: "easeOutCubic",
        width: this.cards[nextCard].width,
        height: this.cards[nextCard].height,
      })
      .add({
        duration: this.circleDuration * 0.1,
        complete: () => {
          this.cards[currentCard].hide();
          this.loadCard(nextCard);
        },
      });
  }
  attachSwapAction() {
    this.$swapButton.on("click", this.swapCards.bind(this));
  }
  loadCard(card) {
    //changes URL, shows "next card", changes address bar state
    this.cards[card].showContent();
    this.cards[card].show();
    this.urlParams.set("action", `${card}`);
    window.history.replaceState({}, "", `?action=${card}`);
  }
  getAction() {
    const queryString = window.location.search;
    return new URLSearchParams(queryString);
  }
}
new Account();
