import { AccountForm } from "../../components/card-account/card-account";
export class AccountPage {
  constructor() {
    this.accountForm = new AccountForm({ form: $(".card__form")[0] });
  }
}
