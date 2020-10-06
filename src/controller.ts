import { Model } from './model';
import { View } from './view';

export class Controller {
  constructor(public view: View, public model: Model) {
    // bind addTodo
    this.view.attachAddTodo(this.model.addTodo);
  }

  // initial app render
  renderApp() {}

  bindRemoveTodo() {}

  bindEditTodo() {}

  bindToggleComplete() {}
}
