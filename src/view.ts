import { TodoItem } from './model';

export type Action = 'DELETE' | 'TOGGLECOMPLETE';

export interface TodoListHandle {
  action: Action;
  callback: (id: number) => void;
}

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

    if (todos.length === 0) {
      const paragraph = this.createElement('p') as HTMLParagraphElement;
      paragraph.textContent = 'You have no todo';
      this.todoList.append(paragraph);
    } else {
      const LiFragment = todos.map(todo => this.createLiFragment(todo));
      this.todoList.append(...LiFragment.reverse());
    }
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

  handleTodoListEvents(handle: TodoListHandle) {
    this.todoList.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      const targetId = Number(target.parentElement?.getAttribute('data-id'));
      const isDeleteTodo = target.getAttribute('data-action') === 'DELETE';
      const isToggleTodoComplete =
        target.getAttribute('data-action') === 'TOGGLECOMPLETE';

      if (handle.action === 'DELETE') {
        if (isDeleteTodo) {
          handle.callback(targetId);
        }
      }

      if (handle.action === 'TOGGLECOMPLETE') {
        if (isToggleTodoComplete) {
          handle.callback(targetId);
        }
      }
    });
  }

  attachEditTodo() {}

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
        <input type="checkbox" name="checkbox" ${isChecked} data-action="TOGGLECOMPLETE" />
        <span>${task}</span>
        <button type="button" data-action="DELETE">delete</button>
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
