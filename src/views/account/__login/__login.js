import { LoginForm } from "../../../components/card-login/card-login";
const loginCard = require("./__login.pug");
import { AccountCard } from "../__card";

export class LoginCard extends AccountCard {
  constructor(parent, options = { animationDuration: 1500 }) {
    super(parent, options, { id: "login-card", pug: loginCard, class: LoginForm });
  }
}
