(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// greet.js
function sayHello(name) {
  return "Hello, ".concat(name, "!");
}

// 將函數導出
module.exports = {
  sayHello: sayHello
};

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
console.log("進入系統成功!");
// import { testFunction01 } from "./map";
// testFunction01();
// import { ol_map } from "./map";
// const mainMap = ol_map;
// console.log(mainMap);
// import Map from "ol/Map.js";
// import OSM from "ol/source/OSM.js";
// import TileLayer from "ol/layer/Tile.js";
// import View from "ol/View.js";
// import Map from "ol/Map";
// import OSM from "ol/source/OSM";
// import TileLayer from "ol/layer/Tile";
// import View from "ol/View";
// const ol_map = new Map({
//   target: "map",
//   layers: [
//     new TileLayer({
//       source: new OSM(),
//     }),
//   ],
//   view: new View({
//     center: [0, 0],
//     zoom: 2,
//   }),
// });
// console.log(ol_map);
var greet_1 = require("./greet");
function showHello(divName, name) {
  var elt = document.getElementById(divName);
  elt.innerText = (0, greet_1.sayHello)(name);
}
showHello("greeting", "TypeScript");

},{"./greet":1}]},{},[2])

//# sourceMappingURL=bundle.js.map
