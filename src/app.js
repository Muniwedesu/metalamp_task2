import "./views/global.scss";
import { Header } from "./components/header/header";
window.addEventListener("keydown", function (e) {
  if (e.keyCode == 32 && e.target.classList.contains("rates__star")) {
    //prevents scrolling when space is pressed while the rates star is focused
    e.preventDefault();
  }
});
