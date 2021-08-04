import './car.scss';
import { BaseComponent } from '../basecomponent';
import { CAR_IMG } from '../car-svg';
import {
  carList, control, modal, model, winners,
} from '../..';
import { interfaceCar, interfaceRace, interfaceWinner } from '../interfaces';

export class Car {
  name: string;

  color: string;

  readonly id: number;

  element: HTMLElement;

  select: BaseComponent;

  remove: BaseComponent;

  start: BaseComponent;

  reset: BaseComponent;

  carName: BaseComponent;

  carImg: BaseComponent;

  control: BaseComponent;

  race: BaseComponent;

  flagImg: BaseComponent;

  constructor({ name, color, id }: interfaceCar, parent?: HTMLElement) {
    this.name = name;
    this.color = color;
    this.id = id;
    this.element = document.createElement('div');
    this.element.classList.add('car-track');

    this.control = new BaseComponent('div', ['car-track__btns'], null, null, null, this.element);
    this.select = new BaseComponent('div', ['btn-select'], 'select', null, null, this.control.element);
    this.select.element.onclick = () => { this.selectCar(); };
    this.remove = new BaseComponent('div', ['btn-remove'], 'remove', null, null, this.control.element);
    this.remove.element.onclick = () => { this.removeCar(); };
    this.start = new BaseComponent('div', ['btn-start'], 'start', null, null, this.control.element);
    this.start.element.onclick = () => {
      carList.raceWinner = { id: 0, time: 0 };
      carList.singleRace = true;
      this.drive();
    };
    this.reset = new BaseComponent('div', ['btn-reset', 'car-btn-disable'], 'stop', null, null, this.control.element);
    this.reset.element.onclick = () => { this.resetRace(); };
    this.carName = new BaseComponent('div', ['car-title'], `${this.name}`, null, null, this.control.element);
    
    this.race = new BaseComponent('div', ['car-block__road'], null, null, null, this.element);
    this.carImg = new BaseComponent('div', ['car-img'], `${CAR_IMG}`, null, null, this.race.element);
    this.carImg.element.style.fill = `${this.color}`;
    this.flagImg = new BaseComponent('img', ['flag-img'], '', 'src', 'flag.png', this.race.element);

    if (parent) parent.appendChild(this.element);
  }

  async drive() {
    this.reset.element.classList.remove('car-btn-disable');
    this.start.element.classList.add('car-btn-disable');
    const raceData: interfaceRace = await model.getEngine(this.id, 'started');
    const raceTime = (raceData.distance / raceData.velocity) / 1000;
    this.carImg.element.style.animationDuration = `${raceTime}s`;
    this.carImg.element.classList.add('drive');
    const finishStat = await model.race(this.id);
    if (finishStat.success === false) {
      this.carImg.element.style.animationPlayState = 'paused';
    }
    if (finishStat.success === true && carList.raceWinner.id === 0) {
      carList.raceWinner = { id: this.id, time: raceTime };
      winners.addWin(this.id, +raceTime.toFixed(2));
      modal.get(this.name, raceTime);
    }

    carList.raceResult.push({
      id: this.id, time: raceTime, name: this.name, succes: finishStat.success,
    });
  }

  async resetRace() {
    const eng = await model.getEngine(this.id, 'stopped');
    carList.resetCars.push(true);
    if (carList.resetCars.length === carList.cars.length) {
      control.reset.element.classList.add('disable');
      control.race.element.classList.remove('disable');
    }
    this.reset.element.classList.add('car-btn-disable');
    this.start.element.classList.remove('car-btn-disable');
    this.carImg.element.classList.remove('drive');
    this.carImg.element.style.animationPlayState = 'running';
  }

  async removeCar() {
    this.remove.element.classList.add('car-btn-disable');
    const arrWinners = await model.getData('winners');

    arrWinners.forEach(async (el:interfaceWinner) => {
      if (el.id === this.id) await model.deleteCar(this.id, 'winners');
    });
    const res = await model.deleteCar(this.id, 'garage');
    carList.render();
  }

  selectCar() {
    control.currentCar = { id: this.id, name: this.name, color: this.color };
    (control.inputTextUpdate.element as HTMLInputElement).value = this.name;
    (control.inputColorUpdate.element as HTMLInputElement).value = this.color;
  }
}
