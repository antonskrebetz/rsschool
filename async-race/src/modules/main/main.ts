import './main.scss';
import { BaseComponent } from '../basecomponent';

export class MainApp extends BaseComponent {
  constructor() {
    super('main', ['content'], null, null, null, document.body);
  }
}
