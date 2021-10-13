import "./views/global.scss";

import { RegisterPage } from "./views/account/__register/__register";
// import { LoginPage } from "./views/account/__login/__login";
import { IndexPage } from "./views/index/index";
import { DetailsPage } from "./views/details/details";
import { SearchPage } from "./views/search/search";

// require("jquery-ui");
// function requireAll(r) {
//   console.log()
//   console.log(r);
//   console.log(r);
//   console.log(r(r.keys()[0], 0));
//   r.keys().map(r);
// }
// console.log(context);
// console.log(context.keys());
// requireAll(require.context("./components", true, /\.js/));
// requireAll(require.context("./views", true, /\.js/));

window.addEventListener("keydown", function (e) {
  if (e.keyCode == 32 && e.target.classList.contains("rates__star")) {
    //prevents scrolling when space is pressed while the rates star is focused
    e.preventDefault();
  }
});
// console.log(pug.compile("./views/index/index.pug"));
// require("./components/dropdown/dropdown.js");
$(document).ready(() => {
  const path = window.location.pathname.split(/\.|\//)[1];
  // console.log(path);
  let page = null;
  switch (path) {
    case "details": {
      page = null;
      console.log("PATH: details");
      page = new DetailsPage();
      break;
    }
    case "search": {
      page = null;
      console.log("PATH: search");
      page = new SearchPage();
      break;
    }
    case "index": {
      page = null;
      console.log("PATH: index");
      page = new IndexPage();
      break;
    }
    case "register": {
      page = null;
      console.log("PATH: index");
      page = new RegisterPage();
      break;
    }
    case "login": {
      page = null;
      console.log("PATH: index");
      // page = new LoginPage();
      break;
    }
  }
  //determine on which page are we
  //and load appropriate page class?
});

//imports a module as context
// var name = "dropdown";
// const context = require("./components/inputs/dropdown/" + name + ".js");
// console.log(context);
// console.log($("document"));
// //adds all .js files(which load styles) in components to context
// console.log("require.context");
// let context = require.context("./components", true, /\.js$/, "sync");
// console.log(context.keys());
// console.log(require.context("./components", true, /\.js$/, "sync"));
// console.log("requireAll");
// console.log(requireAll(require.context("./components", true, /\.js$/, "sync")));
// // requireAll(require.context("./views", true, /\.js$/, "sync"));
