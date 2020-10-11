import { Model } from './model';
import { View, Action } from './view';

export class Controller {
  constructor(private view: View, private model: Model) {
    // initial render
    this.view.render(this.model.getTodos());

    // bind addTodo
    this.view.attachAddTodo(this.model.addTodo);

    // bind onTodosChanged
    this.model.onTodosChanged(this.view.render);

    // bind removeTodo
    this.view.handleTodoListEvents({
      action: Action.DELETE,
      callback: this.model.removeTodo,
    });

    // bind toggleComplete
    this.view.handleTodoListEvents({
      action: Action.TOGGLECOMPLETE,
      callback: this.model.toggleComplete,
    });

    // bind editTodo
    this.view.handleTodoListEvents({
      action: Action.EDIT,
      callback: this.model.editTodo
    })
  }
}
