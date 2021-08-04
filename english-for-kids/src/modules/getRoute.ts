import cardsCategories from '../../public/data/categories';
import { Category } from './app/app';
import { BaseComponent } from './base-component';
import { header } from '../index';

export class Router {
  currentRouteName: string;

  categoryTitle: string;

  categoryWords: { word: string; translation: string; image: string; audio: string; }[];

  categoryNumber:number;

  main;

  mainWrapper: BaseComponent | undefined;

  mainTitle: BaseComponent | undefined;

  cardsField: Category | undefined;

  constructor(main: any) {
    this.main = main;
    this.currentRouteName = window.location.hash;
    this.categoryNumber = cardsCategories.categories
      .indexOf(cardsCategories.categories
        .filter((el) => el.href === this.currentRouteName)[0]);

    this.categoryTitle = cardsCategories.categories[this.categoryNumber].category;
    this.categoryWords = cardsCategories.categories[this.categoryNumber].words;
  }

  getHash = () => window.location.hash;

  getRoute():void {
    window.onpopstate = () => { this.getRoute(); };

    header.menuItemArr.forEach((el) => {
      (location.hash === el.getAttribute('href')) ? el.classList.add('active') : el.classList.remove('active');
    });
    this.currentRouteName = this.getHash();
    this.categoryNumber = cardsCategories.categories
      .indexOf(cardsCategories.categories
        .filter((el) => el.href === this.currentRouteName)[0]);
    this.categoryTitle = cardsCategories.categories[this.categoryNumber].category;
    this.categoryWords = cardsCategories.categories[this.categoryNumber].words;

    if (this.main.mainWrapper) {
      const currentMainTitle = this.main.mainWrapper.element.children[0];
      const prevCardsField = this.main.mainWrapper.element.children[1];
      this.main.mainTitle.element.innerHTML = '';
      this.mainTitle = new BaseComponent('h1', ['main_title'], this.categoryTitle, null, null, currentMainTitle);
      this.cardsField = new Category(this.categoryWords);
      prevCardsField.remove();
      this.main.mainWrapper.element.appendChild(this.cardsField.element);
    }
  }
}
