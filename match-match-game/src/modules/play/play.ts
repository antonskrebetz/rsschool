import { DB, main } from '../..';
import { BaseComponent } from '../base-component';
import { imgField } from '../header/header';
import { userSettings } from '../user-settings';
import './play.scss';

export class Game {
  private readonly random: Array<number> = this.createRandom();
  private readonly gameField: HTMLElement;
  private startTime: Date = new Date();
  private gameTimer = 0;
  private clickCount = 0;
  private remainCards: number = this.numberCards;
  private efficiency: number | undefined;
  private timeout: any;
  gameTimerDiv: BaseComponent;

  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly email: string,
    private readonly numberCards: number,
    private readonly shirts: string,
    private readonly cardsTheme: string
  ) {

    this.gameField = document.createElement('section');
    this.gameField.classList.add('game-field');
    main.element.append(this.gameField);
    
    document.documentElement.style.setProperty(
      '--frontSide',
      `url("img/shirts/${this.shirts}.jpg")`
    );

    this.gameTimerDiv = new BaseComponent('div', ['timer-game'], '0');
    main.element.appendChild(this.gameTimerDiv.element);

    this.createField();
      const openTime = 5000;
      let openTime2 = 5;
      let openTimer = setInterval(() => {
        openTime2--;
        this.gameTimerDiv.element.innerHTML = `${openTime2}`;
      }, 1000)
    
    setTimeout(() => {
      clearInterval(openTimer);
      const cards = this.gameField.children.length;
      for (let i=0; i<cards; i++) {
        this.gameField.children[i].classList.remove('back');
        this.gameField.children[i].classList.remove('disable');
        this.gameField.children[i].removeAttribute('style');
      }
      
      this.startTime = new Date;
      this.timerUpdate();  
      this.gameTimerDiv.element.style.color = 'green';  
    }, openTime);
    
  }

  createRandom(): Array<number> {
    const arrRandom = [...Array(this.numberCards / 2).keys()];
    return arrRandom.concat(arrRandom).sort(() => Math.random() - 0.5);
  }

  createField(amt: number = this.numberCards): void {
    if (amt === 0) return;
    const card = document.createElement('div');
    card.style.cssText = `background:url("img/back/${this.cardsTheme}/${
      this.random[Math.abs(amt-this.numberCards)]
    }.png"); background-size: 90% 90%; background-repeat: no-repeat; background-position: center; background-color: white`;
    
    card.classList.add('back', 'disable');
    card.addEventListener('click', (e) => this.showCard(e));
    this.gameField.appendChild(card);    
    setTimeout(() => this.createField(amt - 1), 20);
  }

  timerUpdate(): void {
    this.timeout = setInterval(() => {
      const currDate: Date = new Date();
      this.gameTimer = Math.round(
        (currDate.valueOf() - this.startTime.valueOf()) / 1000
      );
      this.gameTimerDiv.element.innerHTML = this.gameTimer.toString();
    }, 100);
  }

  getNumCard(x: HTMLElement): number {
    return [...this.gameField.children].findIndex((el) => el === x);
  }

  showCard(e: MouseEvent): void {
    const cards: NodeListOf<HTMLElement> =
      this.gameField.querySelectorAll('div');
    if (!(e.target instanceof HTMLElement)) {
      throw new Error('Error');
    }
    e.target.style.cssText = `background:url("img/back/${this.cardsTheme}/${
      this.random[this.getNumCard(e.target)]
    }.png"); background-size: 90% 90%; background-repeat: no-repeat; background-position: center; background-color: white`;
    e.target.classList.add('back', 'disable');
    this.clickCount++;

    if (this.clickCount % 2 === 0) {
      const activeCards = this.gameField.querySelectorAll<HTMLElement>('.back');
      const activeCard1 = this.random[this.getNumCard(activeCards[0])];
      const activeCard2 = this.random[this.getNumCard(activeCards[1])];

      if (activeCard1 !== activeCard2) {
        cards.forEach((item) => item.classList.add('disable'));
        setTimeout(() => {
          cards.forEach((item) => {
            item.classList.remove('back', 'disable');
            item.removeAttribute('style');
            if (!item.classList.contains('complete'))
              item.removeAttribute('class');
          });
        }, 800);
      }

      if (activeCard1 === activeCard2) {
        this.remainCards -= 2;

        if (this.remainCards === 0) {
          setTimeout(() => {
            this.showVictory();
          }, 1200);
        }

        setTimeout(() => {
          activeCards.forEach((item: HTMLElement) =>
            item.classList.remove('back')
          );
          activeCards.forEach((item: HTMLElement) =>
            item.classList.add('complete')
          );
        }, 600);
      }
    }
  }

  showVictory(): void {    
    this.efficiency = +(
      (this.numberCards / this.gameTimer / (this.clickCount / 2)) *
      100 *
      this.numberCards
    ).toFixed(2);
    const ava: any = imgField.element.getAttribute('src');
    DB.setData(
      'results',
      userSettings.email,
      userSettings.firstName,
      userSettings.lastName,
      ava,
      this.efficiency
    );
    this.gameField.innerHTML = '';

    clearInterval(this.timeout);
    const divVic = new BaseComponent(
      'div',
      ['modal-window'],
      `<h1>That was incredible! Good job! Your efficiency ${this.efficiency} </h1>`
    );
    const btnGo = new BaseComponent('div', ['btn-go'], `BEST PLAYERS`);
    divVic.element.appendChild(btnGo.element);
    btnGo.element.onclick = () => {
      location.href = '#bestscore';
    };
    main.element.appendChild(divVic.element);
  }
}
