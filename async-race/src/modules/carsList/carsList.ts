import { main, model } from '../..';
import { Car } from '../car/car';
import { BaseComponent } from '../basecomponent';
import { PageNavigate } from '../pagination/pagination';
import { interfaceResult } from '../interfaces';

export class CarList extends BaseComponent {
  raceResult: Array<interfaceResult> = [];

  raceWinner = { id: 0, time: 0 };

  cars: Array<Car> = [];

  resetCars: Array<boolean> = [];

  nav: PageNavigate;

  carsWrap: BaseComponent;

  singleRace = false;

  constructor() {
    super('div', ['car-list']);
    this.nav = new PageNavigate(this.element, 7);
    this.carsWrap = new BaseComponent('div', ['cars-wrapper'], null, null, null, this.element);
    this.nav.prevBtn.element.onclick = () => {
      this.nav.getPrev();
      this.render();
    };
    this.nav.nextBtn.element.onclick = () => {
      this.nav.getNext();
      this.render();
    };
  }

  async render() {
    this.nav.setData('garage');
    this.cars.forEach((el) => el.element.remove());
    this.cars = [];
    const hostCars = await model.getData(`garage?_page=${this.nav.currentPage}&_limit=7`);
    hostCars.forEach((el: Car) => {
      this.cars.push(new Car(el, this.carsWrap.element));
    });

    main.element.appendChild(this.element);
  }
}
