import { mountAll } from "./mountAll";

console.log(`${__filename} is loaded in ${process.env.NODE_ENV} mode`);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountAll);
} else {
  mountAll();
}
