import { TodoItem } from './model';

export class View {
  private inputText: string = '';
  private input: HTMLInputElement;
  private form: HTMLFormElement;
  private todoList: HTMLUListElement;

  constructor(public app: HTMLDivElement) {
    this.todoList = this.createElement('ul') as HTMLUListElement;
    this.app.append(this.createForm());
    this.input = this.getElement('input') as HTMLInputElement;
    this.form = this.getElement('form') as HTMLFormElement;

    this.input.addEventListener('input', () => {
      this.inputText = this.input.value;
    });

    this.render = this.render.bind(this);
  }

  render(todos: TodoItem[]): void {
    this.todoList.innerHTML = '';
    const LiFragment = todos.map(todo => this.createLiFragment(todo));
    this.todoList.append(...LiFragment.reverse());
    this.app.append(this.todoList);
  }

  attachAddTodo(cb: (todoText: string) => void) {
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      if (this.inputText.length > 0) {
        cb(this.inputText);
        this.input.value = '';
      }
    });
  }

  attachRemoveTodo(cb: (todoId: number) => void) {
    this.todoList.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON') {
        const todoId = Number(target.parentElement?.getAttribute('data-id'));
        cb(todoId);
      }
    });
  }

  attachEditTodo() {}

  attachToggleComplete(cb: (todoId: number) => void) {
    this.todoList.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT') {
        const todoId = Number(target.parentElement?.getAttribute('data-id'));
        cb(todoId);
      }
    });
  }

  private createForm(): DocumentFragment {
    const html = `
      <form>
        <label for="text-input" hidden>Todo</label>
        <input type="text" name="text-input" placeholder="what do you want to do today?" />
        <button>Add Todo</button>
      </form>
    `;
    return document.createRange().createContextualFragment(html);
  }

  private createLiFragment(todo: TodoItem): DocumentFragment {
    const { id, task, completed } = todo;
    const isChecked = completed ? 'checked' : '';
    const html = `
      <li data-id=${id}>
        <input type="checkbox" name="checkbox" ${isChecked} />
        <span>${task}</span>
        <button type="button">delete</button>
      </li>
    `;
    return document.createRange().createContextualFragment(html);
  }

  private createElement(value: string): HTMLElement {
    return document.createElement(value);
  }

  private getElement(value: string): Element | null {
    return document.querySelector(value);
  }
}
