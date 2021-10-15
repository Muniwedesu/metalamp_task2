import { RegisterForm } from "../../../components/card-register/card-register";
export class RegisterPage {
  constructor() {
    this.registerForm = new RegisterForm({ form: $(".card__form")[0] });
  }
}
const registerPage = new RegisterPage();
