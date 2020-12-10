/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.ts":
/*!***************************!*\
  !*** ./src/controller.ts ***!
  \***************************/
/*! namespace exports */
/*! export Controller [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controller": () => /* binding */ Controller
/* harmony export */ });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/view.ts");
;
class Controller {
    constructor(_View, _Model) {
        this._View = _View;
        this._Model = _Model;
        // initial render
        this._View.render(this._Model.getTodos());
        // bind addTodo
        this._View.attachAddTodo(this._Model.addTodo);
        // bind onTodosChangediew: View, private _Model: Model) {
        this._Model.onTodosChanged(this._View.render);
        // bind removeTodo
        this._View.handleTodoListEvents({
            action: _view__WEBPACK_IMPORTED_MODULE_0__.Action.DELETE,
            callback: this._Model.removeTodo,
        });
        // bind toggleComplete
        this._View.handleTodoListEvents({
            action: _view__WEBPACK_IMPORTED_MODULE_0__.Action.TOGGLECOMPLETE,
            callback: this._Model.toggleComplete,
        });
        // bind editTodo
        this._View.handleTodoListEvents({
            action: _view__WEBPACK_IMPORTED_MODULE_0__.Action.EDIT,
            callback: this._Model.editTodo,
        });
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/model.ts");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.ts");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller */ "./src/controller.ts");
;


function BootstrapApp(root) {
    if (root !== null) {
        new _controller__WEBPACK_IMPORTED_MODULE_2__.Controller(new _view__WEBPACK_IMPORTED_MODULE_1__.View(root), new _model__WEBPACK_IMPORTED_MODULE_0__.Model());
    }
}
// bootstrap app
BootstrapApp(document.querySelector("#app"));


/***/ }),

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
/*! namespace exports */
/*! export Model [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TodoItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TodoItem": () => /* binding */ TodoItem,
/* harmony export */   "Model": () => /* binding */ Model
/* harmony export */ });
class TodoItem {
    constructor(id, task, completed) {
        this.id = id;
        this.task = task;
        this.completed = completed;
    }
}
class Model {
    constructor(todos = []) {
        this.todos = todos;
        this.nextId = 1;
        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.getTodos = this.getTodos.bind(this);
    }
    addTodo(todoText) {
        while (this.getTodoById(this.nextId) !== undefined) {
            this.nextId++;
        }
        this.todos.push(new TodoItem(this.nextId, todoText, false));
        this.bindTodosChanged(this.getTodos());
    }
    removeTodo(todoId) {
        const filteredTodos = this.todos.filter(todo => todo.id !== todoId);
        this.todos = filteredTodos;
        this.bindTodosChanged(this.getTodos());
    }
    editTodo(todoId, todoText) {
        this.todos = this.todos.map(todo => todo.id === todoId ? Object.assign(Object.assign({}, todo), { task: todoText }) : todo);
        this.bindTodosChanged(this.getTodos());
    }
    toggleComplete(todoId) {
        this.todos = this.todos.map(todo => todo.id === todoId ? Object.assign(Object.assign({}, todo), { completed: !todo.completed }) : todo);
        this.bindTodosChanged(this.getTodos());
    }
    getTodoById(id) {
        return this.todos.find(todo => todo.id === id);
    }
    getTodos() {
        return this.todos;
    }
    onTodosChanged(cb) {
        this.bindTodosChanged = cb;
    }
}


/***/ }),

/***/ "./src/view.ts":
/*!*********************!*\
  !*** ./src/view.ts ***!
  \*********************/
/*! namespace exports */
/*! export Action [provided] [no usage info] [missing usage info prevents renaming] */
/*! export View [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Action": () => /* binding */ Action,
/* harmony export */   "View": () => /* binding */ View
/* harmony export */ });
var Action;
(function (Action) {
    Action["DELETE"] = "DELETE";
    Action["TOGGLECOMPLETE"] = "TOGGLECOMPLETE";
    Action["EDIT"] = "EDIT";
})(Action || (Action = {}));
class View {
    constructor(app) {
        this.app = app;
        this.inputText = '';
        this.editInputText = '';
        this.noTodoList = this.createElement('div');
        this.todoList = this.createElement('ul');
        this.todoList.classList.add('todo-list');
        this.app.append(this.createAddFormFragment());
        this.input = this.getElement('input');
        this.addForm = this.getElement('[data-add-form]');
        this.input.addEventListener('input', () => {
            this.inputText = this.input.value;
        });
        this.render = this.render.bind(this);
    }
    render(todos) {
        this.todoList.innerHTML = '';
        this.noTodoList.innerHTML = '';
        if (todos.length === 0) {
            const paragraph = this.createElement('p');
            paragraph.textContent = 'You have no todo...';
            this.noTodoList.append(paragraph);
            this.todoList.remove();
            this.app.append(this.noTodoList);
        }
        else {
            const LiFragment = todos.map(todo => this.createLiFragment(todo));
            this.todoList.append(...LiFragment.reverse());
            this.noTodoList.remove();
            this.app.append(this.todoList);
        }
    }
    attachAddTodo(cb) {
        this.addForm.addEventListener('submit', event => {
            event.preventDefault();
            if (this.inputText.length > 0) {
                cb(this.inputText);
                this.input.value = '';
            }
        });
    }
    handleTodoListEvents(handle) {
        this.todoList.addEventListener('click', event => {
            var _a, _b;
            const target = event.target;
            const targetId = Number((_a = target.closest('li')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-id'));
            const isDeleteTodo = target.getAttribute('data-action') === Action.DELETE;
            const isToggleTodoComplete = target.getAttribute('data-action') === Action.TOGGLECOMPLETE;
            const isEditTodo = target.getAttribute('data-action') === Action.EDIT;
            // handle delete todo
            if ((handle.action === Action.DELETE && isDeleteTodo) || (handle.action === Action.TOGGLECOMPLETE && isToggleTodoComplete)) {
                handle.callback(targetId);
            }
            // handle edit todo
            if (handle.action === Action.EDIT && isEditTodo) {
                const previousText = (_b = target.closest('li')) === null || _b === void 0 ? void 0 : _b.children[0].textContent;
                if (previousText) {
                    this.editInputText = previousText;
                    const editForm = this.createEditFormFragment(previousText);
                    document.body.append(editForm);
                    // get edited task
                    const editInput = this.getElement('[data-edit-form-input]');
                    editInput.addEventListener('change', event => {
                        const target = event.target;
                        this.editInputText = target.value;
                    });
                    const buttons = this.getElements('[data-edit-form] button');
                    buttons.forEach(button => {
                        button.addEventListener('click', event => {
                            var _a, _b;
                            const target = event.target;
                            if (target.hasAttribute('data-edit-form-cancel')) {
                                (_a = this.getElement('[data-edit-form]')) === null || _a === void 0 ? void 0 : _a.remove();
                            }
                            else if (target.hasAttribute('data-edit-form-ok')) {
                                if (previousText !== this.editInputText) {
                                    handle.callback(targetId, this.editInputText);
                                }
                                (_b = this.getElement('[data-edit-form]')) === null || _b === void 0 ? void 0 : _b.remove();
                            }
                        });
                    });
                }
            }
        });
    }
    createEditFormFragment(todoText) {
        const html = `
      <div class="edit-form" data-edit-form>
        <input type="text" value="${todoText}" class="edit-form-input" data-edit-form-input />
        <button class="edit-form-ok" data-edit-form-ok>Ok</button>
        <button class="edit-form-cancel" data-edit-form-cancel>Cancel</button>
      </div>
    `;
        return this.createDOMFragment(html);
    }
    createAddFormFragment() {
        const html = `
      <form class="add-form" data-add-form>
        <label for="text-input" hidden>Todo</label>
        <input type="text" name="text-input" placeholder="what do you want to do today?" class="add-form-input" />
        <button class="add-form-button">Add Todo</button>
      </form>
    `;
        return this.createDOMFragment(html);
    }
    createLiFragment(todo) {
        const { id, task, completed } = todo;
        // ToDo: checked task
        // const isChecked = completed ? 'checked' : '';
        const html = `
      <li data-id=${id} class="todo-item">
        <p class="todo-item-text">${task}</p>
        <div class="todo-item-actions">
          <button type="button" data-action="DELETE">Delete</button>
          <button type="button" data-action="EDIT">Edit</button>
          <button type="button" data-action="TOGGLECOMPLETE">Completed</button>
        </div>
      </li>
    `;
        return this.createDOMFragment(html);
    }
    createDOMFragment(htmlString) {
        return document.createRange().createContextualFragment(htmlString);
    }
    createElement(tagName) {
        return document.createElement(tagName);
    }
    getElement(selector) {
        return document.querySelector(selector);
    }
    getElements(selector) {
        return document.querySelectorAll(selector);
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvX212Y190eXBlc2NyaXB0Ly4vc3JjL2NvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vdG9kb19tdmNfdHlwZXNjcmlwdC8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly90b2RvX212Y190eXBlc2NyaXB0Ly4vc3JjL21vZGVsLnRzIiwid2VicGFjazovL3RvZG9fbXZjX3R5cGVzY3JpcHQvLi9zcmMvdmlldy50cyIsIndlYnBhY2s6Ly90b2RvX212Y190eXBlc2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9fbXZjX3R5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG9fbXZjX3R5cGVzY3JpcHQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvX212Y190eXBlc2NyaXB0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb19tdmNfdHlwZXNjcmlwdC93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLENBQXNDO0FBRS9CLE1BQU0sVUFBVTtJQUNyQixZQUFvQixLQUFXLEVBQVUsTUFBYTtRQUFsQyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQUNwRCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRTFDLGVBQWU7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTlDLHlEQUF5RDtRQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJ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O1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vbW9kZWxcIjtcbmltcG9ydCB7IFZpZXcsIEFjdGlvbiB9IGZyb20gXCIuL3ZpZXdcIjtcblxuZXhwb3J0IGNsYXNzIENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9WaWV3OiBWaWV3LCBwcml2YXRlIF9Nb2RlbDogTW9kZWwpIHtcbiAgICAvLyBpbml0aWFsIHJlbmRlclxuICAgIHRoaXMuX1ZpZXcucmVuZGVyKHRoaXMuX01vZGVsLmdldFRvZG9zKCkpO1xuXG4gICAgLy8gYmluZCBhZGRUb2RvXG4gICAgdGhpcy5fVmlldy5hdHRhY2hBZGRUb2RvKHRoaXMuX01vZGVsLmFkZFRvZG8pO1xuXG4gICAgLy8gYmluZCBvblRvZG9zQ2hhbmdlZGlldzogVmlldywgcHJpdmF0ZSBfTW9kZWw6IE1vZGVsKSB7XG4gICAgdGhpcy5fTW9kZWwub25Ub2Rvc0NoYW5nZWQodGhpcy5fVmlldy5yZW5kZXIpO1xuXG4gICAgLy8gYmluZCByZW1vdmVUb2RvXG4gICAgdGhpcy5fVmlldy5oYW5kbGVUb2RvTGlzdEV2ZW50cyh7XG4gICAgICBhY3Rpb246IEFjdGlvbi5ERUxFVEUsXG4gICAgICBjYWxsYmFjazogdGhpcy5fTW9kZWwucmVtb3ZlVG9kbyxcbiAgICB9KTtcblxuICAgIC8vIGJpbmQgdG9nZ2xlQ29tcGxldGVcbiAgICB0aGlzLl9WaWV3LmhhbmRsZVRvZG9MaXN0RXZlbnRzKHtcbiAgICAgIGFjdGlvbjogQWN0aW9uLlRPR0dMRUNPTVBMRVRFLFxuICAgICAgY2FsbGJhY2s6IHRoaXMuX01vZGVsLnRvZ2dsZUNvbXBsZXRlLFxuICAgIH0pO1xuXG4gICAgLy8gYmluZCBlZGl0VG9kb1xuICAgIHRoaXMuX1ZpZXcuaGFuZGxlVG9kb0xpc3RFdmVudHMoe1xuICAgICAgYWN0aW9uOiBBY3Rpb24uRURJVCxcbiAgICAgIGNhbGxiYWNrOiB0aGlzLl9Nb2RlbC5lZGl0VG9kbyxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9kZWwgfSBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL3ZpZXdcIjtcbmltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5cbmZ1bmN0aW9uIEJvb3RzdHJhcEFwcChyb290OiBIVE1MRWxlbWVudCB8IG51bGwpIHtcbiAgaWYgKHJvb3QgIT09IG51bGwpIHtcbiAgICBuZXcgQ29udHJvbGxlcihcbiAgICAgIG5ldyBWaWV3KHJvb3QpLFxuICAgICAgbmV3IE1vZGVsKClcbiAgICApXG4gIH1cbn1cblxuLy8gYm9vdHN0cmFwIGFwcFxuQm9vdHN0cmFwQXBwKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwXCIpKVxuIiwiZXhwb3J0IGNsYXNzIFRvZG9JdGVtIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGlkOiBudW1iZXIsXG4gICAgcHVibGljIHRhc2s6IHN0cmluZyxcbiAgICBwdWJsaWMgY29tcGxldGVkOiBib29sZWFuXG4gICkge31cbn1cblxuZXhwb3J0IGNsYXNzIE1vZGVsIHtcbiAgcHJpdmF0ZSBuZXh0SWQgPSAxO1xuICBwcml2YXRlIGJpbmRUb2Rvc0NoYW5nZWQ6ICh0b2RvczogVG9kb0l0ZW1bXSkgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRvZG9zOiBUb2RvSXRlbVtdID0gW10pIHtcbiAgICB0aGlzLmFkZFRvZG8gPSB0aGlzLmFkZFRvZG8uYmluZCh0aGlzKTtcbiAgICB0aGlzLnJlbW92ZVRvZG8gPSB0aGlzLnJlbW92ZVRvZG8uYmluZCh0aGlzKTtcbiAgICB0aGlzLmVkaXRUb2RvID0gdGhpcy5lZGl0VG9kby5iaW5kKHRoaXMpO1xuICAgIHRoaXMudG9nZ2xlQ29tcGxldGUgPSB0aGlzLnRvZ2dsZUNvbXBsZXRlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5nZXRUb2RvcyA9IHRoaXMuZ2V0VG9kb3MuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGFkZFRvZG8odG9kb1RleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHdoaWxlICh0aGlzLmdldFRvZG9CeUlkKHRoaXMubmV4dElkKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm5leHRJZCsrO1xuICAgIH1cbiAgICB0aGlzLnRvZG9zLnB1c2gobmV3IFRvZG9JdGVtKHRoaXMubmV4dElkLCB0b2RvVGV4dCwgZmFsc2UpKTtcbiAgICB0aGlzLmJpbmRUb2Rvc0NoYW5nZWQodGhpcy5nZXRUb2RvcygpKTtcbiAgfVxuXG4gIHJlbW92ZVRvZG8odG9kb0lkOiBudW1iZXIpIHtcbiAgICBjb25zdCBmaWx0ZXJlZFRvZG9zID0gdGhpcy50b2Rvcy5maWx0ZXIodG9kbyA9PiB0b2RvLmlkICE9PSB0b2RvSWQpO1xuICAgIHRoaXMudG9kb3MgPSBmaWx0ZXJlZFRvZG9zO1xuICAgIHRoaXMuYmluZFRvZG9zQ2hhbmdlZCh0aGlzLmdldFRvZG9zKCkpO1xuICB9XG5cbiAgZWRpdFRvZG8odG9kb0lkOiBudW1iZXIsIHRvZG9UZXh0OiBzdHJpbmcpIHtcbiAgICB0aGlzLnRvZG9zID0gdGhpcy50b2Rvcy5tYXAodG9kbyA9PlxuICAgICAgdG9kby5pZCA9PT0gdG9kb0lkID8geyAuLi50b2RvLCB0YXNrOiB0b2RvVGV4dCB9IDogdG9kb1xuICAgICk7XG4gICAgdGhpcy5iaW5kVG9kb3NDaGFuZ2VkKHRoaXMuZ2V0VG9kb3MoKSk7XG4gIH1cblxuICB0b2dnbGVDb21wbGV0ZSh0b2RvSWQ6IG51bWJlcikge1xuICAgIHRoaXMudG9kb3MgPSB0aGlzLnRvZG9zLm1hcCh0b2RvID0+XG4gICAgICB0b2RvLmlkID09PSB0b2RvSWQgPyB7IC4uLnRvZG8sIGNvbXBsZXRlZDogIXRvZG8uY29tcGxldGVkIH0gOiB0b2RvXG4gICAgKTtcbiAgICB0aGlzLmJpbmRUb2Rvc0NoYW5nZWQodGhpcy5nZXRUb2RvcygpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VG9kb0J5SWQoaWQ6IG51bWJlcik6IFRvZG9JdGVtIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy50b2Rvcy5maW5kKHRvZG8gPT4gdG9kby5pZCA9PT0gaWQpO1xuICB9XG5cbiAgZ2V0VG9kb3MoKTogVG9kb0l0ZW1bXSB7XG4gICAgcmV0dXJuIHRoaXMudG9kb3M7XG4gIH1cblxuICBvblRvZG9zQ2hhbmdlZChjYjogKHRvZG9zOiBUb2RvSXRlbVtdKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5iaW5kVG9kb3NDaGFuZ2VkID0gY2I7XG4gIH1cbn1cbiIsImltcG9ydCB7IFRvZG9JdGVtIH0gZnJvbSAnLi9tb2RlbCc7XG5cbmV4cG9ydCBlbnVtIEFjdGlvbiB7XG4gIERFTEVURSA9ICdERUxFVEUnLFxuICBUT0dHTEVDT01QTEVURSA9ICdUT0dHTEVDT01QTEVURScsXG4gIEVESVQgPSAnRURJVCcsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9kb0xpc3RIYW5kbGUge1xuICBhY3Rpb246IEFjdGlvbjtcbiAgY2FsbGJhY2s6IChpZDogbnVtYmVyLCB0ZXh0Pzogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgVmlldyB7XG4gIHByaXZhdGUgaW5wdXRUZXh0OiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgcHJpdmF0ZSBhZGRGb3JtOiBIVE1MRm9ybUVsZW1lbnQ7XG4gIHByaXZhdGUgdG9kb0xpc3Q6IEhUTUxVTGlzdEVsZW1lbnQ7XG4gIHByaXZhdGUgbm9Ub2RvTGlzdDogSFRNTERpdkVsZW1lbnQ7XG4gIHByaXZhdGUgZWRpdElucHV0VGV4dDogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcHA6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5ub1RvZG9MaXN0ID0gdGhpcy5jcmVhdGVFbGVtZW50KCdkaXYnKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICB0aGlzLnRvZG9MaXN0ID0gdGhpcy5jcmVhdGVFbGVtZW50KCd1bCcpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG4gICAgdGhpcy50b2RvTGlzdC5jbGFzc0xpc3QuYWRkKCd0b2RvLWxpc3QnKTtcbiAgICB0aGlzLmFwcC5hcHBlbmQodGhpcy5jcmVhdGVBZGRGb3JtRnJhZ21lbnQoKSk7XG4gICAgdGhpcy5pbnB1dCA9IHRoaXMuZ2V0RWxlbWVudCgnaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHRoaXMuYWRkRm9ybSA9IHRoaXMuZ2V0RWxlbWVudCgnW2RhdGEtYWRkLWZvcm1dJykgYXMgSFRNTEZvcm1FbGVtZW50O1xuXG4gICAgdGhpcy5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgIHRoaXMuaW5wdXRUZXh0ID0gdGhpcy5pbnB1dC52YWx1ZTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVuZGVyID0gdGhpcy5yZW5kZXIuYmluZCh0aGlzKTtcbiAgfVxuXG4gIHJlbmRlcih0b2RvczogVG9kb0l0ZW1bXSk6IHZvaWQge1xuICAgIHRoaXMudG9kb0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgdGhpcy5ub1RvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xuXG4gICAgaWYgKHRvZG9zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3QgcGFyYWdyYXBoID0gdGhpcy5jcmVhdGVFbGVtZW50KCdwJykgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgICBwYXJhZ3JhcGgudGV4dENvbnRlbnQgPSAnWW91IGhhdmUgbm8gdG9kby4uLic7XG4gICAgICB0aGlzLm5vVG9kb0xpc3QuYXBwZW5kKHBhcmFncmFwaCk7XG4gICAgICB0aGlzLnRvZG9MaXN0LnJlbW92ZSgpO1xuICAgICAgdGhpcy5hcHAuYXBwZW5kKHRoaXMubm9Ub2RvTGlzdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IExpRnJhZ21lbnQgPSB0b2Rvcy5tYXAodG9kbyA9PiB0aGlzLmNyZWF0ZUxpRnJhZ21lbnQodG9kbykpO1xuICAgICAgdGhpcy50b2RvTGlzdC5hcHBlbmQoLi4uTGlGcmFnbWVudC5yZXZlcnNlKCkpO1xuICAgICAgdGhpcy5ub1RvZG9MaXN0LnJlbW92ZSgpO1xuICAgICAgdGhpcy5hcHAuYXBwZW5kKHRoaXMudG9kb0xpc3QpO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFjaEFkZFRvZG8oY2I6ICh0b2RvVGV4dDogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5hZGRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAodGhpcy5pbnB1dFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBjYih0aGlzLmlucHV0VGV4dCk7XG4gICAgICAgIHRoaXMuaW5wdXQudmFsdWUgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVRvZG9MaXN0RXZlbnRzKGhhbmRsZTogVG9kb0xpc3RIYW5kbGUpOiB2b2lkIHtcbiAgICB0aGlzLnRvZG9MaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgU1ZHRWxlbWVudDtcbiAgICAgIGNvbnN0IHRhcmdldElkID0gTnVtYmVyKHRhcmdldC5jbG9zZXN0KCdsaScpPy5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSk7XG4gICAgICBjb25zdCBpc0RlbGV0ZVRvZG8gPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicpID09PSBBY3Rpb24uREVMRVRFO1xuICAgICAgY29uc3QgaXNUb2dnbGVUb2RvQ29tcGxldGUgPVxuICAgICAgICB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicpID09PSBBY3Rpb24uVE9HR0xFQ09NUExFVEU7XG4gICAgICBjb25zdCBpc0VkaXRUb2RvID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1hY3Rpb24nKSA9PT0gQWN0aW9uLkVESVQ7XG5cbiAgICAgIC8vIGhhbmRsZSBkZWxldGUgdG9kb1xuICAgICAgaWYgKChoYW5kbGUuYWN0aW9uID09PSBBY3Rpb24uREVMRVRFICYmIGlzRGVsZXRlVG9kbykgfHwgKGhhbmRsZS5hY3Rpb24gPT09IEFjdGlvbi5UT0dHTEVDT01QTEVURSAmJiBpc1RvZ2dsZVRvZG9Db21wbGV0ZSkpIHtcbiAgICAgICAgaGFuZGxlLmNhbGxiYWNrKHRhcmdldElkKTtcbiAgICAgIH1cblxuICAgICAgLy8gaGFuZGxlIGVkaXQgdG9kb1xuICAgICAgaWYgKGhhbmRsZS5hY3Rpb24gPT09IEFjdGlvbi5FRElUICYmIGlzRWRpdFRvZG8pIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNUZXh0ID0gdGFyZ2V0LmNsb3Nlc3QoJ2xpJyk/LmNoaWxkcmVuWzBdLnRleHRDb250ZW50O1xuXG4gICAgICAgIGlmIChwcmV2aW91c1RleHQpIHtcbiAgICAgICAgICB0aGlzLmVkaXRJbnB1dFRleHQgPSBwcmV2aW91c1RleHQ7XG4gICAgICAgICAgY29uc3QgZWRpdEZvcm0gPSB0aGlzLmNyZWF0ZUVkaXRGb3JtRnJhZ21lbnQocHJldmlvdXNUZXh0KTtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChlZGl0Rm9ybSk7XG5cbiAgICAgICAgICAvLyBnZXQgZWRpdGVkIHRhc2tcbiAgICAgICAgICBjb25zdCBlZGl0SW5wdXQgPSB0aGlzLmdldEVsZW1lbnQoXG4gICAgICAgICAgICAnW2RhdGEtZWRpdC1mb3JtLWlucHV0XSdcbiAgICAgICAgICApIGFzIEhUTUxMSUVsZW1lbnQ7XG4gICAgICAgICAgZWRpdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5lZGl0SW5wdXRUZXh0ID0gdGFyZ2V0LnZhbHVlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgYnV0dG9ucyA9IHRoaXMuZ2V0RWxlbWVudHMoJ1tkYXRhLWVkaXQtZm9ybV0gYnV0dG9uJyk7XG4gICAgICAgICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAgICAgICAgICAgICBpZiAodGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0LWZvcm0tY2FuY2VsJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsZW1lbnQoJ1tkYXRhLWVkaXQtZm9ybV0nKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0LWZvcm0tb2snKSkge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1RleHQgIT09IHRoaXMuZWRpdElucHV0VGV4dCkge1xuICAgICAgICAgICAgICAgICAgaGFuZGxlLmNhbGxiYWNrKHRhcmdldElkLCB0aGlzLmVkaXRJbnB1dFRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmdldEVsZW1lbnQoJ1tkYXRhLWVkaXQtZm9ybV0nKT8ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUVkaXRGb3JtRnJhZ21lbnQodG9kb1RleHQ6IHN0cmluZyk6IERvY3VtZW50RnJhZ21lbnQge1xuICAgIGNvbnN0IGh0bWwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZWRpdC1mb3JtXCIgZGF0YS1lZGl0LWZvcm0+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHZhbHVlPVwiJHt0b2RvVGV4dH1cIiBjbGFzcz1cImVkaXQtZm9ybS1pbnB1dFwiIGRhdGEtZWRpdC1mb3JtLWlucHV0IC8+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LWZvcm0tb2tcIiBkYXRhLWVkaXQtZm9ybS1vaz5PazwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC1mb3JtLWNhbmNlbFwiIGRhdGEtZWRpdC1mb3JtLWNhbmNlbD5DYW5jZWw8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlRE9NRnJhZ21lbnQoaHRtbCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUFkZEZvcm1GcmFnbWVudCgpOiBEb2N1bWVudEZyYWdtZW50IHtcbiAgICBjb25zdCBodG1sID0gYFxuICAgICAgPGZvcm0gY2xhc3M9XCJhZGQtZm9ybVwiIGRhdGEtYWRkLWZvcm0+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJ0ZXh0LWlucHV0XCIgaGlkZGVuPlRvZG88L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwidGV4dC1pbnB1dFwiIHBsYWNlaG9sZGVyPVwid2hhdCBkbyB5b3Ugd2FudCB0byBkbyB0b2RheT9cIiBjbGFzcz1cImFkZC1mb3JtLWlucHV0XCIgLz5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFkZC1mb3JtLWJ1dHRvblwiPkFkZCBUb2RvPC9idXR0b24+XG4gICAgICA8L2Zvcm0+XG4gICAgYDtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVET01GcmFnbWVudChodG1sKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTGlGcmFnbWVudCh0b2RvOiBUb2RvSXRlbSk6IERvY3VtZW50RnJhZ21lbnQge1xuICAgIGNvbnN0IHsgaWQsIHRhc2ssIGNvbXBsZXRlZCB9ID0gdG9kbztcbiAgICAvLyBUb0RvOiBjaGVja2VkIHRhc2tcbiAgICAvLyBjb25zdCBpc0NoZWNrZWQgPSBjb21wbGV0ZWQgPyAnY2hlY2tlZCcgOiAnJztcbiAgICBjb25zdCBodG1sID0gYFxuICAgICAgPGxpIGRhdGEtaWQ9JHtpZH0gY2xhc3M9XCJ0b2RvLWl0ZW1cIj5cbiAgICAgICAgPHAgY2xhc3M9XCJ0b2RvLWl0ZW0tdGV4dFwiPiR7dGFza308L3A+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLWl0ZW0tYWN0aW9uc1wiPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtYWN0aW9uPVwiREVMRVRFXCI+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJFRElUXCI+RWRpdDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtYWN0aW9uPVwiVE9HR0xFQ09NUExFVEVcIj5Db21wbGV0ZWQ8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2xpPlxuICAgIGA7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlRE9NRnJhZ21lbnQoaHRtbCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZURPTUZyYWdtZW50KGh0bWxTdHJpbmc6IHN0cmluZyk6IERvY3VtZW50RnJhZ21lbnQge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVSYW5nZSgpLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChodG1sU3RyaW5nKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRWxlbWVudCh0YWdOYW1lOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gIH1cblxuICBwcml2YXRlIGdldEVsZW1lbnQoc2VsZWN0b3I6IHN0cmluZyk6IEVsZW1lbnQgfCBudWxsIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gIH1cblxuICBwcml2YXRlIGdldEVsZW1lbnRzKHNlbGVjdG9yOiBzdHJpbmcpOiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=