class TodoItem {
  constructor(
    public id: number,
    public task: string,
    public completed: boolean
  ) {}
}

export class Model {
  private nextId = 1;
  constructor(public todos: TodoItem[] = []) {
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  addTodo(todoText: string): void {
    while (this.getTodoById(this.nextId) !== undefined) {
      this.nextId++;
    }
    this.todos.push(new TodoItem(this.nextId, todoText, false));
    console.log(this.todos);
  }

  removeTodo(todoId: number) {}

  editTodo(todoId: number, todoText: string) {}

  toggleComplete(todoid: number) {}

  getTodoById(id: number): TodoItem | undefined {
    return this.todos.find(todo => todo.id === id);
  }
}
