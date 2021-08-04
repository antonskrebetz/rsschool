import './main.scss';
import { BaseComponent } from '../base-component';

export class MainApp extends BaseComponent {
  constructor() {
    super('main', ['content'], 'body');
  }
}
