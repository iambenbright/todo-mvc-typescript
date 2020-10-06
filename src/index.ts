import { Model } from './model.js';
import { View } from './view.js';
import { Controller } from './controller.js';

// root app
const root = document.querySelector('#app') as HTMLDivElement;

// bind view to model
new Controller(new View(root), new Model('Ben'));
