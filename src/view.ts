import { TodoItem } from './model';

export enum Action {
  DELETE = 'DELETE',
  TOGGLECOMPLETE = 'TOGGLECOMPLETE',
  EDIT = 'EDIT'
}

export interface TodoListHandle {
  action: Action;
  callback: (id: number, text?: string) => void;
}

export class View {
  private inputText: string = '';
  private input: HTMLInputElement;
  private form: HTMLFormElement;
  private todoList: HTMLUListElement;
  private noTodoList: HTMLDivElement;
  private editInputText: string = '';

  constructor(private app: HTMLDivElement) {
    this.noTodoList = this.createElement('div') as HTMLDivElement;
    this.todoList = this.createElement('ul') as HTMLUListElement;
    this.app.append(this.createAddFormFragment());
    this.input = this.getElement('input') as HTMLInputElement;
    this.form = this.getElement('form') as HTMLFormElement;

    this.input.addEventListener('input', () => {
      this.inputText = this.input.value;
    });

    this.render = this.render.bind(this);
  }

  render(todos: TodoItem[]): void {
    this.todoList.innerHTML = '';
    this.noTodoList.innerHTML = '';

    if (todos.length === 0) {
      const paragraph = this.createElement('p') as HTMLParagraphElement;
      paragraph.textContent = 'You have no todo';
      this.noTodoList.append(paragraph);
      this.todoList.remove();
      this.app.append(this.noTodoList);
    } else {
      const LiFragment = todos.map(todo => this.createLiFragment(todo));
      this.todoList.append(...LiFragment.reverse());
      this.noTodoList.remove();
      this.app.append(this.todoList);
    }
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
      const isDeleteTodo = target.getAttribute('data-action') === Action.DELETE;
      const isToggleTodoComplete =
        target.getAttribute('data-action') === Action.TOGGLECOMPLETE;
      const isEditTodo = target.getAttribute('data-action') === Action.EDIT;

      // handle delete todo
      if (handle.action === Action.DELETE && isDeleteTodo) {
        handle.callback(targetId);
      }

      // handle toggle todo
      if (handle.action === Action.TOGGLECOMPLETE && isToggleTodoComplete) {
        handle.callback(targetId);
      }

      // handle edit todo
      if (handle.action === Action.EDIT && isEditTodo) {
        const previousText = target.parentElement?.children[1].textContent;

        if (previousText) {
          this.editInputText = previousText;
          const editForm = this.createEditFormFragment(previousText);
          document.body.append(editForm);

          // get edited task
          const editInput = this.getElement('[data-edit-input]') as HTMLLIElement;
          editInput.addEventListener('change', event => {
            const target = event.target as HTMLInputElement
            this.editInputText = target.value;
          })

          const buttons = this.getElements('[data-edit-form] button');
          buttons.forEach(button => {
            button.addEventListener('click', event => {
              const target = event.target as HTMLButtonElement;

              if (target.hasAttribute('data-edit-cancel')) {
                this.getElement('[data-edit-form]')?.remove();
              }

              if (target.hasAttribute('data-edit-ok')) {
                if (previousText !== this.editInputText) {
                  handle.callback(targetId, this.editInputText);
                  this.getElement('[data-edit-form]')?.remove();
                } else {
                  this.getElement('[data-edit-form]')?.remove();
                }
              }
            })
          });
        }
      }
    });
  }

  private createEditFormFragment(todoText: string): DocumentFragment {
    const html = `
      <div data-edit-form>
        <input type="text" value="${todoText}" data-edit-input />
        <button data-edit-ok>Ok</button>
        <button data-edit-cancel>Cancel</button>
      </div>
    `;
    return this.createDOMFragment(html);
  }

  private createAddFormFragment(): DocumentFragment {
    const html = `
      <form>
        <label for="text-input" hidden>Todo</label>
        <input type="text" name="text-input" placeholder="what do you want to do today?" />
        <button>Add Todo</button>
      </form>
    `;
    return this.createDOMFragment(html);
  }

  private createLiFragment(todo: TodoItem): DocumentFragment {
    const { id, task, completed } = todo;
    const isChecked = completed ? 'checked' : '';
    const html = `
      <li data-id=${id}>
        <input type="checkbox" name="checkbox" ${isChecked} data-action="TOGGLECOMPLETE" />
        <span>${task}</span>
        <button type="button" data-action="DELETE">Delete</button>
        <button type="button" data-action="EDIT">Edit</button>
      </li>
    `;
    return this.createDOMFragment(html);
  }

  private createDOMFragment(htmlString: string): DocumentFragment {
    return document.createRange().createContextualFragment(htmlString);
  }

  private createElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  private getElement(selector: string): Element | null {
    return document.querySelector(selector);
  }

  private getElements(selector: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(selector);
  }
}
