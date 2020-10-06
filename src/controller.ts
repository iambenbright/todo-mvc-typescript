import { Model } from './model';
import { View } from './view';

export class Controller {
  constructor(public view: View, public model: Model) {
    // initial render
    this.view.render(this.model.getTodos());
    // bind addTodo
    this.view.attachAddTodo(this.model.addTodo);
    // bind onTodosChanged
    this.model.onTodosChanged(this.view.render);
  }

  bindRemoveTodo() {}

  bindEditTodo() {}

  bindToggleComplete() {}
}
