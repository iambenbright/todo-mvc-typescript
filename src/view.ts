export class View {
  constructor(public app: HTMLDivElement) {
    this.app.append(this.createForm());
  }

  render() {}

  attachAddTodo() {}

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

  private getElement() {}
}
