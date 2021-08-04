import './settings.scss';
import { BaseComponent } from '../base-component';
import { userSettings } from '../user-settings';
import { setResponsiveCards } from '../../shared/set-responsive';

export class Settings extends BaseComponent {
  constructor() {
    super('div', ['game-settings']);
    const h1 = new BaseComponent('h1', ['title'], 'Game settings');

    const arrElement: Array<any> = [
      {
        typeEL: ['select', 'dificculty'],
        option: [16, 36, 64],
      },
      {
        typeEL: ['select', 'cardStyle'],
        option: ['activities', 'trip'],
      },
    ];

    arrElement.forEach((key) => {
      const tag = new BaseComponent(key.typeEL[0], [key.typeEL[1]]);
      const title = new BaseComponent('h3', [], `${key.typeEL[1]}`);

      tag.element.onchange = (e: any) => {
        if (e.target.classList.contains('dificculty')) {
          console.log(userSettings);
          userSettings.dificculty = +(e.target.value);
          setResponsiveCards(+(e.target.value));
        }

        if (e.target.classList.contains('cardStyle')) {
          userSettings.cardStyle = e.target.value;
          console.log(userSettings);
        }
      };

      key.option.forEach((key2: any) => {
        const child = new BaseComponent('option', [], `${key2} cards`);
        child.element.setAttribute('value', key2);

        if (key2 === userSettings.dificculty || key2 === userSettings.cardStyle) {
          child.element.setAttribute('selected', 'selected');
        }
        tag.element.appendChild(child.element);
      });
      
      this.element.appendChild(title.element);
      this.element.appendChild(tag.element);
    });

    this.element.insertBefore(h1.element, this.element.children[0]);
  }
}
