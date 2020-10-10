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

    // bind editTodo
    // this.view.attachEditTodo(this.model.editTodo);

    // bind removeTodo
    this.view.handleTodoListEvents({
      action: 'DELETE',
      callback: this.model.removeTodo,
    });

    // bind toggleComplete
    this.view.handleTodoListEvents({
      action: 'TOGGLECOMPLETE',
      callback: this.model.toggleComplete,
    });
  }
}
