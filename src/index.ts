import { Model } from "./model";
import { View } from "./view";
import { Controller } from "./controller";

function BootstrapApp(root: HTMLElement | null) {
  if (root !== null) {
    new Controller(
      new View(root),
      new Model()
    )
  }
}

// bootstrap app
BootstrapApp(document.querySelector("#app"))
