import './toolbar.scss';
import { BaseComponent } from '../basecomponent';
import { carList, model } from '../..';
import { generateColor, generateName } from '../functions';
import { Car } from '../car/car';

interface InterfaceUpdateCar {
  id: number,
  name: string,
  color: string
}

export class ControlPanel extends BaseComponent {
  public currentCar: InterfaceUpdateCar = { id: 0, name: '', color: '' };

  create: BaseComponent;

  update: BaseComponent;

  carsControl: BaseComponent;

  race: BaseComponent;

  reset: BaseComponent;

  random: BaseComponent;

  inputTextSet: BaseComponent;

  inputColorSet: BaseComponent;

  btnCreate: BaseComponent;

  inputTextUpdate: BaseComponent;

  inputColorUpdate: BaseComponent;

  btnUpdate: BaseComponent;

  constructor() {
    super('div', ['toolbar']);

    this.create = new BaseComponent('div', ['create'], null, null, null, this.element);
    this.inputTextSet = new BaseComponent('input', ['input-textset'], '', 'type', 'text', this.create.element);
    this.inputColorSet = new BaseComponent('input', ['input-colorset'], '', 'type', 'color', this.create.element);
    this.inputColorSet.element.setAttribute('value', '#000000');
    this.btnCreate = new BaseComponent('div', ['btn-create'], 'Create', null, null, this.create.element);
    this.btnCreate.element.onclick = () => { this.createCar(); };

    this.update = new BaseComponent('div', ['update'], null, null, null, this.element);
    this.inputTextUpdate = new BaseComponent('input', ['input-textupdate'], '', 'type', 'text', this.update.element);
    this.inputColorUpdate = new BaseComponent('input', ['input-colorupdate'], '', 'type', 'color', this.update.element);
    this.btnUpdate = new BaseComponent('div', ['btn-update'], 'Update', null, null, this.update.element);
    this.btnUpdate.element.onclick = () => { this.updateCar(); };

    this.carsControl = new BaseComponent('div', ['race-control'], null, null, null, this.element);
    this.race = new BaseComponent('div', ['race-all'], 'Race', null, null, this.carsControl.element);
    this.race.element.onclick = () => {
      carList.singleRace = false;
      this.raceCars();
    };
    this.reset = new BaseComponent('div', ['reset-all', 'disable'], 'Reset', null, null, this.carsControl.element);
    this.reset.element.onclick = () => { this.resetCars(); };
    this.random = new BaseComponent('div', ['random-cars'], 'Generate Cars', null, null, this.carsControl.element);
    this.random.element.onclick = () => { this.generateCars(); };
  }

  raceCars(): void {
    carList.resetCars = [];
    this.reset.element.classList.remove('disable');
    this.race.element.classList.add('disable');
    carList.raceResult = []; carList.raceWinner = { id: 0, time: 0 };
    carList.cars.map((el:Car) => {
      el.drive();
    });
  }

  resetCars() {
    carList.cars.forEach((el:Car) => {
      el.resetRace();
    });
  }

  async createCar() {
    const name = (this.inputTextSet.element as HTMLInputElement).value;
    const color = (this.inputColorSet.element as HTMLInputElement).value;
    if (name == '') return alert('Write the name, please');
    await model.createCar({ name, color }, 'garage');
    carList.render();
  }

  async updateCar() {
    if (this.currentCar.name == '' || this.currentCar.id == 0) return alert('Vehicle not selected');
    this.currentCar.name = (this.inputTextUpdate.element as HTMLInputElement).value;
    this.currentCar.color = (this.inputColorUpdate.element as HTMLInputElement).value;
    await model.updateCar(this.currentCar.id, this.currentCar, 'garage');

    carList.cars.forEach((el) => {
      if (el.id == this.currentCar.id) {
        el.carName.element.innerHTML = this.currentCar.name;
        el.carImg.element.style.fill = this.currentCar.color;
      }
    });

    this.currentCar = { id: 0, name: '', color: '' };
    (this.inputTextUpdate.element as HTMLInputElement).value = '';
    (this.inputColorUpdate.element as HTMLInputElement).value = '#000000';
  }

  async generateCars() {
    for (let i = 0; i < 100; i++) {
      const name = generateName();
      const color = generateColor();
      await model.createCar({ name, color }, 'garage');
    }
    carList.render();
  }
}
