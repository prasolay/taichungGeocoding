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

import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";

const ol_map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

console.log(ol_map);

import { sayHello } from "./greet";
console.log(sayHello("TypeScript"));
