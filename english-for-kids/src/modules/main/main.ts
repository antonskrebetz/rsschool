import '../commonStyles.scss';
import './main.scss';
import { BaseComponent } from '../base-component';
import { Category } from '../app/app';
import { Router } from '../getRoute';

export class Main extends BaseComponent {
  router = new Router(this);

  mainWrapper: BaseComponent | undefined;

  mainTitle: BaseComponent | undefined;

  cardsField: Category | undefined;

  container: BaseComponent;

  toggleInput: BaseComponent;

  toggleLabel: BaseComponent;

  toggleSpan: BaseComponent;

  constructor() {
    super('main', ['main']);
    this.router.getRoute();

    this.container = new BaseComponent('div', ['container'], null, null, null, this.element);
    const toggleSwitch = new BaseComponent('div', ['switch_button'], null, null, null, this.container.element);
    this.toggleInput = new BaseComponent('input', ['switch_button_checkbox'],
      null, 'type', 'checkbox', toggleSwitch.element);
    this.toggleLabel = new BaseComponent('label', ['switch_button_label'],
      null, 'for', '#', toggleSwitch.element);
    this.toggleSpan = new BaseComponent('span', ['switch_button_label_span'],
      'Train', null, null, this.toggleLabel.element);
    this.render();
  }

  render():void {
    this.mainWrapper = new BaseComponent('div', ['main_wrapper'], null, null, null, this.container.element);
    this.mainTitle = new BaseComponent('h1', ['main_title'],
      this.router.categoryTitle, null, null, this.mainWrapper.element);
    this.cardsField = new Category(this.router.categoryWords);
    this.mainWrapper.element.appendChild(this.cardsField.element);
  }
}
