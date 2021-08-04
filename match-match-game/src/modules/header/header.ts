import './header.scss';
import { BaseComponent } from '../base-component';
import { DB, main } from '../..';
import { userSettings } from '../user-settings';

const defaultAvatar = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjgiIGN5PSIyOCIgcj0iMjgiIGZpbGw9IiNCOUQ1RDkiLz4KPHBhdGggZD0iTTI4IDE4QzI1LjI0NzUgMTggMjMgMjAuMjQ3NSAyMyAyM0MyMyAyNS43NTI1IDI1LjI0NzUgMjggMjggMjhDMzAuNzUyNSAyOCAzMyAyNS43NTI1IDMzIDIzQzMzIDIwLjI0NzUgMzAuNzUyNSAxOCAyOCAxOFpNMjggMTkuNUMyOS45NDE5IDE5LjUgMzEuNSAyMS4wNTgxIDMxLjUgMjNDMzEuNSAyNC45NDE5IDI5Ljk0MTkgMjYuNSAyOCAyNi41QzI2LjA1ODEgMjYuNSAyNC41IDI0Ljk0MTkgMjQuNSAyM0MyNC41IDIxLjA1ODEgMjYuMDU4MSAxOS41IDI4IDE5LjVaTTIxLjk4OTMgMzBDMjAuODk5NCAzMCAyMCAzMC44OTk0IDIwIDMxLjk4OTNWMzIuNzVDMjAgMzQuNTUyMSAyMS4xMzk2IDM1Ljk0NjEgMjIuNjUzMyAzNi43ODEyQzI0LjE2NyAzNy42MTY0IDI2LjA4NDEgMzggMjggMzhDMjkuOTE1OSAzOCAzMS44MzMgMzcuNjE2NCAzMy4zNDY3IDM2Ljc4MTJDMzQuNjM3MyAzNi4wNjkyIDM1LjYwODcgMzQuOTMxMyAzNS44ODA5IDMzLjVIMzYuMDAxVjMxLjk4OTNDMzYuMDAxIDMwLjg5OTQgMzUuMTAwNiAzMCAzNC4wMTA3IDMwSDIxLjk4OTNaTTIxLjk4OTMgMzEuNUgzNC4wMTA3QzM0LjI4OTggMzEuNSAzNC41MDEgMzEuNzEwMiAzNC41MDEgMzEuOTg5M1YzMkgzNC41VjMyLjc1QzM0LjUgMzMuOTQ3OSAzMy44MjcxIDM0LjgwMzkgMzIuNjIyMSAzNS40Njg4QzMxLjQxNyAzNi4xMzM2IDI5LjcwOTEgMzYuNSAyOCAzNi41QzI2LjI5MDkgMzYuNSAyNC41ODMgMzYuMTMzNiAyMy4zNzc5IDM1LjQ2ODhDMjIuMTcyOSAzNC44MDM5IDIxLjUgMzMuOTQ3OSAyMS41IDMyLjc1VjMxLjk4OTNDMjEuNSAzMS43MTAyIDIxLjcxMDIgMzEuNSAyMS45ODkzIDMxLjVaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjggMThDMjUuMjQ3NSAxOCAyMyAyMC4yNDc1IDIzIDIzQzIzIDI1Ljc1MjUgMjUuMjQ3NSAyOCAyOCAyOEMzMC43NTI1IDI4IDMzIDI1Ljc1MjUgMzMgMjNDMzMgMjAuMjQ3NSAzMC43NTI1IDE4IDI4IDE4Wk0yMS45ODkzIDMwQzIwLjg5OTQgMzAgMjAgMzAuODk5NCAyMCAzMS45ODkzVjMyLjc1QzIwIDM0LjU1MjEgMjEuMTM5NiAzNS45NDYxIDIyLjY1MzMgMzYuNzgxMkMyNC4xNjcgMzcuNjE2NCAyNi4wODQxIDM4IDI4IDM4QzI5LjkxNTkgMzggMzEuODMzIDM3LjYxNjQgMzMuMzQ2NyAzNi43ODEyQzM0LjYzNzMgMzYuMDY5MiAzNS42MDg3IDM0LjkzMTMgMzUuODgwOSAzMy41SDM2LjAwMVYzMS45ODkzQzM2LjAwMSAzMC44OTk0IDM1LjEwMDYgMzAgMzQuMDEwNyAzMEgyMS45ODkzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==`;

export const imgField = new BaseComponent('img', ['user-ava']);

class BtnGame extends BaseComponent {
  private status: boolean = false;
  private start: string = 'START';
  private stop: string = 'STOP';
  constructor() {
    super('div', ['user-field'], 'START');
  }

  changeStatus() {
    if (this.status) {
      this.status = false;
      this.element.innerHTML = this.start;
      location.href = '#settings';
    } else {
      this.status = true;
      this.element.innerHTML = this.stop;
      location.href = '#play';
    }
  }
}

export class HeaderApp extends BaseComponent {
  btnAddUser: BaseComponent | undefined;
  arrInpNode: HTMLElement[];
  constructor() {
    super('header', ['header'], 'body');
    this.arrInpNode = [];

    this.element.innerHTML = `
      <a href="#" class="logo">
        <div class="top">MATCH</div>
        <div class="bottom">MATCH</div>
      </a>
      <div class="menu">  
        <ul>
          <li><a href="#about">About Game</a></li>
          <li><a href="#bestscore">Best Score</a></li>
          <li><a href="#settings">Game Settings</a></li>
        </ul> 
      </div>      
    `;

    const userField = new BaseComponent(
      'div',
      ['user-field'],
      'REGISTER NEW PLAYER'
    );
    this.element.appendChild(userField.element);

    userField.element.onclick = () => {
      const modal = new BaseComponent('div', ['modal-window']);
      const modalContent = new BaseComponent(
        'div',
        ['modal-content'],
        '<h3>Register new player</h3>'
      );
      const modalWrap = new BaseComponent('div', ['modal-wrap']);
      const modalInputs = new BaseComponent('div', ['modal-inputs']);

      const arrInput: any = [
        {
          title: 'First Name',
          type: 'text',
        },
        {
          title: 'Last Name',
          type: 'text',
        },
        {
          title: 'Email',
          type: 'email',
        },
      ];

      arrInput.forEach((it: { title: string; type: string }) => {
        const title = new BaseComponent(
          'div',
          ['input-block'],
          `<h4>${it.title}</h4>`
        );
        const input = new BaseComponent('input', ['input-class', 'input-red']);
        input.element.setAttribute('type', it.type);
        title.element.appendChild(input.element);
        this.arrInpNode.push(input.element);
        modalInputs.element.appendChild(title.element);
      });

      const modalImg = new BaseComponent('div', ['modal-img']);
      const imgUser = new BaseComponent('img', ['modal-img__img']);
      imgUser.element.setAttribute('src', defaultAvatar);
      const btnAdd: any = new BaseComponent('input', ['modal-button']);
      btnAdd.element.setAttribute('type', 'file');
      btnAdd.element.oninput = () => {
        const reader: any = new FileReader();
        reader.onload = () => {
          const loadImg = new Image();
          loadImg.src = reader.result;
          imgUser.element.setAttribute('src', loadImg.src);
        };
        reader.readAsDataURL(btnAdd.element.files[0]);
        btnAdd.element.setAttribute('value', '');
      };

      modalImg.element.appendChild(imgUser.element);
      modalImg.element.appendChild(btnAdd.element);

      modalWrap.element.appendChild(modalInputs.element);
      modalWrap.element.appendChild(modalImg.element);

      modalContent.element.appendChild(modalWrap.element);

      this.btnAddUser = new BaseComponent(
        'div',
        ['btn-modal', 'disable'],
        'ADD USER'
      );

      this.arrInpNode.forEach((it) => {
        it.addEventListener('input', (e) => {
          this.changeInput(e);
        });
      });

      const btnGame = new BtnGame();
      btnGame.element.onclick = () => {
        btnGame.changeStatus();
      };

      this.btnAddUser.element.onclick = () => {
        const arrData: any = [];
        const avaUser: any = imgUser.element.getAttribute('src');
        this.arrInpNode.forEach((i: any) => {
          arrData.push(i.value);
        });
        DB.setData('users', arrData[2], arrData[0], arrData[1], avaUser);
        userSettings.email = arrData[2];
        userSettings.firstName = arrData[0];
        userSettings.lastName = arrData[1];
        userSettings.registered = true;
        userField.destroy();
        modal.destroy();
        imgField.element.setAttribute('src', avaUser);

        this.element.appendChild(btnGame.element);
        this.element.appendChild(imgField.element);
        if (location.hash == '#play') {
          main.element.innerHTML =
            'Registration complete ! You can play with start button';
        }
      };

      const btnCancel = new BaseComponent('div', ['btn-modal'], 'CANCEL');
      btnCancel.element.onclick = () => {
        modal.destroy(); 
      };

      const btnWrap = new BaseComponent('div', ['btn-wrapper']);
      btnWrap.element.appendChild(this.btnAddUser.element);
      btnWrap.element.appendChild(btnCancel.element);
      modalContent.element.appendChild(btnWrap.element);

      modal.element.appendChild(modalContent.element);
      document.body.appendChild(modal.element);
    };
  }

  changeInput(e: any) {
    const nameTest = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    const emailTest = /^[\w-\.\d*]+@[\w\d]+(\.\w{2,4})$/;

    let name = nameTest.test((this.arrInpNode[0] as HTMLInputElement).value);
    (name) ? this.arrInpNode[0].classList.remove('input-red')
           : this.arrInpNode[0].classList.add('input-red');

    let last = nameTest.test((this.arrInpNode[1] as HTMLInputElement).value);
    (last) ? this.arrInpNode[1].classList.remove('input-red')
    : this.arrInpNode[1].classList.add('input-red');

    let mail = emailTest.test((this.arrInpNode[2] as HTMLInputElement).value);
    (mail) ? this.arrInpNode[2].classList.remove('input-red')
           : this.arrInpNode[2].classList.add('input-red');

    let all = [name, last, mail].find((el) => el === false);
    console.log([name, last, mail, all]);

    if (all == undefined) {
      if (!this.btnAddUser) throw new Error('Error');
      this.btnAddUser.element.classList.remove('disable');
    } else {
      if (!this.btnAddUser) throw new Error('Error');
      this.btnAddUser.element.classList.add('disable');
    }
  }
}
