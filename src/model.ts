export class TodoItem {
  constructor(
    public id: number,
    public task: string,
    public completed: boolean
  ) {}
}

export class Model {
  private nextId = 1;
  private bindTodosChanged: (todos: TodoItem[]) => void;

  constructor(private todos: TodoItem[] = []) {
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.getTodos = this.getTodos.bind(this);
  }

  addTodo(todoText: string): void {
    while (this.getTodoById(this.nextId) !== undefined) {
      this.nextId++;
    }
    this.todos.push(new TodoItem(this.nextId, todoText, false));
    this.bindTodosChanged(this.getTodos());
  }

  removeTodo(todoId: number) {}

  editTodo(todoId: number, todoText: string) {}

  toggleComplete(todoid: number) {}

  private getTodoById(id: number): TodoItem | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  getTodos(): TodoItem[] {
    return this.todos;
  }

  onTodosChanged(cb: (todos: TodoItem[]) => void): void {
    this.bindTodosChanged = cb;
  }
}
