import './bestscore.scss';
import { BaseComponent } from '../base-component';
import { DB } from '../..';

export class BestScore extends BaseComponent {
  arrData: Promise<unknown> | undefined;
  table: BaseComponent | undefined;
  H1: any;

  constructor() {
    super('div', ['best-score']);

    setTimeout(() => {
      this.arrData = (async () => {
        const arr = await DB.getData('results');
        this.createTable(arr);
      })();
    }, 300);
  }

  createTable(arr: any) {
    this.H1 = new BaseComponent('h1', ['title'], 'Best players');
    this.table = new BaseComponent('table', ['table-win']);

    for (let i = 0; i < 10; i++) {
      const userResult = new BaseComponent('tr', ['table-line']);
      
      for (let key in arr[i]) {
        const avaImg = new BaseComponent('img', ['user-photo']);
        const cell = new BaseComponent('th', ['table-cell']);

        if (key === 'avatar') {
          avaImg.element.setAttribute('src', arr[i].avatar);
          cell.element.appendChild(avaImg.element);
        } else {
          cell.element.innerHTML = arr[i][key];
        }
        userResult.element.appendChild(cell.element);
      }

      this.table.element.appendChild(userResult.element);
    }
    
    this.element.appendChild(this.H1.element);
    this.element.appendChild(this.table.element);
  }
}
