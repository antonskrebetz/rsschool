import { BaseComponent } from '../basecomponent';
import { CAR_IMG } from '../car-svg';

export class WinnerItem extends BaseComponent {
  number: BaseComponent;

  car: BaseComponent;

  name: BaseComponent;

  wins: BaseComponent;

  time: BaseComponent;

  constructor(number: string, car: string, name: string, wins: string, time: string, parent?: HTMLElement) {
    super('div', ['table-line']);
    this.number = new BaseComponent('div', ['table-number'], `${number}`, null, null, this.element);
    this.car = new BaseComponent('div', ['table-car'], CAR_IMG, null, null, this.element);
    this.car.element.style.fill = `${car}`;
    this.name = new BaseComponent('div', ['table-name'], `${name}`, null, null, this.element);
    this.wins = new BaseComponent('div', ['table-wins'], `${wins}`, null, null, this.element);
    this.time = new BaseComponent('div', ['table-time'], `${time}`, null, null, this.element);

    if (parent) parent.appendChild(this.element);
  }
}
