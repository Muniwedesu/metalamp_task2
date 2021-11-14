import { RegisterForm } from "../../../components/card-register/card-register";

import { AccountCard } from "../__card";
const registerCard = require("./__register.pug");

export class RegisterCard extends AccountCard {
  constructor(parent, options = { animationDuration: 1500 }) {
    console.log("reg ctor");
    super(parent, options, { id: "register-card", pug: registerCard, class: RegisterForm });
  }
}
