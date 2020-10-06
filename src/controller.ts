import { Model } from './model';
import { View } from './view';

export class Controller {
  constructor(public view: View, public model: Model) {}

  // initial app render
  renderApp() {}

  bindAddTodo() {}

  bindRemoveTodo() {}

  bindEditTodo() {}

  bindToggleComplete() {}
}
