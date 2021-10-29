import { SearchForm } from "../../components/card-search/card-search";
// import { animate } from "popmotion";
export class IndexPage {
  constructor() {
    this.form = $(".card__form")[0];
    this.searchCard = new SearchForm({ form: this.form });
    $(this.form).on("submit", (event) => {
      window.location.href = window.location.origin + "/search.html";
      event.preventDefault();
    });
    // animate({
    //   from: 0,
    //   to: 100,
    //   onUpdate: (latest) => console.log(latest),
    // });
  }
}

const indexPage = new IndexPage();
