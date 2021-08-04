import './app.scss';
import { BaseComponent } from '../base-component';

export class Category extends BaseComponent {
  cardArr: Array<Card> = [];
  arr: Array<HTMLElement>;

  constructor(arr: any) {
    super('div', ['cards-field']);
    this.arr = arr;
    this.createCards(this.arr);
  }

  createCards(arr: Array<HTMLElement>):void {
    arr.forEach(el => {
      const card = new Card(el);
      this.cardArr.push(card);
      this.element.appendChild(card.element);
    });
  }
}

export class Card extends BaseComponent {
  wordEN: string;

  wordRU: string;

  imageSrc: string;

  audioSrc: string;

  href: string;

  cardImg: BaseComponent;

  cardFrontDescription: BaseComponent;

  returnBtn: BaseComponent;

  cardBack: BaseComponent;

  cardBackDescription: BaseComponent;

  cardFront: BaseComponent;

  cardImgFront: BaseComponent;

  constructor(test: any) {
    super('a', ['card']);

    this.wordEN = test.word;
    this.wordRU = test.translation;
    this.imageSrc = 'data/' + test.image;
    this.audioSrc = 'data/' + test.audio;
    this.href = test.href;

    this.cardBack = new BaseComponent('div', ['card_back'], null, null, null, this.element);
    this.cardImg = new BaseComponent('img', ['card_img'], null, 'src', this.imageSrc, this.cardBack.element);
    this.cardBackDescription = new BaseComponent('div', ['card_back_descr'],
      this.wordRU, null, null, this.cardBack.element);

    this.cardFront = new BaseComponent('div', ['card_front'], null, null, null, this.element);
    this.cardImgFront = new BaseComponent('img', ['card_img'], null, 'src', this.imageSrc, this.cardFront.element);
    this.cardFrontDescription = new BaseComponent('div', ['card_descr'],
      this.wordEN, null, null, this.cardFront.element);
    this.returnBtn = new BaseComponent('div', ['card_btn'], null, null, null, this.cardFront.element);

    this.returnBtn.element.addEventListener('click', () => {
      this.element.classList.add('rotate');
    });

    this.element.addEventListener('mouseleave', () => {
      this.element.classList.remove('rotate');
    });

    this.cardFront.element.addEventListener('click', (e) => this.playAudio(e));

    if (this.href) {
      this.element.setAttribute('href', this.href);
      this.returnBtn.element.remove();
    }
  }

  playAudio(e: MouseEvent):void {
    if (e.target === this.returnBtn.element) return;
    const audio = new Audio(this.audioSrc);
    audio.currentTime = 0;
    audio.play();
  }
}
