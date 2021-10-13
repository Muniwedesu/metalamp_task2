import { SearchForm } from "../../components/card-search/card-search";
export class IndexPage {
  constructor() {
    this.form = $(".card__form")[0];
    this.searchCard = new SearchForm({ form: this.form });
  }
}
