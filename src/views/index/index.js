import { SearchForm } from "../../components/card-search/card-search";
export class IndexPage {
  constructor() {
    this.form = $(".card__form")[0];
    this.searchCard = new SearchForm({ form: this.form });
    $(this.form).on("submit", (event) => {
      window.location.href = window.location.origin + "/search.html";
      event.preventDefault();
    });
  }
}

const indexPage = new IndexPage();
