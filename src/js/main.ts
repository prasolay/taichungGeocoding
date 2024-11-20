import { sayHello } from "./greet";
function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = sayHello(name);
}
showHello("greeting", "TypeScript");
// import { ol_map } from "map";
// const mainMap = ol_map;