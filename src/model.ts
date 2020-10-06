class TodoItem {
  constructor(
    public id: number,
    public task: string,
    public completed: boolean
  ) {}
}

export class Model {
  private nextId = 1;
  constructor(public userName: string, public todoList: TodoItem[] = []) {}

  addTodo(todoText: string): void {
    while (this.getTodoId(this.nextId) !== undefined) {
      this.nextId++;
    }
    this.todoList.push(new TodoItem(this.nextId, todoText, false));
  }

  removeTodo(todoId: number) {}

  editTodo(todoId: number, todoText: string) {}

  toggleComplete(todoid: number) {}

  getTodoId(id: number): TodoItem | undefined {
    return this.todoList.find(todo => todo.id === id);
  }
}
