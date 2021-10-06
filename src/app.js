import "./views/global.scss";

require("jquery-ui");
function requireAll(r) {
  // console.log()
  // console.log(r);
  // console.log(r);
  // console.log(r(r.keys()[0], 0));
  r.keys().map(r);
}
// console.log(context);
// console.log(context.keys());
requireAll(require.context("./components", true, /\.js/));
requireAll(require.context("./views", true, /\.js/));
//
window.addEventListener("keydown", function (e) {
  if (e.keyCode == 32 && e.target.classList.contains("rates__star")) {
    //prevents scrolling when space is pressed while the rates star is focused
    e.preventDefault();
  }
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
