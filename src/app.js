import "./views/global.scss";
// var $ = require("jquery");
// , require("jquery-ui");
//make this run only during compilation
require("modules/jquery-ui");
function requireAll(r) {
  r.keys().forEach((k) => {}); //(key) => (cache[key] = r(key))
}

//adds all .js files(which load styles) in components to context
requireAll(require.context("./components", true, /\.js$/, "sync"));
requireAll(require.context("./views", true, /\.js$/, "sync"));
