import '../commonStyles.scss';
import './header.scss';
import cardsCategories from '../../../public/data/categories';
import { BaseComponent } from '../base-component';

export class Header extends BaseComponent {
  menuWrapper: BaseComponent;

  menu: BaseComponent;

  menuHeader: BaseComponent;

  menuBody: BaseComponent;

  menuTitle: BaseComponent;

  closeBtn: BaseComponent;

  menuItemArr: Array<HTMLElement> = [];

  headerBtn: BaseComponent;

  headerLogo: BaseComponent;

  headerStat: BaseComponent;

  constructor() {
    super('header', ['header']);

    this.headerBtn = new BaseComponent('a', ['header_btn']);
    this.element.appendChild(this.headerBtn.element);
    this.headerBtn.element.addEventListener('click', () => this.open());

    this.headerLogo = new BaseComponent('a', ['header_logo'], 'English for kids', 'href', '#', this.element);
    this.headerStat = new BaseComponent('a', ['header_stat'], null, 'href', '#stat', this.element);
    this.headerStat.element.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Раздел дорабатывается =)');
    });

    this.menuWrapper = new BaseComponent('div', ['menu-wrapper'], null, null, null, this.element);
    this.menu = new BaseComponent('div', ['menu'], null, null, null, this.menuWrapper.element);
    this.menu.element.addEventListener('click', (e) => {
      if (e.target === this.menuTitle.element || e.target === this.menuBody.element) {
        this.close();
      }
    });
    this.menuHeader = new BaseComponent('div', ['menu_header'], null, null, null, this.menu.element);
    this.menuBody = new BaseComponent('div', ['menu_body'], null, null, null, this.menu.element);
    this.menuTitle = new BaseComponent('a', ['menu_title'], 'Main page', 'href', '#', this.menuHeader.element);
    this.closeBtn = new BaseComponent('div', ['btn_close'], null, null, null, this.menuHeader.element);

    this.closeBtn.element.addEventListener('click', () => this.close());

    this.menuWrapper.element.addEventListener('click', (e) => {
      if (this.menuWrapper.element === e.target) this.close();
    });

    const cards = cardsCategories;

    for (let i = 1; i < cards.categories.length; i++) {
      const menuItemTitle = cards.categories[i].category;
      const menuItemLink = cards.categories[i].href;
      const menuItem = new BaseComponent('a', ['menu_item'],
        `${menuItemTitle}`, 'href', menuItemLink, this.menuBody.element);
      this.menuItemArr.push(menuItem.element);
    }

    this.menuItemArr.forEach((el) => {
      el.addEventListener('click', () => this.close());
    });
  }

  private open() {
    this.menuWrapper.element.classList.add('open');
    this.menu.element.classList.add('open');
  }

  private close() {
    this.menuWrapper.element.classList.remove('open');
    this.menu.element.classList.remove('open');
  }
}
