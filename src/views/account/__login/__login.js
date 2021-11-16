const loginCard = require("./__login.pug");
import { LoginForm } from "../../../components/card-login/card-login";
import { AccountCard } from "../__card";

export class LoginCard extends AccountCard {
  constructor(parent, options = { animationDuration: 1500 }) {
    console.log("log ctor");
    super(parent, options, { id: "login-card", pug: loginCard, class: LoginForm });
  }
}
