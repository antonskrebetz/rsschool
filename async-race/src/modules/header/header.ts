import './header.scss';
import { BaseComponent } from '../basecomponent';

export class Header extends BaseComponent {
  arrLinks: Array<HTMLElement> = [];

  constructor() {
    super('header', ['header'], null, null, null, document.body);
    const garage = new BaseComponent('a', ['link'], 'To Garage', 'href', '#garage');
    const winners = new BaseComponent('a', ['link'], 'To Winners', 'href', '#winners');
    [garage.element, winners.element].forEach((el) => {
      this.arrLinks.push(el);
      this.element.appendChild(el);
    });
  }
}
