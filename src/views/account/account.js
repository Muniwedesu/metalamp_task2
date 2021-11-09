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
      register: new RegisterCard(this.$cardContainer[0]),
      login: new LoginCard(this.$cardContainer[0]),
    };
    console.log(this.cards.register.width);
    console.log(this.cards.register.height);
    // this.cardContainer.style.width = `${this.cards.register.width}px`;
    // this.cardContainer.style.height = ` ${this.cards.register.height}px`;
    console.log(this.cardContainer);

    let card = this.urlParams.get("action");
    this.loadCard(card);

    this.cardIndex = new CardIndex(card, Object.keys(this.cards));

    this.$swapButton = $("a.button");
    // console.log(this.$swapButton);
    this.attachSwapAction();
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
    // sooo
    this.timeline = anime
      .timeline({ easing: "linear", targets: this.cardContainer })
      .add(
        {
          begin: () => {
            this.cards[currentCard].hideContent();
          },
          height: 80,
          width: 80,
          duration: 200,
          borderRadius: "100%",
        },
        "-=100"
      )
      .add({
        rotateX: "90deg",
        duration: 100,
        complete: (anim) => {
          //replace
          // this.$cardContainer.html(this.cards[nextCard].html);
          // this.loadCard(nextCard);
          // console.log(this.getCardElement());
          // this.getCardElement().children()[0].style.opacity = 0;
          // this.$cardContent = this.getCardElement().children()[0];
        },
        // duration: 0,
      })
      .add({
        rotateX: "0deg",
        duration: 200,
      })
      .add({
        begin: () => {
          // this.loadCard(nextCard);
          // this.cards[currentCard].hideContent();
          this.cards[nextCard].showContent();
        },
        duration: 200,
        borderRadius: 0,
        width: this.cards[nextCard].width,
        height: this.cards[nextCard].height,
      });

    // this.$swapButton = $("a.button");
    // this.$swapButton.on("click", this.swapCards.bind(this));
    // });
  }
  attachSwapAction() {
    this.$swapButton.on("click", this.swapCards.bind(this));
  }
  loadCard(card) {
    console.log(`action = ${card}`);
    // action value is passed here
    // call it when swapping with just a card name
    switch (card) {
      case "login":
        console.log("loading login");
        this.urlParams.toString();
        // attachLoginCard(this.$cardContainer.get(0));

        //maybe it's actually better to push state?
        window.history.replaceState({}, "", "?action=login");
        this.cards.login.showContent();
        break;
      case "register":
        this.urlParams.set("action", "register");
        window.history.replaceState({}, "", "?action=register");

        // console.log(this.urlParams.toString());
        console.log("loading reg");
        // attachRegistrationCard(this.$cardContainer.get(0));
        this.cards.login.hideContent();
        this.cards.register.showContent();
        break;
      default: {
        console.log("loading default");
        // this.urlParams.set("action", "login");
        // attachLoginCard(this.$cardContainer.get(0));
        //set current card object's name and reference?
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
  getCardsDimensions() {
    // attachLoginCard(this.$cardContainer.get(0));
    // // this.cards.login.width = this.$cardContainer.children().width();
    // // this.cards.login.height = this.$cardContainer.children().height();
    // attachRegistrationCard(this.$cardContainer.get(0));
  }
}
new Account();
