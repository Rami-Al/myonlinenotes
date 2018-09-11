import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
const $ = require("jquery");
let css = require("./assets/styles/sass/main.scss");
import App from "./components/App.js";

ReactDOM.render(<App />, document.getElementById("root"));
