export class View {
  private inputText: string = '';
  private input: HTMLInputElement;
  private form: HTMLFormElement;

  constructor(public app: HTMLDivElement) {
    this.app.append(this.createForm());
    this.input = this.getElement('input') as HTMLInputElement;
    this.form = this.getElement('form') as HTMLFormElement;

    this.input.addEventListener('input', () => {
      this.inputText = this.input.value;
    });
  }

  render() {}

  attachAddTodo(cb: (todoText: string) => void) {
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      if (this.inputText.length > 0) {
        cb(this.inputText);
        this.input.value = '';
      }
    });
  }

  attachRemoveTodo() {}

  attachEditTodo() {}

  attachToggleComplete() {}

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

  private createFragment() {}

  private createElement() {}

  private getElement(value: string): Element | null {
    return document.querySelector(value);
  }
}
