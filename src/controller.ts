import { Model } from "./model";
import { View, Action } from "./view";

export class Controller {
  constructor(private _View: View, private _Model: Model) {
    // initial render
    this._View.render(this._Model.getTodos());

    // bind addTodo
    this._View.attachAddTodo(this._Model.addTodo);

    // bind onTodosChanged
    this._Model.onTodosChanged(this._View.render);

    // bind removeTodo
    this._View.handleTodoListEvents({
      action: Action.DELETE,
      callback: this._Model.removeTodo,
    });

    // bind toggleComplete
    this._View.handleTodoListEvents({
      action: Action.TOGGLECOMPLETE,
      callback: this._Model.toggleComplete,
    });

    // bind editTodo
    this._View.handleTodoListEvents({
      action: Action.EDIT,
      callback: this._Model.editTodo,
    });
  }
}
