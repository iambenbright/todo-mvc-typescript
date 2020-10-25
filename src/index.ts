import { Model } from "./model";
import { View } from "./view";
import { Controller } from "./controller";

// bind view to model
new Controller(
  new View(document.querySelector("#app") as HTMLDivElement),
  new Model()
);
