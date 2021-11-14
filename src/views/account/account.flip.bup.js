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
    //set initial page state

    this.cardContainer = this.$cardContainer[0];
    // this.getCardElement = this.$cardContainer.children.bind(this.$cardContainer);

    // this.cardSizes = { login: {}, register: {} };
    this.cards = {
      register: new RegisterCard(this.$cardContainer[0], { animationDuration: 150 }),
      login: new LoginCard(this.$cardContainer[0], { animationDuration: 150 }),
    };
    console.log(this.cards.register.width);
    console.log(this.cards.register.height);

    console.log(this.cardContainer);

    let card = this.urlParams.get("action");
    this.loadCard(card);

    this.cardIndex = new CardIndex(card, Object.keys(this.cards));

    this.$swapButton = $("a.button");
    this.attachSwapAction();
    //1. fix url not changing on swap
    //2. fix the first swap animation when page loads
    //3.
  }

  swapCards(event) {
    console.log("swap");
    event.preventDefault();
    let currentIndex = this.cardIndex.current();
    let currentCard = this.cardIndex.cardName();
    let nextIndex = this.cardIndex.next();
    let nextCard = this.cardIndex.cardName();
    console.log(currentCard);
    console.log(currentIndex);
    console.log(nextCard);
    console.log(nextIndex);
    //move the wrapper timeline to an object
    //this whole thing starts with card animation
    // and ends with it/
    this.timeline = anime
      .timeline({ easing: "linear", targets: this.cardContainer })
      .add(
        {
          begin: () => {
            this.cards[currentCard].hideContent();
          },
          height: 80,
          width: 80,
          duration: 300,
          borderRadius: "100%",
          complete: () => {
            this.$cardContainer[0].style.background = "#fff";
          },
        },
        "-=100"
      )
      .add({
        rotateX: "90deg",
        duration: 100,
        complete: (anim) => {},
        // duration: 0,
      })
      .add({
        rotateX: "0deg",
        duration: 200,
      })
      .add({
        begin: () => {
          this.$cardContainer[0].style.background = "none";
          this.cards[nextCard].showContent();
        },
        duration: 200,
        borderRadius: 0,
        width: this.cards[nextCard].width,
        height: this.cards[nextCard].height,
      });
  }
  attachSwapAction() {
    this.$swapButton.on("click", this.swapCards.bind(this));
  }
  loadCard(card) {
    console.log(`action = ${card}`);
    switch (card) {
      case "login":
        console.log("loading login");
        this.urlParams.toString();
        window.history.replaceState({}, "", "?action=login");
        this.cards.login.showContent();
        break;
      case "register":
        this.urlParams.set("action", "register");
        window.history.replaceState({}, "", "?action=register");
        console.log("loading reg");
        this.cards.login.hideContent();
        this.cards.register.showContent();
        break;
      default: {
        console.log("loading default");
        this.cards.login.showContent();
        window.history.replaceState({}, "", "?action=login");
        //bind
        break;
      }
    }
  }
  getAction() {
    const queryString = window.location.search;
    return new URLSearchParams(queryString);
  }
}
new Account();
