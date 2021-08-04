import './raceResult.scss';
import { BaseComponent } from '../basecomponent';

export class Modal extends BaseComponent {
  content: BaseComponent;

  winner: BaseComponent;

  btnClose: BaseComponent;

  constructor() {
    super('div', ['modal']);
    this.content = new BaseComponent('div', ['modal-content'], null, null, null, this.element);
    this.winner = new BaseComponent('div', ['race-winner'], 'There is no winner because all cars have broken engines', null, null, this.content.element);
    document.body.appendChild(this.element);

    this.btnClose = new BaseComponent('div', ['btn-close'], 'CLOSE');
    this.btnClose.element.onclick = () => {
      this.element.style.display = 'none';
    };
  }

  get(name: string, time: number):void {
    this.winner.element.innerHTML = `The winner is ${name},<br> time ${time.toFixed(2)} sec.`;
    this.element.style.display = 'block';
    this.getCloseBtn(this.winner.element);
  }

  getCloseBtn(parent: HTMLElement) {
    parent.appendChild(this.btnClose.element);
  }
}
