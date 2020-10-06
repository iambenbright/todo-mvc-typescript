class TodoItem {
  constructor(
    public id: number,
    public task: string,
    public completed: boolean
  ) {}
}

export class Model {
  private nextId = 1;
  constructor(public userName: string, todoList: TodoItem[] = []) {}

  addTodo(todoText: string) {}

  removeTodo(todoId: number) {}

  editTodo(todoId: number, todoText: string) {}

  toggleComplete(todoid: number) {}
}
